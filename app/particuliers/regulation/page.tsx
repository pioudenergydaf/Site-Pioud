import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, Heater, Thermometer } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Particuliers - Régulation",
  description:
    "Régulation & pilotage : réduisez vos consommations avec les opérations CEE dédiées aux systèmes de régulation.",
};

const operations = [
  {
    title: "Régulation par sonde de température extérieure",
    ref: "BAR-TH-111",
    icon: Thermometer,
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-111.pdf",
    description:
      "Installation d'une régulation avec sonde extérieure sur un système de chauffage central existant.",
  },
  {
    title: "Régulation par programmation horaire pièce par pièce",
    ref: "BAR-TH-173",
    icon: Gauge,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-173%20v69-2%20%C3%A0%20compter%20du%2001-07-2025.pdf",
    description:
      "Système de programmation et régulation du chauffage pièce par pièce. Permet des économies de 15 à 25% sur le poste chauffage.",
    badge: "Valable jusqu'au 31/12/2026",
    badgeClass: "bg-emerald-100 text-forest",
  },
  {
    title: "Radiateur basse température",
    ref: "BAR-TH-110",
    icon: Heater,
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-110.pdf",
    description:
      "Radiateurs basse température pour un chauffage central, optimisés pour fonctionner avec une PAC ou une chaudière à condensation.",
  },
];

export default function ParticuliersRegulationPage() {
  return (
    <div>
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Particuliers", href: "/particuliers" },
            { label: "Régulation" },
          ]}
        />
      </section>

      <PageHero
        eyebrow="Particuliers - Régulation"
        title="Régulation & Pilotage : consommez juste avec les CEE"
        description="Régulation pièce par pièce, programmation horaire et pilotage intelligent : diminuez vos consommations sans dégrader votre confort."
        imageUrl="https://images.unsplash.com/photo-1770625467384-304e461ef1be?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer votre prime" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Opérations éligibles</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {operations.map((operation, index) => (
            <Reveal key={operation.title} delay={index * 0.08}>
              <article className="card-surface h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <operation.icon className="h-5 w-5" />
                  </span>
                  {operation.badge ? (
                    <span
                      className={`rounded-pill px-3 py-1 text-xs font-semibold ${operation.badgeClass ?? "bg-emerald-100 text-forest"}`}
                    >
                      {operation.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Fiche : {operation.ref}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{operation.description}</p>
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">Optimisez votre pilotage énergétique</h2>
            <p className="mt-3 text-white/90">
              Lancez votre simulation de prime CEE et identifiez rapidement les
              équipements de régulation adaptés à votre logement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez votre prime
              </Link>
              <Link href="/particuliers" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                Retour aux solutions particuliers
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
