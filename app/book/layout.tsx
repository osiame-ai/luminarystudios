import type { Metadata } from "next";

/**
 * /book is a conversion funnel step — do not index.
 * Keeps the page out of Google/Bing and stops referrer leakage of query params.
 */
export const metadata: Metadata = {
  title: "Book a call",
  description: "Tell us about your business and book a 15-minute discovery call with Luminary Studios.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
