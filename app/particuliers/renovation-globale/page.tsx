import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Wrench } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FicheThumbnail } from "@/components/ui/fiche-thumbnail";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SITE_IMAGES } from "@/lib/site-images";
import { getFicheImage } from "@/lib/fiche-thumbnails";

export const metadata: Metadata = {
  title: "Particuliers - Rénovation globale",
  description:
    "Rénovation globale : combinez les travaux pour maximiser vos primes CEE et améliorer fortement votre DPE.",
};

const operations = [
  {
    title: "Rénovation d'ampleur d'une maison individuelle",
    ref: "BAR-TH-174",
    icon: Wrench,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-174%20vA80-3%20%C3%A0%20compter%20du%2017-01-2026.pdf",
    description:
      "Rénovation d'ampleur avec gain d'au moins 2 classes DPE. Remplace l'ancienne fiche BAR-TH-164 (rénovation globale), abrogée depuis le 1er janvier 2024. Cumulable avec MaPrimeRénov' Rénovation d'ampleur pour les logements E, F ou G.",
    badge: "Nouveau",
    badgeClass: "bg-emerald-100 text-forest",
  },
  {
    title: "Rénovation globale d'un bâtiment résidentiel collectif",
    ref: "BAR-TH-177",
    icon: Building2,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-TH-177%20vA80-2%20%C3%A0%20compter%20du%2017-01-2026.pdf",
    description:
      "Rénovation performante d'un immeuble résidentiel collectif. Coup de pouce Rénovation performante disponible.",
    badge: "Copropriétés",
    badgeClass: "bg-emerald-100 text-forest",
  },
];

export default function ParticuliersRenovationGlobalePage() {
  return (
    <div>
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Particuliers", href: "/particuliers" },
            { label: "Rénovation globale" },
          ]}
        />
      </section>

      <PageHero
        eyebrow="Particuliers - Rénovation globale"
        title="Rénovation globale : maximisez vos primes en combinant les travaux"
        description="La rénovation globale est le parcours le plus avantageux : combinez isolation, chauffage et ventilation pour gagner plusieurs classes DPE et obtenir les primes les plus élevées."
        imageUrl={SITE_IMAGES.renovationGlobale.hero.src}
        primaryCta={{ href: "/simulateur", label: "Estimer ma prime rénovation globale" }}
        secondaryCta={{ href: "/contact", label: "Être contacté" }}
      />

      <section className="section-shell pb-10">
        <Reveal>
          <p className="inline-flex rounded-pill bg-emerald-100 px-4 py-1 text-sm font-semibold text-forest">
            🔥 Le plus avantageux
          </p>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Opérations éligibles</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {operations.map((operation, index) => (
            <Reveal key={operation.title} delay={index * 0.08}>
              <article className="card-surface h-full p-6">
                <FicheThumbnail
                  image={getFicheImage(operation.title)}
                  badge={operation.badge}
                  badgeClassName={operation.badgeClass}
                />
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

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface p-8">
            <h2 className="text-3xl font-bold text-ink">
              Pourquoi choisir la rénovation globale
            </h2>
            <ul className="mt-4 space-y-2 text-ink-muted">
              <li>• Primes CEE plus élevées qu&apos;en mono-geste</li>
              <li>• Cumulable avec MaPrimeRénov&apos; Rénovation d&apos;ampleur</li>
              <li>• Gain de plusieurs classes DPE = valorisation du logement</li>
              <li>• Un seul dossier pour plusieurs travaux</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface border-emerald-200 bg-sage/60 p-8">
            <h2 className="text-3xl font-bold text-ink">Objectifs du Décret</h2>
            <ul className="mt-4 space-y-2 text-ink-muted">
              <li>• 120 000 rénovations d&apos;ampleur prévues en 2026</li>
              <li>• MaPrimeRénov&apos; rouverte le 23 février 2026 avec 3,6 Md€ de budget</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">Passez à la rénovation globale</h2>
            <p className="mt-3 text-white/90">
              Obtenez rapidement une estimation de vos aides et priorisez vos travaux.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez votre prime rénovation globale
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
