import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandWordmark } from "@/components/layout/brand-wordmark";

type LandingNavbarProps = {
  backHref: string;
};

export function LandingNavbar({ backHref }: LandingNavbarProps) {
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-[1400px] -translate-x-1/2 md:top-6">
      <nav className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-center justify-center rounded-pill border border-white/40 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-xl md:px-5 md:py-2.5">
          <BrandWordmark />
        </div>

        <Link
          href={backHref}
          className="flex items-center gap-2 rounded-pill border border-white/50 bg-white/70 px-4 py-2.5 text-sm font-medium text-navy-900/75 shadow-lg shadow-navy-900/10 backdrop-blur-xl transition hover:bg-white/90 hover:text-navy-900 md:px-5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </Link>
      </nav>
    </header>
  );
}
