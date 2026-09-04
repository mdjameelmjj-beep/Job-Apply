import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  MapPin, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { JobPosting, JobCriteria, ResumeProfile } from '../types';

interface ApplicationModalProps {
  job: JobPosting | null;
  onClose: () => void;
  onApply: (job: JobPosting) => Promise<void>;
  criteria: JobCriteria;
  isSubmitting: boolean;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  job,
  onClose,
  onApply,
  criteria,
  isSubmitting,
}) => {
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [activeTab, setActiveTab] = useState<'submission' | 'job_desc' | 'match_report'>('submission');

  if (!job) return null;

  const hasApplied = job.status === 'applied' && job.submission;
  const evaluation = job.evaluation;

  const handleCopyCoverLetter = () => {
    if (job.submission?.tailoredCoverLetter) {
      navigator.clipboard.writeText(job.submission.tailoredCoverLetter);
      setCopiedLetter(true);
      setTimeout(() => setCopiedLetter(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              hasApplied
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              {hasApplied ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{job.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded font-mono border ${
                  job.atsPlatform === 'Naukri'
                    ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                    : job.atsPlatform === 'Indeed'
                    ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {job.atsPlatform} {job.atsPlatform === 'Naukri' || job.atsPlatform === 'Indeed' ? 'Portal' : 'ATS'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {job.company} • {job.location} ({job.workType}) • ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} / yr
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/50 text-xs">
          {hasApplied && (
            <button
              onClick={() => setActiveTab('submission')}
              className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'submission'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmitted Application Packet</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('match_report')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'match_report' || (!hasApplied && activeTab === 'submission')
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Match & Criteria Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('job_desc')}
            className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'job_desc'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Job Description & Requirements</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB: Application Packet (when applied) */}
          {(activeTab === 'submission' && hasApplied) && (
            <div className="space-y-6">
              
              {/* Submission Receipt Banner */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Application Successfully Verified & Transmitted</span>
                  </div>
                  <div className="text-slate-400 text-xs">
                    Confirmation Number:{' '}
                    <span className="text-emerald-300 font-mono font-bold">
                      {job.submission?.submissionId}
                    </span>{' '}
                    via {job.submission?.atsPlatform}
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-500 font-mono">
                  Applied: {job.submission?.timestamp ? new Date(job.submission.timestamp).toLocaleString() : 'Just now'}
                </div>
              </div>

              {/* Tailored Cover Letter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-sky-400" />
                    <span>Tailored Cover Letter for {job.company}</span>
                  </h4>
                  <button
                    onClick={handleCopyCoverLetter}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    {copiedLetter ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLetter ? 'Copied!' : 'Copy Letter'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 whitespace-pre-wrap leading-relaxed font-sans select-text border-l-2 border-l-sky-500">
                  {job.submission?.tailoredCoverLetter}
                </div>
              </div>

              {/* Screened Answers */}
              {job.submission?.screeningAnswers && job.submission.screeningAnswers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Submitted Employer Screening Responses</span>
                  </h4>

                  <div className="space-y-2.5">
                    {job.submission.screeningAnswers.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5"
                      >
                        <div className="text-slate-400 font-medium text-[11px]">
                          Q{idx + 1}: {item.question}
                        </div>
                        <div className="text-slate-200 font-normal leading-relaxed pl-2 border-l border-emerald-500/50">
                          {item.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlight Highlights */}
              {job.submission?.tailoredHighlights && job.submission.tailoredHighlights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-200 text-xs">
                    Pinned Candidate Strengths Transmitted:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    {job.submission.tailoredHighlights.map((hl, i) => (
                      <li key={i}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB: Match & Criteria Audit */}
          {(activeTab === 'match_report' || (!hasApplied && activeTab === 'submission')) && (
            <div className="space-y-5">
              {evaluation ? (
                <>
                  {/* Score & Verdict Banner */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                      <div className="text-slate-400 text-xs">Overall Fit Score</div>
                      <div className={`text-3xl font-extrabold font-mono mt-1 ${
                        evaluation.matchScore >= criteria.minMatchScore
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}>
                        {evaluation.matchScore}%
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Threshold: {criteria.minMatchScore}%
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                      <div className="text-slate-400 text-xs">Criteria Verdict</div>
                      <div className={`text-xl font-bold font-mono mt-2 ${
                        evaluation.meetsCriteria ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {evaluation.meetsCriteria ? 'PASSED ALL' : 'PARTIAL / FAILED'}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Recommendation: {evaluation.recommendation}
                      </div>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                      <div className="text-slate-400 text-xs">Target Compensation</div>
                      <div className="text-xl font-bold text-slate-200 mt-2 font-mono">
                        ${job.salaryMin.toLocaleString()}+
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Floor: ${criteria.minSalary.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Criteria Checklist Breakdown */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
                    <h4 className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                      <span>Criteria Compliance Breakdown</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Title Match</div>
                        <div className={`font-bold ${evaluation.criteriaMatches.title ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {evaluation.criteriaMatches.title ? '✓ Pass' : '✗ Miss'}
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Salary Floor</div>
                        <div className={`font-bold ${evaluation.criteriaMatches.salary ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {evaluation.criteriaMatches.salary ? '✓ Pass' : '✗ Below'}
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Work Mode</div>
                        <div className={`font-bold ${evaluation.criteriaMatches.location ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {evaluation.criteriaMatches.location ? '✓ Pass' : '✗ Miss'}
                        </div>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">Seniority</div>
                        <div className={`font-bold ${evaluation.criteriaMatches.experience ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {evaluation.criteriaMatches.experience ? '✓ Pass' : '✗ Miss'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5">
                    <span className="text-slate-400 font-semibold text-xs">AI Screener Evaluation Reasoning:</span>
                    <p className="text-slate-300 leading-relaxed">{evaluation.reasoning}</p>
                  </div>

                  {/* Strengths & Gaps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                      <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Key Alignment Strengths</span>
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                        {evaluation.keyStrengths.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                      <span className="text-amber-400 font-semibold text-xs flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Identified Gaps / Nuances</span>
                      </span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                        {evaluation.skillGaps.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 bg-slate-950 rounded-xl border border-slate-800">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-500" />
                  <p className="text-slate-400">This opening has not been evaluated against your resume yet.</p>
                  <button
                    onClick={() => onApply(job)}
                    className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow"
                  >
                    Evaluate & Auto-Apply Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: Job Description */}
          {activeTab === 'job_desc' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-slate-200 text-xs mb-2">About the Role</h4>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-200 text-xs mb-2">Qualifications & Requirements</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-200 text-xs mb-2">
                    Employer Screening Questions Required
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                    {job.screeningQuestions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
          >
            Close
          </button>

          {!hasApplied && (
            <button
              onClick={() => onApply(job)}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>{isSubmitting ? 'Tailoring & Submitting...' : 'Auto-Apply to this Job'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
