# Add rationale to external-questions.js using a comprehensive AWS knowledge base
# Generates "why correct" and "why each wrong option is wrong" for every question

$ProgressPreference = 'SilentlyContinue'

# ═══════════════════════════════════════════════════════════════════
#  AWS SERVICE KNOWLEDGE BASE
# ═══════════════════════════════════════════════════════════════════
$KB = @{
'AWS Management Console' = 'a web-based interface for managing AWS services'
'AWS CLI' = 'a command-line tool for managing AWS services via scripts'
'AWS SDK' = 'libraries for accessing AWS services from application code in various programming languages'
'AWS API' = 'the low-level REST API for programmatic access to AWS services'
'Amazon EC2' = 'virtual servers (instances) in the cloud. You manage the OS, applications and configuration. It is IaaS.'
'EC2' = 'virtual servers (instances) in the cloud. You manage the OS, applications and configuration. It is IaaS.'
'Amazon EC2 Auto Scaling' = 'automatically adds or removes EC2 instances based on demand to match required capacity'
'Auto Scaling' = 'automatically adds or removes EC2 instances based on demand to match required capacity'
'Amazon S3' = 'object storage that stores files as objects in buckets. Virtually unlimited capacity. Accessed via HTTP. 99.999999999% durability.'
'S3' = 'object storage that stores files as objects in buckets. Virtually unlimited capacity. Accessed via HTTP.'
'Amazon EBS' = 'block storage attached to a single EC2 instance like a virtual hard drive. Tied to one AZ. Good for databases and boot volumes.'
'EBS' = 'block storage attached to a single EC2 instance like a virtual hard drive. Tied to one AZ. Good for databases and boot volumes.'
'Amazon EFS' = 'a managed NFS file system that multiple EC2 instances can mount simultaneously. Auto-scales capacity. Good for shared file storage.'
'EFS' = 'a managed NFS file system that multiple EC2 instances can mount simultaneously. Auto-scales capacity. Good for shared file storage.'
'Amazon Instance Store' = 'ephemeral physical storage on the EC2 host. Data is lost when the instance stops or terminates'
'Instance Store' = 'ephemeral physical storage on the EC2 host. Data is lost when the instance stops or terminates'
'Amazon RDS' = 'a managed relational database service. AWS handles patching, backups, failover and OS maintenance. Supports MySQL, PostgreSQL, Oracle, SQL Server.'
'RDS' = 'a managed relational database service. AWS handles patching, backups, failover and OS maintenance. Supports MySQL, PostgreSQL, Oracle, SQL Server.'
'Amazon Aurora' = 'AWS cloud-native relational database. MySQL/PostgreSQL compatible. Delivers up to 5x MySQL throughput. Auto-replicates across 3 AZs in 6 copies.'
'Aurora' = 'AWS cloud-native relational database. MySQL/PostgreSQL compatible. Delivers up to 5x MySQL throughput. Auto-replicates across 3 AZs in 6 copies.'
'Amazon DynamoDB' = 'a fully managed serverless NoSQL database (key-value and document). Single-digit millisecond latency at any scale. Auto-scales throughput.'
'DynamoDB' = 'a fully managed serverless NoSQL database (key-value and document). Single-digit millisecond latency at any scale. Auto-scales throughput.'
'DAX' = 'DynamoDB Accelerator, an in-memory cache for DynamoDB that reduces response times from milliseconds to microseconds'
'Amazon Redshift' = 'a managed petabyte-scale data warehouse for running analytical SQL queries on large datasets using columnar storage'
'Redshift' = 'a managed petabyte-scale data warehouse for running analytical SQL queries on large datasets using columnar storage'
'Amazon ElastiCache' = 'a managed in-memory caching service (Redis or Memcached) that reduces database read load by caching frequent query results'
'ElastiCache' = 'a managed in-memory caching service (Redis or Memcached) that reduces database read load by caching frequent query results'
'Amazon Neptune' = 'a managed graph database for highly connected data like social networks, fraud detection and recommendation engines'
'Amazon DocumentDB' = 'a managed document database compatible with MongoDB'
'Amazon QLDB' = 'a managed ledger database that provides an immutable, cryptographically verifiable transaction log'
'AWS Lambda' = 'a serverless compute service that runs code in response to events without provisioning servers. Pay only for execution time. No server management.'
'Lambda' = 'a serverless compute service that runs code in response to events without provisioning servers. Pay only for execution time. No server management.'
'Amazon ECS' = 'container orchestration that runs Docker containers on EC2 or Fargate. You manage the cluster on EC2 launch type.'
'ECS' = 'container orchestration that runs Docker containers on EC2 or Fargate. You manage the cluster on EC2 launch type.'
'Amazon EKS' = 'managed Kubernetes service. AWS manages the control plane across multiple AZs. You manage worker nodes or use Fargate.'
'EKS' = 'managed Kubernetes service. AWS manages the control plane across multiple AZs. You manage worker nodes or use Fargate.'
'AWS Fargate' = 'a serverless compute engine for containers. You define the container task; AWS manages the underlying infrastructure. No EC2 to manage.'
'Fargate' = 'a serverless compute engine for containers. You define the container task; AWS manages the underlying infrastructure. No EC2 to manage.'
'AWS Elastic Beanstalk' = 'a PaaS service that deploys and manages web applications automatically. You upload code; AWS handles capacity, load balancing, auto-scaling and monitoring.'
'Elastic Beanstalk' = 'a PaaS service that deploys and manages web applications automatically. You upload code; AWS handles capacity, load balancing, auto-scaling and monitoring.'
'Amazon Lightsail' = 'a simplified VPS service with pre-configured instances. Easiest way to launch simple websites like WordPress.'
'Lightsail' = 'a simplified VPS service with pre-configured instances. Easiest way to launch simple websites like WordPress.'
'AWS Batch' = 'a service for running thousands of batch computing jobs dynamically provisioning compute resources'
'Amazon VPC' = 'a virtual private cloud — a logically isolated network in AWS where you define IP ranges, subnets, route tables and gateways'
'VPC' = 'a virtual private cloud — a logically isolated network in AWS where you define IP ranges, subnets, route tables and gateways'
'Security Group' = 'a stateful virtual firewall at the EC2 instance level. Allow rules only. Return traffic automatically allowed.'
'security group' = 'a stateful virtual firewall at the EC2 instance level. Allow rules only. Return traffic automatically allowed.'
'Security Groups' = 'a stateful virtual firewall at the EC2 instance level. Allow rules only. Return traffic automatically allowed.'
'Network ACL' = 'a stateless subnet-level firewall. Both allow and deny rules. You must explicitly allow return traffic.'
'NACL' = 'a stateless subnet-level firewall. Both allow and deny rules. You must explicitly allow return traffic.'
'Network ACLs' = 'a stateless subnet-level firewall. Both allow and deny rules. You must explicitly allow return traffic.'
'Amazon Route 53' = 'a managed DNS service that translates domain names to IP addresses. Supports routing policies: latency, geolocation, failover, weighted.'
'Route 53' = 'a managed DNS service that translates domain names to IP addresses. Supports routing policies: latency, geolocation, failover, weighted.'
'Amazon CloudFront' = 'a CDN that caches content at edge locations globally to reduce latency for end users. Distributes content with high transfer speeds.'
'CloudFront' = 'a CDN that caches content at edge locations globally to reduce latency for end users. Distributes content with high transfer speeds.'
'Elastic Load Balancing' = 'distributes incoming traffic across multiple targets (EC2, containers, Lambda). Performs health checks and routes only to healthy targets.'
'ELB' = 'distributes incoming traffic across multiple targets (EC2, containers, Lambda). Performs health checks and routes only to healthy targets.'
'Application Load Balancer' = 'a Layer 7 load balancer that routes HTTP/HTTPS traffic based on URL path, host headers or query strings'
'ALB' = 'a Layer 7 load balancer that routes HTTP/HTTPS traffic based on URL path, host headers or query strings'
'Network Load Balancer' = 'a Layer 4 load balancer for TCP/UDP traffic requiring ultra-high performance'
'NLB' = 'a Layer 4 load balancer for TCP/UDP traffic requiring ultra-high performance'
'Classic Load Balancer' = 'the legacy ELB that supports both Layer 4 and Layer 7 but lacks content-based routing'
'Amazon SQS' = 'a managed message queue that decouples application components. One consumer processes each message. Messages persist until consumed.'
'SQS' = 'a managed message queue that decouples application components. One consumer processes each message. Messages persist until consumed.'
'Amazon SNS' = 'a pub/sub notification service that fans out messages to multiple subscribers (email, SMS, Lambda, SQS) simultaneously'
'SNS' = 'a pub/sub notification service that fans out messages to multiple subscribers (email, SMS, Lambda, SQS) simultaneously'
'Amazon SES' = 'an email sending service for transactional and marketing emails to 200+ countries'
'SES' = 'an email sending service for transactional and marketing emails to 200+ countries'
'Amazon Kinesis' = 'a real-time data streaming service for IoT, clickstreams and log aggregation at massive scale'
'Kinesis' = 'a real-time data streaming service for IoT, clickstreams and log aggregation at massive scale'
'AWS Step Functions' = 'a serverless workflow orchestration service that coordinates multi-step processes using state machines'
'Step Functions' = 'a serverless workflow orchestration service that coordinates multi-step processes using state machines'
'Amazon API Gateway' = 'a service for creating, publishing and securing REST, HTTP and WebSocket APIs that connect to backend services'
'API Gateway' = 'a service for creating, publishing and securing REST, HTTP and WebSocket APIs that connect to backend services'
'AWS CloudTrail' = 'records all API calls made in your AWS account — the audit trail showing who did what, when, and from where. Logs go to S3.'
'CloudTrail' = 'records all API calls made in your AWS account — the audit trail showing who did what, when, and from where. Logs go to S3.'
'Amazon CloudWatch' = 'a monitoring service that collects metrics, stores logs, creates dashboards and triggers alarms when thresholds are breached'
'CloudWatch' = 'a monitoring service that collects metrics, stores logs, creates dashboards and triggers alarms when thresholds are breached'
'AWS Config' = 'records resource configuration changes over time and evaluates them against compliance rules. Can auto-remediate non-compliant resources.'
'Config' = 'records resource configuration changes over time and evaluates them against compliance rules. Can auto-remediate non-compliant resources.'
'AWS Trusted Advisor' = 'provides best-practice recommendations across cost optimisation, performance, security, fault tolerance and service limits'
'Trusted Advisor' = 'provides best-practice recommendations across cost optimisation, performance, security, fault tolerance and service limits'
'Amazon Inspector' = 'automated vulnerability scanning for EC2 instances and container images in ECR. Finds CVEs and network exposure.'
'Inspector' = 'automated vulnerability scanning for EC2 instances and container images in ECR. Finds CVEs and network exposure.'
'Amazon GuardDuty' = 'a managed threat detection service that uses ML to analyse CloudTrail, VPC Flow Logs and DNS logs for suspicious activity'
'GuardDuty' = 'a managed threat detection service that uses ML to analyse CloudTrail, VPC Flow Logs and DNS logs for suspicious activity'
'Amazon Macie' = 'uses ML to discover, classify and protect sensitive data (PII, financial data) stored in Amazon S3'
'Macie' = 'uses ML to discover, classify and protect sensitive data (PII, financial data) stored in Amazon S3'
'AWS Security Hub' = 'aggregates security findings from GuardDuty, Inspector, Macie and third-party tools into a single dashboard'
'Security Hub' = 'aggregates security findings from GuardDuty, Inspector, Macie and third-party tools into a single dashboard'
'Amazon Detective' = 'investigates the root cause of security findings using ML and graph analysis of log data'
'Detective' = 'investigates the root cause of security findings using ML and graph analysis of log data'
'AWS Shield' = 'DDoS protection. Standard is free and automatic. Advanced costs ~$3000/month and adds 24/7 DRT and financial protection.'
'Shield' = 'DDoS protection. Standard is free and automatic. Advanced costs ~$3000/month and adds 24/7 DRT and financial protection.'
'AWS WAF' = 'a web application firewall that inspects HTTP/HTTPS requests and blocks SQL injection, XSS and other Layer 7 attacks'
'WAF' = 'a web application firewall that inspects HTTP/HTTPS requests and blocks SQL injection, XSS and other Layer 7 attacks'
'AWS KMS' = 'a managed service for creating, storing, rotating and deleting encryption keys. Integrates with S3, RDS, EBS and more.'
'KMS' = 'a managed service for creating, storing, rotating and deleting encryption keys. Integrates with S3, RDS, EBS and more.'
'AWS CloudHSM' = 'dedicated single-tenant hardware security modules for FIPS 140-2 Level 3 compliance. Customer controls keys exclusively.'
'CloudHSM' = 'dedicated single-tenant hardware security modules for FIPS 140-2 Level 3 compliance. Customer controls keys exclusively.'
'AWS Secrets Manager' = 'stores and automatically rotates secrets like database passwords and API keys. Integrates with RDS for auto-rotation.'
'Secrets Manager' = 'stores and automatically rotates secrets like database passwords and API keys. Integrates with RDS for auto-ration.'
'AWS Certificate Manager' = 'provisions and manages SSL/TLS certificates for use with CloudFront and Load Balancers. Free for AWS-integrated use.'
'ACM' = 'provisions and manages SSL/TLS certificates for use with CloudFront and Load Balancers. Free for AWS-integrated use.'
'AWS Artifact' = 'a self-service portal for downloading AWS compliance reports (SOC, ISO, PCI) and agreements'
'Artifact' = 'a self-service portal for downloading AWS compliance reports (SOC, ISO, PCI) and agreements'
'AWS IAM' = 'Identity and Access Management — manages users, groups, roles and policies. Controls who can access which AWS resources.'
'IAM' = 'Identity and Access Management — manages users, groups, roles and policies. Controls who can access which AWS resources.'
'IAM Role' = 'provides temporary credentials for AWS services or users. No permanent access keys. Used by EC2, Lambda and cross-account access.'
'IAM User' = 'a long-term identity with a password (console) and/or access keys (CLI/SDK). Intended for people or applications that need persistent credentials.'
'IAM Group' = 'a collection of IAM users. Attach a policy once to the group and all members inherit it. Simplifies permission management.'
'IAM Policy' = 'a JSON document that defines permissions. Attached to users, groups or roles. Grants or denies specific AWS actions.'
'MFA' = 'Multi-Factor Authentication — adds a second factor (token, phone) on top of password for extra security'
'Amazon Cognito' = 'provides user authentication for web and mobile apps. Supports social identity providers (Google, Facebook, Apple) via identity pools.'
'Cognito' = 'provides user authentication for web and mobile apps. Supports social identity providers (Google, Facebook, Apple) via identity pools.'
'AWS Organizations' = 'groups multiple AWS accounts into a hierarchy with consolidated billing and Service Control Policies (SCPs) as guardrails'
'Organizations' = 'groups multiple AWS accounts into a hierarchy with consolidated billing and Service Control Policies (SCPs) as guardrails'
'Service Control Policy' = 'an SCP is an organisation-level guardrail that overrides even AdministratorAccess in member accounts'
'SCP' = 'an SCP is an organisation-level guardrail that overrides even AdministratorAccess in member accounts'
'AWS Control Tower' = 'automates setup of a secure, multi-account landing zone with built-in guardrails based on AWS best practices'
'Control Tower' = 'automates setup of a secure, multi-account landing zone with built-in guardrails based on AWS best practices'
'AWS IAM Identity Center' = 'centralised single sign-on across AWS accounts and SAML apps using corporate directory credentials. Formerly AWS SSO.'
'IAM Identity Center' = 'centralised single sign-on across AWS accounts and SAML apps using corporate directory credentials. Formerly AWS SSO.'
'AWS CloudFormation' = 'Infrastructure as Code. Define AWS resources in JSON/YAML templates and CloudFormation provisions them as a stack.'
'CloudFormation' = 'Infrastructure as Code. Define AWS resources in JSON/YAML templates and CloudFormation provisions them as a stack.'
'AWS OpsWorks' = 'configuration management service using Chef or Puppet to automate EC2 instance configuration'
'OpsWorks' = 'configuration management service using Chef or Puppet to automate EC2 instance configuration'
'AWS Snowball' = 'a physical device for transferring 50TB-80TB of data offline. AWS ships it to you, you load data, ship it back.'
'Snowball' = 'a physical device for transferring 50TB-80TB of data offline. AWS ships it to you, you load data, ship it back.'
'AWS Snowball Edge' = 'a physical device with built-in computing for processing data locally. Also transfers large amounts of data to AWS.'
'Snowball Edge' = 'a physical device with built-in computing for processing data locally. Also transfers large amounts of data to AWS.'
'AWS Snowmobile' = 'a shipping container-sized device for transferring exabyte-scale data to AWS. Used for 100PB+ migrations.'
'Snowmobile' = 'a shipping container-sized device for transferring exabyte-scale data to AWS. Used for 100PB+ migrations.'
'AWS Storage Gateway' = 'a hybrid storage service connecting on-premises applications to cloud storage. Caches frequently accessed data locally.'
'Storage Gateway' = 'a hybrid storage service connecting on-premises applications to cloud storage. Caches frequently accessed data locally.'
'AWS Direct Connect' = 'a dedicated private physical network connection between your data centre and AWS. Bypasses the public internet.'
'Direct Connect' = 'a dedicated private physical network connection between your data centre and AWS. Bypasses the public internet.'
'AWS VPN' = 'creates encrypted IPsec tunnels over the public internet between your on-premises network and your VPC'
'AWS Transit Gateway' = 'connects multiple VPCs and on-premises networks through a central hub, simplifying network topology'
'Transit Gateway' = 'connects multiple VPCs and on-premises networks through a central hub, simplifying network topology'
'Amazon Athena' = 'a serverless interactive query service that runs SQL directly on data in S3 without loading it into a database'
'Athena' = 'a serverless interactive query service that runs SQL directly on data in S3 without loading it into a database'
'AWS Glue' = 'a serverless ETL service that discovers, prepares and combines data for analytics. Includes a data catalogue.'
'Glue' = 'a serverless ETL service that discovers, prepares and combines data for analytics. Includes a data catalogue.'
'Amazon EMR' = 'a managed Hadoop/Spark framework for processing large datasets. Run big data frameworks easily.'
'EMR' = 'a managed Hadoop/Spark framework for processing large datasets. Run big data frameworks easily.'
'Amazon SageMaker' = 'a fully managed ML platform for building, training and deploying machine learning models at scale'
'SageMaker' = 'a fully managed ML platform for building, training and deploying machine learning models at scale'
'Amazon Rekognition' = 'an image and video analysis API for face detection, object recognition and content moderation'
'Rekognition' = 'an image and video analysis API for face detection, object recognition and content moderation'
'Amazon Polly' = 'a text-to-speech service that turns text into lifelike speech'
'Amazon Comprehend' = 'a natural language processing service for extracting insights from text'
'Amazon Transcribe' = 'a speech-to-text service that converts audio to text'
'Amazon Elastic Transcoder' = 'a media transcoding service that converts video and audio files into different formats for playback on various devices'
'AWS X-Ray' = 'a distributed tracing service that tracks requests through your application to identify performance issues'
'X-Ray' = 'a distributed tracing service that tracks requests through your application to identify performance issues'
'AWS CodePipeline' = 'a managed CI/CD service that orchestrates build, test and deployment stages'
'CodePipeline' = 'a managed CI/CD service that orchestrates build, test and deployment stages'
'AWS CodeCommit' = 'a managed Git repository service for version control of your code'
'CodeCommit' = 'a managed Git repository service for version control of your code'
'AWS CodeBuild' = 'a build service that compiles source code, runs tests and produces deployable artefacts'
'CodeBuild' = 'a build service that compiles source code, runs tests and produces deployable artefacts'
'AWS CodeDeploy' = 'automates code deployment to EC2, ECS, Lambda and on-premises servers'
'CodeDeploy' = 'automates code deployment to EC2, ECS, Lambda and on-premises servers'
'AWS Systems Manager' = 'provides operational management tools for EC2 and hybrid environments. Includes patch management and automation.'
'Systems Manager' = 'provides operational management tools for EC2 and hybrid environments. Includes patch management and automation.'
'Amazon Machine Image' = 'an AMI is a template for launching EC2 instances with a pre-configured OS and software'
'AMI' = 'an AMI is a template for launching EC2 instances with a pre-configured OS and software'
'AWS DMS' = 'Database Migration Service — migrates databases to AWS with minimal downtime. Supports homogeneous and heterogeneous migrations.'
'DMS' = 'Database Migration Service — migrates databases to AWS with minimal downtime. Supports homogeneous and heterogeneous migrations.'
'AWS Application Discovery Service' = 'assesses on-premises environments to help plan migrations to AWS'
'AWS Migration Hub' = 'tracks the progress of application migrations across multiple AWS and partner tools'
'AWS Marketplace' = 'a digital catalogue where you can find, buy and deploy third-party software that runs on AWS'
'AWS Service Catalog' = 'manages portfolios of approved IT services for consistent governance across an organisation'
'AWS Cost Explorer' = 'visualises and analyses historical AWS spending with interactive charts. Provides cost forecasts.'
'Cost Explorer' = 'visualises and analyses historical AWS spending with interactive charts. Provides cost forecasts.'
'AWS Budgets' = 'sets custom cost and usage thresholds and sends alerts when they are breached'
'Budgets' = 'sets custom cost and usage thresholds and sends alerts when they are breached'
'AWS Pricing Calculator' = 'estimates AWS service costs before deployment by modelling expected usage'
'AWS Cost and Usage Report' = 'the most granular billing data — hourly CSV/Parquet files delivered to S3 covering every resource and charge'
'Consolidated Billing' = 'combines charges from multiple accounts in an Organisation into a single bill. Aggregates usage for volume discounts.'
'AWS Support Concierge' = 'a dedicated team for Enterprise support customers providing billing and account inquiry assistance'
'Concierge' = 'a dedicated team for Enterprise support customers providing billing and account inquiry assistance'
'Technical Account Manager' = 'a dedicated TAM provides ongoing guidance, architecture reviews and proactive support for Enterprise support customers'
'TAM' = 'a dedicated TAM provides ongoing guidance, architecture reviews and proactive support for Enterprise support customers'
'Reserved Instances' = 'EC2 pricing with 1 or 3 year commitment. Up to 72% discount. Standard (fixed) or Convertible (can exchange).'
'Spot Instances' = 'EC2 spare capacity with up to 90% discount. AWS can interrupt with 2-minute warning. Best for fault-tolerant workloads.'
'On-Demand Instances' = 'EC2 pricing with no commitment. Pay per second (min 60s). Most flexible but most expensive per hour.'
'Savings Plans' = 'commit to $/hour compute spend for 1 or 3 years. Up to 66% discount. Flexible across instance types, Lambda and Fargate.'
'Dedicated Hosts' = 'physical EC2 servers dedicated to you. Supports Bring Your Own License (BYOL). Most expensive option.'
'Dedicated Instances' = 'EC2 instances on hardware isolated from other customers but not a full dedicated physical server'
'AWS Quick Start' = 'pre-built CloudFormation templates for deploying popular technologies with best-practice configurations'
'AWS Cloud9' = 'a cloud-based IDE for writing and debugging code in the browser'
'AWS DataSync' = 'transfers data between on-premises storage and AWS (S3, EFS) over the internet or Direct Connect'
'Amazon Connect' = 'a cloud-based contact centre service for customer service operations'
'AWS Health Dashboard' = 'provides a personalised view of AWS service health events affecting your resources'
'AWS Service Health Dashboard' = 'shows the current status of all AWS services across all regions at status.aws.amazon.com'
'AWS Personal Health Dashboard' = 'provides alerts when an AWS event may impact your specific resources'
'AWS Acceptable Use Policy' = 'describes prohibited uses of AWS services, including penetration testing guidelines'
'AWS Cloud Adoption Framework' = 'provides guidance across six perspectives for organisational cloud adoption planning'
'CAF' = 'provides guidance across six perspectives for organisational cloud adoption planning'
'Edge Location' = 'a CDN cache point used by CloudFront to serve content closer to users. Distributed globally across hundreds of cities.'
'Availability Zone' = 'one or more discrete data centres within a Region with independent power, cooling and networking. Isolated from failures in other AZs.'
'Region' = 'a geographic area containing two or more Availability Zones. Choose based on latency, compliance and cost.'
'AWS Wavelength' = 'extends AWS compute to 5G telecom edges for ultra-low-latency applications'
'Virtual Private Gateway' = 'the AWS side of a VPN connection between your on-premises network and your VPC'
'Internet Gateway' = 'allows communication between VPC instances and the public internet'
'NAT Gateway' = 'allows private subnet resources to access the internet outbound without allowing inbound connections'
'AWS Directory Service' = 'hosts or connects to Microsoft Active Directory for identity management'
'AWS Professional Services' = 'a team of AWS experts that helps customers accelerate cloud adoption through paid engagements'
'AWS Partner Network' = 'a global program of consulting and technology partners that help customers design and build on AWS'
'APN' = 'a global program of consulting and technology partners that help customers design and build on AWS'
'Infrastructure Event Management' = 'provides architectural and scaling guidance for critical events, included with Enterprise support'
'Elastic Transcoder' = 'a media transcoding service that converts video and audio files into different formats for playback on various devices'
'Amazon ECR' = 'Elastic Container Registry — a managed Docker container image registry for storing and deploying container images'
'ECR' = 'Elastic Container Registry — a managed Docker container image registry for storing and deploying container images'
}

# Concept-based rationale templates (matched by keyword in stem)
$ConceptRationale = @{
'consolidated billing' = 'Consolidated billing in AWS Organisations combines usage across all member accounts, which can unlock volume discount tiers and simplifies payment to a single invoice.'
'least privilege' = 'The principle of least privilege means granting only the minimum permissions needed to perform a function — nothing more. This limits the blast radius of compromised credentials.'
'shared responsibility' = 'Under the Shared Responsibility Model, AWS secures the cloud (hardware, facilities, hypervisor) and the customer secures what is in the cloud (data, access, OS, configuration).'
'well-architected' = 'The AWS Well-Architected Framework has six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation and Sustainability.'
'loose coupling' = 'Loose coupling reduces dependencies between components so that if one fails or changes, others are not directly affected. SQS and SNS enable this pattern.'
'design for failure' = 'Designing for failure means assuming every component will eventually fail and architecting the system to continue operating despite individual component failures.'
'horizontal scaling' = 'Horizontal scaling (scaling out) means adding more instances of the same size. Vertical scaling (scaling up) means making a single instance larger.'
'elasticity' = 'Elasticity is the ability to automatically scale resources in and out in response to changing demand. Auto Scaling is the textbook example.'
'capex' = 'Moving to AWS converts capital expenditure (upfront hardware purchases) to operational expenditure (pay-as-you-go variable costs). This is a core cloud benefit.'
'opex' = 'Moving to AWS converts capital expenditure (upfront hardware purchases) to operational expenditure (pay-as-you-go variable costs). This is a core cloud benefit.'
'economies of scale' = 'AWS benefits from economies of scale — aggregating demand across millions of customers lowers per-unit costs, and AWS passes these savings to customers through lower prices.'
'high availability' = 'High availability means the system continues operating during component failures, typically achieved by deploying across multiple Availability Zones with load balancing and failover.'
'fault tolerance' = 'Fault tolerance means the system continues functioning even when components fail — going beyond quick recovery to maintaining operation.'
'spot instance' = 'Spot Instances use spare EC2 capacity at up to 90% discount but AWS can interrupt them with a 2-minute warning. Best for fault-tolerant, interruptible workloads like batch jobs.'
'reserved instance' = 'Reserved Instances offer up to 72% discount for a 1 or 3 year commitment. Best for steady, predictable workloads. Standard is fixed; Convertible allows exchange.'
'savings plan' = 'Savings Plans offer up to 66% discount for a commitment to a $/hour spend. More flexible than RIs — the discount applies across instance types, Lambda and Fargate.'
'on-demand' = 'On-Demand Instances charge per second (min 60s) with no commitment. Most flexible but most expensive. Best for short-term or unpredictable workloads.'
'dedicated host' = 'Dedicated Hosts are physical servers for your exclusive use, supporting Bring Your Own License (BYOL) for software like Windows or Oracle.'
'free tier' = 'The 12-Month Free Tier gives new customers 750 hours/month of t2.micro EC2, 5GB S3, and more for 12 months. Always Free includes Lambda (1M requests/month) and DynamoDB (25GB).'
'edge location' = 'Edge Locations are CloudFront cache points distributed globally in hundreds of cities. They serve cached content to users with low latency without routing back to the origin.'
'availability zone' = 'An Availability Zone is one or more discrete data centres within a Region, with independent power, cooling and networking. AZs are isolated from failures in other AZs.'
'region' = 'A Region is a geographic area containing two or more Availability Zones. Choose a Region based on latency to users, data sovereignty compliance and cost.'
'multi-az' = 'Multi-AZ deployment places resources in two or more Availability Zones. If one fails, resources in another AZ continue serving — this is the standard HA pattern.'
'iaas' = 'IaaS (Infrastructure as a Service) provides raw compute, storage and networking. You manage the OS and above. Amazon EC2 is IaaS.'
'paas' = 'PaaS (Platform as a Service) provides a managed platform. AWS handles deployment, scaling and capacity. Elastic Beanstalk is PaaS.'
'saas' = 'SaaS (Software as a Service) is a fully managed application accessed over the internet.'
'faas' = 'FaaS (Function as a Service) is serverless compute where you provide only code. AWS Lambda is FaaS.'
'serverless' = 'Serverless means AWS manages all infrastructure. You pay only for actual usage. Lambda, DynamoDB, Fargate and S3 are serverless services.'
'penetration test' = 'AWS allows customers to perform penetration testing on their own EC2 instances and resources without prior authorisation, but you must follow the AWS Acceptable Use Policy guidelines.'
'shared control' = 'Shared controls apply to both the infrastructure layer and the customer layer — AWS and the customer share responsibility for areas like patch management, configuration management and awareness training.'
'detective control' = 'Detective controls identify and alert on security events after they occur. CloudTrail, GuardDuty and Config are detective controls. MFA and encryption are preventive.'
'preventive control' = 'Preventive controls stop security events before they happen. MFA, encryption and least-privilege IAM policies are preventive. CloudTrail is detective.'
'tco' = 'TCO (Total Cost of Ownership) compares the full cost of running on-premises (hardware, power, cooling, staff) versus AWS. The TCO Calculator estimates these savings.'
'cost allocation tag' = 'Cost allocation tags let you label resources by project, department or environment, then track and categorise spending at a granular level in Cost Explorer and billing reports.'
'disaster recovery' = 'For disaster recovery, deploy resources across multiple Regions. Multi-site active-active offers the lowest downtime. Pilot light and warm standby are intermediate options.'
's3 storage class' = 'S3 storage classes: Standard (frequent access), Standard-IA (infrequent, ms retrieval), Intelligent-Tiering (unknown patterns), Glacier (archive, 1-min to 12-hr retrieval), Deep Archive (long-term, 12-48 hr retrieval).'
'hybrid cloud' = 'A hybrid cloud connects cloud-based resources with on-premises infrastructure. Direct Connect, VPN and Storage Gateway enable hybrid architectures.'
'private cloud' = 'A private cloud is dedicated infrastructure for one organisation, on-premises or hosted, not shared with other customers.'
'public cloud' = 'A public cloud is shared infrastructure offered over the internet by a provider like AWS. Customers share underlying hardware but are logically isolated.'
'pipeline' = 'AWS CodePipeline is a CI/CD service that orchestrates build, test and deployment stages. CodeCommit is the source repo, CodeBuild compiles, CodeDeploy deploys.'
'cloudtrail' = 'CloudTrail records all API calls made in your AWS account — it is the audit trail showing who did what, when and from where. Logs go to S3.'
'cloudwatch' = 'CloudWatch collects metrics and logs, creates dashboards and triggers alarms. It monitors performance and operational health, not API activity.'
'config' = 'AWS Config records resource configuration changes over time and evaluates them against compliance rules. It detects drift, not API calls.'
'trusted advisor' = 'Trusted Advisor provides best-practice recommendations across five categories: cost, performance, security, fault tolerance and service limits. Not a security findings aggregator.'
'guardduty' = 'GuardDuty uses ML to detect threats by analysing CloudTrail, VPC Flow Logs and DNS logs. It generates findings but does not scan instances directly.'
'inspector' = 'Inspector scans EC2 instances and ECR container images for software vulnerabilities (CVEs) and network exposure. It does not analyse logs or classify data.'
'macie' = 'Macie uses ML to discover and classify sensitive data (PII, financial data) in S3. It does not scan for CVEs or analyse network traffic.'
'security hub' = 'Security Hub aggregates findings from GuardDuty, Inspector, Macie and other services into a single dashboard. It does not do detection itself.'
'detective' = 'Amazon Detective investigates the root cause of security findings using graph analysis. It helps with investigation, not detection or aggregation.'
'shield' = 'AWS Shield provides DDoS protection. Standard is free and automatic (Layers 3-4). Advanced costs ~$3000/month and adds 24/7 DRT and financial protection.'
'waf' = 'AWS WAF is a web application firewall that blocks SQL injection, XSS and other Layer 7 attacks. It inspects HTTP/HTTPS requests, not network traffic.'
'kms' = 'KMS manages encryption keys for data at rest. It integrates with S3, RDS, EBS and more. Keys never leave KMS in plaintext. Multi-tenant, FIPS 140-2 Level 2.'
'cloudhsm' = 'CloudHSM provides dedicated single-tenant hardware security modules for FIPS 140-2 Level 3 compliance. Customer controls keys exclusively.'
'secrets manager' = 'Secrets Manager stores and auto-rotates secrets (database passwords, API keys) via Lambda. Integrates natively with RDS for automatic password rotation.'
'acm' = 'AWS Certificate Manager provisions, manages and auto-renews SSL/TLS certificates for CloudFront and Load Balancers. Free when used with AWS services.'
'artifact' = 'AWS Artifact is a self-service portal for downloading compliance reports (SOC 1/2, ISO 27001, PCI DSS) and agreements. Not a security service.'
'iam role' = 'IAM Roles provide temporary credentials for AWS services (EC2, Lambda) or cross-account access. No permanent access keys. The recommended way to grant permissions to applications.'
'iam user' = 'IAM Users have long-term credentials (password and/or access keys). Intended for people or applications needing persistent identity. Not for AWS services.'
'iam group' = 'IAM Groups are collections of users. Attach a policy to the group and all members inherit it. Simplifies permission management for teams.'
'iam policy' = 'An IAM Policy is a JSON document defining permissions (allow/deny). Attached to users, groups or roles. The mechanism for implementing least privilege.'
'cognito' = 'Amazon Cognito provides authentication for web and mobile apps. Identity pools give temporary AWS credentials after social provider (Google, Facebook) authentication.'
'organizations' = 'AWS Organisations groups accounts into a hierarchy, enables consolidated billing and applies SCPs as guardrails. The foundation for multi-account management.'
'scp' = 'Service Control Policies are organisation-level guardrails that restrict what actions are allowed in member accounts, even overriding AdministratorAccess.'
'control tower' = 'AWS Control Tower automates landing zone setup — a secure, multi-account environment with guardrails based on AWS best practices.'
'cloudformation' = 'CloudFormation is Infrastructure as Code. Define resources in JSON/YAML templates and CloudFormation provisions them as a stack. Enables repeatable, version-controlled infrastructure.'
'elastic beanstalk' = 'Elastic Beanstalk is a PaaS — upload code and AWS handles capacity, load balancing, auto-scaling and monitoring. You retain control of the underlying EC2.'
'ec2' = 'Amazon EC2 provides virtual servers in the cloud. You manage the OS, applications and configuration. It is IaaS — you are responsible for patching and security.'
's3' = 'Amazon S3 is object storage — files stored as objects in buckets, accessed via HTTP. Virtually unlimited. 99.999999999% durability. Good for backups, static websites and data lakes.'
'ebs' = 'Amazon EBS is block storage attached to one EC2 instance like a virtual hard drive. Tied to one AZ. Good for databases, boot volumes and file systems.'
'efs' = 'Amazon EFS is a managed NFS file system mountable by multiple EC2 instances simultaneously. Auto-scales. Good for shared file storage across instances.'
'dynamodb' = 'Amazon DynamoDB is a managed serverless NoSQL database. Single-digit millisecond latency at any scale. Auto-scales throughput. Good for high-performance key-value workloads.'
'rds' = 'Amazon RDS is a managed relational database. AWS handles patching, backups, failover and OS. Supports MySQL, PostgreSQL, Oracle, SQL Server, MariaDB.'
'aurora' = 'Amazon Aurora is AWS cloud-native relational database. MySQL/PostgreSQL compatible. 5x MySQL throughput. Auto-replicates across 3 AZs in 6 copies.'
'redshift' = 'Amazon Redshift is a petabyte-scale data warehouse for analytical SQL queries. Columnar storage. OLAP, not OLTP.'
'elasticache' = 'Amazon ElastiCache is a managed in-memory cache (Redis/Memcached). Reduces database read load. Sub-millisecond latency. Good for session state and query caching.'
'lambda' = 'AWS Lambda is serverless compute. Runs code in response to events. No server management. Pay per execution. Supports Node.js, Python, Java, Go and more.'
'sqs' = 'Amazon SQS is a managed message queue that decouples components. One consumer per message. Messages persist until processed. Good for task queues and asynchronous processing.'
'sns' = 'Amazon SNS is a pub/sub service that fans out messages to multiple subscribers (email, SMS, Lambda, SQS). Good for event notifications.'
'snowball' = 'AWS Snowball is a physical device for offline data transfer. AWS ships it to you, you load data, ship it back. For 50-80TB migrations where internet is too slow.'
'direct connect' = 'AWS Direct Connect is a dedicated private physical connection to AWS. Bypasses the public internet. Lower latency, more consistent bandwidth.'
'route 53' = 'Amazon Route 53 is a managed DNS service. Domain registration, health checks and routing policies (latency, geolocation, failover, weighted, simple).'
'cloudfront' = 'Amazon CloudFront is a CDN that caches content at edge locations globally. Reduces latency. Integrates with Shield and WAF for DDoS and web attack protection.'
'elb' = 'Elastic Load Balancing distributes traffic across targets (EC2, containers, Lambda). Health checks route only to healthy targets. ALB = Layer 7, NLB = Layer 4.'
'auto scaling' = 'EC2 Auto Scaling automatically adds/removes instances based on demand. You define min, max and desired capacity. Works with ELB for HA across multiple AZs.'
'x-ray' = 'AWS X-Ray traces requests through distributed applications to identify performance bottlenecks. Good for microservices debugging.'
'sagemaker' = 'Amazon SageMaker is a fully managed ML platform for building, training and deploying models. Handles the full ML lifecycle.'
'athena' = 'Amazon Athena runs serverless SQL queries on S3 data without loading it into a database. Pay per query.'
'glue' = 'AWS Glue is a serverless ETL service for discovering, preparing and combining data for analytics. Includes a data catalogue.'
'emr' = 'Amazon EMR runs managed Hadoop and Spark clusters for big data processing.'
'dms' = 'AWS Database Migration Service migrates databases to AWS with minimal downtime. Supports homogeneous (Oracle to Oracle) and heterogeneous (Oracle to Aurora) migrations.'
'storage gateway' = 'AWS Storage Gateway is hybrid storage — connects on-premises apps to cloud storage. Caches frequently accessed data locally, stores full dataset in S3.'
}

# ═══════════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════

function Get-ServiceFromOption($optionText) {
    # Remove the "A. " prefix
    $text = $optionText -replace '^[A-E]\.\s*', ''
    # Try to match known service names (longest match first)
    $sortedKeys = $KB.Keys | Sort-Object Length -Descending
    foreach ($key in $sortedKeys) {
        if ($text -match [regex]::Escape($key)) { return $key }
    }
    return $null
}

function Get-Description($serviceName) {
    if ($serviceName -and $KB.ContainsKey($serviceName)) { return $KB[$serviceName] }
    return $null
}

function Generate-Rationale($stem, $correctOptions, $wrongOptions, $domain) {
    $rationale = ""
    $wrongRationale = @{}
    
    # Get service names for correct answers
    $correctServices = @()
    foreach ($opt in $correctOptions) {
        $svc = Get-ServiceFromOption $opt
        if ($svc) { $correctServices += $svc }
    }
    
    # Check concept-based rationale first
    $stemLower = $stem.ToLower()
    foreach ($key in $ConceptRationale.Keys) {
        if ($stemLower -match $key) {
            $rationale = $ConceptRationale[$key]
            break
        }
    }
    
    # If no concept match, build from service descriptions
    if (-not $rationale -and $correctServices.Count -gt 0) {
        $descs = @()
        foreach ($svc in ($correctServices | Select-Object -Unique)) {
            $desc = Get-Description $svc
            if ($desc) { $descs += "$svc is $desc" }
        }
        if ($descs.Count -gt 0) {
            $rationale = ($descs -join '. ') + '. This directly addresses what the question is asking for.'
        }
    }
    
    # Fallback: generic rationale
    if (-not $rationale) {
        $correctText = ($correctOptions | ForEach-Object { $_ -replace '^[A-E]\.\s*', '' }) -join ', '
        $rationale = "The correct answer is $correctText. This is the AWS service or concept that best matches the requirement described in the question."
    }
    
    # Generate wrong rationale for each wrong option
    foreach ($opt in $wrongOptions) {
        $letter = ($opt -replace '^([A-E])\..*','$1')
        $svc = Get-ServiceFromOption $opt
        $desc = Get-Description $svc
        
        if ($desc) {
            $wrongRationale[$letter] = "$svc is $desc. It does not match the requirement in the question."
        } else {
            $optText = $opt -replace '^[A-E]\.\s*', ''
            $wrongRationale[$letter] = "$optText does not address the specific requirement described in the question."
        }
    }
    
    return @{ rationale = $rationale; wrongRationale = $wrongRationale }
}

# ═══════════════════════════════════════════════════════════════════
#  PROCESS FILE
# ═══════════════════════════════════════════════════════════════════

$inputFile = "c:\Users\khwezy\Downloads\AWS Study Hub\external-questions.js"
Write-Host "Reading external-questions.js..."
$raw = [System.IO.File]::ReadAllText($inputFile)

# Parse each question object using regex
$questionPattern = '\{id:"(ext-\d+)",domain:"([^"]+)",type:"(single|multi)",stem:"((?:[^"\\]|\\.)*)",options:\[(.*?)\],correct:\[(.*?)\],rationale:"(?:[^"\\]|\\.)*",wrongRationale:\{[^}]*\},tags:\[\],verified:false,source:"([^"]+)"\}'
$matches = [regex]::Matches($raw, $questionPattern)

Write-Host "Found $($matches.Count) questions to process"

$output = $raw
$processed = 0
$rationaleAdded = 0

# Process each match in reverse order to not mess up indices
for ($i = $matches.Count - 1; $i -ge 0; $i--) {
    $m = $matches[$i]
    $qid = $m.Groups[1].Value
    $domain = $m.Groups[2].Value
    $type = $m.Groups[3].Value
    $stem = $m.Groups[4].Value -replace '\\"', '"' -replace '\\\\', '\'
    
    # Parse options
    $optRaw = $m.Groups[5].Value
    $optItems = [regex]::Matches($optRaw, '"((?:[^"\\]|\\.)*)"') | ForEach-Object { $_.Groups[1].Value -replace '\\"', '"' -replace '\\\\', '\' }
    
    # Parse correct answers
    $correctRaw = $m.Groups[6].Value
    $correctLetters = [regex]::Matches($correctRaw, '"([A-E])"') | ForEach-Object { $_.Groups[1].Value }
    
    $correctOptions = @()
    $wrongOptions = @()
    foreach ($opt in $optItems) {
        $letter = $opt.Substring(0,1)
        if ($correctLetters -contains $letter) { $correctOptions += $opt }
        else { $wrongOptions += $opt }
    }
    
    # Generate rationale
    $result = Generate-Rationale $stem $correctOptions $wrongOptions $domain
    $rationale = $result.rationale
    $wrongRat = $result.wrongRationale
    
    # Build wrong rationale JS
    $wrongJs = "{"
    $first = $true
    foreach ($key in ($wrongRat.Keys | Sort-Object)) {
        if (-not $first) { $wrongJs += "," }
        $first = $false
        $escVal = $wrongRat[$key] -replace '\\', '\\' -replace '"', '\"'
        $wrongJs += "`"$key`":`"$escVal`""
    }
    $wrongJs += "}"
    
    # Escape rationale for JS
    $escRationale = $rationale -replace '\\', '\\' -replace '"', '\"' -replace "`r", '' -replace "`n", ' '
    
    # Build replacement
    $replacement = "{id:`"$qid`",domain:`"$domain`",type:`"$type`",stem:`"$($m.Groups[4].Value)`",options:[$optRaw],correct:[$correctRaw],rationale:`"$escRationale`",wrongRationale:$wrongJs,tags:[],verified:false,source:`"$($m.Groups[7].Value)`"}"
    
    # Replace in output
    $output = $output.Substring(0, $m.Index) + $replacement + $output.Substring($m.Index + $m.Length)
    
    $processed++
    if ($processed % 100 -eq 0) { Write-Host "  Processed $processed / $($matches.Count) questions..." }
}

Write-Host "Writing updated file..."
[System.IO.File]::WriteAllText($inputFile, $output, [System.Text.Encoding]::UTF8)
Write-Host "Done! Added rationale to $processed questions."
Write-Host "File size: $([Math]::Round((Get-Item $inputFile).Length / 1KB, 1)) KB"
