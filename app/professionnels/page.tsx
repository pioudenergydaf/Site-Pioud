import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, Factory, LineChart, Warehouse } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "CEE pour les professionnels",
  description:
    "Optimisez vos investissements énergétiques avec les Certificats d'Économies d'Énergie dédiés aux entreprises.",
};

export default function ProfessionnelsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels"
        title="Réduisez vos coûts énergétiques et financez vos investissements"
        description="Pioud Energy accompagne les entreprises dans l'identification d'opérations éligibles, la valorisation CEE et le pilotage administratif de bout en bout."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Parler à un expert CEE" }}
        secondaryCta={{ href: "/simulateur", label: "Estimer un projet" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <SectionHeading
            title="Pourquoi intégrer les CEE dans votre stratégie ?"
            description="Le dispositif CEE diminue vos CAPEX énergétiques, améliore votre compétitivité et soutient vos engagements ESG avec des résultats rapides."
            centered={false}
          />
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Secteurs couverts"
            description="Nous adaptons notre méthode à vos contraintes opérationnelles et techniques."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Industrie",
              description:
                "Optimisation des procédés, récupération de chaleur et modernisation des utilités.",
              icon: Factory,
            },
            {
              title: "Tertiaire",
              description:
                "Eclairage, CVC, GTB, isolation et pilotage de la performance de vos bâtiments.",
              icon: BriefcaseBusiness,
            },
            {
              title: "Transport & logistique",
              description:
                "Actions d'efficacité sur entrepôts, plateformes et infrastructures de mobilité.",
              icon: Warehouse,
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="card-surface h-full p-7">
                <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Études de cas"
            description="Quelques exemples d'accompagnements concrets réalisés avec nos équipes."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[
            {
              name: "Groupe logistique multi-sites",
              outcome: "1,2 M€ de primes mobilisées sur 14 entrepôts en 9 mois.",
            },
            {
              name: "Réseau de commerces de proximité",
              outcome: "35% d'économies sur la facture électrique après modernisation CVC + LED.",
            },
          ].map((caseStudy, index) => (
            <Reveal key={caseStudy.name} delay={index * 0.1}>
              <article className="card-surface p-7">
                <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#0F2B46]">
                  <LineChart className="h-4 w-4" />
                  Étude de cas
                </p>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{caseStudy.name}</h3>
                <p className="mt-3 text-slate-600">{caseStudy.outcome}</p>
              </article>
            </Reveal>
          ))}
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
              Contacter Pioud Energy
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
