import type { Metadata } from "next";
import Image from "next/image";
import { Calculator } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SimulatorWizard } from "@/components/simulateur/simulator-wizard";

export const metadata: Metadata = {
  title: "Simulateur CEE",
  description:
    "Estimez votre prime CEE avec le simulateur interactif PIOUD ENERGY en 4 étapes.",
};

export default function SimulateurPage() {
  return (
    <section className="relative overflow-hidden pt-28">
      <Image
        src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1800&q=80"
        alt="Simulation de budget énergétique"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2B46]/90 via-[#0f2b46]/80 to-[#f8fafc] to-[72%]" />
      <div className="section-shell relative z-10 pb-24">
        <Reveal>
          <div className="mx-auto mb-10 max-w-4xl text-center text-white">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 p-3 text-emerald-300">
              <Calculator className="h-6 w-6" />
            </span>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
              Simulateur CEE interactif
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Renseignez votre profil, vos travaux et les données projet pour obtenir
              une estimation instantanée de votre prime.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SimulatorWizard />
        </Reveal>
      </div>
    </section>
  );
}
