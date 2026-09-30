"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@livekit/components-react";

interface LessonChatProps {
  isOpen: boolean;
  onClose: () => void;
  isTeacher: boolean;
  participantName: string;
  onNewMessage?: (count: number) => void;
}

// Comprehensive PII patterns for student and teacher safety
const PII_RULES = [
  {
    type: "phone",
    label: "phone number",
    pattern: /(?:(?:\+|00)\d{1,3}[\s.-]*)?(?:\(?\d{2,5}\)?[\s.-]*)?\d{3,5}[\s.-]*\d{3,5}/,
    customCheck: (text: string) => {
      // Check for 10 or more contiguous or space/dash-separated digits
      const digitsOnly = text.replace(/\D/g, "");
      return digitsOnly.length >= 10;
    },
  },
  {
    type: "email",
    label: "email address",
    pattern: /[a-zA-Z0-9._%+-]+(?:\s*@\s*|\s*\[at\]\s*|\s*\(at\)\s*)[a-zA-Z0-9.-]+(?:\s*\.\s*|\s*\[dot\]\s*|\s*\(dot\)\s*)[a-zA-Z]{2,}/i,
  },
  {
    type: "social",
    label: "social media handle or external app",
    pattern: /(?:instagram|insta|ig|snapchat|snap|telegram|tg|whatsapp|wa|facebook|fb|twitter|tiktok|discord|zoom|skype|wechat|linkedin)[\s:@./_-]*[\w.-]+/i,
  },
  {
    type: "handle",
    label: "handle (@username)",
    pattern: /(^|\s)@[\w.]{3,30}\b/,
  },
  {
    type: "url",
    label: "external link or website",
    pattern: /(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*/i,
  },
  {
    type: "domain",
    label: "website link",
    pattern: /\b[a-zA-Z0-9-]+\.(?:com|org|net|io|co|in|edu|gov|xyz|app|me|site|link|info)\b/i,
  },
  {
    type: "address",
    label: "physical street address",
    pattern: /\b\d{1,5}\s+[\w\s]{2,20}\s+(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|ln|drive|dr|court|ct|circle|cir|way)\b/i,
  },
];

/**
 * Validates text against safety policies. Returns detected violation description or null if clean.
 */
function checkPIIViolation(text: string): string | null {
  if (!text || text.trim().length === 0) return null;

  for (const rule of PII_RULES) {
    if (rule.pattern && rule.pattern.test(text)) {
      return rule.label;
    }
    if (rule.customCheck && rule.customCheck(text)) {
      return rule.label;
    }
  }
  return null;
}

const QUICK_EMOJIS = ["👏", "🎵", "👍", "🌟", "🔥", "🙏"];

export function LessonChat({
  isOpen,
  onClose,
  isTeacher,
  participantName,
  onNewMessage,
}: LessonChatProps) {
  const { chatMessages, send, isSending } = useChat();
  const [inputText, setInputText] = useState("");
  const [safetyWarning, setSafetyWarning] = useState<string | null>(null);
  const [isWarningShaking, setIsWarningShaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMsgCountRef = useRef(chatMessages.length);
  const onNewMessageRef = useRef(onNewMessage);

  useEffect(() => {
    onNewMessageRef.current = onNewMessage;
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      setSafetyWarning(null);
    }
  }, [isOpen]);

  // Track unread messages when closed
  useEffect(() => {
    if (!isOpen) {
      if (chatMessages.length > lastMsgCountRef.current) {
        const diff = chatMessages.length - lastMsgCountRef.current;
        lastMsgCountRef.current = chatMessages.length;
        onNewMessageRef.current?.(diff);
      } else if (chatMessages.length < lastMsgCountRef.current) {
        lastMsgCountRef.current = chatMessages.length;
      }
    } else {
      lastMsgCountRef.current = chatMessages.length;
      onNewMessageRef.current?.(0);
    }
  }, [chatMessages.length, isOpen]);

  // Check PII in real-time as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);

    const violation = checkPIIViolation(text);
    if (violation) {
      setSafetyWarning(`Sharing personal info (${violation}) is restricted for student safety.`);
    } else {
      setSafetyWarning(null);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isSending) return;

    // Strict PII filter before dispatch
    const violation = checkPIIViolation(trimmed);
    if (violation) {
      setSafetyWarning(
        `🛡️ Message blocked: Cannot share ${violation}. Personal contact details are not permitted in lesson chat.`,
      );
      setIsWarningShaking(true);
      setTimeout(() => setIsWarningShaking(false), 600);
      inputRef.current?.focus();
      return;
    }

    try {
      await send(trimmed);
      setInputText("");
      setSafetyWarning(null);
    } catch (err) {
      console.error("Failed to send chat message:", err);
      setSafetyWarning("Failed to send message. Please try again.");
    }
  };

  const handleQuickReaction = (emoji: string) => {
    send(emoji).catch((err) => console.error("Reaction failed:", err));
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Live Lesson Chat"
      className="absolute top-0 right-0 bottom-0 z-40 w-full sm:w-92 md:w-96 bg-[#160A29]/98 backdrop-blur-xl flex flex-col shadow-2xl animate-in slide-in-from-right duration-200 text-stone-100 border-0"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-[#10061E]/90 border-0 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/30 border-0 flex items-center justify-center text-base shadow-sm">
            💬
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-sm text-white leading-tight">
                Studio Lesson Chat
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-accent font-mono font-medium">
              Live Secure Channel
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-[#2A124A] border-0 transition-all cursor-pointer active:scale-95"
          title="Close Chat"
        >
          ✕
        </button>
      </div>

      {/* Safety Policy Info Banner */}
      <div className="px-3.5 py-2 bg-[#10061E]/70 border-0 flex items-center gap-2 text-[10.5px] text-stone-400">
        <span className="text-accent font-bold flex-shrink-0">🛡️</span>
        <span className="leading-snug">
          Safety Protected: Sharing phone numbers, emails, social handles, or external links is blocked.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 min-h-0">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 space-y-2">
            <span className="text-3xl">🎵</span>
            <p className="text-xs font-serif font-bold text-stone-200">
              Welcome to the Studio Chat!
            </p>
            <p className="text-[11px] text-stone-400 leading-relaxed max-w-[220px]">
              Ask questions about ragas, notes, finger positions, or request sheet reviews during your lesson.
            </p>
          </div>
        ) : (
          chatMessages.map((msg, index) => {
            const isSelf = !msg.from || msg.from.isLocal;
            const senderName = isSelf
              ? "You"
              : msg.from?.name || participantName || "Partner";
            const role = isSelf
              ? isTeacher
                ? "Teacher"
                : "Student"
              : isTeacher
              ? "Student"
              : "Teacher";

            return (
              <div
                key={msg.timestamp || index}
                className={`flex flex-col ${isSelf ? "items-end" : "items-start"} space-y-1`}
              >
                {/* Sender name + Role badge + Timestamp */}
                <div className="flex items-center gap-1.5 text-[10px] px-1">
                  <span className="font-semibold text-stone-300">{senderName}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full font-mono text-[9px] font-bold border-0 ${
                      role === "Teacher"
                        ? "bg-accent/15 text-accent"
                        : "bg-cta/20 text-purple-300"
                    }`}
                  >
                    {role}
                  </span>
                  <span className="text-stone-500 font-mono">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs sm:text-[13px] leading-relaxed break-words shadow-md border-0 ${
                    isSelf
                      ? "bg-gradient-to-r from-cta to-cta-hover text-white rounded-tr-none shadow-cta/25"
                      : "bg-[#241040] text-stone-100 rounded-tl-none shadow-black/40"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reactions Bar */}
      <div className="px-3.5 py-1.5 bg-[#10061E]/60 border-0 flex items-center justify-between gap-1 flex-shrink-0">
        <span className="text-[10px] font-mono text-stone-400 font-semibold">Quick:</span>
        <div className="flex items-center gap-1">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleQuickReaction(emoji)}
              className="p-1 text-sm hover:scale-125 transition-transform cursor-pointer rounded hover:bg-[#2A124A] active:scale-95 border-0"
              title={`Send ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Warning Notification */}
      {safetyWarning && (
        <div
          className={`mx-3.5 mb-2 px-3 py-2 rounded-xl bg-rose-950/80 border-0 text-rose-200 text-xs shadow-lg flex items-start gap-2 backdrop-blur-md transition-all ${
            isWarningShaking ? "animate-bounce" : ""
          }`}
        >
          <span className="text-rose-400 font-bold text-sm">⚠️</span>
          <div className="flex-1 leading-snug">
            <p className="font-semibold">{safetyWarning}</p>
          </div>
          <button
            type="button"
            onClick={() => setSafetyWarning(null)}
            className="text-rose-400 hover:text-white text-xs p-0.5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-[#10061E]/95 border-0 flex-shrink-0 space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={
              isTeacher ? "Message student..." : "Ask your teacher a question..."
            }
            maxLength={500}
            className="flex-1 bg-[#241040] text-stone-100 placeholder-stone-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border-0 ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-cta/50 transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isSending || !!safetyWarning}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-md border-0 ${
              !inputText.trim() || isSending || !!safetyWarning
                ? "bg-[#241040] text-stone-500 cursor-not-allowed opacity-60"
                : "bg-cta hover:bg-cta-hover text-white shadow-lg shadow-cta/30"
            }`}
          >
            {isSending ? "..." : "Send"}
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-stone-400 px-1 font-mono">
          <span>Protected Live Channel</span>
          <span>{inputText.length}/500</span>
        </div>
      </form>
    </aside>
  );
}
