"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const instructors = [
  {
    name: "Rohanel Max",
    specialty: "Acoustic Guitar",
    certification: "Trinity Grade 8 Certification",
    experience: "10+ Years",
    pic: "Rohanel.jpg",
  },
  {
    name: "Devraj Pilai",
    specialty: "Carnatic Classical",
    certification: "RSL Carnatic Grade 8 Certified",
    experience: "20+ Years",
    pic: "Devraj.jpg",
  },
  {
    name: "Nisha Iyer",
    specialty: "Western Vocals",
    certification: "Western Vocal Certification",
    experience: "15+ Years",
    pic: "Nisha.jpg",
  },
  {
    name: "Kavya Mehta",
    specialty: "Carnatic Vocals",
    certification: "RSL Carnatic Grade Certificate",
    experience: "15+ Years",
    pic: "kavya.jpg",
  },
  {
    name: "Sanvi Poul",
    specialty: "Piano",
    certification: "Sr. Grade, Piano",
    experience: "15+ Years",
    pic: "Sanvi.jpg",
  },
  {
    name: "Rohanel Max",
    specialty: "Acoustic Guitar",
    certification: "Trinity Grade 8 Certification",
    experience: "10+ Years",
    pic: "Rohanel.jpg",
  },
  {
    name: "Devraj Pilai",
    specialty: "Carnatic Classical",
    certification: "RSL Carnatic Grade 8 Certified",
    experience: "20+ Years",
    pic: "Devraj.jpg",
  },
];

function OurTutorWebHome() {
  const [current, setCurrent] = useState(0);
  const total = instructors.length;
  const intervalRef = useRef(setInterval(() => {}, 100));
  const cardWidth = 22; // in rem

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 4 <= total ? (prev + 1) % total : 0));
    }, 7000);
  };

  const handleBubbleClick = (index: number) => {
    clearInterval(intervalRef.current);
    setCurrent(index);
    startAutoSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      {/* Slider Row */}
      <div
        className="relative overflow-hidden pb-8"
        style={{ width: `${cardWidth * 3}rem` }}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${(current * 100) / 3}%)` }}
        >
          {instructors.map((item, index) => (
            <div
              key={index}
              className="px-6 relative text-white flex flex-col justify-center items-center"
              style={{ minWidth: `${cardWidth}rem` }}
            >
              {/* Person image */}
              <Image
                src={`/HomeSection6/${item.pic}`}
                alt={item.name}
                width={144} // Adjust size as needed
                height={144}
                className="rounded-xl mx-auto mb-2 object-cover border-4 border-white"
              />
              <div className="relative w-full flex pt-6 pb-8 flex-col justify-center items-center bg-white text-2xl text-black rounded-xl shadow-lg">
                <div className="absolute -z-10 -top-24 w-full h-40 bg-white rounded-xl"></div>
                <div className="font-medium mb-1 custom-font-2">
                  {item.name}
                </div>
                <div className="mb-4 font-medium custom-font-2">
                  {item.specialty}
                </div>
                <div className="text-sm font-semibold text-[#FF7703] pb-1">
                  {item.certification}
                </div>
                <div className="text-sm text-[#FF7703]">
                  Experience - {item.experience}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Bubbles */}
      <div className="flex gap-4 w-full justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            aria-label="bubble"
            key={index}
            className={`size-3 rounded-full transition-colors bg-black ${
              index === current ? "opacity-85" : "opacity-10"
            }`}
            onClick={() => handleBubbleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default OurTutorWebHome;
