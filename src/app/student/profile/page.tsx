import { redirect } from "next/navigation";

export default function StudentProfileRedirectPage() {
  redirect("/student/dashboard/profile");
}
