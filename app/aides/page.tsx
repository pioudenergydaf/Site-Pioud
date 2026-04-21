import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Banknote,
  CheckCircle,
  ExternalLink,
  FileText,
  Landmark,
  MapPin,
  Receipt,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Aides & Subventions 2026",
  description:
    "Guide complet des aides à la rénovation énergétique 2026 : CEE, MaPrimeRénov', MaPrimeRénov' Rénovation d'ampleur, Éco-PTZ, TVA 5,5% et aides locales.",
};

type MaprimerenovRow = {
  travaux: string;
  bleu: string;
  jaune: string;
  violet: string;
  rose: string;
};

type IncomeRow = {
  personnes: string;
  bleu: string;
  jaune: string;
  violet: string;
  rose: string;
};

type AidCardProps = {
  borderClass: string;
  imageUrl: string;
  imageAlt: string;
  icon: LucideIcon;
  title: string;
  badge?: string;
  children: ReactNode;
};

const maprimerenovRows: MaprimerenovRow[] = [
  {
    travaux: "PAC air/eau",
    bleu: "5 000€",
    jaune: "4 000€",
    violet: "3 000€",
    rose: "Non éligible",
  },
  {
    travaux: "PAC géothermique",
    bleu: "11 000€",
    jaune: "9 000€",
    violet: "6 000€",
    rose: "Non éligible",
  },
  {
    travaux: "Chauffe-eau solaire",
    bleu: "4 000€",
    jaune: "3 000€",
    violet: "2 000€",
    rose: "Non éligible",
  },
  {
    travaux: "Chauffe-eau thermodynamique",
    bleu: "1 200€",
    jaune: "800€",
    violet: "400€",
    rose: "Non éligible",
  },
  {
    travaux: "Poêle à granulés",
    bleu: "2 500€",
    jaune: "2 000€",
    violet: "1 500€",
    rose: "Non éligible",
  },
  {
    travaux: "Isolation combles",
    bleu: "25€/m²",
    jaune: "20€/m²",
    violet: "15€/m²",
    rose: "7€/m²",
  },
  {
    travaux: "Isolation murs (ITE)",
    bleu: "75€/m²",
    jaune: "60€/m²",
    violet: "40€/m²",
    rose: "15€/m²",
  },
  {
    travaux: "Fenêtres",
    bleu: "100€/équipement",
    jaune: "80€/équipement",
    violet: "40€/équipement",
    rose: "Non éligible",
  },
  {
    travaux: "VMC double flux",
    bleu: "2 500€",
    jaune: "2 000€",
    violet: "1 500€",
    rose: "Non éligible",
  },
];

const idfIncomeRows: IncomeRow[] = [
  {
    personnes: "1",
    bleu: "jusqu'à 23 541€",
    jaune: "jusqu'à 28 657€",
    violet: "jusqu'à 40 018€",
    rose: "au-dessus de 40 018€",
  },
  {
    personnes: "2",
    bleu: "jusqu'à 34 551€",
    jaune: "jusqu'à 42 058€",
    violet: "jusqu'à 58 827€",
    rose: "au-dessus de 58 827€",
  },
  {
    personnes: "3",
    bleu: "jusqu'à 41 493€",
    jaune: "jusqu'à 50 513€",
    violet: "jusqu'à 70 382€",
    rose: "au-dessus de 70 382€",
  },
  {
    personnes: "4",
    bleu: "jusqu'à 48 447€",
    jaune: "jusqu'à 58 981€",
    violet: "jusqu'à 82 839€",
    rose: "au-dessus de 82 839€",
  },
  {
    personnes: "5",
    bleu: "jusqu'à 55 427€",
    jaune: "jusqu'à 67 473€",
    violet: "jusqu'à 94 844€",
    rose: "au-dessus de 94 844€",
  },
];

const nonIdfIncomeRows: IncomeRow[] = [
  {
    personnes: "1",
    bleu: "jusqu'à 17 009€",
    jaune: "jusqu'à 21 805€",
    violet: "jusqu'à 30 549€",
    rose: "au-dessus de 30 549€",
  },
  {
    personnes: "2",
    bleu: "jusqu'à 24 875€",
    jaune: "jusqu'à 31 889€",
    violet: "jusqu'à 44 907€",
    rose: "au-dessus de 44 907€",
  },
  {
    personnes: "3",
    bleu: "jusqu'à 29 917€",
    jaune: "jusqu'à 38 349€",
    violet: "jusqu'à 54 071€",
    rose: "au-dessus de 54 071€",
  },
  {
    personnes: "4",
    bleu: "jusqu'à 34 948€",
    jaune: "jusqu'à 44 802€",
    violet: "jusqu'à 63 235€",
    rose: "au-dessus de 63 235€",
  },
  {
    personnes: "5",
    bleu: "jusqu'à 40 002€",
    jaune: "jusqu'à 51 281€",
    violet: "jusqu'à 72 400€",
    rose: "au-dessus de 72 400€",
  },
];

const usefulLinks = [
  { label: "MaPrimeRénov'", href: "https://www.maprimerenov.gouv.fr" },
  { label: "France Rénov' (conseiller gratuit)", href: "https://france-renov.gouv.fr" },
  {
    label: "Fiches CEE officielles",
    href: "https://www.ecologie.gouv.fr/politiques-publiques/operations-standardisees-deconomies-denergie",
  },
  { label: "Annuaire des professionnels RGE", href: "https://france-renov.gouv.fr/annuaire-rge" },
  {
    label: "Simulateur officiel Simul'aides",
    href: "https://www.maprimerenov.gouv.fr/prweb/PRAuth/app/AIDES_/BPNVwCpLW8TKW49zoQZpAw*/!DIFFALIASBEGIN_*!DIFFALIASEND_/DisplayHar498",
  },
  { label: "ANIL (aides locales)", href: "https://www.anil.org/aides-locales-travaux/" },
];

function ExternalResourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-soft underline underline-offset-2"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

function AidCard({
  borderClass,
  imageUrl,
  imageAlt,
  icon: Icon,
  title,
  badge,
  children,
}: AidCardProps) {
  return (
    <article className={`card-surface border-l-4 p-6 sm:p-8 ${borderClass}`}>
      <div className="relative mb-5 h-52 overflow-hidden rounded-2xl border border-ink/10">
        <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex rounded-xl bg-white/90 p-3 text-ink shadow-sm">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-2xl font-bold text-ink">{title}</h3>
        </div>
        {badge ? (
          <span className="rounded-pill bg-emerald-100 px-3 py-1 text-xs font-semibold text-forest">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function IncomeTable({ title, rows }: { title: string; rows: IncomeRow[] }) {
  return (
    <div>
      <h5 className="text-base font-semibold text-ink">{title}</h5>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-[980px] divide-y divide-ink/10 text-sm">
          <thead>
            <tr className="text-left">
              <th className="bg-cream-soft px-3 py-2 font-semibold text-ink-muted">
                Nombre de personnes
              </th>
              <th className="bg-[#3B82F6] px-3 py-2 font-semibold text-white">
                Bleu (très modestes)
              </th>
              <th className="bg-[#F59E0B] px-3 py-2 font-semibold text-white">Jaune (modestes)</th>
              <th className="bg-[#8B5CF6] px-3 py-2 font-semibold text-white">
                Violet (intermédiaires)
              </th>
              <th className="bg-[#EC4899] px-3 py-2 font-semibold text-white">
                Rose (supérieurs)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 text-ink-muted">
            {rows.map((row) => (
              <tr key={`${title}-${row.personnes}`}>
                <td className="px-3 py-2 font-medium text-ink-muted">{row.personnes}</td>
                <td className="px-3 py-2">{row.bleu}</td>
                <td className="px-3 py-2">{row.jaune}</td>
                <td className="px-3 py-2">{row.violet}</td>
                <td className="px-3 py-2">{row.rose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function maprimerenovCell(value: string) {
  if (value === "Non éligible") {
    return <span className="italic text-ink-soft">{value}</span>;
  }
  return <span>{value}</span>;
}

export default function AidesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Aides & Subventions"
        title="Aides & Subventions 2026 : le guide complet"
        description="Découvrez toutes les aides disponibles pour financer vos travaux de rénovation énergétique. CEE, MaPrimeRénov', Éco-PTZ, TVA réduite... PIOUD ENERGY vous aide à les cumuler pour réduire votre reste à charge au maximum."
        imageUrl="https://images.unsplash.com/photo-1752594756894-bcf378884a09?auto=format&fit=crop&w=1700&q=80"
        primaryCta={{ href: "/simulateur", label: "Simuler mes aides" }}
        secondaryCta={{ href: "/contact", label: "Être accompagné" }}
      />

      <section className="section-shell py-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Les principales aides en 2026</h2>
          <p className="mt-3 max-w-4xl text-lg text-ink-muted">
            {
              "Chaque dispositif répond à une logique spécifique. Nous vous aidons à les combiner intelligemment pour optimiser votre plan de financement."
            }
          </p>
        </Reveal>

        <div className="mt-10 space-y-7">
          <Reveal>
            <AidCard
              borderClass="border-lime"
              imageUrl="https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Travaux d'isolation thermique pour une maison performante"
              icon={Award}
              title="Primes CEE"
              badge="💚 Notre expertise"
            >
              <p className="text-ink-muted">
                {
                  "Les CEE sont des primes versées par les fournisseurs d'énergie (EDF, TotalEnergies, Engie...) pour financer vos travaux de rénovation. PIOUD ENERGY est mandataire CEE et vous accompagne dans l'obtention de ces primes."
                }
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Pour qui ?
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Tous les ménages, sans condition de revenus</li>
                    <li>• Propriétaires occupants et bailleurs</li>
                    <li>• Locataires (avec accord du propriétaire)</li>
                    <li>• Logement de plus de 2 ans en France métropolitaine</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Montants indicatifs
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• PAC air/eau : de 5 000€ à 12 000€ (avec Coup de pouce)</li>
                    <li>• Isolation combles : variable selon surface et zone climatique</li>
                    <li>• Chaudière biomasse : de 4 000€ à 5 000€ (avec Coup de pouce)</li>
                    <li>• Rénovation globale : montant calculé selon le gain énergétique</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Points clés
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>✅ Cumulable avec MaPrimeRénov&apos;, Éco-PTZ et TVA 5,5%</li>
                  <li>✅ Aucune condition de revenus</li>
                  <li>✅ Prime versée après travaux (ou déduite de la facture)</li>
                  <li>⚠️ Demande obligatoire AVANT la signature du devis</li>
                  <li>⚠️ Travaux réalisés par un professionnel RGE</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/particuliers" className="btn-primary">
                  Découvrir nos solutions CEE
                </Link>
                <ExternalResourceLink
                  href="https://www.ecologie.gouv.fr/politiques-publiques/operations-standardisees-deconomies-denergie"
                  label="En savoir plus sur les CEE (Ministère)"
                />
              </div>
            </AidCard>
          </Reveal>

          <Reveal delay={0.04}>
            <AidCard
              borderClass="border-forest-soft"
              imageUrl="https://images.unsplash.com/photo-1752594756894-bcf378884a09?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Ouvriers sur un chantier de rénovation de maison"
              icon={Banknote}
              title="MaPrimeRénov'"
            >
              <p className="text-ink-muted">
                {
                  "La principale aide de l'État pour la rénovation énergétique. Gérée par l'Anah (Agence nationale de l'habitat), elle finance l'isolation, le chauffage, la ventilation et la rénovation globale."
                }
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Pour qui ?
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Tous les ménages depuis la réouverture du 23 février 2026</li>
                    <li>• Propriétaires occupants et bailleurs</li>
                    <li>• Résidence principale uniquement</li>
                    <li>
                      {
                        "• Logement de plus de 15 ans (ou 2 ans pour remplacement chaudière fioul)"
                      }
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Ce qui change en 2026
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Guichet rouvert le 23 février 2026</li>
                    <li>• Budget : 3,6 milliards d&apos;euros</li>
                    <li>
                      {
                        "• Isolation des murs : exclue en mono-geste (uniquement en rénovation d'ampleur)"
                      }
                    </li>
                    <li>• Chaudière biomasse : exclue en mono-geste</li>
                    <li>
                      {
                        "• DPE obligatoire à partir de 2027 pour les demandes par geste"
                      }
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Montants (selon revenus)
                </h4>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-[980px] divide-y divide-ink/10 text-sm">
                    <thead className="text-left">
                      <tr>
                        <th className="bg-cream-soft px-3 py-2 font-semibold text-ink-muted">
                          Travaux
                        </th>
                        <th className="bg-[#3B82F6] px-3 py-2 font-semibold text-white">
                          Bleu (très modestes)
                        </th>
                        <th className="bg-[#F59E0B] px-3 py-2 font-semibold text-white">
                          Jaune (modestes)
                        </th>
                        <th className="bg-[#8B5CF6] px-3 py-2 font-semibold text-white">
                          Violet (intermédiaires)
                        </th>
                        <th className="bg-[#EC4899] px-3 py-2 font-semibold text-white">
                          Rose (supérieurs)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10 text-ink-muted">
                      {maprimerenovRows.map((row) => (
                        <tr key={row.travaux}>
                          <td className="px-3 py-2 font-medium text-ink-muted">{row.travaux}</td>
                          <td className="px-3 py-2">{maprimerenovCell(row.bleu)}</td>
                          <td className="px-3 py-2">{maprimerenovCell(row.jaune)}</td>
                          <td className="px-3 py-2">{maprimerenovCell(row.violet)}</td>
                          <td className="px-3 py-2">{maprimerenovCell(row.rose)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  ⚠️ Depuis 2026, l&apos;isolation des murs et les chaudières biomasse sont
                  exclues de MaPrimeRénov&apos; en mono-geste. Elles restent éligibles en
                  rénovation d&apos;ampleur et aux CEE. Les montants ci-dessus sont indicatifs
                  et peuvent varier. Consultez maprimerenov.gouv.fr pour les montants exacts.
                </p>
              </div>

              <details className="mt-5 rounded-2xl border border-ink/10 bg-cream-soft/70 p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold text-ink">
                  📊 Voir les plafonds de revenus 2026
                </summary>
                <div className="mt-4 space-y-6">
                  <IncomeTable
                    title="Île-de-France (revenu fiscal de référence)"
                    rows={idfIncomeRows}
                  />
                  <IncomeTable
                    title="Hors Île-de-France (revenu fiscal de référence)"
                    rows={nonIdfIncomeRows}
                  />
                  <p className="text-xs text-ink-muted">
                    Revenus fiscaux de référence de l&apos;année N-1 (2025 pour les demandes
                    2026). Par personne supplémentaire, ajoutez environ 5 000€ à 6 000€.
                  </p>
                </div>
              </details>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Points clés
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>✅ Cumulable avec les CEE</li>
                  <li>✅ Cumulable avec l&apos;Éco-PTZ</li>
                  <li>
                    {"⚠️ Demande en ligne AVANT le début des travaux sur maprimerenov.gouv.fr"}
                  </li>
                  <li>⚠️ Professionnel RGE obligatoire</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <ExternalResourceLink
                  href="https://www.maprimerenov.gouv.fr"
                  label="Faire ma demande sur MaPrimeRénov'"
                />
                <ExternalResourceLink
                  href="https://www.service-public.fr/particuliers/vosdroits/F35083"
                  label="Vérifier mon éligibilité (Service Public)"
                />
              </div>
            </AidCard>
          </Reveal>

          <Reveal delay={0.08}>
            <AidCard
              borderClass="border-peach"
              imageUrl="https://images.unsplash.com/photo-1753977725475-41b221add2c0?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Maison en rénovation d'ampleur avec extension"
              icon={TrendingUp}
              title="MaPrimeRénov' Rénovation d'ampleur"
              badge="Le plus ambitieux"
            >
              <p className="text-ink-muted">
                {
                  "Pour les projets combinant plusieurs travaux avec un gain d'au moins 2 classes DPE. Accompagnement obligatoire par un Accompagnateur Rénov'. Réservé aux logements E, F ou G."
                }
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Pour qui ?
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Propriétaires occupants ou bailleurs</li>
                    <li>• Logements classés E, F ou G au DPE</li>
                    <li>• Accompagnement obligatoire par un Accompagnateur Rénov&apos;</li>
                    <li>
                      {
                        "• Rendez-vous préalable obligatoire avec un conseiller France Rénov'"
                      }
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Montants
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>
                      {
                        "• Taux de prise en charge de 30% à 90% selon revenus et gain de classes"
                      }
                    </li>
                    <li>• Plafond de travaux : jusqu&apos;à 70 000€ HT</li>
                    <li>
                      {
                        "• Écrêtage : le cumul des aides ne dépasse pas un certain % du montant total"
                      }
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Points clés
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>✅ Cumulable avec les CEE (prime Coup de pouce Rénovation d&apos;ampleur)</li>
                  <li>✅ Très forte prise en charge pour ménages modestes</li>
                  <li>⚠️ Audit énergétique obligatoire</li>
                  <li>⚠️ Délais d&apos;instruction longs (&gt; 6 mois)</li>
                </ul>
              </div>

              <div className="mt-6">
                <ExternalResourceLink
                  href="https://www.service-public.fr/particuliers/vosdroits/F35083"
                  label="En savoir plus (Service Public)"
                />
              </div>
            </AidCard>
          </Reveal>

          <Reveal delay={0.12}>
            <AidCard
              borderClass="border-pioud-orange"
              imageUrl="https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Signature d'un contrat de financement en banque"
              icon={Landmark}
              title="Éco-PTZ"
            >
              <p className="text-ink-muted">
                {
                  "Un prêt bancaire à taux zéro pour financer le reste à charge de vos travaux de rénovation énergétique. Aucun intérêt à rembourser."
                }
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Pour qui ?
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Propriétaires occupants ou bailleurs</li>
                    <li>• Pas de condition de revenus</li>
                    <li>• Logement de plus de 2 ans</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Montants
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Jusqu&apos;à 15 000€ pour un geste seul</li>
                    <li>• Jusqu&apos;à 25 000€ pour 2 gestes</li>
                    <li>• Jusqu&apos;à 30 000€ pour 3 gestes ou plus</li>
                    <li>• Jusqu&apos;à 50 000€ pour une rénovation globale</li>
                    <li>• Remboursement sur 15 à 20 ans</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Points clés
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>✅ Cumulable avec CEE et MaPrimeRénov&apos;</li>
                  <li>✅ Taux 0% : vous ne payez aucun intérêt</li>
                  <li>⚠️ À demander auprès d&apos;une banque partenaire</li>
                  <li>⚠️ Professionnel RGE obligatoire</li>
                </ul>
              </div>

              <div className="mt-6">
                <ExternalResourceLink
                  href="https://www.service-public.fr/particuliers/vosdroits/F19905"
                  label="Liste des banques partenaires (Service Public)"
                />
              </div>
            </AidCard>
          </Reveal>

          <Reveal delay={0.16}>
            <AidCard
              borderClass="border-ink/30"
              imageUrl="https://images.unsplash.com/photo-1725258080098-727051947997?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Calculatrice et facture de travaux de rénovation"
              icon={Receipt}
              title="TVA à 5,5%"
            >
              <p className="text-ink-muted">
                {
                  "Les travaux de rénovation énergétique bénéficient automatiquement d'une TVA réduite à 5,5% au lieu de 20%. Cette réduction est appliquée directement sur la facture par l'artisan."
                }
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Pour qui ?
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Tous les ménages</li>
                    <li>• Logement de plus de 2 ans</li>
                    <li>• Résidence principale ou secondaire</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    Montant
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                    <li>• Économie automatique de 14,5% sur le montant TTC des travaux</li>
                    <li>• Appliquée directement par le professionnel sur la facture</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Points clés
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>✅ Automatique, pas de demande à faire</li>
                  <li>✅ Cumulable avec toutes les autres aides</li>
                  <li>⚠️ Attestation simplifiée à remplir (formulaire Cerfa)</li>
                </ul>
              </div>
            </AidCard>
          </Reveal>

          <Reveal delay={0.2}>
            <AidCard
              borderClass="border-pioud-orange"
              imageUrl="https://images.unsplash.com/photo-1762231433404-04be830b0f3b?auto=format&fit=crop&w=1700&q=80"
              imageAlt="Bâtiment public de type mairie pour aides locales"
              icon={MapPin}
              title="Aides locales & complémentaires"
            >
              <p className="text-ink-muted">
                {
                  "En plus des aides nationales, de nombreuses collectivités locales (régions, départements, communes) proposent des subventions complémentaires pour la rénovation énergétique."
                }
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                  Exemples
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-ink-muted">
                  <li>• Aides régionales : certaines régions proposent des primes additionnelles</li>
                  <li>
                    {
                      "• Aides des communes : chèques énergie locaux, accompagnement spécifique"
                    }
                  </li>
                  <li>
                    {
                      "• Action Logement : aide de 20 000€ maximum pour les salariés du privé"
                    }
                  </li>
                  <li>
                    {
                      "• Caisses de retraite : aides pour l'adaptation et la rénovation des logements"
                    }
                  </li>
                  <li>• Chèque énergie : 48€ à 277€/an pour les ménages modestes</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <ExternalResourceLink
                  href="https://www.anil.org/aides-locales-travaux/"
                  label="Trouver les aides près de chez vous (ANIL)"
                />
                <ExternalResourceLink
                  href="https://france-renov.gouv.fr"
                  label="Contacter un conseiller France Rénov'"
                />
              </div>
            </AidCard>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">
            Comment cumuler les aides : exemple concret
          </h2>
          <p className="mt-3 max-w-3xl text-ink-muted">
            {
              "Exemple : Installation d'une PAC air/eau en remplacement d'une chaudière gaz (ménage aux revenus modestes, maison de 130m² en zone H1)."
            }
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-surface mt-8 border border-forest/15 bg-sage/70 p-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="min-w-[640px] divide-y divide-forest/15 text-sm">
                <tbody className="divide-y divide-forest/10">
                  <tr>
                    <td className="px-3 py-2 font-medium text-ink-muted">
                      MaPrimeRénov&apos; (Jaune)
                    </td>
                    <td className="px-3 py-2 text-right text-ink-muted">4 000€</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-ink-muted">
                      Prime CEE Coup de pouce x5
                    </td>
                    <td className="px-3 py-2 text-right text-ink-muted">5 800€</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-ink-muted">
                      Éco-PTZ (reste à charge)
                    </td>
                    <td className="px-3 py-2 text-right text-ink-muted">
                      jusqu&apos;à 15 000€ à taux 0%
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium text-ink-muted">TVA 5,5%</td>
                    <td className="px-3 py-2 text-right text-ink-muted">
                      appliquée automatiquement
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-base font-bold text-forest">
                      Total des aides
                    </td>
                    <td className="px-3 py-2 text-right text-base font-bold text-forest">
                      ~9 800€
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-base font-semibold text-ink">
                      Coût de la PAC
                    </td>
                    <td className="px-3 py-2 text-right text-base font-semibold text-ink">
                      ~15 500€ TTC
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-base font-bold text-ink">
                      Reste à charge
                    </td>
                    <td className="px-3 py-2 text-right text-base font-bold text-ink">
                      ~5 700€ (finançable par Éco-PTZ à 0%)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              {
                "Montants indicatifs. Le montant réel dépend de votre situation. Contactez PIOUD ENERGY pour une estimation personnalisée."
              }
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Tableau récapitulatif des aides</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card-surface mt-8 overflow-x-auto p-2">
            <table className="min-w-[900px] divide-y divide-ink/10 text-sm">
              <thead>
                <tr className="text-left text-ink-muted">
                  <th className="px-4 py-3 font-semibold">Aide</th>
                  <th className="px-4 py-3 font-semibold">Qui peut en bénéficier</th>
                  <th className="px-4 py-3 font-semibold">Montant max</th>
                  <th className="px-4 py-3 font-semibold">Cumulable CEE</th>
                  <th className="px-4 py-3 font-semibold">Demande</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 text-ink-muted">
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">CEE</td>
                  <td className="px-4 py-3">Tous, sans condition de revenus</td>
                  <td className="px-4 py-3">Variable (jusqu&apos;à 12 000€)</td>
                  <td className="px-4 py-3">—</td>
                  <td className="px-4 py-3">Avant devis</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">MaPrimeRénov&apos;</td>
                  <td className="px-4 py-3">Tous (depuis fév. 2026)</td>
                  <td className="px-4 py-3">Variable selon revenus</td>
                  <td className="px-4 py-3">✅ Oui</td>
                  <td className="px-4 py-3">En ligne avant travaux</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">
                    MaPrimeRénov&apos; Ampleur
                  </td>
                  <td className="px-4 py-3">E, F, G au DPE</td>
                  <td className="px-4 py-3">90% du coût</td>
                  <td className="px-4 py-3">✅ Oui</td>
                  <td className="px-4 py-3">En ligne + accompagnateur</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">Éco-PTZ</td>
                  <td className="px-4 py-3">Tous, sans condition</td>
                  <td className="px-4 py-3">50 000€</td>
                  <td className="px-4 py-3">✅ Oui</td>
                  <td className="px-4 py-3">Auprès d&apos;une banque</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">TVA 5,5%</td>
                  <td className="px-4 py-3">Tous, logement &gt; 2 ans</td>
                  <td className="px-4 py-3">-14,5% sur facture</td>
                  <td className="px-4 py-3">✅ Oui</td>
                  <td className="px-4 py-3">Automatique</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-ink">Aides locales</td>
                  <td className="px-4 py-3">Variable</td>
                  <td className="px-4 py-3">Variable</td>
                  <td className="px-4 py-3">✅ Souvent</td>
                  <td className="px-4 py-3">Selon collectivité</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">L&apos;accompagnement PIOUD ENERGY</h2>
          <p className="mt-3 max-w-3xl text-ink-muted">
            {
              "Nos experts vous accompagnent du diagnostic initial jusqu'au versement effectif des primes pour sécuriser vos démarches."
            }
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Reveal>
            <article className="card-surface p-6">
              <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                <Search className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">
                Identification des aides
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                {
                  "Nous analysons votre situation et identifions toutes les aides auxquelles vous avez droit."
                }
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card-surface p-6">
              <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                <FileText className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">Montage des dossiers</h3>
              <p className="mt-2 text-sm text-ink-muted">
                {
                  "Nous constituons vos dossiers CEE et vous guidons pour les demandes MaPrimeRénov' et Éco-PTZ."
                }
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.16}>
            <article className="card-surface p-6">
              <span className="inline-flex rounded-xl bg-sage p-3 text-forest-soft">
                <CheckCircle className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">
                Suivi jusqu&apos;au versement
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                {"Nous suivons vos dossiers jusqu'au versement effectif de toutes vos primes."}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <h2 className="text-4xl font-bold text-ink">Liens utiles</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {usefulLinks.map((resource, index) => (
            <Reveal key={resource.href} delay={(index % 2) * 0.06}>
              <article className="card-surface p-5">
                <ExternalResourceLink href={resource.href} label={`🔗 ${resource.label}`} />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell pb-10">
        <Reveal>
          <div className="card-surface bg-gradient-to-r bg-forest p-8 text-white">
            <h2 className="text-3xl font-bold">Passez à l&apos;action avec un plan de financement clair</h2>
            <p className="mt-3 max-w-3xl text-white/90">
              {
                "Simulez vos aides et échangez avec un conseiller PIOUD ENERGY pour sécuriser vos démarches avant signature."
              }
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/simulateur"
                className="inline-flex rounded-pill bg-white px-6 py-3 font-semibold text-ink"
              >
                Estimez toutes vos aides
              </Link>
              <Link
                href="/contact"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Parler à un conseiller PIOUD ENERGY
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
