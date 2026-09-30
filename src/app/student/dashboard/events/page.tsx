import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { formatInViewerTimezone, getTimezoneAbbr } from "@/lib/timezone";
import { EventCard, EventItem } from "@/components/dashboard/EventCard";
import { Sparkles } from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Events & Workshops | Student Portal | Gandharva School of Music",
  description:
    "Register for live classical workshops, guest masterclasses, and student performance recitals.",
};

export default async function StudentEventsPage() {
  const user = await requireRole(Role.STUDENT);
  const studentTimezone = user.timezone || "UTC";

  const dbEvents = await db.event.findMany({
    where: {
      isPublished: true,
      startsAt: {
        gte: new Date(),
      },
    },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          teacherProfile: {
            select: {
              instruments: true,
            },
          },
        },
      },
      registrations: {
        select: {
          studentId: true,
        },
      },
    },
    orderBy: { startsAt: "asc" },
  });

  const formattedEvents: EventItem[] = dbEvents.map((evt) => {
    const startsAtDate = new Date(evt.startsAt);
    const isRegistered = evt.registrations.some((r) => r.studentId === user.id);

    return {
      id: evt.id,
      title: evt.title,
      description: evt.description,
      type: evt.type,
      startsAt: startsAtDate.toISOString(),
      durationMinutes: evt.durationMinutes,
      capacity: evt.capacity,
      registeredCount: evt.registrations.length,
      isRegistered,
      teacherName: evt.teacher?.name || null,
      teacherInstruments: evt.teacher?.teacherProfile?.instruments || [],
      formattedDate: formatInViewerTimezone(
        startsAtDate,
        studentTimezone,
        "EEEE, MMMM d, yyyy",
      ),
      formattedTime: formatInViewerTimezone(
        startsAtDate,
        studentTimezone,
        "h:mm a",
      ),
      timezoneAbbr: getTimezoneAbbr(startsAtDate, studentTimezone),
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
          Workshops and Masterclasses
        </span>
        <SplitHeading
          as="h1"
          firstClause="Academy"
          accentClause="Events"
          size="xl"
          className="mt-0.5"
        />
        <p className="text-xs sm:text-sm text-body mt-1 max-w-xl">
          Join community masterclasses, live faculty recitals, and Trinity and ABRSM exam preparation workshops. Seats are reserved on a first-come, first-served basis.
        </p>
      </div>

      {formattedEvents.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border-default rounded-3xl bg-white space-y-2 shadow-xs">
          <Sparkles className="w-8 h-8 mx-auto text-accent-dark/60" />
          <p className="text-heading font-bold text-sm">No upcoming events scheduled right now</p>
          <p className="text-xs text-body-muted">
            Check back soon for announcements on masterclasses and recitals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formattedEvents.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
}
