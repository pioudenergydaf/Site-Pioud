import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de PIOUD ENERGY conforme au RGPD : données collectées, finalités, sous-traitants, durée de conservation et droits.",
};

// Sous-traitants (article 28 RGPD) intervenant dans le traitement des
// demandes reçues via le site. À tenir à jour si un outil change.
const processors = [
  {
    name: "Vercel Inc.",
    role: "Hébergement du site et exécution des formulaires",
    location: "Union européenne et États-Unis",
    data: "Journaux techniques, adresse IP, données des formulaires en transit",
  },
  {
    name: "Resend",
    role: "Envoi des e-mails (accusé de réception au demandeur, notification interne)",
    location: "États-Unis",
    data: "Nom, prénom, e-mail, téléphone et contenu de la demande",
  },
  {
    name: "Google (Google Sheets)",
    role: "Suivi des demandes de pompe à chaleur dans un tableau de bord interne",
    location: "Union européenne et États-Unis",
    data: "Réponses du formulaire, coordonnées, source de la visite, preuve de consentement",
  },
  {
    name: "Make / Zapier",
    role: "Automatisation du transfert des demandes vers le tableau de suivi",
    location: "Union européenne (Make) ou États-Unis (Zapier)",
    data: "Mêmes données que le tableau de suivi, en transit uniquement",
  },
  {
    name: "Cloudflare (Turnstile)",
    role: "Protection anti-spam des formulaires",
    location: "Union européenne et États-Unis",
    data: "Adresse IP, caractéristiques techniques du navigateur",
  },
  {
    name: "Google (Google Ads)",
    role: "Mesure des conversions publicitaires",
    location: "Union européenne et États-Unis",
    data: "Identifiant de clic publicitaire (gclid), aucune donnée nominative",
  },
];

const cellClass = "px-3 py-2 align-top text-sm text-ink-muted";

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="section-shell pt-32">
      <article className="card-surface max-w-4xl space-y-8 p-8">
        <header>
          <h1 className="text-3xl font-bold text-ink">Politique de confidentialité</h1>
          <p className="mt-3 text-ink-muted">
            PIOUD ENERGY attache une importance particulière à la protection de vos
            données personnelles et s&apos;engage à respecter la réglementation applicable,
            notamment le Règlement général sur la protection des données (RGPD).
          </p>
          <p className="mt-2 text-sm text-ink-soft">Dernière mise à jour : 8 octobre 2026.</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">1. Responsable de traitement</h2>
          <p className="text-ink-muted">
            PIOUD ENERGY SAS, SIREN 927 628 446, {siteConfig.address}. Directeur de
            publication : Filip Chrétien. Contact :{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-ink underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">2. Données collectées</h2>
          <p className="text-ink-muted">
            Nous ne collectons que les données que vous nous transmettez via les
            formulaires du site, ainsi que les informations techniques nécessaires à
            leur sécurité :
          </p>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            <li>Identité et contact : prénom, nom, adresse e-mail, numéro de téléphone.</li>
            <li>
              Votre demande : type de logement, surface, chauffage actuel, code postal ;
              pour une copropriété, votre rôle, le chauffage de l&apos;immeuble et le
              nombre de logements ; le message libre du formulaire de contact.
            </li>
            <li>
              Origine de la visite : paramètres de campagne (utm_source, utm_medium,
              utm_campaign, utm_term, utm_content) et identifiant de clic Google Ads
              (gclid), page d&apos;entrée et site référent, sans autre paramètre
              d&apos;URL.
            </li>
            <li>
              Preuve de consentement : date et heure de la demande, adresse IP,
              navigateur utilisé et texte exact de la case cochée.
            </li>
          </ul>
          <p className="text-ink-muted">
            Aucune donnée sensible et aucune donnée de revenus ne sont demandées sur le
            site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">3. Finalités du traitement</h2>
          <ul className="list-disc space-y-1 pl-5 text-ink-muted">
            <li>Répondre à votre demande de contact ou d&apos;estimation.</li>
            <li>
              Vous recontacter au sujet de cette demande et vous adresser un
              récapitulatif par e-mail.
            </li>
            <li>Étudier votre éligibilité aux aides (CEE, MaPrimeRénov&apos;) et établir un devis.</li>
            <li>Mesurer l&apos;efficacité de nos campagnes publicitaires, sans profilage.</li>
            <li>Prévenir les abus (anti-spam, limitation du nombre de requêtes).</li>
          </ul>
          <p className="text-ink-muted">
            PIOUD ENERGY ne pratique aucun démarchage téléphonique non sollicité : nous
            vous contactons uniquement à la suite de votre demande.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">4. Base légale</h2>
          <p className="text-ink-muted">
            Le traitement repose sur votre consentement (article 6.1.a du RGPD),
            recueilli par la case à cocher du formulaire. Vous pouvez le retirer à tout
            moment en nous écrivant, sans remettre en cause la licéité du traitement
            effectué avant ce retrait. La prévention des abus repose sur notre intérêt
            légitime à sécuriser le site (article 6.1.f).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">5. Durée de conservation</h2>
          <p className="text-ink-muted">
            Vos données sont conservées 3 ans à compter de notre dernier contact, puis
            supprimées. En cas de signature d&apos;un devis, les documents contractuels
            sont conservés pendant la durée légale applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">6. Sous-traitants</h2>
          <p className="text-ink-muted">
            Pour traiter vos demandes, nous faisons appel aux prestataires suivants, qui
            agissent sur nos instructions et n&apos;utilisent pas vos données pour leur
            propre compte. Vos données ne sont transmises à aucun tiers à des fins
            commerciales.
          </p>
          <div className="overflow-x-auto rounded-xl border border-ink/10">
            <table className="w-full min-w-[640px] border-collapse">
              <thead className="bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-3 py-2">Prestataire</th>
                  <th className="px-3 py-2">Rôle</th>
                  <th className="px-3 py-2">Localisation</th>
                  <th className="px-3 py-2">Données concernées</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {processors.map((processor) => (
                  <tr key={processor.name}>
                    <td className={`${cellClass} font-semibold text-ink`}>{processor.name}</td>
                    <td className={cellClass}>{processor.role}</td>
                    <td className={cellClass}>{processor.location}</td>
                    <td className={cellClass}>{processor.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-muted">
            Certains de ces prestataires sont établis ou hébergent des données aux
            États-Unis. Ces transferts sont encadrés par les clauses contractuelles
            types de la Commission européenne ou par la certification du prestataire au
            cadre de protection des données UE–États-Unis (Data Privacy Framework).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">7. Vos droits</h2>
          <p className="text-ink-muted">
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
            de limitation, d&apos;opposition et de portabilité de vos données, ainsi que
            du droit de retirer votre consentement à tout moment.
          </p>
          <p className="text-ink-muted">
            Pour exercer vos droits, écrivez-nous à{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-ink underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            . Nous répondons dans un délai d&apos;un mois. Si vous n&apos;êtes pas à
            l&apos;origine d&apos;une demande reçue en votre nom, signalez-le à la même
            adresse et vos données seront supprimées.
          </p>
          <p className="text-ink-muted">
            Vous pouvez également introduire une réclamation auprès de la Commission
            nationale de l&apos;informatique et des libertés (CNIL) :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink underline underline-offset-2"
            >
              www.cnil.fr
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-ink">8. Sécurité</h2>
          <p className="text-ink-muted">
            Les échanges avec le site et avec nos prestataires sont chiffrés (HTTPS).
            Les accès aux outils de suivi sont restreints aux personnes habilitées. Les
            clés d&apos;accès aux services tiers sont stockées hors du code du site.
          </p>
        </section>

        <footer className="border-t border-ink/10 pt-5 text-sm text-ink-muted">
          Pour en savoir plus sur les règles d&apos;utilisation du site, consultez nos{" "}
          <Link href="/cgu" className="font-semibold text-ink underline underline-offset-2">
            CGU
          </Link>{" "}
          et nos{" "}
          <Link
            href="/mentions-legales"
            className="font-semibold text-ink underline underline-offset-2"
          >
            mentions légales
          </Link>
          .
        </footer>
      </article>
    </section>
  );
}
