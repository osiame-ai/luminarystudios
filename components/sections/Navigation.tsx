"use client";

/**
 * Navigation — Luminary Studios
 * Apple liquid-glass pill: detaches from edges and rounds on scroll.
 * Links: Home | Services (dropdown) | About | Contact
 * Right: Book a Call (amber)
 * Mobile: hamburger → full-screen overlay with phone number
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

const SERVICES_LINKS = [
  { label: "Websites",         href: "/services/websites" },
  { label: "Video Content",    href: "/services/video" },
  { label: "Paid Ads",         href: "/services/ads" },
  { label: "AI Receptionists", href: "/services/ai-receptionists" },
];

export function Navigation() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const overlayRef                    = useRef<HTMLDivElement>(null);
  const menuButtonRef                 = useRef<HTMLButtonElement>(null);
  const servicesRef                   = useRef<HTMLLIElement | null>(null);

  // Increase glass blur on scroll + pill effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close services dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close overlay on Escape + restore focus
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setTimeout(() => menuButtonRef.current?.focus(), 10);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen && overlayRef.current) {
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [menuOpen]);

  const handleBookCall = (location: string) => {
    track("cta_click", { location, label: "Book a Call" });
    if (menuOpen) closeMenu();
  };

  return (
    <>
      {/* ── Sticky wrapper ────────────────────────────────── */}
      <header className="sticky top-0 z-50">
        {/* On scroll: shrink margins, add rounded pill */}
        <div
          className={cn(
            "transition-all duration-300",
            scrolled
              ? "mx-4 lg:mx-8 mt-3 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-[var(--color-border-strong)] glass"
              : "bg-[rgba(247,246,243,0.85)] backdrop-blur-sm border-b border-[var(--color-border)]"
          )}
        >
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4"
            aria-label="Main navigation"
          >
            {/* Left — Logo */}
            <Link href="/" aria-label="Luminary Studios — home" className="shrink-0">
              <Image
                src="/logo.svg"
                alt="Luminary Studios"
                width={44}
                height={44}
                priority
                className="block md:hidden"
              />
              <Image
                src="/logo-wordmark.svg"
                alt="Luminary Studios"
                width={192}
                height={44}
                priority
                className="hidden md:block"
              />
            </Link>

            {/* Center — Desktop links */}
            <ul className="hidden lg:flex items-center gap-10 list-none m-0 p-0" role="list">
              <li>
                <Link
                  href="/"
                  className="text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>

              {/* Services dropdown */}
              <li ref={servicesRef} className="relative">
                <button
                  className="flex items-center gap-1 text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", servicesOpen && "rotate-180")} />
                </button>

                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl py-2 z-50">
                    {SERVICES_LINKS.map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-base)] transition-colors"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  About
                </Link>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* Right — CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                onClick={() => handleBookCall("nav")}
                className="shrink-0 hidden sm:inline-flex"
              >
                <a href={site.bookingHref}>
                  Book a Call
                </a>
              </Button>

              <button
                ref={menuButtonRef}
                className="lg:hidden p-2 rounded-lg text-[var(--color-text-primary)] hover:bg-[rgba(15,15,15,0.05)] transition-colors"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile overlay ────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 glass-strong flex flex-col"
        >
          {/* Overlay header */}
          <div className="h-20 flex items-center justify-between px-4 sm:px-6 border-b border-[var(--color-border)]">
            <Link href="/" onClick={closeMenu} aria-label="Luminary Studios — home">
              <Image src="/logo-wordmark.svg" alt="Luminary Studios" width={192} height={44} />
            </Link>
            <button
              className="p-2 rounded-lg text-[var(--color-text-primary)] hover:bg-[rgba(15,15,15,0.05)]"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center items-start px-8 gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "#services" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "#contact" },
              { label: "FAQ", href: "#faq" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="text-3xl font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors py-2"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTAs + phone */}
          <div className="px-8 pb-12 flex flex-col gap-4">
            <Button asChild size="lg" onClick={() => handleBookCall("nav_mobile")}>
              <a
                href={site.bookingHref}
                className="flex items-center justify-center gap-2 w-full"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <p className="text-center text-sm text-[var(--color-text-muted)]">
              Or call us:{" "}
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
              >
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
