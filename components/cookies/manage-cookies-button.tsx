"use client";

import { cookieBannerOpenEvent } from "@/components/cookies/cookie-banner";

export function ManageCookiesButton() {
  const openBanner = () => {
    window.dispatchEvent(new Event(cookieBannerOpenEvent));
  };

  return (
    <button
      type="button"
      onClick={openBanner}
      className="text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      Gestion des cookies
    </button>
  );
}
