import Image from "next/image";
import React from "react";
interface WhyGradeCertificateCardProps {
  imageSrc: string;
  text: string;
}
const WhyGradeCertificateCard: React.FC<WhyGradeCertificateCardProps> = ({
  imageSrc,
  text,
}) => {
  return (
    <div className="p-6 max-h-[312px] w-[280px] flex flex-col items-center mx-auto">
      <div className="w-full  bg-[#FFECFE] rounded-xl">
        <Image
          src={imageSrc}
          width={220}
          height={220}
          alt={text}
          className="mx-auto mb-1 max-w-sm  max-h-[220px] "
        />
      </div>
      <p
        className="text-[17px]  text-[#54595F] p-4 text-center"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        {text}
      </p>
    </div>
  );
};

function WhyGradeCertificate() {
  return (
    <div>
      <section className="md:px-[10%] py-5 mt-10 md:mt-20 px-1 ">
        <h2
          className="
                  text-[26px] md:text-[38px]
                  text-[#1A022D] text-center
                  "
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          Why Grades <span className="text-[#FF7703]">Certifications</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5 justify-center lg:justify-normal">
          <WhyGradeCertificateCard
            imageSrc="/3d-education-concept-icon-globe-planet-earth-in-mortarboard-school-tourism-travel-concept-3d-render-illustration-png.webp"
            text="Internationally Recognized"
          />
          <WhyGradeCertificateCard
            imageSrc="/gerente-proyecto-agencia-negocios-startup-3d_66255-1990-removebg-preview.webp"
            text="Milestones in your Musical Journey"
          />
          <WhyGradeCertificateCard
            imageSrc="/uploads-sohpia-is-playing-a-guitar-512.webp"
            text="Builds Rigour & Practice Discipline"
          />
          <WhyGradeCertificateCard
            imageSrc="/estatuilla-hombre-tocando-guitarra_1187092-198781-removebg-preview.webp"
            text="Remove Performance Fear"
          />
        </div>
      </section>
    </div>
  );
}

export default WhyGradeCertificate;
