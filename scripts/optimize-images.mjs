// One-time image optimizer for the Premier Tech Canvas site.
// Converts large PNG/JPG images to WebP where display sizes are small,
// downsizes the site logo (kept as the same path so all references hold),
// and reports kilobyte savings per file.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const KB = (b) => (b / 1024).toFixed(1) + "KB";

function report(srcPath, to) {
  const b = fs.statSync(srcPath).size, a = to.length;
  console.log(`${path.basename(srcPath)}  ${KB(b)} -> ${KB(a)}  (${Math.round((1 - a / b) * 100)}% smaller)`);
}

async function convWebp(src, dst, { width = 800, quality = 80 } = {}) {
  const from = sharp(src);
  const meta = await from.metadata();
  const w = meta.width;
  // only downscale if source is larger than target
  if (meta.format === "webp" && w <= width) return null;
  const out = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, alphaQuality: quality })
    .toBuffer();
  fs.writeFileSync(dst, out);
  report(src, { length: out.length });
  return out.length;
}

async function main() {
  console.log("=== public/award + news -> webp (800w, q80) ===");
  const publicImgs = [
    ["public/award1.jpg"], ["public/award2.png"], ["public/award3.jpg"],
    ["public/award4.jpg"], ["public/news1.png"], ["public/news2.png"], ["public/news3.png"],
  ];
  for (const [src] of publicImgs) {
    const base = src.replace(/\.(png|jpg|jpeg)$/i, "");
    await convWebp(src, `${base}.webp`, { width: 800, quality: 80 });
  }

  console.log("=== src/assets/colleges (oversized 8) -> webp (160w, q85) ===");
  const bigLogos = [
    "plgie.png", "mitcrer.png", "vvp.png", "hncc.png",
    "smsmpitr.png", "msbec.png", "sveri.png", "rit.png",
  ];
  for (const f of bigLogos) {
    const src = `src/assets/colleges/${f}`;
    const base = f.replace(/\.(png|jpg)$/i, "");
    await convWebp(src, `src/assets/colleges/${base}.webp`, { width: 160, quality: 85 });
  }

  console.log("=== public/softtech-logo.png -> resize 512 (kept jpeg-ish, same path) ===");
  // Note: this file is JPEG bytes misnamed .png and is referenced as
  // og:image / apple-touch-icon / icon / nav / footer. Keep the same path
  // (so all 6 references hold) but downsize + re-encode.
  const logoIn = fs.statSync("public/softtech-logo.png").size;
  const logoOut = await sharp("public/softtech-logo.png")
    .resize({ width: 512, withoutEnlargement: true })
    .jpeg({ quality: 88 })
    .toBuffer();
  fs.writeFileSync("public/softtech-logo.png", logoOut);
  console.log(`softtech-logo.png  ${KB(logoIn)} -> ${KB(logoOut.length)}`);

  console.log("Done. Run the reference-update step next.");
}

main().catch((e) => { console.error(e); process.exit(1); });