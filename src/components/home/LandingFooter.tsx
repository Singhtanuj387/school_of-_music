import Link from "next/link";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer
      className="bg-[#3C096C] text-white py-12 border-t border-purple-900/50"
      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top bar with Logo & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b border-purple-400/30 pb-6 gap-6">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Gandharva School Of Music"
          >
            <Image
              src="/cropped-Add-a-subheading-5-png-scaled.webp"
              alt="Gandharva School Of Music"
              width={160}
              height={60}
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/profile.php?id=61567839746944#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-gray-200 transition-all bg-[#9461E1] hover:bg-[#8200DA] p-2.5 rounded-xl duration-200 shadow-sm"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-5 h-5"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/gandharvaonline/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-gray-200 transition-all bg-[#9461E1] hover:bg-[#8200DA] p-2.5 rounded-xl duration-200 shadow-sm"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 448 512"
                className="w-5 h-5"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/gandharva-school-of-music/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white hover:text-gray-200 transition-all bg-[#9461E1] hover:bg-[#8200DA] p-2.5 rounded-xl duration-200 shadow-sm"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 448 512"
                className="w-5 h-5"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 5-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* Column 1 */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="text-white font-semibold text-base mb-1 tracking-wide">
              Online Music Resources
            </h4>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Packages
            </Link>
            <Link href="/teachers" className="text-purple-200 hover:text-white transition-colors">
              Careers
            </Link>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/teachers" className="text-purple-200 hover:text-white transition-colors">
              Contact us
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="text-white font-semibold text-base mb-1 tracking-wide">
              Online Music Classes
            </h4>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              About us
            </Link>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Cookies policy
            </Link>
            <Link href="/courses" className="text-purple-200 hover:text-white transition-colors">
              Refund policy
            </Link>
            <Link href="/teachers" className="text-purple-200 hover:text-white transition-colors">
              FAQ&apos;s
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="text-white font-semibold text-base mb-1 tracking-wide">
              Available Courses
            </h4>
            <Link href="/teachers?instrument=Piano" className="text-purple-200 hover:text-white transition-colors">
              Piano
            </Link>
            <Link href="/teachers?instrument=Acoustic%20Guitar" className="text-purple-200 hover:text-white transition-colors">
              Acoustic guitar
            </Link>
            <Link href="/teachers?instrument=Electronic%20Keyboard" className="text-purple-200 hover:text-white transition-colors">
              Electronic keyboard
            </Link>
            <Link href="/teachers?instrument=Ukulele" className="text-purple-200 hover:text-white transition-colors">
              Ukulele
            </Link>
            <Link href="/teachers?instrument=Violin" className="text-purple-200 hover:text-white transition-colors">
              Violin
            </Link>
            <Link href="/teachers?instrument=Electric%20Guitar" className="text-purple-200 hover:text-white transition-colors">
              Electric guitar
            </Link>
            <Link href="/teachers?instrument=Flute" className="text-purple-200 hover:text-white transition-colors">
              Flute
            </Link>
            <Link href="/teachers?instrument=Tabla" className="text-purple-200 hover:text-white transition-colors">
              Tabla
            </Link>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="text-white font-semibold text-base mb-1 tracking-wide">
              Vocal Courses
            </h4>
            <Link href="/teachers?instrument=Bollywood%20Vocals" className="text-purple-200 hover:text-white transition-colors">
              Bollywood Vocals
            </Link>
            <Link href="/teachers?instrument=Western%20Vocals" className="text-purple-200 hover:text-white transition-colors">
              Western Vocals
            </Link>
            <Link href="/teachers?instrument=Hindustani%20Vocals" className="text-purple-200 hover:text-white transition-colors">
              Hindustani Vocals
            </Link>
            <Link href="/teachers?instrument=Carnatic%20Vocals" className="text-purple-200 hover:text-white transition-colors">
              Carnatic Vocals
            </Link>
            <Link href="/teachers?instrument=Tamil%20Music" className="text-purple-200 hover:text-white transition-colors">
              Tamil Music
            </Link>
            <Link href="/teachers?instrument=Telugu%20Music" className="text-purple-200 hover:text-white transition-colors">
              Telugu Music
            </Link>
            <Link href="/teachers?instrument=Kannada%20Music" className="text-purple-200 hover:text-white transition-colors">
              Kannada Music
            </Link>
            <Link href="/teachers?instrument=Malayalam%20Music" className="text-purple-200 hover:text-white transition-colors">
              Malayalam Music
            </Link>
          </div>

          {/* Column 5 */}
          <div className="flex flex-col space-y-2.5">
            <h4 className="text-white font-semibold text-base mb-1 tracking-wide">
              Dance Courses
            </h4>
            <Link href="/teachers?instrument=Bharatanatyam" className="text-purple-200 hover:text-white transition-colors">
              Bharatanatyam Dance
            </Link>
            <Link href="/teachers?instrument=Bollywood%20Dance" className="text-purple-200 hover:text-white transition-colors">
              Bollywood Dance
            </Link>
            <Link href="/teachers?instrument=Kathak" className="text-purple-200 hover:text-white transition-colors">
              Kathak Dance
            </Link>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-purple-400/30 text-center text-sm text-purple-200">
          <p>© Copyright 2026, All Rights Reserved by Gandharva School Of Music</p>
        </div>
      </div>
    </footer>
  );
}
