import { formatNumber } from "../utils/beer";

export default function Stars({ rating, note, starClass = "h-4 w-4" }) {
  const filled = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Ma note : ${note} sur 5`}
    >
      <div className="flex gap-0.5" role="img" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`${starClass} ${i < filled ? "fill-emerald-400" : "fill-stone-700"}`}
          >
            <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-stone-300">
        {formatNumber(note)}
        <span className="ml-0.5 text-stone-500">/5</span>
      </span>
    </div>
  );
}