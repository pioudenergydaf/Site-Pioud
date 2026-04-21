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
    <div className="overflow-x-hidden bg-cream text-ink">
      <section className="relative flex min-h-[90vh] items-center overflow-hidden px-6 pb-32 pt-32 md:px-12 lg:px-20">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 md:hidden">
            <Image
              src="/videos/hero-poster.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900/75 via-navy-900/55 to-navy-900/40" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-pill bg-emerald-500/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <Reveal className="max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-pill bg-pioud-orange" />
              <span className="text-xs uppercase tracking-[0.15em] text-white">
                Mandataire CEE · Accompagnement premium
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1.1] tracking-tight text-white">
              Maximisez vos économies d&apos;énergie avec{" "}
              <span className="whitespace-nowrap italic text-emerald-400">
                Pioud Energy
              </span>
            </h1>
            <p className="mb-12 mt-8 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              De l&apos;audit initial au versement de la prime, nos experts pilotent vos
              dossiers CEE avec précision, rapidité et transparence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/simulateur"
                className="group inline-flex items-center gap-3 rounded-pill bg-emerald-500 py-2 pl-7 pr-2 font-medium text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
              >
                <span>Accéder au simulateur</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-white transition group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4 text-emerald-600" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-pill border border-white/30 bg-white/10 px-7 py-4 text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>

          <div className="mt-20 grid max-w-4xl gap-8 border-t border-white/40 pt-12 md:grid-cols-3">
            {keyFigures.map((figure, index) => (
              <Reveal key={figure.label} delay={0.1 + index * 0.1}>
                <article className={`${index > 0 ? "md:border-l md:border-white/40 md:pl-8" : ""}`}>
                  <AnimatedCounter
                    value={figure.value}
                    suffix={figure.suffix}
                    className="whitespace-nowrap font-light text-5xl text-white md:text-6xl [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]"
                    suffixClassName="text-emerald-300"
                    valueStyle={{ color: "#FFFFFF" }}
                  />
                  <p className="mt-2 text-xs uppercase tracking-wider text-emerald-300 [text-shadow:_0_1px_4px_rgb(0_0_0_/_30%)]">
                    {figure.label}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="inline-flex items-center gap-2 rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
                <BadgeCheck className="h-4 w-4" />
                Qui sommes-nous
              </p>
              <h2 className="mt-4 font-display text-4xl font-light text-ink">
                Un partenaire CEE fiable, orienté résultats
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
                PIOUD ENERGY accompagne particuliers, professionnels et acteurs
                publics dans la valorisation des Certificats d&apos;Économies
                d&apos;Énergie avec une approche opérationnelle et rassurante.
              </p>
              <ul className="mt-6 space-y-3 text-ink-muted">
                <li>• Dossiers conformes et sécurisés</li>
                <li>• Accompagnement personnalisé de bout en bout</li>
                <li>• Pilotage des délais jusqu&apos;au versement de la prime</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-card border border-ink/10 shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
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
            <div className="relative min-h-[360px] overflow-hidden rounded-card border border-ink/10 shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
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
              <p className="inline-flex items-center gap-2 rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
                <Sparkles className="h-4 w-4" />
                Nos secteurs
              </p>
              <h2 className="mt-4 font-display text-4xl font-light text-ink">
                Une expertise adaptée à chaque profil client
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
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
                      className="group relative rounded-card border border-ink/5 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10"
                    >
                      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="text-xl font-semibold text-ink">{sector.title}</h3>
                      <p className="mb-4 mt-2 text-sm leading-relaxed text-ink-muted">
                        {sector.description}
                      </p>
                      <span className="inline-flex translate-x-[-0.5rem] items-center gap-2 text-sm font-medium text-emerald-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        En savoir plus
                        <ArrowRight className="h-4 w-4" />
                      </span>
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
              <p className="inline-flex rounded-pill bg-sage px-4 py-1 text-sm font-semibold text-forest">
                Nos clients nous font confiance
              </p>
              <h2 className="mt-4 font-display text-4xl font-light text-ink">
                Une relation durable avec des clients exigeants
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
                Entreprises, collectivités et propriétaires nous confient leurs
                dossiers CEE pour notre fiabilité, notre transparence et notre
                capacité à délivrer des résultats mesurables.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {clientLogos.map((client) => (
                  <div
                    key={client}
                    className="rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm font-semibold text-ink-muted"
                  >
                    {client}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-card border border-ink/10 shadow-[0_10px_28px_rgba(31,58,46,0.06)]">
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
            <h2 className="text-center font-display text-4xl font-light text-ink">
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
          <div className="rounded-card-lg bg-forest px-8 py-12 text-white shadow-[0_12px_34px_rgba(31,58,46,0.18)] sm:px-12">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-light sm:text-4xl">
                  Estimez votre prime CEE dès aujourd&apos;hui
                </h2>
                <p className="mt-3 text-white/90">
                  Réalisez une première estimation en ligne en quelques clics et
                  échangez ensuite avec un expert PIOUD ENERGY.
                </p>
              </div>
              <Link
                href="/simulateur"
                className="inline-flex items-center justify-center rounded-pill bg-emerald-500 px-7 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-emerald-100"
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
