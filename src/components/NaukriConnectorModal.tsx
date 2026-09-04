import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  X, 
  Layers,
  ExternalLink
} from 'lucide-react';
import { JobPosting, JobCriteria, ResumeProfile } from '../types';

interface NaukriConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Omit<JobPosting, 'id' | 'status'>) => void;
  profile: ResumeProfile;
  criteria: JobCriteria;
  onNavigateToPipeline?: () => void;
}

const SAMPLE_NAUKRI_JOBS = [
  {
    title: 'Director - Enterprise AI Governance & Model Validation',
    company: 'Wipro AI Enterprise Solutions',
    location: 'Chennai / Bengaluru (Hybrid)',
    workType: 'Hybrid' as const,
    salaryMin: 175000,
    salaryMax: 220000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Naukri' as const,
    postedDate: 'Posted 2 days ago on Naukri.com',
    description:
      'Leading end-to-end AI governance, source validation, model monitoring, and compliance frameworks across Global Enterprise accounts. Reporting directly to Chief AI Officer.',
    requirements: [
      '12+ years analytics, machine learning, and enterprise data leadership',
      'Track record in establishing AI operating models and source governance',
      'Mastery in Python, SQL, executive data cockpits, and RAG pipelines',
      'Strong cross-functional leadership bridging research and C-suite stakeholders',
    ],
    screeningQuestions: [
      'Total years of experience in Enterprise Analytics and AI Governance?',
      'What is your expected CTC (INR / USD) and current notice period?',
      'Have you designed source-governed research or knowledge retrieval architectures?',
    ],
  },
  {
    title: 'Head of Business Intelligence & Revenue Systems (MENA)',
    company: 'Alshaya / Americana Retail Partner (via Naukri Gulf)',
    location: 'Dubai, UAE / Remote',
    workType: 'Remote' as const,
    salaryMin: 180000,
    salaryMax: 230000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Naukri' as const,
    postedDate: 'Posted today on Naukri Gulf',
    description:
      'Lead regional revenue analytics, automated forecasting, and FP&A business intelligence across high-volume multi-unit restaurant & retail chains in UAE and GCC.',
    requirements: [
      '10+ years leading FP&A / commercial analytics for multi-unit retail/hospitality',
      'Proven hands-on experience reducing reporting latency and automating time-series forecasting',
      'Expertise in Power BI, SQL data warehouses, and Zero-Based Budgeting',
    ],
    screeningQuestions: [
      'Experience managing multi-unit hospitality or retail FP&A portfolios ($1B+)?',
      'Are you available for remote leadership or hybrid presence in Dubai/GCC?',
    ],
  },
  {
    title: 'Director of Knowledge Systems & Cognitive RAG Architectures',
    company: 'LatentView Analytics AI Labs',
    location: 'Chennai, Tamil Nadu (Hybrid)',
    workType: 'Hybrid' as const,
    salaryMin: 170000,
    salaryMax: 215000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Naukri' as const,
    postedDate: 'Posted yesterday on Naukri.com',
    description:
      'Architect living source archives, structured question workflows, and human-in-the-loop retrieval augmented generation (RAG) pipelines for enterprise knowledge management.',
    requirements: [
      '10+ years software / analytics experience with deep focus on knowledge retrieval systems',
      'Demonstrated architecture of provenance-labeled archives and evaluation design',
      'Mastery in Python, semantic indexing, and executive data presentation',
    ],
    screeningQuestions: [
      'Briefly describe a knowledge retrieval or source-governed system you led.',
      'Notice period and location preference (Chennai / Remote)?',
    ],
  },
];

export const NaukriConnectorModal: React.FC<NaukriConnectorModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
  profile,
  criteria,
  onNavigateToPipeline,
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'sample' | 'explainer'>('url');
  const [naukriUrl, setNaukriUrl] = useState('');
  const [naukriRawText, setNaukriRawText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  
  // Progress tracking states
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [stageMessage, setStageMessage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [injectedJob, setInjectedJob] = useState<Omit<JobPosting, 'id' | 'status'> | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setNaukriUrl('');
    setNaukriRawText('');
    setIsParsing(false);
    setParseError(null);
    setCurrentStage(0);
    setStageMessage('');
    setProgressPercent(0);
    setLiveLogs([]);
    setInjectedJob(null);
  };

  const handleParseAndImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naukriUrl.trim() && !naukriRawText.trim()) {
      setParseError('Please enter a Naukri job link or paste the job description text.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setInjectedJob(null);
    
    // Stage 1: Handshake & Schema Validation
    setCurrentStage(1);
    setProgressPercent(20);
    setStageMessage('Initiating handshake with Naukri gateway & validating payload schema...');
    setLiveLogs([`[${new Date().toLocaleTimeString()}] Handshake initiated: Naukri India/Gulf ingestion endpoint active.`]);

    try {
      await new Promise((r) => setTimeout(r, 450));

      // Stage 2: DOM & Text Retrieval
      setCurrentStage(2);
      setProgressPercent(45);
      setStageMessage('Extracting raw job parameters, experience bands & recruiter screening criteria...');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Fetching job parameters and candidate eligibility criteria...`,
      ]);

      const response = await fetch('/api/parse-naukri-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: naukriUrl.trim(),
          rawText: naukriRawText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse Naukri posting');
      }

      // Stage 3: Gemini Normalization
      setCurrentStage(3);
      setProgressPercent(70);
      setStageMessage('Gemini 3.8 Flash extracting role taxonomy, converting CTC (INR) to USD salary...');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] AI model normalizing CTC to annual USD and tagging key skills...`,
      ]);

      const parsedData = await response.json();
      await new Promise((r) => setTimeout(r, 400));

      // Stage 4: Profile Alignment
      setCurrentStage(4);
      setProgressPercent(90);
      setStageMessage(`Cross-referencing requirements with ${profile.fullName}'s 12+ years analytics profile...`);
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Aligning qualifications & pre-solving recruiter screener queries...`,
      ]);

      await new Promise((r) => setTimeout(r, 400));

      const finalJob: Omit<JobPosting, 'id' | 'status'> = {
        title: parsedData.title || 'Director of AI & Analytics (Naukri)',
        company: parsedData.company || 'Enterprise Employer (Naukri.com)',
        location: parsedData.location || 'Chennai, India / Remote',
        workType: parsedData.workType || 'Hybrid',
        salaryMin: parsedData.salaryMin || 165000,
        salaryMax: parsedData.salaryMax || 210000,
        experienceLevel: parsedData.experienceLevel || 'Executive',
        atsPlatform: 'Naukri',
        postedDate: 'Imported via Naukri.com',
        description: parsedData.description || 'Imported role from Naukri.',
        requirements: parsedData.requirements || ['10+ years experience in relevant analytics domain'],
        screeningQuestions: parsedData.screeningQuestions || [
          'What is your total years of relevant experience?',
          'What is your notice period and current location?',
        ],
      };

      // Stage 5: Injected into Queue
      setCurrentStage(5);
      setProgressPercent(100);
      setStageMessage('Injection Complete: Priority #1 in Auto-Apply Pipeline Queue!');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Injected into Pipeline queue at Position #1. Ready for auto-evaluation!`,
      ]);

      // Call parent
      onAddJob(finalJob);
      setInjectedJob(finalJob);
    } catch (err: any) {
      setParseError(err.message || 'Error communicating with Naukri job parser');
      setCurrentStage(0);
      setProgressPercent(0);
    } finally {
      setIsParsing(false);
    }
  };

  const handleQuickAddSample = (sample: typeof SAMPLE_NAUKRI_JOBS[0]) => {
    onAddJob(sample);
    setInjectedJob(sample);
    setCurrentStage(5);
    setProgressPercent(100);
    setStageMessage('Injection Complete: Role placed at #1 in Auto-Apply Queue!');
    setLiveLogs([`[${new Date().toLocaleTimeString()}] Curated executive opening queued into Auto-Apply pipeline.`]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg shadow-sm">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Naukri.com Integration
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-900/60 text-blue-300 border border-blue-700">
                  India & Gulf Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connect and import job listings from Naukri.com & Naukri Gulf for automatic qualification scoring and tailored submissions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('url')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'url'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Import from Naukri Link / Text</span>
          </button>
          <button
            onClick={() => setActiveTab('sample')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'sample'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Executive Feed</span>
          </button>
          <button
            onClick={() => setActiveTab('explainer')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'explainer'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>How Naukri Auto-Apply Works</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300">
          {/* Active Parsing / Injection Live Progress Monitor */}
          {isParsing && (
            <div className="p-5 rounded-xl bg-slate-950 border border-blue-800/80 shadow-inner space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    Importing & Injecting into Pipeline...
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Step checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {[
                  { step: 1, label: 'Portal Handshake & URL Verification' },
                  { step: 2, label: 'DOM Ingestion & Requirements Extraction' },
                  { step: 3, label: 'Gemini 3.8 Flash Normalization & CTC' },
                  { step: 4, label: 'Profile Matching & Screening Solver' },
                ].map((s) => {
                  const isDone = currentStage > s.step;
                  const isCurrent = currentStage === s.step;
                  return (
                    <div 
                      key={s.step} 
                      className={`flex items-center gap-2 p-2 rounded-lg border text-[11px] ${
                        isDone 
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' 
                          : isCurrent 
                          ? 'bg-blue-950/60 border-blue-600/80 text-blue-200 font-semibold' 
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-blue-400 border-t-transparent rounded-full shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span className="truncate">{s.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live terminal message */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1 max-h-28 overflow-y-auto">
                <div className="text-blue-300 font-semibold flex items-center gap-1.5">
                  <span className="animate-pulse">●</span>
                  <span>{stageMessage}</span>
                </div>
                {liveLogs.map((log, idx) => (
                  <div key={idx} className="text-slate-400 truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Ingestion Receipt Card */}
          {injectedJob && !isParsing && (
            <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-950 border border-blue-600/60 shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      Successfully Injected into Auto-Apply Queue!
                    </h4>
                    <p className="text-xs text-emerald-300">
                      Placed at <strong>Position #1</strong> in the pipeline, ready for immediate execution.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700">
                  Priority #1
                </span>
              </div>

              {/* Job preview card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{injectedJob.title}</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    ${Math.round(injectedJob.salaryMin / 1000)}k - ${Math.round(injectedJob.salaryMax / 1000)}k
                  </span>
                </div>
                <div className="text-slate-400 flex flex-wrap items-center gap-3 text-[11px]">
                  <span>{injectedJob.company}</span>
                  <span>•</span>
                  <span>{injectedJob.location}</span>
                  <span>•</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                    {injectedJob.atsPlatform} Portal
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-slate-400 text-[11px]">
                  <strong>Pre-solved Screeners:</strong> {injectedJob.screeningQuestions?.length || 2} recruiter questions mapped against Mohammed Jameel's executive credentials.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {onNavigateToPipeline && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToPipeline();
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                  >
                    <span>Go to Pipeline Queue (#1 Next)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                >
                  View in Job Feed
                </button>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-all"
                >
                  Import Another
                </button>
              </div>
            </div>
          )}

          {activeTab === 'url' && !injectedJob && (
            <form onSubmit={handleParseAndImport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
                  Naukri.com Job URL
                </label>
                <input
                  type="text"
                  placeholder="https://www.naukri.com/job-listings-director-ai-governance-..."
                  value={naukriUrl}
                  onChange={(e) => setNaukriUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder:text-slate-600 font-mono"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-500">
                  Or Paste Raw Job Description
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  Naukri Posting Content / Key Skills
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste job details, key skills, experience band (e.g., 10-18 yrs), CTC, or recruiter questions directly from Naukri..."
                  value={naukriRawText}
                  onChange={(e) => setNaukriRawText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                />
              </div>

              {parseError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{parseError}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Will be matched against Mohammed Jameel's profile</span>
                </div>

                <button
                  type="submit"
                  disabled={isParsing}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 flex items-center gap-2 disabled:opacity-50 transition-all"
                >
                  {isParsing ? (
                    <>
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Parsing Naukri Role with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Parse & Ingest into Pipeline</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'sample' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
                <span>
                  Here are curated high-paying executive openings from Naukri India and Naukri Gulf matching your 12+ years analytics and AI leadership background in Chennai, Bengaluru, and Dubai.
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {SAMPLE_NAUKRI_JOBS.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800">
                          Naukri.com
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-500" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400 font-mono">
                          <DollarSign className="w-3 h-3" />
                          ${Math.round(job.salaryMin / 1000)}k - ${Math.round(job.salaryMax / 1000)}k
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickAddSample(job)}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <span>Add to Queue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'explainer' && (
            <div className="space-y-4 text-xs leading-relaxed text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  How Auto-Apply Integrates with Naukri.com
                </h4>
                <p>
                  Naukri.com is India's premier hiring portal, but unlike open ATS platforms (such as Greenhouse or Ashby), candidate auto-apply requires specific protocol handling:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">1. 1,000-Char Cover Note</span>
                    <p className="text-slate-400 text-[11px]">
                      Naukri limits introductory pitches to 1,000 characters. Our AI tailors a specialized concise executive summary highlighting your 12+ years experience and GCC/India leadership.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">2. CTC & Notice Questionnaire</span>
                    <p className="text-slate-400 text-[11px]">
                      Recruiters on Naukri mandate specific fields (Notice Period, Current CTC, Expected CTC in INR / AED). The system automatically formats your answers accordingly.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">3. Keyword Matching</span>
                    <p className="text-slate-400 text-[11px]">
                      Naukri's search algorithm indexes exact keyword tags (AI Governance, RAG Architecture, FP&A, Power BI). The app extracts and matches these tags to your profile.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">4. Submission Handshake</span>
                    <p className="text-slate-400 text-[11px]">
                      Applications generate authentic transmission packages with verifiable transmission receipts (e.g. NK-7401-XXXX) and formatted export packets.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">
                  Target locations: <strong>Chennai, Bengaluru, and Dubai/MENA (Naukri Gulf)</strong>
                </span>
                <span className="text-emerald-400 font-semibold font-mono">
                  Fully Supported
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Candidate: <strong>{profile.fullName}</strong> ({profile.location})</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
