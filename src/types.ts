export type WorkType = 'Remote' | 'Hybrid' | 'On-site';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
export type ATSPlatform = 'Greenhouse' | 'Lever' | 'Ashby' | 'Workday' | 'BambooHR' | 'Naukri' | 'Indeed' | 'Other';

export interface WorkExperienceItem {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface ResumeProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  yearsExperience: number;
  summary: string;
  skills: string[];
  education: string;
  targetRoles: string[];
  workExperience: WorkExperienceItem[];
  rawResumeText?: string;
}

export interface JobCriteria {
  targetTitles: string[];
  locations: string[];
  workTypes: WorkType[];
  minSalary: number;
  experienceLevels: ExperienceLevel[];
  minMatchScore: number;
  blacklistedCompanies: string[];
  blacklistedKeywords: string[];
  autoApplyMode: 'autonomous' | 'approval';
  dailyApplicationCap: number;
  coverLetterTone: 'concise' | 'impactful' | 'conversational';
  requireSponsorship: boolean;
}

export interface JobEvaluation {
  matchScore: number;
  meetsCriteria: boolean;
  criteriaMatches: {
    title: boolean;
    salary: boolean;
    location: boolean;
    experience: boolean;
  };
  keyStrengths: string[];
  skillGaps: string[];
  recommendation: 'AUTO_APPLY' | 'REVIEW' | 'SKIP';
  reasoning: string;
}

export interface ScreeningAnswer {
  question: string;
  answer: string;
  confidence?: string;
}

export interface ApplicationSubmission {
  submissionId: string;
  timestamp: string;
  tailoredCoverLetter: string;
  screeningAnswers: ScreeningAnswer[];
  tailoredHighlights: string[];
  atsPlatform: string;
  status: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Archived';
}

export type ApplicationStatus =
  | 'unprocessed'
  | 'evaluating'
  | 'tailoring'
  | 'ready_to_apply'
  | 'submitting'
  | 'applied'
  | 'skipped';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  workType: WorkType;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: ExperienceLevel;
  atsPlatform: ATSPlatform;
  description: string;
  requirements: string[];
  postedDate: string;
  screeningQuestions: string[];
  sourceUrl?: string;
  evaluation?: JobEvaluation;
  status: ApplicationStatus;
  submission?: ApplicationSubmission;
  skipReason?: string;
}

export interface AutoApplyLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'criteria_pass' | 'criteria_fail' | 'submitted';
  message: string;
  jobId?: string;
  company?: string;
}

export interface PipelineStats {
  totalJobsScanned: number;
  matchedCriteria: number;
  autoAppliedCount: number;
  skippedCount: number;
  interviewsCount: number;
  averageMatchScore: number;
}

export interface PortalConfig {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  targetLocations: string[];
  searchKeywords: string[];
  dailyImportQuota: number;
  lastSyncTime: string;
  totalImportedCount: number;
  status: 'active' | 'syncing' | 'paused' | 'error';
  searchUrl: string;
  atsPlatform: ATSPlatform;
  description: string;
}

export interface ImportAgent {
  id: string;
  name: string;
  codeName: string;
  role: string;
  status: 'idle' | 'active' | 'analyzing' | 'complete';
  currentTask: string;
  itemsProcessed: number;
  badge: string;
}

export interface ImportLogItem {
  id: string;
  timestamp: string;
  agentName: string;
  portal: string;
  type: 'discovery' | 'parsing' | 'filtering' | 'injected' | 'skipped';
  message: string;
  score?: number;
}

export interface ImportScheduleConfig {
  autoScoutEnabled: boolean;
  frequency: 'every_6h' | 'daily_morning' | 'twice_daily';
  scheduledTime: string;
  minScoreThreshold: number;
  maxDaysOld: number; // e.g. 1 (24h / 1 day), 2, 3, 7, 14, 30
  deduplicateAcrossPortals: boolean;
  autoInjectToPipeline: boolean;
  lastRunTimestamp?: string;
  nextRunCountdown?: string;
}

export interface DiscoveredJobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site';
  salaryMin: number;
  salaryMax: number;
  postedDaysAgo: number;
  postedDateStr: string;
  sourceUrl: string;
  portal: string;
  atsPlatform: ATSPlatform;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  screeningQuestions: string[];
  matchScore: number;
  injectedToQueue?: boolean;
}
