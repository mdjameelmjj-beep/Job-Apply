import React, { useState } from 'react';
import { 
  Sliders, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  ShieldAlert, 
  Check, 
  Plus, 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';
import { JobCriteria, WorkType, ExperienceLevel } from '../types';

interface CriteriaConfigProps {
  criteria: JobCriteria;
  onUpdateCriteria: (criteria: JobCriteria) => void;
}

const COMMON_TITLES = [
  'AGI Director',
  'Director of AI Governance',
  'Director of Knowledge Systems',
  'Head of Analytics & Business Intelligence',
  'VP of Data Strategy',
  'Director of Decision Systems',
  'Principal AI Operating Model Lead',
  'Revenue Analytics Manager',
];

export const CriteriaConfig: React.FC<CriteriaConfigProps> = ({
  criteria,
  onUpdateCriteria,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newBlacklistCompany, setNewBlacklistCompany] = useState('');
  const [newBlacklistKeyword, setNewBlacklistKeyword] = useState('');
  const [saveBanner, setSaveBanner] = useState(false);

  const toggleWorkType = (type: WorkType) => {
    const exists = criteria.workTypes.includes(type);
    let updated: WorkType[];
    if (exists) {
      if (criteria.workTypes.length === 1) return; // Keep at least one
      updated = criteria.workTypes.filter((t) => t !== type);
    } else {
      updated = [...criteria.workTypes, type];
    }
    onUpdateCriteria({ ...criteria, workTypes: updated });
    triggerSaveAlert();
  };

  const toggleExpLevel = (level: ExperienceLevel) => {
    const exists = criteria.experienceLevels.includes(level);
    let updated: ExperienceLevel[];
    if (exists) {
      if (criteria.experienceLevels.length === 1) return;
      updated = criteria.experienceLevels.filter((l) => l !== level);
    } else {
      updated = [...criteria.experienceLevels, level];
    }
    onUpdateCriteria({ ...criteria, experienceLevels: updated });
    triggerSaveAlert();
  };

  const triggerSaveAlert = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2000);
  };

  const handleAddTitle = (titleToAdd: string) => {
    if (!titleToAdd.trim() || criteria.targetTitles.includes(titleToAdd.trim())) return;
    onUpdateCriteria({
      ...criteria,
      targetTitles: [...criteria.targetTitles, titleToAdd.trim()],
    });
    setNewTitle('');
    triggerSaveAlert();
  };

  const handleRemoveTitle = (titleToRemove: string) => {
    onUpdateCriteria({
      ...criteria,
      targetTitles: criteria.targetTitles.filter((t) => t !== titleToRemove),
    });
    triggerSaveAlert();
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocation.trim() || criteria.locations.includes(newLocation.trim())) return;
    onUpdateCriteria({
      ...criteria,
      locations: [...criteria.locations, newLocation.trim()],
    });
    setNewLocation('');
    triggerSaveAlert();
  };

  const handleRemoveLocation = (locToRemove: string) => {
    onUpdateCriteria({
      ...criteria,
      locations: criteria.locations.filter((l) => l !== locToRemove),
    });
    triggerSaveAlert();
  };

  const handleAddBlacklistCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlacklistCompany.trim() || criteria.blacklistedCompanies.includes(newBlacklistCompany.trim())) return;
    onUpdateCriteria({
      ...criteria,
      blacklistedCompanies: [...criteria.blacklistedCompanies, newBlacklistCompany.trim()],
    });
    setNewBlacklistCompany('');
    triggerSaveAlert();
  };

  const handleRemoveBlacklistCompany = (compToRemove: string) => {
    onUpdateCriteria({
      ...criteria,
      blacklistedCompanies: criteria.blacklistedCompanies.filter((c) => c !== compToRemove),
    });
    triggerSaveAlert();
  };

  const handleAddBlacklistKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlacklistKeyword.trim() || criteria.blacklistedKeywords.includes(newBlacklistKeyword.trim())) return;
    onUpdateCriteria({
      ...criteria,
      blacklistedKeywords: [...criteria.blacklistedKeywords, newBlacklistKeyword.trim()],
    });
    setNewBlacklistKeyword('');
    triggerSaveAlert();
  };

  const handleRemoveBlacklistKeyword = (kwToRemove: string) => {
    onUpdateCriteria({
      ...criteria,
      blacklistedKeywords: criteria.blacklistedKeywords.filter((k) => k !== kwToRemove),
    });
    triggerSaveAlert();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Auto-Apply Matching Criteria & Guardrails
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Only job openings strictly complying with these parameters will be matched, tailored, and submitted.
            </p>
          </div>

          {saveBanner && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold animate-fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Rules Saved</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Core Filtering */}
        <div className="space-y-6">
          
          {/* Target Titles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Target Job Titles</span>
            </h3>
            <p className="text-xs text-slate-400">
              The agent will only consider jobs with matching title keywords.
            </p>

            <div className="flex flex-wrap gap-1.5 min-h-[38px] p-2 bg-slate-950 border border-slate-800 rounded-xl">
              {criteria.targetTitles.map((title) => (
                <span
                  key={title}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/80"
                >
                  <span>{title}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTitle(title)}
                    className="text-emerald-400 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTitle(newTitle);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Add title (e.g. Lead Full Stack)..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Add
              </button>
            </form>

            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block mb-1.5">Quick suggestions:</span>
              <div className="flex flex-wrap gap-1">
                {COMMON_TITLES.filter((t) => !criteria.targetTitles.includes(t)).slice(0, 4).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleAddTitle(t)}
                    className="text-[11px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md border border-slate-700/60 transition-colors"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Salary Floor Slider */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Minimum Base Salary Threshold</span>
              </h3>
              <span className="text-base font-bold text-emerald-400 font-mono">
                ${criteria.minSalary.toLocaleString()} / yr
              </span>
            </div>

            <p className="text-xs text-slate-400">
              The agent automatically skips any job whose posted minimum or upper band falls below this number.
            </p>

            <input
              type="range"
              min={60000}
              max={250000}
              step={5000}
              value={criteria.minSalary}
              onChange={(e) => {
                onUpdateCriteria({ ...criteria, minSalary: parseInt(e.target.value) });
                triggerSaveAlert();
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>$60,000</span>
              <span>$120,000</span>
              <span>$180,000</span>
              <span>$250,000+</span>
            </div>
          </div>

          {/* Match Score Threshold Slider */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Minimum AI Match Score</span>
              </h3>
              <span className="text-base font-bold text-sky-400 font-mono">
                {criteria.minMatchScore}% Fit
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Gemini calculates a 0-100% skill & qualification alignment score. Scores below this bar will be skipped.
            </p>

            <input
              type="range"
              min={50}
              max={95}
              step={5}
              value={criteria.minMatchScore}
              onChange={(e) => {
                onUpdateCriteria({ ...criteria, minMatchScore: parseInt(e.target.value) });
                triggerSaveAlert();
              }}
              className="w-full accent-sky-500 cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>50% (Broad)</span>
              <span>75% (Recommended)</span>
              <span>90% (Strict Elite)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Work Types, Automation Mode & Safety Guardrails */}
        <div className="space-y-6">
          
          {/* Work Types & Seniority */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Work Modes & Experience Level</span>
            </h3>

            {/* Work Types */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">Allowed Work Modes:</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Remote', 'Hybrid', 'On-site'] as WorkType[]).map((type) => {
                  const active = criteria.workTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleWorkType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        active
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {active && '✓ '}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Levels */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">Allowed Seniority Levels:</label>
              <div className="flex flex-wrap gap-2">
                {(['Entry', 'Mid', 'Senior', 'Lead'] as ExperienceLevel[]).map((lvl) => {
                  const active = criteria.experienceLevels.includes(lvl);
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => toggleExpLevel(lvl)}
                      className={`py-1.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                        active
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {active && '✓ '}
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Auto-Apply Automation Mode & Daily Cap */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Autonomous Mode & Rate Limits</span>
            </h3>

            {/* Mode selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => {
                  onUpdateCriteria({ ...criteria, autoApplyMode: 'autonomous' });
                  triggerSaveAlert();
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  criteria.autoApplyMode === 'autonomous'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs text-emerald-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autonomous Auto-Apply</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tailors cover letters, answers screening questions, and submits directly without blocking.
                </p>
              </div>

              <div
                onClick={() => {
                  onUpdateCriteria({ ...criteria, autoApplyMode: 'approval' });
                  triggerSaveAlert();
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  criteria.autoApplyMode === 'approval'
                    ? 'bg-sky-500/10 border-sky-500/40 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs text-sky-400 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>1-Click Approval</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Generates the complete application package and waits for you to review and confirm.
                </p>
              </div>
            </div>

            {/* Daily limit slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-400">Daily Application Quota Cap:</span>
                <span className="font-bold text-slate-200">{criteria.dailyApplicationCap} applications/day</span>
              </div>
              <input
                type="range"
                min={3}
                max={35}
                step={1}
                value={criteria.dailyApplicationCap}
                onChange={(e) => {
                  onUpdateCriteria({ ...criteria, dailyApplicationCap: parseInt(e.target.value) });
                  triggerSaveAlert();
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">
                Pacing safeguard to keep your profile in top standing across recruiting algorithms.
              </span>
            </div>

            {/* Cover Letter Tone */}
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Cover Letter Style:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'impactful', label: 'Impact-Driven' },
                  { id: 'concise', label: 'Concise & Direct' },
                  { id: 'conversational', label: 'Conversational' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      onUpdateCriteria({ ...criteria, coverLetterTone: t.id as any });
                      triggerSaveAlert();
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      criteria.coverLetterTone === t.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Exclusions & Blacklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Safety Exclusions & Keyword Blacklist</span>
            </h3>

            {/* Blacklisted companies */}
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Excluded Companies:</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {criteria.blacklistedCompanies.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-rose-950/40 text-rose-300 border border-rose-800/60"
                  >
                    <span>{c}</span>
                    <button type="button" onClick={() => handleRemoveBlacklistCompany(c)}>
                      <X className="w-3 h-3 text-rose-400" />
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddBlacklistCompany} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Block company (e.g. Acme Corp)..."
                  value={newBlacklistCompany}
                  onChange={(e) => setNewBlacklistCompany(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                >
                  Block
                </button>
              </form>
            </div>

            {/* Blacklisted keywords */}
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Excluded Keywords in Description:</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {criteria.blacklistedKeywords.map((k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-950/40 text-amber-300 border border-amber-800/60"
                  >
                    <span>{k}</span>
                    <button type="button" onClick={() => handleRemoveBlacklistKeyword(k)}>
                      <X className="w-3 h-3 text-amber-400" />
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddBlacklistKeyword} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Block keyword (e.g. clearance, unpaid, overtime)..."
                  value={newBlacklistKeyword}
                  onChange={(e) => setNewBlacklistKeyword(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
                >
                  Exclude
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
