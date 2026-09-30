import { getCurrentUser } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { ProfileEditor } from "./ProfileEditor";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "My Profile | Student Portal | Gandharva School of Music",
  description: "Manage your personal profile, timezone, password, and notification preferences.",
};

export default async function StudentProfilePage() {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/login?callbackUrl=/student/dashboard/profile");
  }

  if (sessionUser.role === Role.TEACHER) {
    redirect("/teacher/dashboard/profile");
  }

  if (sessionUser.role === Role.ADMIN) {
    redirect("/admin/users");
  }

  const user = await db.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      timezone: true,
      emailVerified: true,
      image: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
          Profile and Preferences
        </span>
        <SplitHeading
          as="h1"
          firstClause="Student"
          accentClause="Profile"
          size="xl"
          className="mt-0.5"
        />
        <p className="text-xs sm:text-sm text-body mt-1">
          Manage your account details, lesson timezone preference, and security credentials.
        </p>
      </div>

      <ProfileEditor
        user={{
          id: user.id,
          name: user.name || "",
          email: user.email,
          timezone: user.timezone || "UTC",
          emailVerified: Boolean(user.emailVerified),
          image: user.image,
        }}
      />
    </div>
  );
}
