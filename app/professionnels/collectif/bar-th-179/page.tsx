import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CalendarCheck,
  CheckCircle,
  Flame,
  Leaf,
  Network,
  TrendingDown,
  XCircle,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactFormsSection } from "@/components/contact/contact-forms-section";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "PAC collective air/eau copropriété – Fiche CEE BAR-TH-179",
  description:
    "Remplacement de chaudière collective par une PAC air/eau en copropriété : cadre réglementaire SEQE-UE 2, DPE et fiche CEE BAR-TH-179.",
};

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
  { year: "2025", text: "Interdiction de louer les logements classés G au DPE." },
  { year: "2028", text: "Extension de l'interdiction aux logements classés F." },
  { year: "2034", text: "Extension de l'interdiction aux logements classés E." },
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
  "Étude d'éligibilité et estimation de la prime.",
  "Montage du dossier CEE par nos soins.",
  "Installation par un professionnel RGE.",
  "Versement de la prime.",
];

export default function BarTh179Page() {
  return (
    <div>
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

      <PageHero
        eyebrow="✨ Nouvelle fiche CEE 2026"
        title="Pompe à chaleur collective air/eau : jusqu'à 3x plus de CEE en copropriété"
        description="Fiche BAR-TH-179 — financez le remplacement de votre chaufferie fossile par une PAC collective air/eau."
        imageUrl="https://images.unsplash.com/photo-1699564625068-803d1c7fcfbc?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "#contact", label: "Estimer ma prime CEE" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Qu&apos;est-ce que la fiche BAR-TH-179 ?</h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-muted">
            La fiche BAR-TH-179 est une opération standardisée du dispositif des
            Certificats d&apos;Économies d&apos;Énergie. Elle finance la mise en place
            d&apos;une ou plusieurs pompes à chaleur collectives de type air/eau, pour un
            système de chauffage collectif, dans les bâtiments résidentiels collectifs
            existants (copropriétés).
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="card-surface p-5">
              <p className="text-2xl font-bold text-forest">BAR</p>
              <p className="mt-1 text-sm text-ink-muted">Bâtiment résidentiel</p>
            </div>
            <div className="card-surface p-5">
              <p className="text-2xl font-bold text-forest">TH</p>
              <p className="mt-1 text-sm text-ink-muted">Thermique</p>
            </div>
            <div className="card-surface p-5">
              <p className="text-2xl font-bold text-forest">179</p>
              <p className="mt-1 text-sm text-ink-muted">PAC collective air/eau</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 inline-flex items-center gap-2 rounded-pill bg-sage px-4 py-2 text-sm font-semibold text-forest">
            <CalendarCheck className="h-4 w-4" />
            Applicable depuis le 1er janvier 2026 · Engagement jusqu&apos;au 31 décembre 2030
          </p>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Conditions d&apos;éligibilité</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {eligibilityItems.map((item, index) => (
            <Reveal key={item.text} delay={(index % 2) * 0.06}>
              <div
                className={`card-surface flex items-start gap-3 p-5 ${
                  item.ok ? "" : "border-peach bg-peach-soft/30"
                }`}
              >
                {item.ok ? (
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-soft" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-pioud-orange" />
                )}
                <p className="text-sm text-ink-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface border-emerald-200 bg-sage/60 p-8">
            <p className="inline-flex items-center gap-2 rounded-pill bg-emerald-100 px-4 py-1 text-sm font-semibold text-forest">
              <Flame className="h-4 w-4" />
              Coup de pouce Chauffage
            </p>
            <h2 className="mt-4 text-3xl font-bold text-ink">
              Un bonus x3 sur le volume de CEE
            </h2>
            <p className="mt-3 text-ink-muted">
              Le volume de CEE est multiplié par 3 lorsque la PAC air/eau vient en
              remplacement d&apos;une chaudière au charbon, au fioul ou au gaz (Coup de
              pouce Chauffage des bâtiments résidentiels collectifs).
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <p className="inline-flex rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
            Cadre réglementaire
          </p>
          <h2 className="mt-4 text-4xl font-bold text-ink">
            Contexte réglementaire : pourquoi anticiper la sortie du gaz
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-ink">
              SEQE-UE 2 : le gaz et le fioul entrent dans le marché carbone
            </h3>
            <p className="mt-3 leading-relaxed text-ink-muted">
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
              <Link href="#contact" className="font-semibold text-forest-soft underline underline-offset-2">
                parler à un expert
              </Link>
              .
            </p>
            <div className="mt-5 inline-flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest-soft" />
              <p className="text-sm font-semibold text-forest">
                Une pompe à chaleur électrique n&apos;est pas concernée par cette taxe
                carbone sur les combustibles fossiles.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14">
            <h3 className="text-2xl font-semibold text-ink">
              Le calendrier DPE : chauffage collectif et valeur du bien
            </h3>
            <p className="mt-3 leading-relaxed text-ink-muted">
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

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {dpeCalendar.map((item) => (
                <Reveal key={item.year}>
                  <article className="card-surface p-5">
                    <p className="text-sm font-semibold uppercase text-forest-soft">
                      {item.year}
                    </p>
                    <p className="mt-2 text-ink-muted">{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-ink/10 bg-cream-soft/70 p-4">
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
          <div className="mt-14">
            <h3 className="text-2xl font-semibold text-ink">
              Deux trajectoires, un seul choix structurel
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
              Vous gérez aussi des bâtiments tertiaires ? Consultez notre fiche sur la{" "}
              <Link
                href="/professionnels/tertiaire"
                className="font-semibold text-forest-soft underline underline-offset-2"
              >
                pompe à chaleur en tertiaire
              </Link>
              .
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[720px] divide-y divide-ink/10 text-sm">
                <thead>
                  <tr className="text-left text-ink-muted">
                    <th className="bg-cream-soft px-4 py-3 font-semibold">Critère</th>
                    <th className="bg-cream-soft px-4 py-3 font-semibold">Chauffage gaz</th>
                    <th className="bg-cream-soft px-4 py-3 font-semibold">
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
                      <td className="px-4 py-3">
                        <span className="inline-flex items-start gap-2">
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
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Pourquoi passer à la PAC collective
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.text} delay={(index % 2) * 0.06}>
              <div className="card-surface flex items-start gap-3 p-5">
                <span className="inline-flex rounded-xl bg-sage p-2 text-forest-soft">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <p className="text-sm text-ink-muted">{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Comment ça marche</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step} delay={(index % 4) * 0.06}>
              <article className="card-surface p-5">
                <p className="text-sm font-semibold uppercase text-forest-soft">
                  Étape {index + 1}
                </p>
                <p className="mt-2 text-ink-muted">{step}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactFormsSection
        id="contact"
        heading="Estimez votre prime CEE gratuitement"
        defaultMessage="Je souhaite un devis pour l'installation d'une PAC collective air/eau (fiche BAR-TH-179)."
      />
    </div>
  );
}
