/**
 * Cloudinary delivers the hero art, but the raw asset is a 4.4 MB PNG.
 * Inserting a transform segment makes it negotiate format (AVIF/WebP) and
 * quality per request, which takes the same image to roughly 70-100 KB.
 */
const WIDTHS = [600, 900, 1200];

/** Inserts `f_auto,q_auto,w_<width>` into a Cloudinary delivery URL. */
export function cld(url, width) {
  return url.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width}/`);
}

/** Builds a `srcset` covering the widths this layout can actually request. */
export function cldSrcSet(url) {
  return WIDTHS.map((w) => `${cld(url, w)} ${w}w`).join(", ");
}
