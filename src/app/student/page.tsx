import { redirect } from "next/navigation";

export default function StudentRootRedirectPage() {
  redirect("/student/dashboard");
}
