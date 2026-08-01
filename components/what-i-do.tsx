"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Capability = {
  label: string;
  blurb: string;
  detail: string;
};

// Grounded in the day-to-day: four channels, full ownership, real numbers.
const capabilities: Capability[] = [
  {
    label: "Shipping logistics across 4 marketplaces",
    blurb: "Amazon, Walmart, Etsy & Shopify — one fulfillment flow",
    detail:
      "I own end-to-end fulfillment across all four channels: rate shopping, label generation, batch picking, SLA compliance on Seller-Fulfilled Prime and Walmart’s on-time metrics, and returns. When ShipStation stopped fitting the way we actually work, I replaced it with a custom order platform that unifies every channel into a single queue.",
  },
  {
    label: "Customer service",
    blurb: "Every message, every channel, tone that protects the brand",
    detail:
      "All buyer messages, A-to-z claims, Walmart disputes, Etsy cases, and Shopify support tickets run through me. I treat CS as retention and reputation work — fast, human responses that hold seller metrics green and turn one-off buyers into repeat customers.",
  },
  {
    label: "Listing creation & optimization",
    blurb: "Titles, bullets, A+ content, and the details that convert",
    detail:
      "I write and build listings from scratch and rehabilitate underperformers: keyword-led titles and bullets, A+ / Enhanced Brand Content, backend search terms, variation structures, and category-specific compliance. The goal is always the same — higher relevance, higher conversion, fewer suppressed listings.",
  },
  {
    label: "Keyword research & SEO",
    blurb: "Search-term strategy that feeds both organic and paid",
    detail:
      "Deep keyword research using Helium 10 and search-query data to map demand, then structuring listings and campaigns around it. I keep organic rank and paid targeting working together so we’re not paying for placement we should be earning.",
  },
  {
    label: "Creative & product photography",
    blurb: "Shoots, retouching, infographics, and on-brand design",
    detail:
      "I shoot and retouch product photography, build infographic and comparison imagery, and design the creative that carries a listing — main images engineered for CTR, secondary images that answer objections. Consistent art direction across every channel and storefront.",
  },
  {
    label: "PPC campaign management",
    blurb: "Sponsored Products, Brands & Display — managed to ACoS targets",
    detail:
      "I plan, launch, and optimize paid campaigns across Amazon Advertising and Walmart Connect: keyword harvesting, negative-term hygiene, bid and placement strategy, and budget pacing — managed to ACoS and TACoS targets rather than vanity spend.",
  },
  {
    label: "Custom internal tooling",
    blurb: "I build the software when off-the-shelf stops fitting",
    detail:
      "When a workflow is costing us money or time, I build the tool. Most recently a multi-channel order and fulfillment platform that replaced our ShipStation subscription and manual reconciliation — saving roughly $24k a year and cutting order handling time substantially.",
  },
];

export function WhatIDo() {
  return (
    <ul className="mt-10">
      {capabilities.map((cap, i) => (
        <CapabilityItem key={cap.label} capability={cap} index={i + 1} />
      ))}
    </ul>
  );
}

function CapabilityItem({
  capability,
  index,
}: {
  capability: Capability;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-t border-hairline last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-start gap-4 py-5 text-left sm:gap-6"
      >
        <span
          aria-hidden="true"
          className="mt-1 font-serif text-sm text-accent tabular-nums"
        >
          {String(index).padStart(2, "0")}
        </span>

        <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="font-serif text-xl font-medium leading-snug tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[1.6rem]">
            {capability.label}
          </span>
          <span className="text-sm leading-relaxed text-muted sm:max-w-xs sm:text-right">
            {capability.blurb}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={cn(
            "mt-1 shrink-0 text-lg leading-none text-muted transition-transform duration-300 group-hover:text-accent",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pl-10 pr-2 text-[0.975rem] leading-relaxed text-ink-soft sm:pl-12">
            {capability.detail}
          </p>
        </div>
      </div>
    </li>
  );
}
