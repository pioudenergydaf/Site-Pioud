"use client";

import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_UPDATED_EVENT,
  type CookieConsent,
} from "@/lib/cookie-consent";

function saveConsent(consent: CookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

function readConsent(): CookieConsent | null {
  const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
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

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openHandler);
    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openHandler);
  }, []);

  const applyConsent = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics: nextAnalytics,
      marketing: nextMarketing,
      updatedAt: new Date().toISOString(),
    };
    saveConsent(consent);
    window.dispatchEvent(new Event(COOKIE_CONSENT_UPDATED_EVENT));
    setIsVisible(false);
    setIsCustomizing(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-4xl rounded-card border border-ink/10 bg-white p-5 shadow-[0_16px_36px_rgba(31,58,46,0.12)] sm:inset-x-6"
      role="dialog"
      aria-modal="true"
      aria-label="Gestion des cookies"
    >
      <h2 className="text-lg font-bold text-ink">Gestion des cookies</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Nous utilisons des cookies techniques indispensables au fonctionnement du
        site. Les cookies de mesure d&apos;audience et de personnalisation ne sont
        activés qu&apos;avec votre consentement.
      </p>

      {isCustomizing ? (
        <div className="mt-4 space-y-3">
          <label className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 p-3">
            <span>
              <span className="block font-semibold text-ink">Cookies essentiels</span>
              <span className="text-sm text-ink-muted">
                Nécessaires au fonctionnement du site.
              </span>
            </span>
            <input
              type="checkbox"
              checked
              disabled
              aria-label="Cookies essentiels activés"
              className="mt-1 h-4 w-4 cursor-not-allowed accent-forest"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 p-3">
            <span>
              <span className="block font-semibold text-ink">Mesure d&apos;audience</span>
              <span className="text-sm text-ink-muted">
                Permet d&apos;améliorer le site via des statistiques anonymisées.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-1 h-4 w-4 accent-forest"
            />
          </label>

          <label className="flex items-start justify-between gap-4 rounded-xl border border-ink/10 p-3">
            <span>
              <span className="block font-semibold text-ink">Personnalisation</span>
              <span className="text-sm text-ink-muted">
                Adapte l&apos;expérience de navigation selon vos préférences.
              </span>
            </span>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="mt-1 h-4 w-4 accent-forest"
            />
          </label>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => applyConsent(true, true)}
          className="rounded-pill bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-lime-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-soft"
        >
          Accepter tout
        </button>
        <button
          type="button"
          onClick={() => applyConsent(false, false)}
          className="rounded-pill border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-cream-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
        >
          Refuser tout
        </button>
        {!isCustomizing ? (
          <button
            type="button"
            onClick={() => setIsCustomizing(true)}
            className="rounded-pill border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-cream-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
          >
            Personnaliser
          </button>
        ) : (
          <button
            type="button"
            onClick={() => applyConsent(analytics, marketing)}
            className="rounded-pill border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-cream-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
          >
            Enregistrer mes choix
          </button>
        )}
      </div>
    </aside>
  );
}
