import Accordion from "@/components/Accordion";
import Com247 from "@/components/Com247";
import SupportCard from "@/components/SupportCard";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

export const metadata: Metadata = {
  title: "Courses And Classes | Gandharva School Of Music",
  description:
    "Explore our courses and classes at Gandharva School of Music. Discover personalized music education tailored to your interests and abilities.",
  alternates: {
    canonical: "/faq/courses-and-classes",
  },
};

const faqData = [
  {
    question: "How do I register for a trial class?",
    answer:
      "To register for a complimentary 1-on-1 live trial class for your desired course, simply click the 'Book a Free Trial' button at the top. Our counselor will reach out to you to arrange a suitable date and time for the trial session. You will receive a link to join the trial class on the scheduled day via your registered email address and WhatsApp number.",
  },
  {
    question: "Who will conduct the trial session?",
    answer:
      "You will be paired with a professional, certified, and qualified teacher for your 1-on-1 live trial class.",
  },
  {
    question: "Can a course be customized as per my child’s interests?",
    answer:
      "Yes, at Gandharva, we provide tailored learning experiences for each student. The courses can be adjusted to align with individual interests and abilities.",
  },
  {
    question: "Will a child be able to cope with the curriculum?",
    answer:
      "Absolutely! The curriculum at Gandharva is thoughtfully crafted to cater to music learners of all ages. Additionally, it allows ample room for personalization and creativity, ensuring that it meets the unique needs of each student.",
  },
  {
    question: "How will the teacher be assigned to me?",
    answer:
      "You will be paired with a teacher according to their availability. All our educators at Gandharva are professionally trained, qualified, and experienced. If you encounter any challenges with the assigned teacher, feel free to request a reassignment to a different instructor.",
  },
];

function CourseAndClass() {
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
            Courses And Classes
          </Link>
        </div>
        <Accordion faqData={faqData} />
      </div>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default CourseAndClass;
