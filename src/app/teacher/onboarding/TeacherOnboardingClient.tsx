"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  updateTeacherProfileAction,
  togglePublishTeacherProfileAction,
} from "@/actions/teacher";
import { WeeklyScheduleEditor } from "@/components/availability/WeeklyScheduleEditor";
import { AvailabilityRuleItem } from "@/schemas/teacher";

interface TeacherOnboardingClientProps {
  profile: {
    bio: string;
    instruments: string[];
    expertInstruments?: string[];
    moderateInstruments?: string[];
    yearsTeaching: number;
    hourlyRate: number;
    languages: string[];
    isPublished: boolean;
    approvalStatus?: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason?: string | null;
  };
  availabilityRules: AvailabilityRuleItem[];
  timezone: string;
  isEmailVerified: boolean;
  availableInstruments: string[];
  availableLanguages: string[];
}

export function TeacherOnboardingClient({
  profile,
  availabilityRules,
  timezone,
  isEmailVerified,
  availableInstruments,
  availableLanguages,
}: TeacherOnboardingClientProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Profile state
  const [bio, setBio] = useState(profile.bio);

  const initialModerate = profile.moderateInstruments || [];
  const initialExpert =
    profile.expertInstruments && profile.expertInstruments.length > 0
      ? profile.expertInstruments
      : profile.instruments.filter((i) => !initialModerate.includes(i));

  const [expertInstruments, setExpertInstruments] = useState<string[]>(
    initialExpert.length > 0 ? initialExpert : [],
  );
  const [moderateInstruments, setModerateInstruments] = useState<string[]>(
    initialModerate,
  );

  const [yearsTeaching, setYearsTeaching] = useState(profile.yearsTeaching);
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    profile.languages,
  );
  const [isPublished, setIsPublished] = useState(profile.isPublished);

  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Toggle language selection
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  // Save profile changes (Step 1 & 2)
  const handleSaveProfile = async (nextStep?: 1 | 2 | 3 | 4) => {
    setFeedback(null);
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("yearsTeaching", yearsTeaching.toString());
    formData.append("hourlyRate", hourlyRate.toString());

    const allInstruments = Array.from(new Set([...expertInstruments, ...moderateInstruments]));
    formData.append("instrumentsJson", JSON.stringify(allInstruments));
    formData.append("expertInstrumentsJson", JSON.stringify(expertInstruments));
    formData.append("moderateInstrumentsJson", JSON.stringify(moderateInstruments));
    formData.append("languagesJson", JSON.stringify(selectedLanguages));

    startTransition(async () => {
      const res = await updateTeacherProfileAction(null, formData);
      if (res.success) {
        setFeedback({
          type: "success",
          message: res.message || "Profile updated successfully!",
        });
        if (nextStep) setActiveStep(nextStep);
      } else {
        setFeedback({
          type: "error",
          message:
            res.error ||
            (res.fieldErrors
              ? Object.values(res.fieldErrors)[0][0]
              : "Failed to update profile."),
        });
      }
    });
  };

  // Toggle publish
  const handleTogglePublish = async () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await togglePublishTeacherProfileAction();
      if (res.success && res.data) {
        setIsPublished(res.data.isPublished);
        setFeedback({
          type: "success",
          message: res.message || "Publish status updated!",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Unable to update publish status.",
        });
      }
    });
  };

  // Checklist completion flags
  const hasBio = bio.trim().length >= 20;
  const allSelectedInstruments = Array.from(new Set([...expertInstruments, ...moderateInstruments]));
  const hasInstruments = allSelectedInstruments.length > 0;
  const hasRate = hourlyRate >= 10;
  const hasAvailability = availabilityRules.length > 0;
  const isApproved = profile.approvalStatus === "APPROVED";
  const canPublish =
    isEmailVerified &&
    hasBio &&
    hasInstruments &&
    hasRate &&
    hasAvailability &&
    isApproved;

  return (
    <div className="space-y-8">
      {/* Steps Navigation */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { step: 1, label: "Instruments & Bio" },
          { step: 2, label: "Rates & Experience" },
          { step: 3, label: "Weekly Schedule" },
          { step: 4, label: "Review & Publish" },
        ].map(({ step, label }) => (
          <button
            key={step}
            type="button"
            onClick={() => setActiveStep(step as 1 | 2 | 3 | 4)}
            className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
              activeStep === step
                ? "border-amber-500 bg-amber-500/10 text-stone-100"
                : "border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700"
            }`}
          >
            <span className="text-xs font-semibold text-amber-500">
              Step {step}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-200 mt-0.5">
              {label}
            </span>
          </button>
        ))}
      </div>

      {feedback && (
        <div
          role="alert"
          className={`rounded-lg border p-4 text-sm ${
            feedback.type === "success"
              ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
              : "border-red-500/30 bg-red-950/30 text-red-300"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Step 1: Instruments & Bio */}
      {activeStep === 1 && (
        <div className="space-y-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm sm:p-8">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-100">
                  Instruments & Disciplines Taught
                </h2>
                <p className="mt-1 text-xs text-stone-400">
                  Divide your disciplines into two tiers: <strong>1. Expertise</strong> (mastery/advanced) and <strong>2. Moderate</strong> (intermediate/foundational).
                </p>
              </div>
              <span className="text-xs text-amber-400 font-mono">
                {allSelectedInstruments.length} selected
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Expertise */}
              <div className="rounded-xl border border-amber-500/30 bg-stone-900/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                    <span>1. Expertise (Advanced & Mastery)</span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 px-2 py-0.5 rounded-full bg-stone-800">
                    {expertInstruments.length}
                  </span>
                </div>
                {/* Active in Expertise */}
                <div className="min-h-[44px] p-2 rounded-lg bg-stone-950/60 border border-stone-800 flex flex-wrap gap-1.5 items-center">
                  {expertInstruments.length === 0 ? (
                    <span className="text-[11px] text-stone-500 italic">None selected yet</span>
                  ) : (
                    expertInstruments.map((inst) => (
                      <span
                        key={inst}
                        className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded bg-amber-500 text-stone-950 text-xs font-bold"
                      >
                        {inst}
                        <button
                          type="button"
                          onClick={() => {
                            setExpertInstruments((prev) => prev.filter((i) => i !== inst));
                            setModerateInstruments((prev) => [...prev, inst]);
                          }}
                          title="Move to Moderate"
                          className="hover:bg-amber-600 rounded p-0.5 text-stone-900"
                        >
                          ⇄
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpertInstruments((prev) => prev.filter((i) => i !== inst))}
                          className="hover:bg-amber-600 rounded p-0.5 text-stone-900"
                        >
                          ✕
                        </button>
                      </span>
                    ))
                  )}
                </div>
                {/* Toggle list */}
                <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1.5 rounded bg-stone-950/40 border border-stone-800">
                  {availableInstruments.map((inst) => {
                    const isExp = expertInstruments.includes(inst);
                    const isMod = moderateInstruments.includes(inst);
                    return (
                      <button
                        key={inst}
                        type="button"
                        onClick={() => {
                          setExpertInstruments((prev) =>
                            prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst],
                          );
                          setModerateInstruments((prev) => prev.filter((i) => i !== inst));
                        }}
                        className={`rounded px-2 py-1 text-[11px] font-medium transition-all ${
                          isExp
                            ? "bg-amber-500 text-stone-950 font-bold"
                            : isMod
                            ? "bg-stone-800 text-stone-500 opacity-50"
                            : "border border-stone-700 bg-stone-800/60 text-stone-300 hover:bg-stone-700"
                        }`}
                      >
                        {isExp ? "✓ " : "+ "}
                        {inst}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Moderate */}
              <div className="rounded-xl border border-stone-700 bg-stone-900/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-300 uppercase tracking-wider">
                    <span>2. Moderate (Intermediate & Foundational)</span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 px-2 py-0.5 rounded-full bg-stone-800">
                    {moderateInstruments.length}
                  </span>
                </div>
                {/* Active in Moderate */}
                <div className="min-h-[44px] p-2 rounded-lg bg-stone-950/60 border border-stone-800 flex flex-wrap gap-1.5 items-center">
                  {moderateInstruments.length === 0 ? (
                    <span className="text-[11px] text-stone-500 italic">None selected yet</span>
                  ) : (
                    moderateInstruments.map((inst) => (
                      <span
                        key={inst}
                        className="inline-flex items-center gap-1 pl-2 pr-1 py-0.5 rounded bg-stone-700 text-stone-100 text-xs font-medium"
                      >
                        {inst}
                        <button
                          type="button"
                          onClick={() => {
                            setModerateInstruments((prev) => prev.filter((i) => i !== inst));
                            setExpertInstruments((prev) => [...prev, inst]);
                          }}
                          title="Promote to Expertise"
                          className="hover:bg-stone-600 rounded p-0.5 text-amber-300"
                        >
                          ⇄
                        </button>
                        <button
                          type="button"
                          onClick={() => setModerateInstruments((prev) => prev.filter((i) => i !== inst))}
                          className="hover:bg-stone-600 rounded p-0.5 text-stone-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))
                  )}
                </div>
                {/* Toggle list */}
                <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1.5 rounded bg-stone-950/40 border border-stone-800">
                  {availableInstruments.map((inst) => {
                    const isMod = moderateInstruments.includes(inst);
                    const isExp = expertInstruments.includes(inst);
                    return (
                      <button
                        key={inst}
                        type="button"
                        onClick={() => {
                          setModerateInstruments((prev) =>
                            prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst],
                          );
                          setExpertInstruments((prev) => prev.filter((i) => i !== inst));
                        }}
                        className={`rounded px-2 py-1 text-[11px] font-medium transition-all ${
                          isMod
                            ? "bg-stone-200 text-stone-950 font-bold"
                            : isExp
                            ? "bg-stone-800 text-stone-500 opacity-50"
                            : "border border-stone-700 bg-stone-800/60 text-stone-300 hover:bg-stone-700"
                        }`}
                      >
                        {isMod ? "✓ " : "+ "}
                        {inst}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Teacher Bio
              </label>
              <span
                className={`text-xs ${
                  bio.trim().length >= 20 ? "text-stone-400" : "text-amber-400"
                }`}
              >
                {bio.trim().length} / 2,000 chars (min 20)
              </span>
            </div>
            <textarea
              id="bio"
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your musical training, teaching style, performance experience, and who your ideal student is..."
              className="mt-1.5 block w-full rounded-lg border border-stone-700 bg-stone-800/80 p-3.5 text-sm text-stone-100 placeholder-stone-500 shadow-inner focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => handleSaveProfile(2)}
              disabled={isPending}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-md transition-all hover:bg-amber-400 disabled:opacity-60"
            >
              Save & Continue to Pricing →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Rates & Languages */}
      {activeStep === 2 && (
        <div className="space-y-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="hourlyRate"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Hourly Lesson Rate (USD)
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                  $
                </span>
                <input
                  id="hourlyRate"
                  type="number"
                  min={10}
                  max={1000}
                  step={5}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="block w-full rounded-lg border border-stone-700 bg-stone-800/80 py-2.5 pr-3.5 pl-8 text-sm text-stone-100 shadow-inner focus:border-amber-500 focus:outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Hourly rate in whole dollars (min $10.00). Stored internally in cents.
              </p>
            </div>

            <div>
              <label
                htmlFor="yearsTeaching"
                className="block text-xs font-semibold uppercase tracking-wider text-stone-300"
              >
                Years Teaching Experience
              </label>
              <input
                id="yearsTeaching"
                type="number"
                min={0}
                max={70}
                value={yearsTeaching}
                onChange={(e) => setYearsTeaching(Number(e.target.value))}
                className="mt-1.5 block w-full rounded-lg border border-stone-700 bg-stone-800/80 p-2.5 text-sm text-stone-100 shadow-inner focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              Languages Spoken
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableLanguages.map((lang) => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-amber-500 text-stone-950 font-semibold shadow-md"
                        : "border border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600 hover:bg-stone-800"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="rounded-lg border border-stone-700 px-5 py-2 text-sm text-stone-300 hover:bg-stone-800"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => handleSaveProfile(3)}
              disabled={isPending}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-md hover:bg-amber-400 disabled:opacity-60"
            >
              Save & Set Availability →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Weekly Availability Schedule */}
      {activeStep === 3 && (
        <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <h2 className="font-serif text-xl font-bold text-stone-100">
              Weekly Recurring Availability
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              Configure the days and hours when you are open for 1-to-1 lessons. All times are evaluated in your teaching timezone ({timezone}).
            </p>
          </div>

          <WeeklyScheduleEditor
            initialRules={availabilityRules}
            timezone={timezone}
            onSaved={() => {
              // Smooth transition to next step upon saving
            }}
          />

          <div className="mt-8 flex justify-between border-t border-stone-800 pt-6">
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className="rounded-lg border border-stone-700 px-5 py-2 text-sm text-stone-300 hover:bg-stone-800"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(4)}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-md hover:bg-amber-400"
            >
              Continue to Review & Publish →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review & Publish */}
      {activeStep === 4 && (
        <div className="space-y-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-sm sm:p-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-100">
              Profile Readiness Checklist
            </h2>
            <p className="mt-1 text-xs text-stone-400">
              Verify that all criteria are satisfied before publishing your studio profile:
            </p>
          </div>

          <div className="divide-y divide-stone-800/60 rounded-xl border border-stone-800 bg-stone-950/40">
            {/* 1. Email Verification */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isEmailVerified
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {isEmailVerified ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    Email Verification
                  </p>
                  <p className="text-xs text-stone-400">
                    {isEmailVerified
                      ? "Your email address is verified"
                      : "Email not verified yet"}
                  </p>
                </div>
              </div>
              {!isEmailVerified && (
                <Link
                  href="/verify-email"
                  className="rounded-md bg-stone-800 px-3 py-1 text-xs text-amber-400 hover:text-amber-300"
                >
                  Verify Email
                </Link>
              )}
            </div>

            {/* 2. Instruments */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    hasInstruments
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {hasInstruments ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    Instruments Selected
                  </p>
                  <p className="text-xs text-stone-400">
                    {hasInstruments
                      ? [
                          expertInstruments.length > 0
                            ? `Expertise: ${expertInstruments.join(", ")}`
                            : "",
                          moderateInstruments.length > 0
                            ? `Moderate: ${moderateInstruments.join(", ")}`
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" • ")
                      : "No instruments selected"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="text-xs text-stone-400 hover:text-stone-200"
              >
                Edit
              </button>
            </div>

            {/* 3. Bio */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    hasBio
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {hasBio ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    Teacher Bio
                  </p>
                  <p className="text-xs text-stone-400">
                    {hasBio
                      ? `${bio.slice(0, 70)}...`
                      : "Bio must be at least 20 characters"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="text-xs text-stone-400 hover:text-stone-200"
              >
                Edit
              </button>
            </div>

            {/* 4. Hourly Rate */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    hasRate
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {hasRate ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    Hourly Lesson Rate
                  </p>
                  <p className="text-xs text-stone-400">
                    {hasRate ? `$${hourlyRate.toFixed(2)}/hour` : "Rate not configured"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="text-xs text-stone-400 hover:text-stone-200"
              >
                Edit
              </button>
            </div>

            {/* 5. Weekly Availability */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    hasAvailability
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {hasAvailability ? "✓" : "!"}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    Weekly Availability Grid
                  </p>
                  <p className="text-xs text-stone-400">
                    {hasAvailability
                      ? `${availabilityRules.length} time block(s) configured`
                      : "No availability rules set"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="text-xs text-stone-400 hover:text-stone-200"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Accreditation Review Notice */}
          {profile.approvalStatus === "PENDING" && (
            <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 text-xs text-amber-300 space-y-1">
              <span className="font-bold text-amber-200 uppercase tracking-wider text-[10px]">
                Faculty Accreditation: Pending Administrative Review
              </span>
              <p className="text-amber-300/90 leading-relaxed">
                Your instructor credentials have been submitted to the Academic Board. You can complete and save your profile details, rates, and schedule now. Publishing your public profile will unlock once Gandharva administration approves your application.
              </p>
            </div>
          )}

          {profile.approvalStatus === "REJECTED" && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-300 space-y-1">
              <span className="font-bold text-rose-200 uppercase tracking-wider text-[10px]">
                Application Status: Revision Required
              </span>
              <p className="text-rose-300/90 leading-relaxed">
                {profile.rejectionReason
                  ? `Feedback from Administration: "${profile.rejectionReason}"`
                  : "Your application requires updates before accreditation can be completed."}
              </p>
            </div>
          )}

          {profile.approvalStatus === "APPROVED" && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-300 flex items-center justify-between">
              <span className="font-bold text-emerald-200">
                ✓ Accredited & Approved Faculty Member
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
                Approved
              </span>
            </div>
          )}

          {/* Publishing Button / State */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
            <div>
              <span className="text-xs text-stone-500">Current Status:</span>
              <p className="text-sm font-semibold text-stone-200">
                {isPublished ? "🟢 Published & Discoverable" : "🟡 Unpublished (Draft)"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/teacher/dashboard"
                className="rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 hover:bg-stone-800"
              >
                Go to Dashboard
              </Link>
              <button
                type="button"
                onClick={handleTogglePublish}
                disabled={isPending || (!isPublished && !canPublish)}
                className={`rounded-lg px-6 py-2.5 text-sm font-semibold shadow-md transition-all ${
                  isPublished
                    ? "border border-red-500/40 bg-red-950/30 text-red-300 hover:bg-red-950/50"
                    : canPublish
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 hover:from-amber-400 hover:to-amber-500 shadow-amber-950/40"
                      : "bg-stone-800 text-stone-500 cursor-not-allowed"
                }`}
              >
                {isPending
                  ? "Processing..."
                  : isPublished
                    ? "Unpublish Profile"
                    : "Publish Studio Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
