import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { TeacherSidebar } from "@/components/dashboard/TeacherSidebar";

export const metadata = {
  title: "Teacher Studio | Gandharva School of Music",
  description: "Gandharva Faculty Studio: Manage schedule, lessons, students, and earnings.",
};

export default async function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole(Role.TEACHER);
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { image: true, name: true, email: true },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gradient-to-b from-bg via-bg-alt/15 to-bg text-heading">
      <TeacherSidebar
        teacherName={dbUser?.name || user.name || "Faculty Studio"}
        teacherEmail={dbUser?.email || user.email || ""}
        teacherImage={dbUser?.image ?? user.image}
      />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 min-w-0">
        <div className="max-w-6xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}
