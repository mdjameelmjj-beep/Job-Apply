import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Download, 
  Eye, 
  ExternalLink, 
  Calendar, 
  Building, 
  Sparkles, 
  FileSpreadsheet,
  Clock,
  Phone,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Award,
  ArrowRight
} from 'lucide-react';
import { JobPosting } from '../types';

interface ApplicationsHistoryProps {
  jobs: JobPosting[];
  onOpenDetails: (job: JobPosting) => void;
}

interface ApplicationNote {
  [jobId: string]: string;
}

interface ApplicationStageOverride {
  [jobId: string]: 'Submitted' | 'Recruiter Screen' | 'Technical Round' | 'Offer' | 'Archived';
}

export const ApplicationsHistory: React.FC<ApplicationsHistoryProps> = ({
  jobs,
  onOpenDetails,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedNotesJobId, setExpandedNotesJobId] = useState<string | null>(null);
  const [jobNotes, setJobNotes] = useState<ApplicationNote>({});
  const [stageOverrides, setStageOverrides] = useState<ApplicationStageOverride>({});

  const appliedJobs = jobs.filter((j) => j.status === 'applied' && j.submission);

  const getJobStage = (job: JobPosting): string => {
    return stageOverrides[job.id] || job.submission?.status || 'Submitted';
  };

  const handleUpdateStage = (jobId: string, newStage: 'Submitted' | 'Recruiter Screen' | 'Technical Round' | 'Offer' | 'Archived') => {
    setStageOverrides((prev) => ({
      ...prev,
      [jobId]: newStage,
    }));
  };

  const handleUpdateNote = (jobId: string, note: string) => {
    setJobNotes((prev) => ({
      ...prev,
      [jobId]: note,
    }));
  };

  const filtered = appliedJobs.filter((j) => {
    const currentStage = getJobStage(j);
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      (j.submission?.submissionId || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || currentStage.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    if (appliedJobs.length === 0) return;
    const headers = [
      'Submission ID',
      'Company',
      'Title',
      'Location',
      'Work Type',
      'Salary Range',
      'ATS Platform',
      'Date Applied',
      'Current Stage',
      'Match Score',
      'Candidate Notes'
    ];
    const rows = appliedJobs.map((j) => [
      j.submission?.submissionId || '',
      `"${j.company}"`,
      `"${j.title}"`,
      `"${j.location}"`,
      j.workType,
      `"$${j.salaryMin} - $${j.salaryMax}"`,
      j.atsPlatform,
      j.submission?.timestamp || '',
      `"${getJobStage(j)}"`,
      j.evaluation?.matchScore ? `${j.evaluation.matchScore}%` : 'N/A',
      `"${(jobNotes[j.id] || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mohammed_Jameel_Job_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = () => {
    if (appliedJobs.length === 0) return;
    const exportData = appliedJobs.map((j) => ({
      ...j,
      currentStage: getJobStage(j),
      recruiterNotes: jobNotes[j.id] || '',
    }));
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Mohammed_Jameel_Job_Applications_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyCoverLetter = (job: JobPosting) => {
    const text = job.submission?.tailoredCoverLetter || '';
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const avgScore = appliedJobs.length > 0
    ? Math.round(appliedJobs.reduce((acc, j) => acc + (j.evaluation?.matchScore || 85), 0) / appliedJobs.length)
    : 0;

  const interviewCount = appliedJobs.filter(
    (j) => getJobStage(j) === 'Recruiter Screen' || getJobStage(j) === 'Technical Round' || getJobStage(j) === 'Offer'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Executive Application Log & Interview Tracker
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Audit trail of every submitted package, tailored cover letter, ATS confirmation receipt, and interview status.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              disabled={appliedJobs.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 transition-colors shadow-sm"
              title="Download applications spreadsheet for personal records"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={exportJSON}
              disabled={appliedJobs.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 transition-colors shadow-sm"
              title="Backup complete telemetry data"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Submitted Positions</span>
            <span className="text-xl font-bold text-emerald-400 font-mono mt-0.5 block">
              {appliedJobs.length}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Interview Pipeline</span>
            <span className="text-xl font-bold text-indigo-400 font-mono mt-0.5 block">
              {interviewCount} Active
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Average Match Score</span>
            <span className="text-xl font-bold text-sky-400 font-mono mt-0.5 block">
              {avgScore}%
            </span>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[11px]">Active Portals</span>
            <span className="text-xs font-bold text-slate-200 font-mono mt-1 block truncate">
              Naukri, Indeed, Greenhouse, Lever
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by role, company, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 hidden sm:inline">Stage:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
            >
              <option value="all">All Stages ({appliedJobs.length})</option>
              <option value="submitted">Submitted / Awaiting Review</option>
              <option value="recruiter screen">Recruiter Screen Scheduled</option>
              <option value="technical round">Technical / Leadership Round</option>
              <option value="offer">Offer Received</option>
              <option value="archived">Archived / Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-3 opacity-30 text-emerald-400" />
            <h3 className="text-base font-semibold text-white mb-1">
              {appliedJobs.length === 0 ? 'No applications submitted yet' : 'No matching applications found'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {appliedJobs.length === 0
                ? 'When the Auto-Apply bot runs or you click Auto-Apply on a job card, your submitted application packages will appear here.'
                : 'Try adjusting your search or stage filters.'}
            </p>
          </div>
        ) : (
          filtered.map((job) => {
            const currentStage = getJobStage(job);
            const isNotesOpen = expandedNotesJobId === job.id;
            const note = jobNotes[job.id] || '';

            return (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 transition-all shadow-sm"
              >
                {/* Top Row: Details & Stage Picker */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs text-slate-200 font-mono">{job.company}</span>
                      <span className="text-slate-600">•</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        job.atsPlatform === 'Naukri'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                          : job.atsPlatform === 'Indeed'
                          ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {job.atsPlatform}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                        ID: {job.submission?.submissionId}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400">
                        {job.submission?.timestamp ? new Date(job.submission.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today'}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenDetails(job)}
                      className="text-base font-bold text-white hover:text-emerald-400 cursor-pointer transition-colors"
                    >
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span>{job.location} ({job.workType})</span>
                      <span>•</span>
                      <span>${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
                      <span>•</span>
                      <span className="text-sky-400 font-mono font-medium">
                        Fit Score: {job.evaluation?.matchScore || 85}%
                      </span>
                    </div>
                  </div>

                  {/* Right: Stage Selector & Primary Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
                    {/* Interactive Stage Picker */}
                    <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Stage:</span>
                      <select
                        value={currentStage}
                        onChange={(e) => handleUpdateStage(job.id, e.target.value as any)}
                        className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer ${
                          currentStage === 'Offer'
                            ? 'text-amber-400'
                            : currentStage.includes('Round') || currentStage.includes('Screen')
                            ? 'text-indigo-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        <option value="Submitted" className="bg-slate-900 text-emerald-400">Submitted</option>
                        <option value="Recruiter Screen" className="bg-slate-900 text-indigo-400">Recruiter Screen</option>
                        <option value="Technical Round" className="bg-slate-900 text-sky-400">Technical Round</option>
                        <option value="Offer" className="bg-slate-900 text-amber-400">Offer Received</option>
                        <option value="Archived" className="bg-slate-900 text-slate-400">Archived</option>
                      </select>
                    </div>

                    {/* Copy Tailored Letter */}
                    <button
                      type="button"
                      onClick={() => handleCopyCoverLetter(job)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                        copiedId === job.id
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                      title="Copy submitted tailored cover letter to clipboard"
                    >
                      {copiedId === job.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Letter!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Letter</span>
                        </>
                      )}
                    </button>

                    {/* Inspect Packet Details */}
                    <button
                      onClick={() => onOpenDetails(job)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Packet</span>
                    </button>

                    {/* Notes Toggle */}
                    <button
                      onClick={() => setExpandedNotesJobId(isNotesOpen ? null : job.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1 transition-all ${
                        note || isNotesOpen
                          ? 'bg-indigo-950/40 text-indigo-300 border-indigo-800/60'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      title="Add recruiter contact, interview dates, or follow-up notes"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{note ? 'Notes •' : 'Notes'}</span>
                      {isNotesOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Notes & Recruiter Contact Log */}
                {isNotesOpen && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Recruiter Contacts, Interview Schedule & Follow-up Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => handleUpdateNote(job.id, e.target.value)}
                      placeholder="e.g., Connected with Hiring Lead Priya on LinkedIn. Recruiter screen booked for Thursday 3:30 PM IST via Google Meet."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Notes are saved in your browser session and included in CSV exports.</span>
                      {note && <span className="text-emerald-400 font-medium">✓ Auto-saved</span>}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
