import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Job Details | Gandharva School Of Music",
  description:
    "Join us at Gandharva and take your teaching career to new heights with the freedom and support you deserve! Be part of our rapidly growing online music and dance live teaching platform. Come aboard the rocketship!",
  alternates: {
    canonical: "/teach-with-us/job-details",
  },
};

function JobDetails() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#3D096D] to-[#7507C0] w-full h-[50vh] md:h-[60vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[67%]">
          <h1
            className="text-[32px] w-full  text-left md:text-[48px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Job Details
          </h1>
          <div className="mt-8">
            <Link
              aria-label="Apply Now"
              href="/teach-with-us/job-application/"
              className="inline-block bg-[#9506EE] text-white font-medium py-1.5 text-[16px] px-3 md:py-3 md:px-8.5 rounded-md transition-colors duration-300"
            >
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="md:px-[10%] py-5 md:p-[4%] px-1 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2
            className="text-[26px] md:text-[35px] text-[#1A022D]"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
            }}
          >
            Gandharva&apos;s Online Teacher
          </h2>
          <p
            className="text-[16px] text-[#240046] py-8 bg-[#FFECFE] pl-4 pr-40 my-4"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            Job Location : <span style={{ fontWeight: 600 }}>Remote</span>
          </p>
        </div>
      </section>
      <section className="md:px-[10%] py-1 md:py-[1%] px-1 ">
        <div style={{ fontFamily: "var(--font-dm-sans)" }} className="px-4">
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            About Us
          </h3>
          <p
            className="mb-6 text-[16px] text-[#3A3A3A]"
            style={{ fontWeight: 300 }}
          >
            Welcome to Gandharva School of Music & Dance – where you have the
            chance to teach and inspire students from across the globe. As a
            premier online music and dance learning platform, we offer
            personalized live classes to Indian students in over 16 countries.
            At Gandharva, we value your expertise and dedication, equipping you
            with the tools and support needed to make a meaningful impact on
            your students. Join our community of talented musicians and help us
            spread the joy of music and dance worldwide.
          </p>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Job Description
          </h3>
          <p
            className="mb-6 text-[16px] text-[#3A3A3A]"
            style={{ fontWeight: 300 }}
          >
            Join us at Gandharva and take your teaching career to new heights
            with the freedom and support you deserve! Be part of our rapidly
            growing online music and dance live teaching platform. Come aboard
            the rocketship!
          </p>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Join us!!
          </h3>
          <p
            className="mb-6 text-[16px] text-[#3A3A3A]"
            style={{ fontWeight: 300 }}
          >
            We are committed to nurturing musical talent and shaping the next
            generation of musicians. We deeply value our teachers and work to
            create a rewarding environment that promotes their growth. Our
            faculty members enjoy various incentives and abundant growth
            opportunities, including free upskilling training programs and
            scholarships for any Gandharva courses.
          </p>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Our Offerings
          </h3>
          <p
            className="mb-6 text-[16px] text-[#3A3A3A]"
            style={{ fontWeight: 300 }}
          >
            At Gandharva, we offer a unique adaptive learning model that
            emphasizes personalized curriculum and one-on-one classes,
            empowering teachers to tailor their approach to each student’s
            needs.
          </p>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Requirements
          </h3>
          <p
            className="mb-6 text-[16px] text-[#3A3A3A]"
            style={{ fontWeight: 300 }}
          >
            Job Location: Online/Work from home
          </p>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Eligibility
          </h3>
          <ul
            className="mb-6 text-[16px] text-[#3A3A3A] list-disc list-inside"
            style={{ fontWeight: 300 }}
          >
            <li>
              Expertise in Teaching (Western staff notations) with fluent
              sight-reading.
            </li>
            <li>
              Adaptable to diverse student backgrounds and learning levels.
            </li>
            <li>Proficient in online teaching technology.</li>
          </ul>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Must Haves
          </h3>
          <ul
            className="mb-6 text-[16px] text-[#3A3A3A] list-disc list-inside"
            style={{ fontWeight: 300 }}
          >
            <li>Laptop with good webcam & headphones with mic.</li>
            <li>
              High-speed broadband internet connection or WiFi connectivity
              (mobile data not sufficient)
            </li>
            <li>Adequate lighting and a professional background.</li>
            <li>Power backup.</li>
          </ul>
          <h3
            className="text-[20px] md:text-[24px] mb-6 text-[#1A022D]"
            style={{ fontWeight: 600 }}
          >
            Benefits
          </h3>
          <h3
            className="text-[16px]  mb-6 text-[#3A3A3A]"
            style={{ fontWeight: 600 }}
          >
            Why Work with Us
          </h3>
          <ul
            className="mb-6 text-[16px] text-[#3A3A3A] list-disc list-inside"
            style={{ fontWeight: 300 }}
          >
            <li>
              Hassle-Free Teaching Experience: Enjoy seamless management of
              schedules, expectations, and payments by our team.
            </li>
            <li>
              Lucrative Earnings: Earn competitively while doing what you love.
            </li>
            <li>
              No Commute or Hierarchy: Teach from anywhere without the need for
              travel or traditional workplace structures.
            </li>
            <li>
              Flexibility: Choose your own teaching hours for your convenience.
            </li>
            <li>Learn from Certified Teachers.</li>
            <li>
              Global Connect: Gain global exposure by connecting with a
              worldwide audience.
            </li>
            <li>
              Become a Subject Matter Expert, contribute to our courses and
              content, and support other teachers in enhancing their teaching
              skills.
            </li>
          </ul>
          <div className="my-8">
            <Link
              aria-label="Apply Now"
              href="/teach-with-us/job-application/"
              className="inline-block bg-[#9506EE] text-white font-medium py-2 text-[16px] px-3  md:py-2 md:px-8 rounded-xs  transition-colors duration-300"
            >
              <span
                className="font-bold"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobDetails;
