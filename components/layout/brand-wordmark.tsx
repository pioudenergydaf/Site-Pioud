// Repère + logotype "Pioud Energy" — feuille dans un sceau, suivie du nom
// en Manrope. Utilisé par la navbar principale et les landing pages.
export function BrandWordmark() {
  return (
    <>
      <span className="flex items-center gap-1.5 font-brand text-xs font-extrabold leading-none tracking-tight text-emerald-600 md:text-sm">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border-[1.5px] border-emerald-600 md:h-[18px] md:w-[18px]">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-emerald-600 md:h-3 md:w-3">
            <path d="M20 3c-8 0-15 6-15 14 0 2 .5 3.5 1 4 .5-3 2-6 5-8-2 3-3 6-2.5 9 5-.5 9-3 10.5-8 1-3.5 1-8 1-11z" />
          </svg>
        </span>
        PIOUD ENERGY
      </span>
      <span className="mt-1 hidden text-[9px] uppercase tracking-widest text-navy-900/55 md:block">
        Certificats d&apos;Économies d&apos;Énergie
      </span>
    </>
  );
}
