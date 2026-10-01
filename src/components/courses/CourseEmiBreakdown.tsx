"use client";

import { useState } from "react";
import { CoursePaymentPlan } from "@prisma/client";
import { CreditCard, CheckCircle2, ShieldCheck, Calendar, Sparkles } from "lucide-react";

export interface CourseEmiBreakdownProps {
  priceMinorUnits: number;
  interactive?: boolean;
  selectedPlan?: CoursePaymentPlan;
  onSelectPlan?: (plan: CoursePaymentPlan) => void;
  compact?: boolean;
}

export function CourseEmiBreakdown({
  priceMinorUnits,
  interactive = false,
  selectedPlan = CoursePaymentPlan.FULL_PAYMENT,
  onSelectPlan,
  compact = false,
}: CourseEmiBreakdownProps) {
  const [internalPlan, setInternalPlan] = useState<CoursePaymentPlan>(selectedPlan);
  const activePlan = onSelectPlan ? selectedPlan : internalPlan;

  const handleSelect = (plan: CoursePaymentPlan) => {
    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      setInternalPlan(plan);
    }
  };

  const totalRupees = Math.round(priceMinorUnits / 100);
  const emi3Rupees = Math.round(priceMinorUnits / 3 / 100);
  const emi6Rupees = Math.round(priceMinorUnits / 6 / 100);

  const formattedTotal = `₹${totalRupees.toLocaleString("en-IN")}`;
  const formattedEmi3 = `₹${emi3Rupees.toLocaleString("en-IN")}`;
  const formattedEmi6 = `₹${emi6Rupees.toLocaleString("en-IN")}`;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-subtle/80 border border-accent/20 text-xs">
        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
        <span className="font-semibold text-accent-dark">
          EMI from {formattedEmi6}/mo
        </span>
        <span className="text-[10px] text-body-muted">(3 or 6 mos)</span>
      </div>
    );
  }

  const plans = [
    {
      id: CoursePaymentPlan.FULL_PAYMENT,
      title: "Full Upfront Payment",
      badge: "One-Time",
      monthlyText: formattedTotal,
      subText: "Single one-time course tuition",
      details: "Full payment recorded on course admission",
    },
    {
      id: CoursePaymentPlan.EMI_3_MONTHS,
      title: "3 Months Installment Plan",
      badge: "Popular EMI",
      monthlyText: `${formattedEmi3} / month`,
      subText: `3 monthly payments of ${formattedEmi3}`,
      details: "Zero extra charges • Pay as you learn",
    },
    {
      id: CoursePaymentPlan.EMI_6_MONTHS,
      title: "6 Months Installment Plan",
      badge: "Lowest Monthly",
      monthlyText: `${formattedEmi6} / month`,
      subText: `6 monthly payments of ${formattedEmi6}`,
      details: "Affordable monthly plan • Stress-free pacing",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-accent" />
          <h4 className="font-serif font-bold text-sm sm:text-base text-heading">
            Flexible Tuition & EMI Installment Options
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          0% Interest EMI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {plans.map((p) => {
          const isSelected = activePlan === p.id;
          return (
            <div
              key={p.id}
              onClick={() => interactive && handleSelect(p.id)}
              className={`p-3.5 rounded-2xl border transition-all text-left relative ${
                interactive ? "cursor-pointer" : ""
              } ${
                isSelected
                  ? "bg-primary-subtle/80 border-primary shadow-sm ring-1 ring-primary/30"
                  : "bg-white border-border-default hover:border-primary/40 hover:bg-bg-alt/20"
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-bg-alt text-accent-dark border border-border-subtle"
                  }`}
                >
                  {p.badge}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                )}
              </div>

              <div className="font-serif font-bold text-base sm:text-lg text-heading">
                {p.monthlyText}
              </div>

              <div className="text-xs font-semibold text-primary mt-0.5">
                {p.title}
              </div>

              <div className="text-[11px] text-body-muted mt-1 leading-snug">
                {p.details}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 pt-1 text-[11px] text-body-muted">
        <ShieldCheck className="w-3.5 h-3.5 text-accent-dark shrink-0" />
        <span>
          Admission is confirmed by academy admin upon reviewing your schedule. No automatic card debits.
        </span>
      </div>
    </div>
  );
}
