/**
 * Hand-drawn emoji, as inline SVG.
 *
 * Deliberately original artwork rather than a downloaded sticker: this site
 * goes to employers, so everything on it should be ours to use. Flat vector
 * (not faux-3D) so it sits alongside the editorial type instead of fighting it,
 * and scales to any size without going fuzzy.
 */

const SKIN = "#FFCC4D";
const SKIN_SHADE = "#F0B330";
const DARK = "#2A2A24";

export function EmojiDismayed({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="Dismayed face"
      className={className}
    >
      <circle cx="64" cy="64" r="58" fill={SKIN} />
      <path
        d="M64 122a58 58 0 0 0 58-58 58 58 0 0 1-116 0 58 58 0 0 0 58 58Z"
        fill={SKIN_SHADE}
        opacity=".35"
      />
      {/* worried brows */}
      <path
        d="M30 45c6-7 16-9 24-5"
        stroke={DARK}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M98 45c-6-7-16-9-24-5"
        stroke={DARK}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* droopy eyes */}
      <ellipse cx="44" cy="65" rx="9" ry="11" fill="#fff" />
      <ellipse cx="84" cy="65" rx="9" ry="11" fill="#fff" />
      <circle cx="44" cy="68" r="5.5" fill={DARK} />
      <circle cx="84" cy="68" r="5.5" fill={DARK} />
      {/* frown */}
      <path
        d="M46 98c5-8 13-12 22-9"
        stroke={DARK}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function EmojiThumbsUp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 128"
      role="img"
      aria-label="Thumbs up"
      className={className}
    >
      <circle cx="70" cy="64" r="54" fill={SKIN} />
      <path
        d="M70 118a54 54 0 0 0 54-54 54 54 0 0 1-108 0 54 54 0 0 0 54 54Z"
        fill={SKIN_SHADE}
        opacity=".35"
      />
      {/* happy eyes */}
      <path
        d="M50 56c3-5 9-5 12 0"
        stroke={DARK}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M84 56c3-5 9-5 12 0"
        stroke={DARK}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* open grin */}
      <path
        d="M48 78c6 14 34 14 40 0Z"
        fill={DARK}
      />
      <path d="M55 84c5 3 13 3 18 0Z" fill="#F2545B" />
      {/* thumb, coming in from the left */}
      <g>
        <rect
          x="2"
          y="62"
          width="26"
          height="42"
          rx="8"
          fill={SKIN}
          stroke={SKIN_SHADE}
          strokeWidth="3"
        />
        <path
          d="M28 104V70c0-4 3-6 6-8 5-3 8-8 8-15 0-6 4-9 8-8 5 1 6 6 5 12l-3 13h14c5 0 8 4 7 9l-6 24c-1 5-5 7-10 7H28Z"
          fill={SKIN}
          stroke={SKIN_SHADE}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
