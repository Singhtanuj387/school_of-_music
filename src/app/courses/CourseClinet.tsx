"use client";
import BookFreeTrial from "@/components/BookFreeTrial";
import Com247 from "@/components/Com247";
import HarmonyMusic from "@/components/HarmonyMusic";
import Link from "next/link";
import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Added for URL State

type Category = "Instruments" | "Singing" | "Dancing";

const allCourseData = {
  Instruments: [
    {
      title: "Piano",
      description:
        "From Western Classical to Pop Hits, our courses empower your child to play all their favorite tunes! With guidance from our expert teachers, students can also achieve international certifications. Enroll today and witness your child’s transformation into a confident musician!",
      href: "/courses/piano/",
      pic: "woman-playing-piano-scaled-1-1.webp",
    },
    {
      title: "Acoustic Guitar",
      description:
        "No matter if your child aspires to strum their favorite tunes or rock out like a superstar, our friendly and certified instructors will support them from the ground up—starting with essential skills like scales and chords, all the way to achieving international certifications.",
      pic: "low-view-shot-man-playing-guitar-wearing-headphones-scaled-1.webp",
      href: "/courses/acoustic-guitar/",
    },
    {
      title: "Electric Guitar",
      description:
        "Whether your child wants to jam to their favorite songs or rise to rockstar status, we’re here to guide them every step of the way. Our friendly, professionally certified teachers will take them from mastering the basics—like scales and chords—to achieving prestigious international certifications.",
      pic: "view-woman-playing-electric-guitar-instrument-scaled-1.webp",
      href: "/courses/electric-guitar/",
    },
    {
      title: "Violin",
      description:
        "Did you know that some of the most remarkable musical masterpieces by composers like Bach and Beethoven were crafted for the violin? Introduce your child to the enchanting world of this graceful instrument! They’ll explore classical pieces while also adapting their skills to play modern pop songs.",
      pic: "child-playing-violin-smiling-latin-girl-practicing-her-music-lessons-home-young-student-taking-online-classes-learn-play-new-instrument-scaled-1.webp",
      href: "/courses/violin/",
    },
    {
      title: "Electronic Keyboard",
      description:
        "The keyboard’s lightweight and portable design makes it an ideal choice for children to cultivate their musical understanding. Your child will build essential skills to effortlessly play both classical and pop music on the keyboard. ",
      pic: "teen-playing-piano-side-view-scaled-1.webp",
      href: "/courses/electronic-keyboard/",
    },
    {
      title: "Ukulele",
      description:
        "With its compact size and joyful sound, the ukulele is the perfect instrument for children embarking on their musical journey. Our expert instructors will guide your child to play with confidence while nurturing a lifelong passion for music. They’ll also assist in preparing your child for international certifications!",
      pic: "young-happy-woman-sitting-sofa-playing-ukulele-singing-enjoying-learning-new-musical-scaled-1.webp",
      href: "/courses/ukulele/",
    },
    {
      title: "Flute",
      description:
        "The flute, deeply rooted in Hindustani Classical music, offers a gateway to Indian culture and heritage while enhancing your musical skills. Our expert instructors will help you build a solid foundation and prepare you for the Akhil Bharatiya Gandharva Mahavidyalaya certification!",
      pic: "teenage-girl-plays-flute_599991-2967.webp",
      href: "/courses/flute/",
    },
    {
      title: "Tabla",
      description:
        "The Tabla is the heartbeat of Indian classical music! Dive into this versatile instrument to truly appreciate the richness of Indian heritage and classical traditions. Our expert teachers will guide you in building a solid foundation in tala while preparing you for the Akhil Bharatiya Gandharva Mahavidyalaya certification!",
      pic: "57ae5f3dfd.avif",
      href: "/courses/tabla/",
    },
  ],
  Singing: [
    {
      title: "Hindustani Vocals",
      description:
        "Exploring Hindustani Classical music will immerse your child in the diverse tapestry of Indian culture. In this performance-based course, they’ll discover vocal techniques, various ragas, and talas. Our friendly, certified instructors will also prepare your child for the Akhil Bharatiya Gandharva Mahavidyalaya certification!",
      pic: "medium-shot-young-woman-celebrating-tamil-new-year-scaled-1.webp",
      href: "/courses/hindustani-vocals/",
    },
    {
      title: "Western Vocals",
      description:
        "Let your child embark on a journey through international music with this performance-based course! They’ll explore a variety of global genres, including Blues, Jazz, Pop, and Rock. Our expert instructors will also guide your child in preparing for international certifications from Trinity, RSL, or ABRSM!",
      pic: "side-view-woman-singing-microphone-scaled-1.webp",
      href: "/courses/western-vocals/",
    },
    {
      title: "Carnatic Vocals",
      description:
        "This comprehensive Carnatic training program provides your child with a deep-rooted understanding of South Indian language, culture, and tradition, laying a strong musical foundation. Covering everything from Sarali Varisai to keerthanams and geethams, this course will immerse your child in the rich, centuries-old legacy of Carnatic music.",
      pic: "portrait-man-practicing-his-profession-celebrate-international-labour-day-scaled-1.webp",
      href: "/courses/carnatic-vocals/",
    },
    {
      title: "Bollywood  Vocals",
      description:
        "Whether you’re looking to sing for leisure or dive passionately into your favorite songs, this course is ideal for you! Our friendly and experienced instructors will guide you through vocal training, helping you build foundational skills for Bollywood vocals, so you can sing with confidence and ease.",
      pic: "caucasian-female-singer.webp",
      href: "/courses/bollywood-vocals/",
    },
    {
      title: "Malayalam Film Music",
      description:
        "Experience the joy of singing or lay the groundwork for your vocal journey with our personalized Malayalam Film Music course. Discover how to sing your favorite Malayalam songs while gaining the confidence to perform on any stage, all with the support of our friendly, certified instructors.",
      pic: "woman-standing-beach_1048944-17858834.webp",
      href: "/courses/malayalam-music/",
    },
    {
      title: "Tamil Film Music",
      description:
        "Gandharva Tamil Film Music Course ensures that the student builds the foundational skills required to sing their favorite Tamil songs. Whether you want to pursue a hobby and have fun singing your favorites songs or pursue music with the help of certified and professional teachers, we’ve got you covered.",
      pic: "360_F_738086165_qD544JsmpOwosX09WVJ599hvo8TON6Da.webp",
      href: "/courses/tamil-music/",
    },
    {
      title: "Telugu Film Music",
      description:
        "Enjoy a fun, relaxing session singing your favorite Telugu songs, or dive deeper into music with passion! The Gandharva Telugu Film course is the ideal starting point for Telugu music lovers. With certified, professional teachers and personalized 1-on-1 sessions, you’ll achieve your goals and have a blast along the way.",
      pic: "Anoushka_Mathur_Indian_Singer-scaled-1.webp",
      href: "/courses/telugu-music/",
    },
    {
      title: "Kannada Film Music",
      description:
        "Sing your favorite Kannada songs with confidence through the Gandharva Kannada Film Music Foundation course. Our certified, professional instructors guide students in building a strong musical foundation, nurturing a deep love for music.",
      pic: "360_F_927605663_g2GKNzkGW1xmvi59zyD4BKSUtP3RuLyC.webp",
      href: "/courses/kannada-music/",
    },
  ],
  Dancing: [
    {
      title: "Bharatanatyam",
      description:
        "Immerse yourself in Indian heritage and culture, master the art of storytelling, and stay fit—all through the joy of dance. Our skilled instructors will guide you in perfecting intricate footwork, graceful hand movements, and prepare you for live stage performances, along with earning an internationally recognized certification—ISTD.",
      pic: "beautiful-young-woman-wearing-sari-scaled-1.webp",
      href: "/courses/bharatanatyam/",
    },
    {
      title: "Kathak",
      description:
        "Welcome to the Kathak Foundation Course, where your child will be introduced to one of India’s most esteemed classical dance styles—Kathak. Our carefully designed curriculum ensures that students develop a solid foundation, progressing from basic footwork to expressive and graceful dance movements.",
      pic: "beautiful-woman-wearing-typical-thai-dress-scaled-1.webp",
      href: "/courses/kathak/",
    },
    {
      title: "Bollywood Dance",
      description:
        "Experience a fun and refreshing dance session from the comfort of your room, or add flair to any event with your moves through our personalized Bollywood Dance course. Groove to your favorite Bollywood tracks while building the confidence to shine on any stage, guided by our friendly and certified dance instructors.",
      pic: "360_F_636172899_ow0AEVA5X6YdfCEmS6qQMQSWY8UKxfIU.webp",
      href: "/courses/bollywood-dance/",
    },
  ],
};

function AllCoursesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories: Category[] = ["Instruments", "Singing", "Dancing"];
  // const [currentCategory, setCurrentCategory] =
  //   useState<Category>("Instruments");

  // 1. Get the category from the URL, or default to "Instruments"
  const currentCategory = (searchParams.get("type") as Category) || "Instruments";

  // 2. Function to change category by updating the URL
  const handleCategoryChange = (category: Category) => {
    // This updates the URL without a full page refresh
    router.push(`/courses?type=${category}`, { scroll: false });
  };
  return (
    <div>
      {/* Hero */}
      <section className="bg-[url(/DCFVNN.avif)] w-full h-[50vh] md:h-[80vh] bg-no-repeat bg-center bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 ">
          <h1
            className="text-[26px] w-full md:w-2/3 text-left md:text-[52px] text-white mb-6 mt-12 md:mt-28 "
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
            }}
          >
            Result-driven courses designed specifically to meet your unique
            needs.
          </h1>
        </div>
      </section>
      <section className="  px-4 md:w-[80%] flex flex-col items-center  mx-auto mt-10 md:mt-20">
        <h2
          className="text-[26px] md:text-[40px] text-[#1A022D] text-center "
          style={{
            fontFamily: "var(--font-vidaloka)",
            fontWeight: 500,
          }}
        >
          Explore All Our Online Music Courses
        </h2>
        <h2
          className="text-[26px] md:text-[40px] text-[#FF7703] text-center lg:text-nowrap"
          style={{
            fontFamily: "var(--font-vidaloka)",
            fontWeight: 500,
          }}
        >
          And Choose One Or More That Excites You The Most!
        </h2>
        
        <div
          className="bg-[#FFD8F2] flex flex-wrap justify-between w-full mt-5 md:mt-10"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              aria-label="category"
              onClick={() => handleCategoryChange(category)}
              className={`w-1/2 cursor-pointer flex-1 py-4 border-6 border-[#FFD8F2] text-[14px] md:text-[16px] transition-colors${
                currentCategory === category
                  ? " border-[#FFD8F2]  bg-white text-[#FF7703]"
                  : "text-[#1A022D]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full my-8 md:my-10">
          {allCourseData[currentCategory]?.map((course, index) => (
            <CourseDetailsCard
              key={index}
              title={course.title}
              description={course.description}
              pic={course.pic}
              href={course.href}
            />
          ))}
        </div>
      </section>
      <div className="mt-10 md:mt-20">
        <HarmonyMusic />
      </div>
      <Com247 />
      <div className="fixed bottom-0 w-full ">
        <BookFreeTrial />
      </div>
    </div>
  );
}

interface CourseInfoCardProps {
  title: string;
  description: string;
  pic: string;
  href: string;
}

const CourseDetailsCard: React.FC<CourseInfoCardProps> = ({
  title,
  description,
  pic,
  href,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className="bg-[#FFECFE] rounded-2xl shadow-lg overflow-hidden flex flex-col h-full 
                    transition-all duration-300 ease-in-out 
                    hover:-translate-y-2 hover:shadow-2xl group">
      
      {/* 1. Image: Touching outer box */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={`/${pic}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 2. Content Container: Background image stretching to edges */}
      <div 
        className="flex flex-col flex-grow bg-[url(/664c5dec47cac5e5b02a070c_Small-Business-Percentage-_1_-removebg-preview-1-1.png)] bg-no-repeat bg-right-bottom bg-contain"
      >
        <div className="flex flex-col flex-grow">
          {/* Title - Fixed at 26px Vidaloka */}
          <h3
            className="text-[26px] font-bold text-[#1A022D] my-3 px-6 leading-tight shrink-0"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
            }}
          >
            {title}
          </h3>

          {/* Description Area - Fixed at 16px DM Sans */}
          <div className="flex-grow px-6">
            <p
              className={`text-[#54595F] text-[16px] leading-relaxed transition-all duration-300 ${
                !isExpanded ? "line-clamp-4" : ""
              }`}
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              {description}
            </p>
            
            {description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#9506EE] text-[14px] font-bold mt-2 hover:underline cursor-pointer"
              >
                {isExpanded ? "Show Less" : "Read More..."}
              </button>
            )}
          </div>

          {/* 3. Button: Pinned to bottom with Original Styling */}
          <div className="mt-10 mb-6 flex items-center shrink-0">
            <Link
              href={href}
              className="bg-[#9506EE] text-white py-2 px-6 rounded-sm mx-auto cursor-pointer transition-all hover:bg-[#7b05c7] hover:shadow-md active:scale-95"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              View all Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPageClient;
