import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Pioud Energy.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="section-shell pt-32">
      <div className="card-surface max-w-4xl space-y-6 p-8">
        <h1 className="text-3xl font-bold text-[#0F2B46]">Mentions légales</h1>
        <div className="space-y-3 text-slate-600">
          <p>
            <strong>Éditeur :</strong> Pioud Energy SAS - 18 Rue de l&apos;Énergie,
            75008 Paris.
          </p>
          <p>
            <strong>Contact :</strong> {siteConfig.email} - {siteConfig.phone}
          </p>
          <p>
            <strong>Directeur de publication :</strong> Direction générale Pioud Energy.
          </p>
          <p>
            <strong>Hébergement :</strong> Infrastructure cloud sécurisée en Union Européenne.
          </p>
          <p>
            <strong>Propriété intellectuelle :</strong> l&apos;ensemble des contenus du site
            est protégé par le droit de la propriété intellectuelle.
          </p>
        </div>
      </div>
    </section>
  );
}
