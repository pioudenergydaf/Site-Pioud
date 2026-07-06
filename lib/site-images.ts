// ════════════════════════════════════════════════════════════════════════
//  IMAGES DU SITE — FICHIER CENTRAL UNIQUE
// ════════════════════════════════════════════════════════════════════════
//
//  MODE D'EMPLOI (pour changer une image, une seule ligne à modifier) :
//  1. Repérez l'image grâce à son commentaire (page + carte/section).
//  2. Remplacez la valeur de `src` :
//       • soit par un fichier que vous déposez dans public/images/
//         → ex : src: "/images/isolation-combles.jpg"
//       • soit par une URL directe Unsplash/Pexels
//         → ex : src: "https://images.unsplash.com/photo-...."
//  3. C'est tout. Adaptez si besoin le texte `alt` (description de l'image).
//
// ════════════════════════════════════════════════════════════════════════

export type SiteImage = {
  src: string;
  alt: string;
  // Optionnel : ajuste le cadrage si l'image est mal centrée en recadrage
  // automatique (ex: "center 20%", "center top").
  position?: string;
};

// Raccourci pour les URLs Unsplash (garde une taille/qualité homogène).
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE_IMAGES = {
  // ─────────────────────────────────────────────────────────────
  //  PAGE ACCUEIL (app/page.tsx)
  // ─────────────────────────────────────────────────────────────
  // Le fond du hero est une vidéo : public/videos/hero-bg.mp4
  // (image de secours : public/videos/hero-poster.jpg)
  accueil: {
    // Section « Qui sommes-nous » — image de droite
    quiSommesNous: {
      src: U("1565599573128-ae3ef5c9f478"),
      alt: "Immeuble végétalisé de type Bosco Verticale, symbole de la transition énergétique des bâtiments",
    },
    // Section « Nos secteurs » — image de gauche
    nosSecteurs: {
      src: U("1600880292203-757bb62b4baf"),
      alt: "Sites multi-secteurs accompagnés",
    },
    // Section « Nos clients » — image de droite
    nosClients: {
      src: U("1486406146926-c627a92ad1ab"),
      alt: "Siège d'une entreprise cliente",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE PARTICULIERS (app/particuliers/page.tsx)
  // ─────────────────────────────────────────────────────────────
  particuliers: {
    hero: {
      src: U("1752594756894-bcf378884a09", 1700),
      alt: "Accompagnement des particuliers en rénovation énergétique",
    },
    // Vignettes des 5 thématiques (grille de navigation)
    themeIsolation: {
      src: U("1768321917437-1f1f6ae2ad28", 1500),
      alt: "Isolation thermique",
    },
    themeChauffage: {
      src: U("1554475499-4e40aa2b9e75", 1500),
      alt: "Chauffage et eau chaude",
    },
    themeFenetres: {
      src: U("1753893558430-3abab5adf4e0", 1500),
      alt: "Fenêtres et menuiseries",
    },
    themeRegulation: {
      src: U("1770625467384-304e461ef1be", 1500),
      alt: "Régulation et pilotage",
    },
    themeRenovation: {
      src: U("1753893558281-9acda0662bbd", 1500),
      alt: "Rénovation globale",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGES PARTICULIERS — détail par thématique (héros + sections)
  // ─────────────────────────────────────────────────────────────
  isolation: {
    hero: {
      src: U("1768321917437-1f1f6ae2ad28", 1700),
      alt: "Travaux d'isolation thermique d'une maison",
    },
    // Section « Isolation des combles »
    combles: {
      src: U("1753717202579-9c6ac3592b62"),
      alt: "Isolation des combles d'une maison",
    },
  },
  chauffage: {
    hero: {
      src: "/images/chauffage-eau-chaude.png",
      alt: "Pieds au chaud devant un feu de cheminée",
    },
  },
  fenetres: {
    hero: {
      src: "/images/fenetres-menuiseries.webp",
      alt: "Fenêtres et menuiseries",
      position: "center 30%",
    },
  },
  regulation: {
    hero: {
      src: "/images/regulation-pilotage.jpeg",
      alt: "Main réglant un thermostat de régulation du chauffage",
    },
  },
  renovationGlobale: {
    hero: {
      src: "/images/renovation-globale-hero.webp",
      alt: "Chantier de rénovation globale d'une maison individuelle",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE PROFESSIONNELS (app/professionnels/page.tsx)
  // ─────────────────────────────────────────────────────────────
  professionnels: {
    hero: {
      src: U("1742675416657-55d043ce8dce", 1600),
      alt: "Bâtiments professionnels accompagnés en CEE",
    },
    // Bloc « Tertiaire »
    tertiaire: {
      src: U("1742675416657-55d043ce8dce", 1500),
      alt: "Bâtiment de bureaux tertiaire",
    },
    // Bloc « Industrie »
    industrie: {
      src: U("1763906265376-363d9681a3ad", 1500),
      alt: "Site industriel pour programme CEE",
    },
    // Bloc « Collectif »
    collectif: {
      src: U("1460317442991-0ec209397118", 1500),
      alt: "Immeubles résidentiels collectifs et copropriétés",
    },
    // Section « Supervision »
    supervision: {
      src: U("1766414629984-73a93e7caba0"),
      alt: "Supervision technique d'un projet tertiaire et industriel",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE PROFESSIONNELS / TERTIAIRE (app/professionnels/tertiaire/page.tsx)
  // ─────────────────────────────────────────────────────────────
  tertiaire: {
    hero: {
      src: U("1742675416657-55d043ce8dce", 1700),
      alt: "Bâtiment tertiaire performant",
    },
    // Section « Notre accompagnement »
    accompagnement: {
      src: U("1769699903260-ff85271faa4f"),
      alt: "Bâtiment tertiaire en amélioration énergétique",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE PROFESSIONNELS / INDUSTRIE (app/professionnels/industrie/page.tsx)
  // ─────────────────────────────────────────────────────────────
  industrie: {
    hero: {
      src: U("1763906265376-363d9681a3ad", 1700),
      alt: "Site industriel accompagné en CEE",
    },
    // Section « Accompagnement »
    accompagnement: {
      src: U("1766414629984-73a93e7caba0"),
      alt: "Accompagnement d'un site industriel",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE PROFESSIONNELS / COLLECTIF (app/professionnels/collectif/page.tsx)
  // ─────────────────────────────────────────────────────────────
  collectif: {
    hero: {
      src: U("1472220625704-91e1462799b2", 1700),
      alt: "Copropriété et habitat résidentiel collectif",
    },
    // Section « Notre accompagnement collectif »
    accompagnement: {
      src: U("1460317442991-0ec209397118"),
      alt: "Copropriété en projet de rénovation énergétique",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  LANDING BAR-TH-179 (app/professionnels/collectif/bar-th-179/page.tsx)
  // ─────────────────────────────────────────────────────────────
  barTh179: {
    hero: {
      src: U("1699564625068-803d1c7fcfbc", 1700),
      alt: "Immeuble résidentiel collectif, copropriété candidate à une PAC collective air/eau",
    },
    // Section « Qu'est-ce que la fiche » — photo de chaufferie
    chaufferie: {
      src: "/images/pac-chaufferie.jpg",
      alt: "Pompe à chaleur en chaufferie collective",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  LANDING POINTS SINGULIERS BAR-TH-161
  //  (app/professionnels/collectif/points-singuliers/page.tsx)
  // ─────────────────────────────────────────────────────────────
  pointsSinguliers: {
    // Hero
    hero: {
      src: "/images/point-singulier-3.jpeg",
      alt: "Housse isolante démontable posée sur une vanne de chaufferie collective",
    },
    // Section « Définition »
    definition: {
      src: "/images/point-singulier-1.jpeg",
      alt: "Housse isolante démontable posée sur un point singulier de chaufferie collective",
    },
    // Section « Bénéfices »
    benefices: {
      src: "/images/point-singulier-2.jpeg",
      alt: "Vannes de chaufferie collective équipées de housses isolantes sur mesure",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE COLLECTIVITÉS (app/collectivites/page.tsx)
  // ─────────────────────────────────────────────────────────────
  collectivites: {
    // Hero — photo de mairie
    hero: {
      src: "/images/mairie.jpg",
      alt: "Mairie, bâtiment public engagé dans sa transition énergétique",
    },
    // Section « Un accompagnement dédié au secteur public »
    accompagnement: {
      src: U("1742675416657-55d043ce8dce"),
      alt: "Bâtiment public moderne accompagné dans sa rénovation énergétique",
    },
    // Section « Types de projets » — image de gauche
    typesProjets: {
      src: U("1541888946425-d81bb19240f5"),
      alt: "Chantier de rénovation d'un équipement public",
    },
    // Section « Méthode de pilotage »
    methode: {
      src: "/images/methode-pilotage.jpg",
      alt: "Techniciens pilotant le suivi d'un chantier de rénovation énergétique publique",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE GRANDS COMPTES (app/grands-comptes/page.tsx)
  // ─────────────────────────────────────────────────────────────
  grandsComptes: {
    hero: {
      src: U("1486406146926-c627a92ad1ab", 1600),
      alt: "Siège d'un grand compte",
    },
    // Section 1
    siege: {
      src: U("1520607162513-77705c0f0d4a"),
      alt: "Siège d'un grand compte",
    },
    // Section 2 — pilotage/reporting
    pilotage: {
      src: U("1460925895917-afdab827c52f"),
      alt: "Pilotage de données et reporting",
    },
    // Section 3
    directionProjet: {
      src: U("1573164713714-d95e436ab8d6"),
      alt: "Direction projet grand compte",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE AIDES & SUBVENTIONS (app/aides/page.tsx)
  // ─────────────────────────────────────────────────────────────
  aides: {
    hero: {
      src: U("1752594756894-bcf378884a09", 1700),
      alt: "Aides et subventions à la rénovation énergétique",
    },
    cardCEE: {
      src: U("1768321917437-1f1f6ae2ad28", 1700),
      alt: "Travaux d'isolation thermique pour une maison performante",
    },
    cardMaPrimeRenov: {
      src: U("1752594756894-bcf378884a09", 1700),
      alt: "Ouvriers sur un chantier de rénovation de maison",
    },
    cardAmpleur: {
      src: U("1753977725475-41b221add2c0", 1700),
      alt: "Maison en rénovation d'ampleur avec extension",
    },
    cardEcoPtz: {
      src: U("1758518731462-d091b0b4ed0d", 1700),
      alt: "Signature d'un contrat de financement en banque",
    },
    cardTva: {
      src: U("1725258080098-727051947997", 1700),
      alt: "Calculatrice et facture de travaux de rénovation",
    },
    cardAidesLocales: {
      src: U("1762231433404-04be830b0f3b", 1700),
      alt: "Bâtiment public de type mairie pour aides locales",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE CONTACT (app/contact/page.tsx)
  // ─────────────────────────────────────────────────────────────
  contact: {
    hero: {
      src: U("1486406146926-c627a92ad1ab", 1600),
      alt: "Contactez Pioud Energy",
    },
  },

  // ─────────────────────────────────────────────────────────────
  //  PAGE SIMULATEUR (app/simulateur/page.tsx)
  // ─────────────────────────────────────────────────────────────
  simulateur: {
    hero: {
      src: U("1554224154-26032ffc0d07", 1800),
      alt: "Simulation de budget énergétique",
    },
  },

  // ═════════════════════════════════════════════════════════════
  //  VIGNETTES DES CARTES DE FICHES CEE (bandeau photo en haut de carte)
  //  Système par THÈME : une même image sert à toutes les cartes du
  //  même type de travaux. Changez une ligne = toutes les cartes de ce
  //  thème changent. Le détail des cartes concernées est en commentaire.
  // ═════════════════════════════════════════════════════════════
  fiches: {
    // Cartes : BAR-EN-101 (particuliers) · BAT-EN-101 (tertiaire)
    isolationCombles: {
      src: "/images/souffler-101.jpeg",
      alt: "Isolation des combles et toitures d'un bâtiment",
    },
    // Carte repli : autres opérations d'isolation thermique sans photo dédiée
    isolationThermique: {
      src: U("1768321917437-1f1f6ae2ad28", 800),
      alt: "Travaux d'isolation thermique",
    },
    // Cartes : BAR-EN-102 (particuliers) · BAT-EN-102 (tertiaire) — « Isolation des murs »
    isolationMurs: {
      src: "/images/isolation-murs.webp",
      alt: "Isolation thermique des murs",
    },
    // Cartes : BAR-EN-103 (particuliers) · BAT-EN-103 (tertiaire) — « Isolation d'un plancher »
    isolationPlancher: {
      src: "/images/isolation-plancher.png",
      alt: "Isolation d'un plancher bas",
    },
    // Cartes : BAR-EN-105 (particuliers) · BAT-EN-107 (tertiaire) — toitures-terrasses
    isolationToituresTerrasses: {
      src: "/images/isolation-toitures-terrasses.png",
      alt: "Isolation d'une toiture-terrasse",
    },
    // Cartes : BAR-TH-161 (collectif) · BAT-TH-179 (retirée) · IND-UT-131 (industrie)
    pointsSinguliers: {
      src: "/images/point-singulier-2.jpeg",
      alt: "Housses isolantes posées sur les points singuliers d'un réseau",
    },
    // Carte repli PAC / chaudière sans photo dédiée : BAT-TH-163/164/162/158 (tertiaire) · Géothermie, PAC réversible air/air (chauffage)
    chaufferie: {
      src: "/images/pac-chaufferie.jpg",
      alt: "Chaufferie équipée de pompes à chaleur",
    },
    // Cartes : BAR-TH-171 (chauffage) · « Pompe à chaleur air/eau » (tertiaire)
    pompeAirEau: {
      src: "/images/pompe-air-eau.jpg",
      alt: "Pompe à chaleur air/eau",
    },
    // Cartes : BAR-TH-172 (chauffage) · BAT-TH-164 (tertiaire) — PAC eau/eau
    pompeEauEauSolEau: {
      src: "/images/pompe-eau-eau-sol-eau.jpg",
      alt: "Pompe à chaleur eau/eau ou sol/eau",
    },
    // Carte : BAR-TH-113 (chauffage) — « Chaudière biomasse individuelle »
    chaudiereBiomasseIndividuelle: {
      src: "/images/chaudiere-biomasse-individuelle.jpg",
      alt: "Chaudière biomasse individuelle",
    },
    // Carte : BAR-TH-112 (chauffage) — « Appareil indépendant de chauffage au bois »
    poeleBois: {
      src: "/images/poele-bois.webp",
      alt: "Poêle à bois ou à granulés",
      position: "center 38%",
    },
    // Carte : BAR-TH-101 (chauffage) — « Chauffe-eau solaire individuel »
    chauffeEauSolaire: {
      src: "/images/chauffe-eau-solaire.jpg",
      alt: "Chauffe-eau solaire individuel",
    },
    // Carte : BAR-TH-148 (chauffage) — « Chauffe-eau thermodynamique »
    chauffeEauThermodynamique: {
      src: "/images/chauffe-eau-thermodynamique.webp",
      alt: "Chauffe-eau thermodynamique",
      position: "center 35%",
    },
    // Cartes : BAR-TH-169, BAR-TH-179 (collectif)
    pacCollective: {
      src: "/images/pac-collective-bar-th-179.webp",
      alt: "Pompe à chaleur collective en chaufferie",
    },
    // Carte : BAR-TH-174 (rénovation globale) — « Rénovation d'ampleur d'une maison individuelle »
    renovationAmpleurMaison: {
      src: "/images/renovation-ampleur-maison.jpg",
      alt: "Maison individuelle en rénovation d'ampleur",
    },
    // Cartes : BAR-TH-177 (rénovation globale, collectif) — « Rénovation globale d'un bâtiment résidentiel collectif »
    renovationGlobaleCollectif: {
      src: "/images/renovation-globale-collectif.jpeg",
      alt: "Immeuble résidentiel collectif en rénovation globale",
    },
    // Repli générique (carte sans thème dédié)
    chantier: {
      src: U("1752594756894-bcf378884a09", 800),
      alt: "Ouvriers sur un chantier de rénovation",
    },
    // (réservé) bâtiment moderne
    batimentModerne: {
      src: U("1742675416657-55d043ce8dce", 800),
      alt: "Bâtiment moderne à haute performance énergétique",
    },
    // Carte : BAR-EN-101 (collectif)
    immeubleCollectif: {
      src: U("1460317442991-0ec209397118", 800),
      alt: "Immeuble résidentiel collectif",
    },
    // Cartes industrie : IND-UT-102 (moteurs, variateurs, air comprimé), IND-UT-139 (stockage)
    industrie: {
      src: U("1763906265376-363d9681a3ad", 800),
      alt: "Site industriel",
    },
    // Cartes : BAT-EQ-111 (LED tertiaire + industrie)
    supervision: {
      src: U("1766414629984-73a93e7caba0", 800),
      alt: "Supervision technique d'une installation",
    },
    // Cartes : BAR-EN-104 (fenêtres) · BAT-EN-104 (tertiaire) — « vitrage isolant »
    fenetreVitrageIsolant: {
      src: "/images/fenetre-vitrage-isolant.jpg",
      alt: "Fenêtre ou porte-fenêtre avec vitrage isolant",
    },
    // Carte : BAR-EN-110 (fenêtres) — « Fenêtre ou porte-fenêtre à vitrage pariétodynamique »
    vitragePariodynamique: {
      src: "/images/fenetre-vitrage-parietodynamique.webp",
      alt: "Fenêtre à vitrage pariétodynamique laissant circuler l'air entre les vitres",
    },
    // Carte : BAR-TH-111 (régulation) — « Régulation par sonde de température extérieure »
    regulation: {
      src: U("1770625467384-304e461ef1be", 800),
      alt: "Régulation et pilotage du chauffage",
    },
    // Carte : BAR-TH-173 (régulation) — « Régulation par programmation horaire pièce par pièce »
    regulationHorairePiece: {
      src: "/images/regulation-horaire-piece.jpeg",
      alt: "Programmation d'un thermostat de régulation pièce par pièce",
    },
    // Carte repli chauffage sans photo dédiée
    chauffage: {
      src: U("1554475499-4e40aa2b9e75", 800),
      alt: "Système de chauffage performant",
    },
    // Carte : BAR-TH-110 (régulation) — « Radiateur basse température »
    radiateurBasseTemperature: {
      src: "/images/radiateur-basse-temperature.jpg",
      alt: "Radiateur basse température",
    },
    // Carte : BAR-TH-143 (chauffage) — « Système solaire combiné »
    systemeSolaireCombine: {
      src: "/images/systeme-solaire-combine.jpg",
      alt: "Système solaire combiné",
    },
    // Cartes : BAT-TH-116 (GTB)
    pilotageData: {
      src: U("1460925895917-afdab827c52f", 800),
      alt: "Gestion technique et supervision des données",
    },
  },
} as const;
