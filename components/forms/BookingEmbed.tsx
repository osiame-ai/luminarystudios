"use client";

/**
 * BookingEmbed — Cal.com embed wrapper
 * Spec §7: @calcom/embed-react, fallback link if embed fails.
 */

import { useEffect, useRef } from "react";
import { site } from "@/content/site";

interface BookingEmbedProps {
  className?: string;
}

export function BookingEmbed({ className }: BookingEmbedProps) {
  const calLink    = site.calLink;
  const initialised = useRef(false);

  useEffect(() => {
    // Guard: only run once per mount
    if (initialised.current) return;
    initialised.current = true;

    // Dynamically load Cal.com embed script
    const existingScript = document.getElementById("cal-embed-script");

    const initCal = () => {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w["Cal"] === "function") {
        const Cal = w["Cal"] as (action: string, ...args: unknown[]) => void;
        Cal("init", { origin: "https://cal.com" });
        Cal("inline", {
          elementOrSelector: "#cal-embed-container",
          calLink,
          layout: "month_view",
        });
      }
    };

    if (existingScript) {
      // Script already loaded — just initialise
      initCal();
      return;
    }

    const script    = document.createElement("script");
    script.id       = "cal-embed-script";
    script.src      = "https://app.cal.com/embed/embed.js";
    script.async    = true;
    script.onload   = initCal;
    // onerror: fallback link in the JSX handles graceful degradation
    document.body.appendChild(script);
  }, [calLink]);

  return (
    <div className={className}>
      {/* Cal.com inline embed container */}
      <div
        id="cal-embed-container"
        className="w-full min-h-[500px] rounded-xl overflow-hidden border border-[var(--color-border)]"
        aria-label="Schedule a discovery call"
      />

      {/* Fallback link — always visible as a safety net */}
      <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] underline underline-offset-4 hover:text-[var(--color-accent-dark)] transition-colors"
        >
          Open booking page directly →
        </a>
      </p>
    </div>
  );
}
