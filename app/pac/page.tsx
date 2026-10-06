import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  Flame,
  Hammer,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { PacFaq } from "@/components/pac/pac-faq";
import { PacLeadForm } from "@/components/pac/pac-lead-form";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import {
  INCOME_BANDS,
  MENTION_INTERMEDIAIRE,
  MENTION_MONTANT_INDICATIF,
  RESTE_A_CHARGE_PAR_TRANCHE,
} from "@/lib/pac-constants";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Pompe à chaleur air/eau : 0 € d'avance de frais | Pioud Energy",
  description:
    "Vérifiez en 1 minute votre éligibilité aux aides pour l'installation d'une pompe à chaleur air/eau. Prime CEE de 5 000 € à 12 000 € (fiche BAR-TH-171, Coup de pouce x5) et MaPrimeRénov' déduites du devis, installateur RGE QualiPAC. Montants indicatifs, sous conditions de ressources et d'éligibilité.",
  robots: {
    index: false,
    follow: false,
  },
};

// Seul canal de contact sur cette page : le formulaire (aucun téléphone).
// Identité légale affichée dans le pied de page (conformité DGCCRF/DDPP).
const LEGAL_NAME = "PIOUD ENERGY SAS";
const LEGAL_SIREN = "SIREN 927 628 446";

// Montants alignés sur la carte BAR-TH-171 de /particuliers/chauffage.
const benefits = [
  "Prime CEE de 5 000 € à 12 000 € déduite du devis, selon revenus et zone climatique",
  "Démarches MaPrimeRénov' et CEE gérées sans frais par notre équipe",
  "Installation par un professionnel certifié RGE QualiPAC",
];

// PLACEHOLDER — chiffres à remplacer par les statistiques réelles une fois disponibles.
const trustStats = [
  { to: 500, suffix: "+", label: "Installations accompagnées" },
  { to: 24, suffix: "h", label: "Délai de réponse moyen" },
  { to: 98, suffix: "%", label: "Clients satisfaits" },
];

const trustBadges = [
  { label: "RGE QualiPAC", icon: BadgeCheck },
  { label: "Mandataire CEE", icon: ShieldCheck },
  { label: "MaPrimeRénov'", icon: FileCheck2 },
  { label: "Coup de pouce x5", icon: Flame },
  { label: "Garantie décennale", icon: Award },
];

const steps = [
  {
    title: "Éligibilité sous 24 h",
    description: "Nous étudions votre profil et confirmons votre éligibilité aux aides 2026.",
    icon: BadgeCheck,
  },
  {
    title: "Visite technique",
    description: "Un technicien évalue votre logement et dimensionne la PAC adaptée.",
    icon: ClipboardCheck,
  },
  {
    title: "Devis aides déduites",
    description: "Vous recevez un devis détaillé, aides CEE et MaPrimeRénov' déjà déduites.",
    icon: FileCheck2,
  },
  {
    title: "Installation RGE",
    description: "Pose réalisée par un installateur certifié RGE QualiPAC, garantie décennale.",
    icon: Wrench,
  },
];

// Inclusions (ce qui est pris en charge), pas des étapes : le déroulé
// chronologique est déjà dans la section « Comment ça se passe ».
const inclusions = [
  {
    title: "Visite technique à domicile",
    description:
      "Un technicien évalue votre logement, vérifie la compatibilité et dimensionne la pompe à chaleur adaptée.",
    icon: ClipboardCheck,
  },
  {
    title: "Dossier d'aides monté par nos soins",
    description:
      "MaPrimeRénov' et prime CEE : constitution, dépôt et suivi du dossier jusqu'au versement, sans frais de dossier.",
    icon: FileCheck2,
  },
  {
    title: "Devis unique, aides déjà déduites",
    description:
      "Vous recevez un devis clair avec les aides directement soustraites : 0 € d'avance sur la part financée.",
    icon: BadgeCheck,
  },
  {
    title: "Pose et mise en service RGE QualiPAC",
    description:
      "Installation par un professionnel certifié, mise en service et garantie décennale incluses.",
    icon: Wrench,
  },
];

// PLACEHOLDER — avis à remplacer par de vrais témoignages clients.
const reviews = [
  {
    quote:
      "Dossier d'aides pris en charge de A à Z, je n'ai eu aucune démarche administrative à faire.",
    author: "Marc D.",
    role: "Maison individuelle — Val-de-Marne",
  },
  {
    quote:
      "Devis clair avec les aides déjà déduites, installation réalisée en une journée par une équipe sérieuse.",
    author: "Nadia B.",
    role: "Maison individuelle — Essonne",
  },
  {
    quote:
      "Un conseiller dédié a répondu à toutes mes questions, du premier échange jusqu'au versement de la prime.",
    author: "Philippe T.",
    role: "Maison individuelle — Seine-et-Marne",
  },
];

export default function PacLandingPage() {
  return (
    <div className="bg-cream text-ink">
      {/* 1. Barre haute */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-md">
        <div className="section-shell flex items-center justify-between gap-4 py-3">
          <span className="flex items-center gap-1.5 font-brand text-xs font-extrabold leading-none tracking-tight text-emerald-600 sm:text-sm">
            <span className="flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-emerald-600 sm:h-[18px] sm:w-[18px]">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-emerald-600 sm:h-3 sm:w-3">
                <path d="M20 3c-8 0-15 6-15 14 0 2 .5 3.5 1 4 .5-3 2-6 5-8-2 3-3 6-2.5 9 5-.5 9-3 10.5-8 1-3.5 1-8 1-11z" />
              </svg>
            </span>
            PIOUD ENERGY
          </span>

          <a href="#pac-form" className="btn-primary px-4 py-2.5 text-sm sm:px-6 sm:py-3">
            Vérifier mon éligibilité
          </a>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="relative overflow-hidden bg-forest pt-10 text-white sm:pt-14">
        <div className="pointer-events-none absolute -right-20 top-10 h-[320px] w-[320px] rounded-pill bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[260px] w-[260px] rounded-pill bg-emerald-500/10 blur-3xl" />

        <div className="section-shell relative grid gap-10 pb-16 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-pill bg-pioud-orange" />
                  Aides 2026 · Île-de-France
                </span>
                <span className="rounded-pill bg-emerald-100 px-3 py-1 text-xs font-semibold text-forest">
                  🔥 Coup de pouce x5
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-light leading-[1.1] text-white sm:text-5xl lg:text-[3.5rem]">
                Pompe à chaleur air/eau :{" "}
                <span className="whitespace-nowrap italic text-emerald-400">
                  0 € d&apos;avance de frais
                </span>
              </h1>
              <p className="mt-4 text-lg font-medium text-white/90">
                Jusqu&apos;à 100 % financé par les aides selon vos revenus
              </p>

              <ul className="mt-6 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-400" />
                    <span className="text-base text-white/85">{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Fiche CEE BAR-TH-171 · Pompe à chaleur air/eau
              </p>
              <p className="mt-2 text-xs text-white/70">{MENTION_MONTANT_INDICATIF}</p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">
                {trustStats.map((stat, index) => (
                  <div key={stat.label} className={index > 0 ? "border-l border-white/20 pl-4" : ""}>
                    <p className="whitespace-nowrap font-display text-3xl font-light text-white sm:text-4xl">
                      <CountUp to={stat.to} />
                      <span className="text-emerald-300">{stat.suffix}</span>
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-emerald-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="pac-form" className="scroll-mt-24">
              <PacLeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Bandeau 4 pastilles */}
      <section className="border-y border-ink/10 bg-white py-8">
        <div className="section-shell grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-sage text-forest-soft">
                <badge.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-ink">{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Votre reste à charge par tranche de revenus */}
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
              Votre reste à charge selon vos revenus
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              La prime CEE (fiche BAR-TH-171, de 5 000 € à 12 000 €, Coup de
              pouce x5) et MaPrimeRénov&apos; sont déduites directement de votre
              devis.
            </p>
            <p className="mt-2 text-xs text-ink-soft">{MENTION_MONTANT_INDICATIF}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {INCOME_BANDS.map((band, index) => {
            const reste = RESTE_A_CHARGE_PAR_TRANCHE[band.id];
            return (
              <Reveal key={band.id} delay={index * 0.08}>
                <article className="card-surface flex h-full flex-col p-6 text-center">
                  <div className="flex-1">
                    <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                      {band.label}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{band.hint}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      Reste à charge
                    </p>
                    <p className="mt-1 font-display text-3xl font-light text-ink">
                      {reste.value}
                    </p>
                    {reste.note ? (
                      <p className="mt-2 text-sm font-medium text-emerald-700">{reste.note}</p>
                    ) : null}
                    <p className="mt-3 text-xs text-ink-soft">{MENTION_MONTANT_INDICATIF}</p>
                  </div>
                  <a href="#pac-form" className="btn-secondary mt-6 w-full justify-center">
                    Vérifier mon éligibilité
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          {MENTION_MONTANT_INDICATIF} {MENTION_INTERMEDIAIRE}
        </p>
      </section>

      {/* 4b. Ce que comprend l'accompagnement */}
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
              Ce que comprend l&apos;accompagnement
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              Tout est pris en charge par Pioud Energy, de la première visite
              jusqu&apos;au versement de la prime. La prime CEE (fiche BAR-TH-171,
              de 5 000 € à 12 000 €, Coup de pouce x5) et MaPrimeRénov&apos; sont
              déduites directement de votre devis.
            </p>
            <p className="mt-2 text-xs text-ink-soft">{MENTION_MONTANT_INDICATIF}</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {inclusions.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="card-surface flex h-full gap-4 p-6">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-sage text-forest-soft">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="rounded-pill bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-forest">
                    Inclus
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a href="#pac-form" className="btn-primary">
            Vérifier mon éligibilité
          </a>
          <p className="text-center text-xs text-ink-soft">
            {MENTION_MONTANT_INDICATIF} {MENTION_INTERMEDIAIRE}
          </p>
        </div>
      </section>

      {/* 5. 4 étapes */}
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
                Comment ça se passe
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <article className="card-surface h-full p-6">
                  <span className="inline-flex rounded-lg bg-sage p-3 text-forest-soft">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Étape {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Avis clients */}
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
              Ils ont fait confiance à Pioud Energy
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.author} delay={index * 0.08}>
              <article className="card-surface flex h-full flex-col p-6">
                <div className="flex gap-0.5 text-peach">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-semibold text-ink">{review.author}</p>
                  <p className="text-xs text-ink-soft">{review.role}</p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="section-shell max-w-3xl">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-light text-ink sm:text-4xl">
              Questions fréquentes
            </h2>
          </Reveal>
          <div className="mt-10">
            <PacFaq />
          </div>
        </div>
      </section>

      {/* 8. CTA final + footer minimal */}
      <section className="bg-forest py-16 text-white sm:py-20">
        <Reveal className="section-shell">
          <div className="flex flex-col items-center gap-6 text-center">
            <Hammer className="h-8 w-8 text-emerald-300" />
            <h2 className="font-display text-3xl font-light sm:text-4xl">
              Vérifiez votre éligibilité en 1 minute
            </h2>
            <p className="max-w-xl text-white/85">
              Simulation gratuite et sans engagement. Un conseiller dédié vous
              recontacte sous 24 h ouvrées.
            </p>
            <a
              href="#pac-form"
              className="inline-flex items-center gap-2 rounded-pill bg-emerald-500 px-7 py-3 font-medium text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
            >
              <CalendarCheck className="h-4 w-4" />
              Vérifier mon éligibilité en 1 minute
            </a>
          </div>
        </Reveal>
      </section>

      {/* Pied de page légal — seuls liens sortants autorisés : mentions
          légales et politique de confidentialité. */}
      <footer className="border-t border-ink/10 py-8 text-center text-xs text-ink-soft">
        <div className="section-shell space-y-2">
          <p className="font-semibold text-ink">
            {LEGAL_NAME} · {LEGAL_SIREN}
          </p>
          <p>{siteConfig.address}</p>
          <p className="mx-auto max-w-2xl leading-relaxed">{MENTION_INTERMEDIAIRE}</p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1">
            <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-ink">
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="underline underline-offset-2 hover:text-ink"
            >
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
