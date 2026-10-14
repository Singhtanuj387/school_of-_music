import { Metadata } from "next";
import ContactUsClient from "./contact-usClient";

export const metadata: Metadata = {
  title: "Contact us | Gandharva School Of Music",
  description: "Contact us at Gandharva School Of Music",
  alternates: {
    canonical: "/contact-us/",
  },
};
export default function Page() {
  return <ContactUsClient />;
}
