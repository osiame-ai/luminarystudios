"use client";

/**
 * PainPoints — Luminary Studios
 * Pain questions + "We fix that." + brand video (9:16, play-on-click).
 * Mobile: stacked. Desktop: 2-col (text left, video right).
 */

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { HandWritingText } from "@/components/ui/hand-writing-text";

const painLines = [
  "Struggling to get consistent clients?",
  "Ads not converting?",
  "Website looks good but doesn't sell?",
] as const;

export function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playing,   setPlaying]   = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const lineVariants = {
    hidden:   { opacity: 0, y: 20 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] as [number,number,number,number] } },
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Common challenges we solve"
      className="section-padding bg-[var(--color-text-primary)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — pain lines + resolution */}
          <div className="text-center lg:text-left">
            <motion.ul
              variants={containerVariants}
              initial={prefersReduced ? "visible" : "hidden"}
              animate={prefersReduced || isVisible ? "visible" : "hidden"}
              className="list-none p-0 m-0 space-y-4 mb-10"
            >
              {painLines.map((line) => (
                <motion.li
                  key={line}
                  variants={lineVariants}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white/80"
                >
                  {line}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={prefersReduced || isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 0.68, 0, 1] }}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                <span className="text-white/60 mr-3">→</span>
                <HandWritingText text="We fix that." isVisible={isVisible} />
              </p>
            </motion.div>
          </div>

          {/* Right — brand video 9:16 */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">

              {/* Animated "Watch this" arrow — desktop only */}
              <motion.div
                className="absolute -left-28 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-white/45 pointer-events-none"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                <span className="text-xs font-medium whitespace-nowrap">Watch this</span>
                <svg width="36" height="24" viewBox="0 0 36 24" fill="none" className="shrink-0">
                  <path d="M2 12 Q10 2 20 12 Q28 20 34 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M30 8 L34 12 L30 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              {/* 9:16 container */}
              <div
                className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]"
                style={{ aspectRatio: "9/16" }}
              >
                <video
                  ref={videoRef}
                  src="/videos/wesellmoney.mp4"
                  className="w-full h-full object-cover rounded-2xl"
                  playsInline
                  preload="metadata"
                  onEnded={() => setPlaying(false)}
                  aria-label="Luminary Studios brand video"
                />

                {/* Play / pause overlay */}
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause video" : "Play video"}
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    playing
                      ? "bg-transparent opacity-0 group-hover:opacity-100"
                      : "bg-black/40"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    {playing
                      ? <Pause className="w-6 h-6" />
                      : <Play  className="w-6 h-6 ml-1" />
                    }
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
