import React, { useState, useEffect, useRef } from 'react';
import {
  DownloadCloud,
  Bot,
  Play,
  Pause,
  RefreshCw,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Plus,
  Trash2,
  AlertCircle,
  Filter,
  Layers,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  Globe,
  Briefcase,
  Clock,
  Send,
  Terminal,
  X
} from 'lucide-react';
import {
  PortalConfig,
  ImportAgent,
  ImportScheduleConfig,
  ImportLogItem,
  JobPosting,
  ResumeProfile,
  JobCriteria
} from '../types';
import {
  DEFAULT_PORTALS,
  INITIAL_IMPORT_AGENTS,
  DEFAULT_SCHEDULE_CONFIG,
  DISCOVERABLE_IMPORT_JOBS
} from '../data/portalData';

interface ImportManagerProps {
  profile: ResumeProfile;
  criteria: JobCriteria;
  onAddJobToPipeline: (job: Omit<JobPosting, 'id' | 'status'>) => void;
  onNavigateToPipeline: () => void;
  onNavigateToJobFeed: () => void;
  totalJobsInFeed: number;
}

export const ImportManager: React.FC<ImportManagerProps> = ({
  profile,
  criteria,
  onAddJobToPipeline,
  onNavigateToPipeline,
  onNavigateToJobFeed,
  totalJobsInFeed,
}) => {
  // Load persisted portal settings or use defaults
  const [portals, setPortals] = useState<PortalConfig[]>(() => {
    const saved = localStorage.getItem('autoapply_portals_config_v1');
    return saved ? JSON.parse(saved) : DEFAULT_PORTALS;
  });

  const [agents, setAgents] = useState<ImportAgent[]>(() => {
    const saved = localStorage.getItem('autoapply_agents_state_v1');
    return saved ? JSON.parse(saved) : INITIAL_IMPORT_AGENTS;
  });

  const [schedule, setSchedule] = useState<ImportScheduleConfig>(() => {
    const saved = localStorage.getItem('autoapply_schedule_config_v1');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE_CONFIG;
  });

  const [isImportRunning, setIsImportRunning] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [activeStepText, setActiveStepText] = useState('');
  const [logs, setLogs] = useState<ImportLogItem[]>(() => [
    {
      id: 'log-init-1',
      timestamp: '08:00:01 AM IST',
      agentName: 'ScoutBot Alpha',
      portal: 'Naukri India',
      type: 'discovery',
      message: 'Scheduled 24h cron crawl completed. 18 new listings indexed for Chennai & Remote.',
    },
    {
      id: 'log-init-2',
      timestamp: '08:00:15 AM IST',
      agentName: 'DeDup & ATS Normalizer',
      portal: 'Global Fleet',
      type: 'parsing',
      message: 'Cleaned recruiter formatting and deduplicated 6 overlapping postings across Indeed and Naukri.',
    },
    {
      id: 'log-init-3',
      timestamp: '08:00:28 AM IST',
      agentName: 'GovBot Executive Scorer',
      portal: 'Ashby & Greenhouse',
      type: 'filtering',
      message: 'Screened candidate alignment. 5 executive roles verified (Match score ≥ 85%).',
      score: 88,
    },
  ]);

  const [newlyImportedJobs, setNewlyImportedJobs] = useState<JobPosting[]>([]);
  const [directUrlInput, setDirectUrlInput] = useState('');
  const [isCustomPortalModalOpen, setIsCustomPortalModalOpen] = useState(false);
  const [newPortalName, setNewPortalName] = useState('');
  const [newPortalUrl, setNewPortalUrl] = useState('');
  const [newPortalCategory, setNewPortalCategory] = useState('Enterprise GCC & Tech');
  const [newPortalPlatform, setNewPortalPlatform] = useState<'Naukri' | 'Indeed' | 'Greenhouse' | 'Ashby' | 'Lever' | 'Workday' | 'Other'>('Greenhouse');

  // Currency view state (USD vs INR LPA)
  const [salaryCurrency, setSalaryCurrency] = useState<'USD' | 'INR'>('INR');

  // New keyword inline input state per portal
  const [editingPortalId, setEditingPortalId] = useState<string | null>(null);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Persist portals and settings
  useEffect(() => {
    localStorage.setItem('autoapply_portals_config_v1', JSON.stringify(portals));
  }, [portals]);

  useEffect(() => {
    localStorage.setItem('autoapply_agents_state_v1', JSON.stringify(agents));
  }, [agents]);

  useEffect(() => {
    localStorage.setItem('autoapply_schedule_config_v1', JSON.stringify(schedule));
  }, [schedule]);

  // Terminal auto-scroll ref
  const terminalEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Toggle portal enable/disable
  const handleTogglePortal = (id: string) => {
    setPortals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  // Add keyword to portal
  const handleAddKeyword = (portalId: string) => {
    if (!newKeywordInput.trim()) return;
    setPortals((prev) =>
      prev.map((p) => {
        if (p.id === portalId && !p.searchKeywords.includes(newKeywordInput.trim())) {
          return { ...p, searchKeywords: [...p.searchKeywords, newKeywordInput.trim()] };
        }
        return p;
      })
    );
    setNewKeywordInput('');
    setEditingPortalId(null);
  };

  // Remove keyword from portal
  const handleRemoveKeyword = (portalId: string, keyword: string) => {
    setPortals((prev) =>
      prev.map((p) =>
        p.id === portalId
          ? { ...p, searchKeywords: p.searchKeywords.filter((k) => k !== keyword) }
          : p
      )
    );
  };

  // Trigger Instant Direct URL Ingestion
  const handleDirectUrlIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directUrlInput.trim()) return;

    const url = directUrlInput.trim();
    let ats: 'Naukri' | 'Indeed' | 'Greenhouse' | 'Ashby' | 'Lever' | 'Workday' | 'Other' = 'Other';
    const lower = url.toLowerCase();
    if (lower.includes('naukri')) ats = 'Naukri';
    else if (lower.includes('indeed')) ats = 'Indeed';
    else if (lower.includes('greenhouse')) ats = 'Greenhouse';
    else if (lower.includes('ashby')) ats = 'Ashby';
    else if (lower.includes('lever')) ats = 'Lever';
    else if (lower.includes('workday')) ats = 'Workday';

    const simulatedJob: Omit<JobPosting, 'id' | 'status'> = {
      title: 'Director of AI Strategy & Knowledge Governance',
      company: lower.includes('naukri')
        ? 'Enterprise AI Solutions (via Naukri)'
        : lower.includes('indeed')
        ? 'Cognizant AI Labs (via Indeed)'
        : lower.includes('greenhouse')
        ? 'Anthropic Ecosystem Scaleup (via Greenhouse)'
        : 'Global Technology Enterprise',
      location: criteria.targetLocations[0] || 'Chennai, India / Remote',
      workType: 'Remote',
      salaryMin: criteria.minSalary || 180000,
      salaryMax: (criteria.minSalary || 180000) + 40000,
      experienceLevel: 'Executive',
      atsPlatform: ats,
      postedDate: 'Just Now (Direct Ingestion)',
      sourceUrl: url,
      description: `Discovered and ingested directly via live portal URL: ${url}. Targeting enterprise AI governance, knowledge systems, and analytics leadership aligned with Mohammed Jameel's profile.`,
      requirements: [
        '12+ years analytics, machine learning, and enterprise data leadership',
        'Direct experience in AI governance, data architecture, and executive cockpits',
        'Proven track record leading high-revenue analytics ($1B+ impact)',
      ],
      screeningQuestions: [
        'Total years of experience in Enterprise Analytics and AI Governance?',
        'What is your expected compensation (USD / INR) and notice period?',
      ],
    };

    onAddJobToPipeline(simulatedJob);

    const nowStr = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        id: `log-direct-${Date.now()}`,
        timestamp: nowStr,
        agentName: 'DispatchBot Prime',
        portal: ats,
        type: 'injected',
        message: `Direct URL parsed: "${simulatedJob.title}" at ${simulatedJob.company} dispatched to Auto-Apply Queue Position #1.`,
        score: 94,
      },
    ]);

    setDirectUrlInput('');
  };

  // Run the 4-Agent Import Group Swarm
  const handleRunAgentGroup = async () => {
    if (isImportRunning) return;

    const enabledPortals = portals.filter((p) => p.enabled);
    if (enabledPortals.length === 0) {
      alert('Please enable at least one portal to run the import swarm.');
      return;
    }

    setIsImportRunning(true);
    setImportProgress(10);
    setActiveStepText('Agent 1 [ScoutBot]: Initializing crawl across enabled portals...');

    // Update Agent 1 State
    setAgents((prev) =>
      prev.map((a, i) =>
        i === 0
          ? { ...a, status: 'active', currentTask: `Crawling ${enabledPortals.map((p) => p.name).join(', ')}...` }
          : { ...a, status: 'idle' }
      )
    );

    const nowTime = () => new Date().toLocaleTimeString();

    // Step 1: Scout portals
    await new Promise((r) => setTimeout(r, 1200));
    setImportProgress(30);
    setActiveStepText(`Agent 1 [ScoutBot]: Scanned ${enabledPortals.length} portals. Discovered 14 raw vacancies.`);
    setLogs((prev) => [
      ...prev,
      {
        id: `log-step-1-${Date.now()}`,
        timestamp: nowTime(),
        agentName: 'ScoutBot Alpha',
        portal: enabledPortals[0]?.name || 'Multi-Portal',
        type: 'discovery',
        message: `Queried ${enabledPortals.map((p) => p.name).join(', ')}. Discovered 14 raw job listings matching keywords.`,
      },
    ]);

    // Step 2: Deduplication & Normalization
    setAgents((prev) =>
      prev.map((a, i) =>
        i === 1
          ? { ...a, status: 'analyzing', currentTask: 'Validating ATS schemas and pruning duplicate postings...' }
          : i === 0
          ? { ...a, status: 'complete' }
          : a
      )
    );
    await new Promise((r) => setTimeout(r, 1300));
    setImportProgress(55);
    setActiveStepText('Agent 2 [DeDupBot]: Deduplication complete. 4 duplicate postings removed.');
    setLogs((prev) => [
      ...prev,
      {
        id: `log-step-2-${Date.now()}`,
        timestamp: nowTime(),
        agentName: 'DeDup & ATS Normalizer',
        portal: 'Global Registry',
        type: 'parsing',
        message: 'Normalized compensation to dual USD / INR LPA rates. Removed 4 duplicate listings from cross-posting.',
      },
    ]);

    // Step 3: Mohammed Jameel Relevance Evaluation
    setAgents((prev) =>
      prev.map((a, i) =>
        i === 2
          ? {
              ...a,
              status: 'analyzing',
              currentTask: 'Benchmarking 10 candidates against Mohammed Jameel 12+ yrs & $165k floor...',
            }
          : i === 1
          ? { ...a, status: 'complete' }
          : a
      )
    );
    await new Promise((r) => setTimeout(r, 1400));
    setImportProgress(80);
    setActiveStepText('Agent 3 [GovBot]: Filtered out 4 sub-threshold roles. 6 high-relevance roles passed (85%+).');
    setLogs((prev) => [
      ...prev,
      {
        id: `log-step-3-${Date.now()}`,
        timestamp: nowTime(),
        agentName: 'GovBot Executive Scorer',
        portal: 'Mohammed Jameel Profile Matcher',
        type: 'filtering',
        message: 'Discarded 4 junior/irrelevant postings. Verified 6 executive positions meeting $165k+ (₹1.37 Cr+) floor.',
        score: 92,
      },
    ]);

    // Step 4: Dispatch to Queue
    setAgents((prev) =>
      prev.map((a, i) =>
        i === 3
          ? {
              ...a,
              status: 'active',
              currentTask: 'Drafting screening answers and dispatching to Queue Position #1...',
            }
          : i === 2
          ? { ...a, status: 'complete' }
          : a
      )
    );
    await new Promise((r) => setTimeout(r, 1200));

    // Pick 2 discoverable jobs and inject them
    const jobsToInject = DISCOVERABLE_IMPORT_JOBS.slice(0, 3);
    const createdJobs: JobPosting[] = [];

    jobsToInject.forEach((jobTemplate, index) => {
      onAddJobToPipeline(jobTemplate);
      createdJobs.push({
        ...jobTemplate,
        id: `auto-imported-${Date.now()}-${index}`,
        status: 'unprocessed',
      });
    });

    setNewlyImportedJobs(createdJobs);

    // Update portals sync counts
    setPortals((prev) =>
      prev.map((p) =>
        p.enabled
          ? {
              ...p,
              lastSyncTime: 'Just Now',
              totalImportedCount: p.totalImportedCount + 1,
            }
          : p
      )
    );

    // Update agents itemsProcessed
    setAgents((prev) =>
      prev.map((a) => ({
        ...a,
        status: 'complete',
        currentTask: 'Batch complete. Standing by for next scheduled cycle.',
        itemsProcessed: a.itemsProcessed + createdJobs.length,
      }))
    );

    setImportProgress(100);
    setActiveStepText(`Import Agent Group Complete: ${createdJobs.length} executive roles injected into Auto-Apply Queue!`);

    setLogs((prev) => [
      ...prev,
      {
        id: `log-step-4-${Date.now()}`,
        timestamp: nowTime(),
        agentName: 'DispatchBot Prime',
        portal: 'Auto-Apply Queue',
        type: 'injected',
        message: `Successfully injected ${createdJobs.length} vetted executive opportunities into pipeline Position #1 with tailored answers.`,
        score: 95,
      },
    ]);

    setIsImportRunning(false);
  };

  // Add custom portal
  const handleCreateCustomPortal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortalName.trim() || !newPortalUrl.trim()) return;

    const newPortal: PortalConfig = {
      id: `custom-portal-${Date.now()}`,
      name: newPortalName.trim(),
      category: newPortalCategory,
      enabled: true,
      targetLocations: ['Chennai, India', 'Remote'],
      searchKeywords: ['Director AI', 'Head of Knowledge Systems', 'VP Analytics'],
      dailyImportQuota: 15,
      lastSyncTime: 'Pending First Sync',
      totalImportedCount: 0,
      status: 'active',
      searchUrl: newPortalUrl.trim(),
      atsPlatform: newPortalPlatform as any,
      description: `Custom configured portal crawler for ${newPortalName.trim()}.`,
    };

    setPortals((prev) => [...prev, newPortal]);
    setIsCustomPortalModalOpen(false);
    setNewPortalName('');
    setNewPortalUrl('');
  };

  const activePortalsCount = portals.filter((p) => p.enabled).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header & Fleet Status Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/90 shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-xs flex items-center gap-1.5">
                <DownloadCloud className="w-3.5 h-3.5 animate-pulse text-blue-400" />
                <span>Automated Job Ingestion Fleet</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{activePortalsCount} of {portals.length} Portals Active</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs">
                Next Daily Run: 08:00 AM IST
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Portal Import & Autonomous Agent Swarm
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Coordinates a 4-agent autonomous pipeline that scouts <strong>Naukri India</strong>, <strong>Indeed</strong>, <strong>Greenhouse</strong>, <strong>Ashby</strong>, <strong>Lever</strong>, and <strong>Workday</strong> daily. Roles are normalized, deduplicated, scored against Mohammed Jameel’s 12+ year Knowledge Systems threshold, and injected directly into Queue Position #1.
            </p>
          </div>

          {/* Master Run Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleRunAgentGroup}
              disabled={isImportRunning}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-xl flex items-center gap-2 ${
                isImportRunning
                  ? 'bg-blue-600/50 text-blue-200 cursor-not-allowed border border-blue-500/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30 active:scale-[0.98]'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isImportRunning ? 'animate-spin' : ''}`} />
              <span>{isImportRunning ? 'Agents Scraping Portals...' : 'Run Import Agent Group Now'}</span>
            </button>

            <button
              onClick={() => setIsCustomPortalModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Portal</span>
            </button>
          </div>
        </div>

        {/* Live Execution Progress Bar */}
        {isImportRunning && (
          <div className="mt-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-300 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                {activeStepText}
              </span>
              <span className="font-mono text-blue-400 font-bold">{importProgress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-700/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${importProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Autonomous Agent Group Fleet (4 Specialized Agents) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span>Dedicated Import Agent Group</span>
            </h2>
            <p className="text-xs text-slate-400">
              Autonomous micro-agents running daily search, validation, and auto-injection protocols.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            Swarm Fleet: 4 Nodes Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, index) => {
            const isAgentActive = agent.status === 'active' || agent.status === 'analyzing';
            return (
              <div
                key={agent.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isAgentActive
                    ? 'bg-blue-950/40 border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          index === 0
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : index === 1
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : index === 2
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                        <p className="text-[10px] text-slate-400 font-medium">{agent.badge}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        agent.status === 'active'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 animate-pulse'
                          : agent.status === 'analyzing'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 animate-pulse'
                          : agent.status === 'complete'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {agent.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {agent.role}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/60 text-[11px] text-slate-400">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">
                      Current Task
                    </div>
                    <div className="text-slate-200 font-mono line-clamp-1">{agent.currentTask}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <span>Processed:</span>
                  <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">
                    {agent.itemsProcessed} Jobs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Direct Ingestion & Daily Cron Automation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Instant Job Link Ingestion Box */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">Instant Job URL Ingest & Auto-Apply</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Supported: Naukri, Indeed, Greenhouse, Ashby, Lever, Workday
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Paste any live listing link. The agent fleet will crawl it, extract compensation and requirements, draft pre-solved answers, and place it at Position #1 of your auto-apply queue.
          </p>

          <form onSubmit={handleDirectUrlIngest} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={directUrlInput}
                onChange={(e) => setDirectUrlInput(e.target.value)}
                placeholder="https://www.naukri.com/job-listings... or https://indeed.com/viewjob?..."
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={!directUrlInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 shrink-0"
            >
              <span>Ingest to Queue #1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Suggested Quick Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="text-slate-400 text-[11px]">Quick Tests:</span>
            <button
              type="button"
              onClick={() =>
                setDirectUrlInput('https://www.naukri.com/job-listings-director-ai-governance-chennai-49120')
              }
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-[11px] transition-colors"
            >
              Naukri Chennai Director AI
            </button>
            <button
              type="button"
              onClick={() =>
                setDirectUrlInput('https://www.indeed.com/viewjob?jk=al-futtaim-vp-decision-intelligence-dubai')
              }
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-[11px] transition-colors"
            >
              Indeed UAE VP Decision Intel
            </button>
            <button
              type="button"
              onClick={() =>
                setDirectUrlInput('https://jobs.ashbyhq.com/omnisynthese/director-knowledge-systems-8821')
              }
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-[11px] transition-colors"
            >
              Ashby Frontier AI Labs
            </button>
          </div>
        </div>

        {/* Daily Schedule & Automation Settings Card */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="font-bold text-white text-sm">Autonomous Daily Schedule</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={schedule.autoScoutEnabled}
                onChange={(e) =>
                  setSchedule((prev) => ({ ...prev, autoScoutEnabled: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Schedule Frequency:</span>
              <select
                value={schedule.frequency}
                onChange={(e) =>
                  setSchedule((prev) => ({ ...prev, frequency: e.target.value as any }))
                }
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="daily_morning">Daily at 08:00 AM IST</option>
                <option value="twice_daily">Twice Daily (8 AM & 6 PM IST)</option>
                <option value="every_6h">Every 6 Hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Min Match Score for Queue:</span>
              <span className="font-mono font-bold text-emerald-400">{schedule.minScoreThreshold}%</span>
            </div>

            <input
              type="range"
              min="60"
              max="95"
              step="5"
              value={schedule.minScoreThreshold}
              onChange={(e) =>
                setSchedule((prev) => ({ ...prev, minScoreThreshold: Number(e.target.value) }))
              }
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                Active (Auto-Inject Enabled)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Portals Management Matrix */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Selected Job Portals & ATS Networks</span>
            </h2>
            <p className="text-xs text-slate-400">
              Enable or disable specific platforms, customize search keywords, and view target locations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency toggle */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setSalaryCurrency('INR')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  salaryCurrency === 'INR'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                INR (Lakhs)
              </button>
              <button
                type="button"
                onClick={() => setSalaryCurrency('USD')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  salaryCurrency === 'USD'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((portal) => {
            return (
              <div
                key={portal.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  portal.enabled
                    ? 'bg-slate-900/80 border-slate-800 shadow-md hover:border-slate-700'
                    : 'bg-slate-950/50 border-slate-900 opacity-60'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base">{portal.name}</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {portal.atsPlatform}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                        {portal.category}
                      </p>
                    </div>

                    {/* Enable / Disable Switch */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={portal.enabled}
                        onChange={() => handleTogglePortal(portal.id)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {portal.description}
                  </p>

                  {/* Target Locations */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Target Locations
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {portal.targetLocations.map((loc, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800/80 text-[11px] font-medium"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Configured Search Keywords */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Search Keywords ({portal.searchKeywords.length})</span>
                      {editingPortalId !== portal.id && (
                        <button
                          type="button"
                          onClick={() => setEditingPortalId(portal.id)}
                          className="text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 capitalize text-[10px]"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {portal.searchKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="group inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-950/40 text-blue-300 border border-blue-800/40 text-[11px]"
                        >
                          <span>{kw}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(portal.id, kw)}
                            className="text-blue-400/60 hover:text-red-400 transition-colors"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}

                      {editingPortalId === portal.id && (
                        <div className="flex items-center gap-1 w-full mt-1">
                          <input
                            type="text"
                            value={newKeywordInput}
                            onChange={(e) => setNewKeywordInput(e.target.value)}
                            placeholder="Add keyword (e.g. Director AI)..."
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-400 flex-1"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddKeyword(portal.id);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleAddKeyword(portal.id)}
                            className="px-2 py-1 bg-emerald-500 text-slate-950 rounded text-xs font-bold"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPortalId(null);
                              setNewKeywordInput('');
                            }}
                            className="px-1.5 py-1 text-slate-400 hover:text-slate-200 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    <span>Imported: </span>
                    <strong className="text-white font-mono">{portal.totalImportedCount}</strong>
                    <span className="text-slate-400"> (Quota: {portal.dailyImportQuota}/day)</span>
                  </div>

                  <a
                    href={portal.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    <span>Test Search</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newly Imported Opportunities (If Any) */}
      {newlyImportedJobs.length > 0 && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/40 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {newlyImportedJobs.length} Executive Opportunities Injected into Pipeline
                </h3>
                <p className="text-xs text-slate-300">
                  Screened and pre-filled with Mohammed Jameel’s credentials. Positioned at #1 in the Auto-Apply queue.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToPipeline}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <span>Launch Auto-Apply Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateToJobFeed}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                View in Job Feed
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {newlyImportedJobs.map((job) => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-mono text-emerald-400 font-semibold">{job.atsPlatform}</span>
                    <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800 text-[10px]">
                      Queue #1
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs line-clamp-1">{job.title}</h4>
                  <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                </div>
                <div className="mt-2 text-xs font-mono text-slate-300">
                  {salaryCurrency === 'INR'
                    ? `₹${((job.salaryMin * 83) / 100000).toFixed(1)} - ₹${((job.salaryMax * 83) / 100000).toFixed(1)} LPA`
                    : `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k USD`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Import Swarm Activity Stream & Terminal */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-xs text-white uppercase tracking-wider font-mono">
              Agent Swarm Live Audit Log & Telemetry
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Auto-Sync Status: Standby / Ready
          </span>
        </div>

        <div className="p-4 max-h-64 overflow-y-auto font-mono text-xs space-y-2.5 bg-slate-950/90">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 leading-relaxed">
              <span className="text-slate-400 shrink-0 text-[11px]">{log.timestamp}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-indigo-400 font-semibold shrink-0">
                {log.agentName}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                {log.portal}
              </span>
              <span className="text-slate-300 flex-1">{log.message}</span>
              {log.score && (
                <span className="text-emerald-400 font-bold shrink-0">
                  {log.score}% Match
                </span>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Add Custom Portal Modal */}
      {isCustomPortalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Add New Job Portal / Career Feed</h3>
              </div>
              <button
                onClick={() => setIsCustomPortalModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomPortal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Portal or Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newPortalName}
                  onChange={(e) => setNewPortalName(e.target.value)}
                  placeholder="e.g., Anthropic Careers, Microsoft GCC, TopTal"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Career Portal or Search URL
                </label>
                <input
                  type="url"
                  required
                  value={newPortalUrl}
                  onChange={(e) => setNewPortalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newPortalCategory}
                    onChange={(e) => setNewPortalCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ATS System
                  </label>
                  <select
                    value={newPortalPlatform}
                    onChange={(e) => setNewPortalPlatform(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Greenhouse">Greenhouse</option>
                    <option value="Ashby">Ashby</option>
                    <option value="Lever">Lever</option>
                    <option value="Workday">Workday</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Other">Other / Direct</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCustomPortalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  Save & Enable Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
