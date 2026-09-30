import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { INSTRUMENTS } from "@/types";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Search, Sparkles, ArrowRight, Music } from "lucide-react";

interface TeachersPageProps {
  searchParams: Promise<{
    instrument?: string;
    search?: string;
  }>;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Browse Teachers | Gandharva School of Music",
  description:
    "Find accredited instructors for 1-to-1 live music and dance lessons at Gandharva School of Music.",
};

const POPULAR_INSTRUMENTS = [
  "Piano",
  "Electronic Keyboard",
  "Acoustic Guitar",
  "Electric Guitar",
  "Violin",
  "Tabla",
  "Flute",
  "Western Vocals",
  "Hindustani Vocals",
  "Carnatic Vocals",
  "Bharatanatyam",
  "Kathak",
];

export default async function TeachersPage({
  searchParams,
}: TeachersPageProps) {
  const params = await searchParams;
  const instrumentFilter = params.instrument?.trim();
  const searchQuery = params.search?.trim();

  // Normalize instrument filter against INSTRUMENTS list (case-insensitively)
  const canonicalInstrument =
    instrumentFilter && instrumentFilter !== "All"
      ? INSTRUMENTS.find(
          (inst) => inst.toLowerCase() === instrumentFilter.toLowerCase(),
        ) || instrumentFilter
      : undefined;

  // Find all known instruments that match search query words (case-insensitively)
  const matchingInstruments = searchQuery
    ? INSTRUMENTS.filter(
        (inst) =>
          inst.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery.toLowerCase().includes(inst.toLowerCase()),
      )
    : [];

  // Query published teachers
  const teachers = await db.teacherProfile.findMany({
    where: {
      isPublished: true,
      ...(process.env.NODE_ENV === "production"
        ? { user: { emailVerified: { not: null } } }
        : {}),
      ...(canonicalInstrument
        ? {
            instruments: {
              has: canonicalInstrument,
            },
          }
        : {}),
      ...(searchQuery
        ? {
            OR: [
              {
                user: {
                  name: { contains: searchQuery, mode: "insensitive" },
                },
              },
              {
                bio: { contains: searchQuery, mode: "insensitive" },
              },
              ...(matchingInstruments.length > 0
                ? [
                    {
                      instruments: {
                        hasSome: matchingInstruments,
                      },
                    },
                  ]
                : []),
            ],
          }
        : {}),
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          timezone: true,
          image: true,
        },
      },
      availabilityRules: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Ensure expert & moderate instruments are hydrated even if dev bundle cached scalar list
  const tieredMap: Record<string, { expert: string[]; moderate: string[] }> = {};
  try {
    const rawTiers = await db.$queryRawUnsafe<
      { id: string; expertInstruments: string[]; moderateInstruments: string[] }[]
    >(`SELECT id, "expertInstruments", "moderateInstruments" FROM "TeacherProfile"`);
    for (const row of rawTiers) {
      tieredMap[row.id] = {
        expert: row.expertInstruments || [],
        moderate: row.moderateInstruments || [],
      };
    }
  } catch {
    // Fallback
  }

  return (
    <div className="min-h-screen bg-bg text-body py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-accent/30 text-xs font-bold uppercase tracking-wider text-accent-dark">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Verified Instructors</span>
          </div>

          <SplitHeading
            as="h1"
            size="2xl"
            firstClause="Find Your Maestro &"
            accentClause="Master Teacher"
          />

          <p className="text-body max-w-2xl text-sm sm:text-base leading-relaxed">
            Every teacher at Gandharva School of Music provides structured, personalized
            1:1 instruction with studio-grade acoustics. Browse schedules and reserve your session.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-border-default rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <form className="flex-1 relative" method="GET" action="/teachers">
              {instrumentFilter && (
                <input
                  type="hidden"
                  name="instrument"
                  value={instrumentFilter}
                />
              )}
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search teachers by name or discipline..."
                className="w-full bg-bg-alt/30 border border-border-default rounded-xl pl-4 pr-24 py-2.5 text-sm text-heading placeholder-body-muted focus:outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-xs font-bold text-white rounded-lg transition-all btn-tactile"
              >
                Search
              </button>
            </form>
          </div>

          {/* Instrument chips */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-heading uppercase tracking-wider">
              Filter by instrument:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Link
                href={`/teachers${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all btn-tactile ${
                  !instrumentFilter || instrumentFilter === "All"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-bg-alt text-heading hover:bg-surface-muted border border-border-subtle"
                }`}
              >
                All Instruments
              </Link>
              {POPULAR_INSTRUMENTS.map((inst) => {
                const isActive =
                  canonicalInstrument?.toLowerCase() === inst.toLowerCase();
                const href = `/teachers?instrument=${encodeURIComponent(inst)}${
                  searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
                }`;
                return (
                  <Link
                    key={inst}
                    href={href}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all btn-tactile ${
                      isActive
                        ? "bg-primary text-white shadow-xs"
                        : "bg-bg-alt text-heading hover:bg-surface-muted border border-border-subtle"
                    }`}
                  >
                    {inst}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Teachers Grid */}
        {teachers.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white border border-border-default rounded-2xl space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-bg-alt text-heading flex items-center justify-center mx-auto text-xl font-serif">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-heading">
              No teachers found
            </h3>
            <p className="text-sm text-body max-w-sm mx-auto">
              We could not find any published teachers matching your current
              filter criteria.
            </p>
            <div className="pt-2">
              <Link
                href="/teachers"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-xs font-bold text-white rounded-xl transition-all btn-tactile"
              >
                Clear all filters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachers.map((teacher) => {
              const teacherName = teacher.user.name || "Music Teacher";
              const initials = teacherName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={teacher.id}
                  className="bg-white border border-border-default hover:border-cta/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Avatar, Name, Rate */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base font-serif shadow-xs overflow-hidden shrink-0">
                          {teacher.user.image ? (
                            <Image
                              src={teacher.user.image}
                              alt={teacherName}
                              width={48}
                              height={48}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            initials
                          )}
                        </div>
                        <div>
                          <h2 className="font-serif text-lg font-bold text-heading group-hover:text-primary transition-colors">
                            {teacherName}
                          </h2>
                          <p className="text-xs text-body-muted flex items-center gap-1.5 mt-0.5">
                            <span>{teacher.yearsTeaching} yrs teaching</span>
                            <span>•</span>
                            <span>{teacher.user.timezone || "UTC"}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-heading font-serif">
                          ${(teacher.hourlyRate / 100).toFixed(2)}
                        </div>
                        <div className="text-[11px] text-body-muted">/ 60 min</div>
                      </div>
                    </div>

                    {/* Instruments (Expertise & Moderate) */}
                    {(() => {
                      const tierData = tieredMap[teacher.id];
                      const moderateList =
                        (teacher as any).moderateInstruments?.length > 0
                          ? (teacher as any).moderateInstruments
                          : tierData?.moderate || [];
                      const expertList =
                        (teacher as any).expertInstruments?.length > 0
                          ? (teacher as any).expertInstruments
                          : tierData?.expert?.length > 0
                          ? tierData.expert
                          : teacher.instruments.filter((i: string) => !moderateList.includes(i));
                      return (
                        <div className="flex flex-wrap items-center gap-1.5">
                          {expertList.map((inst: string) => (
                            <span
                              key={inst}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary shadow-xs"
                              title="Expertise (Mastery Level)"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                              {inst}
                            </span>
                          ))}
                          {moderateList.map((inst: string) => (
                            <span
                              key={inst}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-bg-alt/70 border border-border-subtle text-[11px] font-medium text-body"
                              title="Moderate (Intermediate Level)"
                            >
                              {inst}
                            </span>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Bio excerpt */}
                    {teacher.bio && (
                      <p className="text-sm text-body line-clamp-3 leading-relaxed">
                        {teacher.bio}
                      </p>
                    )}

                    {/* Languages */}
                    {teacher.languages.length > 0 && (
                      <div className="text-xs text-body-muted">
                        Teaches in:{" "}
                        <span className="text-heading font-medium">
                          {teacher.languages.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Action */}
                  <div className="pt-5 mt-4 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-xs text-success font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-success"></span>
                      Accepting students
                    </span>
                    <Link
                      href={`/teachers/${teacher.id}${
                        instrumentFilter ? `?instrument=${encodeURIComponent(instrumentFilter)}` : ""
                      }`}
                      className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-bold transition-all shadow-sm shadow-cta/25 flex items-center gap-1.5 btn-tactile"
                    >
                      <span>View & Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
