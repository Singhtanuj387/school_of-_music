/**
 * faqPages.ts — canonical mapping for FAQ section content per page.
 *
 * Format:
 * {
 *   faqs: Array<{ question: string; answer: string }>,
 *   title?: string  // optional custom title (defaults to "FAQs")
 * }
 *
 * Place all route keys as object keys (e.g. '/', '/courses/piano', '/guitar').
 * The FAQ component will automatically pick content based on current pathname.
 * Keys ending with '*' act as wildcard prefix patterns.
 */

export type FAQPage = {
  faqs: Array<{ question: string; answer: string }>;
  title?: string;
};

const faqPages: Record<string, FAQPage> = {
  default: {
    faqs: [
      {
        question: "Do you provide any study material with the course?",
        answer:
          "Yes! Once you become a Gandharva student, you will have access to all the resources you need from reading material to practice videos, and even tools like metronome, music sheets, backing track and more. You will find all the resources on your student dashboard.",
      },
      {
        question: "Do you teach adults?",
        answer: "Yes, we offer courses suitable for adults of all skill levels.",
      },
      {
        question: "Which instrument model should I purchase?",
        answer:
          "We provide guidance on choosing the best instrument model based on your skill level and budget.",
      },
      {
        question: "Do you teach Grade Exams and provide certifications?",
        answer:
          "Yes, we offer structured grade exam preparation and internationally recognized certifications.",
      },
      {
        question:
          "Will there be a Theory or Practical Exam at the end of the course?",
        answer:
          "Yes, there will be both theory and practical exams to assess your learning.",
      },
    ],
  },

  "/": {
    faqs: [
      {
        question: "Do you provide any study material with the course?",
        answer:
          "Yes! Once you become a Gandharva student, you will have access to all the resources you need from reading material to practice videos, and even tools like metronome, music sheets, backing track and more. You will find all the resources on your student dashboard.",
      },
      {
        question: "Do you teach adults?",
        answer: "Yes, we offer courses suitable for adults of all skill levels.",
      },
      {
        question: "Which instrument model should I purchase?",
        answer:
          "We provide guidance on choosing the best instrument model based on your skill level and budget.",
      },
      {
        question: "Do you teach Grade Exams and provide certifications?",
        answer:
          "Yes, we offer structured grade exam preparation and internationally recognized certifications.",
      },
      {
        question:
          "Will there be a Theory or Practical Exam at the end of the course?",
        answer:
          "Yes, there will be both theory and practical exams to assess your learning.",
      },
       
    ],
  },

  "/courses/piano": {
    faqs: [
      {
        question: "What piano models do you recommend for beginners?",
        answer:
          "For beginners, we recommend digital pianos like Yamaha P-45, Casio CDP-S100, or Roland FP-10. These offer quality sound and touch sensitivity at affordable prices.",
      },
      {
        question: "Do I need a full 88-key piano to start?",
        answer:
          "While 88 keys is ideal for learning classical piano, you can start with a 61-key keyboard. However, we recommend upgrading to 88 keys as you progress.",
      },
      {
        question: "How long does it take to learn piano?",
        answer:
          "Basic proficiency can be achieved in 6-12 months with consistent practice. Advanced skills require years of dedicated learning and practice.",
      },
      {
        question: "Do you teach both classical and contemporary piano?",
        answer:
          "Yes, we offer courses in both classical piano and contemporary styles including pop, jazz, and Bollywood music.",
      }, 
    ],
  },

  "/vocals": {
    faqs: [
      {
        question: "Do I need any equipment for online vocal lessons?",
        answer:
          "You'll need a device with a camera and microphone, a stable internet connection, and a quiet space to practice. Professional microphones are optional but recommended for advanced students.",
      },
      {
        question: "Can you help improve my vocal range?",
        answer:
          "Yes! Our vocal training includes exercises specifically designed to expand your vocal range safely and effectively.",
      },
      {
        question: "Do you teach different singing styles?",
        answer:
          "Absolutely. We offer training in classical (Hindustani/Carnatic), Western contemporary, Bollywood, and various other singing styles.",
      },
      {
        question: "How often should I practice singing?",
        answer:
          "We recommend daily practice sessions of 20-30 minutes for beginners, gradually increasing to 45-60 minutes as you advance.",
      },
    ],
  },
};

export default faqPages;
