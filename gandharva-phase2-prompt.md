# Build prompt: Free-trial-to-paid model + Student, Teacher & Admin portals
## Gandharva School of Music platform — Phase 2

You are extending an existing production Next.js app (formerly "ToneRoom", now the Gandharva School of Music platform). Read this entire brief before touching code. The codebase already has auth, teacher availability/booking, and a LiveKit lesson room — do not rebuild those; extend them. Follow the existing conventions: `src/actions/` for server actions, `src/app/api/` for route handlers, Prisma schema in `prisma/schema.prisma`, Gandharva brand tokens already defined in `globals.css` (saffron/gold, royal purple, midnight violet, soft lavender; Vidaloka + DM Sans).

Work through the milestones in section 8 **one at a time, in order**. This is a hard rule, not a suggestion: after finishing each milestone, stop, show what you built, run the specific verification listed for that milestone, and wait for explicit go-ahead before starting the next one. Do not scaffold multiple milestones in one pass, and do not silently continue to milestone N+1 because milestone N "looked done." A booking transaction with a race condition, or a lesson room that never reconnects after a dropped connection, both look identical to a working one until you specifically test the failure case — that test is what each milestone's stop is for. If you find yourself writing code for the admin portal while the payment webhook hasn't been verified yet, stop — that is the failure mode this rule exists to prevent.

---

## 1. The core change: trial-first, not book-first

**Current behaviour (to remove):** a student can browse a teacher and directly book a paid-sounding lesson slot with no purchase step.

**New behaviour:**

1. A new student's first bookings are **free trial lessons** — a fixed number (2 or 3, admin-configurable, default 2) — with no payment required.
2. Once a student has used all their trial lessons, the booking flow is blocked. They are redirected to the **course catalog** to purchase a course.
3. Once enrolled in a paid course, the student books lessons against that enrollment (sessions are drawn from the course's included session count) until the course is exhausted, at which point they renew or buy another course.

This is an enforcement rule, not just a UI nudge — the booking server action must reject a booking attempt from a student with zero trial lessons and zero active enrollment, even if someone bypasses the UI and calls the action directly.

### 1.1 Schema additions

Add to `prisma/schema.prisma` (adjust names to fit existing conventions, keep the relationships):

```prisma
model PlatformSettings {
  id                    Int    @id @default(1)
  freeTrialLessonCount  Int    @default(2)
  // singleton row — enforce with a check constraint or application-level guard
}

model StudentTrialStatus {
  id                Int      @id @default(autoincrement())
  studentId         String   @unique
  student           User     @relation(fields: [studentId], references: [id])
  lessonsGranted    Int      // snapshot of PlatformSettings value at signup, so changing the
                              // global default later doesn't retroactively change existing students
  lessonsUsed       Int      @default(0)
  status            TrialStatus @default(ACTIVE) // ACTIVE | EXHAUSTED
}

model Course {
  id              String   @id @default(cuid())
  title           String
  slug            String   @unique
  discipline      Discipline   // INSTRUMENT | VOCALS | DANCE
  instrument      String       // "Piano", "Tabla", "Bharatanatyam", etc — matches existing teacher instrument tags
  level           CourseLevel  // BEGINNER | INTERMEDIATE | ADVANCED
  accreditation   String?      // "Trinity Grade 3", "ABRSM Grade 2", null if none
  description     String
  syllabusSummary String
  priceMinorUnits Int          // store money as integer paise/cents, never float
  currency        String   @default("INR")
  sessionCount    Int          // total lessons included
  durationWeeks   Int
  thumbnailUrl    String?
  isPublished     Boolean  @default(false)
  createdAt       DateTime @default(now())
}

model Enrollment {
  id                String   @id @default(cuid())
  studentId         String
  student           User     @relation(fields: [studentId], references: [id])
  courseId          String
  course            Course   @relation(fields: [courseId], references: [id])
  teacherId         String?  // assigned teacher, can be reassigned by admin
  paymentId         String   @unique
  payment           Payment  @relation(fields: [paymentId], references: [id])
  sessionsRemaining Int
  status            EnrollmentStatus @default(ACTIVE) // ACTIVE | COMPLETED | CANCELLED | REFUNDED
  startedAt         DateTime @default(now())
  completedAt       DateTime?
}

model Payment {
  id                String   @id @default(cuid())
  studentId         String
  amountMinorUnits  Int
  currency          String
  gateway           String   // "razorpay"
  gatewayOrderId    String
  gatewayPaymentId  String?
  status            PaymentStatus @default(CREATED) // CREATED | PAID | FAILED | REFUNDED
  createdAt         DateTime @default(now())
}

model Certificate {
  id              String   @id @default(cuid())
  studentId       String
  enrollmentId    String   @unique
  enrollment      Enrollment @relation(fields: [enrollmentId], references: [id])
  certificateNumber String @unique   // human-readable, e.g. GSM-2026-000482
  issuedAt        DateTime @default(now())
  pdfUrl          String
}

model Event {
  id            String   @id @default(cuid())
  title         String
  description   String
  type          EventType   // WORKSHOP | RECITAL | MASTERCLASS | EXAM_PREP
  startsAt      DateTime
  durationMinutes Int
  capacity      Int?
  isPublished   Boolean  @default(false)
}

model EventRegistration {
  id        String   @id @default(cuid())
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  studentId String
  registeredAt DateTime @default(now())
  @@unique([eventId, studentId])
}

model SupportTicket {
  id          String   @id @default(cuid())
  studentId   String
  subject     String
  category    TicketCategory  // BILLING | TECHNICAL | LESSON | COURSE | OTHER
  status      TicketStatus @default(OPEN)  // OPEN | IN_PROGRESS | RESOLVED | CLOSED
  createdAt   DateTime @default(now())
  messages    TicketMessage[]
}

model TicketMessage {
  id          String   @id @default(cuid())
  ticketId    String
  ticket      SupportTicket @relation(fields: [ticketId], references: [id])
  senderId    String
  senderRole  Role
  body        String
  createdAt   DateTime @default(now())
}
```

Add `lessonSource` to the existing `Lesson` model — `TRIAL` or `enrollmentId` — so every lesson traces back to either a trial allocation or a paid enrollment. This is what the join-window and reporting logic key off.

### 1.2 Booking gate — server-side, not UI-side

In the existing booking server action, before creating a `Lesson` row, run:

```
1. Load StudentTrialStatus for this student. Create it (via PlatformSettings.freeTrialLessonCount)
   if this is their first-ever booking attempt.
2. If trial.status === ACTIVE and trial.lessonsUsed < trial.lessonsGranted:
     -> allow, tag lesson lessonSource = TRIAL, increment lessonsUsed inside the same transaction,
        flip status to EXHAUSTED if this was the last one.
3. Else, look for an Enrollment with status ACTIVE and sessionsRemaining > 0 for this student
   (optionally filtered to an instrument matching the requested teacher's instrument — decide
   whether one course enrollment can book lessons with any teacher of that instrument, or only
   the assigned teacher; default to "any teacher teaching that instrument" unless told otherwise).
     -> allow, tag lesson with that enrollmentId, decrement sessionsRemaining in the same transaction,
        mark enrollment COMPLETED if that was the last session.
4. Else -> reject with a specific error code (`NO_TRIAL_OR_ENROLLMENT`) that the client maps to a
   redirect toward the course catalog. Do not let the transaction create a Lesson row in this case.
```

All of this happens inside the same database transaction as the existing slot-collision check from Phase 1 — a student exhausting their last trial lesson and a double-booked slot are both things that must not partially apply.

---

## 2. Payment integration

**Assumption, stated so you can override it:** given this is an Indian school pricing in INR, use **Razorpay** (Orders API + webhook verification), not Stripe. If that's wrong, swap the gateway but keep the `Payment` model gateway-agnostic as written above.

Flow: student picks a course → server action creates a Razorpay Order and a `Payment` row (`status: CREATED`) → client opens Razorpay Checkout → on success, verify the payment signature server-side via webhook (never trust the client-side success callback alone) → mark `Payment.status = PAID` → create the `Enrollment` in the same handler → send confirmation email.

Handle the webhook idempotently — Razorpay can retry delivery, and processing the same `payment.captured` event twice must not create two enrollments. Key on `gatewayPaymentId` with a unique constraint or an idempotency check before creating the `Enrollment`.

---

## 3. Certificate generation

On `Enrollment.status` transitioning to `COMPLETED` (last session consumed), generate a certificate:

- Server-side PDF generation (`pdf-lib` or `@react-pdf/renderer`) using a Gandharva-branded template: student name, course title, instrument/discipline, accreditation body if applicable, completion date, a certificate number formatted like `GSM-{year}-{sequential}`.
- Store the rendered PDF (Vercel Blob, S3, or wherever the project already stores assets) and save the URL on the `Certificate` row.
- Email the student when it's issued.
- This should be a background job or queued action, not something that blocks the request that completed the lesson.

---

## 4. Student Dashboard — `src/app/student/dashboard/`

Seven sections, each its own route under the dashboard layout with a persistent sidebar nav. Reuse the existing dashboard shell/layout component rather than building a new one.

1. **Upcoming Sessions** (`/student/dashboard` — the default landing tab)
   Card list of scheduled lessons, soonest first, each showing teacher, instrument, local time with countdown, and a Join button that activates 10 minutes before start (existing logic from Phase 1). Show remaining trial lessons or remaining sessions in the active enrollment as a small status strip at the top — this is the single most important number on this page, since it's what tells the student whether they need to buy a course soon.

2. **Calendar** (`/student/dashboard/calendar`)
   Month view (fall back to week view under 640px) plotting the same lessons from #1 on their actual dates. Clicking a day with a lesson shows its detail in a side panel or modal, not a navigation away from the calendar. Add "add to my calendar" (.ics download) per lesson, reusing the existing ical util.

3. **Course Catalog** (`/student/dashboard/courses` and a public-facing `/courses` for logged-out browsing)
   Grid of published `Course` rows, filterable by discipline/instrument/level, each card showing price, session count, duration, accreditation badge if present. Clicking through to a course detail page with the full syllabus and a Buy button that starts the Razorpay flow from section 2. If the student is mid-trial, show their remaining trial count here too, since this is the natural place they'll land once trial lessons run low.

4. **Help & Support** (`/student/dashboard/support`)
   A ticket list (status badges: open/in progress/resolved) plus a "new ticket" form (subject, category, message). Ticket detail view is a simple threaded conversation using `TicketMessage`. Include an FAQ accordion above the ticket list for the common questions (how trials work, cancellation policy, how to reschedule) so most students never need to file a ticket at all.

5. **My Certificates** (`/student/dashboard/certificates`)
   Grid of earned `Certificate` rows — thumbnail of the certificate, course title, issue date, a Download button linking to the stored PDF. Empty state should point at the course catalog, not just say "no certificates yet."

6. **Events & Activities** (`/student/dashboard/events`)
   Upcoming published `Event` rows (workshops, recitals, masterclasses) with a Register button that creates an `EventRegistration`, respecting `capacity` — once full, show "Waitlist" or disable registration, your call, but don't let registrations exceed capacity (enforce with a transaction + count check, same pattern as the booking collision check).

7. **Profile** (`/student/dashboard/profile`)
   Name, avatar, timezone, contact info, notification preferences (email on/off for booking confirmations, reminders, certificate issuance). Password change and account deletion request live here too.

---

## 5. Teacher Portal — `src/app/teacher/dashboard/`

Mirror the student portal's information architecture where the concept exists on the teacher side, add what's teacher-specific:

1. **Upcoming Sessions** — same pattern as student, but shows student name/instrument per lesson and whether it's a trial lesson or part of a paid enrollment (teachers should know which, since trial lessons are often more evaluative).
2. **Calendar** — same component as student's, reused, showing the teacher's own lessons plus their availability blocks overlaid.
3. **My Students** (replaces "course catalog" — teachers don't buy courses) — list of students currently or previously assigned, with lesson history per student and a note field the teacher can keep between sessions.
4. **Availability & Schedule** — the existing weekly `AvailabilityRule` manager and `AvailabilityException` blackout dates from Phase 1, moved into this portal's nav if not already there.
5. **Earnings** — a read-only ledger: which enrollments/lessons they've taught, computed payout per session (flat rate or percentage of course price — decide based on the school's actual teacher-payment model, flag this as an open question if you don't have it), exportable as CSV. This is reporting only — do not build a payout/transfer system in this phase.
6. **Help & Support** — same ticket system as student's, `senderRole: TEACHER`.
7. **Profile** — bio, instruments, years teaching, rate — the existing `TeacherProfile` fields, editable here.

---

## 6. Admin Portal — `src/app/admin/`

New role-gated section, `ADMIN` only, enforced in middleware alongside the existing `/student/*` and `/teacher/*` guards.

1. **Overview** — headline numbers: active students, active teachers, trial-to-paid conversion rate, lessons this week, open support tickets, revenue this month. This is the landing page of the portal.
2. **Users** — searchable table of all students and teachers, with the ability to view a profile, deactivate an account, or manually adjust a student's trial allocation (support cases: "give this student one more trial lesson").
3. **Courses** — full CRUD on `Course` rows, including the publish/unpublish toggle. This is how new courses get added to the catalog.
4. **Enrollments & Payments** — table of enrollments with payment status, refund action (which should reverse `sessionsRemaining` and mark the enrollment `REFUNDED`, not just delete the row).
5. **Lessons** — a global view across all lessons for support/debugging purposes (search by student, teacher, or date), including the ability to see `teacherJoinedAt`/`studentJoinedAt` from the LiveKit webhooks for no-show disputes.
6. **Events** — CRUD on `Event` rows and a registration list per event.
7. **Support Tickets** — the full ticket queue across all students/teachers, assignable, with the same threaded view as the student/teacher side.
8. **Settings** — edit `PlatformSettings.freeTrialLessonCount` and any other global config here.

Admin portal can be plainer/denser than the student/teacher-facing UI — it's an internal tool, prioritise information density and fast filtering over the Gandharva brand polish.

---

## 7. Design notes specific to this phase

- Keep the existing Gandharva palette and type pairing consistent across all three portals — the admin portal can be denser, but it should still clearly belong to the same product, not look like a different app bolted on.
- The trial-remaining indicator (student dashboard, section 4.1 and 4.3) is the most commercially important UI element in this entire phase — it's what drives conversion to a paid course. Don't bury it in a settings page or a tooltip; make it visible without a click.
- Certificate PDF template should look like something worth framing — this is a credential a student may show a grading-exam board. Don't ship a plain black-text-on-white-background PDF.

---

## 8. Build order

Each milestone below ends with its own **stop condition** — the specific thing to test before moving on. Complete the milestone, run its stop condition yourself, report the result, and pause there. Do not begin the next numbered milestone in the same turn you finished the previous one, even if the code compiles and the happy path looks right — the failures this rule is guarding against (a race condition in the booking transaction, a lesson room that silently never reconnects) pass a casual glance and only show up under the specific test named.

1. **Schema & migration** — all models in section 1.1, migrated, with a seed update: give existing seeded students a `StudentTrialStatus`, add 3-4 seeded `Course` rows across different instruments/levels, one seeded `Event`.
   *Stop condition:* `npx prisma db push` (or migrate) succeeds with no drift, and the seed script runs clean on a fresh database. Report the schema and seed output, then wait.

2. **Trial + booking gate** — section 1.2, wired into the existing booking action.
   *Stop condition:* a fresh seeded student can book exactly `freeTrialLessonCount` lessons and is rejected on the next attempt — **and** two simultaneous booking requests for the same student's last trial lesson (fire both at once, don't just test them sequentially) result in exactly one booked lesson and one clean rejection, not two bookings or a corrupted trial count. This concurrency test is the actual point of this milestone; a sequential test alone does not clear it.

3. **Payment + enrollment** — Razorpay order creation, checkout, webhook verification, enrollment creation.
   *Stop condition:* a real test-mode purchase creates exactly one `Enrollment`, and firing the same webhook payload twice (simulate Razorpay's at-least-once delivery) still produces exactly one `Enrollment`, not two. Also confirm a tampered payload with an invalid signature is rejected before any database write.

4. **Certificate generation** — triggered on enrollment completion.
   *Stop condition:* completing a course's last session produces a real, correctly numbered PDF stored and linked, and — separately — confirm the HTTP response for that completing request returned before PDF generation finished (it must not be on the request's critical path).

5. **Student dashboard** — all seven sections.
   *Stop condition:* walk all seven routes as a seeded student at both desktop and 375px width; the trial/session-remaining indicator (section 7) is visible without a click on at least the Upcoming Sessions and Course Catalog tabs.

6. **Teacher portal** — all seven sections.
   *Stop condition:* walk all seven routes as a seeded teacher; confirm a teacher cannot reach `/student/*` or `/admin/*` routes even by direct URL.

7. **Admin portal** — all eight sections, role middleware.
   *Stop condition:* confirm a non-admin (student or teacher session) is rejected from every `/admin/*` route by direct URL, not just hidden from nav. Change `freeTrialLessonCount` in Settings and confirm it does not alter an already-existing student's `lessonsGranted`.

8. **Support ticket system** — shared component used by all three portals, built once.
   *Stop condition:* a ticket created from the student side is visible and reachable from the admin queue, and a reply from admin shows up on the student's thread — test the round trip, not just ticket creation.

9. **Hardening** — rate limits on ticket creation and payment endpoints, webhook signature verification tested against a tampered payload, CSV export tested with a few hundred rows.
   *Stop condition:* actually trigger the rate limit (don't just read the code and assume it fires) and confirm the tampered-webhook rejection from milestone 3 still holds after any refactoring done in this step.

After milestone 9's stop condition is confirmed, and only then, give a final summary of what was built and what, if anything, was deferred.

---

## 9. Verify before calling anything done

- A brand-new student can book `freeTrialLessonCount` lessons and is blocked on the next one, redirected toward the course catalog.
- Calling the booking server action directly (not through the UI) with an exhausted student still gets rejected — the gate is server-side.
- Buying a course via Razorpay test mode creates exactly one `Enrollment`, even if the webhook fires twice.
- A tampered/forged Razorpay webhook payload is rejected, not processed.
- Completing a course's last session generates a certificate with a real, correctly numbered PDF, and does not block the request that completed the lesson (fire-and-forget or queued).
- An admin can change `freeTrialLessonCount` and it only affects students who sign up afterward, not existing students' already-granted allocations.
- Event registration cannot exceed `capacity` under concurrent registration attempts.
- All three portals are usable at 375px wide, admin portal included.

---

## 10. Do not

- Do not let the client report which trial/enrollment a booking should draw from — the server decides based on the student's actual state.
- Do not trust the Razorpay client-side success callback as proof of payment — verify server-side via webhook signature.
- Do not delete a `Payment` or `Enrollment` row on refund — mark status and reverse the relevant counters, keep the audit trail.
- Do not block the lesson-completion request on certificate PDF rendering.
- Do not build teacher payouts/transfers in this phase — earnings reporting is read-only.
- Do not let admin-portal styling drift into a visually separate product from the student/teacher side.

Before writing code, tell me which existing files you'll be modifying versus creating new, and flag the two open questions in this brief (whether one course enrollment can book with any teacher of that instrument or only an assigned one; the teacher payout calculation basis) if you need an answer before proceeding.
