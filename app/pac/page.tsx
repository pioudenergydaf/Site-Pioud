import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  Flame,
  Hammer,
  Phone,
  PhoneCall,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";
import { PacFaq } from "@/components/pac/pac-faq";
import { PacLeadForm } from "@/components/pac/pac-lead-form";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { INCOME_BANDS, RESTE_A_CHARGE_PAR_TRANCHE } from "@/lib/pac-constants";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Pompe à chaleur air/eau : 0 € d'avance de frais | Pioud Energy",
  description:
    "Simulez en 30 secondes votre reste à charge pour l'installation d'une pompe à chaleur air/eau. Prime CEE de 5 000 € à 12 000 € (fiche BAR-TH-171, Coup de pouce x5) et MaPrimeRénov' déduites du devis, installateur RGE QualiPAC.",
  robots: {
    index: false,
    follow: false,
  },
};

// Numéro dédié à cette page d'atterrissage — volontairement non repris dans
// le reste du site (voir lib/site-data.ts).
const PHONE_DISPLAY = "01 89 70 45 20";
const PHONE_E164 = "+33189704520";

// Montants alignés sur la carte BAR-TH-171 de /particuliers/chauffage.
const benefits = [
  "Prime CEE de 5 000 € à 12 000 € déduite du devis, selon revenus et zone climatique",
  "Démarches MaPrimeRénov' et CEE gérées sans frais par notre équipe",
  "Installation par un professionnel certifié RGE QualiPAC",
];

const heroImage = SITE_IMAGES.fiches.pompeAirEau;

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
    icon: PhoneCall,
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
      "Un conseiller dédié a répondu à toutes mes questions, du premier appel jusqu'au versement de la prime.",
    author: "Philippe T.",
    role: "Maison individuelle — Seine-et-Marne",
  },
];

export default function PacLandingPage() {
  return (
    <div className="bg-cream pb-24 text-ink md:pb-0">
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

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={`tel:${PHONE_E164}`}
              className="hidden items-center gap-2 text-sm font-semibold text-ink transition hover:text-emerald-600 sm:flex"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>
                Appel gratuit ·{" "}
                <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <a href="#pac-form" className="btn-primary px-4 py-2.5 text-sm sm:px-6 sm:py-3">
              Je veux être rappelé
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="relative overflow-hidden pt-10 sm:pt-14">
        <div className="pointer-events-none absolute -right-20 top-10 h-[320px] w-[320px] rounded-pill bg-sage/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[260px] w-[260px] rounded-pill bg-emerald-100/60 blur-3xl" />

        <div className="section-shell relative grid gap-10 pb-16 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-pill border border-ink/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-forest-soft shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-pill bg-pioud-orange" />
                  Aides 2026 · Île-de-France
                </span>
                <span className="rounded-pill bg-emerald-100 px-3 py-1 text-xs font-semibold text-forest">
                  🔥 Coup de pouce x5
                </span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
                Pompe à chaleur air/eau :{" "}
                <span className="whitespace-nowrap italic text-emerald-600">
                  0 € d&apos;avance de frais
                </span>
              </h1>

              <ul className="mt-7 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-500" />
                    <span className="text-base text-ink-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Fiche CEE BAR-TH-171 · Pompe à chaleur air/eau
              </p>

              <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-card-lg border border-ink/10 shadow-xl shadow-[0_16px_36px_rgba(31,58,46,0.12)]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
                {trustStats.map((stat, index) => (
                  <div key={stat.label} className={index > 0 ? "border-l border-ink/10 pl-4" : ""}>
                    <p className="whitespace-nowrap font-display text-3xl font-light text-ink sm:text-4xl">
                      <CountUp to={stat.to} />
                      <span className="text-emerald-600">{stat.suffix}</span>
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
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

      {/* 4. Votre reste à charge */}
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
              Votre reste à charge estimé
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              Selon votre tranche de revenus et votre zone climatique, la prime CEE
              (fiche BAR-TH-171, de 5 000 € à 12 000 €, Coup de pouce x5) et
              MaPrimeRénov&apos; viennent réduire directement le montant de votre devis.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {INCOME_BANDS.map((band, index) => (
            <Reveal key={band.id} delay={index * 0.08}>
              <article className="card-surface flex h-full flex-col p-6 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  {band.label}
                </p>
                <p className="mt-1 text-xs text-ink-soft">{band.hint}</p>
                <p className="mt-5 font-display text-4xl font-light text-ink">
                  {RESTE_A_CHARGE_PAR_TRANCHE[band.id].toLocaleString("fr-FR")} €
                </p>
                <p className="mt-1 text-xs text-ink-soft">reste à charge estimé</p>
                <a
                  href="#pac-form"
                  className="btn-secondary mt-6 w-full justify-center"
                >
                  Estimer mon reste à charge
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-soft">
          Montants indicatifs, sous conditions d&apos;éligibilité et de nature des
          travaux. Chiffrage définitif établi sur devis après visite technique.
        </p>
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
      <section className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="card-surface flex flex-col items-center gap-6 bg-gradient-to-r from-forest to-forest-soft p-8 text-center text-white sm:p-12">
            <Hammer className="h-8 w-8 text-emerald-300" />
            <h2 className="font-display text-3xl font-light sm:text-4xl">
              Vérifiez vos aides en 30 secondes
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
              Je lance ma simulation
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-ink/10 py-8 text-center text-xs text-ink-soft">
        <p>PIOUD ENERGY — 8 Rue Henri Dunant, 94370 Sucy-en-Brie</p>
        <p className="mt-1">
          <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-ink">
            Mentions légales
          </Link>
        </p>
      </footer>

      {/* Bouton d'appel sticky mobile */}
      <a
        href={`tel:${PHONE_E164}`}
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-emerald-500 py-4 text-sm font-semibold text-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] md:hidden"
      >
        <Phone className="h-4 w-4" />
        Appel gratuit · {PHONE_DISPLAY}
      </a>
    </div>
  );
}
