import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Flame,
  HelpCircle,
  Home,
  Thermometer,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "CEE pour les particuliers",
  description:
    "Découvrez comment financer vos travaux de rénovation énergétique grâce au dispositif CEE avec l'accompagnement PIOUD ENERGY.",
};

const eligibleWorks = [
  {
    title: "Isolation combles",
    description: "Réduisez les déperditions en toiture avec un gain immédiat sur vos factures.",
    amount: "Jusqu'à 12€/m²",
    icon: Home,
  },
  {
    title: "Pompe à chaleur",
    description:
      "Remplacez votre système vieillissant par un équipement à haute performance énergétique.",
    amount: "Jusqu'à 5 000€",
    icon: Thermometer,
  },
  {
    title: "Isolation des murs",
    description:
      "Améliorez l'inertie thermique de votre logement et gagnez en confort hiver/été.",
    amount: "Jusqu'à 15€/m²",
    icon: Wrench,
  },
  {
    title: "Chaudière biomasse",
    description: "Valorisez une énergie renouvelable avec un fort niveau d'aide CEE.",
    amount: "Jusqu'à 4 500€",
    icon: Flame,
  },
];

export default function ParticuliersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Particuliers"
        title="Rénovez votre logement avec les primes CEE"
        description="PIOUD ENERGY vous accompagne pour identifier les travaux éligibles, constituer votre dossier et sécuriser le versement de votre prime énergie."
        imageUrl="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Accéder au simulateur" }}
        secondaryCta={{ href: "/contact", label: "Parler à un conseiller" }}
      />

      <section className="section-shell py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">
                Le dispositif CEE expliqué simplement
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Les Certificats d&apos;Économies d&apos;Énergie permettent de financer
                une partie importante de vos travaux. Nos équipes vérifient
                votre éligibilité, sécurisent votre dossier puis pilotent la
                valorisation jusqu&apos;au versement de la prime.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li>• Estimation personnalisée avant travaux</li>
                <li>• Constitution du dossier administratif complet</li>
                <li>• Suivi transparent et interlocuteur unique</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80"
                alt="Maison rénovée énergétiquement"
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
            <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1600566752225-1f6f6f2f9a8d?auto=format&fit=crop&w=1400&q=80"
                alt="Travaux d'isolation de maison"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Travaux éligibles & montants indicatifs</h2>
              <p className="mt-4 text-lg text-slate-600">
                Nos experts vous orientent vers les opérations les plus rentables
                pour réduire votre reste à charge.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {eligibleWorks.map((work, index) => (
            <Reveal key={work.title} delay={index * 0.1}>
              <article className="card-surface h-full p-7">
                <span className="inline-flex rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100 p-4 text-emerald-700">
                  <work.icon className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-[#0F2B46]">{work.title}</h3>
                <p className="mt-2 text-slate-600">{work.description}</p>
                <p className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                  {work.amount}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">Comment ça marche ?</h2>
              <p className="mt-4 text-lg text-slate-600">
                Un parcours clair en 3 étapes pour transformer votre projet en
                économies concrètes.
              </p>
              <div className="mt-6 space-y-4">
                {[
                  "Étude de votre projet et estimation de prime.",
                  "Montage administratif avant lancement des travaux.",
                  "Validation finale et paiement de votre prime CEE.",
                ].map((step, index) => (
                  <article key={step} className="card-surface p-5">
                    <p className="text-sm font-semibold uppercase text-emerald-600">
                      Étape {index + 1}
                    </p>
                    <p className="mt-2 text-slate-700">{step}</p>
                    <CheckCircle2 className="mt-3 h-5 w-5 text-emerald-500" />
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=80"
                alt="Installation d'un chauffage performant"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-[#0F2B46]">Témoignages particuliers</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Nous avons isolé nos combles et obtenu notre prime en moins de 2 mois. Accompagnement très clair.",
              name: "Claire D., Créteil",
            },
            {
              quote:
                "Le conseiller a tout pris en charge sur la partie administrative, c'était très rassurant.",
              name: "Mickaël T., Sucy-en-Brie",
            },
            {
              quote:
                "Notre pompe à chaleur a été financée en partie grâce aux CEE, avec un vrai suivi du dossier.",
              name: "Nadia R., Melun",
            },
          ].map((item) => (
            <Reveal key={item.name}>
              <article className="card-surface h-full p-6">
                <p className="text-slate-700">“{item.quote}”</p>
                <p className="mt-4 font-semibold text-[#0F2B46]">{item.name}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
                alt="Famille dans un logement rénové"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#0F2B46]">FAQ CEE particuliers</h2>
              <div className="mt-6 space-y-3">
                {[
                  {
                    q: "Qui peut bénéficier des primes CEE ?",
                    a: "Les propriétaires occupants, bailleurs et parfois locataires selon la nature des travaux.",
                  },
                  {
                    q: "Quand faut-il faire la demande ?",
                    a: "Toujours avant la signature du devis ou le démarrage des travaux pour garantir l'éligibilité.",
                  },
                  {
                    q: "Combien de temps pour recevoir la prime ?",
                    a: "En moyenne 4 à 10 semaines après réception du dossier complet et conforme.",
                  },
                  {
                    q: "Peut-on cumuler CEE et MaPrimeRénov' ?",
                    a: "Oui, dans de nombreux cas les dispositifs sont cumulables selon votre profil et vos travaux.",
                  },
                  {
                    q: "Quels justificatifs sont nécessaires ?",
                    a: "Devis, facture, attestations de conformité et pièces d'identité selon le projet.",
                  },
                ].map((faq) => (
                  <details
                    key={faq.q}
                    className="card-surface rounded-2xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-[#0F2B46]">
                      {faq.q}
                      <HelpCircle className="h-4 w-4 text-emerald-600" />
                    </summary>
                    <p className="mt-3 text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
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
