import { cn } from "@/lib/cn";

/**
 * Consistent page gutter + max width.
 *
 * Wide on purpose: the layout should use the screen rather than sit in a
 * narrow column with dead space either side. Long-form prose still gets its
 * own max-w-* at the call site so line length stays readable.
 *
 * Every section goes through this — if a section hard-codes its own max-width
 * the edges stop lining up down the page.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[120rem] px-6 sm:px-10 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
