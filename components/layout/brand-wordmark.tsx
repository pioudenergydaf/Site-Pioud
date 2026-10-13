import Image from "next/image";

// Logo Pioud Energy (repère maison + feuille, logotype à droite), version
// horizontale dérivée du logo officiel : public/logo/pioud-energy-horizontal.png.
// Utilisé par la navbar principale et les landing pages, sur fond clair uniquement.
export const BRAND_LOGO = {
  horizontal: { src: "/logo/pioud-energy-horizontal.png", width: 1000, height: 256 },
  stacked: { src: "/logo/pioud-energy.png", width: 596, height: 600 },
  alt: "Pioud Energy",
};

export function BrandWordmark() {
  return (
    <>
      <Image
        src={BRAND_LOGO.horizontal.src}
        alt={BRAND_LOGO.alt}
        width={BRAND_LOGO.horizontal.width}
        height={BRAND_LOGO.horizontal.height}
        priority
        className="h-8 w-auto md:h-10"
      />
      <span className="mt-1 hidden text-[9px] uppercase tracking-widest text-navy-900/55 md:block">
        Certificats d&apos;Économies d&apos;Énergie
      </span>
    </>
  );
}
