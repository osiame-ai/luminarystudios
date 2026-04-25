/**
 * POST /api/contact — Luminary Studios contact form handler
 * Spec §7: Zod server-validation, honeypot check, Resend delivery.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/components/ui/ContactForm";
import { buildContactEmailHtml, buildContactEmailSubject } from "@/lib/email";
import { site } from "@/content/site";

// Lazy Resend client — instantiated inside the handler so build-time
// evaluation never throws when RESEND_API_KEY is absent.
function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "");
}

// Simple in-memory rate limiter — replace with Redis / Upstash for production
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT_MAX    = 5;   // max submissions
const RATE_LIMIT_WINDOW = 60_000; // per 60 seconds

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const data = rateLimit.get(ip);

  if (!data || now > data.reset) {
    rateLimit.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (data.count >= RATE_LIMIT_MAX) return false;

  data.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // ── Rate limit ───────────────────────────────────────────
  // Prefer Vercel-injected headers; fall back to X-Forwarded-For.
  // Note: X-Forwarded-For is spoofable — for serious abuse control move this
  // to Upstash Redis keyed on a host-scoped identifier.
  const ip =
    req.headers.get("x-real-ip")?.trim() ??
    req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  // ── Parse body ───────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // ── Server-side validation ───────────────────────────────
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, company, email, message, service, phone, subject, website } = result.data;

  // ── Honeypot check ───────────────────────────────────────
  if (website && website.length > 0) {
    // Silently accept (don't tell bots they were caught)
    return NextResponse.json({ ok: true });
  }

  // ── Send email via Resend ────────────────────────────────
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@luminarystudios.co.za";
  const toEmail   = process.env.RESEND_TO_EMAIL   ?? site.emails.sales;

  try {
    const resend = getResend();
    await resend.emails.send({
      from:     `Luminary Studios <${fromEmail}>`,
      to:       [toEmail],
      replyTo:  email,
      subject:  buildContactEmailSubject({ name, service, phone, subject }),
      html:     buildContactEmailHtml({ name, company, email, message, service, phone }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
