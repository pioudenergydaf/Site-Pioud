import type { Metadata } from "next";
import Link from "next/link";
import { Building, LampStreet, School, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "CEE pour les collectivités",
  description:
    "Accompagnement des collectivités pour financer les projets de transition énergétique via les Certificats d'Économies d'Énergie.",
};

export default function CollectivitesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Collectivités"
        title="Financez vos projets publics de transition énergétique"
        description="Pioud Energy accompagne les collectivités dans la structuration, la conformité et la valorisation des opérations CEE à fort impact territorial."
        imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "/contact", label: "Être rappelé par un expert public" }}
        secondaryCta={{ href: "/simulateur", label: "Découvrir le simulateur" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <SectionHeading
            title="Un accompagnement dédié au secteur public"
            description="Nous intégrons vos contraintes budgétaires, calendaires et réglementaires pour sécuriser chaque dossier CEE et maximiser les cofinancements."
            centered={false}
          />
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <SectionHeading
            title="Types de projets accompagnés"
            description="Des opérations structurantes pour améliorer la performance énergétique du patrimoine public."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Éclairage public",
              description:
                "Modernisation LED, télégestion et réduction des consommations électriques.",
              icon: LampStreet,
            },
            {
              title: "Bâtiments communaux",
              description:
                "Rénovation énergétique des écoles, gymnases, mairies et centres administratifs.",
              icon: School,
            },
            {
              title: "Systèmes de chauffage",
              description:
                "Optimisation des installations thermiques et remplacement d'équipements vieillissants.",
              icon: Building,
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <article className="card-surface h-full p-7">
                <span className="inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#0F2B46]">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="card-surface grid gap-6 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" />
                Méthodologie sécurisée
              </p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F2B46]">
                Une gouvernance claire pour des dossiers conformes
              </h2>
              <p className="mt-3 text-slate-600">
                Nos consultants pilotent les pièces administratives, coordonnent les
                acteurs du projet et assurent le suivi des obligations jusqu'au versement.
              </p>
            </div>
            <Link href="/contact" className="btn-primary h-fit justify-center">
              Contacter le pôle collectivités
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
