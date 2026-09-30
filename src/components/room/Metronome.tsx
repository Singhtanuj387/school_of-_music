"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface MetronomeProps {
  isOpen: boolean;
  onClose: () => void;
}

type SoundTimbre = "woodblock" | "clay" | "digital" | "rimshot";

interface TimeSignaturePreset {
  id: string;
  name: string;
  subtitle: string;
  beats: number;
}

const TIME_SIGNATURES: TimeSignaturePreset[] = [
  { id: "4/4", name: "4/4", subtitle: "Common", beats: 4 },
  { id: "3/4", name: "3/4", subtitle: "Waltz", beats: 3 },
  { id: "2/4", name: "2/4", subtitle: "March", beats: 2 },
  { id: "6/8", name: "6/8", subtitle: "Compound", beats: 6 },
  { id: "tintal", name: "Teentaal", subtitle: "16 Matra", beats: 16 },
  { id: "keherwa", name: "Keherwa", subtitle: "8 Matra", beats: 8 },
  { id: "dadra", name: "Dadra", subtitle: "6 Matra", beats: 6 },
  { id: "rupak", name: "Rupak", subtitle: "7 Matra", beats: 7 },
];

const TIMBRE_OPTIONS: { id: SoundTimbre; label: string; icon: string }[] = [
  { id: "woodblock", label: "Woodblock", icon: "🪵" },
  { id: "clay", label: "Ghatam", icon: "🏺" },
  { id: "digital", label: "Digital", icon: "⚡" },
  { id: "rimshot", label: "Rimshot", icon: "🥁" },
];

function getTempoLabel(bpm: number): { italian: string; indian: string } {
  if (bpm < 60) return { italian: "Largo", indian: "Vilambit Laya" };
  if (bpm < 76) return { italian: "Adagio", indian: "Vilambit Laya" };
  if (bpm < 108) return { italian: "Andante", indian: "Madhya Laya" };
  if (bpm < 120) return { italian: "Moderato", indian: "Madhya Laya" };
  if (bpm < 156) return { italian: "Allegro", indian: "Drut Laya" };
  if (bpm < 190) return { italian: "Vivace", indian: "Drut Laya" };
  return { italian: "Presto", indian: "Ati Drut Laya" };
}

/**
 * Premium Studio Metronome Synthesizer
 * Built with Web Audio API for ultra-low latency timing accuracy.
 */
export function Metronome({ isOpen, onClose }: MetronomeProps) {
  const [bpm, setBpm] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundTimbre, setSoundTimbre] = useState<SoundTimbre>("woodblock");
  const [selectedSignature, setSelectedSignature] = useState("4/4");
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [subdivision, setSubdivision] = useState<number>(1); // 1 = quarter, 2 = eighth, 3 = triplet, 4 = sixteenth
  const [volume, setVolume] = useState<number>(0.75);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isBeatFlashing, setIsBeatFlashing] = useState(false);
  const [tapFeedback, setTapFeedback] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentSubBeatRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const tapTimesRef = useRef<number[]>([]);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play synthetic click using Web Audio API
  const playClick = useCallback(
    (time: number, isFirstBeat: boolean, isSubdivision: boolean) => {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      const masterVol = volume;

      if (soundTimbre === "woodblock") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(isFirstBeat ? 1650 : isSubdivision ? 650 : 1050, time);
        filter.Q.setValueAtTime(10, time);

        osc.type = "sine";
        osc.frequency.setValueAtTime(isFirstBeat ? 1450 : isSubdivision ? 720 : 980, time);

        const vol = (isFirstBeat ? 0.95 : isSubdivision ? 0.35 : 0.7) * masterVol;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.045);
      } else if (soundTimbre === "clay") {
        // Indian earthen ghatam/khol percussive pulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(isFirstBeat ? 520 : isSubdivision ? 240 : 340, time);

        const vol = (isFirstBeat ? 0.9 : isSubdivision ? 0.35 : 0.65) * masterVol;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.08);
      } else if (soundTimbre === "digital") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(isFirstBeat ? 2400 : isSubdivision ? 900 : 1350, time);

        const vol = (isFirstBeat ? 0.65 : isSubdivision ? 0.22 : 0.45) * masterVol;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.03);
      } else {
        // Drum rimshot
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(isFirstBeat ? 2100 : 1250, time);

        const vol = (isFirstBeat ? 0.85 : isSubdivision ? 0.28 : 0.6) * masterVol;
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.045);
      }
    },
    [soundTimbre, volume],
  );

  // Look-ahead Web Audio scheduler
  const scheduler = useCallback(() => {
    if (!audioContextRef.current) return;

    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      const isFirst = currentBeatRef.current === 0 && currentSubBeatRef.current === 0;
      const isSub = currentSubBeatRef.current > 0;

      playClick(nextNoteTimeRef.current, isFirst, isSub);

      if (currentSubBeatRef.current === 0) {
        const beatNum = currentBeatRef.current;
        const delayMs = Math.max(0, (nextNoteTimeRef.current - audioContextRef.current.currentTime) * 1000);
        setTimeout(() => {
          setCurrentBeat(beatNum);
          setIsBeatFlashing(true);
          if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
          flashTimeoutRef.current = setTimeout(() => setIsBeatFlashing(false), 80);
        }, delayMs);
      }

      const secondsPerBeat = 60.0 / bpm / subdivision;
      nextNoteTimeRef.current += secondsPerBeat;

      currentSubBeatRef.current = (currentSubBeatRef.current + 1) % subdivision;
      if (currentSubBeatRef.current === 0) {
        currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasure;
      }
    }

    timerIdRef.current = window.setTimeout(scheduler, 25);
  }, [bpm, beatsPerMeasure, subdivision, playClick]);

  const togglePlay = () => {
    if (isPlaying) {
      if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
      setIsPlaying(false);
      setCurrentBeat(0);
      currentBeatRef.current = 0;
      currentSubBeatRef.current = 0;
    } else {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      currentBeatRef.current = 0;
      currentSubBeatRef.current = 0;
      nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.05;
      setIsPlaying(true);
      scheduler();
    }
  };

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTapTempo = () => {
    const now = performance.now();
    const tapTimes = tapTimesRef.current;
    tapTimes.push(now);
    setTapFeedback(true);
    setTimeout(() => setTapFeedback(false), 150);

    if (tapTimes.length > 4) tapTimes.shift();
    if (tapTimes.length > 1) {
      const intervals: number[] = [];
      for (let i = 1; i < tapTimes.length; i++) {
        intervals.push(tapTimes[i] - tapTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  const handleSignatureSelect = (sig: TimeSignaturePreset) => {
    setSelectedSignature(sig.id);
    setBeatsPerMeasure(sig.beats);
    setCurrentBeat(0);
    currentBeatRef.current = 0;
  };

  if (!isOpen) return null;

  const tempoLabel = getTempoLabel(bpm);

  // SVG Gauge Calculations (240 degree arc)
  const minBpm = 40;
  const maxBpm = 240;
  const progressRatio = Math.max(0, Math.min(1, (bpm - minBpm) / (maxBpm - minBpm)));
  const radius = 64;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  // Use 70% of circle for a horse-shoe arc
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength * (1 - progressRatio);

  return (
    <div className="absolute bottom-20 right-4 z-50 w-84 sm:w-92 max-h-[calc(100vh-120px)] overflow-y-auto bg-[#1B0C33]/98 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border-0 space-y-4 animate-in fade-in slide-in-from-bottom-3 text-stone-100 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center text-accent font-bold text-base shadow-xs">
            ⏱
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-white tracking-wide">
              Studio Metronome
            </h4>
            <p className="text-[10px] text-stone-400 font-mono">
              High-Precision WebAudio Clock
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-[#20103B] hover:bg-[#2F1757] text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
        >
          ✕
        </button>
      </div>

      {/* Primary Circular Gauge & Center Tempo Readout */}
      <div className="relative flex flex-col items-center justify-center py-2">
        <div className="relative w-52 h-52 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* SVG Circular Dial */}
          <svg className="w-full h-full transform -rotate-135" viewBox="0 0 200 200">
            {/* Background Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#2A134A"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${circumference}`}
            />
            {/* Dynamic Active Progress Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#metronome-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${arcLength} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-75"
            />
            <defs>
              <linearGradient id="metronome-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9810FA" />
                <stop offset="50%" stopColor="#C026D3" />
                <stop offset="100%" stopColor="#FF7803" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Beat Pulse Ring */}
          <div
            className={`absolute inset-4 rounded-full flex flex-col items-center justify-center bg-[#120624]/90 transition-all duration-100 border-0 ${
              isPlaying && isBeatFlashing
                ? currentBeat === 0
                  ? "ring-4 ring-accent/60 shadow-glow-accent scale-102"
                  : "ring-2 ring-primary/50 shadow-glow-cta scale-101"
                : ""
            }`}
          >
            {/* Tempo Text */}
            <span className="text-4xl sm:text-5xl font-serif font-black text-white tracking-tight leading-none drop-shadow-sm">
              {bpm}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-300 font-bold mt-1">
              BPM
            </span>
            <div className="mt-1 flex flex-col items-center">
              <span className="text-[11px] font-serif font-bold text-accent">
                {tempoLabel.italian}
              </span>
              <span className="text-[9px] font-mono text-stone-400">
                {tempoLabel.indian}
              </span>
            </div>
          </div>
        </div>

        {/* Tactile ± Step Buttons & Tap Tempo Row */}
        <div className="flex items-center gap-1.5 mt-2">
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(minBpm, b - 5))}
            className="px-2.5 py-1.5 rounded-xl bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200 border-0 font-mono font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Minus 5 BPM"
          >
            -5
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.max(minBpm, b - 1))}
            className="px-2.5 py-1.5 rounded-xl bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200 border-0 font-mono font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Minus 1 BPM"
          >
            -1
          </button>

          {/* Tap Tempo */}
          <button
            type="button"
            onClick={handleTapTempo}
            className={`px-4 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-sm flex items-center gap-1 border-0 ${
              tapFeedback
                ? "bg-accent-hover text-white scale-105"
                : "bg-accent hover:bg-accent-hover text-white"
            }`}
            title="Tap repeatedly to detect tempo"
          >
            <span>Tap</span>
            <span className="text-[10px]">✨</span>
          </button>

          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(maxBpm, b + 1))}
            className="px-2.5 py-1.5 rounded-xl bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200 border-0 font-mono font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Plus 1 BPM"
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => setBpm((b) => Math.min(maxBpm, b + 5))}
            className="px-2.5 py-1.5 rounded-xl bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200 border-0 font-mono font-bold text-xs active:scale-95 transition-all cursor-pointer shadow-xs"
            title="Plus 5 BPM"
          >
            +5
          </button>
        </div>

        {/* BPM Quick Slider */}
        <div className="w-full px-2 mt-2.5">
          <input
            type="range"
            min={minBpm}
            max={maxBpm}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-accent cursor-pointer h-1.5 bg-[#2A134A] rounded-lg"
          />
        </div>
      </div>

      {/* Beat Visualizer Indicators */}
      <div className="bg-[#120624]/90 border-0 rounded-2xl p-3 flex flex-col items-center space-y-2">
        <div className="flex items-center justify-between w-full px-1 text-[10px] font-mono text-stone-300">
          <span>Beat Progress</span>
          <span className="text-accent font-bold">
            {isPlaying ? `${currentBeat + 1} / ${beatsPerMeasure}` : `1 / ${beatsPerMeasure}`}
          </span>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-1.5 w-full">
          {Array.from({ length: beatsPerMeasure }).map((_, i) => {
            const isCurrent = isPlaying && currentBeat === i;
            const isFirst = i === 0;

            return (
              <div
                key={i}
                className={`transition-all duration-75 rounded-full flex items-center justify-center ${
                  isFirst ? "w-4 h-4" : "w-3 h-3"
                } ${
                  isCurrent
                    ? isFirst
                      ? "bg-accent shadow-glow-accent scale-125"
                      : "bg-cta shadow-glow-cta scale-110"
                    : "bg-[#25103E] opacity-70"
                }`}
                title={`Beat ${i + 1}${isFirst ? " (Sam/Downbeat)" : ""}`}
              >
                {isFirst && (
                  <span className="text-[8px] font-black text-white leading-none">
                    ★
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Timbre Sound Selector */}
      <div className="space-y-1.5">
        <div className="text-[10.5px] font-mono text-stone-300 px-1 font-semibold">Timbre Voice:</div>
        <div className="grid grid-cols-4 gap-1.5 bg-[#120624]/90 border-0 p-1 rounded-2xl">
          {TIMBRE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSoundTimbre(t.id)}
              className={`py-1.5 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 transition-all cursor-pointer active:scale-95 border-0 ${
                soundTimbre === t.id
                  ? "bg-primary text-white shadow-xs"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <span className="text-sm">{t.icon}</span>
              <span className="text-[10px] leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pattern / Time Signature Presets */}
      <div className="space-y-1.5">
        <div className="text-[10.5px] font-mono text-stone-300 px-1 font-semibold">Rhythm Pattern / Taal:</div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TIME_SIGNATURES.map((sig) => (
            <button
              key={sig.id}
              type="button"
              onClick={() => handleSignatureSelect(sig)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer active:scale-95 text-left flex flex-col border-0 ${
                selectedSignature === sig.id
                  ? "bg-accent text-white shadow-xs"
                  : "bg-[#2A134A] text-stone-300 hover:bg-[#3D1D69] hover:text-white"
              }`}
            >
              <span className="font-bold text-xs leading-none">{sig.name}</span>
              <span className="text-[9px] opacity-80 font-mono mt-0.5">{sig.subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subdivisions & Volume Row */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        {/* Subdivisions */}
        <div className="flex items-center gap-1 bg-[#120624]/90 border-0 p-1 rounded-xl">
          {[
            { val: 1, label: "1/4", icon: "♩" },
            { val: 2, label: "1/8", icon: "♪" },
            { val: 3, label: "3ple", icon: "3" },
            { val: 4, label: "1/16", icon: "♬" },
          ].map((sub) => (
            <button
              key={sub.val}
              type="button"
              onClick={() => setSubdivision(sub.val)}
              className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-0.5 border-0 ${
                subdivision === sub.val
                  ? "bg-primary text-white shadow-xs"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              <span className="text-[11px]">{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          ))}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-1.5 bg-[#120624]/90 border-0 px-3 py-1.5 rounded-xl">
          <span className="text-[11px] text-accent">🔊</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-16 accent-accent cursor-pointer h-1 bg-[#2D144E] rounded"
            title="Volume"
          />
        </div>
      </div>

      {/* Main Play / Stop Action Button */}
      <button
        type="button"
        onClick={togglePlay}
        className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
          isPlaying
            ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
            : "bg-cta hover:bg-cta-hover text-white shadow-md shadow-cta/30 font-bold"
        }`}
      >
        <span>{isPlaying ? "⏹" : "▶"}</span>
        <span>{isPlaying ? "Stop Metronome" : "Start Metronome"}</span>
      </button>
    </div>
  );
}
