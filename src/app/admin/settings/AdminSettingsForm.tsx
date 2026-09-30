"use client";

import { useState, useTransition } from "react";
import {
  updatePlatformSettingsAction,
  testDriveFolderAction,
} from "@/actions/admin";
import {
  Ticket,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Shield,
  Mail,
  Coins,
  HardDrive,
  FolderOpen,
  ExternalLink,
  RefreshCw,
  CloudUpload,
} from "lucide-react";

interface AdminSettingsFormProps {
  initialSettings: {
    freeTrialLessonCount: number;
    googleDriveFolderLink: string;
  };
}

export function AdminSettingsForm({ initialSettings }: AdminSettingsFormProps) {
  const [trialCount, setTrialCount] = useState<number>(
    initialSettings.freeTrialLessonCount,
  );
  const [contactEmail, setContactEmail] = useState(
    "admissions@gandharvaschoolofmusic.com",
  );
  const [currency, setCurrency] = useState("INR (₹)");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Google Drive state
  const [driveFolderLink, setDriveFolderLink] = useState(
    initialSettings.googleDriveFolderLink,
  );
  const [driveTestResult, setDriveTestResult] = useState<{
    status: "idle" | "testing" | "success" | "error";
    folderName?: string;
    warning?: string;
    error?: string;
  }>({ status: initialSettings.googleDriveFolderLink ? "success" : "idle" });
  const [isTesting, setIsTesting] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleTestDriveFolder = async () => {
    if (!driveFolderLink.trim()) {
      setDriveTestResult({
        status: "error",
        error: "Please enter a Google Drive folder link.",
      });
      return;
    }

    setIsTesting(true);
    setDriveTestResult({ status: "testing" });

    try {
      const result = await testDriveFolderAction(driveFolderLink.trim());

      if (result.success && result.data) {
        setDriveTestResult({
          status: "success",
          folderName: result.data.folderName,
          warning: result.data.warning,
        });
      } else {
        setDriveTestResult({
          status: "error",
          error: result.error || "Could not verify folder access.",
        });
      }
    } catch {
      setDriveTestResult({
        status: "error",
        error: "An unexpected error occurred while testing the folder.",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleQuickSaveDriveFolder = () => {
    setErrorMessage(null);
    setSuccessMessage(false);

    startTransition(async () => {
      const res = await updatePlatformSettingsAction({
        freeTrialLessonCount: trialCount,
        googleDriveFolderLink: driveFolderLink.trim() || null,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to update platform settings.");
      } else {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(false);

    startTransition(async () => {
      const res = await updatePlatformSettingsAction({
        freeTrialLessonCount: trialCount,
        googleDriveFolderLink: driveFolderLink.trim() || null,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to update platform settings.");
      } else {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Platform configuration saved and persisted successfully!</span>
        </div>
      )}

      {/* Trial Allocations Card */}
      <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-xs space-y-4">
        <div className="border-b border-primary/10 pb-3">
          <h2 className="font-serif text-base font-bold text-heading flex items-center gap-2">
            <Ticket className="w-4 h-4 text-accent-dark" />
            <span>Free Trial Policy</span>
          </h2>
          <p className="text-xs text-body mt-0.5">
            Configure global free trial lesson limits granted to newly registered student accounts.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-heading">
            Free Trial Lessons Granted per Student
          </label>
          <input
            type="number"
            min={0}
            max={10}
            required
            value={trialCount}
            onChange={(e) => setTrialCount(Number(e.target.value))}
            className="w-full sm:w-48 rounded-xl bg-white border border-primary/15 px-3.5 py-2 text-sm font-bold text-accent-dark font-numeric focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
          />
          <p className="text-[11px] text-body leading-relaxed">
            New students attempting their initial lesson booking will be granted this snapshot count. Existing student statuses are not retroactively modified.
          </p>
        </div>
      </div>

      {/* ─── Google Drive File Storage Card ─────────────────────────────── */}
      <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-xs space-y-5">
        <div className="border-b border-primary/10 pb-3">
          <h2 className="font-serif text-base font-bold text-heading flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" />
            <span>Google Drive File Storage</span>
          </h2>
          <p className="text-xs text-body mt-0.5">
            Configure the Google Drive folder used for messaging file uploads (PDF, DOC attachments).
          </p>
        </div>

        {/* How it works callout */}
        <div className="rounded-xl bg-primary/[0.03] border border-primary/10 p-4 space-y-2">
          <p className="text-[11px] font-bold text-heading flex items-center gap-1.5">
            <CloudUpload className="w-3.5 h-3.5 text-primary" />
            How File Storage Works
          </p>
          <ol className="text-[11px] text-body space-y-1 list-decimal list-inside leading-relaxed">
            <li>Create or select a Google Drive folder for file uploads</li>
            <li>
              Share the folder with the service account email as{" "}
              <span className="font-semibold text-heading">Editor</span>
            </li>
            <li>Paste the folder link below and test access</li>
            <li>All uploaded files will be stored in the specified folder</li>
          </ol>
        </div>

        {/* Folder Link Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-body/60" />
            <span>Google Drive Folder Link</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={driveFolderLink}
              onChange={(e) => {
                setDriveFolderLink(e.target.value);
                setDriveTestResult({ status: "idle" });
              }}
              placeholder="https://drive.google.com/drive/folders/..."
              className="flex-1 rounded-xl bg-white border border-primary/15 px-3.5 py-2.5 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition-all"
            />
            <button
              type="button"
              onClick={handleTestDriveFolder}
              disabled={isTesting || !driveFolderLink.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/15 text-[11px] font-bold text-primary hover:bg-primary/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 active:scale-95"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Testing…</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" />
                  <span>Test Access</span>
                </>
              )}
            </button>
          </div>

          {/* Test result feedback */}
          {driveTestResult.status === "success" && (
            <div className="space-y-2 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-xs text-emerald-800">
                    <span className="font-bold">Connected!</span>
                    {driveTestResult.folderName && (
                      <span> Folder: &ldquo;{driveTestResult.folderName}&rdquo;</span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickSaveDriveFolder}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs transition-all btn-tactile shrink-0 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save &amp; Activate Folder</span>
                </button>
              </div>
              <p className="text-[10px] text-emerald-700 italic">
                Folder verified. Click &ldquo;Save &amp; Activate Folder&rdquo; above or the Save button below to persist this folder for uploads.
              </p>
              {driveTestResult.warning && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    {driveTestResult.warning}
                  </p>
                </div>
              )}
            </div>
          )}

          {driveTestResult.status === "error" && (
            <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-rose-50 border border-rose-200 animate-fade-in-up">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-rose-700 leading-relaxed">
                {driveTestResult.error}
              </p>
            </div>
          )}

          {/* Current folder link */}
          {driveFolderLink && (
            <div className="flex items-center gap-2 pt-1">
              <a
                href={driveFolderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-primary hover:text-primary-hover underline underline-offset-2 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Open folder in Google Drive
              </a>
            </div>
          )}

          <p className="text-[10px] text-body/60 leading-relaxed">
            Paste the full Google Drive folder URL or just the folder ID. The
            service account must have Editor access to this folder.
          </p>
        </div>

        {/* Service account reminder */}
        <div className="rounded-lg bg-amber-50/80 border border-amber-200/80 p-3 flex items-start gap-2">
          <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[10px] text-amber-800 leading-relaxed space-y-0.5">
            <p className="font-bold">Service Account Required</p>
            <p>
              Ensure{" "}
              <code className="px-1 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[9px]">
                GOOGLE_SERVICE_ACCOUNT_EMAIL
              </code>{" "}
              and{" "}
              <code className="px-1 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[9px]">
                GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
              </code>{" "}
              are set in environment variables. Share the folder with the service account email.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Metadata Card */}
      <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-xs space-y-4">
        <div className="border-b border-primary/10 pb-3">
          <h2 className="font-serif text-base font-bold text-heading flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Academy Administration & Billing</span>
          </h2>
          <p className="text-xs text-body mt-0.5">
            Default platform billing parameters and official admissions contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-body/60" />
              <span>Contact & Admissions Email</span>
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full rounded-xl bg-white border border-primary/15 px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-body/60" />
              <span>Primary Transaction Currency</span>
            </label>
            <input
              type="text"
              disabled
              value={currency}
              className="w-full rounded-xl bg-bg-alt/30 border border-primary/10 px-3.5 py-2 text-xs text-body cursor-not-allowed"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-heading cursor-pointer">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 accent-primary rounded"
            />
            <span>Enable System Maintenance Mode (Restrict Non-Admin Bookings)</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50 active:scale-95"
        >
          {isPending ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Platform Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
