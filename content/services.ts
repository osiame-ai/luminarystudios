/**
 * Luminary Studios — Service content
 *
 * To add a new service: add an entry to this array.
 * To update pricing: change the `pricing` field.
 * To add portfolio items: add to the `portfolio` array and set `portfolioVisible: true`.
 *
 * Slugs must be URL-safe (lowercase, hyphens only).
 */

export interface PortfolioItem {
  title: string;
  client: string;       // Use "Undisclosed" if anonymised
  problem: string;      // One sentence
  outcome: string;      // One sentence
  imageUrl?: string;    // Path in /public or external URL
  videoUrl?: string;    // Embed URL
}

export interface ServiceData {
  slug:             string;
  title:            string;
  shortDescription: string;   // 2 lines, shown on home grid card
  subheading:       string;   // Shown on service detail page
  overview:         string;   // 1-2 sentence premium overview (shown on hover)
  image:            string;   // Tile image URL (Unsplash or /public path)
  isNew?:           boolean;  // Show the "NEW" pill on the home card
  features:         string[]; // 4–6 bullets
  pricing:          string;   // e.g. "from R 8,500" or "Custom quote"
  pricingNote:      string;   // Shown below pricing badge on detail page
  portfolio:        PortfolioItem[];
  portfolioVisible: boolean;  // Set true only when real work is ready
  metaDescription:  string;   // For SEO
}

export const services: ServiceData[] = [
  {
    slug: "websites",
    title: "Websites",
    shortDescription:
      "Sites built to turn visitors into paying clients.",
    subheading:
      "Most agency websites look good and do nothing. We build sites where every section earns its place.",
    overview:
      "Conversion-first design, engineered for speed and search. Every block has a job: move the visitor one step closer to booking.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Custom design — no templates, no shared blocks",
      "Mobile-first, Lighthouse-optimised build",
      "On-page SEO: structured data, metadata, sitemap",
      "Contact forms with real email delivery",
      "Integrated booking or enquiry flow",
      "2-3 week delivery from signed brief to live site",
    ],
    pricing: "Book a Free Call",
    pricingNote:
      "Every site is scoped individually. Tell us what you need — we'll give you a fixed price before we start, with no surprise invoices.",
    portfolio: [],
    portfolioVisible: false,
    metaDescription:
      "Luminary Studios builds conversion-focused websites for South African SMBs. Fast, SEO-optimised, mobile-first. Based in Johannesburg.",
  },
  {
    slug: "video",
    title: "Short-form & video content",
    shortDescription:
      "Scroll-stopping content, posted consistently for you.",
    subheading:
      "Short-form content is the fastest way to build trust with a cold audience. We handle editing, pacing, captions, and distribution strategy.",
    overview:
      "High-volume short-form edits, branded and consistent. We handle the calendar, the cuts, and the captions — you show up, we publish.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Short-form edits for Instagram Reels, TikTok, and YouTube Shorts",
      "Captions, motion graphics, and sound design included",
      "Monthly content calendar and posting schedule",
      "Brand consistency across every clip",
      "Turnaround: 48–72 hours per video on retainer",
    ],
    pricing: "Book a Free Call",
    pricingNote:
      "Video work runs on a monthly retainer. We'll scope the volume and deliverables that match your output goals.",
    portfolio: [],
    portfolioVisible: false,
    metaDescription:
      "Short-form video editing and content production for South African brands. Instagram Reels, TikTok, YouTube Shorts.",
  },
  {
    slug: "ads",
    title: "Paid ads that pay back",
    shortDescription:
      "Ads managed to return more than they cost.",
    subheading:
      "Ads only work when the targeting, creative, and landing page are aligned. We manage all three.",
    overview:
      "Targeting, creative, and landing page — built as one system. Reported monthly in plain English, so you know exactly what every rand is doing.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Meta Ads (Facebook & Instagram) and Google Ads management",
      "Audience research and campaign strategy",
      "Ad creative: copy and visual assets included",
      "Landing page optimisation for ad traffic",
      "Monthly reporting in plain English — no jargon",
      "Minimum 90-day engagement to see compounding results",
    ],
    pricing: "Book a Free Call",
    pricingNote:
      "Ad management is a monthly retainer. Ad spend budget is separate and stays in your account — we never touch your billing.",
    portfolio: [],
    portfolioVisible: false,
    metaDescription:
      "Meta Ads and Google Ads management for South African businesses. Strategy, creative, and reporting included.",
  },
  {
    slug: "ai-receptionists",
    title: "AI receptionists",
    shortDescription:
      "24/7 AI that books leads while you sleep.",
    subheading:
      "Your business gets enquiries at midnight. Your AI receptionist handles them, qualifies the lead, and books the appointment — while you sleep.",
    overview:
      "Voice + chat agents trained on your business. Qualify, book, and hand off to a human when it matters — 24 hours a day, every day.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    isNew: true,
    features: [
      "Voice and chat AI trained on your business, services, and FAQs",
      "Appointment booking integrated with your calendar",
      "Lead qualification: only warm prospects reach you",
      "Handoff to WhatsApp or email when human follow-up is needed",
      "Live in 5–7 business days once we have your call scripts",
      "Full conversation logs and analytics dashboard",
    ],
    pricing: "Book a Free Call",
    pricingNote:
      "AI receptionist setup is a one-time build fee. Ongoing hosting and maintenance is a fixed monthly cost — quoted before we start.",
    portfolio: [],
    portfolioVisible: false,
    metaDescription:
      "AI receptionist and conversational AI for South African SMBs. Capture every lead 24/7, book appointments automatically.",
  },
];

/** Helper: find a service by slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}

/** All valid slugs — used for generateStaticParams */
export function getServiceSlugs(): { slug: string }[] {
  return services.map((s) => ({ slug: s.slug }));
}
