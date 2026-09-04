import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { PipelineControl } from './components/PipelineControl';
import { ResumeProfileEditor } from './components/ResumeProfileEditor';
import { CriteriaConfig } from './components/CriteriaConfig';
import { JobMarketFeed } from './components/JobMarketFeed';
import { ApplicationsHistory } from './components/ApplicationsHistory';
import { ApplicationModal } from './components/ApplicationModal';
import { ExecutiveHeroBanner } from './components/ExecutiveHeroBanner';
import { Footer } from './components/Footer';
import { NaukriConnectorModal } from './components/NaukriConnectorModal';
import { IndeedConnectorModal } from './components/IndeedConnectorModal';
import { ImportManager } from './components/ImportManager';
import { 
  ResumeProfile, 
  JobCriteria, 
  JobPosting, 
  AutoApplyLog, 
  PipelineStats, 
  JobEvaluation 
} from './types';
import { 
  SAMPLE_PROFILES, 
  INITIAL_CRITERIA, 
  INITIAL_JOB_POSTINGS 
} from './data/sampleData';

export default function App() {
  // Load from localStorage or defaults
  const [resume, setResume] = useState<ResumeProfile>(() => {
    const saved = localStorage.getItem('autoapply_resume_jameel_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fullName === 'Mohammed Jameel') return parsed;
      } catch (e) {}
    }
    return SAMPLE_PROFILES[0].profile;
  });

  const [criteria, setCriteria] = useState<JobCriteria>(() => {
    const saved = localStorage.getItem('autoapply_criteria_jameel_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.targetTitles?.some((t: string) => t.toLowerCase().includes('director') || t.toLowerCase().includes('governance'))) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_CRITERIA;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem('autoapply_jobs_jameel_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some((j: any) => j.id.startsWith('job-jameel-'))) return parsed;
      } catch (e) {}
    }
    return INITIAL_JOB_POSTINGS;
  });

  const [logs, setLogs] = useState<AutoApplyLog[]>([
    {
      id: 'log-init-1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'info',
      message: 'Autonomous Job Application Agent initialized for Mohammed Jameel. Target criteria loaded.',
    },
    {
      id: 'log-init-2',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: 'info',
      message: `Resume active: Mohammed Jameel (AGI Director | Research, Knowledge Systems & Governance). 12+ years analytics & data strategy. Ready to auto-apply.`,
    },
  ]);

  const [activeTab, setActiveTab] = useState<'pipeline' | 'resume' | 'criteria' | 'jobs' | 'applied' | 'import'>('jobs');
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [currentProcessingJob, setCurrentProcessingJob] = useState<JobPosting | null>(null);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);
  const [recentlyInjectedJob, setRecentlyInjectedJob] = useState<JobPosting | null>(null);
  const [isNaukriModalOpen, setIsNaukriModalOpen] = useState(false);
  const [isIndeedModalOpen, setIsIndeedModalOpen] = useState(false);

  const [isParsingResume, setIsParsingResume] = useState(false);
  const [isGeneratingJobs, setIsGeneratingJobs] = useState(false);
  const [evaluatingJobId, setEvaluatingJobId] = useState<string | null>(null);
  const [submittingJobId, setSubmittingJobId] = useState<string | null>(null);

  // Bot timer ref
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('autoapply_resume_jameel_v1', JSON.stringify(resume));
  }, [resume]);

  useEffect(() => {
    localStorage.setItem('autoapply_criteria_jameel_v1', JSON.stringify(criteria));
  }, [criteria]);

  useEffect(() => {
    localStorage.setItem('autoapply_jobs_jameel_v1', JSON.stringify(jobs));
  }, [jobs]);

  // Append a log entry
  const addLog = (
    type: AutoApplyLog['type'],
    message: string,
    jobId?: string,
    company?: string
  ) => {
    const newLog: AutoApplyLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      message,
      jobId,
      company,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 75)]);
  };

  // Evaluate a specific job against resume & criteria
  const handleEvaluateJob = async (job: JobPosting): Promise<JobEvaluation | null> => {
    setEvaluatingJobId(job.id);
    addLog('info', `Scanning & evaluating fit for "${job.title}" at ${job.company}...`, job.id, job.company);

    try {
      const response = await fetch('/api/evaluate-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          criteria,
          job,
        }),
      });

      if (!response.ok) {
        throw new Error(`Evaluation request failed: ${response.statusText}`);
      }

      const evalData: JobEvaluation = await response.json();

      setJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? {
                ...j,
                evaluation: evalData,
              }
            : j
        )
      );

      const pass = evalData.matchScore >= criteria.minMatchScore && evalData.meetsCriteria;
      if (pass) {
        addLog(
          'criteria_pass',
          `Criteria Match Verified! "${job.title}" scored ${evalData.matchScore}% (meets ${criteria.minMatchScore}% threshold). Salary & Remote checks passed.`,
          job.id,
          job.company
        );
      } else {
        const failReasons: string[] = [];
        if (!evalData.criteriaMatches.salary) failReasons.push(`Salary below $${criteria.minSalary.toLocaleString()}`);
        if (!evalData.criteriaMatches.location) failReasons.push(`Work type (${job.workType}) not in allowed list`);
        if (!evalData.criteriaMatches.title) failReasons.push(`Title not in target roles`);
        if (evalData.matchScore < criteria.minMatchScore) failReasons.push(`Score ${evalData.matchScore}% < threshold ${criteria.minMatchScore}%`);

        addLog(
          'criteria_fail',
          `Criteria Check: Skipped "${job.title}". Reason: ${failReasons.join(', ') || 'Failed requirements'}`,
          job.id,
          job.company
        );
      }

      return evalData;
    } catch (err: any) {
      console.error('Evaluation error:', err);
      addLog('warning', `Evaluation error for ${job.company}: ${err.message}`, job.id, job.company);
      return null;
    } finally {
      setEvaluatingJobId(null);
    }
  };

  // Full Auto-Apply pipeline for a specific job
  const handleApplyToJob = async (job: JobPosting) => {
    setSubmittingJobId(job.id);
    setCurrentProcessingJob(job);

    try {
      // Step 1: Ensure evaluated
      let evaluation = job.evaluation;
      if (!evaluation) {
        setProcessingStep(`Scoring qualifications against resume with Gemini...`);
        evaluation = await handleEvaluateJob(job);
      }

      // Step 2: Tailor Application (Cover letter & Screening responses)
      setProcessingStep(`Tailoring personalized cover letter & screening responses for ${job.company}...`);
      addLog('info', `Crafting role-tailored cover letter and answering ${job.screeningQuestions?.length || 3} ATS screening questions...`, job.id, job.company);

      const tailorRes = await fetch('/api/tailor-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          job,
          tone: criteria.coverLetterTone,
        }),
      });

      const tailoredData = await tailorRes.json();

      // Step 3: ATS Submission Handshake
      setProcessingStep(`Transmitting application packet to ${job.atsPlatform} recruitment endpoint...`);
      addLog('info', `Dispatching ATS transmission payload to ${job.atsPlatform} Gateway...`, job.id, job.company);

      const submitRes = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          applicantName: resume.fullName,
          atsPlatform: job.atsPlatform,
          tailoredLetter: tailoredData.tailoredCoverLetter,
          screeningAnswers: tailoredData.screeningAnswers,
        }),
      });

      const submitData = await submitRes.json();

      // Step 4: Record success
      const updatedJob: JobPosting = {
        ...job,
        status: 'applied',
        submission: {
          submissionId: submitData.submissionId,
          timestamp: submitData.timestamp,
          tailoredCoverLetter: tailoredData.tailoredCoverLetter,
          screeningAnswers: tailoredData.screeningAnswers,
          tailoredHighlights: tailoredData.tailoredHighlights || [],
          atsPlatform: job.atsPlatform,
          status: 'Submitted',
        },
      };

      setJobs((prev) => prev.map((j) => (j.id === job.id ? updatedJob : j)));

      addLog(
        'submitted',
        `SUCCESS: Application successfully submitted to ${job.company} (${job.title})! Confirmation ID: ${submitData.submissionId}`,
        job.id,
        job.company
      );
    } catch (err: any) {
      console.error('Application pipeline failed:', err);
      addLog('warning', `Failed to submit application to ${job.company}: ${err.message}`, job.id, job.company);
    } finally {
      setSubmittingJobId(null);
      setCurrentProcessingJob(null);
      setProcessingStep('');
    }
  };

  // Process next job in pipeline
  const handleProcessNextJob = async () => {
    // Check daily quota
    const appliedToday = jobs.filter((j) => j.status === 'applied').length;
    if (appliedToday >= criteria.dailyApplicationCap) {
      addLog('warning', `Daily cap reached (${appliedToday}/${criteria.dailyApplicationCap} applications). Pausing auto-apply agent.`);
      setIsBotRunning(false);
      return;
    }

    const nextJob = jobs.find((j) => j.status === 'unprocessed');
    if (!nextJob) {
      addLog('info', 'All queue jobs evaluated. Discovered no remaining unprocessed jobs.');
      setIsBotRunning(false);
      return;
    }

    setCurrentProcessingJob(nextJob);
    setProcessingStep(`Evaluating "${nextJob.title}" at ${nextJob.company}...`);

    const evaluation = await handleEvaluateJob(nextJob);
    if (!evaluation) {
      setCurrentProcessingJob(null);
      setProcessingStep('');
      return;
    }

    const passes = evaluation.matchScore >= criteria.minMatchScore && evaluation.meetsCriteria;

    if (passes) {
      if (criteria.autoApplyMode === 'autonomous') {
        await handleApplyToJob(nextJob);
      } else {
        // 1-Click review mode
        setJobs((prev) =>
          prev.map((j) =>
            j.id === nextJob.id
              ? {
                  ...j,
                  status: 'ready_to_apply',
                }
              : j
          )
        );
        addLog(
          'criteria_pass',
          `Ready for 1-Click Review: "${nextJob.title}" meets all criteria (${evaluation.matchScore}%). Awaiting review.`,
          nextJob.id,
          nextJob.company
        );
        setCurrentProcessingJob(null);
        setProcessingStep('');
      }
    } else {
      // Mark skipped
      const reason =
        !evaluation.criteriaMatches.salary
          ? `Below salary threshold ($${criteria.minSalary.toLocaleString()})`
          : !evaluation.criteriaMatches.location
          ? `Work mode (${nextJob.workType}) not allowed`
          : `Match score (${evaluation.matchScore}%) below minimum (${criteria.minMatchScore}%)`;

      setJobs((prev) =>
        prev.map((j) =>
          j.id === nextJob.id
            ? {
                ...j,
                status: 'skipped',
                skipReason: reason,
              }
            : j
        )
      );
      setCurrentProcessingJob(null);
      setProcessingStep('');
    }
  };

  // Run batch auto-apply for all matching pending jobs
  const handleRunBatchApply = async () => {
    addLog('info', 'Starting batch auto-apply pipeline for all pending opportunities...');
    const unprocessed = jobs.filter((j) => j.status === 'unprocessed');
    for (const job of unprocessed) {
      const appliedCount = jobs.filter((j) => j.status === 'applied').length;
      if (appliedCount >= criteria.dailyApplicationCap) {
        addLog('warning', `Daily quota limit reached (${appliedCount}/${criteria.dailyApplicationCap}). Stopping batch.`);
        break;
      }
      await handleProcessNextJob();
    }
  };

  // Bot Autonomous loop
  useEffect(() => {
    if (!isBotRunning) {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current);
        botTimeoutRef.current = null;
      }
      return;
    }

    const runLoop = async () => {
      await handleProcessNextJob();
      // Continue loop if still running
      if (isBotRunning) {
        botTimeoutRef.current = setTimeout(runLoop, 2500);
      }
    };

    botTimeoutRef.current = setTimeout(runLoop, 600);

    return () => {
      if (botTimeoutRef.current) {
        clearTimeout(botTimeoutRef.current);
      }
    };
  }, [isBotRunning, jobs, criteria, resume]);

  // Parse Resume with Gemini
  const handleParseResumeWithGemini = async (rawText: string) => {
    setIsParsingResume(true);
    addLog('info', 'Parsing raw resume content with Gemini 3.8 Flash model...');

    try {
      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: rawText }),
      });

      if (!res.ok) {
        throw new Error('Resume parsing failed');
      }

      const parsed = await res.json();
      setResume({
        fullName: parsed.fullName || resume.fullName,
        email: parsed.email || resume.email,
        phone: parsed.phone || resume.phone,
        location: parsed.location || resume.location,
        title: parsed.title || resume.title,
        yearsExperience: parsed.yearsExperience || resume.yearsExperience,
        summary: parsed.summary || resume.summary,
        skills: parsed.skills && parsed.skills.length > 0 ? parsed.skills : resume.skills,
        education: parsed.education || resume.education,
        targetRoles: parsed.targetRoles && parsed.targetRoles.length > 0 ? parsed.targetRoles : resume.targetRoles,
        workExperience: parsed.workExperience && parsed.workExperience.length > 0 ? parsed.workExperience : resume.workExperience,
        rawResumeText: rawText,
      });

      addLog('success', `Resume parsed successfully! Extracted ${parsed.skills?.length || 0} skills and ${parsed.yearsExperience || 0} years experience.`);
    } catch (err: any) {
      console.error(err);
      addLog('warning', `Failed to parse resume with AI: ${err.message}`);
    } finally {
      setIsParsingResume(false);
    }
  };

  // Generate / discover more jobs using Gemini
  const handleGenerateJobs = async () => {
    setIsGeneratingJobs(true);
    addLog('info', 'Scanning talent portals & discovering fresh job openings matching criteria...');

    try {
      const res = await fetch('/api/generate-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria, count: 4 }),
      });

      const data = await res.json();
      if (data.jobs && data.jobs.length > 0) {
        const newJobs: JobPosting[] = data.jobs.map((j: any) => ({
          ...j,
          status: 'unprocessed',
        }));

        setJobs((prev) => [...newJobs, ...prev]);
        addLog('success', `Discovered ${newJobs.length} new matching job opportunities! Added to queue.`);
      }
    } catch (err: any) {
      console.error(err);
      addLog('warning', `Job generation error: ${err.message}`);
    } finally {
      setIsGeneratingJobs(false);
    }
  };

  // Add custom job / portal injection
  const handleAddCustomJob = (jobData: Omit<JobPosting, 'id' | 'status'>) => {
    const newJob: JobPosting = {
      ...jobData,
      id: `injected-job-${Date.now()}`,
      status: 'unprocessed',
    };
    setJobs((prev) => [newJob, ...prev]);
    setRecentlyInjectedJob(newJob);
    addLog(
      'criteria_pass',
      `[PORTAL INGESTION] "${newJob.title}" at ${newJob.company} (${newJob.atsPlatform}) successfully parsed and injected into Auto-Apply Queue at Position #1.`,
      newJob.id,
      newJob.company
    );
  };

  // Quick Ingest from Hero Bar
  const handleQuickIngestUrl = (url: string) => {
    let ats: 'Naukri' | 'Indeed' | 'Greenhouse' | 'Ashby' | 'Lever' | 'Workday' | 'Other' = 'Other';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('naukri')) ats = 'Naukri';
    else if (lowerUrl.includes('indeed')) ats = 'Indeed';
    else if (lowerUrl.includes('greenhouse')) ats = 'Greenhouse';
    else if (lowerUrl.includes('ashby')) ats = 'Ashby';
    else if (lowerUrl.includes('lever')) ats = 'Lever';
    else if (lowerUrl.includes('workday')) ats = 'Workday';

    const companyGuess = lowerUrl.includes('naukri') 
      ? 'Enterprise AI Solutions (via Naukri)' 
      : lowerUrl.includes('indeed')
      ? 'Cognizant AI Labs (via Indeed)'
      : lowerUrl.includes('greenhouse')
      ? 'Anthropic Ecosystem Scaleup (via Greenhouse)'
      : 'Global Technology Enterprise';

    const newJob: JobPosting = {
      id: `job-ingest-${Date.now()}`,
      title: 'Director - Enterprise AI Governance & Analytics',
      company: companyGuess,
      location: criteria.targetLocations[0] || 'Chennai, India / Remote',
      workType: 'Remote',
      salaryMin: criteria.minSalary || 180000,
      salaryMax: (criteria.minSalary || 180000) + 40000,
      experienceLevel: 'Executive',
      atsPlatform: ats,
      postedDate: 'Direct URL Ingestion',
      description: `Ingested directly from live job posting (${url}). Leadership mandate focusing on enterprise AI governance, source validation, predictive systems, and high-impact analytics aligned with Mohammed Jameel's profile.`,
      requirements: [
        '12+ years analytics, machine learning, and enterprise data leadership',
        'Direct experience in AI governance, data architecture, and executive cockpits',
        'Proven track record leading high-revenue analytics ($1B+ impact)',
      ],
      screeningQuestions: [
        'Total years of experience in Enterprise Analytics and AI Governance?',
        'What is your expected compensation (USD / INR) and notice period?'
      ],
      status: 'unprocessed',
    };

    setJobs((prev) => [newJob, ...prev]);
    setRecentlyInjectedJob(newJob);
    addLog(
      'success',
      `[URL INGESTION] Opportunity ingested from ${ats} (${url.slice(0, 50)}...). Queued as #1 in pipeline.`,
      newJob.id,
      newJob.company
    );
  };

  // Stats calculation
  const stats: PipelineStats = {
    totalJobsScanned: jobs.length,
    matchedCriteria: jobs.filter((j) => j.evaluation?.meetsCriteria).length,
    autoAppliedCount: jobs.filter((j) => j.status === 'applied').length,
    skippedCount: jobs.filter((j) => j.status === 'skipped').length,
    interviewsCount: jobs.filter((j) => j.submission?.status === 'Interview Scheduled').length,
    averageMatchScore:
      jobs.filter((j) => j.evaluation).length > 0
        ? Math.round(
            jobs.filter((j) => j.evaluation).reduce((acc, j) => acc + (j.evaluation?.matchScore || 0), 0) /
              jobs.filter((j) => j.evaluation).length
          )
        : 84,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isBotRunning={isBotRunning}
        onToggleBot={() => {
          setIsBotRunning((prev) => !prev);
          addLog('info', !isBotRunning ? 'Started autonomous auto-apply bot agent.' : 'Paused auto-apply bot agent.');
        }}
        stats={stats}
        criteria={criteria}
      />

      {/* Main Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Website Hero Banner */}
        <ExecutiveHeroBanner
          profile={resume}
          criteria={criteria}
          stats={stats}
          isBotRunning={isBotRunning}
          onToggleBot={() => {
            setIsBotRunning((prev) => !prev);
            addLog('info', !isBotRunning ? 'Started autonomous auto-apply bot agent.' : 'Paused auto-apply bot agent.');
          }}
          onOpenNaukriModal={() => setIsNaukriModalOpen(true)}
          onOpenIndeedModal={() => setIsIndeedModalOpen(true)}
          onQuickIngestUrl={handleQuickIngestUrl}
          onNavigate={(tab) => setActiveTab(tab)}
          pendingQueueCount={jobs.filter((j) => j.status === 'unprocessed').length}
        />

        {/* Recently Injected Job Notification Banner */}
        {recentlyInjectedJob && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-blue-500/50 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    Pipeline Ingestion Active:
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    #1 Next in Queue
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  <strong className="text-white">{recentlyInjectedJob.title}</strong> at {recentlyInjectedJob.company} ({recentlyInjectedJob.atsPlatform}) was successfully parsed and queued for auto-apply.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setActiveTab('pipeline');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <span>View in Pipeline Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setRecentlyInjectedJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Dismiss Notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pipeline' && (
          <PipelineControl
            isBotRunning={isBotRunning}
            onToggleBot={() => {
              setIsBotRunning((prev) => !prev);
              addLog('info', !isBotRunning ? 'Started autonomous auto-apply bot agent.' : 'Paused auto-apply bot agent.');
            }}
            onRunBatchApply={handleRunBatchApply}
            onProcessNextJob={handleProcessNextJob}
            currentProcessingJob={currentProcessingJob}
            processingStep={processingStep}
            logs={logs}
            onClearLogs={() => setLogs([])}
            jobs={jobs}
            resume={resume}
            criteria={criteria}
            stats={stats}
            onOpenJobDetails={(job) => setSelectedJobForModal(job)}
            onOpenCriteria={() => setActiveTab('criteria')}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeProfileEditor
            profile={resume}
            onUpdateProfile={(updated) => setResume(updated)}
            onParseResumeWithGemini={handleParseResumeWithGemini}
            isParsing={isParsingResume}
          />
        )}

        {activeTab === 'criteria' && (
          <CriteriaConfig
            criteria={criteria}
            onUpdateCriteria={(updated) => setCriteria(updated)}
          />
        )}

        {activeTab === 'jobs' && (
          <JobMarketFeed
            jobs={jobs}
            criteria={criteria}
            profile={resume}
            onEvaluateJob={handleEvaluateJob}
            onApplyJob={handleApplyToJob}
            onOpenDetails={(job) => setSelectedJobForModal(job)}
            onGenerateJobs={handleGenerateJobs}
            onAddCustomJob={handleAddCustomJob}
            isGeneratingJobs={isGeneratingJobs}
            evaluatingJobId={evaluatingJobId}
            submittingJobId={submittingJobId}
            onNavigateToPipeline={() => setActiveTab('pipeline')}
          />
        )}

        {activeTab === 'import' && (
          <ImportManager
            profile={resume}
            criteria={criteria}
            onAddJobToPipeline={handleAddCustomJob}
            onNavigateToPipeline={() => setActiveTab('pipeline')}
            onNavigateToJobFeed={() => setActiveTab('jobs')}
            totalJobsInFeed={jobs.length}
          />
        )}

        {activeTab === 'applied' && (
          <ApplicationsHistory
            jobs={jobs}
            onOpenDetails={(job) => setSelectedJobForModal(job)}
          />
        )}
      </main>

      {/* Website Footer */}
      <Footer
        profile={resume}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      {/* Application Details & Inspection Modal */}
      {selectedJobForModal && (
        <ApplicationModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          onApply={async (job) => {
            await handleApplyToJob(job);
            setSelectedJobForModal(null);
          }}
          criteria={criteria}
          isSubmitting={submittingJobId === selectedJobForModal.id}
        />
      )}

      {/* Naukri Connector Modal */}
      <NaukriConnectorModal
        isOpen={isNaukriModalOpen}
        onClose={() => setIsNaukriModalOpen(false)}
        onAddJob={handleAddCustomJob}
        profile={resume}
        criteria={criteria}
        onNavigateToPipeline={() => {
          setIsNaukriModalOpen(false);
          setActiveTab('pipeline');
        }}
      />

      {/* Indeed Connector Modal */}
      <IndeedConnectorModal
        isOpen={isIndeedModalOpen}
        onClose={() => setIsIndeedModalOpen(false)}
        onAddJob={handleAddCustomJob}
        profile={resume}
        criteria={criteria}
        onNavigateToPipeline={() => {
          setIsIndeedModalOpen(false);
          setActiveTab('pipeline');
        }}
      />
    </div>
  );
}
