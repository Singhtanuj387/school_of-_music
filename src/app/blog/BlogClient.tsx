"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Added for URL state
import { blogs } from "@/Data/blog";
import BlogCard from "@/components/BlogCard";
import BookFreeTrial from "@/components/BookFreeTrial";

export default function BlogsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Get the category from the URL (e.g., ?category=piano)
  // If there is no category in URL, default to "general"
  const activeCategory = searchParams.get("category") || "general";

  // 2. Filter blogs based on the URL category
  const filteredBlogs = blogs.filter((blog) => {
    if (activeCategory === "all") return true;
    return blog.category === activeCategory;
  });

  // 3. Get unique categories
  const categories = [
    ...Array.from(new Set(blogs.map((blog) => blog.category))),
  ] as string[];

  // 4. Function to change category by updating the URL
  const handleCategoryChange = (category: string) => {
    // This updates the URL without a full page reload
    router.push(`/blog?category=${category}`, { scroll: false });
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Title Section */}
      <section className="bg-[url(/teach-us-1.avif)] w-full h-[40vh] md:h-[50vh] bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4">
        <div className="md:px-[10%] py-5 md:p-[10%] px-1 md:w-[80%]">
          <h1
            className="text-[30px] w-full md:w-2/3 text-left md:text-[52px] text-white mb-6 mt-12 md:mt-28"
            style={{
              fontFamily: "var(--font-vidaloka)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            Latest On Our Blog About All Things Music
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <h2
          className="text-[28px] md:text-[32px] my-6"
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          Topics
        </h2>
        <div className="border-t opacity-25"></div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)} // Now updates URL
              className={`py-3 px-3 md:px-7 rounded-md text-[16px] transition-colors flex-1 ${
                activeCategory === category
                  ? "bg-[#54595F] text-white"
                  : "bg-[#F1DAF0] text-black hover:bg-[#54595F]"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {/* Empty state */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-vidaloka)" }}>
              No blogs found
            </h3>
            <p className="text-gray-600" style={{ fontFamily: "var(--font-dm-sans)" }}>
              No blogs available for this category.
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 w-full">
        <BookFreeTrial />
      </div>
    </div>
  );
}