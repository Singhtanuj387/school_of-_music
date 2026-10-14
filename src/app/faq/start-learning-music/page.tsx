import Accordion from "@/components/Accordion";
import Com247 from "@/components/Com247";
import SupportCard from "@/components/SupportCard";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

export const metadata: Metadata = {
  title: "Start Learning Music | Gandharva School Of Music",
  description:
    "Start learning music with Gandharva School of Music. Explore our courses, expert instructors, and flexible schedules. Join us today!",
  alternates: {
    canonical: "/faq/start-learning-music",
  },
};

const faqData = [
  {
    question: "What’s the minimum age to start learning music?",
    answer:
      "The minimum age for enrollment depends on the specific course and the child's developmental stage. For example, children can begin singing classes once they start speaking clearly. As for instrument classes, children typically start between the ages of 5 to 8 years.",
  },
  {
    question: "Are the classes live or pre-recorded?",
    answer:
      "At Gandharva, all classes are conducted live and in a one-on-one format, ensuring that each child receives the focused attention and guidance they need. We recognize that every child learns at their own pace, so our caring and patient teachers dedicate their time to individual students. Additionally, we offer a weekly Gandharva Masterclass, which is a live group session designed to address students' questions and concerns.",
  },
  {
    question: "Do online lessons work?",
    answer:
      "Gandharva's video platform facilitates seamless communication between students and teachers, ensuring that no important information is overlooked. We have successfully trained over 40,000 students online, witnessing their transformation into exceptional musicians. Moreover, our online lessons eliminate the need for travel, saving you both time and transportation costs. All you need is a reliable internet connection and either a mobile phone or laptop to join the classes.",
  },
  {
    question: "How many classes are conducted per week?",
    answer:
      "You have the flexibility to select either two 30-minute classes or one 60-minute class each week.",
  },
  {
    question: "Can I choose the time for the class?",
    answer:
      "Certainly! You can easily arrange your classes through our platform, selecting your preferred days and time slots according to your tutor's availability.",
  },
];

function LearnMusic() {
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
            Start Learning Music
          </Link>
        </div>
        <Accordion faqData={faqData} />
      </div>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default LearnMusic;
