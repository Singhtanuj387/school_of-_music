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
  Search,
  Check,
  Music,
  Mic,
  X,
  Sparkles,
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
  isConvertedStudent?: boolean;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: "Instruments" | "Singing";
  subtitle: string;
  tags?: string[];
  iconType:
    | "piano"
    | "acousticGuitar"
    | "electricGuitar"
    | "electronicKeyboard"
    | "flute"
    | "violin"
    | "ukulele"
    | "tabla"
    | "westernVocals"
    | "hindustani"
    | "carnatic"
    | "bollywood"
    | "regionalFilm";
  iconBoxBg?: string;
  defaultIconBg?: string;
  iconColor?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // ─── INSTRUMENTS ──────────────────────────────────────
  {
    id: "Piano",
    name: "Piano",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["1-on-1"],
    iconType: "piano",
  },
  {
    id: "Acoustic Guitar",
    name: "Acoustic Guitar",
    category: "Instruments",
    subtitle: "Beginner friendly",
    iconType: "acousticGuitar",
  },
  {
    id: "Electric Guitar",
    name: "Electric Guitar",
    category: "Instruments",
    subtitle: "Beginner friendly",
    iconType: "electricGuitar",
  },
  {
    id: "Electronic Keyboard",
    name: "Electronic Keyboard",
    category: "Instruments",
    subtitle: "1-on-1",
    tags: ["Live"],
    iconType: "electronicKeyboard",
  },
  {
    id: "Flute",
    name: "Flute",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["1-on-1"],
    iconType: "flute",
  },
  {
    id: "Violin",
    name: "Violin",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "violin",
  },
  {
    id: "Ukulele",
    name: "Ukulele",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "ukulele",
  },
  {
    id: "Tabla",
    name: "Tabla",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "tabla",
  },

  // ─── SINGING ──────────────────────────────────────────
  {
    id: "Western Vocals",
    name: "Western Vocals",
    category: "Singing",
    subtitle: "Beginner friendly",
    iconType: "westernVocals",
    iconBoxBg: "bg-rose-50 text-rose-500",
  },
  {
    id: "Hindustani Classical Vocals (North India)",
    name: "Hindustani Classical Vocals",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "hindustani",
    iconBoxBg: "bg-purple-100/70 text-purple-700",
  },
  {
    id: "Carnatic Classical Vocals (South India)",
    name: "Carnatic Classical",
    category: "Singing",
    subtitle: "South India",
    iconType: "carnatic",
    iconBoxBg: "bg-orange-100/70 text-[#FF7803]",
  },
  {
    id: "Bollywood & Light Vocals (North India)",
    name: "Bollywood & Light Vocals",
    category: "Singing",
    subtitle: "North India",
    iconType: "bollywood",
    iconBoxBg: "bg-purple-100/70 text-purple-700",
  },
  {
    id: "Malayalam Film Music",
    name: "Malayalam Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-rose-50 text-rose-500",
  },
  {
    id: "Tamil Film Music",
    name: "Tamil Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
  {
    id: "Telugu Film Music",
    name: "Telugu Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
  {
    id: "Kannada Film Music",
    name: "Kannada Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
];

function CategoryIcon({
  type,
  isSelected,
}: {
  type: CatalogItem["iconType"];
  isSelected: boolean;
}) {
  switch (type) {
    case "piano":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M7 4v8M12 4v8M17 4v8" />
          <rect x="5.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <rect x="10.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <rect x="15.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <path d="M3 13.5h18" />
        </svg>
      );
    case "acousticGuitar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M14.5 9.5l4.5-4.5a1.4 1.4 0 0 1 2 2l-4.5 4.5" />
          <circle cx="9.5" cy="14.5" r="4.5" />
          <circle cx="9.5" cy="14.5" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 12l5.5-5.5" />
        </svg>
      );
    case "electricGuitar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8l4-4M18 4l2 2" />
          <path d="M15 9l-3 3c-.5.5-.5 1.5 0 2l.5.5c-2 2-4.5 3.5-6.5 2.5s-.5-4.5 1.5-6.5l.5.5c.5.5 1.5.5 2 0l3-3" />
          <circle cx="9" cy="15" r="1.2" fill="currentColor" />
        </svg>
      );
    case "electronicKeyboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="5.5" cy="9.5" r="1" fill="currentColor" />
          <circle cx="8.5" cy="9.5" r="1" fill="currentColor" />
          <path d="M12 6v6M15 6v6M18 6v6M2 13h20" />
        </svg>
      );
    case "flute":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 20L20 4" />
          <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
          <circle cx="11.5" cy="12.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "violin":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 5l4-4M17 1l2 2" />
          <path d="M14 6l-2 2c-.5.5-.5 1.2 0 1.7.8.8.8 2 0 2.8-.5.5-.5 1.2 0 1.7l1.5 1.5c-2 2-4.5 3-6.5 2s-1-4.5 1-6.5l1.5 1.5c.5.5 1.2.5 1.7 0 .8-.8 2-.8 2.8 0 .5.5 1.2.5 1.7 0l2-2" />
          <circle cx="9" cy="15" r="1.2" fill="currentColor" />
        </svg>
      );
    case "ukulele":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 9l5-5M18 3l3 3" />
          <circle cx="9" cy="15" r="4.5" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 12l4-4" />
        </svg>
      );
    case "tabla":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <ellipse cx="8" cy="8" rx="4.5" ry="2.5" />
          <path d="M3.5 8v6c0 2 2 3.5 4.5 3.5s4.5-1.5 4.5-3.5V8" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <ellipse cx="17" cy="11" rx="4" ry="2.2" />
          <path d="M13 11v5c0 1.8 1.8 3 4 3s4-1.2 4-3v-5" />
          <circle cx="17" cy="11" r="1.2" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );
    case "westernVocals":
      return <Mic className="w-5 h-5 stroke-[2]" />;
    case "hindustani":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="7" width="20" height="11" rx="2" />
          <path d="M5 10v5M8 10v5M11 10v5M14 10v5M17 10v5" />
          <rect x="5" y="10" width="2" height="3" fill="currentColor" />
          <rect x="11" y="10" width="2" height="3" fill="currentColor" />
          <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
        </svg>
      );
    case "carnatic":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="7" cy="16" r="4.5" />
          <circle cx="7" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <path d="M10.5 13.5L19 5" />
          <circle cx="19" cy="5" r="2.5" />
          <path d="M18 3l3 3" />
        </svg>
      );
    case "bollywood":
    case "regionalFilm":
    default:
      return <Music className="w-5 h-5 stroke-[2]" />;
  }
}

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

export function BookTrialClient({ currentUser, isConvertedStudent }: BookTrialClientProps) {
  // If student is already converted or has active enrollments, free trials are restricted
  if (isConvertedStudent) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 pt-4 sm:pt-8 animate-fadeIn">
        <div className="relative overflow-hidden rounded-3xl border border-surface-muted/90 bg-white/95 p-8 sm:p-10 shadow-xl shadow-primary/5 backdrop-blur-md">
          {/* Top Apple-style accent gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

          <div className="text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                <span>Enrolled Student Account</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-heading tracking-tight">
                Welcome back, {currentUser?.name || "Student"}!
              </h2>
            </div>

            <p className="text-sm sm:text-base text-body leading-relaxed max-w-md mx-auto">
              Complimentary free trials are exclusively reserved for new prospective students joining Gandharva School of Music.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-bg-alt/50 border border-surface-muted/80 text-left text-xs sm:text-sm text-body space-y-2.5">
              <p className="font-bold text-heading flex items-center gap-2">
                <Music className="w-4 h-4 text-cta shrink-0" />
                <span>Want to learn an additional instrument or discipline?</span>
              </p>
              <p className="text-body leading-relaxed">
                As an enrolled student, you can explore our complete accredited curriculum and request course admission directly from your student portal without needing a trial.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/student/dashboard/courses"
                className="btn-tactile w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cta hover:bg-cta-hover text-white font-bold text-sm shadow-md shadow-cta/25 transition-all"
              >
                <span>Browse Course Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/student/dashboard"
                className="btn-tactile w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-surface-muted/90 bg-white hover:bg-bg-alt/30 text-heading font-semibold text-sm transition-all shadow-xs"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Wizard step: 1 = Category, 2 = Date/Time, 3 = Details & Age Group, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Category & Instrument selection
  const [selectedCategory, setSelectedCategory] = useState<"Instruments" | "Singing">("Singing");
  const [selectedInstrument, setSelectedInstrument] = useState<string>("Bollywood & Light Vocals (North India)");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Instruments" | "Singing">("All");

  // Filtered catalog items based on tab and live search
  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesFilter = filterTab === "All" || item.category === filterTab;
    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
    );
  });

  const instrumentsList = filteredItems.filter((i) => i.category === "Instruments");
  const singingList = filteredItems.filter((i) => i.category === "Singing");

  const selectedItemObj = CATALOG_ITEMS.find((item) => item.id === selectedInstrument);
  const selectedDisplayName = selectedItemObj?.name || selectedInstrument || "Select an instrument or style";

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
    <div
      className={`mx-auto px-4 sm:px-6 transition-all duration-300 ${
        step === 1 ? "max-w-[1180px]" : "max-w-2xl"
      }`}
    >
      {/* Wizard Progress Indicator (Apple-grade Stepper matching user screenshot) */}
      {step < 4 && (
        <div className="flex items-center justify-center max-w-lg mx-auto mb-8 px-4">
          <div className="flex items-center w-full justify-between">
            {/* Step 1: Category */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  step === 1
                    ? "bg-[#3C096C] text-white ring-4 ring-[#3C096C]/15"
                    : step > 1
                    ? "bg-[#3C096C] text-white"
                    : "bg-[#F3E8FF] text-[#6B21A8]"
                }`}
              >
                {step > 1 ? <Check className="w-4 h-4 stroke-[2.5]" /> : "1"}
              </button>
              <span
                className={`text-xs mt-1.5 transition-colors ${
                  step === 1
                    ? "text-[#1E1A4D] font-bold"
                    : "text-gray-400 font-medium"
                }`}
              >
                Category
              </span>
            </div>

            {/* Gradient Connector Line 1 -> 2 */}
            <div className="flex-1 mx-3 sm:mx-5 -mt-5">
              <div
                className={`h-[2px] w-full rounded-full transition-all ${
                  step >= 2
                    ? "bg-gradient-to-r from-[#3C096C] to-[#FF7803]"
                    : "bg-gradient-to-r from-[#3C096C] via-[#FF7803] to-[#E9D5FF]"
                }`}
              />
            </div>

            {/* Step 2: Date & Time */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => selectedInstrument && setStep(2)}
                disabled={!selectedInstrument}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  step === 2
                    ? "bg-[#3C096C] text-white ring-4 ring-[#3C096C]/15"
                    : step > 2
                    ? "bg-[#3C096C] text-white cursor-pointer"
                    : "bg-[#F3E8FF] text-[#6B21A8]"
                }`}
              >
                {step > 2 ? <Check className="w-4 h-4 stroke-[2.5]" /> : "2"}
              </button>
              <span
                className={`text-xs mt-1.5 transition-colors ${
                  step === 2
                    ? "text-[#1E1A4D] font-bold"
                    : "text-gray-400 font-medium"
                }`}
              >
                Date & Time
              </span>
            </div>

            {/* Connector Line 2 -> 3 */}
            <div className="flex-1 mx-3 sm:mx-5 -mt-5">
              <div
                className={`h-[2px] w-full rounded-full transition-all ${
                  step >= 3
                    ? "bg-gradient-to-r from-[#FF7803] to-[#3C096C]"
                    : "bg-[#E9D5FF]"
                }`}
              />
            </div>

            {/* Step 3: Your Details */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => selectedInstrument && selectedSlot && setStep(3)}
                disabled={!selectedInstrument || !selectedSlot}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  step === 3
                    ? "bg-[#3C096C] text-white ring-4 ring-[#3C096C]/15"
                    : "bg-[#F3E8FF] text-[#6B21A8]"
                }`}
              >
                3
              </button>
              <span
                className={`text-xs mt-1.5 transition-colors ${
                  step === 3
                    ? "text-[#1E1A4D] font-bold"
                    : "text-gray-400 font-medium"
                }`}
              >
                Your Details
              </span>
            </div>
          </div>
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

      {/* ============ STEP 1: WHAT WOULD YOU LIKE TO LEARN? (APPLE-DESIGN REDESIGN) ============ */}
      {step === 1 && (
        <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)]">
          {/* Top accent gradient border */}
          <div className="h-[3px] w-full bg-gradient-to-r from-primary via-[#9810FA] to-accent" />

          <div className="p-6 sm:p-8 lg:p-10 space-y-6">
            {/* Header: Title + Subtitle on Left, Search Bar on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1A4D] tracking-tight">
                  What would you like to learn?
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Choose an instrument or singing style to get started.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search instruments or styles"
                  className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white placeholder-gray-400 text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-2xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-slate-200/90 bg-white shadow-2xs">
              {(["All", "Instruments", "Singing"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    filterTab === tab
                      ? "bg-[#3C096C] text-white shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Catalog Grid Area */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-heading">
                  No courses found matching &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="text-xs text-body-muted max-w-sm mx-auto">
                  Try searching for another instrument (e.g. Guitar, Piano) or vocal style.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterTab("All");
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : filterTab === "All" ? (
              /* Two Column Layout (Instruments on Left, Singing on Right) */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-1">
                {/* ─── INSTRUMENTS COLUMN ─── */}
                {instrumentsList.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#481282]" />
                      <h3 className="font-bold text-sm text-[#1E1A4D]">Instruments</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {instrumentsList.map((item) => {
                        const isSelected = selectedInstrument === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(item.category);
                              setSelectedInstrument(item.id);
                            }}
                            className={`relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                              isSelected
                                ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                                : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                            }`}
                          >
                            {/* Selected Check Badge */}
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}

                            {/* Top: Icon Box */}
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                                isSelected
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-[#F3E8FF] text-[#481282]"
                              }`}
                            >
                              <CategoryIcon type={item.iconType} isSelected={isSelected} />
                            </div>

                            {/* Middle & Bottom: Details */}
                            <div className="mt-2.5">
                              <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                                {item.subtitle}
                              </p>

                              {/* Tags */}
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 mt-2">
                                  {item.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ─── SINGING COLUMN ─── */}
                {singingList.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF7703]" />
                      <h3 className="font-bold text-sm text-[#1E1A4D]">Singing</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {singingList.map((item) => {
                        const isSelected = selectedInstrument === item.id;
                        const isBollywood = item.id.includes("Bollywood");

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(item.category);
                              setSelectedInstrument(item.id);
                            }}
                            className={`relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                              isSelected
                                ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                                : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                            }`}
                          >
                            {/* Selected Check Badge */}
                            {isSelected && (
                              <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                            )}

                            {/* Top: Icon Box */}
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                                isSelected && isBollywood
                                  ? "bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md"
                                  : isSelected
                                  ? "bg-purple-100 text-purple-700"
                                  : item.defaultIconBg || "bg-[#F3E8FF] text-[#481282]"
                              }`}
                            >
                              <CategoryIcon type={item.iconType} isSelected={isSelected} />
                            </div>

                            {/* Middle & Bottom: Details */}
                            <div className="mt-2.5">
                              <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                                {item.subtitle}
                              </p>

                              {/* Tags */}
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1 mt-2">
                                  {item.tags.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Single Selected Category View (Instruments or Singing) */
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      filterTab === "Instruments" ? "bg-[#481282]" : "bg-[#FF7703]"
                    }`}
                  />
                  <h3 className="font-bold text-sm text-[#1E1A4D]">
                    {filterTab} ({filteredItems.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
                  {filteredItems.map((item) => {
                    const isSelected = selectedInstrument === item.id;
                    const isBollywood = item.id.includes("Bollywood");

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(item.category);
                          setSelectedInstrument(item.id);
                        }}
                        className={`relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                          isSelected
                            ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                            : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}

                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                            isSelected && isBollywood
                              ? "bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md"
                              : isSelected
                              ? "bg-purple-100 text-purple-700"
                              : item.defaultIconBg || "bg-[#F3E8FF] text-[#481282]"
                          }`}
                        >
                          <CategoryIcon type={item.iconType} isSelected={isSelected} />
                        </div>

                        <div className="mt-2.5">
                          <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              {item.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer Row (Matching Screenshot) */}
            <div className="border-t border-slate-100 pt-5 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Selected Badge */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100/90 text-purple-700 flex items-center justify-center shrink-0">
                  <Music className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Selected:{" "}
                  <strong className="text-[#1E1A4D] font-bold">
                    {selectedDisplayName}
                  </strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  disabled
                  className="text-xs sm:text-sm font-semibold text-gray-400 px-3 py-2 cursor-not-allowed opacity-60"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!selectedInstrument}
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#3C096C] hover:bg-[#2D0752] active:scale-[0.98] text-white px-6 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next: Pick Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
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
                        className={inputClass + " pr-11"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-body/50 hover:text-heading hover:bg-surface-subtle transition-all active:scale-95 cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-heading/70" />
                        ) : (
                          <Eye className="w-4 h-4 text-body/60" />
                        )}
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
                        className={inputClass + " pr-11"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-body/50 hover:text-heading hover:bg-surface-subtle transition-all active:scale-95 cursor-pointer"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        title={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-heading/70" />
                        ) : (
                          <Eye className="w-4 h-4 text-body/60" />
                        )}
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
