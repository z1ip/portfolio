type StackItem = { name: string; note?: string };
type StackGroup = { title: string; items: StackItem[] };

/**
 * Grouped tech-stack / integrations list for tooling case studies.
 * Authored in MDX as: <StackList groups={[{ title, items: [...] }]} />
 */
export function StackList({ groups }: { groups: StackGroup[] }) {
  return (
    <div className="not-prose my-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="eyebrow border-b border-hairline pb-2">
            {group.title}
          </h4>
          <dl className="mt-4 space-y-3">
            {group.items.map((item) => (
              <div key={item.name}>
                <dt className="font-serif text-lg leading-tight text-ink">
                  {item.name}
                </dt>
                {item.note && (
                  <dd className="mt-0.5 text-sm leading-relaxed text-muted">
                    {item.note}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
