"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building, CheckCircle2, Flame, Home, Zap } from "lucide-react";
import Link from "next/link";
import { type ComponentType, type FormEvent, useMemo, useState } from "react";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { PacReassurance } from "@/components/pac/pac-icon";
import { CONVERSION_FORM, reportConversion } from "@/lib/gtag";
import {
  INCOME_BANDS,
  INCOME_BAND_LABEL,
  MENTION_INTERMEDIAIRE,
  PRIME_ESTIMEE_PAR_TRANCHE,
  RESTE_A_CHARGE_PAR_TRANCHE,
  type IncomeBand,
} from "@/lib/pac-constants";
import { siteConfig } from "@/lib/site-data";

type Housing = "maison" | "appartement";
type Surface = "moins_70" | "70_100" | "100_130" | "130_160" | "plus_160";
type Heating = "fioul" | "gaz" | "charbon" | "electrique" | "autre";

type LeadContact = {
  name: string;
  phone: string;
  email: string;
};

// 1 logement · 2 surface · 3 chauffage · 4 code postal · 5 revenus ·
// 6 résultat · 7 coordonnées (envoi + conversion).
const STEPS_COUNT = 7;
const STEP_RESULT = 6;
const STEP_CONTACT = 7;
// Étapes à choix unique : le clic enchaîne directement l'étape suivante.
const AUTO_ADVANCE_DELAY_MS = 180;

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const housingOptions: { id: Housing; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "maison", label: "Maison", icon: Home },
  { id: "appartement", label: "Appartement", icon: Building },
];

const surfaceOptions: { id: Surface; label: string }[] = [
  { id: "moins_70", label: "Moins de 70 m²" },
  { id: "70_100", label: "70 – 100 m²" },
  { id: "100_130", label: "100 – 130 m²" },
  { id: "130_160", label: "130 – 160 m²" },
  { id: "plus_160", label: "Plus de 160 m²" },
];

const heatingOptions: { id: Heating; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "fioul", label: "Fioul", icon: Flame },
  { id: "gaz", label: "Gaz", icon: Flame },
  { id: "charbon", label: "Charbon", icon: Flame },
  { id: "electrique", label: "Électrique", icon: Zap },
  { id: "autre", label: "Autre", icon: Home },
];

const incomeBandOptions: { id: IncomeBand; label: string; hint: string }[] = INCOME_BANDS;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+33)[1-9](\d{2}){4}$/;

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

const housingLabel: Record<Housing, string> = {
  maison: "Maison",
  appartement: "Appartement",
};

const surfaceLabel: Record<Surface, string> = Object.fromEntries(
  surfaceOptions.map((option) => [option.id, option.label]),
) as Record<Surface, string>;

const heatingLabel: Record<Heating, string> = {
  fioul: "Fioul",
  gaz: "Gaz",
  charbon: "Charbon",
  electrique: "Électrique",
  autre: "Autre",
};

// Chauffages fossiles ouvrant droit au Coup de pouce x5 (fiche BAR-TH-171).
const FOSSIL_HEATINGS: Heating[] = ["fioul", "gaz", "charbon"];

function buildEstimate(incomeBand: IncomeBand, heating: Heating) {
  if (incomeBand === "tres_modestes" && FOSSIL_HEATINGS.includes(heating)) {
    const reste = RESTE_A_CHARGE_PAR_TRANCHE.tres_modestes;
    return { label: "Reste à charge estimé", value: reste.value, note: reste.note };
  }
  const prime = PRIME_ESTIMEE_PAR_TRANCHE[incomeBand];
  return {
    label: "Votre prime estimée",
    value: `${prime.qualifier} ${prime.amount.toLocaleString("fr-FR")} €`,
    note: undefined,
  };
}

const stepMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25 },
};

const choiceClass = (selected: boolean) =>
  `rounded-2xl border p-4 text-left transition ${
    selected
      ? "border-forest-soft bg-sage"
      : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
  }`;

const inputClass = "pac-input";

const backButtonClass =
  "rounded-pill border border-ink/10 px-5 py-2 text-sm font-semibold text-ink-muted transition hover:border-ink/15 disabled:cursor-not-allowed disabled:opacity-40";

export function PacLeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [housing, setHousing] = useState<Housing | null>(null);
  const [surface, setSurface] = useState<Surface | null>(null);
  const [heating, setHeating] = useState<Heating | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [incomeBand, setIncomeBand] = useState<IncomeBand | null>(null);
  const [contact, setContact] = useState<LeadContact>({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);

  const progress = useMemo(() => (step / STEPS_COUNT) * 100, [step]);
  const estimate = useMemo(
    () => (incomeBand && heating ? buildEstimate(incomeBand, heating) : null),
    [incomeBand, heating],
  );

  const goTo = (next: number) => {
    setFormError("");
    setStep(Math.min(Math.max(next, 1), STEPS_COUNT));
  };

  // Sélection d'un choix puis passage automatique à l'étape suivante.
  const choose = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    window.setTimeout(() => setStep((current) => Math.min(current + 1, STEPS_COUNT)), AUTO_ADVANCE_DELAY_MS);
  };

  const goBack = () => {
    if (step > 1 && !isSubmitting) goTo(step - 1);
  };

  const postalCodeValid = /^[0-9]{5}$/.test(postalCode);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== STEP_CONTACT || !housing || !surface || !heating || !incomeBand || !estimate) return;

    if (!contact.name.trim() || contact.name.trim().length < 2) {
      setFormError("Merci d'indiquer votre nom.");
      return;
    }
    if (!EMAIL_REGEX.test(contact.email.trim())) {
      setFormError("Merci de saisir une adresse email valide.");
      return;
    }
    if (!PHONE_REGEX.test(normalizePhone(contact.phone))) {
      setFormError("Merci de saisir un numéro de téléphone français valide.");
      return;
    }
    if (!consent) {
      setFormError("Merci d'accepter d'être recontacté pour envoyer votre demande.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setFormError("");

    const message = [
      "Nouvelle demande — landing page /pac (pompe à chaleur air/eau)",
      `Logement : ${housingLabel[housing]}`,
      `Surface : ${surfaceLabel[surface]}`,
      `Chauffage actuel : ${heatingLabel[heating]}`,
      `Code postal : ${postalCode}`,
      `Tranche de revenus MaPrimeRénov' : ${INCOME_BAND_LABEL[incomeBand]}`,
      `Affiché à l'écran : ${estimate.label} — ${estimate.value}`,
      "Consentement recontact (RGPD) : oui",
    ].join("\n");

    const payload: Record<string, unknown> = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: normalizePhone(contact.phone),
      subject: "Demande pompe à chaleur — landing /pac",
      message,
      source: "pac-landing",
      housing,
      surface,
      heating,
      postalCode,
      incomeBand,
      consent: true,
    };
    const turnstileToken = formData.get("cf-turnstile-response");
    if (turnstileToken) payload["cf-turnstile-response"] = turnstileToken;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network error");
      }

      setIsSubmitted(true);
      // Conversion Google Ads : uniquement à l'envoi final réussi.
      reportConversion(CONVERSION_FORM);
    } catch {
      setFormError("Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && estimate) {
    return (
      <div className="card-surface p-6 text-center sm:p-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-pill bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">Votre demande a bien été reçue</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Un conseiller Pioud Energy vous recontacte sous 24 h ouvrées pour confirmer
          votre étude détaillée sur devis.
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {estimate.label}
        </p>
        <p className="mt-1 font-display text-3xl font-light text-ink">{estimate.value}</p>
        {estimate.note ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">{estimate.note}</p>
        ) : null}
        <PacReassurance className="mt-7" />
        <p className="mt-4 text-[11px] leading-relaxed text-ink-soft">{MENTION_INTERMEDIAIRE}</p>
      </div>
    );
  }

  return (
    <div className="card-surface p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-pill bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-wide text-forest">
          Étape {step} / {STEPS_COUNT}
        </span>
        <span className="text-xs font-semibold text-ink-soft">Simulation gratuite</span>
      </div>
      <div className="mb-6 h-2 w-full rounded-pill bg-cream-soft">
        <motion.div
          className="h-2 rounded-pill bg-gradient-to-r from-forest to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section key="step-1" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Vous habitez en...</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {housingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(setHousing, option.id)}
                    className={choiceClass(housing === option.id)}
                  >
                    <span className="inline-flex rounded-lg bg-white p-2 text-forest-soft">
                      <option.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{option.label}</p>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section key="step-2" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Surface de votre logement</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pour dimensionner la pompe à chaleur adaptée.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {surfaceOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(setSurface, option.id)}
                    className={choiceClass(surface === option.id)}
                  >
                    <p className="text-sm font-semibold text-ink">{option.label}</p>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section key="step-3" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Votre chauffage actuel</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {heatingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(setHeating, option.id)}
                    className={choiceClass(heating === option.id)}
                  >
                    <span className="inline-flex rounded-lg bg-white p-2 text-forest-soft">
                      <option.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-ink">{option.label}</p>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {step === 4 && (
            <motion.section key="step-4" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Votre code postal</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pour vérifier l&apos;éligibilité de votre zone aux aides 2026.
              </p>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (postalCodeValid) goTo(5);
                  }
                }}
                inputMode="numeric"
                placeholder="75001"
                className={`mt-5 text-lg ${inputClass}`}
              />
            </motion.section>
          )}

          {step === 5 && (
            <motion.section key="step-5" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Votre tranche de revenus</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Détermine votre plafond d&apos;aides MaPrimeRénov&apos;.
              </p>
              <div className="mt-5 space-y-3">
                {incomeBandOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(setIncomeBand, option.id)}
                    className={`block w-full ${choiceClass(incomeBand === option.id)}`}
                  >
                    <p className="text-sm font-semibold text-ink">{option.label}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{option.hint}</p>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-soft">
                Revenu fiscal de référence du foyer, barème Île-de-France — à titre
                indicatif.
              </p>
            </motion.section>
          )}

          {step === STEP_RESULT && estimate && (
            <motion.section key="step-result" {...stepMotion} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-pill bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {estimate.label}
              </p>
              <p className="mt-2 font-display text-4xl font-light text-ink sm:text-5xl">
                {estimate.value}
              </p>
              {estimate.note ? (
                <p className="mt-2 text-sm font-medium text-emerald-700">{estimate.note}</p>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Recevez votre étude détaillée : un conseiller Pioud Energy confirme ce
                chiffrage sur devis après visite technique.
              </p>
            </motion.section>
          )}

          {step === STEP_CONTACT && (
            <motion.section key="step-contact" {...stepMotion}>
              <h2 className="text-xl font-bold text-ink">Vos coordonnées</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pour vous transmettre votre étude détaillée.
              </p>
              <div className="mt-5 space-y-4">
                <input
                  name="name"
                  required
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  placeholder="Nom et prénom"
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="06 12 34 56 78"
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder="vous@email.fr"
                  className={inputClass}
                />
              </div>

              <label className="mt-4 flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-soft px-4 py-3">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />
                <span className="text-xs leading-relaxed text-ink-muted">
                  J&apos;accepte que Pioud Energy me recontacte au sujet de ma demande.
                  Données conservées 3 ans, droits d&apos;accès et d&apos;opposition :{" "}
                  {siteConfig.email}.{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-semibold text-ink underline underline-offset-2"
                  >
                    Politique de confidentialité
                  </Link>
                </span>
              </label>

              {turnstileSiteKey ? (
                <div className="mt-4">
                  <TurnstileWidget siteKey={turnstileSiteKey} />
                </div>
              ) : null}
            </motion.section>
          )}
        </AnimatePresence>

        {formError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </p>
        ) : null}

        {step === 4 && (
          <div className="mt-7 flex items-center justify-between gap-3">
            <button type="button" onClick={goBack} className={backButtonClass}>
              ← Retour
            </button>
            <button
              type="button"
              onClick={() => goTo(5)}
              disabled={!postalCodeValid}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {(step === 2 || step === 3 || step === 5) && (
          <div className="mt-7">
            <button type="button" onClick={goBack} className={backButtonClass}>
              ← Retour
            </button>
          </div>
        )}

        {step === STEP_RESULT && (
          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={() => goTo(STEP_CONTACT)}
              className="btn-primary w-full justify-center"
            >
              Recevoir mon étude détaillée
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goBack}
              className="block w-full text-center text-sm font-semibold text-ink-muted transition hover:text-ink"
            >
              ← Retour
            </button>
          </div>
        )}

        {step === STEP_CONTACT && (
          <div className="mt-7 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Envoi en cours..." : "Recevoir mon étude détaillée"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goBack}
              disabled={isSubmitting}
              className="block w-full text-center text-sm font-semibold text-ink-muted transition hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Retour
            </button>
          </div>
        )}
      </form>

      <PacReassurance className="mt-7" />
      <p className="mt-4 text-center text-[11px] leading-relaxed text-ink-soft">
        {MENTION_INTERMEDIAIRE}
      </p>
    </div>
  );
}
