"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "@/actions/auth";
import { SplitHeading } from "@/components/ui/SplitHeading";

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, {
    success: false,
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-bg via-bg-alt/25 to-bg px-4 pt-16 sm:pt-20 pb-16">
      <div className="relative w-full max-w-md space-y-6 overflow-hidden rounded-2xl border border-surface-muted/80 bg-white p-8 sm:p-10 shadow-xl shadow-primary/5 backdrop-blur-sm">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cta to-accent" />

        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cta text-white shadow-md shadow-primary/25">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="white" />
              <circle cx="18" cy="16" r="3" fill="white" />
            </svg>
          </div>
          <SplitHeading
            as="h1"
            firstClause="Reset Your"
            accentClause="Password"
            align="center"
            size="md"
          />
          <p className="text-xs sm:text-sm text-body">
            Enter your email to receive a single-use 30-minute password reset link
          </p>
        </div>

        {state?.error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-error/30 bg-error-muted/40 p-3.5 text-sm text-error"
          >
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{state.error}</span>
          </div>
        )}

        {state?.success ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-success/30 bg-success-muted/50 p-4 text-sm text-success font-medium">
              {state.message}
            </div>

            {state.previewUrl && (
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-left">
                <p className="text-xs font-bold text-accent-dark uppercase tracking-wider">
                  [Dev Mode] Password Reset Link:
                </p>
                <a
                  href={state.previewUrl}
                  className="mt-1.5 block break-all text-xs text-accent-dark underline hover:text-accent font-mono"
                >
                  {state.previewUrl}
                </a>
              </div>
            )}

            <Link
              href="/login"
              className="btn-tactile block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form action={formAction} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-heading mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="block w-full rounded-xl border border-surface-muted/90 bg-white px-3.5 py-2.5 text-sm text-heading placeholder-body/40 shadow-sm transition-all focus:border-cta focus:outline-none focus:ring-4 focus:ring-cta/15"
              />
              {state?.fieldErrors?.email && (
                <p className="mt-1.5 text-xs font-medium text-error flex items-center gap-1">
                  <span>•</span>
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn-tactile flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Sending link...</span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-xs font-bold text-cta hover:text-cta-hover transition-colors"
              >
                Remembered your password? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

