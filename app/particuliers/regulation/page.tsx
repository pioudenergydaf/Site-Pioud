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
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/Fiche%20BAR-TH-111.pdf",
    description:
      "Installation d'une régulation avec sonde extérieure sur un système de chauffage central existant.",
  },
  {
    title: "Régulation par programmation horaire pièce par pièce",
    ref: "BAR-TH-173",
    icon: Gauge,
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/Fiche%20BAR-TH-173.pdf",
    description:
      "Système de programmation et régulation du chauffage pièce par pièce. Permet des économies de 15 à 25% sur le poste chauffage.",
    badge: "Valable jusqu'au 31/12/2026",
    badgeClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Radiateur basse température",
    ref: "BAR-TH-110",
    icon: Heater,
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/Fiche%20BAR-TH-110.pdf",
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
        imageUrl="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer votre prime" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">Opérations éligibles</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {operations.map((operation, index) => (
            <Reveal key={operation.title} delay={index * 0.08}>
              <article className="card-surface h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <operation.icon className="h-5 w-5" />
                  </span>
                  {operation.badge ? (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${operation.badgeClass ?? "bg-emerald-100 text-emerald-700"}`}
                    >
                      {operation.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fiche : {operation.ref}
                </p>
                <p className="mt-3 text-sm text-slate-600">{operation.description}</p>
                <OfficialSheetLinks pdfUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-white">
            <h2 className="text-3xl font-bold">Optimisez votre pilotage énergétique</h2>
            <p className="mt-3 text-white/90">
              Lancez votre simulation de prime CEE et identifiez rapidement les
              équipements de régulation adaptés à votre logement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#0F2B46]"
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
