import { db } from "@/lib/db";
import { CourseCard } from "@/components/dashboard/CourseCard";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { CurrencySelector } from "@/components/currency/CurrencySelector";

export const metadata = {
  title: "Accredited Music & Dance Courses | Gandharva School of Music",
  description:
    "Explore our accredited classical music, vocal, and dance courses. Learn from master faculty with Trinity College London and ABRSM exam preparation.",
};

export default async function PublicCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string }>;
}) {
  const { discipline } = await searchParams;

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      ...(discipline ? { discipline: discipline.toUpperCase() as any } : {}),
    },
    orderBy: { priceMinorUnits: "asc" },
  });

  return (
    <div className="min-h-screen bg-bg text-body py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-subtle text-accent-dark border border-accent/30">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Gandharva Academy Curriculum
          </span>

          <SplitHeading
            as="h1"
            size="2xl"
            align="center"
            firstClause="Accredited Courses &"
            accentClause="Masterclasses"
          />

          <p className="text-sm sm:text-base text-body leading-relaxed max-w-2xl mx-auto">
            Begin your journey with 1-to-1 private mentorship, Trinity College London and ABRSM exam preparation, and verified performance certifications.
          </p>
        </div>

        {/* Filter Navigation & Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 p-1.5 bg-bg-alt border border-border-default rounded-2xl">
            <Link
              href="/courses"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-tactile ${
                !discipline
                  ? "bg-primary text-white shadow-xs"
                  : "text-heading hover:bg-surface-muted"
              }`}
            >
              All Courses
            </Link>
            <Link
              href="/courses?discipline=instrument"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-tactile ${
                discipline === "instrument"
                  ? "bg-primary text-white shadow-xs"
                  : "text-heading hover:bg-surface-muted"
              }`}
            >
              Instruments
            </Link>
            <Link
              href="/courses?discipline=vocals"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-tactile ${
                discipline === "vocals"
                  ? "bg-primary text-white shadow-xs"
                  : "text-heading hover:bg-surface-muted"
              }`}
            >
              Classical Vocals
            </Link>
            <Link
              href="/courses?discipline=dance"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-tactile ${
                discipline === "dance"
                  ? "bg-primary text-white shadow-xs"
                  : "text-heading hover:bg-surface-muted"
              }`}
            >
              Traditional Dance
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-body-muted">
            <span className="font-medium">Currency:</span>
            <CurrencySelector variant="compact" />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              basePath="/courses"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
