"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CourseCategoryData, CourseLevelInfo } from "@/lib/course-categories-data";

interface Props {
  category: CourseCategoryData;
}

export function CourseCategoryLanding({ category }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<"foundation" | "beginner" | "intermediate" | "advance">("foundation");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const currentLevelInfo: CourseLevelInfo = category.levels[selectedLevel];

  const levelTabs = [
    { key: "foundation", label: "Foundation" },
    { key: "beginner", label: "Beginner" },
    { key: "intermediate", label: "Intermediate" },
    { key: "advance", label: "Advance" },
  ] as const;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">

      {/* Hero Section */}
      <section className="relative w-full min-h-[480px] md:min-h-[580px] bg-[#24105E] flex flex-col justify-center px-4 py-16 md:py-24 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={category.heroBgImage || "/HomeSection4/backgrounds/piano.webp"}
            alt={category.name}
            fill
            className="object-cover object-center filter blur-[1px]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#24105E]/95 via-[#3C096C]/85 to-transparent z-0" />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FF7703] text-white mb-4 shadow-sm">
            {category.category}
          </span>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            {category.heroTagline}
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-8 leading-relaxed font-normal">
            {category.heroDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#courses-section"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-white bg-[#FF7703] hover:bg-[#e06902] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 text-base"
            >
              Explore Courses
            </a>
            <Link
              href="/book-trial"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-white bg-[#9506EE] hover:bg-[#8200DA] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-purple-600/25 text-base"
            >
              Book a Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Level Tabs & Course Details Section */}
      <section id="courses-section" className="py-16 md:py-24 px-4 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#24105E] mb-3"
              style={{ fontFamily: "var(--font-vidaloka), serif" }}
            >
              Curated Courses for Every Stage
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto">
              Select your skill level to see personalized learning paths, duration, and curriculum details.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex bg-white p-1.5 rounded-2xl shadow-md border border-gray-100">
              {levelTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedLevel(tab.key)}
                  className={`px-5 sm:px-7 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
                    selectedLevel === tab.key
                      ? "bg-[#9506EE] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#9506EE] hover:bg-purple-50/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Card Showcase */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Course Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase bg-purple-100 text-[#9506EE]">
                  {selectedLevel.toUpperCase()} LEVEL
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#24105E] leading-snug">
                  {currentLevelInfo.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {currentLevelInfo.description}
                </p>

                {/* Badges / Key Specs */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2">
                  <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100/60 text-center">
                    <p className="text-xs text-gray-500 font-medium">Duration</p>
                    <p className="text-sm font-bold text-[#24105E] mt-0.5">{currentLevelInfo.duration}</p>
                  </div>
                  <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100/60 text-center">
                    <p className="text-xs text-gray-500 font-medium">Certification</p>
                    <p className="text-sm font-bold text-[#24105E] mt-0.5">Accredited</p>
                  </div>
                  <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-100/60 text-center">
                    <p className="text-xs text-gray-500 font-medium">Masterclass</p>
                    <p className="text-sm font-bold text-[#24105E] mt-0.5">{currentLevelInfo.masterclass}</p>
                  </div>
                </div>

                {/* Price & CTA Block */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 line-through mr-2">
                      USD ${currentLevelInfo.originalPrice}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#24105E]">
                      USD ${currentLevelInfo.discountedPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-medium ml-1">/Session</span>
                    <span className="ml-2.5 inline-block px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
                      Save {currentLevelInfo.discountPercent}%
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href="/book-trial"
                      className="px-6 py-3 bg-[#FF7703] hover:bg-[#e06902] text-white font-semibold rounded-xl transition-all shadow-md shadow-orange-500/20 text-sm"
                    >
                      Book Free Trial
                    </Link>
                    <Link
                      href="/courses"
                      className="px-5 py-3 border border-gray-300 hover:border-[#9506EE] text-gray-700 hover:text-[#9506EE] font-semibold rounded-xl transition-all text-sm"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: What You Will Learn (Curriculum Checklist) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#24105E] to-[#3C096C] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF7703]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What You Will Learn
                </h4>
                <ul className="space-y-3">
                  {currentLevelInfo.curriculum.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-purple-100">
                      <svg className="w-4 h-4 text-[#FF7703] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                  <span>1-on-1 Dedicated Guidance</span>
                  <span>Trinity / Rockschool Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trial Booking Banner */}
      <section className="py-12 px-4 bg-[#FF7703] text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Book a free trial now</h3>
            <p className="text-orange-100 text-sm sm:text-base">
              Experience our live 1-on-1 mentoring and custom curriculum without any commitment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/book-trial"
              className="px-8 py-3.5 bg-white text-[#FF7703] font-bold rounded-xl shadow-lg hover:bg-orange-50 transition-all text-sm"
            >
              Book a Free Trial
            </Link>
            <a
              href="https://wa.me/918092621301"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#24105E] text-white font-semibold rounded-xl hover:bg-[#1a0c43] transition-all flex items-center gap-2 text-sm shadow-md"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>

      {/* Musical Journey Matrix Comparison Table */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#24105E] mb-3"
              style={{ fontFamily: "var(--font-vidaloka), serif" }}
            >
              Your Musical Journey With Gandharva
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Progressive milestone comparison across all four stages of our certified programs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#24105E] text-white">
                  <th className="p-4 font-bold border-b border-purple-800 w-1/5">Milestone</th>
                  <th className="p-4 font-bold border-b border-purple-800 w-1/5">Foundation</th>
                  <th className="p-4 font-bold border-b border-purple-800 w-1/5">Beginner</th>
                  <th className="p-4 font-bold border-b border-purple-800 w-1/5">Intermediate</th>
                  <th className="p-4 font-bold border-b border-purple-800 w-1/5">Advance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Courses Offered</td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1">
                      {category.journeyMatrix.coursesOffered.foundation.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1">
                      {category.journeyMatrix.coursesOffered.beginner.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1">
                      {category.journeyMatrix.coursesOffered.intermediate.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1">
                      {category.journeyMatrix.coursesOffered.advance.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Key Features</td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                      {category.journeyMatrix.keyFeatures.foundation.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                      {category.journeyMatrix.keyFeatures.beginner.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                      {category.journeyMatrix.keyFeatures.intermediate.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-gray-700">
                    <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
                      {category.journeyMatrix.keyFeatures.advance.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </td>
                </tr>

                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Opportunity to Perform</td>
                  <td className="p-4 text-gray-700">{category.journeyMatrix.opportunityPerform.foundation.join(", ")}</td>
                  <td className="p-4 text-gray-700">{category.journeyMatrix.opportunityPerform.beginner.join(", ")}</td>
                  <td className="p-4 text-gray-700">{category.journeyMatrix.opportunityPerform.intermediate.join(", ")}</td>
                  <td className="p-4 text-gray-700">{category.journeyMatrix.opportunityPerform.advance.join(", ")}</td>
                </tr>

                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Opportunity to Compete</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                </tr>

                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Opportunity to Compose</td>
                  <td className="p-4 text-center text-gray-300">-</td>
                  <td className="p-4 text-center text-gray-300">-</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                </tr>

                <tr className="hover:bg-purple-50/40">
                  <td className="p-4 font-semibold text-[#24105E] bg-gray-50/80">Opportunity to Teach</td>
                  <td className="p-4 text-center text-gray-300">-</td>
                  <td className="p-4 text-center text-gray-300">-</td>
                  <td className="p-4 text-center text-gray-300">-</td>
                  <td className="p-4 text-center font-bold text-green-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Grades Certifications (4 Pillars) */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#24105E] mb-3"
              style={{ fontFamily: "var(--font-vidaloka), serif" }}
            >
              Why Grades Certifications
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Accredited examinations provide structure, global prestige, and measurable artistic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 text-[#FF7703]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg text-[#24105E] mb-2">Internationally Recognized</h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                Certified by globally reputed boards like Trinity College London, Rockschool, and ABRSM.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 text-[#9506EE]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-bold text-lg text-[#24105E] mb-2">Milestones in Your Journey</h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                Clear grade-by-grade milestones keep you motivated and celebrate tangible artistic growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 text-amber-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-bold text-lg text-[#24105E] mb-2">Builds Rigour & Discipline</h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                Develops methodical daily practice habits, ear training, sight-reading, and performance stamina.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-4 text-rose-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg text-[#24105E] mb-2">Removes Performance Fear</h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                Regular digital recitals and mock exams instill stage confidence and ease performance anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="py-16 md:py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-[#24105E] mb-3"
                style={{ fontFamily: "var(--font-vidaloka), serif" }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Everything you need to know about learning {category.name} at Gandharva School of Music.
              </p>
            </div>

            <div className="space-y-3">
              {category.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left px-5 py-4 font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 cursor-pointer text-sm sm:text-base"
                    >
                      <span>{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-[#FF7703] transform transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
