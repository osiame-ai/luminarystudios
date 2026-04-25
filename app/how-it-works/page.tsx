import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Luminary Studios launches, maintains and grows your digital presence. From discovery call to live site, paid ads and AI systems — here is exactly what to expect.",
};

const steps = [
  {
    number: "01",
    title: "Discovery call",
    duration: "15 minutes",
    description:
      "We start with a short call to understand your business, your goals and where you are losing leads or revenue. No pitch. No proposal until we know it makes sense. You leave with a clear recommendation — even if it is not us.",
  },
  {
    number: "02",
    title: "Fixed-price brief",
    duration: "Within 24 hours",
    description:
      "We send you a one-page scope of work with a fixed price. No hourly billing. No change-order surprises. You know exactly what you are getting before you commit to anything.",
  },
  {
    number: "03",
    title: "Build and review",
    duration: "2 to 3 weeks",
    description:
      "We build. You get one structured review round mid-way and a final review before launch. Websites go through Lighthouse and cross-device testing before a single pixel goes live.",
  },
  {
    number: "04",
    title: "Launch",
    duration: "Same day",
    description:
      "We handle the DNS, hosting setup and domain configuration. You get a live site, all source files and full ownership of every asset. Nothing is held back.",
  },
  {
    number: "05",
    title: "Ongoing growth",
    duration: "Month by month",
    description:
      "Most clients stay on a retainer for ongoing content, ads or AI optimisation. You can also access a standalone support plan if you just need occasional updates. Either way, you are never locked in.",
  },
];

const plans = [
  {
    icon: Globe,
    title: "Starter",
    description: "Website plus basic SEO setup. Right for businesses that need a professional web presence that converts.",
    includes: ["Custom website build", "On-page SEO", "Contact and booking form", "30-day post-launch support"],
    cta: "Start here",
  },
  {
    icon: Zap,
    title: "Growth",
    description: "Website paired with paid ads or short-form video. Right for businesses ready to actively generate leads.",
    includes: ["Everything in Starter", "Meta Ads or Google Ads setup", "Ad creative production", "Monthly performance report"],
    cta: "Accelerate growth",
  },
  {
    icon: BarChart3,
    title: "Full System",
    description: "Website, content, ads and AI receptionist running as one integrated system. Right for businesses scaling fast.",
    includes: ["Everything in Growth", "AI receptionist build", "Monthly content calendar", "Quarterly strategy review"],
    cta: "Build the full system",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-[var(--color-base)]">
      <div className="h-20" />

      {/* Header */}
      <section className="section-padding max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/logo.svg" alt="" width={40} height={40} aria-hidden />
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
            The Process
          </span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          From first call<br />
          <span className="text-[var(--color-accent)]">to live and growing.</span>
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          No jargon. No hand-waving. Here is exactly what working with us looks like, step by step.
        </p>
      </section>

      {/* Steps */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-8 pb-12 relative">
              {/* Left column */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-base)] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[var(--color-accent)]">{step.number}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[var(--color-border)] mt-3" />
                )}
              </div>

              {/* Right column */}
              <div className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{step.title}</h2>
                  <span className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-text-subtle)]">
                    {step.duration}
                  </span>
                </div>
                <p className="text-[var(--color-text-muted)] leading-relaxed text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans — 3 columns */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Pick your starting point.
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
              All plans start with a free discovery call. The right one depends on where you are now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(({ icon: Icon, title, description, includes, cta }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 flex flex-col gap-6"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-glow)] flex items-center justify-center text-[var(--color-accent)]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{description}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <a href={site.bookingHref}
                    className="flex items-center justify-center gap-2">
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance note */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            What about after launch?
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
            We offer a standalone maintenance and support plan for clients who need occasional updates, plugin upgrades or small content changes without committing to a full retainer. You own the site. We are just here when you need us.
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] mb-8">
            SEO audits, performance optimisation and Google Search Console reporting are available as add-ons on any plan.
          </p>
          <Button asChild variant="outline" size="lg">
            <a href={site.bookingHref}
              className="inline-flex items-center gap-2">
              Ask about support plans
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <p className="mt-8 text-xs text-[var(--color-text-subtle)]">
            <Link href="/" className="hover:text-[var(--color-text-muted)] transition-colors">← Back to home</Link>
            {" · "}
            <Link href="/pricing" className="hover:text-[var(--color-text-muted)] transition-colors">View pricing →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
