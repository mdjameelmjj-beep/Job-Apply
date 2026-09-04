import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Plus, 
  X, 
  Check, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { ResumeProfile } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleData';

interface ResumeProfileEditorProps {
  profile: ResumeProfile;
  onUpdateProfile: (profile: ResumeProfile) => void;
  onParseResumeWithGemini: (text: string) => Promise<void>;
  isParsing: boolean;
}

export const ResumeProfileEditor: React.FC<ResumeProfileEditorProps> = ({
  profile,
  onUpdateProfile,
  onParseResumeWithGemini,
  isParsing,
}) => {
  const [pasteText, setPasteText] = useState(profile.rawResumeText || '');
  const [newSkill, setNewSkill] = useState('');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [parseSuccessMsg, setParseSuccessMsg] = useState('');

  const handleSelectPreset = (presetId: string) => {
    const found = SAMPLE_PROFILES.find((p) => p.id === presetId);
    if (found) {
      onUpdateProfile(found.profile);
      setPasteText(found.profile.rawResumeText || '');
      setParseSuccessMsg(`Loaded preset: ${found.name}`);
      setTimeout(() => setParseSuccessMsg(''), 3000);
    }
  };

  const handleParseClick = async () => {
    if (!pasteText.trim()) return;
    try {
      await onParseResumeWithGemini(pasteText);
      setParseSuccessMsg('Resume parsed successfully with Gemini AI!');
      setTimeout(() => setParseSuccessMsg(''), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPasteText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || profile.skills.includes(newSkill.trim())) return;
    onUpdateProfile({
      ...profile,
      skills: [...profile.skills, newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleAddTargetRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTargetRole.trim() || (profile.targetRoles || []).includes(newTargetRole.trim())) return;
    onUpdateProfile({
      ...profile,
      targetRoles: [...(profile.targetRoles || []), newTargetRole.trim()],
    });
    setNewTargetRole('');
  };

  const handleRemoveTargetRole = (roleToRemove: string) => {
    onUpdateProfile({
      ...profile,
      targetRoles: (profile.targetRoles || []).filter((r) => r !== roleToRemove),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Preset Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Resume & Candidate Profile
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              The AI ground-truth for evaluating job criteria, writing personalized cover letters, and answering screening questions.
            </p>
          </div>

          {/* Quick Preset Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Load Preset Profile:</span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_PROFILES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    profile.fullName === preset.profile.fullName
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {parseSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{parseSuccessMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Raw Resume Text & AI Parser (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>AI Resume Parsing</span>
              </h3>
              
              <label className="cursor-pointer text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .txt/.doc</span>
                <input
                  type="file"
                  accept=".txt,.md,.rtf,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Paste or modify your raw resume text below. Clicking <strong>Parse with Gemini AI</strong> will intelligently extract your skills, years of experience, and role achievements.
            </p>

            <textarea
              id="input-resume-raw-text"
              rows={16}
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste your resume text here (experience, summary, skills, education)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />

            <button
              id="btn-parse-resume"
              onClick={handleParseClick}
              disabled={isParsing || !pasteText.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isParsing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing Profile with Gemini 3.8 Flash...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Parse with Gemini AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Structured Extracted Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-4 h-4 text-sky-400" />
              <span>Extracted Candidate Identity</span>
            </h3>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => onUpdateProfile({ ...profile, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Target Professional Title</label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => onUpdateProfile({ ...profile, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => onUpdateProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => onUpdateProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Location & Availability</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => onUpdateProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  max="35"
                  value={profile.yearsExperience}
                  onChange={(e) => onUpdateProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1">Executive Summary</label>
              <textarea
                rows={3}
                value={profile.summary}
                onChange={(e) => onUpdateProfile({ ...profile, summary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 leading-relaxed"
              />
            </div>

            {/* Skills Pills */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-slate-400 text-xs font-medium">
                  Core Skills & Technologies ({profile.skills.length})
                </label>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add another skill (e.g. GraphQL, AWS, Figma)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Target Roles */}
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-2">
                Target Roles Extracted
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(profile.targetRoles || []).map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/60"
                  >
                    <span>{role}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTargetRole(role)}
                      className="text-emerald-400 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddTargetRole} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add target role title..."
                  value={newTargetRole}
                  onChange={(e) => setNewTargetRole(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Education */}
            <div>
              <label className="block text-slate-400 text-xs font-medium mb-1">Education</label>
              <input
                type="text"
                value={profile.education}
                onChange={(e) => onUpdateProfile({ ...profile, education: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
