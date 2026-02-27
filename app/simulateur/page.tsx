import type { Metadata } from "next";
import { ArrowUpRight, Calculator } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Simulateur CEE",
  description:
    "Estimez le montant de votre prime CEE en quelques clics grâce au simulateur Pioud Energy.",
};

export default function SimulateurPage() {
  return (
    <div>
      <PageHero
        eyebrow="Simulateur CEE"
        title="Estimez le montant de votre prime CEE en quelques clics"
        description="Accédez à notre simulateur externe pour obtenir une première estimation rapide de votre potentiel de financement."
        imageUrl="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: siteConfig.simulatorUrl, label: "Ouvrir le simulateur" }}
        secondaryCta={{ href: "/contact", label: "Être accompagné" }}
      />

      <section className="section-shell pb-24">
        <Reveal>
          <div className="card-surface mx-auto max-w-3xl p-8 text-center">
            <span className="mx-auto inline-flex rounded-full bg-emerald-50 p-3 text-emerald-600">
              <Calculator className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-3xl font-bold text-[#0F2B46]">
              Simulation rapide et orientée décision
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Le simulateur vous guide étape par étape pour qualifier votre projet.
              Une fois votre estimation obtenue, nos équipes vous accompagnent pour
              transformer ce potentiel en prime effective.
            </p>
            <a
              href={siteConfig.simulatorUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8"
            >
              Accéder au simulateur externe
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
