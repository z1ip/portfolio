import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Platform, WorkType } from "./site";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

export type Metric = {
  /** The number itself, e.g. 24000. Used by the count-up interaction. */
  value: number;
  /** Symbol shown before the number, e.g. "$". */
  prefix?: string;
  /** Symbol shown after the number, e.g. "%", "×", "k". */
  suffix?: string;
  /** Short label under the metric, e.g. "saved per year". */
  label: string;
  /** Optional override for how the final value renders (e.g. "24k"). */
  display?: string;
  /** Decimal places to animate/format to. Defaults to 0. */
  decimals?: number;
};

export type CaseStudyMeta = {
  slug: string;
  title: string;
  client: string;
  platform: Platform;
  /** Platforms this touched, for multi-channel work. Defaults to [platform]. */
  platforms: Platform[];
  type: WorkType;
  role: string;
  timeframe: string;
  summary: string;
  metric: Metric;
  featured: boolean;
  order: number;
  cover?: string;
};

export type CaseStudy = CaseStudyMeta & { content: string };

function readAll(): CaseStudy[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const platform = data.platform as Platform;
      return {
        slug,
        title: data.title,
        client: data.client,
        platform,
        platforms: (data.platforms as Platform[]) ?? [platform],
        type: data.type as WorkType,
        role: data.role,
        timeframe: data.timeframe,
        summary: data.summary,
        metric: data.metric as Metric,
        featured: Boolean(data.featured),
        order: typeof data.order === "number" ? data.order : 99,
        cover: data.cover,
        content,
      } satisfies CaseStudy;
    })
    .sort((a, b) => a.order - b.order);
}

export function getAllCaseStudies(): CaseStudy[] {
  return readAll();
}

export function getCaseStudyMetas(): CaseStudyMeta[] {
  // Strip the heavy MDX body for list/grid views.
  return readAll().map(({ content: _content, ...meta }) => meta);
}

export function getFeaturedCaseStudies(): CaseStudyMeta[] {
  return getCaseStudyMetas().filter((c) => c.featured);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return readAll().find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return readAll().map((c) => c.slug);
}
