"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import {
  updateTeacherProfileAction,
  updateTeacherPaymentDetailsAction,
  uploadTeacherPaymentQrAction,
  removeTeacherPaymentQrAction,
} from "@/actions/teacher";
import { updateProfileAction, changePasswordAction } from "@/actions/profile";
import { POPULAR_TIMEZONES } from "@/lib/timezone";
import { INSTRUMENTS, LANGUAGES } from "@/types";
import {
  User,
  Lock,
  Check,
  Loader2,
  ShieldCheck,
  Music,
  Globe,
  Briefcase,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRightLeft,
  X,
  Plus,
  QrCode,
  CreditCard,
  Upload,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { AvatarUpload } from "@/components/profile/AvatarUpload";

interface TeacherProfileEditorProps {
  user: {
    id: string;
    name: string;
    email: string;
    timezone: string;
    image?: string | null;
  };
  profile: {
    bio: string;
    instruments: string[];
    expertInstruments?: string[];
    moderateInstruments?: string[];
    languages: string[];
    yearsTeaching: number;
    hourlyRate: number;
    payoutPerSession: number;
    upiId?: string;
    paymentQrCodeUrl?: string | null;
    isPublished: boolean;
  } | null;
}

export function TeacherProfileEditor({
  user,
  profile,
}: TeacherProfileEditorProps) {
  // Account fields
  const [name, setName] = useState(user.name);
  const [timezone, setTimezone] = useState(user.timezone || "UTC");

  // Profile fields
  const [bio, setBio] = useState(profile?.bio || "");

  // Initialize expert and moderate instruments
  const initialModerate = profile?.moderateInstruments || [];
  const initialExpert =
    profile?.expertInstruments && profile.expertInstruments.length > 0
      ? profile.expertInstruments
      : (profile?.instruments || ["Piano"]).filter((i) => !initialModerate.includes(i));

  const [expertInstruments, setExpertInstruments] = useState<string[]>(
    initialExpert.length > 0 ? initialExpert : ["Piano"],
  );
  const [moderateInstruments, setModerateInstruments] = useState<string[]>(
    initialModerate,
  );

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    profile?.languages || ["English"],
  );
  const [yearsTeaching, setYearsTeaching] = useState<number>(
    profile?.yearsTeaching || 5,
  );

  const [isPendingProfile, startProfileTransition] = useTransition();
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Payment credentials fields
  const [upiId, setUpiId] = useState(profile?.upiId || "");
  const [paymentQrCodeUrl, setPaymentQrCodeUrl] = useState<string | null>(
    profile?.paymentQrCodeUrl || null,
  );
  const [isPendingPayment, startPaymentTransition] = useTransition();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [isUploadingQr, setIsUploadingQr] = useState(false);
  const [isRemovingQr, setIsRemovingQr] = useState(false);
  const [qrMessage, setQrMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const qrFileInputRef = useRef<HTMLInputElement>(null);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPendingPassword, startPasswordTransition] = useTransition();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSavePaymentDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setPaymentSuccess(false);

    startPaymentTransition(async () => {
      const res = await updateTeacherPaymentDetailsAction({ upiId });
      if (!res.success) {
        setPaymentError(res.error || "Failed to update UPI ID.");
      } else {
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 3500);
      }
    });
  };

  const handleQrFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setQrMessage({
        type: "error",
        text: "QR code image exceeds 5MB limit. Please upload a smaller file.",
      });
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setQrMessage({
        type: "error",
        text: "Please upload a valid image file (PNG, JPG, WebP, or SVG).",
      });
      return;
    }

    setIsUploadingQr(true);
    setQrMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadTeacherPaymentQrAction(formData);

      if (!res.success || !res.paymentQrCodeUrl) {
        setQrMessage({
          type: "error",
          text: res.error || "Failed to upload QR code.",
        });
      } else {
        setPaymentQrCodeUrl(res.paymentQrCodeUrl);
        setQrMessage({
          type: "success",
          text: "Payment QR code uploaded and saved successfully!",
        });
        setTimeout(() => setQrMessage(null), 4000);
      }
    } catch {
      setQrMessage({
        type: "error",
        text: "An unexpected error occurred while uploading QR code.",
      });
    } finally {
      setIsUploadingQr(false);
      if (qrFileInputRef.current) {
        qrFileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveQrCode = async () => {
    if (!confirm("Are you sure you want to remove your payout QR code?")) return;

    setIsRemovingQr(true);
    setQrMessage(null);

    try {
      const res = await removeTeacherPaymentQrAction();
      if (!res.success) {
        setQrMessage({
          type: "error",
          text: res.error || "Failed to remove QR code.",
        });
      } else {
        setPaymentQrCodeUrl(null);
        setQrMessage({
          type: "success",
          text: "Payment QR code removed successfully.",
        });
        setTimeout(() => setQrMessage(null), 3000);
      }
    } catch {
      setQrMessage({
        type: "error",
        text: "Failed to remove QR code.",
      });
    } finally {
      setIsRemovingQr(false);
    }
  };

  const toggleExpert = (inst: string) => {
    setExpertInstruments((prev) => {
      if (prev.includes(inst)) {
        if (prev.length === 1 && moderateInstruments.length === 0) return prev;
        return prev.filter((i) => i !== inst);
      }
      return [...prev, inst];
    });
    setModerateInstruments((prev) => prev.filter((i) => i !== inst));
  };

  const toggleModerate = (inst: string) => {
    setModerateInstruments((prev) => {
      if (prev.includes(inst)) {
        if (prev.length === 1 && expertInstruments.length === 0) return prev;
        return prev.filter((i) => i !== inst);
      }
      return [...prev, inst];
    });
    setExpertInstruments((prev) => prev.filter((i) => i !== inst));
  };

  const moveToModerate = (inst: string) => {
    setExpertInstruments((prev) => prev.filter((i) => i !== inst));
    setModerateInstruments((prev) => (prev.includes(inst) ? prev : [...prev, inst]));
  };

  const moveToExpert = (inst: string) => {
    setModerateInstruments((prev) => prev.filter((i) => i !== inst));
    setExpertInstruments((prev) => (prev.includes(inst) ? prev : [...prev, inst]));
  };

  const removeInstrument = (inst: string) => {
    const totalCount = expertInstruments.length + moderateInstruments.length;
    if (totalCount <= 1) return;
    setExpertInstruments((prev) => prev.filter((i) => i !== inst));
    setModerateInstruments((prev) => prev.filter((i) => i !== inst));
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((curr) =>
      curr.includes(lang)
        ? curr.length > 1
          ? curr.filter((l) => l !== lang)
          : curr
        : [...curr, lang],
    );
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(false);

    if (bio.trim().length < 20) {
      setProfileError("Bio must be at least 20 characters.");
      return;
    }

    if (expertInstruments.length === 0 && moderateInstruments.length === 0) {
      setProfileError("Please select at least one instrument or discipline taught.");
      return;
    }

    startProfileTransition(async () => {
      // 1. Update user name and timezone
      const userRes = await updateProfileAction({ name, timezone });
      if (!userRes.success) {
        setProfileError(userRes.error || "Failed to update profile name/timezone.");
        return;
      }

      // 2. Update teacher profile data
      const formData = new FormData();
      formData.set("bio", bio.trim());
      formData.set("yearsTeaching", String(yearsTeaching));
      formData.set("hourlyRate", String(Math.max(10, Math.round((profile?.hourlyRate || 5000) / 100))));
      
      const allInstruments = Array.from(new Set([...expertInstruments, ...moderateInstruments]));
      allInstruments.forEach((inst) => formData.append("instruments", inst));
      expertInstruments.forEach((inst) => formData.append("expertInstruments", inst));
      moderateInstruments.forEach((inst) => formData.append("moderateInstruments", inst));
      selectedLanguages.forEach((lang) => formData.append("languages", lang));
      if (upiId.trim()) {
        formData.set("upiId", upiId.trim());
      }

      const teacherRes = await updateTeacherProfileAction(null, formData);
      if (!teacherRes.success) {
        const err =
          teacherRes.error ||
          (teacherRes.fieldErrors
            ? Object.values(teacherRes.fieldErrors)[0]?.[0]
            : null) ||
          "Failed to update teacher studio details.";
        setProfileError(err);
        return;
      }

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    startPasswordTransition(async () => {
      const res = await changePasswordAction({
        currentPassword,
        newPassword,
      });

      if (!res.success) {
        setPasswordError(res.error || "Failed to update password.");
      } else {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Studio & Faculty Info Form */}
      <div className="rounded-2xl border border-border-default bg-white p-6 shadow-xs space-y-6">
        <div className="border-b border-border-default pb-4">
          <h2 className="font-serif text-lg font-bold text-heading flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>Faculty Profile & Studio Credentials</span>
          </h2>
          <p className="text-xs text-body mt-0.5">
            Update your teaching bio, instrument specialties, languages, and time preferences.
          </p>
        </div>

        {/* Profile Avatar Upload Section */}
        <div className="pb-2 border-b border-border-default/60">
          <AvatarUpload currentImage={user.image} userName={name} />
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          {profileError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{profileError}</span>
            </div>
          )}

          {profileSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Profile credentials saved successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full rounded-xl bg-neutral-100 border border-neutral-200 px-3.5 py-2 text-xs text-body/60 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading">
                Teaching Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-numeric"
              >
                {POPULAR_TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-body">
                All availability rules and lesson rooms are scheduled relative to this timezone.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading">
                Years Teaching Experience
              </label>
              <input
                type="number"
                min={0}
                max={60}
                required
                value={yearsTeaching}
                onChange={(e) => setYearsTeaching(Number(e.target.value))}
                className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-numeric"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading">
              Instructor Biography & Musical Philosophy
            </label>
            <textarea
              required
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your musical training, pedagogical approach, repertoire expertise, and performance background..."
              className="w-full rounded-xl bg-white border border-border-default p-3.5 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 leading-relaxed shadow-xs"
            />
            <p className="text-[11px] text-body">
              Must be at least 20 characters. Shown on your faculty profile to prospective students.
            </p>
          </div>

          {/* Instruments & Disciplines Taught (Divided into 1. Expertise and 2. Moderate) */}
          <div className="space-y-4 rounded-2xl bg-bg-alt/20 border border-border-default/80 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-1">
              <div>
                <label className="text-sm font-bold text-heading flex items-center gap-2">
                  <Music className="w-4 h-4 text-primary" />
                  <span>Instruments & Disciplines Taught</span>
                </label>
                <p className="text-xs text-body mt-0.5">
                  Divide the subjects you teach into two pedagogical tiers: <strong>1. Expertise</strong> (mastery & concert level) and <strong>2. Moderate</strong> (intermediate & foundational level).
                </p>
              </div>
              <div className="text-[11px] font-medium text-body-muted shrink-0">
                Total: <span className="font-bold text-heading">{expertInstruments.length + moderateInstruments.length}</span> disciplines
              </div>
            </div>

            {/* Two Tier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* TIER 1: EXPERTISE */}
              <div className="rounded-xl bg-white border-2 border-primary/30 p-4 space-y-3 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-heading uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span>Expertise</span>
                        </h4>
                        <p className="text-[11px] text-body-muted">
                          Mastery, concert & advanced technique
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                      {expertInstruments.length} Active
                    </span>
                  </div>

                  {/* Selected in Expertise */}
                  <div className="min-h-[52px] p-2.5 rounded-lg bg-bg-alt/40 border border-border-subtle flex flex-wrap gap-1.5 items-center">
                    {expertInstruments.length === 0 ? (
                      <span className="text-[11px] text-body-muted italic p-1">
                        No expertise instruments selected yet. Pick from the list below.
                      </span>
                    ) : (
                      expertInstruments.map((inst) => (
                        <div
                          key={inst}
                          className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-primary text-white text-xs font-semibold shadow-xs animate-in fade-in duration-150"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span>{inst}</span>
                          <button
                            type="button"
                            onClick={() => moveToModerate(inst)}
                            title="Move to Moderate tier"
                            className="p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeInstrument(inst)}
                            title="Remove instrument"
                            disabled={expertInstruments.length + moderateInstruments.length <= 1}
                            className="p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add to Expertise */}
                <div className="space-y-1.5 pt-2 border-t border-border-subtle/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                    + Add / Toggle Expertise
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-2 rounded-lg bg-bg-alt/20 border border-border-subtle/80">
                    {INSTRUMENTS.map((inst) => {
                      const isExpert = expertInstruments.includes(inst);
                      const isModerate = moderateInstruments.includes(inst);
                      return (
                        <button
                          key={inst}
                          type="button"
                          onClick={() => toggleExpert(inst)}
                          className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                            isExpert
                              ? "bg-primary text-white shadow-xs font-bold"
                              : isModerate
                              ? "bg-bg-alt border border-border-subtle text-body-muted opacity-60 hover:opacity-100"
                              : "bg-white border border-border-subtle text-body hover:text-heading hover:border-primary/50"
                          }`}
                        >
                          {isExpert ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{inst}</span>
                          {isModerate && <span className="text-[9px] text-accent font-bold">(In Moderate)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* TIER 2: MODERATE */}
              <div className="rounded-xl bg-white border border-border-default p-4 space-y-3 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-accent/15 text-accent-dark flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-heading uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          <span>Moderate</span>
                        </h4>
                        <p className="text-[11px] text-body-muted">
                          Intermediate instruction & foundation
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-bg-alt text-heading">
                      {moderateInstruments.length} Active
                    </span>
                  </div>

                  {/* Selected in Moderate */}
                  <div className="min-h-[52px] p-2.5 rounded-lg bg-bg-alt/40 border border-border-subtle flex flex-wrap gap-1.5 items-center">
                    {moderateInstruments.length === 0 ? (
                      <span className="text-[11px] text-body-muted italic p-1">
                        No moderate instruments selected yet. Pick from the list below.
                      </span>
                    ) : (
                      moderateInstruments.map((inst) => (
                        <div
                          key={inst}
                          className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-white border border-border-strong text-heading text-xs font-semibold shadow-xs animate-in fade-in duration-150"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          <span>{inst}</span>
                          <button
                            type="button"
                            onClick={() => moveToExpert(inst)}
                            title="Promote to Expertise tier"
                            className="p-1 rounded hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeInstrument(inst)}
                            title="Remove instrument"
                            disabled={expertInstruments.length + moderateInstruments.length <= 1}
                            className="p-1 rounded hover:bg-rose-50 text-body hover:text-rose-600 transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Add to Moderate */}
                <div className="space-y-1.5 pt-2 border-t border-border-subtle/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                    + Add / Toggle Moderate
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-2 rounded-lg bg-bg-alt/20 border border-border-subtle/80">
                    {INSTRUMENTS.map((inst) => {
                      const isModerate = moderateInstruments.includes(inst);
                      const isExpert = expertInstruments.includes(inst);
                      return (
                        <button
                          key={inst}
                          type="button"
                          onClick={() => toggleModerate(inst)}
                          className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                            isModerate
                              ? "bg-heading text-white shadow-xs font-bold"
                              : isExpert
                              ? "bg-bg-alt border border-border-subtle text-body-muted opacity-60 hover:opacity-100"
                              : "bg-white border border-border-subtle text-body hover:text-heading hover:border-accent/50"
                          }`}
                        >
                          {isModerate ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{inst}</span>
                          {isExpert && <span className="text-[9px] text-primary font-bold">(In Expertise)</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages Spoken Multi-Select */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Languages of Instruction</span>
            </label>
            <div className="flex flex-wrap gap-2 p-3.5 rounded-xl bg-bg-alt/30 border border-border-default/60">
              {LANGUAGES.map((lang) => {
                const selected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selected
                        ? "bg-accent text-white shadow-xs"
                        : "bg-white border border-border-default text-body hover:text-heading"
                    }`}
                  >
                    {selected ? "✓ " : "+ "}
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPendingProfile}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPendingProfile ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Studio Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Institutional Payout & Remuneration Details ── */}
      <div className="rounded-2xl border border-border-default bg-white p-6 shadow-xs space-y-6">
        <div className="border-b border-border-default pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-heading flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" />
              <span>Payout & Banking Details (UPI ID & QR Code)</span>
            </h2>
            <p className="text-xs text-body mt-0.5 max-w-xl">
              Enter your UPI ID and upload your payment QR code. Gandharva administration uses these verified coordinates to disburse your 1:1 session remuneration directly to your bank account.
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-subtle/60 border border-accent/20 text-accent-dark text-xs font-semibold self-start sm:self-auto shrink-0 font-numeric">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Remuneration Rate: ₹{((profile?.payoutPerSession || 80000) / 100).toLocaleString("en-IN")}/session</span>
          </div>
        </div>

        {/* Status notification banner */}
        {qrMessage && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 font-medium ${
              qrMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {qrMessage.type === "success" ? (
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{qrMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Column 1: UPI ID Configuration */}
          <form onSubmit={handleSavePaymentDetails} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading flex items-center justify-between">
                <span>Direct UPI ID</span>
                <span className="text-[10px] text-body font-normal font-sans">
                  e.g. name@okhdfcbank, 9876543210@paytm
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@okbank or 9876543210@upi"
                  className="w-full rounded-xl bg-white border border-border-default pl-3.5 pr-10 py-2.5 text-xs text-heading font-mono placeholder:font-sans placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-body/50 pointer-events-none">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[11px] text-body">
                Remuneration is directly credited to the bank account linked with this VPA.
              </p>
            </div>

            {paymentError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                <span>{paymentError}</span>
              </div>
            )}

            {paymentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>UPI ID updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPendingPayment || !upiId.trim()}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-xs disabled:opacity-40 cursor-pointer active:scale-[0.98] inline-flex items-center gap-2"
            >
              {isPendingPayment ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving UPI ID...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Save UPI ID</span>
                </>
              )}
            </button>
          </form>

          {/* Column 2: Payment QR Code Upload & Preview */}
          <div className="space-y-3 p-5 rounded-2xl bg-neutral-50/70 border border-border-default/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-heading flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-accent" />
                <span>Payment QR Code</span>
              </span>

              {paymentQrCodeUrl && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Uploaded
                </span>
              )}
            </div>

            {paymentQrCodeUrl ? (
              <div className="space-y-3.5">
                <div className="relative group w-44 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-primary/20 bg-white p-2 shadow-sm flex items-center justify-center">
                  <Image
                    src={paymentQrCodeUrl}
                    alt="Teacher Payment QR Code"
                    width={160}
                    height={160}
                    className="object-contain w-full h-full rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
                    <a
                      href={paymentQrCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white text-heading hover:bg-neutral-100 transition-all shadow-xs"
                      title="View full image"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => qrFileInputRef.current?.click()}
                    disabled={isUploadingQr}
                    className="px-3.5 py-1.5 rounded-xl border border-border-default bg-white hover:bg-neutral-50 text-heading text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingQr ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-body" />
                    )}
                    <span>Replace QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveQrCode}
                    disabled={isRemovingQr}
                    className="px-3 py-1.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {isRemovingQr ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => qrFileInputRef.current?.click()}
                className="border-2 border-dashed border-border-default hover:border-primary/60 rounded-2xl p-6 text-center transition-all cursor-pointer bg-white hover:bg-primary-subtle/10 group space-y-2"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-100 group-hover:bg-primary-subtle flex items-center justify-center transition-colors">
                  {isUploadingQr ? (
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                  ) : (
                    <QrCode className="w-6 h-6 text-body/70 group-hover:text-primary transition-colors" />
                  )}
                </div>
                <p className="text-xs font-bold text-heading group-hover:text-primary transition-colors">
                  {isUploadingQr ? "Uploading QR Code..." : "Click or Drag & Drop to Upload QR Code"}
                </p>
                <p className="text-[11px] text-body/70 max-w-xs mx-auto">
                  Upload screenshot of your Google Pay, PhonePe, Paytm, or BHIM QR code (PNG, JPG, WebP up to 5MB).
                </p>
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={qrFileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={handleQrFileSelected}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Security & Password Form */}
      <div className="rounded-2xl border border-border-default bg-white p-6 shadow-xs space-y-6">
        <div className="border-b border-border-default pb-4">
          <h2 className="font-serif text-lg font-bold text-heading flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>Security & Authentication</span>
          </h2>
          <p className="text-xs text-body mt-0.5">
            Manage your account password and security credentials.
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          {passwordError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
            <p className="text-[11px] text-body">
              Minimum 8 characters.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-heading">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPendingPassword}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border-default bg-white hover:bg-neutral-50 text-heading text-xs font-bold transition-all shadow-xs active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {isPendingPassword ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Change Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
