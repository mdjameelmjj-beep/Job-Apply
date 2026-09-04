import React from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  FileText, 
  Sliders, 
  Briefcase, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  DownloadCloud
} from 'lucide-react';
import { JobCriteria, PipelineStats } from '../types';

interface NavbarProps {
  activeTab: 'pipeline' | 'resume' | 'criteria' | 'jobs' | 'applied' | 'import';
  setActiveTab: (tab: 'pipeline' | 'resume' | 'criteria' | 'jobs' | 'applied' | 'import') => void;
  isBotRunning: boolean;
  onToggleBot: () => void;
  stats: PipelineStats;
  criteria: JobCriteria;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isBotRunning,
  onToggleBot,
  stats,
  criteria,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('jobs')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20">
              EA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">ExecApply</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Mohammed Jameel
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Autonomous Job Search & Application Platform
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 text-sm">
            <button
              id="nav-tab-jobs"
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'jobs'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Job Feed</span>
              <span className="text-[11px] bg-slate-800/90 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                {stats.totalJobsScanned}
              </span>
            </button>

            <button
              id="nav-tab-import"
              onClick={() => setActiveTab('import')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'import'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <DownloadCloud className="w-4 h-4 text-blue-400" />
              <span>Import</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-1.5 py-0.5 rounded-full border border-blue-500/30">
                Swarm
              </span>
            </button>

            <button
              id="nav-tab-pipeline"
              onClick={() => setActiveTab('pipeline')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Auto-Apply Engine</span>
              {isBotRunning && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            <button
              id="nav-tab-applied"
              onClick={() => setActiveTab('applied')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'applied'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Applications Tracker</span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                {stats.autoAppliedCount}
              </span>
            </button>

            <button
              id="nav-tab-resume"
              onClick={() => setActiveTab('resume')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'resume'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Executive CV</span>
            </button>

            <button
              id="nav-tab-criteria"
              onClick={() => setActiveTab('criteria')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'criteria'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Target Rules</span>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                {criteria.minMatchScore}%+
              </span>
            </button>
          </nav>

          {/* Bot State & Controls */}
          <div className="flex items-center gap-3">
            {/* Daily Cap Meter */}
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-950/70 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Daily Cap:</span>
              <span className="font-semibold text-slate-200">
                {stats.autoAppliedCount} / {criteria.dailyApplicationCap}
              </span>
            </div>

            {/* Start/Stop Auto-Apply Toggle */}
            <button
              id="btn-toggle-bot"
              onClick={onToggleBot}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 ${
                isBotRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {isBotRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Agent</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Auto-Apply</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/80 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'jobs' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Jobs ({stats.totalJobsScanned})
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'import' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'pipeline' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Auto-Apply Bot
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'applied' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Tracker ({stats.autoAppliedCount})
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'resume' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Executive CV
          </button>
          <button
            onClick={() => setActiveTab('criteria')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'criteria' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Rules
          </button>
        </div>
      </div>
    </header>
  );
};
