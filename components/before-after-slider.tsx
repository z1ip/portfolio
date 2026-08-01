"use client";

import { useId, useState } from "react";
import { EmojiDismayed, EmojiThumbsUp } from "@/components/emoji-art";

type Panel = {
  label: string;
  headline: string;
  points: string[];
  /** Optional real screenshot — drop files in and they take over the panel. */
  src?: string | null;
};

type Props = {
  before: Panel;
  after: Panel;
  /** Artwork from public/images/emoji/, crossfaded as the slider moves. */
  beforeEmojiSrc?: string | null;
  afterEmojiSrc?: string | null;
};

/**
 * A draggable before/after comparison. The "after" panel is revealed by a wipe
 * the visitor controls, starting fully revealed at the left.
 *
 * The reaction face deliberately lives OUTSIDE the clipped panels. When it sat
 * inside them, the copy (left of a panel) and the face (right of the same
 * panel) got split by the wipe — so you'd see "3% conversion" next to a
 * grinning face. Here a single face crossfades with the handle position, so it
 * always matches whichever state dominates the frame.
 *
 * Accessibility: the control is a real <input type="range"> stretched over the
 * whole figure. That gets keyboard support, touch, and screen-reader semantics
 * for free rather than reimplementing them on a div.
 */
export function BeforeAfterSlider({
  before,
  after,
  beforeEmojiSrc,
  afterEmojiSrc,
}: Props) {
  // Start fully showing the "after" state — the good news leads, and there's a
  // clear direction to drag.
  const [pos, setPos] = useState(0);
  const [touched, setTouched] = useState(false);
  const id = useId();

  // 0 = all "after", 100 = all "before". Drive the crossfade off the same value.
  const beforeWeight = pos / 100;

  return (
    <figure className="relative select-none">
      {/* Panels are clipped; the divider and control are siblings so the handle
          stays visible even at 0%. */}
      {/* max-h matters as much as the ratio: at a ~1800px-wide container a 2/1
          box is ~900px tall and eats the whole viewport. */}
      {/* w-full is load-bearing: with an auto width, `min-h` and `aspect-ratio`
          together resolve the WIDTH from the min-height (300px at 4/3 = 400px),
          which overflowed the container on a ~390px phone and gave the whole
          homepage a horizontal scrollbar. A definite width fixes the ratio's
          input so min-h can only ever make the box taller. */}
      <div className="relative aspect-[4/3] max-h-[460px] min-h-[300px] w-full border border-hairline bg-paper-dim sm:aspect-[16/7] lg:aspect-[24/7]">
        <div className="absolute inset-0 overflow-hidden">
          {/* BEFORE — underneath, always fully painted */}
          <PanelBody panel={before} tone="before" />

          {/* AFTER — clipped from the left edge to the handle */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            aria-hidden="true"
          >
            <PanelBody panel={after} tone="after" />
          </div>

          {/* The reaction, crossfading between the two states */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-32 w-32 -translate-y-1/2 sm:right-12 sm:h-44 sm:w-44 lg:h-56 lg:w-56"
          >
            <Reaction
              src={afterEmojiSrc}
              fallback="thumbsup"
              opacity={1 - beforeWeight}
            />
            <Reaction
              src={beforeEmojiSrc}
              fallback="dismayed"
              opacity={beforeWeight}
            />
          </span>
        </div>

        {/* Divider + handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent"
          style={{ left: `${pos}%` }}
        >
          <span
            className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-paper text-accent shadow-[0_4px_20px_-6px_rgba(0,0,0,0.6)] ${
              touched ? "" : "slider-nudge"
            }`}
          >
            <span className="font-mono text-xs">↔</span>
          </span>

          {/* Unmounted rather than faded — an opacity transition here left the
              label stuck at full opacity after the first drag. */}
          {!touched && (
            <span className="absolute left-1/2 top-1/2 ml-8 mt-5 whitespace-nowrap border border-accent/40 bg-paper/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
              Drag me →
            </span>
          )}
        </div>

        <label htmlFor={id} className="sr-only">
          Reveal the original listing — drag to compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => {
            setPos(Number(e.target.value));
            if (!touched) setTouched(true);
          }}
          aria-valuetext={`${pos}% of the original listing shown`}
          // z-20 keeps the control above the panels. Without it the copy block
          // sits on top and swallows every click across the figure.
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
        Drag to compare · same traffic, same products
      </figcaption>
    </figure>
  );
}

function Reaction({
  src,
  fallback,
  opacity,
}: {
  src?: string | null;
  fallback: "dismayed" | "thumbsup";
  opacity: number;
}) {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain drop-shadow-[0_14px_38px_rgba(0,0,0,0.5)]"
        />
      ) : fallback === "thumbsup" ? (
        <EmojiThumbsUp className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
      ) : (
        <EmojiDismayed className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
      )}
    </span>
  );
}

function PanelBody({ panel, tone }: { panel: Panel; tone: "before" | "after" }) {
  const isAfter = tone === "after";

  if (panel.src) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={panel.src}
          alt={panel.label}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 border border-hairline bg-paper/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink">
          {panel.label}
        </span>
      </div>
    );
  }

  return (
    // pointer-events-none throughout: these panels are purely visual, and the
    // range input stretched over them is the only thing that should take input.
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 p-6 sm:p-10 lg:p-12 ${
        isAfter ? "bg-paper-dim" : "bg-paper"
      }`}
    >
      <div className="max-w-[52%]">
        <p
          className={`font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
            isAfter ? "text-accent" : "text-muted"
          }`}
        >
          {panel.label}
        </p>
        <p
          className={`mt-3 font-serif text-3xl font-medium leading-[1.05] tracking-tight sm:text-5xl ${
            isAfter ? "text-accent" : "text-ink-soft"
          }`}
        >
          {panel.headline}
        </p>
        <ul className="mt-4 space-y-1.5">
          {panel.points.map((p) => (
            <li
              key={p}
              className="flex items-baseline gap-2 text-sm leading-relaxed text-ink-soft"
            >
              <span
                aria-hidden="true"
                className={isAfter ? "text-accent" : "text-muted"}
              >
                {isAfter ? "→" : "·"}
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
