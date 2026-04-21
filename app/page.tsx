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
      <section className="relative min-h-screen overflow-hidden bg-cream px-6 pb-24 pt-40 md:px-16 lg:px-24">
        <div className="absolute right-0 top-1/4 -z-0 h-[600px] w-[600px] rounded-pill bg-sage/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 -z-0 h-[400px] w-[400px] rounded-pill bg-emerald-100/30 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal className="max-w-5xl">
            <div className="mb-10 inline-flex items-center gap-2 rounded-pill border border-ink/10 bg-white px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-pill bg-pioud-orange" />
              <span className="text-xs uppercase tracking-[0.15em] text-ink">
                Mandataire CEE · Accompagnement premium
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-tight text-ink">
              Maximisez vos économies d&apos;énergie avec{" "}
              <span className="italic text-forest-soft">Pioud Energy</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
              De l&apos;audit initial au versement de la prime, nos experts pilotent vos
              dossiers CEE avec précision, rapidité et transparence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/simulateur"
                className="group inline-flex items-center gap-3 rounded-pill bg-emerald-500 py-2 pl-7 pr-2 font-medium text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
              >
                <span>Accéder au simulateur</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-emerald-700 transition group-hover:scale-105">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-pill border border-ink/10 bg-white px-7 py-4 text-ink transition hover:bg-cream-soft"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>

          <div className="mt-20 grid max-w-4xl gap-8 border-t border-ink/10 pt-12 md:grid-cols-3">
            {keyFigures.map((figure, index) => (
              <Reveal key={figure.label} delay={0.1 + index * 0.1}>
                <article className={`${index > 0 ? "md:border-l md:border-ink/10 md:pl-8" : ""}`}>
                  <AnimatedCounter value={figure.value} suffix={figure.suffix} />
                  <p className="mt-2 text-xs uppercase tracking-wider text-ink-muted">
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
                      className="rounded-card border border-ink/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-lime"
                    >
                      <span className="inline-flex rounded-lg bg-sage p-2 text-forest">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="mt-2 font-semibold text-ink">{sector.title}</p>
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
