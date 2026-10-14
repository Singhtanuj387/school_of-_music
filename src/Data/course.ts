// type CourseCategory = "Foundation" | "Beginner" | "Intermediate" | "Advanced";

// type CourseLevel = {
//   keyFeatures: string[];
//   performOpportunity: string[];
//   competeOpportunity: boolean;
//   composeOpportunity: boolean;
//   teachOpportunity: boolean;
// };

// type CourseDetails = {
//   title: string;
//   description: string;
//   duration: string;
//   certificate: string;
//   masterClass: string;
//   price: number;
//   href: string;
// };
// type CourseDataAllType = {
//   title: string;
//   tableData: Record<CourseCategory, CourseLevel>;
// } & Record<CourseCategory, CourseDetails[]>;

const CourseDataAll = {
  pianoAll: {
    title: "Piano",
    pic: "instruments-1.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Basic Elements of Piano (Keys & Notes)",
          "Posture and fingers",
          "Beats, rhythm & time signature",
          "Concepts like dynamics, slurs, tie notes and dotted rhythms",
          "Staff notations (Clef, Notes values, etc.)",
          "Learn songs in Middle ‘C’, ‘C’ and ‘G’ Position",
          "Chords & basic music theory",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Basic Piano Elements (Keys, Notes and Fingers)",
          "Middle ‘C’ position, ‘C’ position and ‘G’ position",
          "Basic of reading and writing sheet music",
          "Basic Dynamics and Articulations",
          "Basic Rhythms and Practices",
          "Major and Minor Sclaes",
          "Chords and their applications",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Playing Harmonic and Melodic minor scales",
          "Intermediate Dynamics and Articulations",
          "Use of 7th, major 7th, minor 7th chords",
          "More techniques for hand independence",
          "Intermediate hand positioning",
          "Ear Training and Aural Training",
          "Arpeggios and their applications",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Advanced Scales",
          "Use of Add9, Add13 and Sus Chords",
          "Chords Family and Advanced Chord Progression",
          "Advanced Piano Positions",
          "Improvisation",
          "Advanced Arpeggios and Accompaniments",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Piano Foundation",
        description:
          "This course offers a supportive environment where our approachable and dedicated instructors introduce students to the basics of piano playing. Students learn to read sheet music, develop proper techniques, and acquire essential musical skills. More than just lessons, this course inspires a lifelong love for music.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/piano-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Piano Method Book 1",
        description:
          "The Gandharva Piano Method Book 1 course is ideal for students who have been learning piano for over six months and have a solid grasp of the basics. This course introduces techniques, rhythms, coordination, and musical understanding to help students excel on the piano.",
        duration: "6-8 Months",
        certificate: "on Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/piano-method-book-1/",
      },
      {
        title: "Rockschool Piano Debut",
        description:
          "The Rockschool Piano Debut exam is ideal for students who have established foundational skills and techniques. This course prepares students for the Rockschool Debut exam, with expert instructors guiding them through every step of the process.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/rockschool-piano-debut/",
      },
      {
        title: "Trinity Piano Initial",
        description:
          "This course prepares beginners for the Trinity Piano Grade Initial exam, making it ideal for those who are just starting to learn the fundamentals of piano. The Trinity exam is a highly regarded music certification, and our teachers support students throughout their entire certification journey.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/trinity-piano-initial/",
      },
      {
        title: "Rockschool Piano Grade 1",
        description:
          "Once students complete the Rockschool Piano Grade Debut exam, they can focus on excelling in the RSL Piano Grade 1 exam. Our instructors guide them through every step, from the application process to submitting the evaluation video and receiving the internationally recognized certificate.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/rockschool-piano-grade-1/",
      },
      {
        title: "Trinity Piano Grade 1",
        description:
          "This course is perfect for aspiring pianists with 6 to 12 months of experience who are eager to prepare for the Trinity Piano Grade 1 exam. Our instructors manage all aspects, from registration to receiving results, so students can dedicate themselves entirely to improving their piano-playing abilities.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/trinity-piano-grade-1/",
      },
      {
        title: "ABRSM Piano Initial",
        description:
          "The ABRSM Piano Initial course is designed for learners with 6-8 months of focused piano practice who wish to delve into Western Classical music. Our experienced instructors provide comprehensive support, handling everything from registration and exam preparation to obtaining the certificate.",
        duration: "6-8 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/abrsm-piano-initial/",
      },
      {
        title: "ABRSM Piano Grade 1",
        description:
          "The ABRSM Piano Grade 1 course is tailored for students with 6-12 months of piano experience. Guided by certified professionals, students refine their skills by mastering performance pieces from renowned composers such as Mozart, Bach, Diabelli, Purcell, and others.",
        duration: "6-8 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/piano/abrsm-piano-grade/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Piano Method Book 2",
        description:
          "Gandharva Method Book 2 is an ideal resource for young pianists with over 18 months of experience. This course helps students develop intermediate skills, including triads, arpeggios, rhythm techniques, and more, empowering them to excel in piano playing.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/piano-method-book-2/",
      },
      {
        title: "Rockschool Piano Grade 2",
        description:
          "Upon completing RSL Grade 1, students can begin preparing for the RSL Piano Grade 2 exam. This course guides them through mastering three performance pieces and delivering a confident recorded performance for the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/rockschool-piano-grade-2/",
      },
      {
        title: "Trinity Piano Grade 2",
        description:
          "The Trinity Piano Grade 2 exam is perfect for students who have successfully completed the Grade 1 exam. In this course, instructors assist students in building technical proficiency and preparing three pieces, including classical works, for their performance.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/trinity-piano-grade-2/",
      },
      {
        title: "Rockschool Piano Grade 3",
        description:
          "Looking for a challenge after completing the Grade 2 exam? This course equips students with the piano techniques needed to excel in the RSL Grade 3 exam. Our instructors guide students through the application process, provide supporting tests, and offer technical exercises to help their exam video stand out.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/rockschool-piano-grade-3/",
      },
      {
        title: "Trinity Piano Grade 3",
        description:
          "Prepare for the Trinity Piano Grade 3 exam by learning performance pieces such as Model T, Rain, and Sonata in G. Our instructors guide students in mastering the technical skills needed for Grade 3 certification, providing supporting tests and ensuring they are ready to present themselves confidently.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/trinity-piano-grade-3/",
      },
      {
        title: "Rockschool Piano Grade 4",
        description:
          "The Rockschool Piano Grade 4 exam is designed for pianists with over two years of experience. This course focuses on helping students develop their unique expression and style while building the techniques needed to perform confidently across various styles for the RSL Grade 4 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/rockschool-piano-grade-4/",
      },
      {
        title: "Trinity Piano Grade 4",
        description:
          "This course equips students to excel in the Trinity Grade 4 exam. They learn patch settings, layering techniques, and basic sound manipulation to enhance their evaluation video performance. Additionally, our instructors guide students in preparing three performance pieces for the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/trinity-piano-grade-4/",
      },
      {
        title: "ABRSM Piano Grade 2",
        description:
          "The ABRSM Piano Grade 2 exam is ideal for students with 12–18 months of piano practice. Building on the foundational skills learned in Grade 1, our certified instructors guide students in mastering compositions by renowned composers such as Beethoven, Mozart, and Haydn to excel in their exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/abrsm-piano-grade-2/",
      },
      {
        title: "ABRSM Piano Grade 3",
        description:
          "This course is designed for students with 18–24 months of piano experience. It introduces compositions by Schumann, Clementi, and Anon, along with the analysis of musical structures and music theory. Students also prepare songs to confidently tackle their ABRSM Grade 3 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/piano/abrsm-piano-grade-3/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Piano Method Book 3",
        description:
          "The Gandharva Piano Method Book 3 acts as a vital stepping stone for students advancing toward higher levels of piano mastery. It equips learners with essential techniques and introduces them to a variety of arpeggios and intricate chord patterns, enhancing their skills and deepening their musical comprehension.",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/piano-method-book-3/",
      },
      {
        title: "Rockschool Piano Grade 5",
        description:
          "Explore iconic music pieces by legends such as David Bowie, Vanessa Carlton, and David Guetta with the Rockschool Grade 5 curriculum. The RSL Piano Grade 5 course focuses on building expressive skills and stylistic understanding, with expert guidance provided at every stage to help students achieve certification and leave their mark in the music world.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/rockschool-piano-grade-5/",
      },
      {
        title: "Trinity Piano Grade 5",
        description:
          "This course introduces students to music by legendary artists like David Bowie, Vanessa Carlton, and David Guetta. Our expert instructors guide students to master these pieces with ease, ensuring they excel in their evaluation video for Trinity Electronic Piano Grade 5.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/trinity-piano-grade-5/",
      },
      {
        title: "Rockschool Piano Grade 6",
        description:
          "The RSL Piano Grade 6 course empowers students to refine their improvisation and musical expression while working toward a Grade 6 certification. Through this program, students master advanced scales, arpeggios, and complex chord progressions, equipping them to excel in the Rockschool Electronic Piano Grade 6 examination.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/rockschool-piano-grade-6/",
      },
      {
        title: "Trinity Piano Grade 6",
        description:
          "The Trinity Grade 6 course enhances students’ understanding of musical form and structure while fostering clear and effective musical communication. Students explore improvisation and cultivate their unique style, building authenticity and creativity to excel in the Trinity Electronic Piano Grade 6 examination.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/trinity-piano-grade-6/",
      },
      {
        title: "Rockschool Piano Grade 7",
        description:
          "Designed for pianists with 4-5 years of experience, the RSL Piano Grade 7 course focuses on cultivating authentic stylistic awareness, individuality, and expressive communication. With expert guidance, students refine their understanding of musical form and structure, preparing them to achieve the Grade 7 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/rockschool-piano-grade-7/",
      },
      {
        title: "Trinity Piano Grade 7",
        description:
          "The Trinity Piano Grade 7 course emphasizes developing authentic stylistic awareness, individuality, and expressive communication. With expert guidance, students are supported throughout the entire process—from application to mastering technical exercises and supplementary tests—ensuring their evaluation video shines for the Trinity Grade 7 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/trinity-piano-grade-7/",
      },
      {
        title: "Rockschool Piano Grade 8",
        description:
          "As the final step before the Professional level, this course solidifies students’ mastery of fluency, coordination, and rhythmic and stylistic awareness. It focuses on honing improvisation skills and showcasing seamless musical form and structure, preparing students to excel in the RSL Grade 8 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/rockschool-piano-grade-8/",
      },
      {
        title: "Trinity Piano Grade 8",
        description:
          "As the pinnacle of the Trinity Grade courses, this level requires students to have mastered all advanced techniques. The course focuses on building confidence in improvisation and enhancing musical awareness, ensuring students stand out in their Trinity Grade 8 certification exam with the expert support of our instructors.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/trinity-piano-grade-8/",
      },
      {
        title: "ABRSM Piano Grade 4",
        description:
          "This course prepares students for the ABRSM Piano Grade 4 exam, with guidance from certified professionals who help them develop expressive playing and articulation. In addition, students study Music Theory, Structure and Form Analysis, and explore compositions from various musical periods.",
        duration: "10-12 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/abrsm-piano-grade-4/",
      },
      {
        title: "ABRSM Piano Grade 5",
        description:
          "In this course, students enhance their expression, stylistic awareness, and improvisation skills. With the support of our certified and approachable instructors, they master compositions from the Baroque, Romantic, 20th century, and modern eras to excel in the Piano Grade 5 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + ABRSM London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/piano/abrsm-piano-grade-5/",
      },
    ],
  },
  "acoustic-guitarAll": {
    title: "Acoustic Guitar",
    pic: "instruments-2.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Anatomy of Guitar",
          "Fundamental finger techniques",
          "Three string chords",
          "C and G major scale",
          "30+ jingles and melodies",
          "Rhythm reading and basic strumming patterns",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Fundamental guitar techniques",
          "Ear Training 1",
          "Basic Music Theory and Sight Reading",
          "Understanding of basic Rhythms",
          "Major, minor and pentatonic sxles",
          "Songs",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Soloing techniques and scale improvisation",
          "Use of 7th, major 7th, minor 7th chords",
          "Intermediate Rhythms and progressions",
          "Exploring Blues, Rock, Country, Metal, Funk Genres",
          "Fingerstyle technique",
          "Analysing Music and songs",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: ["Solo YouTube Performances"],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Acoustic Guitar Foundation",
        description:
          "Want to introduce your child to the world of guitar playing? Gandharva’s Guitar Foundation Course is the perfect starting point! Designed for easy learning, this course focuses on building strong fundamentals, with guidance from our professionally qualified and supportive instructors every step of the way.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/acoustic-guitar-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Acoustic Guitar Method Book 1",
        description:
          "The Acoustic Guitar Method Book 1 course takes students to the next stage of rhythm techniques, chord progressions, and scales, demonstrating their use in modern and pop music. It also introduces the concept of riffs, enabling students to effortlessly play a variety of songs using a combination of riffs and chords on their guitar.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/acoustic-guitar-method-book-1/",
      },
      {
        title: "Rockschool Acoustic Guitar Debut",
        description:
          "If your child has been playing the acoustic guitar for some time, Rockschool’s highly regarded Acoustic Guitar Debut course is an excellent way to put their skills to the test! This course is tailored to refine their basic techniques, coordination, and musical knowledge, preparing them to excel in the RSL Guitar Debut exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-debut/",
      },
      {
        title: "Trinity Acoustic Guitar Initial",
        description:
          "If you’re looking for your child to earn an internationally recognized certification from a leading exam board, this course is the perfect starting point. Students will learn to perform three pieces by renowned artists such as Bill Withers, John Newton, and Bob Marley, allowing them to showcase their skills confidently during the exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/trinity-acoustic-guitar-initial/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 1",
        description:
          "The Rockschool Acoustic Guitar Grade 1 exam is ideal for students who have successfully mastered basic debut-level skills. With guidance from our professionally certified teachers, students prepare three performance pieces by renowned artists such as Bob Marley, Ed Sheeran, and Jeff Buckley. This exam also provides an opportunity for students to showcase their improvisation skills.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-1/",
      },
      {
        title: "Trinity Acoustic Guitar Grade 1",
        description:
          "If your child has successfully completed the Initial Grade, they are ready to begin preparing for the Grade 1 exam. This course focuses on developing the technical skills needed to excel in the Trinity Acoustic Guitar Grade 1 exam. With guidance from our experienced professionals, your child will gain the confidence and expertise to perform at their best during the exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/acoustic-guitar/trinity-acoustic-guitar-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Acoustic Guitar Method Book 2",
        description:
          "Gandharva’s Guitar Method Book 2 is an excellent choice for beginner guitarists looking to advance their skills. This program emphasizes improving soloing techniques, mastering intermediate rhythms, and expanding knowledge of music theory. It offers a comprehensive foundation in music while exposing students to a variety of genres.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/acoustic-guitar-method-book-2/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 2",
        description:
          "Once you’ve completed the RSL Grade 1, it’s time to begin preparing for the RSL Piano Grade 2 exam. This course guides students in learning three performance pieces and helps them record a confident and polished performance for the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-2/",
      },
      {
        title: "Trinity Acoustic Guitar Grade 2",
        description:
          "The Trinity Piano Grade 2 exam is perfect for students who have successfully completed the Trinity Piano Grade 1 exam. In this course, our teachers guide students in building technical proficiency and preparing to perform three pieces, including classic selections.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/trinity-acoustic-guitar-grade-2/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 3",
        description:
          "Do you think your child has the potential to become a great guitarist? The Rockschool Acoustic Guitar Grade 3 exam can guide them on that path. After about 18 months to 2 years of learning, this course will help them build confidence in improvisation phrasing and start to develop an understanding of different musical styles.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-3/",
      },
      {
        title: "Trinity Acoustic Guitar Grade 3",
        description:
          "This exam is perfect for students who have already mastered Grade 2 skills. In this course, students will enhance their improvisation, phrasing, and deepen their understanding of various music styles. Our certified experts guide them in mastering three performance pieces from renowned artists, such as John Denver, arranged by TJ Walker, and Eagles, to showcase their abilities.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/trinity-acoustic-guitar-grade-3/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 4",
        description:
          "The Rockschool Acoustic Guitar Grade 4 exam is designed for guitarists who have already mastered the skills up to Grade 3. In this course, we guide students in mastering three performance pieces from well-known artists like Ariana Grande, The Beatles, and Sam Smith, while also refining their improvisation techniques to ensure they excel in their Grade 4 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-4/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Acoustic Guitar Method Book 3",
        description:
          "If your child has successfully passed the Trinity or RSL Grade 4 exam, they are prepared to advance their skills to the next level. This serves as an essential foundation for Grade 5 courses. Our approachable instructors guide students in mastering music composition, soloing over chord progressions, and exploring the stylistic nuances of various genres—paving the way for them to create their very own songs!",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/acoustic-guitar/acoustic-guitar-method-book-3/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 5",
        description:
          "The Rockschool Acoustic Guitar Grade 5 exam is designed for students with over three years of guitar experience. This course includes an exciting repertoire featuring songs by artists like Ed Sheeran, Dionne Warwick, and Katy Perry. With guidance from our expert instructors, students will refine their performance skills and build the confidence needed to excel in the exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-5/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 6",
        description:
          "The Rockschool Acoustic Guitar Grade 6 exam is ideal for students learning guitar for at least four years or successfully completing Grade 5. In this course, students will master three performance pieces by renowned artists like Nick Drake, Fats Waller, and José González. Our expert guidance ensures they are fully prepared to excel in the RSL Acoustic Guitar Grade 6 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-6/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 7",
        description:
          "Help your guitarist achieve their dreams with our Rockschool Acoustic Guitar Grade 7 course. We are dedicated to enhancing our students’ skills, from refining technique to mastering musical expression. This course includes a dynamic repertoire featuring artists like Kaki King. Join us in inspiring their journey toward becoming a true rock star!",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-7/",
      },
      {
        title: "Rockschool Acoustic Guitar Grade 8",
        description:
          "The Rockschool Acoustic Guitar Grade 8 exam is tailored for students with five or more years of guitar experience. This course focuses on mastering advanced techniques, enhancing expressiveness, tackling intricate rhythms, and developing fluency, coordination, and musical depth. Join us to support your musical aspirations with dedication and passion.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/acoustic-guitar/rockschool-acoustic-guitar-grade-8/",
      },
    ],
  },
  "electric-guitarAll": {
    title: "Electric Guitar",
    pic: "instruments-sllider.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Anatomy of Guitar",
          "Fundamental finger techniques",
          "Three string chords",
          "C and G major scale",
          "30+ jingles and melodies",
          "Rhythm reading and basic strumming patterns",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Major, minor and pentatonic scale",
          "Strumming patterns and rhythm reading",
          "Left and right-hand playing techniques",
          "Concept of riffs and its application",
          "20+ melodies and songs",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Introduction to Fretboard Mapping",
          "20+ songs to demonstrate learned techniques",
          "Arpeggios and Application in Songs",
          "Triplets and 16th note rhythm study",
          "Introduction to blues",
          "12 bar blues",
          "Music Theory",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Study of harmony and harmonization",
          "Composing your own songs",
          "Advanced Guitar techniques",
          "Playing over changes and improvisation",
          "Complex Rhtyhms and Time Signatures",
          "Stylistic Study of genres",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Electric Guitar Foundation",
        description:
          "If you’re looking to help your child start playing the guitar, Gandharva’s Electric Guitar Foundation Course is the ideal starting point! This easy-to-follow course will guide your child through the basics, with support from our professionally qualified and friendly instructors, ensuring they receive personalized assistance every step of the way.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/electronic-guitar-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Electric Guitar Method Book 1",
        description:
          "This course is perfect for students with at least six months of guitar experience or those who have completed a foundation course. It emphasizes advancing rhythm techniques, chords, and scales, applying these skills to modern and pop songs.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/electric-guitar-method-book-1/",
      },
      {
        title: "Rockschool Electric Guitar Debut",
        description:
          "The Rockschool Electric Guitar Debut Grade is ideal for beginners with foundational guitar skills. This level evaluates essential elements such as reading music notation, understanding note values, controlling tone, and achieving smooth string transitions.",
        duration: "6-8 Months",
        certificate: " Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-debut/",
      },
      {
        title: "Trinity Electric Guitar Initial",
        description:
          "Trinity, one of the most esteemed and longstanding music exam boards, offers internationally recognized certifications. If your child has completed the Electric Guitar Method Book 1 and is ready to earn a certification from this prestigious institution, this course is the perfect next step.",
        duration: "6-8 Months",
        certificate: " Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-initial/",
      },
      {
        title: "Rockschool Electric Guitar Grade 1",
        description:
          "RSL’s Grade 1 Guitar exam is designed for students with six months to a year of playing experience who have mastered basic skills. This level emphasizes contemporary and pop melodies, offering a selection of 12 pieces, from which students can choose any three to perform for the exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-1/",
      },
      {
        title: "Trinity Electric Guitar Grade 1",
        description:
          "If your child has finished the Trinity Rock and Pop Initial, it’s time to prepare for Grade 1. In this course, students enhance a variety of skills and techniques, including single-note riffs, power chord riffs, articulation, and picking accuracy, all aimed at helping them succeed in their certification exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-1/",
      },
      {
        title: "Rockschool Electric Guitar Grade 2",
        description:
          "The RSL Grade 2 Guitar exam is ideal for students with 1 to 1.5 years of playing experience. It focuses on improving skills such as notation reading, technical control, articulation, sound accuracy, and synchronization, using structured and manageable pieces to reinforce foundational abilities.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-2/",
      },
      {
        title: "Trinity Electric Guitar Grade 2",
        description:
          "In this course, your child will develop various skills and techniques, including left-hand damping, transitioning between single notes and chords, palm muting, and playing open strings alongside fretted notes.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-2/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Electric Guitar Method Book 2",
        description:
          "This course aims to enhance students’ musical knowledge by focusing on soloing techniques, intermediate rhythm studies, and key music theory concepts. With a well-rounded approach, it equips students with a solid musical foundation and exposes them to a variety of genres, improving both their technical abilities and stylistic flexibility.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/electric-guitar-method-book-2/",
      },
      {
        title: "Rockschool Electric Guitar Grade 3",
        description:
          "The RSL Grade 3 exam is designed for students who have spent around two years honing their foundational skills. The course focuses on improving notation accuracy, sound quality, stylistic techniques, articulation, control, and other essential technical skills needed to excel in the Grade 3 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-3/",
      },
      {
        title: "Trinity Electric Guitar Grade 3",
        description:
          "The Trinity Electric Guitar Grade 3 course emphasizes skills and techniques such as articulation, solo playing, rhythmic accuracy, and dexterity to help your child succeed in the Trinity Grade 3 exam. Throughout the course, students also engage in ear training with accompanying tests and technical exercises.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-3/",
      },
      {
        title: "Rockschool Electric Guitar Grade 4",
        description:
          "The Rockschool Electric Guitar Grade 4 course is crafted for enthusiastic guitarists with approximately two years of practice. This level aims to enhance students’ stylistic awareness and emotional expression by introducing advanced techniques, emphasizing technical exercises, sight-reading, and ear training.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-4/",
      },
      {
        title: "Trinity Electric Guitar Grade 4",
        description:
          "With personalized one-on-one live classes led by certified professional instructors, students learn to play the electric guitar at their own pace and in their preferred style. They develop a variety of engaging skills and techniques, including bends, riff playing, dynamic control, and solo versatility, all while mastering three selected songs.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-4/",
      },
      {
        title: "Rockschool Electric Guitar Grade 5",
        description:
          "In this course, students work on longer pieces to gain a richer appreciation of musical styles and expressions. They focus on playing with precision, ensuring every note is executed accurately and with proper technique. The course emphasizes enhancing their ability to infuse life into music, whether through complex rhythms or engaging solos.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-5/",
      },
      {
        title: "Trinity Electric Guitar Grade 5",
        description:
          "The Trinity Electric Guitar Grade 5 course introduces students to advanced techniques such as unison bends, complex rhythm counting, intricate soloing, and hybrid picking. These skills add depth and emotion to their performances. The course is centered around three carefully chosen songs, designed to enhance playback, improvisation abilities, and prepare students to excel in the Grade 5 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-5/",
      },
    ],
    Advanced: [
      {
        title: "Rockschool Electric Guitar Grade 6",
        description:
          "This course focuses on enhancing students’ advanced technical skills, mastering complex stylistic techniques, and incorporating rhythmic intricacies to add creativity to their solos and improvisations. Through three thoughtfully selected songs, students are challenged and inspired to refine their ability to express emotions and ideas effectively through music.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-6/",
      },
      {
        title: "Trinity Electric Guitar Grade 6",
        description:
          "The Trinity Electric Guitar Grade 6 course is a detailed program tailored to prepare students for the Grade 6 exam. At this level, students delve into advanced and exciting guitar techniques, including incorporating hammer-ons within chords, mastering rapid picking, and playing octaves with precision and accuracy.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-6/",
      },
      {
        title: "Rockschool Electric Guitar Grade 7",
        description:
          "At Grade 7, students gain complete mastery over the instrument, confidently performing complex rhythms and intricate solos to excel in the exam. They refine their ability to execute stylistic techniques with precision, demonstrating a mature and creative approach in their solos and improvisations.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-7/",
      },
      {
        title: "Trinity Electric Guitar Grade 7",
        description:
          "The Trinity Electric Guitar Grade 7 course is thoughtfully designed to guide students in preparing for the Grade 7 exam. At this stage, students refine their ability to control sound accurately, master tremolo picking, execute ‘galloping’ rhythms, and perform with an extensive range of dynamics.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-7/",
      },
      {
        title: "Rockschool Electric Guitar Grade 8",
        description:
          "The Rockschool Electric Guitar Grade 8 course, the highest level in Rockschool certifications, is specifically designed to prepare students for the demanding and rewarding Grade 8 exam. This course is ideal for those who are ready to demonstrate their complete mastery of the guitar at the highest standard.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/rockschool-electric-guitar-grade-8/",
      },
      {
        title: "Trinity Electric Guitar Grade 8",
        description:
          "At Grade 7, students gain full control over the instrument, confidently performing complex rhythms and intricate solos to excel in the exam. They master stylistic techniques with authority, displaying a mature and creative approach in their solos and improvisations.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electric-guitar/trinity-electric-guitar-grade-8/",
      },
    ],
  },
  violinAll: {
    title: "Violin",
    pic: "instruments-4.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction To Violin",
          "Bowing Techniques",
          "Basic Finger Techniques",
          "The Major Scales",
          "Rhythm Exercises",
          "Articulations and Dynamics",
          "Melodies by Handel, Bach, Schumann",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Basic Bowing Techniques",
          "Basic Music Theory",
          "Introduction to Rhythm and patterns",
          "Major scales",
          "Arpeggios",
          "Exploring Bach, Handel Schumann",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Major and Minor scales multi octave",
          "Arpeggios 2 octaves",
          "Intermediate Rhythms and changes",
          "Intermediate Bowing techniques",
          "Focus on Tone and Intonation",
          "Exploring Mozart, Bach, Beethoven, Prucelli",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Advance Bowing Techniques",
          "Advance Sight Reading and Aural Training",
          "Concerto Pieces and Solo Playing Study",
          "Complex Time Signature and Rhythms",
          "Stylistic Study",
          "Composing Songs",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Violin Foundation",
        description:
          "If you’re seeking a fun and engaging way for your child to dive into music, our Violin Foundation course is the perfect choice! This course helps students build a solid foundation through finger and bowing techniques, rhythm exercises, and more.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/gandharva-violin-foundation/",
      },
      {
        title: "Suzuki Violin Foundation",
        description:
          "Establish a solid foundation for advanced violin playing with the Suzuki Violin Foundation course. This course emphasizes three key areas: playing, listening, and practicing through repetition. Our supportive teachers guide students through all the essential basics to ensure confident progress.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/suzuki-violin-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Violin Method Book 1",
        description:
          "If your child has mastered the basics up to the foundation level, the Gandharva Violin Method Book 1 course is an excellent fit. In this course, students will learn pieces by renowned composers such as Beethoven, Mozart, Bach, Handel, and more.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/gandharva-violin-method-book-1/",
      },
      {
        title: "Suzuki Violin Method Book 1",
        description:
          "Build a solid foundation for advanced violin playing with the Suzuki Violin Method Book 1 course. This course introduces students to scales, arpeggios, and pieces, gradually increasing in difficulty with each chapter. The primary focus is on consistent practice to master the techniques and build proficiency.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/suzuki-violin-method-book-1/",
      },
      {
        title: "Trinity Violin Initial",
        description:
          "Earn an internationally recognized certificate for your or your child’s violin skills with the Trinity Violin Initial exam. Our teachers will guide you through every step of the process, from the application to submitting the evaluation video and receiving the certificate.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/trinity-violin-initial/",
      },
      {
        title: "Trinity Violin Grade 1",
        description:
          "This course helps students develop strong foundational skills as violin players. It also includes supporting tests on topics such as Improvisation, Sight Reading, Aural Training, and Musical Knowledge, all designed to prepare for the Trinity Violin Grade 1 certification.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
        
        href: "/courses/violin/trinity-violin-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Violin Method Book 2",
        description:
          "For children who have been playing the violin for more than 18 months, Gandharva Violin Method Book 2 is an excellent choice. This course focuses on refining intermediate-level techniques and exercises, including arpeggios, articulation, dynamics, and other essential skills.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/violin/gandharva-violin-method-book-2/",
      },
      {
        title: "Trinity Violin Grade 2",
        description:
          "If your child has achieved Trinity Grade 1 certification, they are ready to begin preparing for Trinity Violin Grade 2. This course helps students refine their existing skills and introduces improvisation techniques, all under the expert guidance of our teachers, to ensure success in obtaining the Trinity Grade 2 certificate.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        
        href: "/courses/violin/trinity-violin-grade-2/",
      },
      {
        title: "Trinity Violin Grade 3",
        description:
          "This course is designed to equip students for the Trinity Violin Grade 3 exam. Our certified instructors will help students master scales, arpeggios, bowing techniques, and prepare pieces by composers such as Mozart, Handel, and JS Bach, ensuring they perform confidently in their exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/violin/trinity-violin-grade-3/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Violin Method Book 3",
        description:
          "The Gandharva Advanced Violin course is tailored to each student, focusing on developing advanced techniques and performance skills. Our experienced instructors will guide students through complex techniques, challenging repertoire such as concerto pieces, and solo performance skills to elevate their musical ability.",
        duration: "10-12 Months",
        certificate: "on course completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/violin/gandharva-violin-method-book-3/",
      },
    ],
  },
  "electronic-keyboardAll": {
    title: "Electronic Keyboard",
    pic: "top-img-5.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Basic elements of electronic keyboard (Keys & Notes)",
          "Posture and fingers",
          "Beats, rhythm & time signature",
          "Concepts like dynamics, slurs, tie notes and dotted rhythms",
          "Staff notations (Clef, Notes values, etc.)",
          "Learn songs in Middle ‘C’, ‘C’ and ‘G’ Position",
          "Chords & basic music theory",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Playing Harmonic and Melodic minor scales",
          "Intermediate Dynamics and Articulations",
          "Use of 7th, major 7th, minor 7th chords",
          "More techniques for hand independence",
          "Intermediate hand positioning",
          "Ear Training and Aural Training",
          "Arpeggios and their applications",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Advanced Scales",
          "Use of Add9, Add13 and Sus Chords",
          "Chords Family and Advanced Chord Progression",
          "Advanced Piano Positions",
          "Improvisation",
          " Advanced Arpeggios and Accompaniments",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Teen taal kayda",
          "Teen taal mukda and tukda and chakdhar",
          "Knowledge of Traditional composition",
          "Knowledge of accopniment",
          "Solo performing skills",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Electronic Keyboard Foundation",
        description:
          "If you’re looking for a fun and engaging way for your child to explore music, our Keyboard Foundation course is the perfect choice! This course will teach students how to identify notes on the piano, practice proper finger posture, and learn basic chords.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/electronic-keyboard-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Electronic Keyboard Method Book 1",
        description:
          "If your child has been learning the keyboard for over 6 months and has mastered the basics up to the foundation level, the Gandharva Keyboard Method Book 1 course is an excellent choice. In this course, students will learn major and minor scales, primary chords, and other essential skills to further their musical development.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/electronic-keyboard-method-book-1/",
      },
      {
        title: "Rockschool Electronic Keyboard Debut",
        description:
          "The Rockschool Keyboard Debut exam is ideal for your child if they have developed basic skills and techniques. This course prepares students for the Debut exam, with our teachers providing guidance throughout the entire process to ensure a smooth and successful exam experience.",
        duration: "6-8 Months",
        certificate: " Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-debut/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 1",
        description:
          "If you’ve completed the Rockschool Keyboard Debut exam, it’s time to focus on excelling in the RSL Grade 1 exam. Our teachers will guide you every step of the way, from the application process to submitting your evaluation video, ensuring you receive your globally recognized certificate.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-1/",
      },
      {
        title: "Trinity Electronic Keyboard Initial",
        description:
          "This course is designed to prepare you for the Trinity Keyboard Grade Initial exam, making it ideal for beginners who are just starting to learn the basics of keyboard playing. The Trinity exam is one of the most respected musical certifications, and our teachers will support you throughout your entire certification journey.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-initial/",
      },
      {
        title: "Trinity Electronic Keyboard Grade 1",
        description:
          "If your child has been learning keyboard for six months to a year, the Trinity Keyboard Grade 1 exam could be the perfect challenge for them! Our teachers will prepare students for the exam and handle the additional tasks of applying for the exam and uploading the exam video.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Electronic Keyboard Method Book 2",
        description:
          "Gandharva Method Book 2 is an ideal resource for young musicians with over 18 months of keyboard experience. This course introduces triads, arpeggios, rhythm techniques, and other intermediate-level skills to enhance their musical proficiency.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/electronic-keyboard-method-book-2/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 2",
        description:
          "If you’ve completed RSL Grade 1, it’s the perfect time to begin preparing for the Grade 2 exam. This course equips students with the necessary skills and confidence to excel in Grade 2 and deliver a polished performance for the examination.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-2/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 3",
        description:
          "Looking for a challenge after the Grade 2 exam? Master the keyboard techniques needed to excel in your RSL Grade 3 exam. Our teachers will assist with the application process and provide additional tests and technical exercises, ensuring your exam video makes an impression.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-3/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 4",
        description:
          "If your child has been playing the keyboard for 2-3 years, they are ready for the Rockschool Keyboard Grade 4 exam! This course focuses on helping students develop their own expression and style while equipping them with techniques to play various styles, ensuring they are well-prepared for the RSL Grade 4 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-4/",
      },
      {
        title: "Trinity  Electronic Keyboard Grade 2",
        description:
          "The Trinity Keyboard Grade 2 exam is perfect for your child if they’ve completed Trinity Keyboard Grade 1. In this course, our teachers help students build technical skills and prepare to perform three pieces, including classical works, to ensure readiness for the Trinity Keyboard Grade 2 exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-2/",
      },
      {
        title: "Trinity  Electronic Keyboard Grade 3",
        description:
          "Prepare for the Trinity Keyboard Grade 3 exam by learning performance pieces from composers such as Bach, Beethoven, and Holst. Our teachers will guide you in mastering the technical skills needed for the Grade 3 certification. You will also receive supporting tests to ensure you’re fully prepared and able to present yourself with confidence during the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-3/",
      },
      {
        title: "Trinity  Electronic Keyboard Grade 4",
        description:
          "This course is designed to help you prepare for the Trinity Grade 4 exam. Students will learn patch settings, layering techniques, and basic sound manipulation to improve their performances for the evaluation video. Our teachers will also assist you in preparing three performance pieces for the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-4/",
      },
    ],
    Advanced: [
      {
        title: "Rockschool Electronic Keyboard Grade 5",
        description:
          "In the Rockschool Grade 5 course, students learn music from iconic artists like David Bowie, Vanessa Carlton, and David Guetta. The RSL Piano Grade 5 helps students develop strong expression and a deep understanding of various styles. Our expert instructors will support you throughout the journey to ensure you’re fully prepared for certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-5/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 6",
        description:
          "The RSL Keyboard Grade 6 course helps your child enhance their improvisation and self-expression through music, while also preparing them for the Grade 6 certification. Students will master advanced chord progressions, arpeggios, and complex scales to excel in the Rockschool Electronic Keyboard Grade 6 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-6/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 7",
        description:
          "RSL Piano Grade 7 is designed for keyboard players with 4-5 years of experience. In this course, students focus on developing authentic stylistic awareness, individuality, and musical communication. Our teachers guide students in showcasing strong musical form and structure to excel in the Grade 7 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-7/",
      },
      {
        title: "Rockschool Electronic Keyboard Grade 8",
        description:
          "You are now at the final step before achieving the Professional level. At this stage, students have already developed fluency, coordination, and a strong sense of rhythm and style. This course focuses on mastering improvisation and showcasing flawless musical form and structure, preparing you for the RSL Grade 8 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/rockschool-electronic-keyboard-grade-8/",
      },
      {
        title: "Trinity Electronic Keyboard Grade 5",
        description:
          "This grade includes songs like All is Calm, A Walk at Strumble Head, and Blues for Beth. Students also explore music from iconic artists such as David Bowie, Vanessa Carlton, and David Guetta. Our instructors will guide you to perform these pieces flawlessly, ensuring you’re ready to record your evaluation video for Trinity Grade 5.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-5/",
      },
      {
        title: "Trinity Electronic Keyboard Grade 6",
        description:
          "The Trinity Grade 6 course enhances students’ understanding of form and structure while fostering clear musical expression. Students learn improvisation and refine their individuality and authenticity, crafting a distinctive musical style to excel in the Trinity Electronic Keyboard Grade 6 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-6/",
      },
      {
        title: "Trinity Electronic Keyboard Grade 7",
        description:
          "The Trinity Keyboard Grade 7 course emphasizes authentic stylistic awareness while nurturing individuality and clear communication. Our instructors support you throughout the journey, from the application process to providing supplementary tests and technical exercises, ensuring your evaluation video shines for the Trinity Grade 7 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-7/",
      },
      {
        title: "Trinity Electronic Keyboard Grade 8",
        description:
          "This is the pinnacle of the Trinity Grade courses. At this stage, you are expected to have mastered advanced techniques. This course focuses on building your confidence in improvisation and showcasing refined musical awareness, all under the expert guidance of our teachers, to help you achieve your Trinity Grade 8 certification.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/electronic-keyboard/trinity-electronic-keyboard-grade-8/",
      },
    ],
  },
  ukuleleAll: {
    title: "Ukulele",
    pic: "top-img-6.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Ukulele",
          "Fundamental Finger Techniques",
          "Major Scale Study and Melodies",
          "Music Theory",
          "Basic Chords and Strumming",
          "10+ Popular tunes and song",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Fundamental Ukulele techniques",
          "Ear Training 1",
          "Basic Music Theory and Sight Reading",
          "Understanding of Basic Rhythms",
          "Major, minor and pentatonic sxles",
          "Songs",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Soloing techniques and scale improvisation",
          "Use of 7th, major 7th, minor 7th chords",
          "Intermediate Study of Rhythms and Music Theory",
          "Exploring Blues, Rock, Country , funk genres",
          "Fingerstyle technique",
          "Analyzing Music and songs",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Study of harmony and harmonization",
          "Composing your own songs",
          "Advanced Ukulele techniques",
          "Playing over changes and improvisation",
          "Complex Rhythms and Time Signatures",
          "Stylistic Study of genres",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Ukulele Foundation",
        description:
          "Is your child eager to learn the ukulele? The Gandharva Ukulele Beginner Course is the perfect starting point to build a solid foundation. In this course, students are introduced to basic chords, strumming patterns, and finger techniques.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/ukulele/gandharva-ukulele-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Ukulele Method Book 1",
        description:
          "In this course, your child strengthens the solid foundation they’ve already built, exploring the ukulele on a deeper level while honing essential skills and techniques to stand out. Our instructors are more than just teachers—they’re dedicated mentors invested in your child’s musical growth.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/ukulele/gandharva-ukulele-method-book-1/",
      },
      {
        title: "Rockschool Ukulele Debut",
        description:
          "This is a fantastic opportunity to earn a renowned international certification in ukulele playing! Ideal for beginners starting their musical journey, this course focuses on building essential skills to prepare students for the RSL Ukulele Debut exam. We also take care of all exam arrangements, allowing students to concentrate fully on learning and improving.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/ukulele/rockschool-ukulele-debut/",
      },
      {
        title: "Rockschool Ukulele Grade 1",
        description:
          "This course is tailored for students who have successfully completed the RSL Ukulele Debut exam. It focuses on enhancing basic improvisation skills while fostering a well-rounded musical education. Through ear training, technical exercises, and sight-reading, students are equipped to excel in the RSL Grade 1 exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/ukulele/rockschool-ukulele-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Ukulele Method Book 2",
        description:
          "This course is ideal for individuals with over six months of ukulele experience. Students will develop impressive techniques, including arpeggios, intermediate chords, and fingerpicking. More than just skill-building, this course is designed to help students transform into true ukulele pros.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/ukulele/ukulele-method-book-2/",
      },
      {
        title: "Rockschool Ukulele Grade 2",
        description:
          "Rockstar Ukulele Grade 2 is designed for students who have successfully completed the RSL Ukulele Grade 1 exam and the Gandharva Ukulele Method Book 2 course. With a supportive teaching approach and a focused curriculum, students enhance their sight-reading skills to get ready for the RSL Ukulele Grade 2 exam. This level includes songs by popular artists such as David Bowie, Pharrell Williams, Coldplay, and others!",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-2/",
      },
      {
        title: "Rockschool Ukulele Grade 3",
        description:
          "This course helps students enhance their technique, rhythm, and overall musical understanding. They also build confidence in improvisation and start exploring different musical genres. Our goal is to ensure they are fully prepared and self-assured as they approach their exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-3/",
      },
      {
        title: "Rockschool Ukulele Grade 4",
        description:
          "This course is designed for students aiming to excel in the Rockschool Ukulele Grade 4 exam. It helps your child build upon their current abilities while developing key skills such as improvisation, sight-reading, and improving their ability to identify melodies by ear.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-4/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Ukulele Method Book 3",
        description:
          "This course is intended for students who have been playing the Ukulele for more than a year and are comfortable with the basics up to an intermediate level. It introduces more advanced rhythms, explores various techniques for keeping time and beat, and encourages students to experiment with composing their own melodies.",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/ukulele/ukulele-method-book-3/",
      },
      {
        title: "Rockschool Ukulele Grade 5",
        description:
          "This course is designed to prepare students for the RSL Ukulele Grade 5 exam and includes songs by artists such as Metallica, Bon Jovi, Eva Cassidy, and more. Our certified instructors provide guidance through technical exercises, supporting tests, and backing tracks to ensure students excel in the RSL Grade 5 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-5/",
      },
      {
        title: "Rockschool Ukulele Grade 6",
        description:
          "In this course, students develop their skills and explore the joy of improvisation. With the guidance of our supportive and experienced instructors, they learn to master six songs, featuring popular classics by The Beatles, Christina Perri, and selections from Pirates of the Caribbean. This training equips them to confidently excel in the RSL Ukulele Grade 6 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-6/",
      },
      {
        title: "Rockschool Ukulele Grade 7",
        description:
          "This course empowers students to improvise confidently and express their unique musical personality while showcasing solid form and structure. Our qualified instructors provide expert guidance through technical exercises, supporting tests, and in-depth coaching on the songs included in the RSL Ukulele Grade 7 syllabus, ensuring thorough preparation for the exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-7/",
      },
      {
        title: "Rockschool Ukulele Grade 8",
        description:
          "Designed for students who have perfected the core skills through Grade 7, this course focuses on refining technique, expressive nuances, rhythmic intricacy, fluency, coordination, and musical insight. Emphasis is placed on cultivating a deep sense of stylistic confidence to ensure success in the RSL Ukulele Grade 8 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/ukulele/rockschool-ukulele-grade-8/",
      },
    ],
  },
  fluteAll: {
    title: "Flute",
    pic: "top-img-4.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Basic elements of flute",
          "Basic Sargam",
          "Taal and Alankar",
          "Raga Knowledge",
          "Raga Durga and Raga Jhaptaal",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Basic elements of flute",
          "Basic of sargam",
          "Taal and Alankar",
          "Raag Knowledge",
          "Getting to know raag Durga and Jhaptal, Raag Yaman, Raag Kafi and many more",
          "Practice of these ragas",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Raag Bhimplasi",
          "Raag Bihag",
          "Raag Bhairav",
          "Raag Bageshwari",
          "Practise of these ragas",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Raag Patdeep",
          "Raag Tilang",
          "Raag Marva",
          "Raag Tilak Kamod",
          "Raag Malkosh",
          "Raag Multani",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Flute Foundation",
        description:
          "Welcome to Gandharva’s Flute Foundation Course, where we fully support our students’ musical goals! In this course, our approachable and dedicated teachers help students establish a solid foundation in flute playing, focusing on proper hand positioning, as well as a basic understanding of taal, sargam, and ragas.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/flute/gandharva-flute-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Flute Method Book 1",
        description:
          "This course is specially designed for beginners stepping into the world of flute playing, providing a strong foundation in essential skills, techniques, coordination, and a deep appreciation for music. Your child will master proper breath control, finger placement, and develop a comprehensive understanding of various ragas.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/flute/gandharva-flute-method-book-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Flute Method Book 2",
        description:
          "This course is specially designed for beginners stepping into the world of flute playing, providing a strong foundation in essential skills, techniques, coordination, and a deep appreciation for music. Your child will master proper breath control, finger placement, and develop a comprehensive understanding of various ragas.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/flute/gandharva-flute-method-book-2/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Flute Method Book 3",
        description:
          "Take the next step in your child’s musical journey with Gandharva’s Flute Method Book 2. This course serves as a gateway to becoming a professional flute player, equipping your child with advanced skills such as refined techniques, enhanced speed, and precision. They’ll learn to craft mesmerizing melodies that leave a lasting impression.",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/flute/gandharva-flute-method-book-3/",
      },
    ],
  },
  tablaAll: {
    title: "Tabla",
    pic: "instruments-3.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Tabla",
          "Posture and fingers",
          "Hand positioning",
          "Finger techniques",
          "Introduction to Sam, Taali, Khaali and Laya",
          "Knowledge of basic rhythm patterns",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Introduction to Tabla",
          "Hand Positioning",
          "Finger techniques",
          "Knowledge of daya baya notations",
          "Close and open notations",
          "Knowledge of basic rythm patterns",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Taal Dadar",
          "Taal Keherva",
          "Taal Teen Taal",
          "Taal Jhaptaal",
          "TEEN TAAL KAYDA FOR IMPROVING",
          "FINGERING SKILL",
          "Knowledge of lehera",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Teen taal kayda",
          "Teen taal mukda and tukda and chakdhar",
          "Knowledge of Traditional composition",
          "Knowledge of accompaniment",
          "Solo performing skills",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Tabla Foundation",
        description:
          "Searching for an enjoyable and interactive way for your child to dive into Indian classical music? Our Tabla Foundation course is the perfect choice! In this course, students learn essential finger techniques, basic rhythm patterns, and proper hand positioning.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/tabla/gandharva-tabla-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Tabla Method Book 1",
        description:
          "If your child has a strong grasp of the basics up to the foundation level, the Gandharva Tabla Method Book 1 course is an excellent next step. This course introduces students to contemporary and folk rhythms while enhancing their coordination and technical abilities.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/tabla/gandharva-tabla-method-book-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Tabla Method Book 2",
        description:
          "Gandharva Tabla Method Book 2 is perfect for students prepared to explore various taals in depth. This course introduces learners to the distinct gharanas of Tabla while emphasizing the development of technique, rhythm, coordination, and a deeper musical understanding.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },        
        href: "/courses/tabla/gandharva-tabla-method-book-2/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Tabla Method Book 3",
        description:
          "This course empowers Tabla players to confidently showcase their musical skills in front of an audience while deepening their passion for the instrument. Students master advanced compositions and learn to perform a solo Tabla arrangement as part of the program.",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/tabla/gandharva-tabla-method-book-3/",
      },
    ],
  },
  "hindustani-vocalsAll": {
    title: "Hindustani Vocals",
    pic: "vocal-1.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Simple Alankaars",
          "Posture and fingers",
          "Songs",
          "Bhajans",
          "Raga Based Bandish",
          "Rhythm And Taal",
          "Singing With Tanpura",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Sitting Posture Practice of Shuddha and vikrit swars",
          "Alankaar, Definition of some musical terms",
          "Basic details of Few Raagas and Taals with their composition",
          "Bhajans based on those Raagas",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Definition of few more musical terms",
          "Few more Alankars and to create own Alankars",
          "Details of New Raagas and their compositions with Vistaar and Taan",
          "Bhajans based on those Raagas",
          "New Taals and Laykaari",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Alankars in Different Thaat and Raags",
          "Detailed study of new Raagas with their improvisation",
          "Bhajans, Qawwali, Geet",
          "New Taals and Laykaari",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Hindustani Vocals Foundation",
        description:
          "This introductory Foundation course is designed for beginners learning to sing. Students will explore the seven musical notes in various styles and scales, practice melodies using notation, and perform raga or folk songs of their choice.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/hindustani-vocals/hindustani-classical-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Hindustani Classical Vocals Method Book 1",
        description:
          "This beginner-level course in classical singing introduces students to the fundamentals of Indian classical music. It covers both practical and theoretical aspects, focusing on the basics of swar, taal, and ragas.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/hindustani-vocals/hindustani-classical-vocals-method-book-1/",
      },
      {
        title: "ABGMVM Prarambhik - Level 1",
        description:
          "Prarambhik is the introductory grade examination offered by Akhil Bharatiya Gandharva Mahavidyalaya Mandal. In this course, students are introduced to basic voice training, vocal warm-up exercises, swar alankar practice, and an introduction to Raag Sangeet through Chota Khayal.",
        duration: "6-8 Months",
        certificate: "Gandharva + ABGMVM",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/hindustani-vocals/abgmvm-prarambhik-level-1/",
      },
      {
        title: "BSPM Prarambhik - Level 1",
        description:
          "Prarambhik is the foundational level of the Bhartiya Sangeet Prasaraj Mandal (BSPM) grade exams. This course equips students for the Level 1 examination, focusing on voice training, warm-up exercises, and an introduction to Raag Sangeet, including Chota Khayal.",
        duration: "6-8 Months",
        certificate: "Gandharva + BSPM",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/hindustani-vocals/bspm-prarambhik-level-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Hindustani Classical Vocals Method Book 2",
        description:
          "Hindustani Classical Method Book 2 offers an in-depth exploration of key ragas and taals, along with essential theory concepts. Students develop proficiency in performing ‘Drut Khayal’ across various ragas, incorporating alaap and taan improvisation.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/hindustani-vocals/hindustani-classical-vocals-method-book-2/",
      },
      {
        title: "ABGMVM Praveshika Pratham- Level 2",
        description:
          "Praveshika Pratham, the second-level examination at ABGMVM, focuses on developing students’ understanding of Taans, Aalap, Sargamgeet, and Lakshan Geet. Students also learn to distinguish and identify various ragas, preparing them to excel in the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + ABGMVM",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/hindustani-vocals/abgmvm-praveshika-pratham-level-2/",
      },
      {
        title: "BSPM Praveshika Pratham - Level 2",
        description:
          "Praveshika Pratham, the second-level examination at Bhartiya Sangeet Prasaraj Mandal (BSPM), guides students through the nuanced concepts of Taans, Aalap, and Lakshan Geet, with personalized instruction to help them succeed in the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + BSPM",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/hindustani-vocals/bspm-praveshika-pratham-level-2/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Hindustani Classical Vocals Method Book 3",
        description:
          "In this course, students master advanced Adavus while building on their previous knowledge. Designed to ensure a smooth transition to advanced levels, the program introduces Viniyoga Hastas and refines technique under the guidance of professionally certified instructors.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/hindustani-vocals/hindustani-classical-vocals-method-book-3/",
      },
      {
        title: "ABGMVM Praveshika Purna - Level 3",
        description:
          "This course follows the Grade 3 exam and prepares students for ISTD Grade 4. Students learn to sing, recite, and perform Jathiswaram and Shabdam while exploring advanced Viniyoga Hasta theory. Our certified instructors also incorporate yoga practices to help students perform with confidence.",
        duration: "10-12 Months",
        certificate: "Gandharva + ABGMVM",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/hindustani-vocals/abgmvm-praveshika-purna-level-3/",
      },
      {
        title: "BSPM Praveshika Purna - Level 3",
        description:
          "Praveshika Purna is the third-level examination offered by Bhartiya Sangeet Prasaraj Mandal (BSPM). In this program, students delve deeper into Hindustani Classical music, studying and preparing 5-7 ragas. The assessment includes both practical and theoretical components.",
        duration: "10-12 Months",
        certificate: "Gandharva + BSPM",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/hindustani-vocals/bspm-praveshika-purna-level-3/",
      },
    ],
  },
  "western-vocalsAll": {
    title: "Western Vocals",
    pic: "vocal-2564yt.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Understanding Voice as an Instrument",
          "Posture and fingers",
          "Singing with an effective posture",
          "Breath management: Diaphragmatic breathing Vs Chest breathing",
          "How to breathe in a song",
          "Where to breathe in a song",
          "Singing with a supported voice",
          "Importance of Physical warmup (body and face)",
          "Practising Vocal Warm Up-Lip trills and humming",
          "Learning spoken rhythms",
          "Solfa singing using sheet music",
          "Introduction to scales, tonic chord and Arpeggio",
          "Basic terms and definitions used in Western Music",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Understanding Notes, Major scales",
          "Rhythm and Melodies",
          "Diction, Pronunciation and enunciation",
          "Maintaining posture",
          "Interpreting basic musical terms and signs",
          "Ear training",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Breath Management",
          "Incorporating Dynamics",
          "Develop Listening skills",
          "Understanding simple time signature",
          "Understanding Pentatonic scale, and Major/ Minor chord formation",
          "Warm up techniques",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Advanced Scales",
          "Improvisation/ Voice Modulation",
          "Singing in different Vocal registers",
          "Harmonization",
          "Tone Placement",
          "Resonance",
          "Flow Phonation",
          "Understanding Chromatic scales and 7th and diminished chord formations",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Western Vocals Foundation",
        description:
          "Gandharva Western Vocals Foundation marks the beginning of your child’s musical journey, featuring engaging activities focused on breath control and proper singing posture. Our approachable, certified instructors guide students in building a solid vocal foundation through warm-ups, solfa exercises, rhythm training, and more.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/gandharva-western-vocals-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Western Vocals Method Book 1",
        description:
          "This second course in the method book series offers a step-by-step approach to mastering Western Contemporary Vocals. By the end of the program, students gain structured vocal training, perform melodies across various genres, understand tones and semitones, and more!",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/gandharva-western-vocals-method-book-1/",
      },
      {
        title: "Rockschool Western Vocals Debut",
        description:
          "Rockschool Vocals Debut is an excellent choice for those seeking internationally recognized certifications in singing. Our instructors guide students through technical exercises and spoken rhythms, equipping them to excel in the Debut certification exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/rockschool-western-vocals-debut/",
      },
      {
        title: "Rockschool Western Vocals Grade 1",
        description:
          "If your child has successfully completed the Vocals Debut exam, it’s time to gear up for the Rockschool Vocals Grade 1 certification. Designed for students who have mastered foundational vocal performance skills, this course focuses on preparing major scales, arpeggios, and other essential techniques needed to excel in the Grade 1 exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/rockschool-western-vocals-grade-1/",
      },
      {
        title: "Trinity Western Vocals Grade Initial",
        description:
          "Start your child’s journey with the Trinity Vocals Grade Initial certification, offered by one of the most renowned and long-standing music exam boards. This exam assesses basic skills, techniques, coordination, and musical knowledge. Our experienced instructors provide comprehensive preparation through technical exercises and supporting tests.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity Londonn",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/trinity-western-vocals-grade-initial/",
      },
      {
        title: "Trinity Western Vocals Grade 1",
        description:
          "The Trinity Vocals Grade 1 course helps students build essential skills and techniques such as counting, pick-ups, belt singing, and intervals. Throughout the course, students prepare a set of three songs and showcase their playback or improvisation abilities for the Trinity Vocals Grade 1 certification exam.",
        duration: "6-8 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/western-vocals/trinity-western-vocals-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Western Vocals Method Book 2",
        description:
          "With Gandharva Method Book 2, your child can learn to sing Blues, Rock, and Pop vocals from home. This course builds a strong foundation for musical growth, blending both theory and practical skills such as breath control, dynamics, pentatonic scales, and more.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/gandharva-western-vocals-method-book-2/",
      },
      {
        title: "Rockschool Western Vocals Grade 2",
        description:
          "At the intermediate stage of singing, students prepare for the Rockschool Vocals Grade 2 exam. This course is designed for those who have already mastered basic vocal performance skills. Our instructors guide you in preparing a variety of songs from artists like Harry Styles, Ed Sheeran, Childish Gambino, Ella Fitzgerald, and more, ensuring you’re ready to excel in the exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-2/",
      },
      {
        title: "Rockschool Western Vocals Grade 3",
        description:
          "RSL Vocals Grade 3 focuses on teaching students the elements of improvisation while concentrating on key technical skills like perfect intervals, bends, small leaps, and arpeggios for the Grade 3 certification exam. Students also learn songs by artists such as Taylor Swift, Bruno Mars, and others.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-3/",
      },
      {
        title: "Rockschool Western Vocals Grade 4",
        description:
          "In the RSL Vocals Grade 4 course, students develop skills in harmonizing and performing backing vocals. They work on improving transitions between vocal registers and advancing their understanding of music theory. These abilities are then showcased through a selection of performance pieces during the exam, featuring songs by artists like Billie Eilish, Rihanna, Adele, BTS, and others!",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-4/",
      },
      {
        title: "Trinity Western Vocals Grade 2",
        description:
          "The Trinity Vocals Grade 2 course emphasizes the foundations of professional vocal performance, helping students refine techniques such as phrasing, intervals, wide leaps, and stylistic expression. With guidance from experienced teachers, students prepare three songs for their exam, showcasing their skills in playback or improvisation.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-2/",
      },
      {
        title: "Trinity Western Vocals Grade 3",
        description:
          "The Trinity Western Vocals Grade 3 course builds on the foundations of the Grade 2 level, introducing improvisation and focusing on essential techniques. Students refine skills like perfect intervals, bends, small leaps, and arpeggios to enhance their vocal performance.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-3/",
      },
      {
        title: "Trinity Western Vocals Grade 4",
        description:
          "Trinity Vocals Grade 4 marks the final stage of the intermediate level before moving on to advanced courses. This engaging and approachable program focuses on harmonizing and delivering backing vocals while refining key techniques such as controlled breathing, diminuendos, embellished melodies, and dynamic expression. With these skills, students will confidently achieve their Grade 4 certificate and build a strong foundation for future success.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-4/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Western Vocals Method Book 3",
        description:
          "Gandharva Method Book 3 focuses on teaching students tone placement, harmonization, voice modulation, and singing across various vocal registers. With guidance from our expert professionals, students master advanced vocal techniques, paving the way to becoming outstanding contemporary vocalists.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/gandharva-western-vocals-method-book-3/",
      },
      {
        title: "Rockschool Western Vocals Grade 5",
        description:
          "The RSL Grade 5 course introduces advanced singing techniques such as melismas, slides, trills, and scoops. Students also refine their microphone skills and perfect performance pieces by artists like Adele, Sam Smith, Fleetwood Mac, and others featured in the RSL Grade 5 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-5/",
      },
      {
        title: "Rockschool Western Vocals Grade 6",
        description:
          "In the RSL Vocals Grade 6 advanced course, students enhance their vocal control by mastering wide major and minor intervals, exploring new scales, and navigating dynamics and register transitions. Our expert instructors also assist students in preparing selected performance pieces to excel in the RSL Grade 6 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-6/",
      },
      {
        title: "Rockschool Western Vocals Grade 7",
        description:
          "The RSL Vocals Grade 7 course focuses on mastering advanced stylistic techniques, sustained note bends, and large interval leaps. Students work with our expert instructors to perfect extended performance pieces by artists such as Hozier, Sarah Vaughan, Jeff Buckley, and others, as outlined in the Rockschool Grade 7 certification exam.",
        duration: "8-10 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-7/",
      },
      {
        title: "Rockschool Western Vocals Grade 8",
        description:
          "The RSL Vocals Grade 7 course focuses on mastering advanced stylistic techniques, sustained note bends, and large interval leaps. Students work with our expert instructors to perfect extended performance pieces by artists such as Hozier, Sarah Vaughan, Jeff Buckley, and others, as outlined in the Rockschool Grade 7 certification exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Rockschool London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/rockschool-western-vocals-grade-8/",
      },
      {
        title: "Trinity Western Vocals Grade 5",
        description:
          "Once your child has completed the Intermediate Trinity course, they’re ready to progress to an advanced level. The Trinity Western Vocals Grade 5 course focuses on advanced techniques like vocal agility, rap, syncopation, and ornamentation. Students also refine their microphone skills, coordination, and overall musical understanding.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-5/",
      },
      {
        title: "Trinity Western Vocals Grade 6",
        description:
          "In the Trinity Vocals Grade 6 course, students challenge their vocal cords and enhance control by working on wide major and minor intervals, new scales, and managing dynamics and register shifts. Our instructors guide students to excel in the Trinity Grade 6 exam by helping them master techniques such as blue notes, emotional expression, melisma, and ad-lib fills.",
        duration: "8-10 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-6/",
      },
      {
        title: "Trinity Western Vocals Grade 7",
        description:
          "In the Trinity Vocals Grade 7 course, students perfect advanced stylistic techniques, sustained note bends, and wide interval leaps. They also enhance skills such as rhythmic complexity, tonal variation, staccato phrasing, and head voice, before preparing a set of extended performance pieces.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-7/",
      },
      {
        title: "Trinity Western Vocals Grade 8",
        description:
          "Trinity Vocals Grade 8 is the final and most advanced exam level. In this course, students refine their abilities in techniques such as blues inflections, vocal falls, grace notes, vocal agility, and improvisation. Our instructors also assist students in preparing their performance pieces for the Grade 8 exam.",
        duration: "10-12 Months",
        certificate: "Gandharva + Trinity London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/western-vocals/trinity-western-vocals-grade-8/",
      },
    ],
  },
  "carnatic-vocalsAll": {
    title: "Carnatic Vocals",
    pic: "vocal-3789.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "A brief introduction to Carnatic music and Saint Purandara Dasa",
          "Introduction to Basic concepts of Shruthi, Swaras, Thalam, Kaalam, and Sthayis",
          "Sarali Varase",
          "Janti Varase",
          "Tharasthayi Varase",
          "Mandrasthayi Varase",
          "Dhattu Varase",
          "Carnatic Light + Classical Songs",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Brief Introduction to origins of Carnatic Music and Saint Purandaradasa",
          "Learning about Shruthi",
          "Thalam and other basic musical terms",
          "Learn to sing from Sarali Varase till Alankarams",
          "Bhajans and Divyanama Sankeertanas of Saint Thyagaraja",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Learn to sing Geethams, Lakshana Geetams, Jathiswarams",
          "Swarajathis, Varnas, Kritis and Divyanama Sankeerthanas",
          "Introduction to 14 popular Ragas and their Raga Lakshana",
          "Introduction to the life history of Carnatic Music Trinity Sri Muthuswamy Dikshitar, Sri Shyama Shastri and Saint Thyagaraja",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Theory",
          "Madhyamakala Krithis",
          "Vilambakala Kritis",
          "Devaranamas",
          "Annamacharya kritis",
          "Badrachala Ramadasa kritis",
          "Thillana",
          "Javali / Padam",
          "Adi thala varnas – Kalyani, Kambhoji, Hamsadhwani, Mohana",
          "Atta thala varna – Bhairavi",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Carnatic Vocals Foundation",
        description:
          "Designed specifically for beginners aged 8 and above, this course lays a strong foundation in Carnatic Vocals. It introduces students to essential concepts such as shruthi, swaras, swarasthanams, and more, providing a solid starting point for their musical journey.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/carnatic-vocals/gandharva-carnatic-vocals-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Carnatic Vocals Method Book 1",
        description:
          "In the Gandharva Carnatic Vocals Method Book 1 course, students begin their journey with swara pattern exercises that improve voice modulation. They also study Alankarams in seven talas, Geethams in diverse ragas, Nottuswarams, and additional foundational elements.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/carnatic-vocals/carnatic-vocals-method-book-1/",
      },
      {
        title: "BSPM Level 1 - Prarambhik",
        description:
          "This course offers a beginner-friendly introduction to Carnatic Vocal, supported by a well-structured curriculum and comprehensive study materials. Guided by expert instructors, students will learn to find their pitch, enhance breath control, develop vocal techniques, refine their singing style, and build confidence. They’ll also have the opportunity to showcase their skills through live performances!",
        duration: "6-8 Months",
        certificate: "Gandharva + BPSM",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/carnatic-vocals/bspm-level-1-prarambhik/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Carnatic Vocals Method Book 2",
        description:
          "This course takes students on a journey from mastering Varnams, a fundamental aspect of Carnatic music, to exploring Kritis, the pinnacle of musical expression. With the guidance of our supportive and dedicated teachers, students gain valuable skills and progress smoothly in their learning journey.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/carnatic-vocals/carnatic-vocals-method-book-2/",
      },
      {
        title: "BSPM Level 2 - Praveshika Pratham",
        description:
          "Upon completing the Level 1 Prarambhik course and Method Book 2, students are prepared to embark on their journey toward the BSPM Level 2 certification exam – Praveshika Pratham. In this course, they delve into Geetams, Swarajathis, and timeless compositions by musical legends such as Purandara Dasa and Tyagaraja.",
        duration: "8-10 Months",
        certificate: "Gandharva + BPSM",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/carnatic-vocals/bspm-level-2-praveshika-pratham/",
      },
    ],
    Advanced: [
      {
        title: "Carnatic Vocals Method Book 3",
        description:
          "Discover the ultimate guide to mastering Carnatic vocals with our advanced method book! In this course, students explore a range of varnams, ragas, and kritis. With the support of our dedicated and compassionate instructors, students gain expertise in advanced Carnatic vocal techniques.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/carnatic-vocals/carnatic-vocals-method-book-3/",
      },
      {
        title: "BSPM Level 3 - Praveshika Poorna",
        description:
          "Once students have completed the Praveshika Pratham exam, it’s the perfect time to begin preparing for the Level 3 exam – Praveshika Poorna. This course offers an in-depth exploration of diverse Varnas, selected Kritis by renowned composers, and various vocal patterns across different ragas and talas. Designed to help students excel in their exams, it also fosters a deeper appreciation of their rich cultural heritage.",
        duration: "10-12 Months",
        certificate: "Gandharva + BPSM",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/carnatic-vocals/bspm-level-3-praveshika-pratham/",
      },
    ],
  },
  "bollywood-vocalsAll": {
    title: "Bollywood Vocal",
    pic: "vocal-4.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Singing notes in different style (Aa, E, O, U, Aey)",
          "Identification of Keys of Harmonium or Keyboard/Piano",
          "3, 4 and 8 counts and practice to identify the Sam",
          "Introduction of 7 Shuddha Notes",
          "Simple Alankars (With Shuddha Swar)",
          "Melodies in Notation",
          "Final performance (Film Song of your choice",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Voice culture",
          "Concept of Taal",
          "Bollywood songs based on Raag Yaman",
          "Bollywood songs based on Raag Bhupali Swaramalika",
          "Ghazal",
          "Songs of your choice",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Introduction of Raag Khamaj",
          "Practice of some Alankars in Rupak Taal",
          "Songs based on Taal Dadra, Keherwa and Rupak",
          "Introduction of Raag Bhairavi",
          "Introduction of 1 Ghazal",
          "Study of 1 composition composed by Madan Mohan",
          "Study of 1 composition composed by Allarakha Rahman",
          "Student’s favourite singer’s song (Male/Female)",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Bollywood Vocals Foundation",
        description:
          "This course offers a simplified approach to Hindustani Classical music, designed to prepare students for Bollywood and Indian Bollywood vocals. Its primary goal is to identify each student’s unique interests while enhancing their tonal quality and command over vocal notes. Upon completion, this course will help children discover their potential and passion for Bollywood music.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bollywood-vocals/gandharva-bollywood-vocals-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Bollywood Classical Vocals Method Book 1",
        description:
          "Bollywood Vocals Method Book 1 is an introductory curriculum designed for beginners in Indian film, light, and folk music. It covers fundamental concepts of film and light music. Upon completing the course, students will develop essential skills for Bollywood singing, including performing in Taal, interpreting and singing song notations, and more.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bollywood-vocals/gandharva-bollywood-vocals-method-book-1/",
      },
    ],
    Intermediate: [
      {
        title: "Gandharva Bollywood Classical Vocals Method Book 2",
        description:
          "Gandharva Method Book 2 introduces students to popular Ragas and Taals commonly featured in Bollywood music. It also includes an in-depth study of two compositions by renowned composers from the Indian Film Industry. By the end of this course, learners gain the skills to perform a variety of songs in diverse Ragas and rhythmic patterns.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/bollywood-vocals/gandharva-bollywood-vocals-method-book-2/",
      },
    ],
  },
  "malayalam-musicAll": {
    title: "Malayalam Music",
    pic: "vocal-5ASDFGHJKL.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Light & Film Music",
          "Introduction to Shruti & Swaras",
          "Explore Beats, Rhythm & Taalam",
          "Vocal Warmup Exercises & Singing Techniques",
          "Light & Film Music Based Songs Eg. Songs by KS Chitra, KJ Yesudas, Nithya Mammen, Sujatha Mohan and many more",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Malayalam Music Foundation",
        description:
          "If you love singing Malayalam film songs, the Gandharva Malayalam Film Music course is ideal for you. With guidance from our certified and supportive instructors, you or your child can learn to sing your favorite Malayalam songs, whether for personal enjoyment or to perform confidently at family events and gatherings.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/malayalam-music/gandharva-malayalam-music-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
  "tamil-musicAll": {
    title: "Tamil Music",
    pic: "top-img-2.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Light & Film Music",
          "Introduction to Shruti & Swaras",
          "Explore Beats, Rhythm & Taalam",
          "Vocal Warmup Exercises & Singing Techniques",
          "Light & Film Music Based Songs Eg. Songs by S P Balasubrahmaniam,Sid Sriram, Rahul Sipligunj, Sunitha,Hema Chandra and more",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Tamil Music Foundation",
        description:
          "Unlock the joy of singing your favorite Tamil songs with the Gandharva Tamil Film Music Foundation course. Led by experienced and certified instructors, this program is designed to help students build a strong musical foundation, foster a deep love for music, and perform with confidence.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/tamil-music/gandharva-tamil-music-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
  "telugu-musicAll": {
    title: "Telugu Music",
    pic: "top-img-1.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Light & Film Music",
          "Introduction to Shruti & Swaras",
          "Explore Beats, Rhythm & Taalam",
          "Vocal Warmup Exercises & Singing Techniques",
          "Light & Film Music Based Songs Eg. Songs by S P Balasubrahmaniam,Sid Sriram, Rahul Sipligunj, Sunitha,Hema Chandra and more",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Telugu Music Foundation",
        description:
          "Master the art of singing your favorite Telugu songs with the Gandharva Telugu Film Music Foundation course. Guided by certified, professional instructors, this program helps students build a solid singing foundation, nurture a passion for music, and gain the confidence to perform with ease.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/telugu-music/gandharva-telugu-music-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
  "kannada-musicAll": {
    title: "Kannada Music",
    pic: "top-img-3.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Introduction to Light & Film Music",
          "Introduction to Shruti & Swaras",
          "Explore Beats, Rhythm & Taalam",
          "Vocal Warmup Exercises & Singing Techniques",
          "Light & Film Music Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Kannada Music Foundation",
        description:
          "The Gandharva Kannada Film Music course is the perfect starting point for anyone who enjoys singing Kannada songs, whether for fun or performance. With personalized 1-on-1 sessions, our expert and approachable instructors create a supportive atmosphere to help you build confidence, reach your goals, and enjoy a delightful musical journey.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/kannada-music/gandharva-kannada-music-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
  bharatanatyamAll: {
    title: "Bharatanatyam",
    pic: "11.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "Discovering basic footwork or Tatadavus",
          "Rhythm Response",
          "Language of Dance",
          "The Aspect of Performance",
          "Hard work and respect for Audience",
          "Hard work and respect for Audience",
          "Show Related Tips and Trick",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [
          "Discovering basic footwork or Tatadavus",
          "Rhythm Response",
          "Language of Dance",
          "The Aspect of Performance",
          "Introduction to stretching steps or Natadavus",
          "Embellishments using shoulder, neck and eyes",
          "Strengthening the spine",
          "Advanced Natadavus",
          "Introduction to Paraval Adavus or spreading steps",
          "Perform Mooshika Vahana shloka and a Swara based dance",
        ],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [
          "Pakka Adavu",
          "Paichal adavu",
          "Simir Adavu",
          "Sarukkal Adavu",
          "Viniyoga hastas – Tripataka to Alapadma, Mandala, Sthanaka, Chari Bhedas, Deva Hastas",
          "Ganesha Kauthuvam",
          "Paraval adavu, Kudittumettu Adavu, Egarmettu Adavu",
          "Tattumettu adavu in Panchanadai",
          "Drishti Bheda or eye movements and Pataka Hasta Viniyoga",
          "Advanced poses, three new dances",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [
          "Karthari adavu, Kathi adavu and Mandi adavus",
          "Teermanam adavus",
          "Viniyoga Hastas – Alapadma To Trishula",
          "Dashavataram Hastas",
          "Learning a Keerthanam, Kriti and Bhajan",
          "Learning the nuances of a margam",
        ],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Bharatanatyam Foundation",
        description:
          "If your child is beginning to show an interest in classical dance, the Gandharva Bharatanatyam Foundation course is the perfect starting point. In this course, students explore a range of rhythm patterns at varying tempos, learn the expressive language of dance through hand and finger movements, and practice basic choreography for performances.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bharatanatyam/gandharva-bharathanatyam-foundation/",
      },
    ],
    Beginner: [
      {
        title: "Gandharva Bharatanatyam Method Book 1",
        description:
          "This beginner-level course is designed for students with 6-8 months of dance experience or those who have completed the Foundation course. It focuses on refining the skills gained in the Foundation level while introducing more advanced rhythm techniques, footwork, and hand movements, along with their application in structured dance routines.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bharatanatyam/gandharva-bharathanatyam-method-book-1/",
      },
      {
        title: "ISTD Grade 1",
        description:
          "The Bharatanatyam Certification course, offered by the Imperial Society of Teachers of Dance, London, UK, introduces students to Carnatic music, foundational Yoga, and Abhinaya. Guided by our expert instructors, students explore basic rhythm patterns (Nadai) and delve into theoretical concepts from the Abhinaya Darpana by Abhinava Gupta.",
        duration: "6-8 Months",
        certificate: "– Gandharva + ISTD",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bharatanatyam/istd-grade-1/",
      },
    ],
    Intermediate: [
      {
        title: "Bharatanatyam Method Book 2",
        description:
          "If your child has been learning Bharatanatyam for more than a year, they are prepared to advance to the Intermediate Level. In this stage, they will develop skills in mastering form, studying rhythm, enhancing posture, refining poses, and improving aesthetics. Additionally, they will learn three new dance routines and explore advanced theoretical concepts, including the viniyoga hastas.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/bharatanatyam/gandharva-bharathanatyam-method-book-2/",
      },
      {
        title: "ISTD Grade 2",
        description:
          "This course is designed for students who have completed the Grade 1 exam and Method Book 2. At this level, students are expected to have advanced their adavu techniques. Our experienced instructors support their growth with engaging exercises, dance drills, Yoga, and Abhinaya practice, preparing them to excel in the ISTD Grade 2 certification.",
        duration: "8-10 Months",
        certificate: "– Gandharva + Rockschool, London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/bharatanatyam/istd-grade-2/",
      },
      {
        title: "ISTD Grade 3",
        description:
          "Following the Grade 2 certification, students move on to prepare for the ISTD Grade 3 level. At this stage, they learn the Allarippu and master nearly all adavus essential for intricate choreography. Our instructors also introduce technical compositions like Kauthuvam and cover theoretical topics from the Abhinaya Darpana and Mythology.",
        duration: "8-10 Months",
        certificate: "– Gandharva + Trinity, London",
        masterClass: "Included",
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        },
        href: "/courses/bharatanatyam/istd-grade-3/",
      },
    ],
    Advanced: [
      {
        title: "Gandharva Bharathanatyam Method Book 3",
        description:
          "In this course, students explore advanced adavus, building on their existing skills to progress smoothly to higher levels. Our certified instructors guide learners through Viniyoga Hastas, advanced techniques, and the refinement of previously acquired skills, ensuring a seamless transition to advanced proficiency.",
        duration: "8-10 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/bharatanatyam/gandharva-bharathanatyam-method-book-3/",
      },
      {
        title: "ISTD Grade 4",
        description:
          "This course is the progression after completing the Grade 3 exam. Students are trained to sing, recite, and perform Jathiswaram and Shabdam. Our certified instructors also introduce advanced Viniyoga Hasta theory and incorporate yoga practices to help students prepare confidently for the ISTD Grade 4 exam.",
        duration: "10-12 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/bharatanatyam/istd-grade-4/",
      },
      {
        title: "Gandharva Bharathanatyam Method Book 5",
        description:
          "This pre-professional course is tailored for students with 4-5 years of dance experience. Throughout the program, students will master a complete Bharatanatyam Margam, comprising 10 items: Pushpanjali, Alarippu, Jathiswaram, Shabdam, Kauthuvam, Varnam, Ashtapadi, Padam, Keerthanam, Thillana, and Mangalam.",
        duration: "10-12 Months",
        certificate: "– Gandharva + Trinity, London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/bharatanatyam/gandharva-bharathanatyam-method-book-5/",
      },
      {
        title: "ISTD Grade 5",
        description:
          "Designed for students who have completed ISTD Grade 4 and are preparing for the ISTD Grade 5 certification, this course focuses on Abhinaya training. Students learn to express emotions through Padam and Keerthanam, as well as interpret the repeated lines in a Sanchari with depth and feeling.",
        duration: "10-12 Months",
        certificate: "– Gandharva + ABRSM, London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/bharatanatyam/istd-grade-5/",
      },
      {
        title: "Gandharva Beginner Laya Course for dancers",
        description:
          "The Gandharva Professional Level Laya course is an advanced program aimed at individuals committed to enhancing their understanding of rhythm in dance. Tailored for students with a minimum of 4-5 years of dance experience, this course is ideal for those who have completed ISTD Grade 4, 5, or 6.",
        duration: "10-12 Months",
        certificate: "– Gandharva + ABRSM, London",
        masterClass: "Included",
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        },
        href: "/courses/bharatanatyam/gandharva-beginner-laya-course-for-dancers/",
      },
    ],
  },
  kathakAll: {
    title: "Kathak",
    pic: "12.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "A warm-up routine and a multi-era based Kathak",
          "Energy-based dancing and related dance routine",
          "Learn weight-shifting techniques and related dance routine",
          "Get insights on how to perform effectively and use these techniques to dance to any Bollywood song with confidence and grace",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Kathak Foundation",
        description:
          "Whether you want to boost your confidence, get ready for a performance, or explore the joy of dance, our Kathak course provides a thorough and engaging learning journey. Discover the richness of India’s cultural heritage and build essential Kathak skills while enjoying the Gandharva Kathak Foundation course.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/kathak/gandharva-kathak-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
  "bollywood-danceAll": {
    title: "Bollywood Dance",
    pic: "12.webp",
    tableData: {
      Foundation: {
        keyFeatures: [
          "A warm-up routine and a multi-era based Kathak",
          "Energy-based dancing and related dance routine",
          "Learn weight-shifting techniques and related dance routine",
          "Get insights on how to perform effectively and use these techniques to dance to any Bollywood song with confidence and grace",
        ],
        performOpportunity: ["Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Beginner: {
        keyFeatures: [],
        performOpportunity: ["Live Recital", "Solo YouTube Performances"],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Intermediate: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
        ],
        competeOpportunity: true,
        composeOpportunity: false,
        teachOpportunity: false,
      },
      Advanced: {
        keyFeatures: [],
        performOpportunity: [
          "Live Recital",
          "Solo YouTube Performances",
          "Spotify",
          "Live Digital Performances",
          "Opportunity to compete globally",
        ],
        competeOpportunity: true,
        composeOpportunity: true,
        teachOpportunity: false,
      },
    },
    Foundation: [
      {
        title: "Gandharva Bollywood Dance Foundation",
        description:
          "If dancing brings you joy, the Gandharva Bollywood Dance Foundation course is the ideal way to begin. With guidance from certified, experienced, and encouraging instructors, you’ll master choreographies to your favorite songs—whether you’re unwinding with a fun dance session after a busy day or preparing to perform confidently at a party or special event.",
        duration: "6-8 Months",
        certificate: "on Course Completion",
        masterClass: "Included",
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        },
 
        href: "/courses/bollywood-dance/gandharva-bollywood-dance-foundation/",
      },
    ],
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  },
};

// type LinkType = {
//   name: string;
//   url: string;
// };
// type PackageType = {
//   duration: string;
//   sessions: number;
//   price: number;
// };
// type CourseType = {
//   title: string;
//   pic: string;
//   type: "Foundation" | "Beginner" | "Intermediate" | "Advanced"; // Course levels
//   duration: string;
//   description: string;
//   descriptions: string[];
//   prerequisites: string[];
//   topics: string[];
//   outcomes: string[];
//   links: LinkType[];
//   packages: PackageType[];
// };
// type CourseDataType = Record<string, CourseType>;

const courseData = {
  "piano-foundation": {
    title: "Gandharva Piano Foundation",
    pic: "quotstudent.webp",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "If your child dreams of playing the piano, our Gandharva Piano Foundation course is the ideal starting point for their musical journey. Our mission goes beyond teaching—we aim to inspire a deep and lasting love for music.",
      "In this course, our patient and supportive teachers guide your child through the basics of piano playing. They’ll learn to read sheet music, master proper techniques, and build essential musical skills. It’s not just about practice; it’s about discovering the joy of music.",
      "We cover important topics such as rhythm, beats, dynamics, and time signatures. Your child will also explore chords and fundamental music theory. Our ultimate goal is to transform their curiosity into a lifelong passion for creating beautiful music.",
    ],

    prerequisites: ["Interest and willingness to learn the Piano.", "A Piano"],
    topics: [
      "Basic Elements of Piano (Keys & Notes)",
      "Posture and fingers",
      "Beats, rhythm & time signature",
      "Concepts like dynamics, slurs, tie notes and dotted rhythms",
      "Staff notations (Clef, Notes values, etc.)",
      "Learn songs in Middle 'C', 'C' and 'G' Position",
      "Chords & basic music theory",
    ],
    outcomes: [
      "Identify notes on the instrument",
      "Play the basic rhythms and pieces with steady pulse and flow",
      "Read sheet music and staff notations effectively",
      "Understand the basic touch controls in playing",
      "Play different rhythm techniques",
      "Tune 2 and 4 notes harmonies with the use of ties and dotted rhythms.",
    ],
    links: [
      {
        name: "Violin",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },   
        discountedPrice: {
          INR: 800,     
          USD: 16,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      },
    ],
  },
  "piano-method-book-1": {
    title: "Gandharva Piano Method Book 1",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Is your child on a musical journey with the piano, having played for the past six months? We’re excited to introduce them to the Gandharva Method Book 1 course, a musical adventure that goes beyond mere notes and keys.",
      "In this course, your child refines foundational skills while learning exciting new techniques, major and minor scales, and developing advanced skills such as syncopation, key signatures, and swing rhythm. They’ll also build a personal repertoire of songs to showcase their progress and passion for music.",
    ],

    prerequisites: [
      "Clarity of basic fundamentals and Foundation level concepts.",
    ],
    topics: [
      "Techniques and form",
      "Major Scales",
      "Primary chords and Inversions",
      "Basics of voice learning",
      "Key Signature and Syncopation",
      "Key of 'C' 'G' and 'F' Major",
      "Minor Keys, Transposition and Swing Rhythm",
      "Repertoire building",
    ],
    outcomes: [
      "The right techniques",
      "How to play different major and minor keys",
      "Playing chords, voicing those chords, chord progressions and inversions",
      "Concepts like syncopation, key signature and swing rhythm",
      "The use of 16th note and building up the repertoire using previously learned concepts",
      "About the left-hand broken chord accompaniment techniques",
    ],
    links: [
      {
        name: "Violin",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-piano-debut": {
    title: "Rockschool Piano Debut",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The Rockschool Piano Debut exam is an exciting milestone on your child’s musical journey. It’s perfect for beginners who are building foundational skills, techniques, coordination, and musical expression. Our goal is to nurture their talent and ignite a lifelong passion for playing the piano.",
      "In this course, we introduce basic improvisation, encouraging your child’s creativity to shine and helping them discover their unique musical voice. It’s not just about playing; it’s about expressing themselves through music.",
      "For the examination, your child can select three performance pieces from renowned artists like Emeli Sandé, Elton John, and Justin Bieber, adding a personal and inspiring touch to their piano journey. Our certified teachers will guide them every step of the way, ensuring they master each piece and feel confident to excel in their Rockschool Piano Debut.",
    ],

    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violin",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-piano-initial": {
    title: "Trinity Piano Initial",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Are you looking for an enjoyable and rewarding way to nurture your child’s musical potential? The highly acclaimed Trinity Piano Grade Initial exam is the perfect choice! Trinity is one of the oldest and most prestigious music exam boards, offering internationally recognised certifications that set the foundation for a lifelong musical journey.",
      "This course is ideal for beginners who are just starting their piano adventure. Our experienced instructors guide students in developing essential skills, techniques, coordination, and a strong understanding of music.",
      "For the exam, our certified teachers ensure your child masters three performance pieces while also excelling in supporting tests and technical exercises. With our comprehensive guidance, your child will be well-prepared to shine in their Trinity Piano Grade Initial exam.",
    ],
    prerequisites: [
      "Clarity of basic fundamentals and Foundation level concepts.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 10 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-piano-grade-1": {
    title: "Rockschool Piano Grade 1",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Help your child achieve their musical dreams! The Rockschool Piano Grade 1 exam is designed for students with 6-12 months of piano experience who aspire to take their skills to the next level and become confident pianists.",
      "This course focuses on enhancing key techniques, refining rhythm, and developing musical awareness. It’s the perfect opportunity for students to deepen their understanding of piano playing and build on the skills they’ve already acquired.",
      "Our supportive and certified teachers guide your child through the process, offering tailored instruction and helping them master three performance pieces from popular artists like Ariana Grande, The Beatles, and Sam Smith. With our expert guidance, your child will be ready to shine in their Rockschool Piano Grade 1 exam.",
    ],
    prerequisites: [
      "Clarity of basic fundamentals and Foundation level concepts.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-piano-grade-1": {
    title: "Trinity Piano Grade 1",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "This opportunity is perfect for students who have been playing the piano for 6-12 months and have built a solid foundation in technique, rhythm, coordination, and musical understanding.",
      "For the exam, your child can select three performance pieces from renowned works such as Hand in Hand, Jodler, and Minuet. Our certified instructors work closely with students, helping them master their chosen pieces and develop confidence in their playing.",
      "With our guidance, the exam becomes more than just a test—it’s a stage for your child to shine and showcase their growing talent and passion for music.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 11 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "abrsm-piano-initial": {
    title: "ABRSM Piano Initial",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Our thoughtfully designed ABRSM Piano Initial course is crafted with a deep commitment to nurturing our students’ growth and artistic expression. This course emphasizes not only technical mastery but also the skills of interpretation, communication, and heartfelt musical delivery.",
      "Ideal for students with 6-8 months of dedicated piano training, this course introduces them to the beauty of Western Classical music and its timeless compositions.",
      "For the exam, our certified teachers provide expert guidance, helping students perfect their performance pieces while supporting them through every step of the process. From application to video submission and certificate reception, our friendly professionals ensure a seamless experience, allowing your child to focus on what truly matters—learning and enjoying music.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "abrsm-piano-grade": {
    title: "ABRSM Piano Grade 1",
    pic: "piano-keys-beautiful-colored-background-close-up-scaled.webp",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The ABRSM Piano Grade 1 course is perfect for students who have been playing the piano for 6-12 months and have built a strong foundation in technique, rhythm, coordination, and musical understanding.",
      "For the exam, your child can select three performance pieces from iconic composers such as Mozart, Bach, Diabelli, Purcell, and more. Our certified instructors work closely with students to help them master these pieces, ensuring they feel confident and prepared.",
      "This course transforms the exam into more than just a test—it becomes a platform for your child to shine, showcasing their growing skills and passion for music.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "piano-method-book-2": {
    title: "Gandharva Piano Method Book 2",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Ignite your child’s inner pianist with our Gandharva Method Book 2 course! It’s ideal for kids who have been playing the piano for more than 18 months.",
      "In this course, your child will learn to play the D major, A major, and B minor keys, dive deeper into scales, explore the blues with triads, enhance their rhythm skills, and gain a solid understanding of key signatures.",
      "Our expert teachers guide them in mastering a diverse collection of songs, nurturing their passion for the piano while helping them impress others with their growing musical abilities.",
    ],
    prerequisites: [
      "Beginner level knowledge of playing skills and techniques",
    ],
    topics: [
      "Intermediate level Major and Minor Scales",
      "Key of 'D' 'A' & 'Bb'",
      "Repertoire playing in different keys",
      "Triads in 12 bar blues",
      "Scales - Chromatic and pentatonic scales",
      "More on Rhythm techniques",
      "Introduction to arpeggios and their applications",
    ],
    outcomes: [
      "Major and minor scales with both hands",
      "Songs in different keys with a reasonable command of the techniques",
      "Sixteenth-note rhythm and subdivisions",
      "Songs with triad chords in various keys",
      "Arpeggios and different songs with basic arpeggio patterns",
    ],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "piano-method-book-3": {
    title: "Gandharva Piano Method Book 3",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Ignite your child’s inner pianist with our Gandharva Method Book 2 course! It’s ideal for kids who have been playing the piano for more than 18 months.",
      "In this course, your child will learn to play the D major, A major, and B minor keys, dive deeper into scales, explore the blues with triads, enhance their rhythm skills, and gain a solid understanding of key signatures.",
      "Our expert teachers guide them in mastering a diverse collection of songs, nurturing their passion for the piano while helping them impress others with their growing musical abilities.",
    ],
    prerequisites: [
      "Beginner level knowledge of playing skills and techniques",
    ],
    topics: [
      "Intermediate level Major and Minor Scales",
      "Key of 'D' 'A' & 'Bb'",
      "Repertoire playing in different keys",
      "Triads in 12 bar blues",
      "Scales - Chromatic and pentatonic scales",
      "More on Rhythm techniques",
      "Introduction to arpeggios and their applications",
    ],
    outcomes: [
      "Major and minor scales with both hands",
      "Songs in different keys with a reasonable command of the techniques",
      "Sixteenth-note rhythm and subdivisions",
      "Songs with triad chords in various keys",
      "Arpeggios and different songs with basic arpeggio patterns",
    ],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-piano-grade-2": {
    title: "Rockschool Piano Grade 2",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Thinking of taking your child’s piano skills to the next level? The Rockschool Piano Grade 2 exam is the perfect choice! To enroll in this course, your child should have been learning for 12-18 months, with a solid understanding of technique, rhythm, coordination, and musical awareness.",
      "In this course, our certified professionals provide expert guidance to help students prepare for the Grade 2 exam. They will work on supporting tests and technical exercises while mastering three performance pieces from popular artists such as Ed Sheeran, Dionne Warwick, and Katy Perry. With our help, your child will be ready to ace the exam with confidence and showcase their progress.",
    ],
    prerequisites: [
      "Clarity of basic fundamentals and Foundation level concepts.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-piano-grade-2": {
    title: "Trinity Piano Grade 2",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Once you know your child has the foundational skills, it’s time to focus on refining their techniques and musical finesse. Our professional teachers are here to guide your child through each step of their musical journey.",
      "In this course, our friendly instructors help students learn the essential techniques needed to excel in their Trinity Piano Grade 2 certification exam. This exam is designed for students who have been practicing the piano for 12-18 months. After mastering the skills from Grade 1, students will continue developing their technique, rhythm, coordination, musical understanding, and improvisation abilities, preparing them for the next level of their piano journey.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 11 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-piano-grade-3": {
    title: "Rockschool Piano Grade 3",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "If your child is ready to take the next step in their musical journey, the Rockschool Piano Grade 3 exam is the perfect opportunity. This course is designed for students who have been playing the piano for 18-24 months and are ready to complete the final stage of their beginner training.",
      "In this course, students will build confidence in their playing and start developing stylistic awareness. Our friendly and certified teachers guide them through mastering three performance pieces from renowned artists such as Adele, Coldplay, and Norah Jones, as prescribed by the RSL grade. With our expert guidance, your child will be well-prepared to shine in their exam and demonstrate their progress.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 18 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-piano-grade-3": {
    title: "Trinity Piano Grade 3",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "It’s time for your child to take the next step in their musical journey! The Trinity Piano Grade 3 exam is designed for students who have been learning the piano for 18-24 months and are ready for a new challenge.",
      "This course helps students enhance their improvisation, phrasing, and understanding of various musical styles. Our certified experts guide them in mastering three performance pieces from well-known works such as Model T, Rain, and Sonata in G, giving them the opportunity to showcase their growing skills and musical expression. With our support, your child will be ready to shine in their Trinity Piano Grade 3 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 12 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violin",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-piano-grade-4": {
    title: "Rockschool Piano Grade 4",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "If your child has completed RSL Piano Grade 3, it’s time to prepare for the Grade 4 exam. This course is perfect for students with 2-3 years of experience who are ready to transition to intermediate-level playing.",
      "In this course, students will develop their sense of expression and stylistic awareness, building confidence in their musical articulation. For the exam, your child can choose three performance pieces from iconic artists such as Elton John, Aretha Franklin, and John Legend.",
      "Our professional and certified teachers will guide them in mastering their selected pieces, ensuring they are fully prepared to excel in the Grade 4 exam and showcase their musical growth.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-piano-grade-5": {
    title: "Rockschool Piano Grade 5",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has completed RSL Piano Grade 3, it’s time to prepare for the Grade 4 exam. This course is perfect for students with 2-3 years of experience who are ready to transition to intermediate-level playing.",
      "In this course, students will develop their sense of expression and stylistic awareness, building confidence in their musical articulation. For the exam, your child can choose three performance pieces from iconic artists such as Elton John, Aretha Franklin, and John Legend.",
      "Our professional and certified teachers will guide them in mastering their selected pieces, ensuring they are fully prepared to excel in the Grade 4 exam and showcase their musical growth.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-piano-grade-6": {
    title: "Rockschool Piano Grade 6",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has completed RSL Piano Grade 3, it’s time to prepare for the Grade 4 exam. This course is perfect for students with 2-3 years of experience who are ready to transition to intermediate-level playing.",
      "In this course, students will develop their sense of expression and stylistic awareness, building confidence in their musical articulation. For the exam, your child can choose three performance pieces from iconic artists such as Elton John, Aretha Franklin, and John Legend.",
      "Our professional and certified teachers will guide them in mastering their selected pieces, ensuring they are fully prepared to excel in the Grade 4 exam and showcase their musical growth.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-piano-grade-7": {
    title: "Rockschool Piano Grade 7",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has completed RSL Piano Grade 3, it’s time to prepare for the Grade 4 exam. This course is perfect for students with 2-3 years of experience who are ready to transition to intermediate-level playing.",
      "In this course, students will develop their sense of expression and stylistic awareness, building confidence in their musical articulation. For the exam, your child can choose three performance pieces from iconic artists such as Elton John, Aretha Franklin, and John Legend.",
      "Our professional and certified teachers will guide them in mastering their selected pieces, ensuring they are fully prepared to excel in the Grade 4 exam and showcase their musical growth.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-piano-grade-8": {
    title: "Rockschool Piano Grade 8",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has completed RSL Piano Grade 3, it’s time to prepare for the Grade 4 exam. This course is perfect for students with 2-3 years of experience who are ready to transition to intermediate-level playing.",
      "In this course, students will develop their sense of expression and stylistic awareness, building confidence in their musical articulation. For the exam, your child can choose three performance pieces from iconic artists such as Elton John, Aretha Franklin, and John Legend.",
      "Our professional and certified teachers will guide them in mastering their selected pieces, ensuring they are fully prepared to excel in the Grade 4 exam and showcase their musical growth.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-piano-grade-4": {
    title: "Trinity Piano Grade 4",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Once your child has honed their piano skills, it’s time to focus on building confidence and clarity. For those who have been learning for 2 to 3 years and are ready to advance to intermediate-level playing, the Trinity Piano Grade 4 exam is an excellent next step.",
      "In this course, students will develop a deeper sense of expression, continue to expand their stylistic awareness, and enhance their improvisation skills, all while building confidence and articulation in their playing.",
      "Students will master three performance pieces from renowned artists such as Elton John, Aretha Franklin, and John Legend. Our expert teachers guide them through each piece to ensure they are fully prepared to showcase their skills and excel in the Trinity Piano Grade 4 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-piano-grade-5": {
    title: "Trinity Piano Grade 5",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Once your child has honed their piano skills, it’s time to focus on building confidence and clarity. For those who have been learning for 2 to 3 years and are ready to advance to intermediate-level playing, the Trinity Piano Grade 4 exam is an excellent next step.",
      "In this course, students will develop a deeper sense of expression, continue to expand their stylistic awareness, and enhance their improvisation skills, all while building confidence and articulation in their playing.",
      "Students will master three performance pieces from renowned artists such as Elton John, Aretha Franklin, and John Legend. Our expert teachers guide them through each piece to ensure they are fully prepared to showcase their skills and excel in the Trinity Piano Grade 4 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-piano-grade-6": {
    title: "Trinity Piano Grade 6",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Once your child has honed their piano skills, it’s time to focus on building confidence and clarity. For those who have been learning for 2 to 3 years and are ready to advance to intermediate-level playing, the Trinity Piano Grade 4 exam is an excellent next step.",
      "In this course, students will develop a deeper sense of expression, continue to expand their stylistic awareness, and enhance their improvisation skills, all while building confidence and articulation in their playing.",
      "Students will master three performance pieces from renowned artists such as Elton John, Aretha Franklin, and John Legend. Our expert teachers guide them through each piece to ensure they are fully prepared to showcase their skills and excel in the Trinity Piano Grade 4 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-piano-grade-7": {
    title: "Trinity Piano Grade 7",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Once your child has honed their piano skills, it’s time to focus on building confidence and clarity. For those who have been learning for 2 to 3 years and are ready to advance to intermediate-level playing, the Trinity Piano Grade 4 exam is an excellent next step.",
      "In this course, students will develop a deeper sense of expression, continue to expand their stylistic awareness, and enhance their improvisation skills, all while building confidence and articulation in their playing.",
      "Students will master three performance pieces from renowned artists such as Elton John, Aretha Franklin, and John Legend. Our expert teachers guide them through each piece to ensure they are fully prepared to showcase their skills and excel in the Trinity Piano Grade 4 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-piano-grade-8": {
    title: "Trinity Piano Grade 8",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Once your child has honed their piano skills, it’s time to focus on building confidence and clarity. For those who have been learning for 2 to 3 years and are ready to advance to intermediate-level playing, the Trinity Piano Grade 4 exam is an excellent next step.",
      "In this course, students will develop a deeper sense of expression, continue to expand their stylistic awareness, and enhance their improvisation skills, all while building confidence and articulation in their playing.",
      "Students will master three performance pieces from renowned artists such as Elton John, Aretha Franklin, and John Legend. Our expert teachers guide them through each piece to ensure they are fully prepared to showcase their skills and excel in the Trinity Piano Grade 4 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "abrsm-piano-grade-2": {
    title: "ABRSM Piano Grade 2",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The ABRSM Piano Grade 2 exam is designed for students who have been practicing the piano for 12-18 months. After mastering the foundational skills up to Grade 1, our certified professionals help students further develop their technique, rhythm, coordination, musical understanding, and improvisation abilities.",
      "In this course, students will learn the essential techniques needed to excel in their ABRSM Grade 2 certification exam. The course spans 8-10 months of preparation, during which our expert teachers guide students in mastering compositions by celebrated composers like Beethoven, Mozart, and others. By the end of the course, students will be well-equipped to perform with confidence and achieve success in their Grade 2 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "abrsm-piano-grade-3": {
    title: "ABRSM Piano Grade 3",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "This course is designed for students who have been playing the piano for 18-24 months and are ready to complete the final stage of their beginner journey. Here, they will learn to play with greater confidence while developing their understanding of stylistic awareness.",
      "Our certified teachers introduce students to various compositions and guide them in analyzing musical structures. In addition to performance preparation, students will receive focused instruction on Intermediate Music Theory to help them ace the exam.",
      "Students will study compositions by renowned composers such as Schumann, Clementi, Anon, and more, ensuring they are fully prepared to shine in their ABRSM Grade 3 exam. With our expert guidance, they’ll be ready to demonstrate their skills and musical understanding.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "abrsm-piano-grade-4": {
    title: "ABRSM Piano Grade 4",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "This course is designed for students who have been playing the piano for 18-24 months and are ready to complete the final stage of their beginner journey. Here, they will learn to play with greater confidence while developing their understanding of stylistic awareness.",
      "Our certified teachers introduce students to various compositions and guide them in analyzing musical structures. In addition to performance preparation, students will receive focused instruction on Intermediate Music Theory to help them ace the exam.",
      "Students will study compositions by renowned composers such as Schumann, Clementi, Anon, and more, ensuring they are fully prepared to shine in their ABRSM Grade 3 exam. With our expert guidance, they’ll be ready to demonstrate their skills and musical understanding.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "abrsm-piano-grade-5": {
    title: "ABRSM Piano Grade 5",
    pic: "musical-background-with-piano-keys-space-text.webp",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "This course is designed for students who have been playing the piano for 18-24 months and are ready to complete the final stage of their beginner journey. Here, they will learn to play with greater confidence while developing their understanding of stylistic awareness.",
      "Our certified teachers introduce students to various compositions and guide them in analyzing musical structures. In addition to performance preparation, students will receive focused instruction on Intermediate Music Theory to help them ace the exam.",
      "Students will study compositions by renowned composers such as Schumann, Clementi, Anon, and more, ensuring they are fully prepared to shine in their ABRSM Grade 3 exam. With our expert guidance, they’ll be ready to demonstrate their skills and musical understanding.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "acoustic-guitar-foundation": {
    title: "Acoustic Guitar Foundation",
    pic: "student-playing-soft-melody-quiet-moment_1324785-117453.webp",
    type: "Foundation",
    duration: "6-8",
    description:
      "Searching for an exciting and interactive way to introduce your child to the world of music? Our Keyboard Foundation course is just what you need! Designed for beginners aged 8 and up, this program lays the groundwork for musical success. With guidance from our experienced and approachable instructors, your child will develop the essential skills needed to grow into a confident and talented musician. Enroll now and let your child’s musical journey soar!",
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Keyboard, so that they can practice and hone their skills",
    ],
    topics: [
      "Anatomy of Guitar",
      "Fundamental finger techniques",
      "Three string chords",
      "C and G major scale",
      "30+ jingles and melodies",
      "Rhythm reading and basic strumming patterns",
    ],
    outcomes: [
      "Identify notes on the instrument",
      "Play basic rhythms and pieces with steady pulse and flow",
      "Learn staff notations and how to read sheet music effectively",
      "Master basic touch controls",
      "Use different rhythm techniques",
      "Harmonize two-note and four-note harmonies with the use of ties and dotted rhythms",
    ],
    links: [
      {
        name: "Violine",
        url: "/courses/violin/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Bollywood Vocals",
        url: "/courses/bollywood-vocals/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "acoustic-guitar-method-book-1": {
    title: "Gandharva Acoustic Guitar Method Book 1",
    pic: "man-playing-guitar-against-wall_1048944-19414024.webp",
    type: "Beginner",
    duration: "6-8",
    description:
      "This course is ideal for students with at least six months of guitar-playing experience or those who have completed the foundational guitar course. It takes their skills to the next level by focusing on advanced rhythm techniques, chords, scales, and their application in popular and contemporary music. The Acoustic Guitar Method Book 1 course also introduces the concept of riffs, enabling students to play a variety of songs combining riffs and chords seamlessly.",
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Should have completed the Foundation Course or have at least 6 months of playing experience or Grade Debut.",
    ],
    topics: [
      "Major, minor and pentatonic scale",
      "Strumming patterns and rhythm reading",
      "Left and right-hand playing techniques",
      "Concept of riffs and its application",
      "20+ melodies and songs",
    ],
    outcomes: [
      "Play Major, Minor, and Pentatonic Scales with ease",
      "Interpret different rhythm patterns and play them effortlessly",
      "Demonstrate 10+ songs with riffs and chords strumming",
      "Be prepared to clear grade exams up to Grade 2 and showcase their skills with more confidence.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-acoustic-guitar-debut": {
    title: "Rockschool Acoustic Guitar Debut",
    pic: "man-playing-guitar-against-wall_1048944-19414024.webp",
    type: "Beginner",
    duration: "6-8",
    description:
      "If your child has been playing the acoustic guitar for some time, Rockschool’s renowned Acoustic Guitar Debut course is an excellent way to challenge and showcase their abilities! This course is tailored to assess their fundamental skills, techniques, coordination, and musical knowledge. Our certified and experienced instructors provide comprehensive support throughout the entire process—from exam registration and preparation to video submission and certification. We handle all the details, allowing your child to focus on learning and enhancing their skills.",
    exams: ["Grade Exam", "Performance Certificate"],
    performancePieces: [
      "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    ],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 14 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-acoustic-guitar-initial": {
    title: "Trinity Acoustic Guitar Initial",
    pic: "man-playing-guitar-against-wall_1048944-19414024.webp",
    type: "Beginner",
    duration: "6-8",
    description:
      "Looking for an engaging and inspiring way to support your child’s musical journey? The highly regarded Trinity Acoustic Guitar Grade Initial exam might be just what you need! Trinity, one of the world’s oldest and most prestigious music examination boards, offers internationally recognized certifications. This course is ideal for beginners who have already built a foundation in basic guitar skills, techniques, coordination, and musical knowledge. Students will prepare three performance pieces by renowned artists like Bill Withers, John Newton, and Bob Marley, allowing them to showcase their talent and excel in the exam.",
    exams: ["Grade Exam", "Performance Certificate"],
    performancePieces: [
      "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    ],
    examDuration: ["Grade Exam - 10 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-acoustic-guitar-grade-1": {
    title: "Rockschool Acoustic Guitar Grade 1",
    pic: "man-playing-guitar-against-wall_1048944-19414024.webp",
    type: "Beginner",
    duration: "6-8",
    description:
      "The Rockschool Acoustic Guitar Grade 1 exam is ideal for students with 6 months to 1 year of experience who have developed a solid foundation in debut-level skills, techniques, rhythms, coordination, and musical understanding. Guided by our professionally certified instructors, students will prepare three performance pieces by iconic artists such as Bob Marley, Ed Sheeran, and Jeff Buckley. This exam also provides an excellent opportunity for students to showcase their improvisation skills.",
    exams: ["Grade Exam", "Performance Certificate"],
    performancePieces: [
      "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    ],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-acoustic-guitar-grade-1": {
    title: "Trinity Acoustic Guitar Grade 1",
    pic: "man-playing-guitar-against-wall_1048944-19414024.webp",
    type: "Beginner",
    duration: "6-8",
    description:
      "If your child has successfully completed the Initial Grade, they’re ready to begin preparing for the Trinity Acoustic Guitar Grade 1 exam. This course focuses on building the technical skills needed to excel in the exam, with expert guidance from our professional instructors to ensure your child feels confident and prepared. For their performance, students can select three pieces from renowned artists such as Tim Pells, Nick Powlesland, Ed Sheeran (with John McDaid, Tom Leonard, and Martin Harrington), Anders Rye, and more.",
    exams: ["Grade Exam", "Performance Certificate"],
    performancePieces: [
      "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    ],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "acoustic-guitar-method-book-2": {
    title: "Gandharva Acoustic Guitar Method Book 2",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "Is your child eager to elevate their guitar playing? Gandharva’s Acoustic Guitar Method Book 2 is an ideal choice for advancing beginner guitarists! This course emphasizes improving solo techniques, mastering intermediate rhythm patterns, and deepening knowledge of music theory. It offers students a comprehensive musical foundation while exploring various genres.",
    prerequisites: [
      "Completion of Method Book 1/Grade 1 or at least 1 year of guitar playing",
      "Interest and willingness to understand the depths of Music",
    ],
    topics: [
      "Major, minor and pentatonic scale",
      "Strumming patterns and rhythm reading",
      "Left and right-hand playing techniques",
      "Concept of riffs and its application",
      "20+ melodies and songs",
    ],
    outcomes: [
      "Introduction to Fretboard Mapping",
      "Arpeggios and Application in Songs",
      "Triplets and 16th note rhythm study",
      "Introduction to blues",
      "12 bar blues",
      "Music Theory",
      "20+ songs to demonstrate learned techniques",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-2": {
    title: "Rockschool Acoustic Guitar Grade 2",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "Does your child dream of becoming a professional guitarist? Acoustic Guitar Grade 2 is designed to equip them with essential techniques to make that dream a reality. This course offers an engaging learning experience, supported by our dedicated team every step of the way. Students will perfect three iconic songs by renowned artists like Taylor Swift, Passenger, and Otis Redding as they prepare for their RSL Grade 2 exam with the guidance of our approachable and supportive instructors.",
    exams: ["Grade Exam", "Performance Certificate"],
    // performancePieces: [
    //   "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    // ],
    examDuration: [
      "Grade Exam - 20 minutes (approx.)",
      "Performance Certificate - 17 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-acoustic-guitar-grade-2": {
    title: "Trinity Acoustic Guitar Grade 2",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "When your child has the basics down, it’s time to refine their techniques and elevate their playing. Our expert instructors are committed to guiding your child through every step of their musical journey. With a focus on essential skills, this course prepares students to excel in the Trinity Guitar Grade 2 certification exam. They will master three performance pieces by renowned artists such as Nick Powlesland, Robert Morandell, and Trad. (arranged by Tim Pells), showcasing their talents during the exam with confidence.",
    exams: ["Grade Exam", "Performance Certificate"],
    // performancePieces: [
    //   "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    // ],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-3": {
    title: "Rockschool Acoustic Guitar Grade 3",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "Do you believe your child has what it takes to become a great guitarist? The Rockschool Acoustic Guitar Grade 3 exam is a fantastic step in that direction. After 18 months to 2 years of practice, this course will help them build confidence in improvisation and develop a strong sense of stylistic expression. For the exam, your child will perform three pieces of their choice from renowned artists like Kacey Musgraves, You Me at Six, and David Bowie, showcasing their growing skills and musicality.",
    exams: ["Grade Exam", "Performance Certificate"],
    // performancePieces: [
    //   "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    // ],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 20 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-acoustic-guitar-grade-3": {
    title: "Trinity Acoustic Guitar Grade 3",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "Has your child been learning guitar for 1.5 to 2 years and is ready to advance? The Trinity Acoustic Guitar Grade 3 exam is the next step in their musical journey. Designed for students who have mastered Grade 2 skills, this exam focuses on enhancing techniques, rhythm, coordination, and overall musical understanding. The course also helps students refine their improvisation, phrasing, and knowledge of various musical styles. With guidance from our certified instructors, students will perfect three performance pieces by iconic artists like John Denver, arr. TJ Walker, and the Eagles to showcase their talents.",
    exams: ["Grade Exam", "Performance Certificate"],
    // performancePieces: [
    //   "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    // ],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-4": {
    title: "Rockschool Acoustic Guitar Grade 4",
    pic: "female-musicians-play-guitar-write-songs-using-tablet_33370-121.webp",
    type: "Intermediate",
    duration: "8-10",
    description:
      "When your child has developed solid techniques, rhythm, coordination, and musical expression, it’s time to take the next step toward becoming a rock star! The Rockschool Acoustic Guitar Grade 4 exam is ideal for guitarists with 2-3 years of experience who have mastered Grade 3 skills. This course emphasizes improvisation, allowing students to showcase their creativity during the exam. With the guidance of our certified experts, students will also perfect three performance pieces by iconic artists such as Ariana Grande, The Beatles, and Sam Smith, ensuring they shine in their RSL Grade 4 exam.",
    exams: ["Grade Exam", "Performance Certificate"],
    // performancePieces: [
    //   "Your child can choose three performance pieces from popular artists such as The Beatles, Bob Dylan & The Lumineers for their examination.",
    // ],
    examDuration: [
      "Grade Exam - 27 minutes (approx.)",
      "Performance Certificate - 24 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "acoustic-guitar-method-book-3": {
    title: "Gandharva Acoustic Guitar Method Book 3",
    pic: "copy-space-female-couch-with-guitar-scaled.webp",
    type: "Advance",
    duration: "10-12",
    description:
      "Enroll your child in Advanced Guitar Playing! With 2-3 years of guitar experience or completion of Trinity/RSL Grade 4, they’re ready to hone advanced techniques. This course serves as a bridge to Grade 5, equipping students with skills in music composition, soloing over chord progressions, and exploring various musical styles. Guided by our approachable instructors, this journey could inspire your child to create their very own song!",
    prerequisites: [
      "Completion of 1.5 to 2 years of guitar playing",
      "Understanding of Music Theory",
      "Grasp of correct Finger Mechanics",
      "Sense of rhythm and subdivision",
    ],
    topics: [
      "Study of Harmony and Harmonization",
      "Composing Solos",
      "Ear Training",
      "Introduction to Modes and Modal Soloing",
      "Study and Analysis of Songs",
      "Stylistic Study of Genres",
      "Composing your own Song",
    ],
    outcomes: [
      "Demonstrate accurate soloing techniques.",
      "Improvise over various scales on a backing track",
      "Analyze harmony, song structure and genre.",
      "Execute correct finger style playing.",
      "Compose and harmonize a few tunes.",
      "Prepare for grades above level 4.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-5": {
    title: "Rockschool Acoustic Guitar Grade 5",
    pic: "copy-space-female-couch-with-guitar-scaled.webp",
    type: "Advance",
    duration: "10-12",
    description:
      "The Rockschool Acoustic Guitar Grade 5 exam is designed for students with over 3 years of guitar experience. At this level, they will build upon their intermediate skills in advanced techniques, complex rhythms, coordination, and musical comprehension. This course offers an exciting repertoire, including works by James Taylor, Corinne Bailey Rae, Eric Clapton, and others. For the exam, students will perform three pieces of their choice by renowned artists such as Ed Sheeran, Dionne Warwick, and Katy Perry. Guided by our expert instructors, students will perfect these performances, ensuring they approach the exam with confidence.",
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 27 minutes (approx.)",
      "Performance Certificate - 24 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-6": {
    title: "Rockschool Acoustic Guitar Grade 6",
    pic: "copy-space-female-couch-with-guitar-scaled.webp",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "For young guitarists who have not only excelled in the Grade 6 exam but have also dedicated 4-5 years to refining their skills, it’s time to take the next exciting step forward. The Rockschool Acoustic Guitar Grade 7 exam is designed for students who have reached an advanced level. This course goes beyond just playing the guitar—it focuses on mastering the art. Our carefully tailored lessons aim to enhance technical abilities, expressive playing, rhythmic complexity, fluency, and deep musical understanding. We emphasize cultivating a mature and authentic sense of stylistic awareness, helping your child discover their unique musical voice and improve their ability to communicate through their instrument.",
      "On this path to excellence, your child will have the chance to select three performance pieces from a diverse repertoire of renowned artists such as Kaki King, Antônio Carlos Jobim, and Bert Jansch. Our expert instructors will guide your child in mastering these pieces, ensuring they are fully prepared for the RSL Guitar Grade 7 exam. Together, we’ll help your child become the rock star they were destined to be.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 32 minutes (approx.)",
      "Performance Certificate - 27 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-7": {
    title: "Rockschool Acoustic Guitar Grade 7",
    pic: "copy-space-female-couch-with-guitar-scaled.webp",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Rockschool Acoustic Guitar Grade 6 exam is suitable for students who have completed 4 years of guitar learning or have mastered Grade 5. At this stage, your child has already developed essential techniques, expressive techniques, rhythmic complexity, coordination, and musical understanding. Now, they will have the opportunity to confidently improvise with clear shape and articulation.",
      "n this course, students will prepare three performance pieces from well-known artists such as Nick Drake, Fats Waller, and José González, showcasing their skills for the RSL Acoustic Guitar Grade 6 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 32 minutes (approx.)",
      "Performance Certificate - 27 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-acoustic-guitar-grade-8": {
    title: "Rockschool Acoustic Guitar Grade 8",
    pic: "copy-space-female-couch-with-guitar-scaled.webp",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "If your child has dreams of building a career in the music industry, this course is a crucial step! The Rockschool Acoustic Guitar Grade 8 exam is designed for students with 5 or more years of guitar experience. Our experienced instructors will guide them in mastering advanced techniques, expressiveness, intricate rhythms, fluency, coordination, and deep musical understanding. We focus on nurturing their natural passion for style, individuality, and their ability to effectively communicate through music.",
      "During the exam, your child will have the chance to shine by performing three pieces from renowned artists like Hiatus Kaiyote, Django Reinhardt, and Eric Roche, showcasing their exceptional abilities. Join us in supporting their musical dreams with dedication and enthusiasm.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 28 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "electronic-guitar-foundation": {
    title: "Gandharva Electric Guitar Foundation",
    pic: "electronic-guitar-courses-3.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Looking to help your child begin their journey with the guitar? Then Gandharva’s Electric Guitar Foundation Course is the ideal starting point!",
      "This beginner-friendly course will guide your child through the basics, while our experienced and approachable instructors will support them at every stage — from selecting the right guitar to getting familiar with it, playing their first song, and even having the chance to perform live!",
      "Get ready to help your child grow into a confident musician with Gandharva!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "GuitarTuna app on mobile phone for tuning the guitar",
    ],
    topics: [
      "Anatomy of Guitar",
      "Fundamental finger techniques",
      "Three string chords",
      "C and G major scale",
      "30+ jingles and melodies",
      "Rhythm reading and basic strumming patterns",
    ],
    outcomes: [
      "Help understand guitar anatomy and concepts",
      "Play 10+ melodies on guitar",
      "Demonstrate proper finger technique and ergonomics",
      "Distinguish and play different rhythmic patterns",
      "Execute strumming and chords",
      "Give a live performance",
      "Teach correct technique for playing guitar with the right posture",
      "Develop understanding of music concepts such as scales, chords, rhythm, melody, and harmony",
      "Familiarize students with reading guitar tablature",
      "Teach students to play simple melodies and songs in C Major while relating them to musical concepts being taught",
    ],
    links: [
      {
        name: "Violin",
        url: "/courses/violin/",
      },
      {
        name: "Ukulele",
        url: "/courses/ukulele/",
      },
      {
        name: "Tamil Music",
        url: "/courses/tamil-music/",
      },
      {
        name: "Malayalam Music",
        url: "/courses/malayalam-music/",
      },
      {
        name: "Kathak",
        url: "/courses/kathak/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "electric-guitar-method-book-1": {
    title: "Gandharva Electric Guitar Method Book 1",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "This course is designed for students who have been playing the guitar for at least six months or have completed the foundational guitar program. In this next-level course, your child will explore advanced rhythm techniques, chords, and scales, along with their practical application in a variety of contemporary and pop songs.",
      "The Electric Guitar Method Book 1 course also introduces the concept of riffs, enabling students to effortlessly play multiple songs by combining riffs and chords on their guitar.",
    ],
    prerequisites: [
      "Should have completed the Foundation Course or have at least 6 months of playing experience or Grade Debut.",
    ],
    topics: [
      "Major, minor and pentatonic scale",
      "Strumming patterns and rhythm reading",
      "Left and right-hand playing techniques",
      "Concept of riffs and its application",
      "20+ melodies and songs",
    ],
    outcomes: [
      "Play Major, Minor, and Pentatonic Scales with ease",
      "Interpret different rhythm patterns and play them effortlessly",
      "Demonstrate 10+ songs with riffs and chords strumming",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-electric-guitar-debut": {
    title: "Rockschool Electric Guitar Debut",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Are you seeking a recognized certification for your beginner guitarist? The Rockschool Electric Guitar Debut Grade could be the perfect next step! If your child has completed Electric Guitar Method Book 1, this program is designed to prepare them for an internationally recognized certification.",
      "This course focuses on building essential skills for the Debut Grade exam, including mastering power chords, playing rhythmic patterns, crafting melodies, and achieving accurate chord execution. The exam also evaluates fundamental abilities such as music reading, sound control, and smooth string transitions.",
      "During the exam, students perform pieces that emphasize straightforward movements across the guitar and simple string changes. With the support of our experienced instructors, your child will gain the confidence and expertise needed to excel in these techniques and deliver a strong performance.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 15 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-electric-guitar-initial": {
    title: "Trinity Electric Guitar Initial",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Trinity is one of the most prestigious and long-established music examination boards. If your child has completed Electric Guitar Method Book 1 and you’re looking to help them earn an internationally recognized certification from a top-tier exam board, this course is the perfect opportunity.",
      "Through this program, your child will develop key skills and techniques essential for the Initial exam, such as mastering power chords, rhythmic riff playing, melodic techniques, and chord accuracy. The exam requires students to perform three songs: two selected from the Initial songbook, including a technical focus (TF) piece that emphasizes two core technical skills featured throughout the song",
      "With guidance from our highly qualified and certified instructors, your child will perfect these techniques and deliver a polished performance. The third song can either be chosen from the Initial songbook, a student-written original piece, a cover, or an arrangement of their own.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-electric-guitar-grade-1": {
    title: "Rockschool Electric Guitar Grade 1",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Is your young guitarist ready to take the next step after six months to a year of learning? The RSL Electric Guitar Grade 1 course is perfect for advancing their skills! Designed for students who have built a solid foundation, this course focuses on preparing them for a contemporary repertoire and popular melodies.",
      "During the course, students explore a selection of 12 pieces and can select any three to perform in their Grade 1 exam. These pieces are specifically crafted to strengthen the techniques and abilities required at this level. From playing modern tunes to perfecting popular melodies, the course ensures students are ready for a confident and enjoyable exam experience.",
      "In the Grade 1 exam, students perform their chosen three songs, showcasing their progress and skills. With the expert guidance of our instructors, your child will master the repertoire and feel fully prepared to earn their Grade 1 certificate.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 20 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-electric-guitar-grade-1": {
    title: "Trinity Electric Guitar Grade 1",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has successfully completed the Trinity Rock and Pop Initial, it’s time to start preparing for Grade 1. This course focuses on helping students enhance their skills and techniques, including single-note riffs, power chord riffs, articulation, and precise picking, all essential for excelling in their certification exam.",
      "For the Grade 1 exam, students perform a set list of three songs. Two of these are selected from the Grade 1 songbook, including a technical focus (TF) piece that highlights two specific techniques integrated throughout the song. Additionally, students will demonstrate technical exercises, such as scales, arpeggios, and chords, played in time with a beat or metronome.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-electric-guitar-grade-2": {
    title: "Rockschool Electric Guitar Grade 2",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Ready to help your child progress after 12 to 18 months of consistent guitar practice? The RSL Electric Guitar Grade 2 course is designed for students who have solid foundational skills and are eager to advance to the next level.",
      "In this course, students work on mastering three songs, along with technical exercises, interpretation, and ear training. The program is carefully structured to help students focus on essential elements such as accurate notation, technical control, articulation, sound clarity, and synchronization.",
      "For the Grade 2 exam, students perform three songs, demonstrate technical exercises, and showcase their interpretation and ear training skills. With the guidance of our expert instructors, students receive tailored support to ensure they are confident and thoroughly prepared to excel in all aspects of the Grade 2 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-electric-guitar-grade-2": {
    title: "Trinity Electric Guitar Grade 2",
    pic: "electronic-guitar-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "This course helps your child build a variety of guitar skills and techniques, including left-hand damping, transitioning between single notes and chords, palm muting, and playing open strings alongside fretted notes.",
      "For the Trinity Grade 2 exam, students perform a set of three songs and demonstrate their playback or improvisation abilities. Our experienced instructors support your child throughout the preparation process, offering guidance on supporting tests and technical exercises.",
      "From exam registration and mastering songs to completing technical exercises and submitting the evaluation video, our certified professionals provide step-by-step assistance. This allows your child to focus on practicing, learning, and refining their guitar skills with confidence.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 11 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "electric-guitar-method-book-2": {
    title: "Gandharva Electric Guitar Method Book 2",
    pic: "boy-kid-playing-guitar-home_1421-3031.avif",
    type: "Intermediate",
    duration: "8-10",
    description:
      "Is your child eager to advance their guitar-playing abilities? Gandharva’s Electric Guitar Method Book 2 is an excellent choice for budding guitarists! This course emphasizes improving solo techniques, exploring intermediate rhythm patterns, and deepening knowledge of music theory. It offers a comprehensive approach to music education while introducing students to a variety of genres.",
    prerequisites: [
      "Completion of Method Book 1/Grade 1 or at least 1 year of guitar playing",
      "Interest and willingness to understand the depths of Music",
    ],
    topics: [
      "Introduction to Fretboard Mapping",
      "20+ songs to demonstrate learned techniques",
      "Arpeggios and Application in Songs",
      "Triplets and 16th note rhythm study",
      "Introduction to blues",
      "12 bar blues",
      "Music Theory",
    ],
    outcomes: [
      "Play 10+ intermediate level songs",
      "Play scales along with fretboard mapping",
      "Demonstrate Arpeggios in songs",
      "Understand Rhythmic Subdivision",
      "Demonstrate songs in genres of Blues, Rock, Pop",
      "Clear exams up to Grade 4",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-3": {
    title: "Rockschool Electric Guitar Grade 3",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The RSL Electric Guitar Grade 3 course is designed for students who have mastered the basics and are ready to explore stylistic techniques, solo performance, and improvisation. Throughout the course, students will learn three songs, along with technical exercises, improvisation, sight-reading, and ear training.",
      "Our experienced and supportive instructors focus on essential skills such as accurate notation, sound quality, stylistic expression, articulation, control, foundational soloing, improvisation, and synchronization. This comprehensive approach ensures students are well-prepared and confident to excel in the RSL Grade 3 exam.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-3": {
    title: "Trinity Electric Guitar Grade 3",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Electric Guitar Grade 3 course hones essential skills such as articulation, solo performance, rhythmic precision, and dexterity to prepare students for the Trinity Grade 3 exam.",
      "In this course, students develop their ear training by replicating melodic phrases or rhythms after listening and learn to improvise solos over 8-bar chord progressions. They also receive supporting tests, technical exercises, and expert guidance to ensure they excel in their Grade 3 certification exam.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-4": {
    title: "Rockschool Electric Guitar Grade 4",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Rockschool Electric Guitar Grade 4 course is perfect for dedicated learners with approximately two years of guitar experience. This course is designed to enhance your child’s stylistic understanding and emotional expression through advanced techniques, fostering a deeper connection with every note they play.",
      "In a supportive and encouraging environment, students explore a selection of challenging and inspiring songs. They refine their skills with targeted technical exercises and unlock creativity through improvisation sessions. With a focus on sight-reading and ear training, they develop a sharp musical ear and a greater appreciation for sound nuances.",
      "Recognizing that exam preparation is a journey of excitement and discovery, our expert instructors provide comprehensive support—from application to results—allowing students to focus on what truly matters: playing the guitar and excelling in their Grade 4 exam.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-4": {
    title: "Trinity Electric Guitar Grade 4",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Electric Guitar Grade 4 course is ideal for musicians with around two years of guitar experience. Guided by certified professional instructors, your child will enjoy personalized, one-on-one live classes tailored to their learning pace and style. They will develop essential skills such as bends, riff playing, dynamic control, and solo versatility while mastering three selected songs that help them express their unique musical voice",
      "Our support extends throughout the entire journey, from exam registration to receiving results, ensuring a seamless and encouraging experience. Through focused technical exercises, improvisation, sight-reading, and ear training, students will be thoroughly prepared to excel in their Grade 4 exam and gain international recognition.",
      "This recognition goes beyond a certificate—it’s a valuable asset for future opportunities in music, bolstering college applications and laying the groundwork for a potential career in the industry. We strive to build confidence and ensure every student is ready to shine on their musical journey.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-5": {
    title: "Rockschool Electric Guitar Grade 5",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Enroll in our Rockschool Electric Guitar Grade 5 course, designed specifically for young musicians preparing for the Rockschool Grade 5 exam.",
      "In this course, your child will tackle longer and more complex pieces, developing a deeper understanding of musical styles and expressions. They will focus on precision and technique, ensuring every note is played accurately and with purpose, while learning to infuse their music with life through intricate rhythms and compelling solos.",
      "The program offers a well-rounded learning experience, including mastering three distinct songs, honing technical skills through focused exercises, and exploring improvisation and interpretation. Students will also strengthen their sight-reading and ear-training abilities—essential tools for any aspiring guitarist.",
      "Preparing for the Grade 5 exam is a significant milestone, and we’re here to make it both fulfilling and enjoyable. This course is designed to build your child’s confidence and skills, ensuring they are not only prepared for the exam but also equipped with tools that will serve them well beyond the exam room.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-5": {
    title: "Trinity Electric Guitar Grade 5",
    pic: "electronic-guitar-courses-2.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Electric Guitar Grade 5 course is perfect for young guitarists eager to advance their skills and explore more complex musical expressions.",
      "In this course, your child will practice advanced techniques such as unison bends, hybrid picking, intricate soloing, and mastering complex rhythms. These skills add depth and emotion to their playing, allowing them to bring each piece to life",
      "The course centers around three carefully selected songs, which serve as a foundation for developing playback and improvisation skills. Emphasis is placed on understanding music and expressing it in a way that resonates with the audience.",
      "A key feature of the Trinity Grade 5 exam, and a highlight of our course, is improvisation and interpretation. Students learn to improvise in a specific style over an unfamiliar backing track, building their ability to adapt and create music on the spot. Ear training exercises, where they replicate short melodic phrases, further enhance their intuitive connection with music.",
      "In addition to improvisation, the course includes technical exercises, sight-reading, and ear training to provide a comprehensive learning experience. Designed not just for exam preparation, this program nurtures a deeper appreciation and passion for music while equipping students with the skills to succeed.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 25 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-6": {
    title: "Rockschool Electric Guitar Grade 6",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Rockschool Electric Guitar Grade 6 course is expertly crafted to equip students for the Rockschool Grade 6 exam, marking the beginning of advanced guitar techniques.",
      "In this program, students focus on enhancing their technical control, mastering complex stylistic techniques, and playing with a refined sense of musicality. They will develop the ability to navigate rhythmic complexities and bring creative flair to their solos and improvisations. The course features three thoughtfully selected songs designed to challenge and inspire, helping students express emotions and ideas through their music.",
      "Alongside song mastery, the course includes targeted technical exercises to further refine their skills. The improvisation and interpretation sections are particularly engaging, encouraging students to explore their creativity and adaptability. Sight-reading and ear training are integral components, providing a comprehensive and well-rounded musical education.",
      "Our dedicated and supportive instructors tailor the learning experience to each student’s pace, ensuring they grow confidently while thoroughly preparing for the exam. We strive to make the journey enjoyable and rewarding, helping students feel ready to excel in the Rockschool Electric Guitar Grade 6 exam.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 33 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-6": {
    title: "Trinity Electric Guitar Grade 6",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Rockschool Electric Guitar Grade 6 course is expertly crafted to equip students for the Rockschool Grade 6 exam, marking the beginning of advanced guitar techniques.",
      "In this program, students focus on enhancing their technical control, mastering complex stylistic techniques, and playing with a refined sense of musicality. They will develop the ability to navigate rhythmic complexities and bring creative flair to their solos and improvisations. The course features three thoughtfully selected songs designed to challenge and inspire, helping students express emotions and ideas through their music.",
      "Alongside song mastery, the course includes targeted technical exercises to further refine their skills. The improvisation and interpretation sections are particularly engaging, encouraging students to explore their creativity and adaptability. Sight-reading and ear training are integral components, providing a comprehensive and well-rounded musical education.",
      "Our dedicated and supportive instructors tailor the learning experience to each student’s pace, ensuring they grow confidently while thoroughly preparing for the exam. We strive to make the journey enjoyable and rewarding, helping students feel ready to excel in the Rockschool Electric Guitar Grade 6 exam.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 30 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-7": {
    title: "Rockschool Electric Guitar Grade 7",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Rockschool Electric Guitar Grade 7 course is thoughtfully designed to prepare students for the Rockschool Electric Guitar Grade 7 exam.",
      "At this level, students refine their control over the instrument, mastering intricate rhythms and complex solos with confidence. Emphasis is placed on precision in notation, ensuring students not only play accurately but also understand the importance of musical detail. They will develop expertise in stylistic techniques, demonstrating a mature and creative approach in their solos and improvisations.",
      "The curriculum is centered around three challenging and dynamic songs, carefully chosen to stretch your child’s abilities and foster creativity. Alongside these pieces, the course includes targeted technical exercises, improvisation and interpretation training, sight reading, and ear training. These elements are vital for shaping a versatile musician capable of both technical mastery and artistic expression.",
      "Under the guidance of skilled and supportive instructors, students are encouraged to explore their potential in an inspiring and nurturing environment. By the conclusion of the program, students will be fully equipped for the Rockschool Electric Guitar Grade 7 exam, possessing advanced skills and a deep understanding of the instrument, ready to excel as accomplished musicians.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 33 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-7": {
    title: "Trinity Electric Guitar Grade 7",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Trinity Electric Guitar Grade 7 course is expertly crafted to prepare students for the Trinity Electric Guitar Grade 7 exam. This program serves as a stepping stone for young guitarists to advance their skills, mastering a variety of complex techniques and musical styles.",
      "At this level, students focus on achieving precise sound control, perfecting tremolo picking, executing ‘galloping’ rhythms, and mastering dynamic playing. The curriculum revolves around three engaging and challenging songs, each spanning four pages, designed to enhance technical ability and deepen musical comprehension.",
      "The course places a strong emphasis on accuracy in notation, ensuring students grasp the importance of playing each note correctly. Alongside this, they will refine stylistic techniques to develop greater technical control and expressive communication through their instrument.",
      "Beyond these core pieces, the program includes targeted technical exercises, improvisation and interpretation practice, sight reading, and ear training. These components are essential for cultivating a versatile and well-rounded musician, capable of both technical precision and creative artistry.",
      "With the guidance of experienced instructors, students are encouraged to explore their musical abilities in a supportive and inspiring environment. By the conclusion of the course, students will be fully prepared for the Trinity Electric Guitar Grade 7 exam, equipped with advanced skills and a profound appreciation for musical expression.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 33 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-electric-guitar-grade-8": {
    title: "Rockschool Electric Guitar Grade 8",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Rockschool Electric Guitar Grade 8 course, the pinnacle of Rockschool certifications, is expertly designed to prepare students for the challenging and prestigious Grade 8 exam. This program is ideal for those ready to showcase their guitar mastery at the highest level.",
      "At this advanced stage, students are required to display exceptional technical proficiency and a thorough command of extended stylistic techniques. This course is structured to help them achieve these goals. With dedicated practice and expert guidance, students will develop mature stylistic confidence, mastering complex rhythms, crafting intricate solos, and improvising with creativity and skill.",
      "The curriculum is built around three carefully chosen songs that push the boundaries of their guitar abilities. These pieces serve not only as skill tests but as opportunities for students to showcase their musicality and control over the instrument. Through these performances, they’ll learn to communicate with depth and confidence, making their guitar playing truly expressive.",
      "Beyond the core repertoire, the program includes targeted technical exercises to enhance precision and technique. Improvisation and interpretation training encourages students to explore their creative potential, while sight reading and ear training are vital for developing intuitive musical understanding.",
      "Our mission is to create a supportive and inspiring learning environment where students prepare thoroughly for the Grade 8 exam while nurturing a lifelong passion for music. With guidance from our dedicated instructors, students will gain the skills and confidence to excel in their guitar playing and pursue any musical path with success.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 33 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electric-guitar-grade-8": {
    title: "Trinity Electric Guitar Grade 8",
    pic: "electronic-guitar-courses-2.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Trinity Electric Guitar Grade 8 course is an advanced and comprehensive program specifically designed to prepare students for the Trinity Electric Guitar Grade 8 exam. This course represents the pinnacle of challenge for aspiring guitarists, offering the opportunity to showcase their technical mastery and musical artistry at the highest level.",
      "Throughout the program, students delve into advanced techniques such as legato, tapping, and trills while refining their soloing skills. These skills empower them to convey intricate musical ideas with precision and creativity.",
      "The curriculum features three carefully selected songs, each presenting distinct challenges to enhance technical ability and musical expression. A strong emphasis is placed on accuracy in notation, ensuring students perform with both precision and a deep understanding of the music. Additionally, students develop advanced stylistic techniques and technical control, enabling them to deliver mature and expressive solos and improvisations.",
      "Beyond mastering the core repertoire, the course includes rigorous technical exercises, improvisation and interpretation training, as well as sight reading and ear training. These components are essential for cultivating a versatile musician capable of responding to and interpreting music with sophistication and depth.",
      "Led by experienced and supportive instructors, the course aims to inspire students in a nurturing environment where they not only prepare for the exam but also develop a profound appreciation for music. By the end of the program, students will be fully equipped to excel in the Trinity Electric Guitar Grade 8 exam and to continue their musical journey with confidence and passion.",
    ],
    exams: ["Grade Exam"],
    examDuration: ["Grade Exam - 30 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-violin-foundation": {
    title: "Gandharva Violin Foundation",
    pic: "practicing-violin.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Are you searching for an exciting and engaging way to introduce your child to the world of music? Look no further than our Violin Foundation Course! This program is designed to help students master essential skills such as finger techniques, bowing, rhythm exercises, and much more.",
      "Tailored for beginners aged 8 and above, this course focuses on building strong musical fundamentals. With guidance from our skilled and approachable instructors, your child will gain the confidence and abilities they need to thrive as a budding musician. Enroll today and watch your child’s passion for music soar!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Keyboard, so that they can practice and hone their skills",
    ],
    topics: [
      "Introduction To Violin",
      "Bowing Techniques",
      "Basic Finger Techniques",
      "The Major Scales",
      "Rhythm Exercises",
      "Articulations and Dynamics",
      "Melodies by Handel, Bach, Schumann",
    ],
    outcomes: [
      "Students will learn 20+ traditional, folk and classical melodies",
      "Students will demonstrate correct finger and bowing technique",
      "Students will execute correct articulations and dynamics",
      "Students will be able to play in different Rhythmic Patterns",
      "Students will be capable to play any melody till Grade 2 of Trinity/Abrsm Violin Syllabus",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "suzuki-violin-foundation": {
    title: "Suzuki Violin Foundation",
    pic: "practicing-violin.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Suzuki Violin Foundation course is an excellent starting point for beginners eager to learn the violin. It covers fundamental techniques and musical principles, providing a solid groundwork for future advancement.",
      "Each piece you learn introduces fresh skills, building upon the progress from earlier lessons. Our skilled instructors ensure you grasp the essentials, offering guidance and encouragement every step of the way.",
      "This course emphasizes three core elements: playing, active listening, and practice through repetition. Join us as we take you on a step-by-step journey to help you develop your skills and play the violin with confidence.",
    ],
    prerequisites: [
      "Ideal age of student - 5 years or above",
      "Eager to learn and practice regularly to reach their goal",
      "Must have their Violin",
    ],
    topics: [
      "Introduction to holding Violin and Bow",
      "Finger positions and techniques",
      "Good posture, intonation, tone and hand positioning",
      "Various range of pieces",
      "Scales and Arpeggios upto 1 Octave",
      "Dynamics and Articulation",
    ],
    outcomes: [
      "Display good bowing technique",
      "Learn to play various songs",
      "One Octave scales and Arpeggios",
      "Demonstrate various rhythmic patterns",
      "Ability to recall Basic Music Theory",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-violin-method-book-1": {
    title: "Gandharva Violin Method Book 1",
    pic: "female-violinist-playing-scaled.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has been learning the violin for over six months and has mastered the foundational skills, the Gandharva Violin Method Book 1 course is the ideal next step. This program introduces various bowing techniques to help students become comfortable with every part of the bow.",
      "Students will explore playing different melodies, ornamentations, and more. The course emphasizes expanding their repertoire by learning pieces from renowned composers such as Beethoven, Mozart, Bach, Handel, and others. It’s a fantastic opportunity to elevate their violin skills to the next level!",
    ],
    prerequisites: [
      "Ideal age of student - 9-10 years",
      "Student must have their own Violin, so that they can practice and hone their skills",
      "Student should have a sound understanding of the Foundation level techniques",
    ],
    topics: [
      "2 Octave Major Scales",
      "Posture and fingers",
      "2 Octave Arpeggio",
      "Bowing Exercises and Techniques",
      "Articulation and Dynamics",
      "Ornamentation",
      "Pieces by different Composers",
    ],
    outcomes: [
      "Demonstrate G,C,F,B Major scale",
      "Execute two octave arpeggios",
      "Showcase different dynamics, articulations, martele and string crossing",
      "Play triplets and 16th notes subdivision",
      "Play folk tunes and compositions by Handel, Prucell, Schumann and Mozart",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "suzuki-violin-method-book-1": {
    title: "Suzuki  Violin Method Book 1",
    pic: "female-violinist-playing-scaled.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The Suzuki Violin Method Book 1 is designed for students who have been learning the violin for 6-8 months. If you’ve already built a strong foundation through Suzuki or another method and have refined your tone, intonation, and basic techniques, this course is the perfect next step in your musical journey.",
      "This beginner-level course features chapters filled with scales, arpeggios, and musical pieces, offering students the chance to deepen their skills and prepare for more advanced levels. As each chapter introduces progressively more challenging content, consistent practice is encouraged to help students master the techniques and excel at this stage.",
    ],
    topics: [
      "Various style of Repertoire by Bach, Mozart, Schumann, Handel",
      "Notation Names",
      "Bowing exercises and Technique",
      "Scales and Arpeggios up to 2 Octaves",
      "3rd position shifting",
      "Exercises from Schradieck Book",
      "Various Italian Terms",
      "Dynamics and Articulation",
      "Brief about Era of Music and Composer",
    ],
    outcomes: [
      "Cover various Repertoire by different composers with Notation",
      "Learn different bowing technique",
      "Cover different scales and arpeggios upto 2 Octaves",
      "Learn shifting to 3rd position",
      "Learn different types of dynamics, Italian Terms and Articulation",
      "Learn brief about Era of Music and Composers",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },

  "trinity-violin-initial": {
    title: "Trinity Violin Initial",
    pic: "female-violinist-playing-scaled.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The Trinity Violin Initial course is ideal for children with over eight months of violin experience who have mastered the techniques covered in the Gandharva Violin Method Book 1. This program includes a selection of nine pieces tailored for the Trinity Violin Initial exams (2020-2023).",
      "With a rich and diverse repertoire, the course introduces students to various musical styles. Your child will explore both accompanied and unaccompanied pieces across grades, as well as duet performances, making it a comprehensive and engaging learning experience.",
    ],
    examDuration: ["10-12 minutes"],
    topics: [
      "Repertoire / Pieces",
      "Posture and fingers",
      "Sight Reading",
      "Technical Exercises (major scales, arpeggios in one octave)",
      "Aural Training",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-violin-grade-1": {
    title: "Trinity Violin Grade 1",
    pic: "female-violinist-playing-scaled.avif",
    type: "Beginner",
    duration: "6-8",
    examDuration: ["10-14 minutes"],
    descriptions: [
      "If your child has been learning the violin for more than a year, they are ready to take on Trinity Violin Grade 1. This level features nine thoughtfully chosen pieces selected by Trinity’s expert panel.",
      "The course emphasizes enhancing repertoire skills and introducing technical exercises, helping your child develop a solid foundation as a violinist.",
      "With a rich and diverse repertoire, the course introduces students to various musical styles. Your child will explore both accompanied and unaccompanied pieces across grades, as well as duet performances, making it a comprehensive and engaging learning experience.",
    ],
    topics: [
      "Repertoire / Pieces",
      "Posture and fingers",
      "Sight Reading",
      "Technical Exercises (major scales, arpeggios in one octave)",
      "Aural Training",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-violin-method-book-2": {
    title: "Gandharva Violin Method Book 2",
    pic: "young-woman-playing.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking to help your child elevate their musical abilities? The Gandharva Violin Method Book 2 is an excellent choice for young violinists who have been learning for over 18 months and are ready to tackle intermediate-level techniques, exercises, and more.",
      "This course is designed to solidify your child’s musical foundation by combining theory with practical application. It introduces advanced techniques, dynamics, sight-reading, and aural training, equipping your child with the skills to excel in both practice sessions and live performances.",
    ],
    prerequisites: [
      "Should have developed good Violin playing skills and have sound knowledge of beginner level techniques",
    ],
    topics: [
      "Advanced Bowing Techniques",
      "Posture and fingers",
      "Major and Minor Scales in Different positions",
      "Advance Sight Reading and Aural Training",
      "3 octave arpeggios",
      "Articulations and Dynamics",
      "Modes",
      "Study of compositions by famous composers",
    ],
    outcomes: [
      "Play all major and minor scales",
      "Read staff notation fluently",
      "Play A,G,E,D harmonic, melodic and minor scales",
      "Demonstrate various bowing techniques",
      "Play Paginini, Mozart, Schumann",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-violin-grade-2": {
    title: "Trinity Violin Grade 2",
    pic: "young-woman-playing.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "If your child has successfully completed the Trinity Grade 1 certification, they can progress to Trinity Violin Grade 2. At this level, a solid understanding of bowing techniques, double stops, and arpeggios is essential.",
      "This course helps students refine their current skills while introducing them to improvisation techniques. For the exam, they will be required to perform compositions from various musical eras.",
    ],
    examDuration: ["20-25 minutes"],
    topics: [
      "Repertoire / Pieces",
      "Posture and fingers",
      "Sight Reading",
      "Technical Exercises ( major - minor scales, arpeggios, 2 octaves)",
      "Aural Training",
      "Improvisation",
    ],

    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-violin-grade-3": {
    title: "Trinity Violin Grade 3",
    pic: "young-woman-playing.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "If your child has successfully passed the Grade 2 exam and completed the Gandharva Violin Method Book 2, they are ready to embark on their journey toward the Trinity Violin Grade 3 exam. This level involves mastering pieces by renowned composers such as Mozart, Handel, and J.S. Bach, with guidance from our certified instructors to perfect each performance piece.",
      "In this course, students will refine their understanding of rhythms, scales (including major and minor), arpeggios (a creative way to play notes in sequence), and precise bow control. Additionally, they will be introduced to harmonic, motivic, and stylistic improvisation on the violin.",
      "Designed specifically to prepare students for the Trinity Violin Grade 3 exam, this program ensures they are fully equipped to excel in their performance. With the dedicated support of our professional instructors, your child will gain the confidence and skills needed to shine in their evaluation and beyond.",
    ],
    examDuration: ["20-25 minutes"],
    topics: [
      "Repertoire / Pieces",
      "Posture and fingers",
      "Sight Reading",
      "Technical Exercises ( major - minor scales, arpeggios, 2 octaves)",
      "Aural Training",
      "Improvisation",
    ],

    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "gandharva-violin-method-book-3": {
    title: "Gandharva Violin Method Book 3",
    pic: "man-playing-cello-white.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Is your child passionate about violin playing and ready to take on a new challenge? Our Advanced Violin course at Gandharva is tailored to help each student elevate their skills to the next level.",
      "Led by experienced instructors, this course focuses on advanced techniques, intricate repertoire, and solo performance skills. Your child will develop the confidence to express themselves musically on stage, enhancing their passion for the violin and reaching new musical heights.",
    ],
    prerequisites: [
      "Should have sound knowledge of intermediate level Violin techniques.",
    ],
    topics: [
      "Advanced Bowing Techniques",
      "Posture and fingers",
      "Advance Sight Reading and Aural Training",
      "Concerto Pieces and Solo Playing Study",
      "Complex Time Signature and Rhythms",
      "Stylistic Study",
      "Composing Songs",
    ],
    outcomes: [
      "Mastery of advanced bowing techniques, including spiccato, sautillé, ricochet, and more",
      "Knowledge of musical form, harmony, melody, and counterpoint to create engaging and original music.",
      "Increased confidence and self-efficacy as a musician, allowing for greater creativity and expression in performance, composition, and collaboration with other musicians.",
      "Enhanced appreciation and understanding of music theory, including concepts such as chord progressions, harmonic analysis, and voice leading.",
      "Play complex time signatures and rhythms, including irregular and asymmetric meters with precision and accuracy.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      }
    ],
  },
  "electronic-keyboard-foundation": {
    title: "Gandharva Electronic Keyboard Foundation",
    pic: "e-k-courses-3.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Searching for an exciting and interactive way to introduce your child to the world of music? Our Keyboard Foundation course is the ideal choice!",
      "Designed for beginners aged 8 and up, this course focuses on developing a solid musical foundation. Guided by our expert and approachable instructors, your child will gain the essential skills needed to grow into a confident and talented musician. Enroll now and let your child’s musical journey soar to new heights!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Keyboard, so that they can practice and hone their skills",
    ],
    topics: [
      "Basic elements of electronic keyboard (Keys & Notes)",
      "Posture and fingers",
      "Beats, rhythm & time signature",
      "Concepts like dynamics, slurs, tie notes and dotted rhythms",
      "Staff notations (Clef, Notes values, etc.)",
      "Learn songs in Middle 'C', 'C' and 'G' Position",
      "Chords & basic music theory",
    ],
    outcomes: [
      "Identify notes on the instrument",
      "Play basic rhythms and pieces with steady pulse and flow",
      "Learn staff notations and how to read sheet music effectively",
      "Master basic touch controls",
      "Use different rhythm techniques",
      "Harmonize two-note and four-note harmonies with the use of ties and dotted rhythms.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "electronic-keyboard-method-book-1": {
    title: "Gandharva Electronic Keyboard Method Book 1",
    pic: "e-k-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Has your child spent over six months mastering the fundamentals of keyboard playing? If so, it’s time to take their skills to the next level with the Gandharva Keyboard Method Book 1 course!",
      "This program focuses on developing essential techniques, enhancing rhythm and coordination, and deepening musical understanding. Students will dive into topics like major and minor scales, syncopation, key signatures, swing rhythms, and more. With a strong emphasis on building a diverse repertoire, this course equips your child to confidently perform a wide range of pieces. It’s the perfect step forward in their musical journey!",
    ],
    prerequisites: ["Basic fundamentals and Foundation level course concepts"],
    topics: [
      "Techniques and form",
      "Major Scales",
      "Primary chords and Inversions",
      "Basic of voice learning",
      "Key Signature and Syncopation",
      "Key of 'C' 'G' and 'F' Major",
      "Minor Keys, Transposition and Swing Rhythm",
      "Repertoire building",
    ],
    outcomes: [
      "Develop good habits of using the right techniques for keyboard playing",
      "Learn how to play in different major and minor keys with ease",
      "Master the skill of playing chords, voicing them, understanding chord progressions in various keys and inversions used in popular songs",
      "Understand and apply concepts like syncopation, key signature, and swing rhythm in their playing",
      "Learn how to use 16th notes and build up their repertoire using previously learned concepts, along with left hand broken chord accompaniment techniques",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-electronic-keyboard-grade-1": {
    title: "Rockschool Electronic Keyboard Grade 1",
    pic: "e-k-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Ready to watch your child create some musical magic? The Rockschool Keyboard Grade 1 exam is an excellent choice for beginners with a good ear for music who are just starting to learn the fundamentals of keyboard playing.",
      "In this exam, your child will perform three selected pieces, such as Lullaby (Wiegenlied), Rock to the Roll, and Little Brown Jug.",
      "They’ll also get to demonstrate their skills with keyboard-specific techniques, including single patch settings, layering, and basic sound manipulation using effects like pitch bend.",
    ],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-electronic-keyboard-debut": {
    title: "Rockschool Electronic Keyboard Debut",
    pic: "e-k-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The Rockschool Keyboard Debut exam is ideal for children who have recently started learning the keyboard and have gained foundational skills and techniques.",
      "In this exam, they can display their creativity and talent by selecting three performance pieces from a variety of renowned artists, including John Lennon, Emeli Sandé, and Bill Withers.",
      "Additionally, they’ll explore exciting keyboard-specific techniques, such as using single patch settings, creating layers, and experimenting with basic sound effects like pitch bend.",
    ],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-electronic-keyboard-initial": {
    title: "Trinity Electronic Keyboard Initial",
    pic: "e-k-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Ready to watch your child create some musical magic? The Trinity Keyboard Grade Initial exam is an excellent choice for beginners with a good ear for music who are just starting to learn the fundamentals of keyboard playing.",
      "In this exam, your child will perform three selected pieces, such as Lullaby (Wiegenlied), Rock to the Roll, and Little Brown Jug.",
      "They’ll also get to demonstrate their skills with keyboard-specific techniques, including single patch settings, layering, and basic sound manipulation using effects like pitch bend.",
    ],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-electronic-keyboard-grade-1": {
    title: "Trinity Electronic Keyboard Grade 1",
    pic: "e-k-courses-2.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Attention parents! Is your child a rising star on the keyboard who has been practicing for six months to a year? If so, the Trinity Keyboard Grade 1 exam could be the perfect next step! By this stage, they’ve built on their foundational skills and are ready to tackle more advanced techniques, rhythms, coordination, and musical expression.",
      "During the Grade 1 exam, your child can shine by performing three pieces of their choice, such as Pastoral (theme from Symphony No. 6), Whirling Dervishes, or English Country Garden. They’ll also demonstrate their ability with keyboard-specific techniques, including single patch settings, layering, and sound manipulation effects like pitch bend.",
    ],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "electronic-keyboard-method-book-2": {
    title: "Gandharva Electronic Keyboard Method Book 2",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking for a way to help your child elevate their musical abilities? Gandharva Method Book 2 is the ideal choice for young keyboard players who have been learning for over 18 months and are ready to advance to intermediate-level skills, scales, and exercises.",
      "This course focuses on enhancing technique, rhythm, coordination, and musical understanding, equipping your child with the tools they need to grow into a confident and accomplished musician. From mastering D major and A major scale positions to exploring new rhythm patterns and repertoire-building techniques, your child will enjoy a fun and enriching learning experience guided by our expert instructors.",
    ],
    prerequisites: [
      "Should have developed good keyboard playing skills and have sound knowledge of beginner level techniques.",
    ],
    topics: [
      "Intermediate level major and minor scales",
      "'D', 'A' & 'Bb' keys",
      "Repertoire playing in different keys",
      "Triads in 12 bar blues",
      "Scales - chromatic and pentatonic scales",
      "More on rhythm techniques",
    ],
    outcomes: [
      "Mastering major and minor scales with both hands",
      "Learning to play songs in different keys with finesse",
      "Exploring sixteenth note rhythm and subdivisions",
      "Playing songs with triad chords in various keys",
      "Discovering arpeggios and applying them in different songs",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-2": {
    title: "Rockschool Electronic Keyboard Grade 2",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Rockschool Keyboard Grade 2 exam is ideal for students with 12 to 18 months of playing experience. This level builds upon the foundational skills acquired in Grade 1, introducing fresh techniques, rhythms, and deeper musical concepts. It also offers a valuable chance to refine improvisation abilities, a key aspect of musicianship.",
      "In the exam, students will perform three pieces by renowned artists like Kate Bush, Nina Simone, and Pharrell Williams. They will also showcase keyboard-specific skills, including single patch settings, layering, and sound effects manipulation, such as pitch bending.",
    ],
    examDuration: [
      "Grade Exam - 20 minutes (approx.)",
      "Performance Certificate - 15 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-3": {
    title: "Rockschool Electronic Keyboard Grade 3",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Grade 3 Keyboard exam is ideal for students with 18 months to 2 years of playing experience who are ready to elevate their skills. Having built a strong foundation through Grade 2, they will now focus on enhancing technique, rhythm, coordination, and exploring diverse musical genres.",
      "In this exam, students will perform three songs by popular artists such as Adele, Marvin Gaye, and Eurythmics. They will also demonstrate keyboard techniques like single patch settings, layering, and basic sound effects manipulation, including pitch bend. This is a fantastic chance for students to showcase their abilities and gain confidence in their performance.",
    ],
    examDuration: ["Grade Exam - 30  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-4": {
    title: "Rockschool Electronic Keyboard Grade 4",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "If your child has been playing the keyboard for 2 to 3 years, they are ready to take on the Rockschool Keyboard Grade 4 exam! By this stage, they have developed strong foundational skills and advanced their techniques, rhythm, and coordination. They’ve also learned to switch patches, perform solos, and explore various musical styles.",
      "Grade 4 is all about enhancing expression and personal style. The exam will challenge them with pieces from renowned artists such as Chvrches, Elton John, and The Specials. It’s an excellent opportunity for them to boost their confidence, refine their articulation, and broaden their musical repertoire.",
    ],
    examDuration: [
      "Grade Exam - 25  minutes (approx.)",
      "Performance Certificate: 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-2": {
    title: "Trinity Electronic Keyboard Grade 2",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Keyboard Grade 2 exam is perfect for students with 12 to 18 months of experience playing the electronic keyboard. By this stage, they’ve built on the foundational skills from Grade 1 and have improved their technique, rhythm, coordination, and overall musical understanding.",
      "This exam offers students the chance to enhance their improvisation abilities and perform three selected pieces, including timeless works such as Summertime from Porgy and Bess, Air from Water Music, and Homeward Path.",
      "Additionally, students will develop keyboard-specific skills like using single patch settings, layering sounds, and applying basic effects, including sound manipulation techniques like pitch bend.",
    ],
    examDuration: ["Grade Exam - 15  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-3": {
    title: "Trinity Electronic Keyboard Grade 3",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Keyboard Grade 3 exam is ideal for students with around two years of experience who are ready to advance their skills further. Having built a solid foundation up to Grade 2, they are now refining their techniques, rhythm, and coordination while deepening their musical knowledge. This stage encourages students to develop their unique style and explore greater musical expression.",
      "In this exam, students will perform three pieces from a diverse range of composers, including Bach, Beethoven, and Holst. They will also be evaluated on their proficiency with keyboard-specific skills, such as patch settings, layering, and sound manipulation using effects like pitch bend. It’s a wonderful opportunity for students to demonstrate their growth and creativity.",
    ],
    examDuration: ["Grade Exam - 15  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-4": {
    title: "Trinity Electronic Keyboard Grade 4",
    pic: "e-k-courses-1.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Keyboard Grade 4 exam is designed for students with two to three years of experience who are ready to advance to the next stage. By this point, they have built upon the fundamentals from Grade 3 and acquired more advanced skills, such as patch switching, playing solos, using layers and splits, and exploring specialized styles.",
      "At this level, students will enhance their expressive abilities and expand their musical style. They will continue to build confidence and precision as they perform three pieces, such as He’s a Pirate, Allegro, Hungarian Dance No. 5, and others. Additionally, they’ll utilize keyboard-specific techniques, including patch settings, layers, and basic sound effects, to elevate their performances.",
    ],
    examDuration: ["Grade Exam - 20  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-5": {
    title: "Rockschool Electronic Keyboard Grade 5",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has been playing the electronic keyboard for three or more years and you’re wondering what’s next in their musical journey, look no further. The RSL Electronic Keyboard Grade 5 offers a great opportunity for your child to develop strong expression and a deeper understanding of various styles.",
      "In this grade, your child will also have the chance to improvise confidently, accurately, and expressively. They’ll explore music from renowned artists like David Bowie, Vanessa Carlton, and David Guetta, which will broaden their understanding of different musical styles.",
    ],
    examDuration: [
      "Grade Exam - 25  minutes (approx.)",
      "Performance Certificate - 22 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-6": {
    title: "Rockschool Electronic Keyboard Grade 6",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Do you want your child to be a competent musician or an extraordinary one? If your aim is excellence, they need to develop their own unique style, creating music that showcases their individuality. While many musicians can perform as skillfully as legends like Mozart, few achieve the distinction that sets them apart.",
      "This program is designed to help your child uncover their distinctive musical voice, enabling them to bring a personal touch to their performances. Beyond mastering advanced skills such as scales, chord progressions, and arpeggios, what comes next? With the RSL Electronic Keyboard Grade 6, your child will cultivate stylistic awareness, excel in improvisation, communicate musical ideas with precision, and express themselves in a way that is truly unique.",
    ],
    examDuration: [
      "Grade Exam - 30  minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-7": {
    title: "Rockschool Electronic Keyboard Grade 7",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has been playing the electronic keyboard for 4-5 years, they’re ready to take on the RSL Electronic Keyboard Grade 7! This course emphasizes genuine stylistic understanding while fostering individuality and expressive communication.",
      "Through this program, your child will gain the confidence to improvise with personality and flair while showcasing a solid grasp of musical form and structure.",
    ],
    examDuration: [
      "Grade Exam - 30  minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-electronic-keyboard-grade-8": {
    title: "Rockschool Electronic Keyboard Grade 8",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Has your child been playing the keyboard for five years or more? If so, they’re ready for Grade 8! By now, they should have developed proficiency in expressive techniques, rhythmic complexity, fluency, coordination, and a deep understanding of music.",
      "During their Grade 8 preparation, they’ll advance their improvisation skills with confidence and individuality, while showcasing a flawless sense of musical form and structure.",
    ],
    examDuration: [
      "Grade Exam - 30  minutes (approx.)",
      "Performance Certificate - 28 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-5": {
    title: "Trinity Electronic Keyboard Grade 5",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has been playing the keyboard for three or more years, Trinity Electronic Keyboard Grade 5 is an ideal next step! By this stage, they should have developed enhanced technique, improved rhythmic skills, better coordination, and a solid understanding of musical concepts.",
      "In preparing for Grade 5, your child will strengthen their sense of expression, deepen their stylistic awareness, and explore opportunities for improvisation. The repertoire includes pieces like All is Calm, A Walk at Strumble Head, and Blues for Beth, as well as music from iconic artists such as David Bowie, Vanessa Carlton, and David Guetta.",
    ],
    examDuration: ["Grade Exam - 16  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-6": {
    title: "Trinity Electronic Keyboard Grade 6",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Has your child been playing the electronic keyboard for about four years? By now, they’ve likely reached the early stages of advanced playing, mastering advanced scales, chord progressions, and arpeggios. This makes them ready for Grade 6!",
      "In Grade 6, your child will refine their understanding of musical form and structure while enhancing their ability to communicate ideas clearly through music. They’ll also work on developing their own unique and authentic musical style, fostering creativity and individuality.",
    ],
    examDuration: ["Grade Exam - 22  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-7": {
    title: "Trinity Electronic Keyboard Grade 7",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "Looking to elevate your child’s electronic keyboard skills? Trinity Electronic Keyboard Grade 7 is the perfect choice for children who have been learning for 4-5 years. This course emphasizes genuine stylistic awareness while nurturing individuality and effective communication.",
      "During their preparation for this grade, your child will gain confidence in improvisation, showcasing personality and flair, along with a solid understanding of musical form and structure.",
    ],
    examDuration: ["Grade Exam - 22  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-electronic-keyboard-grade-8": {
    title: "Trinity Electronic Keyboard Grade 8",
    pic: "view-from-back-young-woman-plays-synthesizer-reading-notes-laptop-screen-independent-learning-play-piano-home-passion-music-hobbies-leisure-self-development_180532-1950.avif",
    type: "Advanced",
    duration: "10-12",
    descriptions: [
      "If your child has over five years of experience playing the electronic keyboard, they’re ready for Grade 8! This course emphasizes genuine stylistic understanding while fostering individuality and expressive communication.",
      "As they prepare for this grade, your child will confidently develop their improvisation skills, showcasing personality and creativity, while demonstrating a strong grasp of musical form and structure.",
    ],
    examDuration: ["Grade Exam - 27  minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-ukulele-foundation": {
    title: "Gandharva Ukulele Foundation",
    pic: "music-instruments-close-up-female-hand.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Is your child interested in learning to play the ukulele? The Gandharva Ukulele Foundation Course is the perfect starting point!",
      "This course focuses on building essential skills, including finger techniques, basic chords, and strumming patterns. Students will also gain an understanding of fundamental techniques and musical concepts related to string instruments.",
      "Additionally, this course serves as an excellent foundation for those who wish to transition to learning guitar after a year of ukulele practice.",
    ],
    prerequisites: ["Must have an interest in Music"],
    topics: [
      "Introduction to Ukulele",
      "Fundamental Finger Techniques",
      "Major Scale Study and Melodies",
      "Music Theory",
      "Basic Chords and Strumming",
      "10+ Popular tunes and songs",
    ],
    outcomes: [
      "Play 10+ songs on Ukulele",
      "Demonstrate proper finger technique and ergonomics",
      "Distinguish and play different rhythmic patterns",
      "Execute Strumming and chords",
      "Showcase a live performance",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-ukulele-method-book-1": {
    title: "Gandharva Ukulele Method Book 1",
    pic: "female-hands-holding-ukulele-guitar-learning-how-play_151013-11273.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Ready to elevate your child’s ukulele skills? Our Ukulele Method Book 1 course is thoughtfully designed to foster their musical growth and unlock their potential.",
      "Building on the foundational knowledge they’ve already gained, this course takes your child deeper into the world of ukulele music. They’ll refine essential skills and techniques, helping them stand out as confident and skilled players.",
      "Our instructors are more than teachers—they’re dedicated mentors, committed to guiding and supporting your child throughout their musical journey.",
    ],
    prerequisites: [
      "Must have an interest in Music",
      "Completed the Foundation course",
    ],
    topics: [
      "Introduction to Ukulele",
      "Fundamental Finger Techniques",
      "Major Scale Study and Melodies",
      "Music Theory",
      "Basic Chords and Strumming",
      "10+ Popular tunes and songs",
    ],
    outcomes: [
      "Play 10+ songs on Ukulele",
      "Demonstrate proper finger technique and ergonomics",
      "Distinguish and play different rhythmic patterns",
      "Execute Strumming and chords",
      "Showcase a live performance",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-ukulele-debut": {
    title: "Rockschool Ukulele Debut",
    pic: "female-hands-holding-ukulele-guitar-learning-how-play_151013-11273.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Give your child the opportunity to earn a prestigious international music certificate and showcase their talents!",
      "Is your child new to music and eager to begin their journey? This beginner-friendly course is the ideal starting point, focusing on building essential skills, techniques, and coordination.",
      "Our experienced professionals will guide your child every step of the way, from registering for the Rockschool exam to preparing for it, submitting their performance for evaluation, and receiving their results.",
      "To make the experience even more exciting, your child will get to select three favorite songs from renowned artists like Taylor Swift, Bruno Mars, or Bob Dylan to perform during the exam. It’s a fun and rewarding way for them to express their musical talents.",
      "With a curriculum designed to make learning music engaging and enjoyable, our expert teachers ensure that your child not only gains valuable skills but also discovers creativity and self-expression. Plus, they’ll have the pride of earning an internationally recognized certificate along the way!",
    ],
    examDuration: ["10-12 minutes"],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Interpretation Or Improvisation",
      "Ear Training",
      "Musicianship",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-ukulele-grade-1": {
    title: "Rockschool Ukulele Grade 1",
    pic: "female-hands-holding-ukulele-guitar-learning-how-play_151013-11273.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Foster your child’s musical growth with the Rockschool Grade 1 Ukulele program, an exciting step forward in their musical journey.",
      "This course is tailored for students with 6-12 months of prior experience and focuses on enhancing their skills, including basic improvisation. It offers a well-rounded musical education by incorporating ear training, technical exercises, and sight reading into the curriculum.",
      "By the end of the Grade 1 Ukulele program, your child will not only have significantly improved their musical abilities but will also be fully prepared to take the Rockschool Grade 1 Ukulele exam. Beyond musical development, earning a certificate from this prestigious exam board can give students a competitive edge in college applications, making this journey both rewarding and impactful.",
    ],
    prerequisites: [
      "Must have completed the Gandharva Debut course",
      "The practice of at least 8 months of playing the Ukulele",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Sight Reading Improvisation & Interpretation",
      "Ear Tests",
      "General Musicianship Questions",
    ],
    outcomes: [
      "Play 6 songs in the book",
      "Be proficient in technical exercises",
      "Learn sight reading",
      "Do Melodic and rhythmic recall",
      "Receive an Internationally recognized certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "ukulele-method-book-2": {
    title: "Gandharva Ukulele Method Book 2",
    pic: "cute-cheerful-boy-is-playing-ukulele-guitar-music-room-joyful-learning-play-musical-instruments_97716-1725.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Is your child ready to elevate their Ukulele skills? Rockstar Ukulele Grade 2 is the ideal choice for young musicians who have successfully completed the RSL Ukulele Grade 1 exam and the Gandharva Ukulele Method Book 2 course.",
      "This program is designed for students with 12-18 months of Ukulele experience. By this stage, they should have a strong grasp of fundamental techniques and a solid foundation in rhythm, coordination, and musical expression.",
      "The course is specifically tailored to prepare students for the RSL Ukulele Grade 2 exam. With our dedicated instructors and a focused curriculum, your child will enhance their sight-reading skills and develop a deeper understanding of musical interpretation. This grade includes songs from renowned artists like David Bowie, Pharrell Williams, Coldplay, and more!",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 1",
      "Have experience playing for 12-16 months",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Sight Reading Improvisation & Interpretation",
      "Ear Tests",
      "General Musicianship Questions",
    ],
    outcomes: [
      "Play 6 songs in the book",
      "Be proficient in technical exercises",
      "Learn sight reading",
      "Do Melodic and rhythmic recall",
      "Receive an Internationally recognized certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-2": {
    title: "Rockschool Ukulele Grade 2",
    pic: "cute-cheerful-boy-is-playing-ukulele-guitar-music-room-joyful-learning-play-musical-instruments_97716-1725.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking for an exciting way to help your child enhance their ukulele skills? The Gandharva Ukulele Method Book 2 is the perfect choice!",
      "Designed for kids with over six months of ukulele experience, this course introduces impressive techniques like arpeggios, intermediate chords, and fingerpicking. It’s not just about learning new skills—it’s about guiding your child toward becoming a confident and skilled ukulele player!",
    ],
    prerequisites: [
      "Should have sound knowledge of beginner level Ukulele techniques.",
    ],
    topics: [
      "Study of intermediate chords",
      "Triplet and 16th Note Rhythm Study",
      "Arpeggios",
      "Songs",
      "Introduction To Blues",
      "Finger Picking",
    ],
    outcomes: [
      "Play more complex chord progressions for a variety of songs",
      "Understand and perform triplet and 16th note rhythms for variety in strumming patterns.",
      "Master arpeggios for the ukulele and apply them in songs for more melodic sounds",
      "Learn and play a variety of songs on the ukulele.",
      "Understand the basics of playing the blues on the ukulele.",
      "Develop fingerpicking techniques for the ukulele adding depth and dimension to the playing.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-3": {
    title: "Rockschool Ukulele Grade 3",
    pic: "cute-cheerful-boy-is-playing-ukulele-guitar-music-room-joyful-learning-play-musical-instruments_97716-1725.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Help your child take the next big step in their Ukulele journey with the Grade 3 Ukulele Exam course. Designed for students with 18-24 months of experience, this program builds on their existing skills and prepares them for this important milestone.",
      "In this course, your child will refine their techniques, develop a stronger sense of rhythm, and deepen their musical understanding. They’ll also gain confidence in improvising and explore a variety of musical genres.",
      "With our expert guidance and the Gandharva Ukulele Method, we ensure your child is fully prepared and confident to tackle the challenges of the Grade 3 Ukulele Exam.",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 1 and Rockschool Grade 2",
      "Have experience playing for 16 - 24 months",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Sight Reading Improvisation & Interpretation",
      "Ear Tests",
      "General Musicianship Questions",
    ],
    outcomes: [
      "Play 6 songs in the book",
      "Be proficient in technical exercises",
      "Learn sight reading",
      "Do Melodic and rhythmic recall",
      "Receive an Internationally recognized certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-4": {
    title: "Rockschool Ukulele Grade 4",
    pic: "cute-cheerful-boy-is-playing-ukulele-guitar-music-room-joyful-learning-play-musical-instruments_97716-1725.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "This course is perfect for students aiming to excel in the Rockschool Ukulele Grade 4 exam. It focuses on enhancing existing skills while introducing new abilities such as improvisation, sight-reading, and improved ear training to recognize melodies.",
      "Students will also get the chance to play songs by iconic artists like Bob Marley, Bruno Mars, and Ed Sheeran. This engaging and enjoyable program is an excellent way for your child to advance their Ukulele skills and confidently prepare for the Grade 4 exam.",
      "Gandharva Ukulele Method principles are seamlessly integrated to ensure a comprehensive and enriching learning experience.",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 1 and Rockschool Grade 2",
      "Have experience playing for 16 - 24 months",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Sight Reading Improvisation & Interpretation",
      "Ear Tests",
      "General Musicianship Questions",
    ],
    outcomes: [
      "Play 6 songs in the book",
      "Be proficient in technical exercises",
      "Learn sight reading",
      "Do Melodic and rhythmic recall",
      "Receive an Internationally recognized certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "ukulele-method-book-3": {
    title: "Gandharva Ukulele Method Book 3",
    pic: "header-iUkulele.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "As your child progresses in their Ukulele journey, we’re thrilled to present the Gandharva Ukulele Advanced Course, designed to elevate their skills to new heights.",
      "This course is tailored for students who have been playing the Ukulele for over a year and have mastered the basics through to the intermediate level. Your child will explore advanced rhythms, learn various techniques to maintain timing and beats, and even experiment with composing their own melodies.",
      "With the guidance of our friendly and certified instructors, your child will enhance their playing techniques, improve rhythm and coordination, and deepen their overall musical understanding.",
    ],
    prerequisites: [
      "Must have sound knowledge of intermediate level ukulele techniques.",
    ],
    topics: [
      "Study of Harmony and Harmonization",
      "Composing your own songs",
      "Advanced Ukulele techniques",
      "Playing over changes and improvisation",
      "Complex Rhythms and Time Signatures",
      "Stylistic Study of Genres",
    ],
    outcomes: [
      "Understand the principles of harmony and harmonisation, and apply them to the ukulele.",
      "Compose original songs using ukulele chords, melody, and lyrics.",
      "Master techniques like flamenco strumming, tapping, and harmonics.",
      "Develop the ability to play over changes and improvise on the ukulele, using scales and chord progressions.",
      "Play complex rhythms and time signatures on the ukulele, including odd metres and syncopation.",
      "Study the unique stylistic elements of different genres, such as reggae, jazz, and folk, and apply them to ukulele playing.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-5": {
    title: "Rockschool Ukulele Grade 5",
    pic: "header-iUkulele.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Building on intermediate Ukulele courses, the Rockschool Ukulele Grade 5 course focuses on helping students develop expressive playing, a strong sense of stylistic awareness, and the ability to improvise confidently, accurately, and creatively.",
      "This course is designed to prepare students for the RSL Ukulele Grade 5 exam and includes songs from renowned artists like Metallica, Bon Jovi, Eva Cassidy, and more. With guidance from our certified instructors, your child will receive comprehensive support—from the application process to achieving their results.",
      "The program also incorporates technical exercises, supporting tests, and backing tracks to ensure students are fully prepared to excel in the RSL Grade 5 exam. The Gandharva Ukulele Method principles are seamlessly integrated for a holistic learning experience.",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 2 and RSL Grade 4",
      "Experience of 24-30 months of playing",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Supporting Tests",
      "Ensemble Backing Tracks",
      "Solo Arrangements",
    ],
    outcomes: [
      "Play 6 songs in the book",
      "Be proficient in technical exercises",
      "Learn sight reading",
      "Do Melodic and rhythmic recall",
      "Receive an Internationally recognized certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-6": {
    title: "Rockschool Ukulele Grade 6",
    pic: "header-iUkulele.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Elevate your child’s Ukulele skills with our RSL Ukulele Grade 6 course, designed for students who have successfully completed the RSL Grade 5 exam.",
      "In this course, we provide dedicated guidance and support as students refine their techniques, rhythms, coordination, and musical understanding. It’s more than just learning—it’s about embarking on a remarkable musical journey, and we’re here to make it unforgettable.",
      "Your child will not only enhance their skills but also dive into the art of improvisation, bringing their unique touch to the music. They’ll learn to play with emotion and discover the beauty of diverse musical styles.",
      "Our friendly and supportive teachers ensure your child masters six songs, including timeless pieces by The Beatles, Christina Perri, and music from Pirates of the Caribbean. This course doesn’t just prepare them for an exam—it nurtures a lifelong love for music.",
      "The Gandharva Ukulele Method ensures a comprehensive and enriching learning experience every step of the way.",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 2 and RSL Grade 4",
      "Experience of 3 years of playing",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Supporting Tests",
      "Ensemble Backing Tracks",
      "Solo Arrangements",
    ],
    outcomes: [
      "Identify notes on the instrument",
      "Play basic rhythms and pieces with steady pulse and flow",
      "Learn staff notations and how to read sheet music effectively",
      "Master basic touch controls",
      "Use different rhythm techniques",
      "Harmonize two-note and four-note harmonies with the use of ties and dotted rhythms.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-7": {
    title: "Rockschool Ukulele Grade 7",
    pic: "header-iUkulele.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Does your child have what it takes to be a Ukulele rock star? If they’ve successfully cleared the Grade 6 exam and have been playing for 4-5 years, it’s time for the next big step—the RSL Ukulele Grade 7 course.",
      "This course is designed for students who have mastered the skills up to Grade 6, including secure technique, expressive playing, rhythmic complexity, fluency, and a deep understanding of music.",
      "Students will learn to improvise with confidence and individuality while showcasing strong musical form and structure. Our certified instructors provide expert guidance, technical exercises, supporting tests, and in-depth preparation for the songs featured in the grade, ensuring success in the RSL Ukulele Grade 7 exam.",
      "With the Gandharva Ukulele Method, your child will gain the skills and confidence to shine as a true musician.",
    ],
    prerequisites: [
      "Must have completed Gandharva Method Book 2 and RSL Grade 4",
      "Experience of 3 years of playing",
    ],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Supporting Tests",
      "Ensemble Backing Tracks",
      "Solo Arrangements",
    ],
    outcomes: [
      "Perform a range of ukulele pieces with confidence, expression, and accuracy.",
      "Develop technical proficiency on the ukulele through a variety of exercises and drills.",
      "Prepare for supporting tests such as scales, sight-reading, and aural training and demonstrate a well-rounded understanding of music theory.",
      "Play as part of an ensemble using backing tracks, demonstrating the ability to keep in time and listen to other musicians.",
      "Create solo arrangements of songs, demonstrating the ability to interpret and adapt existing music to the ukulele.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-ukulele-grade-8": {
    title: "Rockschool Ukulele Grade 8",
    pic: "header-iUkulele.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Grade 8 Ukulele exam is the ultimate milestone for aspiring professional Ukulele players, marking the highest level on the RSL Ukulele exam board.",
      "This course is designed for students who have mastered the skills required for Grade 7. It focuses on refining advanced techniques, expressive playing, rhythmic intricacy, fluency, coordination, and musical understanding.",
      "Our supportive and experienced instructors guide students to achieve advanced-level improvisation with confidence and personality. The course emphasizes developing a deep stylistic conviction, distinctive musicality, and a unique artistic identity, ensuring they excel in the RSL Ukulele Grade 8 exam.",
      ,
      "Through the principles of the Gandharva Ukulele Method, we aim to help your child reach their full potential and fulfill their dream of becoming a professional Ukulele player.",
    ],
    prerequisites: ["Minimum 5 years of experience or cleared Grade 7"],
    topics: [
      "Performance Pieces",
      "Technical Exercises",
      "Supporting Tests",
      "Ensemble Backing Tracks",
      "Solo Arrangements",
    ],
    outcomes: [
      "Play 6 advanced level songs",
      "Understand scalar modes and theory",
      "Study concepts of compound arpeggios",
      "Study some Blues, Jazz, Soul, Rock and Pop genres in depth",
      "Receive an Internationally recognized Advanced certificate",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-flute-foundation": {
    title: "Gandharva Flute Foundation",
    pic: "closeup-students.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Ready to inspire your child’s musical journey with the flute? Welcome to Gandharva’s Flute Foundation Course, designed to nurture budding musicians and bring their musical dreams to life!",
      "In this program, your child will learn the fundamentals of playing the flute, delve into Sargam, gain a foundational understanding of Taal and Alankar, explore the beauty of Ragas, and dive deeper into the intricacies of Raga Durga and Raga Jhaptaal.",
    ],
    prerequisites: [
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Flute, so that they can practice and hone their skills",
    ],
    topics: [
      "Basic elements of flute",
      "Basic Sargam",
      "Taal and Alankar",
      "Raga Knowledge",
      "Raga Durga and Raga Jhaptaal",
    ],
    outcomes: [
      "Develop a solid foundation in flute playing, including proper hand positioning, breath control, and embouchure techniques.",
      "Learn to play basic Sargam (Indian solfege) on the flute.",
      "Understand the fundamentals of Taal (rhythm) and Alankar (ornamentation) and apply them to flute playing.",
      "Develop knowledge of different Ragas (melodic frameworks) and apply them to flute playing.",
      "Learn to play Raga Durga and Raga Jhaptaal on the flute, demonstrating an understanding of the unique characteristics and nuances of each Raga.",
      "Develop proficiency in playing with expression and emotion, and applying dynamics and articulations to enhance the musicality of flute playing.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-flute-method-book-1": {
    title: "Gandharva Flute Method Book 1",
    pic: "quotcloseup-students.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Looking for an engaging way to inspire your child’s musical development? Discover our Flute Method Book 1 course!",
      "Specifically designed for beginners, this course provides a strong foundation in essential flute-playing techniques, coordination, and a meaningful connection with music.",
      "Your child will master proper breath control and finger placement, all while cultivating a genuine love for music. Beyond notes and scales, they’ll explore a variety of ragas, helping their musical skills and enthusiasm grow to new heights.",
    ],
    prerequisites: [
      "Student should have sound understanding of the Foundation level Flute techniques",
    ],
    topics: [
      "Raga Yaman",
      "Raga Kafi",
      "Raga Vrindavani Sarang",
      "Raga Desh",
      "Practice of previous ragas",
    ],
    outcomes: [
      "Develop basic skills for playing the flute, including proper breath control, embouchure technique, and fingering.",
      "Understand the basics of Indian classical music and apply them to flute playing.",
      "Develop knowledge of Raga Yaman, Raga Kafi, Raga Vrindavani Sarang, and Raga Desh, and learn to play them on the flute.",
      "Practice and reinforce previous ragas to further develop flute playing skills.",
      "Develop the ability to play with good tone, rhythm, and pitch on the flute, and to perform with confidence and expression.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-flute-method-book-2": {
    title: "Gandharva Flute Method Book 2",
    pic: "flute.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Gandharva’s Flute Method Book 2 is the perfect progression for young flutists ready to unlock their full musical potential.",
      "This course focuses on honing advanced techniques, enabling your child to master tone control, dynamics, and articulation with precision. It’s not just about learning music—it’s about cultivating a lasting passion for it.",
      "By building on the strong foundation of Indian classical music, students deepen their understanding and bring it to life through flute playing, blending tradition with creativity. Additionally, this course equips them for performance opportunities and collaborations with other musicians, paving the way for exciting musical growth and expression.",
    ],
    prerequisites: [
      "Should have developed good Flute playing skills and have sound knowledge of beginner level techniques.",
    ],
    topics: [
      "Raga Bhimpalasi",
      "Raga Bihag",
      "Raga Bhairav",
      "Raga Bageshwari",
      "Practice of previous ragas",
    ],
    outcomes: [
      "Develop advanced techniques for playing the flute, including greater control over tone, dynamics and articulation.",
      "Further develop knowledge of Indian classical music and its application to flute playing",
      "Learn to play Raga Bhimpalasi, Raga Bihag, Raga Bhairav and Raga Bageshwari on the flute, demonstrating an understanding of the unique characteristics and nuances of each Raga.",
      "Practice and reinforce previous ragas to enhance proficiency and musicality on the flute.",
      "Develop the ability to improvise and play variations on a Raga, showcasing creativity and individuality in flute playing.",
      "Prepare for more advanced performance opportunities and collaborations with other musicians.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "gandharva-flute-method-book-3": {
    title: "Gandharva Flute Method Book 3",
    pic: "quotcloseup-students-face-showing-concentrationquot_1324785-123687.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Take your child’s musical journey to the next level with Gandharva’s Flute Method Book 2! This course is a vital step toward shaping their path as a professional flute player.",
      "In this program, your child will master advanced techniques, speed, and precision, empowering them to create mesmerizing melodies that leave a lasting impression.",
      "With the guidance of our supportive instructors, your child will explore and innovate, channeling their creativity to craft unique musical stories rooted in Indian classical music.",
      "Through collaborative performances and teamwork with other musicians, they’ll build essential leadership, communication, and interpersonal skills. This course also prepares them for advanced performance opportunities and competitions, helping them shine as confident musical trailblazers.",
    ],
    prerequisites: ["Sound knowledge of intermediate level Flute techniques"],
    topics: [
      "Raga Patdeep",
      "Raga Tilang",
      "Raga Marwa",
      "Raga Tilak Kamod",
      "Raga Malkosh",
      "Raga Multani",
      "Practice of previous ragas",
    ],
    outcomes: [
      "Develop advanced skills for playing the flute, including virtuosic technique, speed, and accuracy.",
      "Explore and experiment with different approaches to Indian classical music on the flute, showcasing creativity and innovation.",
      "Learn to play Raga Patdeep, Raga Tilang, Raga Marwa, Raga Tilak Kamod, Raga Malkosh, and Raga Multani on the flute, demonstrating mastery of each Raga's unique characteristics and nuances.",
      "Practice and reinforce previous ragas to maintain and enhance proficiency on the flute.",
      "Understand the intricacies of complex rhythmic structures and time signatures in Indian classical music, and apply them to flute playing.",
      "Develop the ability to collaborate and perform with other musicians, demonstrating leadership, communication, and teamwork skills.",
      "Prepare for advanced performance opportunities and competitions in Indian classical music.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-tabla-foundation": {
    title: "Gandharva Tabla Foundation",
    pic: "f975361466.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Searching for an enjoyable and interactive way to introduce your child to the world of music? Our Tabla Foundation Course is the perfect choice! Designed for beginners aged 8 and above, this course lays a strong foundation in tabla playing and musical understanding.",
      "Guided by our experienced and friendly instructors, your child will develop the essential skills to grow into a confident and capable musician. Enroll today and watch their musical aspirations soar!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Tabla, so that they can practice and hone their skills",
    ],
    topics: [
      "Introduction to Tabla",
      "Posture and fingers",
      "Hand positioning",
      "Finger techniques",
      "Introduction to Sam, Taali, Khaali and Laya",
      "Knowledge of basic rhythm patterns",
    ],
    outcomes: [
      "Play basic taals/rhythms",
      "Learn correct hand placement and finger positions",
      "Recitation of bols",
      "Demonstrate Basic Kayda and finger patterns",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-tabla-method-book-1": {
    title: "Gandharva Tabla Method Book 1",
    pic: "57ae5f3dfd.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has been learning the Tabla for over six months and has mastered the foundational level, the Gandharva Tabla Method Book 1 course is the ideal next step.",
      "In this program, they’ll delve into more complex rhythms, enhance their coordination, and deepen their musical understanding. They’ll explore contemporary and folk rhythms while honing their ability to synchronize notes across both tablas, enabling them to perform a wide range of pieces.",
      "This course is the perfect way to elevate your child’s Tabla skills and help them reach new heights in their musical journey!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music and learning the instrument + willingness to practice regularly",
      "Student must have their own Tabla, so that they can practice and hone their skills",
    ],
    topics: [
      "Basic Kaydas in Teentaal",
      "Posture and fingers",
      "Concept of Tihas and basic application",
      "Concept of Dugun, Tigun",
      "Basic Dadra, Keherwa Cycles and Recitation",
      "History of Tabla and life of famous Tabla players",
    ],
    outcomes: [
      "Demonstrate 10 basic kayda’s in Teentaal",
      "Recite rhythms in Digun and Tigun",
      "Play basic rhythms in Dadra or Keherwa",
      "Play a few compositions along with Lehera",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-tabla-method-book-2": {
    title: "Gandharva Tabla Method Book 2",
    pic: "e527039699.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking to help your child advance their musical journey? Gandharva Tabla Method Book 2 is the ideal choice for young musicians with over 18 months of Tabla training, ready to master intermediate techniques and exercises.",
      "This course focuses on enhancing technique, rhythm, coordination, and musical comprehension, equipping your child with the essential skills to grow as a confident and skilled musician. They’ll explore new finger movements, learn various Taals, and develop repertoire-building strategies—all while enjoying a fun and engaging learning experience with our expert instructors.",
    ],
    prerequisites: [
      "Should have developed good Tabla playing skills and have sound knowledge of beginner level techniques.",
    ],
    topics: [
      "Taal Keherwa",
      "Posture and fingers",
      "Taal Jhaptaal",
      "Taal Ektaal",
      "Teen Taal Kayda part 2",
      "Dynamics and Articulation Study",
      "Study of Different Tabla Gharanas - Delhi, Ajrada",
    ],
    outcomes: [
      "Student will be able to play folk Taals and patterns in it",
      "Students will be able to play Jhaptaal and its variations",
      "Students will be able to demonstrate Intermediate level Kayda’s in Teentaal",
      "Student will learn compositions and asethetics of Delhi and Ajrada Styles of Playing",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "gandharva-tabla-method-book-3": {
    title: "Gandharva Tabla Method Book 3",
    pic: "e5d20ce245.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Is your child passionate about playing the Tabla and ready for a new challenge? Look no further! Gandharva’s Advanced Tabla Course provides a thrilling opportunity to elevate their skills to the next level.",
      "Led by experienced instructors, this course focuses on mastering advanced techniques, tackling challenging repertoire, and developing solo performance skills. Your child will build confidence, refine their artistry, and learn to express themselves through music in front of an audience, taking their love for the Tabla to even greater heights.",
    ],
    prerequisites: [
      "Should have developed good Tabla playing skills and have sound knowledge of beginner level techniques.",
    ],
    topics: [
      "Teen Taal Kaydas part 3",
      "Posture and fingers",
      "Teen Taal Mukda and Tukda and Chakdhar",
      "Study of Roopak and Jhaptaal",
      "Knowledge of Accompaniment",
      "Solo Performing Skills",
      "Study of Different Gharanas - Lucknow, Farrukhabad, Punjab",
    ],
    outcomes: [
      "Improvise over a Lehra",
      "Learn compositions from Lucknow, Farukkabad and Punjab Gharana",
      "Play a Solo Tabla Arrangement (20-30min)",
      "Demonstrate Advanced level Compositions",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-western-vocals-foundation": {
    title: "Gandharva Western Vocals Foundation",
    pic: "woman-passionately-sings-into-microphone-while-standing-stage_444198-55225.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Western Vocals Foundation serves as the starting point for your child’s musical journey, focusing on developing a strong understanding of their voice through proper techniques.",
      "This program offers a comprehensive approach to music education, including effective singing skills and essential music theory concepts. With engaging activities like games and fun exercises, our experienced and approachable instructors create an interactive and enjoyable learning experience.",
    ],
    prerequisites: [
      "Has a dedication and interest towards singing",
      "Has the time to practise",
    ],
    topics: [
      "Understanding Voice as an Instrument",
      "Posture and fingers",
      "Singing with an effective posture",
      "Breath management: Diaphragmatic breathing Vs Chest breathing",
      "How to breathe in a song",
      "Where to breathe in a song",
      "Singing with a supported voice",
      "Importance of Physical warmup (body and face)",
      "Practising Vocal Warm Up-Lip trills and humming",
      "Learning spoken rhythms",
      "Solfa singing using sheet music",
      "Introduction to scales, tonic chord and Arpeggio",
      "Basic terms and definitions used in Western Music",
    ],
    outcomes: [
      "Sing 10+ melodies across various genres",
      "Perform with proper posture and consistent breath flow",
      "Identify durations of notes, which in turn will help them enhance their sense of Pulse",
      "Perform physical and vocal exercises that are essential for healthy singing",
      "Maintain uniform breath flow on sustained notes",
      "Perform solfa exercises",
      "Understand basic music terms",
      "Perform rhythm exercises with accuracy",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-western-vocals-method-book-1": {
    title: "Gandharva Western Vocals Method Book 1",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Does your child have a passion for singing? Gandharva Western Vocals Method Book 1 is the ideal choice! As the second course in the series, it provides a step-by-step approach to mastering Western Contemporary Vocals.",
      "Through this course, students gain structured vocal training and learn to sing melodies from various genres. Our skilled instructors guide them in developing effective practice routines, ensuring they sing with ease, understand tones and semitones, and much more!",
    ],
    prerequisites: [
      "Understand basic sheet music such as note position on Treble and Bass Clef, Note Values, Basic terms in music (Beat Rhythm Melody), Major scales, Tonic Chord, Major scale Arpeggio etc.",
      "Demonstrate proper posture",
      "Perform diaphragmatic breathing exercises comfortably",
      "Breathe effectively before phrases using quick breath",
      "Make use of their soft palate in warmup exercises",
      "Identify solfa patterns in a major scale upto a 6th note",
      "Be comfortable using a metronome for all exercises",
      "Perform spoken rhythms using half note, quarter note, eighth note, sixteenth note and quarter note rest",
    ],
    topics: [
      "Throat tension and Singing with a Relaxed Throat",
      "Tones and Semitones",
      "Revision of rhythms learned in Book 1",
      "Revision of 5-tone and Pentatonic melodies",
      "Singing with a neutral jaw position",
      "Introduction to Rests",
      "Spoken Rhythms: Dotted Quarter Notes (3/4 + 4/4)",
      "Solfa singing: Major scale using slurs and dotted crotchets, 3/4 mixed",
      "Introduction to Vocal Registration",
      "Voice Types - Finding your Vocal Range",
      "Pentatonic Scale, Anacrusis",
      "Spoken Rhythms: 8th note rest",
      "Solfa singing: Major scales using leaps of 4th. Use ties and 8th note rests",
      "Slides, Transition and Blending",
      "Intervals",
      "Spoken Rhythms: ti ki te",
      "Solfa: Minor Pentatonic melodies",
      "Practice planning and structure",
      "Primary Triads in Major Scales",
      "Spoken Rhythms: ti ke (dotted 8th and 16th)",
      "Solfa: 8-bar melodies highlighting primary chords and sequences",
    ],
    outcomes: [
      "Sing 10+ melodies across various genres",
      "Sing with a relaxed throat",
      "Comprehend Tones and Semitones",
      "Perform various vocal exercises given in the book",
      "Sing with a neutral jaw position",
      "Perform solfa exercises",
      "Perform slides and sirens for vocal warmup",
      "Understand various terms used in sheet music such as Notes, ties, rests, dotted notes, intervals, scales, anacrusis etc.",
      "Perform rhythm exercises with accuracy",
      "Discover their vocal range",
      "Understand vocal registers",
      "Create their personal practice schedules",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-western-vocals-debut": {
    title: "Rockschool Western Vocals Debut",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If you’re looking for internationally recognized certifications for your child’s singing abilities, Rockschool Vocals Debut is the perfect choice! Our instructors equip your child with the technical exercises and spoken rhythms needed to excel in the Debut certification exam.",
      "Moreover, our certified experts guide you every step of the way—from exam registration to performance video submission, all the way to receiving the certificate.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 15 minutes (approx.)",
      "Performance Certificate - 12 minutes (approx.)",
    ],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "rockschool-western-vocals-grade-1": {
    title: "Rockschool Western Vocals Grade 1",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has successfully completed their Vocals Debut exam, it’s time to get them ready for the Rockschool Vocals Grade 1 certification with this course.",
      "Designed for students who have a solid foundation in vocal performance, this course focuses on developing essential skills such as major scales, arpeggios, and other technical techniques required to excel in the Grade 1 exam.",
      "While using a microphone is optional, students are welcome to incorporate it into their practice if they feel it enhances their performance.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: [
      "Dynamics, lyrics, rhythms and short phrases",
      "Major scale and arpeggio",
      "Small major intervals and spoken rhythms",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-western-vocals-grade-initial": {
    title: "Trinity Western Vocals Grade Initial",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If you want your child to earn certification from one of the oldest and most prestigious music exam boards, the Trinity Vocals Grade Initial is the perfect starting point.",
      "This exam assesses foundational skills, techniques, coordination, and musical comprehension. Our experienced instructors provide comprehensive preparation through technical exercises and supporting tests.",
      "From registration to video submission and certificate acquisition, our teachers guide you through the entire process, allowing your child to focus on what truly matters—becoming a skilled and confident singer.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 11 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "trinity-western-vocals-grade-1": {
    title: "Trinity Western Vocals Grade 1",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has successfully completed their Trinity Vocals Grade Initial certification, it’s time to begin preparing for Grade 1. A Trinity certification not only boosts your child’s confidence in their musical talents but can also enhance their college applications and career prospects.",
      "The Trinity Vocals Grade 1 course helps your child develop essential skills and techniques such as counting, pick-ups, belting, and intervals. They will also learn to perform a set list of three songs and showcase their playback or improvisation abilities for the Grade 1 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-western-vocals-method-book-2": {
    title: "Gandharva Western Vocals Method Book 2",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Master Blues, Rock, and Pop vocals from the comfort of your home with Gandharva Method Book 2. This course lays a strong foundation for your child’s musical growth by integrating both theoretical knowledge and practical skills.",
      "Designed to nurture versatile performers, the program introduces students to various genres such as Rock, Blues, and Pop. This prepares them to apply their skills in studio sessions and live performances. A deep understanding of these styles not only supports independent music creation but also opens doors to commercial music opportunities.",
    ],
    prerequisites: [
      "Must have completed Gandharva Western Vocals Method Book 1",
    ],
    topics: [
      "Breath Management",
      "Incorporating Dynamics",
      "Develop Listening skills",
      "Understanding simple time signature",
      "Understanding Pentatonic scale, and Major/ Minor chord formation",
      "Warm-up techniques",
    ],

    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-2": {
    title: "Rockschool Western Vocals Grade 2",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Rockschool Vocals Grade 2 program is designed for intermediate-level singers who have a strong foundation in vocal performance.",
      "In this course, our instructors guide students through an exciting repertoire featuring artists like Harry Styles, Ed Sheeran, Childish Gambino, Ella Fitzgerald, and more.",
      "Students build confidence as contemporary vocalists by practicing technical exercises and completing supporting tests. With the help of our experienced professionals, you’ll be well-prepared to excel in the Grade 2 certification exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 25 minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: [
      "Dynamics, lyrics, rhythms and short phrases",
      "Major scale and arpeggio",
      "Small major intervals and spoken rhythms",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-3": {
    title: "Rockschool Western Vocals Grade 3",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Does your child aspire to build a career as a professional vocalist? The Vocals Grade 3 course is designed to enhance their understanding of improvisation while focusing on key technical skills such as perfect intervals, bends, small leaps, and arpeggios.",
      "For the certification exam, your child will showcase their talent through either 3 or 5 performances, depending on their chosen exam format.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 30 minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: [
      "Dynamics, lyrics, rhythms and short phrases",
      "Major scale and arpeggio",
      "Small major intervals and spoken rhythms",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-4": {
    title: "Rockschool Western Vocals Grade 4",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Does your child have the potential to become a vocalist? The Rockschool Western Vocals Grade 4 program is designed to nurture their talent. This course focuses on teaching students how to harmonize and perform backing vocals effectively.",
      "They’ll enhance their ability to transition smoothly between vocal registers, deepen their understanding of music theory, and showcase their progress through a variety of performance pieces during the exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 30 minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: [
      "2-­part backing vocals, slides, trilldowns, harmonising in 3rds, longer phrases, improvisation and development, greater use of head voice, control of the chest voice and transitions between the registers",
      "The Major Pentatonic scale, the major arpeggio and a major ascending arpeggio with dominant 7 descent",
      "Large major intervals, diction, articulation and microphone technique",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-2": {
    title: "Trinity Western Vocals Grade 2",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "When you’re confident in your child’s potential, it’s time to refine their techniques and polish their artistry. Our expert instructors are here to support their musical growth. In the Trinity Vocals Grade 2 program, students focus on mastering the fundamentals of professional vocal performance, such as tone, dynamics, chest voice, and precise interval control.",
      "The course helps students build a versatile skill set, including phrasing, interval training, wide leaps, and expressive interpretation. Additionally, our instructors guide students in perfecting three songs for the exam, showcasing their playback or improvisation abilities.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: [
      "Performance Pieces",
      ,
      "Technical Exercises",
      "Supporting Tests",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-3": {
    title: "Trinity Western Vocals Grade 3",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Trinity Western Vocals Grade 3 program is designed for students who have completed Grade 2 and are eager to advance their skills. This course introduces elements of improvisation and focuses on essential techniques like perfect intervals, bends, small leaps, and arpeggios.",
      "Students also work with our experienced instructors to build and showcase a variety of abilities, including powerful vocal control across a broad range, precise bends, accurate pitching, and stylistic versatility. This comprehensive preparation ensures they approach the Trinity Vocals Grade 3 exam with confidence.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 13 minutes (approx.)"],
    features: [
      "Performance Pieces",
      ,
      "Technical Exercises",
      "Supporting Tests",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-4": {
    title: "Trinity Western Vocals Grade 4",
    pic: "beautiful-blonde-girl-emotionally-singing-song-recording-studio-with-professional-microphone-headphones-creates-new-track-album-vocal-artist-pink-blue-neon-light-closeup-face_154092-14018.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The final step in the intermediate level before advancing to the next stage, the Vocals Grade 4 course emphasizes harmonizing and performing backing vocals. Students focus on refining techniques such as breathing, diminuendos, ornamented melodic lines, and dynamics to elevate their vocal skills.",
      "This beginner-friendly course ensures a strong foundation, while our experienced and approachable instructors guide students through each stage of their musical journey with care and expertise.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 18 minutes (approx.)"],
    features: [
      "Performance Pieces",
      ,
      "Technical Exercises",
      "Supporting Tests",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "gandharva-western-vocals-method-book-3": {
    title: "Gandharva Western Vocals Book 3",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Take your child’s Western singing to the next level with the Advanced Level course! This program serves as a gateway to higher mastery, focusing on tone placement, harmonization, voice modulation, and singing across various vocal registers.",
      "Using Gandharva Method Book 3, students refine the skills developed at the intermediate level, building a solid foundation for advanced techniques. Guided by our skilled professionals, they’ll gain the expertise needed to pursue their dream of becoming outstanding contemporary vocalists.",
    ],
    prerequisites: [
      "Must have completed Gandharva Western Vocals Method Book 2",
    ],
    topics: [
      "Improvisation/ Voice Modulation",
      "Singing in different Vocal registers",
      "Harmonisation",
      "Tone Placement",
      "Resonance",
      "Flow Phonation",
      "Understanding Chromatic scales, 7th and diminished chord formations",
    ],

    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-5": {
    title: "Rockschool Western Vocals Grade 5",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "If you’ve completed the RSL Grade 4 certification and Gandharva Method Book 3, it’s time to gear up for the RSL Grade 5 exam.",
      "This course dives into advanced vocal techniques like melismas, slides, trills, and scoops, while also helping students refine their microphone skills. With guidance from our expert instructors, students apply these techniques to a range of performance pieces, mastering songs by artists such as Adele, Sam Smith, Fleetwood Mac, and more featured in the RSL Grade 5 syllabus.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 30 minutes (approx.)",
      "Performance Certificate - 25 minutes (approx.)",
    ],
    features: [
      "2-­part backing vocals, slides, trilldowns, harmonising in 3rds, longer phrases, improvisation and development, greater use of head voice, control of the chest voice and transitions between the registers",
      "The Major Pentatonic scale, the major arpeggio and a major ascending arpeggio with dominant 7 descent",
      "Large major intervals, diction, articulation and microphone technique",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-6": {
    title: "Rockschool Western Vocals Grade 6",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Vocals Grade 6 course challenges advanced-level students to push their vocal abilities further by mastering wide major and minor intervals, exploring new scales, enhancing dynamics, and refining register transitions.",
      "For the exam, students will perform a demanding selection of extended pieces from renowned artists like Beyoncé, Ariana Grande, The Weeknd, and more. Our expert instructors work closely with students to perfect their chosen performance pieces, ensuring they excel in the Grade 6 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 36 minutes (approx.)",
      "Performance Certificate - 30 minutes (approx.)",
    ],
    features: [
      "3-­part backing vocals, slides, trilldowns, harmonising in 3rds, longer phrases, improvisation and development, greater use of head voice, control of the chest voice and transitions between the registers",
      "The Major Pentatonic scale, the major arpeggio and a major ascending arpeggio with dominant 7 descent",
      "Large major intervals, diction, articulation and microphone technique",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-7": {
    title: "Rockschool Western Vocals Grade 7",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Reaching Vocals Grade 7 marks a significant step toward becoming a professional vocalist. This course focuses on refining advanced stylistic techniques, mastering sustained note bends, and tackling large intervallic leaps with precision.",
      "For the Grade 7 certification exam, students will prepare an array of extended performance pieces by artists such as Hozier, Sarah Vaughan, Jeff Buckley, and others featured in the Rockschool syllabus. With the guidance of our skilled instructors, students will perfect their chosen songs and elevate their vocal artistry.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 36 minutes (approx.)",
      "Performance Certificate - 30 minutes (approx.)",
    ],
    features: [
      "3-­part backing vocals, slides, trilldowns, harmonising in 3rds, longer phrases, improvisation and development, greater use of head voice, control of the chest voice and transitions between the registers",
      "The Major Pentatonic scale, the major arpeggio and a major ascending arpeggio with dominant 7 descent",
      "Large major intervals, diction, articulation and microphone technique",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "rockschool-western-vocals-grade-8": {
    title: "Rockschool Western Vocals Grade 8",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Completing Vocals Grade 8 signifies your child is ready to perform on any stage or in any professional music setting. To achieve this milestone, they must showcase advanced phrasing, an extended vocal range, in-depth music theory knowledge, and flawless performances during the exam.",
      "In this course, our expert instructors guide students through mastering the chromatic scale, register flips, vibrato, and other essential techniques. Additionally, students perfect the performance pieces outlined in the RSL Grade 8 syllabus, ensuring they are fully prepared to excel in the examination.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: [
      "Grade Exam - 36 minutes (approx.)",
      "Performance Certificate - 30 minutes (approx.)",
    ],
    features: [
      "3-­part backing vocals, slides, trilldowns, harmonising in 3rds, longer phrases, improvisation and development, greater use of head voice, control of the chest voice and transitions between the registers",
      "The Major Pentatonic scale, the major arpeggio and a major ascending arpeggio with dominant 7 descent",
      "Large major intervals, diction, articulation and microphone technique",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-5": {
    title: "Trinity Western Vocals Grade 5",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "After completing the Intermediate Trinity course, your child is ready to progress to the advanced level with Trinity Western Vocals Grade 5. This program introduces advanced techniques such as vocal agility, rap, syncopation, and ornamentation.",
      "Students further enhance their microphone skills, coordination, and overall musical understanding. With guidance from our certified expert instructors, they prepare a series of technically polished performances to excel in their Grade 5 exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 18 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-6": {
    title: "Trinity Western Vocals Grade 6",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "If your child envisions a career in the music industry, this course is essential for them! In Trinity Vocals Grade 6, students challenge their vocal abilities by mastering wide major and minor intervals, new scales, dynamics, and register shifts.",
      "Our instructors guide students through advanced techniques such as blue notes, emotional expression, melisma, and ad-lib fills, ensuring they’re fully prepared for the Trinity Grade 6 exam. Additionally, students work on extended performance pieces to showcase their skills in the exam.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 18 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-7": {
    title: "Trinity Western Vocals Grade 7",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "This course will help your child gain the recognition they deserve in the creative industry! Reaching Vocals Grade 7 puts them on the path to becoming a professional vocalist. In this program, our instructors guide students to master advanced techniques, such as sustained note bends, large interval leaps, and stylistic precision.",
      "Students also prepare a selection of extended performance pieces for the exam while developing key skills, including rhythmic complexity, tonal diversity, staccato phrasing, and head voice. This course ensures they’re fully equipped for the Trinity Vocals Grade 7 certification.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 18 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "trinity-western-vocals-grade-8": {
    title: "Trinity Western Vocals Grade 8",
    pic: "photo-portrait-woman-holding-microphone-hands-isolated-pastel-pink-colored-background_136403-14027.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Do you want your child to thrive as a vocalist in the music industry? The Trinity Vocals Grade 8 program is the ideal course to help them achieve their dreams! This comprehensive program builds the confidence needed to excel on any stage or in any recording session within the popular music world.",
      "To truly shine, young vocalists must first hone their abilities by mastering advanced phrasing, expanding their vocal range, and developing a deep understanding of music theory. This course focuses on refining essential techniques such as blues inflections, vocal falls, grace notes, vocal agility, and improvisation. With expert guidance, students prepare performance pieces for the Grade 8 exam, setting them up for success both in the exam and in their future musical endeavors.",
    ],
    exams: ["Grade Exam", "Performance Certificate"],
    examDuration: ["Grade Exam - 18 minutes (approx.)"],
    features: ["Performance Pieces", "Technical Exercises", "Supporting Tests"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-carnatic-vocals-foundation": {
    title: "Gandharva Carnatic Vocals Foundation",
    pic: "vocals-8.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Welcome to our Foundation Level Carnatic Vocals Course, designed to introduce your child to the fundamental concepts of Carnatic music, including shruthi, swaras, swarasthanams, and more.",
      "Tailored for beginners aged 8 and above, this course emphasizes building a solid musical foundation. Guided by our experienced and approachable instructors, your child will develop the skills and confidence needed to excel as a Carnatic vocalist while deepening their connection to culture, tradition, and heritage through the art of music.",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Interest in music + willingness to practice regularly",
    ],
    topics: [
      "A brief introduction to Carnatic music and Saint Purandara Dasa",
      "Introduction to Basic concepts of Shruthi, Swaras, Thalam, Kaalam, and Sthayis",
      "Sarali Varase",
      "Janti Varase",
      "Tharasthayi Varase",
      "Mandrasthayi Varase",
      "Carnatic Light + Classical Songs",
    ],
    outcomes: [
      "Sound knowledge of the history of Carnatic music, Saint Purandara Dasa, and basic concepts like Shruthi, Swara, Thaala, Kaala, etc",
      "Become familiar with all seven notes / swaras and should be able to sing them in correct Swarasthanas/position",
      "Sing all 4 Varase in all 3 speeds with thaala",
      "Will be able to comfortably sing higher and lower octave notes.",
      "Sing 5 or more Carnatic light music songs",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "carnatic-vocals-method-book-1": {
    title: "Gandharva Carnatic Vocals Method Book 1",
    pic: "vocals-7.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "If your child has been learning Carnatic Vocals for over six months and has successfully mastered the basics at the foundation level, the Gandharva Carnatic Vocals Method Book 1 course is the ideal next step. This program introduces them to Carnatic swara pattern exercises designed to enhance voice training.",
      "They will explore Alankarams in seven talas, Geethams in various ragas, Nottuswarams, and more. The course focuses on solidifying their understanding of Carnatic Vocals while highlighting the cultural significance of this classical art form in Indian heritage. It’s the perfect way for your child to elevate their vocal abilities and deepen their appreciation of Carnatic Music!",
    ],
    prerequisites: [
      "Ideal age of student - 8 years or above",
      "Should have sound knowledge of skills covered in Gandharva Carnatic Vocals Foundation Course",
    ],
    topics: [
      "History of Trinity of Carnatic Music",
      "Differences in Carnatic & Hindustani music",
      "Basic concepts of Nada, Swara and Swarasthanas, Suladi Saptha Thalas",
      "7 Alankarams",
      "Geethams",
      "2 Nottuswaras",
      "Basic Introduction to 8 simple Ragams",
      "Swara pattern exercises for voice culture",
    ],
    outcomes: [
      "Understand the cultural significance of Carnatic music",
      "Learn fundamental concepts such as Nada, Swarasthanas, Suladi Saptha Thalas",
      "Basic understanding of 8 ragas and their raga lakshanas",
      "Flawless grip on swarasthanas and tala",
      "Sing all 11 geethams in swara and sahithyam",
      "Sing both the Nottuswarams with correct swarasthanas and Tala.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "bspm-level-1-prarambhik": {
    title: "BSPM Level 1 Prarambhik",
    pic: "vocals-7.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Embark on an exciting journey with our Level 1 Prarambhik course, specially designed to prepare beginner Carnatic Vocal students for the BSPM Prarambhik certification exam.",
      "This course introduces the fundamentals of Carnatic Music through a clear and structured approach, supported by comprehensive study materials. With guidance from our skilled instructors, your child will learn to find their pitch, enhance breath and voice control, refine their vocal technique, and build confidence. They’ll also have the opportunity to showcase their talent through live performances!",
      "Additionally, we ensure students are well-prepared for success on their musical journey and the BSPM Prarambhik certification exam. From the application process to receiving results, our certified instructors provide full support, allowing students to focus on learning and growth.",
    ],
    prerequisites: [
      "A good interest in any genre of music or 3-4 months of Carnatic singing experience.",
    ],
    topics: [
      "Introduction to Saptaswaras, Aditala, Trinities in Carnatic Music",
      "The basic terminologies in Carnatic Music",
      "Sarali Varisais",
      "Janti Varisais",
      "Tharasthayi Varisais",
      "Dattu Varisais",
      "Alankaras",
    ],
    outcomes: [
      "Have a good understanding of the basic terms, sruthi, kala, tala etc.",
      "Demonstrate all Sarali varisais, Dattu varisais and Tharasthayi varisais in 3 speeds with talam.",
      "Demonstrate the Janta Varisais comfortably in 2 speeds with talam.",
      "Understand sapta talas and sing Alankaras in the 1st speed with talam.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "carnatic-vocals-method-book-2": {
    title: "Gandharva Carnatic Vocals Method Book 2",
    pic: "vocals-6.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking to help your child elevate their singing abilities? The Gandharva Carnatic Vocals Method Book 2 is an excellent choice for young vocalists with over 18 months of Carnatic music training, ready to advance to intermediate-level techniques and exercises.",
      "This course emphasizes refining technique and deepening musical understanding, equipping your child with the essential skills to become a confident and proficient singer. They’ll explore key elements of Carnatic music, including Varnams—an essential foundational form—and Krithis, the pinnacle of musical expression. With the guidance of our supportive and experienced teachers, your child will enjoy learning valuable skills while making meaningful progress in their musical journey.",
    ],
    prerequisites: [
      "Should have developed the skills covered in Gandharva Carnatic Vocals Method 1 Course",
    ],
    topics: [
      "Famous composers in Carnatic Music",
      "Introduction to 72 Melakartas and Janaka & Janya ragas",
    ],
    outcomes: [
      "Learn about famous composers in Carnatic music",
      "Understand the characteristics of musical compositions",
      "Understanding of Janaka and Janya ragas",
      "Sing 2 Lakshangeethe with correct swara sthanas and tala",
      "Sing 2 Jathiswaras with correct swarasthanas and tala",
      "Sing swara and sahitya of 2 Swarajathis with correct swarasthanas and tala",
      "Sing 4 varnas with swara and sahitya in 1st and 2nd Kaala",
      "Sing 2 Kruthis",
      "Sing 2 Thyagaraja Divyanama Sankeerthanas",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "bspm-level-2-praveshika-pratham": {
    title: "BSPM Level 2 Praveshika Pratham",
    pic: "vocals-6.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "After completing the Level 1 Prarambhik course and Method Book 2, your child is ready to embark on the next step of their musical journey by preparing for the BSPM Level 2 certification exam – Praveshika Pratham.",
      "In this course, students delve into Geetams, simple yet melodious songs; Swarajathis, rich in emotion and devotion; and timeless compositions by musical legends like Purandara Dasa and Tyagaraja. They also explore nottuswaras, devotional songs, and folk melodies, taking a deeper dive into the vibrant world of Carnatic music.",
      "Through Geetams, students are introduced to new ragas beyond Mayamalavagoula, set to a variety of talas. Swarajathis further enrich their learning with multiple sahityas that express emotions like devotion and love, helping them gain a solid understanding of the prescribed ragas and talas at this level.",
      "This course extends beyond classical music, offering opportunities to learn devotional pieces, folk tunes, and nottuswaras. These additions help students develop vocal modulation skills and enhance their ability to convey emotions effectively.",
      "With guidance from our certified instructors, your child will be thoroughly prepared to excel in the certification exam, gaining confidence and mastery in their Carnatic music journey.",
    ],
    prerequisites: [
      "Students should have completed the Prarambhik level or should have a knowledge in the basic terminologies and should be able to sing the basic varisais till alankaras.",
    ],
    topics: [
      "12 Saptaswaras",
      "Introduction to Music trinity and Purandaradasa",
      "Simple compositions of Purandaradasa and Tyagaraja.",
      "Nottuswara compositions of M. Dikshithar",
      "Devotional songs and Folk Melodies",
      "Alankaras only 3 speeds in Raga Mayamalavagoula",
      "Four geetams and 2 simple swarajathis",
    ],
    outcomes: [
      "Get an understanding of the names of saptaswaras, 12 swarasthanas, the popular talas and musical forms.",
      "Know about Trinities and Purandaradasa.",
      "Sing the simple compositions like Nottuswaras, Devotional songs, Folk melodies and the compositions of Purandaradasa and Tyagaraja",
      "Sing Alankaras in the 3 speeds with talam.",
      "Understand the structure of geetams and swarajathis and should be able to sing them in different ragas and talas.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "carnatic-vocals-method-book-3": {
    title: "Gandharva Carnatic Vocals Method Book 3",
    pic: "vocals-5.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Is your child passionate about Carnatic singing and ready to embrace a new challenge? Our Advanced Carnatic Vocals course at Gandharva is the perfect opportunity for them to elevate their skills to the next level.",
      "With guidance from our experienced instructors, students will delve into advanced varnams, ragas, and kritis. This course is designed to help your child master essential techniques, build confidence, and express themselves more deeply through music, taking their love for singing to greater heights.",
    ],
    prerequisites: [
      "Should have developed basic knowledge of swaras, thala and kaala and should be able to sing Alankaras & few simple kritis",
    ],
    topics: [
      "Theory",
      "Madhyamakala Krithis",
      "Vilambakala Kritis",
      "Devaranamas",
      "Annamacharya kritis",
      "Badrachala Ramadasa kritis",
      "Thillana",
      "Javali / Padam",
      "Adi thala varnas - Kalyani, Kambhoji, Hamsadhwani, Mohana",
      "Atta thala varna - Bhairavi",
    ],
    outcomes: [
      "Sing at least 3 Adi thala varnas with swara and sahitya in 1st and 2nd Kaala",
      "Sing Atta thala varna with swara and sahitya in 1st and 2nd Kaala",
      "Understand the structure of kritis and sing them in the correct raga swarasthanas and thala",
      "Know about great composers Annamacharya and Bhadrachala Ramadasu and sing their kritis",
      "Sing Thillana, Javali/Padam in the correct raga swarasthanas and thala",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "bspm-level-3-praveshika-pratham": {
    title: "BSPM Level 3 Praveshika Pratham",
    pic: "vocals-5.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "After completing the Level 1 Prarambhik course and Method Book 2, your child is ready to take the next step by preparing for the BSPM Level 2 certification exam – Praveshika Pratham",
      "In this course, students explore Geetams—simple yet melodic songs—and Swarajathis, which convey emotions of devotion and love. They also study timeless compositions by legendary musicians such as Purandara Dasa and Tyagaraja, alongside nottuswaras, devotional songs, and folk melodies, diving deeper into the rich traditions of Carnatic music.",
      ,
      "Through Geetams, students are introduced to new ragas beyond Mayamalavagoula and practice them in various talas. Swarajathis further enhance their learning with multiple sahityas, helping them express emotions like love and devotion. By mastering these forms, students develop a solid understanding of the ragas and talas required at this level.",
      "This course also broadens their repertoire beyond classical music, as they learn devotional songs, folk melodies, and nottuswaras, improving their vocal modulation and emotional expression.",
      "With the expert guidance of our certified instructors, your child will be fully prepared to excel in the certification exam, gaining confidence and skill as they progress in their Carnatic music journey.",
    ],
    prerequisites: [
      "Students should have completed the Prarambhik level or should have a knowledge in the basic terminologies and should be able to sing the basic varisais till alankaras.",
    ],
    topics: [
      "Biographies of Trinity, Purandaradasa & Swati Tirunal",
      "12 swarasthanas",
      "35 talas",
      "The widely used Gamakas",
      "Note on Vadi, Samvadi, Vivaldi, Anuvadi, Sruthi & Nada",
      "Ragalakshana for the ragas mentioned below in the practical syllabus",
      "3 Tana varnas in Aditala",
      "Compositions in Raga Vasantha, Bilharai, Hindolam, Mohanam, Hamsadhwai, Suddhasaveri and more",
      "Alankaras in 3 Sampoorna ragas (other than Mayamalavagoula) & 2 Janya ragas",
    ],
    outcomes: [
      "Have a good understanding of the biographies of the Trinity, Purandaradasa and Swati Tirunal.",
      "Know 12 swarasthanas, 35 talas, the widely used gamakas, vadi, samvadi, vivaldi, anuvadi, sruthi and nada.",
      "Sing atleast 7-10 compositions in different ragas and their ragalakshanas in detail.",
      "Sing 3 Tana varnas.",
      "Sing alankaras in 5 different ragas in 3 speeds.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "hindustani-classical-foundation": {
    title: "Gandharva Hindustani Classical Foundation",
    pic: "hindustani-vocals-2.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Hindustani Vocals Foundation course serves as the perfect starting point for your child’s musical journey! This introductory and essential program is designed for beginners at the Gandharva School of Music. It offers a blend of Hindustani Classical and Indian Film Music, providing a balanced foundation in both styles. The course aims to help students explore their musical interests and discover their potential. Upon completion, your child will gain clarity about their aptitude and preference for either Hindustani Classical or Bollywood-style vocals.",
    ],
    prerequisites: [
      "Interest in singing",
      "Trust in the teacher",
      "Punctuality",
      "Patience to learn",
    ],
    topics: [
      "Simple Alankaars",
      "Posture and fingers",
      "Songs",
      "Bhajans",
      "Raga Based Bandish",
      "Rhythm And Taal",
      "Singing With Tanpura",
    ],
    outcomes: [
      "Develop tonal quality.",
      "Recognize their Pitch/Scale and it will help them develop listening skills.",
      "Develop basic rhythm sense.",
      "Get a command on notes.",
      "Understand the frequency of notes and the combination of different notes.",
      "Understand the notations of melodies",
      "Develop performance skills by preparing a song.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "hindustani-classical-vocals-method-book-1": {
    title: "Gandharva Hindustani Classical Vocals Method Book 1",
    pic: "hindustani-vocals-1.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Is your child ready to embark on a journey toward success in the music industry? The Indian Classical Method: Book 1 is the perfect starting point! This beginner-level course introduces students to the fundamentals of classical singing, blending practical and theoretical aspects of Indian classical music. Throughout the program, students will gain a strong foundation in essential concepts like swar (notes), taal (rhythm), and ragas (melodic frameworks).",
    ],
    prerequisites: ["Must have completed foundation Vocals course"],
    topics: [
      "Music, Notes(swar) - Shuddha Swar And Vikrit Swar (Komal And Teevra Swar), Shruti, Naad, Aaroh-avroh, Alankar, Saptak (octave) And Its types",
      "Posture and fingers",
      "Practice Of Shadaj and Seven Notes.",
      "Alankars Of Shuddha Swaras, Skip Note Alankars, Alankars which cover all 3 Octaves (alankars Of Shuddha Swar), use of all Notes of a Saptak in a different way, breathing exercises, Alankars of Vikrit Swaras.",
      "Taal, Matra, Laya, Vibhag, Sum, Taali, Khaali / Kaal, Avartan",
      "Dadra Taal (Thaah Laya), Alankars in Taal Dadra, Sargam Geet in Taal Dadra (with only Shuddha Swar), Keherwa Taal (Thaah Laya), Alankars in Taal Keherwa, Teentaal / Tritaal (Thaah Laya), Alankars in Teentaal, national anthem (based on Raag Bilawal)",
      "Thaat and its notes, Raag and its characteristics",
      "Vaadi and Samvadi Swar, Anuvadi and Vivadi Swar, Varjit and Nyas Swar, Raag Jaati, Lakshan Geet, Khayal, Taan and Alaap.",
      "Chhota Khayal in Raag Bilawal (Madhyalay Tritaal), prayer based on Raag Alhaiya Bilawal.",
      "Sargam Geet, Lakshan Geet, Chhota Khayal, Shlok based on Raag Bhoop, Song (geet) based on Raag Bhoop.",
      "Chhota Khayal and Bhajan based on Raag Kafi.",
      "Introduction of Pandit Vishnu Nrayan Bhatkhande & his contributions in the field of music",
    ],
    outcomes: [
      "Be familiar with basic musical terms.",
      "Understand the concept of Thaat and Raag.",
      "Have the knowledge of Raag Bilawal and a beautiful composition in Alhaiya Bilawal.",
      "Be taught about the 3 important Taal and their compositions.",
      "Learn about Raag Yaman and Raag Bhoop.",
      "Understand the frequency of notes and the combination of different notes.",
      "Have knowledge of Raag Kafi and Bhajans based on Raag kafi.",
      "Have an understanding of notes in music.",
      "Understand the concept of Taal and their role in music.",
      "Know about legendary musician Shri Pandit Vishnu Narayan Bhatkhande.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "abgmvm-prarambhik-level-1": {
    title: "ABGMVM Prarambhik - Level 1",
    pic: "hindustani-vocals-1.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "PRARAMBHIK is the introductory grade exam offered by Akhil Bharatiya Gandharva Mahavidyalaya. This course focuses on foundational skills, including basic voice training, vocal warm-up exercises, singing swar alankars, and an introduction to Raag Sangeet through Chota Khayal.",
    ],
    prerequisites: ["Must have completed foundation Vocals course"],
    topics: [
      "Singing with Tanpura ( Sa.. Pa... Sa)",
      "Basic bandish/Songs in Raag Durga, Bhoop, Kaafi, Des and more",
      "Basic Recitation and clapping of Taals - Teentaal, Dadra, Keherwa",
      "Raag Knowledge and Theory",
    ],
    outcomes: [
      "Sing in Tune with Tanpura (Sa...Pa...Sa)",
      "Sing Aroh-Avroh of at least 6 ragas",
      "Sing at least 4 bandishes on Teentaal",
      "Recite different Taals on Claps",
      "Answer basic theory questions",
      "Read and write basic notations",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "bspm-prarambhik-level-1": {
    title: "BSPM Prarambhik - Level 1",
    pic: "hindustani-vocals-1.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Prarambhik is the entry-level grade exam offered by the Bhartiya Sangeet Prasaraj Mandal (BSPM), designed to provide students with a strong foundation in music. The course begins with essential voice culture techniques and vocal warm-up exercises, followed by training in swar alankar singing and an introduction to Raag Sangeet, including Chota Khayal.",
      "This program not only prepares students to excel in the BSPM Prarambhik Level 1 exam but also helps cultivate discipline, perseverance, and patience—valuable traits for future musical and professional endeavors. Guided by our certified and supportive teachers, students receive step-by-step assistance from exam registration to preparation and certification.",
    ],
    prerequisites: ["Must have completed foundation Vocals course"],
    topics: [
      "Singing with Tanpura ( Sa.. Pa... Sa)",
      "Basic bandish/Songs in Raag Durga, Bhoop, Kaafi, Des and more",
      "Basic Recitation and clapping of Taals - Teentaal, Dadra, Keherwa",
      "Raag Knowledge and Theory",
    ],
    outcomes: [
      "Sing in Tune with Tanpura (Sa...Pa...Sa)",
      "Sing Aroh-Avroh of at least 6 ragas",
      "Sing at least 2 chota kayal in any two ragas",
      "Sing at least 2 Lakshageet on two different ragas",
      "Recite different Taals on Claps",
      "Answer basic theory questions",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "hindustani-classical-vocals-method-book-2": {
    title: "Gandharva Hindustani Classical Vocals Method Book 2",
    pic: "hindustani-vocals-3.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Take your child’s musical journey to the next level with Indian Classical Method: Book 2! This course offers an in-depth exploration of key ragas and taals, along with essential theoretical concepts. Students will develop mastery in singing ‘Drut Khayal’ across various ragas, incorporating alaap and taan improvisation for a well-rounded musical foundation.",
    ],
    prerequisites: ["Must have completed Hindustani Classical Method Book 1"],
    topics: [
      "Technical Terminology",
      "Practice of phrases in different Ragas",
      "Time cycle of Ragas",
      "Types of singing in north Hindustani Classical music",
      "Taal (Rhythm) introduction",
      "Raga Khamaj",
      "Raga Yaman",
      "Raga Desh",
      "Raga Bhairav",
      "Life history of 'Miyan Tansen'",
    ],
    outcomes: [
      "Know about the different variants of Hindustani Classical music.",
      "Have a command over different notes and hence improve their tonal quality and notes recognizing ability.",
      "Know the singing time of ragas and other styles of classical singing such as Khayal, Tarana, Dhrupad & Dhamar.",
      "Have a command over the laykari of two new taals with bols as well as the double, triple and quadruple laykaris of taals of the previous course.",
      "Undergo detailed study of four different Ragas with some alankars and one chhota khayal with alaap and taans in each Raga.",
      "Get the information of the musicians who dedicated their life to Music and their contribution in Hindustani Classical Music.",
      "Get the information of the musicians who dedicated their life to Music and their contribution in Hindustani Classical Music.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "abgmvm-praveshika-pratham-level-2": {
    title: "ABGMVM Praveshika Pratham - Level 2",
    pic: "hindustani-vocals-3.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Praveshika Pratham is the second-level examination at ABGMVM, focusing on advancing musical skills. Students will delve into taans, aalaps, sargamgeet, and lakshan geet. With the guidance of our experienced teachers, you’ll learn to perform various types of taans and aalaps, master sargamgeet, and differentiate between ragas, equipping you to excel in the Praveshika Pratham exam.",
    ],
    prerequisites: [
      "Must have completed Hindustani Classical Method Book 1 and ABGMVM Prarambik",
    ],
    topics: [
      "Introduction to Aalap and Taans",
      "Basic SargamGeet and Lakshangeet",
      "Other forms like Dhrupad, Bhajans",
      "Introduction to taals like Roopak, Jhaptaal, Ektaal and concept of Dugun, Tigun",
      "Chota Khayal in different Ragas",
    ],
    outcomes: [
      "Demonstrate basic Aalap and Taans in Bandish",
      "Sing Sargam Geet, LakshanGeet, Dhurpad and a Bhajan",
      "Recite Teentaal, Dadra, Roopal, Jhaptal, Ektaal on Claps",
      "Identify and differentiate between ragas",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "bspm-praveshika-pratham-level-2": {
    title: "BSPM Praveshika Pratham - Level 2",
    pic: "hindustani-vocals-3.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Praveshika Pratham is the second-level examination offered by the Bhartiya Sangeet Prasaraj Mandal (BSPM), focusing on deeper musical concepts like taans, aalaps, and lakshan geet.",
      "Our expert teachers provide personalized guidance throughout the course, helping you master the technical skills required to excel in the Praveshika Pratham exam. Beyond music, this program emphasizes building essential qualities like discipline, perseverance, and patience, which are key to your growth in music and future endeavors.",
      "From registration to exam preparation and celebrating your success with certification, our friendly and certified instructors are with you every step of the way.",
    ],
    prerequisites: [
      "Must have completed Hindustani Classical Method Book 1 and ABGMVM Prarambik",
    ],
    topics: [
      "Introduction to Aalap and Taans",
      "Basic SargamGeet and Lakshangeet",
      "Other forms like Dhrupad, Bhajans",
      "Introduction to taals like Roopak, Jhaptaal, Ektaal and concept of Dugun, Tigun",
      "Chota Khayal in different Ragas",
    ],
    outcomes: [
      "Demonstrate basic Aalap and Taans in Bandish",
      "Sing Sargam Geet, LakshanGeet, Dhurpad and a Bhajan",
      "Recite Teentaal, Dadra, Roopal, Jhaptal, Ektaal on Claps",
      "Identify and differentiate between ragas",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "hindustani-classical-vocals-method-book-3": {
    title: "Gandharva Hindustani Classical Vocals Method Book 3",
    pic: "hindustani-vocals-3.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Does your child aspire to pursue a career as a classical vocalist? Indian Classical Method: Book 3 is the next step in mastering Indian classical singing. This course offers an in-depth study of additional ragas and taals, alongside introducing new theoretical concepts.",
      "Students will refine their skills in ‘Drut Khayal’ singing, focusing on ragas such as Durga, Asavari, Bageshree, and Bhairavi, while developing proficiency in creating alaaps and taans. This program is designed to elevate their musical expertise and confidence.",
    ],
    prerequisites: ["Must have done Hindustani Classical Vocals Method Book 2"],
    topics: [
      "Definition of Musical terms",
      "Introduction of Bhatkhande notation system and practice to write notation of composition in some ragas.",
      "Practice of alankars in different Thaats.",
      "Taal Parichay (Layakari practice of different taals)",
      "Raag Durga",
      "Raag Asavari",
      "Raag Bageshree",
      "Raag Bhairavi",
      "Sargemageet/swaramalika in some ragas.",
      "Introduction to Pandit Jasraj and his contributions in the field of music",
    ],
    outcomes: [
      "Learn new terms of classical music.",
      "Read and write the notations of compositions in different ragas.",
      "Practice Alankars in a particular raga.",
      "Know laykaris in different taals.",
      "Learn 1 madhyalay composition/ drut khayal with alaaps and taans along with one song/bhajan based on these ragas- Durga, Asavari, Bageshree and Bhairavi.",
      "Read notations and understand the ups and downs of notes perfectly with the help of Sargam geet/swaramalika.",
      "Come to know about Pandit Jasraj and his contributions in Indian classical music.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "abgmvm-praveshika-purna-level-3": {
    title: "ABGMVM Praveshika Purna - Level 3",
    pic: "hindustani-vocals-3.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Praveshika Purna, the third-level examination, is ideal for intermediate singers or those with at least two years of learning experience. This course introduces the concepts of Bada Khayal and Vilambit singing, along with an in-depth study of 7-9 ragas. The exam includes both practical and theoretical components, offering a comprehensive approach to mastering classical music at this level.",
    ],
    prerequisites: [
      "Must have done Hindustani Classical Vocals Method Book 3 and Praveshika Pratham",
    ],
    topics: [
      "Introduction to Vilambit and Bada Khayal Forms",
      "Singing and Culture of Dhrupad - Dhamaar",
      "Different forms of singing like Tarana",
      "Concept of Swar Vistaar",
      "Chota Khayal of Raag Bhairav, Kedar, Bilawal, Tilak Kamod, Bhairavi, Vrundawani Sarang etc",
      "Music Theory and Notation Writing",
    ],
    outcomes: [
      "Do Swar Vistaar in Bada Khayal along with Aalap and Taans",
      "Demonstrate Ekpat, Dupat, Chaupat of different Taals",
      "Sing Dhrupad Dhamar",
      "Proficiency in singing Chota Khayal of at least 5-6 Ragas",
      "Write bandishes in Bhatkhande/Paluskar format",
      "Distinguish between the 9-10 ragas mentioned",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "bspm-praveshika-purna-level-3": {
    title: "BSPM Praveshika Purna - Level 3",
    pic: "hindustani-vocals-3.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Praveshika Purna is the third-level examination offered by the Bhartiya Sangeet Prasaraj Mandal (BSPM), designed for singers with approximately two years of training in Hindustani Classical music.",
      "In this course, students expand their knowledge of Hindustani Classical compositions while also exploring Bollywood songs. They will study 5-7 ragas in detail and prepare for both practical and theory components of the exam.",
      "Our dedicated and certified teachers provide step-by-step guidance, ensuring you are fully prepared to succeed in the Level 3 exam. Alongside musical skills, this course emphasizes building discipline, perseverance, and patience—essential traits for excelling in music and beyond.",
      "From registration to preparation and celebrating your success with certification, our supportive teachers are here to assist you at every stage of your journey.",
    ],
    prerequisites: [
      "Must have done Hindustani Classical Vocals Method Book 3 and Praveshika Pratham",
    ],
    topics: [
      "Introduction to Vilambit and Bada Khayal Forms",
      "Singing and Culture of Dhrupad - Dhamaar",
      "Different forms of singing like Tarana",
      "Concept of Swar Vistaar",
      "Chota Khayal of Raag Bhairav, Kedar, Bilawal, Tilak Kamod, Bhairavi, Vrundawani Sarang etc",
      "Music Theory and Notation Writing",
    ],
    outcomes: [
      "Do Swar Vistaar in Bada Khayal along with Aalap and Taans",
      "Demonstrate Ekpat, Dupat, Chaupat of different Taals",
      "Sing Dhrupad Dhamar",
      "Proficiency in singing Chota Khayal of at least 5-6 Ragas",
      "Write bandishes in Bhatkhande/Paluskar format",
      "Distinguish between the 9-10 ragas mentioned",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-bollywood-vocals-foundation": {
    title: "Gandharva Bollywood Vocals Foundation",
    pic: "young-man-with-headphones-mixed-media_641298-19049.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Bollywood Vocals Foundation course marks the starting point of your child’s musical journey! Designed as an essential introductory program for beginners at the Gandharva School of Music, this course offers a simplified approach to Hindustani Classical music, laying the groundwork for mastering Indian Bollywood vocals.",
      "The primary goal is to discover each student’s unique interests and nurture their vocal abilities by enhancing tonal quality and developing a strong understanding of musical notes. Upon completion, this course will empower your child to explore their potential and passion for Hindi Bollywood singing.",
    ],
    prerequisites: [
      "Interest in singing",
      "Trust in the teacher",
      "Punctuality",
      "Patience to learn",
    ],
    topics: [
      "Singing notes in different style (Aa, E, O, U, Aey)",
      "Identification of Keys of Harmonium or Keyboard/Piano",
      "3, 4 and 8 counts and practice to identify the Sam",
      "Introduction of 7 Shuddha Notes",
      "Simple Alankars (With Shuddha Swar)",
      "Melodies in Notation",
      "Light & Film MusiFinal performance (Film Song of your choice)c Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
    ],
    outcomes: [
      "Develop tonal quality.",
      "Recognize their Pitch/Scale and it will help them develop listening skills.",
      "Develop basic rhythm sense.",
      "Get a command on notes.",
      "Understand the frequency of notes and the combination of different notes.",
      "Understand the notations of melodies",
      "Develop performance skills by preparing a song.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bollywood-vocals-method-book-1": {
    title: "Gandharva Bollywood Vocals Method Book 1",
    pic: "indian-singer-sings-into-microphone_115919-36311.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Does your child have a passion for Bollywood music? If they’re eager to explore it, this beginner-friendly course is perfect for them!",
      "Bollywood Vocals Method Book 1 is an introductory curriculum focused on Indian film and folk music. It covers the foundational concepts of Bollywood singing. By the end of this course, students will gain an understanding of essential techniques used in Bollywood vocals. ",
    ],
    prerequisites: ["Must have completed foundation Vocals course"],
    topics: [
      "Voice culture",
      "Concept of Taal",
      "Bollywood songs based on Raag Yaman",
      "Bollywood songs based on Raag Bhupali Swaramalika",
      "Ghazal",
      "Songs of your choice",
    ],
    outcomes: [
      "Understand the frequency of the ‘Sa’ note, which will, in turn, help them understand the other six notes.",
      "Understand and sing the notations of a song.",
      "Understand and sing the notations of a song.",
      "Sing the songs based on Raag Yaman and Raga Bhoop.",
      "Learn different Hindi songs of your choice.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bollywood-vocals-method-book-2": {
    title: "Gandharva Bollywood Vocals Method Book 2",
    pic: "female-singer-passionately-performing-stage-dramatic-lighting-live-music-concert_1040071-10510.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Looking for an engaging and enjoyable way to nurture your child’s musical talent? The highly regarded Bollywood Vocals Method Book 2 is the perfect choice!",
      "This course introduces students to popular ragas and taals commonly featured in Bollywood music. It also includes an in-depth study of two compositions by renowned Indian film composers. Upon completing the course, students will be equipped to sing a variety of songs in different ragas and rhythm patterns with confidence.",
    ],
    prerequisites: ["Must have done Light & Hindi Film Vocals method book 1"],
    topics: [
      "Introduction of Raag Khamaj",
      "Practice of some Alankars in Rupak Taal",
      "Songs based on Taal Dadra, Keherwa and Rupak",
      "Introduction of Raag Bhairavi",
      "Introduction of 1 Ghazal",
      "Study of 1 composition composed by Madan Mohan",
      "Study of 1 composition composed by Allarakha Rahman",
      "Student's favourite singer's song (Male/Female)",
    ],
    outcomes: [
      "Come to know about the swar/notes used in raga Khamaj and Bhairavi through various alankars and 1 chhota khayal.",
      "Be able to make command in Rupak taal as it is used in light and Bollywood's music.",
      "Learn 3 songs of different rhythm patterns (1 song in each taal).",
      "Be able to sing 1 ghazal.",
      "Learn 2 film songs of music directors Madan Mohan and A R Rahman (1 song of each).",
      "Be able to sing 1 song of their favourite singer.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "gandharva-kannada-music-foundation": {
    title: "Gandharva Kannada Music Foundation",
    pic: "dress-singing-songs.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Kannada Film Music Foundation course is the ideal starting point for anyone who enjoys listening to and singing Kannada songs. This beginner-friendly program is designed to introduce students to the rich and dynamic world of Kannada film music, fostering a lifelong love for singing.",
      "Students will explore a variety of popular Kannada film songs, bhajans, and other compositions. The course emphasizes fundamental vocal techniques, breath control, pitch (sur/shruti) accuracy, and rhythm (taalam) training, all presented in an engaging and enjoyable manner for a memorable learning experience.",
      "This course aims to inspire a passion for singing, helping students uncover their unique voice, enhance their tonal quality, and master vocal nuances. With the guidance of certified, professional, and approachable instructors, students will confidently learn their favorite songs while building a solid musical foundation.",
      "The 1-on-1 personalized sessions provide tailored guidance, allowing each student to receive undivided attention and progress at their own pace—all while having an enjoyable and enriching experience.",
    ],
    topics: [
      "Introduction to Light & Film Music",
      "Introduction to Shruti & Swaras",
      "Explore Beats, Rhythm & Taalam",
      "Vocal Warmup Exercises & Singing Techniques",
      "Light & Film Music Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
    ],
    outcomes: [
      "Sing in correct Shruti",
      "Recall basic Music Terminologies",
      "Execute basic vocal exercises",
      "Sing at least 4- 5 songs with correct technique",
      "Demonstrate Performance & Live Stage Skills",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-malayalam-music-foundation": {
    title: "Gandharva Malayalam Music Foundation",
    pic: "female-singer-holding-microphone-singing-pink-dark-backlit-scene-banner_669646-5612-1.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Malayalam Film Music Foundation course is the perfect starting point for your child to begin their journey into singing their favorite Malayalam songs!",
      "This program introduces students to the fundamentals of Malayalam film music in a fun and engaging way. By exploring simple songs, bhajans, film tracks, and other popular compositions, students develop a love for singing while mastering basic vocal exercises, breathing techniques, pitch (sur/shruti) training, and rhythm (taalam) practice, establishing a solid musical foundation.",
      "The course’s primary goal is to make music an enjoyable experience for each student. It focuses on identifying their unique musical interests and helping them enhance their understanding of vocal notes and tonal quality.",
      "Whether your child wants to sing for fun, relaxation, or as a growing passion, the personalized 1-on-1 sessions cater to their specific needs. By the end of the course, they will have the confidence to perform their favorite Malayalam songs with ease and joy.",
    ],
    topics: [
      "Introduction to Light & Film Music",
      "Introduction to Shruti & Swaras",
      "Explore Beats, Rhythm & Taalam",
      "Vocal Warmup Exercises & Singing Techniques",
      "Light & Film Music Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
    ],
    outcomes: [
      "Sing in correct Shruti",
      "Recall basic Music Terminologies",
      "Execute basic vocal exercises",
      "Sing at least 4- 5 songs with correct technique",
      "Demonstrate Performance & Live Stage Skills",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-tamil-music-foundation": {
    title: "Gandharva Tamil Music Foundation",
    pic: "cheerful-female-singer.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Tamil Film Music Foundation course is the ideal starting point for children who love Tamil songs",
      "Designed to introduce students to the fundamentals of Tamil film music, this course offers a fun and enriching learning experience. Through popular Tamil songs, bhajans, and other beloved compositions, students will explore essential vocal exercises, breathing techniques, pitch (sur/shruti) training, and rhythm (taalam) practice, laying a strong foundation for singing.",
      "This program nurtures a love for music and singing while catering to each student’s unique musical interests. It helps them enhance their vocal tone, improve note accuracy, and discover their individual style. With personalized 1-on-1 online sessions, students receive undivided attention and enjoy a tailored learning journey.",
      "By the end of the course, your child will gain the confidence to sing and perform their favorite Tamil songs, unlocking their musical potential and passion for singing.",
    ],
    topics: [
      "Introduction to Light & Film Music",
      "Introduction to Shruti & Swaras",
      "Explore Beats, Rhythm & Taalam",
      "Vocal Warmup Exercises & Singing Techniques",
      "Light & Film Music Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
    ],
    outcomes: [
      "Sing in correct Shruti",
      "Recall basic Music Terminologies",
      "Execute basic vocal exercises",
      "Sing at least 4- 5 songs with correct technique",
      "Demonstrate Performance & Live Stage Skills",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-telugu-music-foundation": {
    title: "Gandharva Telugu Music Foundation",
    pic: "cheerful-female-singer.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "The Gandharva Telugu Film Music Foundation course is the perfect starting point for budding singers with a passion for Telugu songs.",
      "In this program, students will delve into a selection of engaging and easy-to-learn tracks, including popular Telugu film songs, bhajans, and other cherished compositions—along with songs of their own choice. The curriculum is designed to make learning enjoyable, emphasizing key vocal techniques, breath control, pitch (sur/shruti) accuracy, and rhythm (taalam) practice.",
      "This course is all about igniting a love for singing in every student. It is carefully crafted to help them discover their unique voice, enhance tonal quality, and master vocal nuances. Through 1-on-1 personalized sessions, students develop the confidence to sing and perform their favorite Telugu songs while building a strong musical foundation by the course’s end.",
    ],
    topics: [
      "Introduction to Light & Film Music",
      "Introduction to Shruti & Swaras",
      "Explore Beats, Rhythm & Taalam",
      "Vocal Warmup Exercises & Singing Techniques",
      "Light & Film Music Based Songs Eg. Songs by Dr. Rajkumar, Hemanth Kumar, Anuradha Bhatt, Rajesh Krishnan, C Ashwath, and more",
    ],
    outcomes: [
      "Sing in correct Shruti",
      "Recall basic Music Terminologies",
      "Execute basic vocal exercises",
      "Sing at least 4- 5 songs with correct technique",
      "Demonstrate Performance & Live Stage Skills",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bharathanatyam-foundation": {
    title: "Gandharva Bharathanatyam Foundation",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264106.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "If your child shows an interest in classical dance, the Gandharva Bharathanatyam Foundation course is a perfect starting point. This course introduces basic movements for body awareness and teaches traditional ‘Adavu,’ a systematic sequence of stamping steps.",
      "Participants will explore various rhythm patterns at different tempos, learn the expressive language of dance through hand and finger gestures, and engage in chanting. The course also includes basic choreography set to music, culminating in a performance.",
    ],
    prerequisites: [
      "Interest in dance",
      "Space to dance",
      "Dance uniform to ease dance movements",
      "Patience to learn",
    ],
    topics: [
      "Discovering basic footwork or Tatadavus",
      "Rhythm Response",
      "Language of Dance",
      "The Aspect of Performance",
      "Hard work and respect for Audience",
      "Show Related Tips and Trick",
    ],
    outcomes: [
      "Chant the shlokas, do namskar and perform 6 tatadavus",
      "Recall and recite how the adavus should be done, demonstration of the adavu according to individual ability",
      "Recite the Asamyutha Hastas or Single hand gestures from Abhinaya Darpana",
      "Perform hands to the Dhyana Shlokam, Guru Shlokam and Saraswathi Shlokam to set music",
      "Demonstrate a live performance",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bharathanatyam-method-book-1": {
    title: "Gandharva Bharathanatyam Method Book 1",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264039.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "Is your child ready to take the next step toward becoming a graceful Bharathanatyam dancer? The Gandharva Bharathanatyam Low Intermediate Grade course is designed to help them progress on their journey!",
      "This beginner-level program is ideal for those with 6-8 months of dance experience or who have completed the Foundation course. Students will build upon the skills learned in the Foundation course, mastering more advanced rhythm techniques, footwork, and hand movements, and applying them in structured dance routines.",
    ],
    prerequisites: [
      "Must have completed Bharathanatyam Foundation course or at least 6 months of prior training",
    ],
    topics: [
      "Introduction to stretching steps or Natadavus",
      "Embellishments using shoulder, neck and eyes",
      "Strengthening the spine",
      "Advanced Natadavus",
      "Introduction to Paraval Adavus or spreading steps",
      "Perform Mooshika Vahana shloka and a Swara based dance",
    ],
    outcomes: [
      "Dance and recite all 8 tatadavus, 8 natadavus and 2 Paraval adavs with hands",
      "Demonstrate the adavus according to individual ability",
      "Demonstrate Samyutha Hastas (double hand) gestures, Greeva Bheda (neck movements), Shiro Bheda (head movements) from Abhinaya darpana",
      "Recite shlokas on Hanuman and Hayagreeva Dieties and perform the pure dance swara piece and Mooshika Vahana shloka Abhinaya piece",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "istd-grade-1": {
    title: "ISTD Grade 1",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264039.avif",
    type: "Beginner",
    duration: "6-8",
    descriptions: [
      "The Imperial Society of Teachers of Dance (ISTD) in London, UK, offers a Bharatanatyam Certification course with six progressive levels.",
      "This course is designed for students who have successfully completed the Grade 1 exam and Method Book 2. At this stage, students are expected to demonstrate refined adavu techniques, which will be evaluated in the Grade 2 exam. To ensure success, the program includes creative exercises, dance practice, and yoga, equipping students to excel in ISTD Grade 2.",
    ],
    prerequisites: [
      "2+ year of dancing experience",
      "Knowledge of Sarali Varisais of the Carnatic music system and ability to sing two Geethams",
    ],
    topics: [
      "Rhythm And Tāla - Sol Kattu",
      "Aḍavus - Advanced Adavus",
      "Music - Janta varisais and two Geethams",
      "Nritta - Advanced Adavus",
      "Abhinaya / Nritya - Shloka Abhinaya",
      "Creative Exercise - Creative Exercise Of Story Creation With Gestures",
      "Safe Dance Practice - Yoga",
      "Theory - Theory From Abhinaya Darpana",
      "File - Essays On Mythology And Bharathanatyam",
    ],
    outcomes: ["Be prepared to clear to Grade 2 exam of ISTD, London"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bharathanatyam-method-book-2": {
    title: "Gandharva Bharathanatyam Method Book 2",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264226.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Has your child been practicing Bharathanatyam for over a year? If so, it’s time to advance to the Gandharva Bharathanatyam Intermediate Grade.",
      "In this course, students will refine their form, study intricate rhythms, enhance poses and posture, and master the aesthetics of the dance. They will also learn three new choreographed pieces and delve into advanced theory, including the application of viniyoga hastas.",
    ],
    prerequisites: [
      "2+ year of dancing experience",
      "Interest and motivation to dance because this grade is highly challenging",
    ],
    topics: [
      "Paraval adavu",
      "Posture and fingers",
      "Kudittumettu Adavu",
      "Egarmettu Adavu",
      "Tattumettu adavu in Panchanadai",
      "Drishti Bheda or eye movements and Pataka Hasta Viniyoga",
      "Advanced poses",
      "Three new dances",
    ],
    outcomes: [
      "Dance three items - on Krishna, on Lord Vishnu and on Lord Shiva",
      "Recite, dance and demonstrate all the adavus - Paraval, Kuditumettu, Pakka and Tattumettu in Panchanadai",
      "Demonstrate Drishti bheda and Pataka Hasta Viniyoga",
      "Do advanced poses according to individual ability honoring their own body",
      "Be prepared to clear to Grade 1 exam of ISTD, London",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "istd-grade-2": {
    title: "ISTD Grade 2",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264226.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "The Imperial Society of Teachers of Dance (ISTD) in London, UK, offers a Bharatanatyam Certification program consisting of six progressive levels.",
      "This course is designed for students who have completed the Grade 1 examination and Method Book 2. At this level, students are expected to demonstrate enhanced proficiency in adavu techniques, which will be assessed in the Grade 2 examination. To help students excel, the program incorporates creative exercises, structured dance practices, and yoga sessions.",
    ],
    prerequisites: [
      "2+ year of dancing experience",
      "Knowledge of Sarali Varisais of the Carnatic music system and ability to sing two Geethams",
    ],
    topics: [
      "Music - Janta varisais and two Geethams",
      "Aḍavus - Advanced Adavus",
      "Nritta - Advanced Adavus",
      "Abhinaya / Nritya - Shloka Abhinaya",
      "Creative Exercise - Creative Exercise Of Story Creation With Gestures",
      "Safe Dance Practice - Yoga",
      "Theory - Theory From Abhinaya Darpana",
      "File - Essays On Mythology And Bharathanatyam",
    ],
    outcomes: ["Be prepared to clear to Grade 2 exam of ISTD, London"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "istd-grade-3": {
    title: "ISTD Grade 3",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264226.avif",
    type: "Intermediate",
    duration: "8-10",
    descriptions: [
      "Following the Grade 2 certification, students can advance to the ISTD Grade 3 preparation. At this level, students learn the Allarippu and master nearly all adavus used in intricate choreography. They are also introduced to Kauthuvam, adding depth to their repertoire.",
      "Guided by expert instructors, students engage in technical practice, creative exercises, and performance training. Additionally, the course covers theoretical concepts from the Abhinaya Darpana and mythology to ensure comprehensive preparation for the Grade 3 exam.",
    ],
    prerequisites: [
      "3+ year of dancing experience",
      "Ability to sing alankarams and the items learnt in class",
    ],
    topics: [
      "Rhythm And Tāla - Trikala adavu solkattu recitation, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Music - Ability To Sing Alankarams And The Items Danced",
      "Aḍavus - Advanced adavus, candidates will be judge on variety and clarity of movements in different speeds",
      "Nritta - Advanced Adavus, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Abhinaya / Nritya - Abhinaya in Kauthuvam",
      "Creative Exercise - Adavus in any Jaathi",
      "Safe Dance Practice - Yoga as prescribed for the grade by ISTD",
      "Theory - Theory From Abhinaya Darpana including viniyoga hastas, Patraprana shlokas and four types of Abhinaya",
      "File - Essays On Mythology And Bharathanatyam",
    ],
    outcomes: ["Be prepared to clear to Grade 3 exam of ISTD, London"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1200,
          USD: 25,
        },
        discountedPrice: {
          INR: 1000,
          USD: 21,
        }
      },
    ],
  },
  "istd-grade-4": {
    title: "ISTD Grade 4",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264072.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "This course is the next step after completing Method Book 4 and passing the ISTD Grade 3 exam. Students are trained to sing, recite, and perform the Jathiswaram and Shabdam with precision.",
      "Guided by certified professional instructors, students delve deeper into Viniyoga Hasta theory and incorporate additional yoga practices into their training. The curriculum also includes advanced theoretical concepts from the Abhinaya Darpana, such as Dashavatara Hastas and the definitions of Vakyartha, Padartha, and Sancharis, equipping students to perform confidently for the ISTD Grade 4 exam.",
    ],
    prerequisites: [
      "4+ year of dancing experience",
      "Ability to sing the items learnt in class",
    ],
    topics: [
      "Rhythm And Tāla - Trikala adavu solkattu recitation, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Music - Ability To Sing Alankarams And The Items Danced",
      "Aḍavus - Advanced adavus, candidates will be judge on variety and clarity of movements in different speeds",
      "Nritta - Advanced Adavus, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Abhinaya / Nritya - Abhinaya in Kauthuvam",
      "Creative Exercise - Adavus in any Jaathi",
      "Safe Dance Practice - Yoga as prescribed for the grade by ISTD",
      "Theory - Theory From Abhinaya Darpana including viniyoga hastas, Patraprana shlokas and four types of Abhinaya",
      "File - Essays On Mythology And Bharathanatyam",
    ],
    outcomes: ["Be prepared to clear to Grade 4 exam of ISTD, London"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "istd-grade-5": {
    title: "ISTD Grade 5",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264072.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "Designed for students who have completed ISTD Grade 4, this course prepares them for the ISTD Grade 5 certification. The primary focus is on Abhinaya training, where students learn to express emotions through Padam and Keerthanam, as well as interpret repeated lines with evocative Sanchari.",
      "Under the guidance of certified professionals, students are trained in technical pieces, Bhava and Rasa theory, and yoga practices aligned with ISTD guidelines, ensuring comprehensive preparation for the Grade 5 exam.",
    ],
    prerequisites: [
      "12 years of age or older",
      "5+ year of dancing experience",
      "Ability to sing the items learnt in class",
    ],
    topics: [
      "Rhythm And Tāla - Trikala adavu solkattu recitation, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Music - Ability To Sing Alankarams And The Items Danced",
      "Aḍavus - Advanced adavus, candidates will be judge on variety and clarity of movements in different speeds",
      "Nritta - Advanced Adavus, Technical Pieces Like The Allarippu, Kauthuvam, Knowledge Of Kuraippu",
      "Abhinaya / Nritya - Abhinaya in Kauthuvam",
      "Creative Exercise - Adavus in any Jaathi",
      "Safe Dance Practice - Yoga as prescribed for the grade by ISTD",
      "Theory - Theory From Abhinaya Darpana including viniyoga hastas, Patraprana shlokas and four types of Abhinaya",
      "File - Essays On Mythology And Bharathanatyam",
      "safety in dance, pioneering dancers and artistes, evidence of attending a large number of shows",
    ],
    outcomes: ["Be prepared to clear to Grade 5 exam of ISTD, London"],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-bharathanatyam-method-book-3": {
    title: "Gandharva Bharathanatyam Method Book 3",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264072.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "If your child has a passion and talent for Bharathanatyam, the Gandharva Bharathanatyam Method Book 3 is the perfect next step in their dance journey!",
      "This course focuses on teaching advanced adavus and is carefully structured to help students transition smoothly to higher levels. Under the guidance of professionally certified instructors, students are introduced to Viniyoga Hastas, refine previously learned skills, and master new adavus to further enhance their technique and artistry.",
    ],
    prerequisites: [
      "Must have a good grasp of skills covered in Bharathanatyam Intermediate Grade",
      "3 years of dancing with firm basics and completion of intermediate grade",
      "Basic level Theory",
    ],
    topics: [
      "Pakka adavu",
      "Paichal adavu",
      "Simir Adavu",
      "Sarukkal Adavu",
      "Viniyoga hastas - Tripataka to Alapadma, Mandala, Sthanaka, Chari Bhedas, Deva Hastas",
      "Natesha Kauthuvam",
    ],
    outcomes: [
      "Demonstrate correct form performing all adavus in the syllabus",
      "Clearly improve form and speed over the previous level",
      "Demonstrate viniyogas and bhedas and hastas",
      "Demonstrate the Natesha Kauthuvam dance",
      "Appear for Grade 2 of the ISTD exam, London",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-bharathanatyam-method-book-5": {
    title: "Gandharva Bharathanatyam Method Book 5",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264072.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "For students serious about advancing in Bharathanatyam, the Gandharva Bharathanatyam Method Book 5 is an ideal pre-professional course. Designed for those with 4-5 years of experience or an ISTD Grade 4 qualification, this program offers comprehensive training in a full Bharathanatyam margam—a sequence of 10 traditional pieces including Pushpanjali, Alarippu, Jathiswaram, Shabdam, Kauthuvam, Varnam, Ashtapadi, Padam, Keerthanam, Thillana, and Mangalam.",
      "This course also prepares students to perform an Arangetram or Ranga Pravesh, a significant milestone in Bharathanatyam. Students will gain the skills and confidence to present a solo 3-hour recital accompanied by a live orchestra before an invited audience.",
    ],
    prerequisites: [
      "Good foundational form",
      "ISTD grade 4 would be appreciated but not necessary",
      "4 to 5 years of dance with good stamina",
    ],
    topics: ["Nuances of a margam"],
    outcomes: [
      "Demonstrate the margam in front of an invited audience on stage",
      "Perform with CD music/live music",
      "Handle the dynamics of stage space, lights and long duration dancing in makeup and costume",
      "Learn to team play and learn how to mime, use scripts to engage the audience and perform a high quality show",
      "Perform the arangetram which is a life changing and elevating experience",
      "Be prepared to clear ISTD grades above level 4.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-beginner-laya-course-for-dancers": {
    title: "Gandharva Beginner Laya Course for dancers",
    pic: "traditional-thai-dance-by-asian-woman_1168612-264072.avif",
    type: "Advance",
    duration: "10-12",
    descriptions: [
      "The Gandharva professional-level laya course is an advanced program aimed at students dedicated to mastering rhythm in dance. Designed for those with at least 4-5 years of dance experience or those who have completed ISTD Grades 4, 5, or 6, this course focuses on developing a deep understanding of rhythm.",
      "Students will enhance their rhythmic sensitivity, improving their timing, choreography, jathi recitation, and ability to teach others. Additionally, the course prepares students to confidently lead and conduct recitals on stage for other dancers.",
    ],
    prerequisites: [
      "4 to 5 years of dance and possibly exposure to arangetram level items",
      "Having learnt the basic concepts in Laya beginner course",
    ],
    topics: [
      "Karvai practice part 1 (syllables with Karvai constant)",
      "Karvai practice part 2 (syllables with Karvai variation)",
      "Five Jathi eka talam Part 2",
      "Basic breathing exercises",
      "Other talam basics",
      "'Thadhinkinathom' Lessons",
      "Karvai practice for all Talams",
      "175 Talam discussion and other Talam details",
    ],
    outcomes: [
      "Recite and demonstrate putting talam on the palm, the different talam korvais learnt in the class in different Jaathis using more complex gap patterns.",
      "Ability to recite longer and more complex jathis with more complex talas",
      "Prepare for an advanced level tala course where they will learn to compose their own jathis to include in their own dance pieces.",
      "Emote the abhinaya of the selected items",
      "Practice with cymbals so that they can conduct the dance recitals well and get feedback from the teacher on their patterns and choreographies.",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
      {
        duration: "12",
        sessions: 48,
        price: {
          INR: 1500,
          USD: 35,
        },
        discountedPrice: {
          INR: 1250,
          USD: 28,
        }
      },
    ],
  },
  "gandharva-kathak-foundation": {
    title: "Gandharva Kathak Foundation",
    pic: "young-woman-golden-red-dress-dances.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Welcome to the Kathak Foundation Course, where your child will embark on a journey to learn one of India’s most cherished classical dance forms—Kathak. This thoughtfully designed program aims to build a strong base, starting from basic footwork to graceful and expressive movements.",
      "Guided by certified and approachable instructors, your child will experience a supportive and enriching environment. Each 1-on-1 live session is tailored to their pace, ensuring a personalized and effective learning experience.",
      "Through this course, your child will embrace the elegance of the traditional Kathak Namaskar, master intricate rhythmic footwork, and delve into the art of expressive storytelling through Abhinaya. Whether your goal is to instill an appreciation for Kathak’s cultural heritage or help your child perform with poise and confidence, the Gandharva Kathak Foundation Course is the perfect step into this timeless art.",
    ],
    prerequisites: [
      "Interest in dance",
      "Space to dance",
      "Dance uniform to ease dance movements",
      "Patience to learn",
    ],
    topics: [
      "Kathak Namaskar and basic footwork",
      "Fundamental kathak movements",
      "Introduction to Taal, Chakkar and Toda",
      "Importance of Ghunghroo and guru-shishya tradition",
      "Introduction to Abhinaya in Kathak",
    ],
    outcomes: [
      "Develop a good sense of rhythm",
      "Dance the fundamental Kathak movements",
      "Basic footwork in 3 speeds on rhythm",
      "Give Teentaal on hands and recite the basic 3 speeds and basic compositions in it",
      "Dance two basic Todas on the Teentaal rhythm",
      "Develop a basic sense of expressions and perform a Ganesh vandana",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
  "gandharva-bollywood-dance-foundation": {
    title: "Gandharva Bollywood Dance Foundation",
    pic: "woman-blue-dress.avif",
    type: "Foundation",
    duration: "6-8",
    descriptions: [
      "Step onto any dance floor with confidence and flair! The Gandharva Bollywood Foundation course is the perfect way to learn Bollywood dance moves to your favorite songs.",
      "Whether you’re dancing solo in your room, celebrating at a family wedding, grooving at a party, or enjoying a getaway with friends, this course will prepare you to shine anytime, anywhere.",
      "With guidance from certified and professional dance instructors, you’ll enjoy a supportive and engaging learning journey. In personalized 1-on-1 live sessions, your teacher will design a routine tailored to your style and song preferences. They’ll also help you conquer stage fright, so you can dance with ease and captivate everyone with your moves.",
    ],
    topics: [
      "A warm-up routine and a multi-era based Bollywood dance",
      "Energy-based dancing and related dance routine",
      "Learn weight-shifting techniques and related dance routine",
      "Get insights on how to perform effectively and use these techniques to dance to any Bollywood song with confidence and grace",
    ],

    outcomes: [
      "Dance at any party or occasion on any music with confidence",
      "Understand your body movements",
      "Start making your own choreographies",
      "Overcome stage fright",
      "Demonstrate a live performance",
    ],
    links: [
      {
        name: "Acoustic Guitar",
        url: "/courses/acoustic-guitar/",
      },
      {
        name: "Electronic Keyboard",
        url: "/courses/electronic-keyboard/",
      },
      {
        name: "Carnatic Vocals",
        url: "/courses/carnatic-vocals/",
      },
      {
        name: "Kannada Music",
        url: "/courses/kannada-music/",
      },
      {
        name: "Bollywood Dance",
        url: "/courses/bollywood-dance/",
      },
    ],
    packages: [
      {
        duration: "3",
        sessions: 12,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }

      },
      {
        duration: "6",
        sessions: 24,
        price: {
          INR: 900,
          USD: 18,
        },
        discountedPrice: {
          INR: 800,
          USD: 16,
        }
      }
    ],
  },
};

export { CourseDataAll, courseData };
