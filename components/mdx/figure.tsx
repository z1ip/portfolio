import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A framed image with an optional caption. If no `src` is provided it renders
 * a labeled placeholder frame (not a broken image), so case studies read as
 * intentional before real screenshots are dropped in.
 */
export function Figure({
  src,
  alt,
  caption,
  label,
  ratio = "16 / 10",
  className,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  /** Text shown inside the placeholder when there is no src. */
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={cn("not-prose my-10", className)}>
      <div className="overflow-hidden border border-hairline bg-paper-dim">
        {src ? (
          <Image
            src={src}
            alt={alt ?? caption ?? ""}
            width={1600}
            height={1000}
            className="h-auto w-full"
          />
        ) : (
          <div
            style={{ aspectRatio: ratio }}
            className="flex items-center justify-center"
            role="img"
            aria-label={alt ?? label ?? "Placeholder image"}
          >
            <span className="px-6 text-center text-xs uppercase tracking-[0.14em] text-muted">
              {label ?? "Image placeholder"}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
