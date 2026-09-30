import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { getConversations, getMessageableUsers } from "@/actions/messaging";
import { MessagingContainer } from "@/components/messaging/MessagingContainer";

export const metadata = {
  title: "Messages | Student Dashboard",
  description: "Securely message your teachers. Discuss lessons and musical progress.",
};

export default async function StudentMessagesPage() {
  await requireRole(Role.STUDENT);

  const [conversations, messageableUsers] = await Promise.all([
    getConversations(),
    getMessageableUsers(),
  ]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-heading tracking-tight">
          Messages
        </h1>
        <p className="text-xs text-body-muted mt-1">
          Securely communicate with your teachers. Discuss lessons and musical progress.
        </p>
      </div>

      <MessagingContainer
        conversations={conversations}
        messageableUsers={messageableUsers}
        callerRole="STUDENT"
      />
    </div>
  );
}
