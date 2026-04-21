import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplets,
  Flame,
  Network,
  Sun,
  Thermometer,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Particuliers - Chauffage",
  description:
    "Chauffage & eau chaude : remplacez votre ancien système avec les CEE et consultez les fiches officielles.",
};

const operations = [
  {
    title: "Pompe à chaleur air/eau",
    ref: "BAR-TH-171",
    icon: Thermometer,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-171%20vA78.4%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "PAC air/eau pour le chauffage et/ou l'eau chaude sanitaire. Bonification Coup de pouce x5 en remplacement d'une chaudière charbon, fioul ou gaz. Primes de 5 000€ à 12 000€ selon les revenus et la zone climatique.",
    badges: [
      { label: "🔥 Coup de pouce x5", className: "bg-lime-soft text-forest" },
      { label: "⭐ Revalorisé en 2026", className: "bg-lime-soft text-forest" },
    ],
  },
  {
    title: "Pompe à chaleur eau/eau ou sol/eau",
    ref: "BAR-TH-172",
    icon: Droplets,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-172%20vA78.4%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "PAC géothermique ou sur nappe phréatique. Bonification Coup de pouce x5 en remplacement d'une chaudière fossile. Très hautes performances.",
    badges: [{ label: "🔥 Coup de pouce x5", className: "bg-lime-soft text-forest" }],
  },
  {
    title: "Chaudière biomasse individuelle",
    ref: "BAR-TH-113",
    icon: Flame,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-113%20vA79-4%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "Chaudière bois ou granulés. Bonification Coup de pouce x5 en remplacement d'une chaudière fossile. Attention : exclue de MaPrimeRénov' en geste seul depuis 2026, mais toujours éligible aux CEE et Coup de pouce.",
    badges: [
      {
        label: "⚠️ Exclu MPR mono-geste en 2026",
        className: "bg-peach-soft text-forest-soft",
      },
    ],
  },
  {
    title: "Appareil indépendant de chauffage au bois",
    ref: "BAR-TH-112",
    icon: Flame,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-112%20vA46-3%20%C3%A0%20compter%20du%2001-10-2022.pdf",
    description:
      "Poêle à bûches ou à granulés labellisé Flamme Verte 7*. Excellent complément de chauffage, très bon rendement et primes CEE attractives.",
  },
  {
    title: "Système solaire combiné",
    ref: "BAR-TH-143",
    icon: Sun,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-143%20vA79-6%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "Système solaire thermique pour le chauffage et l'eau chaude sanitaire. Bonification x2 pour toutes les opérations engagées à compter de 2026.",
    badges: [{ label: "🔥 Bonification x2 en 2026", className: "bg-lime-soft text-forest" }],
  },
  {
    title: "Chauffe-eau solaire individuel",
    ref: "BAR-TH-101",
    icon: Sun,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-101%20vA78.3%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "Production d'eau chaude sanitaire par énergie solaire. Idéal en zones ensoleillées (H2, H3).",
  },
  {
    title: "Chauffe-eau thermodynamique",
    ref: "BAR-TH-148",
    icon: Zap,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-148%20vA78.4%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "Chauffe-eau thermodynamique à accumulation. Divise par 2 à 3 la consommation liée à l'eau chaude.",
  },
  {
    title: "Raccordement réseau de chaleur",
    ref: "BAR-TH-137",
    icon: Network,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-137%20vA79-4%20%C3%A0%20compter%20du%2001-01-2026.pdf",
    description:
      "Raccordement d'une maison individuelle à un réseau de chaleur efficace. Bonification Coup de pouce en remplacement d'une chaudière fossile.",
  },
];

export default function ParticuliersChauffagePage() {
  return (
    <div>
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Particuliers", href: "/particuliers" },
            { label: "Chauffage" },
          ]}
        />
      </section>

      <PageHero
        eyebrow="Particuliers - Chauffage"
        title="Chauffage & Eau chaude : remplacez votre ancien système avec les CEE"
        description="Les pompes à chaleur sont le pilier de la rénovation énergétique en 2026. Les primes CEE ont été massivement revalorisées avec des bonifications Coup de pouce x5."
        imageUrl="https://images.unsplash.com/photo-1554475499-4e40aa2b9e75?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer ma prime chauffage" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Les opérations éligibles</h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {operations.map((operation, index) => (
            <Reveal key={operation.title} delay={(index % 3) * 0.07}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                  <operation.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Fiche : {operation.ref}
                </p>
                <p className="mt-3 text-sm text-ink-muted">{operation.description}</p>
                {operation.badges ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {operation.badges.map((badge) => (
                      <span
                        key={badge.label}
                        className={`rounded-pill px-3 py-1 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                ) : null}
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface border-emerald-200 bg-sage/60 p-8">
            <h2 className="text-3xl font-bold text-ink">Coup de pouce Chauffage</h2>
            <p className="mt-3 text-ink-muted">
              Le Coup de pouce Chauffage multiplie par 5 le montant de votre prime
              CEE lorsque vous remplacez une chaudière charbon, fioul ou gaz par une
              PAC ou une chaudière biomasse.
            </p>
            <a
              href="https://www.ecologie.gouv.fr/politiques-publiques/coup-pouce-chauffage"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-forest-soft underline underline-offset-2"
            >
              Consulter la page officielle Coup de pouce Chauffage
            </a>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">Passez à l&apos;action sur votre chauffage</h2>
            <p className="mt-3 text-white/90">
              Estimez immédiatement votre prime et validez les meilleures opérations
              pour votre logement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez votre prime chauffage
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
