"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  X,
  Globe,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronUp,
  ShieldCheck,
} from "lucide-react";

export interface ProfileCompletionPopupProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    country?: string | null;
    age?: number | null;
    gender?: string | null;
    guardianName?: string | null;
    guardianPhone?: string | null;
    address?: string | null;
  };
  hasTrialBooking: boolean;
}

export function ProfileCompletionPopup({
  user,
  hasTrialBooking,
}: ProfileCompletionPopupProps) {
  const pathname = usePathname();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check which details are missing
  const checklist = [
    {
      id: "country",
      label: "Country",
      filled: !!user.country?.trim(),
      icon: Globe,
    },
    {
      id: "age",
      label: "Age",
      filled: user.age !== null && user.age !== undefined,
      icon: User,
    },
    {
      id: "gender",
      label: "Gender",
      filled: !!user.gender?.trim(),
      icon: User,
    },
    {
      id: "guardian",
      label: "Guardian Contact",
      filled: !!user.guardianPhone?.trim() || !!user.guardianName?.trim(),
      icon: Phone,
    },
    {
      id: "address",
      label: "Address",
      filled: !!user.address?.trim(),
      icon: MapPin,
    },
  ];

  const completedCount = checklist.filter((item) => item.filled).length;
  const totalCount = checklist.length;
  // Starting base with account created = 20%
  const completionPercentage = Math.round(
    20 + (completedCount / totalCount) * 80
  );
  const isProfileFullyComplete = completedCount === totalCount;
  const missingItems = checklist.filter((item) => !item.filled);

  useEffect(() => {
    setMounted(true);
    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem(
        `gsm_dismiss_profile_popup_${user.id}`
      );
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    } catch {
      // Ignore storage errors in private browsing
    }
  }, [user.id]);

  // Hide if already complete, dismissed, not mounted, or already on the profile page
  if (
    !mounted ||
    isProfileFullyComplete ||
    isDismissed ||
    pathname === "/student/dashboard/profile"
  ) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(`gsm_dismiss_profile_popup_${user.id}`, "true");
    } catch {}
  };

  const handleToggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  // Minimized Floating Pill Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          type="button"
          onClick={handleToggleMinimize}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/98 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_30px_-5px_rgba(60,9,108,0.18)] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-left cursor-pointer"
          title="Click to view profile completion checklist"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cta flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-heading group-hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Complete Profile</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cta/15 text-cta font-extrabold leading-none">
                {completionPercentage}%
              </span>
            </div>
            <p className="text-[10px] text-body-muted">Click to resume setup</p>
          </div>
          <ChevronUp className="w-4 h-4 text-body-muted group-hover:text-heading transition-colors ml-1" />
        </button>
      </div>
    );
  }

  // Full Floating Apple-Style Side Popup
  return (
    <aside
      aria-label="Profile setup reminder"
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-[22.5rem] w-auto pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-400 ease-out"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_24px_50px_-12px_rgba(60,9,108,0.18),0_4px_16px_-2px_rgba(0,0,0,0.06)] p-5 sm:p-6 text-heading transition-all">
        {/* Specular Apple Accent Ribbon on top edge */}
        <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-primary via-cta to-accent" />

        {/* Header with Icon, Badge & Controls */}
        <div className="flex items-start justify-between gap-3 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/10 via-cta/10 to-accent/10 border border-primary/15 flex items-center justify-center text-primary shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5 text-cta" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent-subtle text-accent-dark border border-accent/30 text-[10px] font-extrabold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {hasTrialBooking ? "Trial Booked" : "Account Setup"}
                </span>
              </div>
              <h3 className="text-sm font-bold text-heading mt-1 leading-tight tracking-tight">
                Complete Your Profile
              </h3>
            </div>
          </div>

          {/* Minimize and Close Buttons */}
          <div className="flex items-center gap-1 shrink-0 -mr-1 -mt-1">
            <button
              type="button"
              onClick={handleToggleMinimize}
              className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-400 hover:text-heading hover:bg-slate-100 transition-colors cursor-pointer"
              title="Minimize to floating badge"
              aria-label="Minimize"
            >
              <span className="text-xs font-semibold px-0.5 leading-none">—</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="w-7 h-7 rounded-xl flex items-center justify-center text-gray-400 hover:text-heading hover:bg-slate-100 transition-colors cursor-pointer"
              title="Dismiss for this session"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs text-body leading-relaxed mt-1">
          {hasTrialBooking ? (
            <>
              Your trial session is scheduled! Complete your country, age, and
              guardian contact so your maestro can personalize your 1:1 syllabus.
            </>
          ) : (
            <>
              Tell us a little more about yourself so our academy mentors can
              tailor live lesson slots and coursework to your level.
            </>
          )}
        </p>

        {/* Progress Bar & Percentage */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-body-muted">Profile Strength</span>
            <span className="text-xs font-bold text-primary">{completionPercentage}%</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-primary via-cta to-accent rounded-full transition-all duration-700 ease-out shadow-2xs"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Missing / Completed Item Chips */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {checklist.map((item) => {
            return (
              <span
                key={item.id}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold transition-all ${
                  item.filled
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs"
                    : "bg-purple-50/70 text-purple-900 border border-purple-200/70 shadow-2xs"
                }`}
              >
                {item.filled ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-cta shrink-0" />
                )}
                <span>{item.label}</span>
              </span>
            );
          })}
        </div>

        {/* Primary Action Button */}
        <div className="mt-4 pt-2">
          <Link
            href="/student/dashboard/profile"
            className="group btn-tactile w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-primary via-[#6B1896] to-cta hover:opacity-95 text-white text-xs font-bold shadow-md shadow-primary/25 flex items-center justify-between transition-all cursor-pointer"
          >
            <span>Complete Profile Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-2.5 text-center">
            <button
              type="button"
              onClick={handleDismiss}
              className="text-[11px] font-medium text-body-muted hover:text-heading underline underline-offset-4 transition-colors cursor-pointer"
            >
              Remind me later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
