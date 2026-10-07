"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { PacReassurance } from "@/components/pac/pac-icon";
import { CONVERSION_FORM, reportConversion } from "@/lib/gtag";
import {
  MENTION_INTERMEDIAIRE,
  PRIME_ESTIMEE_PAR_TRANCHE,
  RESTE_A_CHARGE_PAR_TRANCHE,
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

// 1 logement · 2 surface · 3 chauffage · 4 code postal · 5 résultat ·
// 6 coordonnées (envoi + conversion). La tranche de revenus n'est pas
// demandée : elle est qualifiée par le conseiller lors du rappel.
const STEPS_COUNT = 6;
const STEP_POSTAL = 4;
const STEP_RESULT = 5;
const STEP_CONTACT = 6;
// Étapes à choix unique : le clic enchaîne directement l'étape suivante.
const AUTO_ADVANCE_DELAY_MS = 180;

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Cartes photo (public/images/pac/) : image en fond, dégradé forest en bas.
const housingOptions: { id: Housing; label: string; image: string; alt: string }[] = [
  { id: "maison", label: "Maison", image: "/images/pac/maison.jpg", alt: "Maison individuelle" },
  {
    id: "appartement",
    label: "Appartement",
    image: "/images/pac/appartement.jpg",
    alt: "Immeuble d'appartements",
  },
];

const surfaceOptions: { id: Surface; label: string }[] = [
  { id: "moins_70", label: "Moins de 70 m²" },
  { id: "70_100", label: "70 – 100 m²" },
  { id: "100_130", label: "100 – 130 m²" },
  { id: "130_160", label: "130 – 160 m²" },
  { id: "plus_160", label: "Plus de 160 m²" },
];

// Cartes photo (public/images/pac/chauffage/).
const heatingOptions: { id: Heating; label: string; image: string; alt: string }[] = [
  { id: "fioul", label: "Fioul", image: "/images/pac/chauffage/fioul.jpg", alt: "Cuve de fioul" },
  { id: "gaz", label: "Gaz", image: "/images/pac/chauffage/gaz.jpg", alt: "Chaudière gaz murale" },
  { id: "charbon", label: "Charbon", image: "/images/pac/chauffage/charbon.jpg", alt: "Poêle à charbon" },
  {
    id: "electrique",
    label: "Électrique",
    image: "/images/pac/chauffage/electrique.jpg",
    alt: "Convecteur électrique",
  },
  { id: "autre", label: "Autre", image: "/images/pac/chauffage/autre.jpg", alt: "Bûches de bois" },
];

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

const euros = (amount: number) => `${amount.toLocaleString("fr-FR")} €`;

// Sans tranche de revenus : fourchette de la fiche (de 5 000 € à 12 000 €
// selon revenus) ; pour un chauffage fossile, reste à charge « à partir de
// 0 € » toujours accompagné de sa mention très modestes.
function buildEstimate(heating: Heating) {
  if (FOSSIL_HEATINGS.includes(heating)) {
    const reste = RESTE_A_CHARGE_PAR_TRANCHE.tres_modestes;
    return { label: "Reste à charge estimé", value: reste.value, note: reste.note };
  }
  const min = PRIME_ESTIMEE_PAR_TRANCHE.intermediaires.amount;
  const max = PRIME_ESTIMEE_PAR_TRANCHE.tres_modestes.amount;
  return {
    label: "Votre prime estimée",
    value: `de ${euros(min)} à ${euros(max)}`,
    note: "selon vos revenus et votre zone climatique",
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

// Carte de choix à fond photo : dégradé forest en bas, libellé blanc,
// zoom + bordure vert vif au survol, bordure + coche quand sélectionnée.
function PhotoChoice({
  label,
  image,
  alt,
  selected,
  onSelect,
  ratioClass = "aspect-[4/3]",
}: {
  label: string;
  image: string;
  alt: string;
  selected: boolean;
  onSelect: () => void;
  ratioClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative ${ratioClass} overflow-hidden rounded-2xl border-2 text-left transition-colors duration-[400ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
        selected ? "border-emerald-400" : "border-transparent hover:border-emerald-400"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, 280px"
        className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/20 to-transparent" />
      <span className="absolute bottom-3 left-4 text-lg font-semibold text-white">{label}</span>
      {selected ? (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-pill bg-emerald-400 text-white shadow-md">
          <Check strokeWidth={2.5} aria-hidden className="h-4 w-4" />
        </span>
      ) : null}
    </button>
  );
}

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
  const [contact, setContact] = useState<LeadContact>({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useState(false);

  const progress = useMemo(() => (step / STEPS_COUNT) * 100, [step]);
  const estimate = useMemo(() => (heating ? buildEstimate(heating) : null), [heating]);

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
    if (step !== STEP_CONTACT || !housing || !surface || !heating || !estimate) return;

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
      "Tranche de revenus : non demandée (à qualifier lors du rappel)",
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
                  <PhotoChoice
                    key={option.id}
                    label={option.label}
                    image={option.image}
                    alt={option.alt}
                    selected={housing === option.id}
                    onSelect={() => choose(setHousing, option.id)}
                  />
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
                  <PhotoChoice
                    key={option.id}
                    label={option.label}
                    image={option.image}
                    alt={option.alt}
                    selected={heating === option.id}
                    onSelect={() => choose(setHeating, option.id)}
                    ratioClass="aspect-square sm:aspect-[4/3]"
                  />
                ))}
              </div>
            </motion.section>
          )}

          {step === STEP_POSTAL && (
            <motion.section key="step-postal" {...stepMotion}>
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
                    if (postalCodeValid) goTo(STEP_RESULT);
                  }
                }}
                inputMode="numeric"
                placeholder="75001"
                className={`mt-5 text-lg ${inputClass}`}
              />
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

        {step === STEP_POSTAL && (
          <div className="mt-7 flex items-center justify-between gap-3">
            <button type="button" onClick={goBack} className={backButtonClass}>
              ← Retour
            </button>
            <button
              type="button"
              onClick={() => goTo(STEP_RESULT)}
              disabled={!postalCodeValid}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {(step === 2 || step === 3) && (
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
