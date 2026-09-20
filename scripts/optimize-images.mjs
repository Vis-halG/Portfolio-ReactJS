/**
 * Generates optimized WebP derivatives for every raster asset the site ships.
 * Idempotent: safe to re-run, and `npm run build` runs it first.
 */
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

let before = 0;
let after = 0;

/** Re-encode one source image to WebP, capped at `width` CSS-agnostic pixels. */
async function webp(src, out, width, quality = 72) {
  const from = path.join(root, src);
  const to = path.join(root, out);
  if (!existsSync(from)) return;

  await mkdir(path.dirname(to), { recursive: true });
  const pipeline = sharp(from).resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality, effort: 6 }).toFile(to);

  const [a, b] = [await stat(from), await stat(to)];
  before += a.size;
  after += b.size;
  console.log(`  ${src.padEnd(44)} ${kb(a.size).padStart(9)} -> ${kb(b.size).padStart(9)}`);
}

/** Same as `webp`, but writes a JPEG (used for the pre-`image-set()` fallback). */
async function jpeg(src, out, width, quality = 72) {
  const from = path.join(root, src);
  const to = path.join(root, out);
  if (!existsSync(from)) return;

  await sharp(from).resize({ width, withoutEnlargement: true }).jpeg({ quality, mozjpeg: true }).toFile(to);
  after += (await stat(to)).size;
  console.log(`  ${src.padEnd(44)} ${"(fallback)".padStart(9)} -> ${kb((await stat(to)).size).padStart(9)}`);
}

console.log("\nPage background (full-bleed, so it only ever needs viewport width):");
await webp("assets-src/backgroundd.jpg", "public/backgroundd.webp", 1600, 50);
await jpeg("assets-src/backgroundd.jpg", "public/backgroundd-fallback.jpg", 1600, 68);

console.log("\nFavicons (were served from a 4.3 MB PNG):");
for (const [out, size] of [["public/favicon-32.png", 32], ["public/favicon-180.png", 180]]) {
  const to = path.join(root, out);
  await sharp(path.join(root, "assets-src/Main-OG.png"))
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(to);
  console.log(`  ${out.padEnd(44)} ${"".padStart(9)}    ${kb((await stat(to)).size).padStart(9)}`);
  after += (await stat(to)).size;
}

console.log("\nNavbar logo (rendered at 100px wide):");
await webp("src/assets/images/Portfolio.png", "src/assets/images/Portfolio.webp", 200, 82);

console.log("\nTech-stack icons (rendered at 80x80):");
for (const f of await readdir(path.join(root, "assets-src/skills"))) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  await webp(`assets-src/skills/${f}`, `public/assets/skills/${f.replace(/\.\w+$/, ".webp")}`, 160, 80);
}

console.log("\nProject screenshots (rendered inside cards):");
for (const f of await readdir(path.join(root, "assets-src/Projects"))) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  await webp(`assets-src/Projects/${f}`, `public/assets/Projects/${f.replace(/\.\w+$/, ".webp")}`, 900, 70);
}

console.log(`\nTotal: ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(1)}% smaller)\n`);
