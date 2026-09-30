import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-helpers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { PriceDisplay } from "@/components/currency/PriceDisplay";
import { CurrencySelector } from "@/components/currency/CurrencySelector";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default async function PublicCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();

  const course = await db.course.findUnique({
    where: { slug },
  });

  if (!course || !course.isPublished) {
    notFound();
  }

  const priceFormatted = `₹${(course.priceMinorUnits / 100).toLocaleString("en-IN")}`;
  const syllabusItems = course.syllabusSummary.split("•").map((s) => s.trim()).filter(Boolean);

  const enrollUrl = user
    ? `/student/dashboard/courses/${course.slug}`
    : `/login?callbackUrl=/student/dashboard/courses/${course.slug}`;

  return (
    <div className="min-h-screen bg-bg text-body py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-xs font-bold text-body-muted hover:text-heading transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Courses
        </Link>

        <div className="bg-white border border-border-default rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent-subtle text-accent-dark border border-accent/30">
                {course.discipline}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-subtle text-primary border border-primary/30">
                Level: {course.level}
              </span>
              {course.accreditation && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bg-alt text-cta border border-cta/30">
                  <Award className="w-3.5 h-3.5 text-cta" />
                  {course.accreditation}
                </span>
              )}
            </div>

            <SplitHeading
              as="h1"
              size="2xl"
              firstClause={course.title}
              accentClause="Curriculum"
            />

            <p className="text-sm sm:text-base text-body leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-bg-alt/50 border border-border-subtle space-y-1">
              <div className="flex items-center gap-2 text-accent-dark text-xs font-bold">
                <BookOpen className="w-4 h-4 text-accent" /> Curriculum
              </div>
              <div className="text-xl font-bold font-serif text-heading">
                {course.sessionCount} Sessions
              </div>
              <div className="text-[11px] text-body-muted">1-to-1 masterclasses</div>
            </div>

            <div className="p-4 rounded-2xl bg-bg-alt/50 border border-border-subtle space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold">
                <Clock className="w-4 h-4 text-primary" /> Duration
              </div>
              <div className="text-xl font-bold font-serif text-heading">
                {course.durationWeeks} Weeks
              </div>
              <div className="text-[11px] text-body-muted">Paced progression</div>
            </div>

            <div className="p-4 rounded-2xl bg-bg-alt/50 border border-border-subtle space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-success text-xs font-bold">
                <GraduationCap className="w-4 h-4 text-success" /> Credential
              </div>
              <div className="text-base font-bold font-serif text-heading truncate">
                Verified Diploma
              </div>
              <div className="text-[11px] text-body-muted">Accredited completion</div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border-subtle">
            <SplitHeading
              as="h2"
              size="md"
              firstClause="Course Syllabus &"
              accentClause="Key Milestones"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {syllabusItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-bg-alt/30 border border-border-subtle text-xs text-heading font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-body-muted">Course Tuition:</span>
                <CurrencySelector variant="compact" />
              </div>
              <PriceDisplay
                priceMinorUnits={course.priceMinorUnits}
                size="3xl"
                showOriginalINR
              />
            </div>

            <Link
              href={enrollUrl}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white font-bold text-sm transition-all shadow-md shadow-cta/25 btn-tactile"
            >
              <span>{user ? "Proceed to Enroll" : "Sign In to Enroll"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
