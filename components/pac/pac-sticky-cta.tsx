"use client";

import { useEffect, useState } from "react";

// Bandeau sticky bas de page (mobile uniquement) ancré sur le formulaire,
// rappelle le reste à charge « dès 0 € » (chiffre clé de la page) ;
// masqué tant que le formulaire est visible à l'écran.
export function PacStickyCta({ targetId }: { targetId: string }) {
  const [isTargetVisible, setIsTargetVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsTargetVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <a
      href={`#${targetId}`}
      aria-hidden={isTargetVisible}
      tabIndex={isTargetVisible ? -1 : 0}
      className={`fixed inset-x-4 bottom-4 z-50 flex items-center justify-center rounded-pill bg-emerald-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 md:hidden ${
        isTargetVisible ? "pointer-events-none translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span>
        Reste à charge dès <span className="font-display text-lg font-light leading-none">0 €</span>
        <span aria-hidden className="mx-2 text-white/60">·</span>
        <span className="underline underline-offset-2">Vérifier</span>
      </span>
    </a>
  );
}
