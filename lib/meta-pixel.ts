import { readStoredConsent } from "@/lib/cookie-consent";

// Pixel Meta : chargé uniquement sur la landing /pac (composant MetaPixel),
// et uniquement avec le consentement « publicité » de la bannière cookies
// (case `marketing`). Aucun appel n'est fait sans ce consentement.
export const META_PIXEL_ID = "2270372713531279";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    __pioudMetaPixelInit?: boolean;
  }
}

// Code d'installation officiel Meta, avec trois garde-fous :
// - `disablePushState` : sans lui, le Pixel enverrait un PageView à chaque
//   navigation interne (ex. /pac vers les mentions légales), donc hors /pac ;
// - un drapeau d'initialisation : `init` et `PageView` ne partent qu'une fois
//   par chargement de page, même si le script était réévalué ;
// - le consentement est déjà vérifié par le composant avant d'injecter ce code.
export const META_PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq.disablePushState = true;
if (!window.__pioudMetaPixelInit) {
  window.__pioudMetaPixelInit = true;
  fbq('init', '${META_PIXEL_ID}');
  fbq('track', 'PageView');
}
`;

export function hasMarketingConsent(): boolean {
  return readStoredConsent()?.marketing === true;
}

function expireCookie(name: string) {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string | null>([null, host, parts.slice(-2).join(".")]);
  domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=.${domain}` : ""}`;
  });
}

// Consentement retiré après coup : le Pixel arrête d'envoyer et ses cookies
// (_fbp, _fbc) sont effacés.
export function revokeMetaPixel() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("consent", "revoke");
  expireCookie("_fbp");
  expireCookie("_fbc");
}

export function grantMetaPixel() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("consent", "grant");
}

let leadSent = false;

// Événement Lead : à appeler uniquement après la réponse OK du serveur.
// Une seule fois par chargement de page ; ignoré sans Pixel chargé ni consentement.
export function trackMetaLead() {
  if (leadSent || typeof window === "undefined" || !window.fbq || !hasMarketingConsent()) return;
  leadSent = true;
  const eventID =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.fbq("track", "Lead", { content_name: "Pompe à chaleur air/eau" }, { eventID });
}
