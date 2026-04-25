"use client";

/**
 * BackToTop — floating button (bottom right) that scrolls to the top of the page.
 * Appears once the user scrolls ~400px down. Smooth scroll. Respects reduced motion.
 */

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed bottom-24 right-7 z-40
        w-10 h-10 rounded-full
        bg-[var(--color-accent)] text-white
        flex items-center justify-center
        shadow-[0_8px_24px_rgba(232,160,67,0.35)]
        hover:scale-110 hover:shadow-[0_10px_30px_rgba(232,160,67,0.5)]
        active:scale-95
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
