import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site PIOUD ENERGY.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="section-shell pt-32">
      <div className="card-surface max-w-4xl space-y-6 p-8">
        <h1 className="text-3xl font-bold text-[#0F2B46]">Mentions légales</h1>
        <div className="space-y-4 text-slate-600">
          <p>
            Les présentes mentions légales sont établies conformément aux exigences
            françaises applicables aux éditeurs de services en ligne.
          </p>

          <p>
            <strong>Raison sociale :</strong> PIOUD ENERGY
          </p>
          <p>
            <strong>Forme juridique :</strong> SAS (Société par Actions Simplifiée)
          </p>
          <p>
            <strong>SIREN :</strong> 927 628 446
          </p>
          <p>
            <strong>SIRET siège :</strong> 927 628 446 00019
          </p>
          <p>
            <strong>Code APE :</strong> 43.22A
          </p>
          <p>
            <strong>Adresse du siège :</strong> {siteConfig.address}
          </p>
          <p>
            <strong>Directeur de publication :</strong> Filip Chrétien
          </p>
          <p>
            <strong>Contact :</strong> {siteConfig.email} - {siteConfig.phone}
          </p>
          <p>
            <strong>Numéro de TVA intracommunautaire :</strong> FR XX 927 628 446
            (à compléter)
          </p>
          <p>
            <strong>Capital social :</strong> [À compléter]
          </p>
          <p>
            <strong>Hébergeur :</strong> Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA.
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
