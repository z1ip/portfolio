import Link from "next/link";
import { Container } from "@/components/container";
import { HireAllButton } from "./hire-all-button";

/** Etsy-style shop header: avatar, shop name, stats row, and a contact CTA. */
export function ShopBanner() {
  return (
    <section className="border-b border-hairline bg-paper-dim">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center border border-accent bg-accent font-serif text-3xl font-medium text-accent-ink"
          >
            MB
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="font-serif text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                The Michael Blakely Store
              </h1>
              <span className="border border-accent px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent">
                ★ Top rated
              </span>
            </div>
            <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              E-commerce operations · Est. 2019 · Dallas, GA
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-muted">
              <span className="text-accent">★★★★★</span>
              <span className="text-ink">5.0</span>
              <span>(18 reviews)</span>
              <span aria-hidden="true">·</span>
              <span>1 candidate in stock</span>
              <span aria-hidden="true">·</span>
              <span>Ships worldwide</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:self-center">
            <HireAllButton />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-hairline px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Message the owner
            </Link>
          </div>
        </div>

        {/* Shop announcement */}
        <div className="mt-8 border-l-2 border-accent bg-paper/40 px-5 py-4">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
            Shop announcement
          </p>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Everything here is true and nothing here costs money. Seven years of
            running marketplaces, broken into parts you can pick from. Prefer to
            just read it straight? The{" "}
            <Link
              href="/"
              className="text-accent underline underline-offset-4 hover:opacity-80"
            >
              portfolio version
            </Link>{" "}
            says the same things in full sentences.
          </p>
        </div>
      </Container>
    </section>
  );
}
