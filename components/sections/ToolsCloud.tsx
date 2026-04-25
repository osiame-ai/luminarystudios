/**
 * ToolsCloud — Luminary Studios
 * CSS keyframe marquee. Real PNG logos only — no text labels.
 */

const logos = [
  { name: "Figma",       img: "/tools/figma.png" },
  { name: "OpenAI",      img: "/tools/openai.png" },
  { name: "Anthropic",   img: "/tools/anthropic.jpg" },
  { name: "Google Ads",  img: "/tools/google-ads.png" },
  { name: "Meta",        img: "/tools/meta.png" },
  { name: "Vercel",      img: "/tools/vercel.png" },
  { name: "ElevenLabs",  img: "/tools/elevenlabs.png" },
  { name: "n8n",         img: "/tools/n8n.png" },
];

export function ToolsCloud() {
  return (
    <section aria-label="Tools and platforms" className="pb-10 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-bold tracking-widest text-[var(--color-text-subtle)] uppercase">
          The stack behind the results
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div className="flex gap-12 animate-marquee w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
              title={logo.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.img}
                alt={logo.name}
                className="h-7 w-32 object-contain object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
