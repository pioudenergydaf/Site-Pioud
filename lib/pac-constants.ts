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
