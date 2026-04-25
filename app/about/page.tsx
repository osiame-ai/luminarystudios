import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Luminary Studios is a global creative agency built to help ambitious businesses generate more leads, build their brand, and scale with systems — not just services.",
};

const values = [
  {
    title: "Results over aesthetics",
    description:
      "Beautiful work that doesn't move the number is just decoration. Everything we build has a measurable goal attached to it.",
  },
  {
    title: "Transparent by default",
    description:
      "No smoke, no jargon. You see exactly what your money does, in plain English, every month. If something isn't working, we say so first.",
  },
  {
    title: "Built to scale",
    description:
      "We don't build campaigns — we build systems. The work compounds over time and keeps performing after we leave.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-base)]">
      {/* Nav spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="section-padding max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Image src="/logo.svg" alt="Luminary Studios" width={48} height={48} />
          <span className="text-sm font-medium text-[var(--color-text-muted)] tracking-widest uppercase">
            About us
          </span>
        </div>
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We are{" "}
          <span className="italic font-normal">Luminary Studios.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
          A global creative agency that builds systems — not just deliverables.
          Design, content, ads, and AI working together to grow your revenue.
        </p>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-8">
            Why we exist
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text-muted)] leading-relaxed">
            <p>
              Most agencies sell you a website, run your ads, or post your content. Then they invoice and disappear. You&apos;re left with outputs that don&apos;t talk to each other — and results that plateau fast.
            </p>
            <p>
              We built Luminary Studios to solve that. Every service we offer — websites, video, paid ads, AI receptionists — is designed to work as one integrated system. When all the pieces are aligned, the results compound. That&apos;s what we sell. Not services. Systems.
            </p>
            <p>
              We&apos;re a lean, senior team operating globally from Johannesburg. We work with founders, operators, and growth-stage businesses who are ready to invest in a system that actually pays back.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-12 text-center">
            How we think
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mb-6" />
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-text-primary)] text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            style={{
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse at center, rgba(232,160,67,0.12) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to build something real?
          </h2>
          <p className="text-lg text-white/60 mb-8">
            15-minute discovery call. No pressure. A clear answer on whether we&apos;re the right fit.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
          >
            <a
              href={site.bookingHref}
              className="flex items-center gap-2"
            >
              Book a discovery call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </Button>
          <p className="mt-5 text-sm text-white/40">
            or{" "}
            <Link href="/#contact" className="underline underline-offset-4 text-white/60 hover:text-white">
              send us a message
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
