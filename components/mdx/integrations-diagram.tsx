import { cn } from "@/lib/cn";

type NodeList = { heading: string; items: string[] };

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="border border-hairline bg-paper px-4 py-2.5 text-center text-sm text-ink sm:text-left">
      {children}
    </li>
  );
}

function Column({
  data,
  align,
}: {
  data: NodeList;
  align: "left" | "right";
}) {
  return (
    <div className={cn(align === "right" ? "lg:text-right" : "lg:text-left")}>
      <p className="eyebrow mb-4">{data.heading}</p>
      <ul className="space-y-3">
        {data.items.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center text-2xl text-accent"
    >
      <span className="lg:hidden">↓</span>
      <span className="hidden lg:inline">↔</span>
    </div>
  );
}

/**
 * Hub-and-spoke integrations diagram for the tooling case study: sales
 * channels flow into a central platform, which fans out to fulfillment and
 * back-office services. Built from semantic lists so it degrades gracefully.
 */
export function IntegrationsDiagram({
  hub,
  hubNote,
  inputs,
  outputs,
  caption,
}: {
  hub: string;
  hubNote?: string;
  inputs: NodeList;
  outputs: NodeList;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-12">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1.15fr_auto_1fr]">
        <Column data={inputs} align="right" />
        <Arrow />
        <div className="border-2 border-accent bg-accent px-6 py-8 text-center">
          <p className="font-serif text-xl font-medium leading-tight text-accent-ink sm:text-2xl">
            {hub}
          </p>
          {hubNote && (
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-accent-ink/75">
              {hubNote}
            </p>
          )}
        </div>
        <Arrow />
        <Column data={outputs} align="left" />
      </div>
      {caption && (
        <figcaption className="mt-6 text-center text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
