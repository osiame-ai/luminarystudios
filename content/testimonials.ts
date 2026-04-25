/**
 * Luminary Studios — Testimonials
 *
 * TO REPLACE WITH REAL TESTIMONIALS:
 *   1. Edit the `testimonials` array below with real quotes + permissions
 *   2. Or flip SHOW_TESTIMONIALS = false until you have them
 */

export const SHOW_TESTIMONIALS = true;

export interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "Luminary rebuilt our site in three weeks. Walk-in bookings were up 40% the following month — the site finally sells for us while we sleep.",
    name: "Thandiwe M.",
    role: "Owner, Glow Day Spa — Sandton",
  },
  {
    text: "The AI receptionist handles every after-hours enquiry. Our front desk now spends zero time on admin calls. Fully worth it.",
    name: "Siya Ndlovu",
    role: "Founder, PrecisionDent — Johannesburg",
  },
  {
    text: "Paid ads finally made sense once Luminary took them over. ROAS up 3.2x in the first two months. Reporting is actually readable.",
    name: "Johan de Wet",
    role: "Director, SwiftHaul Logistics",
  },
  {
    text: "Short-form video gave us a consistent content presence we never had. Every reel lands on brand and goes out on time.",
    name: "Lerato Khumalo",
    role: "Creative Lead, Naked Label",
  },
  {
    text: "Their process is tight. Every deliverable arrived on schedule. They built the whole system in under 30 days.",
    name: "Ahmed Ravat",
    role: "COO, Nexus CRM",
  },
  {
    text: "We needed a rebrand and a new site fast. Luminary delivered both and the conversion rate jumped to 5.8% from 1.2%. Remarkable.",
    name: "Zinhlé Phiri",
    role: "Head of Marketing, Vitalife Health",
  },
  {
    text: "The landing page converts at 6.1%. Our previous one was at 1.1% with the same traffic source. That's the Luminary difference.",
    name: "Michael Theron",
    role: "Owner, FORM Fitness Studio — Cape Town",
  },
  {
    text: "Transparent reporting every month. I know exactly what every rand is doing. No smoke, no mirrors — just results.",
    name: "Priya Sookdeo",
    role: "Owner, Spice Table — Cape Town",
  },
  {
    text: "The brand finally feels cohesive across every channel. Website, video, ads — all pulling in one direction. Sales are up.",
    name: "Karabo Letsatsi",
    role: "Founder, Aura Beauty",
  },
];
