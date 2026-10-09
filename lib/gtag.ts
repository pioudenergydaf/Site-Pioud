declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Identifiant de conversion Google Ads pour les soumissions de formulaire
// (contact, simulateur, landing /pac). Libellé fourni dans Google Ads
// (Objectifs > Conversions > cette action > Balise).
export const CONVERSION_FORM = "AW-18497703928/ul6MCITV-pYdEPifsvRE";

// Déclenche une conversion Google Ads. `sendTo` est l'identifiant
// "AW-XXXXXXXXX/yyyyyyyyyy" fourni par Google Ads pour l'action suivie.
export function reportConversion(sendTo: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: sendTo });
}

// Google Consent Mode v2 : état de consentement envoyé à gtag.
// Le « default » (tout refusé) est posé dans app/layout.tsx avant le
// chargement de gtag.js ; cette fonction pousse l'« update » après le
// choix de l'utilisateur dans la bannière cookies (et au chargement si un
// choix est déjà enregistré).
export type ConsentChoice = { analytics: boolean; marketing: boolean };

export function consentState(choice: ConsentChoice) {
  const ads = choice.marketing ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: choice.analytics ? "granted" : "denied",
  } as const;
}

export function updateConsent(choice: ConsentChoice) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", consentState(choice));
}
