import Link from "next/link";

type Capability = {
  label: string;
  blurb: string;
};

// Same day-to-day capabilities as the index version, condensed for cards.
const capabilities: Capability[] = [
  {
    label: "Shipping logistics across 4 marketplaces",
    blurb: "Amazon, Walmart, Etsy & Shopify — one fulfillment flow.",
  },
  {
    label: "Customer service",
    blurb: "Every message, every channel, in a tone that protects the brand.",
  },
  {
    label: "Listing creation & optimization",
    blurb: "Titles, bullets, A+ content, and the details that convert.",
  },
  {
    label: "Keyword research & SEO",
    blurb: "Search-term strategy that feeds both organic and paid.",
  },
  {
    label: "Creative & product photography",
    blurb: "Shoots, retouching, infographics, and on-brand design.",
  },
  {
    label: "PPC campaign management",
    blurb: "Sponsored Products, Brands & Display — managed to ACoS targets.",
  },
  {
    label: "Custom internal tooling",
    blurb: "I build the software when off-the-shelf stops fitting.",
  },
];

export function WhatIDoCards() {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {capabilities.map((cap, i) => (
        <CapabilityCard key={cap.label} capability={cap} index={i + 1} />
      ))}
      <CtaCard />
    </ul>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  return (
    // min-height, NOT aspect-square: the container is wide, so a square card
    // becomes ~430px tall and leaves a huge dead gap above the text.
    <li className="group relative flex min-h-[11rem] flex-col justify-between overflow-hidden border border-hairline bg-paper-dim p-5 transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:bg-accent sm:min-h-[12.5rem] sm:p-6">
      <span className="font-mono text-xs tabular-nums text-accent transition-colors duration-200 group-hover:text-accent-ink/70">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-serif text-lg font-medium leading-tight tracking-tight text-ink transition-colors duration-200 group-hover:text-accent-ink sm:text-xl">
          {capability.label}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-200 group-hover:text-accent-ink/80">
          {capability.blurb}
        </p>
      </div>
    </li>
  );
}

function CtaCard() {
  return (
    <li>
      <Link
        href="/work"
        className="group flex h-full min-h-[11rem] flex-col justify-between border border-accent bg-accent p-5 transition-transform duration-200 ease-out hover:-translate-y-1 sm:min-h-[12.5rem] sm:p-6"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink/70">
          See it in practice
        </span>
        <span className="font-serif text-xl font-medium leading-tight tracking-tight text-accent-ink sm:text-2xl">
          The work
          <span
            aria-hidden="true"
            className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
