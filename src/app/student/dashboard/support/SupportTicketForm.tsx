"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTicketAction } from "@/actions/support";
import { TicketCategory } from "@/types";
import { Plus, X, Send, Loader2 } from "lucide-react";

export function SupportTicketForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<TicketCategory>(TicketCategory.LESSON);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    startTransition(async () => {
      const res = await createTicketAction({
        subject,
        category,
        message,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Failed to create ticket.");
      } else if (res.ticketId) {
        setSubject("");
        setMessage("");
        setIsOpen(false);
        router.push(`/student/dashboard/support/${res.ticketId}`);
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold transition-all shadow-sm shadow-primary/20 btn-tactile cursor-pointer"
      >
        <Plus className="w-4 h-4" /> Open New Support Ticket
      </button>
    );
  }

  return (
    <div className="p-6 rounded-2xl border border-border-default bg-white shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <h3 className="text-sm font-bold text-heading">Create Support Ticket</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 text-body-muted hover:text-heading transition-colors btn-tactile cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-heading mb-1">
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your inquiry..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading placeholder:text-body-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-heading mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            >
              <option value="LESSON">Lesson & Scheduling</option>
              <option value="BILLING">Billing & Payments</option>
              <option value="COURSE">Course Curriculum</option>
              <option value="TECHNICAL">Technical & Video Room</option>
              <option value="OTHER">General Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-heading mb-1">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Provide relevant details so our team can assist you quickly..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-border-default text-xs text-heading placeholder:text-body-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none transition-all"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3.5 py-2 rounded-xl border border-border-default hover:bg-bg-alt/30 text-body text-xs font-semibold transition-colors btn-tactile cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold transition-all shadow-sm shadow-primary/20 btn-tactile disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Submit Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
