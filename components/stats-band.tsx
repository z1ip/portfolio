import { CountUpMetric } from "@/components/count-up-metric";
import { Container } from "@/components/container";

/**
 * The numbers, up front. Framed as the operation Michael runs rather than
 * personal credit — the honest version is also the one that survives an
 * interview follow-up.
 */
const STATS: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}[] = [
  {
    value: 20.4,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    label: "Revenue through the stores I run",
  },
  { value: 496, suffix: "K", label: "Orders fulfilled" },
  { value: 99, suffix: "%", label: "On-time shipping rate" },
  { value: 2, suffix: "×", label: "Conversion rate — 3% to 6%" },
];

export function StatsBand() {
  return (
    <section aria-label="Key results" className="mt-24 sm:mt-32">
      <div className="border-y border-hairline">
        <Container className="grid grid-cols-2 gap-y-10 py-12 lg:grid-cols-4 lg:gap-x-8 lg:py-14">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                <CountUpMetric
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                  label={s.label}
                  trigger="inview"
                />
              </p>
              <p className="mt-3 max-w-[14rem] font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Container>
      </div>
      <Container>
        <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
          Lifetime totals for the storefronts I operate day to day · 2019–present
        </p>
      </Container>
    </section>
  );
}
