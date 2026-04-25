"use client";

/**
 * /book — Luminary Studios lead capture
 * Step 1: Fill in details → Step 2: Verified → Book on cal.com
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertTriangle, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { track } from "@vercel/analytics";

type Step = "form" | "verified" | "error";

interface FormData {
  name:     string;
  email:    string;
  phone:    string;
  business: string;
}

export default function BookPage() {
  const [step,   setStep]   = useState<Step>("form");
  const [data,   setData]   = useState<FormData>({ name: "", email: "", phone: "", business: "" });
  const [busy,   setBusy]   = useState(false);

  const valid = data.name.trim() && data.email.includes("@") && data.phone.trim() && data.business.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    data.name,
          email:   data.email,
          phone:   data.phone,
          subject: `Booking request — ${data.business}`,
          message: `New booking request from ${data.name} (${data.business}).\nPhone: ${data.phone}`,
        }),
      });
      if (!res.ok) throw new Error(`api ${res.status}`);
      track("booking_form_submit", { business: data.business });
      setStep("verified");
    } catch {
      track("booking_form_error", { business: data.business });
      setStep("error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-base)] flex flex-col items-center justify-center px-4 py-16">

      {/* Logo */}
      <Link href="/" className="mb-10" aria-label="Back to home">
        <Image src="/logo-wordmark.svg" alt="Luminary Studios" width={160} height={36} />
      </Link>

      <div className="w-full max-w-md">
        {step === "form" && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">
                Book a discovery call
              </h1>
              <p className="text-[var(--color-text-muted)] text-base">
                15 minutes. No pitch. A clear answer on whether we can help.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 space-y-5"
            >
              {[
                { id: "name",     label: "Your name",      type: "text",  placeholder: "Jane Smith",          key: "name" as const },
                { id: "email",    label: "Email address",  type: "email", placeholder: "jane@yourcompany.com", key: "email" as const },
                { id: "phone",    label: "Phone number",   type: "tel",   placeholder: "+27 60 000 0000",      key: "phone" as const },
                { id: "business", label: "Business name",  type: "text",  placeholder: "Acme Pty Ltd",         key: "business" as const },
              ].map(({ id, label, type, placeholder, key }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-[var(--color-text-primary)] mb-1.5">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={data[key]}
                    onChange={(e) => setData(prev => ({ ...prev, [key]: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
                  />
                </div>
              ))}

              <Button
                type="submit"
                disabled={!valid || busy}
                className="w-full mt-2"
                size="lg"
              >
                {busy ? "Verifying…" : "Verify & Continue"}
                {!busy && <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />}
              </Button>
            </form>

            <p className="text-center text-xs text-[var(--color-text-subtle)] mt-4">
              By continuing you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-[var(--color-text-muted)] transition-colors">privacy policy</Link>.
            </p>
          </>
        )}

        {step === "verified" && (
          // Step 2 — Verified
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            {/* Amber glow */}
            <div
              aria-hidden="true"
              className="mx-auto w-20 h-20 rounded-full mb-6 flex items-center justify-center"
              style={{
                background: "radial-gradient(ellipse at center, rgba(232,160,67,0.2) 0%, transparent 70%)",
              }}
            >
              <CheckCircle className="w-10 h-10 text-[var(--color-accent)]" />
            </div>

            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Verified ✓
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
              You&apos;re all set, {data.name.split(" ")[0]}. Pick a time that works for you and we&apos;ll be there.
            </p>

            <Button asChild size="lg" className="w-full">
              <a
                href={`https://cal.com/${site.calLink}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("cta_click", { location: "book_verified", label: "Book a Call" })}
                className="flex items-center justify-center gap-2"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </Button>

            <p className="mt-5 text-xs text-[var(--color-text-subtle)]">
              <Link href="/" className="hover:text-[var(--color-text-muted)] transition-colors">← Back to home</Link>
            </p>
          </div>
        )}

        {step === "error" && (
          // Step 2b — Error, provide manual fallbacks
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <div
              aria-hidden="true"
              className="mx-auto w-20 h-20 rounded-full mb-6 flex items-center justify-center"
              style={{
                background: "radial-gradient(ellipse at center, rgba(232,160,67,0.15) 0%, transparent 70%)",
              }}
            >
              <AlertTriangle className="w-10 h-10 text-[var(--color-accent)]" />
            </div>

            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Something went wrong
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
              We couldn&apos;t capture your details, but don&apos;t worry — reach us directly and we&apos;ll get you booked in minutes.
            </p>

            <div className="space-y-3">
              <Button asChild size="lg" className="w-full">
                <a
                  href={`mailto:${site.email}?subject=Booking%20request%20%E2%80%94%20${encodeURIComponent(data.business)}&body=${encodeURIComponent(`Hi Luminary Studios,\n\nI'd like to book a call.\n\nName: ${data.name}\nBusiness: ${data.business}\nPhone: ${data.phone}\nEmail: ${data.email}`)}`}
                  className="flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Email us
                </a>
              </Button>

              <Button asChild size="lg" variant="outline" className="w-full">
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to book a call. Name: ${data.name}. Business: ${data.business}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mt-2"
              >
                ← Try the form again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
