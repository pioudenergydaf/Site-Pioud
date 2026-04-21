import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Factory,
  FileCheck2,
  Gauge,
  Handshake,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les professionnels",
  description:
    "CEE Professionnels : financez vos travaux d'efficacité énergétique avec PIOUD ENERGY pour le tertiaire et l'industrie.",
};

export default function ProfessionnelsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Professionnels"
        title="CEE Professionnels : financez vos travaux d'efficacité énergétique"
        description="PIOUD ENERGY accompagne les entreprises du tertiaire et de l'industrie dans l'identification des opérations éligibles, la valorisation CEE et le pilotage administratif de bout en bout."
        imageUrl="https://images.unsplash.com/photo-1742675416657-55d043ce8dce?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Parler à un expert CEE" }}
        secondaryCta={{ href: "/simulateur", label: "Estimer un projet" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-center text-4xl font-bold text-ink">
            Choisissez votre univers métier
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link
              href="/professionnels/tertiaire"
              className="group relative block min-h-[420px] overflow-hidden rounded-card border border-ink/10 shadow-2xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1742675416657-55d043ce8dce?auto=format&fit=crop&w=1500&q=80"
                alt="Bâtiment de bureaux tertiaire"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest-soft/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <span className="inline-flex rounded-xl bg-white/20 p-3 text-lime">
                  <Building2 className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-3xl font-bold">CEE Tertiaire</h3>
                <p className="mt-2 text-white/90">
                  Bureaux, commerces, hôtels, santé, enseignement... Optimisez la
                  performance énergétique de vos bâtiments tertiaires grâce aux CEE.
                </p>
                <p className="mt-3 text-sm font-semibold text-lime-soft">
                  LED, isolation, PAC, GTB, CVC
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-white">
                  Découvrir les solutions tertiaire
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <Link
              href="/professionnels/industrie"
              className="group relative block min-h-[420px] overflow-hidden rounded-card border border-ink/10 shadow-2xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1763906265376-363d9681a3ad?auto=format&fit=crop&w=1500&q=80"
                alt="Site industriel pour programme CEE"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest-soft/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <span className="inline-flex rounded-xl bg-white/20 p-3 text-lime">
                  <Factory className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-3xl font-bold">CEE Industrie</h3>
                <p className="mt-2 text-white/90">
                  Sites industriels, entrepôts, usines... Réduisez vos CAPEX
                  énergétiques et valorisez vos investissements via les CEE.
                </p>
                <p className="mt-3 text-sm font-semibold text-lime-soft">
                  Moteurs, variateurs, récupération de chaleur, air comprimé, process
                </p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-white">
                  Découvrir les solutions industrie
                  <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-center text-4xl font-bold text-ink">Chiffres clés</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              value: "1,2 M€",
              label: "mobilisés en moyenne sur les programmes multi-sites",
            },
            {
              value: "35%",
              label: "d'économies observées sur certains postes CVC/LED",
            },
            {
              value: "8 mois",
              label: "délai moyen de déploiement",
            },
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <article className="card-surface p-6 text-center">
                <p className="text-4xl font-bold text-ink">{item.value}</p>
                <p className="mt-2 text-sm text-ink-muted">{item.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-ink">Pourquoi choisir PIOUD ENERGY</h2>
              <p className="mt-4 text-lg text-ink-muted">
                Nos équipes combinent expertise technique, maîtrise réglementaire
                et pilotage opérationnel pour sécuriser vos primes CEE.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Ingénierie CEE multi-secteurs",
                    text: "Identification des opérations les plus rentables pour vos bâtiments et process.",
                    icon: Gauge,
                  },
                  {
                    title: "Conformité documentaire renforcée",
                    text: "Montage et vérification des pièces avant signature pour éviter les rejets.",
                    icon: FileCheck2,
                  },
                  {
                    title: "Pilotage jusqu'au versement",
                    text: "Suivi de l'avancement et coordination des acteurs terrain jusqu'à paiement.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Conseil stratégique de proximité",
                    text: "Un interlocuteur dédié et des recommandations adaptées à vos objectifs CAPEX/OPEX.",
                    icon: Handshake,
                  },
                ].map((step) => (
                  <article key={step.title} className="card-surface p-5">
                    <span className="inline-flex rounded-lg bg-sage p-2 text-forest-soft">
                      <step.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-base font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[350px] overflow-hidden rounded-card border border-ink/10 shadow-xl shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1766414629984-73a93e7caba0?auto=format&fit=crop&w=1400&q=80"
                alt="Supervision technique d'un projet tertiaire et industriel"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Échangeons sur vos objectifs énergétiques</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Nos équipes vous proposent un cadrage rapide et une feuille de route
              CEE adaptée à votre activité tertiaire ou industrielle.
            </p>
            <Link href="/contact" className="mt-6 inline-flex rounded-pill bg-white px-7 py-3 font-semibold text-ink">
              Contacter PIOUD ENERGY
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
