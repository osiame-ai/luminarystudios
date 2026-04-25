"use client";

/**
 * ServiceCard — Luminary Studios
 * Minimal dark card: number, title, one punchy sentence, animated glow on hover.
 * CTA: "Book a Call" → /book  |  "View More →" → /services/[slug]
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@vercel/analytics";
import { site } from "@/content/site";
import type { ServiceData } from "@/content/services";

interface ServiceCardProps {
  service: ServiceData;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 0.68, 0, 1], delay: index * 0.07 }}
      whileHover={prefersReduced ? {} : { y: -4 }}
    >
      <div
        className="group relative flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 min-h-[280px] overflow-hidden transition-all duration-300
          hover:border-[var(--color-accent)] hover:shadow-[0_0_0_1px_rgba(232,160,67,0.4),0_8px_40px_rgba(232,160,67,0.08)]"
      >
        {/* Ambient glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at top left, rgba(232,160,67,0.07) 0%, transparent 55%)" }}
        />

        {/* Top row: number + NEW pill */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
            0{index + 1}
          </span>
          {service.isNew && (
            <span className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              New
            </span>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-[var(--color-text-muted)] leading-relaxed text-base">
            {service.shortDescription}
          </p>
        </div>

        {/* CTA row */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
          {/* Book a Call */}
          <a
            href={site.bookingHref}
            onClick={() => track("service_card_click", { service: service.slug, action: "book" })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-[var(--color-accent)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-accent-dark)] active:scale-95 transition-all duration-200"
          >
            Book a Call
          </a>

          {/* View More */}
          <Link
            href={`/services/${service.slug}`}
            onClick={() => track("service_card_click", { service: service.slug, action: "view_more" })}
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] group-hover:text-[var(--color-accent)] transition-colors duration-200"
          >
            View More
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
