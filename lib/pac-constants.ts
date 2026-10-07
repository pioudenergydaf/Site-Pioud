export type IncomeBand = "tres_modestes" | "modestes" | "intermediaires";

export const INCOME_BAND_LABEL: Record<IncomeBand, string> = {
  tres_modestes: "Très modestes",
  modestes: "Modestes",
  intermediaires: "Intermédiaires",
};

// Plafonds de revenu fiscal de référence (RFR) MaPrimeRénov' en Île-de-France,
// par nombre de personnes du foyer (1 à 5) puis majoration par personne
// supplémentaire. Valeurs du barème Anah connues (2024/2025).
// À VÉRIFIER contre la publication officielle 2026 avant mise en campagne.
export const INCOME_THRESHOLDS_IDF: Record<
  IncomeBand,
  { byHousehold: readonly [number, number, number, number, number]; perExtraPerson: number }
> = {
  tres_modestes: { byHousehold: [23541, 34551, 41493, 48447, 55427], perExtraPerson: 6905 },
  modestes: { byHousehold: [28657, 42058, 50513, 58981, 67473], perExtraPerson: 8486 },
  intermediaires: { byHousehold: [40018, 58827, 70382, 82839, 94844], perExtraPerson: 12006 },
};

// Taille de foyer utilisée pour l'exemple affiché sous chaque tranche.
export const INCOME_HINT_HOUSEHOLD_SIZE = 2;

export function incomeThreshold(band: IncomeBand, householdSize: number): number {
  const { byHousehold, perExtraPerson } = INCOME_THRESHOLDS_IDF[band];
  if (householdSize <= 5) return byHousehold[Math.max(1, householdSize) - 1];
  return byHousehold[4] + (householdSize - 5) * perExtraPerson;
}

export function incomeBandHint(
  band: IncomeBand,
  householdSize: number = INCOME_HINT_HOUSEHOLD_SIZE,
): string {
  const amount = incomeThreshold(band, householdSize).toLocaleString("fr-FR");
  return `ex. foyer de ${householdSize} personnes : jusqu'à ${amount} €`;
}

export const INCOME_BANDS: { id: IncomeBand; label: string; hint: string }[] = (
  ["tres_modestes", "modestes", "intermediaires"] as const
).map((id) => ({ id, label: INCOME_BAND_LABEL[id], hint: incomeBandHint(id) }));

// Texte exact de la case RGPD (affiché dans le formulaire et archivé dans
// la preuve de consentement de chaque lead).
export const CONSENT_TEXT =
  "J'accepte que Pioud Energy me recontacte au sujet de ma demande. Données conservées 3 ans, droits d'accès et d'opposition : contact@pioudenergy.fr. Politique de confidentialité : https://www.pioudenergy.fr/politique-confidentialite";

// Mentions de conformité (DGCCRF/DDPP) à afficher avec tout montant.
export const MENTION_MONTANT_INDICATIF =
  "Montant indicatif, sous conditions de ressources et d'éligibilité, soumis à visite technique.";
export const MENTION_ZERO_RESTE =
  "pour les ménages très modestes remplaçant une chaudière fioul, gaz ou charbon, selon devis";
export const MENTION_INTERMEDIAIRE =
  "Pioud Energy, mandataire CEE, intervient en tant qu'intermédiaire ; les aides sont versées par les organismes compétents (Anah, obligés CEE).";

// Reste à charge affiché par tranche : libellés validés, aucun montant
// inventé. Le « à partir de 0 € » n'est jamais affiché sans sa mention.
export const RESTE_A_CHARGE_PAR_TRANCHE: Record<
  IncomeBand,
  { value: string; note?: string }
> = {
  tres_modestes: { value: "à partir de 0 €", note: MENTION_ZERO_RESTE },
  modestes: { value: "selon devis" },
  intermediaires: { value: "selon devis" },
};

// Prime CEE estimée, bornes de la fiche BAR-TH-171 (de 5 000 € à 12 000 €
// selon revenus et zone climatique). Modestes et très modestes relèvent de
// la tranche bonifiée du Coup de pouce. À ajuster ici si les barèmes bougent.
export const PRIME_ESTIMEE_PAR_TRANCHE: Record<
  IncomeBand,
  { qualifier: "jusqu'à" | "à partir de"; amount: number }
> = {
  tres_modestes: { qualifier: "jusqu'à", amount: 12000 },
  modestes: { qualifier: "jusqu'à", amount: 12000 },
  intermediaires: { qualifier: "à partir de", amount: 5000 },
};
