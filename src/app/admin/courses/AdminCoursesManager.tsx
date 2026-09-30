"use client";

import { useState, useTransition } from "react";
import { Discipline, CourseLevel } from "@prisma/client";
import {
  saveCourseAdminAction,
  deleteCourseAdminAction,
  saveCourseLessonAdminAction,
  deleteCourseLessonAdminAction,
  bulkGenerateCourseLessonsAdminAction,
} from "@/actions/admin";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Award,
  Calendar,
  Users,
  Clock,
  Check,
  Sparkles,
  ArrowRight,
  GraduationCap,
  CalendarCheck,
  UserCheck,
} from "lucide-react";

export interface AdminCourseLessonItem {
  id: string;
  lessonNumber: number;
  title: string;
  description: string | null;
  durationMinutes: number;
  scheduledStartsAt: string | null;
  teacherId: string | null;
  teacherName: string | null;
}

export interface AdminCourseItem {
  id: string;
  title: string;
  slug: string;
  discipline: Discipline;
  instrument: string;
  level: CourseLevel;
  accreditation: string | null;
  description: string;
  syllabusSummary: string;
  priceMinorUnits: number;
  sessionCount: number;
  durationWeeks: number;
  startDate: string | null;
  endDate: string | null;
  isPublished: boolean;
  enrollmentsCount: number;
  lessonsCount: number;
  allottedTeachers: Array<{
    id: string;
    name: string | null;
    email: string;
    instruments: string[];
  }>;
  lessons: AdminCourseLessonItem[];
}

export interface FacultyTeacherItem {
  id: string;
  name: string | null;
  email: string;
  instruments: string[];
}

export function AdminCoursesManager({
  initialCourses,
  facultyTeachers,
}: {
  initialCourses: AdminCourseItem[];
  facultyTeachers: FacultyTeacherItem[];
}) {
  const [courses, setCourses] = useState<AdminCourseItem[]>(initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMode, setModalMode] = useState<"CREATE" | "EDIT" | null>(null);

  // Curriculum Management Drawer/Modal State
  const [curriculumCourse, setCurriculumCourse] = useState<AdminCourseItem | null>(null);

  // Course Form State
  const [courseId, setCourseId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>(Discipline.INSTRUMENT);
  const [instrument, setInstrument] = useState("Piano");
  const [level, setLevel] = useState<CourseLevel>(CourseLevel.BEGINNER);
  const [accreditation, setAccreditation] = useState("");
  const [priceRupees, setPriceRupees] = useState<number>(14999);
  const [sessionCount, setSessionCount] = useState<number>(24);
  const [durationWeeks, setDurationWeeks] = useState<number>(12);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [syllabusSummary, setSyllabusSummary] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Lesson Edit State inside Curriculum Drawer
  const [editingLessonId, setEditingLessonId] = useState<string | "NEW" | null>(null);
  const [lessonNumber, setLessonNumber] = useState<number>(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonDuration, setLessonDuration] = useState<number>(60);
  const [lessonStartsAt, setLessonStartsAt] = useState<string>("");
  const [lessonTeacherId, setLessonTeacherId] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [lessonSuccessMsg, setLessonSuccessMsg] = useState<string | null>(null);

  const openCreateModal = () => {
    setModalMode("CREATE");
    setCourseId(undefined);
    setTitle("");
    setSlug("");
    setDiscipline(Discipline.INSTRUMENT);
    setInstrument("Piano");
    setLevel(CourseLevel.BEGINNER);
    setAccreditation("");
    setPriceRupees(14999);
    setSessionCount(24);
    setDurationWeeks(12);
    setStartDate("");
    setEndDate("");
    setSelectedTeacherIds([]);
    setDescription("");
    setSyllabusSummary("");
    setIsPublished(true);
    setFormError(null);
    setFormSuccess(false);
  };

  const openEditModal = (c: AdminCourseItem) => {
    setModalMode("EDIT");
    setCourseId(c.id);
    setTitle(c.title);
    setSlug(c.slug);
    setDiscipline(c.discipline);
    setInstrument(c.instrument);
    setLevel(c.level);
    setAccreditation(c.accreditation || "");
    setPriceRupees(Math.round(c.priceMinorUnits / 100));
    setSessionCount(c.sessionCount);
    setDurationWeeks(c.durationWeeks);
    setStartDate(c.startDate ? c.startDate.slice(0, 10) : "");
    setEndDate(c.endDate ? c.endDate.slice(0, 10) : "");
    setSelectedTeacherIds(c.allottedTeachers.map((t) => t.id));
    setDescription(c.description);
    setSyllabusSummary(c.syllabusSummary);
    setIsPublished(c.isPublished);
    setFormError(null);
    setFormSuccess(false);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (modalMode === "CREATE") {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const toggleTeacherSelection = (teacherId: string) => {
    setSelectedTeacherIds((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setFormError("Course start date cannot be after end date.");
      return;
    }

    startTransition(async () => {
      const res = await saveCourseAdminAction({
        id: courseId,
        title,
        slug,
        discipline,
        instrument,
        level,
        accreditation: accreditation.trim() ? accreditation.trim() : null,
        description,
        syllabusSummary,
        priceMinorUnits: Math.round(priceRupees * 100),
        sessionCount,
        durationWeeks,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
        teacherIds: selectedTeacherIds,
        isPublished,
      });

      if (!res.success) {
        setFormError(res.error || "Failed to save course.");
      } else {
        setFormSuccess(true);
        const savedId = (res.data as { id?: string })?.id || courseId || "temp-" + Date.now();
        const savedTeachers = facultyTeachers.filter((t) => selectedTeacherIds.includes(t.id));

        if (modalMode === "CREATE") {
          const newCourse: AdminCourseItem = {
            id: savedId,
            title,
            slug,
            discipline,
            instrument,
            level,
            accreditation: accreditation.trim() || null,
            description,
            syllabusSummary,
            priceMinorUnits: Math.round(priceRupees * 100),
            sessionCount,
            durationWeeks,
            startDate: startDate ? new Date(startDate).toISOString() : null,
            endDate: endDate ? new Date(endDate).toISOString() : null,
            isPublished,
            enrollmentsCount: 0,
            lessonsCount: 0,
            allottedTeachers: savedTeachers,
            lessons: [],
          };
          setCourses((prev) => [newCourse, ...prev]);
        } else if (modalMode === "EDIT") {
          setCourses((prev) =>
            prev.map((item) =>
              item.id === courseId
                ? {
                    ...item,
                    title,
                    slug,
                    discipline,
                    instrument,
                    level,
                    accreditation: accreditation.trim() || null,
                    description,
                    syllabusSummary,
                    priceMinorUnits: Math.round(priceRupees * 100),
                    sessionCount,
                    durationWeeks,
                    startDate: startDate ? new Date(startDate).toISOString() : null,
                    endDate: endDate ? new Date(endDate).toISOString() : null,
                    isPublished,
                    allottedTeachers: savedTeachers,
                  }
                : item,
            ),
          );
        }
        setTimeout(() => {
          setModalMode(null);
          setFormSuccess(false);
        }, 1000);
      }
    });
  };

  const handleDelete = (c: AdminCourseItem) => {
    if (!confirm(`Are you sure you want to delete course "${c.title}"?`)) return;

    startTransition(async () => {
      const res = await deleteCourseAdminAction(c.id);
      if (!res.success) {
        alert(res.error || "Failed to delete course.");
      } else {
        setCourses((prev) => prev.filter((item) => item.id !== c.id));
        if (curriculumCourse?.id === c.id) {
          setCurriculumCourse(null);
        }
      }
    });
  };

  // ── Curriculum & Lesson Actions ───────────────────────────────────────────

  const openCurriculumDrawer = (course: AdminCourseItem) => {
    setCurriculumCourse(course);
    setEditingLessonId(null);
    setLessonSuccessMsg(null);
  };

  const startAddLesson = () => {
    if (!curriculumCourse) return;
    setEditingLessonId("NEW");
    setLessonNumber(curriculumCourse.lessons.length + 1);
    setLessonTitle(`Lesson ${curriculumCourse.lessons.length + 1}: Core Technique & Analysis`);
    setLessonDescription("Focused instruction, technical drills, and active repertoire review.");
    setLessonDuration(60);
    const lastLesson = curriculumCourse.lessons[curriculumCourse.lessons.length - 1];
    let initialDate = new Date();
    if (lastLesson?.scheduledStartsAt) {
      initialDate = new Date(new Date(lastLesson.scheduledStartsAt).getTime() + 7 * 86400000);
    } else if (curriculumCourse.startDate) {
      initialDate = new Date(curriculumCourse.startDate);
    } else {
      initialDate.setDate(initialDate.getDate() + 3);
    }
    initialDate.setHours(10, 0, 0, 0);
    setLessonStartsAt(initialDate.toISOString().slice(0, 16));
    setLessonTeacherId(curriculumCourse.allottedTeachers[0]?.id || facultyTeachers[0]?.id || "");
  };

  const startEditLesson = (lesson: AdminCourseLessonItem) => {
    setEditingLessonId(lesson.id);
    setLessonNumber(lesson.lessonNumber);
    setLessonTitle(lesson.title);
    setLessonDescription(lesson.description || "");
    setLessonDuration(lesson.durationMinutes);
    setLessonStartsAt(
      lesson.scheduledStartsAt
        ? new Date(lesson.scheduledStartsAt).toISOString().slice(0, 16)
        : "",
    );
    setLessonTeacherId(lesson.teacherId || "");
  };

  const handleSaveLesson = () => {
    if (!curriculumCourse) return;

    startTransition(async () => {
      const res = await saveCourseLessonAdminAction({
        id: editingLessonId === "NEW" ? undefined : editingLessonId || undefined,
        courseId: curriculumCourse.id,
        lessonNumber,
        title: lessonTitle,
        description: lessonDescription,
        durationMinutes: lessonDuration,
        scheduledStartsAt: lessonStartsAt ? new Date(lessonStartsAt).toISOString() : null,
        teacherId: lessonTeacherId || null,
      });

      if (!res.success) {
        alert(res.error || "Failed to save lesson.");
      } else {
        const savedId = (res.data as { id?: string })?.id || "temp-" + Date.now();
        const teacherName =
          facultyTeachers.find((t) => t.id === lessonTeacherId)?.name || null;

        const updatedLessons = [...curriculumCourse.lessons];
        const existingIdx = updatedLessons.findIndex(
          (l) => l.id === (editingLessonId === "NEW" ? "" : editingLessonId),
        );

        const newLessonItem: AdminCourseLessonItem = {
          id: savedId,
          lessonNumber,
          title: lessonTitle,
          description: lessonDescription || null,
          durationMinutes: lessonDuration,
          scheduledStartsAt: lessonStartsAt ? new Date(lessonStartsAt).toISOString() : null,
          teacherId: lessonTeacherId || null,
          teacherName,
        };

        if (existingIdx >= 0) {
          updatedLessons[existingIdx] = newLessonItem;
        } else {
          updatedLessons.push(newLessonItem);
        }
        updatedLessons.sort((a, b) => a.lessonNumber - b.lessonNumber);

        const updatedCourse = {
          ...curriculumCourse,
          lessons: updatedLessons,
          lessonsCount: updatedLessons.length,
        };

        setCurriculumCourse(updatedCourse);
        setCourses((prev) =>
          prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
        );
        setEditingLessonId(null);
        setLessonSuccessMsg("Lesson schedule & faculty allotment updated!");
        setTimeout(() => setLessonSuccessMsg(null), 2500);
      }
    });
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (!curriculumCourse) return;
    if (!confirm("Are you sure you want to remove this lesson from the curriculum?")) return;

    startTransition(async () => {
      const res = await deleteCourseLessonAdminAction({
        lessonId,
        courseId: curriculumCourse.id,
      });

      if (!res.success) {
        alert(res.error || "Failed to delete lesson.");
      } else {
        const updatedLessons = curriculumCourse.lessons.filter((l) => l.id !== lessonId);
        const updatedCourse = {
          ...curriculumCourse,
          lessons: updatedLessons,
          lessonsCount: updatedLessons.length,
        };
        setCurriculumCourse(updatedCourse);
        setCourses((prev) =>
          prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
        );
      }
    });
  };

  const handleBulkGenerateLessons = () => {
    if (!curriculumCourse) return;
    if (
      !confirm(
        `Auto-generate ${curriculumCourse.sessionCount} lessons spaced weekly starting from ${curriculumCourse.startDate ? new Date(curriculumCourse.startDate).toLocaleDateString() : "next week"}?`,
      )
    )
      return;

    startTransition(async () => {
      const defaultTeacher = curriculumCourse.allottedTeachers[0]?.id || facultyTeachers[0]?.id;
      const res = await bulkGenerateCourseLessonsAdminAction({
        courseId: curriculumCourse.id,
        defaultTeacherId: defaultTeacher,
        startDate: curriculumCourse.startDate,
        sessionCount: curriculumCourse.sessionCount,
        dayInterval: 7,
      });

      if (!res.success) {
        alert(res.error || "Failed to generate lessons.");
      } else {
        const total = curriculumCourse.sessionCount;
        const baseDate = curriculumCourse.startDate
          ? new Date(curriculumCourse.startDate)
          : new Date(Date.now() + 86400000 * 2);
        baseDate.setHours(10, 0, 0, 0);

        const newLessons: AdminCourseLessonItem[] = [];
        const teacherName =
          facultyTeachers.find((t) => t.id === defaultTeacher)?.name || null;

        for (let i = 1; i <= total; i++) {
          const lDate = new Date(baseDate.getTime() + (i - 1) * 7 * 86400000);
          newLessons.push({
            id: `gen-${i}-${Date.now()}`,
            lessonNumber: i,
            title: `Lesson ${i}: Masterclass & Applied Repertoire`,
            description: `Comprehensive 1-to-1 session covering fundamentals, technical repertoire, and personalized musical guidance.`,
            durationMinutes: 60,
            scheduledStartsAt: lDate.toISOString(),
            teacherId: defaultTeacher || null,
            teacherName,
          });
        }

        const updatedCourse = {
          ...curriculumCourse,
          lessons: newLessons,
          lessonsCount: newLessons.length,
        };
        setCurriculumCourse(updatedCourse);
        setCourses((prev) =>
          prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
        );
        setLessonSuccessMsg("Curriculum lessons generated with faculty allotments!");
        setTimeout(() => setLessonSuccessMsg(null), 3000);
      }
    });
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.discipline.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Search and Create Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-body/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses by title, instrument, discipline..."
            className="w-full rounded-xl bg-white border border-border-default pl-10 pr-4 py-2.5 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
          />
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all self-start sm:self-auto active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Course Curriculum
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((c) => {
          const formattedStartDate = c.startDate
            ? new Date(c.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;
          const formattedEndDate = c.endDate
            ? new Date(c.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;

          return (
            <div
              key={c.id}
              className="rounded-3xl border border-border-default bg-white p-6 shadow-sm space-y-4 hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Discipline, Level, Accreditation, Live Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-bg-alt/70 text-accent-dark border border-accent/20">
                      {c.discipline}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary-subtle text-primary border border-primary/20">
                      {c.level}
                    </span>
                    {c.accreditation && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600" /> {c.accreditation}
                      </span>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      c.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {c.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                {/* Course Title & Description */}
                <div>
                  <h3 className="text-lg font-bold font-serif text-heading leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-body mt-1 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Course Schedule Banner (Start & End Date) */}
                <div className="p-2.5 rounded-xl bg-bg-alt/40 border border-border-default/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-heading">
                    <Calendar className="w-4 h-4 text-accent-dark shrink-0" />
                    {formattedStartDate && formattedEndDate ? (
                      <span>
                        <strong>{formattedStartDate}</strong> – <strong>{formattedEndDate}</strong>
                      </span>
                    ) : formattedStartDate ? (
                      <span>
                        Starts: <strong>{formattedStartDate}</strong> (Flexible End)
                      </span>
                    ) : (
                      <span className="text-body-muted italic">
                        No fixed dates set (Click Edit to configure)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-body-muted">
                    {c.durationWeeks} Weeks
                  </span>
                </div>

                {/* Allotted Faculty Strip */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-heading flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>Allotted Faculty Teachers:</span>
                    </span>
                    <span className="text-body-muted">
                      {c.allottedTeachers.length} assigned
                    </span>
                  </div>
                  {c.allottedTeachers.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {c.allottedTeachers.map((t) => (
                        <span
                          key={t.id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-subtle border border-primary/20 text-xs font-semibold text-primary"
                        >
                          <UserCheck className="w-3 h-3 text-primary" />
                          <span>{t.name || t.email}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 inline-block">
                      ⚠️ No teachers allotted yet. Assign instructors via Edit.
                    </p>
                  )}
                </div>

                {/* Metrics: Tuition, Session Count, Lessons Planned */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-bg-alt/25 border border-border-default/60 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-body block">Tuition Fee</span>
                    <span className="font-bold text-emerald-700 font-numeric text-sm">
                      ₹{(c.priceMinorUnits / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-body block">Target Sessions</span>
                    <span className="font-bold text-heading font-numeric text-sm">
                      {c.sessionCount} classes
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-body block">Enrollments</span>
                    <span className="font-bold text-heading font-numeric text-sm">
                      {c.enrollmentsCount} {c.enrollmentsCount === 1 ? "student" : "students"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-4 border-t border-border-default/70 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] text-body/70 font-mono truncate max-w-[140px]">
                  /{c.slug}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(c)}
                    className="px-3 py-1.5 rounded-xl border border-border-default bg-white hover:bg-neutral-50 text-heading text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                    title="Edit course details"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-body" />
                    <span>Edit Course</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(c)}
                    className="p-1.5 rounded-xl text-body/50 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── CREATE / EDIT COURSE MODAL ─────────────────────────────────────── */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl border border-border-default bg-white p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-border-default pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark">
                  {modalMode === "CREATE" ? "Curriculum Creation" : "Edit Course"}
                </span>
                <h3 className="font-serif text-xl font-bold text-heading">
                  {modalMode === "CREATE" ? "Create Academy Course" : `Edit: ${title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="p-1.5 text-body/50 hover:text-heading transition-colors rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Course saved successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Course Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Western Classical Piano - Grade 1"
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase())}
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-bg-alt/30 border border-border-default/60">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent-dark" />
                    <span>Course Start Date</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                  <span className="text-[10px] text-body-muted block">
                    When the first batch or lesson session begins
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading flex items-center gap-1.5">
                    <CalendarCheck className="w-3.5 h-3.5 text-accent-dark" />
                    <span>Course End Date</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                  <span className="text-[10px] text-body-muted block">
                    Target completion date for final masterclass
                  </span>
                </div>
              </div>

              {/* Allot Teachers to this Course */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-primary-subtle/50 border border-primary/20">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-heading flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Allot Faculty Teachers to this Course</span>
                  </label>
                  <span className="text-[11px] text-primary font-medium">
                    {selectedTeacherIds.length} selected
                  </span>
                </div>
                <p className="text-[11px] text-body leading-relaxed">
                  Select which instructors teach this course. You can also assign individual lessons to different instructors in the Curriculum Builder.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 max-h-40 overflow-y-auto pr-1">
                  {facultyTeachers.map((teacher) => {
                    const isSelected = selectedTeacherIds.includes(teacher.id);
                    return (
                      <div
                        key={teacher.id}
                        onClick={() => toggleTeacherSelection(teacher.id)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-xs"
                            : "bg-white border-border-default hover:bg-neutral-50 text-heading"
                        }`}
                      >
                        <div className="truncate">
                          <p className="font-bold truncate">{teacher.name || "Teacher"}</p>
                          <p
                            className={`text-[10px] truncate ${
                              isSelected ? "text-purple-200" : "text-body-muted"
                            }`}
                          >
                            {teacher.instruments.join(", ") || teacher.email}
                          </p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-white text-primary border-white"
                              : "border-border-default"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Discipline</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value as Discipline)}
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  >
                    <option value={Discipline.INSTRUMENT}>INSTRUMENT</option>
                    <option value={Discipline.VOCALS}>VOCALS</option>
                    <option value={Discipline.DANCE}>DANCE</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Instrument / Focus</label>
                  <input
                    type="text"
                    required
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    placeholder="e.g. Piano, Tabla, Kathak"
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CourseLevel)}
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  >
                    <option value={CourseLevel.BEGINNER}>BEGINNER</option>
                    <option value={CourseLevel.INTERMEDIATE}>INTERMEDIATE</option>
                    <option value={CourseLevel.ADVANCED}>ADVANCED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Tuition Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={priceRupees}
                    onChange={(e) => setPriceRupees(Number(e.target.value))}
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-numeric"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Session Count</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={sessionCount}
                    onChange={(e) => setSessionCount(Number(e.target.value))}
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-numeric"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-heading">Duration (Weeks)</label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    required
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-numeric"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading">
                  Accreditation Board (Optional)
                </label>
                <input
                  type="text"
                  value={accreditation}
                  onChange={(e) => setAccreditation(e.target.value)}
                  placeholder="e.g. Trinity College London Grade 1, ABRSM Grade 2"
                  className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading">Course Description</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl bg-white border border-border-default p-3 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 leading-relaxed shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-heading">
                  Syllabus Breakdown Summary
                </label>
                <textarea
                  required
                  rows={2}
                  value={syllabusSummary}
                  onChange={(e) => setSyllabusSummary(e.target.value)}
                  placeholder="Lesson 1-4: Posture & Scales • Lesson 5-10: Repertoire • Lesson 11-20: Performance..."
                  className="w-full rounded-xl bg-white border border-border-default p-3 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 leading-relaxed shadow-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs text-heading cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  <span>Publish course immediately to student catalog</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-default">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-body hover:text-heading transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 active:scale-[0.98] cursor-pointer"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Course</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CURRICULUM & LESSON ALLOTMENT DRAWER / MODAL ───────────────────── */}
      {curriculumCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-3xl rounded-3xl border border-border-default bg-white p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border-default pb-3 flex-shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-accent-dark" />
                  <span>Curriculum & Faculty Allotment Builder</span>
                </span>
                <h3 className="font-serif text-xl font-bold text-heading mt-0.5">
                  {curriculumCourse.title}
                </h3>
                <p className="text-xs text-body-muted mt-0.5">
                  Allot which teacher takes each individual lesson, and set scheduled dates. When a student purchases this course, these lessons automatically sync to both student & faculty calendars!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCurriculumCourse(null)}
                className="p-1.5 text-body/50 hover:text-heading transition-colors rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notification Banner */}
            {lessonSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium flex-shrink-0 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lessonSuccessMsg}</span>
              </div>
            )}

            {/* Quick Action Strip */}
            <div className="p-3.5 rounded-2xl bg-bg-alt/30 border border-border-default/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-body block">Total Required</span>
                  <span className="font-bold text-heading font-numeric">
                    {curriculumCourse.sessionCount} lessons
                  </span>
                </div>
                <div className="h-6 w-px bg-border-default" />
                <div>
                  <span className="text-[10px] text-body block">Allotted</span>
                  <span className="font-bold text-accent-dark font-numeric">
                    {curriculumCourse.lessons.length} scheduled
                  </span>
                </div>
                <div className="h-6 w-px bg-border-default" />
                <div>
                  <span className="text-[10px] text-body block">Course Start Date</span>
                  <span className="font-bold text-heading">
                    {curriculumCourse.startDate
                      ? new Date(curriculumCourse.startDate).toLocaleDateString()
                      : "Open / Not Set"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkGenerateLessons}
                  disabled={isPending}
                  className="px-3 py-1.5 rounded-xl bg-accent-subtle hover:bg-accent-subtle/80 border border-accent/30 text-accent-dark text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                  title="Generate all missing lesson slots evenly spaced with default faculty"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
                  <span>Auto-Generate Lessons</span>
                </button>

                <button
                  type="button"
                  onClick={startAddLesson}
                  className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lesson</span>
                </button>
              </div>
            </div>

            {/* Inline Add / Edit Lesson Box */}
            {editingLessonId !== null && (
              <div className="p-4 rounded-2xl bg-primary-subtle/40 border border-primary/25 space-y-3 flex-shrink-0 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Edit2 className="w-3.5 h-3.5 text-primary" />
                    <span>
                      {editingLessonId === "NEW"
                        ? `Add Lesson #${lessonNumber}`
                        : `Edit Lesson #${lessonNumber}`}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingLessonId(null)}
                    className="text-xs text-body hover:text-heading"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] font-semibold text-heading"># Order</label>
                    <input
                      type="number"
                      min={1}
                      value={lessonNumber}
                      onChange={(e) => setLessonNumber(Number(e.target.value))}
                      className="w-full rounded-xl bg-white border border-border-default px-2.5 py-1.5 text-xs text-heading font-numeric"
                    />
                  </div>

                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-[11px] font-semibold text-heading">Lesson Title</label>
                    <input
                      type="text"
                      required
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                      placeholder="e.g. Lesson 1: Finger Technique & Scales"
                      className="w-full rounded-xl bg-white border border-border-default px-3 py-1.5 text-xs text-heading"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[11px] font-semibold text-heading">
                      Duration (Mins)
                    </label>
                    <input
                      type="number"
                      min={15}
                      step={15}
                      value={lessonDuration}
                      onChange={(e) => setLessonDuration(Number(e.target.value))}
                      className="w-full rounded-xl bg-white border border-border-default px-3 py-1.5 text-xs text-heading font-numeric"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-heading flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent-dark" />
                      <span>Scheduled Date & Time</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={lessonStartsAt}
                      onChange={(e) => setLessonStartsAt(e.target.value)}
                      className="w-full rounded-xl bg-white border border-border-default px-3 py-1.5 text-xs text-heading"
                    />
                    <span className="text-[10px] text-body-muted block">
                      Syncs automatically to student & teacher calendar upon course purchase
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-heading flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>Allotted Faculty Teacher</span>
                    </label>
                    <select
                      value={lessonTeacherId}
                      onChange={(e) => setLessonTeacherId(e.target.value)}
                      className="w-full rounded-xl bg-white border border-border-default px-3 py-1.5 text-xs text-heading font-medium cursor-pointer"
                    >
                      <option value="">-- Auto-Assign Course Teacher --</option>
                      {curriculumCourse.allottedTeachers.length > 0 && (
                        <optgroup label="Course Assigned Faculty">
                          {curriculumCourse.allottedTeachers.map((t) => (
                            <option key={t.id} value={t.id}>
                              ★ {t.name || t.email} ({t.instruments.join(", ")})
                            </option>
                          ))}
                        </optgroup>
                      )}
                      <optgroup label="Other Academy Faculty">
                        {facultyTeachers
                          .filter(
                            (t) =>
                              !curriculumCourse.allottedTeachers.some((ct) => ct.id === t.id),
                          )
                          .map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name || t.email} ({t.instruments.join(", ")})
                            </option>
                          ))}
                      </optgroup>
                    </select>
                    <span className="text-[10px] text-body-muted block">
                      Teacher whose upcoming lessons & calendar will receive this class
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-heading">
                    Syllabus Notes / Focus Area
                  </label>
                  <input
                    type="text"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    placeholder="Brief description of skills, exercises, or exam pieces covered"
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-1.5 text-xs text-heading"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditingLessonId(null)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-body hover:text-heading"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLesson}
                    disabled={isPending}
                    className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>Save Lesson Slot</span>
                  </button>
                </div>
              </div>
            )}

            {/* Lessons List View */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {curriculumCourse.lessons.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-bg-alt/20 border border-dashed border-border-default space-y-3">
                  <GraduationCap className="w-10 h-10 text-primary/40 mx-auto" />
                  <div>
                    <h4 className="font-serif font-bold text-heading text-sm">
                      No Lessons Added to Curriculum Yet
                    </h4>
                    <p className="text-xs text-body-muted max-w-md mx-auto mt-1 leading-relaxed">
                      Click <strong>&quot;Auto-Generate Lessons&quot;</strong> to automatically generate {curriculumCourse.sessionCount} scheduled lesson slots, or click <strong>&quot;Add Lesson&quot;</strong> to configure them individually.
                    </p>
                  </div>
                </div>
              ) : (
                curriculumCourse.lessons.map((lesson) => {
                  const teacher = facultyTeachers.find((t) => t.id === lesson.teacherId);
                  const formattedTime = lesson.scheduledStartsAt
                    ? new Date(lesson.scheduledStartsAt).toLocaleString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : "Flexible schedule (Relative to enrollment date)";

                  return (
                    <div
                      key={lesson.id}
                      className="p-3.5 rounded-2xl border border-border-default bg-white hover:border-primary/40 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 font-numeric">
                          #{lesson.lessonNumber}
                        </span>

                        <div className="space-y-1">
                          <h5 className="font-bold text-heading text-xs sm:text-sm">
                            {lesson.title}
                          </h5>
                          {lesson.description && (
                            <p className="text-[11px] text-body-muted line-clamp-1">
                              {lesson.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px]">
                            <span className="flex items-center gap-1 text-heading font-medium">
                              <Calendar className="w-3 h-3 text-accent-dark" />
                              <span>{formattedTime}</span>
                            </span>

                            <span className="text-border-default">•</span>

                            <span className="flex items-center gap-1 text-primary font-semibold">
                              <UserCheck className="w-3 h-3 text-primary" />
                              <span>
                                {teacher?.name
                                  ? `Faculty: ${teacher.name}`
                                  : lesson.teacherName
                                  ? `Faculty: ${lesson.teacherName}`
                                  : "Auto-Assigned Course Teacher"}
                              </span>
                            </span>

                            <span className="text-border-default">•</span>

                            <span className="text-body-muted flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.durationMinutes} min</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => startEditLesson(lesson)}
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-heading text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-body" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-1 rounded-lg text-body/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete lesson"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-border-default flex items-center justify-between text-xs flex-shrink-0">
              <span className="text-body-muted">
                Tip: Lessons with scheduled times will instantly appear in the student & teacher video classroom list upon enrollment.
              </span>
              <button
                type="button"
                onClick={() => setCurriculumCourse(null)}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold cursor-pointer transition-all active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
