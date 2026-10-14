import Accordion from "@/components/Accordion";
import React from "react";
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import Link from "next/link";
import Com247 from "@/components/Com247";
import SupportCard from "@/components/SupportCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us | Gandharva School Of Music",
  description:
    "Gandharva: Transforming Music Education Online | Leading International School for Performing Arts | Curated Curriculum, Certified Teachers, Personalized Journeys",
  alternates: {
    canonical: "/faq/about-us",
  },
};

const faqData = [
  {
    question: "What is Gandharva?",
    answer:
      "Gandharva School of Music is an innovative global hub for online education in Performing Arts, specializing in Music, Dance, and Drama. We’re on a mission to transform the landscape of music education by fostering a vibrant international community of passionate educators and aspiring musicians. At Gandharva, we believe that exceptional music education should be accessible to all, regardless of location. With our meticulously curated curriculum, certified instructors, and personalized musical journeys, we’re not just teaching music—we’re igniting a lifelong passion for the arts. Join us in exploring the harmonious world of creativity!",
  },
  {
    question: "How are classes conducted? ",
    answer:
      "All classes are conducted via the video platform on the Gandharva School of Music website.",
  },
  {
    question: "What is a GandharvaMasterclass?",
    answer:
      "At Gandharva School of Music, our Faculty Heads host weekly Masterclasses, which are offered to students at no cost. During these group sessions, the Faculty Head not only imparts knowledge but also engages with students by answering their questions and providing tailored feedback.",
  },
  {
    question: "Does Gandharva conduct offline classes as well?",
    answer:
      "All our classes at Gandharva School of Music are conducted online using a state-of-the-art video platform on our website. With a thoughtfully curated curriculum led by expert instructors and professionally certified teachers, we strive to ensure that high-quality music education is equitable and accessible to everyone.",
  },
];

function AboutUs() {
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
            About us
          </Link>
        </div>
        <Accordion faqData={faqData} />
      </div>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default AboutUs;
