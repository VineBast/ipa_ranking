import { useId } from "react";

/**
 * Canette de bière dessinée en SVG.
 * On peut remplacer facilement par une vraie photo en ajoutant
 * un champ `image` dans src/data/beers.js et en rendant un <img>.
 */
export default function BeerCan({ beer, className = "" }) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const bodyGrad = `body-${uid}`;
  const sheenGrad = `sheen-${uid}`;

  const starPath =
    "M87 116 L82.59 117.88 L82.16 122.66 L79.01 119.04 L74.34 120.11 " +
    "L76.8 116 L74.34 111.89 L79.01 112.96 L82.16 109.34 L82.59 114.12 Z";

  return (
    <svg
      viewBox="0 0 160 250"
      className={className}
      role="img"
      aria-label={`Canette de ${beer.name}`}
    >
      <defs>
        <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={beer.colorA} />
          <stop offset="55%" stopColor={beer.colorB} />
          <stop offset="100%" stopColor={beer.colorA} />
        </linearGradient>
        <linearGradient id={sheenGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base de la canette */}
      <ellipse cx="80" cy="226" rx="44" ry="10" fill="#000000" opacity="0.35" />
      <ellipse cx="80" cy="224" rx="42" ry="9" fill={beer.colorB} />

      {/* Corps de la canette */}
      <rect
        x="37"
        y="26"
        width="86"
        height="196"
        rx="10"
        fill={`url(#${bodyGrad})`}
      />

      {/* Reflet sur le corps */}
      <rect
        x="46"
        y="36"
        width="14"
        height="176"
        rx="7"
        fill={`url(#${sheenGrad})`}
      />

      {/* Couvercle */}
      <ellipse cx="80" cy="24" rx="44" ry="9" fill={beer.colorA} />
      <ellipse
        cx="80"
        cy="24"
        rx="38"
        ry="7"
        fill="#000000"
        opacity="0.18"
      />
      {/* Anneau de la languette */}
      <ellipse
        cx="90"
        cy="24"
        rx="10"
        ry="3"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <circle cx="99" cy="24" r="2.5" fill="#ffffff" opacity="0.85" />

      {/* Étiquette */}
      <rect
        x="42"
        y="96"
        width="76"
        height="80"
        rx="6"
        fill="#000000"
        opacity="0.22"
      />
      <path d={starPath} fill="#ffffff" opacity="0.95" />
      <text
        x="80"
        y="144"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        letterSpacing="1.5"
        fill="#ffffff"
        opacity="0.95"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {beer.brandShort}
      </text>
      <line
        x1="60"
        y1="152"
        x2="100"
        y2="152"
        stroke="#ffffff"
        strokeOpacity="0.4"
      />
      <text
        x="80"
        y="164"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        letterSpacing="2"
        fill="#ffffff"
        opacity="0.6"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {beer.styleShort.toUpperCase()}
      </text>
    </svg>
  );
}