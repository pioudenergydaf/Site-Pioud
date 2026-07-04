import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Banknote,
  CalendarCheck,
  CheckCircle,
  ExternalLink,
  FileText,
  Flame,
  Leaf,
  Network,
  Search,
  ShieldCheck,
  TrendingDown,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactFormsSection } from "@/components/contact/contact-forms-section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "PAC collective air/eau copropriété – Fiche CEE BAR-TH-179",
  description:
    "Remplacement de chaudière collective par une PAC air/eau en copropriété : cadre réglementaire SEQE-UE 2, DPE et fiche CEE BAR-TH-179.",
};

const OFFICIAL_SHEET_URL =
  "https://www.ecologie.gouv.fr/operations-standardisees-deconomies-denergie";

const reassuranceStrip = [
  { icon: ShieldCheck, text: "Mandataire CEE agréé" },
  { icon: CheckCircle, text: "Sans engagement" },
  { icon: Zap, text: "Réponse sous 24h" },
];

const eligibilityItems: Array<{ text: string; ok: boolean }> = [
  { text: "Bâtiment résidentiel collectif existant (copropriété).", ok: true },
  {
    text: "Une ou plusieurs PAC air/eau, puissance thermique nominale ≤ 400 kW par PAC.",
    ok: true,
  },
  { text: "Usage chauffage seul, ou chauffage + eau chaude sanitaire.", ok: true },
  { text: "Une PAC utilisée uniquement pour l'ECS n'est pas éligible.", ok: false },
  { text: "Installation par un professionnel qualifié RGE.", ok: true },
  { text: "Note de dimensionnement remise à la fin des travaux.", ok: true },
];

const dpeCalendar = [
  {
    year: "2025",
    text: "Interdiction de louer les logements classés G au DPE.",
    color: "#6EE7B7",
  },
  {
    year: "2028",
    text: "Extension de l'interdiction aux logements classés F.",
    color: "#10B981",
  },
  {
    year: "2034",
    text: "Extension de l'interdiction aux logements classés E.",
    color: "#1F3A2E",
  },
];

const comparisonRows = [
  {
    criterion: "Exposition SEQE-UE 2",
    gas: "Concerné dès 2027",
    pac: "Non concerné (électricité)",
  },
  {
    criterion: "Rendement énergétique",
    gas: "1 kWh consommé = 1 kWh produit",
    pac: "1 kWh consommé ≈ 3 à 4 kWh restitués (coefficient de performance)",
  },
  {
    criterion: "Impact DPE",
    gas: "Pénalise le classement",
    pac: "Améliore le classement",
  },
  {
    criterion: "Sécurité / combustion",
    gas: "Combustion, entretien annuel obligatoire",
    pac: "Pas de combustion locale",
  },
];

const benefits = [
  {
    icon: TrendingDown,
    text: "Réduction forte des consommations et des charges de chauffage.",
  },
  {
    icon: Leaf,
    text: "Sortie des énergies fossiles / décarbonation du bâtiment.",
  },
  {
    icon: Award,
    text: "Prime CEE qui couvre une part importante de l'investissement.",
  },
  {
    icon: Network,
    text: "Solution adaptée quand le raccordement à un réseau de chaleur n'est pas possible.",
  },
];

const steps = [
  { icon: Search, text: "Étude d'éligibilité et estimation de la prime." },
  { icon: FileText, text: "Montage du dossier CEE par nos soins." },
  { icon: Wrench, text: "Installation par un professionnel RGE." },
  { icon: Banknote, text: "Versement de la prime.", final: true },
];

const trustPoints = [
  { icon: ShieldCheck, text: "Mandataire CEE agréé" },
  { icon: Wrench, text: "Accompagnement de A à Z" },
  { icon: BadgeCheck, text: "Professionnels RGE uniquement" },
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
      {children}
    </p>
  );
}

export default function BarTh179Page() {
  return (
    <div className="bg-cream">
      <section className="section-shell pt-28">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Professionnels", href: "/professionnels" },
            { label: "Collectif", href: "/professionnels/collectif" },
            { label: "BAR-TH-179" },
          ]}
        />
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden pb-28 pt-16">
        <div className="pointer-events-none absolute -right-20 top-10 h-[420px] w-[420px] rounded-pill bg-sage/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-pill bg-emerald-100/60 blur-3xl" />
        <div className="section-shell relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-8">
              <p className="inline-flex rounded-pill border border-ink/10 bg-white px-4 py-1.5 text-sm font-medium text-ink-muted shadow-sm">
                ✨ Nouvelle fiche CEE 2026
              </p>
              <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                Pompe à chaleur collective air/eau : jusqu&apos;à{" "}
                <span className="whitespace-nowrap italic text-emerald-600">3x plus</span> de
                CEE en copropriété
              </h1>
              <p className="max-w-xl text-xl leading-relaxed text-ink-muted">
                Fiche BAR-TH-179 — financez le remplacement de votre chaufferie fossile par
                une PAC collective air/eau.
              </p>
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
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[380px] overflow-hidden rounded-card-lg border border-white/60 shadow-2xl shadow-[0_28px_64px_rgba(31,58,46,0.2)] ring-1 ring-black/5">
              <Image
                src="https://images.unsplash.com/photo-1699564625068-803d1c7fcfbc?auto=format&fit=crop&w=1700&q=80"
                alt="Immeuble résidentiel collectif, copropriété candidate à une PAC collective air/eau"
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

      {/* C'EST QUOI BAR-TH-179 */}
      <section className="bg-white py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Fiche CEE</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Qu&apos;est-ce que la fiche BAR-TH-179 ?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
              La fiche BAR-TH-179 est une opération standardisée du dispositif des
              Certificats d&apos;Économies d&apos;Énergie. Elle finance la mise en place
              d&apos;une ou plusieurs pompes à chaleur collectives de type air/eau, pour un
              système de chauffage collectif, dans les bâtiments résidentiels collectifs
              existants (copropriétés).
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-10 overflow-hidden rounded-card-lg border border-white/60 shadow-2xl shadow-[0_28px_64px_rgba(31,58,46,0.2)] ring-1 ring-black/5">
              <div className="relative h-[320px] w-full sm:h-[420px]">
                <Image
                  src="/images/pac-collective-bar-th-179.webp"
                  alt="Pompe à chaleur air/eau collective installée sur un immeuble résidentiel"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-soft">
              <span className="font-semibold text-forest-soft">BAR</span> Bâtiment résidentiel
              <span className="mx-2">·</span>
              <span className="font-semibold text-forest-soft">TH</span> Thermique
              <span className="mx-2">·</span>
              <span className="font-semibold text-forest-soft">179</span> PAC collective air/eau
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 inline-flex items-center gap-2 rounded-pill bg-sage px-4 py-2 text-sm font-semibold text-forest">
              <CalendarCheck className="h-4 w-4" />
              Applicable depuis le 1er janvier 2026 · Engagement jusqu&apos;au 31 décembre
              2030
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONDITIONS D'ÉLIGIBILITÉ */}
      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Éligibilité</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Conditions d&apos;éligibilité
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {eligibilityItems.map((item, index) => (
              <Reveal key={item.text} delay={(index % 2) * 0.06}>
                <div
                  className={`card-surface flex items-start gap-3 border-l-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    item.ok ? "border-l-emerald-400" : "border-l-pioud-orange bg-peach-soft/30"
                  }`}
                >
                  <span
                    className={`mt-0.5 inline-flex flex-shrink-0 rounded-full p-1.5 ${
                      item.ok ? "bg-emerald-50 text-forest-soft" : "bg-peach-soft text-pioud-orange"
                    }`}
                  >
                    {item.ok ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </span>
                  <p className="text-sm text-ink-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS X3 */}
      <section className="section-shell pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-card-lg border-2 border-emerald-300/70 bg-gradient-to-br from-sage via-white to-emerald-50 p-8 shadow-[0_24px_56px_rgba(16,129,86,0.14)] sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-lg shadow-forest/30">
                <span className="font-display text-4xl font-bold">×3</span>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 rounded-pill bg-emerald-100 px-4 py-1 text-sm font-semibold text-forest">
                  <Flame className="h-4 w-4" />
                  Coup de pouce Chauffage
                </p>
                <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
                  Un bonus x3 sur le volume de CEE
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Le volume de CEE est multiplié par 3 lorsque la PAC air/eau vient en
                  remplacement d&apos;une chaudière au charbon, au fioul ou au gaz (Coup de
                  pouce Chauffage des bâtiments résidentiels collectifs).
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTEXTE RÉGLEMENTAIRE */}
      <section className="bg-white py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Cadre réglementaire</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Contexte réglementaire : pourquoi anticiper la sortie du gaz
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-14">
              <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                SEQE-UE 2 : le gaz et le fioul entrent dans le marché carbone
              </h3>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-ink-muted">
                L&apos;Union européenne a créé un second marché carbone, le SEQE-UE 2 (ou
                ETS 2), qui étend aux bâtiments, au chauffage et au transport routier le
                principe déjà appliqué à l&apos;industrie lourde. À partir de 2027 (démarrage
                possiblement décalé à 2028 selon l&apos;évolution des prix de l&apos;énergie), les
                fournisseurs de gaz et de fioul devront acheter aux enchères des quotas
                carbone correspondant à leurs émissions. Ce coût sera répercuté sur les
                factures des utilisateurs de ces énergies fossiles. Le prix du quota
                carbone restera plafonné à 45 €/tonne au moins jusqu&apos;en 2030, afin de
                limiter l&apos;impact sur les ménages et copropriétés. Nos équipes peuvent
                vous aider à anticiper cette évolution :{" "}
                <Link
                  href="#contact"
                  className="font-semibold text-forest-soft underline underline-offset-2"
                >
                  parler à un expert
                </Link>
                .
              </p>
              <div className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-soft" />
                <p className="text-sm font-semibold text-forest">
                  Une pompe à chaleur électrique n&apos;est pas concernée par cette taxe
                  carbone sur les combustibles fossiles.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                Le calendrier DPE : chauffage collectif et valeur du bien
              </h3>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-ink-muted">
                La loi Climat et Résilience interdit progressivement la location des
                logements les plus énergivores. Un chauffage collectif au gaz ou au
                fioul, peu performant, pénalise directement le DPE de chaque lot de la
                copropriété et donc sa valeur locative et patrimoniale. Découvrez{" "}
                <Link
                  href="/#qui-sommes-nous"
                  className="font-semibold text-forest-soft underline underline-offset-2"
                >
                  notre accompagnement CEE
                </Link>{" "}
                pour l&apos;ensemble de vos copropriétés.
              </p>

              {/* Desktop: horizontal timeline */}
              <Reveal>
                <div className="relative mt-12 hidden sm:block">
                  <div className="grid grid-cols-3 gap-6">
                    {dpeCalendar.map((item) => (
                      <p key={item.year} className="text-center text-3xl font-bold text-forest">
                        {item.year}
                      </p>
                    ))}
                  </div>

                  <div className="relative mt-4 grid grid-cols-3 gap-6">
                    <div className="pointer-events-none absolute left-0 right-6 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-emerald-200 via-emerald-500 to-forest" />
                    <ArrowRight className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-forest" />
                    {dpeCalendar.map((item) => (
                      <div key={item.year} className="relative z-10 flex justify-center">
                        <span
                          className="h-5 w-5 rounded-full border-4 border-white shadow-md"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {dpeCalendar.map((item) => (
                      <div key={item.year} className="flex flex-col items-center">
                        <div className="h-6 w-px bg-forest-soft/30" />
                        <article className="card-surface mt-1 w-full p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                          <p className="text-sm text-ink-muted">{item.text}</p>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Mobile: vertical timeline */}
              <div className="relative mt-10 space-y-6 sm:hidden">
                {dpeCalendar.map((item, index) => (
                  <Reveal key={item.year}>
                    <div className="relative flex gap-4">
                      {index < dpeCalendar.length - 1 ? (
                        <div className="absolute left-[9px] top-8 h-[calc(100%+0.5rem)] w-0.5 bg-forest-soft/30" />
                      ) : null}
                      <span
                        className="relative z-10 mt-1 h-5 w-5 flex-shrink-0 rounded-full border-4 border-white shadow-md"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-forest">{item.year}</p>
                        <article className="card-surface mt-2 p-4">
                          <p className="text-sm text-ink-muted">{item.text}</p>
                        </article>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-ink/10 bg-cream-soft/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Référence légale
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Ce calendrier découle de la loi n° 2021-1104 du 22 août 2021 dite loi
                  Climat et Résilience. L&apos;interdiction de mise en location des logements
                  énergivores repose sur l&apos;article 160 de cette loi, qui modifie
                  l&apos;article 6 de la loi n° 89-462 du 6 juillet 1989 (obligation de
                  décence du logement) et s&apos;appuie sur l&apos;article L. 173-1-1 du Code de
                  la construction et de l&apos;habitation.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                Deux trajectoires, un seul choix structurel
              </h3>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">
                Vous gérez aussi des bâtiments tertiaires ? Consultez notre fiche sur la{" "}
                <Link
                  href="/professionnels/tertiaire"
                  className="font-semibold text-forest-soft underline underline-offset-2"
                >
                  pompe à chaleur en tertiaire
                </Link>
                .
              </p>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10">
                <table className="min-w-[720px] w-full divide-y divide-ink/10 text-sm">
                  <thead>
                    <tr className="text-left text-ink-muted">
                      <th className="bg-cream-soft px-4 py-3 font-semibold">Critère</th>
                      <th className="bg-cream-soft px-4 py-3 font-semibold">Chauffage gaz</th>
                      <th className="bg-emerald-50 px-4 py-3 font-semibold text-forest">
                        PAC collective air/eau
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10 text-ink-muted">
                    {comparisonRows.map((row) => (
                      <tr key={row.criterion}>
                        <td className="px-4 py-3 font-medium text-ink">{row.criterion}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-start gap-2">
                            <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-pioud-orange" />
                            {row.gas}
                          </span>
                        </td>
                        <td className="bg-emerald-50/60 px-4 py-3">
                          <span className="inline-flex items-start gap-2 font-medium text-forest">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest-soft" />
                            {row.pac}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI PASSER À LA PAC COLLECTIVE */}
      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Nos atouts</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              Pourquoi passer à la PAC collective
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.text} delay={(index % 2) * 0.06}>
                <div className="card-surface flex items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                    <benefit.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-1 text-sm text-ink-muted">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-white py-24">
        <div className="section-shell">
          <Reveal>
            <SectionEyebrow>Méthode</SectionEyebrow>
            <h2 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">Comment ça marche</h2>
          </Reveal>
          {/* Desktop: connected horizontal journey */}
          <div className="relative mt-14 hidden sm:grid sm:grid-cols-4 sm:gap-6">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 border-t-2 border-dashed border-ink/15" />
            {steps.map((step) => (
              <div key={step.text} className="relative z-10 flex justify-center">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg ${
                    step.final
                      ? "bg-emerald-500 shadow-emerald-500/30"
                      : "bg-forest shadow-forest/20"
                  }`}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </span>
              </div>
            ))}
          </div>
          <div className="hidden sm:mt-6 sm:grid sm:grid-cols-4 sm:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.text} delay={index * 0.06}>
                <article
                  className={`card-surface h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    step.final ? "border-emerald-300 bg-emerald-50/50" : ""
                  }`}
                >
                  <p className="text-ink-muted">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Mobile: connected vertical journey */}
          <div className="relative mt-10 space-y-6 sm:hidden">
            {steps.map((step, index) => (
              <Reveal key={step.text} delay={index * 0.06}>
                <div className="relative flex gap-4">
                  {index < steps.length - 1 ? (
                    <div className="absolute left-7 top-14 h-[calc(100%+1.5rem)] border-l-2 border-dashed border-ink/15" />
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

      {/* RÉASSURANCE AVANT FORMULAIRE */}
      <section className="py-20">
        <div className="section-shell">
          <div className="grid gap-4 sm:grid-cols-3">
            {trustPoints.map((point, index) => (
              <Reveal key={point.text} delay={index * 0.06}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-ink/10 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
          defaultMessage="Je souhaite un devis pour l'installation d'une PAC collective air/eau (fiche BAR-TH-179)."
          emphasized
          submitNote="Réponse garantie sous 24h ouvrées, sans engagement."
        />
      </div>
    </div>
  );
}
