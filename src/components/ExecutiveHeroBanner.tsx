import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Play, 
  Pause, 
  MapPin, 
  Briefcase, 
  Link as LinkIcon, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  TrendingUp, 
  Plus, 
  Globe,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { ResumeProfile, JobCriteria, PipelineStats } from '../types';

interface ExecutiveHeroBannerProps {
  profile: ResumeProfile;
  criteria: JobCriteria;
  stats: PipelineStats;
  isBotRunning: boolean;
  onToggleBot: () => void;
  onOpenNaukriModal: () => void;
  onOpenIndeedModal: () => void;
  onQuickIngestUrl: (url: string) => void;
  onNavigate: (tab: 'pipeline' | 'resume' | 'criteria' | 'jobs' | 'applied' | 'import') => void;
  pendingQueueCount: number;
}

export const ExecutiveHeroBanner: React.FC<ExecutiveHeroBannerProps> = ({
  profile,
  criteria,
  stats,
  isBotRunning,
  onToggleBot,
  onOpenNaukriModal,
  onOpenIndeedModal,
  onQuickIngestUrl,
  onNavigate,
  pendingQueueCount,
}) => {
  const [quickUrl, setQuickUrl] = useState('');

  const handleQuickIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    onQuickIngestUrl(quickUrl.trim());
    setQuickUrl('');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 shadow-2xl p-6 sm:p-8 mb-8">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top row: Profile & Executive Brand + Bot Controller */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/70">
        
        {/* Candidate Identity */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-xl shadow-emerald-950/40 border border-emerald-400/30">
              MJ
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Verified Profile">
              <CheckCircle2 className="w-3 h-3 text-slate-950 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {profile.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>12+ Yrs Executive Experience</span>
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">•</span>
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                MSc Data Science (UK)
              </span>
            </div>

            <p className="text-sm font-medium text-slate-300">
              AGI Director • AI Governance & Knowledge Systems • Enterprise FP&A / BI Architect
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chennai, India</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Open to: Dubai / UAE • Hybrid • Global Remote</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-semibold font-mono">
                Min Target: ${criteria.minSalary.toLocaleString()} / ₹{Math.round(criteria.minSalary * 0.83 / 1000)}L LPA
              </span>
            </div>
          </div>
        </div>

        {/* Autonomous Bot Controller */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                {isBotRunning ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-600"></span>
                )}
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Agent Engine
                </div>
                <div className="text-xs font-bold text-white">
                  {isBotRunning ? 'Autonomous Active' : 'Agent Paused'}
                </div>
              </div>
            </div>

            <button
              onClick={onToggleBot}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isBotRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isBotRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Bot</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Auto-Apply</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Middle row: Real-World Quick Ingest Bar */}
      <div className="py-5">
        <form onSubmit={handleQuickIngest} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <LinkIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <input
              type="text"
              placeholder="Paste any live job URL from Naukri, Indeed, Greenhouse, Ashby, or LinkedIn..."
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={!quickUrl.trim()}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Parse & Queue</span>
          </button>

          {/* Quick Connect Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('import')}
              className="px-3.5 py-3 rounded-2xl bg-blue-950/70 hover:bg-blue-900/80 text-blue-300 border border-blue-800/80 font-semibold text-xs flex items-center gap-1.5 transition-all"
              title="Autonomous Portal Import Swarm"
            >
              <span>🌐 Auto-Import Swarm</span>
            </button>

            <button
              type="button"
              onClick={onOpenNaukriModal}
              className="px-3.5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-semibold text-xs flex items-center gap-1.5 transition-all"
              title="Connect to Naukri.com India"
            >
              <span>🇮🇳 Naukri</span>
            </button>

            <button
              type="button"
              onClick={onOpenIndeedModal}
              className="px-3.5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-semibold text-xs flex items-center gap-1.5 transition-all"
              title="Connect to Indeed Global"
            >
              <span>💼 Indeed</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom row: Live Telemetry & Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/60">
        
        <div 
          onClick={() => onNavigate('jobs')} 
          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Market Feed</span>
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-lg font-bold text-white font-mono mt-1">
            {stats.totalJobsScanned}
          </div>
          <div className="text-[10px] text-indigo-400 font-medium mt-0.5">
            Executive Openings
          </div>
        </div>

        <div 
          onClick={() => onNavigate('pipeline')} 
          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Ingestion Queue</span>
            <Bot className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-lg font-bold text-sky-400 font-mono mt-1">
            {pendingQueueCount} Ready
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Queued for Auto-Apply
          </div>
        </div>

        <div 
          onClick={() => onNavigate('applied')} 
          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Applied & Submitted</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
            {stats.autoAppliedCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Confirmed Submissions
          </div>
        </div>

        <div 
          onClick={() => onNavigate('criteria')} 
          className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all"
        >
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Daily Application Cap</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-amber-400 font-mono mt-1">
            {stats.autoAppliedCount} / {criteria.dailyApplicationCap}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Paced Rate Limiter
          </div>
        </div>

      </div>

    </div>
  );
};
