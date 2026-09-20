import { useMemo, useState } from "react";
import { beers } from "./data/beers";
import RankCard from "./components/RankCard";
import RankCardModal from "./components/RankCardModal";
import AgeGate, { OF_AGE_KEY } from "./components/AgeGate";

function App() {
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Toutes");
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [ofAge, setOfAge] = useState(() => {
    try {
      return localStorage.getItem(OF_AGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const styles = useMemo(
    () => ["Toutes", ...new Set(beers.map((b) => b.style))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return beers
      .map((beer, index) => ({ ...beer, rank: index + 1 }))
      .filter((beer) => selectedStyle === "Toutes" || beer.style === selectedStyle)
      .filter(
        (beer) =>
          !q ||
          `${beer.name} ${beer.brewery} ${beer.notes ?? ""}`
            .toLowerCase()
            .includes(q)
      )
      .map((beer, index) => ({ ...beer, rank: index + 1 }));
  }, [query, selectedStyle]);

  // Porte d'entrée : validation 18+ (mémorisée en localStorage)
  if (!ofAge) {
    return <AgeGate onConfirm={() => setOfAge(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Halos décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[24rem] w-[30rem] rounded-full bg-green-600/10 blur-3xl" />
        <div className="absolute -left-24 top-1/3 h-[20rem] w-[20rem] rounded-full bg-lime-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <span aria-hidden="true">🍺</span> World Ranking by Cam & Vine
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-stone-50 sm:text-6xl">
            Le classement des
            <span className="block bg-linear-to-r from-lime-300 via-emerald-400 to-green-600 bg-clip-text text-transparent">
              meilleures IPA
            </span>
            <span className="block">
              et{" "}
              <span className="bg-linear-to-r from-emerald-400 via-green-500 to-red-600 bg-clip-text text-transparent">
                des pires
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-stone-400 sm:text-lg">
            Sélection d'IPA, notées à la gorgée. De la première à la dernière
            place : laquelle mérite vraiment ta première gorgée ?
          </p>
        </header>

        {/* Filtres + recherche */}
        {/*         <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-2">
            {styles.map((style) => {
              const active = style === selectedStyle;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-emerald-400/60 bg-emerald-400/15 text-emerald-200 shadow-md shadow-emerald-500/10"
                      : "border-stone-700/80 bg-stone-900/60 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>

          <label className="relative w-full max-w-md">
            <span className="sr-only">Rechercher une bière</span>
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-stone-500"
              aria-hidden="true"
            >
              <path d="M8.5 2a6.5 6.5 0 104.9 10.7l3.4 3.4 1.4-1.4-3.4-3.4A6.5 6.5 0 008.5 2zm0 2a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une IPA, une brasserie, un houblon…"
              className="w-full rounded-full border border-stone-700/80 bg-stone-900/70 py-3 pl-11 pr-4 text-sm text-stone-200 placeholder-stone-500 shadow-inner outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
            />
          </label>
        </div> */}

        {/* Compteur */}
        <p className="mt-8 text-center text-xs font-semibold uppercase tracking-widest text-stone-500">
          {filtered.length} bière{filtered.length > 1 ? "s" : ""} classée
          {filtered.length > 1 ? "s" : ""}
        </p>

        {/* Grille des cards */}
        <section className="mt-4 pb-24" aria-label="Classement des IPA">
          {filtered.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((beer) => (
                <RankCard
                  key={beer.id}
                  beer={beer}
                  rank={beer.rank}
                  onOpen={() => setSelectedBeer(beer)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-5xl" aria-hidden="true">
                🕵️
              </p>
              <p className="mt-4 text-lg font-semibold text-stone-300">
                Aucune IPA trouvée
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Essayez un autre nom ou un autre style de houblon.
              </p>
            </div>
          )}
        </section>

        {/* Légende : définitions IBU/EBC */}
        <div className="mx-auto mt-6 max-w-md space-y-1.5 text-center text-xs leading-relaxed text-stone-500">
          <p>
            <span className="font-bold text-stone-300">*</span>&nbsp; IBU —
            International Bitterness Units : échelle de l'amertume (plus c'est
            élevé, plus c'est amer).
          </p>
          <p>
            <span className="font-bold text-stone-300">*</span>&nbsp; EBC —
            European Brewery Convention : échelle de coloration de la bière
            (plus c'est élevé, plus la robe est foncée).
          </p>
          <p className="pt-1 text-stone-600">~ = valeur approximative.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-sm text-stone-500">
        <p>
          Fait avec du houblon, un zeste de cirton, et parfois beaucoup d'amertume — classement
          purement subjectif.
        </p>
        <a
          href="https://github.com/VineBast"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-stone-700/80 bg-stone-900/60 px-4 py-2 text-sm font-semibold text-stone-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 fill-current"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.38-5.27 5.66.41.36.78 1.05.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          VineBast
        </a>
      </footer>

      {/* Fiche bière (modale) */}
      {selectedBeer && (
        <RankCardModal
          beer={selectedBeer}
          onClose={() => setSelectedBeer(null)}
        />
      )}
    </div>
  );
}

export default App;