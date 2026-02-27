import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "CEE pour les grands comptes",
  description:
    "Accompagnement sur mesure des grands comptes pour piloter des programmes CEE multi-sites à l'échelle nationale.",
};

export default function GrandsComptesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Grands comptes"
        title="Un accompagnement CEE sur mesure à l'échelle nationale"
        description="Pioud Energy déploie des stratégies CEE premium pour les organisations multi-entités : gouvernance, pilotage data et valorisation optimisée."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Contacter l'équipe dédiée" }}
        secondaryCta={{ href: "/simulateur", label: "Tester le simulateur" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <SectionHeading
            title="Pilotage stratégique et opérationnel"
            description="Nous structurons vos opérations CEE autour d'une gouvernance robuste, d'indicateurs de performance et d'une coordination nationale."
            centered={false}
          />
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Notre approche premium"
            description="Une méthode éprouvée pour accélérer l'exécution et sécuriser les résultats."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Programme multi-sites",
              description:
                "Déploiement coordonné sur l'ensemble de vos filiales et établissements.",
              icon: Globe2,
            },
            {
              title: "Conformité renforcée",
              description:
                "Processus qualité et contrôle documentaire pour limiter les risques de rejet.",
              icon: ShieldCheck,
            },
            {
              title: "Reporting exécutif",
              description:
                "Tableaux de bord consolidés pour suivre KPI énergie, primes et délais.",
              icon: BarChart3,
            },
            {
              title: "Conseil à haute valeur",
              description:
                "Recommandations stratégiques pour arbitrer vos investissements énergétiques.",
              icon: Sparkles,
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
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
          <div className="card-surface p-8">
            <h2 className="text-3xl font-bold text-[#0F2B46]">Références clients</h2>
            <p className="mt-3 text-slate-600">
              Nos équipes accompagnent des groupes nationaux dans l'industrie, la
              distribution, la logistique et le tertiaire avec des programmes CEE
              pluriannuels.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Groupe Retail France", "IndusTech Europe", "Alliance Services"].map(
                (ref) => (
                  <p
                    key={ref}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600"
                  >
                    {ref}
                  </p>
                ),
              )}
            </div>
            <Link href="/contact" className="btn-primary mt-8">
              Demander un rendez-vous dédié
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
