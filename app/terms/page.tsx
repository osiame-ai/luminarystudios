/**
 * Terms of Service — Luminary Studios
 * South African law, plain English.
 * TODO: Have this reviewed by a lawyer before launch.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/sections/Navigation";
import { Footer }     from "@/components/sections/Footer";
import { site }       from "@/content/site";

export const metadata: Metadata = {
  title:       "Terms of Service",
  description: "Terms and conditions for Luminary Studios services.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="section-padding">
        <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--color-text-primary)] transition-colors">Home</Link>
            {" / "}
            <span aria-current="page">Terms of Service</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-10">
            Effective date: {site.legalEffectiveDate}
          </p>

          <div className="space-y-8 text-[var(--color-text-primary)]">

            <section>
              <h2 className="text-xl font-semibold mb-3">1. Agreement</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                By engaging {site.name} for services, you agree to these terms. These terms govern
                all projects, retainers, and deliverables between {site.name} and the client.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Services</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                The specific scope, deliverables, timeline, and fees for each project are agreed in
                a written brief or proposal before work begins. We do not begin work without a
                signed agreement and a deposit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Payment</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Project fees are invoiced in South African Rands (ZAR) unless otherwise agreed.
                Standard payment terms: 50% deposit to commence, 50% on delivery. Retainer fees
                are invoiced monthly in advance. Late payments may incur a 2% monthly fee.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Intellectual property</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Upon receipt of full payment, all deliverables transfer to the client. {site.name}{" "}
                retains the right to display completed work in its portfolio unless the client
                requests otherwise in writing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Client responsibilities</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                The client is responsible for providing accurate content, timely feedback, and
                approvals. Delays caused by late client feedback may extend project timelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Revisions</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Revision allowances are specified in each project proposal. Requests beyond the
                agreed scope will be quoted separately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Either party may terminate an engagement with 30 days&apos; written notice. Work
                completed to the termination date will be invoiced at the agreed rate. Deposits are
                non-refundable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of liability</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {site.name}&apos;s total liability to the client for any claim arising from a
                project is limited to the total fees paid for that project. We are not liable for
                indirect, consequential, or loss-of-profit damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Governing law</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                These terms are governed by the laws of the Republic of South Africa. Any disputes
                will be resolved in the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                Questions about these terms?{" "}
                <a href={`mailto:${site.email}`} className="text-[var(--color-accent)] underline">
                  {site.email}
                </a>
              </p>
            </section>

          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
