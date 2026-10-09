import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardCheck, FileCheck2, Wrench } from "lucide-react";
import { PacFaq } from "@/components/pac/pac-faq";
import { HeroCheck, PacIcon } from "@/components/pac/pac-icon";
import { PacLeadForm } from "@/components/pac/pac-lead-form";
import { PacStickyCta } from "@/components/pac/pac-sticky-cta";
import { Reveal } from "@/components/ui/reveal";
import {
  INCOME_BANDS,
  MENTION_INTERMEDIAIRE,
  MENTION_MONTANT_INDICATIF,
  RESTE_A_CHARGE_PAR_TRANCHE,
} from "@/lib/pac-constants";
import { siteConfig } from "@/lib/site-data";
import { SITE_IMAGES } from "@/lib/site-images";

// Photo de la carte « Pompe à chaleur air/eau » (section Opérations éligibles).
const heroImage = SITE_IMAGES.fiches.pompeAirEau;
// Photo du CTA final : équipe de conseillers (hero de la page Professionnels).
const ctaImage = {
  src: SITE_IMAGES.professionnels.hero.src,
  alt: "Conseillers Pioud Energy étudiant un dossier d'aides",
};

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

const QUALIPAC_LOGO = {
  src: "/logos/rge-qualipac-2026.png",
  alt: "RGE QualiPAC 2026",
  width: 1200,
  height: 590,
};

// Logo de l'assureur décennale (fichier PNG fourni ; remplacer par april.svg
// si une version vectorielle est déposée dans public/logos/).
const APRIL_LOGO = { src: "/logos/april.png", alt: "APRIL", width: 1568, height: 671 };

type TrustLogo = { src: string; alt: string; width: number; height: number; className: string };

// Garanties : une rangée éditoriale séparée par des filets, pas des tuiles.
const trustItems: { label: string; sublabel: string; logo: TrustLogo }[] = [
  {
    label: "RGE QualiPAC",
    sublabel: "Qualification installateur",
    logo: { ...QUALIPAC_LOGO, className: "h-12 w-auto" },
  },
  {
    label: "Mandataire CEE",
    sublabel: "Mandataire auprès des obligés",
    logo: { src: "/logos/cee.png", alt: "Certificats d'Économies d'Énergie", width: 690, height: 400, className: "h-12 w-auto" },
  },
  {
    label: "MaPrimeRénov'",
    sublabel: "Condition d'accès aux aides",
    logo: { src: "/logos/rge.png", alt: "MaPrimeRénov'", width: 512, height: 512, className: "h-12 w-auto" },
  },
  {
    label: "Coup de pouce x5",
    sublabel: "Prime bonifiée",
    logo: { src: "/logos/coup-de-pouce.png", alt: "Prime Coup de pouce", width: 1200, height: 900, className: "h-12 w-auto" },
  },
  {
    label: "Garantie décennale",
    sublabel: "Assuré par APRIL",
    logo: { ...APRIL_LOGO, className: "h-7 w-auto" },
  },
];

// La séquence porte l'information : les numéros sont le marqueur principal.
const steps = [
  {
    title: "Éligibilité sous 24 h",
    description: "Nous étudions votre profil et confirmons votre éligibilité aux aides 2026.",
  },
  {
    title: "Visite technique",
    description: "Un technicien évalue votre logement et dimensionne la PAC adaptée.",
  },
  {
    title: "Devis aides déduites",
    description: "Vous recevez un devis détaillé, aides CEE et MaPrimeRénov' déjà déduites.",
  },
  {
    title: "Installation RGE",
    description: "Pose réalisée par un installateur certifié RGE QualiPAC, garantie décennale.",
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

// Hiérarchie typographique de la page (une seule échelle, réutilisée).
const h2Class =
  "font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] text-ink sm:text-5xl [text-wrap:balance]";
const leadClass = "max-w-[60ch] text-lg leading-relaxed text-ink-muted sm:text-xl";

export default function PacLandingPage() {
  return (
    <div className="bg-cream pb-20 text-ink md:pb-0">
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

          <a href="#pac-form" className="btn-primary btn-wipe px-4 py-2.5 text-sm sm:px-6 sm:py-3">
            <span>Vérifier mon éligibilité</span>
          </a>
        </div>
      </header>

      {/* 2. Hero : titre éditorial à gauche (colonne large), formulaire à droite */}
      <section className="bg-forest pt-12 text-white sm:pt-16 lg:pt-20">
        <div className="section-shell grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-16 lg:gap-y-10 lg:pb-24">
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <div className="lg:pr-6">
              <h1 className="font-display text-5xl font-light leading-[1.02] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-6xl lg:text-[4.5rem]">
                Pompe à chaleur air/eau :{" "}
                <span className="italic text-emerald-400">0 € d&apos;avance de frais</span>
              </h1>
              <p className="mt-7 max-w-[26ch] font-display text-2xl font-light leading-snug text-white/90 sm:text-3xl">
                Jusqu&apos;à <span className="text-emerald-400">100 %</span> financé par les
                aides, selon vos revenus.
              </p>

              <ul className="mt-10 max-w-[58ch] divide-y divide-white/15 border-y border-white/15">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4 py-4">
                    <HeroCheck className="mt-0.5" />
                    <span className="text-base leading-relaxed text-white/90 sm:text-[17px]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Image
                  src={QUALIPAC_LOGO.src}
                  alt={QUALIPAC_LOGO.alt}
                  width={QUALIPAC_LOGO.width}
                  height={QUALIPAC_LOGO.height}
                  className="h-10 w-auto rounded-md bg-white px-1.5 py-1"
                />
                <p className="text-sm text-emerald-200">
                  Fiche CEE BAR-TH-171 · Coup de pouce x5 · Aides 2026
                </p>
              </div>
              <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-emerald-100/70">
                {MENTION_MONTANT_INDICATIF}
              </p>
            </div>
          </Reveal>

          {/* Formulaire : juste après le titre sur mobile, colonne droite collante sur desktop. */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch">
            <div id="pac-form" className="scroll-mt-24 lg:sticky lg:top-24 lg:mt-2">
              <PacLeadForm />
            </div>
          </div>

          {/* Photo décalée hors de la colonne : rompt la symétrie du hero. */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-card-lg shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] lg:col-start-1 lg:row-start-2 lg:-ml-10 lg:w-[calc(100%+2.5rem)]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Garanties : rangée séparée par des filets */}
      <section className="border-b border-ink/10 bg-cream-soft">
        <div className="section-shell">
          <div className="grid gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-[auto_repeat(5,minmax(0,1fr))] lg:gap-y-0 lg:py-0">
            <p className="font-display text-xl font-light italic leading-tight text-ink sm:col-span-2 lg:col-span-1 lg:max-w-[12ch] lg:self-center lg:py-8 lg:pr-8">
              Des garanties vérifiables, pas des promesses.
            </p>
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 lg:flex-col lg:items-start lg:justify-center lg:gap-3 lg:border-l lg:border-ink/10 lg:px-6 lg:py-8"
              >
                <span className="flex h-12 w-24 flex-none items-center lg:w-auto">
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    width={item.logo.width}
                    height={item.logo.height}
                    className={item.logo.className}
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-ink-muted">{item.sublabel}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reste à charge : argument à gauche, barème en liste à droite */}
      <section className="section-shell py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className={h2Class}>Et si votre pompe à chaleur ne vous coûtait rien&nbsp;?</h2>
            <p className={`mt-6 ${leadClass}`}>
              Pour les ménages très modestes remplaçant une chaudière fioul, gaz ou charbon,
              les aides cumulées peuvent couvrir{" "}
              <strong className="font-semibold text-emerald-700">100 %</strong> du devis. Reste
              à charge : à partir de{" "}
              <strong className="font-semibold text-emerald-700">0 €</strong>.
            </p>
            <p className="mt-4 max-w-[60ch] text-xs leading-relaxed text-ink-soft">
              {MENTION_MONTANT_INDICATIF}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {INCOME_BANDS.map((band) => {
                const reste = RESTE_A_CHARGE_PAR_TRANCHE[band.id];
                const isHighlight = band.id === "tres_modestes";
                return (
                  <li
                    key={band.id}
                    className={`grid gap-x-6 gap-y-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline ${
                      isHighlight ? "py-8" : ""
                    }`}
                  >
                    <div>
                      <p className="font-display text-2xl font-light text-ink">{band.label}</p>
                      <p className="mt-1 text-sm text-ink-muted">{band.hint}</p>
                      {reste.note ? (
                        <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-emerald-700">
                          {reste.note}
                        </p>
                      ) : null}
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs text-ink-soft">Reste à charge</p>
                      {isHighlight ? (
                        <p className="mt-1 font-display font-light leading-none text-ink">
                          <span className="text-lg">à partir de</span>{" "}
                          <span className="text-5xl text-emerald-700 sm:text-6xl">0 €</span>
                        </p>
                      ) : (
                        <p className="mt-1 font-display text-2xl font-light text-ink">
                          {reste.value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a href="#pac-form" className="btn-primary btn-wipe">
                <span>Vérifier mon éligibilité</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="max-w-[46ch] text-xs leading-relaxed text-ink-soft">
                {MENTION_INTERMEDIAIRE}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Accompagnement : titre en colonne étroite, liste en colonne large */}
      <section className="border-t border-ink/10">
        <div className="section-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className={h2Class}>Ce que comprend l&apos;accompagnement</h2>
            <p className={`mt-6 ${leadClass} lg:text-lg`}>
              Pioud Energy s&apos;occupe de tout, de la première visite jusqu&apos;au versement
              de la prime. Votre prime CEE (fiche BAR-TH-171, Coup de pouce x5 : de 5 000 € à
              12 000 €) et MaPrimeRénov&apos; sont déduites directement de votre devis : aucune
              avance de votre part sur la part financée.
            </p>
          </div>
          <ul className="divide-y divide-ink/10 lg:col-span-7 lg:col-start-6">
            {inclusions.map((item) => (
              <li key={item.title} className="group flex gap-5 py-7 first:pt-0 sm:gap-7">
                <PacIcon icon={item.icon} />
                <div className="max-w-[52ch]">
                  <h3 className="text-xl font-semibold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Déroulé : quatre colonnes numérotées, sans cartes */}
      <section className="bg-white py-20 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className={`${h2Class} lg:col-span-5`}>Comment ça se passe</h2>
            <p className={`${leadClass} lg:col-span-6 lg:col-start-7 lg:self-end lg:text-lg`}>
              Quatre étapes, un seul interlocuteur. Le premier échange a lieu sous 24 h ouvrées
              après votre demande.
            </p>
          </div>
          <ol className="mt-14 grid gap-10 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.title} className="pt-6 lg:border-l lg:border-ink/10 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <span
                  aria-hidden
                  className="block font-display text-6xl font-light leading-none tracking-[-0.02em] text-emerald-600/80"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[34ch] text-base leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. FAQ : titre à gauche, questions en filets à droite */}
      <section className="py-16 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className={h2Class}>Questions fréquentes</h2>
            <p className={`mt-6 ${leadClass} lg:text-lg`}>
              Les réponses aux questions que l&apos;on nous pose avant la visite technique.
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <PacFaq />
          </div>
        </div>
      </section>

      {/* 8. CTA final : photo étroite, texte large */}
      <section className="bg-forest py-20 text-white sm:py-28">
        <div className="section-shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-card-lg shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)]">
              <Image
                src={ctaImage.src}
                alt={ctaImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] text-white [text-wrap:balance] sm:text-5xl lg:text-6xl">
              Vérifiez votre éligibilité en 1 minute
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-emerald-100/85 sm:text-xl">
              Simulation gratuite et sans engagement. Un conseiller dédié vous recontacte sous
              24 h ouvrées.
            </p>
            <a
              href="#pac-form"
              className="btn-wipe mt-9 inline-flex items-center gap-2 rounded-pill bg-emerald-500 px-7 py-3.5 font-medium text-white shadow-[0_12px_28px_-8px_rgba(16,185,129,0.6)]"
            >
              <span>Vérifier mon éligibilité en 1 minute</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pied de page légal — seuls liens sortants autorisés : mentions
          légales et politique de confidentialité. */}
      <footer className="border-t border-ink/10 py-10 text-xs text-ink-soft">
        <div className="section-shell grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-semibold text-ink">
              {LEGAL_NAME} · {LEGAL_SIREN}
            </p>
            <p className="mt-1">{siteConfig.address}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
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
          <p className="max-w-[72ch] leading-relaxed lg:col-span-7 lg:col-start-6">
            {MENTION_MONTANT_INDICATIF} {MENTION_INTERMEDIAIRE}
          </p>
        </div>
      </footer>

      <PacStickyCta targetId="pac-form" />
    </div>
  );
}
