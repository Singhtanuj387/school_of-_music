"use client";

import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

type AccordionItem = {
  question: string;
  answer: string;
};

const Accordion = ({ faqData }: { faqData: AccordionItem[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full mx-auto space-y-4 p-4">
      {faqData.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={index}
            className={`border rounded-xl shadow-sm bg-[#FFF] ${
              isOpen ? "border-black" : "border-gray-300"
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              aria-label="Toggle Accordion"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              className="flex justify-between items-center w-full p-5 text-left text-[#1A022D] text-[18px] focus:outline-none"
            >
              {item.question}
              {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            <div
              className={`transition-all duration-200 ease-in-out overflow-hidden px-5 text-[#240046] text-[16px] ${
                isOpen ? "max-h-[500px] opacity-100 pb-3" : "max-h-0 opacity-0"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
