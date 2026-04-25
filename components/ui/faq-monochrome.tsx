"use client";

/**
 * FaqMonochrome — Luminary Studios
 * Spec §4.8: Accordion, no Day/Night toggle, uses site CSS vars.
 * 4 questions from content/faqs.ts. Fully typed TypeScript.
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs, type FaqItem } from "@/content/faqs";
import { cn } from "@/lib/utils";

interface FaqItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FaqAccordionItem({ item, isOpen, onToggle, index }: FaqItemProps) {
  const headingId = `faq-heading-${index}`;
  const panelId   = `faq-panel-${index}`;

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-200",
        isOpen
          ? "border-[var(--color-accent)] shadow-[0_0_0_3px_var(--color-accent-glow)]"
          : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
      )}
    >
      {/* Question / trigger */}
      <button
        id={headingId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-xl"
      >
        <span className="text-base font-semibold text-[var(--color-text-primary)]">
          {item.question}
        </span>
        <span className="shrink-0 text-[var(--color-accent)]" aria-hidden="true">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────
export function FaqMonochrome() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <dl
      className="space-y-3"
      aria-label="Frequently asked questions"
    >
      {faqs.map((item, i) => (
        <FaqAccordionItem
          key={item.question}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </dl>
  );
}
