import Image from "next/image";

// Logo Pioud Energy (feuille + logotype), fichier officiel horizontal :
// public/logo/pioud-energy-horizontal-v2.png.
// Utilisé par la navbar principale et les landing pages, sur fond clair uniquement.
export const BRAND_LOGO = {
  horizontal: { src: "/logo/pioud-energy-horizontal-v2.png", width: 1000, height: 334 },
  // Monochrome crème, pour les fonds vert foncé (pied de page, menu mobile).
  horizontalLight: { src: "/logo/pioud-energy-horizontal-light-v2.png", width: 1000, height: 334 },
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
        className="h-9 w-auto md:h-11"
      />
      <span className="mt-1 hidden text-[9px] uppercase tracking-widest text-navy-900/55 md:block">
        Certificats d&apos;Économies d&apos;Énergie
      </span>
    </>
  );
}
