import { Check, type LucideIcon } from "lucide-react";

// Pastille d'icône « duotone » maison : trait 1,5 px vert foncé + formes
// remplies vert clair à 15 %. Au survol de la pastille ou de la carte
// parente (classe `group`), la pastille passe en vert foncé, l'icône en
// blanc, avec une légère translation vers le haut (250 ms).
export function PacIcon({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={`group/tile inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-forest/10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition duration-[250ms] ease-out hover:-translate-y-0.5 hover:bg-forest group-hover:-translate-y-0.5 group-hover:bg-forest ${className}`}
    >
      <Icon
        strokeWidth={1.5}
        aria-hidden
        className="h-6 w-6 fill-emerald-400/15 text-forest transition duration-[250ms] group-hover/tile:fill-white/20 group-hover/tile:text-white group-hover:fill-white/20 group-hover:text-white"
      />
    </span>
  );
}

// Réassurance sous le formulaire : une ligne sobre en petites capitales,
// éléments séparés par des points médians.
const reassuranceItems = ["Sans engagement", "Réponse sous 24 h", "Conseiller dédié"];

export function PacReassurance({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft ${className}`}
    >
      {reassuranceItems.join(" · ")}
    </p>
  );
}

// Coche du hero : cercle plein vert vif 28 px, check blanc fin.
export function HeroCheck({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-7 w-7 flex-none items-center justify-center rounded-pill bg-emerald-400 text-white ${className}`}
    >
      <Check strokeWidth={2} aria-hidden className="h-4 w-4" />
    </span>
  );
}
