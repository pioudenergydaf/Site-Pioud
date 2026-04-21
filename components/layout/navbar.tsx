"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-data";

const particuliersItems = [
  { label: "Isolation", href: "/particuliers/isolation" },
  { label: "Chauffage", href: "/particuliers/chauffage" },
  { label: "Fenêtres", href: "/particuliers/fenetres" },
  { label: "Régulation", href: "/particuliers/regulation" },
  { label: "Rénovation globale", href: "/particuliers/renovation-globale" },
];

const professionalsItems = [
  { label: "Tertiaire", href: "/professionnels/tertiaire" },
  { label: "Industrie", href: "/professionnels/industrie" },
  { label: "Collectif", href: "/professionnels/collectif" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [professionalsMenuOpen, setProfessionalsMenuOpen] = useState(false);
  const [particuliersMenuOpen, setParticuliersMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setProfessionalsMenuOpen(false);
    setParticuliersMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const desktopNavItems = navLinks.filter((item) => item.href !== "/contact");

  return (
    <>
      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-[1400px] -translate-x-1/2 md:top-6">
        <nav className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="flex flex-col items-center justify-center rounded-pill border border-white/40 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-xl md:px-5 md:py-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-xs font-bold leading-none tracking-tight text-emerald-600 md:text-sm">
              PIOUD ENERGY
            </span>
            <span className="mt-1 hidden text-[9px] uppercase tracking-widest text-navy-900/55 md:block">
              Certificats d&apos;Économies d&apos;Énergie
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-pill border border-white/50 bg-white/70 p-1.5 shadow-lg shadow-navy-900/10 backdrop-blur-xl lg:flex">
            {desktopNavItems.map((item) => {
              const isParticuliers = item.href === "/particuliers";
              const isProfessionnels = item.href === "/professionnels";
              const isActive = isParticuliers
                ? pathname.startsWith("/particuliers")
                : isProfessionnels
                ? pathname.startsWith("/professionnels")
                : pathname === item.href;

              if (isParticuliers || isProfessionnels) {
                const dropdownItems = isParticuliers
                  ? particuliersItems
                  : professionalsItems;
                const isOpen = isParticuliers
                  ? particuliersMenuOpen
                  : professionalsMenuOpen;
                const setOpen = isParticuliers
                  ? setParticuliersMenuOpen
                  : setProfessionalsMenuOpen;

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen((open) => !open)}
                      className={`inline-flex items-center gap-1 rounded-pill px-4 py-2 text-sm transition ${
                        isActive
                          ? "bg-emerald-50 font-medium text-emerald-600"
                          : "text-navy-900/75 hover:bg-navy-900/5 hover:text-navy-900"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    {isOpen ? (
                      <div className="absolute left-0 top-full mt-3 w-64 rounded-card border border-white/10 bg-navy-900 p-2 shadow-[0_16px_36px_rgba(6,78,59,0.4)]">
                        {dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`mt-1 block rounded-lg px-3 py-2 text-sm transition first:mt-0 ${
                              pathname === subItem.href
                                ? "bg-white/10 text-emerald-300"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-pill px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-emerald-50 font-medium text-emerald-600"
                      : "text-navy-900/75 hover:bg-navy-900/5 hover:text-navy-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/simulateur"
              className="group flex items-center gap-2 rounded-pill bg-emerald-500 py-1.5 pl-4 pr-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 md:pl-5 md:text-sm"
              onClick={() => setMenuOpen(false)}
            >
              <span className="hidden sm:inline">Accéder au simulateur</span>
              <span className="sm:hidden">Simulateur</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-pill bg-white md:h-8 md:w-8">
                <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/40 bg-white/85 shadow-lg backdrop-blur-xl transition hover:bg-white lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5 text-navy-900" />
              ) : (
                <Menu className="h-5 w-5 text-navy-900" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-900/98 px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/10 px-2 py-5 text-2xl font-light text-white transition hover:text-emerald-400"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-emerald-400" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Link
              href="/simulateur"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-pill bg-emerald-500 py-4 text-lg font-semibold text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-600"
            >
              Accéder au simulateur
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-6 text-center text-xs text-white/50">
              Pioud Energy · Mandataire CEE
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
