"use client";

import { useState, useRef, useEffect, useTransition, useCallback } from "react";
import {
  Send,
  Paperclip,
  ClipboardList,
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  Music2,
  Shield,
  Loader2,
  X,
} from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { sendMessage, getMessages, markMessagesAsRead } from "@/actions/messaging";
import type { MessageItem, SendMessageInput } from "@/actions/messaging";
import { MessageType } from "@/types";

type ChatWindowProps = {
  conversationId: string;
  otherUserName: string;
  otherUserImage: string | null;
  instrument: string | null;
  initialMessages: MessageItem[];
  callerRole: "TEACHER" | "STUDENT";
  onBack?: () => void;
};

export function ChatWindow({
  conversationId,
  otherUserName,
  otherUserImage,
  instrument,
  initialMessages,
  callerRole,
  onBack,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [piiWarning, setPiiWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on initial load and new messages
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    scrollToBottom("instant");
    // Mark messages as read
    markMessagesAsRead(conversationId);
  }, [conversationId, scrollToBottom]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Detect scroll position for "scroll to bottom" button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;
      setShowScrollDown(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await getMessages(conversationId);
        if (result.messages.length > 0) {
          setMessages(result.messages);
          markMessagesAsRead(conversationId);
        }
      } catch {
        // Silent failure for polling
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [conversationId]);

  const handleSend = async () => {
    const text = inputText.trim();
    if (!text || isPending) return;

    setError(null);
    setPiiWarning(null);
    setInputText("");

    // Optimistic update
    const optimisticMsg: MessageItem = {
      id: `temp-${Date.now()}`,
      senderId: "me",
      senderName: "You",
      messageType: "TEXT" as MessageType,
      body: text,
      fileName: null,
      fileUrl: null,
      fileSizeBytes: null,
      isRead: false,
      createdAt: new Date(),
      isMine: true,
    };

    setMessages((prev) => [optimisticMsg, ...prev]);
    scrollToBottom();

    startTransition(async () => {
      const input: SendMessageInput = {
        conversationId,
        body: text,
        messageType: "TEXT" as MessageType,
      };

      const result = await sendMessage(input);

      if (result.success) {
        if (result.piiWarning) {
          setPiiWarning(result.piiWarning);
          setTimeout(() => setPiiWarning(null), 6000);
        }
        // Refresh messages to get server-sanitized version
        const refreshed = await getMessages(conversationId);
        setMessages(refreshed.messages);
      } else {
        setError(result.error);
        // Remove optimistic message
        setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
        setInputText(text); // Restore input
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Validate file type client-side
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF and DOC/DOCX files are allowed.");
      return;
    }

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size cannot exceed 10MB.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name}…`);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setUploadProgress("Sending file message…");

      // Send as a FILE message
      const input: SendMessageInput = {
        conversationId,
        body: `Shared file: ${data.fileName}`,
        messageType: "FILE" as MessageType,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        fileSizeBytes: data.fileSizeBytes,
      };

      const result = await sendMessage(input);

      if (result.success) {
        const refreshed = await getMessages(conversationId);
        setMessages(refreshed.messages);
        scrollToBottom();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload file.",
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleSendAssignment = async () => {
    if (callerRole !== "TEACHER") return;

    const desc = inputText.trim();
    if (!desc) {
      setError("Please type an assignment description before sending.");
      return;
    }

    setError(null);
    setPiiWarning(null);
    setInputText("");

    startTransition(async () => {
      const input: SendMessageInput = {
        conversationId,
        body: desc,
        messageType: "ASSIGNMENT" as MessageType,
        fileName: "Assignment",
        fileUrl: "#",
      };

      const result = await sendMessage(input);

      if (result.success) {
        const refreshed = await getMessages(conversationId);
        setMessages(refreshed.messages);
        scrollToBottom();
      } else {
        setError(result.error);
        setInputText(desc);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  // Group messages by date
  const groupedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-bg-alt/10 via-bg to-bg">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-border-subtle shadow-xs">
        {onBack && (
          <button
            onClick={onBack}
            className="btn-tactile p-1.5 rounded-lg hover:bg-bg-alt/50 text-body transition-colors md:hidden"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}

        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-cta flex items-center justify-center text-white text-[11px] font-bold uppercase">
            {otherUserName.slice(0, 2)}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-heading truncate">
            {otherUserName}
          </p>
          {instrument && (
            <p className="text-[10px] text-body-muted flex items-center gap-1">
              <Music2 className="w-2.5 h-2.5" />
              {instrument}
            </p>
          )}
        </div>

        {/* Privacy badge */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-success-muted border border-success/20">
          <Shield className="w-3 h-3 text-success" />
          <span className="text-[9px] font-bold text-success uppercase tracking-wider">
            Secure
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1 relative"
      >
        {/* Privacy notice */}
        <div className="flex justify-center mb-4">
          <div className="px-3 py-1.5 rounded-full bg-info-muted border border-info/20 flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-info" />
            <span className="text-[10px] text-info font-medium">
              Messages are monitored. Personal contact information is
              automatically filtered.
            </span>
          </div>
        </div>

        {groupedMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-subtle flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-bold text-heading mb-1">
              Start the conversation
            </p>
            <p className="text-xs text-body-muted max-w-[240px] leading-relaxed">
              Send a message to {otherUserName} about your{" "}
              {instrument || "music"} lessons.
            </p>
          </div>
        )}

        {groupedMessages.map((msg) => (
          <MessageBubble
            key={msg.id}
            body={msg.body}
            messageType={msg.messageType}
            fileName={msg.fileName}
            fileUrl={msg.fileUrl}
            fileSizeBytes={msg.fileSizeBytes}
            isMine={msg.isMine}
            isRead={msg.isRead}
            senderName={msg.senderName}
            createdAt={msg.createdAt}
          />
        ))}

        <div ref={messagesEndRef} />

        {/* Scroll to bottom button */}
        {showScrollDown && (
          <button
            onClick={() => scrollToBottom()}
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white border border-border-subtle shadow-md flex items-center justify-center text-body hover:text-primary transition-colors"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15 flex items-center gap-2 animate-fade-in-up">
          <Loader2 className="w-3.5 h-3.5 text-primary animate-spin shrink-0" />
          <p className="text-[11px] text-primary font-medium flex-1">
            {uploadProgress}
          </p>
          <button
            onClick={() => {
              setIsUploading(false);
              setUploadProgress(null);
            }}
            className="p-0.5 rounded hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* PII Warning */}
      {piiWarning && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-xl bg-warning-muted border border-warning/20 flex items-start gap-2 animate-fade-in-up">
          <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
          <p className="text-[11px] text-warning leading-relaxed">
            {piiWarning}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 rounded-xl bg-error-muted border border-error/20 flex items-start gap-2 animate-fade-in-up">
          <AlertTriangle className="w-3.5 h-3.5 text-error shrink-0 mt-0.5" />
          <p className="text-[11px] text-error leading-relaxed">{error}</p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t border-border-subtle">
        <div className="flex items-end gap-2">
          {/* Attachment button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isPending}
            className={`btn-tactile p-2 rounded-xl transition-colors shrink-0 ${
              isUploading
                ? "text-primary animate-pulse"
                : "hover:bg-bg-alt/50 text-body-muted hover:text-primary"
            }`}
            title="Attach file (PDF, DOC)"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Paperclip className="w-4 h-4" />
            )}
          </button>

          {/* Assignment button (teachers only) */}
          {callerRole === "TEACHER" && (
            <button
              onClick={handleSendAssignment}
              disabled={isPending}
              className="btn-tactile p-2 rounded-xl hover:bg-accent-subtle text-body-muted hover:text-accent-dark transition-colors shrink-0"
              title="Send assignment"
            >
              <ClipboardList className="w-4 h-4" />
            </button>
          )}

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              rows={1}
              className="w-full px-4 py-2.5 rounded-2xl bg-bg-alt/30 border border-border-subtle text-sm text-heading placeholder:text-body-muted focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              style={{ maxHeight: "120px" }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isPending}
            className={`btn-tactile p-2.5 rounded-xl transition-all shrink-0 ${
              inputText.trim() && !isPending
                ? "bg-primary text-white shadow-sm hover:bg-primary-hover"
                : "bg-bg-alt/50 text-body-muted cursor-not-allowed"
            }`}
            title="Send message"
          >
            <Send className={`w-4 h-4 ${isPending ? "animate-pulse" : ""}`} />
          </button>
        </div>

        {/* Character hint */}
        <p className="text-[9px] text-body-muted mt-1.5 px-1">
          Press Enter to send · Shift+Enter for new line · 📎 PDF/DOC up to
          10MB · Personal info is auto-filtered
        </p>
      </div>
    </div>
  );
}

