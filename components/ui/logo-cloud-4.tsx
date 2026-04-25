"use client";

/**
 * LogoCloud — marquee row of tool/partner logos with edge fades.
 * Wraps InfiniteSlider + ProgressiveBlur. Accepts children directly
 * so callers can pass either <Image> tags or inline SVGs.
 */

import { type ReactNode } from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface LogoCloudProps {
  children: ReactNode;
  heading?: string;
}

export function LogoCloud({
  children,
  heading = "Built on the tools your business already trusts",
}: LogoCloudProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-sm font-medium tracking-wider uppercase text-[var(--color-text-muted)] mb-10">
        {heading}
      </p>

      <div className="relative overflow-hidden">
        <InfiniteSlider gap={48} speed={40} speedOnHover={15}>
          {children}
        </InfiniteSlider>

        <ProgressiveBlur
          direction="left"
          blurIntensity={1}
          className="left-0 top-0 h-full w-24"
        />
        <ProgressiveBlur
          direction="right"
          blurIntensity={1}
          className="right-0 top-0 h-full w-24"
        />
      </div>
    </div>
  );
}
