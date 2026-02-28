import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de PIOUD ENERGY conforme au RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="section-shell pt-32">
      <article className="card-surface max-w-4xl space-y-8 p-8">
        <header>
          <h1 className="text-3xl font-bold text-[#0F2B46]">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-slate-600">
            PIOUD ENERGY attache une importance particulière à la protection de vos
            données personnelles et s&apos;engage à respecter la réglementation applicable,
            notamment le RGPD.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            1. Responsable de traitement
          </h2>
          <p className="text-slate-600">
            PIOUD ENERGY SAS, SIREN 927 628 446, 8 Rue Henri Dunant, 94370
            Sucy-en-Brie. Directeur de publication : Filip Chrétien.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            2. Données collectées
          </h2>
          <p className="text-slate-600">
            Dans le cadre des formulaires du site, nous collectons les données
            suivantes : nom, email, téléphone et message.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            3. Finalités du traitement
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-600">
            <li>Réponse aux demandes de contact.</li>
            <li>Envoi d&apos;estimations et d&apos;informations liées aux primes CEE.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">4. Base légale</h2>
          <p className="text-slate-600">
            Le traitement repose sur le consentement de la personne concernée
            (article 6.1.a du RGPD).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            5. Durée de conservation
          </h2>
          <p className="text-slate-600">
            Les données sont conservées pendant une durée maximale de 3 ans à compter
            du dernier contact.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#0F2B46]">
            6. Droits des utilisateurs
          </h2>
          <p className="text-slate-600">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression,
            d&apos;opposition et de portabilité de vos données.
          </p>
          <p className="text-slate-600">
            Pour exercer vos droits :{" "}
            <a
              href="mailto:contact@pioud-energy.fr"
              className="font-semibold text-[#0F2B46] underline underline-offset-2"
            >
              contact@pioud-energy.fr
            </a>
            .
          </p>
          <p className="text-slate-600">
            Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#0F2B46] underline underline-offset-2"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </section>

        <footer className="border-t border-slate-200 pt-5 text-sm text-slate-600">
          Pour en savoir plus sur les règles d&apos;utilisation du site, consultez nos{" "}
          <Link href="/cgu" className="font-semibold text-[#0F2B46] underline underline-offset-2">
            CGU
          </Link>
          .
        </footer>
      </article>
    </section>
  );
}
