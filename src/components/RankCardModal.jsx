import { useEffect, useState } from "react";
import BeerCan from "./BeerCan";
import Stars from "./Stars";
import RankBadge from "./RankBadge";
import { ebcToHex, formatNumber } from "../utils/beer";

function ExternalLink() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-3.5 w-3.5 fill-current"
    >
      <path d="M7 4v1.5H4.5v10h10V13H16v2.5a1 1 0 01-1 1H3.5a1 1 0 01-1-1V5a1 1 0 011-1H7zm5-2h5.5v5.5h-1.5V4.9l-7.2 7.2-1-1L14.9 4h-3V2z" />
    </svg>
  );
}

function LinkPill({ href, label }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:border-emerald-400/60 hover:bg-emerald-400/20"
      >
        {label}
        <ExternalLink />
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      title="Lien à ajouter pour toi dans src/data/beers.js (champ beerUrl ou breweryUrl)"
      className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-stone-700 bg-stone-900/50 px-4 py-2.5 text-sm font-semibold text-stone-500"
    >
      {label}
      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">
        à venir
      </span>
    </span>
  );
}

export default function RankCardModal({ beer, onClose }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(beer.image) && !imageFailed;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto px-4 pt-20 pb-10 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={`Fiche de la bière ${beer.name}`}
    >
      {/* Fond cliquable pour fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la fiche"
        className="fixed inset-0 z-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
      />

      <article className="relative z-10 mx-auto max-w-lg rounded-3xl border border-white/10 bg-linear-to-b from-stone-800/70 via-stone-900 to-stone-950 p-6 shadow-2xl shadow-black/60">
        {/* Fermer */}
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Fermer"
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-stone-800/90 text-stone-300 backdrop-blur transition hover:border-white/30 hover:text-white"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M5.3 4.3 10 9l4.7-4.7 1.4 1.4L11.4 10l4.7 4.7-1.4 1.4L10 11.4l-4.7 4.7-1.4-1.4L8.6 10 3.9 5.3l1.4-1.4z" />
          </svg>
        </button>

        {/* Rang */}
        <RankBadge rank={beer.rank} size="lg" />

        {/* Canette : même effet débordant, en plus grand */}
        <div className="relative z-10 -mt-16 flex justify-center pt-3">
          {hasImage ? (
            <img
              src={beer.image}
              alt={`Canette de ${beer.name}`}
              onError={() => setImageFailed(true)}
              className="h-52 w-auto max-w-[13rem] rounded-2xl object-contain shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:h-60"
            />
          ) : (
            <BeerCan
              beer={beer}
              className="h-52 w-auto drop-shadow-2xl sm:h-60"
            />
          )}
        </div>

        {/* Contenu */}
        <div className="mt-4 flex flex-col items-center text-center">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            {beer.style}
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-stone-50">
            {beer.name}
          </h2>
          <p className="mt-2 text-base text-stone-400">{beer.brewery}</p>

          <div className="mt-4">
            <Stars rating={beer.rating} note={beer.note} starClass="h-5 w-5" />
          </div>

          <div className="mt-5 flex flex-nowrap items-center justify-center gap-1.5 whitespace-nowrap text-xs font-bold tracking-tight text-stone-300">
            <span className="rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1">
              {formatNumber(beer.abv)} % vol.
            </span>
            <span className="rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1">
              {beer.ibuApprox ? "~" : ""}
              {beer.ibu} IBU<sup>*</sup>
            </span>
            <span className="flex items-center gap-1 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full ring-1 ring-white/20"
                style={{ backgroundColor: ebcToHex(beer.ebc) }}
              />
              {beer.ebcApprox ? "~" : ""}
              {beer.ebc} EBC<sup>*</sup>
            </span>
          </div>

          {beer.notes && (
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-stone-500">
              {beer.notes}
            </p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-stone-300">
            {beer.description}
          </p>

          {/* Liens (à renseigner dans src/data/beers.js) */}
          <div className="mt-6 w-full border-t border-white/10 pt-5">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-stone-500">
              Liens
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <LinkPill href={beer.beerUrl} label="Site de la bière" />
              <LinkPill href={beer.breweryUrl} label="Site de la brasserie" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}