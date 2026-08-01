"use client";

import { useEffect, useState } from "react";

const KEY = "mb-shop-guide-dismissed";

const STEPS = [
  {
    n: "01",
    title: "Browse the shelves",
    body: "Every listing is a real fact, number, or skill — sorted into departments.",
  },
  {
    n: "02",
    title: "Add what matters",
    body: "Cart the ones that fit the role you're hiring for. Nothing costs anything.",
  },
  {
    n: "03",
    title: "Email yourself the list",
    body: "Check out and I'll send your shortlist — a ready-made case for hiring me.",
  },
];

/**
 * A one-time signpost so nobody has to guess what they're shopping for.
 * Dismissed state is remembered, so returning visitors get straight to browsing.
 */
export function HowItWorks() {
  // `null` = haven't read localStorage yet; render nothing to avoid a flash
  // of a banner the visitor already dismissed.
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setShow(localStorage.getItem(KEY) !== "1");
    } catch {
      setShow(true);
    }
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!show) return null;

  return (
    <section
      aria-label="How this store works"
      className="relative mb-10 border border-hairline bg-paper-dim p-6 sm:mb-12 sm:p-8"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss the guide"
        className="absolute right-3 top-2 text-xl leading-none text-muted transition-colors hover:text-accent"
      >
        ×
      </button>

      <p className="eyebrow">
        New here? <span className="text-accent">Three steps.</span>
      </p>

      <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span
              aria-hidden="true"
              className="font-mono text-[0.68rem] leading-none tracking-[0.1em] text-accent"
            >
              {s.n}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-lg leading-snug text-ink">
                {s.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
