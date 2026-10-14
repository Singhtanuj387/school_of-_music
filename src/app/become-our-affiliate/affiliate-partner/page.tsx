import { Metadata } from "next";
import AffiliatePartner from "./Client";

export const metadata: Metadata = {
  title: "Affiliate Partner | Gandharva School Of Music",
  description: "Become an Affiliate Partner of Gandharva School Of Music",
  alternates: {
    canonical: "/become-our-affiliate/affiliate-partner/",
  },
};
export default function Page() {
  return <AffiliatePartner />;
}
