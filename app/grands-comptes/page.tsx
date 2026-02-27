import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Globe2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les grands comptes",
  description:
    "Accompagnement sur mesure des grands comptes pour piloter des programmes CEE multi-sites à l'échelle nationale avec PIOUD ENERGY.",
};

export default function GrandsComptesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Grands comptes"
        title="Un accompagnement CEE sur mesure à l'échelle nationale"
        description="PIOUD ENERGY déploie des stratégies CEE premium pour les organisations multi-entités : gouvernance, pilotage data et valorisation optimisée."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Contacter l'équipe dédiée" }}
        secondaryCta={{ href: "/simulateur", label: "Tester le simulateur" }}
      />

      <section className="section-shell py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">
                Pilotage stratégique et opérationnel
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Nous structurons vos opérations CEE autour d&apos;une gouvernance robuste,
                d&apos;indicateurs de performance et d&apos;une coordination nationale des
                équipes terrain.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "120+", label: "sites suivis simultanément" },
                  { value: "4,5 M€", label: "de primes consolidées sur un programme national" },
                  { value: "99%", label: "de dossiers validés après contrôle" },
                ].map((item) => (
                  <article key={item.label} className="card-surface p-4">
                    <p className="text-2xl font-bold text-[#0F2B46]">{item.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
                alt="Siège d'un grand compte"
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
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
                alt="Pilotage de données et reporting"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Notre approche premium</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                    title: "Conseil stratégique",
                    description:
                      "Recommandations d'arbitrage CAPEX et feuille de route pluriannuelle.",
                    icon: Sparkles,
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
          <h2 className="text-4xl font-bold text-[#0F2B46]">Exemples de programmes nationaux</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Réseau de distribution (180 sites)",
              detail:
                "Modernisation énergétique progressive avec 2,9 M€ de primes mobilisées en 18 mois.",
              icon: Layers3,
            },
            {
              title: "Groupe tertiaire international",
              detail:
                "Pilotage consolidé de la performance bâtimentaire et réduction de 27% des consommations.",
              icon: TrendingUp,
            },
            {
              title: "Industrie de process",
              detail:
                "Programme chaleur fatale + régulation avancée avec suivi trimestriel COMEX.",
              icon: Target,
            },
          ].map((program) => (
            <Reveal key={program.title}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-blue-50 p-3 text-[#0F2B46]">
                  <program.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{program.title}</h3>
                <p className="mt-3 text-slate-600">{program.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Gouvernance et exécution</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Comité de pilotage mensuel avec directions énergie, technique et finance.",
                  "Planning consolidé multi-sites avec alertes risques et arbitrages.",
                  "Audit qualité continu sur les pièces justificatives.",
                  "Reporting unifié pour la direction générale et les parties prenantes.",
                ].map((item, index) => (
                  <article key={item} className="card-surface p-5">
                    <p className="text-sm font-semibold uppercase text-emerald-600">
                      Pilier {index + 1}
                    </p>
                    <p className="mt-2 text-slate-700">{item}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="relative min-h-[350px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=1400&q=80"
                alt="Direction projet grand compte"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Parlons de votre programme multi-sites</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Échangez avec un expert PIOUD ENERGY pour cadrer vos objectifs,
              vos périmètres et vos leviers de valorisation CEE.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#0F2B46]">
              Demander un rendez-vous dédié
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
