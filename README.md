# 🍺 IPA Ranking

Classement personnel de **8 IPA** notées à la gorgée — **React + Vite + Tailwind CSS v4**.

🌐 En ligne : [https://ipa-ranking.vercel.app/](https://ipa-ranking.vercel.app/)

## ✨ Fonctionnalités

- **Cards de classement** `#1` → `#8` avec badge de rang :
  - Podium en dégradés verts (lime / émeraude / teal)
  - Places 6 → 8 en dégradés **vert → rouge** (de « déçue » à « franchement bof » 😄)
- **Canette SVG** générée, ou **photo réelle** qui dépasse légèrement du haut de la card
- **Responsive** : 1 colonne (mobile) → 4 colonnes (grand écran)
- **Notes sur 5** en étoiles, avec ABV, **IBU*** et **EBC*** (`*` = définitions en légende en bas de page, `~` = valeur approximative)
- **Modale « fiche bière »** au clic : description complète + liens vers la bière et la brasserie (`beerUrl` / `breweryUrl`)
- **FAQ** (5 questions/réponses) — format idéal pour les IA génératives (GEO)
- **SEO** : données structurées JSON-LD auto-générées depuis `beers.js`, Open Graph, balise canonical, `sitemap.xml` + `robots.txt`
- Titre d'onglet **dynamique** (affiche la bière sélectionnée)
- Thème dark stone + halos verts, polices Bricolage Grotesque + Inter
- Footer avec lien GitHub
- 🔒 **Porte 18+ désactivée** (contenu éditorial non commercial : aucune obligation légale) — le composant est conservé dans le code, prêt à réactiver

> Note : les filtres par style et la recherche sont présents dans le code mais commentés dans `App.jsx` (désactivés pour l'instant).

## 🚀 Démarrage

```bash
npm install
npm run dev        # développement http://localhost:5173
npm run build      # production → dist/
```

## 🔁 Réactiver la porte 18+

Le composant est conservé dans `src/components/AgeGate.jsx`. Pour le réactiver :

1. Dans `src/App.jsx`, décommente l'import :
   ```js
   import AgeGate, { OF_AGE_KEY } from "./components/AgeGate";
   ```
2. Ajoute l'état `ofAge` (initialisé depuis `localStorage`, clé `ipa-ranking-of-age`)
3. Ajoute le retour anticipé après les hooks :
   ```js
   if (!ofAge) {
     return <AgeGate onConfirm={() => setOfAge(true)} />;
   }
   ```

Les instructions détaillées sont aussi commentées dans `src/App.jsx`.

## 🏗️ Structure

```
src/
├── App.jsx               # Header, grille responsive, FAQ, légende, modale, titres dynamiques
├── data/beers.js         # Ton classement perso (notes /5, style, ABV, IBU, EBC, liens, images)
├── utils/beer.js         # Formatters (nombre, couleur de la robe EBC)
└── components/
    ├── AgeGate.jsx       # Porte 18+ (désactivée, conservée pour réactivation)
    ├── BeerCan.jsx       # Canette SVG générée (repli si pas d'image)
    ├── RankCard.jsx      # Card du classement (cliquable, badge #n + canette débordante)
    ├── RankCardModal.jsx # Fiche bière modale (✕, clic fond ou Échap = fermer)
    ├── RankBadge.jsx     # Badge de rang #n (podium / neutre / dégradés vert→rouge)
    └── Stars.jsx         # Note perso /5 en étoiles
```

## 🍺 Modale « fiche bière »

Un clic (ou Entrée/Espace) sur une card ouvre la fiche complète : note /5,
°ABV, IBU/EBC, description entière et liens. Fermeture : bouton ✕, clic sur le
fond sombre ou touche `Échap`.

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

## 🌐 SEO & GEO

- **JSON-LD** (données structurées) : les schémas `WebSite` + `ItemList` (avec les 8 bières,
  leur brasserie, ABV/IBU/EBC et notes) sont **générés depuis `beers.js`** dans `index.html`
  → utilisables par Google (rich results) et par les IA génératives (GEO), même sans JS
- **Open Graph** + **Twitter Card** : `og:url`, `og:image`, descriptions pour le partage social
- **Canonical**, `robots.txt` et `sitemap.xml` configurés pour `https://ipa-ranking.vercel.app/`

Si le domaine change, mets à jour les URLs dans `index.html`, `public/robots.txt` et `public/sitemap.xml`.

## 🚀 Déploiement

Le projet est branché sur **Vercel** (lié au dépôt GitHub `VineBast/ipa_ranking`) :
chaque push sur `main` redéploie automatiquement le site.