"use client";

import { useState } from "react";
import { Search, MessageSquarePlus, Music2 } from "lucide-react";
import type { ConversationListItem, MessageableUser } from "@/actions/messaging";

type ConversationListProps = {
  conversations: ConversationListItem[];
  messageableUsers: MessageableUser[];
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onStartNewConversation: (userId: string) => void;
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export function ConversationList({
  conversations,
  messageableUsers,
  activeConversationId,
  onSelectConversation,
  onStartNewConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Users who don't have a conversation yet
  const newContactUsers = messageableUsers.filter(
    (u) => !u.hasExistingConversation,
  );

  const filteredNewContacts = newContactUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-border-subtle">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-border-subtle">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-heading tracking-tight">
            Messages
          </h2>
          {newContactUsers.length > 0 && (
            <button
              onClick={() => setShowNewChat(!showNewChat)}
              className="btn-tactile p-1.5 rounded-lg hover:bg-bg-alt/50 text-body hover:text-primary transition-colors"
              title="New conversation"
            >
              <MessageSquarePlus className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-body-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search conversations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-bg-alt/30 border border-border-subtle text-xs text-heading placeholder:text-body-muted focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* New Chat Panel */}
      {showNewChat && filteredNewContacts.length > 0 && (
        <div className="px-3 py-2 border-b border-border-subtle bg-cta-subtle/30">
          <p className="text-[10px] uppercase tracking-wider font-bold text-body-muted mb-2 px-1">
            Start a new conversation
          </p>
          {filteredNewContacts.map((user) => (
            <button
              key={user.id}
              onClick={() => {
                onStartNewConversation(user.id);
                setShowNewChat(false);
              }}
              className="btn-tactile w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/80 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white text-[10px] font-bold uppercase shrink-0">
                {user.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-heading truncate">
                  {user.name}
                </p>
                {user.instrument && (
                  <p className="text-[10px] text-body-muted flex items-center gap-1">
                    <Music2 className="w-2.5 h-2.5" />
                    {user.instrument}
                  </p>
                )}
              </div>
              <MessageSquarePlus className="w-3.5 h-3.5 text-accent shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-bg-alt/50 flex items-center justify-center mb-3">
              <MessageSquarePlus className="w-5 h-5 text-body-muted" />
            </div>
            <p className="text-xs font-semibold text-heading mb-1">
              No conversations yet
            </p>
            <p className="text-[11px] text-body-muted leading-relaxed max-w-[200px]">
              {newContactUsers.length > 0
                ? "Click the + button to start a new conversation with your teacher or student."
                : "Conversations will appear here once you have lessons or enrollments."}
            </p>
          </div>
        ) : (
          <div className="py-1">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`btn-tactile w-full flex items-center gap-3 px-4 py-3 transition-all text-left ${
                    isActive
                      ? "bg-primary/8 border-l-2 border-l-primary"
                      : "hover:bg-bg-alt/30 border-l-2 border-l-transparent"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase ${
                        isActive
                          ? "bg-gradient-to-br from-primary to-cta"
                          : "bg-gradient-to-br from-primary/70 to-cta/70"
                      }`}
                    >
                      {conv.otherUserName.slice(0, 2)}
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white text-[8px] font-bold flex items-center justify-center animate-pulse-ring">
                        {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p
                        className={`text-xs truncate ${
                          conv.unreadCount > 0
                            ? "font-bold text-heading"
                            : "font-semibold text-heading"
                        }`}
                      >
                        {conv.otherUserName}
                      </p>
                      {conv.lastMessageAt && (
                        <span className="text-[10px] text-body-muted shrink-0 ml-2">
                          {formatRelativeTime(conv.lastMessageAt)}
                        </span>
                      )}
                    </div>

                    {conv.instrument && (
                      <p className="text-[9px] text-accent-dark font-bold uppercase tracking-wider mb-0.5">
                        {conv.instrument}
                      </p>
                    )}

                    {conv.lastMessage && (
                      <p
                        className={`text-[11px] truncate ${
                          conv.unreadCount > 0
                            ? "text-heading font-medium"
                            : "text-body-muted"
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
