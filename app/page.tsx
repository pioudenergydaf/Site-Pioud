import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  Landmark,
  Sparkles,
  User,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { keyFigures, sectors, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "PIOUD ENERGY simplifie vos démarches CEE et maximise vos primes pour tous vos projets d'efficacité énergétique.",
};

const sectorIcons = [User, Building2, Landmark, Factory];
const clientLogos = [
  "Groupe Habitat+",
  "Indus Conseil",
  "Ville de Saint-Maur",
  "TransLog Europe",
  "Bureau Pro Services",
  "Patrimoine Public 360",
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative flex min-h-screen items-center pt-20">
        <Image
          src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=2000&q=80"
          alt="Bâtiment rénové énergétiquement"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#041224]/90 via-[#0b2540]/75 to-[#0f2b46]/65" />
        <div className="section-shell relative z-10 py-20 text-white">
          <Reveal className="max-w-4xl">
            <p className="mb-6 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-semibold">
              Mandataire CEE - Accompagnement premium
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
              Maximisez vos économies d&apos;énergie avec
              <span className="mt-2 block text-5xl font-extrabold tracking-wide text-emerald-300 sm:text-7xl lg:text-8xl">
                PIOUD ENERGY
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
              De l&apos;audit initial au versement de la prime, nos experts pilotent vos
              dossiers CEE avec précision, rapidité et transparence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/simulateur" className="btn-primary">
                Accéder au simulateur
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/20">
                Nous contacter
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {keyFigures.map((figure, index) => (
              <Reveal key={figure.label} delay={0.1 + index * 0.1}>
                <article className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                  <AnimatedCounter value={figure.value} suffix={figure.suffix} />
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/80">
                    {figure.label}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-mesh py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                Qui sommes-nous
              </p>
              <h2 className="mt-4 text-4xl font-bold text-[#0F2B46]">
                Un partenaire CEE fiable, orienté résultats
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                PIOUD ENERGY accompagne particuliers, professionnels et acteurs
                publics dans la valorisation des Certificats d&apos;Économies
                d&apos;Énergie avec une approche opérationnelle et rassurante.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li>• Dossiers conformes et sécurisés</li>
                <li>• Accompagnement personnalisé de bout en bout</li>
                <li>• Pilotage des délais jusqu&apos;au versement de la prime</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
                alt="Réunion d'équipe de conseil énergie"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
                alt="Sites multi-secteurs accompagnés"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-[#0F2B46]">
                <Sparkles className="h-4 w-4" />
                Nos secteurs
              </p>
              <h2 className="mt-4 text-4xl font-bold text-[#0F2B46]">
                Une expertise adaptée à chaque profil client
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Nos équipes conçoivent une stratégie CEE sur mesure selon vos
                contraintes techniques, réglementaires et budgétaires.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {sectors.map((sector, index) => {
                  const Icon = sectorIcons[index];
                  return (
                    <Link
                      key={sector.title}
                      href={sector.href}
                      className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-emerald-300"
                    >
                      <span className="inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="mt-2 font-semibold text-[#0F2B46]">{sector.title}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
                Nos clients nous font confiance
              </p>
              <h2 className="mt-4 text-4xl font-bold text-[#0F2B46]">
                Une relation durable avec des clients exigeants
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Entreprises, collectivités et propriétaires nous confient leurs
                dossiers CEE pour notre fiabilité, notre transparence et notre
                capacité à délivrer des résultats mesurables.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {clientLogos.map((client) => (
                  <div
                    key={client}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-[#0f2b46]/10">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="Siège d'une entreprise cliente"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <h2 className="text-center text-4xl font-bold text-[#0F2B46]">
              Témoignages clients
            </h2>
          </Reveal>
          <div className="mt-10">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-r from-[#0F2B46] to-[#0E7B6D] px-8 py-12 text-white shadow-2xl shadow-[#0f2b46]/20 sm:px-12">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold sm:text-4xl">
                  Estimez votre prime CEE dès aujourd&apos;hui
                </h2>
                <p className="mt-3 text-white/90">
                  Réalisez une première estimation en ligne en quelques clics et
                  échangez ensuite avec un expert PIOUD ENERGY.
                </p>
              </div>
              <Link
                href="/simulateur"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-semibold text-[#0F2B46] transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Estimez votre prime CEE
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
