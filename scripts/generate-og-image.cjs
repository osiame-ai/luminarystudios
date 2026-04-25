/**
 * Generate public/og-image.png — 1200×630 branded social card.
 * Uses sharp to rasterize an SVG composition.
 *
 * Run: node scripts/generate-og-image.js
 */
const sharp = require("sharp");
const path  = require("path");

const W = 1200;
const H = 630;

// Brand colors
const BG      = "#0A0A0B";
const AMBER   = "#E8A043";
const CREAM   = "#F7F6F3";
const MUTED   = "#A1A1AA";

// SVG — dark bg, large amber sun mark on left, wordmark + tagline on right
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- Soft amber glow behind the mark -->
  <circle cx="320" cy="315" r="260" fill="url(#glow)"/>

  <!-- Sun mark — amber circle + 3 rays, centered at (320, 315), r=70 -->
  <g transform="translate(320 315)">
    <circle r="72" fill="${AMBER}"/>
    <!-- Rays -->
    <g stroke="${AMBER}" stroke-width="12" stroke-linecap="round" fill="none">
      <line x1="0" y1="-110" x2="0" y2="-150"/>
      <line x1="95" y1="-55"  x2="130" y2="-75"/>
      <line x1="95" y1="55"   x2="130" y2="75"/>
    </g>
  </g>

  <!-- Wordmark -->
  <text x="500" y="290"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="74"
        font-weight="700"
        fill="${CREAM}"
        letter-spacing="-1">
    Luminary Studios
  </text>

  <!-- Tagline -->
  <text x="500" y="345"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="30"
        font-weight="500"
        fill="${MUTED}">
    Full-Service Creative Media
  </text>

  <!-- Divider bar -->
  <rect x="500" y="385" width="60" height="4" rx="2" fill="${AMBER}"/>

  <!-- Services row -->
  <text x="500" y="435"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="22"
        font-weight="600"
        fill="${CREAM}"
        letter-spacing="0.5">
    Websites · Video · Paid Ads · AI Receptionists
  </text>

  <!-- Domain -->
  <text x="500" y="500"
        font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="20"
        font-weight="500"
        fill="${AMBER}"
        letter-spacing="1"
        text-transform="uppercase">
    luminarystudios.co.za
  </text>

  <!-- Subtle bottom-right corner brand dot -->
  <circle cx="${W - 60}" cy="${H - 60}" r="8" fill="${AMBER}"/>
</svg>
`;

const outPath = path.resolve(__dirname, "..", "public", "og-image.png");

sharp(Buffer.from(svg))
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(outPath)
  .then((info) => {
    console.log(`✓ Generated ${outPath} (${info.width}×${info.height}, ${(info.size / 1024).toFixed(1)} KB)`);
  })
  .catch((err) => {
    console.error("✗ Failed to generate og-image:", err);
    process.exit(1);
  });
