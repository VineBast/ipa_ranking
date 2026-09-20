import { useState } from "react";
import BeerCan from "./BeerCan";
import RankBadge from "./RankBadge";
import Stars from "./Stars";
import { ebcToHex, formatNumber } from "../utils/beer";

export default function RankCard({ beer, rank, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(beer.image) && !imageFailed;

  const open = () => onOpen?.(beer);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <article
      onClick={open}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Voir la fiche de ${beer.name}`}
      className="group relative flex cursor-pointer flex-col rounded-3xl border border-white/10 bg-linear-to-b from-stone-800/70 via-stone-900 to-stone-950 p-6 shadow-xl shadow-black/40 outline-none transition duration-300 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-600/10 focus-visible:border-emerald-400/60 focus-visible:ring-2 focus-visible:ring-emerald-400/30"
    >
      {/* Numéro du classement */}
      <RankBadge rank={rank} />

      {/* Style de la bière */}
      <span className="absolute right-5 top-6 z-20 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
        {beer.style}
      </span>

      {/* Canette : centrée, qui dépasse légèrement du haut de la card */}
      <div className="relative z-10 -mt-16 flex justify-center pt-3">
        {hasImage ? (
          <img
            src={beer.image}
            alt={`Canette de ${beer.name}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-44 w-auto max-w-[10.5rem] rounded-2xl object-contain shadow-2xl shadow-black/50 ring-1 ring-white/10 transition duration-300 group-hover:-translate-y-1.5 group-hover:-rotate-2 sm:h-48"
          />
        ) : (
          <BeerCan
            beer={beer}
            className="h-44 w-auto transition duration-300 drop-shadow-2xl group-hover:-translate-y-1.5 group-hover:-rotate-2 sm:h-48"
          />
        )}
      </div>

      {/* Contenu */}
      <div className="mt-5 flex flex-1 flex-col items-center text-center">
        <h3 className="font-display text-2xl font-bold tracking-tight text-stone-50">
          {beer.name}
        </h3>
        <p className="mt-1 text-sm text-stone-400">{beer.brewery}</p>

        <div className="mt-4 flex flex-nowrap items-center justify-center gap-1 whitespace-nowrap text-[11px] font-bold tracking-tight text-stone-300">
          <span className="rounded-full border border-stone-700 bg-stone-800/80 px-1.5 py-1">
            {formatNumber(beer.abv)} % vol.
          </span>
          <span className="rounded-full border border-stone-700 bg-stone-800/80 px-1.5 py-1">
            {beer.ibuApprox ? "~" : ""}
            {beer.ibu} IBU<sup>*</sup>
          </span>
          <span className="flex items-center gap-1 rounded-full border border-stone-700 bg-stone-800/80 px-1.5 py-1">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full ring-1 ring-white/20"
              style={{ backgroundColor: ebcToHex(beer.ebc) }}
            />
            {beer.ebcApprox ? "~" : ""}
            {beer.ebc} EBC<sup>*</sup>
          </span>
        </div>

        <div className="mt-3">
          <Stars rating={beer.rating} note={beer.note} />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-stone-400 line-clamp-2">
          {beer.description}
        </p>

        {beer.notes && (
          <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-stone-500">
            {beer.notes}
          </p>
        )}

        <p className="mt-auto pt-6 text-sm font-semibold text-emerald-300 transition group-hover:text-emerald-200">
          Voir la fiche
          <span className="ml-1 inline-block transition group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </div>
    </article>
  );
}