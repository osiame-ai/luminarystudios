"use client";

/**
 * ContactForm — Luminary Studios
 * Spec §7: Zod client validation, honeypot, inline success/error.
 * Pre-fills service via prop (for service detail pages).
 */

import { useState, useId } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

// ── Zod schema (shared with server route) ───────────────────
export const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  email:   z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  service: z.string().optional(),
  phone:   z.string().optional(),   // booking form
  subject: z.string().optional(),   // booking form subject override
  website: z.string().max(0, "Bot detected.").optional(), // honeypot — must be empty if present
});

export type ContactFormData = z.infer<typeof contactSchema>;

type FormState = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  service?: string;
  className?: string;
}

// ── Field component ─────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[var(--color-text-primary)]"
      >
        {label}
        {required && <span className="text-[var(--color-accent)] ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow duration-150";

// ── Main component ──────────────────────────────────────────
export function ContactForm({ service, className }: ContactFormProps) {
  const uid = useId();
  const [state, setState]   = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<Omit<ContactFormData, "website">>({
    name:    "",
    company: "",
    email:   "",
    message: "",
    service: service ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    setErrors({});

    const formEl  = e.currentTarget;
    const rawData = {
      ...formData,
      website: (formEl.elements.namedItem("website") as HTMLInputElement)?.value ?? "",
    };

    // Client-side validation
    const result = contactSchema.safeParse(rawData);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong.");
      }

      setState("success");
      track("form_submit", { service: service ?? "general" });
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }
      setState("error");
    }
  };

  // Success state
  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "rounded-xl border border-green-200 bg-[var(--color-success-bg)] px-6 py-8 text-center",
          className
        )}
      >
        <div className="text-2xl mb-2" aria-hidden="true">✓</div>
        <h3 className="text-base font-semibold text-[var(--color-success)] mb-1">
          Message sent!
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-5", className)}
      aria-label="Contact form"
    >
      {/* Honeypot — visually hidden from humans, filled by bots */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, overflow: "hidden" }}
      >
        <label htmlFor={`${uid}-website`}>Leave this blank</label>
        <input
          id={`${uid}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Hidden service field */}
      {service && (
        <input type="hidden" name="service" value={service} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id={`${uid}-name`} label="Your name" required error={errors.name}>
          <input
            id={`${uid}-name`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Sipho Dlamini"
            required
            autoComplete="name"
            className={cn(inputClass, errors.name && "border-[var(--color-error)]")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          />
        </Field>

        <Field id={`${uid}-company`} label="Business name">
          <input
            id={`${uid}-company`}
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Dlamini & Co."
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
      </div>

      <Field id={`${uid}-email`} label="Email address" required error={errors.email}>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="sipho@example.co.za"
          required
          autoComplete="email"
          className={cn(inputClass, errors.email && "border-[var(--color-error)]")}
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field id={`${uid}-message`} label="What do you need?" required error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what's going on and what you're trying to achieve..."
          required
          rows={5}
          className={cn(inputClass, "resize-y min-h-[120px]", errors.message && "border-[var(--color-error)]")}
          aria-invalid={!!errors.message}
        />
      </Field>

      {/* Server error */}
      {state === "error" && (
        <p role="alert" className="text-sm text-[var(--color-error)] bg-[var(--color-error-bg)] rounded-lg px-4 py-3">
          Something went wrong — please try again or email us directly.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={state === "submitting"}
        className="self-start"
      >
        {state === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
