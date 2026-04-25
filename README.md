# Luminary Studios — Agency Website

Full-service creative media agency website. Built with Next.js 16, Tailwind v4, and shadcn/ui.
Light-first design, warm amber accent, fully accessible.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local   # Fill in your values (see below)
npm run dev                         # http://localhost:3000
```

---

## Environment variables

| Variable | Description | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for contact form email delivery | [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Verified "from" address in Resend | Resend → Domains |
| `RESEND_TO_EMAIL` | Your inbox — where form submissions are delivered | Your email |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com event path (e.g. `osiame/discovery`) | Cal.com → Event Types → Share |
| `NEXT_PUBLIC_SITE_URL` | Production URL (no trailing slash) | Your domain |

---

## Editing service content

All service data lives in `content/services.ts`. Each service has:

```ts
{
  slug:             "websites",       // URL: /services/websites
  title:            "...",
  shortDescription: "...",            // 2 lines shown on home grid card
  subheading:       "...",            // Hero on service detail page
  features:         ["...", "..."],   // Bullet list (4–6 items)
  pricing:          "Custom quote",   // Update when pricing is set
  pricingNote:      "...",
  portfolio:        [],               // Add real work here
  portfolioVisible: false,            // Set true when portfolio is ready
  metaDescription:  "...",
}
```

To add a new service: add an entry to the `services` array. The route `/services/[slug]` is generated automatically.

---

## Enabling testimonials

Testimonials are hidden at launch (no fake social proof policy).

**When real testimonials arrive:**

1. Open `content/testimonials.ts`
2. Set `SHOW_TESTIMONIALS = true`
3. Add testimonials to the array:

```ts
{
  name:        "Jane Smith",
  role:        "Founder",
  company:     "Smith & Co",
  quote:       "Luminary Studios built our site in 3 weeks and enquiries doubled.",
  initials:    "JS",
  photoUrl:    "",           // Real photo URL, or leave empty for initials circle
  accentColor: "#E8A043",
}
```

**Rules:**
- Only real testimonials with the person's explicit permission
- No randomuser.me or AI-generated photos — use initials circle instead
- A minimum of 3 is needed for the columns layout to look right

---

## Filling in contact details and social links

Before launch, update `content/site.ts`:

```ts
email:    "hello@luminarystudios.co.za",
phone:    "+27 XX XXX XXXX",
whatsapp: "27XXXXXXXXX",  // digits only, no + or spaces
social: {
  instagram: "luminarystudios",
  linkedin:  "luminary-studios",
  // x, youtube, tiktok as needed
},
```

---

## Adding portfolio work

For each service in `content/services.ts`, add to the `portfolio` array:

```ts
portfolio: [
  {
    title:    "Website for Smith & Co",
    client:   "Smith & Co",           // or "Undisclosed"
    problem:  "One sentence: what was the challenge.",
    outcome:  "One sentence: what changed after.",
    imageUrl: "/portfolio/smith-co.jpg",  // add image to /public/portfolio/
  },
],
portfolioVisible: true,  // flip this to show the section
```

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import repository
3. Add all environment variables from `.env.local.example`
4. Deploy → Vercel sets up CI/CD automatically

Or via CLI:

```bash
npx vercel --prod
```

**Domain:** Add your custom domain in Vercel → Project Settings → Domains.

---

## Project structure

```
app/                    Next.js App Router pages
  layout.tsx            Root layout (fonts, metadata, Analytics)
  page.tsx              Home — all 10 sections
  services/[slug]/      Dynamic service detail pages
  api/contact/          Contact form API route (Resend)
  privacy/              POPIA-aligned privacy policy
  terms/                Terms of service
  sitemap.ts            Auto-generated sitemap.xml
  robots.ts             robots.txt
components/
  ui/                   Reusable UI components
  sections/             Page sections (Nav, Footer, Hero, etc.)
  forms/                Form components (BookingEmbed)
content/
  services.ts           Service data — edit here for content changes
  testimonials.ts       Testimonials (hidden until ready)
  faqs.ts               FAQ content
  site.ts               Global config (contact, social, copy)
lib/
  utils.ts              cn() utility
  email.ts              Resend email HTML template
```

---

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI components:** shadcn/ui
- **Animation:** Framer Motion
- **Email:** Resend
- **Booking:** Cal.com
- **Analytics:** Vercel Analytics
- **Fonts:** Instrument Serif (display) + Geist (body/UI) + Geist Mono
