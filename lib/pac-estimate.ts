// Référentiel partagé client/serveur du formulaire /pac : valeurs admises,
// libellés et résultat affiché (aucun montant inventé : bornes de la fiche
// BAR-TH-171 définies dans lib/pac-constants.ts). Deux parcours :
// « maison » (PAC individuelle) et « copro » (PAC collective, BAR-TH-179).
import { PRIME_ESTIMEE_PAR_TRANCHE, RESTE_A_CHARGE_PAR_TRANCHE } from "@/lib/pac-constants";

export const HOUSING_LABEL = {
  maison: "Maison",
  appartement: "Appartement",
} as const;

export const SURFACE_LABEL = {
  moins_70: "Moins de 70 m²",
  "70_100": "70 – 100 m²",
  "100_130": "100 – 130 m²",
  "130_160": "130 – 160 m²",
  plus_160: "Plus de 160 m²",
} as const;

export const HEATING_LABEL = {
  fioul: "Fioul",
  gaz: "Gaz",
  charbon: "Charbon",
  electrique: "Électrique",
  autre: "Autre",
} as const;

// Parcours copropriété
export const ROLE_LABEL = {
  coproprietaire: "Copropriétaire",
  conseil_syndical: "Conseil syndical",
  syndic: "Syndic",
  bailleur: "Bailleur",
} as const;

export const BUILDING_HEATING_LABEL = {
  gaz_collectif: "Gaz collectif",
  fioul_collectif: "Fioul collectif",
  reseau_chaleur: "Réseau de chaleur",
  individuel: "Individuel",
  autre: "Autre",
} as const;

export const UNITS_LABEL = {
  moins_10: "Moins de 10",
  "10_30": "10 – 30",
  "30_60": "30 – 60",
  "60_100": "60 – 100",
  plus_100: "Plus de 100",
} as const;

export type Housing = keyof typeof HOUSING_LABEL;
export type Surface = keyof typeof SURFACE_LABEL;
export type Heating = keyof typeof HEATING_LABEL;
export type Role = keyof typeof ROLE_LABEL;
export type BuildingHeating = keyof typeof BUILDING_HEATING_LABEL;
export type Units = keyof typeof UNITS_LABEL;
export type Flow = "maison" | "copro";

export const HOUSING_IDS = Object.keys(HOUSING_LABEL) as Housing[];
export const SURFACE_IDS = Object.keys(SURFACE_LABEL) as Surface[];
export const HEATING_IDS = Object.keys(HEATING_LABEL) as Heating[];
export const ROLE_IDS = Object.keys(ROLE_LABEL) as Role[];
export const BUILDING_HEATING_IDS = Object.keys(BUILDING_HEATING_LABEL) as BuildingHeating[];
export const UNITS_IDS = Object.keys(UNITS_LABEL) as Units[];

export function flowFor(housing: Housing): Flow {
  return housing === "appartement" ? "copro" : "maison";
}

// Chauffages fossiles ouvrant droit au Coup de pouce x5 (fiche BAR-TH-171).
export const FOSSIL_HEATINGS: Heating[] = ["fioul", "gaz", "charbon"];

export type Estimate = {
  kind: "amount" | "collective" | "individual";
  label: string;
  value: string;
  note?: string;
};

const euros = (amount: number) => `${amount.toLocaleString("fr-FR")} €`;

// Parcours maison, sans tranche de revenus : fourchette de la fiche (de
// 5 000 € à 12 000 € selon revenus) ; pour un chauffage fossile, reste à
// charge « à partir de 0 € » toujours accompagné de sa mention très modestes.
export function buildEstimate(heating: Heating): Estimate {
  if (FOSSIL_HEATINGS.includes(heating)) {
    const reste = RESTE_A_CHARGE_PAR_TRANCHE.tres_modestes;
    return { kind: "amount", label: "Reste à charge estimé", value: reste.value, note: reste.note };
  }
  const min = PRIME_ESTIMEE_PAR_TRANCHE.intermediaires.amount;
  const max = PRIME_ESTIMEE_PAR_TRANCHE.tres_modestes.amount;
  return {
    kind: "amount",
    label: "Votre prime estimée",
    value: `de ${euros(min)} à ${euros(max)}`,
    note: "selon vos revenus et votre zone climatique",
  };
}

// Parcours copropriété : aucun montant chiffré.
export function buildCollectiveEstimate(buildingHeating: BuildingHeating): Estimate {
  if (buildingHeating === "individuel") {
    return {
      kind: "individual",
      label: "Chauffage individuel",
      value: "La PAC collective ne s'applique pas à votre immeuble",
      note: "Laissez vos coordonnées et nous étudions une solution individuelle.",
    };
  }
  if (buildingHeating === "autre") {
    // Chauffage non identifié : pas d'affirmation d'éligibilité.
    return {
      kind: "collective",
      label: "Prime CEE BAR-TH-179",
      value: "Votre copropriété peut bénéficier de la prime CEE BAR-TH-179",
      note: "Coup de pouce chauffage collectif · étude gratuite sous 48 h",
    };
  }
  return {
    kind: "collective",
    label: "Prime CEE BAR-TH-179",
    value: "Votre copropriété est éligible à la prime CEE BAR-TH-179",
    note: "Coup de pouce chauffage collectif · étude gratuite sous 48 h",
  };
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^(0|\+33)[1-9](\d{2}){4}$/;
export const POSTAL_CODE_REGEX = /^[0-9]{5}$/;

export function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

// « 06 ** ** ** 78 » : seuls les deux premiers et deux derniers chiffres.
export function maskPhone(phone: string) {
  const digits = normalizePhone(phone).replace(/^\+33/, "0");
  if (digits.length !== 10) return "votre numéro";
  return `${digits.slice(0, 2)} ** ** ** ${digits.slice(8)}`;
}

// Attribution marketing capturée côté client (URL → sessionStorage).
export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number], string>> & {
  landingUrl?: string;
  referrer?: string;
};
