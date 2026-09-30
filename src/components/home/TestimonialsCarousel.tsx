"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "I really appreciate how my teachers tailor the lessons to suit my interests, helping me excel in my strengths while keeping me motivated to work on areas of improvement.",
    name: "Bill Neckon",
    role: "Student",
    avatar: "/HomeSection5/testimonial-images/1.webp",
  },
  {
    id: 2,
    quote:
      "The one-on-one sessions were incredibly beneficial for Avishi, as she received undivided attention. I’ve now also enrolled my younger daughter in Gandharva for singing lessons.",
    name: "Yalina Husain",
    role: "Student",
    avatar: "/HomeSection5/testimonial-images/2.webp",
  },
  {
    id: 3,
    quote:
      "I always look forward to my sessions because my teacher is so fun and supportive, especially when I struggle with something. They always make it easier for me to understand.",
    name: "Samme Yen",
    role: "Student",
    avatar: "/HomeSection5/testimonial-images/3.webp",
  },
  {
    id: 4,
    quote:
      "We’ve noticed significant progress in Keshva's music lessons, but what stands out the most is her personal growth and the boost in her confidence.",
    name: "Keshva's",
    role: "Parent",
    avatar: "/HomeSection5/testimonial-images/4.webp",
  },
  {
    id: 5,
    quote:
      "I started learning as a child but couldn’t continue. Now, with Gandharva's online platform, I’m finally able to pursue my dream of learning to sing.",
    name: "Kavya Patel",
    role: "Student",
    avatar: "/HomeSection5/testimonial-images/5.webp",
  },
];

export function TestimonialsCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      {/* Large Decorative Quote SVGs */}
      <svg
        className="absolute z-30 -top-6 md:-top-10 left-2 md:left-6 w-12 h-12 md:w-16 md:h-16 text-[#FF7703] drop-shadow-md"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
      </svg>
      <svg
        className="absolute z-30 -bottom-6 md:-bottom-10 right-2 md:right-6 w-12 h-12 md:w-16 md:h-16 text-[#FF7703] rotate-180 drop-shadow-md"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
      </svg>

      {/* Carousel Container */}
      <div className="w-full relative overflow-hidden rounded-3xl min-h-[26rem] md:min-h-[28rem] shadow-2xl border border-purple-800/40">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#2D0752] text-white flex-none w-full min-h-[26rem] md:min-h-[28rem] flex flex-col justify-center items-center px-6 sm:px-12 md:px-16"
            >
              {/* Subtle watermark background */}
              <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <Image
                  src="/HomeSection5/testimonials-bg.png"
                  alt="Watermark"
                  fill
                  sizes="100vw"
                  className="rotate-[225deg] scale-150 opacity-10 object-cover"
                />
              </div>

              {/* Text & Profile Info */}
              <div className="relative z-20 flex flex-col justify-center items-center text-center space-y-6 max-w-2xl py-8">
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed custom-font-2 italic text-purple-50">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-purple-400/80 shadow-md mb-3 bg-white">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 80px, 96px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold tracking-wide text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-[#FF7703] uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bubble Slide Dots */}
        <div className="absolute bottom-4 flex gap-2 w-full justify-center z-30">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIdx === idx
                  ? "w-6 bg-[#FF7703] opacity-100"
                  : "w-2 bg-white opacity-40 hover:opacity-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
