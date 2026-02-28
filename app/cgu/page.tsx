import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGU",
  description: "Conditions Générales d'Utilisation du site PIOUD ENERGY.",
};

export default function CguPage() {
  return (
    <section className="section-shell pt-32">
      <article className="card-surface max-w-4xl space-y-8 p-8">
        <h1 className="text-3xl font-bold text-[#0F2B46]">
          Conditions Générales d&apos;Utilisation (CGU)
        </h1>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">1. Objet du site</h2>
          <p className="text-slate-600">
            Le site PIOUD ENERGY présente les services d&apos;accompagnement liés aux
            Certificats d&apos;Économies d&apos;Énergie (CEE) et met à disposition des
            formulaires de contact et d&apos;estimation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            2. Acceptation des conditions
          </h2>
          <p className="text-slate-600">
            L&apos;accès et l&apos;utilisation du site impliquent l&apos;acceptation pleine
            et entière des présentes CGU.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            3. Propriété intellectuelle
          </h2>
          <p className="text-slate-600">
            Tous les contenus (textes, visuels, logos, éléments graphiques, structure)
            sont protégés par le droit de la propriété intellectuelle. Toute
            reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            4. Limitation de responsabilité
          </h2>
          <p className="text-slate-600">
            PIOUD ENERGY met en œuvre des moyens raisonnables pour assurer la
            fiabilité des informations publiées. Toutefois, la responsabilité de
            l&apos;éditeur ne saurait être engagée en cas d&apos;erreur, d&apos;omission ou
            d&apos;indisponibilité temporaire du site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">5. Droit applicable</h2>
          <p className="text-slate-600">
            Les présentes CGU sont régies par le droit français.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#0F2B46]">6. Tribunal compétent</h2>
          <p className="text-slate-600">
            En cas de litige, compétence expresse est attribuée au Tribunal de Créteil,
            sauf disposition légale contraire.
          </p>
        </section>
      </article>
    </section>
  );
}
