import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { site } from "@/content/site";
import { BackToTop } from "@/components/ui/BackToTop";
import { ChatBot } from "@/components/ui/ChatBot";

// ── Fonts ────────────────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// ── Site-wide Metadata ───────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Luminary Studios — Full-Service Creative Media",
    template: "%s | Luminary Studios",
  },
  description: site.description,
  keywords: [
    "creative agency Johannesburg",
    "website design South Africa",
    "video editing agency",
    "paid ads South Africa",
    "AI receptionist",
    "digital marketing Johannesburg",
    "SMB marketing South Africa",
  ],
  authors: [{ name: "Luminary Studios" }],
  creator: "Luminary Studios",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: site.siteUrl,
    siteName: site.name,
    title: "Luminary Studios — Full-Service Creative Media",
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luminary Studios — Full-Service Creative Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminary Studios — Full-Service Creative Media",
    description: site.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ── Root Layout ──────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-ZA"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${instrumentSerif.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ChatBot />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
