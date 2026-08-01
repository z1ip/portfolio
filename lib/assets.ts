import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Returns a public URL for an asset if the file actually exists in /public,
 * otherwise null. Lets server components render a real <Image> once you drop
 * a file in, and fall back to a placeholder until then — no code change needed.
 *
 * @param rel path relative to /public, e.g. "images/headshot.jpg"
 */
export function publicAsset(rel: string): string | null {
  const abs = path.join(process.cwd(), "public", rel);
  return fs.existsSync(abs) ? `/${rel.replace(/\\/g, "/")}` : null;
}

/**
 * First existing asset among candidates (lets you accept .jpg/.png/.webp).
 */
export function firstPublicAsset(rels: string[]): string | null {
  for (const rel of rels) {
    const found = publicAsset(rel);
    if (found) return found;
  }
  return null;
}

/**
 * Resolve a case study's cover image. Honors an explicit frontmatter `cover`
 * (path under /public, or an absolute URL) and otherwise looks for
 * public/images/case-studies/<slug>/cover.{jpg,webp,png}. Returns null until a
 * file exists — cards then fall back to their bold typographic layout.
 */
export function caseStudyCover(
  slug: string,
  frontmatterCover?: string,
): string | null {
  if (frontmatterCover) {
    if (/^https?:\/\//.test(frontmatterCover)) return frontmatterCover;
    const found = publicAsset(frontmatterCover.replace(/^\//, ""));
    if (found) return found;
  }
  return firstPublicAsset([
    `images/case-studies/${slug}/cover.jpg`,
    `images/case-studies/${slug}/cover.webp`,
    `images/case-studies/${slug}/cover.png`,
  ]);
}
