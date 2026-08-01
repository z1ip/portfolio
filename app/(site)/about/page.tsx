import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { firstPublicAsset } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.fullName} — e-commerce and marketplace operations manager. Bio, tools, and background.`,
};

// Every tool here is one Michael has actually used — no aspirational filler.
const toolGroups: { title: string; items: string[] }[] = [
  {
    title: "Marketplaces & channels",
    items: [
      "Amazon Seller Central",
      "Walmart Marketplace",
      "Etsy (3 shops)",
      "Shopify",
      "TikTok Shop",
    ],
  },
  {
    title: "Fulfillment & operations",
    items: [
      "Custom order platform (co-built)",
      "ShipStation",
      "TeamViewer",
      "Splashtop",
    ],
  },
  {
    title: "Research & SEO",
    items: ["eRank", "Ahrefs", "Keyword & listing research"],
  },
  {
    title: "Design & creative",
    items: [
      "Adobe Photoshop (certified)",
      "Adobe Illustrator (certified)",
      "Adobe Lightroom",
      "Adobe InDesign",
      "Product photography",
    ],
  },
  {
    title: "Video & print production",
    items: [
      "Adobe Premiere Pro",
      "CapCut",
      "Ultraprint RIP software",
    ],
  },
  {
    title: "Workflow & docs",
    items: ["Slack", "Obsidian", "Dropbox", "AI tooling (daily driver)"],
  },
];

export default function AboutPage() {
  // Drop public/images/headshot.{jpg,webp,png} and it appears automatically.
  const headshot = firstPublicAsset([
    "images/headshot.jpg",
    "images/headshot.webp",
    "images/headshot.png",
  ]);

  return (
    <div className="pt-16 sm:pt-24">
      <Container>
        <p className="eyebrow">About</p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Bio */}
          <div>
            <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl">
              I run the whole marketplace operation — and build the tools when
              the software falls short.
            </h1>

            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                I&apos;m {site.fullName.replace(" Jr", "")} — an e-commerce and
                marketplace operations manager with seven years running Amazon,
                Walmart Marketplace, Etsy, Shopify, and TikTok Shop stores end
                to end. That means all of it: shipping logistics across five
                channels, customer service, listing creation and optimization,
                keyword research and SEO, and creative and product photography.
                Across those storefronts that&apos;s added up to roughly{" "}
                <strong className="font-medium text-ink">
                  496,000 orders and $20.4M in revenue
                </strong>{" "}
                — while conversion went from 3% to 6% and on-time shipping held
                at 99%.
              </p>
              <p>
                What sets my work apart is that I don&apos;t stop at the edge of
                the off-the-shelf tools. When a workflow starts costing real
                money or hours, I help build the software that fixes it — most
                recently a custom multi-channel order platform, written in PHP
                against five marketplace APIs, that replaced our ShipStation
                setup and saves roughly $24k a year. I&apos;m as comfortable in
                a spreadsheet as I am in a code editor.
              </p>
              <p>
                Off the clock, I&apos;m a lifelong Tolkien fan, a car guy, and
                the kind of person who falls down rabbit holes about space,
                science, and history — I like understanding how things{" "}
                <em className="italic">actually</em>{" "}work. I build long-term
                gaming projects for the same reason I build real-world ones: I
                enjoy systems that reward patience and care. And there&apos;s
                almost always music playing while I do it.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={site.resume}
                download
                className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent hover:border-accent"
              >
                Download résumé
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink-soft underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Or email me
              </a>
            </div>
          </div>

          {/* Headshot + quick facts */}
          <aside className="lg:pt-2">
            <div
              className="relative overflow-hidden border border-hairline bg-paper-dim"
              style={{ aspectRatio: "4 / 5" }}
            >
              {headshot ? (
                <Image
                  src={headshot}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center"
                  role="img"
                  aria-label={`Portrait of ${site.name} — placeholder`}
                >
                  <span className="px-6 text-center text-xs uppercase tracking-[0.14em] text-muted">
                    Headshot
                  </span>
                </div>
              )}
            </div>

            <dl className="mt-6 space-y-4">
              <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                <dt className="eyebrow">Based in</dt>
                <dd className="text-sm text-ink">Dallas, GA</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                <dt className="eyebrow">Working</dt>
                <dd className="text-right text-sm text-ink">
                  Remote · open to relocation
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-hairline pb-4">
                <dt className="eyebrow">Experience</dt>
                <dd className="text-sm text-ink">7 years, multi-channel</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="eyebrow">Certified</dt>
                <dd className="text-right text-sm text-ink">
                  Adobe · Photoshop &amp; Illustrator
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Tools & platforms */}
        <section className="mt-24 sm:mt-32">
          <Reveal>
            <h2 className="eyebrow">Tools &amp; platforms</h2>
            <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {toolGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="border-b border-hairline pb-2 font-serif text-lg text-ink">
                    {group.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-[0.975rem] text-ink-soft">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
