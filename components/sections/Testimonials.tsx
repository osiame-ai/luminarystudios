/**
 * Testimonials — three animated columns of placeholder testimonials.
 * Placed between PainPoints and Process.
 */

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { testimonials, SHOW_TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  if (!SHOW_TESTIMONIALS || testimonials.length === 0) return null;

  const first  = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third  = testimonials.slice(6, 9);

  return (
    <section aria-label="Client testimonials" className="section-padding bg-[var(--color-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
            Proof
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Real words from real operators.
          </h2>
        </div>

        <div
          className="flex justify-center gap-6 max-h-[740px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <TestimonialsColumn testimonials={first} duration={15} />
          <TestimonialsColumn testimonials={second} duration={19} className="hidden md:block" />
          <TestimonialsColumn testimonials={third} duration={17} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
