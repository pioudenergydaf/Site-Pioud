// Vignettes photo des cartes de fiches CEE (affichées en bandeau haut de carte).
// Chaque entrée = { src, alt }. On réutilise des visuels déjà présents dans le
// projet (donc garantis fonctionnels) + les photos locales dans /public/images.
//
// Pour affiner une vignette : déposer une photo dans public/images/fiches/ et
// remplacer le `src` du thème correspondant ci-dessous — toutes les cartes qui
// utilisent ce thème seront mises à jour d'un coup.

export type FicheImage = { src: string; alt: string };

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=70`;

export const FICHE_IMG = {
  isolationCombles: {
    src: U("1753717202579-9c6ac3592b62"),
    alt: "Isolation des combles et toitures d'un bâtiment",
  },
  isolationThermique: {
    src: U("1768321917437-1f1f6ae2ad28"),
    alt: "Travaux d'isolation thermique",
  },
  pointsSinguliers: {
    src: "/images/point-singulier-2.jpeg",
    alt: "Matelas isolants posés sur les points singuliers d'un réseau",
  },
  chaufferie: {
    src: "/images/pac-chaufferie.jpg",
    alt: "Chaufferie équipée de pompes à chaleur",
  },
  pacCollective: {
    src: "/images/pac-collective-bar-th-179.webp",
    alt: "Pompe à chaleur collective en chaufferie",
  },
  renovation: {
    src: U("1753977725475-41b221add2c0"),
    alt: "Chantier de rénovation énergétique",
  },
  chantier: {
    src: U("1752594756894-bcf378884a09"),
    alt: "Ouvriers sur un chantier de rénovation",
  },
  batimentModerne: {
    src: U("1742675416657-55d043ce8dce"),
    alt: "Bâtiment moderne à haute performance énergétique",
  },
  immeubleCollectif: {
    src: U("1460317442991-0ec209397118"),
    alt: "Immeuble résidentiel collectif",
  },
  industrie: {
    src: U("1763906265376-363d9681a3ad"),
    alt: "Site industriel",
  },
  supervision: {
    src: U("1766414629984-73a93e7caba0"),
    alt: "Supervision technique d'une installation",
  },
  fenetres: {
    src: U("1753893558430-3abab5adf4e0"),
    alt: "Fenêtres et vitrages isolants",
  },
  regulation: {
    src: U("1770625467384-304e461ef1be"),
    alt: "Régulation et pilotage du chauffage",
  },
  chauffage: {
    src: U("1554475499-4e40aa2b9e75"),
    alt: "Système de chauffage performant",
  },
  pilotageData: {
    src: U("1460925895917-afdab827c52f"),
    alt: "Gestion technique et supervision des données",
  },
} as const;

export type FicheTheme = keyof typeof FICHE_IMG;

// Association titre de fiche -> thème d'image. Les titres identiques (mêmes
// travaux sur des pages différentes) pointent vers le même thème.
const FICHE_THEME_BY_TITLE: Record<string, FicheTheme> = {
  // --- Points singuliers / calorifugeage / réseaux ---
  "Matelas isolant / Points singuliers": "pointsSinguliers",
  "Isolation d'un réseau hydraulique": "pointsSinguliers",
  "Isolation de points singuliers d'un réseau": "pointsSinguliers",
  "Isolation industrielle (calorifugeage)": "pointsSinguliers",
  "Raccordement réseau de chaleur": "pointsSinguliers",
  // --- Isolation combles / toitures / terrasses ---
  "Isolation toitures et combles": "isolationCombles",
  "Isolation toitures-terrasses": "isolationCombles",
  "Isolation des toitures-terrasses": "isolationCombles",
  "Isolation des combles ou toitures": "isolationCombles",
  "Isolation de combles ou de toitures": "isolationCombles",
  // --- Isolation murs / planchers ---
  "Isolation des murs": "isolationThermique",
  "Isolation des planchers": "isolationThermique",
  "Isolation d'un plancher": "isolationThermique",
  // --- Fenêtres / vitrages / volets ---
  "Fenêtres et vitrages isolants": "fenetres",
  "Fenêtre ou porte-fenêtre avec vitrage isolant": "fenetres",
  "Fermeture isolante (volets)": "fenetres",
  // --- Pompes à chaleur / chaufferie ---
  "Pompe à chaleur air/eau": "chaufferie",
  "Pompe à chaleur eau/eau": "chaufferie",
  "Pompe à chaleur eau/eau ou sol/eau": "chaufferie",
  "Géothermie": "chaufferie",
  "PAC réversible air/air": "chaufferie",
  "Chauffe-eau thermodynamique": "chaufferie",
  // --- PAC collective ---
  "Pompe à chaleur collective de type air/eau ou eau/eau pour l’eau chaude sanitaire":
    "pacCollective",
  "Pompe à chaleur collective air/eau": "pacCollective",
  // --- Chaudière / bois / solaire / radiateur ---
  "Chaudière biomasse individuelle": "chaufferie",
  "Appareil indépendant de chauffage au bois": "chaufferie",
  "Chaudière biomasse industrielle": "chaufferie",
  "Système solaire combiné": "chauffage",
  "Chauffe-eau solaire individuel": "chauffage",
  "Radiateur basse température": "chauffage",
  // --- Régulation / GTB ---
  "Régulation par sonde de température extérieure": "regulation",
  "Régulation par programmation horaire pièce par pièce": "regulation",
  "GTB (Gestion Technique du Bâtiment)": "pilotageData",
  // --- Éclairage LED ---
  "Éclairage LED": "supervision",
  "Éclairage LED industriel": "supervision",
  // --- Rénovation globale ---
  "Rénovation globale d'une maison individuelle": "renovation",
  "Rénovation d'ampleur d'une maison individuelle": "renovation",
  "Rénovation globale d'un bâtiment résidentiel collectif": "renovation",
  // --- Industrie (moteurs / procédés / frigo / air) ---
  "Moteurs haut rendement": "industrie",
  "Variateurs de vitesse": "industrie",
  "Récupération de chaleur fatale": "industrie",
  "Stockage de chaleur fatale": "industrie",
  "Air comprimé": "industrie",
  "Fermeture meubles frigorifiques": "industrie",
  "Destratification d'air": "industrie",
};

// Retourne la vignette d'une carte de fiche CEE à partir de son titre.
// Repli sur un visuel de chantier générique si le titre n'est pas cartographié.
export function getFicheImage(title: string): FicheImage {
  const theme = FICHE_THEME_BY_TITLE[title] ?? "chantier";
  return FICHE_IMG[theme];
}
