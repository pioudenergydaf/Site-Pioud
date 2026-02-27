"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
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
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  active ? "text-emerald-300" : "text-slate-200 hover:text-white"
                }`}
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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    pathname === link.href
                      ? "bg-white/10 text-emerald-300"
                      : "text-slate-100 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
