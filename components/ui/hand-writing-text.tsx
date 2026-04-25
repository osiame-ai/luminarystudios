"use client";

/**
 * HandWritingText — animated SVG scribble underline
 * Spec §4.4: renders "We fix that." with an animated underline/scribble.
 * Triggered by `isVisible` prop from IntersectionObserver (not on mount).
 * prefers-reduced-motion: shows static underline, no draw animation.
 */

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

interface HandWritingTextProps {
  text?: string;
  isVisible: boolean;
  className?: string;
}

export function HandWritingText({
  text = "We fix that.",
  isVisible,
  className = "",
}: HandWritingTextProps) {
  const prefersReduced = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {/* The text itself */}
      <span className="relative z-10">{text}</span>

      {/* SVG scribble underline */}
      <span
        className="absolute left-0 -bottom-2 w-full pointer-events-none"
        aria-hidden="true"
        style={{ height: "12px" }}
      >
        <svg
          viewBox="0 0 200 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          {prefersReduced ? (
            // Static underline for reduced motion
            <path
              d="M2 7 Q 50 3, 100 7 Q 150 11, 198 6"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <motion.path
              d="M2 7 Q 50 3, 100 7 Q 150 11, 198 6"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                pathLength: { duration: 0.9, ease: "easeOut", delay: 0.15 },
                opacity:    { duration: 0.1 },
              }}
            />
          )}
        </svg>
      </span>
    </span>
  );
}
