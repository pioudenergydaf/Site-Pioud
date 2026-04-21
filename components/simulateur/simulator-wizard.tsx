"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  Flame,
  Gauge,
  Home,
  Lightbulb,
  Square,
  Thermometer,
  Wind,
} from "lucide-react";
import Link from "next/link";
import { type ComponentType, useMemo, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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

type BreakdownLine = {
  label: string;
  amount: number;
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

type SimulationResult = {
  total: number;
  breakdown: BreakdownLine[];
};

export function SimulatorWizard() {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedWorks, setSelectedWorks] = useState<WorkId[]>([]);
  const [surface, setSurface] = useState(90);
  const [postalCode, setPostalCode] = useState("");
  const [buildingType, setBuildingType] = useState<BuildingType>("maison");
  const [currentEnergy, setCurrentEnergy] = useState<Energy>("gaz");
  const [pacType, setPacType] = useState<PacType>("air_eau");
  const [pacUnits, setPacUnits] = useState(1);
  const [ledPoints, setLedPoints] = useState(20);

  const progress = useMemo(() => (step / STEPS_COUNT) * 100, [step]);

  const isWorkSelected = (workId: WorkId) => selectedWorks.includes(workId);

  const toggleWork = (workId: WorkId) => {
    setSelectedWorks((current) =>
      current.includes(workId)
        ? current.filter((id) => id !== workId)
        : [...current, workId],
    );
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

  const computeSimulation = (): SimulationResult => {
    const breakdown: BreakdownLine[] = [];
    const area = Math.max(1, surface);

    if (isWorkSelected("isolation_combles")) {
      breakdown.push({
        label: "Isolation combles",
        amount: 12 * area,
      });
    }
    if (isWorkSelected("isolation_murs")) {
      breakdown.push({
        label: "Isolation murs",
        amount: 15 * area,
      });
    }
    if (isWorkSelected("pac")) {
      if (pacType === "air_eau") {
        breakdown.push({ label: "PAC air/eau", amount: 4000 });
      } else {
        breakdown.push({
          label: `PAC air/air (${pacUnits} unité${pacUnits > 1 ? "s" : ""})`,
          amount: 900 * pacUnits,
        });
      }
    }
    if (isWorkSelected("chaudiere_biomasse")) {
      breakdown.push({ label: "Chaudière biomasse", amount: 4500 });
    }
    if (isWorkSelected("fenetres")) {
      breakdown.push({ label: "Fenêtres", amount: 80 * area });
    }
    if (isWorkSelected("vmc_double_flux")) {
      breakdown.push({ label: "VMC double flux", amount: 2500 });
    }
    if (isWorkSelected("thermostat")) {
      breakdown.push({ label: "Thermostat", amount: 150 });
    }
    if (isWorkSelected("eclairage_led")) {
      breakdown.push({
        label: `Éclairage LED (${ledPoints} points lumineux)`,
        amount: 3 * ledPoints,
      });
    }

    const total = breakdown.reduce((acc, line) => acc + line.amount, 0);
    return { total, breakdown };
  };

  const goNext = () => {
    if (!canContinue()) return;

    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }

    if (step === 3) {
      setIsCalculating(true);
      setStep(4);
      window.setTimeout(() => {
        setResult(computeSimulation());
        setIsCalculating(false);
      }, 2000);
    }
  };

  const goBack = () => {
    if (step > 1 && !isCalculating) {
      setStep((current) => current - 1);
    }
  };

  const resetSimulation = () => {
    setStep(1);
    setResult(null);
    setIsCalculating(false);
    setProfile(null);
    setSelectedWorks([]);
    setSurface(90);
    setPostalCode("");
    setBuildingType("maison");
    setCurrentEnergy("gaz");
    setPacType("air_eau");
    setPacUnits(1);
    setLedPoints(20);
  };

  return (
    <div className="card-surface mx-auto w-full max-w-5xl p-6 sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink-soft">
            Étape {step}/{STEPS_COUNT}
          </p>
          <p className="text-sm font-semibold text-ink">
            Simulation interactive CEE
          </p>
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
                    onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="94370"
                    className="mt-2 w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-forest-soft focus:ring-2 focus:ring-sage"
                  />
                </label>

                <label className="card-surface p-5">
                  <span className="block text-sm font-semibold text-ink">Type de logement</span>
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
                  <span className="block text-sm font-semibold text-ink">Énergie actuelle</span>
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
                        onChange={(e) => setPacUnits(Math.max(1, Number(e.target.value) || 1))}
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
                    onChange={(e) => setLedPoints(Math.max(1, Number(e.target.value) || 1))}
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
            <h2 className="text-2xl font-bold text-ink">4. Résultat</h2>

            {isCalculating ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-ink/10 bg-cream-soft py-16">
                <div className="h-10 w-10 animate-spin rounded-pill border-4 border-sage border-t-forest-soft" />
                <p className="mt-4 font-medium text-ink-muted">
                  Calcul de votre estimation en cours...
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
                <div className="card-surface p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-forest">
                    Prime CEE estimée
                  </p>
                  <div className="mt-2 text-5xl font-extrabold text-ink">
                    <AnimatedCounter value={result?.total ?? 0} suffix="€" />
                  </div>
                  <p className="mt-3 text-sm text-ink-soft">
                    Estimation indicative, à confirmer après analyse du dossier et des
                    justificatifs techniques.
                  </p>

                  <div className="mt-6 space-y-3">
                    {result?.breakdown.map((line) => (
                      <div
                        key={line.label}
                        className="flex items-center justify-between rounded-xl border border-ink/10 bg-cream-soft px-4 py-3"
                      >
                        <p className="text-sm font-medium text-ink-muted">{line.label}</p>
                        <p className="text-sm font-bold text-ink">
                          {line.amount.toLocaleString("fr-FR")} €
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-surface p-6">
                  <h3 className="text-xl font-bold text-ink">Prochaine étape</h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    Obtenez une estimation affinée avec un conseiller spécialisé.
                  </p>
                  <Link href="/contact" className="btn-primary mt-5 w-full justify-center">
                    Être rappelé par un conseiller
                  </Link>
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="btn-secondary mt-3 w-full justify-center"
                  >
                    Refaire une simulation
                  </button>
                </div>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || isCalculating}
          className="rounded-pill border border-ink/10 px-5 py-2 text-sm font-semibold text-ink-muted transition hover:border-ink/15 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Retour
        </button>
        {step < 4 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue()}
            className="rounded-pill bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {step === 3 ? "Calculer mon estimation" : "Continuer"}
          </button>
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
