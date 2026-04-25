"use client";

/**
 * PromoBanner — sticky amber strip above the nav.
 * "30 days of free ads" → clicks straight to Book a Call.
 */

import { site } from "@/content/site";
import { track } from "@vercel/analytics";

export function PromoBanner() {
  return (
    <div className="bg-[var(--color-accent)] text-white text-sm font-medium text-center py-2.5 px-4">
      🎁{" "}
      <span className="font-semibold">30 days of free ads</span> — limited spots left.{" "}
      <a
        href={`https://cal.com/${site.calLink}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("cta_click", { location: "promo_banner", label: "30 days free" })}
        className="underline underline-offset-2 font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
      >
        Claim yours →
      </a>
    </div>
  );
}
