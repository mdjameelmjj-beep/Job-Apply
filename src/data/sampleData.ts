import { ResumeProfile, JobCriteria, JobPosting } from '../types';

export const SAMPLE_PROFILES: { id: string; name: string; label: string; profile: ResumeProfile }[] = [
  {
    id: 'mohammed-jameel',
    name: 'Mohammed Jameel',
    label: 'AGI Director | Research, Knowledge Systems & Governance (12+ Yrs Exp)',
    profile: {
      fullName: 'Mohammed Jameel',
      email: 'mdjameel.mj@gmail.com',
      phone: '+91 7401431425',
      location: 'Chennai, Tamil Nadu, India (Open to Remote / UAE / US / Global)',
      title: 'AGI Director | Research, Knowledge Systems & Governance',
      yearsExperience: 12,
      summary:
        'Independent AI research and knowledge-systems leader with 12+ years of experience across analytics, machine-learning delivery, data strategy, and executive decision support. Founded and lead a public, source-governed research portfolio (1in8billion.net) that turns complex cross-domain material into reviewable AI research artefacts, retrieval pathways, and human-readable knowledge records. Combines analytical discipline with responsible-AI practice: transparent provenance, clear interpretive boundaries, and rigorous communication for technical and executive audiences.',
      skills: [
        'AI Governance & Operating Models',
        'Knowledge Systems Architecture',
        'RAG & Retrieval Pathways',
        'Explainable AI & Evaluation Design',
        'Human-in-the-Loop Review',
        'Python',
        'SQL',
        'Power BI & Enterprise BI',
        'Machine Learning Delivery',
        'Time-Series Forecasting',
        'KPI Architecture & Dashboards',
        'FP&A & Revenue Management',
        'Zero-Based Budgeting',
        'Data Strategy & Data Engineering',
        'Stakeholder Alignment',
        'Executive Decision Support',
      ],
      education:
        'MSc Data Science & Analytics, Liverpool John Moores University, UK (2022) | Bachelor of Commerce, University of Madras (2016)',
      targetRoles: [
        'AGI Director',
        'Director of AI Governance & Responsible AI',
        'Director of Knowledge Systems & AI Architecture',
        'Head of Analytics & Business Intelligence',
        'VP / Director of Data Strategy & Decision Support',
        'Principal AI Operating Model Lead',
      ],
      workExperience: [
        {
          role: 'Founder & AGI Research Director',
          company: 'Independent Research & Knowledge Systems Portfolio | 1in8billion.net',
          period: 'Jun 2023 - Present',
          highlights: [
            'Founded and lead an independent research programme on AI, language, consciousness studies, knowledge retrieval, and human-machine reasoning, supported by a public portfolio and structured research archive.',
            'Designed a source-governed knowledge architecture organizing cross-domain material into reviewable themes, traceable records, and retrieval-ready reference paths for AI-assisted analysis.',
            'Built and oversee a public living-research environment containing chronological records, source context, plain-language explanations, a source codex, and focused reading views.',
            'Lead the design of AI-facing research interactions prioritizing provenance, contextual response generation, stated limitations, and accountable human review.',
            'Produce executive AI strategy, governance operating models, and structured debate/case-record documentation for stakeholder-facing review.',
          ],
        },
        {
          role: 'Manager - Analytics & Business Intelligence',
          company: 'Anderson Diagnostics & Labs (India)',
          period: 'Feb 2025 - Jan 2026',
          highlights: [
            'Established and led the BI and Analytics function from the ground up to improve visibility of clinical and operational metrics for executive decision-making.',
            'Directed machine-learning initiatives for laboratory resource allocation, contributing to a reported 15% operational efficiency improvement.',
            'Trained and mentored cross-functional staff in data literacy and analytical decision-making frameworks.',
          ],
        },
        {
          role: 'Analytics Manager - FP&A & Revenue Management',
          company: 'Americana Group (UAE)',
          period: 'Jul 2022 - Mar 2024',
          highlights: [
            'Led revenue analytics supporting 2,700+ restaurants across MENA and approximately USD $3 Billion in sales.',
            'Delivered automated sales-forecasting workflows and executive dashboards that reduced manual reporting effort by 40%.',
            'Led machine-learning implementations for demand prediction and strategic capacity planning.',
          ],
        },
        {
          role: 'Assistant Manager - FP&A',
          company: 'Americana Group (UAE)',
          period: 'Aug 2020 - Feb 2022',
          highlights: [
            'Built dynamic cost models and statistical planning analyses supporting Zero-Based Budgeting and C-suite business decisions.',
            'Synthesized variance-to-driver analysis across regional operations.',
          ],
        },
        {
          role: 'Data Modeler & Business Analyst',
          company: 'Americana Group & NAFFCO (UAE)',
          period: 'Mar 2018 - Aug 2020',
          highlights: [
            'Developed operational labor-scheduling models and statistical sales analysis to drive measurable store-level productivity.',
            'Supported leadership decision-making through detailed KPI reporting and operational data modeling.',
          ],
        },
      ],
      rawResumeText: `MOHAMMED JAMEEL
+91 7401431425 | Chennai, Tamil Nadu, India | mdjameel.mj@gmail.com
LinkedIn: linkedin.com/in/mohammed-jameel-2883b211a | Portfolio: 1in8billion.net

AGI DIRECTOR | RESEARCH, KNOWLEDGE SYSTEMS & GOVERNANCE
Independent AI research and knowledge-systems leader with 12+ years of experience across analytics, machine-learning delivery, data strategy, and executive decision support. Founded and currently lead a public, source-governed research portfolio that turns complex cross-domain material into reviewable AI research artefacts, retrieval pathways, and human-readable knowledge records. Combines analytical discipline with responsible-AI practice: transparent provenance, clear interpretive boundaries, and rigorous communication for technical and non-technical audiences.

AGI DIRECTOR LEADERSHIP SCOPE
• Research direction and AI governance: Research strategy, AI operating models, source governance, evaluation design, human-in-the-loop review, and responsible communication.
• Knowledge-system architecture: Source archives, retrieval pathways, provenance labels, structured question flows, public documentation, and explainable research records.
• Decision and data systems: Enterprise BI, forecasting, machine learning, KPI architecture, executive dashboards, financial analytics, and outcome measurement.
• Technical and executive bridge: Python, SQL, Power BI, Generative AI, data engineering, time-series analysis, stakeholder alignment, and data-literacy enablement.

WORK EXPERIENCE
Founder & AGI Research Director | Jun 2023 - Present
Independent Research & Knowledge Systems Portfolio | 1in8billion.net | Remote / India
• Founded and lead an independent research programme on AI, language, consciousness studies, knowledge retrieval, and human-machine reasoning.
• Designed a source-governed knowledge architecture that organizes cross-domain material into reviewable themes, traceable records, and retrieval-ready reference paths for AI-assisted analysis.
• Built and oversee a public living-research environment containing chronological records, source context, plain-language explanations, and a source codex for transparent review.
• Defined the research workflow for translating unstructured material into labeled knowledge units, linking questions to relevant source context, and separating source interpretation from independent verification.
• Lead the design of AI-facing research interactions prioritizing provenance, contextual response generation, stated limitations, and accountable human review.
• Produce AI strategy, governance, and research communication materials for public and executive review.

Manager - Analytics & Business Intelligence | Feb 2025 - Jan 2026
Anderson Diagnostics & Labs | India
• Established and led the BI and Analytics function to improve visibility of operational metrics and executive decision-making.
• Directed machine-learning initiatives for resource allocation, contributing to a reported 15% efficiency improvement.
• Trained and mentored staff in data literacy and analytical decision-making.

Analytics Manager - FP&A & Revenue Management | Jul 2022 - Mar 2024
Americana Group | UAE
• Led revenue analytics supporting 2,700+ restaurants across MENA and approximately USD 3B in sales.
• Delivered sales-forecasting workflows and automated dashboards that reduced manual effort by 40%.
• Led machine-learning work for sales prediction and planning support.

Assistant Manager - FP&A | Aug 2020 - Feb 2022
Americana Group | UAE
• Built cost models and planning analysis supporting Zero-Based Budgeting and business decision-making.

Data Modeler | Jan 2020 - Aug 2020 | Americana Group | UAE
• Developed a labour-scheduling model and statistical sales analyses to inform operational efficiency.

Business Analyst & Data Analyst | 2016 - 2020
NAFFCO, Oasis Pure Water Company, HCL Technologies, MMC Infotech Services

EDUCATION
• MSc Data Science & Analytics | Liverpool John Moores University, United Kingdom (Online) | 2022
• Bachelor of Commerce, Corporate Secretaryship | University of Madras, India | 2016`,
    },
  },
  {
    id: 'swe-fullstack',
    name: 'Alex Rivera',
    label: 'Senior Full Stack Engineer (React, Node, Cloud)',
    profile: {
      fullName: 'Alex Rivera',
      email: 'alex.rivera.dev@example.com',
      phone: '+1 (415) 892-4410',
      location: 'San Francisco, CA (Open to Remote)',
      title: 'Senior Full Stack Engineer',
      yearsExperience: 6,
      summary:
        'Senior Full Stack Engineer with 6+ years experience in web platforms, distributed APIs, and cloud infrastructure.',
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      education: 'B.S. in Computer Science, UC Berkeley (2018)',
      targetRoles: ['Senior Full Stack Engineer', 'Staff Software Engineer'],
      workExperience: [],
      rawResumeText: '',
    },
  },
];

export const INITIAL_CRITERIA: JobCriteria = {
  targetTitles: [
    'AGI Director',
    'AI Governance Director',
    'Director of AI Governance',
    'Director of Knowledge Systems',
    'Head of Analytics & Business Intelligence',
    'Director of Data Strategy',
    'VP of Data Strategy & Decision Systems',
    'Principal AI Operating Model Lead',
  ],
  locations: ['Remote', 'Chennai, India', 'Dubai, UAE', 'US Remote', 'Global Remote'],
  workTypes: ['Remote', 'Hybrid'],
  minSalary: 165000,
  experienceLevels: ['Lead', 'Senior'],
  minMatchScore: 75,
  blacklistedCompanies: ['CryptoScam Arbitrage', 'Unverified Agency Inc'],
  blacklistedKeywords: ['unpaid', 'clerk', 'manual data entry', 'cold calling', 'commission only'],
  autoApplyMode: 'autonomous',
  dailyApplicationCap: 15,
  coverLetterTone: 'impactful',
  requireSponsorship: false,
};

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-jameel-101',
    title: 'Director of AI Governance & Responsible Knowledge Systems',
    company: 'Nexus Cognitive Labs',
    location: 'Remote (US / Global / India)',
    workType: 'Remote',
    salaryMin: 185000,
    salaryMax: 225000,
    experienceLevel: 'Lead',
    atsPlatform: 'Greenhouse',
    postedDate: 'Today, 1h ago',
    description:
      'Nexus Cognitive Labs is seeking an executive Director of AI Governance & Responsible Knowledge Systems to establish our enterprise-grade model evaluation framework, provenance tracking, and human-in-the-loop review architecture. You will bridge complex LLM / AGI research outputs with accountable corporate decision-making, ensuring inspectable provenance, safety guardrails, and audit trails across all deployed intelligence systems.',
    requirements: [
      '10+ years in analytical leadership, enterprise AI governance, knowledge systems, or data strategy.',
      'Demonstrated expertise in designing source governance, retrieval pathways (RAG), and evaluation design for LLMs.',
      'Strong background in bridging technical machine learning teams with executive C-suite stakeholders.',
      'Hands-on fluency with Python, SQL, and enterprise data models.',
      'Proven track record of turning complex unstructured knowledge into reviewable, audit-ready operational frameworks.',
    ],
    screeningQuestions: [
      'How do you design human-in-the-loop review and provenance guardrails for generative AI or knowledge retrieval systems?',
      'Describe your experience leading enterprise analytics or AI governance teams across executive stakeholders.',
      'What is your target compensation and availability to begin leading this division?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 94,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        '12+ years analytics and AI governance experience',
        'Source-governed architecture & provenance expertise (1in8billion.net)',
        'Proven executive and technical communication bridge',
      ],
      skillGaps: ['Familiarity with proprietary Nexus internal validation tooling'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exceptional alignment with candidate research direction, provenance architecture, and AGI governance leadership.',
    },
    submission: {
      submissionId: 'GH-98241',
      timestamp: '2026-09-04T08:15:00.000Z',
      tailoredCoverLetter: `Dear Nexus Cognitive Labs Hiring Team,

I am writing to express my strong interest in the Director of AI Governance & Responsible Knowledge Systems role. With 12+ years across analytics leadership, source-governed research architectures (1in8billion.net), and executive decision support, I have focused extensively on turning complex AI and cross-domain data into reviewable, audit-ready knowledge records with verifiable provenance.

At Americana Group, I directed analytics for 2,700+ units across MENA ($3B sales), automating forecasting and establishing high-trust decision models. More recently, as AGI Research Director, I designed source-governed knowledge retrieval architectures that prioritize human-in-the-loop review and transparent provenance.

I look forward to discussing how my experience can support Nexus Cognitive Labs in establishing industry-leading AI governance.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'How do you design human-in-the-loop review and provenance guardrails for generative AI or knowledge retrieval systems?',
          answer:
            'I establish strict source governance: structuring unstructured data into reviewable units, verifying source citations, and enforcing explicit human-in-the-loop checkpoints before outputs become executive action.',
        },
        {
          question:
            'Describe your experience leading enterprise analytics or AI governance teams across executive stakeholders.',
          answer:
            'Led enterprise analytics at Americana Group ($3B sales, 2,700+ stores) and BI at Anderson Diagnostics; currently direct public source-governed AI research programmes.',
        },
      ],
      tailoredHighlights: [
        '12+ years analytics & AI strategy',
        'Founded 1in8billion.net source-governed research archive',
        'Americana Group $3B revenue analytics leadership',
      ],
      atsPlatform: 'Greenhouse',
      status: 'Submitted',
    },
  },
  {
    id: 'job-jameel-102',
    title: 'Head of Business Intelligence & Revenue Analytics',
    company: 'Omnia Hospitality Group (MENA & Global)',
    location: 'Dubai, UAE / Hybrid (or Global Remote)',
    workType: 'Hybrid',
    salaryMin: 175000,
    salaryMax: 215000,
    experienceLevel: 'Lead',
    atsPlatform: 'Lever',
    postedDate: 'Today, 3h ago',
    description:
      'Omnia Hospitality Group operates 2,500+ multi-brand restaurant units across MENA, generating over $2.5B in annual sales. We are hiring a Head of BI & Revenue Analytics to direct automated forecasting pipelines, revenue optimization models, Power BI executive cockpits, and machine-learning allocation systems for operations.',
    requirements: [
      '8+ years leading BI, FP&A, or revenue analytics in multi-unit retail, enterprise hospitality, or large-scale consumer networks.',
      'Track record supporting large multi-billion dollar commercial portfolios with automated sales forecasting and driver-based planning.',
      'Expert-level mastery of Power BI, SQL, Python, time-series forecasting, and Zero-Based Budgeting frameworks.',
      'Proven ability to eliminate reporting latency and mentor staff in data literacy.',
    ],
    screeningQuestions: [
      'What experience do you have leading revenue analytics or forecasting for high-volume retail or multi-unit operations ($1B+)?',
      'How do you integrate machine-learning models into routine FP&A decision-making and operational planning?',
      'Are you open to hybrid work in Dubai or full remote engagement?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 89,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Direct multi-unit restaurant revenue analytics leadership (Americana Group)',
        'Enterprise Power BI, SQL, Python & Zero-Based Budgeting mastery',
        'Automated sales-forecasting reducing manual effort by 40%',
      ],
      skillGaps: ['Requires coordination across hybrid UAE team'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Direct match for multi-unit retail FP&A and ML-assisted sales prediction across MENA.',
    },
    submission: {
      submissionId: 'LEV-51029',
      timestamp: '2026-09-04T08:45:00.000Z',
      tailoredCoverLetter: `Dear Hiring Committee at Omnia Hospitality Group,

I am excited to apply for the Head of Business Intelligence & Revenue Analytics position. Having served as Analytics Manager for FP&A & Revenue Management at Americana Group in the UAE—overseeing commercial analytics across 2,700+ restaurants and USD 3B in sales—I understand the nuances of high-volume hospitality forecasting and operational decision cockpits.

I look forward to discussing how I can drive predictive planning and reporting automation for Omnia Hospitality.

Best regards,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'What experience do you have leading revenue analytics or forecasting for high-volume retail or multi-unit operations ($1B+)?',
          answer:
            'Led revenue analytics for Americana Group across MENA (2,700+ restaurants, $3B sales), automating sales forecasting and reducing reporting latency by 40%.',
        },
      ],
      tailoredHighlights: [
        'Managed FP&A & Revenue Analytics for 2,700+ MENA restaurants',
        'Zero-Based Budgeting & ML-driven labor scheduling',
      ],
      atsPlatform: 'Lever',
      status: 'Submitted',
    },
  },
  {
    id: 'job-jameel-103',
    title: 'Director of Enterprise Knowledge Systems & RAG Architecture',
    company: 'Synthetix Enterprise AI',
    location: 'Remote (US, EMEA, APAC)',
    workType: 'Remote',
    salaryMin: 190000,
    salaryMax: 240000,
    experienceLevel: 'Lead',
    atsPlatform: 'Ashby',
    postedDate: 'Yesterday',
    description:
      'Synthetix Enterprise AI is building the decision-intelligence layer for Fortune 500 enterprises. We are looking for a Director of Knowledge Systems to architect source archives, structured retrieval pathways, provenance labels, and explainable research records that allow C-level executives to interrogate enterprise data with verifiable citations.',
    requirements: [
      'Extensive background architecting knowledge retrieval architectures, source codices, and RAG pipelines.',
      'Deep understanding of model limitations, contextual response generation, and verifiable evidence pathways.',
      'Ability to translate unstructured, heterogeneous source material into labeled, machine-ingestible knowledge units.',
      'Strong executive presence with published portfolios or demonstrated research artefacts.',
    ],
    screeningQuestions: [
      'Explain your philosophy on source provenance and separating source interpretation from independent verification in AI systems.',
      'Provide an example of a knowledge architecture or retrieval pipeline you designed and deployed.',
      'What is your expected timeline and preferred work arrangement?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Deep background in knowledge retrieval architectures (RAG)',
        'Living research archive & Source Codex design (1in8billion.net)',
        'Translating heterogeneous material into labeled knowledge units',
      ],
      skillGaps: ['Minor stack adjustments for proprietary graph database'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Highest match in queue; candidate published source-governed research and retrieval pathways directly parallel Synthetix enterprise mission.',
    },
  },
  {
    id: 'job-jameel-104',
    title: 'VP of Data Strategy & Decision Support Systems',
    company: 'Apex HealthMetrics Diagnostics',
    location: 'Remote / India / Hybrid',
    workType: 'Remote',
    salaryMin: 170000,
    salaryMax: 210000,
    experienceLevel: 'Lead',
    atsPlatform: 'Workday',
    postedDate: '2 days ago',
    description:
      'Apex HealthMetrics is modernizing diagnostic laboratory networks with predictive analytics and centralized BI. We are recruiting a VP of Data Strategy & Decision Support Systems to lead data engineering, executive performance cockpits, operational machine-learning resource allocation, and organizational data literacy.',
    requirements: [
      'Proven leadership establishing and scaling BI and Analytics functions in clinical, laboratory, or diagnostic operations.',
      'Hands-on experience with ML initiatives for labor and equipment resource allocation that achieve double-digit efficiency gains.',
      'Strong executive dashboard architecture skills (KPI design, variance-to-driver analysis, margin tracking).',
      'Executive communication skills to present strategy to board members and medical directors.',
    ],
    screeningQuestions: [
      'Have you built or led BI & Analytics functions specifically within diagnostics, healthcare, or complex clinical operations?',
      'Can you cite an example where machine-learning resource allocation directly improved operational turnaround or efficiency?',
      'What are your primary technical tools for executive reporting and time-series modeling?',
    ],
    status: 'unprocessed',
  },
  {
    id: 'job-jameel-105',
    title: 'Principal AI Operating Model & Governance Lead',
    company: 'Vanguard FinTech International',
    location: 'Remote (US / UK / Global)',
    workType: 'Remote',
    salaryMin: 205000,
    salaryMax: 255000,
    experienceLevel: 'Lead',
    atsPlatform: 'Greenhouse',
    postedDate: '3 days ago',
    description:
      'Vanguard FinTech seeks a Principal AI Operating Model & Governance Lead to build our 30-60-90 day AI decision-layer blueprint. You will turn AI from an ungoverned demonstration into a decisive capability with role-aware retrieval, metric dictionaries, access risk controls, and automated audit trails.',
    requirements: [
      'Demonstrated experience drafting and executing 30-60-90 day AI governance and decision-system roadmaps.',
      'Deep alignment between financial planning (FP&A), BI, and AI governance design.',
      'Proven experience defining metric dictionaries and governance boundaries across regulated institutions.',
      'High-impact writing and technical articulation for executive committee reviews.',
    ],
    screeningQuestions: [
      'How do you approach a 30-60-90 day plan for introducing governed decision intelligence into an organization?',
      'How do you prevent hallucinations and ensure role-based access in conversational executive interfaces?',
      'What is your target compensation and availability for full-time executive engagement?',
    ],
    status: 'unprocessed',
  },
  {
    id: 'job-jameel-106',
    title: 'Junior Data Entry Clerk (Manual Spreadsheet Entry)',
    company: 'Legacy Logistics Hub',
    location: 'Chennai, India (100% On-site)',
    workType: 'On-site',
    salaryMin: 35000,
    salaryMax: 42000,
    experienceLevel: 'Entry',
    atsPlatform: 'Greenhouse',
    postedDate: '4 days ago',
    description:
      'Looking for a clerk to manually type invoices into Excel sheets all day. High school diploma required. No analytics or AI involved.',
    requirements: [
      'Typing speed 30 wpm.',
      'Basic knowledge of MS Excel copy-paste.',
      '100% in-office presence 6 days a week.',
    ],
    screeningQuestions: [
      'Can you type 30 words per minute?',
      'Are you able to work on-site in Chennai 6 days a week?',
    ],
    status: 'skipped',
    evaluation: {
      matchScore: 32,
      meetsCriteria: false,
      criteriaMatches: { title: false, salary: false, location: false, experience: false },
      keyStrengths: ['Overqualified for data entry'],
      skillGaps: [
        'Salary $35k is far below candidate threshold ($165k)',
        'Role is manual clerk entry with no AI/analytics',
        'Requires 100% on-site daily presence',
      ],
      recommendation: 'SKIP',
      reasoning: 'Extreme mismatch across salary, seniority level, and scope.',
    },
    skipReason: 'Below salary threshold ($35k < $165k) & Level mismatch (Clerk vs Director)',
  },
];
