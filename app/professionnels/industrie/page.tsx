import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BatteryCharging,
  Cog,
  Factory,
  Flame,
  Lightbulb,
  Package,
  Settings2,
  Thermometer,
  Wind,
} from "lucide-react";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE Industrie",
  description:
    "CEE Industrie : valorisez vos investissements d'efficacité énergétique avec PIOUD ENERGY sur vos utilités et process.",
};

const industryOperations = [
  {
    title: "Moteurs haut rendement",
    reference: "IND-UT-102",
    icon: Cog,
    description:
      "Remplacement de moteurs asynchrones par des moteurs à haut rendement IE3/IE4.",
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/IND-UT-102%20v%20A19-2.pdf",
  },
  {
    title: "Variateurs de vitesse",
    reference: "IND-UT-102 / BAT-TH-112",
    icon: Settings2,
    description:
      "Variation électronique de vitesse sur moteurs asynchrones. Économies de 20 à 50% sur les applications de pompage et ventilation.",
    pdfUrl:
      "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=IND-UT-102%20BAT-TH-112",
  },
  {
    title: "Récupération de chaleur fatale",
    reference: "IND-UT-117",
    icon: Thermometer,
    description:
      "Récupération et valorisation de la chaleur perdue sur les process industriels (fumées, eaux de refroidissement, air comprimé).",
    pdfUrl: "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=IND-UT-117",
  },
  {
    title: "Air comprimé",
    reference: "IND-UT-102 / IND-UT-140",
    icon: Wind,
    description:
      "Optimisation des réseaux d'air comprimé : mise en veille automatique des machines, récupération de chaleur sur compresseurs.",
    pdfUrl:
      "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=IND-UT-102%20IND-UT-140",
  },
  {
    title: "Éclairage LED industriel",
    reference: "BAT-EQ-111",
    icon: Lightbulb,
    description:
      "Éclairage LED pour entrepôts, ateliers, zones logistiques. Jusqu'à 70% d'économies sur le poste éclairage.",
    pdfUrl: "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=BAT-EQ-111",
  },
  {
    title: "Isolation industrielle (calorifugeage)",
    reference: "IND-UT-131",
    icon: Package,
    description:
      "Calorifugeage des réseaux de chaleur, vapeur et fluides thermiques. Réduction des pertes en ligne.",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/IND-UT-131%20vA37-2%20%C3%A0%20compter%20du%2001-04-2021.pdf",
  },
  {
    title: "Chaudière biomasse industrielle",
    reference: "IND-UT-104",
    icon: Flame,
    description:
      "Remplacement de chaudières fossiles par des chaudières biomasse pour la production de chaleur industrielle.",
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/IND-UT-104.pdf",
  },
  {
    title: "Stockage de chaleur fatale",
    reference: "IND-UT-139",
    icon: BatteryCharging,
    description:
      "Système de stockage de chaleur fatale pour une valorisation différée.",
    badge: "Nouveau",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/IND-UT-139%20vA73-2%20%C3%A0%20compter%20du%2001-11-2025.pdf",
  },
];

const industrySectors = [
  "Agroalimentaire",
  "Chimie",
  "Métallurgie",
  "Logistique",
  "Automobile",
  "Plasturgie",
  "Pharmacie",
  "Textile",
];

export default function IndustriePage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels - Industrie"
        title="CEE Industrie : valorisez vos investissements en efficacité énergétique"
        description="Sites industriels, usines, entrepôts logistiques... PIOUD ENERGY maximise vos primes CEE sur l'ensemble de vos process et utilités."
        imageUrl="https://images.unsplash.com/photo-1763906265376-363d9681a3ad?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer mon projet" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Principales opérations CEE Industrie
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-muted">
            Ciblez les gisements à plus fort impact sur vos utilités et vos process
            pour accélérer vos gains énergétiques et votre retour sur investissement.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {industryOperations.map((operation, index) => (
            <Reveal key={operation.title} delay={(index % 4) * 0.06}>
              <article className="card-surface h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <operation.icon className="h-5 w-5" />
                  </span>
                  {operation.badge ? (
                    <span className="rounded-pill bg-emerald-100 px-3 py-1 text-xs font-semibold text-forest">
                      {operation.badge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{operation.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Fiche : {operation.reference}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {operation.description}
                </p>
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Secteurs industriels accompagnés
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industrySectors.map((sector) => (
            <Reveal key={sector}>
              <article className="card-surface p-5">
                <span className="inline-flex rounded-lg bg-sage p-2 text-ink">
                  <Factory className="h-5 w-5" />
                </span>
                <p className="mt-3 font-semibold text-ink">{sector}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-ink">
                Notre accompagnement industrie
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Audit process — Cartographie énergétique des utilités et lignes de production",
                  "Identification des gisements — Sélection des opérations CEE à fort ROI",
                  "Montage des dossiers — Constitution des preuves et dépôt réglementaire",
                  "Suivi versement — Contrôle de conformité et valorisation financière finale",
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
                src="https://images.unsplash.com/photo-1766414629984-73a93e7caba0?auto=format&fit=crop&w=1400&q=80"
                alt="Accompagnement d'un site industriel"
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
              Financez vos investissements industriels avec les CEE
            </h2>
            <p className="mt-3 max-w-3xl text-white/90">
              Estimez rapidement votre potentiel de prime et échangez avec nos
              experts pour prioriser vos opérations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez vos primes CEE industrie
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
