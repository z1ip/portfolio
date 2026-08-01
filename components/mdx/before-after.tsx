import { Figure } from "./figure";

type Side = { src?: string; alt?: string; label?: string };

/**
 * Two-up before/after comparison. Stacks on mobile, side-by-side on desktop.
 * Each side falls back to a labeled placeholder frame when no src is given.
 */
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: Side;
  after: Side;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-12">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Before</p>
          <Figure
            src={before.src}
            alt={before.alt}
            label={before.label ?? "Before"}
            className="my-0"
            ratio="4 / 3"
          />
        </div>
        <div>
          <p className="eyebrow mb-3 text-accent">After</p>
          <Figure
            src={after.src}
            alt={after.alt}
            label={after.label ?? "After"}
            className="my-0"
            ratio="4 / 3"
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
