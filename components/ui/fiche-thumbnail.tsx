import Image from "next/image";
import type { FicheImage } from "@/lib/fiche-thumbnails";

type FicheThumbnailProps = {
  image: FicheImage;
  badge?: string;
  badgeClassName?: string;
};

// Bandeau photo en haut d'une carte de fiche CEE. Format unique sur tout le
// site : ratio fixe, coins arrondis, object-cover, badge en overlay.
export function FicheThumbnail({ image, badge, badgeClassName }: FicheThumbnailProps) {
  return (
    <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 380px"
        className="object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      {badge ? (
        <span
          className={`absolute right-3 top-3 rounded-pill px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${
            badgeClassName ?? "bg-white/90 text-forest"
          }`}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}
