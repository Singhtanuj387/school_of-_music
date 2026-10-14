"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function MetronomePage() {
  const [bpm, setBpm] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const currentBeatRef = useRef<number>(0);
  const bpmRef = useRef<number>(bpm);
  const beatsPerMeasureRef = useRef<number>(beatsPerMeasure);

  // Tap tempo state
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    beatsPerMeasureRef.current = beatsPerMeasure;
  }, [beatsPerMeasure]);

  const getTempoTerm = (tempo: number) => {
    if (tempo < 60) return "Largo (Very Slow)";
    if (tempo < 76) return "Adagio (Slow & Stately)";
    if (tempo < 108) return "Andante (Walking Pace)";
    if (tempo < 120) return "Moderato (Moderate)";
    if (tempo < 168) return "Allegro (Fast & Bright)";
    if (tempo < 200) return "Vivace (Lively & Fast)";
    return "Presto (Extremely Fast)";
  };

  const playClick = (time: number, isAccent: boolean) => {
    if (!audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = "sine";
    osc.frequency.value = isAccent ? 1200 : 800;

    gain.gain.setValueAtTime(isAccent ? 0.9 : 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start(time);
    osc.stop(time + 0.05);
  };

  const scheduler = () => {
    if (!audioCtxRef.current) return;

    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + 0.1) {
      const isAccent = currentBeatRef.current === 0;
      playClick(nextNoteTimeRef.current, isAccent);

      const beatToShow = currentBeatRef.current;
      setTimeout(() => {
        setCurrentBeat(beatToShow);
      }, Math.max(0, (nextNoteTimeRef.current - audioCtxRef.current!.currentTime) * 1000));

      // Advance
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasureRef.current;
    }

    timerIdRef.current = window.setTimeout(scheduler, 25);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      setIsPlaying(false);
      setCurrentBeat(0);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      currentBeatRef.current = 0;
      nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
      setIsPlaying(true);
      scheduler();
    }
  };

  const handleTap = () => {
    const now = performance.now();
    const taps = tapTimesRef.current;

    // Clear taps if more than 2.5s since last tap
    if (taps.length > 0 && now - taps[taps.length - 1] > 2500) {
      tapTimesRef.current = [now];
      return;
    }

    taps.push(now);
    if (taps.length > 4) taps.shift();

    if (taps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

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
            Interactive Metronome
          </h1>
          <p className="text-purple-200 text-sm sm:text-base">
            Audio-snythesized precision metronome with customizable beats, tap tempo, and visual feedback.
          </p>
        </div>
      </section>

      {/* Main Interactive Metronome Panel */}
      <main className="py-12 px-4 flex-1 flex flex-col items-center justify-center bg-gray-50/60">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 flex flex-col items-center">
          {/* Visual Beat Indicators */}
          <div className="flex items-center gap-3 mb-8">
            {Array.from({ length: beatsPerMeasure }).map((_, index) => {
              const isActive = isPlaying && currentBeat === index;
              const isDownbeat = index === 0;
              return (
                <div
                  key={index}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-100 ${
                    isActive
                      ? isDownbeat
                        ? "bg-[#FF7703] scale-125 shadow-lg shadow-orange-500/50"
                        : "bg-[#9506EE] scale-125 shadow-lg shadow-purple-500/50"
                      : "bg-gray-200"
                  }`}
                />
              );
            })}
          </div>

          {/* BPM Readout */}
          <div className="text-center mb-6">
            <span className="text-6xl sm:text-7xl font-extrabold text-[#24105E] tracking-tight">
              {bpm}
            </span>
            <span className="text-base text-gray-400 font-bold ml-2">BPM</span>
            <p className="text-xs sm:text-sm font-semibold text-[#FF7703] mt-1 uppercase tracking-wider">
              {getTempoTerm(bpm)}
            </p>
          </div>

          {/* Tempo Slider */}
          <div className="w-full px-2 mb-8">
            <input
              type="range"
              min="40"
              max="240"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-[#9506EE]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-bold mt-1.5 px-1">
              <span>40 (Largo)</span>
              <span>120 (Moderato)</span>
              <span>240 (Prestissimo)</span>
            </div>
          </div>

          {/* Tempo Adjust Buttons (+/-) */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => setBpm((prev) => Math.max(40, prev - 5))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
            >
              -5
            </button>
            <button
              onClick={() => setBpm((prev) => Math.max(40, prev - 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
            >
              -1
            </button>
            <button
              onClick={handleTap}
              className="px-6 py-2 bg-purple-50 hover:bg-purple-100 text-[#9506EE] border border-purple-200 font-bold rounded-xl text-sm transition-all shadow-sm active:scale-95"
            >
              TAP TEMPO
            </button>
            <button
              onClick={() => setBpm((prev) => Math.min(240, prev + 1))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
            >
              +1
            </button>
            <button
              onClick={() => setBpm((prev) => Math.min(240, prev + 5))}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm transition-all"
            >
              +5
            </button>
          </div>

          {/* Time Signature Buttons */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { beats: 2, label: "2/4" },
              { beats: 3, label: "3/4" },
              { beats: 4, label: "4/4" },
              { beats: 6, label: "6/8" },
            ].map((ts) => (
              <button
                key={ts.beats}
                onClick={() => setBeatsPerMeasure(ts.beats)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  beatsPerMeasure === ts.beats
                    ? "bg-[#24105E] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>

          {/* Primary Play / Stop Button */}
          <button
            onClick={toggleMetronome}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3 ${
              isPlaying
                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/30"
                : "bg-[#FF7703] hover:bg-[#e06902] shadow-orange-500/30"
            }`}
          >
            {isPlaying ? (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>STOP</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>START METRONOME</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* 24/7 Support Banner */}
      <div className="bg-[#FF9E00] py-4 text-white text-center font-medium text-base sm:text-lg tracking-wide">
        24/7 Dedicated Customer Support
      </div>
    </div>
  );
}
