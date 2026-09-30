/**
 * Seed script for Gandharva School of Music platform.
 * Creates:
 * - 1 admin user
 * - 2 teacher users with profiles, availability rules
 * - 2 student users with trial status
 * - 1 platform settings row (freeTrialLessonCount: 2)
 * - 4 courses across different instruments/levels
 * - 1 upcoming event
 * - 1 lesson starting 5 minutes from now (teacher1 + student1, tagged as TRIAL)
 *
 * Run with: npx prisma db seed
 */

import "dotenv/config";
import {
  PrismaClient,
  Role,
  LessonStatus,
  LessonSource,
  TrialStatus,
  Discipline,
  CourseLevel,
  EventType,
  EnrollmentStatus,
  PaymentStatus,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../src/lib/password";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // Default seed user password: "password123"
  const defaultPasswordHash = await hashPassword("password123");
  const adminPasswordHash = await hashPassword("admin123");

  // Clean existing data in reverse dependency order
  await prisma.ticketMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.studentTrialStatus.deleteMany();
  await prisma.course.deleteMany();
  await prisma.platformSettings.deleteMany();
  await prisma.availabilityException.deleteMany();
  await prisma.availabilityRule.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // ─── Platform Settings (singleton) ─────────────────────────────────
  const settings = await prisma.platformSettings.create({
    data: {
      id: 1,
      freeTrialLessonCount: 2,
    },
  });
  console.log(
    `  ✓ Platform settings: freeTrialLessonCount = ${settings.freeTrialLessonCount}`,
  );

  // ─── Admin User ────────────────────────────────────────────────────

  const admin = await prisma.user.create({
    data: {
      email: "admin@gandharva.com",
      name: "Admin",
      phone: "+919876543210",
      phoneVerified: new Date(),
      timezone: "Asia/Kolkata",
      role: Role.ADMIN,
      emailVerified: new Date(),
      passwordHash: adminPasswordHash,
    },
  });
  console.log(`  ✓ Admin: ${admin.name} (${admin.email}) [phone: +919876543210, password: admin123]`);

  // ─── Teacher 1: Elena (Piano & Violin, Europe/Berlin) ──────────────

  const teacher1 = await prisma.user.create({
    data: {
      email: "elena@example.com",
      name: "Elena Petrova",
      phone: "+919876543211",
      phoneVerified: new Date(),
      timezone: "Europe/Berlin",
      role: Role.TEACHER,
      emailVerified: new Date(),
      passwordHash: defaultPasswordHash,
    },
  });

  const teacherProfile1 = await prisma.teacherProfile.create({
    data: {
      userId: teacher1.id,
      bio: "Concert pianist with 15 years of teaching experience. I specialize in classical repertoire and technique for intermediate to advanced students. Former faculty at the Berlin School of Music.",
      instruments: ["Piano", "Violin"],
      yearsTeaching: 15,
      hourlyRate: 150000, // ₹1,500.00
      payoutPerSession: 80000, // ₹800.00 per session (admin-set)
      currency: "INR",
      languages: ["English", "German", "Russian"],
      isPublished: true,
    },
  });

  // Elena's availability: Mon-Fri 9:00-17:00 Berlin time
  const weekdays = [1, 2, 3, 4, 5]; // Mon=1 through Fri=5
  for (const day of weekdays) {
    await prisma.availabilityRule.create({
      data: {
        teacherId: teacherProfile1.id,
        dayOfWeek: day,
        startMinute: 540, // 9:00 AM
        endMinute: 1020, // 5:00 PM
      },
    });
  }

  console.log(`  ✓ Teacher: ${teacher1.name} (${teacher1.email})`);

  // ─── Teacher 2: Marcus (Guitar & Bass Guitar, America/New_York) ────

  const teacher2 = await prisma.user.create({
    data: {
      email: "marcus@example.com",
      name: "Marcus Chen",
      phone: "+919876543212",
      phoneVerified: new Date(),
      timezone: "America/New_York",
      role: Role.TEACHER,
      emailVerified: new Date(),
      passwordHash: defaultPasswordHash,
    },
  });

  const teacherProfile2 = await prisma.teacherProfile.create({
    data: {
      userId: teacher2.id,
      bio: "Session guitarist and music educator. From blues to jazz fusion, I help students find their voice on the instrument. 20+ years of performing and 10 years of private teaching.",
      instruments: ["Acoustic Guitar", "Electric Guitar", "Bass Guitar"],
      yearsTeaching: 10,
      hourlyRate: 120000, // ₹1,200.00
      payoutPerSession: 60000, // ₹600.00 per session (admin-set)
      currency: "INR",
      languages: ["English", "Mandarin"],
      isPublished: true,
    },
  });

  // Marcus's availability: Mon-Wed-Fri 14:00-21:00, Sat 10:00-16:00 NY time
  for (const day of [1, 3, 5]) {
    await prisma.availabilityRule.create({
      data: {
        teacherId: teacherProfile2.id,
        dayOfWeek: day,
        startMinute: 840, // 2:00 PM
        endMinute: 1260, // 9:00 PM
      },
    });
  }
  await prisma.availabilityRule.create({
    data: {
      teacherId: teacherProfile2.id,
      dayOfWeek: 6, // Saturday
      startMinute: 600, // 10:00 AM
      endMinute: 960, // 4:00 PM
    },
  });

  console.log(`  ✓ Teacher: ${teacher2.name} (${teacher2.email}) [phone: +919876543212]`);

  // ─── Student 1: Aisha (Asia/Kolkata) ───────────────────────────────

  const student1 = await prisma.user.create({
    data: {
      email: "aisha@example.com",
      name: "Aisha Patel",
      phone: "+919876543213",
      phoneVerified: new Date(),
      timezone: "Asia/Kolkata",
      role: Role.STUDENT,
      emailVerified: new Date(),
      passwordHash: defaultPasswordHash,
    },
  });

  // Aisha gets trial status — she'll have 1 trial used (the seeded lesson below)
  await prisma.studentTrialStatus.create({
    data: {
      studentId: student1.id,
      lessonsGranted: settings.freeTrialLessonCount,
      lessonsUsed: 1,
      status: TrialStatus.ACTIVE,
    },
  });

  console.log(`  ✓ Student: ${student1.name} (${student1.email}) [phone: +919876543213] [1 trial used]`);

  // ─── Student 2: James (Europe/London) ──────────────────────────────

  const student2 = await prisma.user.create({
    data: {
      email: "james@example.com",
      name: "James Wright",
      phone: "+919876543214",
      phoneVerified: new Date(),
      timezone: "Europe/London",
      role: Role.STUDENT,
      emailVerified: new Date(),
      passwordHash: defaultPasswordHash,
    },
  });

  // James gets trial status — fresh, no lessons used
  await prisma.studentTrialStatus.create({
    data: {
      studentId: student2.id,
      lessonsGranted: settings.freeTrialLessonCount,
      lessonsUsed: 0,
      status: TrialStatus.ACTIVE,
    },
  });

  console.log(`  ✓ Student: ${student2.name} (${student2.email}) [0 trials used]`);

  // ─── Courses ───────────────────────────────────────────────────────

  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "Piano Foundations — Trinity Grade 1",
        slug: "piano-foundations-trinity-grade-1",
        discipline: Discipline.INSTRUMENT,
        instrument: "Piano",
        level: CourseLevel.BEGINNER,
        accreditation: "Trinity Grade 1",
        description:
          "A comprehensive beginner piano course aligned with Trinity College London Grade 1 syllabus. Learn scales, arpeggios, sight-reading, and three exam pieces with guided practice.",
        syllabusSummary:
          "Major & minor scales (C, G, F) • Primary chord progressions • Sight-reading fundamentals • 3 exam repertoire pieces • Aural awareness exercises • Performance technique",
        priceMinorUnits: 1499900, // ₹14,999.00
        currency: "INR",
        sessionCount: 24,
        durationWeeks: 12,
        isPublished: true,
      },
    }),

    prisma.course.create({
      data: {
        title: "Acoustic Guitar Intermediate — ABRSM Grade 3",
        slug: "acoustic-guitar-intermediate-abrsm-grade-3",
        discipline: Discipline.INSTRUMENT,
        instrument: "Acoustic Guitar",
        level: CourseLevel.INTERMEDIATE,
        accreditation: "ABRSM Grade 3",
        description:
          "Advance your guitar skills with fingerpicking, barre chords, and intermediate music theory. Prepares for ABRSM Grade 3 practical exam.",
        syllabusSummary:
          "Barre chord forms • Fingerpicking patterns (Travis, arpeggio) • Music theory: intervals, key signatures • 3 exam pieces • Scales in position • Ensemble playing",
        priceMinorUnits: 1799900, // ₹17,999.00
        currency: "INR",
        sessionCount: 30,
        durationWeeks: 16,
        isPublished: true,
      },
    }),

    prisma.course.create({
      data: {
        title: "Hindustani Vocals — Beginner Raag Foundation",
        slug: "hindustani-vocals-beginner-raag-foundation",
        discipline: Discipline.VOCALS,
        instrument: "Hindustani Vocals",
        level: CourseLevel.BEGINNER,
        description:
          "Introduction to Hindustani classical vocal music. Master sa-re-ga-ma swaras, basic alaap technique, and learn 3 foundational raags with compositions in Khayal style.",
        syllabusSummary:
          "Swar sadhana & pitch training • Raag Yaman, Raag Bhupali, Raag Kafi • Khayal bandish (2 each raag) • Taal: Teentaal & Ektaal • Alaap development • Tanpura accompaniment",
        priceMinorUnits: 1299900, // ₹12,999.00
        currency: "INR",
        sessionCount: 20,
        durationWeeks: 10,
        isPublished: true,
      },
    }),

    prisma.course.create({
      data: {
        title: "Kathak — Beginner Nritta Fundamentals",
        slug: "kathak-beginner-nritta-fundamentals",
        discipline: Discipline.DANCE,
        instrument: "Kathak",
        level: CourseLevel.BEGINNER,
        description:
          "Learn the foundational footwork (tatkar), hand gestures (mudras), and spins (chakkar) of Kathak dance. Includes taal recitation and a complete solo choreography.",
        syllabusSummary:
          "Tatkar (footwork) in Teentaal • Hand mudras & hastak • Basic tukda & toda • Chakkar technique • Namaskar & salami • Solo choreography composition",
        priceMinorUnits: 999900, // ₹9,999.00
        currency: "INR",
        sessionCount: 16,
        durationWeeks: 8,
        isPublished: true,
      },
    }),
  ]);

  console.log(`  ✓ Courses: ${courses.length} created`);
  for (const c of courses) {
    console.log(`    - ${c.title} (₹${(c.priceMinorUnits / 100).toFixed(0)}, ${c.sessionCount} sessions)`);
  }

  // ─── Event: Upcoming Workshop ──────────────────────────────────────

  const nextSaturday = new Date();
  nextSaturday.setDate(
    nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7 || 7),
  );
  nextSaturday.setHours(15, 0, 0, 0); // 3 PM local

  const event = await prisma.event.create({
    data: {
      title: "Introduction to Indian Classical Music — Free Workshop",
      description:
        "Join us for a free introductory workshop exploring the fundamentals of Indian classical music. We'll cover the basic concepts of raag, taal, and swar, with live demonstrations on sitar, tabla, and vocals. Open to all ages and experience levels.",
      type: EventType.WORKSHOP,
      startsAt: nextSaturday,
      durationMinutes: 90,
      capacity: 50,
      isPublished: true,
    },
  });

  console.log(
    `  ✓ Event: "${event.title}" on ${nextSaturday.toLocaleDateString()} (capacity: ${event.capacity})`,
  );

  // ─── Lesson: Elena + Aisha, 5 minutes from now (TRIAL) ────────────

  const fiveMinutesFromNow = new Date(Date.now() + 5 * 60_000);

  const lesson1 = await prisma.lesson.create({
    data: {
      teacherProfileId: teacherProfile1.id,
      teacherId: teacher1.id,
      studentId: student1.id,
      instrument: "Piano",
      startsAt: fiveMinutesFromNow,
      durationMinutes: 60,
      status: LessonStatus.SCHEDULED,
      lessonSource: LessonSource.TRIAL,
    },
  });

  console.log(
    `  ✓ Lesson: ${teacher1.name} → ${student1.name} at ${fiveMinutesFromNow.toISOString()} (Piano, 60min, TRIAL)`,
  );

  // ─── Enrollment: James in Piano with Elena ─────────────────────────
  const pianoCourse = courses[1]; // Western Classical Piano
  const payment = await prisma.payment.create({
    data: {
      studentId: student2.id,
      amountMinorUnits: pianoCourse.priceMinorUnits,
      currency: "INR",
      gateway: "razorpay",
      gatewayOrderId: "order_seed_james_piano_001",
      gatewayPaymentId: "pay_seed_james_piano_001",
      status: PaymentStatus.PAID,
    },
  });

  const enrollment = await prisma.enrollment.create({
    data: {
      studentId: student2.id,
      courseId: pianoCourse.id,
      paymentId: payment.id,
      teacherId: teacher1.id,
      status: EnrollmentStatus.ACTIVE,
      sessionsRemaining: pianoCourse.sessionCount - 1,
    },
  });

  // Completed enrollment lesson (yesterday)
  const yesterday = new Date(Date.now() - 24 * 60 * 60_000);
  await prisma.lesson.create({
    data: {
      teacherProfileId: teacherProfile1.id,
      teacherId: teacher1.id,
      studentId: student2.id,
      enrollmentId: enrollment.id,
      instrument: "Piano",
      startsAt: yesterday,
      durationMinutes: 60,
      status: LessonStatus.COMPLETED,
      lessonSource: LessonSource.ENROLLMENT,
    },
  });

  // Scheduled enrollment lesson (tomorrow)
  const tomorrow = new Date(Date.now() + 24 * 60 * 60_000);
  await prisma.lesson.create({
    data: {
      teacherProfileId: teacherProfile1.id,
      teacherId: teacher1.id,
      studentId: student2.id,
      enrollmentId: enrollment.id,
      instrument: "Piano",
      startsAt: tomorrow,
      durationMinutes: 60,
      status: LessonStatus.SCHEDULED,
      lessonSource: LessonSource.ENROLLMENT,
    },
  });

  console.log(
    `  ✓ Enrollment: ${student2.name} in "${pianoCourse.title}" assigned to ${teacher1.name} (1 completed lesson, 1 upcoming lesson, ENROLLMENT)`,
  );

  // ─── Summary ───────────────────────────────────────────────────────

  console.log("\n🌱 Seed complete!");
  console.log(`   Users: 5 (1 admin, 2 teachers, 2 students)`);
  console.log(`   Teacher profiles: 2`);
  console.log(
    `   Availability rules: ${await prisma.availabilityRule.count()}`,
  );
  console.log(`   Courses: ${courses.length}`);
  console.log(`   Events: 1`);
  console.log(
    `   Lessons: 1 (starting at ${fiveMinutesFromNow.toISOString()})`,
  );
  console.log(
    `\n   Login credentials:`,
  );
  console.log(`   Admin:   admin@gandharva.com / admin123`);
  console.log(`   Teacher: elena@example.com / password123`);
  console.log(`   Teacher: marcus@example.com / password123`);
  console.log(`   Student: aisha@example.com / password123`);
  console.log(`   Student: james@example.com / password123`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
