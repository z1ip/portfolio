import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

/**
 * The homepage used to end on a case-study grid with nothing to do next.
 * This is the ask.
 */
export function ClosingCta() {
  return (
    <section className="mt-28 sm:mt-40">
      <Container>
        <Reveal className="border-t border-hairline pt-12 sm:pt-16">
          <p className="eyebrow">
            <span className="text-accent">/</span> Currently open
          </p>

          <h2 className="mt-6 max-w-4xl font-serif text-4xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl">
            If you need someone who can run the whole thing —{" "}
            <em className="italic text-accent">let&apos;s talk.</em>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            I&apos;m looking for e-commerce manager and operations-lead roles,
            remote or relocating for the right team. If any of the numbers above
            look like problems you currently have, I&apos;d like to hear about
            them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="border border-accent bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
            >
              Get in touch →
            </Link>
            <a
              href={site.resume}
              download
              className="border border-hairline px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download résumé ↓
            </a>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft underline decoration-hairline underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {site.email}
            </a>
          </div>

          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            {site.location}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
