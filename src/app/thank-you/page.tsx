import React from "react";

function page() {
  return (
    <div
      style={{
        fontFamily: "var(--font-dm-sans)",
        fontWeight: 400,
      }}
    >
      <section className="bg-[#3C096C] w-full bg-no-repeat bg-top bg-cover flex flex-col items-start justify-center py-10 px-4"></section>
      <h1 className=" text-4xl md:text-5xl font-bold text-center font-dm-sans text-[#FF7703] mt-10 md:mt-30">
        Thank You!
      </h1>
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 text-center">
        <p className="text-xl md:text-2xl text-[#FF7703] font-semibold mb-4">
          Your trial class has been successfully booked.
        </p>
        <p className="text-[#54595F] text-base md:text-lg mb-2">
          We’ve received your information and will contact you soon to confirm
          the details.
        </p>
        <p className="text-[#54595F] text-base md:text-lg mb-10 md:mb-30">
          Thank you for choosing Gandharva School of Music!
        </p>
      </div>
    </div>
  );
}

export default page;
