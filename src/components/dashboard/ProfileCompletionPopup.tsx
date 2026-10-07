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
          onClick={handleToggleMinimize}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/95 dark:bg-[#1E1A4D]/95 backdrop-blur-xl border border-primary/20 shadow-xl shadow-primary/15 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-left"
          title="Click to view profile completion checklist"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cta flex items-center justify-center text-white text-xs font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-heading group-hover:text-primary transition-colors flex items-center gap-1.5">
              <span>Complete Profile</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cta/15 text-cta font-extrabold">
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
      className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-[22rem] w-auto pointer-events-auto animate-in fade-in slide-in-from-bottom-6 duration-400 ease-out"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/95 dark:bg-[#1E1A4D]/95 backdrop-blur-2xl border border-primary/15 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(30,26,77,0.28)] p-5 text-heading transition-all">
        {/* Specular Apple Accent Ribbon on top edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cta to-accent" />

        {/* Header with Icon, Badge & Controls */}
        <div className="flex items-start justify-between gap-3 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary/10 via-cta/10 to-primary/20 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-cta" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/15 text-accent-dark border border-accent/25">
                  {hasTrialBooking ? "Trial Booked" : "Account Setup"}
                </span>
              </div>
              <h3 className="font-serif text-sm font-bold text-heading mt-0.5 leading-tight">
                Complete Your Profile
              </h3>
            </div>
          </div>

          {/* Minimize and Close Buttons */}
          <div className="flex items-center gap-1 shrink-0 -mr-1 -mt-1">
            <button
              type="button"
              onClick={handleToggleMinimize}
              className="p-1.5 rounded-xl text-body-muted hover:text-heading hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
              title="Minimize to floating badge"
              aria-label="Minimize"
            >
              <span className="text-xs font-semibold px-0.5">—</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1.5 rounded-xl text-body-muted hover:text-heading hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
              title="Dismiss for this session"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-xs text-body leading-relaxed">
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
        <div className="mt-3.5 pt-3 border-t border-border-subtle/80 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-body-muted">Profile Strength</span>
            <span className="text-cta font-bold">{completionPercentage}%</span>
          </div>

          <div className="w-full h-1.5 bg-neutral-200/70 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-cta to-accent rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Missing Item Chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {checklist.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.id}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium transition-colors ${
                  item.filled
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-surface-muted/90 text-body border border-border-default/70"
                }`}
              >
                {item.filled ? (
                  <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-cta shrink-0" />
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
            className="group btn-tactile w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary to-cta hover:from-primary-dark hover:to-cta-hover text-white text-xs font-bold shadow-md shadow-primary/20 flex items-center justify-between transition-all"
          >
            <span>Complete Profile Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={handleDismiss}
              className="text-[11px] text-body-muted hover:text-heading underline underline-offset-2 transition-colors cursor-pointer"
            >
              Remind me later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
