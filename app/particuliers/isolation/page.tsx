import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Building, Home, LayoutGrid, Layers, Pipette } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Particuliers - Isolation",
  description:
    "Isolation thermique : découvrez les opérations CEE éligibles, les exigences techniques et les liens vers les fiches officielles.",
};

const operations = [
  {
    title: "Isolation des combles ou toitures",
    ref: "BAR-EN-101",
    icon: Home,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-101%20vA64-6%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
    description:
      "Isolation des combles perdus, aménagés ou de la toiture. C'est l'opération la plus réalisée en France (16,7% des CEE délivrés). Réduction immédiate des déperditions par le toit, qui représentent jusqu'à 30% des pertes de chaleur.",
    requirement: "Résistance thermique R ≥ 7 m².K/W en combles perdus, R ≥ 6 m².K/W en rampants",
    badge: "⭐ Top 2 des CEE en France",
    badgeClass: "bg-sage text-forest",
  },
  {
    title: "Isolation des murs",
    ref: "BAR-EN-102",
    icon: Layers,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-102%20vA65-4%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
    description:
      "Isolation thermique des murs par l'intérieur (ITI) ou par l'extérieur (ITE). Représente 14,8% des CEE délivrés. Attention : exclue de MaPrimeRénov' en geste seul depuis 2026, mais toujours éligible aux CEE.",
    requirement: "Résistance thermique R ≥ 3,7 m².K/W",
    badge: "⚠️ Exclu MPR mono-geste en 2026",
    badgeClass: "bg-peach-soft text-forest-soft",
  },
  {
    title: "Isolation d'un plancher",
    ref: "BAR-EN-103",
    icon: LayoutGrid,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-103%20vA64-6%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
    description:
      "Isolation des planchers bas donnant sur un sous-sol, un vide sanitaire ou un passage ouvert. Représente 6% des CEE délivrés.",
    requirement: "Résistance thermique R ≥ 3 m².K/W",
  },
  {
    title: "Isolation des toitures-terrasses",
    ref: "BAR-EN-105",
    icon: Building,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-105%20vA64-4%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
    description:
      "Isolation thermique des toitures-terrasses dans les bâtiments résidentiels existants.",
    requirement: "Résistance thermique R ≥ 4,5 m².K/W",
  },
  {
    title: "Isolation d'un réseau hydraulique",
    ref: "BAR-TH-160",
    icon: Pipette,
    pdfUrl:
      "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=BAR-TH-160",
    description:
      "Calorifugeage des réseaux de chauffage et d'eau chaude sanitaire hors du volume chauffé. 5,4% des CEE délivrés. Souvent oublié, pourtant très rentable.",
    badge: "💡 Souvent oublié",
    badgeClass: "bg-lime-soft text-forest",
  },
];

export default function ParticuliersIsolationPage() {
  return (
    <div>
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Particuliers", href: "/particuliers" },
            { label: "Isolation" },
          ]}
        />
      </section>

      <PageHero
        eyebrow="Particuliers - Isolation"
        title="Isolation thermique : les primes CEE pour votre logement"
        description="L'isolation est le geste le plus rentable en rénovation énergétique. Elle représente plus de 37% des CEE délivrés en France."
        imageUrl="https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer ma prime isolation" }}
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
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <operation.icon className="h-5 w-5" />
                  </span>
                  {operation.badge ? (
                    <span
                      className={`rounded-pill px-3 py-1 text-xs font-semibold ${operation.badgeClass ?? "bg-lime-soft text-forest"}`}
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
                {operation.requirement ? (
                  <p className="mt-3 text-sm font-medium text-ink-muted">
                    Exigence technique : {operation.requirement}
                  </p>
                ) : null}
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface p-8">
              <h2 className="text-3xl font-bold text-ink">Pourquoi isoler en priorité ?</h2>
              <p className="mt-4 text-ink-muted">
                L&apos;isolation est le geste le plus rapidement rentabilisé et améliore
                immédiatement le confort.
              </p>
              <ul className="mt-5 space-y-2 text-ink-muted">
                <li>• 30% des pertes de chaleur par le toit</li>
                <li>• 25% par les murs</li>
                <li>• 10% par le plancher</li>
                <li>• L&apos;isolation est le geste le plus rapidement rentabilisé</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[340px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1753717202579-9c6ac3592b62?auto=format&fit=crop&w=1400&q=80"
                alt="Isolation des combles d'une maison"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface p-8">
            <h2 className="text-3xl font-bold text-ink">Bon à savoir</h2>
            <ul className="mt-4 space-y-2 text-ink-muted">
              <li>• Les travaux doivent être réalisés par un professionnel RGE.</li>
              <li>• Le logement doit avoir plus de 2 ans.</li>
              <li>• La demande CEE doit être faite AVANT la signature du devis.</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">Passez à l&apos;action sur l&apos;isolation</h2>
            <p className="mt-3 text-white/90">
              Lancez votre simulation et obtenez une estimation personnalisée de votre
              prime CEE.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez votre prime isolation
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
