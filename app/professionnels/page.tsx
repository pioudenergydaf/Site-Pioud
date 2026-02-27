import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Factory,
  LineChart,
  Settings2,
  ShieldCheck,
  Warehouse,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les professionnels",
  description:
    "Optimisez vos investissements énergétiques avec les Certificats d'Économies d'Énergie dédiés aux entreprises grâce à PIOUD ENERGY.",
};

export default function ProfessionnelsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels"
        title="Réduisez vos coûts énergétiques et financez vos investissements"
        description="PIOUD ENERGY accompagne les entreprises dans l'identification d'opérations éligibles, la valorisation CEE et le pilotage administratif de bout en bout."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Parler à un expert CEE" }}
        secondaryCta={{ href: "/simulateur", label: "Estimer un projet" }}
      />

      <section className="section-shell py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">
                Pourquoi intégrer les CEE dans votre stratégie ?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Le dispositif CEE diminue vos CAPEX énergétiques, améliore votre
                compétitivité et soutient vos engagements ESG avec des résultats
                rapidement mesurables.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "1,2 M€", label: "mobilisés en moyenne sur les programmes multi-sites" },
                  { value: "35%", label: "d'économies observées sur certains postes CVC/LED" },
                  { value: "8 mois", label: "délai moyen de déploiement d'un programme" },
                ].map((item) => (
                  <div key={item.label} className="card-surface p-4">
                    <p className="text-2xl font-bold text-[#0F2B46]">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80"
                alt="Réunion en entreprise autour d'un projet énergétique"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80"
                alt="Site industriel"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Secteurs couverts</h2>
              <p className="mt-4 text-lg text-slate-600">
                Nous adaptons notre méthode à vos contraintes opérationnelles et
                techniques, avec un pilotage orienté performance.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Industrie",
                    description:
                      "Optimisation procédés, utilités et récupération de chaleur fatale.",
                    icon: Factory,
                  },
                  {
                    title: "Tertiaire",
                    description:
                      "Eclairage, CVC, GTB, enveloppe du bâtiment et monitoring.",
                    icon: BriefcaseBusiness,
                  },
                  {
                    title: "Logistique",
                    description:
                      "Performance énergétique des entrepôts et plateformes multi-sites.",
                    icon: Warehouse,
                  },
                  {
                    title: "Commerce",
                    description:
                      "Optimisation éclairage et froid commercial avec plan d'actions progressif.",
                    icon: Zap,
                  },
                ].map((item) => (
                  <article key={item.title} className="card-surface p-5">
                    <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-[#0F2B46]">{item.title}</h3>
                    <p className="mt-2 text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">Cas concrets</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Groupe logistique national",
              detail:
                "14 entrepôts modernisés (LED + régulation CVC) et 1,2 M€ de primes CEE obtenues.",
              icon: LineChart,
            },
            {
              title: "Réseau retail 120 points de vente",
              detail:
                "Déploiement GTB et relamping, -32% de consommation électrique en 12 mois.",
              icon: Settings2,
            },
            {
              title: "PME industrielle multi-sites",
              detail:
                "Récupération de chaleur sur compresseurs et modernisation chaufferie, ROI accéléré.",
              icon: ShieldCheck,
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-blue-50 p-3 text-[#0F2B46]">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Méthodologie d'accompagnement</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Audit initial et priorisation des gisements d'économies.",
                  "Sécurisation contractuelle et documentaire des opérations.",
                  "Suivi chantier et consolidation des preuves CEE.",
                  "Dépôt, contrôle et valorisation financière avec reporting exécutif.",
                ].map((step, index) => (
                  <article key={step} className="card-surface p-5">
                    <p className="text-sm font-semibold uppercase text-emerald-600">
                      Étape {index + 1}
                    </p>
                    <p className="mt-2 text-slate-700">{step}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1581093588401-16ecf2f35652?auto=format&fit=crop&w=1400&q=80"
                alt="Supervision technique d'un projet"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Échangeons sur vos objectifs énergétiques</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Nos équipes vous proposent un cadrage rapide et une feuille de route CEE
              adaptée à votre activité.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#0F2B46]">
              Contacter PIOUD ENERGY
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
