import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Flame, Home, Thermometer, Window } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "CEE pour les particuliers",
  description:
    "Découvrez comment financer vos travaux de rénovation énergétique grâce au dispositif CEE avec l'accompagnement Pioud Energy.",
};

const eligibleWorks = [
  {
    title: "Isolation thermique",
    description: "Combles, murs, planchers bas : réduisez durablement vos déperditions.",
    icon: Home,
  },
  {
    title: "Chauffage performant",
    description:
      "Pompe à chaleur, chaudière biomasse ou systèmes hybrides à haute efficacité.",
    icon: Flame,
  },
  {
    title: "Fenêtres et menuiseries",
    description: "Améliorez le confort hiver/été avec des équipements à faible transmission.",
    icon: Window,
  },
  {
    title: "Pilotage et régulation",
    description: "Thermostats intelligents et régulations fines pour consommer au plus juste.",
    icon: Thermometer,
  },
];

export default function ParticuliersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Particuliers"
        title="Rénovez votre logement avec les primes CEE"
        description="Pioud Energy vous accompagne pour identifier les travaux éligibles, constituer votre dossier et sécuriser le versement de votre prime énergie."
        imageUrl="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/simulateur", label: "Accéder au simulateur" }}
        secondaryCta={{ href: "/contact", label: "Parler à un conseiller" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <SectionHeading
            title="Le dispositif CEE expliqué simplement"
            description="Les Certificats d'Économies d'Énergie permettent de financer une partie de vos travaux via des primes versées par les acteurs obligés. Nous simplifions chaque étape, de l'étude à la validation finale."
            centered={false}
          />
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Travaux éligibles"
            description="Nous sélectionnons avec vous les opérations les plus pertinentes selon votre logement et vos objectifs."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {eligibleWorks.map((work, index) => (
            <Reveal key={work.title} delay={index * 0.1}>
              <article className="card-surface h-full p-7">
                <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <work.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{work.title}</h3>
                <p className="mt-2 text-slate-600">{work.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Comment ça marche ?"
            description="Un parcours clair en 3 étapes pour transformer votre projet en économies concrètes."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "Étude de votre projet et estimation prévisionnelle de la prime.",
            "Montage administratif complet du dossier avant le démarrage des travaux.",
            "Validation finale et versement de votre prime CEE.",
          ].map((step, index) => (
            <Reveal key={step} delay={index * 0.12}>
              <article className="card-surface h-full p-7">
                <p className="text-sm font-semibold uppercase text-emerald-600">Étape {index + 1}</p>
                <p className="mt-3 text-slate-700">{step}</p>
                <CheckCircle2 className="mt-5 h-5 w-5 text-emerald-500" />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] p-8 text-center text-white">
            <h2 className="text-3xl font-bold">Prêt à estimer votre prime ?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/90">
              Lancez votre simulation et obtenez une estimation rapide de votre
              montant CEE.
            </p>
            <Link href="/simulateur" className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#0F2B46]">
              Démarrer la simulation
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
