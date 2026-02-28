import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Calculator,
  FileText,
  Flame,
  Gauge,
  MessageSquare,
  Shield,
  SquareStack,
  Wrench,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les particuliers",
  description:
    "CEE Particuliers : financez vos travaux de rénovation énergétique avec l'accompagnement PIOUD ENERGY.",
};

const particuliersThemes = [
  {
    title: "Isolation thermique",
    description:
      "Combles, murs, planchers, toitures-terrasses... La première étape pour réduire vos factures.",
    icon: Shield,
    href: "/particuliers/isolation",
    cta: "Voir les solutions isolation",
    image:
      "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&w=1500&q=80",
  },
  {
    title: "Chauffage & Eau chaude",
    description:
      "PAC air/eau, chaudière biomasse, solaire combiné, chauffe-eau thermodynamique...",
    icon: Flame,
    href: "/particuliers/chauffage",
    cta: "Voir les solutions chauffage",
    image:
      "https://images.unsplash.com/photo-1554475499-4e40aa2b9e75?auto=format&fit=crop&w=1500&q=80",
  },
  {
    title: "Fenêtres & Menuiseries",
    description:
      "Vitrages isolants, portes-fenêtres... Améliorez le confort thermique et acoustique.",
    icon: SquareStack,
    href: "/particuliers/fenetres",
    cta: "Voir les solutions menuiseries",
    image:
      "https://images.unsplash.com/photo-1753893558430-3abab5adf4e0?auto=format&fit=crop&w=1500&q=80",
  },
  {
    title: "Régulation & Pilotage",
    description:
      "Thermostats programmables, sondes, régulation pièce par pièce pour consommer juste.",
    icon: Gauge,
    href: "/particuliers/regulation",
    cta: "Voir les solutions régulation",
    image:
      "https://images.unsplash.com/photo-1770625467384-304e461ef1be?auto=format&fit=crop&w=1500&q=80",
  },
  {
    title: "Rénovation globale",
    description:
      "Combinez plusieurs travaux pour maximiser vos primes et gagner plusieurs classes DPE.",
    icon: Wrench,
    href: "/particuliers/renovation-globale",
    cta: "Voir la rénovation globale",
    image:
      "https://images.unsplash.com/photo-1753893558281-9acda0662bbd?auto=format&fit=crop&w=1500&q=80",
    badge: "🔥 Le plus avantageux",
  },
];

const particulierStats = [
  { value: 500000, suffix: "+", label: "logements rénovés chaque année grâce aux CEE" },
  { value: 12000, suffix: "€", label: "jusqu'à de primes cumulées (CEE + MaPrimeRénov')" },
  { value: 0, suffix: "€", label: "de condition de revenus pour les CEE" },
  { value: 2, suffix: " ans", label: "ancienneté minimum du logement" },
];

export default function ParticuliersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Particuliers"
        title="CEE Particuliers : financez vos travaux de rénovation énergétique"
        description="PIOUD ENERGY vous accompagne pour identifier les travaux éligibles, constituer votre dossier et obtenir vos primes CEE. Tous les ménages sont éligibles, sans condition de revenus."
        imageUrl="https://images.unsplash.com/photo-1752594756894-bcf378884a09?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Estimer ma prime" }}
        secondaryCta={{ href: "/contact", label: "Parler à un conseiller" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">
            Choisissez votre type de travaux
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Explorez les solutions les plus pertinentes selon votre projet et accédez
            à nos guides dédiés par thématique.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {particuliersThemes.map((theme, index) => (
            <Reveal key={theme.title} delay={(index % 3) * 0.07}>
              <Link
                href={theme.href}
                className="group relative block min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-[#0f2b46]/10"
              >
                <Image
                  src={theme.image}
                  alt={theme.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071a2d]/90 via-[#0f2b46]/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-xl bg-white/15 p-3 text-emerald-300">
                      <theme.icon className="h-6 w-6" />
                    </span>
                    {theme.badge ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {theme.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{theme.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{theme.description}</p>
                  <span className="mt-5 inline-flex rounded-full border border-white/35 px-4 py-2 text-sm font-semibold">
                    {theme.cta}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <h2 className="text-center text-4xl font-bold text-[#0F2B46]">Les CEE en chiffres</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {particulierStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <article className="card-surface p-6 text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm text-slate-600">{stat.label}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">Comment ça marche</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: MessageSquare,
              text: "Vous nous décrivez votre projet",
            },
            {
              icon: Calculator,
              text: "Nous identifions les opérations éligibles et estimons vos primes",
            },
            {
              icon: FileText,
              text: "Nous montons votre dossier CEE avant signature du devis",
            },
            {
              icon: Banknote,
              text: "Après travaux, vous recevez votre prime",
            },
          ].map((step, index) => (
            <Reveal key={step.text} delay={index * 0.07}>
              <article className="card-surface h-full p-6">
                <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <step.icon className="h-6 w-6" />
                </span>
                <p className="mt-4 font-medium text-slate-700">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">FAQ rapide</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {[
            {
              q: "Qui peut bénéficier des CEE ?",
              a: "Tous les ménages, propriétaires ou locataires, sans condition de revenus.",
            },
            {
              q: "Mon logement est-il éligible ?",
              a: "Oui s'il a été construit il y a plus de 2 ans et se situe en France métropolitaine.",
            },
            {
              q: "Les CEE sont-ils cumulables avec MaPrimeRénov' ?",
              a: "Oui, les deux aides sont cumulables et permettent de réduire fortement le reste à charge.",
            },
            {
              q: "Combien de temps prend le versement ?",
              a: "En général 4 à 8 semaines après validation du dossier complet.",
            },
            {
              q: "Dois-je avancer les frais ?",
              a: "Cela dépend du montage. Dans certains cas la prime est déduite directement de la facture.",
            },
          ].map((faq) => (
            <Reveal key={faq.q}>
              <details className="card-surface rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none font-semibold text-[#0F2B46]">
                  {faq.q}
                </summary>
                <p className="mt-3 text-slate-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-12">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Estimez vos primes CEE</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Lancez votre simulation pour obtenir une première estimation de vos aides.
            </p>
            <Link href="/simulateur" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#0F2B46]">
              Estimez vos primes CEE
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
