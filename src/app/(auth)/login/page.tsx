"use client";

import { useActionState, useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { loginAction, sendPhoneOtpAction, verifyOtpAndLoginAction } from "@/actions/auth";
import { SplitHeading } from "@/components/ui/SplitHeading";
import {
  KeyRound,
  Smartphone,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<"PASSWORD" | "OTP">("PASSWORD");

  // Password state
  const [pwdState, pwdFormAction, isPwdPending] = useActionState(loginAction, {
    success: false,
  });

  // OTP state
  const [otpPhone, setOtpPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpBanner, setOtpBanner] = useState<{ message: string; previewCode?: string } | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isSendingOtp, startSendOtpTransition] = useTransition();

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

  const handleSendOtp = () => {
    setOtpError(null);
    setOtpBanner(null);

    if (!otpPhone.trim()) {
      setOtpError("Please enter your mobile phone number.");
      return;
    }

    startSendOtpTransition(async () => {
      const res = await sendPhoneOtpAction(otpPhone, "LOGIN");
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
    setOtpCode(code);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-bg via-bg-alt/25 to-bg px-4 pt-16 sm:pt-20 pb-16">
      <div className="relative w-full max-w-md space-y-7 overflow-hidden rounded-3xl border border-surface-muted/80 bg-white p-6 sm:p-9 shadow-xl shadow-primary/5 backdrop-blur-sm">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cta text-white shadow-md shadow-primary/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="white" />
              <circle cx="18" cy="16" r="3" fill="white" />
            </svg>
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
                className="btn-tactile flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
          <div className="space-y-5 animate-fade-in">
            {/* Error alerts */}
            {(otpError || otpLoginState?.error) && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-xs text-error font-medium"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{otpError || otpLoginState?.error}</span>
              </div>
            )}

            {/* Dev mode OTP preview banner */}
            {otpBanner && (
              <div className="rounded-xl border border-accent/40 bg-accent-subtle/50 p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-accent-dark font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-dark" />
                  <span>{otpBanner.message}</span>
                </div>
                {otpBanner.previewCode && (
                  <div className="flex items-center justify-between pt-1 border-t border-accent/20">
                    <span className="text-[11px] text-body">
                      [Dev Test Code]: <strong className="font-mono text-heading">{otpBanner.previewCode}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAutoFillCode(otpBanner.previewCode!)}
                      className="px-2 py-0.5 rounded-md bg-white border border-accent/40 text-[10px] font-bold text-accent-dark hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      Auto-fill OTP
                    </button>
                  </div>
                )}
              </div>
            )}

            <form action={otpLoginFormAction} className="space-y-4">
              {/* Phone Input with Send OTP button */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-heading mb-1.5"
                >
                  Mobile Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={otpPhone}
                      onChange={(e) => setOtpPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-body/40 shadow-xs transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
                    />
                  </div>
                  <button
                    type="button"
                    disabled={isSendingOtp || resendCooldown > 0 || !otpPhone.trim()}
                    onClick={handleSendOtp}
                    className="px-4 py-2.5 rounded-xl bg-bg-alt hover:bg-neutral-100 border border-border-default text-heading text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isSendingOtp ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                    ) : resendCooldown > 0 ? (
                      <span>Resend in {resendCooldown}s</span>
                    ) : (
                      <span>{otpSent ? "Resend OTP" : "Send OTP"}</span>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-body-muted">
                  Includes international country code (default: +91 for India).
                </p>
              </div>

              {/* 6-Digit OTP Code Input */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-xs font-bold uppercase tracking-wider text-heading mb-1.5"
                >
                  6-Digit Verification Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  required
                  className="block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-center text-lg tracking-[0.4em] font-mono text-heading placeholder:tracking-normal placeholder:font-sans placeholder-body/40 shadow-xs transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
                />
                {otpLoginState?.fieldErrors?.code && (
                  <p className="mt-1.5 text-xs font-medium text-error flex items-center gap-1">
                    <span>•</span>
                    {otpLoginState.fieldErrors.code[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isOtpLoginPending || otpCode.length !== 6}
                className="btn-tactile flex w-full items-center justify-center gap-2 rounded-xl bg-cta py-3 text-sm font-bold text-white shadow-md shadow-cta/20 transition-all hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isOtpLoginPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Verifying code & logging in...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Verify & Sign In</span>
                  </>
                )}
              </button>
            </form>
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
