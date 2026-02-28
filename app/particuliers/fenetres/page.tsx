import type { Metadata } from "next";
import Link from "next/link";
import { PanelLeftClose, Square } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Particuliers - Fenêtres",
  description:
    "Fenêtres & menuiseries : découvrez les opérations CEE éligibles et les fiches officielles associées.",
};

const operations = [
  {
    title: "Fenêtre ou porte-fenêtre avec vitrage isolant",
    ref: "BAR-EN-104",
    icon: Square,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-104%20vA54-2%20%C3%A0%20compter%20du%2001-01-2024_0.pdf",
    description:
      "Remplacement de fenêtres ou portes-fenêtres complètes avec vitrage isolant. Améliore le confort thermique et acoustique, réduit les déperditions par les parois vitrées (jusqu'à 15% des pertes de chaleur).",
    requirement: "Uw ≤ 1,3 W/m².K et Sw ≥ 0,3 (ou Uw ≤ 1,7 et Sw ≥ 0,36)",
  },
  {
    title: "Fermeture isolante (volets)",
    ref: "BAR-EN-106",
    icon: PanelLeftClose,
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAR-EN-106%20vA64-5%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
    description:
      "Volets isolants pour réduire les déperditions thermiques nocturnes et les apports solaires estivaux.",
  },
];

export default function ParticuliersFenetresPage() {
  return (
    <div>
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Particuliers", href: "/particuliers" },
            { label: "Fenêtres" },
          ]}
        />
      </section>

      <PageHero
        eyebrow="Particuliers - Fenêtres"
        title="Fenêtres & Menuiseries : améliorez votre confort avec les CEE"
        description="Remplacez vos menuiseries pour améliorer le confort hiver/été, réduire le bruit et diminuer les déperditions énergétiques."
        imageUrl="https://images.unsplash.com/photo-1753893558430-3abab5adf4e0?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer ma prime fenêtres" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">Opérations éligibles</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {operations.map((operation, index) => (
            <Reveal key={operation.title} delay={index * 0.08}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <operation.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fiche : {operation.ref}
                </p>
                <p className="mt-3 text-sm text-slate-600">{operation.description}</p>
                {operation.requirement ? (
                  <p className="mt-3 text-sm font-medium text-slate-700">
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
        <Reveal>
          <div className="card-surface p-8">
            <h2 className="text-3xl font-bold text-[#0F2B46]">Pourquoi changer vos fenêtres</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>• Confort hiver ET été</li>
              <li>• Réduction du bruit extérieur</li>
              <li>• Valorisation du logement</li>
              <li>• Cumulable avec isolation des murs pour un maximum d&apos;efficacité</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-white">
            <h2 className="text-3xl font-bold">Démarrez votre projet menuiseries</h2>
            <p className="mt-3 text-white/90">
              Obtenez une estimation de vos aides CEE et validez la faisabilité avec
              un conseiller.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#0F2B46]"
              >
                Estimez votre prime fenêtres
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
