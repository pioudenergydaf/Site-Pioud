export type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const COOKIE_CONSENT_STORAGE_KEY = "pioud-cookie-consent";
export const COOKIE_CONSENT_OPEN_EVENT = "pioud:open-cookie-settings";
export const COOKIE_CONSENT_UPDATED_EVENT = "pioud:consent-updated";

export const defaultCookieConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

// Consentement enregistré par la bannière cookies (null si aucun choix).
export function readStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
}
