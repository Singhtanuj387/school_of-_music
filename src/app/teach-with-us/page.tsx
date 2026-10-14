import { Metadata } from "next";
import TeachWithUs from "./Client";

export const metadata: Metadata = {
  title: "Teach With Us | Gandharva School Of Music",
  description:
    "Teach students worldwide from the comfort of your home with Gandharva School of Music. Conduct online classes and manage everything seamlessly and hassle-free.",
  alternates: {
    canonical: "/teach-with-us",
  },
};
export default function Page() {
  return <TeachWithUs />;
}
