"use client";

import { ArrowRight, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_OPEN_EVENT,
  COOKIE_CONSENT_UPDATED_EVENT,
  readStoredConsent,
} from "@/lib/cookie-consent";

const DISMISSED_KEY = "pioud-simulator-promo-dismissed";
const SHOW_DELAY_MS = 3000;
// Page qui contient déjà le simulateur : la bulle n'y a pas lieu d'être.
const SIMULATOR_PATH = "/simulateur";

// Bulle flottante qui renvoie vers le simulateur sur toutes les pages du site
// principal (montée par SiteChrome, donc jamais sur la landing /pac), sauf sur
// la page du simulateur où elle disparaît. Elle attend que le visiteur ait
// répondu à la bannière cookies, pour ne pas la recouvrir, puis un court délai.
// Fermée, elle reste masquée pour le reste de la session.
export function SimulatorPromo() {
  const pathname = usePathname();
  const [consentChosen, setConsentChosen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISSED_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    setConsentChosen(readStoredConsent() !== null);

    const onUpdated = () => {
      setConsentChosen(readStoredConsent() !== null);
      setCookieSettingsOpen(false);
    };
    const onOpen = () => setCookieSettingsOpen(true);
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdated);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onUpdated);
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!consentChosen || armed) return;
    const timer = window.setTimeout(() => setArmed(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [consentChosen, armed]);

  const onSimulatorPage = pathname === SIMULATOR_PATH || pathname.startsWith(`${SIMULATOR_PATH}/`);
  if (!armed || dismissed || cookieSettingsOpen || onSimulatorPage) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Navigation privée stricte : la fermeture ne vaut que pour cette page.
    }
  };

  return (
    <aside
      aria-label="Simuler vos aides"
      className="simulator-promo fixed inset-x-4 bottom-4 z-30 rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_16px_36px_rgba(31,58,46,0.18)] sm:inset-x-auto sm:p-5 sm:bottom-6 sm:right-6 sm:w-[340px]"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Fermer"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-pill text-ink-soft transition hover:bg-cream-soft hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
        <ShieldCheck className="h-4 w-4" aria-hidden />
        Aides 2026
      </p>
      <p className="mt-2 pr-6 font-display text-lg leading-snug text-forest sm:mt-3 sm:text-xl">
        Testez votre éligibilité aux aides 2026
      </p>
      <p className="mt-1.5 text-sm text-ink-muted sm:mt-2">Étude gratuite et sans engagement.</p>
      <Link href={SIMULATOR_PATH} className="btn-primary mt-3 w-full justify-center py-2.5 sm:mt-4 sm:py-3">
        Mon devis gratuit
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </aside>
  );
}
