"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, Trash2, Edit2, Play, Pause, Video, Mic, Calendar, Clock, Disc, Check } from "lucide-react";
import { getStudioRecordings, deleteStudioRecording, updateStudioRecordingNotes, StudioRecordingTake } from "@/lib/studio-recordings-db";

interface StudioRecordingsVaultProps {
  refreshTrigger?: number;
}

export function StudioRecordingsVault({ refreshTrigger = 0 }: StudioRecordingsVaultProps) {
  const [recordings, setRecordings] = useState<StudioRecordingTake[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activePlaybackId, setActivePlaybackId] = useState<string | null>(null);
  const [activePlaybackUrl, setActivePlaybackUrl] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const loadRecordings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStudioRecordings();
      setRecordings(data);
    } catch (err) {
      console.error("Failed to load recordings from vault:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecordings();
  }, [loadRecordings, refreshTrigger]);

  const handlePlayTake = (take: StudioRecordingTake) => {
    if (activePlaybackUrl) {
      URL.revokeObjectURL(activePlaybackUrl);
    }

    if (activePlaybackId === take.id) {
      setActivePlaybackId(null);
      setActivePlaybackUrl(null);
      return;
    }

    const url = URL.createObjectURL(take.blob);
    setActivePlaybackId(take.id);
    setActivePlaybackUrl(url);
    setPlaybackSpeed(1.0);
  };

  const handleDownloadTake = (take: StudioRecordingTake) => {
    const url = URL.createObjectURL(take.blob);
    const a = document.createElement("a");
    a.href = url;
    const extension = take.type === "video" ? "webm" : "webm";
    const filename = `${take.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.${extension}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteTake = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recorded practice take?")) return;
    try {
      await deleteStudioRecording(id);
      if (activePlaybackId === id) {
        if (activePlaybackUrl) URL.revokeObjectURL(activePlaybackUrl);
        setActivePlaybackId(null);
        setActivePlaybackUrl(null);
      }
      setRecordings((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Failed to delete take:", err);
    }
  };

  const handleStartEdit = (take: StudioRecordingTake) => {
    setEditingId(take.id);
    setEditTitle(take.title);
    setEditNotes(take.notes || "");
  };

  const handleSaveEdit = async (id: string) => {
    try {
      await updateStudioRecordingNotes(id, editNotes, editTitle);
      setRecordings((prev) =>
        prev.map((r) => (r.id === id ? { ...r, title: editTitle, notes: editNotes } : r)),
      );
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update notes:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border-0 space-y-4 text-heading">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Disc className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-black text-base text-heading">Practice Recordings Vault</h3>
            <p className="text-[11px] font-mono text-body">
              {recordings.length} Recorded Practice {recordings.length === 1 ? "Take" : "Takes"} Saved in Browser
            </p>
          </div>
        </div>
      </div>

      {/* Active Playback Player Bar */}
      {activePlaybackId && activePlaybackUrl && (
        <div className="p-4 rounded-2xl bg-bg-alt/30 shadow-sm border-0 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-bold text-xs text-heading truncate max-w-xs">
                Playing: {recordings.find((r) => r.id === activePlaybackId)?.title}
              </h4>
            </div>

            {/* Playback Speed Switcher */}
            <div className="flex items-center gap-1 text-[10px] font-mono bg-white border-0 p-0.5 rounded-lg shadow-xs">
              <span className="text-body-muted px-1">Speed:</span>
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => {
                    setPlaybackSpeed(speed);
                    const mediaEl = document.getElementById("activeStudioPlayer") as HTMLMediaElement;
                    if (mediaEl) mediaEl.playbackRate = speed;
                  }}
                  className={`px-1.5 py-0.5 rounded font-bold cursor-pointer ${
                    playbackSpeed === speed
                      ? "bg-primary text-white"
                      : "text-body hover:text-heading"
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden bg-[#160A29] flex items-center justify-center max-h-[320px] shadow-inner">
            {recordings.find((r) => r.id === activePlaybackId)?.type === "video" ? (
              <video
                id="activeStudioPlayer"
                src={activePlaybackUrl}
                controls
                autoPlay
                className="w-full max-h-[320px] object-contain"
              />
            ) : (
              <div className="p-6 w-full flex flex-col items-center justify-center space-y-3">
                <Mic className="w-10 h-10 text-accent animate-pulse" />
                <audio
                  id="activeStudioPlayer"
                  src={activePlaybackUrl}
                  controls
                  autoPlay
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recordings Grid / List */}
      {isLoading ? (
        <div className="py-8 text-center text-xs text-body font-mono">
          Loading recordings from local vault...
        </div>
      ) : recordings.length === 0 ? (
        <div className="py-12 px-4 rounded-2xl bg-bg-alt/20 border-0 text-center space-y-2 text-body">
          <Disc className="w-8 h-8 text-body-muted mx-auto" />
          <h4 className="font-serif font-black text-sm text-heading">No Recorded Takes Yet</h4>
          <p className="text-xs text-body max-w-sm mx-auto leading-relaxed">
            Record your vocal exercises, instrument drills, or Raga runs above. Your takes will appear here for review and self-assessment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recordings.map((take) => {
            const isPlaying = activePlaybackId === take.id;
            const isEditing = editingId === take.id;
            const dateStr = new Date(take.createdAt).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const timeStr = new Date(take.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={take.id}
                className={`p-4 rounded-2xl bg-white transition-all flex flex-col justify-between space-y-3 shadow-xs border-0 ${
                  isPlaying
                    ? "ring-2 ring-primary shadow-sm"
                    : "hover:bg-bg-alt/20"
                }`}
              >
                {/* Take Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1.5 rounded-lg bg-bg-alt/50 text-primary">
                        {take.type === "video" ? <Video className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      </span>
                      <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                        {take.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-body">
                      <Clock className="w-3 h-3 text-body-muted" />
                      <span>{take.durationFormatted}</span>
                    </div>
                  </div>

                  {/* Title & Edit Form */}
                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border-0 bg-bg-alt/30 text-heading text-xs outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-primary"
                      />
                      <textarea
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        rows={2}
                        placeholder="Practice notes / self-critique..."
                        className="w-full px-2.5 py-1.5 rounded-lg border-0 bg-bg-alt/30 text-heading text-xs outline-none ring-1 ring-black/10 focus:ring-2 focus:ring-primary resize-none"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 rounded text-body hover:text-heading text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(take.id)}
                          className="px-3 py-1 rounded bg-primary text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-serif font-black text-sm text-heading leading-snug">
                        {take.title}
                      </h4>
                      {take.notes && (
                        <p className="text-xs text-body mt-1 italic leading-relaxed line-clamp-2">
                          &quot;{take.notes}&quot;
                        </p>
                      )}
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-[10px] font-mono text-body-muted pt-0.5">
                    <Calendar className="w-3 h-3 text-body-muted" />
                    <span>{dateStr} at {timeStr}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => handlePlayTake(take)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-primary hover:bg-primary-hover text-white shadow-xs"
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                    <span>{isPlaying ? "Close Player" : "Listen & Review"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(take)}
                      className="p-1.5 rounded-lg text-body hover:text-heading hover:bg-bg-alt/50 transition-all cursor-pointer"
                      title="Edit Take Title & Notes"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadTake(take)}
                      className="p-1.5 rounded-lg text-body hover:text-heading hover:bg-bg-alt/50 transition-all cursor-pointer"
                      title="Download .webm File"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTake(take.id)}
                      className="p-1.5 rounded-lg text-body hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                      title="Delete Take"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
