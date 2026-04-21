import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building2, Home, Layers, Thermometer } from "lucide-react";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE Collectif",
  description:
    "CEE Collectif : solutions pour copropriétés et habitat résidentiel collectif avec accompagnement PIOUD ENERGY.",
};

const collectiveOperations = [
  {
    title: "Pompe à chaleur collective de type air/eau ou eau/eau pour l’eau chaude sanitaire",
    reference: "BAR-TH-169",
    icon: Thermometer,
    description:
      "Installation d'un système centralisé de PAC air/eau ou eau/eau pour la production d'eau chaude sanitaire en habitat résidentiel collectif. Solution performante pour décarboner les besoins ECS des copropriétés et immeubles.",
    examples: "Exemples : immeubles collectifs, copropriétés, résidences",
    pdfUrl: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
  },
  {
    title: "Pompe à chaleur collective de type air/eau",
    reference: "BAR-TH-179",
    icon: Thermometer,
    description:
      "Mise en place d'une ou plusieurs PAC collectives air/eau pour un système de chauffage collectif en bâtiment résidentiel existant. Permet de réduire durablement les consommations et les émissions associées au chauffage central.",
    examples: "Exemples : logements collectifs, copropriétés, immeubles",
    pdfUrl: "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie",
  },
  {
    title: "Rénovation globale d'un bâtiment résidentiel collectif",
    reference: "BAR-TH-177",
    icon: Building2,
    description:
      "Rénovation performante d'un immeuble résidentiel collectif avec gain énergétique global et valorisation CEE renforcée.",
    examples: "Exemples : copropriétés, résidences de logements, ensembles collectifs",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-177%20vA80-2%20%C3%A0%20compter%20du%2017-01-2026.pdf",
  },
  {
    title: "Isolation de combles ou de toitures",
    reference: "BAR-EN-101",
    icon: Home,
    description:
      "Isolation thermique des combles ou de la toiture d'immeubles résidentiels pour réduire les déperditions de chaleur.",
    examples: "Exemples : copropriétés avec combles perdus, résidences collectives",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-101%20vA64-4%20%C3%A0%20compter%20du%2001-01-2025.pdf",
  },
  {
    title: "Isolation de points singuliers d'un réseau",
    reference: "BAR-TH-161",
    icon: Layers,
    description:
      "Calorifugeage des points singuliers des réseaux hydrauliques de chauffage et d'eau chaude sanitaire pour limiter les pertes thermiques.",
    examples: "Exemples : chaufferies collectives, réseaux ECS de copropriétés",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-161%20vA71-3%20%C3%A0%20compter%20du%2001-08-2025.pdf",
  },
];

export default function CollectifPage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels - Collectif"
        title="CEE Collectif : financez vos travaux en copropriété et habitat résidentiel collectif"
        description="PIOUD ENERGY accompagne les syndics, bailleurs et copropriétés pour identifier les meilleures opérations CEE et sécuriser les primes sur les projets collectifs."
        imageUrl="https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer mon projet collectif" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Opérations CEE prioritaires en habitat collectif
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-muted">
            Les fiches suivantes sont particulièrement adaptées aux projets de
            copropriétés et d&apos;immeubles résidentiels collectifs.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {collectiveOperations.map((operation, index) => (
            <Reveal key={operation.title} delay={(index % 3) * 0.06}>
              <article className="card-surface h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <operation.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Fiche : {operation.reference}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {operation.description}
                </p>
                <p className="mt-3 text-sm font-medium text-ink-muted">{operation.examples}</p>
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-ink">Notre accompagnement collectif</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Audit énergétique de l'immeuble et priorisation des gisements CEE",
                  "Montage du plan de financement avec simulation des primes",
                  "Constitution du dossier réglementaire avant engagement des travaux",
                  "Suivi de conformité et versement des primes",
                ].map((step, index) => (
                  <article key={step} className="card-surface p-5">
                    <p className="text-sm font-semibold uppercase text-forest-soft">
                      Étape {index + 1}
                    </p>
                    <p className="mt-2 text-ink-muted">{step}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80"
                alt="Copropriété en projet de rénovation énergétique"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">
              Lancez votre projet CEE en habitat collectif
            </h2>
            <p className="mt-3 max-w-3xl text-white/90">
              Obtenez une estimation rapide des primes et un cadrage opérationnel
              adapté à votre copropriété.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez vos primes CEE collectif
              </Link>
              <Link href="/contact" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                Parler à un expert
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
