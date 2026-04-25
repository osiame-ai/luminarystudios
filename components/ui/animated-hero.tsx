"use client";

/**
 * AnimatedHero — Luminary Studios
 * Logo → promo pill → rotating headline → tagline → CTAs → stats
 */

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid-hero";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";

const phrases = [
  "GENERATE MORE LEADS.",
  "SCALE YOUR BUSINESS.",
  "BUILD YOUR BRAND.",
  "CLOSE MORE DEALS.",
] as const;
const INITIAL_INDEX  = 1;
const INTERVAL_MS    = 2400;
const LONGEST_PHRASE = "GENERATE MORE LEADS.";

const variants: Variants = {
  enter:  { y: 28, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 0.68, 0, 1] } },
  exit:   { y: -20, opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// ── Count-up stat ─────────────────────────────────────────────
function StatCounter({
  value, suffix = "", prefix = "", label,
}: { value: number; suffix?: string; prefix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const duration = 1200;
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
        {prefix}{count}{suffix}
      </p>
      <p className="text-xs font-medium text-[var(--color-text-muted)] mt-0.5">{label}</p>
    </div>
  );
}

// ── Main hero ─────────────────────────────────────────────────
export function AnimatedHero() {
  const [index, setIndex] = useState(INITIAL_INDEX);
  const prefersReduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [prefersReduced]);

  const handleBookCall = () => track("cta_click", { location: "hero", label: "Book a Call" });
  const handleContact  = () => track("cta_click", { location: "hero", label: "Contact Us" });

  return (
    <section
      aria-label="Hero"
      className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 min-h-[60vh] overflow-hidden"
    >
      <FlickeringGrid
        color="#E8A043"
        maxOpacity={0.25}
        flickerChance={0.22}
        squareSize={4}
        gridGap={6}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[600px] h-[400px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(ellipse at center, var(--color-accent-glow) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Logo + glow */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div
            aria-hidden="true"
            className="absolute w-24 h-24 rounded-full opacity-30 animate-pulse"
            style={{
              background: "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 70%)",
              filter: "blur(16px)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" aria-hidden width={52} height={52} className="relative z-10" />
        </div>

        {/* Promo pill */}
        <div className="mb-8">
          <a
            href={site.bookingHref}
            onClick={() => track("cta_click", { location: "hero_pill", label: "30 days promo" })}
            className="group inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/70 backdrop-blur-sm hover:border-[var(--color-accent)]/40 hover:bg-white transition-all duration-300"
            style={{
              boxShadow: "0 1px 2px rgba(15,15,15,0.04), 0 0 0 1px rgba(232,160,67,0.06)",
            }}
          >
            <span
              className="relative inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
              style={{ boxShadow: "0 4px 12px rgba(232,160,67,0.35)" }}
            >
              <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              New
            </span>
            <span className="text-sm font-medium text-[var(--color-text-primary)] whitespace-nowrap">
              First 30 days of ads
              <span className="text-[var(--color-accent)] font-semibold"> on us</span>
            </span>
            <ArrowRight
              className="w-3.5 h-3.5 text-[var(--color-text-subtle)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all duration-300"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[var(--color-text-primary)]">
          <span className="block mb-1 font-light tracking-wide text-[var(--color-text-muted)]">
            We build systems that
          </span>
          <span className="block relative" aria-live="polite" aria-atomic="true">
            <span aria-hidden="true" className="invisible block text-[var(--color-accent)]">
              {LONGEST_PHRASE}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              {prefersReduced ? (
                <span className="text-[var(--color-accent)]">{phrases[INITIAL_INDEX]}</span>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={index}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-[var(--color-accent)] inline-block"
                  >
                    {phrases[index]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          One agency, all-in-one to grow your revenue.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" onClick={handleBookCall}>
            <a href={site.bookingHref} className="flex items-center gap-2">
              Book a Call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={handleContact}>
            <a href="#contact">Contact Us</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <StatCounter value={120} suffix="+" label="brands served" />
          <div className="w-px h-10 bg-[var(--color-border)]" aria-hidden="true" />
          <StatCounter value={5} suffix="x" prefix="+" label="avg revenue growth" />
          <div className="w-px h-10 bg-[var(--color-border)] hidden sm:block" aria-hidden="true" />
          <StatCounter value={94} suffix="%" label="client retention" />
        </div>
      </div>

      <style>{`
        @keyframes hero-glow-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(232,160,67,0.18), 0 0 6px rgba(232,160,67,0.08); }
          50%       { box-shadow: 0 0 32px rgba(232,160,67,0.35), 0 0 12px rgba(232,160,67,0.15); }
        }
      `}</style>
    </section>
  );
}
