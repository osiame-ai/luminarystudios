"use client";

/**
 * GrowthPremium — Luminary Studios
 * Full-width featured "Growth Premium" plan card above the 4 service cards.
 */

import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";

const includes = [
  "Full website build or revamp",
  "Short-form video content — monthly calendar",
  "Paid ads (Meta or Google) managed end-to-end",
  "AI receptionist trained on your business",
  "Monthly strategy review in plain English",
  "Priority support — 4-hour response time",
];

export function GrowthPremium() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1] }}
      className="mb-6"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-text-primary)] p-8 sm:p-10 lg:p-12"
        style={{
          boxShadow: "0 0 0 1px rgba(232,160,67,0.2), 0 16px 60px rgba(232,160,67,0.08)",
        }}
      >
        {/* Ambient amber glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(232,160,67,0.12) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                Premium
              </span>
              <span className="text-xs font-bold tracking-widest text-white/30 uppercase">05</span>
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
              Growth Premium
            </h3>
            <p className="text-lg text-white/60 mb-6 leading-relaxed">
              A second business running your first one. You delegate the most important tasks. We execute.
            </p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-3xl font-bold text-[var(--color-accent)]">POA</span>
              <span className="text-sm text-white/40">Price on application</span>
            </div>

            <a
              href={site.bookingHref}
              onClick={() => track("service_card_click", { service: "growth-premium" })}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-sm hover:bg-[var(--color-accent-dark)] active:scale-95 transition-all duration-200"
            >
              Book an exclusive call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Right — includes list */}
          <ul className="space-y-3 list-none p-0 m-0">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
