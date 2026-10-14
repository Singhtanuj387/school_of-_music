import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Company | Gandharva School Of Music",
  description:
    "Learn about Gandharva School of Music — our mission, vision, world-class music faculty, and passion for personalized online music education.",
};

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative w-full min-h-[380px] md:min-h-[460px] bg-[#24105E] flex flex-col justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/HomeSection4/backgrounds/piano.webp"
            alt="Company Gandharva"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#24105E] via-[#3C096C]/90 to-[#24105E]/80 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 text-center sm:text-left">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FF7703] text-white mb-4">
            About Gandharva
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            Empowering Musical Dreams Across the Globe
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl leading-relaxed">
            Your musical journey deserves dedicated one-on-one attention, internationally recognized certifications, and a supportive stage.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 md:py-24 px-4 bg-gray-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF7703] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#24105E] mb-4"
                  style={{ fontFamily: "var(--font-vidaloka), serif" }}
                >
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  To democratize premium music and performing arts education by connecting passionate learners of all ages with accredited, maestro-level instructors through personalized 1-on-1 digital classrooms. We believe every student possesses a musical voice waiting to be nurtured.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-xs font-semibold uppercase tracking-wider text-purple-700">
                Personalized • Structured • Accessible
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#9506EE] flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#24105E] mb-4"
                  style={{ fontFamily: "var(--font-vidaloka), serif" }}
                >
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  To become the world’s most trusted online conservatory for Indian and Western performing arts, seamlessly blending centuries-old musical traditions with state-of-the-art interactive technology, global exam accreditation, and virtual stage recitals.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-xs font-semibold uppercase tracking-wider text-purple-700">
                Global Standards • Holistic Artistry • Lifelong Love of Music
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gandharva Advantage (4 Pillars) */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#24105E] mb-4"
              style={{ fontFamily: "var(--font-vidaloka), serif" }}
            >
              The Gandharva Advantage
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
              Why thousands of families across 15+ countries trust Gandharva School of Music.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-purple-50/50 border border-purple-100/60">
              <div className="w-16 h-16 rounded-2xl bg-[#24105E] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#24105E] mb-2">1-on-1 Mentorship</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dedicated personal teacher focused 100% on your individual pace, musical goals, and posture correction.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50/50 border border-purple-100/60">
              <div className="w-16 h-16 rounded-2xl bg-[#9506EE] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#24105E] mb-2">Accredited Curriculum</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Official syllabus aligned with Trinity College London, Rockschool, ABRSM, and Gandharva Mahavidyalaya.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50/50 border border-purple-100/60">
              <div className="w-16 h-16 rounded-2xl bg-[#FF7703] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#24105E] mb-2">Digital Recitals & Stage</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Regular virtual concerts, digital recitals, and YouTube spotlights to build poise and banish stage fright.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50/50 border border-purple-100/60">
              <div className="w-16 h-16 rounded-2xl bg-[#3C096C] text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#24105E] mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Convenient lesson timings that fit your school or work schedule across global time zones (US, UK, UAE, India).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#24105E] via-[#3C096C] to-[#24105E] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            Ready to Begin Your Musical Journey?
          </h2>
          <p className="text-purple-200 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Book a complimentary 1-on-1 trial session today and meet your dedicated instructor.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book-trial"
              className="px-8 py-3.5 bg-[#FF7703] hover:bg-[#e06902] text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Book a Free Trial
            </Link>
            <Link
              href="/courses"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all"
            >
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
