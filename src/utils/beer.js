export const formatNumber = (n) => {
  const s = (Math.round(n * 100) / 100).toFixed(2).replace(/\.?0+$/, "");
  return s.replace(".", ",");
};

// Approximation de la robe (couleur de la bière) à partir de l'EBC
export const ebcToHex = (ebc) => {
  if (ebc < 8) return "#f3e5a8";
  if (ebc < 12) return "#eecf7c";
  if (ebc < 16) return "#dfb055";
  if (ebc < 20) return "#c98f38";
  if (ebc < 30) return "#a96b26";
  if (ebc < 40) return "#834a1b";
  return "#5c3312";
};