import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div className="flex flex-col space-y-2">
    <h4 className=" text-white mb-2" style={{ fontWeight: 500 }}>
      {title}
    </h4>
    {links.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        aria-label="Footer Link"
        className="text-gray-300 hover:text-white transition-colors duration-200"
      >
        {link.label}
      </Link>
    ))}
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const onlineResourceLinks = [
    // { label: "Help", href: "/contact-us/" },
    { label: "Packages", href: "/courses" },
    { label: "Careers", href: "/teach-with-us" },
    { label: "Courses", href: "/courses" },
    { label: "Contact us", href: "/contact-us" },
    // { label: "Gandharva Idol", href: "/" },
  ];

  const onlineClassLinks = [
    { label: "About us", href: "/company" },
    { label: "Terms & Conditions", href: "/policy/terms-conditions/" },
    { label: "Privacy Policy", href: "/policy/privacy-policy/" },
    { label: "Cookies policy", href: "/policy/cookies-policy/" },
    { label: "Refund policy", href: "/policy/refund-policy/" },
    { label: "FAQ's", href: "/faq" },
  ];

  const availableCourses = [
    { label: "Piano", href: "/courses/piano" },
    { label: "Acoustic guitar", href: "/courses/acoustic-guitar" },
    { label: "Electronic keyboard", href: "/courses/electronic-keyboard" },
    { label: "Ukulele", href: "/courses/ukulele" },
    { label: "Violin", href: "/courses/violin" },
    { label: "Electric guitar", href: "/courses/electric-guitar" },
    { label: "Flute", href: "/courses/flute" },
    { label: "Tabla", href: "/courses/tabla" },
  ];

  const vocalCourses = [
    { label: "Bollywood Vocals", href: "/courses/bollywood-vocals" },
    { label: "Western Vocals", href: "/courses/western-vocals" },
    { label: "Hindustani Vocals", href: "/courses/hindustani-vocals" },
    { label: "Carnatic Vocals", href: "/courses/carnatic-vocals" },
    { label: "Tamil Music", href: "/courses/tamil-music" },
    { label: "Telugu Music", href: "/courses/telugu-music" },
    {
      label: "Kannada Music",
      href: "/courses/kannada-music",
    },
    { label: "Malayalam Music", href: "/courses/malayalam-music" },
  ];

  const danceCourses = [
    { label: "Bharatanatyam Dance", href: "/courses/bharatanatyam" },
    { label: "Bollywood Dance", href: "/courses/bollywood-dance" },
    { label: "Kathak Dance", href: "/courses/kathak" },
  ];

  return (
    <>
      {/* <FooterTopBar /> */}
      <footer
        className="bg-[#3C096C] text-white py-8"
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 border-b border-gray-400 pb-4">
            <Link
              href="https://gandharvaschoolofmusic.com/"
              aria-label="Gandharva School Of Music"
              className="flex items-center"
            >
              <Image
                src="/cropped-Add-a-subheading-5-png-scaled.avif"
                alt="Gandharva School Of Music"
                width={140}
                height={60}
                className="h-14 w-auto"
              />
            </Link>

            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61567839746944#"
                className="text-white hover:text-gray-300 transition-colors bg-[#9461E1] p-2 rounded-xl px-2 duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/gandharvaonline/"
                className="text-white hover:text-gray-300 transition-colors bg-[#9461E1] p-2 rounded-xl px-2 duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/gandharva-school-of-music/"
                className="text-white hover:text-gray-300 transition-colors bg-[#9461E1] p-2 rounded-xl px-2 duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <FooterSection
              title="Online Music Resources"
              links={onlineResourceLinks}
            />
            <FooterSection
              title="Online Music Classes"
              links={onlineClassLinks}
            />
            <FooterSection title="Available Courses" links={availableCourses} />
            <FooterSection title="Vocal Courses" links={vocalCourses} />
            <FooterSection title="Dance Courses" links={danceCourses} />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-400 mx-auto text-center">
            <p className="text-md md:text-[16px] mb-4 md:mb-0">
              © Copyright {currentYear}, All Rights Reserved by Gandharva School
              Of Music
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
