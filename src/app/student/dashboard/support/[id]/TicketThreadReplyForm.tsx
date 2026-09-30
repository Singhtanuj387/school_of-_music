"use client";

import { useState, useTransition } from "react";
import { replyToTicketAction } from "@/actions/support";
import { Send, Loader2 } from "lucide-react";

export function TicketThreadReplyForm({ ticketId }: { ticketId: string }) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setErrorMsg(null);
    startTransition(async () => {
      const res = await replyToTicketAction({
        ticketId,
        message,
      });

      if (!res.success) {
        setErrorMsg(res.error || "Failed to send reply.");
      } else {
        setMessage("");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pt-4 border-t border-border-subtle">
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium">
          {errorMsg}
        </div>
      )}

      <div className="relative">
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your response to the academy administration..."
          className="w-full p-3 pr-24 rounded-xl bg-white border border-border-default text-xs text-heading placeholder:text-body-muted/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none transition-all"
        />
        <button
          type="submit"
          disabled={isPending || !message.trim()}
          className="absolute right-2.5 bottom-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold transition-all shadow-xs disabled:opacity-40 btn-tactile cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <Send className="w-3.5 h-3.5" /> Send
            </>
          )}
        </button>
      </div>
    </form>
  );
}
