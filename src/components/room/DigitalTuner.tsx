"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface DigitalTunerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTE_STRINGS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const SWARA_NAMES: Record<string, string> = {
  "C": "Safed 1 (Sa)",
  "C#": "Kali 1 (Komal Re)",
  "D": "Safed 2 (Shuddha Re)",
  "D#": "Kali 2 (Komal Ga)",
  "E": "Safed 3 (Shuddha Ga)",
  "F": "Safed 4 (Shuddha Ma)",
  "F#": "Kali 3 (Teevra Ma)",
  "G": "Safed 5 (Pa)",
  "G#": "Kali 4 (Komal Dha)",
  "A": "Safed 6 (Shuddha Dha)",
  "A#": "Kali 5 (Komal Ni)",
  "B": "Safed 7 (Shuddha Ni)",
};

const INSTRUMENT_PRESETS = [
  { id: "chromatic", name: "Chromatic", icon: "🎵" },
  { id: "tanpura", name: "Tanpura Drone", icon: "🪕" },
  { id: "guitar", name: "Guitar (EADGBE)", icon: "🎸" },
  { id: "violin", name: "Violin (GDAE)", icon: "🎻" },
];

const TANPURA_NOTES = [
  { note: "C", freq: 130.81, label: "C (Safed 1)" },
  { note: "C#", freq: 138.59, label: "C# (Kali 1)" },
  { note: "D", freq: 146.83, label: "D (Safed 2)" },
  { note: "D#", freq: 155.56, label: "D# (Kali 2)" },
  { note: "E", freq: 164.81, label: "E (Safed 3)" },
  { note: "F", freq: 174.61, label: "F (Safed 4)" },
  { note: "F#", freq: 185.00, label: "F# (Kali 3)" },
  { note: "G", freq: 196.00, label: "G (Safed 5)" },
  { note: "G#", freq: 207.65, label: "G# (Kali 4)" },
  { note: "A", freq: 220.00, label: "A (Safed 6)" },
  { note: "A#", freq: 233.08, label: "A# (Kali 5)" },
  { note: "B", freq: 246.94, label: "B (Safed 7)" },
];

/**
 * Autocorrelation algorithm for real-time pitch detection.
 */
function autoCorrelate(buf: Float32Array, sampleRate: number): number {
  let sum = 0;
  for (let i = 0; i < buf.length; i++) {
    sum += buf[i] * buf[i];
  }
  const rms = Math.sqrt(sum / buf.length);
  if (rms < 0.012) return -1; // Acoustic noise gate

  let r1 = 0;
  let r2 = buf.length - 1;
  const thres = 0.2;
  for (let i = 0; i < buf.length / 2; i++) {
    if (Math.abs(buf[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < buf.length / 2; i++) {
    if (Math.abs(buf[buf.length - i]) < thres) {
      r2 = buf.length - i;
      break;
    }
  }
  const bufSlice = buf.slice(r1, r2);
  const c = new Array(bufSlice.length).fill(0);
  for (let i = 0; i < bufSlice.length; i++) {
    for (let j = 0; j < bufSlice.length - i; j++) {
      c[i] = c[i] + bufSlice[j] * bufSlice[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < bufSlice.length; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
}

function noteFromPitch(frequency: number, a4 = 440): number {
  const noteNum = 12 * (Math.log(frequency / a4) / Math.log(2));
  return Math.round(noteNum) + 69;
}

function frequencyFromNoteNumber(note: number, a4 = 440): number {
  return a4 * Math.pow(2, (note - 69) / 12);
}

function centsOffFromPitch(frequency: number, note: number, a4 = 440): number {
  return Math.floor(
    (1200 * Math.log(frequency / frequencyFromNoteNumber(note, a4))) / Math.log(2),
  );
}

export function DigitalTuner({ isOpen, onClose }: DigitalTunerProps) {
  const [isListening, setIsListening] = useState(false);
  const [preset, setPreset] = useState("chromatic");
  const [pitch, setPitch] = useState<number | null>(null);
  const [noteName, setNoteName] = useState<string>("--");
  const [octave, setOctave] = useState<number | null>(null);
  const [cents, setCents] = useState<number>(0);
  const [isInTune, setIsInTune] = useState(false);
  const [hasMicError, setHasMicError] = useState(false);
  const [a4Calibration] = useState(440);

  // Tanpura Drone state
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [selectedDroneNote, setSelectedDroneNote] = useState("C");
  const [droneTuning, setDroneTuning] = useState<"Pa" | "Ma">("Pa"); // Pa (fifth) or Ma (fourth)
  const [droneVolume, setDroneVolume] = useState<number>(0.35);
  const droneContextRef = useRef<AudioContext | null>(null);
  const droneOscillatorsRef = useRef<OscillatorNode[]>([]);
  const droneGainRef = useRef<GainNode | null>(null);

  // Mic capture refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Stop Mic Pitch Engine
  const stopListening = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsListening(false);
    setPitch(null);
    setNoteName("--");
    setOctave(null);
    setCents(0);
    setIsInTune(false);
  }, []);

  // Stop Tanpura Drone
  const stopDrone = useCallback(() => {
    droneOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    droneOscillatorsRef.current = [];
    if (droneGainRef.current) {
      try {
        droneGainRef.current.disconnect();
      } catch {}
      droneGainRef.current = null;
    }
    if (droneContextRef.current && droneContextRef.current.state !== "closed") {
      droneContextRef.current.close().catch(() => {});
      droneContextRef.current = null;
    }
    setIsDronePlaying(false);
  }, []);

  // Start Tanpura Drone Synthesizer
  const startDrone = useCallback(
    (noteStr: string, tuning = droneTuning) => {
      stopDrone();

      const selected = TANPURA_NOTES.find((n) => n.note === noteStr) || TANPURA_NOTES[0];
      const fundamental = selected.freq;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      droneContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(droneVolume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      droneGainRef.current = masterGain;

      // 1st string: Pa (1.5x) or Ma (1.333x)
      const firstStringRatio = tuning === "Pa" ? 1.5 : 1.3333;

      const harmonics = [
        { freq: fundamental * firstStringRatio, type: "sawtooth" as OscillatorType, gainVal: 0.16 }, // Pa or Ma
        { freq: fundamental * 2.0, type: "sine" as OscillatorType, gainVal: 0.26 },                   // Tar Sa (octave)
        { freq: fundamental * 2.004, type: "triangle" as OscillatorType, gainVal: 0.22 },             // Shimmer Sa
        { freq: fundamental * 1.0, type: "sine" as OscillatorType, gainVal: 0.38 },                   // Madhya Sa
        { freq: fundamental * 0.5, type: "sine" as OscillatorType, gainVal: 0.45 },                   // Kharaj Sa (sub-octave)
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

      droneOscillatorsRef.current = oscs;
      setIsDronePlaying(true);
    },
    [stopDrone, droneTuning, droneVolume],
  );

  // Update drone volume on slider change
  useEffect(() => {
    if (droneGainRef.current && droneContextRef.current) {
      droneGainRef.current.gain.setValueAtTime(droneVolume, droneContextRef.current.currentTime);
    }
  }, [droneVolume]);

  // Start Mic Pitch Detection
  const startListening = useCallback(async () => {
    try {
      setHasMicError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      source.connect(analyser);

      const buffer = new Float32Array(analyser.fftSize);

      const updatePitch = () => {
        if (!analyserRef.current || !audioContextRef.current) return;
        analyserRef.current.getFloatTimeDomainData(buffer);
        const detectedFreq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

        if (detectedFreq !== -1 && detectedFreq >= 30 && detectedFreq <= 2200) {
          const noteNum = noteFromPitch(detectedFreq, a4Calibration);
          const name = NOTE_STRINGS[noteNum % 12];
          const oct = Math.floor(noteNum / 12) - 1;
          const offsetCents = centsOffFromPitch(detectedFreq, noteNum, a4Calibration);

          setPitch(Math.round(detectedFreq * 10) / 10);
          setNoteName(name);
          setOctave(oct);
          setCents(offsetCents);
          setIsInTune(Math.abs(offsetCents) <= 3);
        }

        rafIdRef.current = requestAnimationFrame(updatePitch);
      };

      setIsListening(true);
      rafIdRef.current = requestAnimationFrame(updatePitch);
    } catch (err) {
      console.warn("Tuner mic permission denied:", err);
      setHasMicError(true);
      stopListening();
    }
  }, [stopListening, a4Calibration]);

  // Switch Presets
  const handlePresetChange = (newPreset: string) => {
    setPreset(newPreset);
    if (newPreset === "tanpura") {
      stopListening();
      startDrone(selectedDroneNote);
    } else {
      stopDrone();
      if (!isListening) {
        startListening();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (preset === "tanpura") {
        startDrone(selectedDroneNote);
      } else {
        startListening();
      }
    } else {
      stopListening();
      stopDrone();
    }
    return () => {
      stopListening();
      stopDrone();
    };
  }, [isOpen, preset, selectedDroneNote, startListening, startDrone, stopListening, stopDrone]);

  if (!isOpen) return null;

  // Arc gauge calculation for Cents meter (-50 to +50 cents)
  // Maps -50 cents to -60 degrees, +50 cents to +60 degrees
  const clampedCents = Math.max(-50, Math.min(50, cents));
  const needleAngle = (clampedCents / 50) * 60; // -60 deg to +60 deg

  return (
    <div className="absolute bottom-20 left-4 z-50 w-84 sm:w-92 max-h-[calc(100vh-120px)] overflow-y-auto bg-[#1B0C33]/98 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-primary/40 space-y-4 animate-in fade-in slide-in-from-bottom-3 text-stone-100 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-base shadow-sm">
            🎸
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-white tracking-wide">
              Studio Pitch Tuner
            </h4>
            <span className="text-[10px] text-accent font-mono font-semibold">
              Gandharva Harmonics Engine
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-[#2D1252] border border-transparent hover:border-primary/30 transition-all cursor-pointer active:scale-95 text-xs"
          title="Close Tuner"
        >
          ✕
        </button>
      </div>

      {/* Preset Selector Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-[#120722] p-1 rounded-2xl border border-primary/20">
        {INSTRUMENT_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handlePresetChange(p.id)}
            className={`py-1.5 px-1 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 ${
              preset === p.id
                ? "bg-accent text-white shadow-md shadow-accent/40"
                : "text-stone-300 hover:text-white"
            }`}
          >
            <span className="text-xs">{p.icon}</span>
            <span className="text-[10px] truncate font-sans">{p.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Tanpura Drone Mode */}
      {preset === "tanpura" ? (
        <div className="space-y-3.5 py-1">
          {/* Active Drone Header Card */}
          <div className="p-3.5 rounded-2xl bg-[#120722] border border-primary/25 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
              Indian Classical Drone Swara (Sa)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif font-black text-accent drop-shadow-[0_0_14px_rgba(255,120,3,0.4)]">
                {selectedDroneNote}
              </span>
              <span className="text-xs font-serif text-stone-300">
                {SWARA_NAMES[selectedDroneNote] || ""}
              </span>
            </div>
            <span className="text-[10.5px] font-mono text-stone-400">
              Harmonic Strings: {droneTuning}-Sa-Sa-Kharaj
            </span>
          </div>

          {/* First String Tuning Toggle (Pa vs Ma) */}
          <div className="flex items-center justify-between px-1 text-xs">
            <span className="text-stone-300 font-mono text-[11px]">1st String:</span>
            <div className="flex items-center gap-1 bg-[#120722] p-1 rounded-xl border border-primary/20">
              <button
                type="button"
                onClick={() => {
                  setDroneTuning("Pa");
                  if (isDronePlaying) startDrone(selectedDroneNote, "Pa");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  droneTuning === "Pa"
                    ? "bg-accent text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                Pancham (Pa)
              </button>
              <button
                type="button"
                onClick={() => {
                  setDroneTuning("Ma");
                  if (isDronePlaying) startDrone(selectedDroneNote, "Ma");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  droneTuning === "Ma"
                    ? "bg-accent text-white shadow-sm"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                Madhyam (Ma)
              </button>
            </div>
          </div>

          {/* Drone Note Selection Grid */}
          <div className="grid grid-cols-4 gap-1.5">
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
                  className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm border ${
                    isSelected
                      ? "bg-gradient-to-b from-accent to-accent-dark text-white border-accent shadow-[0_0_12px_rgba(255,120,3,0.4)]"
                      : "bg-[#241040] hover:bg-[#311656] text-stone-300 border-primary/20"
                  }`}
                >
                  <span className="font-serif font-black text-sm">{n.note}</span>
                  <span className="text-[9px] font-mono opacity-80 leading-none mt-0.5">
                    {n.note.includes("#") ? "Kali" : "Safed"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-between bg-[#120722] border border-primary/20 px-3 py-2 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-stone-300">
              <span>🔊</span>
              <span className="text-[11px] font-mono">Drone Resonance:</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={droneVolume}
              onChange={(e) => setDroneVolume(Number(e.target.value))}
              className="w-24 accent-[#FF7803] cursor-pointer h-1.5 bg-[#2D1252] rounded"
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
            className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-98 cursor-pointer flex items-center justify-center gap-2 ${
              isDronePlaying
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/60 animate-pulse"
                : "bg-gradient-to-r from-cta to-cta-hover hover:opacity-95 text-white shadow-lg shadow-cta/30 font-bold"
            }`}
          >
            <span>{isDronePlaying ? "⏹" : "🪕"}</span>
            <span>{isDronePlaying ? "Stop Tanpura Drone" : "Start Tanpura Drone"}</span>
          </button>
        </div>
      ) : (
        /* Pitch Tuner Mode */
        <div className="space-y-4">
          {hasMicError ? (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs text-center space-y-2 backdrop-blur-md">
              <span className="text-2xl">🎙️</span>
              <p className="font-semibold text-rose-300">Microphone Access Needed</p>
              <p className="text-[11px] text-rose-400 leading-relaxed">
                Allow microphone permissions in your browser to tune your instrument in real-time.
              </p>
            </div>
          ) : (
            <>
              {/* Semi-Circular Cents Arc Dial & Note Display */}
              <div className="relative p-4 rounded-3xl bg-[#120722] border border-primary/25 flex flex-col items-center justify-center shadow-inner">
                {/* SVG Gauge Needle Arch */}
                <div className="relative w-52 h-28 flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 200 110">
                    {/* Background meter arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#2E1352"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    {/* In-Tune Sweet Spot Arc (-5 to +5 cents) */}
                    <path
                      d="M 94 21 A 80 80 0 0 1 106 21"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="12"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                    {/* Cents Ticks */}
                    <circle cx="100" cy="20" r="3" fill="#10B981" />
                    <circle cx="45" cy="45" r="2.5" fill="#3B82F6" />
                    <circle cx="155" cy="45" r="2.5" fill="#EF4444" />
                  </svg>

                  {/* Dynamic Sweeping Needle */}
                  {pitch !== null && (
                    <div
                      className="absolute bottom-2 left-1/2 w-1 h-22 origin-bottom transition-transform duration-100 ease-out"
                      style={{
                        transform: `translateX(-50%) rotate(${needleAngle}deg)`,
                      }}
                    >
                      <div
                        className={`w-1 h-full rounded-full shadow-lg ${
                          isInTune
                            ? "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
                            : cents > 0
                            ? "bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]"
                            : "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]"
                        }`}
                      />
                    </div>
                  )}

                  {/* Needle Pivot Cap */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-200 shadow-md" />
                </div>

                {/* Detected Note Letter & Octave */}
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span
                    className={`text-5xl font-serif font-black tracking-tight transition-colors duration-150 ${
                      isInTune
                        ? "text-emerald-400 drop-shadow-[0_0_16px_rgba(16,185,129,0.6)]"
                        : "text-white"
                    }`}
                  >
                    {noteName}
                  </span>
                  {octave !== null && (
                    <span className="text-2xl font-serif font-bold text-accent">
                      {octave}
                    </span>
                  )}
                </div>

                {/* Classical Swara Name */}
                {noteName !== "--" && SWARA_NAMES[noteName] && (
                  <span className="text-[11px] font-serif text-accent font-medium">
                    {SWARA_NAMES[noteName]}
                  </span>
                )}

                {/* Pitch Frequency & Cents readout */}
                <div className="flex items-center justify-center gap-2 mt-2 text-xs font-mono">
                  {pitch ? (
                    <>
                      <span className="text-stone-300 font-semibold">{pitch} Hz</span>
                      <span className="text-stone-600">•</span>
                      <span
                        className={`font-bold ${
                          isInTune
                            ? "text-emerald-400"
                            : cents > 0
                            ? "text-rose-400"
                            : "text-blue-400"
                        }`}
                      >
                        {cents > 0 ? `+${cents}` : cents} cents
                      </span>
                    </>
                  ) : (
                    <span className="text-stone-400 text-[11px]">
                      Play an instrument note or sing...
                    </span>
                  )}
                </div>

                {/* In Tune Badge */}
                <div className="mt-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                      isInTune
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse"
                        : pitch !== null
                        ? cents > 0
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-[#251042] text-stone-400 border border-primary/20"
                    }`}
                  >
                    <span>{isInTune ? "✓" : cents > 0 ? "▲" : "▼"}</span>
                    <span>
                      {isInTune
                        ? "Perfect Pitch In Tune"
                        : cents > 0
                        ? "Tune Down (Sharp)"
                        : pitch !== null
                        ? "Tune Up (Flat)"
                        : "Listening..."}
                    </span>
                  </span>
                </div>
              </div>

              {/* Pause / Resume Tuner Toggle */}
              <button
                type="button"
                onClick={() => {
                  if (isListening) {
                    stopListening();
                  } else {
                    startListening();
                  }
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer active:scale-95 shadow-md ${
                  isListening
                    ? "bg-[#281346] hover:bg-[#34185c] text-stone-200 border border-primary/30"
                    : "bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/30"
                }`}
              >
                {isListening ? "Pause Tuner" : "Resume Tuner"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
