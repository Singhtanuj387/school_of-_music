"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { blogs } from "@/Data/blog";
import { notFound } from "next/navigation";
import { BlogEntry } from "@/types/blog";
import { FaFacebook } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { HiUserCircle } from "react-icons/hi2";
// import ValentineSpecialOfferPopup from "@/components/ValentineSpecialOfferPopup";

interface SuggestBlog {
  title: string;
  thumbnail: string;
  date: string;
  slug: string;
}

export default function BlogDetailPage({
  params,
}: {
  params: { blogData: BlogEntry; slug: string };
}) {
  // Unwrap params using React.use()
  //   const unwrappedParams = use(params);
  const slug = params.slug;

  const [blog, setBlog] = useState<BlogEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [SuggestedBlogs, setSuggestedBlogs] = useState<SuggestBlog[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  function getRandomBlogs(count: number = 3) {
    const usedIndexes = new Set<number>();
    const randomBlogs = [];

    while (randomBlogs.length < count && usedIndexes.size < blogs.length) {
      const index = Math.floor(Math.random() * blogs.length);
      if (!usedIndexes.has(index)) {
        usedIndexes.add(index);
        randomBlogs.push(blogs[index]);
      }
    }

    return randomBlogs;
  }

  useEffect(() => {
    if (params.blogData) {
      setBlog(params.blogData);
    }
    const SuggestedBlog = getRandomBlogs();
    setSuggestedBlogs(SuggestedBlog);
    setLoading(false);

    const popupSeen = localStorage.getItem("blogPopupSeen");

    if (
      slug === "15-heartfelt-love-songs-to-set-the-mood-this-valentines-day" &&
      !popupSeen
    ) {
      setTimeout(() => {
        setShowPopup(true);
      }, 5000); // show after 5 seconds
    }
  }, [params.blogData,slug]);

  // If blog not found, show 404 page
  if (!loading && !blog) {
    notFound();
  }

  if (loading || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handleClosePopup = () => {
    localStorage.setItem("blogPopupSeen", "true");
    setShowPopup(false);
  };

  return (
    <>
      {/* {showPopup && <ValentineSpecialOfferPopup onClose={handleClosePopup} />} */}
      <section className="bg-[#3C096C] w-full bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4"></section>
      <div className="min-h-screen pt-10 pb-16">
        <div className="container lg:ml-36 px-4 max-w-[924px]">
          {/* Blog header */}
          <div className="mb-8">
            <h1
              className="text-[24px] md:text-[44px]  mb-4"
              style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
            >
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6 text-[14px] md:text-[16px]">
              <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                By {blog.author}
              </span>
              <span className="border-r h-4 mx-2"></span>
              {/* <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                {blog.date}
              </span> */}
              <span>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Featured image */}
          {/* <div className="relative w-full aspect-[20/9] border-2  rounded-xl overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-contain"
              priority
            />
          </div> */}
          <div className="relative w-full mb-4 md:mb-12 aspect-[2500/720]  rounded-xl overflow-hidden">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Table of contents */}
          <div className="bg-[#F6DCFD] p-6 rounded-lg mb-8">
            <h2
              className="text-[22px] md:text-[26px] mb-4"
              style={{ fontWeight: 600, fontFamily: "var(--font-dm-sans)" }}
            >
              Table of Contents
            </h2>
            <ul style={{ fontFamily: "var(--font-dm-sans)" }}>
              {Array.isArray(blog.BlogContent) &&
                blog.BlogContent.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 text-[18px] text-[#1a022d]"
                    style={{ fontWeight: 500 }}
                  >
                    <a
                      href={`#${item.headline
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.headline}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div
            className="text-[18px] text-[#2e2f30] mb-8"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>

          {/* Blog content */}
          {Array.isArray(blog.BlogContent) &&
            blog.BlogContent.map((section, index) => (
              <div
                key={index}
                className="prose prose-lg max-w-none mb-12"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <h2
                  id={section.headline.toLowerCase().replace(/\s+/g, "-")}
                  className="text-[24px] md:text-[32px] mb-4 text-[#1a022d]"
                  style={{ fontWeight: 600 }}
                >
                  {section.headline}
                </h2>
                <div
                  className="text-[16px] md:text-[18px] text-[#2e2f30] mb-8"
                  style={{ fontWeight: 400 }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          {/* Outro section */}
          {blog.outro && (
            <div className=" mb-8">
              <h2
                className="text-[24px] md:text-[32px] mb-4 text-[#1a022d]"
                style={{ fontWeight: 600 }}
              >
                {blog.outro.headline}
              </h2>
              <div
                className="text-[18px] text-[#2e2f30] mb-8"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: blog.outro.content }}
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row md:gap-16 items-center">
            <p
              className="text-[20px] md:text-[24px] text-[#1a0222d]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}
            >
              Share this post on:
            </p>{" "}
            <div className="flex gap-2">
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=https://gandharvaschoolofmusic.com/${slug}/`}
                aria-label="Share on Facebook"
                className="w-10 h-10 flex items-center justify-center bg-[#8C06E1] hover:bg-black rounded-full  transition-colors"
              >
                <FaFacebook size={20} color="#FFF" />
              </Link>
              <Link
                href={`https://wa.me/?text=Check%20this%20out%20on%20Gandharva:%20https://gandharvaschoolofmusic.com/${slug}/`}
                aria-label="Share on WhatsApp"
                className="w-10 h-10 flex items-center justify-center bg-[#8C06E1] rounded-full hover:bg-black transition-colors"
              >
                <BsWhatsapp size={20} color="#FFF" />
              </Link>
              <Link
                href={`https://twitter.com/intent/tweet?text=10%20Best%20Party%20Songs%20for%20New%20Year%20Eve!&url=https://gandharvaschoolofmusic.com/${slug}/`}
                aria-label="Share on Twitter"
                className="w-10 h-10 flex items-center justify-center bg-[#8C06E1] rounded-full hover:bg-black transition-colors"
              >
                <FaTwitter size={20} color="#FFF" />
              </Link>
              <Link
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://gandharvaschoolofmusic.com/${slug}/`}
                aria-label="Share on LinkedIn"
                className="w-10 h-10 flex items-center justify-center bg-[#8C06E1] rounded-full hover:bg-black transition-colors"
              >
                <FaLinkedin size={20} color="#FFF" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t opacity-25 my-8 w-[90%] mx-auto"></div>
        {/* Suggest blog section */}
        <div>
          {SuggestedBlogs.length > 0 && (
            <>
              <div className="container md:ml-36 px-4 max-w-[924px] mt-16">
                <h2
                  className="text-[24px] md:text-[26px] mb-8"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}
                >
                  Related Posts
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2 px-4 lg:mx-[10%]">
                {SuggestedBlogs.map((blog, index) => (
                  <SuggestBlogCard
                    key={index}
                    thumbnail={blog.thumbnail}
                    title={blog.title}
                    date={blog.date}
                    slug={blog.slug}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

interface SuggestBlogCardProps {
  thumbnail: string;
  title: string;
  date: string;
  slug: string;
}

function SuggestBlogCard({
  thumbnail,
  title,
  date,
  slug,
}: SuggestBlogCardProps) {
  return (
    <Link href={`/${slug}`} aria-label="Read more">
      <div
        className="bg-white rounded-xl overflow-hidden  transition-shadow duration-300 h-full flex flex-col  shadow-sm"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        <div className="relative  aspect-[1280/720]">
          <Image
            src={`/${thumbnail}`}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="text-[18px] md:text-[20px] text-[#FF7703] mb-3"
            style={{ fontWeight: 500 }}
          >
            {title}
          </h3>
          <div className="flex gap-4 items-center text-[12px] md:text-[14px] text-[#240046] mb-3">
            <HiUserCircle size={24} color="gray" />
            <span>By Gandharva Learnings </span>
            <span>/</span>
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
