"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Accordion from "./Accordion";
import faqPages, { FAQPage } from "../Data/faqPages";

type AccordionItem = {
  question: string;
  answer: string;
};

function findFAQForPathname(pathname: string | null): FAQPage {
  // default fallback
  const defaultPage = faqPages["default"];
  if (!pathname) return defaultPage;

  // direct exact match
  if (faqPages[pathname]) return faqPages[pathname];

  // keys that end with '*' act as prefix patterns, e.g. /courses/*
  const entries = Object.entries(faqPages).filter(([k]) => k !== "default");

  // first try explicit wildcard/pattern matches
  for (const [key, page] of entries) {
    if (key.endsWith("*")) {
      const prefix = key.slice(0, -1);
      if (pathname.startsWith(prefix)) return page;
    }
  }

  // then try longest prefix match with plain keys
  let bestMatch: FAQPage | null = null;
  let bestLen = -1;
  for (const [key, page] of entries) {
    if (pathname.startsWith(key) && key.length > bestLen) {
      bestMatch = page;
      bestLen = key.length;
    }
  }
  if (bestMatch) return bestMatch;

  return defaultPage;
}

function FAQSection() {
  const pathname = usePathname();
  const page = findFAQForPathname(pathname ?? "/");
  const faqData: AccordionItem[] = page.faqs;
  const title = page.title || "FAQs";

  return (
    <div>
      <section className="md:px-[10%] py-5 mt-10 md:mt-20 px-1 ">
        <h2
          className="
                  text-[20px] md:text-[38px]
                  text-[#1A022D] text-center
                  "
          style={{ fontFamily: "var(--font-vidaloka)", fontWeight: 500 }}
        >
          <span className="text-[#FF7703]">{title}</span>
        </h2>
        <Accordion faqData={faqData} />
      </section>
    </div>
  );
}

export default FAQSection;
