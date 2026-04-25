import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Work by Luminary Studios. Websites, video content, paid ad campaigns and AI receptionists built for real businesses.",
};

const caseStudies = [
  {
    number: "01",
    client: "Glow Day Spa",
    location: "Sandton, Johannesburg",
    service: "Website + Paid Ads",
    result: "Bookings up 40% in 60 days",
    description:
      "Complete website rebuild paired with a Meta Ads campaign targeting women within 15km. The new booking flow cut phone call friction and the ads ran at a 3.8x return on ad spend.",
    tags: ["Websites", "Meta Ads"],
    color: "#E8A043",
  },
  {
    number: "02",
    client: "PrecisionDent",
    location: "Randburg, Johannesburg",
    service: "AI Receptionist",
    result: "Zero missed leads after hours",
    description:
      "AI voice receptionist trained on their service list, pricing FAQs and staff schedules. Captures and qualifies every call after 5pm. Hands off to WhatsApp for follow-up within seconds.",
    tags: ["AI Receptionist"],
    color: "#10A37F",
  },
  {
    number: "03",
    client: "SwiftHaul Logistics",
    location: "Cape Town",
    service: "Website + Video Content",
    result: "Website converts at 6.1%",
    description:
      "Service-focused website built around a clear quote request flow. Combined with monthly short-form video content for LinkedIn, organic lead generation doubled within a quarter.",
    tags: ["Websites", "Video"],
    color: "#4353FF",
  },
  {
    number: "04",
    client: "Aura Beauty",
    location: "Pretoria",
    service: "Full System",
    result: "ROAS up 3.2x after 90 days",
    description:
      "Full integrated build: conversion-focused website, branded short-form content calendar, and Google Ads campaign targeting high-intent search terms. All three working as one system.",
    tags: ["Websites", "Video", "Google Ads"],
    color: "#CC785C",
  },
  {
    number: "05",
    client: "FORM Fitness Studio",
    location: "Johannesburg North",
    service: "Website + Meta Ads",
    result: "50 new members in first month",
    description:
      "Landing page built specifically for a membership push campaign. Ads ran to cold audiences within a 20km radius. Cost per acquisition came in 40% below the studio's previous benchmark.",
    tags: ["Websites", "Meta Ads"],
    color: "#F24E1E",
  },
  {
    number: "06",
    client: "Vitalife Health",
    location: "Durban",
    service: "Video Content",
    result: "3.1M organic views in 90 days",
    description:
      "Monthly retainer for short-form health and wellness content across Instagram and TikTok. Consistent format, fast edits and a growing audience that compounds month on month.",
    tags: ["Video"],
    color: "#0082FB",
  },
];

export default function PortfolioPage() {
  return (
    <main className="bg-[var(--color-base)]">
      <div className="h-20" />

      {/* Magazine header */}
      <section className="section-padding max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Image src="/logo.svg" alt="" width={40} height={40} aria-hidden />
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
            Case Studies
          </span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Results for<br />
          <span className="text-[var(--color-accent)]">real businesses.</span>
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          Every project here was built with a measurable goal. No vanity metrics. These are the numbers that moved.
        </p>
      </section>

      {/* Case studies */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {caseStudies.map((study) => (
            <div
              key={study.number}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-base)] p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              {/* Left */}
              <div>
                <span className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
                  {study.number}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                  {study.client}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{study.location}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {study.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle */}
              <div className="lg:col-span-1">
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {study.description}
                </p>
              </div>

              {/* Right — result */}
              <div className="flex flex-col justify-between">
                <div
                  className="rounded-xl p-6 text-white text-center"
                  style={{ background: study.color }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">
                    Key Result
                  </p>
                  <p className="text-xl font-bold leading-tight">{study.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--color-text-muted)] mb-2 text-base">
            Portfolio is growing with client permission. New case studies added monthly.
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] mb-8">
            Want to see results relevant to your industry? Book a call and we&apos;ll walk you through the numbers directly.
          </p>
          <Button asChild size="lg">
            <a href={site.bookingHref}
              className="inline-flex items-center gap-2">
              Book a discovery call
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
