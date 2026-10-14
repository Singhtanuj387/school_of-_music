import type { BlogCard } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: BlogCard;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`} aria-label="Blog Card" className="group block h-full">
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-3 h-full flex flex-col border border-gray-100"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {/* 1. Image with "Ken Burns" Zoom & Subtle Tint */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={`/${blog.thumbnail}`}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          
          {/* 2. The "Glass" Overlay - Slides up from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* 3. Floating Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
              {blog.category || "Music"}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow relative bg-white">
          <div className="flex gap-2 items-center text-[11px] font-medium text-gray-400 mb-2">
            <span>{blog.author}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>{new Date(blog.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
          </div>

          <h3 
            className="text-[19px] leading-tight mb-3 text-[#2D2E2F] group-hover:text-purple-600 transition-colors duration-300" 
            style={{ fontWeight: 600 }}
          >
            {blog.title}
          </h3>

          <p className="text-[#54595F] text-[14px] leading-relaxed mb-4 flex-grow line-clamp-2 opacity-90">
            {blog.shortDescription}
          </p>

          {/* 4. The "Arrow Reveal" Animation */}
          <div className="flex items-center text-purple-600 font-bold text-sm tracking-wide transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            READ STORY 
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* 5. Radial Glow Effect (Very subtle) */}
        <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />
      </div>
    </Link>
  );
}