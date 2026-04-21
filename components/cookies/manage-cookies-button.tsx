"use client";

import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent";

export function ManageCookiesButton() {
  const openBanner = () => {
    window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
  };

  return (
    <button
      type="button"
      onClick={openBanner}
      className="text-cream-soft/85 transition hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-cream-soft/50"
    >
      Gestion des cookies
    </button>
  );
}
