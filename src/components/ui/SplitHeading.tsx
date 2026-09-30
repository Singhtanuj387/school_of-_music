import React from "react";

export interface SplitHeadingProps {
  /** The first clause of the heading, rendered in --color-heading (navy #1E1A4D) */
  firstClause: string;
  /** The emphasized clause of the heading, rendered in --color-accent (orange #FF7803) */
  accentClause: string;
  /** Optional trailing text after the accent clause */
  suffixClause?: string;
  /** HTML heading tag to render (default: "h2") */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Alignment */
  align?: "left" | "center" | "right";
  /** Additional custom class names */
  className?: string;
  /** Accessible ID for anchor navigation or testing */
  id?: string;
}

const sizeClasses: Record<NonNullable<SplitHeadingProps["size"]>, string> = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl lg:text-4xl",
  xl: "text-3xl sm:text-4xl lg:text-5xl",
  "2xl": "text-4xl sm:text-5xl lg:text-6xl",
};

const alignClasses: Record<NonNullable<SplitHeadingProps["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function SplitHeading({
  firstClause,
  accentClause,
  suffixClause,
  as: Component = "h2",
  size = "lg",
  align = "left",
  className = "",
  id,
}: SplitHeadingProps) {
  return (
    <Component
      id={id}
      className={`font-serif tracking-tight font-normal leading-[1.2] ${sizeClasses[size]} ${alignClasses[align]} ${className}`}
    >
      <span className="text-heading font-normal">{firstClause} </span>
      <span className="text-accent font-semibold">{accentClause}</span>
      {suffixClause && <span className="text-heading font-normal"> {suffixClause}</span>}
    </Component>
  );
}
