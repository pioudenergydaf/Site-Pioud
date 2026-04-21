"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-data";
import { NavItem } from "@/components/ui/NavItem";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [professionalsMenuOpen, setProfessionalsMenuOpen] = useState(false);
  const [particuliersMenuOpen, setParticuliersMenuOpen] = useState(false);

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
  ];

  useEffect(() => {
    setMenuOpen(false);
    setProfessionalsMenuOpen(false);
    setParticuliersMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-1/2 top-6 z-50 w-[calc(100%-2rem)] max-w-[1400px] -translate-x-1/2">
      <nav className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="hidden flex-col rounded-full bg-navy-900/90 px-5 py-2.5 shadow-lg shadow-navy-900/10 backdrop-blur-xl md:flex"
        >
          <span className="text-sm font-bold leading-none tracking-tight text-white">
            PIOUD ENERGY
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-widest text-white/60">
            Certificats d&apos;Économies d&apos;Énergie
          </span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-navy-900/85 p-1.5 shadow-lg shadow-navy-900/10 backdrop-blur-xl lg:flex">
          {navLinks
            .filter((link) => link.href !== "/contact")
            .map((link) => {
            const isParticuliers = link.href === "/particuliers";
            const isProfessionals = link.href === "/professionnels";
            const active = isParticuliers
              ? pathname.startsWith("/particuliers")
              : isProfessionals
              ? pathname.startsWith("/professionnels")
              : pathname === link.href;

            if (isParticuliers || isProfessionals) {
              const isOpen = isParticuliers ? particuliersMenuOpen : professionalsMenuOpen;
              const setOpen = isParticuliers
                ? setParticuliersMenuOpen
                : setProfessionalsMenuOpen;
              const dropdownItems = isParticuliers ? particuliersItems : professionalsItems;

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="flex items-center gap-0.5">
                    <NavItem href={link.href} active={active} hasDropdown>
                      {link.label}
                    </NavItem>
                    <button
                      type="button"
                      aria-label={`Ouvrir le menu ${link.label}`}
                      onClick={() => setOpen((open) => !open)}
                      className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full mt-3 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15"
                      >
                        {dropdownItems.map((item, index) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                              pathname === item.href
                                ? "bg-slate-100 text-[#0F2B46]"
                                : "text-slate-700 hover:bg-slate-100"
                            } ${index > 0 ? "mt-1" : ""}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <NavItem key={link.href} href={link.href} active={active}>
                {link.label}
              </NavItem>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/simulateur"
            className="group hidden items-center gap-2 rounded-full bg-emerald-500 pl-5 pr-1.5 py-1.5 text-sm font-semibold text-navy-900 shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 md:flex"
          >
            Accéder au simulateur
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 transition group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
            </span>
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-cream/75 backdrop-blur-xl transition hover:bg-cream"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="h-4 w-4 text-ink" />
            ) : (
              <Menu className="h-4 w-4 text-ink" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy-900/95 px-6 pb-6 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col gap-3">
              <Link href="/" className="mb-3 inline-flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-white">PIOUD ENERGY</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/65">
                  Certificats d&apos;Économies d&apos;Énergie
                </span>
              </Link>
              {navLinks.map((link) => {
                if (link.href === "/particuliers" || link.href === "/professionnels") {
                  const dropdownItems =
                    link.href === "/particuliers" ? particuliersItems : professionalsItems;
                  const startsWithPath =
                    link.href === "/particuliers"
                      ? pathname.startsWith("/particuliers")
                      : pathname.startsWith("/professionnels");
                  return (
                    <div key={link.href} className="space-y-2">
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                          pathname === link.href || startsWithPath
                            ? "bg-white/10 text-emerald-300"
                            : "text-slate-100 hover:bg-white/10"
                        } focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
                      >
                        {link.label}
                      </Link>
                      <div className="ml-3 space-y-2 border-l border-white/20 pl-3">
                        {dropdownItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                              pathname === item.href
                                ? "bg-white/10 text-emerald-300"
                                : "text-slate-200 hover:bg-white/10"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                      pathname === link.href
                        ? "bg-white/10 text-emerald-300"
                        : "text-slate-100 hover:bg-white/10"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/simulateur"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 font-semibold text-navy-900 transition hover:bg-emerald-400"
              >
                Accéder au simulateur
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm text-white/85 transition hover:bg-white/10"
              >
                {siteConfig.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
