import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { ResumeProfile } from '../types';

interface FooterProps {
  profile: ResumeProfile;
  onNavigate: (tab: 'pipeline' | 'resume' | 'criteria' | 'jobs' | 'applied' | 'import') => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20">
                EA
              </div>
              <span className="font-bold text-white text-base tracking-tight">ExecApply AI</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                Executive Career Copilot
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Autonomous job search and intelligent application platform configured for <strong>{profile.fullName}</strong>. Evaluates roles across Naukri, Indeed, Greenhouse, and Ashby with resume-grounded precision and human-in-the-loop governance.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <a 
                href={`mailto:${profile.email}`} 
                className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.email}</span>
              </a>
              <a 
                href={`tel:${profile.phone}`} 
                className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.phone}</span>
              </a>
              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Chennai, India / UAE / Remote</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5">
              <li>
                <button 
                  onClick={() => onNavigate('jobs')} 
                  className="hover:text-white transition-colors"
                >
                  Live Opportunities & Search
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('import')} 
                  className="hover:text-white text-blue-400 font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>Portal Import & Agent Group</span>
                  <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded border border-blue-500/30">Auto</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pipeline')} 
                  className="hover:text-white transition-colors"
                >
                  Auto-Apply Pipeline & Agent
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('applied')} 
                  className="hover:text-white transition-colors"
                >
                  Applications Tracker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('resume')} 
                  className="hover:text-white transition-colors"
                >
                  Executive Dossier & CV
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('criteria')} 
                  className="hover:text-white transition-colors"
                >
                  Compensation & Targeting Rules
                </button>
              </li>
            </ul>
          </div>

          {/* Research & Verified Governance */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">Candidate Dossier</h4>
            <p className="text-slate-400 text-xs">
              MSc Data Science & Analytics (UK), 12+ years analytics leadership across Americana Group ($3B FP&A) and Anderson Diagnostics.
            </p>
            <div className="pt-2">
              <a
                href="https://1in8billion.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/40 text-xs transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Portfolio (1in8billion.net)</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Autonomous Career Engine • Strictly Grounded in Verified Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Configured for Mohammed Jameel</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Powered by Gemini 3.8 Flash <Sparkles className="w-3 h-3 text-emerald-400" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
