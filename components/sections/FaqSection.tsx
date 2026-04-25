/**
 * FAQ section wrapper
 * Spec §4.8: 4 questions, no theme toggle, site CSS vars.
 */

import { FaqMonochrome } from "@/components/ui/faq-monochrome";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="section-padding bg-[var(--color-surface)]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Questions we get a lot.
          </h2>
        </div>
        <FaqMonochrome />
      </div>
    </section>
  );
}
