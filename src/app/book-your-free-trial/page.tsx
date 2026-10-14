import { Metadata } from "next";
import BookYourFreeTrialClient from "./BookFreeTrialClient";

export const metadata: Metadata = {
  title: "Book Your Free Trial | Gandharva School Of Music",
  description: "Book your free trial class today! Experience our expert-led lessons with no commitment. Start your musical journey and see the results for yourself.",
  alternates: {
    canonical: "/book-your-free-trial/",
  },
};
export default function Page() {
  return <BookYourFreeTrialClient />;
}
