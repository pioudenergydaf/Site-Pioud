import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Factory, Landmark, Leaf, User } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PartnersMarquee } from "@/components/ui/partners-marquee";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { keyFigures, partners, sectors, testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Pioud Energy simplifie vos démarches CEE et maximise vos primes pour tous vos projets d'efficacité énergétique.",
};

const sectorIcons = [User, Building2, Landmark, Factory];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative flex min-h-screen items-center pt-24">
        <Image
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=80"
          alt="Bâtiments modernes et efficacité énergétique"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="section-shell relative z-10 py-20 text-white">
          <Reveal className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-semibold">
              Mandataire CEE - Accompagnement premium
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Maximisez vos économies d&apos;énergie avec Pioud Energy
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
              De l&apos;audit initial au versement de la prime, nous pilotons vos
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
        </div>
      </section>

      <section className="hero-mesh py-24">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              title="Qui sommes-nous ?"
              description="Pioud Energy est un acteur expert des Certificats d'Économies d'Énergie. Notre mission : rendre les dispositifs CEE lisibles, performants et sécurisés pour chaque client."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Expertise réglementaire",
                description:
                  "Veille continue sur les évolutions CEE, conformité des dossiers et sécurisation des justificatifs.",
              },
              {
                title: "Accompagnement personnalisé",
                description:
                  "Un interlocuteur dédié pour orchestrer vos opérations, du diagnostic jusqu'à la valorisation financière.",
              },
              {
                title: "Performance mesurable",
                description:
                  "Des tableaux de bord clairs pour suivre vos économies, vos primes et l'avancement opérationnel.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <article className="card-surface h-full p-7">
                  <h3 className="text-xl font-semibold text-[#0F2B46]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              title="Nos secteurs d'intervention"
              description="Une expertise multi-secteurs pour adapter le dispositif CEE à vos enjeux techniques, financiers et réglementaires."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sectors.map((sector, index) => {
              const Icon = sectorIcons[index];
              return (
                <Reveal key={sector.title} delay={index * 0.1}>
                  <Link
                    href={sector.href}
                    className="group card-surface block h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-2xl"
                  >
                    <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{sector.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-600">{sector.description}</p>
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600">
                      En savoir plus
                      <ArrowRight className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              title="Chiffres clés"
              description="Des résultats concrets au service de votre performance énergétique."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {keyFigures.map((figure, index) => (
              <Reveal key={figure.label} delay={index * 0.15}>
                <article className="card-surface p-8 text-center">
                  <AnimatedCounter value={figure.value} suffix={figure.suffix} />
                  <p className="mt-3 text-sm font-medium uppercase tracking-wide text-slate-500">
                    {figure.label}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell">
          <Reveal>
            <SectionHeading
              title="Ils nous font confiance"
              description="Des clients exigeants qui recherchent un partenaire fiable pour transformer leurs ambitions énergétiques en résultats."
            />
          </Reveal>
          <div className="mt-10">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-shell space-y-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <Leaf className="h-4 w-4" />
                Réseau d'experts partenaires
              </p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F2B46] sm:text-4xl">
                Un écosystème solide pour accélérer vos projets
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnersMarquee partners={partners} />
          </Reveal>
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
                  échangez ensuite avec un expert Pioud Energy.
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
