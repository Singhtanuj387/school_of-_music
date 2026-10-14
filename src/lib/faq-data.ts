export interface FaqItem {
  id: string;
  category: "about-us" | "courses-and-classes" | "pricing-payment" | "start-learning-music" | "attending-the-class";
  question: string;
  answer: string;
}

export interface FaqCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "about-us",
    name: "About Us",
    description: "Learn about Gandharva School of Music, our accredited faculty, and global mission.",
    icon: "school",
  },
  {
    slug: "courses-and-classes",
    name: "Courses & Classes",
    description: "Course curriculums, 1-on-1 format, exam preparation, and customized pacing.",
    icon: "music",
  },
  {
    slug: "pricing-payment",
    name: "Pricing & Payment",
    description: "Fees, regional currency support, subscription packages, and refund protections.",
    icon: "card",
  },
  {
    slug: "start-learning-music",
    name: "Start Learning Music",
    description: "Getting started, buying your first instrument, beginner guidance, and trial sessions.",
    icon: "sparkle",
  },
  {
    slug: "attending-the-class",
    name: "Attending The Class",
    description: "Platform login, camera placement, audio setup, and rescheduling guidelines.",
    icon: "video",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  // About Us
  {
    id: "about-1",
    category: "about-us",
    question: "What is Gandharva School of Music?",
    answer:
      "Gandharva School of Music is an premier online performing arts academy providing personalized 1-on-1 live music and dance classes to students across 15+ countries. We combine centuries-old musical traditions with international exam board preparation (Trinity, Rockschool, ABRSM) and digital performance recitals.",
  },
  {
    id: "about-2",
    category: "about-us",
    question: "Are your teachers certified and qualified?",
    answer:
      "Yes. All Gandharva instructors undergo a rigorous 4-stage selection process with an acceptance rate below 3%. Our faculty includes Trinity/Rockschool certified fellows, Sangeet Visharad/Alankar maestros from Gandharva Mahavidyalaya, and touring concert artists.",
  },
  {
    id: "about-3",
    category: "about-us",
    question: "Is there an age limit to join?",
    answer:
      "Not at all! We teach children as young as 4.5 years old (with specialized early-childhood pedagogy) up to adult hobbyists and senior citizens pursuing their lifelong passion for music.",
  },

  // Courses & Classes
  {
    id: "courses-1",
    category: "courses-and-classes",
    question: "Are classes 1-on-1 or group-based?",
    answer:
      "Every regular Gandharva class is 100% personalized 1-on-1 with your dedicated instructor. This guarantees undivided attention, posture inspection, instant error correction, and lessons calibrated precisely to your learning pace.",
  },
  {
    id: "courses-2",
    category: "courses-and-classes",
    question: "Can I prepare for international board exams like Trinity or Rockschool?",
    answer:
      "Absolutely. Our curriculum directly maps to Trinity College London, Rockschool (RSL), ABRSM, and Gandharva Mahavidyalaya. We guide you through sight-reading, technical exercises, repertoire pieces, and complete mock exams with a 98% distinction rate.",
  },
  {
    id: "courses-3",
    category: "courses-and-classes",
    question: "Can I choose my favorite songs or Bollywood music?",
    answer:
      "Yes! While we teach essential fundamental technique, theory, and posture, our mentors gladly incorporate your favorite songs—whether Western pop, rock, film music, devotional bhajans, or Bollywood melodies—into your lesson plan.",
  },

  // Pricing & Payment
  {
    id: "pricing-1",
    category: "pricing-payment",
    question: "How much do music lessons cost?",
    answer:
      "Our pricing is transparent and depends on your country/currency and chosen package (e.g. 1 month, 3 months, or 6 months). We support payments in INR (₹), USD ($), GBP (£), and EUR (€) with EMI payment plans available for long-term programs.",
  },
  {
    id: "pricing-2",
    category: "pricing-payment",
    question: "Is the initial trial session really free?",
    answer:
      "Yes! Your 30-minute 1-on-1 trial session is completely free with no credit card required. You will meet your instructor, receive a voice/skill evaluation, and get a customized syllabus roadmap before making any financial commitment.",
  },
  {
    id: "pricing-3",
    category: "pricing-payment",
    question: "What is your refund policy if I need to discontinue?",
    answer:
      "If you need to discontinue your course due to schedule changes or emergencies, any unused remaining session credits are eligible for a prorated refund within 30 days of purchase.",
  },

  // Start Learning Music
  {
    id: "start-1",
    category: "start-learning-music",
    question: "Do I need to own an instrument before taking a trial class?",
    answer:
      "For vocal courses, you need nothing other than your voice! For instrumental courses (keyboard, guitar, violin, flute, tabla), owning an instrument is recommended for hands-on practice, but you are welcome to take your trial session first so your teacher can recommend the exact model and budget suited for you.",
  },
  {
    id: "start-2",
    category: "start-learning-music",
    question: "I have zero musical background. Can I still learn?",
    answer:
      "Over 60% of our students start as complete beginners who have never touched an instrument or read sheet music. Our step-by-step curriculum is designed to make fundamentals fun, intuitive, and rewarding from day one.",
  },
  {
    id: "start-3",
    category: "start-learning-music",
    question: "How often should I practice at home?",
    answer:
      "Consistency is key! We recommend practicing 15 to 20 minutes a day, 4 to 5 days a week. Short daily practice creates durable muscle memory and far outperforms long weekend cram sessions.",
  },

  // Attending The Class
  {
    id: "attending-1",
    category: "attending-the-class",
    question: "What equipment do I need to attend online classes?",
    answer:
      "All you need is: 1) A laptop, desktop, tablet, or smartphone; 2) A stable internet connection (minimum 5 Mbps); 3) Built-in camera and microphone or basic headphones with a mic.",
  },
  {
    id: "attending-2",
    category: "attending-the-class",
    question: "What if I need to reschedule a class?",
    answer:
      "We understand that emergencies and school exams happen. Simply inform your mentor or student support at least 6 hours prior to the scheduled lesson time, and your class credit will be preserved for a makeup session.",
  },
  {
    id: "attending-3",
    category: "attending-the-class",
    question: "How do I join my live class session?",
    answer:
      "You can join with a single click from your Gandharva Student Dashboard or via the calendar invite link sent to your registered email and WhatsApp 15 minutes before class begins.",
  },
];
