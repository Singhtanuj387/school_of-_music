import Link from "next/link";
import React from "react";
import { IoBook } from "react-icons/io5";
import { BiSolidBookReader } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaMusic } from "react-icons/fa6";
import { FaLaptop } from "react-icons/fa";
import SupportCard from "@/components/SupportCard";
import Com247 from "@/components/Com247";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Gandharva School Of Music",
  description: "Find answers to common questions about Gandharva School of Music. Learn about our classes, fees, scheduling, and how to start your musical journey.",
  alternates: {
    canonical: "/faq",
  },
};

function FAQ() {
  return (
    <div>
      <section className="bg-[url(/teach-us.webp)] w-full h-[49vh] md:h-[75vh] bg-no-repeat bg-right md:bg-top md:bg-cover flex flex-col items-start justify-center py-10 px-4 ">
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
      <section className="flex flex-col items-center gap-4 md:gap-8 mt-10 md:mt-30 mb-10 md:mb-15">
        <Link
          href="/faq/about-us/"
          aria-label="About Us"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3  md:mx-10">
            <IoBook size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            About Us
          </div>
        </Link>
        <Link
          href="/faq/courses-and-classes/"
          aria-label="Courses & Classes"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <BiSolidBookReader
              size={24}
              style={{ fontSize: "1.5rem" }}
              color="white"
            />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Courses & Classes
          </div>
        </Link>
        <Link
          href="/faq/pricing-payment/"
          aria-label="Pricing & Payment"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <RiMoneyDollarCircleFill
              size={24}
              style={{ fontSize: "1.5rem" }}
              color="white"
            />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Pricing & Payment
          </div>
        </Link>
        <Link
          href="/faq/start-learning-music/"
          aria-label="Start Learning Music"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <FaMusic size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Start Learning Music
          </div>
        </Link>
        <Link
          href="/faq/attending-the-class/"
          aria-label="Attending The Class"
          className="border-1 rounded-xl w-[90%] md:w-[60%]  flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <FaLaptop size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Attending The Class
          </div>
        </Link>
      </section>
      <SupportCard />
      <Com247 />
    </div>
  );
}

export default FAQ;
