import { useState } from "react";

export const OF_AGE_KEY = "ipa-ranking-of-age";

export default function AgeGate({ onConfirm }) {
  const [denied, setDenied] = useState(false);

  const confirm = () => {
    try {
      localStorage.setItem(OF_AGE_KEY, "1");
    } catch {
      /* stockage indisponible : on continue quand même */
    }
    onConfirm();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950 px-4 py-10">
      {/* Halos décoratifs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-[24rem] w-[30rem] rounded-full bg-green-600/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-linear-to-b from-stone-800/70 via-stone-900 to-stone-950 p-8 text-center shadow-2xl shadow-black/60">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border bg-linear-to-b from-emerald-200 via-emerald-400 to-emerald-600 text-2xl shadow-lg ring-4 ring-emerald-400/20">
          <span aria-hidden="true">🍺</span>
        </div>

        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-stone-50 sm:text-4xl">
          18 ans et plus ?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Ce site présente des bières artisanales et leurs taux d'alcool. Pour
          accéder au classement, tu dois avoir{" "}
          <span className="font-semibold text-stone-200">18 ans ou plus</span>.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={confirm}
            className="rounded-full border border-emerald-400/40 bg-emerald-400/15 px-6 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400/25"
          >
            J'ai 18 ans ou plus — Entrer
          </button>
          <button
            type="button"
            onClick={() => setDenied(true)}
            className="rounded-full border border-stone-700 bg-stone-900/60 px-6 py-3 text-sm font-semibold text-stone-400 transition hover:border-stone-500 hover:text-stone-200"
          >
            Je n'ai pas 18 ans
          </button>
        </div>

        {denied && (
          <p className="mt-4 text-xs text-stone-500">
            Désolé, ce classement est réservé aux adultes de 18 ans et plus.
          </p>
        )}

        <p className="mt-6 text-xs text-stone-600">
          🔒 Ta validation est enregistrée uniquement sur cet appareil — aucune donnée n'est transmise.
        </p>
      </div>
    </div>
  );
}