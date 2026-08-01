import Link from "next/link";
import { Container } from "@/components/container";
import { HireAllButton } from "./hire-all-button";

/** Storefront header: avatar, shop name, seller stats, and a contact CTA. */
export function ShopBanner() {
  return (
    <section className="border-b border-hairline bg-paper-dim">
      <Container className="py-7 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          {/* Identity */}
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-5">
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center border border-accent bg-accent font-serif text-xl font-medium text-accent-ink sm:h-20 sm:w-20 sm:text-3xl"
            >
              MB
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h1 className="font-serif text-xl font-medium tracking-tight text-ink sm:text-3xl">
                  The Michael Blakely Store
                </h1>
                <span className="border border-accent px-2 py-0.5 font-mono text-[0.54rem] uppercase tracking-[0.12em] text-accent sm:text-[0.58rem]">
                  ★ Top rated
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted sm:text-[0.68rem] sm:tracking-[0.14em]">
                E-commerce operations · Est. 2019 · Dallas, GA
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted sm:text-[0.66rem]">
                <span className="text-accent">★★★★★</span>
                <span className="text-ink">5.0</span>
                <span>(18 reviews)</span>
                <span aria-hidden="true">·</span>
                <span>1 candidate in stock</span>
                <span aria-hidden="true" className="hidden sm:inline">
                  ·
                </span>
                <span className="hidden sm:inline">Ships worldwide</span>
              </div>
            </div>
          </div>

          {/* Actions — full-width buttons on a phone, inline from sm up. */}
          <div className="grid gap-2.5 sm:flex sm:flex-wrap lg:shrink-0">
            <HireAllButton />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-hairline px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Message the owner
            </Link>
          </div>
        </div>

        {/* Shop announcement */}
        <div className="mt-6 border-l-2 border-accent bg-paper/40 px-4 py-3.5 sm:mt-8 sm:px-5 sm:py-4">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">
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
