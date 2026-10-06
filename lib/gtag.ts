declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Déclenche une conversion Google Ads. `sendTo` est l'identifiant
// "AW-XXXXXXXXX/yyyyyyyyyy" fourni par Google Ads pour l'action suivie.
export function reportConversion(sendTo: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "conversion", { send_to: sendTo });
}
