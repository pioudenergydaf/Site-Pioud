"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Routes qui gèrent leur propre layout (pas de header/footer du site
// principal) — pages d'atterrissage publicitaires autonomes.
const STANDALONE_PREFIXES = ["/pac"];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
