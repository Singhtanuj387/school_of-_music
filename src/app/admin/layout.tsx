import { getCurrentUser } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";

export const metadata = {
  title: "Admin Portal | Gandharva School of Music",
  description: "Gandharva Administration: Manage users, courses, enrollments, lessons, and settings.",
};

export default async function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-gradient-to-b from-bg via-bg-alt/15 to-bg text-heading">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 min-w-0">
        <div className="max-w-7xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}
