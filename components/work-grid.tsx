"use client";

import { useMemo, useState } from "react";
import { CaseStudyCard } from "./case-study-card";
import { cn } from "@/lib/cn";
import type { CaseStudyMeta } from "@/lib/case-studies";
import type { Platform, WorkType } from "@/lib/site";

export type WorkItem = CaseStudyMeta & { coverSrc?: string | null };

const PLATFORMS: Platform[] = ["Amazon", "Walmart", "Etsy", "Shopify"];
const TYPES: WorkType[] = [
  "Listing optimization",
  "Launch",
  "Ops",
  "Branding",
  "Tooling",
];

function FilterRow<T extends string>({
  legend,
  options,
  active,
  onChange,
}: {
  legend: string;
  options: T[];
  active: T | "All";
  onChange: (value: T | "All") => void;
}) {
  const items: (T | "All")[] = ["All", ...options];
  return (
    <fieldset className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <legend className="eyebrow mr-3 inline-block">{legend}</legend>
      {items.map((item) => {
        const selected = item === active;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item)}
            className={cn(
              "border px-3 py-1.5 text-sm transition-colors",
              selected
                ? "border-accent bg-accent text-accent-ink"
                : "border-hairline text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {item}
          </button>
        );
      })}
    </fieldset>
  );
}

export function WorkGrid({ studies }: { studies: WorkItem[] }) {
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [type, setType] = useState<WorkType | "All">("All");

  const filtered = useMemo(
    () =>
      studies.filter((s) => {
        const matchesPlatform =
          platform === "All" || s.platforms.includes(platform);
        const matchesType = type === "All" || s.type === type;
        return matchesPlatform && matchesType;
      }),
    [studies, platform, type],
  );

  const reset = () => {
    setPlatform("All");
    setType("All");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-hairline py-6">
        <FilterRow
          legend="Platform"
          options={PLATFORMS}
          active={platform}
          onChange={setPlatform}
        />
        <FilterRow
          legend="Type"
          options={TYPES}
          active={type}
          onChange={setType}
        />
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {filtered.length} case {filtered.length === 1 ? "study" : "studies"}
        {(platform !== "All" || type !== "All") && (
          <>
            {" "}
            <button
              type="button"
              onClick={reset}
              className="text-accent underline decoration-hairline decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study, i) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              index={i + 1}
              coverSrc={study.coverSrc}
            />
          ))}
        </div>
      ) : (
        <p className="mt-16 max-w-md font-serif text-2xl leading-snug text-ink-soft">
          No case studies match that combination yet — more work is on the way.
        </p>
      )}
    </div>
  );
}
