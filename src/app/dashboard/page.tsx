import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-helpers";

export default async function DashboardRedirectPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  if (user.role === "TEACHER") {
    redirect("/teacher/dashboard");
  }

  redirect("/student/dashboard");
}
