"use client";

import React from "react";
import { Mic, Music } from "lucide-react";

export interface CatalogItem {
  id: string;
  name: string;
  category: "Instruments" | "Singing";
  subtitle: string;
  tags?: string[];
  iconType:
    | "piano"
    | "acousticGuitar"
    | "electricGuitar"
    | "electronicKeyboard"
    | "flute"
    | "violin"
    | "ukulele"
    | "tabla"
    | "westernVocals"
    | "hindustani"
    | "carnatic"
    | "bollywood"
    | "regionalFilm";
  iconBoxBg?: string;
  defaultIconBg?: string;
  iconColor?: string;
}

export const CATALOG_ITEMS: CatalogItem[] = [
  // ─── INSTRUMENTS (8) ──────────────────────────────────
  {
    id: "Piano",
    name: "Piano",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["1-on-1"],
    iconType: "piano",
  },
  {
    id: "Acoustic Guitar",
    name: "Acoustic Guitar",
    category: "Instruments",
    subtitle: "Beginner friendly",
    iconType: "acousticGuitar",
  },
  {
    id: "Electric Guitar",
    name: "Electric Guitar",
    category: "Instruments",
    subtitle: "Beginner friendly",
    iconType: "electricGuitar",
  },
  {
    id: "Electronic Keyboard",
    name: "Electronic Keyboard",
    category: "Instruments",
    subtitle: "1-on-1",
    tags: ["Live"],
    iconType: "electronicKeyboard",
  },
  {
    id: "Flute",
    name: "Flute",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["1-on-1"],
    iconType: "flute",
  },
  {
    id: "Violin",
    name: "Violin",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "violin",
  },
  {
    id: "Ukulele",
    name: "Ukulele",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "ukulele",
  },
  {
    id: "Tabla",
    name: "Tabla",
    category: "Instruments",
    subtitle: "Beginner friendly",
    tags: ["Live"],
    iconType: "tabla",
  },

  // ─── SINGING (8) ──────────────────────────────────────
  {
    id: "Western Vocals",
    name: "Western Vocals",
    category: "Singing",
    subtitle: "Beginner friendly",
    iconType: "westernVocals",
    iconBoxBg: "bg-rose-50 text-rose-500",
  },
  {
    id: "Hindustani Classical Vocals (North India)",
    name: "Hindustani Classical Vocals",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "hindustani",
    iconBoxBg: "bg-purple-100/70 text-purple-700",
  },
  {
    id: "Carnatic Classical Vocals (South India)",
    name: "Carnatic Classical",
    category: "Singing",
    subtitle: "South India",
    iconType: "carnatic",
    iconBoxBg: "bg-orange-100/70 text-[#FF7803]",
  },
  {
    id: "Bollywood & Light Vocals (North India)",
    name: "Bollywood & Light Vocals",
    category: "Singing",
    subtitle: "North India",
    iconType: "bollywood",
    iconBoxBg: "bg-purple-100/70 text-purple-700",
  },
  {
    id: "Malayalam Film Music",
    name: "Malayalam Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-rose-50 text-rose-500",
  },
  {
    id: "Tamil Film Music",
    name: "Tamil Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
  {
    id: "Telugu Film Music",
    name: "Telugu Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
  {
    id: "Kannada Film Music",
    name: "Kannada Film Music",
    category: "Singing",
    subtitle: "North Indian tradition",
    iconType: "regionalFilm",
    iconBoxBg: "bg-orange-50 text-[#FF7803]",
  },
];

export function CategoryIcon({
  type,
  isSelected,
}: {
  type: CatalogItem["iconType"];
  isSelected?: boolean;
}) {
  switch (type) {
    case "piano":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M7 4v8M12 4v8M17 4v8" />
          <rect x="5.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <rect x="10.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <rect x="15.5" y="4" width="3" height="7.5" rx="0.5" fill="currentColor" />
          <path d="M3 13.5h18" />
        </svg>
      );
    case "acousticGuitar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M14.5 9.5l4.5-4.5a1.4 1.4 0 0 1 2 2l-4.5 4.5" />
          <circle cx="9.5" cy="14.5" r="4.5" />
          <circle cx="9.5" cy="14.5" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 12l5.5-5.5" />
        </svg>
      );
    case "electricGuitar":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8l4-4M18 4l2 2" />
          <path d="M15 9l-3 3c-.5.5-.5 1.5 0 2l.5.5c-2 2-4.5 3.5-6.5 2.5s-.5-4.5 1.5-6.5l.5.5c.5.5 1.5.5 2 0l3-3" />
          <circle cx="9" cy="15" r="1.2" fill="currentColor" />
        </svg>
      );
    case "electronicKeyboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="5.5" cy="9.5" r="1" fill="currentColor" />
          <circle cx="8.5" cy="9.5" r="1" fill="currentColor" />
          <path d="M12 6v6M15 6v6M18 6v6M2 13h20" />
        </svg>
      );
    case "flute":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 20L20 4" />
          <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
          <circle cx="11.5" cy="12.5" r="1" fill="currentColor" />
          <circle cx="14.5" cy="9.5" r="1" fill="currentColor" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
        </svg>
      );
    case "violin":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 5l4-4M17 1l2 2" />
          <path d="M14 6l-2 2c-.5.5-.5 1.2 0 1.7.8.8.8 2 0 2.8-.5.5-.5 1.2 0 1.7l1.5 1.5c-2 2-4.5 3-6.5 2s-1-4.5 1-6.5l1.5 1.5c.5.5 1.2.5 1.7 0 .8-.8 2-.8 2.8 0 .5.5 1.2.5 1.7 0l2-2" />
          <circle cx="9" cy="15" r="1.2" fill="currentColor" />
        </svg>
      );
    case "ukulele":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 9l5-5M18 3l3 3" />
          <circle cx="9" cy="15" r="4.5" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 12l4-4" />
        </svg>
      );
    case "tabla":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <ellipse cx="8" cy="8" rx="4.5" ry="2.5" />
          <path d="M3.5 8v6c0 2 2 3.5 4.5 3.5s4.5-1.5 4.5-3.5V8" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" fillOpacity="0.4" />
          <ellipse cx="17" cy="11" rx="4" ry="2.2" />
          <path d="M13 11v5c0 1.8 1.8 3 4 3s4-1.2 4-3v-5" />
          <circle cx="17" cy="11" r="1.2" fill="currentColor" fillOpacity="0.4" />
        </svg>
      );
    case "westernVocals":
      return <Mic className="w-5 h-5 stroke-[2]" />;
    case "hindustani":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="7" width="20" height="11" rx="2" />
          <path d="M5 10v5M8 10v5M11 10v5M14 10v5M17 10v5" />
          <rect x="5" y="10" width="2" height="3" fill="currentColor" />
          <rect x="11" y="10" width="2" height="3" fill="currentColor" />
          <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
        </svg>
      );
    case "carnatic":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="7" cy="16" r="4.5" />
          <circle cx="7" cy="16" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <path d="M10.5 13.5L19 5" />
          <circle cx="19" cy="5" r="2.5" />
          <path d="M18 3l3 3" />
        </svg>
      );
    case "bollywood":
    case "regionalFilm":
    default:
      return <Music className="w-5 h-5 stroke-[2]" />;
  }
}
