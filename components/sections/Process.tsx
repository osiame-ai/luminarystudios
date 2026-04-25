"use client";

/**
 * Process — Luminary Studios
 * Scroll-driven animation: progress bar fills + steps highlight in amber as user scrolls.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "We figure out what's actually costing you money, and where a system earns it back.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Execution",
    description: "Design, content, and automation built tight — no fluff, no delays.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Results",
    description: "You get reporting in plain English, and a system that keeps working after we leave.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
] as const;

const howWeWorkSteps = [
  { n: "01", title: "Discovery call",     body: "15 minutes. We map what's working, what's leaking, and whether we're the right fit." },
  { n: "02", title: "Fixed-price brief",  body: "One-page scope with a locked price. You approve before we build a single pixel." },
  { n: "03", title: "Build and review",   body: "We build. You review mid-way and before launch. Tested across every device." },
  { n: "04", title: "Launch",             body: "We handle DNS, hosting and domain. You get the live site and all source files." },
  { n: "05", title: "Ongoing growth",     body: "Retainer for content, ads or AI. No lock-in. Month by month." },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  // Progress bar height: 0% → 100% as section scrolls into view
  const barHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Each step activates at 0, 0.4, 0.7 scroll progress
  const stepThresholds = [0, 0.35, 0.7];

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-label="Our process"
      className="section-padding bg-[var(--color-base)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
            How we work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Simple. Tight. Repeatable.
          </h2>
        </div>

        <div className="flex gap-8 lg:gap-16">
          {/* Vertical progress bar — desktop only */}
          {!prefersReduced && (
            <div className="hidden lg:flex flex-col items-center shrink-0">
              <div className="relative w-0.5 flex-1 bg-[var(--color-border)] rounded-full overflow-hidden mt-6">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[var(--color-accent)] rounded-full"
                  style={{ height: barHeight }}
                />
              </div>
            </div>
          )}

          {/* Steps */}
          <ol className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-8 list-none p-0 m-0">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.number}
                step={step}
                scrollYProgress={scrollYProgress}
                threshold={stepThresholds[i]}
                prefersReduced={!!prefersReduced}
              />
            ))}
          </ol>
        </div>

        {/* "How We Work" expandable */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setOpen(v => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/8 text-sm font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent)]/15 transition-all duration-200"
            aria-expanded={open}
          >
            How We Work
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 0.68, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
                  {howWeWorkSteps.map(({ n, title, body }) => (
                    <div key={n} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                      <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">{n}</span>
                      <p className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/how-it-works"
                  className="inline-block mt-5 text-sm font-semibold text-[var(--color-accent)] hover:underline"
                >
                  See full breakdown →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

function ProcessStep({
  step,
  scrollYProgress,
  threshold,
  prefersReduced,
}: {
  step: (typeof steps)[number];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  threshold: number;
  prefersReduced: boolean;
}) {
  // Derive active color from scroll progress
  const numberOpacity = useTransform(scrollYProgress, [threshold, threshold + 0.15], [0.06, 0.15]);
  const accentColor = useTransform(
    scrollYProgress,
    [threshold, threshold + 0.2],
    ["var(--color-text-muted)", "var(--color-accent)"]
  );

  return (
    <motion.li
      className="flex-1 flex flex-col items-center text-center"
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1] }}
    >
      {/* Number */}
      <motion.span
        className="font-mono text-7xl lg:text-8xl font-bold leading-none mb-4 select-none"
        aria-hidden="true"
        style={{
          color: "var(--color-text-primary)",
          opacity: prefersReduced ? 0.06 : numberOpacity,
          fontFamily: "var(--font-mono)",
        }}
      >
        {step.number}
      </motion.span>

      {/* Icon */}
      <motion.span
        className="mb-3"
        style={{ color: prefersReduced ? "var(--color-accent)" : accentColor, marginTop: "-1rem" }}
      >
        {step.icon}
      </motion.span>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 tracking-tight">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-[var(--color-text-muted)] leading-relaxed max-w-xs">
        {step.description}
      </p>
    </motion.li>
  );
}
