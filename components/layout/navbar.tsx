"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfessionalsMenuOpen(false);
    setParticuliersMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-[#0F2B46] transition-shadow ${
        isScrolled ? "shadow-2xl shadow-[#04121f]/35" : "shadow-md shadow-[#04121f]/20"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="inline-flex flex-col leading-tight">
          <span className="text-2xl font-extrabold tracking-wide text-white">
            PIOUD ENERGY
          </span>
          <span className="text-xs font-medium text-slate-200">
            Certificats d&apos;Économies d&apos;Énergie
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
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
                  <div className="flex items-center gap-1">
                    <Link
                      href={link.href}
                      className={`text-sm font-semibold transition ${
                        active ? "text-emerald-300" : "text-slate-200 hover:text-white"
                      } focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/40`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Ouvrir le menu ${link.label}`}
                      onClick={() => setOpen((open) => !open)}
                      className="rounded p-1 text-slate-200 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <ChevronDown className="h-4 w-4" />
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
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  active ? "text-emerald-300" : "text-slate-200 hover:text-white"
                } focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/40`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/simulateur"
            className="inline-flex items-center rounded-full bg-[#10B981] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            Simulateur
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/30 p-2 text-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/15 bg-[#0B2238] px-6 pb-6 pt-4 lg:hidden"
          >
            <div className="flex flex-col gap-3">
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
                className="mt-1 inline-flex items-center justify-center rounded-full bg-[#10B981] px-6 py-3 font-semibold text-white transition hover:bg-emerald-500"
              >
                Accéder au simulateur
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Nous écrire
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
