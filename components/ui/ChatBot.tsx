"use client";

/**
 * ChatBot — Lumi, Luminary's AI assistant.
 * Faceless. Scripted keyword-matched responses. Anything it can't answer
 * is escalated to the general support inbox.
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Send } from "lucide-react";
import { site } from "@/content/site";

interface Message {
  role: "bot" | "user";
  text: string;
  quickReplies?: string[];
}

const SUPPORT_EMAIL = site.email; // support@luminarystudios.com

const QUICK_REPLIES_GREETING = [
  "What services do you offer?",
  "How much do you charge?",
  "See portfolio",
];

const FALLBACK_TEXT =
  `I don't have an answer for that one. Drop us a line at ${SUPPORT_EMAIL} and our team will come back to you within a working day.`;

// ── Knowledge base (keyword → answer) ───────────────────────
function getBotReply(input: string): Message {
  const q = input.toLowerCase().trim();

  // Portfolio / case studies / examples
  if (/(portfolio|case stud|example|work|project|previous|past|sample|reference|show me)/.test(q)) {
    return {
      role: "bot",
      text: "A few recent wins:\n• Glow Day Spa — bookings up 40% in 60 days\n• PrecisionDent — zero missed after-hours leads (AI receptionist)\n• Aura Beauty — 3.2x ROAS in 90 days\n• Vitalife Health — 3.1M organic views in 90 days",
      quickReplies: ["See full portfolio", "Pricing"],
    };
  }

  // Process / how
  if (/(how do you work|process|step|how it works|workflow|approach|stages)/.test(q)) {
    return {
      role: "bot",
      text: "Five steps:\n1. Discovery call (15 min, free)\n2. Fixed-price brief within 24 hours\n3. Build + one structured review round\n4. Launch — you get all source files\n5. Optional retainer for content, ads or AI",
      quickReplies: ["See full process", "Pricing"],
    };
  }

  // Timeline / delivery
  if (/(how long|delivery|turnaround|deadline|ready|live|launch|timeframe|fast|quick)/.test(q)) {
    return {
      role: "bot",
      text: "Typical timelines:\n• Websites — 2 to 3 weeks\n• AI Receptionists — 5 to 7 business days\n• Videos — 48 to 72 hours per edit\n• Ads — campaigns live within 7 days of brief approval",
      quickReplies: ["Pricing", "See portfolio"],
    };
  }

  // Pricing
  if (/(price|pricing|cost|how much|charge|rate|fee|quote|budget|afford|expensive|cheap)/.test(q)) {
    return {
      role: "bot",
      text: "Pricing starts from R 4k depending on the service and scope. Every project is fixed-price — scoped and agreed before we start, no surprise invoices.\n\nFor an exact quote, check the pricing page or email us at " + SUPPORT_EMAIL + " with a brief on what you need.",
      quickReplies: ["See full pricing", "What services do you offer?"],
    };
  }

  // Services general
  if (/(service|offer|what do you do|help with|provide|do you|can you)/.test(q)) {
    return {
      role: "bot",
      text: "Four services:\n• Websites that convert\n• Short-form Video Content\n• Managed Paid Ads (Meta + Google)\n• AI Receptionists that book leads 24/7\n\nMost clients combine 2 or 3 into one system.",
      quickReplies: ["Tell me about websites", "Tell me about AI receptionists", "See portfolio"],
    };
  }

  // Websites
  if (/(website|site|web|landing page|homepage|design)/.test(q)) {
    return {
      role: "bot",
      text: "Custom websites, no templates. 2 to 3 week delivery. Mobile-first, Lighthouse-optimised, SEO baked in, real email delivery on forms. You own every file at handover.\n\nPricing depends on scope — get a quote on the pricing page.",
      quickReplies: ["See full pricing", "See portfolio"],
    };
  }

  // AI Receptionist
  if (/(ai|receptionist|chatbot|chat bot|\bbot\b|voice|call answering|automation|assistant)/.test(q)) {
    return {
      role: "bot",
      text: "AI Receptionists handle calls and chats 24/7, book appointments into your calendar, qualify leads, and hand off to WhatsApp when needed. Live in 5 to 7 business days. This chat is a small taste of what we build.\n\nGet a quote on the pricing page.",
      quickReplies: ["See full pricing", "See portfolio"],
    };
  }

  // Video
  if (/(video|content|reel|tiktok|short-form|editing|youtube|shorts|clips)/.test(q)) {
    return {
      role: "bot",
      text: "Short-form video retainers — Reels, TikToks, Shorts. Captions, motion graphics, sound design. 48 to 72 hour turnaround. Monthly content calendar included.\n\nGet a quote on the pricing page.",
      quickReplies: ["See full pricing", "See portfolio"],
    };
  }

  // Ads
  if (/(\bad\b|ads|meta|google ads|facebook|instagram ads|marketing|campaign|roas|paid)/.test(q)) {
    return {
      role: "bot",
      text: "We manage Meta and Google Ads end-to-end — strategy, creative, landing page optimisation, and monthly plain-English reporting. Ad spend stays in your account. First 30 days of management are free for new clients.\n\nGet a quote on the pricing page.",
      quickReplies: ["See full pricing", "See portfolio"],
    };
  }

  // Industries / fit / who
  if (/(industry|niche|who.*(work|for)|small business|smb|startup|agency|restaurant|salon|dentist|clinic|gym|fitness|logistics|ecommerce|retail|coach|consult)/.test(q)) {
    return {
      role: "bot",
      text: "We work with service-based SMBs and founders — salons, medical practices, gyms, logistics, wellness, professional services, coaches. If you need leads, bookings or brand growth, we're a fit.",
      quickReplies: ["See portfolio", "Pricing"],
    };
  }

  // Guarantee / ownership / lock-in
  if (/(guarantee|refund|risk|contract|lock|cancel|own|ownership|transfer|leave|exit)/.test(q)) {
    return {
      role: "bot",
      text: "No lock-ins. Monthly retainers are month-to-month. You own every file, domain, ad account and asset. Cancel anytime, walk away with everything.",
      quickReplies: ["See portfolio", "Pricing"],
    };
  }

  // About / team (kept faceless)
  if (/(about|who.*(you|are|run)|team|founder|company|agency|studio)/.test(q)) {
    return {
      role: "bot",
      text: "Luminary Studios is a Johannesburg-based creative studio working with clients worldwide. 120+ brands served, 94% retention, average 5x revenue growth. Small senior team, focused work.",
      quickReplies: ["Read about page", "See portfolio"],
    };
  }

  // Testimonials / reviews
  if (/(testimonial|review|rating|feedback|happy|clients say|reputation)/.test(q)) {
    return {
      role: "bot",
      text: "94% retention across 120+ brands. Named case studies with real numbers live on the portfolio page.",
      quickReplies: ["See portfolio"],
    };
  }

  // Start date / availability
  if (/(start|when can|available|slot|next|capacity|onboard)/.test(q)) {
    return {
      role: "bot",
      text: "We usually have 1 to 2 new client slots per month. A start date is typically set within 2 weeks of the first call.",
      quickReplies: ["Pricing", "See portfolio"],
    };
  }

  // Location / timezone / international
  if (/(where|location|based|country|johannesburg|south africa|timezone|remote|international|abroad|overseas)/.test(q)) {
    return {
      role: "bot",
      text: "Based in Johannesburg, South Africa (SAST / UTC+2). Working with clients worldwide. Pricing in ZAR with USD or GBP billing available for international clients.",
      quickReplies: ["Pricing", "What services do you offer?"],
    };
  }

  // Payment / invoicing / currency
  if (/(payment|invoice|pay|deposit|instalment|installment|currency|usd|gbp|zar|dollar|pound|rand|vat|tax)/.test(q)) {
    return {
      role: "bot",
      text: "Invoicing in ZAR, USD or GBP. 50% deposit to begin, balance on delivery for projects. Retainers are billed monthly in advance. All prices exclude VAT.",
      quickReplies: ["Pricing"],
    };
  }

  // Tools / stack / tech
  if (/(tool|tech|stack|framework|platform|built with|use|cms|wordpress|webflow|framer|figma)/.test(q)) {
    return {
      role: "bot",
      text: "We work with the tools that fit the job — Figma for design, Next.js and modern frameworks for sites, Meta and Google Ads for campaigns, OpenAI, Anthropic and ElevenLabs for AI, Vercel for hosting. No vendor lock-in.",
      quickReplies: ["See portfolio", "Pricing"],
    };
  }

  // SEO
  if (/(seo|search engine|google ranking|organic|traffic)/.test(q)) {
    return {
      role: "bot",
      text: "On-page SEO is baked into every site we build: structured data, metadata, sitemap, Core Web Vitals. Deeper SEO audits and Search Console reporting are available as an add-on.",
      quickReplies: ["Pricing", "See portfolio"],
    };
  }

  // Hosting / maintenance / support
  if (/(hosting|maintain|maintenance|support|after launch|updates|bugs|downtime|uptime)/.test(q)) {
    return {
      role: "bot",
      text: "Sites ship on Vercel — fast, reliable, global CDN. 30-day post-launch support is included. A standalone maintenance plan is available for ongoing updates and small changes.",
      quickReplies: ["Pricing"],
    };
  }

  // Revisions / changes
  if (/(revision|change|edit|feedback round|amend|tweak)/.test(q)) {
    return {
      role: "bot",
      text: "One structured review round is included mid-build plus a final review before launch. Additional changes after launch are billed at a flat hourly rate or rolled into a retainer.",
      quickReplies: ["Pricing", "How do you work?"],
    };
  }

  // Promo / free offer
  if (/(free|promo|offer|discount|deal|bonus|trial|intro)/.test(q)) {
    return {
      role: "bot",
      text: "New clients get their first 30 days of ad management on us — zero management fee. Ad spend remains yours to control. No catch, no lock-in.",
      quickReplies: ["Ads pricing", "See portfolio"],
    };
  }

  // Contact / email / support
  if (/(email|contact|reach|support|help|question|queries)/.test(q)) {
    return {
      role: "bot",
      text: `For anything I can't answer, our team is at ${SUPPORT_EMAIL}. We respond within one working day.`,
      quickReplies: ["What services do you offer?", "Pricing"],
    };
  }

  // Greetings
  if (/^(hi|hello|hey|yo|sup|howzit|good|morning|afternoon|evening)/.test(q)) {
    return {
      role: "bot",
      text: "Hi there. I can help with services, pricing, portfolio or process. What are you looking into?",
      quickReplies: QUICK_REPLIES_GREETING,
    };
  }

  if (/(thank|thanks|appreciate|cheers)/.test(q)) {
    return {
      role: "bot",
      text: "Anytime. Anything else you'd like to know?",
      quickReplies: QUICK_REPLIES_GREETING,
    };
  }

  // Unknown → escalate to support email
  return {
    role: "bot",
    text: FALLBACK_TEXT,
    quickReplies: ["What services do you offer?", "Pricing", "See portfolio"],
  };
}

export function ChatBot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [tooltipReady, setTooltipReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi there — I'm Lumi, Luminary's assistant. I can answer questions about our services, pricing, portfolio and process. What can I help with?",
      quickReplies: QUICK_REPLIES_GREETING,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opening
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  // Tooltip appears after a short delay every time the chat is closed.
  // Reset is done in the toggle handler to keep this effect side-effect-free in body.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setTooltipReady(true), 1500);
    return () => clearTimeout(t);
  }, [open]);

  const toggleOpen = () => {
    setTooltipReady(false);
    setOpen((v) => !v);
  };

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Quick-reply nav shortcuts
    const navMap: Array<[RegExp, string]> = [
      [/pricing/i,                                                   "/pricing"],
      [/^(see|view)?\s*(full\s*)?portfolio$|^see examples$/i,        "/portfolio"],
      [/^(see|view)?\s*(full\s*)?process$|^see how it works$|^how do you work\??$/i, "/how-it-works"],
      [/^read (full\s*)?about( page)?$|^about (page|us)$/i,          "/about"],
      [/^tell me about websites$/i,                                  "/services/websites"],
      [/^tell me about ai receptionists$/i,                          "/services/ai-receptionists"],
    ];
    for (const [pattern, dest] of navMap) {
      if (pattern.test(trimmed)) {
        router.push(dest);
        return;
      }
    }

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed);
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Tooltip — always visible when chat is closed */}
      <div
        aria-hidden="true"
        className={`
          fixed bottom-8 right-24 z-40 flex items-center gap-2 pointer-events-none
          transition-all duration-500
          ${!open && tooltipReady ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
        `}
      >
        <div className="relative px-4 py-2.5 rounded-xl bg-[var(--color-text-primary)] text-white text-sm font-medium shadow-[0_8px_24px_rgba(15,15,15,0.2)] whitespace-nowrap">
          Chat with our AI ✦
          {/* Arrow tip pointing right toward the bubble */}
          <span
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rotate-45 bg-[var(--color-text-primary)]"
          />
        </div>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-[var(--color-accent)] text-white
          flex items-center justify-center
          shadow-[0_8px_28px_rgba(232,160,67,0.4)]
          hover:scale-110 active:scale-95
          transition-all duration-300 ease-out
        `}
      >
        {open ? (
          <X className="w-6 h-6" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-6 h-6" strokeWidth={2} />
        )}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--color-accent)] border-2 border-[var(--color-base)] animate-pulse"
          />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Lumi"
          className={`
            fixed bottom-24 right-6 z-50
            w-[calc(100vw-3rem)] sm:w-96 h-[560px] max-h-[calc(100vh-8rem)]
            rounded-2xl overflow-hidden
            bg-[var(--color-surface)] border border-[var(--color-border)]
            shadow-[0_20px_60px_rgba(15,15,15,0.18)]
            flex flex-col
            animate-in fade-in slide-in-from-bottom-4 duration-300
          `}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-[var(--color-text-primary)] text-white">
            <div className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Luminary Studios" className="w-6 h-6" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10A37F] border-2 border-[var(--color-text-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">Lumi</p>
              <p className="text-[11px] text-white/60 leading-tight">Luminary Studios · AI Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[var(--color-base)]"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.svg" alt="" aria-hidden="true" className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap
                    ${msg.role === "user"
                      ? "bg-[var(--color-accent)] text-white rounded-br-sm"
                      : "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-bl-sm"}
                  `}
                >
                  {msg.text}
                  {msg.role === "bot" && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          type="button"
                          onClick={() => handleSend(reply)}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.svg" alt="" aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-subtle)] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-subtle)] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-subtle)] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex items-center gap-2 px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-subtle)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
