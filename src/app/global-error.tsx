"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 antialiased font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-block px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs uppercase tracking-widest font-semibold">
            System Alert
          </div>

          <h1 className="text-3xl font-serif text-white tracking-tight">
            Gandharva Platform Interrupted
          </h1>

          <p className="text-neutral-400 text-sm leading-relaxed">
            A critical error occurred while loading the application shell.
            Please refresh the application or click below to retry.
          </p>

          <div>
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 rounded-xl bg-[#9506ee] hover:bg-[#8200da] text-white font-medium text-sm transition-all shadow-lg"
            >
              Reload Platform
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
