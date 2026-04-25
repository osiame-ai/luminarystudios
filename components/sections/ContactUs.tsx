"use client";

/**
 * ContactUs — Luminary Studios
 * Two contact cards (Sales + Support) plus a WhatsApp CTA button.
 */

import { ArrowUpRight, Briefcase, LifeBuoy } from "lucide-react";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

type ContactRoute = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  email: string;
};

const makeRoutes = (): ContactRoute[] => [
  {
    icon: Briefcase,
    label: "Sales",
    description: "New projects, quotes and scoping conversations. Tell us what you need and we'll send a fixed price before we start.",
    email: site.emails.sales,
  },
  {
    icon: LifeBuoy,
    label: "Support",
    description: "Existing client help, change requests or billing questions. We typically respond within 4 business hours.",
    email: site.emails.support,
  },
];

export function ContactUs() {
  const routes = makeRoutes();

  return (
    <section
      id="contact"
      aria-label="Contact us"
      className="section-padding bg-[var(--color-base)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 lg:mb-16 text-center">
          <p className="text-sm font-medium text-[var(--color-text-muted)] tracking-wide uppercase mb-3">
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] mb-5">
            Talk to the right person.
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
            Pick the inbox that fits your question and your email lands in front of
            the person who can actually help.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {routes.map(({ icon: Icon, label, description, email }) => (
            <a
              key={label}
              href={`mailto:${email}`}
              onClick={() => track("contact_click", { label })}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 min-h-[220px] transition-all duration-200
                hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_0_0_3px_var(--color-accent-glow),0_4px_20px_rgba(0,0,0,0.06)]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              <div>
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-accent-glow)] text-[var(--color-accent)] mb-5 transition-transform duration-200 group-hover:scale-110">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  {label}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-accent)] truncate">
                  {email}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="flex justify-center">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("contact_click", { label: "whatsapp" })}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] active:scale-95 transition-all duration-200 shadow-lg shadow-[#25D366]/25"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
