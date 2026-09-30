"use client";

import { useState, useRef } from "react";
import { BookOpen, ZoomIn, ZoomOut, RotateCcw, Upload, FileText, Check, ChevronRight } from "lucide-react";
import { CURATED_MUSIC_SHEETS, CuratedMusicSheet } from "@/lib/curated-sheets";

interface StudioSheetViewerProps {
  onDualViewToggle?: (isDualView: boolean) => void;
  isDualView?: boolean;
}

export function StudioSheetViewer({
  onDualViewToggle,
  isDualView = false,
}: StudioSheetViewerProps) {
  const [selectedSheetId, setSelectedSheetId] = useState<string>(CURATED_MUSIC_SHEETS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);

  const [customSheets, setCustomSheets] = useState<{ id: string; name: string; url: string; type: string }[]>([]);
  const [selectedCustomSheet, setSelectedCustomSheet] = useState<{ id: string; name: string; url: string; type: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredSheets = categoryFilter === "ALL"
    ? CURATED_MUSIC_SHEETS
    : CURATED_MUSIC_SHEETS.filter((s) => s.category === categoryFilter);

  const activeSheet = CURATED_MUSIC_SHEETS.find((s) => s.id === selectedSheetId) || CURATED_MUSIC_SHEETS[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    const newSheet = {
      id: `custom-${Date.now()}`,
      name: file.name,
      url: objectUrl,
      type: file.type,
    };

    setCustomSheets((prev) => [newSheet, ...prev]);
    setSelectedCustomSheet(newSheet);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4 text-heading flex flex-col h-full border-0">
      {/* Top Controls Header - No White Borders */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-black text-base text-heading">Music Sheets &amp; Sargam Notation</h3>
            <p className="text-[11px] font-mono text-body">Classical Bandish, Alankars &amp; Repertoire</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-1.5 self-start sm:self-auto">
          {/* Zoom In/Out */}
          <div className="flex items-center gap-0.5 bg-bg-alt/30 p-0.5 rounded-xl text-xs border-0">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="p-1.5 rounded-lg text-body hover:text-heading transition-all cursor-pointer border-0"
              title="Zoom Out Text"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[10px] font-mono text-heading font-bold">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
              className="p-1.5 rounded-lg text-body hover:text-heading transition-all cursor-pointer border-0"
              title="Zoom In Text"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="p-1.5 rounded-lg text-body hover:text-heading transition-all cursor-pointer border-0"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={() => setIsHighContrast((c) => !c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border-0 ${
              isHighContrast
                ? "bg-[#1E1A4D] text-white font-bold shadow-xs"
                : "bg-bg-alt/30 text-body hover:text-heading"
            }`}
            title="Toggle High-Contrast Reading Mode"
          >
            Contrast
          </button>

          {/* Dual Split-View Toggle */}
          {onDualViewToggle && (
            <button
              type="button"
              onClick={() => onDualViewToggle(!isDualView)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
                isDualView
                  ? "bg-accent text-white shadow-xs"
                  : "bg-bg-alt/30 text-heading hover:bg-bg-alt/60"
              }`}
            >
              {isDualView ? "Full Sheet View" : "Split-Screen (Sheet + Camera)"}
            </button>
          )}

          {/* Custom Sheet Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-1.5 rounded-xl bg-cta hover:bg-cta-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-cta/25"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Sheet</span>
          </button>
        </div>
      </div>

      {/* Categories & Sheet Carousel */}
      <div className="space-y-2.5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {[
            { id: "ALL", label: "All Sheets" },
            { id: "INDIAN_CLASSICAL", label: "Raag & Bandish" },
            { id: "VOCAL_WARMUPS", label: "Vocal Alankars" },
            { id: "INSTRUMENTAL", label: "Guitar & Sitar" },
            { id: "WESTERN_STAFF", label: "Staff & Solfege" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setCategoryFilter(cat.id);
                setSelectedCustomSheet(null);
              }}
              className={`px-3 py-1 rounded-xl whitespace-nowrap font-semibold transition-all cursor-pointer border-0 ${
                categoryFilter === cat.id && !selectedCustomSheet
                  ? "bg-primary text-white shadow-xs"
                  : "bg-bg-alt/30 text-body hover:text-heading"
              }`}
            >
              {cat.label}
            </button>
          ))}

          {customSheets.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedCustomSheet(customSheets[0])}
              className={`px-3 py-1 rounded-xl whitespace-nowrap font-semibold transition-all cursor-pointer border-0 ${
                selectedCustomSheet
                  ? "bg-primary text-white shadow-xs"
                  : "bg-bg-alt/30 text-body hover:text-heading"
              }`}
            >
              My Uploads ({customSheets.length})
            </button>
          )}
        </div>

        {/* Sheet Selector Carousel - No White Borders */}
        {!selectedCustomSheet ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSheets.map((sheet) => {
              const isSelected = selectedSheetId === sheet.id;
              return (
                <button
                  key={sheet.id}
                  type="button"
                  onClick={() => setSelectedSheetId(sheet.id)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-2 border-0 shadow-xs ${
                    isSelected
                      ? "bg-primary/10 text-primary shadow-xs"
                      : "bg-white text-heading hover:bg-bg-alt/25"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="font-bold text-xs truncate text-heading">{sheet.title}</div>
                    <div className="text-[10px] text-accent-dark font-mono font-semibold mt-0.5">{sheet.instrument}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {customSheets.map((cs) => (
              <button
                key={cs.id}
                type="button"
                onClick={() => setSelectedCustomSheet(cs)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border-0 shadow-xs ${
                  selectedCustomSheet.id === cs.id
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-heading hover:bg-bg-alt/25"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate max-w-[140px]">{cs.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Music Stand Sheet Display Canvas - No White Borders */}
      <div
        className={`flex-1 rounded-2xl p-6 overflow-y-auto transition-all shadow-xs space-y-5 border-0 ${
          isHighContrast
            ? "bg-[#1E1A4D] text-amber-300 font-medium"
            : "bg-[#FFFDF9] text-heading"
        }`}
        style={{ fontSize: `${zoomLevel}%` }}
      >
        {selectedCustomSheet ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-3">
            <div className="text-center">
              <h4 className="font-bold text-sm text-heading">{selectedCustomSheet.name}</h4>
              <p className="text-xs text-body font-mono">Custom Uploaded Practice Sheet</p>
            </div>
            {selectedCustomSheet.type.includes("pdf") ? (
              <iframe
                src={selectedCustomSheet.url}
                className="w-full min-h-[500px] rounded-xl border-0 shadow-sm"
                title="PDF Sheet Preview"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedCustomSheet.url}
                alt="Custom Music Sheet"
                className="max-w-full max-h-[600px] object-contain rounded-xl shadow-md"
              />
            )}
          </div>
        ) : (
          <>
            {/* Sheet Title & Attributes */}
            <div className="pb-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-accent/10 text-accent-dark text-[10px] font-mono font-bold uppercase tracking-wider">
                  {activeSheet.difficulty}
                </span>
                {activeSheet.ragaOrKey && (
                  <span className="text-xs font-serif font-bold text-primary">
                    {activeSheet.ragaOrKey}
                  </span>
                )}
              </div>
              <h2 className="font-serif font-black text-2xl text-heading tracking-tight">
                {activeSheet.title}
              </h2>
              <p className="text-xs sm:text-sm text-body leading-relaxed max-w-2xl">
                {activeSheet.description}
              </p>
            </div>

            {/* Aaroh / Avroha Box */}
            {activeSheet.aarohAvroha && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-bg-alt/25 text-xs border-0 shadow-xs">
                <div>
                  <span className="font-mono text-[10px] font-bold text-accent-dark uppercase tracking-wider block">
                    Aaroh (Ascending):
                  </span>
                  <p className="font-serif font-bold text-heading mt-0.5 text-sm">
                    {activeSheet.aarohAvroha.aaroh}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-accent-dark uppercase tracking-wider block">
                    Avroha (Descending):
                  </span>
                  <p className="font-serif font-bold text-heading mt-0.5 text-sm">
                    {activeSheet.aarohAvroha.avroha}
                  </p>
                </div>
                <div className="sm:col-span-2 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-body">
                  <span><strong>Pakad:</strong> {activeSheet.aarohAvroha.pakad}</span>
                  <span className="text-primary font-bold">{activeSheet.aarohAvroha.vadiSamvadi}</span>
                </div>
              </div>
            )}

            {/* Sthayi */}
            {activeSheet.sthayi && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <h4 className="font-serif font-black text-sm text-heading uppercase tracking-wider">
                    Sthayi (First Verse)
                  </h4>
                </div>

                <div className="space-y-2.5 font-mono">
                  {activeSheet.sthayi.lines.map((line, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white shadow-xs space-y-1 border-0">
                      <div className="text-[10px] text-accent-dark font-bold uppercase tracking-wider">
                        {line.matraCount}
                      </div>
                      <div className="text-base sm:text-lg font-black text-primary tracking-widest overflow-x-auto whitespace-nowrap">
                        {line.swaras}
                      </div>
                      <div className="text-xs sm:text-sm font-serif text-heading italic tracking-wider font-medium">
                        {line.lyrics}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Antara */}
            {activeSheet.antara && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <h4 className="font-serif font-black text-sm text-heading uppercase tracking-wider">
                    Antara (Second Verse)
                  </h4>
                </div>

                <div className="space-y-2.5 font-mono">
                  {activeSheet.antara.lines.map((line, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white shadow-xs space-y-1 border-0">
                      <div className="text-[10px] text-accent-dark font-bold uppercase tracking-wider">
                        {line.matraCount}
                      </div>
                      <div className="text-base sm:text-lg font-black text-primary tracking-widest overflow-x-auto whitespace-nowrap">
                        {line.swaras}
                      </div>
                      <div className="text-xs sm:text-sm font-serif text-heading italic tracking-wider font-medium">
                        {line.lyrics}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Staff Notation / Tabs Block */}
            {activeSheet.staffNotationText && (
              <div className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-heading">Notation &amp; Fingering Map</h4>
                <pre className="p-4 rounded-xl bg-white font-mono text-xs text-primary font-bold overflow-x-auto leading-relaxed shadow-xs border-0">
                  {activeSheet.staffNotationText}
                </pre>
              </div>
            )}

            {/* Practice Tips */}
            {activeSheet.practiceTips && activeSheet.practiceTips.length > 0 && (
              <div className="p-4 rounded-xl bg-primary/5 space-y-2 border-0">
                <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                  Teacher Guidance &amp; Practice Tips:
                </span>
                <ul className="space-y-1.5 text-xs text-body">
                  {activeSheet.practiceTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
