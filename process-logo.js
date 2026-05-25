const sharp = require('sharp');
const path = require('path');

const INPUT = '/home/claw/.openclaw/media/inbound/file_26---67df47f5-39de-4324-b501-6f98e1c690c9.jpg';
const OUTPUT = '/home/claw/projects/accretion-site/public/images/logo.webp';
const EDGE_PX = 80; // gradient fade width on edges

async function processLogo() {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Calculate edge fade factor (1.0 = fully opaque, 0.0 = fully transparent)
      const fadeX = Math.min(x / EDGE_PX, (width - 1 - x) / EDGE_PX, 1.0);
      const fadeY = Math.min(y / EDGE_PX, (height - 1 - y) / EDGE_PX, 1.0);
      const edgeFade = Math.min(fadeX, fadeY);
      
      // Luminance-based alpha: dark background → transparent, bright text → opaque
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // Boost: near-black (<0.05) → fully transparent, anything above threshold → visible
      const lumAlpha = Math.min(1, Math.max(0, (lum - 0.03) / 0.15));
      
      // Combine: luminance alpha * edge fade
      const finalAlpha = Math.round(Math.min(lumAlpha * edgeFade, 1.0) * 255);
      
      data[idx + 3] = finalAlpha;
    }
  }

  await sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality: 90, effort: 4 })
    .toFile(OUTPUT);

  const stat = require('fs').statSync(OUTPUT);
  console.log(`✅ Logo saved: ${OUTPUT} (${(stat.size / 1024).toFixed(1)} KB, ${width}x${height})`);
}

processLogo().catch(console.error);
