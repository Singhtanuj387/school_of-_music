import Accordion from "@/components/Accordion";
import Com247 from "@/components/Com247";
import SupportCard from "@/components/SupportCard";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

export const metadata: Metadata = {
  title: "Attending the Class | Gandharva School Of Music",
  description:
    "Learn about the requirements and equipment needed to attend our online classes.",
  alternates: {
    canonical: "/faq/attending-the-class",
  },
};

const faqData = [
  {
    question: "Do I need to create a Zoom account or download GMeet?",
    answer:
      "Not at all! You can join the classes using a web browser like Chrome as well, so there's no need for any special software.",
  },
  {
    question: "What equipment do I need to take the class?",
    answer:
      "To participate, you'll need a reliable internet connection and a mobile phone or laptop equipped with a functioning microphone and camera. If you're taking an instrument class, don't forget to have your instrument on hand!",
  },
  {
    question: "Can I join the class from my mobile phone?",
    answer:
      "For the best experience, we suggest joining the class from a laptop or tablet, especially since you'll need to reference the chapter book during lessons. However, if a laptop isn't available, you can still participate using your mobile phone.",
  },
  {
    question: "Can I sit in the class with my child?",
    answer:
      "Absolutely! By sitting in on the class with your child, you'll gain insight into their learning process and be able to evaluate how effectively the teacher engages with them.",
  },
];

function AttendingClass() {
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
            Attending the Class
          </Link>
        </div>
        <Accordion faqData={faqData} />
      </div>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default AttendingClass;
