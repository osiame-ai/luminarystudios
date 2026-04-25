"use client";

/**
 * TestimonialsColumn — Luminary Studios
 * Animated vertical scroll column of testimonial cards using motion/react.
 * Smooth infinite loop, pauses on hover.
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/content/testimonials";

const initialOf = (name: string) =>
  name.trim().charAt(0).toUpperCase() || "•";

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration?: number; // seconds for one full loop
  className?: string;
}

export function TestimonialsColumn({
  testimonials,
  duration = 15,
  className,
}: TestimonialsColumnProps) {
  return (
    <div className={cn("relative", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).flatMap((_, loopIdx) =>
          testimonials.map(({ text, name, role }, i) => (
            <div
              key={`${name}-${loopIdx}-${i}`}
              className="w-80 max-w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-[var(--color-text-primary)] mb-5">
                &ldquo;{text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="h-9 w-9 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold flex items-center justify-center shrink-0"
                >
                  {initialOf(name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{role}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
