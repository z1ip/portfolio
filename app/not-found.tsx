import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col justify-center py-24">
      <Container>
        <p className="eyebrow">
          <span className="text-accent">404</span> · Out of stock
        </p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
          This aisle is empty.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          Whatever you were looking for isn&apos;t on the shelf. Everything worth
          having is one of these two doors:
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="border border-accent bg-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink transition-opacity hover:opacity-90"
          >
            ← Back to the portfolio
          </Link>
          <Link
            href="/shop"
            className="border border-hairline px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Enter the store →
          </Link>
        </div>
      </Container>
    </div>
  );
}
