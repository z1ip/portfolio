/**
 * Theme switching, and the one non-obvious thing about it.
 *
 * The palette lives in unregistered CSS custom properties (--ink, --paper, …).
 * When `data-theme` flips, any element carrying a `transition` on color or
 * background-color freezes at its OLD value and never lands on the new one —
 * so in light mode the header still painted dark-theme ink on a light ground.
 * Verified directly: setting `transition: none` on a stuck element snaps it to
 * the correct color immediately.
 *
 * So: inject a `transition: none !important` <style>, flip the theme, then drop
 * the style two frames later once the new colors have painted. A CSS class
 * can't do this job — Tailwind doesn't emit hand-written classes into the
 * compiled sheet, so the rule never reaches the page.
 */

export const THEME_STORAGE_KEY = "theme";

/** Runs before first paint, inlined into <head>. Keep it dependency-free. */
export const THEME_INIT_SCRIPT = `(function(){
var d=document.documentElement;
var s=document.createElement('style');
s.setAttribute('data-theme-init','');
s.textContent='*,*::before,*::after{transition:none !important;animation:none !important}';
(document.head||d).appendChild(s);
try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');d.dataset.theme=(t==='light'||t==='dark')?t:'dark';}
catch(e){d.dataset.theme='dark';}
var r=function(){s.remove();};
requestAnimationFrame(function(){requestAnimationFrame(r);});
setTimeout(r,150);
})();`;

/** Flip the theme at runtime, suppressing transitions across the change. */
export function applyTheme(next: "dark" | "light") {
  const root = document.documentElement;
  const style = document.createElement("style");
  style.setAttribute("data-theme-init", "");
  style.textContent =
    "*,*::before,*::after{transition:none !important;animation:none !important}";
  document.head.appendChild(style);

  root.dataset.theme = next;

  // rAF gets us the earliest safe removal; the timeout is the guarantee —
  // rAF never fires in a backgrounded or non-compositing tab, and leaving the
  // style behind would kill every transition on the page for good.
  const remove = () => style.remove();
  requestAnimationFrame(() => requestAnimationFrame(remove));
  setTimeout(remove, 150);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    /* private mode — the theme still applies for this session */
  }
}
