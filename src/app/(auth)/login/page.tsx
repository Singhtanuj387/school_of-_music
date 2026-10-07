"use client";

import { useActionState, useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { loginAction, sendPhoneOtpAction, verifyOtpAndLoginAction } from "@/actions/auth";
import { SplitHeading } from "@/components/ui/SplitHeading";
import {
  CountryCodeSelector,
  SUPPORTED_COUNTRIES,
  CountryOption,
} from "@/components/ui/CountryCodeSelector";
import {
  KeyRound,
  Smartphone,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<"PASSWORD" | "OTP">("PASSWORD");

  // Password state
  const [pwdState, pwdFormAction, isPwdPending] = useActionState(loginAction, {
    success: false,
  });

  // OTP state
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(SUPPORTED_COUNTRIES[0]); // India (+91)
  const [otpPhone, setOtpPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpBanner, setOtpBanner] = useState<{ message: string; previewCode?: string } | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isSendingOtp, startSendOtpTransition] = useTransition();

  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP form submission
  const [otpLoginState, otpLoginFormAction, isOtpLoginPending] = useActionState(
    verifyOtpAndLoginAction,
    { success: false },
  );

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Autofocus first OTP box when OTP section opens downward
  useEffect(() => {
    if (otpSent) {
      setTimeout(() => {
        digitRefs.current[0]?.focus();
      }, 100);
    }
  }, [otpSent]);

  // Calculate formatted full number for API & display
  const getFullPhoneNumber = () => {
    const rawInput = otpPhone.trim();
    if (rawInput.startsWith("+")) {
      return rawInput;
    }
    const cleanDigits = rawInput.replace(/\D/g, "");
    return `${selectedCountry.dialCode}${cleanDigits}`;
  };

  const handleDigitChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    if (digit && index < 5) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        e.preventDefault();
        const nextDigits = [...otpDigits];
        nextDigits[index - 1] = "";
        setOtpDigits(nextDigits);
        digitRefs.current[index - 1]?.focus();
      } else {
        const nextDigits = [...otpDigits];
        nextDigits[index] = "";
        setOtpDigits(nextDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      digitRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) {
      const nextDigits = ["", "", "", "", "", ""];
      for (let i = 0; i < 6; i++) {
        nextDigits[i] = pasted[i] || "";
      }
      setOtpDigits(nextDigits);
      const focusIdx = Math.min(pasted.length, 5);
      digitRefs.current[focusIdx]?.focus();
    }
  };

  const handleSendOtp = () => {
    setOtpError(null);
    setOtpBanner(null);

    const cleanDigits = otpPhone.replace(/\D/g, "");
    if (!cleanDigits) {
      setOtpError("Please enter your mobile phone number.");
      return;
    }

    if (cleanDigits.length < 6) {
      setOtpError("Please enter a valid phone number.");
      return;
    }

    const fullNumber = getFullPhoneNumber();

    startSendOtpTransition(async () => {
      const res = await sendPhoneOtpAction(fullNumber, "LOGIN");
      if (!res.success) {
        setOtpError(res.error || "Failed to dispatch verification code.");
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

  const handleAutoFillCode = (code: string) => {
    const digits = code.replace(/\D/g, "").slice(0, 6).split("");
    const nextDigits = ["", "", "", "", "", ""];
    digits.forEach((d, i) => {
      nextDigits[i] = d;
    });
    setOtpDigits(nextDigits);
    digitRefs.current[5]?.focus();
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-bg via-bg-alt/25 to-bg px-4 pt-16 sm:pt-20 pb-16">
      <div className="relative w-full max-w-md space-y-7 overflow-hidden rounded-3xl border border-surface-muted/80 bg-white p-6 sm:p-9 shadow-xl shadow-primary/5 backdrop-blur-sm">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

        {/* Header: Official Gandharva School of Music Logo */}
        <div className="space-y-3 text-center">
          <div className="mx-auto flex items-center justify-center py-2 px-5 rounded-2xl bg-heading shadow-md shadow-heading/20 border border-white/10 w-fit transition-transform hover:scale-[1.02]">
            <Image
              src="/cropped-Add-a-subheading-5-png-scaled.webp"
              alt="Gandharva School of Music"
              width={160}
              height={44}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
          </div>
          <SplitHeading
            as="h1"
            firstClause="Welcome"
            accentClause="Back"
            align="center"
            size="md"
          />
          <p className="text-xs sm:text-sm text-body">
            Sign in to Gandharva School of Music to continue your lessons
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="p-1 rounded-2xl bg-bg-alt/80 border border-border-subtle grid grid-cols-2 gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setLoginMode("PASSWORD");
              setOtpError(null);
            }}
            className={`btn-tactile py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === "PASSWORD"
                ? "bg-white text-heading shadow-xs border border-border-default/60"
                : "text-body hover:text-heading"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-primary" />
            <span>Login with Password</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginMode("OTP");
              setOtpError(null);
            }}
            className={`btn-tactile py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              loginMode === "OTP"
                ? "bg-white text-heading shadow-xs border border-border-default/60"
                : "text-body hover:text-heading"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-cta" />
            <span>Login with OTP</span>
          </button>
        </div>

        {/* ─── TAB 1: PASSWORD LOGIN ────────────────────────────────────── */}
        {loginMode === "PASSWORD" && (
          <div className="space-y-5">
            {pwdState?.error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-xs text-error font-medium animate-fade-in"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{pwdState.error}</span>
              </div>
            )}

            <form action={pwdFormAction} className="space-y-4">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-xs font-bold uppercase tracking-wider text-heading mb-1.5"
                >
                  Email or Mobile Phone
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="e.g. clara@example.com or +91 98765 43210"
                  className="block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-body/40 shadow-xs transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
                />
                {pwdState?.fieldErrors?.identifier && (
                  <p className="mt-1.5 text-xs font-medium text-error flex items-center gap-1">
                    <span>•</span>
                    {pwdState.fieldErrors.identifier[0]}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-heading"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-cta hover:text-cta-hover transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-body/40 shadow-xs transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
                />
                {pwdState?.fieldErrors?.password && (
                  <p className="mt-1.5 text-xs font-medium text-error flex items-center gap-1">
                    <span>•</span>
                    {pwdState.fieldErrors.password[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPwdPending}
                className="btn-tactile flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isPwdPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In with Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ─── TAB 2: OTP LOGIN ─────────────────────────────────────────── */}
        {loginMode === "OTP" && (
          <div className="space-y-4 animate-fade-in">
            {/* Global Error Alerts */}
            {otpError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-xs text-error font-medium animate-fade-in"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{otpError}</span>
              </div>
            )}

            {otpLoginState?.error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-xs text-error font-medium animate-fade-in"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{otpLoginState.error}</span>
              </div>
            )}

            {/* Mobile Phone Number Input Container */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-heading"
                >
                  Mobile Phone Number
                </label>
                {otpSent && (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpDigits(["", "", "", "", "", ""]);
                      setOtpError(null);
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    Change number
                  </button>
                )}
              </div>

              {/* Country Code Selector + Phone Input Container (Matching Attached Screenshot) */}
              <div className="flex items-center rounded-xl border border-surface-muted/90 bg-white shadow-xs transition-all focus-within:border-cta focus-within:ring-4 focus-within:ring-cta/15">
                <CountryCodeSelector
                  selectedCountry={selectedCountry}
                  onSelect={(country) => {
                    setSelectedCountry(country);
                    setOtpError(null);
                  }}
                />
                <div className="h-6 w-px bg-border-default/80 shrink-0" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  value={otpPhone}
                  onChange={(e) => {
                    setOtpPhone(e.target.value);
                    setOtpError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !otpSent) {
                      e.preventDefault();
                      handleSendOtp();
                    }
                  }}
                  placeholder="Enter a phone number"
                  required
                  className="block flex-1 border-0 bg-transparent px-3.5 py-2.5 text-sm text-heading placeholder-body/40 focus:outline-none focus:ring-0"
                />
              </div>
              <p className="mt-1 text-[11px] text-body-muted">
                Includes country code: <strong className="font-mono text-heading">{selectedCountry.dialCode}</strong> ({selectedCountry.name})
              </p>
            </div>

            {/* State A: Before OTP is sent -> "Get OTP" Button */}
            {!otpSent && (
              <button
                type="button"
                disabled={isSendingOtp || !otpPhone.trim()}
                onClick={handleSendOtp}
                className="btn-tactile w-full py-3 px-6 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-500 active:scale-[0.98] text-amber-950 shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-950" />
                    <span>Sending OTP code...</span>
                  </>
                ) : (
                  <span>Get OTP</span>
                )}
              </button>
            )}

            {/* State B: After OTP is sent -> Opens DOWNWARD inline matching the user's screenshot */}
            {otpSent && (
              <div className="space-y-4 pt-1 animate-fade-in">
                {/* Dev mode OTP preview banner */}
                {otpBanner && (
                  <div className="rounded-xl border border-accent/40 bg-accent-subtle/50 p-2.5 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-accent-dark font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-dark" />
                      <span>{otpBanner.message}</span>
                    </div>
                    {otpBanner.previewCode && (
                      <div className="flex items-center justify-between pt-1 border-t border-accent/20">
                        <span className="text-[10px] text-body">
                          [Dev Test Code]: <strong className="font-mono text-heading">{otpBanner.previewCode}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAutoFillCode(otpBanner.previewCode!)}
                          className="px-2 py-0.5 rounded-md bg-white border border-accent/40 text-[10px] font-bold text-accent-dark hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          Auto-fill
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Verification Form */}
                <form action={otpLoginFormAction} className="space-y-4">
                  <input type="hidden" name="phone" value={getFullPhoneNumber()} />
                  <input type="hidden" name="code" value={otpDigits.join("")} />

                  <div>
                    {/* Header Label: OTP */}
                    <label className="block text-sm font-bold text-heading mb-2">
                      OTP
                    </label>

                    {/* 6 Individual Digit Input Boxes (Matching screenshot) */}
                    <div
                      className="otp-digit-grid grid grid-cols-6 gap-2 sm:gap-2.5 w-full"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                        gap: "8px",
                        width: "100%",
                      }}
                    >
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            digitRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(index, e.target.value)}
                          onKeyDown={(e) => handleDigitKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="otp-digit-input h-12 sm:h-14 w-full rounded-lg sm:rounded-xl border border-gray-300 bg-white text-center text-xl sm:text-2xl font-mono font-bold text-heading shadow-xs transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                          style={{
                            height: "52px",
                            textAlign: "center",
                          }}
                        />
                      ))}
                    </div>

                    {otpLoginState?.fieldErrors?.code && (
                      <p className="mt-1.5 text-xs font-medium text-error">
                        {otpLoginState.fieldErrors.code[0]}
                      </p>
                    )}
                  </div>

                  {/* Did not receive OTP? Resend OTP (27s) */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="font-semibold text-heading">
                      Did not receive OTP?
                    </span>
                    {resendCooldown > 0 ? (
                      <span className="text-body-muted flex items-center gap-1">
                        <span className="text-blue-500 font-medium">Resend OTP</span>
                        <span className="text-body-muted font-normal">
                          ({resendCooldown}s)
                        </span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="text-blue-600 font-semibold hover:underline cursor-pointer transition-colors"
                      >
                        {isSendingOtp ? "Sending..." : "Resend OTP"}
                      </button>
                    )}
                  </div>

                  {/* Golden / Amber "Login" Button matching user's reference image */}
                  <button
                    type="submit"
                    disabled={isOtpLoginPending || otpDigits.join("").length !== 6}
                    className="btn-tactile w-full py-3 sm:py-3.5 px-6 rounded-xl font-bold text-base bg-[#FFB800] hover:bg-[#F59E0B] active:scale-[0.98] text-[#1E1A4D] shadow-md shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isOtpLoginPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#1E1A4D]" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="relative pt-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-body/60 font-semibold tracking-wider">or</span>
          </div>
        </div>

        {/* Google OAuth button */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/api/auth/signin/google";
          }}
          className="btn-tactile flex w-full items-center justify-center gap-3 rounded-xl border border-surface-muted/90 bg-white py-2.5 px-4 text-sm font-semibold text-heading shadow-xs transition-all hover:border-cta/40 hover:bg-bg-alt/25 cursor-pointer"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer link */}
        <p className="text-center text-xs text-body">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-bold text-cta hover:text-cta-hover transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
