import Link from "next/link";
import { Container } from "./container";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = 2026; // build-time constant; avoids hydration drift

  return (
    <footer
      id="contact"
      className="mt-40 border-t border-hairline bg-paper-dim"
    >
      <Container className="grid gap-10 py-20 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="max-w-md">
          <p className="eyebrow">Get in touch</p>
          <p className="mt-4 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            Looking for someone to own your marketplace operations end-to-end?
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-lg text-accent underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer" className="sm:text-right">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft sm:flex-col sm:gap-y-3">
            <li>
              <Link href="/work" className="transition-colors hover:text-accent">
                Work
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-accent">
                The store
              </Link>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-hairline py-6 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.fullName}
        </p>
        <p>Built with Next.js — designed &amp; coded by me</p>
      </Container>
    </footer>
  );
}
