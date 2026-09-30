import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Role } from "@prisma/client";
import { PublishStatusButton } from "@/components/teacher/PublishStatusButton";
import { formatInViewerTimezone, getTimezoneAbbr } from "@/lib/timezone";
import { TeacherLessonList, TeacherDashboardLesson } from "@/components/dashboard/TeacherLessonList";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Upcoming Sessions | Faculty Studio | Gandharva School of Music",
  description: "View scheduled live music lessons, enter video rooms, and manage students.",
};

export default async function TeacherDashboardPage() {
  const user = await requireRole(Role.TEACHER);

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      teacherProfile: {
        include: {
          availabilityRules: true,
          lessonsAsTeacher: {
            include: {
              student: {
                select: {
                  name: true,
                  email: true,
                  timezone: true,
                },
              },
              enrollment: {
                include: {
                  course: {
                    select: { title: true },
                  },
                },
              },
            },
            orderBy: { startsAt: "desc" },
          },
        },
      },
    },
  });

  const profile = dbUser?.teacherProfile;
  const isEmailVerified = !!dbUser?.emailVerified;
  const isPublished = !!profile?.isPublished;
  const rulesCount = profile?.availabilityRules.length || 0;
  const hasBio = !!profile?.bio && profile.bio.trim().length >= 20;
  const hasInstruments = (profile?.instruments.length || 0) > 0;
  const hasRate = (profile?.hourlyRate || 0) > 0;
  const hasAvailability = rulesCount > 0;

  const canPublish =
    isEmailVerified && hasBio && hasInstruments && hasRate && hasAvailability;

  let blockReason = "";
  if (!isEmailVerified) blockReason = "Verify email first";
  else if (!hasBio) blockReason = "Bio must be at least 20 chars";
  else if (!hasInstruments) blockReason = "Add at least 1 instrument";
  else if (!hasRate) blockReason = "Set an hourly rate";
  else if (!hasAvailability) blockReason = "Configure weekly availability";

  const allLessons = profile?.lessonsAsTeacher || [];
  const scheduledLessons = allLessons.filter((l) => l.status === "SCHEDULED");
  const completedLessons = allLessons.filter((l) => l.status === "COMPLETED");

  const formattedLessons: TeacherDashboardLesson[] = allLessons.map((l) => {
    const startsAtDate = new Date(l.startsAt);
    const endsAtDate = new Date(
      startsAtDate.getTime() + l.durationMinutes * 60_000,
    );
    return {
      id: l.id,
      instrument: l.instrument,
      startsAt: startsAtDate.toISOString(),
      endsAt: endsAtDate.toISOString(),
      durationMinutes: l.durationMinutes,
      status: l.status,
      lessonSource: l.lessonSource as "TRIAL" | "ENROLLMENT",
      studentTimezone: l.student.timezone,
      courseTitle: l.enrollment?.course?.title,
      groupRoomId: l.groupRoomId,
      formattedTime: formatInViewerTimezone(
        startsAtDate,
        user.timezone || "UTC",
        "EEE, MMM d, yyyy 'at' h:mm a",
      ),
      timezoneAbbr: getTimezoneAbbr(startsAtDate, user.timezone || "UTC"),
      studentName: l.student.name || "Student",
      studentEmail: l.student.email,
      teacherJoinedAt: l.teacherJoinedAt?.toISOString() || null,
      studentJoinedAt: l.studentJoinedAt?.toISOString() || null,
      cancelledBy: l.cancelledBy,
      cancelledAt: l.cancelledAt?.toISOString() || null,
      recordingUrl: l.recordingUrl,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-border-default bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/teacher/dashboard/profile"
            className="relative group shrink-0"
            title="Edit Profile Picture"
          >
            {dbUser?.image ? (
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
                <Image
                  src={dbUser.image}
                  alt={user.name || "Teacher"}
                  fill
                  sizes="80px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-serif font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
                {user.name?.slice(0, 2).toUpperCase() || "FC"}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-xs border border-surface-muted text-[10px] text-body group-hover:text-primary transition-colors">
              📷
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-dark font-sans">
                Gandharva Faculty Studio
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${
                  isPublished
                    ? "bg-success-muted text-success border-success/30"
                    : "bg-accent-subtle text-accent-dark border-accent/30"
                }`}
              >
                {isPublished ? "Public Profile Active" : "Draft / Unpublished"}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heading mt-1.5">
              Welcome back, {user.name || "Instructor"}
            </h1>
            <p className="mt-1 text-xs text-body">
              Teaching Timezone: <span className="text-heading font-bold">{user.timezone || "UTC"}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/teacher/dashboard/availability"
            className="rounded-xl border border-border-default bg-bg-alt/40 hover:bg-bg-alt/70 px-4 py-2.5 text-xs font-bold text-heading transition-all shadow-xs btn-tactile"
          >
            Manage Schedule
          </Link>
          <PublishStatusButton
            initialPublished={isPublished}
            canPublish={canPublish}
            blockReason={blockReason}
          />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-xs font-medium">Upcoming Sessions</span>
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-heading font-serif tabular-nums">
            {scheduledLessons.length}
          </p>
          <p className="text-[11px] text-body-muted mt-0.5">Scheduled live lessons</p>
        </div>

        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-xs font-medium">Completed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-bold text-heading font-serif tabular-nums">
            {completedLessons.length}
          </p>
          <p className="text-[11px] text-body-muted mt-0.5">Sessions delivered</p>
        </div>

        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-xs font-medium">Weekly Blocks</span>
            <Clock className="w-4 h-4 text-accent-dark" />
          </div>
          <p className="mt-2 text-2xl font-bold text-heading font-serif tabular-nums">
            {rulesCount}
          </p>
          <p className="text-[11px] text-body-muted mt-0.5">Configured slots</p>
        </div>
      </div>

      {/* Main Section: Lesson List */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold font-serif text-heading">
            Upcoming and Past Sessions
          </h2>
          <p className="text-xs text-body-muted">
            Sessions with Trial vs Course tags. Live video room unlocks 10 minutes prior to scheduled start time.
          </p>
        </div>

        <TeacherLessonList
          lessons={formattedLessons}
          userTimezone={user.timezone || "UTC"}
          initialServerTime={Date.now()}
        />
      </div>
    </div>
  );
}
