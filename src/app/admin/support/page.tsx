import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminTicketsManager, AdminTicketItem } from "./AdminTicketsManager";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Support Desk Queue | Admin Portal | Gandharva School of Music",
  description: "Monitor and respond to student inquiries and faculty support tickets.",
};

export default async function AdminSupportPage() {
  await requireRole(Role.ADMIN);

  const dbTickets = await db.supportTicket.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          role: true,
        },
      },
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedTickets: AdminTicketItem[] = dbTickets.map((t) => ({
    id: t.id,
    subject: t.subject,
    category: t.category,
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    userName: t.user.name || "User",
    userEmail: t.user.email,
    userRole: t.user.role,
    messagesCount: t._count.messages,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-dark font-mono">
          Inquiry Help Desk
        </span>
        <SplitHeading
          firstClause="Support Desk"
          accentClause="Triage"
          as="h1"
          size="lg"
          className="mt-1"
        />
        <p className="text-sm text-body mt-1">
          Review, assign, and reply to open support requests submitted by students and faculty members.
        </p>
      </div>

      <AdminTicketsManager initialTickets={formattedTickets} />
    </div>
  );
}
