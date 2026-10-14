import { Metadata } from "next";
import { Suspense } from "react"; // 1. Import Suspense
import AllCoursesPageClient from "./CourseClinet";

export const metadata: Metadata = {
  title: "Online Music & Dance Courses | Gandharva School Of Music",
  description:
    "Discover Gandharva School of Music's diverse online instruments, singing, and dancing courses, tailored to meet your unique needs.",
  alternates: {
    canonical: "/courses/",
  },
};

export default function Page() {
  return (
    // 2. Wrap in Suspense to handle URL state during loading
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Courses...</div>}>
      <AllCoursesPageClient />
    </Suspense>
  );
}