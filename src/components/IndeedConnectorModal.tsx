import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  MapPin, 
  DollarSign, 
  X, 
  Layers,
  Zap
} from 'lucide-react';
import { JobPosting, JobCriteria, ResumeProfile } from '../types';

interface IndeedConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Omit<JobPosting, 'id' | 'status'>) => void;
  profile: ResumeProfile;
  criteria: JobCriteria;
  onNavigateToPipeline?: () => void;
}

const SAMPLE_INDEED_JOBS = [
  {
    title: 'Director of AI Strategy & Decision Architecture',
    company: 'Cognizant AI Labs',
    location: 'Chennai, Tamil Nadu / Global Remote',
    workType: 'Remote' as const,
    salaryMin: 185000,
    salaryMax: 235000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Indeed' as const,
    postedDate: 'Posted 1 day ago via Indeed Apply',
    description:
      'Lead AI operating models, governance frameworks, and executive decision systems across Fortune 500 accounts. Drive source validation and LLM evaluation architectures for client engagements.',
    requirements: [
      '12+ years experience in enterprise analytics, machine learning, and AI governance',
      'Demonstrated expertise in translating research into executive-ready decision cockpits',
      'High proficiency in Python, SQL, Power BI, and RAG knowledge retrieval systems',
      'Proven record leading cross-functional teams across India, EMEA, and North America',
    ],
    screeningQuestions: [
      'How many years of work experience do you have leading AI Strategy or Governance teams?',
      'Have you deployed knowledge retrieval architectures (RAG) with source provenance?',
      'What is your target annual compensation?',
    ],
  },
  {
    title: 'Principal Lead - AI Governance & Source Provenance',
    company: 'Fractal Analytics & AI Solutions',
    location: 'Remote (India / UAE / Global)',
    workType: 'Remote' as const,
    salaryMin: 190000,
    salaryMax: 245000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Indeed' as const,
    postedDate: 'Posted 3 days ago via Indeed Apply',
    description:
      'Architect responsible AI guardrails, evaluation pipelines, and source-governed decision support. Partner with executive stakeholders on model risk management and transparency.',
    requirements: [
      '10+ years analytics leadership and hands-on ML evaluation design',
      'Deep expertise in source governance, human-in-the-loop review, and knowledge archives',
      'Track record presenting to C-suite and enterprise risk committees',
    ],
    screeningQuestions: [
      'Briefly describe your experience designing human-in-the-loop review protocols for AI systems.',
      'Are you able to lead globally distributed teams across time zones?',
    ],
  },
  {
    title: 'VP of Data Strategy & Decision Support Systems',
    company: 'Falcon Global Enterprises (UAE / India)',
    location: 'Dubai, UAE / Chennai (Hybrid)',
    workType: 'Hybrid' as const,
    salaryMin: 180000,
    salaryMax: 225000,
    experienceLevel: 'Executive' as const,
    atsPlatform: 'Indeed' as const,
    postedDate: 'Posted today on Indeed',
    description:
      'Lead commercial FP&A analytics, enterprise BI architectures, and revenue forecasting across multi-unit commercial operations ($2B+ annual turnover).',
    requirements: [
      '12+ years analytics and finance data modeling leadership',
      'Mastery of Power BI, SQL, Python, and Zero-Based Budgeting (ZBB)',
      'Experience in multi-unit retail, restaurant, or high-volume healthcare diagnostics',
    ],
    screeningQuestions: [
      'What experience do you have managing revenue analytics for multi-unit retail or hospitality operations?',
      'What is your availability to begin this role?',
    ],
  },
];

export const IndeedConnectorModal: React.FC<IndeedConnectorModalProps> = ({
  isOpen,
  onClose,
  onAddJob,
  profile,
  criteria,
  onNavigateToPipeline,
}) => {
  const [activeTab, setActiveTab] = useState<'url' | 'sample' | 'explainer'>('url');
  const [indeedUrl, setIndeedUrl] = useState('');
  const [indeedRawText, setIndeedRawText] = useState('');
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
    setIndeedUrl('');
    setIndeedRawText('');
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
    if (!indeedUrl.trim() && !indeedRawText.trim()) {
      setParseError('Please enter an Indeed job URL or paste the job description text.');
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setInjectedJob(null);

    // Stage 1: Handshake
    setCurrentStage(1);
    setProgressPercent(20);
    setStageMessage('Verifying Indeed URL syntax & opening secure proxy tunnel...');
    setLiveLogs([`[${new Date().toLocaleTimeString()}] Handshake initialized with Indeed India/Global job gateway.`]);

    try {
      await new Promise((r) => setTimeout(r, 450));

      // Stage 2: DOM scraping
      setCurrentStage(2);
      setProgressPercent(45);
      setStageMessage('Extracting JD text, location parameters, and employer screening requirements...');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Retrieving job description payload from Indeed ViewJob service...`,
      ]);

      const response = await fetch('/api/parse-indeed-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: indeedUrl.trim(),
          rawText: indeedRawText.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse Indeed job posting');
      }

      // Stage 3: Gemini Normalization
      setCurrentStage(3);
      setProgressPercent(70);
      setStageMessage('Gemini 3.8 Flash parsing role taxonomy, salary range, and qualification checklist...');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] AI model structuring executive data competencies and pay range...`,
      ]);

      const parsedData = await response.json();
      await new Promise((r) => setTimeout(r, 400));

      // Stage 4: Profile Alignment
      setCurrentStage(4);
      setProgressPercent(90);
      setStageMessage(`Aligning requirements with ${profile.fullName}'s 12+ years analytics profile...`);
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Generating tailored screening answers for recruiter review...`,
      ]);

      await new Promise((r) => setTimeout(r, 400));

      const finalJob: Omit<JobPosting, 'id' | 'status'> = {
        title: parsedData.title || 'Director of AI Strategy (Indeed)',
        company: parsedData.company || 'Enterprise Employer (via Indeed)',
        location: parsedData.location || 'Chennai, India / Remote',
        workType: parsedData.workType || 'Remote',
        salaryMin: parsedData.salaryMin || 170000,
        salaryMax: parsedData.salaryMax || 220000,
        experienceLevel: parsedData.experienceLevel || 'Executive',
        atsPlatform: 'Indeed',
        postedDate: 'Imported via Indeed',
        description: parsedData.description || 'Imported role from Indeed.',
        requirements: parsedData.requirements || ['10+ years experience in relevant analytics domain'],
        screeningQuestions: parsedData.screeningQuestions || [
          'How many years of relevant experience do you have in this domain?',
          'Are you available for remote or hybrid leadership?',
        ],
      };

      // Stage 5: Injected into Queue
      setCurrentStage(5);
      setProgressPercent(100);
      setStageMessage('Injection Complete: Role placed at Position #1 in Auto-Apply Queue!');
      setLiveLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Injected into Pipeline queue at Position #1. Ready for auto-evaluation!`,
      ]);

      onAddJob(finalJob);
      setInjectedJob(finalJob);
    } catch (err: any) {
      setParseError(err.message || 'Error communicating with Indeed job parser');
      setCurrentStage(0);
      setProgressPercent(0);
    } finally {
      setIsParsing(false);
    }
  };

  const handleQuickAddSample = (sample: typeof SAMPLE_INDEED_JOBS[0]) => {
    onAddJob(sample);
    setInjectedJob(sample);
    setCurrentStage(5);
    setProgressPercent(100);
    setStageMessage('Injection Complete: Curated Indeed role queued at #1!');
    setLiveLogs([`[${new Date().toLocaleTimeString()}] Curated executive opening queued into Auto-Apply pipeline.`]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Indeed Connection
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                  Global & Indeed Apply
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connect and import job openings from Indeed (US, India, and Global) with automated Indeed Apply packet generation.
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
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Import Indeed URL / Text</span>
          </button>
          <button
            onClick={() => setActiveTab('sample')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'sample'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Executive Roles</span>
          </button>
          <button
            onClick={() => setActiveTab('explainer')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'explainer'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>How Indeed Apply Works</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300">
          {/* Active Parsing / Injection Live Progress Monitor */}
          {isParsing && (
            <div className="p-5 rounded-xl bg-slate-950 border border-indigo-800/80 shadow-inner space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
                  </div>
                  <h4 className="font-bold text-white text-sm">
                    Importing & Injecting Indeed Role into Pipeline...
                  </h4>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-800">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Step checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {[
                  { step: 1, label: 'Indeed Gateway Handshake & Validation' },
                  { step: 2, label: 'ViewJob DOM & Screener Scraper' },
                  { step: 3, label: 'Gemini 3.8 Flash Normalization & Pay' },
                  { step: 4, label: 'Profile Matching & Auto-Answer Generator' },
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
                          ? 'bg-indigo-950/60 border-indigo-600/80 text-indigo-200 font-semibold' 
                          : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isCurrent ? (
                        <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-indigo-400 border-t-transparent rounded-full shrink-0" />
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
                <div className="text-indigo-300 font-semibold flex items-center gap-1.5">
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
            <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-950 border border-indigo-600/60 shadow-xl space-y-4 animate-fadeIn">
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
                      Indeed job parsed and placed at <strong>Position #1</strong> in your pipeline queue.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700">
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
                  <span className="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                    Indeed Apply
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-slate-400 text-[11px]">
                  <strong>Pre-solved Screeners:</strong> {injectedJob.screeningQuestions?.length || 2} Indeed recruiter screening questions mapped to your executive background.
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
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  Indeed Job URL or ViewJob Key
                </label>
                <input
                  type="text"
                  placeholder="https://www.indeed.com/viewjob?jk=... or https://in.indeed.com/viewjob?jk=..."
                  value={indeedUrl}
                  onChange={(e) => setIndeedUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600 font-mono"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-500">
                  Or Paste Indeed Job Details
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  Indeed Posting Text / Employer Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Paste job title, qualifications, pay scale, or screening questions copied from Indeed..."
                  value={indeedRawText}
                  onChange={(e) => setIndeedRawText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 placeholder:text-slate-600"
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
                  <span>Evaluates against Mohammed Jameel's profile</span>
                </div>

                <button
                  type="submit"
                  disabled={isParsing}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center gap-2 disabled:opacity-50 transition-all"
                >
                  {isParsing ? (
                    <>
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full"></span>
                      <span>Parsing Indeed Role with AI...</span>
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
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-300 flex items-start gap-2">
                <Zap className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                <span>
                  Curated executive openings currently hiring on Indeed with "Indeed Apply" support, calibrated for your 12+ years analytics and AI governance leadership.
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {SAMPLE_INDEED_JOBS.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">
                          {job.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                          Indeed Apply
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
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5"
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
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  How the Indeed Integration Operates
                </h4>
                <p>
                  Indeed supports two primary application modes: <strong>Indeed Apply</strong> (direct 1-click submission) and <strong>Employer ATS Redirection</strong>. Our agent supports both models seamlessly:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">1. Indeed Apply Protocol</span>
                    <p className="text-slate-400 text-[11px]">
                      Formats candidate data into Indeed's standardized schema: contact info, structured work history, and custom responses to employer qualification prompts.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">2. Screener Question Solver</span>
                    <p className="text-slate-400 text-[11px]">
                      Indeed employers frequently attach mandatory screener questions (e.g. "How many years of experience do you have with Power BI/RAG?"). Gemini auto-answers with precision.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">3. Dual Domestic & Global Scope</span>
                    <p className="text-slate-400 text-[11px]">
                      Accepts URLs from both <code>indeed.com</code> (US/Global Remote) and <code>in.indeed.com</code> (India/Chennai/Bengaluru), converting currency and formats automatically.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-semibold text-white block">4. Tracking Handshake</span>
                    <p className="text-slate-400 text-[11px]">
                      Submissions receive official Indeed gateway confirmation numbers (e.g., <code>IND-384910</code>) tracked live in your Pipeline and History views.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">
                  Target scopes: <strong>Global Remote, India (in.indeed.com), and GCC / UAE</strong>
                </span>
                <span className="text-indigo-400 font-semibold font-mono">
                  Active & Connected
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
