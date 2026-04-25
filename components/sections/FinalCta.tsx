"use client";

/**
 * FinalCta — Luminary Studios
 * Spec §4.9: Large centered type, ambient amber glow, Book a Call + mailto link.
 */

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";

export function FinalCta() {
  const handleBookCall = () => {
    track("cta_click", { location: "final_cta", label: "Book a Call" });
  };

  const handleEmailClick = () => {
    track("cta_click", { location: "final_cta", label: "Email us" });
  };

  return (
    <section
      aria-label="Get started"
      className="section-padding bg-[var(--color-text-primary)] relative overflow-hidden"
    >
      {/* Ambient amber glow — CSS only, no JS */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          style={{
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(232,160,67,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo mark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          width={48}
          height={48}
          aria-hidden="true"
          className="mx-auto mb-6"
        />
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          Ready to build the system?
        </h2>
        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-xl mx-auto">
          15 minutes, zero pressure, a clear answer on whether we can help.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="xl"
            onClick={handleBookCall}
            className="bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
          >
            <a
              href={site.bookingHref}
              className="flex items-center gap-2"
            >
              Book a Call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Secondary — mailto */}
        <p className="mt-6 text-sm text-white/40">
          or{" "}
          <a
            href={`mailto:${site.email}`}
            onClick={handleEmailClick}
            className="underline underline-offset-4 text-white/60 hover:text-white transition-colors"
          >
            email us directly
          </a>
        </p>
      </div>
    </section>
  );
}
