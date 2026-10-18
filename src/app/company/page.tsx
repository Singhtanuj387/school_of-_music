import BookFreeTrial from "@/components/BookFreeTrial";
import Com247 from "@/components/Com247";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
export const metadata: Metadata = {
  title: "Company | Gandharva School Of Music",
  description:
    "Gandharva: Revolutionizing Online Music Education — A Premier International School for Performing Arts. Discover curated curriculums, certified instructors, and personalized musical journeys.",
  alternates: {
    canonical: "/company/",
  },
};

function company() {
  return (
    <div>
      <section className="bg-[url(/DCFVNN.avif)] w-full h-[50vh] md:h-[90vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[80%]">
          <h1
            className="text-[26px] w-full text-left md:text-[52px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
            }}
          >
            We offer lessons in music, dance, and instruments that inspire
            passion.
          </h1>
        </div>
      </section>
      <section className="lg:px-[10%] mt-10 px-4 w-full  ">
        <h2
          className="
                  text-[26px] md:text-[41px]
                  text-[#1A022D] text-center
                  "
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          About{" "}
          <span className="text-[#FF7703]">Gandharva School of Music</span>
        </h2>
        <p
          className="text-[17px] text-[#54595f] text-center p-3"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
        >
          Gandharva is a cutting-edge digital platform for online music
          education, redefining how music is learned. We are building a
          promising music school powered by a curated curriculum, certified
          teachers, and personalized musical journeys tailored to diverse
          student needs. Our core offering, “Musical Journeys for Different
          Student Personas,” is available in three distinct formats to suit
          every learner.
        </p>
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="border border-black/[0.1] rounded-2xl max-w-sm shadow-sm flex items-center p-4">
            <p
              className="text-[17px] text-[#54595f] text-center "
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Blossoming Explorer Musical Journey : For young students stepping
              into the world of music for the first time, this journey offers a
              playful and engaging exploration of musical discovery.
            </p>
          </div>
          <div className="border border-black/[0.1] rounded-2xl max-w-sm shadow-sm flex items-center p-4">
            <p
              className="text-[17px] text-[#54595f] text-center "
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Passion-Driven Musical Journey : Tailored for individuals of all
              ages and professions who aspire to embrace music as a beloved
              hobby, a deep passion, or an essential life skill.
            </p>
          </div>
          <div className="border border-black/[0.1] rounded-2xl max-w-sm shadow-sm flex items-center p-4">
            <p
              className="text-[17px] text-[#54595f] text-center "
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Certification-Focused Musical Journey : Crafted for dedicated
              music learners seeking structured, formal music education
            </p>
          </div>
        </div>
        <p
          className="text-[17px] text-[#54595f] text-center p-3 mt-6"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
        >
          Each of Gandharva’s products is thoughtfully designed to address the
          key challenges in today’s music education sector. Our curated
          curriculum caters to various student personas, while our proprietary
          system ensures the professional hiring, upskilling, and management of
          teachers. With personalized musical journeys tailored to individual
          student profiles, we offer a futuristic platform that integrates these
          elements into a seamless virtual classroom experience. This
          combination of curated curriculum, expert teachers, and personalized
          learning paths allows Gandharva students to enjoy a high-quality music
          education from the comfort of their homes.
        </p>
      </section>
      {/* <section
        className="bg-[url(/bg-1-png.webp)] w-full h-[60vh] md:h-[65vh]  bg-cover  flex justify-start  items-center "
        style={{
          fontFamily: "var(--font-vidaloka)",
          fontWeight: 500,
        }}
      >
        <h3 className="text-[22px] md:text-[32px] text-[#FFF] w-full md:w-[50%] h-full  flex items-center md:mt-20 px-4 md:ml-[10%]">
          We’re on a mission to become the most trusted online platform for
          learning music, dedicated to fostering the holistic development of
          both our students and teachers.
        </h3>
      </section> */}
      {/* <section
        className="bg-[url(/bg-1-png.webp)] w-full h-[60vh] md:h-[65vh] bg-cover flex items-center justify-center md:justify-start"
        style={{
          fontFamily: "var(--font-vidaloka)",
          fontWeight: 500,
        }}
      >
        <h3 className="text-[22px] md:text-[32px] text-[#FFF] w-full md:w-[50%] px-4 text-center md:text-left md:ml-[10%] md:mt-20">
          We’re on a mission to become the most trusted online platform for
          learning music, dedicated to fostering the holistic development of
          both our students and teachers.
        </h3>
      </section> */}
      <section
        className="bg-[url(/bg-1-png.webp)] w-full h-[55vh] md:h-[65vh] bg-cover flex items-center justify-center  md:justify-start"
        style={{
          fontFamily: "var(--font-vidaloka)",
          fontWeight: 500,
        }}
      >
        <div className="px-4 text-center md:text-left md:ml-[10%] md:mt-20 md:w-[50%] ">
          <h3 className="text-[22px] md:text-[32px] text-[#FFF]">
            We’re on a mission to become the most trusted online platform for
            learning music, dedicated to fostering the holistic development of
            both our students and teachers.
          </h3>
        </div>
      </section>

      <section className="lg:px-[10%] py-5 lg:p-[10%] px-4 mt-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="w-full md:w-[50%] md:pr-20 ">
            <h2
              className="text-[26px] md:text-[41px] text-[#1A020D] mb-4 text-left"
              style={{
                fontFamily: "var(--font-vidaloka)",
                fontWeight: 500,
              }}
            >
              Turn your spark{" "}
              <span className="text-[#FF7703]">to a flame!</span>
            </h2>
            <p
              className="text-[16px] md:my-10"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Music moves the world in countless ways, and its meaning is unique
              to everyone.
            </p>
            <p
              className="text-[16px] my-10"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              For some, it’s a path to nurture talent, build a career, explore
              an interest, or develop a life-skill. For others, it’s simply a
              hobby or a way to relieve stress. Yet, it all begins with a
              similar spark—a spark that we help ignite into a lasting flame.
            </p>
          </div>
          <div className="w-full md:w-[50%]">
            <Image
              src="/3d-realistic-globe-with-musical-elements-scaled-1.webp"
              alt="pic"
              width={600}
              height={600}
              className="rounded-xl"
            />
          </div>
        </div>
      </section>
      <section className="w-full lg:px-10    bg-[rgba(255,206,236,0.5)] flex flex-col md:flex-row justify-between items-center mx-auto">
        <Image
          src={"/cropped-favicon-gandharva.png"}
          width={200}
          height={200}
          alt="guiter"
          className="ml-20 hidden sm:block "
        />
        <div className="px-4 lg:px-32 mt-10 ">
          <h2
            className="text-[26px] md:text-[41px] text-[#1A020D] mb-4 text-center md:text-left"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
            }}
          >
            The Story of{" "}
            <span className="text-[#FF7703]">Gandharva School of Music</span>
          </h2>
          <p
            className="text-[16px] my-10"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            The story of Gandharva School of Music began with a vision to
            transform how music education is delivered and experienced.
            Recognizing the limitations of traditional music learning, we set
            out to create a platform that makes high-quality music education
            accessible to everyone, regardless of location.
          </p>
          <p
            className="text-[16px] my-10"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            Founded with a deep passion for music and teaching, Gandharva is
            built on the pillars of a curated curriculum, certified teachers,
            and personalized musical journeys for students of all ages and skill
            levels. Our mission is to cater to the unique learning needs of
            every student while fostering the growth and development of
            teachers.
          </p>
          <p
            className="text-[16px] my-10"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            As we grew, we developed a futuristic, user-friendly digital
            platform that seamlessly integrates learning tools, expert
            instruction, and tailored musical pathways. With a commitment to
            innovation, Gandharva has expanded its offerings to include a
            variety of instruments, vocal training, and dance, all within a
            structured and supportive online environment. Our goal is not only
            to teach music but to create a community of lifelong learners who
            find joy, confidence, and fulfillment in their musical journey.
          </p>
          <p
            className="text-[16px] my-10"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            At Gandharva, we believe music has the power to shape lives, and
            we’re dedicated to spreading its magic across the world.
          </p>
        </div>
      </section>
      <Com247 />
      <div className="fixed bottom-0 w-full ">
        <BookFreeTrial />
      </div>
    </div>
  );
}

export default company;
