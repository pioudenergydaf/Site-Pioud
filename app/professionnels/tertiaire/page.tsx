import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpDown,
  Building,
  Building2,
  Droplets,
  Globe,
  Home,
  Hotel,
  LayoutGrid,
  Layers,
  Lightbulb,
  School,
  Settings,
  ShoppingCart,
  Square,
  Stethoscope,
  Store,
  Thermometer,
  Wind,
} from "lucide-react";
import { OfficialSheetLinks } from "@/components/ui/official-sheet-links";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE Tertiaire",
  description:
    "CEE Tertiaire : opérations performantes, fiches standardisées et accompagnement PIOUD ENERGY pour vos bâtiments tertiaires.",
};

const tertiaryOperations = [
  {
    title: "Éclairage LED",
    reference: "BAT-EQ-111",
    icon: Lightbulb,
    description:
      "Remplacement des luminaires existants par des modules LED performants. L'éclairage représente jusqu'à 30% de la consommation d'un bâtiment tertiaire.",
    examples: "Exemples : bureaux, parkings, commerces, entrepôts",
    pdfUrl: "https://www.ecologie.gouv.fr/recherche?search_api_fulltext=BAT-EQ-111",
  },
  {
    title: "Isolation toitures et combles",
    reference: "BAT-EN-101",
    icon: Home,
    description:
      "Isolation thermique des combles ou toitures des bâtiments tertiaires existants. Réduction significative des déperditions par le haut du bâtiment.",
    examples: "Exemples : sièges tertiaires, écoles, bâtiments publics",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EN-101%20vA64-4%20%C3%A0%20compter%20du%2001-01-2025.pdf",
  },
  {
    title: "Isolation toitures-terrasses",
    reference: "BAT-EN-107",
    icon: Building,
    description:
      "Isolation des toitures-terrasses, très courante sur les bâtiments tertiaires à toit plat (bureaux, centres commerciaux, hôpitaux).",
    examples: "Exemples : plateaux de bureaux, retail parks",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EN-107%20vA64-3%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
  },
  {
    title: "Isolation des murs",
    reference: "BAT-EN-102",
    icon: Layers,
    description:
      "Isolation thermique par l'intérieur ou l'extérieur des murs des bâtiments tertiaires. Impact direct sur le confort et la facture énergétique.",
    examples: "Exemples : hôtels, bâtiments administratifs",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EN-102%20vA64-3%20%C3%A0%20compter%20du%2001-01-2025.pdf",
  },
  {
    title: "Isolation des planchers",
    reference: "BAT-EN-103",
    icon: LayoutGrid,
    description:
      "Isolation des planchers bas donnant sur un local non chauffé ou sur l'extérieur.",
    examples: "Exemples : commerces en rez-de-chaussée, bureaux",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EN-103%20vA64-4%20%C3%A0%20compter%20du%2001-01-2025.pdf",
  },
  {
    title: "Fenêtres et vitrages isolants",
    reference: "BAT-EN-104",
    icon: Square,
    description:
      "Remplacement des fenêtres ou portes-fenêtres par des vitrages isolants performants. Amélioration du confort thermique et acoustique.",
    examples: "Exemples : écoles, établissements de santé, hôtellerie",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EN-104%20vA54-3%20%C3%A0%20compter%20du%2001-01-2024.pdf",
  },
  {
    title: "Pompe à chaleur air/eau",
    reference: "BAT-TH-163",
    icon: Thermometer,
    description:
      "Installation d'une PAC air/eau performante en remplacement d'une chaudière gaz ou fioul. Bonification Coup de pouce pouvant couvrir jusqu'à 50% de l'investissement.",
    examples: "Exemples : immeubles de bureaux, établissements de soins",
    badge: "🔥 Revalorisé en 2026",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-163%20vA75-1%20%C3%A0%20compter%20du%2001-01-2026.pdf",
  },
  {
    title: "Pompe à chaleur eau/eau",
    reference: "BAT-TH-164",
    icon: Droplets,
    description:
      "PAC utilisant une source d'eau (nappe phréatique) ou boucle de captage existante. Bonification jusqu'à x4.",
    examples: "Exemples : campus tertiaires, grands ensembles",
    badge: "🔥 Revalorisé en 2026",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-164%20vA75-1%20%C3%A0%20compter%20du%2001-01-2026.pdf",
  },
  {
    title: "Géothermie",
    reference: "BAT-TH-162",
    icon: Globe,
    description:
      "Système géothermique complet pour les bâtiments tertiaires. Bonification jusqu'à x5 en cas de dépose d'installation fossile.",
    examples: "Exemples : grands sites multi-bâtiments",
    badge: "🔥 Nouveau 2026",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-162%20vA75-1%20%C3%A0%20compter%20du%2001-01-2026.pdf",
  },
  {
    title: "GTB (Gestion Technique du Bâtiment)",
    reference: "BAT-TH-116",
    icon: Settings,
    description:
      "Système de gestion technique du bâtiment pour le chauffage, l'ECS, le refroidissement, l'éclairage et les auxiliaires. Obligation BACS pour les bâtiments >1000m².",
    examples: "Exemples : immeubles tertiaires, hôpitaux, campus",
    badge: "Décret BACS",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-116%20vA62-6%20%C3%A0%20compter%20du%2001-01-2025_0.pdf",
  },
  {
    title: "PAC réversible air/air",
    reference: "BAT-TH-158",
    icon: Wind,
    description:
      "Pompe à chaleur réversible de type air/air pour le chauffage et la climatisation des locaux tertiaires.",
    examples: "Exemples : commerces, bureaux, hôtellerie",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-158%20vA62-3%20%C3%A0%20compter%20du%2001-01-2025.pdf",
  },
  {
    title: "Fermeture meubles frigorifiques",
    reference: "BAT-EQ-124",
    icon: ShoppingCart,
    description:
      "Mise en place de portes ou couvercles sur les meubles frigorifiques en température positive. Très répandu en grande distribution et commerce alimentaire.",
    examples: "Exemples : supermarchés, magasins spécialisés",
    pdfUrl: "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-EQ-124.pdf",
  },
  {
    title: "Destratification d'air",
    reference: "BAT-TH-142",
    icon: ArrowUpDown,
    description:
      "Système de destratification dans les locaux de grande hauteur (entrepôts, halls, gymnases). Meilleure répartition de la chaleur et économies de chauffage.",
    examples: "Exemples : entrepôts logistiques, halls sportifs",
    pdfUrl:
      "https://www.ecologie.gouv.fr/sites/default/files/documents/BAT-TH-142%20vA71-4%20%C3%A0%20compter%20du%2001-08-2025%20-%20Syst%C3%A8me%20de%20d%C3%A9stratification%20d%E2%80%99air_1.pdf",
  },
];

const tertiarySectors = [
  { label: "Bureaux et espaces de coworking", icon: Building2 },
  { label: "Commerces et grande distribution", icon: Store },
  { label: "Hôtellerie et restauration", icon: Hotel },
  { label: "Établissements de santé", icon: Stethoscope },
  { label: "Enseignement", icon: School },
  { label: "Collectivités", icon: Building },
  { label: "Data centers", icon: LayoutGrid },
];

export default function TertiairePage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels - Tertiaire"
        title="CEE Tertiaire : les opérations les plus performantes pour vos bâtiments"
        description="Bureaux, commerces, hôtels, établissements de santé, enseignement, collectivités... PIOUD ENERGY identifie et valorise les gisements CEE de votre parc immobilier."
        imageUrl="https://images.unsplash.com/photo-1742675416657-55d043ce8dce?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer mon projet" }}
        secondaryCta={{ href: "/contact", label: "Être rappelé" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Top des opérations CEE Tertiaire
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-muted">
            Des fiches standardisées à fort impact économique pour réduire vos
            consommations et financer vos investissements.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tertiaryOperations.map((operation, index) => (
            <Reveal key={operation.title} delay={(index % 3) * 0.06}>
              <article className="card-surface h-full p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <operation.icon className="h-5 w-5" />
                  </span>
                  {operation.badge ? (
                    <span className="rounded-pill bg-lime-soft px-3 py-1 text-xs font-semibold text-forest">
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
                <p className="mt-3 text-sm font-medium text-ink-muted">{operation.examples}</p>
                <OfficialSheetLinks sheetUrl={operation.pdfUrl} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Secteurs d&apos;activité concernés
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tertiarySectors.map((sector) => (
            <Reveal key={sector.label}>
              <article className="card-surface p-5">
                <span className="inline-flex rounded-lg bg-sage p-2 text-ink">
                  <sector.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-semibold text-ink">{sector.label}</p>
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
                Notre accompagnement en 4 étapes
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  "Audit énergétique — Identification des gisements CEE sur votre parc",
                  "Étude de valorisation — Calcul des primes par opération et par site",
                  "Montage des dossiers — Constitution et dépôt avant signature des devis",
                  "Suivi et versement — Contrôle de conformité et obtention de la prime",
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
                src="https://images.unsplash.com/photo-1769699903260-ff85271faa4f?auto=format&fit=crop&w=1400&q=80"
                alt="Bâtiment tertiaire en amélioration énergétique"
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
            <h2 className="text-3xl font-bold text-ink">Décret Tertiaire & CEE</h2>
            <p className="mt-3 text-ink-muted">
              Le Décret Tertiaire impose une réduction progressive des consommations :
              -40% en 2030, -50% en 2040 et -60% en 2050. Les opérations financées
              par les CEE contribuent directement à l&apos;atteinte de ces objectifs et à
              la mise en conformité de vos bâtiments.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">
              Passez à l&apos;action sur votre parc tertiaire
            </h2>
            <p className="mt-3 max-w-3xl text-white/90">
              Obtenez une estimation de vos primes CEE et un plan d&apos;actions priorisé
              avec nos experts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez vos primes CEE tertiaire
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
