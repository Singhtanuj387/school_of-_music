import { Metadata } from "next";
import { Suspense } from "react"; // 1. Import Suspense
import BlogsClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Music Education Blog | Gandharva School Of Music",
  description:
    "Gandharva School of Music's blog provides information on piano lessons, guitar tutorials, vocal training, and the health benefits of learning music.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function Page() {
  return (
    // 2. Wrap the Client Component in Suspense
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BlogsClient />
    </Suspense>
  );
}