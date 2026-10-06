export type IncomeBand = "tres_modestes" | "modestes" | "intermediaires";

export const INCOME_BANDS: { id: IncomeBand; label: string; hint: string }[] = [
  { id: "tres_modestes", label: "Très modestes", hint: "Plafonds MaPrimeRénov' bleu" },
  { id: "modestes", label: "Modestes", hint: "Plafonds MaPrimeRénov' jaune" },
  { id: "intermediaires", label: "Intermédiaires", hint: "Plafonds MaPrimeRénov' violet" },
];

export const INCOME_BAND_LABEL: Record<IncomeBand, string> = {
  tres_modestes: "Très modestes",
  modestes: "Modestes",
  intermediaires: "Intermédiaires",
};

// Reste à charge affiché par tranche : libellés validés, aucun montant
// inventé. Le « à partir de 0 € » ne vaut que pour les ménages éligibles.
export const RESTE_A_CHARGE_PAR_TRANCHE: Record<
  IncomeBand,
  { value: string; note?: string }
> = {
  tres_modestes: {
    value: "à partir de 0 €",
    note: "0 € à sortir de votre poche pour les ménages éligibles",
  },
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
