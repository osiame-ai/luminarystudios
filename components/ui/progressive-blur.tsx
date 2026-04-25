"use client";

/**
 * ProgressiveBlur — edge fade/blur overlay for marquees.
 * Renders a gradient mask on one side so content fades out smoothly.
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  blurIntensity?: number;
}

export function ProgressiveBlur({
  className,
  direction = "left",
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const gradient =
    direction === "left"
      ? "linear-gradient(to right, var(--color-base), transparent)"
      : direction === "right"
      ? "linear-gradient(to left, var(--color-base), transparent)"
      : direction === "top"
      ? "linear-gradient(to bottom, var(--color-base), transparent)"
      : "linear-gradient(to top, var(--color-base), transparent)";

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={{
        background: gradient,
        filter: `blur(${blurIntensity * 4}px)`,
      }}
    />
  );
}
