/**
 * Privacy Policy — Luminary Studios
 * POPIA-aligned (Protection of Personal Information Act, South Africa).
 * Update the effective date and contact details before launch.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer }     from "@/components/sections/Footer";
import { site }       from "@/content/site";

export const metadata: Metadata = {
  title:       "Privacy Policy",
  description: "How Luminary Studios collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="section-padding">
        <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            {" / "}
            <span aria-current="page">Privacy Policy</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Effective date: {site.legalEffectiveDate}
          </p>

          <div className="prose prose-zinc max-w-none space-y-8 text-[var(--color-text-primary)]">

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Who we are</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {site.name} is a creative media agency based in Johannesburg, South Africa. This
                privacy policy explains how we handle personal information in compliance with the
                Protection of Personal Information Act, 4 of 2013 (POPIA).
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                Contact us at:{" "}
                <a href={`mailto:${site.email}`} className="text-[var(--color-accent)] underline">
                  {site.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information we collect</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We collect information you voluntarily provide through our contact form:
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] mt-2 space-y-1">
                <li>Your name and business name</li>
                <li>Your email address</li>
                <li>Your message and service enquiry</li>
              </ul>
              <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                We also collect standard server logs (IP address, browser type, pages visited) via
                Vercel Analytics, which is privacy-friendly and does not use cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How we use your information</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We use your information solely to:
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] mt-2 space-y-1">
                <li>Respond to your enquiry</li>
                <li>Provide the services you requested</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                We do not sell, rent, or share your personal information with third parties for
                marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Third-party services</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] mt-2 space-y-1">
                <li><strong>Resend</strong> — email delivery of contact form submissions</li>
                <li><strong>Cal.com</strong> — appointment scheduling</li>
                <li><strong>Vercel</strong> — website hosting and analytics</li>
              </ul>
              <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                Each service has its own privacy policy governing how they handle data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Your rights under POPIA</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-muted)] mt-2 space-y-1">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to the processing of your information</li>
                <li>Lodge a complaint with the Information Regulator (South Africa)</li>
              </ul>
              <p className="text-[var(--color-text-muted)] leading-relaxed mt-3">
                To exercise any of these rights, email us at{" "}
                <a href={`mailto:${site.email}`} className="text-[var(--color-accent)] underline">
                  {site.email}
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data retention</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We retain contact form data for as long as necessary to respond to your enquiry and
                fulfil any resulting contract. Email correspondence is retained for 5 years for
                business record purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Cookies</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                This website does not use tracking cookies. Vercel Analytics collects anonymised
                page-view data without any cookies or personal identifiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to this policy</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                We may update this policy from time to time. The effective date at the top of this
                page reflects when it was last updated. Continued use of our website constitutes
                acceptance of any changes.
              </p>
            </section>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
