import { redirect } from "next/navigation";

export default function TeacherRootRedirectPage() {
  redirect("/teacher/dashboard");
}
