import { Metadata } from "next";
import JobApplication from "./Client";

export const metadata: Metadata = {
  title: "Job Application | Gandharva School Of Music",
  description: "Apply for a job at Gandharva School Of Music",
  alternates: {
    canonical: "/teach-with-us/job-application",
  },
};
export default function Page() {
  return <JobApplication />;
}
