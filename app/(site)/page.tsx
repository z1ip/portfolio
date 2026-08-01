import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { WhatIDoCards } from "@/components/what-i-do-cards";
import { StatsBand } from "@/components/stats-band";
import { LogoWall } from "@/components/logo-wall";
import { OperationFlow } from "@/components/operation-flow";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { ClosingCta } from "@/components/closing-cta";
import { firstPublicAsset } from "@/lib/assets";
import { CaseStudyCard } from "@/components/case-study-card";
import { getFeaturedCaseStudies } from "@/lib/case-studies";
import { caseStudyCover } from "@/lib/assets";
import { site } from "@/lib/site";

export default function Home() {
  const featured = getFeaturedCaseStudies().map((study) => ({
    study,
    cover: caseStudyCover(study.slug, study.cover),
  }));

  // Michael's own emoji artwork, background removed (the originals shipped
  // opaque — one on white, one with the transparency checkerboard baked in).
  // Falls back to the originals, then to the drawn SVGs.
  const emoji = {
    sad: firstPublicAsset([
      "images/emoji/sadface-final.png",
      "images/emoji/sadface.png",
    ]),
    thumbsUp: firstPublicAsset([
      "images/emoji/thumbsup-final.png",
      "images/emoji/thumbsup.webp",
    ]),
  };

  // Drop real screenshots at public/images/before-after/{before,after}.jpg and
  // the slider swaps the typographic panels for them automatically.
  const baShots = {
    before: firstPublicAsset([
      "images/before-after/before.jpg",
      "images/before-after/before.png",
      "images/before-after/before.webp",
    ]),
    after: firstPublicAsset([
      "images/before-after/after.jpg",
      "images/before-after/after.png",
      "images/before-after/after.webp",
    ]),
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20">
        <Container>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            {site.name} — E-commerce &amp; Marketplace Operations
          </p>

          <h1 className="mt-5 max-w-5xl font-serif text-[3rem] font-medium leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-8xl">
            E-commerce operations for{" "}
            <em className="italic text-accent">multi-channel</em> brands.
          </h1>

          <div className="mt-12 grid gap-10 border-t border-hairline pt-8 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <p className="max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
              I run marketplace operations end-to-end for brands selling on
              Amazon, Walmart, Etsy, Shopify, and TikTok Shop — listings and
              creative, shipping and customer service, SEO and ads. And when the
              off-the-shelf tools fall short, I build my own: the platform that
              moves these orders is one I helped write.
            </p>
            <div className="lg:justify-self-end lg:text-right">
              <p className="eyebrow">Currently</p>
              <p className="mt-3 text-[0.975rem] leading-relaxed text-ink">
                Open to e-commerce manager &amp; operations-lead roles.
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {site.location}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The numbers                                                      */}
      {/* ---------------------------------------------------------------- */}
      <StatsBand />

      {/* ---------------------------------------------------------------- */}
      {/* Channels & tools                                                 */}
      {/* ---------------------------------------------------------------- */}
      <LogoWall />

      {/* ---------------------------------------------------------------- */}
      {/* The operation, as a pipeline                                     */}
      {/* ---------------------------------------------------------------- */}
      <OperationFlow />

      {/* ---------------------------------------------------------------- */}
      {/* Before / after — the conversion rebuild                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-28 sm:mt-40">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="eyebrow">
                <span className="text-accent">/</span> Before &amp; after
              </h2>
              <p className="max-w-md font-serif text-lg italic leading-snug text-ink-soft">
                Three years of rebuilding a 7,000-SKU catalog, in one drag.
              </p>
            </div>
            <div className="mt-8">
              <BeforeAfterSlider
                before={{
                  label: "Before",
                  headline: "3% conversion",
                  points: [
                    "Listings inherited from whoever built them",
                    "Keywords guessed, never researched",
                    "No shared photography standard",
                    "Buyers had to hunt for basic answers",
                  ],
                  src: baShots.before,
                }}
                beforeEmojiSrc={emoji.sad}
                afterEmojiSrc={emoji.thumbsUp}
                after={{
                  label: "After",
                  headline: "6% conversion",
                  points: [
                    "Every image answering a real buyer question",
                    "Keyword map rebuilt on eRank and Ahrefs data",
                    "Titles leading with the buying decision",
                    "Friction removed from the path to purchase",
                  ],
                  src: baShots.after,
                }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What I do                                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-28 sm:mt-40">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="eyebrow">
                <span className="text-accent">/</span> What I do
              </h2>
              <p className="max-w-md font-serif text-lg italic leading-snug text-ink-soft">
                Seven years, one operator, the full marketplace stack.
              </p>
            </div>
            <WhatIDoCards />
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work — bold hover cards                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-28 sm:mt-40">
        <Container>
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="eyebrow">
                <span className="text-accent">/</span> Selected work
              </h2>
              <Link
                href="/work"
                className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-accent"
              >
                All case studies →
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featured.map(({ study, cover }, i) => (
                <CaseStudyCard
                  key={study.slug}
                  study={study}
                  index={i + 1}
                  coverSrc={cover}
                  variant={i === 0 ? "wide" : "standard"}
                  priority={i === 0}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The ask                                                          */}
      {/* ---------------------------------------------------------------- */}
      <ClosingCta />
    </>
  );
}
