import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Sparkles, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Check, 
  Eye, 
  MapPin, 
  DollarSign, 
  Send,
  Building,
  RefreshCw,
  Globe,
  Copy,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers
} from 'lucide-react';
import { JobPosting, JobCriteria, WorkType, ApplicationStatus, ResumeProfile } from '../types';
import { NaukriConnectorModal } from './NaukriConnectorModal';
import { IndeedConnectorModal } from './IndeedConnectorModal';

interface JobMarketFeedProps {
  jobs: JobPosting[];
  criteria: JobCriteria;
  profile: ResumeProfile;
  onEvaluateJob: (job: JobPosting) => Promise<void>;
  onApplyJob: (job: JobPosting) => Promise<void>;
  onOpenDetails: (job: JobPosting) => void;
  onGenerateJobs: () => Promise<void>;
  onAddCustomJob: (job: Omit<JobPosting, 'id' | 'status'>) => void;
  isGeneratingJobs: boolean;
  evaluatingJobId: string | null;
  submittingJobId: string | null;
  onNavigateToPipeline?: () => void;
}

export const JobMarketFeed: React.FC<JobMarketFeedProps> = ({
  jobs,
  criteria,
  profile,
  onEvaluateJob,
  onApplyJob,
  onOpenDetails,
  onGenerateJobs,
  onAddCustomJob,
  isGeneratingJobs,
  evaluatingJobId,
  submittingJobId,
  onNavigateToPipeline,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'INR'>('USD');
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [expandedScreenersJobId, setExpandedScreenersJobId] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNaukriModalOpen, setIsNaukriModalOpen] = useState(false);
  const [isIndeedModalOpen, setIsIndeedModalOpen] = useState(false);

  // Custom job form state
  const [customTitle, setCustomTitle] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [customLocation, setCustomLocation] = useState('Remote, India');
  const [customWorkType, setCustomWorkType] = useState<WorkType>('Remote');
  const [customSalaryMin, setCustomSalaryMin] = useState(160000);
  const [customSalaryMax, setCustomSalaryMax] = useState(210000);
  const [customDescription, setCustomDescription] = useState('');
  const [customRequirements, setCustomRequirements] = useState('');

  // Helper to generate live external job search link
  const getOriginalJobUrl = (job: JobPosting) => {
    if (job.sourceUrl && job.sourceUrl.startsWith('http')) return job.sourceUrl;
    if (job.atsPlatform === 'Naukri') {
      return `https://www.naukri.com/${encodeURIComponent(job.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}-jobs-in-india`;
    }
    if (job.atsPlatform === 'Indeed') {
      return `https://www.indeed.com/jobs?q=${encodeURIComponent(job.title)}+${encodeURIComponent(job.company)}`;
    }
    return `https://www.google.com/search?q=${encodeURIComponent(job.title)}+${encodeURIComponent(job.company)}+careers`;
  };

  // Helper to copy complete tailored application packet
  const handleCopyApplicationPacket = (job: JobPosting) => {
    const questionsAndAnswers = job.screeningQuestions.map((q, idx) => {
      const existing = job.submission?.screeningAnswers?.find((a) => a.question === q);
      const answer = existing?.answer || `12+ years analytics and AI governance leadership aligned with candidate profile. Managed $3B FP&A analytics at Americana Group and lead source-governed research at 1in8billion.net.`;
      return `Question ${idx + 1}: ${q}\nTailored Answer: ${answer}\n`;
    }).join('\n');

    const packet = `=========================================
EXECUTIVE APPLICATION DOSSIER
Role: ${job.title}
Company: ${job.company} (${job.location})
Platform: ${job.atsPlatform} | Work Type: ${job.workType}
Target Compensation: $${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()} / yr
=========================================

CANDIDATE: Mohammed Jameel
Title: AGI Director | Research, Knowledge Systems & Governance
Contact: ${profile.email} | ${profile.phone}
Location: Chennai, Tamil Nadu, India (Open to UAE / Remote)
Credentials: MSc Data Science & Analytics (UK) | 12+ Yrs Exp
Portfolio: https://1in8billion.net

-----------------------------------------
TAILORED COVER LETTER
-----------------------------------------
${job.submission?.tailoredCoverLetter || `Dear Hiring Committee at ${job.company},

I am writing to express my strong interest in the ${job.title} role. With 12+ years across analytics leadership, source-governed research architectures (1in8billion.net), and executive decision support, I have focused extensively on turning complex data into reviewable, audit-ready knowledge records.

At Americana Group in the UAE, I directed revenue analytics supporting 2,700+ restaurants ($3B sales), automating forecasting and establishing high-trust decision models. More recently, as AGI Research Director, I designed source-governed knowledge retrieval architectures that prioritize human-in-the-loop review and transparent provenance.

I look forward to discussing how my experience can support ${job.company}.

Sincerely,
Mohammed Jameel`}

-----------------------------------------
PRE-SOLVED SCREENING QUESTIONS & ANSWERS
-----------------------------------------
${questionsAndAnswers}
=========================================`;

    navigator.clipboard.writeText(packet);
    setCopiedJobId(job.id);
    setTimeout(() => setCopiedJobId(null), 3000);
  };

  // Format salary based on currency mode
  const formatSalary = (min: number, max: number) => {
    if (currencyMode === 'INR') {
      // 1 USD ~ 83 INR
      const minLakhs = Math.round((min * 83) / 100000);
      const maxLakhs = Math.round((max * 83) / 100000);
      if (minLakhs >= 100) {
        const minCr = (minLakhs / 100).toFixed(2);
        const maxCr = (maxLakhs / 100).toFixed(2);
        return `₹${minCr} Cr - ₹${maxCr} Cr / yr (₹${minLakhs}L - ₹${maxLakhs}L LPA)`;
      }
      return `₹${minLakhs}L - ₹${maxLakhs}L LPA`;
    }
    return `$${min.toLocaleString()} - $${max.toLocaleString()} / yr`;
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWorkType =
      selectedWorkType === 'all' || job.workType.toLowerCase() === selectedWorkType.toLowerCase();

    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'applied' && job.status === 'applied') ||
      (selectedStatus === 'unprocessed' && (job.status === 'unprocessed' || job.status === 'ready_to_apply')) ||
      (selectedStatus === 'skipped' && job.status === 'skipped');

    const matchesPlatform =
      selectedPlatform === 'all' || job.atsPlatform.toLowerCase() === selectedPlatform.toLowerCase();

    const matchesRegion =
      selectedRegion === 'all' ||
      (selectedRegion === 'India' && (job.location.toLowerCase().includes('india') || job.location.toLowerCase().includes('chennai') || job.location.toLowerCase().includes('bengaluru'))) ||
      (selectedRegion === 'UAE' && (job.location.toLowerCase().includes('dubai') || job.location.toLowerCase().includes('uae') || job.location.toLowerCase().includes('mena'))) ||
      (selectedRegion === 'Remote' && (job.workType === 'Remote' || job.location.toLowerCase().includes('remote')));

    return matchesSearch && matchesWorkType && matchesStatus && matchesPlatform && matchesRegion;
  });

  const handleCustomJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customCompany.trim()) return;

    onAddCustomJob({
      title: customTitle.trim(),
      company: customCompany.trim(),
      location: customLocation.trim(),
      workType: customWorkType,
      salaryMin: customSalaryMin,
      salaryMax: customSalaryMax,
      experienceLevel: 'Senior',
      atsPlatform: 'Greenhouse',
      postedDate: 'Just added',
      description: customDescription || 'Custom target opportunity added by user.',
      requirements: customRequirements
        ? customRequirements.split('\n').map((r) => r.trim()).filter(Boolean)
        : ['Strong expertise in relevant tech stack', 'Cross-functional communication skills'],
      screeningQuestions: [
        'Why are you interested in this role at our company?',
        'Describe your relevant project achievements.',
      ],
    });

    setIsAddModalOpen(false);
    setCustomTitle('');
    setCustomCompany('');
    setCustomDescription('');
    setCustomRequirements('');
  };

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Discovered Job Openings Feed
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Scanned from Greenhouse, Lever, and Ashby portals. Evaluated against your resume and criteria.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-indeed-modal"
              onClick={() => setIsIndeedModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-700/60 transition-all shadow-sm"
              title="Import global or India jobs directly from Indeed with Indeed Apply"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
              <span>Indeed Import</span>
            </button>

            <button
              id="btn-naukri-modal"
              onClick={() => setIsNaukriModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 border border-blue-700/60 transition-all shadow-sm"
              title="Import executive jobs directly from Naukri.com or Naukri Gulf"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Naukri.com Import</span>
            </button>

            <button
              id="btn-generate-ai-jobs"
              onClick={onGenerateJobs}
              disabled={isGeneratingJobs}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all"
            >
              {isGeneratingJobs ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Discovering Openings...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discover More Jobs with AI</span>
                </>
              )}
            </button>

            <button
              id="btn-add-custom-job"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Job</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Row */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by title, company, skills, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
              {/* Currency Toggle */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrencyMode('USD')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    currencyMode === 'USD'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  $ USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode('INR')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                    currencyMode === 'INR'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ₹ INR (LPA)
                </button>
              </div>

              {/* Work Type Filter */}
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Work Types</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-site</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Statuses ({jobs.length})</option>
                <option value="unprocessed">In Queue / Unprocessed</option>
                <option value="applied">Auto-Applied</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          </div>

          {/* Platform & Region Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            {/* Platform pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 text-[11px] font-medium mr-1">Portal:</span>
              {(['all', 'Naukri', 'Indeed', 'Greenhouse', 'Ashby', 'Lever'] as const).map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setSelectedPlatform(plat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedPlatform === plat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {plat === 'all' ? `All Portals (${jobs.length})` : plat === 'Naukri' ? '🇮🇳 Naukri' : plat === 'Indeed' ? '💼 Indeed' : plat}
                </button>
              ))}
            </div>

            {/* Region pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-500 text-[11px] font-medium mr-1">Region:</span>
              {[
                { id: 'all', label: 'Global / All' },
                { id: 'India', label: '🇮🇳 India (Chennai/BLR)' },
                { id: 'UAE', label: '🇦🇪 Dubai / UAE' },
                { id: 'Remote', label: '🌐 Remote' },
              ].map((reg) => (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedRegion === reg.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30 text-indigo-400" />
            <h3 className="text-base font-semibold text-white mb-1">No matching openings found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              Try adjusting your search filters or click "Discover More Jobs with AI" to generate fresh targeted listings.
            </p>
            <button
              onClick={onGenerateJobs}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fetch AI Job Postings</span>
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isEvaluating = evaluatingJobId === job.id;
            const isSubmitting = submittingJobId === job.id;
            const hasApplied = job.status === 'applied';
            const hasSkipped = job.status === 'skipped';
            const evaluation = job.evaluation;

            return (
              <div
                key={job.id}
                className={`bg-slate-900 border rounded-2xl p-5 transition-all shadow-sm ${
                  hasApplied
                    ? 'border-emerald-500/40 bg-slate-900/90'
                    : hasSkipped
                    ? 'border-slate-800/80 opacity-75'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Job Core Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-300 font-mono">
                        {job.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{job.postedDate}</span>
                      <span className="text-slate-600">•</span>
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                        job.atsPlatform === 'Naukri'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                          : job.atsPlatform === 'Indeed'
                          ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {job.atsPlatform} {job.atsPlatform === 'Naukri' || job.atsPlatform === 'Indeed' ? 'Portal' : 'ATS'}
                      </span>

                      {/* Status Badges */}
                      {hasApplied && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted ({job.submission?.submissionId})</span>
                        </span>
                      )}
                      {hasSkipped && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          <span>Skipped: {job.skipReason || 'Criteria mismatch'}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight hover:text-indigo-400 transition-colors cursor-pointer"
                      onClick={() => onOpenDetails(job)}>
                      {job.title}
                    </h3>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </span>

                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        job.workType === 'Remote'
                          ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/60'
                          : 'bg-indigo-950/40 text-indigo-300 border border-indigo-800/60'
                      }`}>
                        {job.workType}
                      </span>

                      <span className="flex items-center gap-1 text-emerald-400 font-semibold font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
                      </span>

                      <span className="text-slate-500">• {job.experienceLevel} Level</span>
                    </div>

                    {/* Requirements Preview */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed pt-1">
                      {job.description}
                    </p>

                    {/* Direct Links & Quick Ingest Action Row */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <a
                        href={getOriginalJobUrl(job)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 flex items-center gap-1.5 transition-all shadow-sm"
                        title="Open live posting or direct search in new browser tab"
                      >
                        <span>Open Original Posting</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyApplicationPacket(job)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all shadow-sm ${
                          copiedJobId === job.id
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-950/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80'
                        }`}
                        title="Copy tailored cover letter & pre-solved answers to clipboard"
                      >
                        {copiedJobId === job.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied Packet!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Application Packet</span>
                          </>
                        )}
                      </button>

                      {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setExpandedScreenersJobId(expandedScreenersJobId === job.id ? null : job.id)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-950/40 hover:bg-indigo-950/70 border border-indigo-800/50 flex items-center gap-1 transition-all"
                        >
                          <span>💡 AI Answers ({job.screeningQuestions.length})</span>
                          {expandedScreenersJobId === job.id ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Pre-solved Recruiter Questions Drawer */}
                    {expandedScreenersJobId === job.id && (
                      <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-indigo-900/40 space-y-2.5 text-xs shadow-inner">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>Pre-Solved Recruiter Questions (Grounded in Mohammed Jameel's CV)</span>
                        </div>
                        {job.screeningQuestions.map((q, idx) => {
                          const ans = job.submission?.screeningAnswers?.find((a) => a.question === q)?.answer 
                            || `Grounded in candidate's 12+ years analytics and AI governance leadership (Americana Group $3B revenue analytics, 1in8billion.net research archive).`;
                          return (
                            <div key={idx} className="border-b border-slate-900 pb-2 last:border-b-0 last:pb-0">
                              <div className="text-slate-200 font-semibold flex items-start gap-1.5">
                                <span className="text-emerald-400 font-mono">Q{idx + 1}:</span>
                                <span>{q}</span>
                              </div>
                              <div className="text-slate-400 text-xs mt-1 pl-4 border-l-2 border-emerald-500/40 leading-relaxed">
                                <span className="text-emerald-400 font-semibold mr-1">Answer:</span>
                                <span>{ans}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right: AI Scorecard & Action Controls */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                    
                    {/* Match Score Badge (if evaluated) */}
                    {evaluation ? (
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xs text-slate-400">AI Fit Score</div>
                          <div className={`text-lg font-bold font-mono ${
                            evaluation.matchScore >= criteria.minMatchScore
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}>
                            {evaluation.matchScore}%
                          </div>
                        </div>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border ${
                          evaluation.matchScore >= criteria.minMatchScore
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {evaluation.recommendation === 'AUTO_APPLY' ? 'GO' : evaluation.recommendation}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic">
                        Not evaluated yet
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onOpenDetails(job)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{hasApplied ? 'View Packet' : 'Details'}</span>
                      </button>

                      {!hasApplied && (
                        <>
                          <button
                            onClick={() => onEvaluateJob(job)}
                            disabled={isEvaluating}
                            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 flex items-center gap-1.5 transition-colors disabled:opacity-50"
                          >
                            {isEvaluating ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5" />
                            )}
                            <span>{evaluation ? 'Re-Score' : 'Evaluate'}</span>
                          </button>

                          <button
                            onClick={() => onApplyJob(job)}
                            disabled={isSubmitting}
                            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                <span>Applying...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5 fill-current" />
                                <span>Auto-Apply</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Job Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add Custom Job Opportunity</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Full Stack Engineer"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Cloud Corp"
                    value={customCompany}
                    onChange={(e) => setCustomCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Work Mode</label>
                  <select
                    value={customWorkType}
                    onChange={(e) => setCustomWorkType(e.target.value as WorkType)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Salary Floor ($/yr)</label>
                  <input
                    type="number"
                    value={customSalaryMin}
                    onChange={(e) => setCustomSalaryMin(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Salary Ceiling ($/yr)</label>
                  <input
                    type="number"
                    value={customSalaryMax}
                    onChange={(e) => setCustomSalaryMax(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Paste or write the role description..."
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Key Requirements (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="e.g. 5+ years React & TypeScript&#10;Experience with AWS and microservices"
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  Add to Auto-Apply Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Naukri.com Connector Modal */}
      <NaukriConnectorModal
        isOpen={isNaukriModalOpen}
        onClose={() => setIsNaukriModalOpen(false)}
        onAddJob={onAddCustomJob}
        profile={profile}
        criteria={criteria}
        onNavigateToPipeline={onNavigateToPipeline}
      />

      {/* Indeed Connector Modal */}
      <IndeedConnectorModal
        isOpen={isIndeedModalOpen}
        onClose={() => setIsIndeedModalOpen(false)}
        onAddJob={onAddCustomJob}
        profile={profile}
        criteria={criteria}
        onNavigateToPipeline={onNavigateToPipeline}
      />
    </div>
  );
};
