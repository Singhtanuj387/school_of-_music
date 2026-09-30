"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error("Runtime application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 overflow-hidden">
      {/* Background ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, #ef4444 0%, rgba(20, 20, 20, 0) 70%)",
        }}
      />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-medium tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span>Application Error</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-text-primary tracking-tight mb-4">
          A Moment of Discordance
        </h1>

        <p className="text-text-secondary text-sm sm:text-base mb-6 leading-relaxed">
          An unexpected interruption occurred while rendering this page.
          Your data and room connections remain safe.
        </p>

        {error.digest && (
          <div className="mb-6 p-2 rounded bg-surface-1 border border-surface-2 text-text-tertiary text-xs font-mono select-all">
            Digest: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-surface-3 hover:border-surface-4 bg-surface-1 text-text-primary font-medium text-sm transition-all text-center"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
