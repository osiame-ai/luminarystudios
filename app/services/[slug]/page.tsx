/**
 * Service detail page — /services/[slug]
 * Spec §4.7: Breadcrumb, heading, features, pricing, contact form, Book a Call CTA.
 * Portfolio section hidden until content is ready.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ui/ContactForm";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { getServiceBySlug, getServiceSlugs } from "@/content/services";
import { site } from "@/content/site";

// ── Static params ─────────────────────────────────────────
export function generateStaticParams() {
  return getServiceSlugs();
}

// ── Metadata ──────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title:       service.title,
    description: service.metaDescription,
    openGraph: {
      title:       `${service.title} | Luminary Studios`,
      description: service.metaDescription,
      url:         `${site.siteUrl}/services/${slug}`,
    },
  };
}

// ── Service JSON-LD ───────────────────────────────────────
function ServiceSchema({ service }: { service: Awaited<ReturnType<typeof getServiceBySlug>> }) {
  if (!service) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Luminary Studios",
      url: site.siteUrl,
    },
    areaServed: ["ZA", "International"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceSchema service={service} />
      <Navigation />
      <main>
        {/* ── Hero block ─────────────────────────────────── */}
        <section
          aria-label={`${service.title} overview`}
          className="section-padding bg-[var(--color-base)] border-b border-[var(--color-border)]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] mb-8"
            >
              <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <Link href="/#services" className="hover:text-[var(--color-text-primary)] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="text-[var(--color-text-primary)] font-medium" aria-current="page">
                {service.title}
              </span>
            </nav>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
              {service.subheading}
            </p>

            {/* Primary CTA */}
            <div className="mt-8">
              <Button asChild size="lg">
                <a
                  href={site.bookingHref}
                  className="inline-flex items-center gap-2"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── What's included ────────────────────────────── */}
        <section
          aria-label="What's included"
          className="section-padding bg-[var(--color-surface)]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Features */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                  What&apos;s included
                </h2>
                <ul className="space-y-4 list-none p-0 m-0">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-[var(--color-text-primary)] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing block */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-base)] p-6 lg:p-8">
                <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
                  Pricing
                </p>
                <p className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                  {service.pricing}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                  {service.pricingNote}
                </p>
                <Button asChild className="w-full" size="lg">
                  <a
                    href={site.bookingHref}
                    className="flex items-center justify-center gap-2"
                  >
                    Book a Free Call
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Portfolio section (hidden until content ready) ─ */}
        {service.portfolioVisible && service.portfolio.length > 0 && (
          <section
            aria-label="Examples of our work"
            className="section-padding bg-[var(--color-base)]"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-8">
                Examples of our work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.portfolio.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                  >
                    <p className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mb-3">
                      {item.client}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-1">
                      <strong className="text-[var(--color-text-primary)]">Problem:</strong>{" "}
                      {item.problem}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      <strong className="text-[var(--color-text-primary)]">Result:</strong>{" "}
                      {item.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* TODO: Add portfolio items to content/services.ts and set portfolioVisible: true when real work is ready. */}

        {/* ── Contact form ───────────────────────────────── */}
        <section
          aria-label="Get in touch"
          className="section-padding bg-[var(--color-surface)]"
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
              Ready to start?
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Tell us what you need — we&apos;ll come back within one business day.
            </p>
            <ContactForm service={service.title} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
