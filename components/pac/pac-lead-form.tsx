"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building, CheckCircle2, Flame, Home, Zap } from "lucide-react";
import { type ComponentType, type FormEvent, useMemo, useState } from "react";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { CONVERSION_FORM, reportConversion } from "@/lib/gtag";
import {
  INCOME_BANDS,
  INCOME_BAND_LABEL,
  RESTE_A_CHARGE_PAR_TRANCHE,
  type IncomeBand,
} from "@/lib/pac-constants";

type Housing = "maison" | "appartement";
type Heating = "fioul" | "gaz" | "electrique" | "autre";

type LeadContact = {
  name: string;
  phone: string;
  email: string;
};

const STEPS_COUNT = 5;

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const housingOptions: { id: Housing; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "maison", label: "Maison", icon: Home },
  { id: "appartement", label: "Appartement", icon: Building },
];

const heatingOptions: { id: Heating; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "fioul", label: "Fioul", icon: Flame },
  { id: "gaz", label: "Gaz", icon: Flame },
  { id: "electrique", label: "Électrique", icon: Zap },
  { id: "autre", label: "Autre", icon: Home },
];

const incomeBandOptions: { id: IncomeBand; label: string; hint: string }[] = INCOME_BANDS;

// PLACEHOLDER — montants indicatifs à remplacer par les vraies grilles d'aides.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+33)[1-9](\d{2}){4}$/;

function normalizePhone(phone: string) {
  return phone.replace(/\s+/g, "");
}

const heatingLabel: Record<Heating, string> = {
  fioul: "Fioul",
  gaz: "Gaz",
  electrique: "Électrique",
  autre: "Autre",
};

const housingLabel: Record<Housing, string> = {
  maison: "Maison",
  appartement: "Appartement",
};

export function PacLeadForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [housing, setHousing] = useState<Housing | null>(null);
  const [heating, setHeating] = useState<Heating | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [incomeBand, setIncomeBand] = useState<IncomeBand | null>(null);
  const [contact, setContact] = useState<LeadContact>({ name: "", phone: "", email: "" });

  const progress = useMemo(() => (step / STEPS_COUNT) * 100, [step]);

  const canContinue = () => {
    if (step === 1) return housing !== null;
    if (step === 2) return heating !== null;
    if (step === 3) return /^[0-9]{5}$/.test(postalCode);
    if (step === 4) return incomeBand !== null;
    return true;
  };

  const goNext = () => {
    if (!canContinue()) return;
    if (step < STEPS_COUNT) setStep((current) => current + 1);
  };

  const goBack = () => {
    if (step > 1 && !isSubmitting) {
      setStep((current) => current - 1);
      setFormError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!housing || !heating || !incomeBand) return;

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

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setFormError("");

    const message = [
      "Nouvelle demande — landing page /pac (pompe à chaleur air/eau)",
      `Logement : ${housingLabel[housing]}`,
      `Chauffage actuel : ${heatingLabel[heating]}`,
      `Code postal : ${postalCode}`,
      `Tranche de revenus MaPrimeRénov' : ${INCOME_BAND_LABEL[incomeBand]}`,
      `Reste à charge estimé affiché : ${RESTE_A_CHARGE_PAR_TRANCHE[incomeBand]} €`,
    ].join("\n");

    const payload: Record<string, unknown> = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: normalizePhone(contact.phone),
      subject: "Demande pompe à chaleur — landing /pac",
      message,
      source: "pac-landing",
      housing,
      heating,
      postalCode,
      incomeBand,
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
      reportConversion(CONVERSION_FORM);
    } catch {
      setFormError(
        "Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && incomeBand) {
    return (
      <div className="card-surface p-6 text-center sm:p-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-pill bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Votre reste à charge estimé
        </p>
        <p className="mt-2 font-display text-5xl font-light text-ink">
          {RESTE_A_CHARGE_PAR_TRANCHE[incomeBand].toLocaleString("fr-FR")} €
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          Montant indicatif, sous conditions d&apos;éligibilité. Un conseiller
          Pioud Energy vous recontacte sous 24h ouvrées pour confirmer ce
          chiffrage sur devis.
        </p>
        <p className="mt-6 text-xs font-medium text-ink-soft">
          Sans engagement · Réponse sous 24 h · Conseiller dédié
        </p>
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
            <motion.section
              key="step-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-ink">Vous habitez en...</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {housingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setHousing(option.id)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      housing === option.id
                        ? "border-forest-soft bg-sage"
                        : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
                    }`}
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
            <motion.section
              key="step-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-ink">Votre chauffage actuel</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {heatingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setHeating(option.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      heating === option.id
                        ? "border-forest-soft bg-sage"
                        : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
                    }`}
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

          {step === 3 && (
            <motion.section
              key="step-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-ink">Votre code postal</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pour vérifier l&apos;éligibilité de votre zone aux aides 2026.
              </p>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                placeholder="75001"
                className="mt-5 w-full rounded-xl border border-ink/10 px-4 py-3 text-lg outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </motion.section>
          )}

          {step === 4 && (
            <motion.section
              key="step-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-ink">Votre tranche de revenus</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Détermine votre plafond d&apos;aides MaPrimeRénov&apos;.
              </p>
              <div className="mt-5 space-y-3">
                {incomeBandOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setIncomeBand(option.id)}
                    className={`block w-full rounded-2xl border p-4 text-left transition ${
                      incomeBand === option.id
                        ? "border-forest-soft bg-sage"
                        : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
                    }`}
                  >
                    <p className="text-sm font-semibold text-ink">{option.label}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{option.hint}</p>
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {step === 5 && (
            <motion.section
              key="step-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl font-bold text-ink">Vos coordonnées</h2>
              <p className="mt-2 text-sm text-ink-muted">
                Pour vous transmettre votre estimation de reste à charge.
              </p>
              <div className="mt-5 space-y-4">
                <input
                  name="name"
                  required
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  placeholder="Nom et prénom"
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="06 12 34 56 78"
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <input
                  name="email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  placeholder="vous@email.fr"
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {turnstileSiteKey ? <div className="mt-4"><TurnstileWidget siteKey={turnstileSiteKey} /></div> : null}
            </motion.section>
          )}
        </AnimatePresence>

        {formError ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </p>
        ) : null}

        <div className="mt-7">
          {step < STEPS_COUNT ? (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-pill border border-ink/10 px-5 py-2 text-sm font-semibold text-ink-muted transition hover:border-ink/15 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Retour
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue()}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Envoi en cours..." : "Je calcule mon reste à charge"}
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
        </div>
      </form>

      <p className="mt-6 text-center text-xs font-medium text-ink-soft">
        Sans engagement · Réponse sous 24 h · Conseiller dédié
      </p>
    </div>
  );
}
