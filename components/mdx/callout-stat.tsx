import { cn } from "@/lib/cn";

/**
 * A pull-stat block for the middle of a case study — treats a single business
 * result like the hero element it is. Group several with <StatGrid>.
 */
export function CalloutStat({
  value,
  label,
  description,
  className,
}: {
  value: string;
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("not-prose", className)}>
      <p className="font-serif text-5xl font-medium leading-none tracking-tight text-ink tnum sm:text-6xl">
        {value}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      {description && (
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-12 grid gap-10 border-y border-hairline py-10 sm:grid-cols-3">
      {children}
    </div>
  );
}
