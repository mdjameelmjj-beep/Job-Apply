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
  {
    id: 'job-google-201',
    title: 'Director of AI Governance & Responsible AI',
    company: 'Google (Google Cloud & Vertex AI)',
    location: 'Bengaluru, India / Hybrid (Open to Chennai / Remote)',
    workType: 'Hybrid',
    salaryMin: 195000,
    salaryMax: 245000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: 'Today, 2h ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Director%20AI%20Governance',
    description:
      'Google is seeking an executive Director of AI Governance & Responsible AI to establish enterprise-grade model evaluation, source provenance, and human-in-the-loop review guardrails across Google Cloud AI and Vertex AI enterprise deployments. You will bridge complex LLM / Gemini architectures with accountable corporate decision-making, ensuring transparent provenance, safety policies, and audit trails across global commercial customers.',
    requirements: [
      '10+ years leading enterprise AI governance, analytical strategy, or data leadership across multi-stakeholder organizations.',
      'Demonstrated expertise in designing source-governed knowledge retrieval (RAG) and model evaluation frameworks.',
      'Track record translating technical model safety guidelines into executive decision frameworks for C-level leadership.',
      'Fluency with Python, SQL, enterprise data architectures, and transparent provenance labels.',
      'Experience leading cross-functional teams in high-volume, regulated enterprise environments.',
    ],
    screeningQuestions: [
      'How do you design human-in-the-loop review and provenance guardrails for generative AI and knowledge retrieval systems?',
      'Describe your experience leading enterprise analytics or AI governance teams across executive stakeholders.',
      'What is your experience aligning AI safety frameworks with commercial business goals and P&L outcomes?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 97,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        '12+ years analytics and AI governance leadership',
        'Source-governed architecture & provenance codex founder (1in8billion.net)',
        'MSc Data Science (Liverpool) + $3B enterprise analytics leadership (Americana)',
      ],
      skillGaps: ['Deep familiarity with proprietary Google internal Vertex model evaluation tooling'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exceptional 97% match: candidate research direction, provenance architecture, and AGI governance leadership align directly with Google Cloud Responsible AI objectives.',
    },
    submission: {
      submissionId: 'GOOG-WD-78401',
      timestamp: '2026-09-05T09:00:00.000Z',
      tailoredCoverLetter: `Dear Google Talent Acquisition Team,

I am writing to express my enthusiastic interest in the Director of AI Governance & Responsible AI role within Google Cloud. With 12+ years across analytics leadership, source-governed research architectures (1in8billion.net), and executive decision support, my core focus is turning complex AI models and cross-domain data into reviewable, audit-ready knowledge records with verifiable provenance.

At Americana Group, I directed commercial analytics for 2,700+ units across MENA ($3B sales), building automated forecasting workflows and high-trust decision models. Through my independent AGI research portfolio, I pioneered source-governed knowledge retrieval architectures that prioritize human-in-the-loop review, strict citation provenance, and responsible AI guardrails.

Google’s leadership in foundational models demands rigorous, inspectable governance that enterprise customers can trust. I would welcome the opportunity to bring my hands-on governance frameworks and executive leadership to Google Cloud.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'How do you design human-in-the-loop review and provenance guardrails for generative AI and knowledge retrieval systems?',
          answer:
            'I enforce strict source governance: decomposing unstructured data into labeled knowledge units, mandating verifiable citation pathways, and inserting human-in-the-loop validation checkpoints before automated insights trigger business actions.',
        },
        {
          question:
            'Describe your experience leading enterprise analytics or AI governance teams across executive stakeholders.',
          answer:
            'Led enterprise analytics at Americana Group ($3B revenue, 2,700+ stores) and BI at Anderson Diagnostics; currently direct independent source-governed AI research programmes with published public artifacts.',
        },
        {
          question:
            'What is your experience aligning AI safety frameworks with commercial business goals and P&L outcomes?',
          answer:
            'With a foundation in corporate FP&A and $3B revenue oversight, I view AI governance not as a bottleneck, but as risk mitigation that unlocks commercial enterprise adoption by preventing hallucinations and regulatory non-compliance.',
        },
      ],
      tailoredHighlights: [
        '12+ years analytics leadership & source-governed AI research',
        'Direct multi-billion dollar FP&A & commercial analytics oversight',
        'Living research archive & Source Codex design at 1in8billion.net',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-202',
    title: 'Director, Enterprise Knowledge Systems & Semantic AI',
    company: 'Google (Google Cloud / Office of the CTO)',
    location: 'Remote (Global / India / Singapore / US)',
    workType: 'Remote',
    salaryMin: 210000,
    salaryMax: 260000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: 'Yesterday',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Knowledge%20Systems',
    description:
      'The Office of the CTO at Google Cloud is hiring a Director of Enterprise Knowledge Systems & Semantic AI. You will spearhead architectures for large-scale enterprise RAG pipelines, knowledge graphs, and unstructured data ingestion engines, enabling Global 2000 customers to unify fragmented information repositories into verifiable semantic knowledge layers.',
    requirements: [
      'Extensive background architecting knowledge retrieval architectures, source codices, and RAG pipelines.',
      'Deep understanding of model limitations, contextual response generation, and verifiable evidence pathways.',
      'Ability to translate unstructured, heterogeneous source material into labeled, machine-ingestible knowledge units.',
      'Strong executive presence with published portfolios or demonstrated research artefacts.',
      'MSc or advanced degree in Data Science, Computer Science, or analytical disciplines.',
    ],
    screeningQuestions: [
      'Explain your philosophy on source provenance and separating source interpretation from independent verification in AI systems.',
      'Provide an example of a knowledge architecture or retrieval pipeline you designed and deployed.',
      'What is your expected timeline and preferred work arrangement?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Deep background in knowledge retrieval architectures (RAG)',
        'Living research archive & Source Codex design (1in8billion.net)',
        'Translating heterogeneous material into labeled knowledge units',
        'MSc Data Science (Liverpool, UK)',
      ],
      skillGaps: ['Scale calibration for multi-exabyte Google Cloud customer topologies'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Direct alignment with candidate published research on source archives, retrieval pathways, and provenance labels.',
    },
    submission: {
      submissionId: 'GOOG-WD-78402',
      timestamp: '2026-09-05T09:05:00.000Z',
      tailoredCoverLetter: `Dear Google Cloud Office of the CTO,

I am writing to apply for the Director of Enterprise Knowledge Systems & Semantic AI role. With an MSc in Data Science from the University of Liverpool and as the architect of an independent living knowledge codex (1in8billion.net), I specialize in bridging unstructured enterprise information with verifiable semantic retrieval layers.

Throughout my 12+ years directing analytics architectures, I have championed the principle that automated AI reasoning must be anchored to immutable source provenance. At Americana Group, I designed multi-source data ingestion pipelines that eliminated manual reporting latency by 40% across 2,700+ commercial units.

I would be thrilled to bring my experience in knowledge graph modeling, source verification gates, and enterprise semantic indexing to Google Cloud.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'Explain your philosophy on source provenance and separating source interpretation from independent verification in AI systems.',
          answer:
            'I maintain that every AI synthesis must retain an unbroken cryptographic link to its underlying source record. In my public research codex (1in8billion.net), interpretive generation is strictly decoupled from ground-truth verification.',
        },
        {
          question:
            'Provide an example of a knowledge architecture or retrieval pipeline you designed and deployed.',
          answer:
            'Architected a multi-tier living knowledge codex that ingests, classifies, and indexes heterogeneous source documents into verifiable semantic units with provenance metadata.',
        },
        {
          question: 'What is your expected timeline and preferred work arrangement?',
          answer:
            'Available for immediate engagement on a remote or hybrid arrangement across India, APAC, UAE, and international hubs.',
        },
      ],
      tailoredHighlights: [
        'Founder of living research archive & Source Codex at 1in8billion.net',
        'MSc Data Science (University of Liverpool)',
        '12+ years analytics and knowledge engineering leadership',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-203',
    title: 'Head of Decision Intelligence & Applied Commercial Analytics',
    company: 'Google (Global Commercial Strategy & GTM)',
    location: 'Dubai, UAE / Hybrid (or Bengaluru / Singapore)',
    workType: 'Hybrid',
    salaryMin: 185000,
    salaryMax: 235000,
    experienceLevel: 'Lead',
    atsPlatform: 'Workday',
    postedDate: 'Today, 4h ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Decision%20Intelligence',
    description:
      'Google Global Commercial Operations is looking for a Head of Decision Intelligence & Applied Commercial Analytics. In this role, you will bridge machine-learning forecasting models with commercial decision-making across regional P&Ls, designing predictive sales cockpits, variance-to-driver decomposition, and automated executive reporting for Google Cloud commercial leaders.',
    requirements: [
      '8+ years leading revenue analytics, FP&A, or decision intelligence in multi-billion dollar enterprise operations.',
      'Demonstrated expertise automating forecasting workflows and reducing manual reporting latency by 40% or more.',
      'Mastery of Power BI, SQL, Python, time-series forecasting, and driver-based planning models.',
      'Proven track record mentoring cross-functional teams in data literacy and executive decision frameworks.',
    ],
    screeningQuestions: [
      'What experience do you have leading revenue analytics or forecasting for high-volume commercial operations ($1B+)?',
      'How do you integrate machine-learning models into routine executive decision-making and operational planning?',
      'Are you open to hybrid work in Dubai/UAE or Bengaluru?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Direct leadership of commercial analytics for $3B portfolio across MENA (Americana Group)',
        'Automated sales-forecasting reducing manual effort by 40%',
        'Zero-Based Budgeting and variance-to-driver modeling expertise',
      ],
      skillGaps: ['Adapting commercial frameworks from consumer retail/hospitality to enterprise cloud SaaS metrics'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exact match for candidate 12+ year analytics track record, UAE experience, and high-volume commercial forecasting scale.',
    },
    submission: {
      submissionId: 'GOOG-WD-78403',
      timestamp: '2026-09-05T09:12:00.000Z',
      tailoredCoverLetter: `Dear Google Commercial Strategy Leadership,

I am writing to apply for the Head of Decision Intelligence & Applied Commercial Analytics role in Dubai. Having spent over a decade leading enterprise FP&A and commercial analytics across the Middle East—including steering commercial analytics across Americana Group’s $3B sales portfolio covering 2,700+ units—I specialize in converting predictive analytics into decisive executive actions.

By implementing driver-based time-series forecasting and automated BI pipelines, my teams reduced manual reporting latency by 40% while empowering business leaders with instant variance-to-driver drilldowns. I am intimately familiar with the UAE commercial landscape and would be thrilled to bring this operational scale to Google’s regional growth.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'What experience do you have leading revenue analytics or forecasting for high-volume commercial operations ($1B+)?',
          answer:
            'Directed commercial analytics and FP&A across 12 MENA countries for Americana Group ($3B revenue, 2,700+ stores), deploying driver-based forecasting models and Zero-Based Budgeting frameworks.',
        },
        {
          question:
            'How do you integrate machine-learning models into routine executive decision-making and operational planning?',
          answer:
            'I translate algorithmic forecasts into clear driver-based levers (price elasticity, traffic, channel mix) embedded directly in executive decision cockpits with automated variance explanations.',
        },
        {
          question: 'Are you open to hybrid work in Dubai/UAE or Bengaluru?',
          answer:
            'Yes, I have deep professional roots in Dubai/UAE and am fully prepared for hybrid work in Dubai Internet City.',
        },
      ],
      tailoredHighlights: [
        'Americana Group $3B revenue analytics oversight across 2,700+ units',
        '40% reduction in reporting latency via automated forecasting',
        'Comprehensive GCC/UAE commercial leadership experience',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-204',
    title: 'Principal AI Strategy & Operating Model Director',
    company: 'Google Cloud (Advisory & Enterprise Transformation)',
    location: 'Remote (India / APAC / Global Remote)',
    workType: 'Remote',
    salaryMin: 200000,
    salaryMax: 250000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: '2 days ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=AI%20Strategy',
    description:
      'Google Cloud Consulting is seeking a Principal AI Strategy & Operating Model Director to advise enterprise C-suites on architecting 30-60-90 day AI transformation roadmaps. You will translate frontier AI capabilities into governed operating models, metric dictionaries, and decisive agentic workflows.',
    requirements: [
      'Experience drafting and executing executive AI governance, operating models, and decision-system blueprints.',
      'Deep alignment between financial analytics (FP&A), enterprise BI, and AI governance design.',
      'Experience defining metric dictionaries, access risk controls, and validation pathways across enterprise clients.',
      'Proven thought leadership with ability to present to board members and C-level executives.',
    ],
    screeningQuestions: [
      'How do you approach a 30-60-90 day plan for introducing governed decision intelligence into an enterprise?',
      'How do you establish transparent provenance and human-in-the-loop review in automated agentic workflows?',
      'What is your target compensation and availability for full-time executive engagement?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 94,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'AGI Research Director leadership and independent advisory background',
        'Proven ability to translate complex unstructured AI research into executive operating models',
        '12+ years spanning analytics, FP&A, and AI governance',
      ],
      skillGaps: ['Formal Google Cloud partner ecosystem certification'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Superb alignment with candidate 30-60-90 day strategic vision and ability to bridge executive business leaders with frontier AI.',
    },
    submission: {
      submissionId: 'GOOG-WD-78404',
      timestamp: '2026-09-05T09:18:00.000Z',
      tailoredCoverLetter: `Dear Google Cloud Consulting Leadership,

I am excited to submit my application for the Principal AI Strategy & Operating Model Director position. With 12+ years bridging enterprise analytics, financial governance ($3B Americana portfolio), and frontier source-governed AI research (1in8billion.net), I help enterprise C-suites navigate the transition from experimental AI pilots to durable, governed operating models.

My structured 30-60-90 day framework establishes transparent metric dictionaries, human-in-the-loop review guardrails, and quantifiable ROI targets. I look forward to bringing this balanced technical and executive perspective to Google Cloud’s most strategic clients.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'How do you approach a 30-60-90 day plan for introducing governed decision intelligence into an enterprise?',
          answer:
            'Day 1-30: Audit data provenance, risk boundaries, and core metric dictionaries. Day 31-60: Deploy pilot human-in-the-loop decision workflows with automated variance tracking. Day 61-90: Institutionalize operating governance, scale agentic pipelines, and measure P&L impact.',
        },
        {
          question:
            'How do you establish transparent provenance and human-in-the-loop review in automated agentic workflows?',
          answer:
            'By requiring every autonomous action to link back to verified source citations and enforcing human sign-off thresholds for material business or compliance-sensitive decisions.',
        },
        {
          question: 'What is your target compensation and availability for full-time executive engagement?',
          answer: 'Targeting $200k-$250k USD. Available immediately for full-time executive advisory.',
        },
      ],
      tailoredHighlights: [
        'Executive advisory and 30-60-90 day AI transformation framework',
        'Bridging $3B FP&A rigor with frontier AI governance',
        'Published independent research director at 1in8billion.net',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-205',
    title: 'Director, Cloud Commercial FP&A & Revenue Operations',
    company: 'Google Cloud (MENA Region)',
    location: 'Dubai Internet City, Dubai, UAE / Hybrid',
    workType: 'Hybrid',
    salaryMin: 195000,
    salaryMax: 245000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: 'Today, 1h ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Director%20FP%26A&location=Dubai',
    description:
      'Google Cloud MENA is looking for a Director of Commercial FP&A & Revenue Operations based in Dubai. You will oversee cloud commercial deal modeling, multi-country P&L forecasting across GCC/MENA markets, and automated executive decision cockpits for regional enterprise expansion.',
    requirements: [
      '10+ years directing commercial analytics, FP&A, or revenue modeling for multi-market operations ($1B+ scale).',
      'Extensive Middle East / GCC market experience with proven financial cadence leadership.',
      'Track record designing driver-based forecasting models and variance-to-driver decomposition.',
      'Proficiency in Power BI, SQL, Python, and automated executive financial reporting.',
    ],
    screeningQuestions: [
      'What is your experience managing high-scale ($1B+) commercial P&L or FP&A portfolios across UAE/MENA?',
      'How have you automated financial reporting cadence to eliminate manual variance analysis bottlenecks?',
      'Are you located in Dubai or available to work on a hybrid schedule in Dubai Internet City?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Direct leadership of commercial analytics for $3B Americana portfolio across UAE & MENA',
        'Zero-Based Budgeting and automated forecasting workflow track record',
        'Deep familiarization with GCC market commercial dynamics and multi-unit economics',
      ],
      skillGaps: ['Hyperscaler cloud consumption billing model nuances'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Outstanding 96% match: perfectly mirrors candidate 12+ years of FP&A leadership, $3B scale, and Dubai / GCC regional experience.',
    },
    submission: {
      submissionId: 'GOOG-WD-78405',
      timestamp: '2026-09-05T09:24:00.000Z',
      tailoredCoverLetter: `Dear Google Cloud MENA Finance Team,

I am writing to express my strong candidacy for the Director of Commercial FP&A & Revenue Operations role in Dubai. Managing analytics and commercial financial planning across 12 countries for Americana Group ($3B portfolio, 2,700+ stores), I directed multi-million dollar annual budgeting cycles and built automated forecasting pipelines that reduced reporting latency by 40%.

With deep expertise in driver-based financial modeling, Zero-Based Budgeting, and commercial deal analytics across the GCC, I am eager to drive revenue governance for Google Cloud’s rapid Middle East expansion.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'What is your experience managing high-scale ($1B+) commercial P&L or FP&A portfolios across UAE/MENA?',
          answer:
            'Led commercial and FP&A analytics for Americana Group across the Middle East ($3B sales, 2,700+ locations), managing multi-country commercial variance decomposition and board reporting.',
        },
        {
          question:
            'How have you automated financial reporting cadence to eliminate manual variance analysis bottlenecks?',
          answer:
            'Automated monthly executive reporting cadences using SQL and Power BI, replacing manual spreadsheet consolidation with real-time driver attribution.',
        },
        {
          question: 'Are you located in Dubai or available to work on a hybrid schedule in Dubai Internet City?',
          answer: 'Available immediately for on-site/hybrid schedule at Dubai Internet City.',
        },
      ],
      tailoredHighlights: [
        'Americana Group $3B FP&A analytics leadership across 12 MENA countries',
        'Zero-Based Budgeting and automated forecasting architecture',
        'Extensive UAE and GCC commercial financial expertise',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-206',
    title: 'Head of Enterprise Analytics & Decision Sciences',
    company: 'Google (Middle East & North Africa)',
    location: 'Dubai, UAE / Hybrid',
    workType: 'Hybrid',
    salaryMin: 185000,
    salaryMax: 230000,
    experienceLevel: 'Lead',
    atsPlatform: 'Workday',
    postedDate: 'Yesterday',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Head%20of%20Analytics&location=Dubai',
    description:
      'Lead a high-performing analytics and decision science team driving quantitative commercial insights, customer lifetime value modeling, and predictive planning for Google products and advertising platforms across the Middle East.',
    requirements: [
      '8+ years in analytics leadership, business intelligence, or decision science.',
      'Proven ability to translate advanced data models into actionable executive roadmaps.',
      'Experience in multi-national corporate environments with complex stakeholder matrices.',
    ],
    screeningQuestions: [
      'How do you partner with commercial sales and product leaders to quantify decision ROI?',
      'Describe a complex predictive model you deployed that altered strategic resource allocation.',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Mastery in quantitative decision intelligence & commercial analytics',
        'Demonstrated leadership across multi-stakeholder corporate structures',
        'MSc Data Science (Liverpool) qualification',
      ],
      skillGaps: ['Search advertising auction mechanics'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exceptional alignment for Dubai-based executive analytics and commercial decision science leadership.',
    },
    submission: {
      submissionId: 'GOOG-WD-78406',
      timestamp: '2026-09-05T09:30:00.000Z',
      tailoredCoverLetter: `Dear Google MENA Analytics Leadership,

I am writing to apply for the Head of Enterprise Analytics & Decision Sciences role in Dubai. Holding an MSc in Data Science from the University of Liverpool and over 12 years of analytics leadership across the Middle East, I specialize in transforming complex commercial datasets into decisive strategic roadmaps.

Having directed commercial intelligence across 2,700+ business units, I partner closely with executive leadership to quantify growth opportunities and optimize resource allocation. I welcome the opportunity to lead Google's regional decision science team.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question: 'How do you partner with commercial sales and product leaders to quantify decision ROI?',
          answer:
            'By building transparent attribution frameworks that link analytics initiatives directly to margin expansion, cost-to-serve reduction, and sales conversion.',
        },
        {
          question: 'Describe a complex predictive model you deployed that altered strategic resource allocation.',
          answer:
            'Built an automated multi-unit sales forecasting engine across 2,700+ stores that reallocated commercial marketing spend to high-elasticity clusters, unlocking significant margin improvement.',
        },
      ],
      tailoredHighlights: [
        'MSc in Data Science (Liverpool)',
        '12+ years quantitative analytics leadership in MENA',
        'Proven commercial ROI and stakeholder management',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-207',
    title: 'Principal Architect – Enterprise Knowledge Graphs & Generative Search',
    company: 'Google Cloud AI & Search',
    location: 'Bengaluru, India / Hybrid (Open to Chennai)',
    workType: 'Hybrid',
    salaryMin: 190000,
    salaryMax: 240000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: 'Today, 3h ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Knowledge%20Graph&location=India',
    description:
      'Google Cloud India is seeking a Principal Architect to design and guide large-scale enterprise knowledge graph architectures, source-grounded RAG pipelines, and semantic enterprise search for Google Cloud customers across India and APAC.',
    requirements: [
      '10+ years architecting data systems, semantic layers, and knowledge retrieval pipelines.',
      'Deep expertise in source verification, citation provenance, and unstructured data ingestion.',
      'Published research or working architecture portfolios in knowledge systems or AGI codices.',
    ],
    screeningQuestions: [
      'What is your architectural approach to preventing retrieval hallucinations in enterprise RAG systems?',
      'How do you label and segment heterogeneous source data into verifiable knowledge units?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Living Source Codex and Knowledge Archive architect (1in8billion.net)',
        'MSc Data Science & Analytics research specialization',
        'Based in India (Chennai/Bengaluru corridor)',
      ],
      skillGaps: ['Google internal Spanner / Bigtable graph index scale'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Direct technical fit with candidate public research in source-governed architectures and citation pathways.',
    },
    submission: {
      submissionId: 'GOOG-WD-78407',
      timestamp: '2026-09-05T09:36:00.000Z',
      tailoredCoverLetter: `Dear Google Cloud AI & Search Engineering Team,

I am writing to apply for the Principal Architect role focusing on Enterprise Knowledge Graphs & Generative Search. As the architect behind 1in8billion.net—an independent research archive and Source Codex—and holder of an MSc in Data Science from the University of Liverpool, my research focuses on grounding generative models in verified source graphs.

I have spent over a decade engineering enterprise data architectures that eliminate retrieval ambiguity and preserve citation provenance. I am eager to bring these principles to Google Cloud’s enterprise search and Vertex AI ecosystem.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'What is your architectural approach to preventing retrieval hallucinations in enterprise RAG systems?',
          answer:
            'I mandate strict provenance tagging and citation gates: every synthesized response must trace back to discrete, immutable source passages, rejecting queries where confidence boundaries are unmet.',
        },
        {
          question:
            'How do you label and segment heterogeneous source data into verifiable knowledge units?',
          answer:
            'Through modular semantic chunking paired with metadata schemas that capture source authority, timestamp, and domain taxonomy before ingestion into graph indices.',
        },
      ],
      tailoredHighlights: [
        'Creator of living research archive & Source Codex (1in8billion.net)',
        'MSc in Data Science (Liverpool)',
        'Expert in source-grounded RAG & knowledge graph architecture',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-208',
    title: 'Director of Business Intelligence & Data Solutions',
    company: 'Google Operations Center (GOC)',
    location: 'Hyderabad / Bengaluru, India / Hybrid',
    workType: 'Hybrid',
    salaryMin: 175000,
    salaryMax: 220000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: '3 days ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Director%20BI&location=India',
    description:
      'Direct the enterprise BI roadmap, metric dictionary standardization, and automated decision engineering for Google Operations Centers supporting global user operations and enterprise services.',
    requirements: [
      '10+ years leading enterprise BI, data warehousing, and operational analytics teams.',
      'Experience managing 15+ member analytics organizations in high-throughput enterprise environments.',
      'Proven expertise with SQL, modern BI tools, metric governance, and data quality frameworks.',
    ],
    screeningQuestions: [
      'How do you govern and unify competing metric definitions across disparate enterprise divisions?',
      'Describe your experience building and mentoring senior data analytics teams in India.',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 93,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        '12+ years of enterprise data and business intelligence leadership',
        'Direct experience standing up standardized BI cockpits and automated reporting',
        'Strong people leadership and technical mentoring track record',
      ],
      skillGaps: ['GOC-specific operations workflow integration'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Solid senior leadership fit for large-scale enterprise BI and metric governance in India.',
    },
    submission: {
      submissionId: 'GOOG-WD-78408',
      timestamp: '2026-09-05T09:42:00.000Z',
      tailoredCoverLetter: `Dear Google Operations Center Leadership,

I am writing to express my interest in the Director of Business Intelligence & Data Solutions role. Over the past 12+ years, I have led high-impact BI and data analytics functions across multi-stakeholder enterprise environments, establishing single-source-of-truth metric dictionaries and automated reporting systems.

Having managed enterprise analytics teams at Americana Group and Anderson Diagnostics, I cultivate cultures of high technical rigor, automated data validation, and deep business alignment. I look forward to contributing to GOC’s operational excellence.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'How do you govern and unify competing metric definitions across disparate enterprise divisions?',
          answer:
            'I establish an enterprise metric governance council with published semantic dictionaries and automated data validation rules embedded into central transformation pipelines.',
        },
        {
          question:
            'Describe your experience building and mentoring senior data analytics teams in India.',
          answer:
            'Managed cross-functional BI teams of 15+ analysts and data engineers across India and the Middle East, conducting structured mentoring, skill progression roadmaps, and technical masterclasses.',
        },
      ],
      tailoredHighlights: [
        '12+ years directing enterprise BI & data engineering',
        'Single-source-of-truth metric governance architecture',
        'Demonstrated team building and operational leadership in India',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-209',
    title: 'Director of Responsible AI & Algorithmic Safety Governance',
    company: 'Google (Alphabet Core & AI Ethics)',
    location: 'Mountain View, CA, United States / Remote US',
    workType: 'Remote',
    salaryMin: 235000,
    salaryMax: 295000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: 'Today, 5h ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Responsible%20AI&location=United%20States',
    description:
      'Google is hiring an executive Director of Responsible AI & Algorithmic Safety Governance. You will spearhead algorithmic risk assessments, source attribution standards, and human-in-the-loop review policies across Gemini foundational models and Google product integrations globally.',
    requirements: [
      '12+ years leading data governance, responsible AI, or technology policy in tier-1 organizations.',
      'Demonstrated expertise in algorithmic evaluation, provenance tracking, and regulatory readiness (NIST AI RMF, EU AI Act).',
      'Strong executive communication skills with experience publishing frameworks or addressing executive boards.',
    ],
    screeningQuestions: [
      'How do you balance rapid frontier AI feature deployment with rigorous pre-launch safety and provenance review?',
      'What are your primary mechanisms for auditing source attribution in generative AI pipelines?',
      'Are you eligible to work remotely in the United States or on a US-sponsored executive visa?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Dedicated research in source-governed AI architectures and provenance verification',
        'UK Master of Science in Data Science credential + 12+ years leadership',
        'Authored human-in-the-loop review methodology',
      ],
      skillGaps: ['US work authorization transfer or O-1/EB-1 visa processing'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exceptional alignment with candidate core research thesis on inspectable provenance and responsible AI governance.',
    },
    submission: {
      submissionId: 'GOOG-WD-78409',
      timestamp: '2026-09-05T09:48:00.000Z',
      tailoredCoverLetter: `Dear Alphabet AI Governance & Ethics Leadership,

I am writing to apply for the Director of Responsible AI & Algorithmic Safety Governance role. As an independent AGI researcher, founder of 1in8billion.net, and holder of an MSc in Data Science from the University of Liverpool, my work addresses the core challenge of frontier AI: ensuring that automated systems remain auditable, provenance-verified, and aligned with rigorous safety boundaries.

With 12+ years spanning analytics leadership, high-trust decision models ($3B Americana commercial oversight), and published source codices, I design governance frameworks that empower rapid innovation while safeguarding institutional trust. I would welcome the opportunity to lead responsible AI governance for Alphabet.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'How do you balance rapid frontier AI feature deployment with rigorous pre-launch safety and provenance review?',
          answer:
            'By establishing automated CI/CD evaluation testbeds with pre-defined safety thresholds, combined with human-in-the-loop review for high-impact edge cases.',
        },
        {
          question:
            'What are your primary mechanisms for auditing source attribution in generative AI pipelines?',
          answer:
            'Implementing cryptographic citation hashes that link synthesized output tokens to verified source corpus passages, flagging ungrounded claims for immediate human audit.',
        },
        {
          question:
            'Are you eligible to work remotely in the United States or on a US-sponsored executive visa?',
          answer:
            'Eligible for US remote work arrangements and qualified for O-1/EB-1 executive sponsorship based on published research and international leadership.',
        },
      ],
      tailoredHighlights: [
        'Pioneer in source-governed AI architectures (1in8billion.net)',
        'MSc Data Science (Liverpool) with 12+ years enterprise leadership',
        'Author of verifiable provenance evaluation frameworks',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  {
    id: 'job-google-210',
    title: 'Head of Quantitative Decision Support & FP&A Systems',
    company: 'Google (Global Finance & Commercial Strategy)',
    location: 'New York, NY / Sunnyvale, CA, United States / Hybrid',
    workType: 'Hybrid',
    salaryMin: 220000,
    salaryMax: 275000,
    experienceLevel: 'Executive',
    atsPlatform: 'Workday',
    postedDate: '2 days ago',
    sourceUrl: 'https://www.google.com/about/careers/applications/jobs/results?q=Decision%20Support&location=United%20States',
    description:
      'Google Finance is seeking a Head of Quantitative Decision Support & FP&A Systems. You will direct the engineering of automated financial forecasting systems, scenario planning engines, and driver-based budgeting models for Alphabet corporate leadership.',
    requirements: [
      '10+ years leading quantitative finance systems, enterprise FP&A, or decision intelligence in multi-billion dollar operations.',
      'Demonstrated track record automating manual planning cycles and building driver-based P&L simulation engines.',
      'High proficiency in statistical time-series forecasting, Python, SQL, and enterprise BI platforms.',
    ],
    screeningQuestions: [
      'Describe how you have modeled driver-based elasticity for multi-billion dollar corporate revenue lines.',
      'How do you bridge technical data scientists with corporate FP&A directors during annual budgeting cycles?',
    ],
    status: 'applied',
    evaluation: {
      matchScore: 94,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Americana Group $3B FP&A analytics leadership across 2,700+ commercial units',
        'Zero-Based Budgeting and 40% reduction in reporting latency achievement',
        'Deep mastery of driver-based forecasting models',
      ],
      skillGaps: ['US relocation timeline coordination'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exact quantitative finance and $3B commercial FP&A experience alignment for Alphabet corporate finance.',
    },
    submission: {
      submissionId: 'GOOG-WD-78410',
      timestamp: '2026-09-05T09:54:00.000Z',
      tailoredCoverLetter: `Dear Google Finance & Strategy Leadership,

I am writing to apply for the Head of Quantitative Decision Support & FP&A Systems role. Having directed commercial analytics and FP&A across 12 countries for Americana Group ($3B sales, 2,700+ commercial units), I specialize in building automated financial forecasting engines that eliminate manual reporting lag and provide real-time decision support.

Holding an MSc in Data Science from the University of Liverpool, I seamlessly translate quantitative time-series models into driver-based financial levers that corporate CFOs and business heads rely upon. I would be thrilled to bring this quantitative rigor to Alphabet corporate finance.

Sincerely,
Mohammed Jameel`,
      screeningAnswers: [
        {
          question:
            'Describe how you have modeled driver-based elasticity for multi-billion dollar corporate revenue lines.',
          answer:
            'Built statistical multivariate elasticity models incorporating commodity indices, price adjustments, and footfall across 2,700+ locations, automating monthly rolling P&L simulations with 95%+ forecast precision.',
        },
        {
          question:
            'How do you bridge technical data scientists with corporate FP&A directors during annual budgeting cycles?',
          answer:
            'By establishing standardized metric definitions and wrapping complex statistical algorithms in intuitive scenario sliders that finance directors can test during live review sessions.',
        },
      ],
      tailoredHighlights: [
        'Americana Group $3B portfolio FP&A analytics leadership',
        '40% reduction in manual financial reporting latency',
        'MSc in Data Science with quantitative finance mastery',
      ],
      atsPlatform: 'Workday',
      status: 'Submitted',
    },
  },
  // 40-Day-Old Active Openings: Naukri & Indeed
  {
    id: 'job-naukri-401',
    title: 'Director of Enterprise AI Governance & Source Provenance',
    company: 'CognitiveScale India (via Naukri.com)',
    location: 'Bengaluru / Chennai, India (Hybrid)',
    workType: 'Hybrid',
    salaryMin: 180000,
    salaryMax: 225000,
    experienceLevel: 'Executive',
    atsPlatform: 'Naukri',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.naukri.com/job-listings-director-ai-governance-source-provenance-bangalore-chennai',
    description:
      'Leading enterprise AI governance, algorithmic auditability, and verifiable provenance frameworks across Fortune 500 client rollouts. You will direct model evaluation testbeds, human-in-the-loop review protocols, and audit-ready provenance tracing for generative AI and decision engines.',
    requirements: [
      '10+ years in enterprise analytics, machine learning, and AI governance leadership.',
      'Demonstrated architecture of source-governed retrieval systems (RAG) and transparent provenance citation.',
      'Experience presenting AI risk and evaluation frameworks to executive boards and client C-suites.',
      'MSc or advanced degree in Data Science, Analytics, or related quantitative field.',
      'Fluency in Python, SQL, vector retrieval systems, and metric dictionary standards.',
    ],
    screeningQuestions: [
      'Total years of experience leading Enterprise Analytics and AI Governance teams?',
      'Have you architected source-governed knowledge retrieval (RAG) pipelines with verifiable provenance?',
      'What is your expected compensation (INR / USD) and current notice period?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        '12+ years in analytics and AI governance leadership',
        'Pioneer in source-governed knowledge architectures (1in8billion.net)',
        'MSc in Data Science (Liverpool) with deep provenance expertise',
      ],
      skillGaps: ['Client-specific billing frameworks on Naukri enterprise portal'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exceptional alignment on AI governance, provenance systems, and executive leadership in India/Global remote.',
    },
  },
  {
    id: 'job-indeed-402',
    title: 'Director of Knowledge Engineering & Semantic Retrieval Systems',
    company: 'Fractal Analytics Labs (via Indeed Apply)',
    location: 'Chennai, Tamil Nadu / Remote (India & APAC)',
    workType: 'Remote',
    salaryMin: 185000,
    salaryMax: 230000,
    experienceLevel: 'Lead',
    atsPlatform: 'Indeed',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.indeed.com/viewjob?jk=fractal-knowledge-engineering-director-40d',
    description:
      'Fractal Analytics is seeking a Director of Knowledge Engineering to architect living source codices, semantic graph retrieval, and enterprise question-answering systems with uncompromised provenance links. You will lead cross-functional data scientists and domain curators.',
    requirements: [
      '10+ years architecting knowledge retrieval architectures, source codices, and RAG pipelines.',
      'Deep understanding of separating interpretive synthesis from ground-truth verification.',
      'Ability to translate unstructured, heterogeneous source material into labeled, machine-ingestible knowledge units.',
      'Strong executive presence with published portfolios or demonstrated research artefacts.',
    ],
    screeningQuestions: [
      'Explain your philosophy on source provenance and separating source interpretation from independent verification.',
      'Provide an example of a knowledge architecture or retrieval pipeline you designed and deployed.',
      'What is your expected timeline and preferred work arrangement?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Living research archive & Source Codex design (1in8billion.net)',
        'Deep background in knowledge retrieval architectures (RAG)',
        'Based in Chennai with remote leadership capability',
      ],
      skillGaps: ['Minor stack adjustments for proprietary graph database'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Directly parallels candidate published research in source-governed retrieval and knowledge architectures.',
    },
  },
  {
    id: 'job-naukri-403',
    title: 'Head of Commercial FP&A & Decision Intelligence (MENA)',
    company: 'Majid Al Futtaim Group (via Naukri Gulf)',
    location: 'Dubai, UAE / Hybrid (Open to UAE & India Hubs)',
    workType: 'Hybrid',
    salaryMin: 190000,
    salaryMax: 240000,
    experienceLevel: 'Executive',
    atsPlatform: 'Naukri',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.naukrigulf.com/head-commercial-fpa-decision-intelligence-jobs-in-dubai-uae',
    description:
      'Direct regional commercial finance planning, rolling sales forecasting, and driver-based budgeting across 1,800+ retail and hospitality business units in the Middle East. Drive Zero-Based Budgeting and reduce financial reporting latency.',
    requirements: [
      '10+ years directing commercial analytics and FP&A in multi-billion dollar multi-unit retail/hospitality portfolios in MENA/GCC.',
      'Demonstrated track record automating manual planning cycles and building driver-based P&L simulation engines.',
      'High proficiency in statistical time-series forecasting, Power BI, SQL, and enterprise BI platforms.',
      'Prior executive experience in GCC/MENA region (Dubai, Riyadh, Kuwait).',
    ],
    screeningQuestions: [
      'Experience managing multi-unit hospitality or retail FP&A portfolios ($1B+)?',
      'Describe how you automated forecasting or implemented Zero-Based Budgeting in previous roles.',
      'Are you available for remote leadership or hybrid presence in Dubai/GCC?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 97,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Americana Group $3B FP&A analytics leadership across 2,700+ commercial units in MENA',
        'Zero-Based Budgeting and 40% reduction in reporting latency achievement',
        'Deep regional familiarity with Dubai/GCC commercial landscape',
      ],
      skillGaps: ['Local UAE labor law contract specifics'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Virtually identical match to candidate former leadership at Americana Group across scale, region, and financial rigor.',
    },
  },
  {
    id: 'job-indeed-404',
    title: 'VP of Data Strategy & Decision Support Systems',
    company: 'Quantiphi Applied AI (via Indeed Prime)',
    location: 'Bengaluru / Chennai, India / US Remote',
    workType: 'Remote',
    salaryMin: 195000,
    salaryMax: 245000,
    experienceLevel: 'Executive',
    atsPlatform: 'Indeed',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.indeed.com/viewjob?jk=quantiphi-vp-data-strategy-decision-support',
    description:
      'Lead enterprise data strategy, automated financial forecasting, and metric dictionaries across tier-1 international clients. Bridge C-suite decision cockpits with predictive machine learning and operational resource allocation.',
    requirements: [
      '12+ years experience leading enterprise analytics, data strategy, or decision intelligence.',
      'Proven track record implementing metric dictionaries, automated forecasting, and executive cockpits.',
      'Executive communication skills to present strategy to board members and corporate stakeholders.',
      'Fluency in modern cloud data warehouses, Python, SQL, and BI tools.',
    ],
    screeningQuestions: [
      'How do you bridge technical data scientists with corporate FP&A directors during budgeting cycles?',
      'Can you cite an example where machine-learning resource allocation directly improved operational turnaround?',
      'What are your primary technical tools for executive reporting and time-series modeling?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        '12+ years data strategy and enterprise BI leadership',
        'Demonstrated automated forecasting and P&L modeling at scale',
        'Chennai/Bengaluru/Remote flexibility',
      ],
      skillGaps: ['Client consulting billing model adaptation'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Strong alignment with candidate FP&A analytics background and executive decision support architecture.',
    },
  },
  {
    id: 'job-naukri-405',
    title: 'Director of Healthcare Analytics & Diagnostic Operations',
    company: 'Apollo Health Intelligence & Diagnostics (Naukri Premium)',
    location: 'Chennai, Tamil Nadu, India (Hybrid / Flexible)',
    workType: 'Hybrid',
    salaryMin: 175000,
    salaryMax: 215000,
    experienceLevel: 'Lead',
    atsPlatform: 'Naukri',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.naukri.com/job-listings-director-healthcare-diagnostics-analytics-chennai-apollo',
    description:
      'Lead clinical laboratory analytics, TAT reduction, machine-learning resource scheduling, and executive performance dashboards across high-volume diagnostic networks in India and GCC. Work closely with medical directors and operational heads.',
    requirements: [
      'Proven leadership establishing and scaling BI and Analytics functions in clinical, laboratory, or diagnostic operations.',
      'Hands-on experience with ML initiatives for labor and equipment resource allocation that achieve double-digit efficiency gains.',
      'Strong executive dashboard architecture skills (KPI design, variance-to-driver analysis, margin tracking).',
      'Based in or willing to work hybrid in Chennai, Tamil Nadu.',
    ],
    screeningQuestions: [
      'Have you built or led BI & Analytics functions specifically within diagnostics, healthcare, or complex clinical operations?',
      'Can you cite an example where ML resource allocation directly improved operational turnaround in diagnostics?',
      'What is your availability to begin leading this division in Chennai?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 95,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Direct Anderson Diagnostics operational analytics leadership experience',
        'Demonstrated 25% TAT reduction in laboratory networks using ML scheduling',
        'Located in Chennai with immediate regional domain expertise',
      ],
      skillGaps: ['Apollo internal HIS/LIMS software migration knowledge'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Candidate prior experience in diagnostic laboratory analytics (Anderson Diagnostics) in Chennai makes this an exemplary operational match.',
    },
  },
  {
    id: 'job-indeed-406',
    title: 'Principal AI Operating Model & Governance Lead',
    company: 'Mu Sigma Enterprise Advisory (via Indeed Apply)',
    location: 'Bengaluru, India / Hybrid / Remote',
    workType: 'Hybrid',
    salaryMin: 185000,
    salaryMax: 230000,
    experienceLevel: 'Lead',
    atsPlatform: 'Indeed',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.indeed.com/viewjob?jk=musigma-principal-ai-governance-operating-model',
    description:
      'Design and implement 30-60-90 day AI operating model transformations for global enterprise clients. Deploy governance councils, access controls, metric standardization, and automated evaluation frameworks.',
    requirements: [
      'Demonstrated experience drafting and executing 30-60-90 day AI governance and decision-system roadmaps.',
      'Deep alignment between financial planning (FP&A), BI, and AI governance design.',
      'Proven experience defining metric dictionaries and governance boundaries across regulated institutions.',
      'High-impact writing and technical articulation for executive committee reviews.',
    ],
    screeningQuestions: [
      'How do you approach a 30-60-90 day plan for introducing governed decision intelligence into an organization?',
      'How do you prevent hallucinations and ensure role-based access in conversational executive interfaces?',
      'What is your target compensation and availability for executive advisory engagement?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 94,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Pioneer in verifiable AI governance and evaluation frameworks',
        'Track record translating technical guidelines into C-suite executive blueprints',
        'Strong FP&A and metric dictionary background',
      ],
      skillGaps: ['Mu Sigma proprietary decision framework certification'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Superb match on candidate AI governance framework, metric dictionaries, and 30-60-90 day execution methodologies.',
    },
  },
  {
    id: 'job-naukri-407',
    title: 'Director of Revenue Operations & Commercial Analytics',
    company: 'Landmark Group MENA (via Naukri Gulf)',
    location: 'Dubai Internet City, UAE (Hybrid)',
    workType: 'Hybrid',
    salaryMin: 185000,
    salaryMax: 235000,
    experienceLevel: 'Executive',
    atsPlatform: 'Naukri',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.naukrigulf.com/director-revenue-operations-commercial-analytics-dubai-landmark',
    description:
      'Lead commercial analytics, customer margin optimization, and store-level driver forecasting across 2,000+ retail outlets across GCC countries. Report directly to Chief Commercial Officer.',
    requirements: [
      '10+ years analytics experience with significant tenure leading large-scale multi-unit retail or hospitality in the Gulf.',
      'Deep mastery of automated sales forecasting, promotional elasticity, and Power BI executive portals.',
      'Demonstrated experience managing P&L analytics exceeding $1.5B+ annual turnover.',
    ],
    screeningQuestions: [
      'What experience do you have managing revenue analytics for multi-unit retail or hospitality operations?',
      'Have you worked with GCC retail and hospitality operations across UAE, Saudi Arabia, and Kuwait?',
      'What is your expected CTC in AED / USD?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Direct experience directing commercial analytics across 2,700+ units in 12 MENA countries',
        'Proven track record in promotional elasticity and price optimization models',
        'Familiar with Landmark Group scale and regional market dynamics',
      ],
      skillGaps: ['Familiarity with Landmark proprietary omni-channel loyalty scheme'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Candidate multi-unit MENA retail experience ($3B sales at Americana) aligns directly with Landmark Group scale.',
    },
  },
  {
    id: 'job-indeed-408',
    title: 'Director of Responsible AI, Safety & Algorithmic Audit',
    company: 'Turing.com Global AI Network (via Indeed Remote)',
    location: 'Remote (India / UAE / US / Global)',
    workType: 'Remote',
    salaryMin: 200000,
    salaryMax: 250000,
    experienceLevel: 'Executive',
    atsPlatform: 'Indeed',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.indeed.com/viewjob?jk=turing-director-responsible-ai-safety-audit-remote',
    description:
      'Lead global evaluation testbeds, inspectable provenance auditing, and human-in-the-loop review architecture for frontier foundation model fine-tuning and enterprise deployment.',
    requirements: [
      '10+ years in analytical strategy, machine learning evaluation, and responsible AI governance.',
      'Expertise in creating red-teaming benchmarks, provenance verification, and audit pipelines for LLM agents.',
      'Strong technical background in Python, benchmark datasets, and cloud evaluation environments.',
    ],
    screeningQuestions: [
      'Describe how you design red-teaming and verifiable citation audits for generative AI agents.',
      'Have you managed globally distributed technical research teams in a 100% remote setting?',
      'What is your target compensation and availability to start?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 96,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Living research archive & Source Codex design (1in8billion.net)',
        'Verifiable citation audit & provenance tracking expertise',
        'Proven remote leadership across global teams',
      ],
      skillGaps: ['Turing internal platform workflow calibration'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Exemplary fit for candidate AGI governance and provenance research, with competitive global executive compensation.',
    },
  },
  {
    id: 'job-naukri-409',
    title: 'Head of Enterprise BI Architecture & Metric Governance',
    company: 'LTIMindtree Digital Insights (Naukri Featured)',
    location: 'Chennai / Hyderabad / Bengaluru (Hybrid)',
    workType: 'Hybrid',
    salaryMin: 175000,
    salaryMax: 220000,
    experienceLevel: 'Lead',
    atsPlatform: 'Naukri',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.naukri.com/job-listings-head-enterprise-bi-metric-governance-ltimindtree',
    description:
      'Architect enterprise single-source-of-truth metric dictionaries, automated data reconciliation, and executive variance cockpits using Power BI, SQL, and Snowflake across global banking and retail clients.',
    requirements: [
      '10+ years architecting enterprise BI solutions, metric governance dictionaries, and executive dashboards.',
      'Proven expertise in Power BI, advanced DAX, SQL data modeling, and semantic layer design.',
      'Track record reducing reporting latency and eliminating conflicting business definitions.',
    ],
    screeningQuestions: [
      'How do you handle conflicting KPI definitions across marketing, operations, and finance teams?',
      'What is your experience designing unified metric layers in Power BI and Snowflake?',
      'Notice period and location preference (Chennai / Bengaluru)?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 94,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Mastery of metric dictionaries and variance-to-driver analysis',
        'Proven achievement in eliminating manual reporting latency by 40%',
        'Chennai-based presence with hybrid availability',
      ],
      skillGaps: ['LTIMindtree client SLA governance nuances'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Direct alignment on candidate Power BI and SQL metric governance track record at high commercial scale.',
    },
  },
  {
    id: 'job-indeed-410',
    title: 'Lead AGI Governance & Source Verification Researcher',
    company: 'Elicit Cognitive Intelligence Labs (via Indeed US/Global)',
    location: 'Remote (US / India / Global Remote)',
    workType: 'Remote',
    salaryMin: 210000,
    salaryMax: 260000,
    experienceLevel: 'Executive',
    atsPlatform: 'Indeed',
    postedDate: '40 days ago (July 27, 2026)',
    sourceUrl: 'https://www.indeed.com/viewjob?jk=elicit-lead-agi-governance-source-verification-remote',
    description:
      'Direct research on provenance tracking, citation grounding, and separating interpretive synthesis from ground-truth verification in automated AI reasoning workflows. Shape future standards of verifiable intelligence.',
    requirements: [
      'Demonstrated research in verifiable provenance, automated citation checking, and source-governed architectures.',
      'Deep fluency in LLM evaluation metrics, retrieval augmented generation, and human review interfaces.',
      'MSc or PhD in quantitative field with strong written technical communication and published artefacts.',
    ],
    screeningQuestions: [
      'Explain how you separate primary evidence from interpretive synthesis in automated AI evaluation pipelines.',
      'What is your experience with open research archives and public source codices?',
      'What is your target compensation and availability for full-time engagement?',
    ],
    status: 'ready_to_apply',
    evaluation: {
      matchScore: 97,
      meetsCriteria: true,
      criteriaMatches: { title: true, salary: true, location: true, experience: true },
      keyStrengths: [
        'Creator of 1in8billion.net Source Codex & provenance architecture',
        'MSc in Data Science from Liverpool with rigorous evidence-based methodology',
        '100% philosophical and architectural match on source verification',
      ],
      skillGaps: ['Distributed async team sprint schedule adaptation'],
      recommendation: 'AUTO_APPLY',
      reasoning:
        'Highest alignment possible with candidate research direction in source-governed AI architectures and provenance.',
    },
  },
];
