import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogDetails, blogs } from "@/Data/blog";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogDetailPage from "@/app/[slug]/Client";
import { blogMetaDescriptions } from "@/Data/MetaData";
import type { BlogEntry } from "@/types/blog";

const siteURL = "https://www.gandharvaschoolofmusic.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check blogDetails first
  const blogInfo: BlogEntry | undefined = blogDetails[slug];
  if (blogInfo) {
    // @ts-expect-error dynamic indexing
    const description: string = blogMetaDescriptions[slug]?.description || blogInfo.title;
    return {
      title: `${blogInfo.title} | Gandharva School of Music`,
      description,
      alternates: {
        canonical: `${siteURL}/blog/${slug}/`,
      },
    };
  }

  // Fallback to BLOG_POSTS
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (post) {
    return {
      title: `${post.title} | Gandharva School of Music`,
      description: post.excerpt,
      alternates: {
        canonical: `${siteURL}/blog/${slug}/`,
      },
    };
  }

  return {
    title: "Blog Not Found | Gandharva School of Music",
    description: "The article you are looking for does not exist.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Gandharva original blog articles
  const blogInfo: BlogEntry | undefined = blogDetails[slug];
  if (blogInfo) {
    return <BlogDetailPage params={{ blogData: blogInfo, slug }} />;
  }

  // 2. Custom curated blog posts
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Hero Header */}
      <section className="bg-[#24105E] pt-24 md:pt-28 pb-16 md:pb-20 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-xs text-purple-200 hover:text-white mb-6">
            ← Back to All Articles
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FF7703] text-white">
              {post.category}
            </span>
            <span className="text-xs text-purple-200">{post.date}</span>
            <span className="text-xs text-purple-200">•</span>
            <span className="text-xs text-purple-200">{post.readTime}</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 pt-4 border-t border-purple-800">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-purple-900 border-2 border-[#FF7703]">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-white text-sm sm:text-base">{post.author.name}</p>
              <p className="text-xs text-purple-200">{post.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 w-full">
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 py-12 md:py-16 flex-1">
        <div className="prose prose-lg prose-purple max-w-none text-gray-700 leading-relaxed space-y-6">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={index} className="text-2xl font-bold text-[#24105E] pt-4 mt-6">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <li key={index} className="list-disc ml-6 text-gray-700">
                  {paragraph.replace("- ", "")}
                </li>
              );
            }
            return <p key={index} className="text-base sm:text-lg text-gray-700">{paragraph}</p>;
          })}
        </div>

        {/* Call to action card */}
        <div className="mt-16 bg-gradient-to-br from-[#24105E] to-[#3C096C] text-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">Ready to master your instrument?</h4>
            <p className="text-purple-200 text-sm">
              Experience Gandharva&apos;s world-class personalized 1-on-1 instruction.
            </p>
          </div>
          <Link
            href="/book-trial"
            className="px-6 py-3 bg-[#FF7703] hover:bg-[#e06902] text-white font-bold rounded-xl whitespace-nowrap shadow-md transition-all text-sm"
          >
            Book Free Trial
          </Link>
        </div>
      </main>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
