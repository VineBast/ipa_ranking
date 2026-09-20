# 🍺 IPA Ranking

Classement des 10 meilleures bières IPA — React + Vite + Tailwind CSS.

## ✨ Fonctionnalités

- **Cards de classement** avec numéro `#1`, `#2`, `#3`… et badge podium (or, argent, bronze)
- **Canette de bière** dessinée en SVG, centrée en haut de la card et **qui dépasse légèrement** du bord
- **Responsive** : 1 colonne (mobile) → 4 colonnes (grand écran)
- Filtres par style de bière (DIPA, NEIPA, West Coast…) + recherche par nom, brasserie ou houblon
- Fiche complète : note perso /5, ABV, IBU et **EBC** (couleur de la robe) avec pastille colorée
- IBU et EBC approximatifs signalés par un **`*`** avec légende en bas de page
- **Modale « fiche bière »** au clic sur une card : toutes les infos en plus grand, plus les liens
  vers le site de la bière et de la brasserie (`beerUrl` / `breweryUrl` à renseigner)
- Dégradés sombres, halos verts, polices Bricolage Grotesque + Inter

## 🚀 Démarrage

```bash
npm install
npm run dev
```

## 🏗️ Structure

```
src/
├── App.jsx               # Header, filtres, recherche, grille responsive, modale
├── data/beers.js         # Ton classement perso (notes /5, style, ABV, IBU, EBC, liens)
├── utils/beer.js         # Formatters (nombre, couleur de la robe EBC)
└── components/
    ├── BeerCan.jsx       # Canette SVG générée (repli si pas d'image)
    ├── RankCard.jsx      # Card du classement (cliquable, badge #n + canette débordante)
    ├── RankCardModal.jsx # Fiche bière modale (échap/clic fond = fermer)
    ├── RankBadge.jsx     # Badge de rang #n (podium ou neutre)
    └── Stars.jsx         # Note perso /5 en étoiles
```

## 🍺 Modale « fiche bière »

Un clic (ou Entrée/Espace) sur une card ouvre la fiche complète : même style
en plus grand, avec la note, les °/IBU/EBC, la description entière et les liens.
Fermeture : bouton ✕, clic sur le fond sombre ou touche `Échap`.

Pour renseigner les liens sur chaque bière, remplis ces deux champs dans `src/data/beers.js` :

```js
beerUrl: "https://www.bapbap.fr/biere/guinguette", // 🍺 site de la bière
breweryUrl: "https://www.bapbap.fr",               // 🏭 site de la brasserie
```

Si un lien manque, le bouton s'affiche en pointillés « à venir » dans la fiche.

## 📸 Ajouter tes photos locales

Les bières sans `image` affichent provisoirement une canette SVG verte.
Pour mettre tes vraies canettes :

1. Copie les photos dans `public/` (ex. `public/bapbap_ginguette.png`)
2. Dans `src/data/beers.js`, renseigne l'URL locale sur la bière :

```js
image: "/bapbap_ginguette.png",
```

La card affiche ta photo, centrée et débordant légèrement du haut.
Si une image est introuvable, la canette SVG s'affiche automatiquement.