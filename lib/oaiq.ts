import { hasMarketingConsent } from "@/lib/meta-pixel";

// Événement de conversion « lead_created » du pixel publicitaire `oaiq`.
// `oaiq` est défini par le code Pixel de base de la plateforme : tant que ce
// code n'est pas installé sur le site, cette fonction ne fait rien (aucune
// erreur). À appeler uniquement après la réponse OK du serveur (envoi réussi).
// Respecte le consentement publicitaire de la bannière cookies, et n'envoie
// qu'une fois par chargement de page.
declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

let leadSent = false;

export function trackOaiqLead() {
  if (leadSent || typeof window === "undefined" || typeof window.oaiq !== "function") return;
  if (!hasMarketingConsent()) return;
  leadSent = true;
  window.oaiq("measure", "lead_created", { type: "customer_action" });
}
