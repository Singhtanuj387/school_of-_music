"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface PriceDisplayProps {
  priceMinorUnits: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  showOriginalINR?: boolean;
  className?: string;
  subtextClassName?: string;
}

export function PriceDisplay({
  priceMinorUnits,
  size = "lg",
  showOriginalINR = false,
  className = "",
  subtextClassName = "",
}: PriceDisplayProps) {
  const { convertPrice, isInternational, currency } = useCurrency();
  const converted = convertPrice(priceMinorUnits);

  const sizeClasses: Record<string, string> = {
    xs: "text-xs font-semibold",
    sm: "text-sm font-semibold",
    md: "text-base font-bold",
    lg: "text-xl font-bold font-serif",
    xl: "text-2xl font-bold font-serif",
    "2xl": "text-3xl font-bold font-serif",
    "3xl": "text-4xl font-bold font-serif",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.lg;

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className={`tabular-nums text-heading ${selectedSize}`}>
          {converted.formatted}
        </span>
        {isInternational && showOriginalINR && (
          <span
            className={`text-[11px] text-body-muted tabular-nums ${subtextClassName}`}
            title={`Equivalent to ${converted.originalINRFormatted} INR`}
          >
            (~{converted.originalINRFormatted})
          </span>
        )}
      </div>
      {isInternational && (
        <span className="text-[10px] text-accent-dark font-medium">
          Prices localized to {currency}
        </span>
      )}
    </div>
  );
}
