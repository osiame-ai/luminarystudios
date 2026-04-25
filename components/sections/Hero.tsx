import { AnimatedHero } from "@/components/ui/animated-hero";

/**
 * Hero section wrapper.
 * The animated component is client-side (uses useState/useEffect).
 * This server component just renders it.
 */
export function Hero() {
  return <AnimatedHero />;
}
