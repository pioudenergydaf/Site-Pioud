import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Banknote,
  Coins,
  ExternalLink,
  FileText,
  Flame,
  Gauge,
  HardHat,
  Ruler,
  Search,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatedLine } from "@/components/ui/animated-line";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactFormsSection } from "@/components/contact/contact-forms-section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Matelas isolants points singuliers – Fiche CEE BAT-TH-146",
  description:
    "Isolation des points singuliers (vannes, brides, robinets) en chaufferie tertiaire : supprimez les déperditions et financez vos travaux via la fiche CEE BAT-TH-146.",
};

const OFFICIAL_SHEET_URL =
  "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie";

const reassuranceStrip = [
  { icon: ShieldCheck, text: "Mandataire CEE agréé" },
  { icon: Snowflake, text: "Sans engagement" },
  { icon: Zap, text: "Réponse sous 24h" },
];

const benefits = [
  {
    icon: ThermometerSnowflake,
    title: "Déperditions maîtrisées",
    text: "Suppression des pertes de chaleur au niveau des organes non isolés.",
  },
  {
    icon: Coins,
    title: "Facture allégée",
    text: "Chaque point isolé réduit la consommation du réseau de chauffage.",
  },
  {
    icon: Gauge,
    title: "Rendement optimisé",
    text: "Une installation mieux isolée fonctionne plus efficacement, plus longtemps.",
  },
  {
    icon: HardHat,
    title: "Sécurité des équipes",
    text: "Protection contre les brûlures sur les surfaces chaudes en chaufferie.",
  },
  {
    icon: Wrench,
    title: "Maintenance préservée",
    text: "Les matelas se démontent et se remontent, contrairement au calorifuge fixe.",
  },
  {
    icon: Banknote,
    title: "Travaux financés",
    text: "Opération éligible aux Certificats d'Économies d'Énergie.",
  },
];

const steps = [
  { icon: Search, text: "Audit des points singuliers de votre installation." },
  { icon: Ruler, text: "Fabrication de matelas isolants sur mesure." },
  { icon: Wrench, text: "Pose par un professionnel qualifié." },
  { icon: Banknote, text: "Montage du dossier CEE et versement de la prime.", final: true },
];

const eligibilityItems = [
  "Bâtiment tertiaire existant.",
  "Isolation de points singuliers sur un réseau hydraulique ou vapeur.",
  "Pose réalisée par un professionnel qualifié.",
  "Matelas conformes aux exigences de la fiche BAT-TH-146.",
];

const trustPoints = [
  { icon: ShieldCheck, text: "Mandataire CEE agréé" },
  { icon: Wrench, text: "Accompagnement de A à Z" },
  { icon: Flame, text: "Travaux réalisés par des professionnels qualifiés" },
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
      {children}
    </p>
  );
}

export default function MatelasIsolantPage() {
  return (
    <div className="bg-cream">
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Professionnels", href: "/professionnels" },
            { label: "Tertiaire", href: "/professionnels/tertiaire" },
            { label: "Matelas isolant" },
          ]}
        />
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-16 md:pb-28">
        <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-pill bg-sage/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-pill bg-emerald-100/60 blur-3xl" />
        <div className="section-shell relative grid items-center gap-10 md:gap-14 lg:grid-cols-2">
          <div className="space-y-6 md:space-y-8">
            <Reveal delay={0}>
              <p className="inline-flex rounded-pill border border-ink/10 bg-white px-4 py-1.5 text-sm font-medium text-ink-muted shadow-sm">
                💶 Financé par les CEE
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                Matelas isolants : supprimez les{" "}
                <span className="italic text-emerald-600">déperditions</span> de vos points
                singuliers
              </h1>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="max-w-xl text-xl leading-relaxed text-ink-muted">
                Fiche BAT-TH-146 — isolez les vannes, brides et robinets de vos chaufferies
                et réseaux, avec un accompagnement CEE de A à Z.
              </p>
            </Reveal>
            <Reveal delay={0.36}>
              <div className="flex flex-wrap gap-3">
                <Link href="#contact" className="btn-primary">
                  Estimer ma prime CEE
                </Link>
                <a
                  href={OFFICIAL_SHEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Voir la fiche officielle
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.48}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-6">
                {reassuranceStrip.map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted"
                  >
                    <item.icon className="h-4 w-4 text-forest-soft" />
                    {item.text}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.6}>
            <div className="relative min-h-[380px] overflow-hidden rounded-card-lg border border-white/60 shadow-2xl shadow-[0_28px_64px_rgba(31,58,46,0.2)] ring-1 ring-black/5">
              <Image
                src="/images/point-singulier-3.jpeg"
                alt="Matelas isolant posé sur une vanne de chaufferie tertiaire"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* QU'EST-CE QU'UN POINT SINGULIER */}
      <section className="bg-white py-12 md:py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Définition</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Qu&apos;est-ce qu&apos;un point singulier ?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
              Sur un réseau de chauffage, d&apos;eau chaude ou de vapeur, les tuyauteries
              droites sont généralement calorifugées. Mais les organes techniques — vannes,
              brides, robinets, clapets, filtres — restent souvent nus. Ces « points
              singuliers » interrompent la continuité de l&apos;isolation et concentrent des
              déperditions de chaleur importantes, invisibles mais coûteuses. Les isoler
              avec des matelas isolants démontables permet de rétablir la performance
              thermique du réseau tout en gardant l&apos;accès aux équipements pour la
              maintenance.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  src: "/images/point-singulier-1.jpeg",
                  alt: "Matelas isolant démontable posé sur un point singulier de chaufferie",
                  width: 899,
                  height: 899,
                },
                {
                  src: "/images/point-singulier-2.jpeg",
                  alt: "Vannes de chaufferie équipées de matelas isolants sur mesure",
                  width: 899,
                  height: 900,
                },
                {
                  src: "/images/point-singulier-3.jpeg",
                  alt: "Matelas isolant posé sur une vanne de chaufferie tertiaire",
                  width: 768,
                  height: 1024,
                },
              ].map((img) => (
                <div
                  key={img.src}
                  className="flex h-72 items-center justify-center overflow-hidden rounded-card-lg border border-white/60 bg-cream-soft shadow-lg shadow-[0_10px_28px_rgba(31,58,46,0.08)] ring-1 ring-black/5"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-pill bg-sage px-4 py-2 text-sm font-semibold text-forest">
              <FileText className="h-4 w-4" />
              Fiche BAT-TH-146 · Opération standardisée CEE — bâtiment tertiaire
            </p>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI LES ISOLER */}
      <section className="py-12 md:py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Bénéfices</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Pourquoi isoler vos points singuliers
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={(index % 3) * 0.08}>
                <div className="card-surface h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <benefit.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-white py-12 md:py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Méthode</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">Comment ça marche</h2>
          </Reveal>
          {/* Desktop: connected horizontal journey */}
          <div className="relative mt-14 hidden sm:grid sm:grid-cols-4 sm:gap-6">
            <AnimatedLine
              axis="x"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 border-t-2 border-dashed border-ink/15"
            />
            {steps.map((step, index) => (
              <div key={step.text} className="relative z-10 flex justify-center">
                <Reveal delay={0.08 + index * 0.15}>
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg ${
                      step.final
                        ? "bg-emerald-500 shadow-emerald-500/30"
                        : "bg-forest shadow-forest/20"
                    }`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </span>
                </Reveal>
              </div>
            ))}
          </div>
          <div className="hidden sm:mt-6 sm:grid sm:grid-cols-4 sm:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.text} delay={index * 0.08}>
                <article
                  className={`card-surface h-full p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    step.final ? "border-emerald-300 bg-emerald-50/50" : ""
                  }`}
                >
                  <p className="text-ink-muted">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Mobile: connected vertical journey */}
          <div className="relative mt-8 space-y-6 sm:hidden">
            {steps.map((step, index) => (
              <Reveal key={step.text} delay={index * 0.08}>
                <div className="relative flex gap-4">
                  {index < steps.length - 1 ? (
                    <AnimatedLine
                      axis="y"
                      className="absolute left-7 top-14 h-[calc(100%+1.5rem)] border-l-2 border-dashed border-ink/15"
                    />
                  ) : null}
                  <span
                    className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full shadow-lg ${
                      step.final
                        ? "bg-emerald-500 shadow-emerald-500/30"
                        : "bg-forest shadow-forest/20"
                    }`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </span>
                  <article
                    className={`card-surface flex-1 p-5 ${
                      step.final ? "border-emerald-300 bg-emerald-50/50" : ""
                    }`}
                  >
                    <p className="text-ink-muted">{step.text}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS D'ÉLIGIBILITÉ */}
      <section className="py-12 md:py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Éligibilité</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Conditions d&apos;éligibilité
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10">
            {eligibilityItems.map((item, index) => (
              <Reveal key={item} delay={(index % 2) * 0.08}>
                <div className="card-surface flex items-start gap-3 border-l-4 border-l-emerald-400 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <span className="mt-0.5 inline-flex flex-shrink-0 rounded-full bg-emerald-50 p-1.5 text-forest-soft">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-ink-muted">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-ink/10 bg-cream-soft/70 p-5">
              <p className="text-sm leading-relaxed text-ink-muted">
                Les conditions détaillées et le montant de la prime sont confirmés lors de
                l&apos;étude d&apos;éligibilité.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RÉASSURANCE AVANT FORMULAIRE */}
      <section className="py-12 md:py-20">
        <div className="section-shell">
          <div className="grid gap-4 sm:grid-cols-3">
            {trustPoints.map((point, index) => (
              <Reveal key={point.text} delay={index * 0.08}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-ink/10 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <span className="inline-flex flex-shrink-0 rounded-full border border-emerald-200 bg-emerald-50 p-3 text-forest-soft">
                    <point.icon className="h-6 w-6" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{point.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-transparent to-sage/30">
        <ContactFormsSection
          id="contact"
          heading="Estimez votre prime CEE gratuitement"
          defaultMessage="Je souhaite un devis pour l'isolation des points singuliers (matelas isolants, fiche BAT-TH-146)."
          emphasized
          submitNote="Réponse garantie sous 24h ouvrées, sans engagement."
        />
      </div>
    </div>
  );
}
