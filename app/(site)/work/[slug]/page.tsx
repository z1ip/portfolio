import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { CountUpMetric } from "@/components/count-up-metric";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  getAllSlugs,
  getCaseStudy,
  getCaseStudyMetas,
} from "@/lib/case-studies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = study.title;
  const description = study.summary;
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: `${title} — ${site.name}`,
      description,
      url: `${site.url}/work/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1.5 text-[0.975rem] text-ink">{value}</dd>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Simple prev/next within the ordered set.
  const all = getCaseStudyMetas();
  const idx = all.findIndex((c) => c.slug === slug);
  const next = all[(idx + 1) % all.length];

  return (
    <article className="pb-8 pt-14 sm:pt-20">
      <Container>
        <Link
          href="/work"
          className="text-sm text-muted underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          ← All work
        </Link>

        {/* Hero */}
        <header className="mt-10 border-b border-hairline pb-12">
          <p className="eyebrow">
            {study.platform}
            {study.type ? ` · ${study.type}` : ""}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {study.title}
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:max-w-2xl">
              <MetaItem label="Client" value={study.client} />
              <MetaItem
                label="Platforms"
                value={study.platforms.join(", ")}
              />
              <MetaItem label="Role" value={study.role} />
              <MetaItem label="Timeframe" value={study.timeframe} />
            </dl>

            <div className="lg:text-right">
              <p className="font-serif text-6xl font-medium leading-none tracking-tight text-accent sm:text-7xl">
                <CountUpMetric {...study.metric} trigger="inview" />
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
                {study.metric.label}
              </p>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="mt-4">
          <MDXRemote
            source={study.content}
            components={mdxComponents}
            // blockJS defaults to true in next-mdx-remote@6, which strips
            // `{…}` expression props (object/array attributes) as a security
            // measure. Our MDX is first-party/trusted content read from local
            // files, so we allow expressions and keep the dangerous-call guard.
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm] },
              blockJS: false,
            }}
          />
        </div>

        {/* Next */}
        {next && next.slug !== slug && (
          <div className="mt-24 border-t border-hairline pt-8">
            <p className="eyebrow">Next case study</p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-3 flex items-baseline justify-between gap-6"
            >
              <span className="font-serif text-2xl font-medium leading-tight tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                {next.title}
              </span>
              <span
                aria-hidden="true"
                className="text-accent transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </Container>
    </article>
  );
}
