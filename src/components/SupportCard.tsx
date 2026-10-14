import Image from "next/image";
import React from "react";

function SupportCard() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 md:mt-20 mb-10 md:mb-20 px-4">
      <div className="bg-gradient-to-r from-[#430163] to-[#013974] rounded-2xl flex flex-col md:flex-row items-center justify-between  p-4 pb-0 md:p-8 gap-4 md:gap-6">
        {/* Text */}
        <div className="text-center md:text-left">
          <p
            className="text-white text-[18px] md:text-[22px] font-medium"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Can’t find what you are looking for?
          </p>
          <p
            className="text-white text-[14px] md:text-[16px] mt-1"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            Chat with our dedicated team to get a quick resolution.
          </p>
        </div>

        {/* Image */}
        <div className="shrink-0 bottom-0  ">
          <Image
            src="/male-customer-service-3d-cartoon-avatar-portrait-png-removebg-preview.png"
            height={150}
            width={150}
            alt="Customer Care"
            className="object-contain md:h-[130px] md:w-[130px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SupportCard;
