import type { Metadata } from "next";
import { Container } from "@/components/container";
import { WorkGrid } from "@/components/work-grid";
import { getCaseStudyMetas } from "@/lib/case-studies";
import { caseStudyCover } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across Amazon, Walmart, Etsy, Shopify, and TikTok Shop — listing optimization, operations, and custom tooling.",
};

export default function WorkPage() {
  const studies = getCaseStudyMetas().map((study) => ({
    ...study,
    coverSrc: caseStudyCover(study.slug, study.cover),
  }));

  return (
    <div className="pt-16 sm:pt-24">
      <Container>
        <p className="eyebrow">Work</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Case studies, by the numbers.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Selected work across five marketplaces — listing optimization,
          operations, and the internal tools I&apos;ve helped build. Filter by
          platform or by type of work.
        </p>

        <div className="mt-12">
          <WorkGrid studies={studies} />
        </div>
      </Container>
    </div>
  );
}
