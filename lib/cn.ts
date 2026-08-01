/**
 * Tiny class-name joiner. Filters out falsy values so conditional classes
 * read cleanly at the call site. Deliberately dependency-free.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
