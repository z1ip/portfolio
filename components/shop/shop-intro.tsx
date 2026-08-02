"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const KEY = "mb-shop-intro-seen";

// Long enough that the store paints first. A modal that beats the content on
// screen reads as an ad; one that follows it reads as a note from the owner.
const OPEN_DELAY = 700;

const STEPS = [
  {
    n: "01",
    title: "Browse the shelves",
    body: "Every listing is a real fact, number, or skill.",
  },
  {
    n: "02",
    title: "Add what matters",
    body: "Cart the ones that fit the role you're hiring for.",
  },
  {
    n: "03",
    title: "Email yourself the list",
    body: "Check out and I'll send your shortlist.",
  },
];

/**
 * The one-time "why is this a store?" note, plus the link that brings it back.
 *
 * Both live in one component so the trigger and the dialog can share state
 * without threading context through the server-rendered banner around them.
 */
export function ShopIntro() {
  // `null` until localStorage has been read — rendering `false` first would
  // flash the trigger link for someone who is about to get the dialog anyway.
  const [seen, setSeen] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  // Where focus goes on close: back to the link if they opened it, otherwise
  // nowhere in particular, since the dialog opened on its own.
  const restoreFocus = useRef(false);

  useEffect(() => {
    let already = false;
    try {
      already = localStorage.getItem(KEY) === "1";
    } catch {
      /* private mode — treat as first visit */
    }
    setSeen(already);
    if (already) return;

    const t = setTimeout(() => setOpen(true), OPEN_DELAY);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setSeen(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    if (restoreFocus.current) {
      restoreFocus.current = false;
      triggerRef.current?.focus();
    }
  }, []);

  // Escape to close, and hold the page still underneath.
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      {seen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            restoreFocus.current = true;
            setOpen(true);
          }}
          className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent underline decoration-hairline underline-offset-4 transition-colors hover:decoration-accent"
        >
          Why is this a store?
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          role="presentation"
        >
          <div
            onClick={close}
            aria-hidden="true"
            className="absolute inset-0 bg-black/70"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shop-intro-title"
            className={cn(
              "relative flex max-h-[88vh] w-full flex-col overflow-y-auto border border-hairline bg-paper",
              "px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 sm:max-w-xl sm:px-8 sm:pb-8 sm:pt-8",
            )}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-2 text-2xl leading-none text-muted transition-colors hover:text-accent"
            >
              ×
            </button>

            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
              A note from the owner
            </p>

            <h2
              id="shop-intro-title"
              className="mt-3 pr-8 font-serif text-2xl font-medium leading-tight tracking-tight text-ink sm:text-3xl"
            >
              Why is my portfolio a store?
            </h2>

            <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-ink-soft sm:text-base">
              <p>
                Two reasons. The first is that every portfolio in your inbox
                looks the same, and I&apos;d rather be the one you remember.
              </p>
              <p>
                {/* Explicit {" "} around the <em>: the plain source space after
                    </em> was dropped in the build and shipped as "isthe job". */}
                The second is that this{" "}
                <em>is</em>{" "}
                the job. I&apos;ve spent seven years running listings, orders,
                and fulfillment across five marketplaces — so if I&apos;m going
                to stand out, it may as well be by doing the thing I&apos;m
                actually good at.
              </p>
              <p className="text-ink">
                Everything in here is true. The numbers, the tools, the results.
                Nothing costs money.
              </p>
            </div>

            <ol className="mt-6 space-y-3 border-t border-hairline pt-5">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-[0.66rem] leading-none text-accent"
                  >
                    {s.n}
                  </span>
                  <p className="min-w-0 text-sm leading-snug text-ink-soft">
                    <span className="text-ink">{s.title}</span> — {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-accent bg-accent px-5 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-accent-ink transition-opacity hover:opacity-90"
              >
                Start shopping
              </button>
              <Link
                href="/"
                className="rounded-full border border-hairline px-5 py-2.5 text-center font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Prefer it straight? Read the portfolio
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
