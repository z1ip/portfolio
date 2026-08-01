import { Reveal } from "@/components/reveal";
import { CountUpMetric } from "@/components/count-up-metric";
import { Container } from "@/components/container";

const STAGES: {
  value: number;
  suffix?: string;
  decimals?: number;
  unit: string;
  note: string;
}[] = [
  {
    value: 7000,
    unit: "SKUs listed",
    note: "Photographed, written, keyworded, and kept in sync.",
  },
  {
    value: 5,
    unit: "storefronts",
    note: "Amazon, Walmart, Etsy, Shopify, TikTok Shop.",
  },
  {
    value: 5000,
    unit: "orders / month",
    note: "Routed through one queue instead of five dashboards.",
  },
  {
    value: 588,
    suffix: "K",
    unit: "shipments",
    note: "More shipments than orders — splits, partials, back-orders.",
  },
  {
    value: 99,
    suffix: "%",
    unit: "on time",
    note: "The number marketplaces suspend you for missing.",
  },
];

/**
 * The operation as a pipeline, left to right. Each stage tallies up as it
 * scrolls into view, staggered so the eye follows the flow.
 */
export function OperationFlow() {
  return (
    <section aria-label="The operation, end to end" className="mt-28 sm:mt-40">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="eyebrow">
              <span className="text-accent">/</span> The operation
            </h2>
            <p className="max-w-md font-serif text-lg italic leading-snug text-ink-soft">
              What actually moves through my hands in a normal month.
            </p>
          </div>
        </Reveal>

        <ol className="mt-10 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s, i) => (
            <Reveal
              as="li"
              key={s.unit}
              delay={i * 90}
              className="group relative flex flex-col justify-between gap-6 bg-paper p-6 transition-colors hover:bg-paper-dim"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[0.6rem] tracking-[0.16em] text-muted"
              >
                {String(i + 1).padStart(2, "0")}
                {i < STAGES.length - 1 && (
                  <span className="ml-2 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    →
                  </span>
                )}
              </span>

              <div>
                <p className="font-serif text-4xl font-medium leading-none tracking-tight text-ink">
                  <CountUpMetric
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                    label={s.unit}
                    trigger="inview"
                    durationMs={1300}
                  />
                </p>
                <p className="mt-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-accent">
                  {s.unit}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
