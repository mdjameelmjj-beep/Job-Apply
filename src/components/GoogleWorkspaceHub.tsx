import React, { useState, useEffect } from 'react';
import { 
  FolderDown, 
  Mail, 
  Send, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  LogOut, 
  FileText, 
  Search,
  Upload,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken 
} from '../services/googleAuth';
import { 
  listDriveFiles, 
  uploadFileToDrive, 
  deleteDriveFile, 
  searchJobEmailsInGmail, 
  sendEmailViaGmail,
  DriveFileItem,
  GmailMessageSummary
} from '../services/workspaceService';
import { User } from 'firebase/auth';
import { ResumeProfile, JobPosting } from '../types';

interface GoogleWorkspaceHubProps {
  resume: ResumeProfile;
  appliedJobs: JobPosting[];
}

export const GoogleWorkspaceHub: React.FC<GoogleWorkspaceHubProps> = ({
  resume,
  appliedJobs
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active sub-tab: 'drive' | 'gmail'
  const [workspaceTab, setWorkspaceTab] = useState<'drive' | 'gmail'>('drive');

  // Drive state
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Gmail state
  const [gmailMessages, setGmailMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingGmail, setIsLoadingGmail] = useState(false);
  const [gmailSearchQuery, setGmailSearchQuery] = useState(
    'subject:(application OR interview OR offer OR candidate OR Workday OR Greenhouse OR Naukri OR Indeed)'
  );

  // Follow-up email compose modal
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState<string | null>(null);

  // Explicit confirmation modal state for destructive operations (per guideline)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionLabel: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // Initialize listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, accessToken) => {
        setUser(authedUser);
        setToken(accessToken);
        setAuthError(null);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Drive or Gmail data when token is available or tab changes
  useEffect(() => {
    if (token) {
      if (workspaceTab === 'drive') {
        fetchDriveFiles();
      } else {
        fetchGmailMessages();
      }
    }
  }, [token, workspaceTab]);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in failure:', err);
      setAuthError(err.message || 'Google Sign-In was cancelled or failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setUser(null);
    setToken(null);
    setDriveFiles([]);
    setGmailMessages([]);
  };

  const fetchDriveFiles = async () => {
    if (!token) return;
    setIsLoadingDrive(true);
    try {
      const files = await listDriveFiles(token);
      setDriveFiles(files);
    } catch (err: any) {
      console.error('Failed to list drive files:', err);
      if (err.message?.includes('401') || err.message?.includes('Invalid Credentials')) {
        setToken(null);
      }
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const fetchGmailMessages = async () => {
    if (!token) return;
    setIsLoadingGmail(true);
    try {
      const messages = await searchJobEmailsInGmail(token, gmailSearchQuery);
      setGmailMessages(messages);
    } catch (err: any) {
      console.error('Failed to search Gmail:', err);
      if (err.message?.includes('401') || err.message?.includes('Invalid Credentials')) {
        setToken(null);
      }
    } finally {
      setIsLoadingGmail(false);
    }
  };

  // Upload Master CV to Drive
  const handleUploadMasterCV = async () => {
    if (!token) return;
    setIsUploading(true);
    setUploadSuccess(null);
    try {
      const filename = `Mohammed_Jameel_Master_CV_${new Date().toISOString().split('T')[0]}.txt`;
      const content = `=====================================================
MOHAMMED JAMEEL - MASTER EXECUTIVE CV & DOSSIER
Contact: ${resume.email} | ${resume.phone} | ${resume.location}
Portfolio: 1in8billion.net | LinkedIn: linkedin.com/in/mohammed-jameel-2883b211a
=====================================================

TARGET TITLE: ${resume.title}
YEARS OF EXPERIENCE: ${resume.yearsExperience}+ Years

EXECUTIVE SUMMARY:
${resume.summary}

CORE COMPETENCIES & KEYWORDS:
${resume.skills.join(' • ')}

REPRESENTATIVE EXPERIENCE:
${resume.experience.map(e => `
Role: ${e.role} | ${e.company} (${e.period})
${e.highlights.map(h => ` - ${h}`).join('\n')}`).join('\n\n')}

TRANSFERRED VIA EXECAPPLY AUTONOMOUS SYSTEM
Date: ${new Date().toLocaleString()}
`;
      await uploadFileToDrive(token, filename, content, 'text/plain');
      setUploadSuccess(`Uploaded "${filename}" to your Google Drive successfully!`);
      setTimeout(() => setUploadSuccess(null), 5000);
      await fetchDriveFiles();
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Upload Full Applied Job Packet to Drive
  const handleUploadJobPacket = async (job: JobPosting) => {
    if (!token) return;
    setIsUploading(true);
    try {
      const filename = `Application_Packet_${job.company.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
      const submission = job.submission;
      const content = `=====================================================
EXECAPPLY TRANSMITTED APPLICATION PACKET
Company: ${job.company}
Position: ${job.title}
Submission ID: ${submission?.submissionId || 'N/A'}
Date Transmitted: ${submission?.timestamp || job.postedDate}
Gateway: ${job.atsPlatform}
Applicant: Mohammed Jameel (${resume.email})
=====================================================

TAILORED COVER LETTER:
${submission?.tailoredCoverLetter || 'Direct ATS Profile Match'}

SCREENING QUESTIONS & RESPONSES:
${(submission?.screeningAnswers || []).map((q, idx) => `
Q${idx + 1}: ${q.question}
A${idx + 1}: ${q.answer}
`).join('\n')}

ALIGNMENT HIGHLIGHTS:
${(submission?.tailoredHighlights || []).map(h => ` • ${h}`).join('\n')}
`;
      await uploadFileToDrive(token, filename, content, 'text/plain');
      setUploadSuccess(`Saved "${filename}" to Google Drive!`);
      setTimeout(() => setUploadSuccess(null), 5000);
      await fetchDriveFiles();
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Delete Drive file with MANDATORY user confirmation dialog
  const promptDeleteDriveFile = (file: DriveFileItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete File from Google Drive?',
      message: `Are you sure you want to permanently delete "${file.name}" from your Google Drive? This action cannot be undone.`,
      actionLabel: 'Delete File',
      onConfirm: async () => {
        if (!token) return;
        try {
          await deleteDriveFile(token, file.id);
          setConfirmDialog(null);
          await fetchDriveFiles();
        } catch (err: any) {
          alert(`Delete failed: ${err.message}`);
        }
      },
    });
  };

  // Send recruiter email with MANDATORY user confirmation dialog
  const promptSendEmail = () => {
    if (!composeTo || !composeSubject || !composeBody) {
      alert('Please fill out Recipient Email, Subject, and Message Body.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Send Email via Gmail?',
      message: `You are about to send an email to "${composeTo}" with subject "${composeSubject}". Do you confirm this action?`,
      actionLabel: 'Send via Gmail',
      onConfirm: async () => {
        if (!token) return;
        setIsSendingEmail(true);
        try {
          await sendEmailViaGmail(token, composeTo, composeSubject, composeBody);
          setConfirmDialog(null);
          setShowComposeModal(false);
          setComposeTo('');
          setComposeSubject('');
          setComposeBody('');
          setEmailSuccessMsg('Email dispatched successfully through your connected Gmail account!');
          setTimeout(() => setEmailSuccessMsg(null), 5000);
          await fetchGmailMessages();
        } catch (err: any) {
          alert(`Failed to send email: ${err.message}`);
        } finally {
          setIsSendingEmail(false);
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-tr from-blue-500/20 to-red-500/20 rounded-xl border border-slate-700/60 text-white">
              <div className="flex items-center gap-1.5">
                <FolderDown className="w-5 h-5 text-blue-400" />
                <Mail className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Google Workspace Integration
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Drive & Gmail
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Seamlessly sync and backup your tailored application packets to <strong>Google Drive</strong> and monitor incoming recruiter confirmations, interview invites, and status updates directly from <strong>Gmail</strong>.
              </p>
            </div>
          </div>

          {/* User Auth Status or Sign In Button */}
          <div className="flex items-center gap-3">
            {user && token ? (
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-200">
                    {user.displayName || user.email}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-end gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Connected to Google
                  </div>
                </div>
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="User" 
                    className="w-8 h-8 rounded-full border border-slate-700" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                    {user.email?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={handleSignOut}
                  title="Disconnect Google Account"
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Official-style Sign in with Google Button as mandated by Workspace Skill */
              <button
                onClick={handleSignIn}
                disabled={isAuthenticating}
                id="btn-google-workspace-signin"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md active:scale-95 border border-slate-300"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-700" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {authError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {uploadSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {emailSuccessMsg && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{emailSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Tabs: Google Drive vs. Gmail */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWorkspaceTab('drive')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              workspaceTab === 'drive'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <FolderDown className="w-4 h-4" />
            <span>Google Drive Storage</span>
            {driveFiles.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px]">
                {driveFiles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setWorkspaceTab('gmail')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              workspaceTab === 'gmail'
                ? 'bg-red-600/20 text-red-400 border border-red-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Gmail Tracker & Outreach</span>
            {gmailMessages.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/30 text-red-200 text-[10px]">
                {gmailMessages.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab-Specific Action Buttons */}
        {user && token && (
          <div className="flex items-center gap-2">
            {workspaceTab === 'drive' ? (
              <>
                <button
                  onClick={fetchDriveFiles}
                  disabled={isLoadingDrive}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingDrive ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleUploadMasterCV}
                  disabled={isUploading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Uploading...' : 'Backup Master CV to Drive'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={fetchGmailMessages}
                  disabled={isLoadingGmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingGmail ? 'animate-spin' : ''}`} />
                  <span>Scan Inbox</span>
                </button>
                <button
                  onClick={() => setShowComposeModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Compose Outreach</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Unauthenticated State Prompt */}
      {(!user || !token) && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <div className="inline-flex p-3 bg-slate-800 rounded-2xl text-slate-400">
            <LogIn className="w-8 h-8 text-sky-400" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-base font-bold text-white">Sign In Required to Access Workspace</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect your Google Account to authorize Google Drive and Gmail. You will be able to store your tailored application packets, download dossiers directly, and monitor interview invitations.
            </p>
          </div>
          <div>
            <button
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-md active:scale-95 border border-slate-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span>Connect Google Drive & Gmail</span>
            </button>
          </div>
        </div>
      )}

      {/* Authenticated Content */}
      {user && token && (
        <>
          {/* TAB 1: GOOGLE DRIVE */}
          {workspaceTab === 'drive' && (
            <div className="space-y-6">
              {/* Quick Action: Export Applied Job Packets */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Quick Backup: Transmitted Application Packets</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Click any application to upload its customized dossier to Drive
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {appliedJobs.slice(0, 6).map((job) => (
                    <div 
                      key={job.id}
                      className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-200 truncate">{job.company}</div>
                        <div className="text-[11px] text-slate-400 truncate">{job.title}</div>
                      </div>
                      <button
                        onClick={() => handleUploadJobPacket(job)}
                        disabled={isUploading}
                        title="Upload packet to Drive"
                        className="px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Backup</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files in Google Drive */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderDown className="w-4 h-4 text-blue-400" />
                    <span>Files in Your ExecApply Drive Storage</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    {driveFiles.length} file{driveFiles.length === 1 ? '' : 's'} found
                  </span>
                </div>

                {isLoadingDrive ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                    <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
                    <span>Loading files from Google Drive...</span>
                  </div>
                ) : driveFiles.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <FolderDown className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs">No files found in your app Drive folder yet.</p>
                    <p className="text-[11px] text-slate-500">
                      Use the "Backup Master CV" button or export an applied job packet to get started.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-3 font-semibold">File Name</th>
                          <th className="pb-3 font-semibold">Type</th>
                          <th className="pb-3 font-semibold">Last Modified</th>
                          <th className="pb-3 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {driveFiles.map((file) => (
                          <tr key={file.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 pr-4 font-medium text-slate-200 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                              <span className="truncate max-w-xs">{file.name}</span>
                            </td>
                            <td className="py-3 text-slate-400 font-mono text-[11px]">
                              {file.mimeType.split('/').pop()}
                            </td>
                            <td className="py-3 text-slate-400">
                              {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {file.webViewLink && (
                                  <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                                    title="Open in Google Drive"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                <button
                                  onClick={() => promptDeleteDriveFile(file)}
                                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                                  title="Delete from Google Drive (prompts confirmation)"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: GMAIL TRACKER */}
          {workspaceTab === 'gmail' && (
            <div className="space-y-6">
              {/* Search filter */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={gmailSearchQuery}
                    onChange={(e) => setGmailSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchGmailMessages()}
                    placeholder="Search query in your Gmail..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
                <button
                  onClick={fetchGmailMessages}
                  disabled={isLoadingGmail}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors shrink-0"
                >
                  {isLoadingGmail ? 'Searching...' : 'Filter Gmail'}
                </button>
              </div>

              {/* Messages List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span>Application Receipts & Recruiter Correspondence</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Showing latest {gmailMessages.length} emails
                  </span>
                </div>

                {isLoadingGmail ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
                    <RefreshCw className="w-5 h-5 animate-spin text-red-400" />
                    <span>Scanning your Gmail messages...</span>
                  </div>
                ) : gmailMessages.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs">No matching emails found for this search filter.</p>
                    <p className="text-[11px] text-slate-500">
                      Try broadening your search query or check if confirmations were sent to another inbox.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gmailMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors space-y-2"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                              <span>{msg.subject}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              From: <span className="text-slate-300 font-medium">{msg.from}</span>
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 whitespace-nowrap">
                            {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 line-clamp-2">
                          {msg.snippet}
                        </p>
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => {
                              setComposeTo(msg.from.match(/<([^>]+)>/)?.[1] || msg.from);
                              setComposeSubject(`Re: ${msg.subject}`);
                              setComposeBody(`Dear Hiring Team,\n\nThank you for reaching out regarding my application.\n\nBest regards,\nMohammed Jameel\n${resume.phone}`);
                              setShowComposeModal(true);
                            }}
                            className="text-[11px] text-red-400 hover:text-red-300 font-medium flex items-center gap-1 px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
                          >
                            <Send className="w-3 h-3" />
                            <span>Reply via Gmail</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Compose Follow-Up Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-red-400" />
                <span>Compose Outreach via Gmail</span>
              </h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">To (Recruiter / Hiring Manager)</label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  placeholder="recruiter@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Application Follow-up - Mohammed Jameel - AGI Director"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Message Body</label>
                <textarea
                  rows={6}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-red-500 leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={promptSendEmail}
                disabled={isSendingEmail}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Review & Confirm Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explicit User Confirmation Dialog (MANDATORY per Workspace guidelines) */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">{confirmDialog.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors"
              >
                {confirmDialog.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
