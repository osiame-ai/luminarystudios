"use client";

/**
 * FlickeringGrid — canvas-based animated grid background.
 * Sized via ResizeObserver, paused when off-screen via IntersectionObserver.
 * Respects prefers-reduced-motion (renders a static grid, no flicker).
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  maxOpacity = 0.3,
  className,
  style,
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Parse color once per color change
  const toRgba = (c: string) => {
    if (typeof window === "undefined") return "0,0,0";
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "0,0,0";
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data);
    return `${r},${g},${b}`;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.width === 0 || size.height === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;
    ctx.scale(dpr, dpr);

    const cols = Math.floor(size.width / (squareSize + gridGap));
    const rows = Math.floor(size.height / (squareSize + gridGap));
    const total = cols * rows;
    const squares = new Float32Array(total);
    for (let i = 0; i < total; i++) squares[i] = Math.random() * maxOpacity;

    const rgb = toRgba(color);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      ctx.clearRect(0, 0, size.width, size.height);

      for (let i = 0; i < total; i++) {
        if (!reduced && Math.random() < flickerChance * dt) {
          squares[i] = Math.random() * maxOpacity;
        }
        const x = (i % cols) * (squareSize + gridGap);
        const y = Math.floor(i / cols) * (squareSize + gridGap);
        ctx.fillStyle = `rgba(${rgb}, ${squares[i]})`;
        ctx.fillRect(x, y, squareSize, squareSize);
      }

      if (isInView && !reduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    if (reduced) {
      // Single static paint
      draw(performance.now());
    } else if (isInView) {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [size, squareSize, gridGap, flickerChance, color, maxOpacity, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      style={style}
    >
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
}
