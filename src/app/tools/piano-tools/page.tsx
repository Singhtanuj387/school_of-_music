"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface PianoKey {
  note: string;
  freq: number;
  isBlack: boolean;
  keyChar?: string;
}

const PIANO_KEYS: PianoKey[] = [
  { note: "C4", freq: 261.63, isBlack: false, keyChar: "A" },
  { note: "C#4", freq: 277.18, isBlack: true, keyChar: "W" },
  { note: "D4", freq: 293.66, isBlack: false, keyChar: "S" },
  { note: "D#4", freq: 311.13, isBlack: true, keyChar: "E" },
  { note: "E4", freq: 329.63, isBlack: false, keyChar: "D" },
  { note: "F4", freq: 349.23, isBlack: false, keyChar: "F" },
  { note: "F#4", freq: 369.99, isBlack: true, keyChar: "T" },
  { note: "G4", freq: 392.0, isBlack: false, keyChar: "G" },
  { note: "G#4", freq: 415.3, isBlack: true, keyChar: "Y" },
  { note: "A4", freq: 440.0, isBlack: false, keyChar: "H" },
  { note: "A#4", freq: 466.16, isBlack: true, keyChar: "U" },
  { note: "B4", freq: 493.88, isBlack: false, keyChar: "J" },
  { note: "C5", freq: 523.25, isBlack: false, keyChar: "K" },
  { note: "C#5", freq: 554.37, isBlack: true, keyChar: "O" },
  { note: "D5", freq: 587.33, isBlack: false, keyChar: "L" },
  { note: "D#5", freq: 622.25, isBlack: true, keyChar: "P" },
  { note: "E5", freq: 659.25, isBlack: false, keyChar: ";" },
  { note: "F5", freq: 698.46, isBlack: false },
  { note: "F#5", freq: 739.99, isBlack: true },
  { note: "G5", freq: 783.99, isBlack: false },
  { note: "G#5", freq: 830.61, isBlack: true },
  { note: "A5", freq: 880.0, isBlack: false },
  { note: "A#5", freq: 932.33, isBlack: true },
  { note: "B5", freq: 987.77, isBlack: false },
];

const PRESETS: Record<string, string[]> = {
  None: [],
  "C Major Chord": ["C4", "E4", "G4", "C5"],
  "G Major Chord": ["G4", "B4", "D5", "G5"],
  "F Major Chord": ["F4", "A4", "C5", "F5"],
  "A Minor Chord": ["A4", "C5", "E5"],
  "D Minor Chord": ["D4", "F4", "A4", "D5"],
  "C Major Scale": ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"],
  "A Minor Pentatonic": ["A4", "C5", "D5", "E5", "G5", "A5"],
};

export default function PianoToolsPage() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [selectedPreset, setSelectedPreset] = useState<string>("None");
  const [showKeyBindings, setShowKeyBindings] = useState<boolean>(true);
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

  const playPianoNote = (freq: number, noteName: string) => {
    const ctx = getAudioContext();

    setActiveNotes((prev) => new Set(prev).add(noteName));
    setTimeout(() => {
      setActiveNotes((prev) => {
        const next = new Set(prev);
        next.delete(noteName);
        return next;
      });
    }, 400);

    // Rich Piano Synth with fundamental + 2nd harmonic + exponential damping
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.value = freq;

    osc2.type = "triangle";
    osc2.frequency.value = freq * 2; // Octave overtone

    const now = ctx.currentTime;
    gain1.gain.setValueAtTime(0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

    gain2.gain.setValueAtTime(0.15, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.6);
    osc2.stop(now + 0.8);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyChar = e.key.toUpperCase();
      const match = PIANO_KEYS.find((k) => k.keyChar === keyChar);
      if (match) {
        playPianoNote(match.freq, match.note);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const highlightedNotes = new Set(PRESETS[selectedPreset] || []);

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
            Virtual Piano & Chord Visualizer
          </h1>
          <p className="text-purple-200 text-sm sm:text-base">
            Play with your mouse or computer keyboard. Highlight scales and chords to master music theory.
          </p>
        </div>
      </section>

      {/* Main Piano Canvas */}
      <main className="py-12 md:py-16 px-4 flex-1 bg-gray-50/60 flex flex-col items-center">
        <div className="max-w-5xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <label htmlFor="preset-select" className="text-xs font-bold text-gray-500 uppercase">Scale / Chord Preset:</label>
              <select
                id="preset-select"
                aria-label="Scale or chord preset"
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gray-300 text-sm font-semibold text-[#24105E] focus:outline-none focus:ring-2 focus:ring-[#9506EE]"
              >
                {Object.keys(PRESETS).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowKeyBindings(!showKeyBindings)}
              className="text-xs font-bold text-[#9506EE] hover:underline"
            >
              {showKeyBindings ? "Hide Keyboard Shortcuts" : "Show Keyboard Shortcuts"}
            </button>
          </div>

          {/* Interactive Keyboard */}
          <div className="relative overflow-x-auto pb-6 scrollbar-none flex justify-center">
            <div className="relative flex select-none bg-gray-900 p-2 sm:p-3 rounded-2xl shadow-2xl">
              {PIANO_KEYS.map((k) => {
                const isPlaying = activeNotes.has(k.note);
                const isPresetActive = highlightedNotes.has(k.note);

                if (!k.isBlack) {
                  return (
                    <button
                      key={k.note}
                      onClick={() => playPianoNote(k.freq, k.note)}
                      className={`relative w-10 sm:w-14 h-48 sm:h-64 rounded-b-xl border border-gray-300 flex flex-col justify-end items-center pb-4 transition-all duration-75 cursor-pointer ${
                        isPlaying
                          ? "bg-purple-200 border-purple-500 shadow-inner"
                          : isPresetActive
                          ? "bg-orange-100 border-[#FF7703]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {isPresetActive && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF7703] mb-2" />
                      )}
                      <span className="text-xs sm:text-sm font-bold text-gray-800">{k.note}</span>
                      {showKeyBindings && k.keyChar && (
                        <span className="text-[10px] text-gray-400 font-mono mt-0.5">[{k.keyChar}]</span>
                      )}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={k.note}
                      onClick={() => playPianoNote(k.freq, k.note)}
                      className={`absolute z-10 w-7 sm:w-9 h-28 sm:h-38 rounded-b-lg flex flex-col justify-end items-center pb-2 transition-all duration-75 cursor-pointer shadow-md ${
                        isPlaying
                          ? "bg-purple-600 text-white"
                          : isPresetActive
                          ? "bg-[#FF7703] text-white"
                          : "bg-gray-900 text-gray-200 hover:bg-gray-800"
                      }`}
                      style={{
                        marginLeft: `${
                          PIANO_KEYS.slice(0, PIANO_KEYS.findIndex((pk) => pk.note === k.note)).filter(
                            (pk) => !pk.isBlack
                          ).length *
                            (typeof window !== "undefined" && window.innerWidth < 640 ? 40 : 56) -
                          (typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 18)
                        }px`,
                      }}
                    >
                      <span className="text-[10px] font-bold">{k.note}</span>
                      {showKeyBindings && k.keyChar && (
                        <span className="text-[9px] text-gray-400 font-mono mt-0.5">[{k.keyChar}]</span>
                      )}
                    </button>
                  );
                }
              })}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Tip: Press letter keys [A, W, S, E, D, F, T, G, Y, H, U, J, K, O, L] on your computer keyboard to play notes in real time.
          </p>
        </div>
      </main>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
