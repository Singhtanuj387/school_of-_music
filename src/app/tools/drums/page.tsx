"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DrumPad {
  id: string;
  name: string;
  keyChar: string;
  color: string;
}

const PADS: DrumPad[] = [
  { id: "kick", name: "Bass Kick", keyChar: "1", color: "from-purple-600 to-indigo-700" },
  { id: "snare", name: "Acoustic Snare", keyChar: "2", color: "from-orange-500 to-amber-600" },
  { id: "hihat_closed", name: "Closed Hi-Hat", keyChar: "3", color: "from-cyan-500 to-blue-600" },
  { id: "hihat_open", name: "Open Hi-Hat", keyChar: "4", color: "from-teal-500 to-emerald-600" },
  { id: "tom", name: "Floor Tom", keyChar: "5", color: "from-pink-500 to-rose-600" },
  { id: "crash", name: "Crash Cymbal", keyChar: "6", color: "from-amber-400 to-yellow-600" },
];

export default function DrumsPage() {
  const [activePad, setActivePad] = useState<string | null>(null);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const loopTimerRef = useRef<number | null>(null);

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

  const createWhiteNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const triggerDrum = (padId: string) => {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    setActivePad(padId);
    setTimeout(() => setActivePad(null), 150);

    if (padId === "kick") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (padId === "snare") {
      // Noise component
      const noise = ctx.createBufferSource();
      noise.buffer = createWhiteNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.8, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.2);

      // Tone component
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      oscGain.gain.setValueAtTime(0.6, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (padId === "hihat_closed") {
      const noise = ctx.createBufferSource();
      noise.buffer = createWhiteNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 7000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);
    } else if (padId === "hihat_open") {
      const noise = ctx.createBufferSource();
      noise.buffer = createWhiteNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 6000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.6, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.35);
    } else if (padId === "tom") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (padId === "crash") {
      const noise = ctx.createBufferSource();
      noise.buffer = createWhiteNoiseBuffer(ctx);
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 5000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 1.2);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const match = PADS.find((p) => p.keyChar === e.key);
      if (match) {
        triggerDrum(match.id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleRockLoop = () => {
    if (isLooping) {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
      setIsLooping(false);
    } else {
      setIsLooping(true);
      let step = 0;
      loopTimerRef.current = window.setInterval(() => {
        // 8-step standard rock groove
        // Steps 0..7 (each is an 8th note at 100 BPM = 150ms)
        triggerDrum("hihat_closed"); // Every 8th note
        if (step === 0 || step === 4) triggerDrum("kick"); // Beats 1 and 3
        if (step === 2 || step === 6) triggerDrum("snare"); // Beats 2 and 4
        step = (step + 1) % 8;
      }, 150);
    }
  };

  useEffect(() => {
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current);
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
            Virtual Drum Machine
          </h1>
          <p className="text-purple-200 text-sm sm:text-base">
            Synthesized percussion pads. Click or press keys [1-6] on your keyboard.
          </p>
        </div>
      </section>

      {/* Main Drum Pads */}
      <main className="py-12 md:py-16 px-4 flex-1 bg-gray-50/60 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-[#24105E]">Percussion Performance Pads</h2>
            <button
              onClick={toggleRockLoop}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer flex items-center gap-2 ${
                isLooping
                  ? "bg-rose-600 text-white shadow-rose-600/30"
                  : "bg-[#FF7703] hover:bg-[#e06902] text-white shadow-orange-500/30"
              }`}
            >
              {isLooping ? "Stop Backing Loop" : "Play Backing Rock Groove"}
            </button>
          </div>

          {/* Pads Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {PADS.map((pad) => {
              const isTriggered = activePad === pad.id;
              return (
                <button
                  key={pad.id}
                  onClick={() => triggerDrum(pad.id)}
                  className={`relative h-36 sm:h-44 rounded-2xl p-5 flex flex-col justify-between items-start text-white shadow-lg transition-all duration-100 cursor-pointer select-none bg-gradient-to-br ${
                    pad.color
                  } ${
                    isTriggered
                      ? "scale-95 brightness-125 ring-4 ring-white"
                      : "hover:scale-[1.02] hover:shadow-xl"
                  }`}
                >
                  <span className="px-2.5 py-1 rounded-md bg-black/30 text-xs font-mono font-bold">
                    Key: {pad.keyChar}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">{pad.name}</h3>
                    <p className="text-[11px] text-white/80 font-medium mt-1">Tap to trigger</p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Use your keyboard numbers [1], [2], [3], [4], [5], [6] to jam in real-time.
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
