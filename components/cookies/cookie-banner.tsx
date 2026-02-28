"use client";

import { useEffect, useState } from "react";

type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "pioud-cookie-consent";
const OPEN_EVENT = "pioud:open-cookie-settings";

function saveConsent(consent: CookieConsent) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}

function readConsent(): CookieConsent | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existingConsent = readConsent();
    if (!existingConsent) {
      setIsVisible(true);
    } else {
      setAnalytics(existingConsent.analytics);
      setMarketing(existingConsent.marketing);
    }

    const openHandler = () => {
      const latest = readConsent();
      setAnalytics(latest?.analytics ?? false);
      setMarketing(latest?.marketing ?? false);
      setIsVisible(true);
      setIsCustomizing(true);
    };

    window.addEventListener(OPEN_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_EVENT, openHandler);
  }, []);

  const applyConsent = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    };
    saveConsent(consent);
    setIsVisible(false);
    setIsCustomizing(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/15 sm:inset-x-6"
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
    >
      <h2 className="text-lg font-bold text-[#0F2B46]">Gestion des cookies</h2>
      <p className="mt-2 text-sm text-slate-600">
        Nous utilisons des cookies techniques indispensables au fonctionnement du
        site. Les cookies de mesure d&apos;audience et de personnalisation ne sont
        activés qu&apos;avec votre consentement.
      </p>

      {isCustomizing ? (
        <div className="mt-4 space-y-3">
          <label className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3">
            <span>
              <span className="block font-semibold text-slate-800">Cookies essentiels</span>
              <span className="text-sm text-slate-600">
                Nécessaires au fonctionnement du site.
              </span>
            </span>
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Cookies essentiels activés"
              className="mt-1 h-4 w-4 cursor-not-allowed accent-emerald-500"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3">
            <span>
              <span className="block font-semibold text-slate-800">Mesure d&apos;audience</span>
              <span className="text-sm text-slate-600">
                Permet d&apos;améliorer le site via des statistiques anonymisées.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-500"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-3">
            <span>
              <span className="block font-semibold text-slate-800">Personnalisation</span>
              <span className="text-sm text-slate-600">
                Adapte l&apos;expérience de navigation selon vos préférences.
              </span>
            </span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-500"
            />
          </label>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => applyConsent(true, true)}
          className="rounded-full bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Accepter tout
        </button>
        <button
          type="button"
          onClick={() => applyConsent(false, false)}
          className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          Refuser tout
        </button>
        {!isCustomizing ? (
          <button
            type="button"
            onClick={() => setIsCustomizing(true)}
            className="rounded-full border border-[#0F2B46]/20 px-5 py-2.5 text-sm font-semibold text-[#0F2B46] transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B46]/30"
          >
            Personnaliser
          </button>
        ) : (
          <button
            type="button"
            onClick={() => applyConsent(analytics, marketing)}
            className="rounded-full border border-[#0F2B46]/20 px-5 py-2.5 text-sm font-semibold text-[#0F2B46] transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2B46]/30"
          >
            Enregistrer mes choix
          </button>
        )}
      </div>
    </aside>
  );
}

export const cookieBannerOpenEvent = OPEN_EVENT;
