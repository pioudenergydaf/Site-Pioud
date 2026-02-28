import Link from "next/link";
import { ManageCookiesButton } from "@/components/cookies/manage-cookies-button";
import { navLinks, siteConfig } from "@/lib/site-data";

const footerLinks = navLinks.filter((link) => link.href !== "/");

export function Footer() {
  return (
    <footer className="mt-24 bg-[#0B1C2D] text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-white">À propos</p>
          <p className="text-sm leading-relaxed text-slate-300">
            Pioud Energy accompagne ses clients dans le financement de leurs
            projets d&apos;efficacité énergétique via les dispositifs CEE.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-white">Navigation</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-slate-300 transition hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-white">Conformité</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/mentions-legales" className="text-slate-300 transition hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="text-slate-300 transition hover:text-white"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="text-slate-300 transition hover:text-white">
                CGU
              </Link>
            </li>
            <li>
              <ManageCookiesButton />
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-white">Contact</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>{siteConfig.address}</li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="transition hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-semibold text-white">Réseaux sociaux</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <a href="#" className="transition hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                X (Twitter)
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-white">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Pioud Energy. Tous droits réservés.
          </p>
          <p>Mandataire CEE - Solutions d&apos;efficacité énergétique.</p>
        </div>
      </div>
    </footer>
  );
}
