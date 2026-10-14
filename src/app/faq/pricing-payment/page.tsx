import Accordion from "@/components/Accordion";
import Com247 from "@/components/Com247";
import SupportCard from "@/components/SupportCard";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

export const metadata: Metadata = {
  title: "Pricing & Payment | Gandharva School Of Music",
  description:
    "Explore our comprehensive pricing and payment options for music courses at Gandharva School of Music. Get all your queries answered.",
  alternates: {
    canonical: "/faq/pricing-payment",
  },
};

const faqData = [
  {
    question: "How much does a course cost?",
    answer:
      "The fees for each course vary, so we recommend visiting the specific course page for detailed information on pricing.",
  },
  {
    question: "Will I be charged taxes?",
    answer:
      "The fees are all-inclusive, covering all taxes, which means there won’t be any extra payments required beyond what’s specified.",
  },
  {
    question: "How can I make the payment?",
    answer:
      "Following your trial class, if you're satisfied with the assigned teacher, you can visit the trial dashboard to explore payment options. Alternatively, your designated counsellor will send a secure payment link to your registered email and WhatsApp number, which you can also use for payment.",
  },
  {
    question: "How do I know if the payment is made?",
    answer:
      "Once your payment is processed, you will receive a confirmation email along with a notification confirming the transaction.",
  },
  {
    question: "Is online payment secure?",
    answer: "Yes, rest assured, the payment process is completely secure.",
  },
];

function PriceAndPayment() {
  return (
    <div>
      <section className="bg-[url(/teach-us.webp)] w-full h-[49vh] md:h-[75vh] bg-no-repeat bg-right md:bg-top md:bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[26px] w-full  text-left md:text-[55px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Frequently Asked Questions (FAQ’s)
          </h1>
        </div>
      </section>
      <div className="md:mx-auto md:px-[12%] mt-10 md:mt-20">
        <div
          style={{
            fontFamily: "var(--font-vidaloka)",
            fontWeight: 500,
            lineHeight: 1,
          }}
          className="text-[26px] md:text-[38px] text-[#1A022D]  ml-3 mb-6"
        >
          <Link
            href="/faq/"
            aria-label="Back to FAQ"
            className="flex flex-row items-center gap-2.5"
          >
            <MdOutlineArrowCircleLeft />
            Pricing & Payment
          </Link>
        </div>
        <Accordion faqData={faqData} />
      </div>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default PriceAndPayment;
