"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  Info,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { createTrialRequestAction } from "@/actions/trial";
import { sendPhoneOtpAction, verifyPhoneOtpForSignupAction } from "@/actions/auth";
import { SplitHeading } from "@/components/ui/SplitHeading";
import {
  CountryCodeSelector,
  SUPPORTED_COUNTRIES,
  CountryOption,
} from "@/components/ui/CountryCodeSelector";

export interface BookTrialClientProps {
  currentUser?: {
    id: string;
    name: string | null;
    email?: string | null;
    phone?: string | null;
    phoneVerified?: boolean;
    timezone: string;
  } | null;
}

const CATEGORIES = {
  Instruments: [
    "Piano",
    "Acoustic Guitar",
    "Electric Guitar",
    "Electronic Keyboard",
    "Flute",
    "Violin",
    "Ukulele",
    "Tabla",
  ],
  Singing: [
    "Western Vocals",
    "Hindustani Classical Vocals (North India)",
    "Carnatic Classical Vocals (South India)",
    "Bollywood & Light Vocals (North India)",
    "Malayalam Film Music",
    "Tamil Film Music",
    "Telugu Film Music",
    "Kannada Film Music",
  ],
};

const MORNING_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
];

const EVENING_SLOTS = [
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
];

const AGE_GROUPS = [
  { id: "4-7", label: "Kids", range: "4 - 7 years", desc: "Foundational ear-training, rhythm games & early finger dexterity" },
  { id: "8-12", label: "Children", range: "8 - 12 years", desc: "Structured technique, notation reading & performance songs" },
  { id: "13-17", label: "Teens", range: "13 - 17 years", desc: "Trinity/ABRSM grade tracks, raga theory & contemporary styling" },
  { id: "18+", label: "Adults", range: "18+ years", desc: "Flexible pacing, hobbyist to advanced classical mastery" },
];

export function BookTrialClient({ currentUser }: BookTrialClientProps) {
  // Wizard step: 1 = Category, 2 = Date/Time, 3 = Details & Age Group, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Category & Instrument selection
  const [selectedCategory, setSelectedCategory] = useState<"Instruments" | "Singing">("Singing");
  const [selectedInstrument, setSelectedInstrument] = useState<string>("Bollywood & Light Vocals (North India)");

  // Step 2: Date & Time slot
  const [dates] = useState(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      list.push(d);
    }
    return list;
  });

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState<"Morning" | "Evening">("Morning");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:00 AM");

  // Step 3: Age group & Contact details
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("Children (8 - 12 years)");
  const [studentName, setStudentName] = useState(currentUser?.name || "");
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || "");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(() => {
    if (currentUser?.phone) {
      const matched = SUPPORTED_COUNTRIES.find((c) =>
        currentUser.phone?.startsWith(c.dialCode)
      );
      if (matched) return matched;
    }
    return SUPPORTED_COUNTRIES[0];
  });
  const [studentPhone, setStudentPhone] = useState(() => {
    if (currentUser?.phone) {
      const matched = SUPPORTED_COUNTRIES.find((c) =>
        currentUser.phone?.startsWith(c.dialCode)
      );
      if (matched) {
        return currentUser.phone.slice(matched.dialCode.length).trim();
      }
      return currentUser.phone;
    }
    return "";
  });
  const [studentNotes, setStudentNotes] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Phone OTP verification state
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(!!currentUser?.phoneVerified);
  const [verifiedOtpCode, setVerifiedOtpCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpBanner, setOtpBanner] = useState<{ message: string; previewCode?: string } | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  const [isSendingOtp, startSendOtpTransition] = useTransition();
  const [isVerifyingOtp, startVerifyOtpTransition] = useTransition();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Cooldown countdown for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Compute full international phone number
  const getFullPhoneNumber = () => {
    const raw = studentPhone.trim();
    if (!raw) return "";
    if (raw.startsWith("+")) {
      return raw;
    }
    const cleanDigits = raw.replace(/\D/g, "");
    return `${selectedCountry.dialCode}${cleanDigits}`;
  };

  const handleSendOtp = () => {
    setPhoneError(null);
    setOtpError(null);
    setOtpBanner(null);

    const cleanDigits = studentPhone.replace(/\D/g, "");
    if (!cleanDigits) {
      setPhoneError("Please enter your mobile phone number.");
      return;
    }

    if (cleanDigits.length < 6) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    const fullPhone = getFullPhoneNumber();

    startSendOtpTransition(async () => {
      const res = await sendPhoneOtpAction(fullPhone, "SIGNUP");
      if (!res.success) {
        setPhoneError(res.error || "Failed to dispatch verification code.");
      } else {
        setOtpSent(true);
        setResendCooldown(30);
        setOtpBanner({
          message: res.message || "OTP code sent to your phone.",
          previewCode: res.data?.previewCode,
        });
      }
    });
  };

  const handleVerifyOtp = (codeOverride?: string) => {
    setOtpError(null);
    const trimmedCode = (codeOverride || otpCode).trim();

    if (trimmedCode.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP code.");
      return;
    }

    const fullPhone = getFullPhoneNumber();

    startVerifyOtpTransition(async () => {
      const res = await verifyPhoneOtpForSignupAction(fullPhone, trimmedCode);
      if (!res.success) {
        setOtpError(res.error || "Invalid or expired OTP code.");
      } else {
        setIsPhoneVerified(true);
        setVerifiedOtpCode(trimmedCode);
        setOtpBanner(null);
        setPhoneError(null);
        setOtpError(null);
      }
    });
  };

  const handleAutoFillOtp = (code: string) => {
    setOtpCode(code);
    handleVerifyOtp(code);
  };

  const handleChangePhone = () => {
    setIsPhoneVerified(false);
    setOtpSent(false);
    setOtpCode("");
    setVerifiedOtpCode("");
    setOtpBanner(null);
    setPhoneError(null);
    setOtpError(null);
  };

  // Selected date formatting
  const activeDate = dates[selectedDateIndex] || new Date();
  const activeDateFormatted = activeDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const year = activeDate.getFullYear();
  const month = String(activeDate.getMonth() + 1).padStart(2, "0");
  const day = String(activeDate.getDate()).padStart(2, "0");
  const dateIsoString = `${year}-${month}-${day}`;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedInstrument) {
      setErrorMessage("Please select a musical discipline or instrument.");
      setStep(1);
      return;
    }
    if (!selectedSlot) {
      setErrorMessage("Please pick your preferred trial lesson time.");
      setStep(2);
      return;
    }
    if (!selectedAgeGroup) {
      setErrorMessage("Please select the student age group.");
      return;
    }
    if (!studentName.trim() || !studentEmail.trim()) {
      setErrorMessage("Please enter student name and email.");
      return;
    }

    // Unauthenticated account creation validation
    if (!currentUser) {
      if (!studentPhone.trim()) {
        setErrorMessage("Mobile phone number is mandatory to book a trial lesson.");
        return;
      }
      if (!isPhoneVerified && otpCode.trim().length !== 6) {
        setErrorMessage("Mobile phone verification via OTP is mandatory. Please enter and verify the 6-digit code sent to your phone.");
        return;
      }
      if (!password) {
        setErrorMessage("Please create a password for your student account.");
        return;
      }
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please re-enter.");
        return;
      }
    }

    const detectedTz =
      typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
    const studentTz =
      currentUser?.timezone && currentUser.timezone !== "UTC"
        ? currentUser.timezone
        : detectedTz || "UTC";

    startTransition(async () => {
      const res = await createTrialRequestAction({
        category: selectedCategory,
        instrument: selectedInstrument,
        requestedDate: dateIsoString,
        timeSlot: selectedSlot,
        timezone: studentTz,
        ageGroup: selectedAgeGroup,
        studentName,
        studentEmail,
        studentPhone: getFullPhoneNumber() || undefined,
        otpCode: !currentUser ? (verifiedOtpCode || otpCode) : undefined,
        studentNotes: studentNotes || undefined,
        password: !currentUser ? password : undefined,
      });

      if (!res.success) {
        setErrorMessage(res.error || "Failed to book trial lesson.");
      } else {
        setStep(4);
      }
    });
  };

  // Step indicator labels
  const steps = [
    { num: 1, label: "Category" },
    { num: 2, label: "Date & Time" },
    { num: 3, label: "Your Details" },
  ];

  // Input class reusable
  const inputClass =
    "block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-body/40 shadow-sm transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-heading mb-1.5";

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Academy Brand Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex justify-center">
          <Link href="/" className="inline-block transition-opacity hover:opacity-90">
            <Image
              src="/cropped-Add-a-subheading-5-png-scaled.webp"
              alt="Gandharva School of Music"
              width={160}
              height={50}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        <SplitHeading
          as="h1"
          firstClause="Book Your Free"
          accentClause="Trial Lesson"
          align="center"
          size="lg"
        />
        <p className="text-xs sm:text-sm text-body max-w-md mx-auto">
          Experience 1-to-1 live guidance with our master faculty. Admin will allocate the best mentor for your age group.
        </p>
      </div>

      {/* Wizard Progress Indicator */}
      {step < 4 && (
        <div className="flex items-center justify-between max-w-sm mx-auto mb-8 px-2">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s.num
                      ? "bg-gradient-to-br from-primary to-cta text-white shadow-md shadow-primary/25"
                      : step === s.num
                        ? "bg-gradient-to-br from-primary to-cta text-white shadow-md shadow-primary/25"
                        : "bg-surface-muted/60 text-body/50"
                  }`}
                >
                  {step > s.num ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    s.num
                  )}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    step === s.num ? "text-heading" : "text-body/50"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-8 sm:w-12 mx-2 sm:mx-3 rounded-full transition-colors ${
                    step > s.num ? "bg-cta" : "bg-surface-muted/60"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-sm text-error"
        >
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-error" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ============ STEP 1: CHOOSE CATEGORY ============ */}
      {step === 1 && (
        <div className="relative overflow-hidden rounded-2xl bg-white border border-surface-muted/80 shadow-xl shadow-primary/5 backdrop-blur-sm">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

          <div className="p-6 sm:p-8 space-y-6 pt-8">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-heading tracking-tight">
                Choose your category
              </h2>
              <p className="text-xs text-body mt-1">
                Select your musical instrument discipline or vocal tradition to get started:
              </p>
            </div>

            <div className="space-y-5">
              {/* Instruments */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-heading flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cta inline-block" />
                  Instruments
                </h3>
                <div className="rounded-xl overflow-hidden divide-y divide-surface-muted/60">
                  {CATEGORIES.Instruments.map((item) => {
                    const isSelected = selectedInstrument === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedCategory("Instruments");
                          setSelectedInstrument(item);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-primary/10 to-cta/10 text-primary font-semibold"
                            : "bg-bg-alt/20 text-heading hover:bg-bg-alt/40"
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cta" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Singing */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-heading flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  Singing
                </h3>
                <div className="rounded-xl overflow-hidden divide-y divide-surface-muted/60">
                  {CATEGORIES.Singing.map((item) => {
                    const isSelected = selectedInstrument === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setSelectedCategory("Singing");
                          setSelectedInstrument(item);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-primary/10 to-cta/10 text-primary font-semibold"
                            : "bg-bg-alt/20 text-heading hover:bg-bg-alt/40"
                        }`}
                      >
                        <span>{item}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cta" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-tactile flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light"
              >
                <span>Next: Pick Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ STEP 2: DATE & TIME ============ */}
      {step === 2 && (
        <div className="relative overflow-hidden rounded-2xl bg-white border border-surface-muted/80 shadow-xl shadow-primary/5 backdrop-blur-sm">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

          <div className="p-6 sm:p-8 space-y-6 pt-8">
            <div className="text-center space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-heading tracking-tight">
                When is a good time?
              </h2>
              <p className="text-xs text-body">
                Pick a date and time that works for you
              </p>
            </div>

            {/* Date Selector - Horizontal scroll with proper padding */}
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-3 px-4 scroll-px-4 no-scrollbar sm:justify-center">
                {dates.map((d, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  const isToday = idx === 0;
                  const dayName = isToday
                    ? "Today"
                    : d.toLocaleDateString("en-US", { weekday: "short" });
                  const dayNum = d.getDate();
                  const monthName = d.toLocaleDateString("en-US", { month: "short" });

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`flex flex-col items-center justify-center shrink-0 w-16 py-3 rounded-2xl transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-primary to-cta text-white shadow-lg shadow-primary/30 scale-105"
                          : "bg-bg-alt/30 text-heading hover:bg-bg-alt/50"
                      }`}
                    >
                      <span className={`text-[10px] font-semibold leading-none ${isSelected ? "text-white/80" : "text-body/60"}`}>
                        {dayName}
                      </span>
                      <span className="text-lg font-bold leading-tight mt-0.5">{dayNum}</span>
                      <span className={`text-[9px] font-medium leading-none mt-0.5 ${isSelected ? "text-white/70" : "text-body/40"}`}>
                        {monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date label & Morning/Evening toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-body font-medium">
                <span className="font-semibold text-heading">{activeDateFormatted}</span>
                <span className="px-2 py-0.5 rounded-full bg-bg-alt/40 text-body/60 text-[10px] font-semibold">
                  Your local time
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTimePeriod("Morning")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timePeriod === "Morning"
                      ? "bg-gradient-to-r from-primary to-cta text-white shadow-sm shadow-primary/20"
                      : "bg-bg-alt/30 text-body hover:text-heading hover:bg-bg-alt/50"
                  }`}
                >
                  Morning
                </button>
                <button
                  type="button"
                  onClick={() => setTimePeriod("Evening")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timePeriod === "Evening"
                      ? "bg-gradient-to-r from-primary to-cta text-white shadow-sm shadow-primary/20"
                      : "bg-bg-alt/30 text-body hover:text-heading hover:bg-bg-alt/50"
                  }`}
                >
                  Evening
                </button>
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(timePeriod === "Morning" ? MORNING_SLOTS : EVENING_SLOTS).map((slot) => {
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-cta/15 text-cta shadow-sm ring-2 ring-cta/30 font-extrabold"
                        : "bg-bg-alt/25 text-heading hover:bg-bg-alt/45"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-bg-alt/30 text-body hover:text-heading text-xs font-bold transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-tactile flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light"
              >
                <span>Enter Your Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ STEP 3: ACCOUNT DETAILS & AGE GROUP ============ */}
      {step === 3 && (
        <form
          onSubmit={handleSubmitBooking}
          className="relative overflow-hidden rounded-2xl bg-white border border-surface-muted/80 shadow-xl shadow-primary/5 backdrop-blur-sm"
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

          <div className="p-6 sm:p-8 space-y-6 pt-8">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-heading tracking-tight">
                Student Age Group & Details
              </h2>
              <p className="text-xs text-body mt-1">
                Select the student age group so our director can match you with the ideal instructor.
              </p>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-xs text-error font-medium"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Age Group Selection Cards */}
            <div className="space-y-2">
              <label className={labelClass}>
                Choose Student Age Group *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AGE_GROUPS.map((g) => {
                  const isSelected = selectedAgeGroup.includes(g.range);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedAgeGroup(`${g.label} (${g.range})`)}
                      className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-primary/8 ring-2 ring-primary/30 shadow-sm"
                          : "bg-bg-alt/20 hover:bg-bg-alt/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-sm ${isSelected ? "text-primary" : "text-heading"}`}>
                          {g.label} ({g.range})
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cta" />}
                      </div>
                      <p className="text-[11px] text-body/60 mt-1.5 leading-relaxed">
                        {g.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studentName" className={labelClass}>
                  Student Full Name *
                </label>
                <input
                  id="studentName"
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aisha Patel"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="studentEmail" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="studentEmail"
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Mobile Phone Verification */}
              <div className="sm:col-span-2 rounded-2xl border border-primary/20 bg-primary-subtle/30 p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-heading">
                      Mobile Number Verification
                    </span>
                  </div>
                  {!currentUser ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-accent-subtle text-accent-dark border border-accent/30">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {isPhoneVerified ? "Verified" : "Optional"}
                    </span>
                  )}
                </div>

                {/* Error alert */}
                {(phoneError || otpError) && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-error/30 bg-error-muted/40 p-2.5 text-xs text-error font-medium"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-error" />
                    <span>{phoneError || otpError}</span>
                  </div>
                )}

                {/* Dev mode test code banner */}
                {otpBanner && !isPhoneVerified && (
                  <div className="rounded-xl border border-accent/40 bg-accent-subtle/70 p-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-accent-dark font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-dark" />
                      <span>{otpBanner.message}</span>
                    </div>
                    {otpBanner.previewCode && (
                      <div className="flex items-center justify-between pt-1 border-t border-accent/20">
                        <span className="text-[11px] text-body">
                          [Dev Test OTP]:{" "}
                          <strong className="font-mono text-heading">{otpBanner.previewCode}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAutoFillOtp(otpBanner.previewCode!)}
                          className="px-2 py-0.5 rounded-md bg-white border border-accent/40 text-[10px] font-bold text-accent-dark hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          Auto-fill OTP
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Verified State */}
                {isPhoneVerified ? (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold text-emerald-950 font-mono">{getFullPhoneNumber()}</p>
                        <p className="text-[10px] text-emerald-700">Phone verified successfully via OTP</p>
                      </div>
                    </div>
                    {!currentUser && (
                      <button
                        type="button"
                        onClick={handleChangePhone}
                        className="text-xs font-semibold text-body hover:text-heading underline cursor-pointer"
                      >
                        Change
                      </button>
                    )}
                  </div>
                ) : (
                  /* Phone input with CountryCodeSelector + Send OTP */
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* Country Code Selector + Phone Input Container */}
                      <div className="flex-1 flex items-center rounded-xl border border-surface-muted/90 bg-white shadow-xs transition-all focus-within:border-cta focus-within:ring-4 focus-within:ring-cta/15">
                        <CountryCodeSelector
                          selectedCountry={selectedCountry}
                          onSelect={(country) => {
                            setSelectedCountry(country);
                            setPhoneError(null);
                          }}
                        />
                        <div className="h-6 w-px bg-border-default/80 shrink-0" />
                        <input
                          id="studentPhone"
                          type="tel"
                          inputMode="tel"
                          value={studentPhone}
                          onChange={(e) => {
                            setStudentPhone(e.target.value);
                            setPhoneError(null);
                          }}
                          placeholder="Enter a phone number"
                          disabled={otpSent}
                          className="block flex-1 border-0 bg-transparent px-3.5 py-2 text-sm text-heading placeholder-body/40 focus:outline-none focus:ring-0 disabled:opacity-75 disabled:cursor-not-allowed"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={isSendingOtp || resendCooldown > 0 || !studentPhone.trim()}
                        onClick={handleSendOtp}
                        className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs btn-tactile active:scale-[0.98]"
                      >
                        {isSendingOtp ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                        ) : resendCooldown > 0 ? (
                          <span>Resend ({resendCooldown}s)</span>
                        ) : (
                          <span>{otpSent ? "Resend OTP" : "Send OTP"}</span>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-body-muted">
                      <span>
                        Includes country code: <strong className="font-mono text-heading">{selectedCountry.dialCode}</strong> ({selectedCountry.name})
                      </span>
                      {otpSent && !isPhoneVerified && (
                        <button
                          type="button"
                          onClick={handleChangePhone}
                          className="font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          Change number
                        </button>
                      )}
                    </div>

                    {/* 6-Digit OTP verification block */}
                    {otpSent && (
                      <div className="p-3.5 rounded-2xl bg-white border border-border-default/80 space-y-3 animate-fade-in shadow-xs">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="trial-otp-input"
                            className="block text-xs font-bold uppercase tracking-wider text-heading"
                          >
                            Enter 6-Digit OTP Code
                          </label>
                          <span className="text-[11px] text-body">
                            Sent to <strong className="font-mono text-heading">{getFullPhoneNumber()}</strong>
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            id="trial-otp-input"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              setOtpCode(val);
                              if (val.length === 6) {
                                handleVerifyOtp(val);
                              }
                            }}
                            placeholder="••••••"
                            className="block flex-1 rounded-xl border border-surface-muted/90 bg-white px-3 py-2.5 text-center text-lg tracking-[0.3em] font-mono font-bold text-heading placeholder:tracking-normal placeholder:font-sans placeholder-body/40 shadow-xs focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
                          />
                          <button
                            type="button"
                            disabled={isVerifyingOtp || otpCode.trim().length !== 6}
                            onClick={() => handleVerifyOtp()}
                            className="px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-hover text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs btn-tactile active:scale-[0.98]"
                          >
                            {isVerifyingOtp ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                            ) : (
                              <>
                                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                                <span>Verify Code</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Password fields - only for unauthenticated users */}
              {!currentUser && (
                <>
                  <div>
                    <label htmlFor="password" className={labelClass}>
                      Create Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className={inputClass + " pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 hover:text-body transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className={inputClass + " pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-body/40 hover:text-body transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Account creation info note */}
                  <div className="sm:col-span-2">
                    <div className="flex items-start gap-2.5 rounded-xl bg-primary/5 p-3 text-xs text-body leading-relaxed">
                      <Info className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                      <span>
                        Your password will be used to log in to your Gandharva Student Portal to access your classroom and scheduled sessions.
                      </span>
                    </div>
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="studentNotes" className={labelClass}>
                  Prior Musical Background (Optional)
                </label>
                <textarea
                  id="studentNotes"
                  rows={2}
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="e.g. Total beginner; interested in Bollywood film songs and voice modulation."
                  className={inputClass}
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="p-3.5 rounded-xl bg-bg-alt/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-body/60">Selected: </span>
                <strong className="text-cta font-semibold">{selectedInstrument}</strong>
              </div>
              <div>
                <span className="text-body/60">Schedule: </span>
                <strong className="text-heading">{activeDateFormatted} at {selectedSlot}</strong>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-bg-alt/30 text-body hover:text-heading text-xs font-bold transition-colors"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isPending || (!currentUser && !isPhoneVerified)}
                className={`btn-tactile flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-md transition-all cursor-pointer ${
                  !currentUser && !isPhoneVerified
                    ? "bg-neutral-400 cursor-not-allowed opacity-75 shadow-none"
                    : "bg-primary hover:bg-primary-light shadow-primary/20"
                }`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Trial Booking...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentUser
                        ? "Submit Trial Request"
                        : !isPhoneVerified
                        ? "Verify Phone OTP to Book"
                        : "Create Account & Book"}
                    </span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ============ STEP 4: SUCCESS SCREEN ============ */}
      {step === 4 && (
        <div className="relative overflow-hidden rounded-2xl bg-white border border-surface-muted/80 shadow-xl shadow-primary/5 backdrop-blur-sm">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

          <div className="p-8 sm:p-10 pt-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 mx-auto shadow-md shadow-green-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cta">
                Free Trial Request Registered
              </span>
              <SplitHeading
                as="h2"
                firstClause="Your Lesson Preference"
                accentClause="Has Been Received!"
                align="center"
                size="md"
              />
              <p className="text-xs sm:text-sm text-body max-w-lg mx-auto leading-relaxed">
                Our academic director will review your schedule and assign the perfect master instructor tailored for this age group.
              </p>
            </div>

            {/* Request Recap Card */}
            <div className="max-w-md mx-auto p-5 rounded-xl bg-bg-alt/25 text-left space-y-3">
              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: "1px solid var(--color-surface-muted, #e5e5e5)" }}>
                <span className="text-xs text-body/60">Category & Discipline</span>
                <span className="text-xs font-bold text-cta">{selectedInstrument}</span>
              </div>
              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: "1px solid var(--color-surface-muted, #e5e5e5)" }}>
                <span className="text-xs text-body/60">Requested Time</span>
                <span className="text-xs font-bold text-heading">{activeDateFormatted} at {selectedSlot}</span>
              </div>
              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: "1px solid var(--color-surface-muted, #e5e5e5)" }}>
                <span className="text-xs text-body/60">Student Age Group</span>
                <span className="text-xs font-bold text-primary">{selectedAgeGroup}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-body/60">Allotment Status</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cta/10 text-cta animate-pulse">
                  <Clock className="w-3 h-3" /> Pending Admin Allotment
                </span>
              </div>
            </div>

            {!currentUser && (
              <div className="flex items-start gap-2.5 rounded-xl bg-primary/5 p-3.5 text-xs text-body leading-relaxed max-w-md mx-auto">
                <Info className="w-4 h-4 shrink-0 text-primary mt-0.5" />
                <span>
                  Your student account has been created! Sign in with your email and password to access your dashboard and upcoming lessons.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              {currentUser ? (
                <Link
                  href="/student/dashboard"
                  className="btn-tactile w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md shadow-primary/20 transition-all text-center"
                >
                  Go to Student Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="btn-tactile w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-md shadow-primary/20 transition-all text-center"
                >
                  Sign In to Student Dashboard
                </Link>
              )}
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-bg-alt/30 hover:bg-bg-alt/50 text-heading text-sm font-bold transition-all text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
