"use client";

import { CreditCard, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export interface CourseEmiBreakdownProps {
  priceMinorUnits: number;
  sessionCount?: number;
  interactive?: boolean;
  compact?: boolean;
  allowEmi?: boolean;
  emiPrice3MinorUnits?: number | null;
  emiPrice6MinorUnits?: number | null;
  selectedPlan?: any;
  onSelectPlan?: (plan: any) => void;
}

export function CourseEmiBreakdown({
  priceMinorUnits,
  sessionCount = 24,
  compact = false,
}: CourseEmiBreakdownProps) {
  const totalRupees = Math.round(priceMinorUnits / 100);
  const perSessionRupees = Math.round(priceMinorUnits / (sessionCount > 0 ? sessionCount : 24) / 100);

  const formattedTotal = `₹${totalRupees.toLocaleString("en-IN")}`;
  const formattedPerSession = `₹${perSessionRupees.toLocaleString("en-IN")}`;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200/80 text-xs font-numeric font-semibold text-[#1E1A4D]">
        <Sparkles className="w-3.5 h-3.5 text-[#3C096C] shrink-0" />
        <span>{formattedPerSession} / session</span>
        <span className="text-[10px] text-body-muted">({sessionCount} classes)</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#3C096C]" />
          <h4 className="font-serif font-bold text-sm sm:text-base text-heading">
            Course Tuition &amp; Session Fee
          </h4>
        </div>
        <span className="text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full font-numeric">
          Flat Curriculum Tuition
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: Total Tuition */}
        <div className="p-4 rounded-2xl border border-purple-200/90 bg-gradient-to-br from-purple-50/50 via-white to-white shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800">
              Total Course Tuition
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-numeric">
              {sessionCount} Sessions
            </span>
          </div>
          <div className="font-serif font-bold text-2xl text-heading font-numeric">
            {formattedTotal}
          </div>
          <p className="text-[11px] text-body-muted">
            All-inclusive fee covering all {sessionCount} private 1-on-1 masterclasses and accreditation syllabus.
          </p>
        </div>

        {/* Card 2: Per Session Rate */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Per Session Investment
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-numeric">
              1-on-1 Private
            </span>
          </div>
          <div className="font-serif font-bold text-2xl text-[#3C096C] font-numeric">
            {formattedPerSession} <span className="text-xs font-sans font-medium text-body">/ class</span>
          </div>
          <p className="text-[11px] text-body-muted">
            Directly dedicated faculty mentor allocation per masterclass hour.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1 text-[11px] text-body-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>
          Clear institutional tuition with zero hidden charges. Payment is finalized with administration upon admission approval.
        </span>
      </div>
    </div>
  );
}
