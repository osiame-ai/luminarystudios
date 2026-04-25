const sharp = require('sharp');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '..', 'public/tools');
const files = ['meta.png', 'vercel.png', 'google-ads.png', 'elevenlabs.png', 'n8n.png'];

async function removeWhiteBg(file) {
  const inputPath = path.join(TOOLS_DIR, file);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  const threshold = 240;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i], g = pixels[i+1], b = pixels[i+2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      pixels[i+3] = 0;
    }
  }

  await sharp(Buffer.from(pixels.buffer), {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).png().toFile(inputPath);

  console.log(`✓ ${file} (${info.width}x${info.height})`);
}

(async () => {
  for (const f of files) {
    await removeWhiteBg(f);
  }
})();
