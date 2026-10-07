"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Globe,
  Upload,
  UserPlus,
  Plus,
  Search,
  ChevronRight,
  MessageSquare,
  Calendar,
  CheckCircle2,
  BarChart2,
  FileText,
  IndianRupee,
  Clock,
  Play,
  Share2,
  X,
  CreditCard,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  UserCheck,
  BookOpen,
} from "lucide-react";
import {
  createStudentAction,
  recordStudentPaymentAction,
  createStudentEnrollmentAction,
  scheduleStudentLessonAction,
} from "@/actions/student-admin";

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  timezone: string;
  guardianName: string | null;
  guardianPhone: string | null;
  age: number | null;
  gender: string | null;
  address: string | null;
  createdAt: string;
  isActive: boolean;
  enrollments: {
    id: string;
    courseId: string;
    courseTitle: string;
    courseLevel: string;
    courseInstrument: string;
    teacherName: string | null;
    sessionsRemaining: number;
    totalSessions: number;
    status: string;
    startedAt: string;
  }[];
  lessons: {
    id: string;
    instrument: string;
    startsAt: string;
    durationMinutes: number;
    status: string;
    teacherName: string | null;
    trackingCode: string | null;
    recordingUrl: string | null;
  }[];
  payments: {
    id: string;
    amountRupees: number;
    status: string;
    gateway: string;
    gatewayPaymentId: string | null;
    createdAt: string;
  }[];
  resources: {
    id: string;
    title: string;
    category: string;
    fileUrl: string;
    sharedAt: string;
  }[];
  trials: {
    id: string;
    instrument: string;
    status: string;
    createdAt: string;
    isConverted: boolean;
  }[];
  notifications: {
    id: string;
    title: string;
    message: string;
    type: string;
    createdAt: string;
  }[];
}

interface CourseOption {
  id: string;
  title: string;
  instrument: string;
  level: string;
  sessionCount: number;
  priceMinorUnits: number;
}

interface TeacherOption {
  id: string;
  name: string;
  instruments: string[];
}

interface AdminStudentsManagerProps {
  initialStudents: StudentRecord[];
  courses: CourseOption[];
  teachers: TeacherOption[];
}

export function AdminStudentsManager({
  initialStudents,
  courses,
  teachers,
}: AdminStudentsManagerProps) {
  const [students, setStudents] = useState<StudentRecord[]>(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudents[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DUE">("ALL");
  const [activeTab, setActiveTab] = useState<
    | "OVERVIEW"
    | "CLASSES"
    | "ASSIGNMENTS"
    | "RESOURCES"
    | "PAYMENTS"
    | "COMMUNICATIONS"
    | "TIMELINE"
  >("OVERVIEW");

  // Modal dialog states
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isScheduleClassOpen, setIsScheduleClassOpen] = useState(false);
  const [isCreateEnrollmentOpen, setIsCreateEnrollmentOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // Form states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) || students[0];

  // Filter students for left directory
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.phone && s.phone.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (statusFilter === "ACTIVE") return s.isActive;
    if (statusFilter === "DUE") {
      const pendingDue = s.payments.some((p) => p.status === "CREATED");
      return pendingDue;
    }
    return true;
  });

  const dueStudentsCount = students.filter((s) =>
    s.payments.some((p) => p.status === "CREATED")
  ).length;

  const formattedIstDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // Metrics for selected student
  const totalLessons = selectedStudent ? selectedStudent.lessons.length : 0;
  const completedLessons = selectedStudent
    ? selectedStudent.lessons.filter((l) => l.status === "COMPLETED").length
    : 0;
  const attendancePct =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const totalCourseSessions = selectedStudent
    ? selectedStudent.enrollments.reduce((acc, e) => acc + e.totalSessions, 0)
    : 0;
  const sessionsTaken = selectedStudent
    ? selectedStudent.enrollments.reduce(
        (acc, e) => acc + Math.max(0, e.totalSessions - e.sessionsRemaining),
        0
      )
    : 0;
  const courseProgressPct =
    totalCourseSessions > 0
      ? Math.round((sessionsTaken / totalCourseSessions) * 100)
      : 0;

  const totalResources = selectedStudent
    ? selectedStudent.resources.length
    : 0;

  const outstandingRupees = selectedStudent
    ? selectedStudent.payments
        .filter((p) => p.status === "CREATED")
        .reduce((acc, p) => acc + p.amountRupees, 0)
    : 0;

  // Selected student avatar initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "ST";
  };

  // Student timeline events
  const timelineEvents: {
    id: string;
    title: string;
    date: string;
    type: "SIGNUP" | "TRIAL" | "PAYMENT" | "LESSON" | "RESOURCE";
  }[] = [];

  if (selectedStudent) {
    timelineEvents.push({
      id: `reg-${selectedStudent.id}`,
      title: "Account registered",
      date: new Date(selectedStudent.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      type: "SIGNUP",
    });

    selectedStudent.trials.forEach((t) => {
      timelineEvents.push({
        id: `trial-${t.id}`,
        title: t.isConverted
          ? `Converted from ${t.instrument} trial`
          : `Requested ${t.instrument} trial`,
        date: new Date(t.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        type: "TRIAL",
      });
    });

    selectedStudent.payments.forEach((p) => {
      timelineEvents.push({
        id: `pay-${p.id}`,
        title: `Payment recorded · ₹${p.amountRupees.toLocaleString("en-IN")}`,
        date: new Date(p.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        type: "PAYMENT",
      });
    });

    selectedStudent.lessons
      .filter((l) => l.status === "COMPLETED")
      .slice(0, 4)
      .forEach((l) => {
        timelineEvents.push({
          id: `les-${l.id}`,
          title: `Session attended · ${l.instrument}`,
          date: new Date(l.startsAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          type: "LESSON",
        });
      });

    selectedStudent.resources.slice(0, 3).forEach((r) => {
      timelineEvents.push({
        id: `res-${r.id}`,
        title: `Resource received · ${r.title}`,
        date: new Date(r.sharedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        type: "RESOURCE",
      });
    });
  }

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl shadow-lg border border-purple-200 bg-white text-heading text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── 1. TOP BREADCRUMB & UTILITIES ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-body/70">
          <span className="font-medium">Operations</span>
          <span className="text-body/40">/</span>
          <span className="font-bold text-heading">Students</span>
        </div>

        <div className="flex items-center gap-2.5 text-body/80 self-end sm:self-auto">
          {/* IST Timezone Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 text-[11px] font-medium shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-primary/70" />
            <span>IST · {formattedIstDate}</span>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN HEADER & ACTIONS ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-heading tracking-tight">
            Students
          </h1>
          <p className="text-xs sm:text-sm text-body/70 mt-1">
            Directory, learning records, billing context, and complete student timeline
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Import button */}
          <button
            type="button"
            onClick={() => showToast("Bulk import CSV template ready for upload.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-heading text-xs font-bold transition-all shadow-2xs active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 text-body/80" />
            <span>Import</span>
          </button>

          {/* + Add student button */}
          <button
            type="button"
            onClick={() => setIsAddStudentOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add student</span>
          </button>
        </div>
      </div>

      {/* ─── 3. MASTER-DETAIL WORKSPACE (DIRECTORY + 360 OVERVIEW) ──────── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* ─── LEFT: DIRECTORY LIST (320px-360px) ───────────────────────── */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">Directory</h2>
            <p className="text-xs text-body/70 mt-0.5 font-numeric">
              {students.length} active students
            </p>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-body/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name, email or student ID"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200/90 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-[#3C096C] transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1 rounded-full transition-colors ${
                statusFilter === "ALL"
                  ? "bg-purple-100 text-[#3C096C] font-bold"
                  : "bg-neutral-100 text-body/70 hover:bg-neutral-200/60"
              }`}
            >
              All {students.length}
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("ACTIVE")}
              className={`px-3 py-1 rounded-full transition-colors ${
                statusFilter === "ACTIVE"
                  ? "bg-purple-100 text-[#3C096C] font-bold"
                  : "bg-neutral-100 text-body/70 hover:bg-neutral-200/60"
              }`}
            >
              Active {students.filter((s) => s.isActive).length}
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("DUE")}
              className={`px-3 py-1 rounded-full transition-colors ${
                statusFilter === "DUE"
                  ? "bg-rose-100 text-rose-700 font-bold"
                  : "bg-neutral-100 text-body/70 hover:bg-neutral-200/60"
              }`}
            >
              Due {dueStudentsCount}
            </button>
          </div>

          {/* Student Cards List */}
          <div className="space-y-2 max-h-[calc(100vh-22rem)] overflow-y-auto pr-1 no-scrollbar">
            {filteredStudents.length === 0 ? (
              <div className="py-8 text-center text-xs text-body/50">
                No students match your criteria.
              </div>
            ) : (
              filteredStudents.map((st) => {
                const isSelected = selectedStudent?.id === st.id;
                const primaryCourse = st.enrollments[0]?.courseTitle || "No enrollment";
                const isDue = st.payments.some((p) => p.status === "CREATED");

                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStudentId(st.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      isSelected
                        ? "border-[#3C096C] bg-purple-50/40 shadow-xs ring-1 ring-[#3C096C]/20"
                        : "border-neutral-200/70 hover:border-purple-200 hover:bg-neutral-50/70 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Initials Avatar */}
                      <div className="w-9 h-9 rounded-full bg-purple-100/90 text-[#3C096C] font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200/50">
                        {getInitials(st.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-heading truncate group-hover:text-[#3C096C] transition-colors">
                          {st.name}
                        </div>
                        <div className="text-[11px] text-body/70 truncate mt-0.5">
                          {primaryCourse} · {st.country || "India"}
                        </div>
                        <div className="mt-1">
                          {isDue ? (
                            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                              Payment due
                            </span>
                          ) : st.isActive ? (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                              Active
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md">
                              Paused
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isSelected ? "text-[#3C096C]" : "text-body/30 group-hover:text-heading"
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ─── RIGHT: STUDENT 360 WORKSPACE (FULL DETAILS) ─────────────── */}
        {selectedStudent ? (
          <div className="flex-1 min-w-0 space-y-5">
            {/* ─── Profile Header Card ─────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#3C096C]/10 border border-[#3C096C]/20 text-[#3C096C] flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                    {getInitials(selectedStudent.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-heading">
                        {selectedStudent.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        {selectedStudent.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-xs text-body/60 mt-1 font-numeric">
                      STU-{new Date(selectedStudent.createdAt).getFullYear()}-
                      {selectedStudent.id.slice(-4)} · student since{" "}
                      {new Date(selectedStudent.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Message button */}
                  <button
                    type="button"
                    onClick={() => setIsMessageOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-heading text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-body" />
                    <span>Message</span>
                  </button>
                </div>
              </div>

              {/* 6-Field Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-100 text-xs">
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Email</div>
                  <div className="font-bold text-heading mt-0.5 truncate select-all">
                    {selectedStudent.email}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Phone</div>
                  <div className="font-bold text-heading mt-0.5 font-numeric">
                    {selectedStudent.phone || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Parent / guardian</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedStudent.guardianName || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Guardian contact</div>
                  <div className="font-bold text-heading mt-0.5 font-numeric">
                    {selectedStudent.guardianPhone || "—"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Country / timezone</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedStudent.country || "India"} · {selectedStudent.timezone}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Age / gender</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedStudent.age ? `${selectedStudent.age} years` : "—"} ·{" "}
                    {selectedStudent.gender || "—"}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Tab Navigation Bar ──────────────────────────────────── */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
              {[
                { id: "OVERVIEW", label: "Overview" },
                { id: "CLASSES", label: "Classes" },
                { id: "ASSIGNMENTS", label: "Assignments" },
                { id: "RESOURCES", label: "Resources" },
                { id: "PAYMENTS", label: "Payments" },
                { id: "COMMUNICATIONS", label: "Communications" },
                { id: "TIMELINE", label: "Timeline" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 ${
                    activeTab === tab.id
                      ? "bg-[#3C096C] text-white shadow-xs"
                      : "bg-white hover:bg-neutral-100 text-body/70 border border-neutral-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ─── 4 Executive Metric Cards Row ────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Card 1: Attendance */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Attendance</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  {attendancePct}%
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5 font-numeric">
                  {completedLessons} of {totalLessons} sessions
                </div>
              </div>

              {/* Card 2: Course progress */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Course progress</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <BarChart2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  {courseProgressPct}%
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5 font-numeric">
                  {sessionsTaken} of {totalCourseSessions} lessons
                </div>
              </div>

              {/* Card 3: Homework */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Homework</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  {totalResources} / {Math.max(totalResources, 10)}
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5">
                  {totalResources > 0 ? "Shared materials" : "0 awaiting review"}
                </div>
              </div>

              {/* Card 4: Outstanding */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Outstanding</span>
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  ₹{outstandingRupees.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
                  {outstandingRupees > 0 ? "Payment pending" : "No dues"}
                </div>
              </div>
            </div>

            {/* ─── 2-Column Content Grid ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* LEFT SUB-COLUMN (7 COLS / ~60%) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. Enrollments Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Enrollments
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">
                        Controlled course catalog records
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCreateEnrollmentOpen(true)}
                      className="text-xs font-bold text-[#3C096C] hover:underline"
                    >
                      + Enroll
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.enrollments.length === 0 ? (
                      <div className="p-4 rounded-xl bg-neutral-50 text-center text-xs text-body/60">
                        No active course enrollments yet.
                      </div>
                    ) : (
                      selectedStudent.enrollments.map((enr) => (
                        <div
                          key={enr.id}
                          className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/40 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="font-bold text-xs text-heading">
                              {enr.courseTitle} · {enr.courseLevel}
                            </div>
                            <div className="text-[11px] text-body/70 mt-0.5 font-numeric">
                              ENR-{enr.id.slice(-4)} · {enr.teacherName || "Assigned Faculty"} ·{" "}
                              {Math.max(0, enr.totalSessions - enr.sessionsRemaining)}/
                              {enr.totalSessions} sessions
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            {enr.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Upcoming & past classes Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Upcoming & past classes
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">
                        Individual sessions · {selectedStudent.timezone}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsScheduleClassOpen(true)}
                      className="text-xs font-bold text-[#3C096C] hover:underline"
                    >
                      + Schedule
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.lessons.length === 0 ? (
                      <div className="p-4 rounded-xl bg-neutral-50 text-center text-xs text-body/60">
                        No scheduled or completed lessons for this student.
                      </div>
                    ) : (
                      selectedStudent.lessons.slice(0, 5).map((l, idx) => {
                        const lDate = new Date(l.startsAt);
                        const isUpcoming = l.status === "SCHEDULED";
                        const isCompleted = l.status === "COMPLETED";

                        return (
                          <div
                            key={l.id}
                            className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/40 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-heading truncate">
                                {lDate.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })}{" "}
                                ·{" "}
                                {lDate.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                · {l.instrument}
                              </div>
                              <div className="text-[11px] text-body/70 mt-0.5 truncate">
                                Faculty: {l.teacherName || "Assigned Faculty"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isCompleted ? (
                                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-body/70 border border-neutral-200 text-[10px] font-semibold">
                                  Complete
                                </span>
                              ) : isUpcoming ? (
                                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                                  Upcoming
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-body/70 text-[10px] font-semibold">
                                  {l.status}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3. Homework & resources Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Homework & resources
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">
                        Assigned practice materials and reference sheet music
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.resources.length === 0 ? (
                      <div className="p-4 rounded-xl bg-neutral-50 text-center text-xs text-body/60">
                        No homework assignments or shared resources yet.
                      </div>
                    ) : (
                      selectedStudent.resources.map((res) => (
                        <div
                          key={res.id}
                          className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/40 flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="font-bold text-xs text-heading">
                              {res.title}
                            </div>
                            <div className="text-[11px] text-body/60 mt-0.5">
                              {res.category} · Shared{" "}
                              {new Date(res.sharedAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                            Shared
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SUB-COLUMN (5 COLS / ~40%) */}
              <div className="lg:col-span-5 space-y-5">
                {/* 1. Payment Ledger Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Payment ledger
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">INR only</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRecordPaymentOpen(true)}
                      className="px-2.5 py-1 rounded-lg border border-purple-200 hover:bg-purple-50 text-[#3C096C] text-xs font-bold transition-colors"
                    >
                      + Record payment
                    </button>
                  </div>

                  {/* Outstanding balance banner */}
                  <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-900">
                      Outstanding balance
                    </span>
                    <span className="font-serif text-base font-bold text-rose-900 font-numeric">
                      ₹{outstandingRupees.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Past Transactions */}
                  <div className="space-y-2.5">
                    {selectedStudent.payments.length === 0 ? (
                      <div className="p-3 text-center text-xs text-body/50">
                        No transactions recorded for this student.
                      </div>
                    ) : (
                      selectedStudent.payments.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/30 flex items-center justify-between text-xs font-numeric"
                        >
                          <div>
                            <div className="font-bold text-heading">
                              {new Date(p.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })}{" "}
                              · ₹{p.amountRupees.toLocaleString("en-IN")}
                            </div>
                            <div className="text-[11px] text-body/60 mt-0.5 uppercase">
                              {p.gateway} · {p.gatewayPaymentId || "DIRECT"}
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              p.status === "PAID"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Communications Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-heading">
                    Communications
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40">
                      <div className="font-bold text-heading">
                        WhatsApp · Class reminder
                      </div>
                      <div className="text-[11px] text-body/60 mt-0.5">
                        Delivered today · 10:12 IST
                      </div>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40">
                      <div className="font-bold text-heading">
                        Email · Tuition receipt sent
                      </div>
                      <div className="text-[11px] text-body/60 mt-0.5">
                        Delivered · Automated system
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Timeline Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-heading">
                    Timeline
                  </h3>

                  <div className="space-y-3.5 relative pl-4 border-l-2 border-purple-100 text-xs">
                    {timelineEvents.map((ev) => (
                      <div key={ev.id} className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#3C096C] ring-4 ring-white" />
                        <div className="font-bold text-heading">{ev.title}</div>
                        <div className="text-[11px] text-body/60 mt-0.5 font-numeric">
                          {ev.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-2xl border border-neutral-200/80 p-12 text-center text-body/60 text-sm">
            Select a student from the directory to view complete details.
          </div>
        )}
      </div>

      {/* ─── MODAL 1: ADD STUDENT MODAL ──────────────────────────────────── */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-heading">Add new student</h3>
              <button
                type="button"
                onClick={() => setIsAddStudentOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await createStudentAction({
                    name: String(formData.get("name")),
                    email: String(formData.get("email")),
                    phone: String(formData.get("phone")),
                    age: formData.get("age") ? Number(formData.get("age")) : undefined,
                    gender: String(formData.get("gender") || ""),
                    guardianName: String(formData.get("guardianName") || ""),
                    guardianPhone: String(formData.get("guardianPhone") || ""),
                    country: String(formData.get("country") || "India"),
                  });
                  if (res.success) {
                    showToast(res.message || "Student created successfully.");
                    setIsAddStudentOpen(false);
                  } else {
                    alert(res.error || "Failed to create student.");
                  }
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-heading mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-heading mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-heading mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 9876543210"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-heading mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    min="4"
                    max="99"
                    placeholder="14"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-heading mb-1">Gender</label>
                  <select
                    name="gender"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-heading mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-heading mb-1">
                    Guardian Phone
                  </label>
                  <input
                    type="tel"
                    name="guardianPhone"
                    placeholder="+91 9988776655"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-body font-semibold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-[#3C096C] text-white font-bold hover:bg-[#2F0755] transition-all flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: RECORD PAYMENT MODAL ───────────────────────────────── */}
      {isRecordPaymentOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-heading">Record payment</h3>
              <button
                type="button"
                onClick={() => setIsRecordPaymentOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await recordStudentPaymentAction({
                    studentId: selectedStudent.id,
                    amountRupees: Number(formData.get("amount")),
                    paymentMethod: formData.get("method") as any,
                    referenceId: String(formData.get("reference") || ""),
                  });
                  if (res.success) {
                    showToast(res.message || "Payment recorded.");
                    setIsRecordPaymentOpen(false);
                  } else {
                    alert(res.error || "Failed to record payment.");
                  }
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-heading mb-1">Student</label>
                <div className="p-2.5 rounded-xl bg-neutral-50 text-heading font-medium">
                  {selectedStudent.name} ({selectedStudent.email})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">Amount (INR) *</label>
                <input
                  type="number"
                  name="amount"
                  required
                  min="1"
                  placeholder="6500"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">Payment Method</label>
                <select
                  name="method"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                >
                  <option value="UPI">UPI</option>
                  <option value="CARD">Debit / Credit Card</option>
                  <option value="NETBANKING">Net Banking</option>
                  <option value="BANK_TRANSFER">Bank Wire / IMPS</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">
                  Reference / Receipt Number
                </label>
                <input
                  type="text"
                  name="reference"
                  placeholder="RCPT-8621"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-body font-semibold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-[#3C096C] text-white font-bold hover:bg-[#2F0755] transition-all flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save transaction</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: SCHEDULE CLASS MODAL ───────────────────────────────── */}
      {isScheduleClassOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-heading">Schedule class</h3>
              <button
                type="button"
                onClick={() => setIsScheduleClassOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await scheduleStudentLessonAction({
                    studentId: selectedStudent.id,
                    teacherId: String(formData.get("teacherId")),
                    instrument: String(formData.get("instrument") || "Hindustani Vocal"),
                    startsAtIso: new Date(String(formData.get("datetime"))).toISOString(),
                    durationMinutes: Number(formData.get("duration") || 60),
                  });
                  if (res.success) {
                    showToast(res.message || "Class scheduled.");
                    setIsScheduleClassOpen(false);
                  } else {
                    alert(res.error || "Failed to schedule class.");
                  }
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-heading mb-1">Faculty Teacher *</label>
                <select
                  name="teacherId"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">Instrument / Subject</label>
                <input
                  type="text"
                  name="instrument"
                  defaultValue="Hindustani Vocal"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">Date & Time *</label>
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleClassOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-body font-semibold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-[#3C096C] text-white font-bold hover:bg-[#2F0755] transition-all flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm session</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: CREATE ENROLLMENT MODAL ────────────────────────────── */}
      {isCreateEnrollmentOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-heading">Enroll in course</h3>
              <button
                type="button"
                onClick={() => setIsCreateEnrollmentOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                startTransition(async () => {
                  const res = await createStudentEnrollmentAction({
                    studentId: selectedStudent.id,
                    courseId: String(formData.get("courseId")),
                    teacherId: String(formData.get("teacherId") || ""),
                    sessionsRemaining: formData.get("sessions")
                      ? Number(formData.get("sessions"))
                      : undefined,
                  });
                  if (res.success) {
                    showToast(res.message || "Enrolled successfully.");
                    setIsCreateEnrollmentOpen(false);
                  } else {
                    alert(res.error || "Failed to create enrollment.");
                  }
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-heading mb-1">Select Course *</label>
                <select
                  name="courseId"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.level} · {c.sessionCount} sessions)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">Allot Faculty Teacher</label>
                <select
                  name="teacherId"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                >
                  <option value="">Choose teacher (or allot later)</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-heading mb-1">
                  Sessions Granted (default: course total)
                </label>
                <input
                  type="number"
                  name="sessions"
                  placeholder="e.g. 24"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-heading focus:outline-none focus:border-[#3C096C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCreateEnrollmentOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-body font-semibold hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-[#3C096C] text-white font-bold hover:bg-[#2F0755] transition-all flex items-center gap-1.5"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Enroll student</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 5: QUICK MESSAGE MODAL ────────────────────────────────── */}
      {isMessageOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="font-serif text-lg font-bold text-heading">
                Message {selectedStudent.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsMessageOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 text-body"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-body/70">
                Reach out to {selectedStudent.name} via email or phone:
              </p>
              <div className="space-y-2">
                <a
                  href={`mailto:${selectedStudent.email}`}
                  className="p-3 rounded-xl border border-neutral-200 hover:bg-purple-50 flex items-center gap-2.5 text-heading font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#3C096C]" />
                  <span>Send Email ({selectedStudent.email})</span>
                </a>
                {selectedStudent.phone && (
                  <a
                    href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-neutral-200 hover:bg-emerald-50 flex items-center gap-2.5 text-heading font-medium transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Open WhatsApp ({selectedStudent.phone})</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsMessageOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-body font-semibold hover:bg-neutral-50 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
