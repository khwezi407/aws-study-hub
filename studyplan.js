// ═══════════════════════════════════════════════════════════════
//  KHWEZI'S PERSONALISED STUDY PLAN
//  Exam: 14 December 2026
//  Free window: 26 Nov – 4 Dec (9 intensive days)
//  Medical Missionary: 5 Dec – 20 Dec
//  Presenting: 13 Dec – 18 Dec
// ═══════════════════════════════════════════════════════════════

window.STUDY_PLAN = {

  examDate: '2026-12-14',
  targetScore: 90,
  studentName: 'Khwezi',

  phases: [
    {
      id: 'intensive',
      label: 'Phase 1 — Intensive Prep',
      emoji: '🔥',
      color: '#FF9900',
      dateRange: 'Nov 26 – Dec 4',
      startDate: '2026-11-26',
      endDate: '2026-12-04',
      description: '9 days at home — full focus. This is your golden window. 6-8 hours/day.',
      tip: 'You have ALL the hours. Treat this like a job. Morning = learn. Afternoon = practice. Evening = mock exam.',
    },
    {
      id: 'missionary',
      label: 'Phase 2 — Light Review',
      emoji: '📖',
      color: '#3BA8FF',
      dateRange: 'Dec 5 – Dec 12',
      startDate: '2026-12-05',
      endDate: '2026-12-12',
      description: 'Medical Missionary begins. 1-2 hrs/day max. Flashcards + weak domain drilling only.',
      tip: 'No new content. Only review what you already know. Quick flashcard sessions between sessions.',
    },
    {
      id: 'presenting',
      label: 'Phase 3 — Exam Week',
      emoji: '⚡',
      color: '#8B5CF6',
      dateRange: 'Dec 13 – 14',
      startDate: '2026-12-13',
      endDate: '2026-12-14',
      description: 'You\'re presenting AND sitting the exam. Dec 13 = light review only. Dec 14 = EXAM DAY.',
      tip: 'Dec 13: 30 min max. Review your cheat sheet. Sleep early. Dec 14: Trust your preparation. You\'ve got this.',
    },
  ],

  // 9-day intensive day-by-day plan
  days: [
    {
      date: '2026-11-26',
      day: 1,
      label: 'Day 1 — Wed 26 Nov',
      emoji: '☁️',
      theme: 'Cloud Foundations',
      focus: 'Cloud Concepts (24% of exam)',
      color: '#3BA8FF',
      morning: {
        title: 'Learn: Cloud Concepts',
        tasks: [
          'Review Week 1 flashcards (all 17 cards)',
          'Study the 6 advantages of cloud computing — memorise them',
          'Understand CapEx vs OpEx with examples',
          'Review the 6 Well-Architected pillars',
          'Study the Shared Responsibility Model thoroughly',
        ],
        duration: '2.5 hrs'
      },
      afternoon: {
        title: 'Practice: Cloud Concepts Questions',
        tasks: [
          'Do 20 Cloud Concepts practice questions',
          'Review ALL wrong answers carefully',
          'Study rationale for each wrong answer',
          'Do another 10 questions targeting weak spots',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'Mock + Review',
        tasks: [
          'Take 1 mini mock (20 Cloud Concepts questions)',
          'Note your score — target 70%+ today',
          'Write down 5 things you got wrong',
          'Review Week 1 flashcards again before bed',
        ],
        duration: '1.5 hrs'
      },
      target: 'Score 70%+ on Cloud Concepts by end of day',
      weekFlashcards: 1,
    },
    {
      date: '2026-11-27',
      day: 2,
      label: 'Day 2 — Thu 27 Nov',
      emoji: '🛡️',
      theme: 'Security & IAM',
      focus: 'Security & Compliance (30% of exam — BIGGEST domain)',
      color: '#FFB020',
      morning: {
        title: 'Learn: Security Deep Dive',
        tasks: [
          'Review Week 6 flashcards (all 22 cards)',
          'Master IAM: Users vs Groups vs Roles vs Policies',
          'Understand CloudTrail vs CloudWatch (exam trap!)',
          'Study GuardDuty, Inspector, Macie, Security Hub',
          'Know Shield Standard (free) vs Advanced (paid)',
        ],
        duration: '2.5 hrs'
      },
      afternoon: {
        title: 'Practice: Security Questions',
        tasks: [
          'Do 25 Security & Compliance questions',
          'Focus on shared responsibility model scenarios',
          'Practice IAM scenario questions',
          'Do encryption questions: KMS vs CloudHSM',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'Mock + Cheat Sheet',
        tasks: [
          'Take 1 mini mock (25 Security questions)',
          'Target 70%+ on security today',
          'Start building your personal cheat sheet',
          'Write 3 bullet points per security service',
        ],
        duration: '1.5 hrs'
      },
      target: 'Score 70%+ on Security by end of day',
      weekFlashcards: 6,
    },
    {
      date: '2026-11-28',
      day: 3,
      label: 'Day 3 — Fri 28 Nov',
      emoji: '🖥️',
      theme: 'Compute Services',
      focus: 'Cloud Technology & Services — Compute (part of 34%)',
      color: '#FF9900',
      morning: {
        title: 'Learn: Compute Services',
        tasks: [
          'Review Week 2 flashcards (all 15 cards)',
          'Master EC2 pricing: On-Demand, Reserved, Spot, Savings Plans',
          'Understand Lambda: serverless, event-driven, 15 min max',
          'Know ECS vs EKS vs Fargate clearly',
          'Understand Auto Scaling + Load Balancers (ALB vs NLB)',
        ],
        duration: '2.5 hrs'
      },
      afternoon: {
        title: 'Practice: Compute Questions',
        tasks: [
          'Do 20 compute-focused questions',
          'Focus on "which EC2 pricing model" scenarios',
          'Practice container service questions',
          'Review Elastic Beanstalk vs Lambda vs EC2 scenarios',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'First Full Mock Attempt',
        tasks: [
          'Take Practice Exam 1 (full 65 questions)',
          'No time limit pressure yet — focus on learning',
          'Review every wrong answer with rationale',
          'Note your domain-by-domain breakdown',
        ],
        duration: '2 hrs'
      },
      target: 'Complete first full mock — target 65%+',
      weekFlashcards: 2,
    },
    {
      date: '2026-11-29',
      day: 4,
      label: 'Day 4 — Sat 29 Nov',
      emoji: '💾',
      theme: 'Storage & Databases',
      focus: 'Cloud Technology & Services — Storage + DB',
      color: '#22C55E',
      morning: {
        title: 'Learn: Storage Services',
        tasks: [
          'Review Week 3 flashcards (all 15 cards)',
          'Master S3 storage classes — especially Glacier tiers',
          'Know EBS vs EFS vs Instance Store differences',
          'Understand S3 versioning and lifecycle policies',
          'Study Snowball vs Snowmobile use cases',
        ],
        duration: '2 hrs'
      },
      afternoon: {
        title: 'Learn: Database Services',
        tasks: [
          'Review Week 4 flashcards (all 14 cards)',
          'Master RDS Multi-AZ vs Read Replica (exam trap!)',
          'Know DynamoDB = NoSQL, single-digit ms',
          'Understand Redshift = data warehouse (OLAP)',
          'Study Athena = serverless SQL on S3',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'Practice + Mock',
        tasks: [
          'Do 30 questions: storage + database mix',
          'Take Practice Exam 2',
          'Target 70%+ today',
          'Update your cheat sheet',
        ],
        duration: '2 hrs'
      },
      target: 'Score 70%+ on mock by end of day',
      weekFlashcards: 3,
    },
    {
      date: '2026-11-30',
      day: 5,
      label: 'Day 5 — Sun 30 Nov',
      emoji: '🌐',
      theme: 'Networking + Management',
      focus: 'Networking, VPC, Management Tools',
      color: '#8B5CF6',
      morning: {
        title: 'Learn: Networking',
        tasks: [
          'Review Week 5 flashcards (all 15 cards)',
          'Master VPC: subnets, route tables, gateways',
          'Know Security Group vs NACL perfectly',
          'Understand CloudFront vs Global Accelerator',
          'Study Direct Connect vs VPN differences',
        ],
        duration: '2.5 hrs'
      },
      afternoon: {
        title: 'Learn: Management Tools',
        tasks: [
          'Review Week 7 flashcards (all 12 cards)',
          'Master CloudFormation (IaC)',
          'Understand Config vs CloudTrail (exam trap!)',
          'Know Control Tower vs Organizations vs SCPs',
          'Study Trusted Advisor categories',
        ],
        duration: '2 hrs'
      },
      evening: {
        title: 'Mock Exam + Weak Spot Drill',
        tasks: [
          'Take Practice Exam 3 (timed: 90 minutes)',
          'Target 75%+',
          'Identify your 2 weakest domains',
          'Do 15 questions on each weak domain',
        ],
        duration: '2.5 hrs'
      },
      target: 'Score 75%+ on timed mock — first timed attempt',
      weekFlashcards: 5,
    },
    {
      date: '2026-12-01',
      day: 6,
      label: 'Day 6 — Mon 1 Dec',
      emoji: '🚀',
      theme: 'Apps, Migration & ML',
      focus: 'Migration Services + Application Integration + ML',
      color: '#FF9900',
      morning: {
        title: 'Learn: Migration & Apps',
        tasks: [
          'Review Week 8 flashcards (all 12 cards)',
          'Master SQS vs SNS difference clearly',
          'Know the 7 Rs migration strategies',
          'Understand DMS for database migrations',
          'Study EventBridge and Step Functions basics',
        ],
        duration: '2 hrs'
      },
      afternoon: {
        title: 'Learn: Developer Tools & ML',
        tasks: [
          'Review Week 9 flashcards (all 12 cards)',
          'Know Rekognition, Polly, Comprehend use cases',
          'Understand SageMaker basics',
          'Study X-Ray for distributed tracing',
          'Review Bedrock and Generative AI on AWS',
        ],
        duration: '1.5 hrs'
      },
      evening: {
        title: 'Double Mock Day',
        tasks: [
          'Take Practice Exam 4 (90 min timed)',
          'Short break then Practice Exam 5',
          'Target 80%+ on at least one',
          'Review all wrong answers with rationale',
        ],
        duration: '3 hrs'
      },
      target: 'Score 80%+ on at least one mock exam',
      weekFlashcards: 8,
    },
    {
      date: '2026-12-02',
      day: 7,
      label: 'Day 7 — Tue 2 Dec',
      emoji: '💰',
      theme: 'Billing & Full Domain Review',
      focus: 'Billing + Pricing (12%) — Complete domain sweep',
      color: '#22C55E',
      morning: {
        title: 'Learn: Billing & Support',
        tasks: [
          'Master all 4 support plans (Basic/Dev/Business/Enterprise)',
          'Know Cost Explorer vs Budgets vs Pricing Calculator',
          'Understand Consolidated Billing + volume discounts',
          'Study Reserved vs Savings Plans vs Spot thoroughly',
          'Know all Free Tier categories',
        ],
        duration: '2 hrs'
      },
      afternoon: {
        title: 'Full Domain Review',
        tasks: [
          'Go through ALL 10 exam trap flashcards (Week 10 deck)',
          'Do 10 questions per domain (40 total)',
          'Focus time on your 2 weakest domains',
          'Review your cheat sheet — fill any gaps',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'Mock Exam Push',
        tasks: [
          'Take Practice Exam 6 (fully timed)',
          'Take Practice Exam 7 (fully timed)',
          'Target 85%+ on both',
          'If below 85%, note which domain — drill it tomorrow',
        ],
        duration: '3 hrs'
      },
      target: 'Score 85%+ on mocks. Billing 90%+.',
      weekFlashcards: 10,
    },
    {
      date: '2026-12-03',
      day: 8,
      label: 'Day 8 — Wed 3 Dec',
      emoji: '🎯',
      theme: 'Weak Spots + Exam Traps',
      focus: 'Targeted drilling of weakest areas',
      color: '#EF4444',
      morning: {
        title: 'Weakness Elimination',
        tasks: [
          'Check your practice history — find weakest domain',
          'Do 30 questions ONLY in that domain',
          'Review every wrong answer twice',
          'Go through all Exam Trap flashcards again',
          'Practice confused service pairs from Confusion tracker',
        ],
        duration: '2.5 hrs'
      },
      afternoon: {
        title: 'Speed & Accuracy Drills',
        tasks: [
          'Do 10 questions in 5 minutes (speed drill)',
          'Take Exam 8 fully timed',
          'Review wrong answers immediately',
          'Go through exam keywords cheat sheet',
        ],
        duration: '2.5 hrs'
      },
      evening: {
        title: 'Mock Exam Push for 90%',
        tasks: [
          'Take Practice Exam 9 (fully timed)',
          'Target 90%+',
          'If you hit 90% — celebrate! You are ready.',
          'Finalise your personal cheat sheet (1 page)',
        ],
        duration: '2 hrs'
      },
      target: '🎯 HIT 90%+ on mock today',
      weekFlashcards: 10,
    },
    {
      date: '2026-12-04',
      day: 9,
      label: 'Day 9 — Thu 4 Dec',
      emoji: '🏆',
      theme: 'Confidence Day',
      focus: 'Full simulation + confidence building before missionary',
      color: '#FF9900',
      morning: {
        title: 'Final Full Simulation',
        tasks: [
          'Take Practice Exam 10 — EXAM CONDITIONS',
          '90 minutes, no breaks, no notes, no help',
          'Score yourself and review',
          'If 90%+: you are exam-ready. Pack your confidence.',
        ],
        duration: '2 hrs'
      },
      afternoon: {
        title: 'Last Review',
        tasks: [
          'Go through your 1-page cheat sheet slowly',
          'Review any remaining weak areas',
          'Do one final pass of all 10 Week flashcard decks',
          'Note 5 exam tips to remember on exam day',
        ],
        duration: '2 hrs'
      },
      evening: {
        title: 'Prep for Missionary + Pack Plan',
        tasks: [
          'Set up your phone/tablet with flashcard access',
          'Plan your Dec 5-12 light review (20 mins/day)',
          'Write your exam day checklist',
          'Get a good night\'s sleep — you\'ve earned it',
        ],
        duration: '1 hr'
      },
      target: '🏆 90%+ confirmed. EXAM-READY. Travel with confidence.',
      weekFlashcards: 7,
    },
  ],

  // Light review plan for Dec 5-12 (Medical Missionary)
  lightReview: [
    { date:'2026-12-05', label:'Dec 5', task:'Week 1 + Week 6 flashcards (20 min)', focus:'Cloud Concepts + Security' },
    { date:'2026-12-06', label:'Dec 6', task:'Week 2 + Week 3 flashcards (20 min)', focus:'Compute + Storage' },
    { date:'2026-12-07', label:'Dec 7', task:'Week 4 + Week 5 flashcards (20 min)', focus:'Databases + Networking' },
    { date:'2026-12-08', label:'Dec 8', task:'Week 10 exam trap flashcards (15 min)', focus:'Tricky scenarios only' },
    { date:'2026-12-09', label:'Dec 9', task:'Do 20 practice questions (25 min)', focus:'Mixed domain drill' },
    { date:'2026-12-10', label:'Dec 10', task:'Week 7 + Week 8 flashcards (20 min)', focus:'Management + Migration' },
    { date:'2026-12-11', label:'Dec 11', task:'Review your cheat sheet (15 min)', focus:'Key terms refresh' },
    { date:'2026-12-12', label:'Dec 12', task:'Week 9 + exam keywords (15 min)', focus:'Dev Tools + final keywords' },
    { date:'2026-12-13', label:'Dec 13', task:'30 min MAX: cheat sheet only. Sleep early.', focus:'Rest & trust your prep' },
  ],

  examDayTips: [
    'Arrive 30 min early. Bring your ID.',
    'Read each question TWICE before answering.',
    'If unsure: eliminate 2 wrong answers first, then choose.',
    'Time = 90 min for 65 questions = 83 seconds per question.',
    'Flag tough questions and come back — don\'t get stuck.',
    'Look for trigger words: "MOST cost-effective", "LEAST effort", "serverless".',
    '"Who did what?" = CloudTrail. "Is CPU high?" = CloudWatch.',
    '"Decouple" = SQS. "Fan out" = SNS. "Containers no server" = Fargate.',
    'Shared Responsibility: AWS = hardware. You = data + IAM + OS.',
    'Trust your 9 days of preparation. You\'ve done the work.',
  ],
};
