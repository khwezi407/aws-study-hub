# Parse all 23 kananinirav practice exams - v3 (simplified parsing)
# Structure: <li>stem <ul><li>A. opt</li><li>B. opt</li>...</ul> <details>Correct answer: X</details></li>

$ProgressPreference = 'SilentlyContinue'
$base = "https://kananinirav.com/practice-exam/practice-exam-"
$allQuestions = @()
$seenStems = @{}

$billKeywords = "billing|pricing|cost|budget|reserved instance|savings plan|spot instance|on-demand|dedicated host|free tier|support plan|trusted advisor|cost and usage|cost allocation|TCO|volume discount|pay-as-you-go|consolidated billing|Enterprise Support|Business Support|Developer Support|Basic Support|Concierge|Technical Account Manager|TAM|price|charges|invoice"
$secKeywords = "IAM|security group|NACL|network ACL|KMS|encryption|CloudTrail|GuardDuty|Inspector|Macie|Security Hub|Shield|WAF|DDoS|least privilege|MFA|multi-factor|access key|Cognito|federation|SCP|Artifact|compliance|PCI|HIPAA|SOC|penetration|credential|password|root account|firewall|Secrets Manager|CloudHSM|Certificate Manager|ACM|control tower|Directory Service|Identity Center|SSO|shared responsibility"
$techKeywords = "EC2|S3|EBS|EFS|DynamoDB|RDS|Aurora|Redshift|Lambda|VPC|Route 53|CloudFront|ELB|load balanc|Auto Scaling|SQS|SNS|Kinesis|Snowball|Snowmobile|Storage Gateway|Direct Connect|VPN|Athena|Glue|EMR|SageMaker|Rekognition|Elastic Beanstalk|CloudFormation|ECS|EKS|Fargate|Container|Docker|AMI|storage class|Glacier|ElastiCache|X-Ray|Step Functions|API Gateway|CodePipeline|CodeCommit|CodeBuild|OpsWorks|Transit Gateway|NAT|internet gateway|subnet|NoSQL|relational|data warehouse|message queue|DNS|CDN|content delivery|Neptune|QLDB|Lightsail|Batch|Connect|Elastic Transcoder|edge location|availability zone|instance type|serverless"

function Classify-Domain($stem) {
    $s = $stem.ToLower()
    if ($s -match $billKeywords) { return "Billing, Pricing and Support" }
    if ($s -match $secKeywords) { return "Security and Compliance" }
    if ($s -match $techKeywords) { return "Cloud Technology and Services" }
    return "Cloud Concepts"
}

function Clean-Text($text) {
    $text = $text -replace '<[^>]+>', ' ' -replace '&amp;', '&' -replace '&lt;', '<' -replace '&gt;', '>' -replace '&#39;', "'" -replace '&quot;', '"' -replace '&nbsp;', ' '
    $text = $text -replace '\s+', ' ' -replace '^\s+', '' -replace '\s+$', ''
    return $text
}

for ($i = 1; $i -le 23; $i++) {
    Write-Host "Fetching exam $i..."
    try {
        $resp = Invoke-WebRequest -Uri "${base}${i}.html" -UseBasicParsing -TimeoutSec 30
        $content = $resp.Content
    } catch {
        Write-Host "  Failed: $($_.Exception.Message)"
        continue
    }

    # Find all answer markers
    $answerMatches = [regex]::Matches($content, 'Correct answer:\s*([A-E](?:\s*,\s*[A-E]*)*)', 'IgnoreCase')
    
    # Find ALL option matches in the full content
    $allOptMatches = [regex]::Matches($content, '<li>\s*([A-E])\.\s*(.*?)</li>', 'Singleline')
    
    $examCount = 0
    foreach ($am in $answerMatches) {
        $ansPos = $am.Index
        $correctRaw = $am.Groups[1].Value.Trim()
        $correctLetters = $correctRaw -split '\s*,\s*' | ForEach-Object { $_.Trim() } | Where-Object { $_ -match '^[A-E]$' }
        
        if ($correctLetters.Count -eq 0) { continue }
        
        # Find the closest "A." option before this answer
        $aMatch = $null
        for ($o = $allOptMatches.Count - 1; $o -ge 0; $o--) {
            if ($allOptMatches[$o].Groups[1].Value -eq 'A' -and $allOptMatches[$o].Index -lt $ansPos) {
                $aMatch = $allOptMatches[$o]
                break
            }
        }
        if (-not $aMatch) { continue }
        
        # Collect options A through E that follow this A (within 2000 chars)
        $aEnd = $aMatch.Index + $aMatch.Length
        $options = @{}
        $optOrder = @()
        $options['A'] = Clean-Text $aMatch.Groups[2].Value
        $optOrder += 'A'
        
        foreach ($letter in @('B','C','D','E')) {
            for ($o = 0; $o -lt $allOptMatches.Count; $o++) {
                $m = $allOptMatches[$o]
                if ($m.Groups[1].Value -eq $letter -and $m.Index -gt $aEnd -and $m.Index -lt ($aEnd + 2000) -and $m.Index -lt $ansPos) {
                    $options[$letter] = Clean-Text $m.Groups[2].Value
                    $optOrder += $letter
                    break
                }
            }
        }
        
        if ($optOrder.Count -lt 2) { continue }
        
        # Extract stem: find the <ul> that contains the options, take text before it
        # Structure: <li>STEM TEXT\n    <ul>\n      <li>A. option</li>
        $beforeA = $content.Substring([Math]::Max(0, $aMatch.Index - 2000), [Math]::Min(2000, $aMatch.Index))
        $ulPos = $beforeA.LastIndexOf('<ul')
        if ($ulPos -lt 0) { $ulPos = $beforeA.Length }
        $stemArea = $beforeA.Substring(0, $ulPos)
        # Find last > in stemArea (end of the <li> tag that opens the question)
        $lastGt = $stemArea.LastIndexOf('>')
        if ($lastGt -ge 0) {
            $stemRaw = $stemArea.Substring($lastGt + 1)
        } else {
            $stemRaw = $stemArea
        }
        
        $stem = Clean-Text $stemRaw
        
        # Filter out junk
        if ($stem.Length -lt 15) { continue }
        if ($stem -match '^(Please|Exam List|Select|Click|If this|Disclaim|Free AWS|Practice Exam|Buy|Purchase|Sample)') { continue }
        if ($stem -match 'href=|http|<script|<style') { continue }
        
        # Deduplicate
        $stemKey = $stem.ToLower().Substring(0, [Math]::Min(80, $stem.Length))
        if ($seenStems.ContainsKey($stemKey)) { continue }
        $seenStems[$stemKey] = $true
        
        $qType = if ($correctLetters.Count -gt 1) { "multi" } else { "single" }
        
        $optionsArray = @()
        foreach ($letter in $optOrder) {
            $optionsArray += "$letter. $($options[$letter])"
        }
        
        $domain = Classify-Domain $stem
        
        $q = [PSCustomObject]@{
            id = "ext-{0:D4}" -f ($allQuestions.Count + 1)
            domain = $domain
            type = $qType
            stem = $stem
            options = $optionsArray
            correct = $correctLetters
            source = "kananinirav-exam-$i"
        }
        $allQuestions += $q
        $examCount++
    }
    
    Write-Host "  Exam ${i}: ${examCount} questions (running total: $($allQuestions.Count))"
}

Write-Host "`n=== RESULTS ==="
Write-Host "Total unique questions: $($allQuestions.Count)"
$ccCount = ($allQuestions | Where-Object { $_.domain -eq "Cloud Concepts" }).Count
$secCount = ($allQuestions | Where-Object { $_.domain -eq "Security and Compliance" }).Count
$techCount = ($allQuestions | Where-Object { $_.domain -eq "Cloud Technology and Services" }).Count
$billCount = ($allQuestions | Where-Object { $_.domain -eq "Billing, Pricing and Support" }).Count
Write-Host "Cloud Concepts: $ccCount"
Write-Host "Security and Compliance: $secCount"
Write-Host "Cloud Technology and Services: $techCount"
Write-Host "Billing, Pricing and Support: $billCount"

# Generate JS
$js = "// Auto-generated from kananinirav.com practice exams 1-23`n"
$js += "// Community-sourced practice questions. NOT official AWS exam questions.`n"
$js += "// All items verified:false until manually cross-checked against AWS docs.`n`n"
$js += "window.EXTERNAL_QUESTIONS = [`n"

foreach ($q in $allQuestions) {
    $escStem = $q.stem -replace '\\', '\\' -replace '"', '\"' -replace "`r", '' -replace "`n", ' '
    $js += "{id:`"$($q.id)`",domain:`"$($q.domain)`",type:`"$($q.type)`",stem:`"$escStem`",options:["
    $js += ($q.options | ForEach-Object { '"' + ($_ -replace '\\', '\\' -replace '"', '\"' -replace "`r", '' -replace "`n", ' ') + '"' }) -join ","
    $js += "],correct:[" + (($q.correct | ForEach-Object { '"' + $_ + '"' }) -join ",") + "],rationale:`"`",wrongRationale:{},tags:[],verified:false,source:`"$($q.source)`"},`n"
}

$js += "];`n"

$outputPath = "c:\Users\khwezy\Downloads\AWS Study Hub\external-questions.js"
[System.IO.File]::WriteAllText($outputPath, $js, [System.Text.Encoding]::UTF8)
Write-Host "`nWritten to $outputPath ($([Math]::Round((Get-Item $outputPath).Length / 1KB, 1)) KB)"
