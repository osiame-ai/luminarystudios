"use client";

/**
 * InfiniteSlider — seamless horizontal/vertical marquee via framer-motion.
 * Measures its content with react-use-measure and animates a MotionValue over
 * the content size. Slows to `speedOnHover` when hovered (optional).
 */

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  speed?: number;        // pixels per second
  speedOnHover?: number; // slower pixels per second while hovered
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, bounds] = useMeasure();
  const [hovered, setHovered] = useState(false);
  const translation = useMotionValue(0);

  useEffect(() => {
    translation.set(0);
  }, [bounds.width, bounds.height, translation]);

  useAnimationFrame((_t, delta) => {
    const dim = direction === "horizontal" ? bounds.width : bounds.height;
    if (!dim) return;
    const px = ((hovered && speedOnHover != null ? speedOnHover : speed) * delta) / 1000;
    const current = translation.get();
    const next = reverse ? current + px : current - px;
    const loop = dim / 2; // we render children twice; loop over one copy
    const wrapped = ((next % loop) + loop) % loop;
    translation.set(reverse ? wrapped : -wrapped);
  });

  const transform = useTransform(translation, (v) =>
    direction === "horizontal" ? `translateX(${v}px)` : `translateY(${v}px)`
  );

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        ref={ref}
        style={{
          transform,
          display: "flex",
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap,
          width: direction === "horizontal" ? "max-content" : undefined,
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
