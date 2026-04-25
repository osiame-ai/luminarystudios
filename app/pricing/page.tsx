import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, fixed-price services. Websites, video content, paid ads and AI receptionists — all scoped before we start, no surprise invoices.",
};

const plans = [
  {
    number: "01",
    service: "Websites",
    tagline: "Sites built to turn visitors into paying clients.",
    price: "Starting from R 4,500",
    note: "One-time build fee. Fixed scope, fixed price — scoped before we start.",
    features: [
      "Custom design — no templates",
      "Mobile-first, Lighthouse-optimised build",
      "On-page SEO: structured data, metadata, sitemap",
      "Contact and booking forms with real email delivery",
      "2 to 3 week delivery",
      "Source files handed over on completion",
    ],
    cta: "Get a quote",
    highlight: false,
  },
  {
    number: "02",
    service: "Video Content",
    tagline: "Scroll-stopping content, posted consistently.",
    price: "Get a Quote",
    note: "Scoped to your output goals. Monthly retainer.",
    features: [
      "Short-form edits for Reels, TikTok and Shorts",
      "Captions, motion graphics and sound design",
      "Monthly content calendar and posting schedule",
      "Brand consistency across every clip",
      "48 to 72 hour turnaround per video",
    ],
    cta: "Get a quote",
    highlight: true,
  },
  {
    number: "03",
    service: "Paid Ads",
    tagline: "Ads managed to return more than they cost.",
    price: "Get a Quote",
    note: "Ad spend is separate and stays in your account.",
    features: [
      "Meta Ads and Google Ads management",
      "Audience research and campaign strategy",
      "Ad creative: copy and visual assets included",
      "Landing page optimisation for ad traffic",
      "Monthly plain-English reporting",
    ],
    cta: "Get a quote",
    highlight: false,
  },
  {
    number: "04",
    service: "AI Receptionists",
    tagline: "24/7 AI that books leads while you sleep.",
    price: "Get a Quote",
    note: "Built and scoped to your business. Fixed setup fee.",
    features: [
      "Voice and chat AI trained on your business",
      "Appointment booking integrated with your calendar",
      "Lead qualification before they reach you",
      "Handoff to WhatsApp or email when needed",
      "Live in 5 to 7 business days",
    ],
    cta: "Get a quote",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-[var(--color-base)]">
      <div className="h-20" />

      {/* Magazine header */}
      <section className="section-padding max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/logo.svg" alt="" width={40} height={40} aria-hidden />
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
            Pricing Guide
          </span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Transparent.<br />
          <span className="text-[var(--color-accent)]">Fixed price.</span><br />
          No surprises.
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Every project is scoped before we start. You approve the price before we build a single pixel. These are starting points — your quote is tailored to your brief.
        </p>
      </section>

      {/* Plan cards */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.service}
              className={`relative rounded-2xl border p-8 flex flex-col gap-6 ${
                plan.highlight
                  ? "border-[var(--color-accent)] shadow-[0_0_0_1px_rgba(232,160,67,0.3),0_8px_40px_rgba(232,160,67,0.08)]"
                  : "border-[var(--color-border)]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-6 right-6 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}

              <div>
                <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
                  {plan.number}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                  {plan.service}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">{plan.tagline}</p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-6">
                <p className={`font-bold ${
                  plan.price === "Get a Quote"
                    ? "text-2xl text-[var(--color-accent)] tracking-wide"
                    : "text-3xl text-[var(--color-text-primary)]"
                }`}>
                  {plan.price}
                </p>
                <p className="mt-1 text-xs text-[var(--color-text-subtle)]">{plan.note}</p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                    <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full mt-2">
                <a href={site.bookingHref}
                  className="flex items-center justify-center gap-2">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Fine print */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed mb-6">
            All prices are in South African Rand and exclude VAT. International clients are invoiced in USD or GBP. Packages can be combined for an integrated system rate.
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] mb-8">
            Not sure what you need? Book a free 15-minute discovery call and we&apos;ll map the right scope together.
          </p>
          <Button asChild size="lg">
            <a href={site.bookingHref}
              className="inline-flex items-center gap-2">
              Book a free discovery call
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <p className="mt-6 text-xs text-[var(--color-text-subtle)]">
            <Link href="/" className="hover:text-[var(--color-text-muted)] transition-colors">← Back to home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
