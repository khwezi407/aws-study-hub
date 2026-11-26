// ═══════════════════════════════════════════════════════════════
//  PRAESIGNIS AWS re/Start — Full Flashcard Bank
//  Covers all 10 weeks of the curriculum mapped to CLF-C02 exam
// ═══════════════════════════════════════════════════════════════

window.FLASHCARD_DECKS = [

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 1 — Introduction to AWS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w1", week:1, title:"Week 1 · Introduction to AWS",
  color:"#3BA8FF", emoji:"☁️",
  cards:[
    {q:"What are the 6 advantages of cloud computing?",a:"1. Trade CapEx for OpEx\n2. Benefit from massive economies of scale\n3. Stop guessing capacity\n4. Increase speed and agility\n5. Stop spending on data centres\n6. Go global in minutes",tip:"Exam loves these 6. Memorise them as a list."},
    {q:"What is Cloud Computing?",a:"On-demand delivery of IT resources over the internet with pay-as-you-go pricing. You get compute, storage, databases, networking — without owning hardware.",tip:"'On-demand' and 'pay-as-you-go' are the two key phrases."},
    {q:"What is a Region?",a:"A physical location in the world containing 2 or more Availability Zones. Example: us-east-1 (N. Virginia). You choose a Region based on latency, compliance, and cost.",tip:"Region ≠ AZ. Region CONTAINS AZs."},
    {q:"What is an Availability Zone (AZ)?",a:"One or more discrete data centres with redundant power, networking, and connectivity within a Region. AZs are physically separate to protect against localised failures.",tip:"Think: one building inside a city (Region)."},
    {q:"What is an Edge Location?",a:"A site used by CloudFront to cache content closer to users. NOT a full data centre. There are hundreds worldwide — far more than Regions.",tip:"Edge Locations = CloudFront cache nodes. Not compute."},
    {q:"What is CapEx vs OpEx?",a:"CapEx (Capital Expenditure) = upfront purchase of hardware. OpEx (Operational Expenditure) = pay-as-you-go running costs. Cloud converts CapEx → OpEx.",tip:"CFO question: cloud means no big upfront hardware purchase."},
    {q:"What are the 3 cloud deployment models?",a:"1. Public Cloud — AWS, Azure, GCP. Infrastructure shared.\n2. Private Cloud — dedicated on-premises or hosted.\n3. Hybrid Cloud — mix of public + private/on-premises.",tip:"Hybrid = some on-prem + some cloud."},
    {q:"What are the 3 cloud service models?",a:"IaaS — you manage OS up (EC2)\nPaaS — AWS manages platform (Elastic Beanstalk)\nSaaS — AWS manages everything (Gmail-style)",tip:"EC2 = IaaS. Beanstalk = PaaS. Gmail = SaaS."},
    {q:"What is the AWS Well-Architected Framework?",a:"A set of best practices across 6 pillars:\n1. Operational Excellence\n2. Security\n3. Reliability\n4. Performance Efficiency\n5. Cost Optimisation\n6. Sustainability",tip:"OSRPCS — the 6 pillars. Sustainability was added in 2021."},
    {q:"What is the Shared Responsibility Model?",a:"AWS is responsible for security OF the cloud (hardware, facilities, hypervisor). Customer is responsible for security IN the cloud (data, IAM, OS patching, encryption).",tip:"'OF the cloud' vs 'IN the cloud' — exact phrase matters."},
    {q:"What does AWS Trusted Advisor check?",a:"5 categories: Cost Optimisation, Performance, Security, Fault Tolerance, Service Limits. Gives real-time recommendations for your account.",tip:"Free basic checks for all. Full checks need Business/Enterprise support."},
    {q:"What are the 4 AWS Support plans?",a:"1. Basic — free, documentation only\n2. Developer — email support, 1 contact\n3. Business — 24/7 phone/chat, full Trusted Advisor\n4. Enterprise — TAM, 24/7, concierge",tip:"TAM = Enterprise only. 24/7 phone/chat = Business minimum."},
    {q:"Which support plan includes a Technical Account Manager (TAM)?",a:"Enterprise Support plan. Enterprise On-Ramp provides a pool of TAMs (not dedicated). Enterprise gives you one dedicated TAM.",tip:"TAM = Enterprise. Pool of TAMs = Enterprise On-Ramp."},
    {q:"What is AWS Cost Explorer?",a:"A tool to visualise, understand and manage AWS costs and usage over time. Can forecast future spend and filter by service, region, or tag.",tip:"Cost Explorer = look BACK at spending. Budgets = set ALERTS."},
    {q:"What is AWS Budgets?",a:"Lets you set custom spending or usage thresholds and receive alerts when you approach or exceed them. Can trigger actions automatically.",tip:"Budgets = forward-looking alerts. Explorer = backward-looking analysis."},
    {q:"What is the AWS Free Tier?",a:"Three types:\n1. Always Free — e.g. Lambda 1M req/mo, DynamoDB 25GB\n2. 12 Months Free — e.g. 750hrs t2.micro EC2, 5GB S3\n3. Trials — short-term free trials for specific services",tip:"'Always Free' never expires. '12-Month Free' starts on signup."},
    {q:"What is the AWS Pricing Calculator?",a:"A free web tool to estimate the cost of AWS services before deploying. You model expected usage and it generates a monthly estimate.",tip:"BEFORE deploying = Pricing Calculator. AFTER deploying = Cost Explorer."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 2 — AWS Compute Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w2", week:2, title:"Week 2 · AWS Compute Services",
  color:"#FF9900", emoji:"🖥️",
  cards:[
    {q:"What is Amazon EC2?",a:"Elastic Compute Cloud — virtual servers in the cloud. You choose the OS, instance type, storage, and networking. It's IaaS — you manage the OS and above.",tip:"EC2 = your virtual machine. You patch it, you secure it."},
    {q:"What are the 5 EC2 pricing models?",a:"1. On-Demand — pay per second, no commitment\n2. Reserved — 1 or 3 yr commit, up to 72% off\n3. Spot — spare capacity, up to 90% off, interruptible\n4. Savings Plans — $/hr commit, up to 66% off\n5. Dedicated Host — physical server, BYOL",tip:"Spot = cheapest but can be interrupted. On-Demand = most flexible."},
    {q:"When should you use Spot Instances?",a:"For fault-tolerant, flexible workloads that can tolerate interruption: batch processing, image rendering, big data analysis. NOT for databases or critical apps.",tip:"2-minute warning before termination. Up to 90% discount."},
    {q:"When should you use Reserved Instances?",a:"For steady-state, predictable workloads running 24/7 — like a production database. Commit 1 or 3 years for up to 72% discount.",tip:"Reserved = you're sure it'll run constantly."},
    {q:"What is EC2 Auto Scaling?",a:"Automatically adds or removes EC2 instances based on demand (or a schedule). Ensures you have the right number of instances at all times. Works with ELB.",tip:"Scale OUT = add instances. Scale IN = remove instances."},
    {q:"What is AWS Lambda?",a:"Serverless compute — you upload code and AWS runs it in response to events. No servers to manage. Pay per millisecond of execution. Max 15 minutes per execution.",tip:"Lambda = event-driven, no server management, max 15 min."},
    {q:"What is Amazon ECS?",a:"Elastic Container Service — runs Docker containers on EC2 or Fargate. AWS-managed container orchestration. Good if you know Docker but don't need Kubernetes.",tip:"ECS = Docker on AWS. EKS = Kubernetes on AWS."},
    {q:"What is Amazon EKS?",a:"Elastic Kubernetes Service — managed Kubernetes. AWS runs the control plane. You manage worker nodes (or use Fargate). Best for teams already using K8s.",tip:"EKS = managed Kubernetes control plane."},
    {q:"What is AWS Fargate?",a:"Serverless compute engine for containers. Works with ECS or EKS. You define the container task — AWS provisions and manages the infrastructure. No EC2 to manage.",tip:"Fargate = serverless containers. No EC2 visibility."},
    {q:"What is AWS Elastic Beanstalk?",a:"PaaS — upload your code (Java, Python, Node, etc.) and Beanstalk handles deployment, capacity provisioning, load balancing, auto-scaling, and health monitoring.",tip:"Beanstalk = PaaS. You bring code, AWS does the rest."},
    {q:"What is horizontal vs vertical scaling?",a:"Horizontal (scale out/in) = add/remove instances of the same size.\nVertical (scale up/down) = change to a bigger/smaller instance type.\nCloud prefers horizontal — avoids single points of failure.",tip:"Exam: 'add more EC2 instances' = horizontal. 'upgrade RAM' = vertical."},
    {q:"What is a Load Balancer?",a:"Distributes incoming traffic across multiple targets (EC2, containers, Lambda) with health checks. ALB = Layer 7 (HTTP/HTTPS). NLB = Layer 4 (TCP/UDP). CLB = legacy.",tip:"ALB for web apps (URL routing). NLB for ultra-high performance TCP."},
    {q:"What is the difference between ALB and NLB?",a:"ALB (Application Load Balancer) = Layer 7, routes by URL path, host headers, HTTP method. Best for web apps and microservices.\nNLB (Network Load Balancer) = Layer 4, TCP/UDP, ultra-low latency, millions of req/sec.",tip:"ALB = smart HTTP routing. NLB = raw speed."},
    {q:"What is AWS Batch?",a:"Fully managed batch computing — runs hundreds of thousands of batch jobs without managing infrastructure. Dynamically provisions EC2/Spot based on job requirements.",tip:"Batch = large-scale batch jobs. Lambda = event-driven short tasks."},
    {q:"What is Amazon Lightsail?",a:"Simplified VPS (virtual private server) with pre-configured instances at a low fixed price. Ideal for simple websites, blogs, and dev environments. Easiest way into AWS.",tip:"Lightsail = simplest, cheapest option. Not for complex architectures."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 3 — AWS Storage Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w3", week:3, title:"Week 3 · AWS Storage Services",
  color:"#22C55E", emoji:"💾",
  cards:[
    {q:"What is Amazon S3?",a:"Simple Storage Service — object storage. Files stored in buckets. Accessible via HTTP/S. 11 nines durability (99.999999999%). No file system — objects have keys.",tip:"S3 = web-accessible object store. NOT a file system."},
    {q:"What are the S3 storage classes?",a:"Standard — frequent access\nIntelligent-Tiering — unknown access pattern, auto-tiers\nStandard-IA — infrequent access, lower cost\nOne Zone-IA — cheaper, single AZ\nGlacier Instant — archive, ms retrieval\nGlacier Flexible — archive, mins-hours\nGlacier Deep Archive — cheapest, 12hr retrieval",tip:"Glacier Deep Archive = cheapest long-term archive. 12-hour retrieval."},
    {q:"When to use S3 Glacier Deep Archive?",a:"For data accessed once or twice per year that must be retained for compliance (7-10+ years). Cheapest storage class. Retrieval takes up to 12 hours.",tip:"Legal records, compliance archives, old backups."},
    {q:"What is Amazon EBS?",a:"Elastic Block Store — block storage volume attached to ONE EC2 instance at a time. Stays in one AZ. Like a virtual hard drive. Persists after instance stops.",tip:"EBS = one EC2, one AZ. Like a USB drive."},
    {q:"What is EBS Snapshots?",a:"Point-in-time backup of an EBS volume stored in S3. Incremental — only changed blocks saved. Used to copy volumes across AZs or Regions.",tip:"Snapshot = backup of EBS. Stored in S3 (you don't see the bucket)."},
    {q:"What is Amazon EFS?",a:"Elastic File System — managed NFS (network file system). Can be mounted by MANY EC2 instances simultaneously across multiple AZs. Auto-scales. Linux only.",tip:"EFS = shared file system. Many EC2s can mount it. POSIX-compliant."},
    {q:"What is Instance Store?",a:"Temporary block storage physically attached to the EC2 host. Extremely fast. Data is LOST when the instance is stopped, terminated, or fails. Not for persistent data.",tip:"Instance Store = fastest but ephemeral. Lost on stop/terminate."},
    {q:"S3 vs EBS vs EFS — when to use each?",a:"S3 — web-accessible objects, static files, backups, data lakes\nEBS — OS volumes, databases on EC2, single-instance block storage\nEFS — shared file storage, multiple EC2s need same files simultaneously",tip:"Classic CLF-C02 scenario question. Know all three."},
    {q:"What is Amazon FSx?",a:"Managed file system service. FSx for Windows = SMB protocol, Windows workloads. FSx for Lustre = high-performance computing, ML, financial modelling.",tip:"FSx for Windows = Windows shares. FSx for Lustre = HPC/ML."},
    {q:"What is AWS Storage Gateway?",a:"Hybrid storage service connecting on-premises apps to AWS cloud storage. Locally caches frequently accessed data. Types: File, Volume, Tape Gateway.",tip:"Storage Gateway = bridge between on-prem and S3/EBS/Glacier."},
    {q:"What is AWS Snowball?",a:"Physical device for large offline data transfer to/from AWS. AWS ships it, you load data, ship it back. Snowball Edge has built-in compute. For 50-80TB migrations.",tip:"Snowball = physical truck for data. Use when internet too slow."},
    {q:"What is AWS Snowmobile?",a:"A 45-foot shipping container on a truck for exabyte-scale (100PB+) data transfers. AWS drives it to your data centre.",tip:"Snowmobile = for 100PB+. Actual truck with a container."},
    {q:"What is S3 versioning?",a:"Keeps multiple versions of an object in a bucket. Protects against accidental deletion and overwrites. Once enabled, can be suspended but not disabled.",tip:"Versioning = protect against accidental deletes. Can't fully disable once on."},
    {q:"What is S3 lifecycle policy?",a:"Automates transitioning objects between storage classes (e.g. Standard → Glacier after 90 days) or deleting objects after a set time. Reduces storage costs.",tip:"Lifecycle = automate moving old data to cheaper tiers."},
    {q:"What is S3 Transfer Acceleration?",a:"Speeds up uploads to S3 by routing through CloudFront edge locations. Useful for uploading large files from geographically distant locations.",tip:"Transfer Acceleration = fast upload via edge locations."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 4 — Database & Analytics Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w4", week:4, title:"Week 4 · Databases & Analytics",
  color:"#8B5CF6", emoji:"🗄️",
  cards:[
    {q:"What is Amazon RDS?",a:"Relational Database Service — managed SQL database. AWS handles provisioning, patching, backups, Multi-AZ failover. Supports MySQL, PostgreSQL, Oracle, SQL Server, MariaDB, Aurora.",tip:"RDS = managed relational DB. You still write SQL."},
    {q:"What is RDS Multi-AZ?",a:"Synchronously replicates your database to a standby in another AZ. Automatic failover in 1-2 minutes if primary fails. For HIGH AVAILABILITY, not read performance.",tip:"Multi-AZ = HA (failover). Read Replicas = performance (read scaling)."},
    {q:"What is RDS Read Replica?",a:"Asynchronous copy of your RDS database for read-only queries. Offloads read traffic from primary. Can be in a different Region. NOT for failover.",tip:"Read Replica = performance. Multi-AZ = availability. Know the difference."},
    {q:"What is Amazon Aurora?",a:"AWS cloud-native relational database. MySQL and PostgreSQL compatible. 5x faster than MySQL, 3x faster than PostgreSQL. Replicates 6 copies across 3 AZs automatically.",tip:"Aurora = fastest managed relational DB on AWS. Cloud-native."},
    {q:"What is Amazon DynamoDB?",a:"Fully managed, serverless NoSQL database. Key-value and document model. Single-digit millisecond latency. Auto-scales. No schema to manage. 99.999% availability.",tip:"DynamoDB = NoSQL, serverless, millisecond latency, auto-scales."},
    {q:"What is DynamoDB DAX?",a:"DynamoDB Accelerator — in-memory cache for DynamoDB. Reduces read latency from milliseconds to microseconds. Fully managed. No application code changes needed.",tip:"DAX = cache for DynamoDB. Microseconds, not milliseconds."},
    {q:"What is Amazon Redshift?",a:"Petabyte-scale data warehouse for analytical SQL queries on large datasets. OLAP (Online Analytical Processing). Best for business intelligence and reporting.",tip:"Redshift = data warehouse. OLAP. 'Analytical' or 'petabyte' = Redshift."},
    {q:"What is Amazon Athena?",a:"Serverless SQL query service — run SQL directly on data in S3. No database to load data into. Pay per query (per TB scanned). Uses Presto.",tip:"Athena = serverless SQL ON S3. No ETL, no loading data."},
    {q:"What is Amazon ElastiCache?",a:"Managed in-memory cache service. Supports Redis and Memcached. Reduces database read load by caching frequent queries. Sub-millisecond response.",tip:"ElastiCache = cache layer in front of database. Redis or Memcached."},
    {q:"What is Amazon DocumentDB?",a:"Managed document database compatible with MongoDB. Good for content management, catalogues, user profiles. AWS manages backups, scaling, patching.",tip:"DocumentDB = managed MongoDB-compatible database."},
    {q:"What is Amazon Kinesis?",a:"Real-time data streaming service. Kinesis Data Streams = collect and process streams. Kinesis Firehose = load streaming data into S3/Redshift/Elasticsearch. Kinesis Video Streams = video.",tip:"Kinesis = real-time streaming. 'IoT', 'clickstream', 'log streaming' = Kinesis."},
    {q:"What is Amazon Kinesis Data Firehose?",a:"Fully managed service to load streaming data into destinations like S3, Redshift, OpenSearch. Auto-scales. No administration. Near-real-time (60 second minimum buffer).",tip:"Firehose = streaming data → S3/Redshift automatically."},
    {q:"What is OLTP vs OLAP?",a:"OLTP (Online Transaction Processing) = many small transactions. Fast reads/writes. RDS, DynamoDB.\nOLAP (Online Analytical Processing) = complex queries on large datasets. Redshift.",tip:"OLAP/data warehouse/analytics = Redshift."},
    {q:"What is Amazon MemoryDB for Redis?",a:"Redis-compatible, durable in-memory database with microsecond reads and millisecond writes. Data persists across reboots (unlike ElastiCache). For primary databases.",tip:"MemoryDB = durable Redis. ElastiCache = Redis cache (can lose data)."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 5 — Networking & Content Delivery
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w5", week:5, title:"Week 5 · Networking & Content Delivery",
  color:"#3BA8FF", emoji:"🌐",
  cards:[
    {q:"What is a VPC?",a:"Virtual Private Cloud — your own isolated network in AWS. You define IP ranges (CIDR), subnets (public/private), route tables, internet gateways, and security rules.",tip:"VPC = your private section of AWS. Like your own data centre network."},
    {q:"What is a Subnet?",a:"A range of IP addresses within a VPC. Public subnet = has route to Internet Gateway (internet-accessible). Private subnet = no direct internet route.",tip:"Public subnet = internet access. Private subnet = no direct internet."},
    {q:"What is an Internet Gateway?",a:"Allows instances in a VPC to communicate with the public internet. Attached to a VPC. Required for a subnet to be 'public'.",tip:"Internet Gateway = door to the internet for a VPC."},
    {q:"What is a NAT Gateway?",a:"Allows instances in a PRIVATE subnet to access the internet outbound (for updates) without allowing inbound connections from the internet. Managed by AWS.",tip:"NAT Gateway = private subnet → internet (outbound only)."},
    {q:"What is a Security Group?",a:"Stateful virtual firewall at the EC2 instance level. ALLOW rules only (no deny). Return traffic is automatically allowed. Changes take effect immediately.",tip:"Security Group = stateful, instance level, allow only."},
    {q:"What is a Network ACL?",a:"Stateless firewall at the SUBNET level. Supports both ALLOW and DENY rules. Must explicitly allow return traffic. Rules evaluated in number order.",tip:"NACL = stateless, subnet level, allow AND deny."},
    {q:"Security Group vs Network ACL — key differences?",a:"Security Group: instance level, stateful, allow only, all rules evaluated.\nNACL: subnet level, stateless, allow+deny, rules in order.\nUse SGs for most security. NACLs for subnet-level IP blocking.",tip:"CLF-C02 loves this comparison. Know both sides."},
    {q:"What is Amazon Route 53?",a:"AWS managed DNS service. Translates domain names to IP addresses. Supports routing policies: Simple, Weighted, Latency, Failover, Geolocation, Multi-value. Also does domain registration.",tip:"Route 53 = DNS + health checks + smart routing. 53 = DNS port."},
    {q:"What is Amazon CloudFront?",a:"Content Delivery Network (CDN). Caches content at edge locations globally. Reduces latency for users worldwide. Integrates with S3, EC2, ALB, Lambda@Edge.",tip:"CloudFront = CDN. 'Low latency global delivery' = CloudFront."},
    {q:"What is AWS Direct Connect?",a:"Dedicated private physical network connection from your on-premises data centre to AWS. Bypasses the public internet. Lower latency, more consistent bandwidth.",tip:"Direct Connect = private leased line to AWS. Not internet-based."},
    {q:"What is AWS VPN?",a:"Creates an encrypted tunnel over the public internet between on-premises and AWS VPC. Cheaper than Direct Connect. Less consistent (uses internet).",tip:"VPN = encrypted internet tunnel. Direct Connect = private physical line."},
    {q:"What is AWS Global Accelerator?",a:"Improves performance of global apps by routing traffic through AWS global backbone network instead of the public internet. Provides static IPs. Not a CDN — routes TCP/UDP.",tip:"Global Accelerator = network performance via AWS backbone. Not caching."},
    {q:"What is Amazon API Gateway?",a:"Fully managed service to create, publish, maintain, monitor, and secure REST, HTTP, and WebSocket APIs. Integrates with Lambda for serverless backends.",tip:"API Gateway + Lambda = fully serverless API. Common architecture."},
    {q:"What is a VPC Peering connection?",a:"Direct private network connection between two VPCs. Traffic stays on AWS network. NOT transitive — if A peers B and B peers C, A cannot reach C through B.",tip:"VPC Peering = not transitive. Use Transit Gateway for hub-and-spoke."},
    {q:"What is AWS Transit Gateway?",a:"A network transit hub connecting multiple VPCs and on-premises networks through a central hub. Replaces complex VPC peering meshes. Fully managed.",tip:"Transit Gateway = hub for many VPCs. Peering = point-to-point."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 6 — AWS Security Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w6", week:6, title:"Week 6 · AWS Security Services",
  color:"#FFB020", emoji:"🛡️",
  cards:[
    {q:"What is AWS IAM?",a:"Identity and Access Management — controls WHO can do WHAT in AWS. Create Users, Groups, Roles, and Policies. Global service (not regional). Free.",tip:"IAM = the gatekeeper of AWS. Everything starts here."},
    {q:"What is an IAM User?",a:"An identity representing a person or application. Has long-term credentials (password + access keys). Best practice: each person = one IAM user.",tip:"IAM User = long-term credentials. Use MFA always."},
    {q:"What is an IAM Group?",a:"A collection of IAM users. Attach a policy to the group, all members inherit it. Groups cannot contain other groups. Simplifies permission management.",tip:"Groups = manage permissions at scale. Add user → inherits permissions."},
    {q:"What is an IAM Role?",a:"An identity with temporary credentials. Assumed by AWS services, EC2 instances, Lambda functions, or cross-account users. No permanent access keys stored.",tip:"Role = temporary VIP pass. ALWAYS use roles for EC2/Lambda apps."},
    {q:"What is an IAM Policy?",a:"A JSON document defining permissions (Allow/Deny actions on resources). Attached to users, groups, or roles. Identity-based or resource-based.",tip:"Policy = the permission document. Without a policy, nothing is allowed."},
    {q:"What is the principle of least privilege?",a:"Grant only the minimum permissions needed to perform a task. No more. Review regularly and remove unused permissions.",tip:"Least privilege = tightest possible permissions. Always exam-correct."},
    {q:"What is MFA in AWS?",a:"Multi-Factor Authentication — adds a second factor beyond password. Required for root account always. Strongly recommended for all IAM users. Supports virtual MFA apps and hardware tokens.",tip:"MFA = must enable on root account. Exam always says this."},
    {q:"What is AWS CloudTrail?",a:"Records every API call made in your AWS account — who made it, what they did, when, and from where. Log files delivered to S3. Enabled by default for 90 days.",tip:"CloudTrail = CCTV for your account. 'Who deleted X?' = CloudTrail."},
    {q:"What is Amazon CloudWatch?",a:"Monitoring and observability service. Collects metrics, logs, and events. Create alarms, dashboards. Trigger Auto Scaling. Monitor EC2 CPU, Lambda errors, etc.",tip:"CloudWatch = metrics and alarms. 'CPU usage', 'alarm threshold' = CloudWatch."},
    {q:"CloudTrail vs CloudWatch — difference?",a:"CloudTrail = WHO did WHAT (API activity audit log). Answer: 'who deleted the S3 bucket?'\nCloudWatch = HOW is the SYSTEM PERFORMING (metrics, logs, alarms). Answer: 'is CPU high?'",tip:"Classic exam trap. CloudTrail = audit. CloudWatch = performance."},
    {q:"What is Amazon GuardDuty?",a:"Managed threat detection using ML. Analyses CloudTrail logs, VPC Flow Logs, and DNS logs to detect threats like credential compromise or unusual API calls. No agents needed.",tip:"GuardDuty = AI security detective. Reads logs, finds threats."},
    {q:"What is Amazon Inspector?",a:"Automated security assessment for EC2 instances and ECR container images. Checks for software vulnerabilities (CVEs) and network exposure. Generates findings.",tip:"Inspector = vulnerability scanner for EC2 and containers."},
    {q:"What is Amazon Macie?",a:"Uses ML to discover, classify, and protect sensitive data (PII — names, credit cards, SSNs) in Amazon S3. Automated data privacy service.",tip:"Macie = PII/sensitive data detective in S3."},
    {q:"What is AWS Security Hub?",a:"Aggregates security findings from GuardDuty, Inspector, Macie, IAM Access Analyzer, and third-party tools into a single pane. Checks against security standards.",tip:"Security Hub = dashboard of all security findings from other tools."},
    {q:"What is AWS Shield?",a:"DDoS protection service. Shield Standard = free, automatic, protects all AWS customers. Shield Advanced = paid ~$3,000/month, enhanced protection, 24/7 DDoS response team.",tip:"Shield Standard = free for everyone. Advanced = paid, for high-risk apps."},
    {q:"What is AWS WAF?",a:"Web Application Firewall. Protects HTTP/HTTPS applications from Layer 7 attacks: SQL injection, XSS, bad bots, IP blocking. Works with CloudFront, ALB, API Gateway.",tip:"WAF = Layer 7 web protection. Shield = Layer 3/4 DDoS."},
    {q:"What is AWS KMS?",a:"Key Management Service — create, manage, and rotate encryption keys. Integrates with S3, EBS, RDS, DynamoDB. Customer Managed Keys (CMK) or AWS Managed Keys.",tip:"KMS = managed encryption keys. 'encrypt at rest' = KMS."},
    {q:"What is AWS Secrets Manager?",a:"Stores and auto-rotates secrets like database passwords and API keys using Lambda. Avoids hardcoding credentials in code.",tip:"Secrets Manager = auto-rotate passwords. 'rotate secret' = Secrets Manager."},
    {q:"What is AWS Artifact?",a:"Self-service portal for downloading AWS compliance reports (SOC 1/2/3, ISO 27001, PCI DSS) and managing agreements. No cost.",tip:"Artifact = compliance certificates and reports. 'SOC report' = Artifact."},
    {q:"What is Amazon Detective?",a:"Analyses security findings from GuardDuty and other sources to investigate root causes using ML graphs. Answer: 'investigate WHO caused this security incident'.",tip:"Detective = investigate root cause of security findings. After GuardDuty alerts."},
    {q:"What is Amazon Cognito?",a:"User identity service for web and mobile apps. Supports social sign-in (Google, Facebook), SAML, and custom auth. User Pools = auth. Identity Pools = AWS access.",tip:"Cognito = user auth for YOUR app. Not IAM — that's for AWS console access."},
    {q:"What is AWS IAM Identity Center (SSO)?",a:"Centralised Single Sign-On for multiple AWS accounts and business apps. Users log in once and get access to all permitted accounts/apps.",tip:"Identity Center = SSO across many AWS accounts and apps."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 7 — Management Tools
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w7", week:7, title:"Week 7 · Management Tools",
  color:"#22C55E", emoji:"🔧",
  cards:[
    {q:"What is AWS CloudFormation?",a:"Infrastructure as Code (IaC) service. Define AWS resources in JSON or YAML templates. CloudFormation provisions and manages them as a stack. Free (pay for resources only).",tip:"CloudFormation = IaC. 'Template', 'stack', 'JSON/YAML' = CloudFormation."},
    {q:"What is a CloudFormation Stack?",a:"A collection of AWS resources managed as a single unit. Created from a template. If stack creation fails, CloudFormation rolls back automatically.",tip:"Stack = all resources from one template. Delete stack = delete all resources."},
    {q:"What is AWS Config?",a:"Records configuration changes to AWS resources over time. Evaluates resources against compliance rules. Answers: 'what did my S3 bucket look like last Tuesday?'",tip:"Config = configuration history and compliance rules. Not API calls — that's CloudTrail."},
    {q:"What is AWS Systems Manager?",a:"Operational management for EC2 and hybrid environments. Patch Manager (automate OS patching), Session Manager (browser-based shell), Parameter Store (config data), Run Command.",tip:"Systems Manager = operational toolkit. Patch, connect, automate."},
    {q:"What is AWS Control Tower?",a:"Automates the setup of a secure, multi-account AWS environment (landing zone). Applies best practices using Account Factory, guardrails, and dashboards.",tip:"Control Tower = automated landing zone. Governance from day one."},
    {q:"What is AWS Organizations?",a:"Groups multiple AWS accounts into an organisational hierarchy. Enables consolidated billing (one bill for all accounts), Service Control Policies (SCPs), and central governance.",tip:"Organizations = manage many accounts centrally. Billing + governance."},
    {q:"What is a Service Control Policy (SCP)?",a:"A policy in AWS Organizations applied at the account or OU level. Acts as a guardrail — overrides even AdministratorAccess. Can DENY actions across all accounts in an OU.",tip:"SCP = maximum permission guardrail. Even admins can't bypass it."},
    {q:"What is AWS Service Catalog?",a:"Allows organisations to create and manage approved catalogs of IT products (CloudFormation templates). Users can self-service deploy only approved products.",tip:"Service Catalog = approved self-service menu of AWS solutions."},
    {q:"What is the AWS Management Console?",a:"Web-based graphical interface for managing AWS services. Accessible via browser. Good for exploration and manual tasks. Not for automation — use CLI/SDK for that.",tip:"Console = GUI. For automation: use CLI, SDK, or CloudFormation."},
    {q:"What is the AWS CLI?",a:"Command-line tool for interacting with AWS services. Used in scripts, automation, CI/CD. Requires access keys or role credentials. Available on Windows, macOS, Linux.",tip:"CLI = programmatic access via terminal. Great for scripting."},
    {q:"What is the AWS SDK?",a:"Software Development Kits — libraries for calling AWS from application code. Available in Python (boto3), Java, JavaScript, .NET, Go, etc.",tip:"SDK = call AWS from your code. boto3 = Python SDK."},
    {q:"What is AWS Trusted Advisor?",a:"Real-time recommendations across 5 pillars: Cost Optimisation, Performance, Security, Fault Tolerance, Service Limits. Free basic checks. Full access needs Business/Enterprise support.",tip:"Trusted Advisor = automated best-practice advisor for your account."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 8 — Application & Migration Services
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w8", week:8, title:"Week 8 · Application & Migration Services",
  color:"#FF9900", emoji:"🚀",
  cards:[
    {q:"What is Amazon SQS?",a:"Simple Queue Service — managed message queue. Producers push messages; consumers poll and process them. One message processed by ONE consumer. Decouples systems. Unlimited throughput.",tip:"SQS = one-to-one queue. 'Decouple' = SQS. 'Fan out' = SNS."},
    {q:"What is Amazon SNS?",a:"Simple Notification Service — pub/sub messaging. ONE publisher, MANY subscribers (email, SMS, Lambda, SQS, HTTP). Instant push delivery. Fan-out pattern.",tip:"SNS = one-to-many broadcast. 'Notifications', 'fan-out' = SNS."},
    {q:"SQS vs SNS — key difference?",a:"SQS = message queue, one consumer processes each message, polling model, decoupling.\nSNS = pub/sub, all subscribers get every message, push model, fan-out.",tip:"SQS + SNS together = fan-out to multiple queues (common architecture)."},
    {q:"What is Amazon EventBridge?",a:"Serverless event bus. Routes events from AWS services, SaaS apps, and your own apps to targets like Lambda, SQS, SNS. Replaces CloudWatch Events.",tip:"EventBridge = event-driven routing. 'Event bus', 'SaaS integration' = EventBridge."},
    {q:"What is AWS Step Functions?",a:"Serverless workflow orchestration. Coordinate multiple Lambda functions and AWS services into a visual workflow (state machine). Handles retries, error handling, and parallel execution.",tip:"Step Functions = orchestrate Lambda + services into a workflow."},
    {q:"What is AWS DMS?",a:"Database Migration Service — migrates databases to AWS with minimal downtime. Supports homogeneous (MySQL → RDS MySQL) and heterogeneous (Oracle → Aurora) migrations.",tip:"DMS = migrate databases. 'Minimal downtime' = DMS."},
    {q:"What is AWS DataSync?",a:"Automated, fast data transfer between on-premises storage and AWS (S3, EFS, FSx). Up to 10x faster than open-source tools. Scheduled or one-time transfers.",tip:"DataSync = fast automated file transfer to AWS."},
    {q:"What is AWS Transfer Family?",a:"Managed file transfer service using SFTP, FTP, or FTPS protocols directly into S3 or EFS. No server to manage.",tip:"Transfer Family = SFTP/FTP → S3/EFS. For legacy file transfer workflows."},
    {q:"What are the 7 Rs of cloud migration?",a:"Retire, Retain, Rehost (Lift & Shift), Replatform (Lift, Tinker & Shift), Repurchase (Drop & Shop), Refactor/Re-architect, Relocate",tip:"Exam: 'no code changes' = Rehost. 'move to RDS' = Replatform. 'cloud-native redesign' = Refactor."},
    {q:"What is Rehosting (Lift and Shift)?",a:"Moving applications to cloud with NO changes to architecture or code. Fastest migration strategy. Doesn't take advantage of cloud-native features.",tip:"Rehost = copy-paste to cloud. Quickest but least optimised."},
    {q:"What is Replatforming?",a:"Minor optimisations to take advantage of cloud without full re-architecture. Example: moving from MySQL on EC2 to Amazon RDS. Some code/config changes.",tip:"Replatform = small improvement. MySQL on EC2 → RDS = replatform."},
    {q:"What is Refactoring?",a:"Redesigning the application from scratch to be cloud-native — using microservices, containers, serverless. Most expensive migration. Highest long-term benefit.",tip:"Refactor = full cloud-native redesign. Most effort, most benefit."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 9 — Developer Tools & Machine Learning
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w9", week:9, title:"Week 9 · Developer Tools & ML",
  color:"#8B5CF6", emoji:"🤖",
  cards:[
    {q:"What is AWS CodePipeline?",a:"CI/CD pipeline orchestration service. Automates build, test, and deploy stages. Integrates with CodeCommit, CodeBuild, CodeDeploy, and third-party tools like GitHub.",tip:"CodePipeline = CI/CD orchestration. Source → Build → Test → Deploy."},
    {q:"What is Amazon SageMaker?",a:"Fully managed ML platform. Build, train, and deploy machine learning models at scale. Includes Jupyter notebooks, automatic model tuning, and one-click deployment.",tip:"SageMaker = end-to-end ML platform."},
    {q:"What is Amazon Rekognition?",a:"Image and video analysis using deep learning. Detects objects, faces, text, scenes. Face comparison, content moderation, celebrity recognition. No ML knowledge needed.",tip:"Rekognition = image/video AI. 'Detect faces', 'moderate content' = Rekognition."},
    {q:"What is Amazon Polly?",a:"Converts text to natural-sounding speech (text-to-speech). Supports many languages and voices. Useful for accessibility and voice-enabled apps.",tip:"Polly = text → speech."},
    {q:"What is Amazon Comprehend?",a:"Natural Language Processing (NLP) service. Finds insights in text: sentiment analysis, entity recognition, topic modelling, language detection.",tip:"Comprehend = understand text. Sentiment, entities, language = Comprehend."},
    {q:"What is Amazon Textract?",a:"Automatically extracts text and data from scanned documents. Goes beyond OCR — understands forms and tables. Used for processing invoices, medical records, etc.",tip:"Textract = OCR++ for forms and tables."},
    {q:"What is Amazon Kendra?",a:"Intelligent enterprise search powered by ML. Understands natural language queries and returns specific answers from documents (not just links).",tip:"Kendra = smart enterprise search. Understands questions, returns answers."},
    {q:"What is Amazon Personalize?",a:"Real-time personalisation and recommendations service. Same ML technology used by Amazon.com. No ML expertise needed. Used for product recommendations, content ranking.",tip:"Personalize = recommendations engine. 'Product recommendations' = Personalize."},
    {q:"What is Amazon Connect?",a:"Cloud-based contact centre service. Set up a call centre in minutes. Pay per minute. Integrates with CRM systems. Includes AI features (chatbots, speech analysis).",tip:"Connect = cloud call centre."},
    {q:"What is AWS X-Ray?",a:"Distributed tracing service. Helps debug and analyse microservices applications. Shows request paths, identifies bottlenecks, and highlights errors across services.",tip:"X-Ray = distributed tracing. 'Debug microservices', 'trace requests' = X-Ray."},
    {q:"What is Generative AI on AWS?",a:"Amazon Bedrock = access foundation models (Claude, Llama, Titan) via API, no ML training needed. Amazon Q = AI assistant for coding and AWS questions. Used for content gen, summarisation.",tip:"Bedrock = foundation models as a service. Q = AI coding/AWS assistant."},
    {q:"What is AWS CodeBuild?",a:"Fully managed build service. Compiles source code, runs tests, produces deployment packages. No build servers to manage. Pay per build minute.",tip:"CodeBuild = managed build service. Part of CI/CD pipeline."},
  ]
},

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK 10 — Exam Prep: Tricky Scenarios & Distinctions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{
  id:"w10", week:10, title:"Week 10 · Exam Prep — Tricky Questions",
  color:"#EF4444", emoji:"🎯",
  cards:[
    {q:"EXAM TRAP: What service do you check if you want to know WHO deleted an S3 bucket?",a:"AWS CloudTrail — it records every API call including who made it, when, and from where. NOT CloudWatch (that's performance metrics).",tip:"WHO + API action = CloudTrail. Always."},
    {q:"EXAM TRAP: Which service runs Docker containers WITHOUT managing servers?",a:"AWS Fargate — serverless container runtime. ECS + Fargate = no EC2 to manage. ECS + EC2 = you manage the EC2 instances.",tip:"'Serverless containers' = Fargate. 'Containers on EC2' = ECS with EC2 launch type."},
    {q:"EXAM TRAP: What is the minimum support plan for 24/7 phone support?",a:"Business Support. Developer has email only (business hours). Basic has documentation only.",tip:"24/7 phone = Business minimum. TAM = Enterprise."},
    {q:"EXAM TRAP: S3 Standard-IA vs S3 One Zone-IA?",a:"Standard-IA = replicated across 3+ AZs, still highly available. One Zone-IA = single AZ, cheaper but loses data if that AZ fails. Use One Zone-IA for reproducible data.",tip:"One Zone = cheaper, single AZ, can lose data. Standard-IA = resilient."},
    {q:"EXAM TRAP: Can you SSH into a Lambda function?",a:"No. Lambda is serverless — there are no servers to SSH into. You only provide the function code. AWS manages all infrastructure.",tip:"Serverless = no SSH. No server visibility at all."},
    {q:"EXAM TRAP: Does CloudFront cache DATABASE queries?",a:"No. CloudFront caches static/dynamic content (HTML, images, videos). ElastiCache caches database query results.",tip:"CloudFront = CDN cache. ElastiCache = database cache."},
    {q:"EXAM TRAP: IAM Role vs IAM User for an EC2 application?",a:"Always use an IAM ROLE for applications running on EC2. Never store access keys on an EC2 instance. Roles provide temporary credentials that rotate automatically.",tip:"App on EC2 = Role. Human logging in = User."},
    {q:"EXAM TRAP: Reserved Instances vs Savings Plans?",a:"Reserved Instances = commit to specific instance type + region. Savings Plans = commit to $/hr of compute spend, flexible across instance types, regions, and even Lambda/Fargate.",tip:"Savings Plans = more flexible than Reserved Instances."},
    {q:"EXAM TRAP: Which service gives you the LOWEST latency for database queries?",a:"DynamoDB DAX — microsecond latency in-memory cache for DynamoDB. ElastiCache is also fast but serves general caching. DAX is DynamoDB-specific.",tip:"Microsecond = DAX. Millisecond = DynamoDB. Sub-ms = ElastiCache/MemoryDB."},
    {q:"EXAM TRAP: Can you use AWS Shield Standard without paying extra?",a:"Yes. Shield Standard is automatically enabled for ALL AWS customers at no extra cost. Protects against common Layer 3/4 DDoS attacks.",tip:"Shield Standard = free, automatic, everyone gets it."},
    {q:"EXAM TRAP: What is an AWS Local Zone?",a:"An extension of an AWS Region placed near large population centres. Provides single-digit millisecond latency to end users for specific workloads. Not the same as an AZ.",tip:"Local Zone = Region extension near cities. For ultra-low latency apps."},
    {q:"EXAM TRAP: Which pricing model is MOST cost-effective for a workload running 24/7 for 3 years?",a:"Reserved Instances (3-year term) or Savings Plans — both offer up to 72% discount. Spot would be cheapest but can be INTERRUPTED, not suitable for 24/7.",tip:"Steady 24/7 = Reserved or Savings Plans. Not Spot — it can be interrupted."},
    {q:"EXAM TRAP: What is the AWS Acceptable Use Policy?",a:"Defines the terms under which you can use AWS services. Prohibits illegal, harmful, or abusive use. All customers must comply.",tip:"AUP = rules of using AWS. Distinct from the Shared Responsibility Model."},
    {q:"EXAM TRAP: What is an AWS Local Zone vs Wavelength Zone?",a:"Local Zone = extension near population centres for low-latency apps.\nWavelength Zone = embedded in 5G telecom networks for ultra-low-latency mobile/IoT apps.",tip:"Wavelength = 5G telecom edge. Local Zone = near-city compute."},
    {q:"EXAM TRAP: Can an S3 bucket be accessed publicly by default?",a:"No. S3 buckets are PRIVATE by default. Public access is blocked. You must explicitly configure bucket policies or ACLs to allow public access.",tip:"S3 default = private. Must explicitly open it."},
    {q:"EXAM TRAP: What is AWS Organisations Consolidated Billing benefit?",a:"1. Single bill across all accounts\n2. Aggregate usage = volume discounts (tiered pricing)\n3. Reserved Instance/Savings Plans benefits shared across accounts",tip:"Consolidated billing = one bill + volume discounts shared."},
  ]
},

];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WEEK CURRICULUM DATA (for Study Roadmap)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.CURRICULUM_WEEKS = [
  {week:1, title:"Introduction to AWS", topics:["Cloud Computing Concepts","AWS Global Infrastructure","Well-Architected Framework","Shared Responsibility Model","Billing & Support Plans"], domain:"Cloud Concepts"},
  {week:2, title:"AWS Compute Services", topics:["EC2 & Pricing Models","Lambda (Serverless)","ECS, EKS, Fargate (Containers)","Elastic Beanstalk (PaaS)","Auto Scaling & Load Balancing"], domain:"Cloud Technology and Services"},
  {week:3, title:"AWS Storage Services", topics:["S3 & Storage Classes","EBS Block Storage","EFS Shared File System","Storage Gateway (Hybrid)","Snowball & DataSync"], domain:"Cloud Technology and Services"},
  {week:4, title:"Databases & Analytics", topics:["RDS & Aurora (Relational)","DynamoDB (NoSQL)","Redshift (Data Warehouse)","Athena & Kinesis","ElastiCache & DAX"], domain:"Cloud Technology and Services"},
  {week:5, title:"Networking & Content Delivery", topics:["VPC, Subnets, Route Tables","Security Groups vs NACLs","CloudFront (CDN)","Route 53 (DNS)","Direct Connect & VPN"], domain:"Cloud Technology and Services"},
  {week:6, title:"AWS Security Services", topics:["IAM Users, Roles, Policies","CloudTrail & CloudWatch","GuardDuty & Inspector","KMS & Secrets Manager","Shield, WAF & Organizations"], domain:"Security and Compliance"},
  {week:7, title:"Management Tools", topics:["CloudFormation (IaC)","AWS Config (Compliance)","Systems Manager","Control Tower","Trusted Advisor"], domain:"Cloud Technology and Services"},
  {week:8, title:"Application & Migration", topics:["SQS & SNS (Messaging)","EventBridge & Step Functions","DMS (Database Migration)","7 Rs Migration Strategies","DataSync & Transfer Family"], domain:"Cloud Technology and Services"},
  {week:9, title:"Developer Tools & ML", topics:["CodePipeline / CI-CD","SageMaker (ML Platform)","Rekognition, Polly, Comprehend","Amazon Kendra & Personalize","X-Ray Distributed Tracing"], domain:"Cloud Technology and Services"},
  {week:10, title:"Exam Preparation", topics:["Domain 1 Quiz (Cloud Concepts 24%)","Domain 2 Quiz (Security 30%)","Domain 3 Quiz (Tech & Services 34%)","Domain 4 Quiz (Billing 12%)","10 Full Mock Exams"], domain:"All Domains"},
];
