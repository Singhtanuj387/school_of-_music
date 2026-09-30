"use client";

export interface CuratedMusicSheet {
  id: string;
  title: string;
  category: "INDIAN_CLASSICAL" | "VOCAL_WARMUPS" | "INSTRUMENTAL" | "WESTERN_STAFF";
  instrument: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  ragaOrKey?: string;
  description: string;
  thaatOrScale?: string;
  aarohAvroha?: {
    aaroh: string;
    avroha: string;
    pakad: string;
    vadiSamvadi: string;
  };
  sthayi?: {
    lines: { swaras: string; lyrics: string; matraCount: string }[];
  };
  antara?: {
    lines: { swaras: string; lyrics: string; matraCount: string }[];
  };
  staffNotationText?: string;
  practiceTips: string[];
}

export const CURATED_MUSIC_SHEETS: CuratedMusicSheet[] = [
  {
    id: "sheet-raag-yaman-bandish",
    title: "Raag Yaman — Chhota Khayal (Eri Aali Piya Bin)",
    category: "INDIAN_CLASSICAL",
    instrument: "Vocals / Harmonium / Flute",
    difficulty: "Beginner",
    ragaOrKey: "Raag Yaman (Kalyan Thaat)",
    thaatOrScale: "Kalyan (Teevra Ma)",
    description: "The foundational evening Raga of Hindustani music. Celebrated for serene, romantic and devotional mood.",
    aarohAvroha: {
      aaroh: "‘N R G, M' D N S’",
      avroha: "S’ N D P, M' G R S",
      pakad: "‘N R G, M' P, R, ‘N R S",
      vadiSamvadi: "Vadi: Ga (G) | Samvadi: Ni (N)",
    },
    sthayi: {
      lines: [
        { swaras: "‘N  R  G  –  | M' P  D  P  | M' G  R  –  | S  ‘N  R  S", lyrics: "E - ri  aa - | li - pi - ya | bi - na - - | su - khi - na", matraCount: "Teentaal Matras 1-16 (Sam on E-ri)" },
        { swaras: "G  M' D  –  | N  –  S' –  | N  D  P  –  | M' G  R  S", lyrics: "ka - la - na | pa - - re - | ma - i - ka | de - kho - re", matraCount: "Teentaal Matras 1-16" },
      ],
    },
    antara: {
      lines: [
        { swaras: "G  G  M' –  | P  –  D  –  | N  –  S' –  | S' N  S' –", lyrics: "Ja - ba - se | pi - ya - par | de - sa - ga | va - ne - ki", matraCount: "Teentaal Matras 1-16" },
        { swaras: "S' N  D  P  | M' P  D  P  | M' G  R  –  | S  ‘N  R  S", lyrics: "ra - ti - ya | ka - te - na | bi - te - na | di - na - re", matraCount: "Teentaal Matras 1-16" },
      ],
    },
    practiceTips: [
      "Keep Teevra Ma (M') sharp and pristine; do not touch Shuddha Ma.",
      "Linger with gentle meend from Gandhar (G) to Rishabh (R).",
      "Practice with Tanpura in C or D with Pancham tuning.",
    ],
  },
  {
    id: "sheet-raag-bhairav-alankars",
    title: "Raag Bhairav — Morning Alankars & Palte",
    category: "INDIAN_CLASSICAL",
    instrument: "Vocals / Sitar / Violin",
    difficulty: "Intermediate",
    ragaOrKey: "Raag Bhairav (Bhairav Thaat)",
    thaatOrScale: "Bhairav (Komal Re & Komal Dha)",
    description: "The grand morning king raga featuring characteristic oscillatory Andolan on Komal Re (r) and Komal Dha (d).",
    aarohAvroha: {
      aaroh: "S r G M P d N S’",
      avroha: "S’ N d P M G r S",
      pakad: "G M d~ P, G M r~ S",
      vadiSamvadi: "Vadi: Dha (d) | Samvadi: Re (r)",
    },
    sthayi: {
      lines: [
        { swaras: "S  r~ G  M  | P  d~ N  S' | S' N  d~ P  | M  G  r~ S", lyrics: "Sa re Ga Ma | Pa dha Ni Sa' | Sa' Ni dha Pa | Ma Ga re Sa", matraCount: "Alankar Pattern 1 (Straight Octave)" },
        { swaras: "S r G, r G M | G M P, M P d | P d N, d N S' | S' N d, N d P", lyrics: "Tri-swara patterns highlighting slow oscillation on Komal Re and Dha", matraCount: "Alankar Pattern 2 (Triplet Steps)" },
        { swaras: "G M d~ - P - | G M r~ - S - | ‘N S r~ - S - | G M P - - -", lyrics: "Characteristic Bhairav Ang phrases with deep contemplative gamak", matraCount: "Pakad Chalan Exercise" },
      ],
    },
    practiceTips: [
      "The Andolan on Re and Dha must be slow and wide, oscillating gracefully.",
      "Do not rush; Raag Bhairav radiates peace, solemnity and spiritual awakening.",
      "Sing in Vilambit Laya (60-70 BPM) with Tanpura set to Mandra Sa.",
    ],
  },
  {
    id: "sheet-vocal-warmups-swaras",
    title: "Vocal Agility: 7 Shuddha Swara Alankars & Kharaj Practice",
    category: "VOCAL_WARMUPS",
    instrument: "Vocals / Harmonium",
    difficulty: "Beginner",
    ragaOrKey: "Bilawal Thaat (Natural Major)",
    thaatOrScale: "Bilawal (All Natural Notes)",
    description: "Essential daily voice culture exercises to build steady breath control, vocal resonance, and pitch stability.",
    sthayi: {
      lines: [
        { swaras: "S - - - | R - - - | G - - - | M - - - | P - - - | D - - - | N - - - | S' - - -", lyrics: "Om / Aakar long sustain (Hold each note for 4 full beats)", matraCount: "Pranayama Vocal Breath Sustains" },
        { swaras: "S R G M | R G M P | G M P D | M P D N | P D N S' | S' N D P | N D P M | D P M G", lyrics: "4-note ascending and descending step ladders (Double speed / Drut)", matraCount: "Agility Drill 1" },
        { swaras: "S S R R | G G M M | P P D D | N N S' S' | S' S' N N | D D P P | M M G G | R R S S", lyrics: "Jodi Alankar (Twin strikes for throat articulation and clarity)", matraCount: "Articulation Drill 2" },
      ],
    },
    practiceTips: [
      "Breathe deeply from diaphragm without raising your shoulders.",
      "Produce a pure open 'Aa' sound placing tone forward in the vocal mask.",
      "Start at 80 BPM, then double to 160 BPM once pitch accuracy is solid.",
    ],
  },
  {
    id: "sheet-guitar-chords-arpeggios",
    title: "Acoustic Guitar — Essential Chords & Travis Fingerpicking",
    category: "INSTRUMENTAL",
    instrument: "Acoustic Guitar",
    difficulty: "Intermediate",
    ragaOrKey: "Key of G Major / E Minor",
    thaatOrScale: "G - Em - C - D (I - vi - IV - V)",
    description: "Industry-standard chord progression with fluid fingerstyle arpeggio tabs for accompaniment.",
    staffNotationText: `[Bar 1: G Major]
E|-------3-----------3-------|
B|---------0-----------0-----|
G|-----0-----0-----0-----0---|
D|---------------------------|
A|---------------------------|
E|---3-----------3-----------|
    P  i m i p   P  i m i p

[Bar 2: E Minor]
E|-------0-----------0-------|
B|---------0-----------0-----|
G|-----0-----0-----0-----0---|
D|---------------------------|
A|---------------------------|
E|---0-----------0-----------|

[Bar 3: C Major Add9]
E|-------3-----------3-------|
B|---------3-----------3-----|
G|-----0-----0-----0-----0---|
D|---------------------------|
A|---3-----------3-----------|
E|---------------------------|

[Bar 4: D Suspended 4 to D Major]
E|-------3-----------2-------|
B|---------3-----------3-----|
G|-----2-----2-----2-----2---|
D|---0-----------0-----------|
A|---------------------------|
E|---------------------------|`,
    practiceTips: [
      "Keep thumb (P) responsible for bass strings 6, 5, 4.",
      "Index (i), Middle (m), and Ring (a) cover strings 3, 2, 1.",
      "Use metronome at 80 BPM to lock in rhythmic fluidity before speeding up.",
    ],
  },
  {
    id: "sheet-raag-kafi-thumri",
    title: "Raag Kafi — Light Classical Bandish (Aaj Khelat Hori)",
    category: "INDIAN_CLASSICAL",
    instrument: "Vocals / Sitar / Flute",
    difficulty: "Intermediate",
    ragaOrKey: "Raag Kafi (Kafi Thaat)",
    thaatOrScale: "Kafi (Komal Ga & Komal Ni)",
    description: "The joy and romantic exuberance of spring, holi and celebration. Characterized by playful meends and vivacious bol-taans.",
    aarohAvroha: {
      aaroh: "S R g M P D n S’",
      avroha: "S’ n D P M g R S",
      pakad: "S R g M P, M g R, n. D. S",
      vadiSamvadi: "Vadi: Pancham (P) | Samvadi: Shuddha Re (R)",
    },
    sthayi: {
      lines: [
        { swaras: "P  M  g  R  | S  R  g  M  | P  –  D  –  | P  –  –  –", lyrics: "Aa - ja - khe - | la - ta - ho - | ri - - dhyan | se - - -", matraCount: "Keherwa Taal (8 Matras)" },
        { swaras: "g  M  P  D  | n  D  P  –  | M  g  R  S  | R  –  S  –", lyrics: "brij - ma - hi - | dhu - ma - ma | chi - re - la | la - - -", matraCount: "Keherwa Taal (8 Matras)" },
      ],
    },
    practiceTips: [
      "Gracefully touch Shuddha Ni in descending taans for authentic Thumri style.",
      "Accompany with Keherwa taal on metronome or tabla at 100 BPM.",
    ],
  },
  {
    id: "sheet-piano-solfege-staff",
    title: "Keyboard & Piano — Two-Hand Major Scales & Solfège",
    category: "WESTERN_STAFF",
    instrument: "Piano / Keyboard",
    difficulty: "Beginner",
    ragaOrKey: "C Major (No sharps or flats)",
    thaatOrScale: "C D E F G A B C",
    description: "Standard treble and bass clef coordination exercise with proper fingering rules (1-2-3-1-2-3-4-5).",
    staffNotationText: `Treble Clef (Right Hand):
C4   D4   E4   F4   G4   A4   B4   C5   B4   A4   G4   F4   E4   D4   C4
 1    2    3    1    2    3    4    5    4    3    2    1    3    2    1
(Thumb tuck under on F4 ascending, 3rd finger crossover on E4 descending)

Bass Clef (Left Hand):
C3   D3   E3   F3   G3   A3   B3   C4   B3   A3   G3   F3   E3   D3   C3
 5    4    3    2    1    3    2    1    2    3    1    2    3    4    5
(3rd finger crossover on A3 ascending, thumb tuck under on G3 descending)

Chords (Harmonic Cadence):
C Major (I) -> F Major (IV) -> G7 (V7) -> C Major (I)`,
    practiceTips: [
      "Keep wrists relaxed and fingers naturally curved like holding a tennis ball.",
      "Practice hands separately until fingering tucks are completely effortless.",
    ],
  },
];
