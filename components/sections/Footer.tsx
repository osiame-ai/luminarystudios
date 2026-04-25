/**
 * Footer — Luminary Studios
 * 4-column grid: Brand | Navigate | Contact | Social+Legal
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

const year = new Date().getFullYear();

// Inline SVG social icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const navLinks = [
  { label: "Home",          href: "/" },
  { label: "Services",      href: "/#services" },
  { label: "Pricing",       href: "/pricing" },
  { label: "Portfolio",     href: "/portfolio" },
  { label: "How It Works",  href: "/how-it-works" },
  { label: "About",         href: "/about" },
  { label: "Contact",       href: "/#contact" },
  { label: "FAQ",           href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Luminary Studios — home">
              <Image
                src="/logo-wordmark.svg"
                alt="Luminary Studios"
                width={180}
                height={44}
                className="mb-5"
              />
            </Link>
            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
              Global Creative Agency
            </p>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-4">
              Design, content, and automation for brands that want to grow.
            </p>
            {/* Countries */}
            <p className="text-xs text-[var(--color-text-subtle)]">
              Operating globally across every time zone.
            </p>
          </div>

          {/* Col 2 — Navigate */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-widest uppercase mb-4">
              Navigate
            </p>
            <ul className="space-y-3 list-none p-0 m-0">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-widest uppercase mb-4">
              Contact
            </p>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
                >
                  WhatsApp us →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — CTA + Social */}
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-widest uppercase mb-4">
              Get started
            </p>
            <Button asChild className="w-full sm:w-auto mb-6">
              <a
                href={site.bookingHref}
                className="flex items-center gap-1.5"
              >
                Book a Call
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Button>

            {(site.social.instagram || site.social.tiktok || site.social.x) && (
              <>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-widest uppercase mb-3">
                  Follow us
                </p>
                <div className="flex gap-4 mb-6">
                  {site.social.instagram && (
                    <a
                      href={`https://instagram.com/${site.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                  )}
                  {site.social.tiktok && (
                    <a
                      href={`https://tiktok.com/@${site.social.tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <TikTokIcon className="w-5 h-5" />
                    </a>
                  )}
                  {site.social.x && (
                    <a
                      href={`https://x.com/${site.social.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </>
            )}

            {/* Legal */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/privacy" className="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)] transition-colors">Privacy</Link>
              <Link href="/terms" className="text-xs text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-subtle)]">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Websites · Video · Ads · AI Receptionists</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-[var(--color-text-muted)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--color-text-muted)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
