import React from 'react';
import {
  Play,
  Pause,
  RotateCw,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Terminal,
  ShieldCheck,
  TrendingUp,
  FileText,
  ExternalLink,
  Sliders,
  AlertCircle,
  Eye,
  Check,
} from 'lucide-react';
import { JobPosting, JobCriteria, ResumeProfile, AutoApplyLog, PipelineStats } from '../types';
import { SuccessRateTrends } from './SuccessRateTrends';

interface PipelineControlProps {
  isBotRunning: boolean;
  onToggleBot: () => void;
  onRunBatchApply: () => void;
  onProcessNextJob: () => void;
  currentProcessingJob: JobPosting | null;
  processingStep: string;
  logs: AutoApplyLog[];
  onClearLogs: () => void;
  jobs: JobPosting[];
  resume: ResumeProfile;
  criteria: JobCriteria;
  stats: PipelineStats;
  onOpenJobDetails: (job: JobPosting) => void;
  onOpenCriteria: () => void;
}

export const PipelineControl: React.FC<PipelineControlProps> = ({
  isBotRunning,
  onToggleBot,
  onRunBatchApply,
  onProcessNextJob,
  currentProcessingJob,
  processingStep,
  logs,
  onClearLogs,
  jobs,
  resume,
  criteria,
  stats,
  onOpenJobDetails,
  onOpenCriteria,
}) => {
  const pendingJobs = jobs.filter((j) => j.status === 'unprocessed' || j.status === 'ready_to_apply');
  const appliedJobs = jobs.filter((j) => j.status === 'applied');
  const skippedJobs = jobs.filter((j) => j.status === 'skipped');

  return (
    <div className="space-y-6">
      {/* Hero Control Center */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isBotRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                {isBotRunning ? 'Pipeline Active • Continuous Scanning' : 'Pipeline Standby'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Mode: {criteria.autoApplyMode === 'autonomous' ? 'Autonomous Auto-Submit' : '1-Click Approval'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Auto-Apply Command Center
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Grounded on <strong className="text-slate-200">{resume.fullName}</strong>'s resume.
              Filtering for <strong className="text-emerald-400">{criteria.targetTitles[0] || 'Target Roles'}</strong> with ${criteria.minSalary.toLocaleString()}+ min salary and {criteria.minMatchScore}%+ match threshold.
            </p>
          </div>

          {/* Master Bot Triggers */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-bot-toggle-primary"
              onClick={onToggleBot}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
                isBotRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {isBotRunning ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause Agent</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Launch Auto-Applier</span>
                </>
              )}
            </button>

            <button
              id="btn-process-next-step"
              onClick={onProcessNextJob}
              disabled={isBotRunning || pendingJobs.length === 0}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <RotateCw className="w-4 h-4" />
              <span>Process Single Job</span>
            </button>

            <button
              id="btn-run-batch-apply"
              onClick={onRunBatchApply}
              disabled={isBotRunning || pendingJobs.length === 0}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply All Matching ({pendingJobs.length})</span>
            </button>
          </div>
        </div>

        {/* Active Job Processing Bar (Visible when processing) */}
        {currentProcessingJob && (
          <div className="mt-6 pt-5 border-t border-slate-800 bg-slate-950/60 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-white">
                  Currently Processing: <strong>{currentProcessingJob.title}</strong> at {currentProcessingJob.company}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/60">
                {processingStep || 'Evaluating criteria & requirements...'}
              </span>
            </div>
            
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Jobs Scanned</span>
            <RotateCw className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalJobsScanned}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across ATS feeds</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Auto-Applied</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{stats.autoAppliedCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Daily limit: {criteria.dailyApplicationCap}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Criteria Pass Rate</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-sky-400">
            {stats.totalJobsScanned > 0
              ? `${Math.round(((stats.autoAppliedCount) / stats.totalJobsScanned) * 100)}%`
              : '0%'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Met salary & remote rules</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Skipped / Below Bar</span>
            <XCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{stats.skippedCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">Saved from irrelevant apps</div>
        </div>
      </div>

      {/* Success Rate Trends (Recharts Line Chart) */}
      <SuccessRateTrends jobs={jobs} criteria={criteria} stats={stats} />

      {/* Main Split: Live Terminal Logs + Pipeline Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Terminal Logs (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg">
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-xs text-slate-200 tracking-wide">
                Agent Live Execution Stream
              </span>
              <span className="text-[10px] text-slate-500 font-mono">({logs.length} events)</span>
            </div>
            <button
              onClick={onClearLogs}
              className="text-[11px] text-slate-400 hover:text-slate-200 hover:underline"
            >
              Clear
            </button>
          </div>

          <div className="p-4 font-mono text-xs overflow-y-auto max-h-96 space-y-2.5 bg-slate-950/90 select-text">
            {logs.length === 0 ? (
              <div className="text-slate-500 text-center py-12">
                <Terminal className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>Pipeline is waiting. Press "Launch Auto-Applier" or "Process Single Job" to start.</p>
              </div>
            ) : (
              logs.map((log) => {
                let badgeColor = 'text-slate-400 border-slate-800';
                if (log.type === 'submitted') badgeColor = 'text-emerald-300 border-emerald-800/80 bg-emerald-950/40';
                else if (log.type === 'criteria_pass') badgeColor = 'text-sky-300 border-sky-800/80 bg-sky-950/40';
                else if (log.type === 'criteria_fail') badgeColor = 'text-amber-300 border-amber-800/80 bg-amber-950/40';
                else if (log.type === 'warning') badgeColor = 'text-rose-300 border-rose-800/80 bg-rose-950/40';

                return (
                  <div
                    key={log.id}
                    className={`flex items-start gap-2.5 p-2 rounded border ${badgeColor} transition-colors`}
                  >
                    <span className="text-[10px] text-slate-500 whitespace-nowrap mt-0.5">
                      {log.timestamp}
                    </span>
                    <span className="text-slate-300 leading-relaxed flex-1 break-words">
                      {log.message}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pipeline Queue & Criteria Rules (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Auto-Apply Ingestion & Execution Queue Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-white">
                  Ingestion Queue ({pendingJobs.length} Ready)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800">
                Priority Ordered
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Roles parsed and injected via Naukri, Indeed, or ATS feeds waiting in the automated pipeline:
            </p>

            {pendingJobs.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-xs text-slate-500">
                Queue is clear! Import roles via Naukri or Indeed to inject them into the queue.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {pendingJobs.slice(0, 5).map((job, idx) => {
                  const isFirst = idx === 0;
                  const isImported = job.atsPlatform === 'Naukri' || job.atsPlatform === 'Indeed' || job.id.startsWith('custom-job-');
                  
                  return (
                    <div
                      key={job.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isFirst
                          ? 'bg-slate-950 border-sky-500/50 shadow-md shadow-sky-950/20'
                          : 'bg-slate-950/60 border-slate-800/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isFirst 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              #{idx + 1} Next
                            </span>
                            {isImported && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">
                                Injected via {job.atsPlatform}
                              </span>
                            )}
                          </div>
                          <div className="font-medium text-xs text-white truncate">
                            {job.title}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono">
                              ${Math.round(job.salaryMin / 1000)}k+
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenJobDetails(job)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0"
                          title="Inspect Queue Candidate"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Criteria Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Active Auto-Apply Rules</h3>
              </div>
              <button
                onClick={onOpenCriteria}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
              >
                <Sliders className="w-3 h-3" />
                <span>Adjust</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Target Titles:</span>
                <span className="font-medium text-slate-200 text-right truncate max-w-[180px]">
                  {criteria.targetTitles.join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Work Types:</span>
                <span className="font-medium text-emerald-400">
                  {criteria.workTypes.join(', ')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Min Base Salary:</span>
                <span className="font-medium text-slate-200">
                  ${criteria.minSalary.toLocaleString()} / year
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Min Match Score:</span>
                <span className="font-bold text-sky-400">{criteria.minMatchScore}% match</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Letter Style:</span>
                <span className="capitalize text-slate-300">{criteria.coverLetterTone}</span>
              </div>
            </div>
          </div>

          {/* Recent Auto-Applied Quick Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Recent Submissions ({appliedJobs.length})</span>
              </h3>
            </div>

            {appliedJobs.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                No jobs submitted yet. Start the agent to auto-apply to eligible matches.
              </p>
            ) : (
              <div className="space-y-2.5">
                {appliedJobs.slice(-3).reverse().map((job) => (
                  <div
                    key={job.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-xs text-white truncate">
                        {job.title}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{job.company}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-mono">
                          {job.submission?.submissionId}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenJobDetails(job)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 shrink-0"
                      title="Inspect Application Packet"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-300" />
                      <span className="hidden sm:inline text-[11px]">Inspect</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
