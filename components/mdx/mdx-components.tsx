import type { MDXComponents } from "mdx/types";
import { Figure } from "./figure";
import { BeforeAfter } from "./before-after";
import { CalloutStat, StatGrid } from "./callout-stat";
import { StackList } from "./stack-list";
import { IntegrationsDiagram } from "./integrations-diagram";

/**
 * Element + custom-component mapping passed to <MDXRemote>. HTML elements get
 * editorial typography here (rather than a prose plugin) so headings use the
 * serif and body copy stays measured and quiet.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 max-w-2xl font-serif text-2xl font-medium leading-snug tracking-tight text-ink"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mt-5 max-w-2xl text-[1.075rem] leading-[1.75] text-ink-soft"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent underline decoration-hairline decoration-1 underline-offset-2 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-[1.075rem] leading-[1.7] text-ink-soft marker:text-accent"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 max-w-2xl list-decimal space-y-2 pl-5 text-[1.075rem] leading-[1.7] text-ink-soft marker:text-muted"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1.5" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-10 max-w-2xl border-l-2 border-accent pl-6 font-serif text-2xl italic leading-snug text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-t border-hairline" />,
  code: (props) => (
    <code
      className="rounded-sm bg-paper-dim px-1.5 py-0.5 font-mono text-[0.9em] text-ink"
      {...props}
    />
  ),
  // Custom case-study building blocks
  Figure,
  BeforeAfter,
  CalloutStat,
  StatGrid,
  StackList,
  IntegrationsDiagram,
};
