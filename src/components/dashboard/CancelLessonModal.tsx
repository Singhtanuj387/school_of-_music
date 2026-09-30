"use client";

import { useState, useTransition } from "react";
import { cancelLessonAction } from "@/actions/lesson";
import { CANCELLATION_NOTICE_HOURS } from "@/types";
import { getSyncedInternetTime } from "@/lib/synced-time";

interface CancelLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    id: string;
    instrument: string;
    startsAt: string;
    partnerName: string;
    isTeacher: boolean;
  };
  onSuccess?: () => void;
}

export function CancelLessonModal({
  isOpen,
  onClose,
  lesson,
  onSuccess,
}: CancelLessonModalProps) {
  const [reason, setReason] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const now = getSyncedInternetTime();
  const startsAtTime = new Date(lesson.startsAt).getTime();
  const hoursRemaining = (startsAtTime - now) / (1000 * 60 * 60);
  const isShortNotice = lesson.isTeacher && hoursRemaining < CANCELLATION_NOTICE_HOURS;

  const handleConfirmCancel = () => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await cancelLessonAction({
        lessonId: lesson.id,
        reason: reason.trim(),
      });

      if (!res.success) {
        setErrorMsg(res.error || "Failed to cancel lesson. Please try again.");
      } else {
        onSuccess?.();
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/25 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-surface-muted/90 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-left">
        {/* Title */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold font-serif text-heading">
              Cancel Lesson
            </h3>
            <p className="text-xs text-body mt-0.5">
              {lesson.instrument} lesson with {lesson.partnerName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-body hover:text-heading p-1 text-sm rounded-lg hover:bg-bg-alt/40 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 24-Hour Notice Warning for Teachers */}
        {isShortNotice ? (
          <div className="p-4 bg-error-muted/40 border border-error/30 rounded-xl space-y-1.5 text-xs text-error">
            <div className="flex items-center gap-2 font-bold">
              <span>⚠️</span>
              <span>Less than 24 hours notice</span>
            </div>
            <p className="leading-relaxed">
              Cancelling with under 24 hours notice significantly disrupts your
              student&apos;s scheduled practice and preparation time. Please
              provide a clear explanation below.
            </p>
          </div>
        ) : (
          <p className="text-xs text-body leading-relaxed">
            Cancelling will remove this session from both your schedule and your
            partner&apos;s calendar. The time slot will immediately reopen for
            booking.
          </p>
        )}

        {/* Reason Textarea */}
        <div className="space-y-1.5 text-xs">
          <label className="text-heading font-bold uppercase tracking-wider text-[11px]">
            Reason for cancellation (optional):
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              isShortNotice
                ? "Please explain the reason for late cancellation..."
                : "e.g. Schedule conflict, illness..."
            }
            className="w-full bg-white border border-surface-muted/90 rounded-xl p-3 text-heading placeholder-body/40 focus:outline-none focus:border-cta focus:ring-4 focus:ring-cta/15 text-xs transition-all shadow-xs"
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 bg-error-muted/50 border border-error/30 text-xs text-error rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="btn-tactile flex-1 py-2.5 px-4 rounded-xl bg-bg-alt/40 hover:bg-bg-alt border border-surface-muted/80 text-heading font-bold text-xs transition-all"
          >
            Keep Lesson
          </button>
          <button
            type="button"
            onClick={handleConfirmCancel}
            disabled={isPending}
            className="btn-tactile flex-1 py-2.5 px-4 rounded-xl bg-error hover:bg-error/90 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-error/20 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Cancelling...</span>
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

