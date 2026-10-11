"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Check,
  Music,
  Plus,
  Users,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  CATALOG_ITEMS,
  CategoryIcon,
  CatalogItem,
} from "./CourseCatalogData";

export interface AdminCourseCatalogSectionProps {
  /** Optional existing courses count mapping: instrument name -> count */
  courseCountsByInstrument?: Record<string, number>;
  /** Optional existing teachers count mapping: instrument name -> count */
  teacherCountsByInstrument?: Record<string, number>;
  /** Callback when admin clicks "+ Create Course for this discipline" */
  onCreateCourseForDiscipline?: (item: CatalogItem) => void;
  /** Currently active filter discipline for the external courses list */
  selectedDisciplineFilter?: string | null;
  /** Callback when admin clicks to filter courses table/cards below */
  onSelectDisciplineFilter?: (instrumentName: string | null) => void;
}

export function AdminCourseCatalogSection({
  courseCountsByInstrument = {},
  teacherCountsByInstrument = {},
  onCreateCourseForDiscipline,
  selectedDisciplineFilter,
  onSelectDisciplineFilter,
}: AdminCourseCatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"All" | "Instruments" | "Singing">("All");
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(
    selectedDisciplineFilter || null
  );

  // Filter items by category tab and live search
  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const matchesTab = filterTab === "All" || item.category === filterTab;
      if (!matchesTab) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [filterTab, searchQuery]);

  const instrumentsList = useMemo(
    () => filteredItems.filter((i) => i.category === "Instruments"),
    [filteredItems]
  );
  const singingList = useMemo(
    () => filteredItems.filter((i) => i.category === "Singing"),
    [filteredItems]
  );

  const selectedItem = useMemo(
    () => CATALOG_ITEMS.find((i) => i.id === (selectedDisciplineId || selectedDisciplineFilter)),
    [selectedDisciplineId, selectedDisciplineFilter]
  );

  const handleCardClick = (item: CatalogItem) => {
    if (selectedDisciplineId === item.id) {
      // Toggle off
      setSelectedDisciplineId(null);
      if (onSelectDisciplineFilter) {
        onSelectDisciplineFilter(null);
      }
    } else {
      setSelectedDisciplineId(item.id);
      if (onSelectDisciplineFilter) {
        onSelectDisciplineFilter(item.name);
      }
    }
  };

  const getStats = (item: CatalogItem) => {
    // Look up count by exact name or lowercase matching
    const nameLower = item.name.toLowerCase();
    const idLower = item.id.toLowerCase();

    let courses = 0;
    for (const [inst, count] of Object.entries(courseCountsByInstrument)) {
      const lower = inst.toLowerCase();
      if (lower === nameLower || lower.includes(nameLower) || nameLower.includes(lower)) {
        courses += count;
      }
    }

    let teachers = 0;
    for (const [inst, count] of Object.entries(teacherCountsByInstrument)) {
      const lower = inst.toLowerCase();
      if (lower === nameLower || lower.includes(nameLower) || nameLower.includes(lower)) {
        teachers += count;
      }
    }

    return { courses, teachers };
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all">
      {/* Top accent gradient border */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#3C096C] via-[#9810FA] to-[#FF7803]" />

      <div className="p-5 sm:p-7 lg:p-8 space-y-6">
        {/* Header: Title + Subtitle on Left, Search Bar & Tab Pills on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-50 text-purple-700 border border-purple-200/60">
                Master Academy Catalog
              </span>
              <span className="text-xs text-gray-400 font-medium">
                16 Accredited Disciplines
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1A4D] tracking-tight">
              Academy Discipline & Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 max-w-2xl">
              Browse the 16 core disciplines offered at Gandharva. Click any discipline to filter curriculum packages below, review assigned faculty, or spin up a new course syllabus.
            </p>
          </div>

          {/* Search Bar & Filter Pills Container */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disciplines & styles..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 bg-white placeholder-gray-400 text-[#1E1A4D] focus:outline-none focus:border-[#3C096C] focus:ring-2 focus:ring-[#3C096C]/10 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-slate-200/90 bg-slate-50/80 shadow-2xs self-start sm:self-auto">
              {(["All", "Instruments", "Singing"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filterTab === tab
                      ? "bg-[#3C096C] text-white shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {tab}
                  {tab === "All" && ` (16)`}
                  {tab === "Instruments" && ` (8)`}
                  {tab === "Singing" && ` (8)`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Grid Area */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-3 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#1E1A4D]">
              No disciplines found matching &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try searching for &quot;Piano&quot;, &quot;Guitar&quot;, &quot;Violin&quot;, &quot;Carnatic&quot;, or &quot;Hindustani&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setFilterTab("All");
              }}
              className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-100 text-purple-700 text-xs font-bold hover:bg-purple-200/80 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : filterTab === "All" ? (
          /* Two Column Split: Instruments on Left, Singing on Right */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-1">
            {/* ─── INSTRUMENTS COLUMN ─── */}
            {instrumentsList.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#481282]" />
                    <h3 className="font-bold text-sm text-[#1E1A4D]">
                      Instruments ({instrumentsList.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Strings, Keys, Wind & Percussion
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {instrumentsList.map((item) => {
                    const isSelected = selectedDisciplineId === item.id;
                    const stats = getStats(item);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleCardClick(item)}
                        className={`group relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                          isSelected
                            ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                            : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}

                        {/* Top: Icon Box */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-purple-100 text-purple-700"
                              : "bg-[#F3E8FF] text-[#481282] group-hover:scale-105"
                          }`}
                        >
                          <CategoryIcon type={item.iconType} isSelected={isSelected} />
                        </div>

                        {/* Middle: Details */}
                        <div className="mt-2.5">
                          <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>

                          {/* Admin stats & tags */}
                          <div className="flex flex-wrap items-center gap-1 mt-2">
                            {item.tags?.map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                              >
                                {t}
                              </span>
                            ))}
                            {stats.courses > 0 && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5 leading-none">
                                {stats.courses} {stats.courses === 1 ? "pkg" : "pkgs"}
                              </span>
                            )}
                            {stats.teachers > 0 && (
                              <span className="text-[9px] font-bold text-purple-700 bg-purple-50 rounded px-1.5 py-0.5 leading-none">
                                {stats.teachers} gurus
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── SINGING COLUMN ─── */}
            {singingList.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7703]" />
                    <h3 className="font-bold text-sm text-[#1E1A4D]">
                      Singing ({singingList.length})
                    </h3>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Classical, Contemporary & Playback
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {singingList.map((item) => {
                    const isSelected = selectedDisciplineId === item.id;
                    const isBollywood = item.id.includes("Bollywood");
                    const stats = getStats(item);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleCardClick(item)}
                        className={`group relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                          isSelected
                            ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                            : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}

                        {/* Top: Icon Box */}
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                            isSelected && isBollywood
                              ? "bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md"
                              : isSelected
                              ? "bg-purple-100 text-purple-700"
                              : item.defaultIconBg || "bg-[#F3E8FF] text-[#481282] group-hover:scale-105"
                          }`}
                        >
                          <CategoryIcon type={item.iconType} isSelected={isSelected} />
                        </div>

                        {/* Middle: Details */}
                        <div className="mt-2.5">
                          <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                            {item.subtitle}
                          </p>

                          {/* Admin stats & tags */}
                          <div className="flex flex-wrap items-center gap-1 mt-2">
                            {item.tags?.map((t) => (
                              <span
                                key={t}
                                className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                              >
                                {t}
                              </span>
                            ))}
                            {stats.courses > 0 && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5 leading-none">
                                {stats.courses} {stats.courses === 1 ? "pkg" : "pkgs"}
                              </span>
                            )}
                            {stats.teachers > 0 && (
                              <span className="text-[9px] font-bold text-purple-700 bg-purple-50 rounded px-1.5 py-0.5 leading-none">
                                {stats.teachers} gurus
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Single Tab Filter Grid (All Instruments or All Singing) */
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  filterTab === "Instruments" ? "bg-[#481282]" : "bg-[#FF7703]"
                }`}
              />
              <h3 className="font-bold text-sm text-[#1E1A4D]">
                {filterTab} ({filteredItems.length})
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
              {filteredItems.map((item) => {
                const isSelected = selectedDisciplineId === item.id;
                const isBollywood = item.id.includes("Bollywood");
                const stats = getStats(item);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCardClick(item)}
                    className={`group relative p-3.5 rounded-2xl border text-left flex flex-col justify-between min-h-[148px] transition-all cursor-pointer active:scale-[0.97] ${
                      isSelected
                        ? "border-2 border-[#581C87] bg-white ring-4 ring-[#581C87]/10 shadow-[0_8px_20px_-4px_rgba(88,28,135,0.22)]"
                        : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                    }`}
                  >
                    {/* Selected Check Badge */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full bg-[#3C096C] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}

                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected && isBollywood
                          ? "bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md"
                          : isSelected
                          ? "bg-purple-100 text-purple-700"
                          : item.defaultIconBg || "bg-[#F3E8FF] text-[#481282] group-hover:scale-105"
                      }`}
                    >
                      <CategoryIcon type={item.iconType} isSelected={isSelected} />
                    </div>

                    <div className="mt-2.5">
                      <h4 className="font-bold text-xs sm:text-[13px] text-[#1E1A4D] leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-normal mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-1 mt-2">
                        {item.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-semibold text-slate-500 bg-slate-100 rounded px-1.5 py-0.5 leading-none"
                          >
                            {t}
                          </span>
                        ))}
                        {stats.courses > 0 && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5 leading-none">
                            {stats.courses} {stats.courses === 1 ? "pkg" : "pkgs"}
                          </span>
                        )}
                        {stats.teachers > 0 && (
                          <span className="text-[9px] font-bold text-purple-700 bg-purple-50 rounded px-1.5 py-0.5 leading-none">
                            {stats.teachers} gurus
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Selected Discipline Action Bar ── */}
        {selectedItem ? (
          <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-purple-50/50 p-4 rounded-2xl border border-purple-100/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#3C096C] flex items-center justify-center shrink-0 shadow-xs">
                <CategoryIcon type={selectedItem.iconType} isSelected={true} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1E1A4D]">
                    {selectedItem.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white text-purple-700 border border-purple-200">
                    {selectedItem.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {selectedItem.subtitle} · {getStats(selectedItem).courses} active packages · {getStats(selectedItem).teachers} faculty mentors
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2.5 self-start md:self-auto">
              {onCreateCourseForDiscipline && (
                <button
                  type="button"
                  onClick={() => onCreateCourseForDiscipline(selectedItem)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#3C096C] hover:bg-[#2D0752] text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Course for {selectedItem.name}</span>
                </button>
              )}

              <Link
                href={`/admin/trials`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#1E1A4D] text-xs font-bold shadow-2xs transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF7803]" />
                <span>Book Trial</span>
              </Link>

              {onSelectDisciplineFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDisciplineId(null);
                    onSelectDisciplineFilter(null);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-black hover:bg-white transition-all cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Click any discipline above to filter curriculum courses or add a new package.
            </span>
            <span className="font-semibold text-purple-700">
              Total 16 Tracks
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
