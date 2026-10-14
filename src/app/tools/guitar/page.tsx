"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface GuitarString {
  number: number;
  note: string;
  octave: number;
  freq: number;
  label: string;
}

interface ChordData {
  name: string;
  difficulty: string;
  frets: (number | "x")[]; // 6 values: Low E to High E (-1 or "x" for mute, 0 for open, 1-4 for fret)
  fingers: (number | "")[];
  notes: number[]; // Frequencies for strumming
}

const STRINGS: GuitarString[] = [
  { number: 6, note: "E", octave: 2, freq: 82.41, label: "6th (Low E)" },
  { number: 5, note: "A", octave: 2, freq: 110.0, label: "5th (A)" },
  { number: 4, note: "D", octave: 3, freq: 146.83, label: "4th (D)" },
  { number: 3, note: "G", octave: 3, freq: 196.0, label: "3rd (G)" },
  { number: 2, note: "B", octave: 3, freq: 246.94, label: "2nd (B)" },
  { number: 1, note: "E", octave: 4, freq: 329.63, label: "1st (High E)" },
];

const CHORDS: Record<string, ChordData> = {
  "C Major": {
    name: "C Major",
    difficulty: "Beginner",
    frets: ["x", 3, 2, 0, 1, 0],
    fingers: ["", 3, 2, "", 1, ""],
    notes: [130.81, 164.81, 196.0, 261.63, 329.63],
  },
  "G Major": {
    name: "G Major",
    difficulty: "Beginner",
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, "", "", "", 3],
    notes: [98.0, 123.47, 146.83, 196.0, 246.94, 392.0],
  },
  "D Major": {
    name: "D Major",
    difficulty: "Beginner",
    frets: ["x", "x", 0, 2, 3, 2],
    fingers: ["", "", "", 1, 3, 2],
    notes: [146.83, 220.0, 293.66, 369.99],
  },
  "E Minor": {
    name: "E Minor",
    difficulty: "Beginner",
    frets: [0, 2, 2, 0, 0, 0],
    fingers: ["", 2, 3, "", "", ""],
    notes: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63],
  },
  "A Minor": {
    name: "A Minor",
    difficulty: "Beginner",
    frets: ["x", 0, 2, 2, 1, 0],
    fingers: ["", "", 2, 3, 1, ""],
    notes: [110.0, 164.81, 220.0, 261.63, 329.63],
  },
  "F Major": {
    name: "F Major",
    difficulty: "Intermediate (Barre)",
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    notes: [87.31, 130.81, 174.61, 220.0, 261.63, 349.23],
  },
};

export default function GuitarTunerPage() {
  const [activeString, setActiveString] = useState<number | null>(null);
  const [selectedChord, setSelectedChord] = useState<string>("C Major");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const pluckNote = (frequency: number, stringNumber?: number) => {
    const ctx = getAudioContext();
    if (stringNumber !== undefined) {
      setActiveString(stringNumber);
      setTimeout(() => setActiveString(null), 1800);
    }

    // Karplus-Strong / pluck style synthesizer using filtered saw + decay
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sawtooth";
    osc.frequency.value = frequency;

    // Lowpass filter simulates warm acoustic wooden resonance
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(frequency * 3.5, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(frequency * 0.8, ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.0);
  };

  const strumChord = (notes: number[]) => {
    notes.forEach((freq, index) => {
      setTimeout(() => {
        pluckNote(freq);
      }, index * 45); // slight stagger simulates strumming pick
    });
  };

  const chord = CHORDS[selectedChord];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Header Bar */}
      <section className="bg-[#24105E] pt-24 md:pt-28 pb-12 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/tools" className="inline-flex items-center text-xs text-purple-200 hover:text-white mb-3">
            ← Back to Practice Tools
          </Link>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
            style={{ fontFamily: "var(--font-vidaloka), serif" }}
          >
            Guitar Tuner & Chord Library
          </h1>
          <p className="text-purple-200 text-sm sm:text-base">
            Pluck strings for standard pitch reference or explore visual chord fretboard fingerings with audio playback.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="py-12 md:py-16 px-4 flex-1 bg-gray-50/60">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section 1: Interactive Tuner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#24105E] mb-1">Standard Tuning (E A D G B E)</h2>
                <p className="text-gray-500 text-sm">Click any string to play reference pitch.</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 w-fit">
                Concert Pitch A4 = 440 Hz
              </span>
            </div>

            {/* Guitar Headstock / String Pegs Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {STRINGS.map((str) => {
                const isActive = activeString === str.number;
                return (
                  <button
                    key={str.number}
                    onClick={() => pluckNote(str.freq, str.number)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1 ${
                      isActive
                        ? "border-[#FF7703] bg-orange-50/70 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-[#9506EE] hover:bg-purple-50/50"
                    }`}
                  >
                    <span className="text-xs text-gray-400 font-bold uppercase mb-1">String {str.number}</span>
                    <span className="text-3xl font-extrabold text-[#24105E]">{str.note}</span>
                    <span className="text-[11px] text-gray-500 font-medium mt-1">{str.freq} Hz</span>
                    <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          isActive ? "bg-[#FF7703] w-full animate-pulse" : "bg-transparent"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Interactive Chord Finder */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#24105E] mb-1">Guitar Chord Library</h2>
                <p className="text-gray-500 text-sm">Select a chord to inspect finger positions and hear the full strum.</p>
              </div>
              <button
                onClick={() => strumChord(chord.notes)}
                className="px-6 py-2.5 bg-[#FF7703] hover:bg-[#e06902] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Strum {chord.name}</span>
              </button>
            </div>

            {/* Chord Selection Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(CHORDS).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedChord(name)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    selectedChord === name
                      ? "bg-[#9506EE] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Visual Chord Diagram */}
            <div className="bg-purple-50/60 rounded-2xl p-6 border border-purple-100 flex flex-col md:flex-row items-center justify-around gap-8">
              {/* Chord Stats */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9506EE] bg-white px-3 py-1 rounded-full border border-purple-200">
                  {chord.difficulty}
                </span>
                <h3 className="text-4xl font-extrabold text-[#24105E] mt-3">{chord.name}</h3>
                <p className="text-gray-600 text-sm mt-2 max-w-xs">
                  Strings: <strong>E A D G B E</strong> (from 6th to 1st)
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  x = Muted/unplayed string • 0 = Open string
                </p>
              </div>

              {/* Fretboard Representation */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="grid grid-cols-6 gap-3 text-center mb-2 text-xs font-bold text-gray-400">
                  {["E", "A", "D", "G", "B", "e"].map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                </div>

                {/* Top nut indicators */}
                <div className="grid grid-cols-6 gap-3 text-center mb-2 font-bold text-sm">
                  {chord.frets.map((fret, i) => (
                    <span
                      key={i}
                      className={
                        fret === "x"
                          ? "text-rose-500"
                          : fret === 0
                          ? "text-green-600"
                          : "text-gray-400 text-xs"
                      }
                    >
                      {fret === "x" ? "✕" : fret === 0 ? "○" : `F${fret}`}
                    </span>
                  ))}
                </div>

                <div className="w-56 h-3 bg-amber-900 rounded-sm mb-3" />

                {/* 4 Frets Visualizer */}
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((fretNum) => (
                    <div key={fretNum} className="relative flex items-center justify-between pb-2 border-b border-gray-300">
                      <span className="text-[10px] text-gray-400 w-4 font-mono">{fretNum}</span>
                      <div className="grid grid-cols-6 gap-3 w-full pl-2">
                        {chord.frets.map((fret, stringIdx) => {
                          const isPressed = fret === fretNum;
                          return (
                            <div key={stringIdx} className="flex justify-center">
                              {isPressed ? (
                                <div className="w-5 h-5 rounded-full bg-[#9506EE] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                                  {chord.fingers[stringIdx]}
                                </div>
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-2" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
