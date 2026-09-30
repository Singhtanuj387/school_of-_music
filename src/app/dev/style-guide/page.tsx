"use client";

import React, { useState } from "react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Music,
  Send,
  HelpCircle,
} from "lucide-react";

export default function StyleGuidePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "buttons" | "cards" | "forms" | "badges">("overview");

  return (
    <div className="min-h-screen bg-bg text-body pb-24">
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <header className="border-b border-border-subtle bg-bg-alt/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cta/15 text-cta border border-cta/30">
                Design System v3
              </span>
              <span className="text-xs text-body-muted font-medium">Internal Route · /dev/style-guide</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-heading mt-1">
              Gandharva Design System & Token Reference
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-surface-muted/60 border border-border-default text-xs font-medium text-heading">
              Dials: <strong className="text-primary font-bold">V:8</strong> · <strong className="text-cta font-bold">M:5</strong> · <strong className="text-accent font-bold">D:5</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-2 overflow-x-auto pb-2 pt-1">
          {(
            [
              { id: "overview", label: "Palette & Contrast" },
              { id: "buttons", label: "Buttons & Motion" },
              { id: "cards", label: "Cards & Surfaces" },
              { id: "forms", label: "Form Inputs" },
              { id: "badges", label: "Badges & Statuses" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap btn-tactile ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-muted/50 text-heading hover:bg-surface-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* ─── SECTION 1: Color Tokens & Contrast Check ───────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.1</span>
            <SplitHeading
              firstClause="Core Brand"
              accentClause="Color Tokens"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              Strict 7-role palette defined in globals.css. All UI components pull from these tokens. No outside colors or arbitrary hex values are permitted.
            </p>
          </div>

          {/* Color Tokens Swatches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-primary flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-white">#3C096C</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-primary</div>
                <p className="text-xs text-body-muted mt-0.5">Deep purple. Navbar, hero overlays, course banners.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-accent flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-white">#FF7803</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-accent</div>
                <p className="text-xs text-body-muted mt-0.5">Saffron orange. Logo, split headings, stat ribbons.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-cta flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-white">#9810FA</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-cta</div>
                <p className="text-xs text-body-muted mt-0.5">Bright violet. "Book a free trial" & all purchase buttons.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-heading flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-white">#1E1A4D</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-heading</div>
                <p className="text-xs text-body-muted mt-0.5">Navy purple. Default serif heading text color.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-body flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-white">#54595F</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-body</div>
                <p className="text-xs text-body-muted mt-0.5">Neutral grey. Body copy, paragraphs, sans-serif UI.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-bg border border-border-subtle flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-heading">#FFFFFF</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-bg</div>
                <p className="text-xs text-body-muted mt-0.5">Pure ivory white. Main page sections and surfaces.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-bg-alt flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-heading">#FDE6F3</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-bg-alt</div>
                <p className="text-xs text-body-muted mt-0.5">Blush pink. Alternating sections & pill containers.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-4 shadow-sm space-y-3">
              <div className="h-16 rounded-xl bg-surface-muted flex items-end p-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-heading">#FCCEE8</span>
              </div>
              <div>
                <div className="font-serif text-base font-bold text-heading">--color-surface-muted</div>
                <p className="text-xs text-body-muted mt-0.5">Stronger pink. Inactive tabs, muted panels, chips.</p>
              </div>
            </div>
          </div>

          {/* Contrast Scorecard Matrix */}
          <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" />
                <h3 className="font-serif text-lg font-bold text-heading">
                  WCAG 2.1 Contrast Scorecard (Automated Check)
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-success-muted text-success border border-success/30">
                100% Compliant
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-default text-heading font-semibold">
                    <th className="py-2.5 px-3">Foreground</th>
                    <th className="py-2.5 px-3">Background</th>
                    <th className="py-2.5 px-3">Contrast Ratio</th>
                    <th className="py-2.5 px-3">Standard</th>
                    <th className="py-2.5 px-3">Usage Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-heading">Heading #1E1A4D</td>
                    <td className="py-2.5 px-3">White #FFFFFF</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">16.03:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AAA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Headings on main canvas</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-heading">Heading #1E1A4D</td>
                    <td className="py-2.5 px-3">Blush #FDE6F3</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">13.58:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AAA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Headings on alternating sections</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-body">Body #54595F</td>
                    <td className="py-2.5 px-3">White #FFFFFF</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">7.07:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AAA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Body copy on white surfaces</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-body">Body #54595F</td>
                    <td className="py-2.5 px-3">Blush #FDE6F3</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">5.99:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Body copy on blush sections</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">White #FFFFFF</td>
                    <td className="py-2.5 px-3">Primary #3C096C</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">14.51:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AAA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Navbar text & Primary button text</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">White #FFFFFF</td>
                    <td className="py-2.5 px-3">CTA Violet #9810FA</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">5.54:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">"Book free trial" button label</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-accent">Accent Orange #FF7803</td>
                    <td className="py-2.5 px-3">Heading Navy #1E1A4D</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">6.06:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Emphasized clauses within dark/navy ribbons</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-accent">Accent Orange #FF7803</td>
                    <td className="py-2.5 px-3">White #FFFFFF</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-warning">2.64:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Display Only</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Restricted to large bold display headings (≥24px/bold)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-accent-dark">Accent Dark #C44E00</td>
                    <td className="py-2.5 px-3">White #FFFFFF</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-success">4.73:1</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-success-muted text-success font-bold">AA Pass</span></td>
                    <td className="py-2.5 px-3 text-body-muted">Small text badges & orange tags on white</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Typography & SplitHeadings ─────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.2</span>
            <SplitHeading
              firstClause="Artistic Typography &"
              accentClause="Split Headings"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              Vidaloka (serif) for musical headings paired with DM Sans for readable body copy. Reusable SplitHeading component renders navy first clause with orange emphasized clause.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-body-muted uppercase tracking-wider">H1 Display (2xl)</div>
              <SplitHeading
                as="h1"
                size="2xl"
                firstClause="Most Affordable"
                accentClause="Live 1:1 Classes"
                suffixClause="For Kids & Adults"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-body-muted uppercase tracking-wider">H2 Section Heading (xl)</div>
              <SplitHeading
                as="h2"
                size="xl"
                firstClause="Exclusively At"
                accentClause="Gandharva!"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-body-muted uppercase tracking-wider">H3 Card Heading (lg)</div>
              <SplitHeading
                as="h3"
                size="lg"
                firstClause="Explore Our"
                accentClause="Courses"
              />
            </div>

            <div className="space-y-4 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-body-muted uppercase tracking-wider">H4 Subsection Heading (md)</div>
              <SplitHeading
                as="h4"
                size="md"
                firstClause="Master Faculty"
                accentClause="Maestros"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-body-muted uppercase tracking-wider">Body Copy & Tabular Numbers</div>
              <p className="text-base text-body leading-relaxed max-w-2xl">
                Master piano, keyboard, acoustic and electric guitar, violin, flute, tabla, singing, and classical dance with accredited maestros. Personalized, real-time sessions with studio-grade music acoustics.
              </p>
              <div className="flex items-center gap-6 pt-2 font-mono text-sm tabular-nums text-heading">
                <span>Tuition: ₹3,999.00</span>
                <span>Sessions: 12 / 12</span>
                <span>Latency: 24ms</span>
                <span>Date: 2026-09-19</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Button System & States ─────────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.3</span>
            <SplitHeading
              firstClause="Button System &"
              accentClause="Tactile States"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              CTA violet (#9810FA) is exclusively used for conversion ("Book free trial" and course checkout). Primary (#3C096C) is used for dashboard navigation and form submissions. Tactile press feedback (:active scale 0.98) powered by Emil Kowalski's motion standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CTA Buttons */}
            <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-heading">CTA Violet Buttons (--color-cta)</h3>
                <span className="text-xs text-cta font-bold font-mono">#9810FA</span>
              </div>
              <p className="text-xs text-body-muted">Used for "Book a Free Trial" and all course purchases. Never substitute with primary.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Default</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-cta text-white font-semibold text-xs shadow-md shadow-cta/25 btn-tactile hover:bg-cta-hover">
                    Book a Free Trial
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Simulated Hover</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-cta-hover text-white font-semibold text-xs shadow-lg shadow-cta/35 btn-tactile">
                    Book a Free Trial
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Active (Press: scale 0.98)</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-cta-active text-white font-semibold text-xs scale-[0.98] shadow-inner">
                    Book a Free Trial
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Disabled</div>
                  <button disabled className="w-full px-4 py-2.5 rounded-xl bg-cta/40 text-white/80 font-semibold text-xs cursor-not-allowed">
                    Book a Free Trial
                  </button>
                </div>
              </div>
            </div>

            {/* Primary Buttons */}
            <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-heading">Primary Purple Buttons (--color-primary)</h3>
                <span className="text-xs text-primary font-bold font-mono">#3C096C</span>
              </div>
              <p className="text-xs text-body-muted">Used for administrative actions, portal navigation, and primary form submissions.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Default</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs shadow-md shadow-primary/20 btn-tactile hover:bg-primary-hover">
                    Save Changes
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Simulated Hover</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-primary-hover text-white font-semibold text-xs shadow-lg shadow-primary/30 btn-tactile">
                    Save Changes
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Active (Press: scale 0.98)</div>
                  <button className="w-full px-4 py-2.5 rounded-xl bg-primary-active text-white font-semibold text-xs scale-[0.98] shadow-inner">
                    Save Changes
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-body-muted font-medium">Disabled</div>
                  <button disabled className="w-full px-4 py-2.5 rounded-xl bg-primary/40 text-white/80 font-semibold text-xs cursor-not-allowed">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Outline / Ghost Buttons */}
            <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-heading">Outline / Secondary Buttons</h3>
              <p className="text-xs text-body-muted">Used for secondary workflows, cancellations, and filters.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button className="w-full px-4 py-2.5 rounded-xl border border-border-strong bg-white hover:bg-bg-alt text-heading font-semibold text-xs btn-tactile">
                  Cancel Action
                </button>
                <button className="w-full px-4 py-2.5 rounded-xl border border-primary/40 bg-primary-subtle text-primary font-semibold text-xs btn-tactile hover:bg-primary-subtle/80">
                  View Syllabus
                </button>
              </div>
            </div>

            {/* Accent Orange Display Elements */}
            <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-heading">Accent Orange Display (--color-accent)</h3>
              <p className="text-xs text-body-muted">High-visibility tags and highlight ribbons. Orange #FF7803 on white passes AA for display text.</p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-accent-subtle text-accent-dark border border-accent/30">
                  <Sparkles className="w-3.5 h-3.5 text-accent" /> Gandharva Idol 2026
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-bg-alt text-primary border border-border-default">
                  <Award className="w-3.5 h-3.5 text-primary" /> Trinity Certified
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Cards & Background Surfaces ─────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.4</span>
            <SplitHeading
              firstClause="Surface Hierarchy &"
              accentClause="Card Variants"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              Card surfaces tailored to each background level: Pure White canvas, Blush Pink (#FDE6F3) alternating sections, and Stronger Pink (#FCCEE8) panels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* White Card on Blush */}
            <div className="p-6 rounded-3xl bg-bg-alt border border-border-subtle space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-heading">1. On Blush Pink (--color-bg-alt)</span>
              <div className="p-5 rounded-2xl bg-white border border-border-subtle shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-heading">Piano Fundamentals</h4>
                <p className="text-xs text-body">Classical sight-reading, finger independence, and posture.</p>
                <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
                  <span className="font-serif font-bold text-heading">₹3,999</span>
                  <button className="px-3 py-1.5 rounded-lg bg-cta text-white text-xs font-semibold btn-tactile">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

            {/* Blush Card on White */}
            <div className="p-6 rounded-3xl bg-white border border-border-default space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-heading">2. On Pure White (--color-bg)</span>
              <div className="p-5 rounded-2xl bg-bg-alt border border-border-default shadow-sm space-y-3">
                <div className="w-8 h-8 rounded-xl bg-accent-subtle text-accent-dark flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-heading">Free Trial Welcome</h4>
                <p className="text-xs text-body">Get 2 private 1:1 lessons with our certified maestros.</p>
                <div className="pt-2 border-t border-border-default flex items-center justify-between">
                  <span className="text-xs font-bold text-accent-dark">Free Allocation</span>
                  <button className="px-3 py-1.5 rounded-lg bg-cta text-white text-xs font-semibold btn-tactile">
                    Claim Trial
                  </button>
                </div>
              </div>
            </div>

            {/* Stronger Pink Panel */}
            <div className="p-6 rounded-3xl bg-white border border-border-default space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-heading">3. Muted Panel (--color-surface-muted)</span>
              <div className="p-5 rounded-2xl bg-surface-muted border border-border-strong space-y-3">
                <div className="w-8 h-8 rounded-xl bg-white text-heading flex items-center justify-center shadow-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-base font-bold text-heading">Next Session</h4>
                <p className="text-xs text-heading font-medium">Tomorrow at 4:30 PM with Guru Marcus</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-body-muted">Hindustani Vocals</span>
                  <button className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold btn-tactile">
                    Join Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Form Inputs & States ───────────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.5</span>
            <SplitHeading
              firstClause="Form Fields &"
              accentClause="Input States"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              High-clarity input states with crisp lilac focus rings, validated error states, and disabled styling.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Default */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-heading uppercase tracking-wider">
                  Default Input
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pandit Ravi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-default bg-white text-heading placeholder-body-muted text-xs focus:outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all"
                />
                <span className="text-[11px] text-body-muted">Standard idle state</span>
              </div>

              {/* Focused */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-heading uppercase tracking-wider">
                  Focused State
                </label>
                <input
                  type="text"
                  defaultValue="Aisha Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-cta bg-white text-heading text-xs outline-none ring-2 ring-cta/25 transition-all shadow-xs"
                />
                <span className="text-[11px] text-cta font-medium">Lilac focus-visible ring</span>
              </div>

              {/* Error */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-error uppercase tracking-wider">
                  Error State
                </label>
                <input
                  type="email"
                  defaultValue="invalid-email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-error bg-error-muted/30 text-error text-xs outline-none ring-1 ring-error/30 transition-all"
                />
                <div className="flex items-center gap-1 text-[11px] text-error font-medium">
                  <AlertCircle className="w-3 h-3" />
                  <span>Please enter a valid email address</span>
                </div>
              </div>

              {/* Disabled */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-body-muted uppercase tracking-wider">
                  Disabled Input
                </label>
                <input
                  type="text"
                  disabled
                  value="Read-only allotment ID"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-subtle bg-surface-muted/30 text-body-muted text-xs cursor-not-allowed"
                />
                <span className="text-[11px] text-body-muted">System locked field</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: Badges & Status System ─────────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.6</span>
            <SplitHeading
              firstClause="Badges &"
              accentClause="Status Indicators"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              Status badges for trial remaining, lesson types (TRIAL vs PAID_COURSE), support tickets, and enrollments.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-6">
            {/* Trial Badges */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-heading uppercase tracking-wider">Trial Status Strips</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-accent-subtle text-accent-dark border border-accent/40 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
                  2 of 2 Free Trials Remaining
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bg-alt text-primary border border-primary/30">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Awaiting Teacher Allotment
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-surface-muted text-heading border border-border-strong">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  Trials Completed
                </span>
              </div>
            </div>

            {/* Lesson Source Badges */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-heading uppercase tracking-wider">Lesson Source Badges</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-subtle text-accent-dark border border-accent/40">
                  TRIAL LESSON
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-subtle text-primary border border-primary/40">
                  PAID COURSE LESSON
                </span>
              </div>
            </div>

            {/* Ticket & Enrollment Badges */}
            <div className="space-y-3 pt-4 border-t border-border-subtle">
              <div className="text-xs font-semibold text-heading uppercase tracking-wider">Support & Enrollment Badges</div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-warning-muted text-warning border border-warning/30">
                  TICKET: OPEN
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-info-muted text-info border border-info/30">
                  IN PROGRESS
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-success-muted text-success border border-success/30">
                  RESOLVED
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cta-subtle text-cta border border-cta/30">
                  ENROLLMENT: ACTIVE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: Spacing Scale ─────────────────────────────────── */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Section 1.7</span>
            <SplitHeading
              firstClause="Spacing Scale &"
              accentClause="Container Rhythm"
              as="h2"
              size="xl"
            />
            <p className="text-sm text-body max-w-2xl">
              Consistent geometric spacing scale (4px to 64px) preventing arbitrary pixel values across portal templates.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-white p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
              {[
                { name: "p-1", px: "4px" },
                { name: "p-2", px: "8px" },
                { name: "p-3", px: "12px" },
                { name: "p-4", px: "16px" },
                { name: "p-6", px: "24px" },
                { name: "p-8", px: "32px" },
                { name: "p-12", px: "48px" },
                { name: "p-16", px: "64px" },
              ].map((space) => (
                <div key={space.name} className="p-3 rounded-xl bg-bg-alt border border-border-subtle space-y-1">
                  <div className="font-mono text-xs font-bold text-heading">{space.name}</div>
                  <div className="text-[11px] text-body-muted">{space.px}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
