import Link from "next/link";
import { ManageCookiesButton } from "@/components/cookies/manage-cookies-button";
import { navLinks, siteConfig } from "@/lib/site-data";

const footerLinks = navLinks.filter((link) => link.href !== "/");

export function Footer() {
  return (
    <footer className="mt-24 bg-forest text-cream-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4">
          <p className="font-display text-lg font-light text-cream">À propos</p>
          <p className="text-sm leading-relaxed text-cream-soft/85">
            Pioud Energy accompagne ses clients dans le financement de leurs
            projets d&apos;efficacité énergétique via les dispositifs CEE.
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-display text-lg font-light text-cream">Navigation</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-cream-soft/85 transition hover:text-cream" href={link.href}>
                  {link.href === "/aides" ? "Aides & Subventions" : link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-display text-lg font-light text-cream">Conformité</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/mentions-legales" className="text-cream-soft/85 transition hover:text-cream">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="text-cream-soft/85 transition hover:text-cream"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="text-cream-soft/85 transition hover:text-cream">
                CGU
              </Link>
            </li>
            <li>
              <ManageCookiesButton />
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-display text-lg font-light text-cream">Contact</p>
          <ul className="space-y-2 text-sm text-cream-soft/85">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="transition hover:text-cream">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-cream">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-display text-lg font-light text-cream">Réseaux sociaux</p>
          <ul className="space-y-2 text-sm text-cream-soft/85">
            <li>
              <a href="#" className="transition hover:text-cream">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-cream">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-cream">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-soft/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-cream-soft/70 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Pioud Energy. Tous droits réservés.
          </p>
          <p>Mandataire CEE - Solutions d&apos;efficacité énergétique.</p>
        </div>
      </div>
    </footer>
  );
}
