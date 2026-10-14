import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { IoBook } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Policy | Gandharva School Of Music",
  description:
    "Explore all the policies of Gandharva School of Music — including refund and course guidelines — to stay informed and make the most of your learning experience.",
  alternates: {
    canonical: "/policy",
  },
};

function Policy() {
  return (
    <div>
      <section className="bg-[url(/teach-us.webp)] w-full h-[50vh] md:h-[75vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[26px] w-full  text-left md:text-[55px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Policies
          </h1>
          <div className="mt-8">
            <span
              className="text-[16px] md:text-[17px] text-white"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Your Satisfaction is Important To Us…
            </span>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center gap-8 mt-10 md:mt-30 mb-10 md:mb-15">
        <Link
          href="/policy/terms-conditions/"
          aria-label="Terms and Conditions"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <IoBook size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Terms & Conditions{" "}
          </div>
        </Link>
        <Link
          href="/policy/privacy-policy/"
          aria-label="Privacy Policy"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <IoBook size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Privacy Policy
          </div>
        </Link>
        <Link
          aria-label="Refund Policy"
          href="/policy/refund-policy/"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <IoBook size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Refund Policy
          </div>
        </Link>
        <Link
          aria-label="Cookies Policy"
          href="/policy/cookies-policy/"
          className="border-1 rounded-xl w-[90%] md:w-[60%] flex flex-row py-2 md:py-5  items-center shadow-2xl md:shadow-xl "
        >
          <div className="bg-[#FF7703] p-2 rounded-[50%] mx-3 md:mx-10">
            <IoBook size={24} style={{ fontSize: "1.5rem" }} color="white" />
          </div>
          <div
            className="text-[20px] md:text-[22px]"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Cookies Policy
          </div>
        </Link>
      </section>
      <div>
        <p
          className="bg-[#FF9E00]  py-5 rounded-lg text-white text-[19px] md:text-[24px] text-center "
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          24/7 Dedicated Customer Support
        </p>
      </div>
    </div>
  );
}

export default Policy;
