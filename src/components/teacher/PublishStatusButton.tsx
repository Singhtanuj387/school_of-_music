"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { togglePublishTeacherProfileAction } from "@/actions/teacher";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

interface PublishStatusButtonProps {
  initialPublished: boolean;
  canPublish: boolean;
  blockReason?: string;
  size?: "sm" | "md";
}

export function PublishStatusButton({
  initialPublished,
  canPublish,
  blockReason,
  size = "md",
}: PublishStatusButtonProps) {
  const [isPublished, setIsPublished] = useState(initialPublished);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleToggle = () => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await togglePublishTeacherProfileAction();
      if (res.success && res.data) {
        setIsPublished(res.data.isPublished);
        setSuccess(res.message || "Status updated successfully!");
        router.refresh();
      } else {
        setError(res.error || "Failed to update publish status.");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending || (!isPublished && !canPublish)}
          title={!isPublished && !canPublish ? blockReason : undefined}
          className={`rounded-xl font-bold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
            size === "sm" ? "px-3.5 py-2 text-xs" : "px-4 py-2.5 text-sm"
          } ${
            isPublished
              ? "border border-border-default bg-white text-heading hover:bg-neutral-50 shadow-xs"
              : canPublish
                ? "bg-primary hover:bg-primary-dark text-white shadow-xs"
                : "bg-neutral-100 text-body/50 border border-neutral-200 cursor-not-allowed"
          }`}
        >
          {isPending ? (
            <span>Updating...</span>
          ) : isPublished ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Unpublish Profile</span>
            </>
          ) : (
            <>
              <span>Publish Profile Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {error && (
        <span className="text-[11px] text-red-600 max-w-xs text-right font-medium">
          {error}
        </span>
      )}

      {success && (
        <span className="text-[11px] text-emerald-600 max-w-xs text-right font-medium">
          {success}
        </span>
      )}
    </div>
  );
}
