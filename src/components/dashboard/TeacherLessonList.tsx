"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LessonCountdown } from "./LessonCountdown";
import { CancelLessonModal } from "./CancelLessonModal";
import { JOIN_WINDOW_MINUTES_BEFORE } from "@/types";
import { useSyncedTime } from "@/lib/synced-time";
import { releaseAllMediaDevices } from "@/lib/media-devices";

export interface TeacherDashboardLesson {
  id: string;
  instrument: string;
  startsAt: string; // ISO string
  endsAt: string; // ISO string
  durationMinutes: number;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  lessonSource?: "TRIAL" | "ENROLLMENT";
  studentTimezone?: string;
  courseTitle?: string;
  groupRoomId?: string | null;
  formattedTime: string;
  timezoneAbbr: string;
  studentName: string;
  studentEmail?: string;
  teacherJoinedAt?: string | null;
  studentJoinedAt?: string | null;
  cancelledBy?: string | null;
  cancelledAt?: string | null;
  recordingUrl?: string | null;
}

interface TeacherLessonListProps {
  lessons: TeacherDashboardLesson[];
  userTimezone: string;
  initialServerTime?: number;
}

export function TeacherLessonList({
  lessons,
  userTimezone,
  initialServerTime,
}: TeacherLessonListProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "PAST" | "CANCELLED">(
    "UPCOMING",
  );

  const [cancellingLesson, setCancellingLesson] =
    useState<TeacherDashboardLesson | null>(null);

  const now = useSyncedTime(initialServerTime);

  // Guarantee all camera and microphone hardware tracks are stopped upon returning to dashboard
  useEffect(() => {
    releaseAllMediaDevices();
  }, []);

  const upcomingLessons = lessons.filter((l) => {
    const endsAtTime = new Date(l.endsAt).getTime();
    return l.status === "SCHEDULED" && endsAtTime >= now;
  });

  const pastLessons = lessons.filter((l) => {
    const endsAtTime = new Date(l.endsAt).getTime();
    return l.status === "COMPLETED" || (l.status === "SCHEDULED" && endsAtTime < now);
  });

  const cancelledLessons = lessons.filter((l) => l.status === "CANCELLED");

  return (
    <div className="rounded-3xl border border-border-default bg-white p-6 shadow-sm space-y-6">
      {/* Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-heading">
            Student Lessons and Schedule
          </h2>
          <p className="text-xs text-body-muted mt-0.5">
            Times displayed in your studio timezone: <strong className="text-heading">{userTimezone}</strong>
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-bg-alt/40 border border-border-subtle rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("UPCOMING")}
            className={`btn-tactile px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "UPCOMING"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/60"
            }`}
          >
            Upcoming ({upcomingLessons.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("PAST")}
            className={`btn-tactile px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "PAST"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/60"
            }`}
          >
            Completed ({pastLessons.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("CANCELLED")}
            className={`btn-tactile px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "CANCELLED"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/60"
            }`}
          >
            Cancelled ({cancelledLessons.length})
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "UPCOMING" && (
        <>
          {upcomingLessons.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border-default bg-bg-alt/20 space-y-2">
              <p className="text-heading text-sm font-bold">
                No lessons currently booked
              </p>
              <p className="text-xs text-body-muted max-w-sm mx-auto">
                Ensure your weekly schedule is active and studio is published so students can reserve open slots.
              </p>
              <div className="pt-2">
                <Link
                  href="/teacher/dashboard/availability"
                  className="inline-block text-xs font-bold text-accent-dark hover:text-accent transition-colors btn-tactile"
                >
                  Manage Availability Grid →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(() => {
                // Group lessons by groupRoomId for unified group classroom cards
                type GroupedSession = {
                  type: "individual";
                  lesson: TeacherDashboardLesson;
                } | {
                  type: "group";
                  groupRoomId: string;
                  lessons: TeacherDashboardLesson[];
                };

                const groupMap = new Map<string, TeacherDashboardLesson[]>();
                const individualLessons: TeacherDashboardLesson[] = [];

                for (const lesson of upcomingLessons) {
                  if (lesson.groupRoomId) {
                    const existing = groupMap.get(lesson.groupRoomId) || [];
                    existing.push(lesson);
                    groupMap.set(lesson.groupRoomId, existing);
                  } else {
                    individualLessons.push(lesson);
                  }
                }

                const sessions: GroupedSession[] = [];

                // Add individual lessons
                for (const lesson of individualLessons) {
                  sessions.push({ type: "individual", lesson });
                }

                // Add grouped sessions — groups with only 1 lesson render as individual
                for (const [gid, lessons] of groupMap) {
                  if (lessons.length === 1) {
                    sessions.push({ type: "individual", lesson: lessons[0] });
                  } else {
                    sessions.push({ type: "group", groupRoomId: gid, lessons });
                  }
                }

                // Sort all sessions by startsAt
                sessions.sort((a, b) => {
                  const aTime = new Date(a.type === "individual" ? a.lesson.startsAt : a.lessons[0].startsAt).getTime();
                  const bTime = new Date(b.type === "individual" ? b.lesson.startsAt : b.lessons[0].startsAt).getTime();
                  return aTime - bTime;
                });

                return sessions.map((session) => {
                  if (session.type === "individual") {
                    const lesson = session.lesson;
                    const startsAtTime = new Date(lesson.startsAt).getTime();
                    const isRoomOpen = now >= startsAtTime - JOIN_WINDOW_MINUTES_BEFORE * 60 * 1000;

                    return (
                      <div
                        key={lesson.id}
                        className="bg-white border border-border-default rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-primary/40 hover:shadow-md transition-all shadow-xs"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-lg bg-bg-alt text-heading border border-border-default text-xs font-semibold">
                                  {lesson.instrument}
                                </span>
                                {lesson.lessonSource === "TRIAL" ? (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-subtle text-accent-dark border border-accent/30">
                                    Free Trial
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-subtle text-primary border border-primary/30">
                                    Course Session
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base font-bold text-heading mt-2">
                                Student: {lesson.studentName}
                              </h3>
                              {lesson.studentTimezone && (
                                <p className="text-[11px] text-body-muted mt-0.5">
                                  Student Timezone: <span className="text-body font-medium">{lesson.studentTimezone}</span>
                                </p>
                              )}
                            </div>
                            <LessonCountdown
                              startsAt={lesson.startsAt}
                              initialServerTime={now}
                              className="text-xs"
                            />
                          </div>

                          <div className="space-y-1 text-xs text-body">
                            <div className="flex items-center gap-1.5 text-heading font-semibold">
                              <span>🗓</span>
                              <span>
                                {lesson.formattedTime} ({lesson.timezoneAbbr})
                              </span>
                            </div>
                            <div className="text-body-muted">
                              Duration: {lesson.durationMinutes} minutes
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setCancellingLesson(lesson)}
                              className="text-xs text-body-muted hover:text-danger transition-colors py-1.5 btn-tactile cursor-pointer"
                            >
                              Cancel Session
                            </button>
                            <span className="text-border-default">•</span>
                            <Link
                              href="/teacher/dashboard/support"
                              className="text-xs text-body-muted hover:text-primary transition-colors py-1.5 btn-tactile"
                              title="Contact support to coordinate student reschedule"
                            >
                              Request Reschedule
                            </Link>
                          </div>

                          <div className="flex items-center gap-2">
                            {isRoomOpen ? (
                              <Link
                                href={`/lesson/${lesson.id}`}
                                className="px-4 py-2 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-bold shadow-sm shadow-cta/25 transition-all flex items-center gap-1.5 btn-tactile"
                              >
                                <span>Enter Lesson Room</span>
                                <span>→</span>
                              </Link>
                            ) : (
                              <span
                                className="px-3.5 py-2 rounded-xl bg-bg-alt/50 border border-border-subtle text-body-muted text-xs font-medium cursor-not-allowed flex items-center gap-1.5"
                                title="Room activates 10 minutes prior to start time"
                              >
                                <span>🔒</span>
                                <span>Opens 10m before</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // ─── Group Classroom Card ───
                  const groupLessons = session.lessons;
                  const primaryLesson = groupLessons[0];
                  const startsAtTime = new Date(primaryLesson.startsAt).getTime();
                  const isRoomOpen = now >= startsAtTime - JOIN_WINDOW_MINUTES_BEFORE * 60 * 1000;
                  const studentNames = groupLessons.map((l) => l.studentName);

                  return (
                    <div
                      key={session.groupRoomId}
                      className="bg-white border-2 border-primary/30 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-primary/50 hover:shadow-lg transition-all shadow-xs"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-lg bg-bg-alt text-heading border border-border-default text-xs font-semibold">
                                {primaryLesson.instrument}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30 flex items-center gap-1">
                                <span>👥</span> Group Classroom
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {groupLessons.length} students
                              </span>
                            </div>
                            {primaryLesson.courseTitle && (
                              <h3 className="text-base font-bold text-heading mt-2">
                                {primaryLesson.courseTitle}
                              </h3>
                            )}
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {studentNames.map((name, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-bg-alt/60 text-[11px] text-heading font-medium border border-border-subtle"
                                >
                                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                                    {name.charAt(0).toUpperCase()}
                                  </span>
                                  {name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <LessonCountdown
                            startsAt={primaryLesson.startsAt}
                            initialServerTime={now}
                            className="text-xs"
                          />
                        </div>

                        <div className="space-y-1 text-xs text-body">
                          <div className="flex items-center gap-1.5 text-heading font-semibold">
                            <span>🗓</span>
                            <span>
                              {primaryLesson.formattedTime} ({primaryLesson.timezoneAbbr})
                            </span>
                          </div>
                          <div className="text-body-muted">
                            Duration: {primaryLesson.durationMinutes} minutes
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-2 flex-wrap">
                        <Link
                          href="/teacher/dashboard/support"
                          className="text-xs text-body-muted hover:text-primary transition-colors py-1.5 btn-tactile"
                        >
                          Contact Support
                        </Link>

                        <div className="flex items-center gap-2">
                          {isRoomOpen ? (
                            <Link
                              href={`/lesson/${primaryLesson.id}`}
                              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/25 transition-all flex items-center gap-1.5 btn-tactile"
                            >
                              <span>👥</span>
                              <span>Enter Group Classroom</span>
                              <span>→</span>
                            </Link>
                          ) : (
                            <span
                              className="px-3.5 py-2 rounded-xl bg-bg-alt/50 border border-border-subtle text-body-muted text-xs font-medium cursor-not-allowed flex items-center gap-1.5"
                              title="Room activates 10 minutes prior to start time"
                            >
                              <span>🔒</span>
                              <span>Opens 10m before</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </>
      )}

      {activeTab === "PAST" && (
        <>
          {pastLessons.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-border-default bg-bg-alt/20 text-body-muted text-xs">
              No completed lesson history yet.
            </div>
          ) : (
            <div className="space-y-3">
              {pastLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white border border-border-default rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-heading">
                        {lesson.instrument} with {lesson.studentName}
                      </span>
                      {lesson.lessonSource === "TRIAL" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-subtle text-accent-dark border border-accent/30">
                          Free Trial
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-subtle text-primary border border-primary/30">
                          Course Session
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-bg-alt text-body-muted text-[10px] font-semibold border border-border-subtle">
                        Completed
                      </span>
                    </div>
                    <p className="text-body-muted">
                      {lesson.formattedTime} ({lesson.timezoneAbbr})
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {lesson.recordingUrl && (
                      <a
                        href={lesson.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-bold transition-all"
                        title="Open lesson recording"
                      >
                        <span>🎬 View Recording</span>
                      </a>
                    )}
                    <div className="text-right text-[11px] text-body-muted">
                      {lesson.studentJoinedAt ? (
                        <span className="text-success font-bold">✓ Student Attended</span>
                      ) : (
                        <span className="text-body-muted">Attendance recorded</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "CANCELLED" && (
        <>
          {cancelledLessons.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-border-default bg-bg-alt/20 text-body-muted text-xs">
              No cancelled sessions.
            </div>
          ) : (
            <div className="space-y-3">
              {cancelledLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-bg-alt/20 border border-border-subtle rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs opacity-75 hover:opacity-100 transition-opacity"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-body line-through">
                        {lesson.instrument} with {lesson.studentName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-danger-muted text-danger-dark border border-danger/25 text-[10px] font-bold">
                        Cancelled
                      </span>
                    </div>
                    <p className="text-body-muted">
                      Originally scheduled for {lesson.formattedTime} ({lesson.timezoneAbbr})
                    </p>
                  </div>

                  <span className="text-[11px] text-body-muted font-medium">Slot Restored</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Cancel Lesson Modal with Teacher 24h notice warning */}
      {cancellingLesson && (
        <CancelLessonModal
          isOpen={!!cancellingLesson}
          onClose={() => setCancellingLesson(null)}
          lesson={{
            id: cancellingLesson.id,
            instrument: cancellingLesson.instrument,
            startsAt: cancellingLesson.startsAt,
            partnerName: cancellingLesson.studentName,
            isTeacher: true,
          }}
          onSuccess={() => {
            setCancellingLesson(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
