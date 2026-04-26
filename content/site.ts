/**
 * Luminary Studios — Site-wide constants
 * Fill in all TODO values before going live.
 */

export const site = {
  name: "Luminary Studios",
  tagline: "Full-service creative media.",
  description:
    "Luminary Studios builds websites, video content, paid ads, and AI receptionists for South African SMBs and founders. Based in Johannesburg, working worldwide.",

  // Contact routing — pick the right inbox by function
  emails: {
    general:      "support@luminarystudios.com",     // general enquiries
    sales:        "sales@luminarystudios.co.za",     // new projects, quotes
    support:      "support@luminarystudios.co.za",   // existing client help
    partnerships: "support@luminarystudios.com",     // agency partners, collabs
  },

  // General contact email
  email: "support@luminarystudios.com",
  phone:    "+27 64 682 8198",
  whatsapp: "27646828198",

  location: "Global Creative Agency",

  // Cal.com event link — set in .env as NEXT_PUBLIC_CAL_LINK
  // Format: "<user>/<event-slug>" e.g. "talkto-osiame/15min"
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? "talkto-osiame/15min",

  // All "Book a Call" CTAs route here first (lead capture) then to cal.com
  bookingHref: "/book",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://luminarystudios.co.za",

  // Single source of truth for the Privacy / Terms effective date.
  // Update when policy language actually changes.
  legalEffectiveDate: "24 April 2026",

  social: {
    // TODO: Add handles when available
    instagram: "", // TODO: add handle e.g. "luminarystudios"
    linkedin:  "", // TODO: add handle e.g. "luminary-studios"
    x:         "", // TODO: add handle e.g. "luminarystudios"
    tiktok:    "", // TODO: add handle e.g. "luminarystudios"
    youtube:   "",
  },
} as const;

export type SiteConfig = typeof site;
