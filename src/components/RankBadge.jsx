const PODYUM_BADGES = {
  1: {
    badge:
      "from-emerald-200 via-emerald-400 to-emerald-600 text-stone-950 border-emerald-100/70 shadow-emerald-500/30",
    ring: "ring-emerald-400/40",
  },
  2: {
    badge:
      "from-teal-100 via-teal-300 to-teal-500 text-stone-900 border-teal-200/70 shadow-teal-400/30",
    ring: "ring-teal-300/40",
  },
  3: {
    badge:
      "from-lime-300 via-green-500 to-green-700 text-stone-950 border-lime-200/60 shadow-green-500/30",
    ring: "ring-green-400/40",
  },
};

const SIZES = {
  md: "left-5 top-5 h-12 w-12 text-lg",
  lg: "left-4 top-4 h-14 w-14 text-2xl",
};

export default function RankBadge({ rank, size = "md" }) {
  const podium = PODYUM_BADGES[rank];
  const base = podium
    ? podium.badge
    : "from-white/15 to-white/5 text-stone-200 border-white/20 shadow-black/40";
  const ring = podium ? podium.ring : "ring-white/10";

  return (
    <div
      className={`absolute ${SIZES[size]} z-20 grid place-items-center rounded-full border bg-linear-to-b shadow-lg ring-4 ${ring} ${base}`}
    >
      #{rank}
    </div>
  );
}