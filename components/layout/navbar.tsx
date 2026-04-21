"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-data";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const primaryNavLinks = navLinks.filter((link) => link.href !== "/contact");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="fixed left-1/2 top-6 z-50 w-[calc(100%-3rem)] max-w-7xl -translate-x-1/2">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex flex-col leading-tight">
            <span className="text-lg font-light tracking-tight text-[#1E3328]">
              PIOUD <span className="font-normal">ENERGY</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#5A6B5F]">
              Certificats d&apos;Économies d&apos;Énergie
            </span>
          </Link>

          <div
            className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 lg:flex ${
              isScrolled
                ? "border-white/55 bg-white/65 shadow-sm backdrop-blur-2xl backdrop-saturate-150"
                : "border-white/40 bg-white/55 backdrop-blur-xl backdrop-saturate-150"
            }`}
          >
            {primaryNavLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition duration-200 ${
                    active
                      ? "bg-white text-[#1E3328] shadow-sm"
                      : "text-[#1E3328]/80 hover:bg-white/40"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/55 px-5 py-2.5 text-sm text-[#1E3328] backdrop-blur-xl transition hover:bg-white/70"
            >
              Contact
              <span className="h-2 w-2 rounded-full bg-[#FF6B1A]" />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/55 text-[#1E3328] backdrop-blur-xl transition hover:bg-white/70"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#F0F4ED]/95 px-6 pb-8 pt-28 backdrop-blur-xl"
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">
              <div className="flex flex-1 flex-col justify-start gap-2">
                {primaryNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-2xl px-4 py-3 text-base transition ${
                      isActiveLink(link.href)
                        ? "bg-white text-[#1E3328] shadow-sm"
                        : "text-[#1E3328]/85 hover:bg-white/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/simulateur"
                  className="inline-flex items-center justify-center rounded-full bg-[#D9F57C] px-6 py-3 font-medium text-[#1E3328] transition hover:bg-[#c8e85c]"
                >
                  Accéder au simulateur
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#1E3328]/20 bg-white/80 px-6 py-3 font-medium text-[#1E3328] transition hover:bg-white"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
