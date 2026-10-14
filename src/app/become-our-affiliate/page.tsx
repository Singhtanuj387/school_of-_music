import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Com247 from "@/components/Com247";
import FAQSection from "@/components/FAQSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become Our Affiliate | Gandharva School Of Music",
  description:
    "Join our affiliate program and earn a flat 25% commission on every successful referral. Share the joy of music and dance while building a steady income stream.",
  alternates: {
    canonical: "/become-our-affiliate/",
  },
};

interface WhyJoinCardProps {
  picture: string;
  title: string;
  description: string | ReactNode;
}

interface HowDoesWorkCardProps {
  title: string;
  description: string | ReactNode;
}

const WhyJoinCardData = [
  {
    picture: "boa-card-imf-1.png",
    title: "Generous Commission Structure",
    description: (
      <>
        Earn a{" "}
        <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}>
          flat 25% commission
        </span>{" "}
        for every successful referral. Share the joy, and let your rewards grow
        with every conversion.
      </>
    ),
  },
  {
    picture: "boa-card-imf-2.png",
    title: "A Global Brand to Represent",
    description:
      "Be the voice of an internationally recognized institution that combines tradition with cutting-edge online learning.",
  },
  {
    picture: "boa-card-imf-3.png",
    title: "High-Quality Courses",
    description:
      "With programs certified by Trinity, ABRSM, and RSL, Gandharva offers credibility that’s easy to promote.",
  },
  {
    picture: "boa-card-imf-4.png",
    title: "Free Marketing Materials",
    description:
      "Get access to banners, social media kits, and personalized referral code to make promotions effortless.",
  },
];

const HowDoesWorkCardData = [
  {
    title: "Sign Up",
    description:
      "Fill out a quick registration form to become an affiliate partner.",
  },
  {
    title: "Get Your Referral Code",
    description:
      "Get access your unique code and marketing materials to start sharing.",
  },
  {
    title: "Promote Gandharva",
    description:
      "Use your platform—social media, blogs, websites, or personal networks—to spread the word.",
  },
  {
    title: "Earn Commission",
    description: (
      <>
        Earn a{" "}
        <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}>
          Receive 25%
        </span>{" "}
        of every course fee paid by students who enroll through your referral.
      </>
    ),
  },
];

function page() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[url(/teach-us-2.avif)] w-full h-[60vh] md:h-[90vh] bg-no-repeat bg-top bg-cover flex flex-col items-center justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1">
          <h1
            className="text-[32px] w-full md:w-1/2 text-left md:text-[64px] text-white mb-6 mt-12 md:mt-28"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Earn a <strong style={{ fontWeight: 700 }}>Flat 25%</strong>{" "}
            commission on every successful referral
          </h1>
          <div className="mt-8">
            <Link
              aria-label="Join Now"
              href="/become-our-affiliate/affiliate-partner/"
              className="inline-block bg-[#9506EE]  text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              <span
                className="text-[16px]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                Join Now
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row gap-2 justify-between items-center pt-6 mt-10 md:mt-20 md:px-[10%] px-5.5">
        <div
          className="md:w-[55%] flex flex-col justify-between items-center gap-8"
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          <h2
            className="
          text-[26px] md:text-[40px]
          text-[#1A022D]
          "
          >
            Join Gandharva’s Affiliate Program{" "}
            <span className="text-[#FF7703]">
              Share The Joy of Music and Earn!
            </span>
          </h2>
          <p
            className="text-[17px] text-wrap md:pr-20"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 100 }}
          >
            Are you passionate about music and looking for an opportunity to
            earn while spreading the magic of performing arts? The{" "}
            <span
              className="text-[#464646]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}
            >
              Gandharva School of Music Affiliate Program
            </span>{" "}
            is your gateway to turning your influence into income while
            promoting world-class online music, dance, and drama courses.
          </p>
        </div>
        <div
          className="md:w-[45%]
      flex items-center md:justify-end justify-center  w-full mt-2
        "
        >
          <Image
            src="/qwertyuioplkjhgfdsa.avif"
            width={500}
            height={500}
            alt="refer"
            className="w-[70%] h-[70%] md:w-[300px] md:h-[300px]"
          />
        </div>
      </section>
      {/* Why Join Our Affiliate Program */}
      <section className=" md:px-[10%] flex flex-col items-center pt-6 px-4  mt-10 md:mt-20 ">
        <h2
          className="text-[26px] md:text-[40px] mb-10 text-center"
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          Why Join Our{" "}
          <span className="text-[#FF7703]">Affiliate Program?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2">
          {WhyJoinCardData.map((item, index) => (
            <WhyJoinCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section className=" md:px-[10%] flex flex-col items-center mt-10 md:mt-20 px-4 ">
        <h2
          className="text-[26px] md:text-[40px] mb-4 md:mb-8"
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          How Does <span className="text-[#FF7703]">It Work?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-12 md:p-0">
          {HowDoesWorkCardData.map((item, index) => (
            <HowDoesWorkCard key={index} {...item} />
          ))}
        </div>
      </section>
      <section className=" md:mx-[10%] flex flex-col items-center md:items-start py-5  mt-10 md:mt-30 px-4 bg-[#FFECFE] justify-between  md:flex-row  rounded-3xl mx-4">
        <div className="relative  z-1 w-[90%] max-w-[450px] h-[50vw] max-h-[300px]  md:mx-auto">
          <Image
            src="/What-Can-You-Promote.avif"
            alt="girl promoting"
            fill
            className="object-cover filter hue-rotate-[285deg] rounded-3xl"
          />
        </div>
        <div className="px-2 md:px-12 mt-3">
          <h2
            className="text-[26px] md:text-[38px] text-[#1A022D] text-center md:text-left"
            style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
          >
            What Can You Promote?
          </h2>
          <ul
            className="text-[16px] text-[#4B4B4B] list-disc list-inside"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            <li className="mt-2">
              <strong style={{ fontWeight: 600 }}>
                Live 1:1 Music Classes:
              </strong>{" "}
              From piano and guitar to Hindustani and Carnatic vocals and{" "}
              <Link
                className="underline"
                href={"/courses"}
                aria-label="Courses"
              >
                more
              </Link>
            </li>
            <li className="mt-2">
              <strong style={{ fontWeight: 600 }}>Dance Lessons:</strong>{" "}
              Including Bharatanatyam, Kathak, and Bollywood dance.
            </li>
            <li className="mt-2">
              <strong style={{ fontWeight: 600 }}>Certifications:</strong>{" "}
              Courses preparing students for ABRSM, Trinity, and RSL exams.
            </li>
            <li className="mt-2">
              <strong style={{ fontWeight: 600 }}>
                Exclusive Performance Opportunities:
              </strong>{" "}
              Such as Gandharva Originals and Digital Stage recitals.
            </li>
          </ul>
        </div>
      </section>
      <section className=" md:mx-[10%] flex flex-col-reverse items-center md:items-start py-5  mt-10 md:mt-30 px-4 bg-[#FFECFE] justify-between  md:flex-row-reverse  rounded-3xl mx-4">
        <div className="relative overflow-hidden  w-[90%] max-w-[450px] h-[50vw] max-h-[300px]  md:mx-auto">
          <Image
            src="/What-Can.avif"
            alt="girl thinking"
            fill
            className="object-cover filter hue-rotate-[285deg] rounded-3xl"
          />
        </div>
        <div className="px-2 md:px-12 mb-3">
          <h2
            className="text-[26px] md:text-[38px] text-[#1A022D] text-center md:text-left"
            style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
          >
            Who Can Join?
          </h2>
          <ul
            className="text-[16px] text-[#4B4B4B] list-disc list-inside"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            <li className="mt-2">
              Bloggers and Influencers passionate about music, arts, and
              education.
            </li>
            <li className="mt-2">
              Teachers and Musicians looking to extend their reach.
            </li>
            <li className="mt-2">
              Students or Alumni of Gandharva eager to share their learning
              experience.
            </li>
            <li className="mt-2">
              Anyone with a network interested in online music and performing
              arts education.
            </li>
          </ul>
        </div>
      </section>
      <FAQSection />
      <section className="md:px-[10%] py-10 md:p-[5%] px-1 bg-[#3C096C] flex flex-col items-center gap-8">
        <h2
          className="
                  text-[28px] md:text-[38px]
                  text-[#FFF] text-center
                  "
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          Join Now and Start Earning Today!
        </h2>
        <p
          className="text-[#FFF] text-[16px] px-[5%] md:px-[10%] text-center"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
        >
          Don’t miss this chance to connect people with the beauty of music and
          dance while building a steady income stream. Click below to sign up
          and become a part of the Gandharva affiliate family.
        </p>
        <Link
          href={"/become-our-affiliate/affiliate-partner/"}
          aria-label="Join Now"
          className="mt-4 "
        >
          <button
            className="text-[16px] text-white bg-[#9401D9] px-4 py-2 rounded-md cursor-pointer"
            aria-label="Join Now"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Join Now
          </button>
        </Link>
      </section>
      <Com247 />
    </div>
  );
}

function WhyJoinCard({ picture, title, description }: WhyJoinCardProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-start gap-4 "
      style={{
        boxShadow:
          "4px 0 8px -2px rgba(0, 0, 0, 0.1), -4px 0 8px -2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Image
        src={`/${picture}`}
        width={200}
        height={150}
        alt={title}
        className="w-full rounded-lg"
      />

      <h4
        className="text-xl font-semibold text-orange-500"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700 }}
      >
        {title}
      </h4>

      <p
        className="text-[#525252] leading-relaxed"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {description}
      </p>
    </div>
  );
}

function HowDoesWorkCard({ title, description }: HowDoesWorkCardProps) {
  return (
    <div
      className="p-8 rounded-sm shadow-xl bg-white text-black max-w-sm mx-auto     "
      style={{
        boxShadow: "0 4px 20px rgba(238, 185, 255, 0.5)",
      }}
    >
      <h3
        className="text-2xl font-semibold mb-4 text-[28px] text-[#1A022D] pt-5"
        style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
      >
        {title}
      </h3>
      <p
        className="text-lg text-[#2A2A2A] text-[16px] leading-relaxed pb-5"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {description}
      </p>
    </div>
  );
}

export default page;
