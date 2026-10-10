"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { TurnstileWidget } from "@/components/contact/turnstile-widget";
import { PacReassurance, REASSURANCE_TEXT } from "@/components/pac/pac-icon";
import { CONVERSION_FORM, reportConversion } from "@/lib/gtag";
import { CONSENT_TEXT } from "@/lib/pac-constants";
import {
  ATTRIBUTION_PARAMS,
  type Attribution,
  BUILDING_HEATING_LABEL,
  type BuildingHeating,
  buildCollectiveEstimate,
  buildEstimate,
  EMAIL_REGEX,
  type Estimate,
  flowFor,
  type Heating,
  type Housing,
  maskPhone,
  normalizePhone,
  PHONE_REGEX,
  POSTAL_CODE_REGEX,
  ROLE_LABEL,
  type Role,
  type Surface,
  UNITS_LABEL,
  type Units,
} from "@/lib/pac-estimate";
import { siteConfig } from "@/lib/site-data";

type LeadContact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

// Étapes possibles ; la séquence effective dépend du parcours :
// - maison : logement · surface · chauffage · code postal · résultat · coordonnées
// - copro  : logement · rôle · chauffage immeuble · nb logements · code postal · résultat · coordonnées
// - copro, chauffage individuel : logement · rôle · chauffage immeuble · résultat · coordonnées
type StepId =
  | "housing"
  | "surface"
  | "heating"
  | "role"
  | "buildingHeating"
  | "units"
  | "postal"
  | "result"
  | "contact";

function buildSequence(housing: Housing | null, buildingHeating: BuildingHeating | null): StepId[] {
  if (housing === "appartement") {
    if (buildingHeating === "individuel") {
      return ["housing", "role", "buildingHeating", "result", "contact"];
    }
    return ["housing", "role", "buildingHeating", "units", "postal", "result", "contact"];
  }
  return ["housing", "surface", "heating", "postal", "result", "contact"];
}

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

// Parcours copropriété
const roleOptions = (Object.keys(ROLE_LABEL) as Role[]).map((id) => ({ id, label: ROLE_LABEL[id] }));

// Cartes photo (public/images/pac/copro/).
const buildingHeatingOptions: { id: BuildingHeating; label: string; image: string; alt: string }[] = [
  {
    id: "gaz_collectif",
    label: BUILDING_HEATING_LABEL.gaz_collectif,
    image: "/images/pac/copro/gaz-collectif.jpg",
    alt: "Chaufferie gaz collective",
  },
  {
    id: "fioul_collectif",
    label: BUILDING_HEATING_LABEL.fioul_collectif,
    image: "/images/pac/copro/fioul-collectif.jpg",
    alt: "Cuve de fioul collective",
  },
  {
    id: "reseau_chaleur",
    label: BUILDING_HEATING_LABEL.reseau_chaleur,
    image: "/images/pac/copro/reseau-chaleur.jpg",
    alt: "Sous-station de réseau de chaleur",
  },
  {
    id: "individuel",
    label: BUILDING_HEATING_LABEL.individuel,
    image: "/images/pac/copro/individuel.jpg",
    alt: "Radiateur individuel",
  },
  {
    id: "autre",
    label: BUILDING_HEATING_LABEL.autre,
    image: "/images/pac/copro/autre.jpg",
    alt: "Autre mode de chauffage",
  },
];

const unitsOptions = (Object.keys(UNITS_LABEL) as Units[]).map((id) => ({ id, label: UNITS_LABEL[id] }));

// ── Attribution (UTM / gclid) : lue dans l'URL à l'arrivée, conservée en
// sessionStorage pendant tout le parcours, envoyée avec le lead.
const ATTRIBUTION_KEY = "pac_attribution";

function readStoredAttribution(): Attribution {
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}

function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = { ...readStoredAttribution() };
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) next[key] = value.slice(0, 200);
    }
    if (!next.landingUrl) next.landingUrl = window.location.href.slice(0, 500);
    if (!next.referrer && document.referrer) next.referrer = document.referrer.slice(0, 500);
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    // sessionStorage indisponible (navigation privée stricte) : on continue sans.
  }
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

// Liste de choix texte (surface, rôle, nombre de logements).
function TextChoices<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { id: T; label: string }[];
  selected: T | null;
  onSelect: (id: T) => void;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onSelect(option.id)}
          className={choiceClass(selected === option.id)}
        >
          <p className="text-sm font-semibold text-ink">{option.label}</p>
        </button>
      ))}
    </div>
  );
}

const backButtonClass =
  "rounded-pill border border-ink/10 px-5 py-2 text-sm font-semibold text-ink-muted transition hover:border-ink/15 disabled:cursor-not-allowed disabled:opacity-40";

// Carte du simulateur : coins 16 px, ombre profonde, liseré vert clair.
// Identifiable comme un outil (étiquette flottante, titre, barre de progression).
const formCardClass =
  "relative rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-[#6EE7A8]/40";

// Étiquette flottante « Simulateur gratuit », à cheval sur le bord haut de la carte.
function SimulatorBadge() {
  return (
    <span className="absolute -top-4 left-6 inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill bg-[#6EE7A8] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1F3D2E]">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 flex-none"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8" />
        <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
      </svg>
      Simulateur gratuit
    </span>
  );
}

// Libellés du bouton d'action selon le résultat affiché.
const CTA_LABEL: Record<Estimate["kind"], string> = {
  amount: "Recevoir mon étude détaillée",
  collective: "Demander mon étude gratuite",
  individual: "Laisser mes coordonnées",
};

const CALLBACK_DELAY: Record<Estimate["kind"], string> = {
  amount: "24 h ouvrées",
  collective: "48 h ouvrées",
  individual: "24 h ouvrées",
};

export function PacLeadForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ confirmationSent: boolean } | null>(null);
  const [formError, setFormError] = useState("");
  const submitLock = useRef(false);
  const conversionReported = useRef(false);

  const [housing, setHousing] = useState<Housing | null>(null);
  const [surface, setSurface] = useState<Surface | null>(null);
  const [heating, setHeating] = useState<Heating | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [buildingHeating, setBuildingHeating] = useState<BuildingHeating | null>(null);
  const [units, setUnits] = useState<Units | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [contact, setContact] = useState<LeadContact>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    captureAttribution();
  }, []);

  // Conversion Google Ads : une seule fois, à l'affichage de l'écran de
  // remerciement (donc après la réponse OK du serveur).
  useEffect(() => {
    if (submitted && !conversionReported.current) {
      conversionReported.current = true;
      reportConversion(CONVERSION_FORM);
    }
  }, [submitted]);

  const sequence = useMemo(() => buildSequence(housing, buildingHeating), [housing, buildingHeating]);
  const stepsCount = sequence.length;
  const safeIndex = Math.min(stepIndex, stepsCount - 1);
  const stepId = sequence[safeIndex];
  const progressPercent = Math.round(((safeIndex + 1) / stepsCount) * 100);
  const flow = housing ? flowFor(housing) : "maison";

  const estimate = useMemo<Estimate | null>(() => {
    if (flow === "copro") return buildingHeating ? buildCollectiveEstimate(buildingHeating) : null;
    return heating ? buildEstimate(heating) : null;
  }, [flow, buildingHeating, heating]);

  const goTo = (index: number) => {
    setFormError("");
    setStepIndex(Math.min(Math.max(index, 0), stepsCount - 1));
  };

  // Sélection d'un choix puis passage automatique à l'étape suivante.
  const choose = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    window.setTimeout(() => setStepIndex((current) => current + 1), AUTO_ADVANCE_DELAY_MS);
  };

  const goBack = () => {
    if (safeIndex > 0 && !isSubmitting) goTo(safeIndex - 1);
  };
  const goNext = () => goTo(safeIndex + 1);

  const postalCodeValid = POSTAL_CODE_REGEX.test(postalCode);
  const ctaLabel = estimate ? CTA_LABEL[estimate.kind] : CTA_LABEL.amount;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitLock.current) return;
    if (stepId !== "contact" || !housing || !estimate) return;

    if (contact.firstName.trim().length < 2) {
      setFormError("Merci d'indiquer votre prénom.");
      return;
    }
    if (contact.lastName.trim().length < 2) {
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

    submitLock.current = true;
    setIsSubmitting(true);
    setFormError("");

    const payload: Record<string, unknown> = {
      // Type de formulaire : aiguille la validation dédiée côté API.
      form: flow === "copro" ? "pac-copro" : "pac",
      source: "pac-landing",
      flow,
      firstName: contact.firstName.trim(),
      lastName: contact.lastName.trim(),
      name: `${contact.firstName.trim()} ${contact.lastName.trim()}`,
      email: contact.email.trim(),
      phone: normalizePhone(contact.phone),
      housing,
      consent: true,
      consentText: CONSENT_TEXT,
      attribution: readStoredAttribution(),
    };
    if (flow === "copro") {
      payload.role = role;
      payload.buildingHeating = buildingHeating;
      if (buildingHeating !== "individuel") {
        payload.units = units;
        payload.postalCode = postalCode;
      }
    } else {
      payload.surface = surface;
      payload.heating = heating;
      payload.postalCode = postalCode;
    }
    const turnstileToken = formData.get("cf-turnstile-response");
    if (turnstileToken) payload["cf-turnstile-response"] = turnstileToken;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
        code?: string;
        confirmationSent?: boolean;
      };

      if (!response.ok || !data.success) {
        // Le code technique aide le support à identifier la cause sans les journaux.
        const base =
          data.message ||
          "Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.";
        setFormError(data.code ? `${base} (code : ${data.code})` : base);
        submitLock.current = false;
        return;
      }

      setSubmitted({ confirmationSent: data.confirmationSent !== false });
    } catch {
      setFormError("Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.");
      submitLock.current = false;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && estimate) {
    return (
      <div className={`${formCardClass} px-5 pb-6 pt-8 text-center sm:px-8 sm:pb-8`}>
        <SimulatorBadge />
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-pill bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">
          Merci {contact.firstName.trim()}, votre demande est bien enregistrée.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Un conseiller vous appelle sous {CALLBACK_DELAY[estimate.kind]} au{" "}
          <span className="whitespace-nowrap font-semibold text-ink">{maskPhone(contact.phone)}</span>.
          {submitted.confirmationSent
            ? " Un récapitulatif vient de vous être envoyé par email."
            : " Le récapitulatif par email n'a pas pu être envoyé ; votre demande est bien prise en compte."}
        </p>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          {estimate.label}
        </p>
        <p
          className={`mt-1 font-display font-light text-ink ${
            estimate.kind === "amount" ? "text-3xl" : "text-xl"
          }`}
        >
          {estimate.value}
        </p>
        {estimate.note ? (
          <p className="mt-2 text-sm font-medium text-emerald-700">{estimate.note}</p>
        ) : null}
        <PacReassurance className="mt-7" />
      </div>
    );
  }

  return (
    <div className={formCardClass}>
      <SimulatorBadge />
      <div className="px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
        <h2 className="font-serif text-3xl font-bold leading-tight text-[#1F3D2E]">
          Calculez vos aides en 2 minutes
        </h2>
        <p className="mt-1 text-sm text-slate-500">Résultat immédiat · 0 € d&apos;avance de frais</p>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-500" aria-live="polite">
          <p>
            Étape <span className="font-bold text-[#1F3D2E]">{safeIndex + 1}</span> sur {stepsCount}
          </p>
          <p>
            <span className="font-bold text-[#1F3D2E]">{progressPercent}</span> %
          </p>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
        >
          <div
            className="h-full rounded-full bg-[#6EE7A8] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait">
          {stepId === "housing" && (
            <motion.section key="housing" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Vous habitez en...</h3>
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

          {stepId === "surface" && (
            <motion.section key="surface" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Surface de votre logement</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Pour dimensionner la pompe à chaleur adaptée.
              </p>
              <TextChoices
                options={surfaceOptions}
                selected={surface}
                onSelect={(id) => choose(setSurface, id)}
              />
            </motion.section>
          )}

          {stepId === "heating" && (
            <motion.section key="heating" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Votre chauffage actuel</h3>
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

          {stepId === "role" && (
            <motion.section key="role" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Vous êtes</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Votre rôle dans la copropriété.
              </p>
              <TextChoices options={roleOptions} selected={role} onSelect={(id) => choose(setRole, id)} />
            </motion.section>
          )}

          {stepId === "buildingHeating" && (
            <motion.section key="buildingHeating" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Chauffage de l&apos;immeuble</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {buildingHeatingOptions.map((option) => (
                  <PhotoChoice
                    key={option.id}
                    label={option.label}
                    image={option.image}
                    alt={option.alt}
                    selected={buildingHeating === option.id}
                    onSelect={() => choose(setBuildingHeating, option.id)}
                    ratioClass="aspect-square sm:aspect-[4/3]"
                  />
                ))}
              </div>
            </motion.section>
          )}

          {stepId === "units" && (
            <motion.section key="units" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Nombre de logements</h3>
              <p className="mt-2 text-sm text-ink-muted">Dans l&apos;immeuble ou la copropriété.</p>
              <TextChoices options={unitsOptions} selected={units} onSelect={(id) => choose(setUnits, id)} />
            </motion.section>
          )}

          {stepId === "postal" && (
            <motion.section key="postal" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Votre code postal</h3>
              <p className="mt-2 text-sm text-ink-muted">
                Pour vérifier l&apos;éligibilité de votre zone aux aides 2026.
              </p>
              <label htmlFor="pac-postal" className="sr-only">
                Code postal
              </label>
              <input
                id="pac-postal"
                name="postalCode"
                autoComplete="postal-code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (postalCodeValid) goNext();
                  }
                }}
                inputMode="numeric"
                placeholder="75001"
                className={`mt-5 text-lg ${inputClass}`}
              />
            </motion.section>
          )}

          {stepId === "result" && estimate && (
            <motion.section key="result" {...stepMotion} className="mt-8 text-center">
              <span
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-pill ${
                  estimate.kind === "individual"
                    ? "bg-cream-soft text-ink-muted"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {estimate.kind === "individual" ? (
                  <Info className="h-8 w-8" />
                ) : (
                  <CheckCircle2 className="h-8 w-8" />
                )}
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                {estimate.label}
              </p>
              <p
                className={`mt-2 font-display font-light text-ink ${
                  estimate.kind === "amount" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
                }`}
              >
                {estimate.value}
              </p>
              {estimate.note ? (
                <p className="mt-2 text-sm font-medium text-emerald-700">{estimate.note}</p>
              ) : null}
              {estimate.kind === "amount" ? (
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Recevez votre étude détaillée : un conseiller Pioud Energy confirme ce
                  chiffrage sur devis après visite technique.
                </p>
              ) : estimate.kind === "collective" ? (
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Sous conditions d&apos;éligibilité. Un conseiller Pioud Energy cadre
                  l&apos;étude avec vous après visite technique de la chaufferie.
                </p>
              ) : null}
            </motion.section>
          )}

          {stepId === "contact" && (
            <motion.section key="contact" {...stepMotion}>
              <h3 className="mt-8 font-serif text-2xl font-bold text-[#1F3D2E]">Vos coordonnées</h3>
              <p className="mt-2 text-sm text-ink-muted">
                {flow === "copro"
                  ? "Pour organiser votre étude."
                  : "Pour vous transmettre votre étude détaillée."}
              </p>
              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pac-first-name" className="sr-only">
                      Prénom
                    </label>
                    <input
                      id="pac-first-name"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      value={contact.firstName}
                      onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                      placeholder="Prénom"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="pac-last-name" className="sr-only">
                      Nom
                    </label>
                    <input
                      id="pac-last-name"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      value={contact.lastName}
                      onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                      placeholder="Nom"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pac-phone" className="sr-only">
                    Téléphone
                  </label>
                  <input
                    id="pac-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    placeholder="06 12 34 56 78"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="pac-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="pac-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    placeholder="vous@email.fr"
                    className={inputClass}
                  />
                </div>
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
          <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </p>
        ) : null}

        {stepId === "postal" && (
          <div className="mt-7 flex items-center justify-between gap-3">
            <button type="button" onClick={goBack} className={backButtonClass}>
              ← Retour
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!postalCodeValid}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {(stepId === "surface" ||
          stepId === "heating" ||
          stepId === "role" ||
          stepId === "buildingHeating" ||
          stepId === "units") && (
          <div className="mt-7">
            <button type="button" onClick={goBack} className={backButtonClass}>
              ← Retour
            </button>
          </div>
        )}

        {stepId === "result" && (
          <div className="mt-7 space-y-3">
            <button type="button" onClick={goNext} className="btn-primary w-full justify-center">
              {ctaLabel}
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

        {stepId === "contact" && (
          <div className="mt-7 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Envoi en cours..." : ctaLabel}
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
      </div>

      <div className="rounded-b-2xl border-t border-slate-100 bg-slate-50 px-8 py-4 text-center text-[11px] uppercase tracking-widest text-slate-500">
        {REASSURANCE_TEXT}
      </div>
    </div>
  );
}
