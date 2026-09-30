"use client";

import { useState, useTransition } from "react";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { MessageSquare, Shield } from "lucide-react";
import {
  getOrCreateConversation,
  getMessages,
} from "@/actions/messaging";
import type {
  ConversationListItem,
  MessageableUser,
  MessageItem,
} from "@/actions/messaging";

type MessagingContainerProps = {
  conversations: ConversationListItem[];
  messageableUsers: MessageableUser[];
  callerRole: "TEACHER" | "STUDENT";
};

export function MessagingContainer({
  conversations: initialConversations,
  messageableUsers,
  callerRole,
}: MessagingContainerProps) {
  const [conversations, setConversations] =
    useState<ConversationListItem[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [activeMessages, setActiveMessages] = useState<MessageItem[]>([]);
  const [activeOtherUser, setActiveOtherUser] = useState<{
    name: string;
    image: string | null;
    instrument: string | null;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = async (conversationId: string) => {
    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    setActiveConversationId(conversationId);
    setActiveOtherUser({
      name: conv.otherUserName,
      image: conv.otherUserImage,
      instrument: conv.instrument,
    });
    setShowChat(true);

    startTransition(async () => {
      const result = await getMessages(conversationId);
      setActiveMessages(result.messages);
    });
  };

  const handleStartNewConversation = async (userId: string) => {
    startTransition(async () => {
      const result = await getOrCreateConversation(userId);

      if (result.success) {
        const user = messageableUsers.find((u) => u.id === userId);

        // Add to conversations list if new
        const existingConv = conversations.find(
          (c) => c.id === result.conversationId,
        );
        if (!existingConv && user) {
          const newConv: ConversationListItem = {
            id: result.conversationId,
            otherUserId: userId,
            otherUserName: user.name,
            otherUserImage: user.image,
            instrument: user.instrument,
            lastMessage: null,
            lastMessageAt: null,
            unreadCount: 0,
          };
          setConversations((prev) => [newConv, ...prev]);
        }

        // Open the conversation
        setActiveConversationId(result.conversationId);
        setActiveOtherUser({
          name: user?.name || "User",
          image: user?.image || null,
          instrument: user?.instrument || null,
        });
        setShowChat(true);

        const messages = await getMessages(result.conversationId);
        setActiveMessages(messages.messages);
      }
    });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-border-subtle shadow-md bg-white">
      {/* Conversation List (left panel) */}
      <div
        className={`w-full md:w-80 shrink-0 ${
          showChat ? "hidden md:flex md:flex-col" : "flex flex-col"
        }`}
      >
        <ConversationList
          conversations={conversations}
          messageableUsers={messageableUsers}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onStartNewConversation={handleStartNewConversation}
        />
      </div>

      {/* Chat Window (right panel) */}
      <div
        className={`flex-1 min-w-0 ${
          showChat ? "flex flex-col" : "hidden md:flex md:flex-col"
        }`}
      >
        {activeConversationId && activeOtherUser ? (
          <ChatWindow
            key={activeConversationId}
            conversationId={activeConversationId}
            otherUserName={activeOtherUser.name}
            otherUserImage={activeOtherUser.image}
            instrument={activeOtherUser.instrument}
            initialMessages={activeMessages}
            callerRole={callerRole}
            onBack={() => setShowChat(false)}
          />
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-bg-alt/10 to-bg px-8">
            <div className="w-20 h-20 rounded-2xl bg-primary-subtle flex items-center justify-center mb-6 shadow-sm">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-heading mb-2">
              Gandharva Messaging
            </h3>
            <p className="text-sm text-body-muted text-center max-w-[320px] leading-relaxed mb-6">
              Connect with your{" "}
              {callerRole === "TEACHER" ? "students" : "teachers"} securely.
              Discuss lessons, practice techniques, and your music journey.
            </p>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-success-muted border border-success/20">
              <Shield className="w-4 h-4 text-success" />
              <div>
                <p className="text-xs font-bold text-success">
                  Privacy Protected
                </p>
                <p className="text-[10px] text-success/80">
                  Personal contact information is automatically filtered
                </p>
              </div>
            </div>

            {isPending && (
              <div className="mt-6 flex items-center gap-2 text-body-muted">
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-xs">Loading conversation…</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
