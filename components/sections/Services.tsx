/**
 * Services — Luminary Studios
 * Growth Premium featured card + 2×2 grid of core services.
 */

import { services } from "@/content/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { GrowthPremium } from "@/components/ui/GrowthPremium";

export function Services() {
  return (
    <section
      id="services"
      aria-label="Our services"
      className="section-padding bg-[var(--color-base)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
            What we do
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] mb-5">
            Pick what your business actually needs.
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Full-stack creative and automation under one roof. Pick the piece that unblocks your growth or take the whole system.
          </p>
        </div>

        {/* Growth Premium — full-width featured card */}
        <GrowthPremium />

        {/* 2×2 core services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
