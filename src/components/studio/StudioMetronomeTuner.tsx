"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Timer, Volume2 } from "lucide-react";

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

const TANPURA_NOTES = [
  { note: "C", freq: 130.81, swara: "Safed 1" },
  { note: "C#", freq: 138.59, swara: "Kali 1" },
  { note: "D", freq: 146.83, swara: "Safed 2" },
  { note: "D#", freq: 155.56, swara: "Kali 2" },
  { note: "E", freq: 164.81, swara: "Safed 3" },
  { note: "F", freq: 174.61, swara: "Safed 4" },
  { note: "F#", freq: 185.00, swara: "Kali 3" },
  { note: "G", freq: 196.00, swara: "Safed 5" },
  { note: "G#", freq: 207.65, swara: "Kali 4" },
  { note: "A", freq: 220.00, swara: "Safed 6" },
  { note: "A#", freq: 233.08, swara: "Kali 5" },
  { note: "B", freq: 246.94, swara: "Safed 7" },
];

export function StudioMetronomeTuner() {
  const [activeTab, setActiveTab] = useState<"metronome" | "tanpura">("metronome");

  // Metronome State
  const [bpm, setBpm] = useState(90);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [soundTimbre, setSoundTimbre] = useState<SoundTimbre>("woodblock");
  const [selectedSignature, setSelectedSignature] = useState("4/4");
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [subdivision, setSubdivision] = useState<number>(1);
  const [metronomeVolume, setMetronomeVolume] = useState<number>(0.75);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [isBeatFlashing, setIsBeatFlashing] = useState(false);

  const metronomeCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const currentSubBeatRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const tapTimesRef = useRef<number[]>([]);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Tanpura Drone State
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [selectedDroneNote, setSelectedDroneNote] = useState("C");
  const [droneTuning, setDroneTuning] = useState<"Pa" | "Ma">("Pa");
  const [droneVolume, setDroneVolume] = useState<number>(0.35);

  const droneCtxRef = useRef<AudioContext | null>(null);
  const droneOscsRef = useRef<OscillatorNode[]>([]);
  const droneGainRef = useRef<GainNode | null>(null);

  // Metronome Sound Click
  const playClick = useCallback(
    (time: number, isFirstBeat: boolean, isSubdivision: boolean) => {
      if (!metronomeCtxRef.current) return;
      const ctx = metronomeCtxRef.current;
      const masterVol = metronomeVolume;

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
    [soundTimbre, metronomeVolume],
  );

  const scheduler = useCallback(() => {
    if (!metronomeCtxRef.current) return;

    while (nextNoteTimeRef.current < metronomeCtxRef.current.currentTime + 0.1) {
      const isFirst = currentBeatRef.current === 0 && currentSubBeatRef.current === 0;
      const isSub = currentSubBeatRef.current > 0;

      playClick(nextNoteTimeRef.current, isFirst, isSub);

      if (currentSubBeatRef.current === 0) {
        const beatNum = currentBeatRef.current;
        const delayMs = Math.max(0, (nextNoteTimeRef.current - metronomeCtxRef.current.currentTime) * 1000);
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

  const toggleMetronome = () => {
    if (isMetronomePlaying) {
      if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
      setIsMetronomePlaying(false);
      setCurrentBeat(0);
      currentBeatRef.current = 0;
      currentSubBeatRef.current = 0;
    } else {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!metronomeCtxRef.current) {
        metronomeCtxRef.current = new AudioCtx();
      }
      if (metronomeCtxRef.current.state === "suspended") {
        metronomeCtxRef.current.resume();
      }

      currentBeatRef.current = 0;
      currentSubBeatRef.current = 0;
      nextNoteTimeRef.current = metronomeCtxRef.current.currentTime + 0.05;
      setIsMetronomePlaying(true);
      scheduler();
    }
  };

  const handleTapTempo = () => {
    const now = performance.now();
    const tapTimes = tapTimesRef.current;
    tapTimes.push(now);

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

  const stopDrone = useCallback(() => {
    droneOscsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    droneOscsRef.current = [];
    if (droneGainRef.current) {
      try {
        droneGainRef.current.disconnect();
      } catch {}
      droneGainRef.current = null;
    }
    if (droneCtxRef.current && droneCtxRef.current.state !== "closed") {
      droneCtxRef.current.close().catch(() => {});
      droneCtxRef.current = null;
    }
    setIsDronePlaying(false);
  }, []);

  const startDrone = useCallback(
    (noteStr: string, tuning = droneTuning) => {
      stopDrone();

      const selected = TANPURA_NOTES.find((n) => n.note === noteStr) || TANPURA_NOTES[0];
      const fundamental = selected.freq;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      droneCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(droneVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      const firstStringRatio = tuning === "Pa" ? 1.5 : 1.3333;

      const harmonics = [
        { freq: fundamental * firstStringRatio, type: "sawtooth" as OscillatorType, gainVal: 0.16 },
        { freq: fundamental * 2.0, type: "sine" as OscillatorType, gainVal: 0.26 },
        { freq: fundamental * 2.004, type: "triangle" as OscillatorType, gainVal: 0.22 },
        { freq: fundamental * 1.0, type: "sine" as OscillatorType, gainVal: 0.38 },
        { freq: fundamental * 0.5, type: "sine" as OscillatorType, gainVal: 0.45 },
      ];

      const oscs: OscillatorNode[] = [];
      harmonics.forEach(({ freq, type, gainVal }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        oscGain.gain.setValueAtTime(gainVal, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      droneOscsRef.current = oscs;
      setIsDronePlaying(true);
    },
    [stopDrone, droneTuning, droneVolume],
  );

  useEffect(() => {
    if (droneGainRef.current && droneCtxRef.current) {
      droneGainRef.current.gain.setValueAtTime(droneVolume, droneCtxRef.current.currentTime);
    }
  }, [droneVolume]);

  useEffect(() => {
    return () => {
      if (timerIdRef.current !== null) clearTimeout(timerIdRef.current);
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (metronomeCtxRef.current && metronomeCtxRef.current.state !== "closed") {
        metronomeCtxRef.current.close().catch(() => {});
      }
      stopDrone();
    };
  }, [stopDrone]);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 text-heading border-0">
      {/* Top Switcher Tabs - No White Borders */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-1 bg-bg-alt/30 p-1 rounded-xl border-0">
          <button
            type="button"
            onClick={() => setActiveTab("metronome")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
              activeTab === "metronome"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading"
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Metronome</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tanpura")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
              activeTab === "tanpura"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading"
            }`}
          >
            <span>🪕</span>
            <span>Tanpura Drone</span>
          </button>
        </div>

        <span className="text-[10.5px] font-mono text-accent-dark font-bold uppercase tracking-wider hidden sm:inline">
          Precision Rhythm
        </span>
      </div>

      {/* Tab 1: Metronome */}
      {activeTab === "metronome" ? (
        <div className="space-y-4">
          {/* BPM & Visual Beat Centerpiece */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-alt/25 p-4 rounded-2xl border-0">
            {/* BPM Display */}
            <div className="flex items-center gap-3">
              <div
                className={`w-16 h-16 rounded-2xl bg-white shadow-xs flex flex-col items-center justify-center transition-all border-0 ${
                  isMetronomePlaying && isBeatFlashing
                    ? currentBeat === 0
                      ? "ring-2 ring-accent shadow-glow-accent scale-105"
                      : "ring-1 ring-primary/40 shadow-glow-cta"
                    : ""
                }`}
              >
                <span className="text-2xl font-serif font-black text-heading leading-none">
                  {bpm}
                </span>
                <span className="text-[9px] font-mono text-body-muted uppercase mt-0.5 font-bold">
                  BPM
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setBpm((b) => Math.max(40, b - 5))}
                    className="px-2 py-1 rounded-lg bg-white hover:bg-bg-alt/40 text-xs font-mono font-bold text-heading cursor-pointer shadow-xs border-0"
                  >
                    -5
                  </button>
                  <button
                    type="button"
                    onClick={() => setBpm((b) => Math.max(40, b - 1))}
                    className="px-2 py-1 rounded-lg bg-white hover:bg-bg-alt/40 text-xs font-mono font-bold text-heading cursor-pointer shadow-xs border-0"
                  >
                    -1
                  </button>
                  <button
                    type="button"
                    onClick={handleTapTempo}
                    className="px-3 py-1 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs border-0"
                  >
                    Tap
                  </button>
                  <button
                    type="button"
                    onClick={() => setBpm((b) => Math.min(240, b + 1))}
                    className="px-2 py-1 rounded-lg bg-white hover:bg-bg-alt/40 text-xs font-mono font-bold text-heading cursor-pointer shadow-xs border-0"
                  >
                    +1
                  </button>
                  <button
                    type="button"
                    onClick={() => setBpm((b) => Math.min(240, b + 5))}
                    className="px-2 py-1 rounded-lg bg-white hover:bg-bg-alt/40 text-xs font-mono font-bold text-heading cursor-pointer shadow-xs border-0"
                  >
                    +5
                  </button>
                </div>
                <input
                  type="range"
                  min={40}
                  max={240}
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full mt-2 accent-accent cursor-pointer h-1.5 bg-surface-muted rounded border-0"
                />
              </div>
            </div>

            {/* Beat Dots */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {Array.from({ length: beatsPerMeasure }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-75 flex items-center justify-center ${
                    isMetronomePlaying && currentBeat === i
                      ? i === 0
                        ? "bg-accent-dark scale-125 shadow-glow-accent"
                        : "bg-accent scale-110 shadow-xs"
                      : "bg-surface-muted/90"
                  }`}
                >
                  {i === 0 && <span className="text-[7px] font-black text-white">★</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Pattern / Taal Selector */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-body uppercase tracking-wider">
              Rhythm / Taal Preset:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {TIME_SIGNATURES.map((sig) => (
                <button
                  key={sig.id}
                  type="button"
                  onClick={() => {
                    setSelectedSignature(sig.id);
                    setBeatsPerMeasure(sig.beats);
                    setCurrentBeat(0);
                    currentBeatRef.current = 0;
                  }}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-left transition-all cursor-pointer border-0 shadow-xs ${
                    selectedSignature === sig.id
                      ? "bg-accent/15 text-accent-dark font-bold"
                      : "bg-white text-body hover:text-heading hover:bg-bg-alt/30"
                  }`}
                >
                  <div className="font-bold text-xs leading-none">{sig.name}</div>
                  <div className="text-[9px] opacity-75 font-mono mt-0.5">{sig.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Timbre & Volume Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1 bg-bg-alt/30 p-1 rounded-xl border-0">
              {(
                [
                  { id: "woodblock", label: "Wood" },
                  { id: "clay", label: "Ghatam" },
                  { id: "digital", label: "Digital" },
                  { id: "rimshot", label: "Rim" },
                ] as { id: SoundTimbre; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSoundTimbre(t.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
                    soundTimbre === t.id
                      ? "bg-primary text-white shadow-xs"
                      : "text-body hover:text-heading"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-bg-alt/30 px-3 py-1.5 rounded-xl self-start sm:self-auto border-0">
              <Volume2 className="w-3.5 h-3.5 text-accent" />
              <input
                type="range"
                min={0.1}
                max={1}
                step={0.05}
                value={metronomeVolume}
                onChange={(e) => setMetronomeVolume(Number(e.target.value))}
                className="w-20 accent-accent cursor-pointer h-1 bg-surface-muted rounded border-0"
              />
            </div>
          </div>

          {/* Start/Stop Button */}
          <button
            type="button"
            onClick={toggleMetronome}
            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2 border-0 ${
              isMetronomePlaying
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/20"
                : "bg-cta hover:bg-cta-hover text-white shadow-md shadow-cta/25 font-bold"
            }`}
          >
            <span>{isMetronomePlaying ? "⏹" : "▶"}</span>
            <span>{isMetronomePlaying ? "Stop Metronome" : "Start Metronome"}</span>
          </button>
        </div>
      ) : (
        /* Tab 2: Tanpura Drone */
        <div className="space-y-4">
          {/* Active Drone Banner */}
          <div className="p-4 rounded-2xl bg-bg-alt/25 flex items-center justify-between border-0">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-body-muted">
                Indian Classical Drone Pitch:
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-serif font-black text-primary">
                  {selectedDroneNote}
                </span>
                <span className="text-xs text-body font-serif font-semibold">
                  {TANPURA_NOTES.find((n) => n.note === selectedDroneNote)?.swara}
                </span>
              </div>
            </div>

            {/* String Tuning */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border-0 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setDroneTuning("Pa");
                  if (isDronePlaying) startDrone(selectedDroneNote, "Pa");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer border-0 ${
                  droneTuning === "Pa" ? "bg-accent text-white shadow-xs" : "text-body"
                }`}
              >
                Pa (Fifth)
              </button>
              <button
                type="button"
                onClick={() => {
                  setDroneTuning("Ma");
                  if (isDronePlaying) startDrone(selectedDroneNote, "Ma");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer border-0 ${
                  droneTuning === "Ma" ? "bg-accent text-white shadow-xs" : "text-body"
                }`}
              >
                Ma (Fourth)
              </button>
            </div>
          </div>

          {/* Swara Notes Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {TANPURA_NOTES.map((n) => {
              const isSelected = selectedDroneNote === n.note;
              return (
                <button
                  key={n.note}
                  type="button"
                  onClick={() => {
                    setSelectedDroneNote(n.note);
                    startDrone(n.note);
                  }}
                  className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 border-0 shadow-xs ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white hover:bg-bg-alt/30 text-heading"
                  }`}
                >
                  <span className="font-serif font-black text-xs">{n.note}</span>
                  <span className="text-[8px] font-mono opacity-85 leading-none mt-0.5">
                    {n.swara}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="flex items-center justify-between bg-bg-alt/25 px-4 py-2 rounded-xl border-0">
            <span className="text-xs font-mono font-semibold text-body">Drone Resonance Volume:</span>
            <input
              type="range"
              min={0.05}
              max={0.8}
              step={0.05}
              value={droneVolume}
              onChange={(e) => setDroneVolume(Number(e.target.value))}
              className="w-28 accent-accent cursor-pointer h-1 bg-surface-muted rounded border-0"
            />
          </div>

          {/* Drone Play/Stop Toggle */}
          <button
            type="button"
            onClick={() => {
              if (isDronePlaying) {
                stopDrone();
              } else {
                startDrone(selectedDroneNote);
              }
            }}
            className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-2 border-0 ${
              isDronePlaying
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/20"
                : "bg-cta hover:bg-cta-hover text-white shadow-md shadow-cta/25 font-bold"
            }`}
          >
            <span>{isDronePlaying ? "⏹" : "🪕"}</span>
            <span>{isDronePlaying ? "Stop Tanpura Drone" : "Start Tanpura Drone"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
