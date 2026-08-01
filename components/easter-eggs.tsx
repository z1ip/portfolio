"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Two quiet eggs for the curious:
 *  - a styled console greeting for devs who open the inspector
 *  - the Konami code triggers a little toast
 */
export function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Console greeting — fires once.
    console.log(
      "%cLooking under the hood? 🛠️",
      "font: 600 16px/1.5 system-ui; color:#a2dcae;",
    );
    console.log(
      `%cI like you. This whole thing is Next.js + a lot of care.\nIf you're hiring, let's talk: ${site.email}`,
      "font: 13px/1.6 system-ui; color:#bdb9ad;",
    );

    // Konami listener.
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = key === KONAMI[idx] ? idx + 1 : key === KONAMI[0] ? 1 : 0;
      if (idx === KONAMI.length) {
        idx = 0;
        setToast(
          "🧙 Secret code WIZARD unlocked — use it at checkout. One does not simply overlook this candidate.",
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-sm border border-accent bg-paper-dim p-4 text-sm text-ink shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] sm:left-auto sm:right-4 sm:mx-0"
    >
      <button
        type="button"
        onClick={() => setToast(null)}
        aria-label="Dismiss"
        className="absolute right-2 top-1 text-lg leading-none text-muted hover:text-accent"
      >
        ×
      </button>
      <p className="pr-4">{toast}</p>
    </div>
  );
}
