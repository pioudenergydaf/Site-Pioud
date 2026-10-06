declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Identifiant de conversion Google Ads pour les soumissions de formulaire
// (contact + simulateur). Remplacer XXXXXXXXX par le libellé de conversion
// fourni dans Google Ads (Outils > Conversions > cette action > Balise).
export const CONVERSION_FORM = "AW-18497703928/XXXXXXXXX";

// Déclenche une conversion Google Ads. `sendTo` est l'identifiant
// "AW-XXXXXXXXX/yyyyyyyyyy" fourni par Google Ads pour l'action suivie.
export function reportConversion(sendTo: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: sendTo });
}
