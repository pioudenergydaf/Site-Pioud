import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Handshake,
  Lightbulb,
  School,
  ShieldCheck,
  Target,
  Thermometer,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les collectivités",
  description:
    "Accompagnement des collectivités pour financer les projets de transition énergétique via les Certificats d'Économies d'Énergie avec PIOUD ENERGY.",
};

export default function CollectivitesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Collectivités"
        title="Financez vos projets publics de transition énergétique"
        description="PIOUD ENERGY accompagne les collectivités dans la structuration, la conformité et la valorisation des opérations CEE à fort impact territorial."
        imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Être rappelé par un expert public" }}
        secondaryCta={{ href: "/simulateur", label: "Découvrir le simulateur" }}
      />

      <section className="section-shell py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-ink">
                Un accompagnement dédié au secteur public
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
                Nous intégrons vos contraintes budgétaires, calendaires et
                réglementaires pour sécuriser chaque dossier CEE et maximiser les
                cofinancements de vos programmes.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "2,8 M€", label: "de primes mobilisées sur patrimoine public" },
                  { value: "38%", label: "d'économies sur les parcs d'éclairage rénovés" },
                  { value: "45", label: "bâtiments communaux accompagnés en 2025" },
                ].map((item) => (
                  <article key={item.label} className="card-surface p-4">
                    <p className="text-2xl font-bold text-ink">{item.value}</p>
                    <p className="mt-1 text-sm text-ink-muted">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[340px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80"
                alt="Bâtiment public rénové"
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
            <div className="relative min-h-[340px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80"
                alt="Chantier de rénovation d'un équipement public"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-4xl font-bold text-ink">Types de projets accompagnés</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Éclairage public",
                    description:
                      "Modernisation LED et télégestion avec objectifs de réduction immédiats.",
                    icon: Lightbulb,
                  },
                  {
                    title: "Écoles & gymnases",
                    description:
                      "Rénovation énergétique des bâtiments recevant du public.",
                    icon: School,
                  },
                  {
                    title: "Chaufferies communales",
                    description:
                      "Remplacement d'équipements anciens et amélioration des rendements.",
                    icon: Thermometer,
                  },
                  {
                    title: "Bâtiments administratifs",
                    description:
                      "Optimisation de l'enveloppe et des systèmes techniques.",
                    icon: Building2,
                  },
                ].map((item) => (
                  <article key={item.title} className="card-surface p-5">
                    <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-ink-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Exemples de projets (fictifs)</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Ville de Valmont",
              desc: "9 200 points lumineux rénovés, 640 k€ de primes CEE mobilisées en 11 mois.",
              icon: Target,
            },
            {
              title: "Agglomération du Parc Vert",
              desc: "Plan école sobre en énergie sur 18 établissements publics.",
              icon: Handshake,
            },
            {
              title: "Commune de Montbrie",
              desc: "Modernisation chaufferie + isolation mairie, baisse de 29% des consommations.",
              icon: ShieldCheck,
            },
          ].map((project) => (
            <Reveal key={project.title}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-sage p-3 text-ink">
                  <project.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{project.title}</h3>
                <p className="mt-3 text-ink-muted">{project.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold text-ink">Méthode de pilotage public</h2>
              <div className="mt-6 space-y-4">
                {[
                  "Diagnostic technique et priorisation budgétaire.",
                  "Montage administratif conforme aux exigences CEE.",
                  "Coordination MOA / MOE / exploitants / prestataires.",
                  "Reporting élus et direction générale des services.",
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
            <div className="relative min-h-[340px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=1400&q=80"
                alt="Collectivité locale en réunion projet"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Besoin d&apos;un cadrage rapide ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Nos équipes vous proposent une feuille de route CEE dédiée à votre
              territoire, avec planning, enveloppe estimative et gouvernance.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-pill bg-white px-7 py-3 font-semibold text-ink">
              Contacter le pôle collectivités
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
