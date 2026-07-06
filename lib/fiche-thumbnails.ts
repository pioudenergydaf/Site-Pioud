// Vignettes photo des cartes de fiches CEE (affichées en bandeau haut de carte).
// Les images sont définies dans lib/site-images.ts (SITE_IMAGES.fiches) —
// c'est là qu'il faut aller pour changer une vignette.

import { SITE_IMAGES, type SiteImage } from "@/lib/site-images";

export type FicheImage = SiteImage;

export const FICHE_IMG = SITE_IMAGES.fiches;

export type FicheTheme = keyof typeof FICHE_IMG;

// Association titre de fiche -> thème d'image. Les titres identiques (mêmes
// travaux sur des pages différentes) pointent vers le même thème.
const FICHE_THEME_BY_TITLE: Record<string, FicheTheme> = {
  // --- Points singuliers / calorifugeage / réseaux ---
  "Matelas isolant / Points singuliers": "pointsSinguliers",
  "Isolation d'un réseau hydraulique": "pointsSinguliers",
  "Isolation de points singuliers d'un réseau": "pointsSinguliers",
  "Isolation industrielle (calorifugeage)": "isolationIndustrielleCalorifugeage",
  "Raccordement réseau de chaleur": "pointsSinguliers",
  // --- Isolation combles / toitures / terrasses ---
  "Isolation toitures et combles": "isolationCombles",
  "Isolation toitures-terrasses": "isolationToituresTerrasseTertiaire",
  "Isolation des toitures-terrasses": "isolationToituresTerrasses",
  "Isolation des combles ou toitures": "isolationCombles",
  "Isolation de combles ou de toitures": "isolationCombles",
  // --- Isolation murs / planchers ---
  "Isolation des murs": "isolationMurs",
  "Isolation des planchers": "isolationPlancher",
  "Isolation d'un plancher": "isolationPlancher",
  // --- Fenêtres / vitrages ---
  "Fenêtres et vitrages isolants": "fenetreVitrageIsolant",
  "Fenêtre ou porte-fenêtre avec vitrage isolant": "fenetreVitrageIsolant",
  "Fenêtre ou porte-fenêtre à vitrage pariétodynamique": "vitragePariodynamique",
  // --- Pompes à chaleur / chaufferie ---
  "Pompe à chaleur air/eau": "pompeAirEau",
  "Pompe à chaleur eau/eau": "pompeEauEauSolEau",
  "Pompe à chaleur eau/eau ou sol/eau": "pompeEauEauSolEau",
  "Chauffe-eau thermodynamique": "chauffeEauThermodynamique",
  // --- PAC collective ---
  "Pompe à chaleur collective de type air/eau ou eau/eau pour l’eau chaude sanitaire":
    "pacCollectiveEcs",
  "Pompe à chaleur collective air/eau": "pacCollectiveAirEau",
  // --- Chaudière / bois / solaire / radiateur ---
  "Chaudière biomasse individuelle": "chaudiereBiomasseIndividuelle",
  "Appareil indépendant de chauffage au bois": "poeleBois",
  "Chaudière biomasse industrielle": "chaudiereBiomasseIndustrielle",
  "Système solaire combiné": "systemeSolaireCombine",
  "Chauffe-eau solaire individuel": "chauffeEauSolaire",
  "Radiateur basse température": "radiateurBasseTemperature",
  // --- Régulation / GTB ---
  "Régulation par sonde de température extérieure": "regulation",
  "Régulation par programmation horaire pièce par pièce": "regulationHorairePiece",
  "GTB (Gestion Technique du Bâtiment)": "pilotageData",
  // --- Éclairage LED ---
  "Éclairage LED": "eclairageLed",
  // --- Rénovation globale ---
  "Rénovation d'ampleur d'une maison individuelle": "renovationAmpleurMaison",
  "Rénovation globale d'un bâtiment résidentiel collectif": "renovationGlobaleCollectif",
  // --- Tertiaire (PAC réversible, géothermie, frigo, destratification) ---
  "Géothermie": "geothermieTertiaire",
  "PAC réversible air/air": "pacReversibleAirAir",
  "Fermeture meubles frigorifiques": "fermetureMeublesFrigorifiques",
  "Destratification d'air": "destratificationAir",
  // --- Industrie (moteurs / procédés) ---
  "Moteurs haut rendement": "moteursHautRendement",
  "Variateurs de vitesse": "variateursVitesse",
  "Stockage de chaleur fatale": "stockageChaleurFatale",
  "Air comprimé": "airComprime",
  "Récupération de chaleur sur compresseur": "industrie",
  "Isolation des bâtiments industriels": "isolationCombles",
  "GTB pour bâtiments industriels": "pilotageData",
};

// Retourne la vignette d'une carte de fiche CEE à partir de son titre.
// Repli sur un visuel de chantier générique si le titre n'est pas cartographié.
export function getFicheImage(title: string): FicheImage {
  const theme = FICHE_THEME_BY_TITLE[title] ?? "chantier";
  return FICHE_IMG[theme];
}
