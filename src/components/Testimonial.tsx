"use client";
import React, { useEffect, useRef, useState } from "react";
import QuoteIcon from "./QuoteIcon";
import Image from "next/image";

const testimonials = [
  {
    name: "Bill Neckon",
    role: "Student",
    testimonial:
      "I really appreciate how my teachers tailor the lessons to suit my interests, helping me excel in my strengths while keeping me motivated to work on areas of improvement.",
  },
  {
    name: "Yalina Husain",
    role: "Student",
    testimonial:
      "The one-on-one sessions were incredibly beneficial for Avishi, as she received undivided attention. I’ve now also enrolled my younger daughter in Gandharva for singing lessons.",
  },
  {
    name: "Samme Yen",
    role: "Student",
    testimonial:
      "I always look forward to my sessions because my teacher is so fun and supportive, especially when I struggle with something. They always make it easier for me to understand.",
  },
  {
    name: "Keshva's",
    role: "Parent",
    testimonial:
      "We’ve noticed significant progress in Keshva's music lessons, but what stands out the most is her personal growth and the boost in her confidence.",
  },
  {
    name: "Kavya Patel",
    role: "Student",
    testimonial:
      "I started learning as a child but couldn’t continue. Now, with Gandharva's online platform, I’m finally able to pursue my dream of learning to sing.",
  },
];

function Testimonial() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const intervalRef = useRef(setInterval(() => {}, 100));

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
  };

  const handleBubbleClick = (index: number) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <div className="relative w-[24rem] md:w-[40rem] lg:w-[56rem] h-[29rem] text-[#FF7703] px-4">
      {/* Quote Icons */}
      <QuoteIcon className="absolute z-10 -top-8 md:-top-14 left-2 size-12 md:size-20" />
      <QuoteIcon className="z-10 absolute rotate-180 -bottom-8 md:-bottom-14 right-2 size-12 md:size-20" />

      {/* Slider Row */}
      <div className="w-full h-full relative overflow-hidden rounded-3xl">
        <div
          className="flex h-full transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative border border-gray-500/40 bg-purple-950 text-white flex-none w-full"
            >
              {/* Background Image */}
              <div className="absolute z-10 w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src="/HomeSection5/testimonials-bg.png"
                  alt="Background Image"
                  width={500} // Adjust width based on actual image size
                  height={500} // Adjust height based on actual image size
                  className="h-full w-full rotate-[225deg] scale-150 opacity-10"
                />
              </div>

              <div className="relative w-full h-full z-20 flex flex-col justify-center items-center px-8">
                <p className="text-xl md:text-2xl mb-4 text-center w-[20rem] md:w-[32rem] custom-font-2">
                  &quot;{item.testimonial}&quot;
                </p>
                {/* Person image */}
                <Image
                  src={`/HomeSection5/testimonial-images/${
                    Number(index) + 1
                  }.webp`}
                  alt={item.name}
                  width={96} // 24 * 4 (size-24 in Tailwind is 96px)
                  height={96} // Ensure correct aspect ratio
                  className="rounded-full mx-auto mb-2 object-cover border-4 border-purple-500 bg-white"
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
                <p className="text-lg">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Bubbles */}
      <div className="absolute bottom-5 flex gap-2 w-full justify-center">
        {testimonials.map((_, index) => (
          <button
            aria-label="bubble"
            key={index}
            className={`size-2 rounded-full transition-colors bg-white ${
              index === current ? "opacity-90" : "opacity-30"
            }`}
            onClick={() => handleBubbleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
