"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  CheckCircle2,
  Flame,
  Gauge,
  Home,
  Lightbulb,
  ShieldCheck,
  Square,
  Target,
  Thermometer,
  Wind,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { type ComponentType, useMemo, useState } from "react";

type Profile = "particulier" | "professionnel" | "collectivite";
type BuildingType = "maison" | "appartement" | "batiment_pro";
type Energy = "electrique" | "gaz" | "fioul" | "autre";
type PacType = "air_eau" | "air_air";

type WorkId =
  | "isolation_combles"
  | "isolation_murs"
  | "pac"
  | "chaudiere_biomasse"
  | "fenetres"
  | "vmc_double_flux"
  | "thermostat"
  | "eclairage_led";

type LeadForm = {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  consent: boolean;
};

const STEPS_COUNT = 4;

const profiles: { id: Profile; label: string; description: string }[] = [
  {
    id: "particulier",
    label: "Particulier",
    description: "Maison ou appartement en rénovation énergétique",
  },
  {
    id: "professionnel",
    label: "Professionnel",
    description: "Locaux tertiaires, industrie ou commerce",
  },
  {
    id: "collectivite",
    label: "Collectivité",
    description: "Patrimoine public et infrastructures territoriales",
  },
];

const workOptions: {
  id: WorkId;
  label: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "isolation_combles", label: "Isolation combles", icon: Home },
  { id: "isolation_murs", label: "Isolation murs", icon: Building },
  { id: "pac", label: "Pompe à chaleur", icon: Thermometer },
  { id: "chaudiere_biomasse", label: "Chaudière biomasse", icon: Flame },
  { id: "fenetres", label: "Fenêtres", icon: Square },
  { id: "vmc_double_flux", label: "VMC double flux", icon: Wind },
  { id: "thermostat", label: "Thermostat", icon: Gauge },
  { id: "eclairage_led", label: "Éclairage LED", icon: Lightbulb },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+33)[1-9](\d{2}){4}$/;

export function SimulatorWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedWorks, setSelectedWorks] = useState<WorkId[]>([]);
  const [surface, setSurface] = useState(90);
  const [postalCode, setPostalCode] = useState("");
  const [buildingType, setBuildingType] = useState<BuildingType>("maison");
  const [currentEnergy, setCurrentEnergy] = useState<Energy>("gaz");
  const [pacType, setPacType] = useState<PacType>("air_eau");
  const [pacUnits, setPacUnits] = useState(1);
  const [ledPoints, setLedPoints] = useState(20);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    consent: false,
  });

  const progress = useMemo(() => (step / STEPS_COUNT) * 100, [step]);

  const isWorkSelected = (workId: WorkId) => selectedWorks.includes(workId);

  const toggleWork = (workId: WorkId) => {
    setSelectedWorks((current) =>
      current.includes(workId)
        ? current.filter((id) => id !== workId)
        : [...current, workId],
    );
  };

  const handleLeadFieldChange = (field: keyof LeadForm, value: string | boolean) => {
    setLeadForm((current) => ({
      ...current,
      [field]: value,
    }));
    setFormError("");
  };

  const canContinue = () => {
    if (step === 1) return profile !== null;
    if (step === 2) return selectedWorks.length > 0;
    if (step === 3) {
      const postalValid = /^[0-9]{5}$/.test(postalCode);
      return postalValid && surface > 0;
    }
    return true;
  };

  const normalizePhone = (phone: string) => phone.replace(/\s+/g, "");

  const validateLeadForm = () => {
    const requiredFields: Array<keyof LeadForm> = [
      "lastName",
      "firstName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
    ];

    const missingField = requiredFields.some((field) => !String(leadForm[field]).trim());
    if (missingField) {
      return "Merci de remplir tous les champs obligatoires.";
    }

    if (!EMAIL_REGEX.test(leadForm.email.trim())) {
      return "Merci de saisir une adresse email valide.";
    }

    if (!PHONE_REGEX.test(normalizePhone(leadForm.phone))) {
      return "Merci de saisir un numéro de téléphone français valide.";
    }

    if (!leadForm.consent) {
      return "Merci d'accepter d'être recontacté pour envoyer votre demande.";
    }

    return "";
  };

  const goNext = () => {
    if (!canContinue()) return;
    if (step < STEPS_COUNT) {
      if (step === 3) {
        setLeadForm((current) => ({
          ...current,
          postalCode: current.postalCode || postalCode,
        }));
      }
      setStep((current) => current + 1);
    }
  };

  const goBack = () => {
    if (step > 1 && !isSubmitting) {
      setStep((current) => current - 1);
      setFormError("");
    }
  };

  const submitLead = async () => {
    const validationError = validateLeadForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    const payload = {
      formType: "contact" as const,
      source: "simulateur",
      profile,
      selectedWorks,
      project: {
        surface,
        postalCode,
        buildingType,
        currentEnergy,
        pacType: isWorkSelected("pac") ? pacType : undefined,
        pacUnits: isWorkSelected("pac") && pacType === "air_air" ? pacUnits : undefined,
        ledPoints: isWorkSelected("eclairage_led") ? ledPoints : undefined,
      },
      lead: {
        lastName: leadForm.lastName.trim(),
        firstName: leadForm.firstName.trim(),
        email: leadForm.email.trim(),
        phone: normalizePhone(leadForm.phone),
        address: leadForm.address.trim(),
        city: leadForm.city.trim(),
        postalCode: leadForm.postalCode.trim(),
        consent: leadForm.consent,
      },
    };

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
    } catch {
      setFormError(
        "Une erreur est survenue lors de l'envoi. Merci de réessayer dans quelques instants.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSimulation = () => {
    setStep(1);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setFormError("");
    setProfile(null);
    setSelectedWorks([]);
    setSurface(90);
    setPostalCode("");
    setBuildingType("maison");
    setCurrentEnergy("gaz");
    setPacType("air_eau");
    setPacUnits(1);
    setLedPoints(20);
    setLeadForm({
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      consent: false,
    });
  };

  if (isSubmitted) {
    return (
      <section className="mx-auto w-full max-w-5xl rounded-card-lg bg-emerald-50 p-4 sm:p-6">
        <div className="card-surface rounded-card-lg border border-ink/10 bg-white p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-pill bg-emerald-100 text-emerald-500">
              <CheckCircle2 className="h-16 w-16" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-light tracking-tight text-navy-900 sm:text-4xl">
              Votre demande a bien été reçue
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Merci pour votre confiance. Un expert Pioud Energy étudie actuellement
              votre projet et vous recontactera sous 24 heures ouvrées par téléphone
              ou email.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6">
            <p className="text-sm font-semibold text-navy-900">
              ℹ Pourquoi pas de chiffre immédiat ?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-900/90">
              Chaque projet CEE est unique. Le montant de votre prime dépend de votre
              zone climatique, de la nature des travaux, de votre situation (précarité
              énergétique ou non) et d&apos;un audit technique obligatoire. Notre équipe
              réalise cette analyse gratuitement et sans engagement, pour vous
              transmettre un chiffrage exact et opposable.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-ink/10 bg-white p-5">
              <Target className="h-6 w-6 text-emerald-500" />
              <p className="mt-3 text-sm font-semibold text-ink">Analyse personnalisée</p>
              <p className="mt-1 text-sm text-ink-muted">
                Étude complète de votre dossier par un expert certifié
              </p>
            </article>
            <article className="rounded-2xl border border-ink/10 bg-white p-5">
              <Zap className="h-6 w-6 text-emerald-500" />
              <p className="mt-3 text-sm font-semibold text-ink">Réponse sous 24h</p>
              <p className="mt-1 text-sm text-ink-muted">
                Vous êtes recontacté rapidement par téléphone ou email
              </p>
            </article>
            <article className="rounded-2xl border border-ink/10 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
              <p className="mt-3 text-sm font-semibold text-ink">
                100% gratuit et sans engagement
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Aucun frais, aucune obligation de votre part
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+33189704520"
              className="inline-flex w-full items-center justify-center rounded-pill bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 sm:w-auto"
            >
              Nous appeler maintenant
            </a>
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-pill border border-navy-900/20 px-6 py-3 font-semibold text-navy-900 transition hover:bg-navy-900/5 sm:w-auto"
            >
              Retour à l&apos;accueil
            </Link>
          </div>

          <p className="mt-8 text-xs text-navy-900/50">
            Pioud Energy est mandataire CEE agréé. Nos analyses sont conformes aux
            obligations du Code de l&apos;énergie (articles L.221-1 et suivants). Les
            primes CEE sont attribuées sous conditions, après validation technique du
            dossier par notre équipe et acceptation par l&apos;obligé.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="card-surface mx-auto w-full max-w-5xl p-6 sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-soft">
            Étape {step}/{STEPS_COUNT}
          </p>
          <p className="text-sm font-semibold text-ink">Simulation interactive CEE</p>
        </div>
        <div className="h-2 w-full rounded-pill bg-cream-soft">
          <motion.div
            className="h-2 rounded-pill bg-gradient-to-r from-forest to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="step-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-ink">1. Vous êtes</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {profiles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProfile(item.id)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    profile === item.id
                      ? "border-forest-soft bg-sage"
                      : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
                  }`}
                >
                  <p className="text-lg font-semibold text-ink">{item.label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
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
            <h2 className="text-2xl font-bold text-ink">2. Vos travaux</h2>
            <p className="mt-2 text-ink-muted">
              Sélectionnez un ou plusieurs travaux éligibles.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workOptions.map((work) => (
                <button
                  key={work.id}
                  type="button"
                  onClick={() => toggleWork(work.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isWorkSelected(work.id)
                      ? "border-forest-soft bg-sage"
                      : "border-ink/10 hover:-translate-y-0.5 hover:border-forest-soft"
                  }`}
                >
                  <span className="inline-flex rounded-lg bg-white p-2 text-forest-soft">
                    <work.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-ink">{work.label}</p>
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
            <h2 className="text-2xl font-bold text-ink">3. Votre projet</h2>

            <div className="mt-6 space-y-5">
              <div className="card-surface p-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="surface" className="font-semibold text-ink">
                    Surface estimée (m²)
                  </label>
                  <span className="rounded-pill bg-sage px-3 py-1 text-sm font-semibold text-forest">
                    {surface} m²
                  </span>
                </div>
                <input
                  id="surface"
                  type="range"
                  min={20}
                  max={500}
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                  className="mt-4 w-full accent-lime"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="card-surface p-5">
                  <span className="block text-sm font-semibold text-ink">Code postal</span>
                  <input
                    value={postalCode}
                    onChange={(e) =>
                      setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                    }
                    placeholder="94370"
                    className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                  />
                </label>

                <label className="card-surface p-5">
                  <span className="block text-sm font-semibold text-ink">
                    Type de logement
                  </span>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                    className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                  >
                    <option value="maison">Maison</option>
                    <option value="appartement">Appartement</option>
                    <option value="batiment_pro">Bâtiment professionnel</option>
                  </select>
                </label>

                <label className="card-surface p-5 md:col-span-2">
                  <span className="block text-sm font-semibold text-ink">
                    Énergie actuelle
                  </span>
                  <select
                    value={currentEnergy}
                    onChange={(e) => setCurrentEnergy(e.target.value as Energy)}
                    className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                  >
                    <option value="electrique">Électrique</option>
                    <option value="gaz">Gaz</option>
                    <option value="fioul">Fioul</option>
                    <option value="autre">Autre</option>
                  </select>
                </label>
              </div>

              {isWorkSelected("pac") ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="card-surface p-5">
                    <span className="block text-sm font-semibold text-ink">
                      Type de PAC
                    </span>
                    <select
                      value={pacType}
                      onChange={(e) => setPacType(e.target.value as PacType)}
                      className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                    >
                      <option value="air_eau">PAC air/eau</option>
                      <option value="air_air">PAC air/air</option>
                    </select>
                  </label>

                  {pacType === "air_air" ? (
                    <label className="card-surface p-5">
                      <span className="block text-sm font-semibold text-ink">
                        Nombre d&apos;unités PAC air/air
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={pacUnits}
                        onChange={(e) =>
                          setPacUnits(Math.max(1, Number(e.target.value) || 1))
                        }
                        className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                      />
                    </label>
                  ) : null}
                </div>
              ) : null}

              {isWorkSelected("eclairage_led") ? (
                <label className="card-surface block p-5">
                  <span className="block text-sm font-semibold text-ink">
                    Nombre de points lumineux LED
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={ledPoints}
                    onChange={(e) =>
                      setLedPoints(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                  />
                </label>
              ) : null}
            </div>
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
            <h2 className="text-2xl font-bold text-ink">4. Vos coordonnées</h2>
            <p className="mt-2 text-ink-muted">
              Un expert Pioud Energy analyse votre projet et vous recontacte sous 24h
              ouvrées.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Nom *</span>
                <input
                  required
                  value={leadForm.lastName}
                  onChange={(e) => handleLeadFieldChange("lastName", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Prénom *</span>
                <input
                  required
                  value={leadForm.firstName}
                  onChange={(e) => handleLeadFieldChange("firstName", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Email *</span>
                <input
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => handleLeadFieldChange("email", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Téléphone *</span>
                <input
                  type="tel"
                  required
                  value={leadForm.phone}
                  onChange={(e) => handleLeadFieldChange("phone", e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5 md:col-span-2">
                <span className="block text-sm font-semibold text-ink">Adresse *</span>
                <input
                  required
                  value={leadForm.address}
                  onChange={(e) => handleLeadFieldChange("address", e.target.value)}
                  placeholder="N° et voie"
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Ville *</span>
                <input
                  required
                  value={leadForm.city}
                  onChange={(e) => handleLeadFieldChange("city", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>

              <label className="card-surface p-5">
                <span className="block text-sm font-semibold text-ink">Code postal *</span>
                <input
                  required
                  value={leadForm.postalCode}
                  onChange={(e) =>
                    handleLeadFieldChange(
                      "postalCode",
                      e.target.value.replace(/\D/g, "").slice(0, 5),
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-cream-soft p-4">
              <input
                type="checkbox"
                required
                checked={leadForm.consent}
                onChange={(e) => handleLeadFieldChange("consent", e.target.checked)}
                className="mt-1 h-4 w-4 accent-emerald-500"
              />
              <span className="text-sm text-ink-muted">
                J&apos;accepte d&apos;être recontacté par Pioud Energy dans le cadre de ma
                demande, conformément à la politique de confidentialité.
              </span>
            </label>

            {formError ? (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </p>
            ) : null}
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mt-8">
        {!isSubmitted ? (
          <>
            {step < STEPS_COUNT ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1 || isSubmitting}
                  className="rounded-pill border border-ink/10 px-5 py-2 text-sm font-semibold text-ink-muted transition hover:border-ink/15 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Retour
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue()}
                  className="rounded-pill bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuer
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={submitLead}
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-pill bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isSubmitting ? "Envoi en cours..." : "Recevoir mon analyse personnalisée"}
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
          </>
        ) : (
          <button
            type="button"
            onClick={resetSimulation}
            className="rounded-pill bg-forest px-6 py-2.5 text-sm font-medium text-white transition hover:bg-forest-soft"
          >
            Nouvelle simulation
          </button>
        )}
      </div>
    </div>
  );
}
