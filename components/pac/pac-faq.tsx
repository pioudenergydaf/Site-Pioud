"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FaqItem = { question: string; answer: string };

const faqItems: FaqItem[] = [
  {
    question: "Est-il possible d'avancer les aides ?",
    answer:
      "Oui. Les aides CEE et MaPrimeRénov' peuvent être déduites directement du devis par notre réseau d'installateurs partenaires, sans avance de frais de votre part sur la part financée.",
  },
  {
    question: "Les aides sont-elles cumulables en 2026 ?",
    answer:
      "Les Certificats d'Économies d'Énergie et MaPrimeRénov' restent cumulables en 2026 sous conditions de ressources et de nature des travaux. Nous vérifions votre éligibilité précise lors de l'étude de votre dossier.",
  },
  {
    question: "Ma maison est-elle compatible avec une PAC air/eau ?",
    answer:
      "La grande majorité des logements chauffés au fioul, au gaz ou à l'électrique sont compatibles. Une visite technique permet de confirmer la faisabilité et de dimensionner l'installation adaptée.",
  },
  {
    question: "Quelle est la durée d'installation ?",
    answer:
      "Comptez généralement 1 à 2 jours d'intervention pour l'installation d'une pompe à chaleur air/eau par un professionnel RGE, hors délais d'instruction administrative des aides.",
  },
  {
    question: "Pourquoi passer par un mandataire CEE ?",
    answer:
      "Un mandataire CEE comme Pioud Energy sécurise le montage de votre dossier, maximise le montant des aides mobilisables et gère l'ensemble des démarches administratives jusqu'au versement de la prime.",
  },
];

// Liste éditoriale : une question par rangée séparée par un filet, pas de carte.
export function PacFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `pac-faq-${index}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="text-lg font-semibold leading-snug text-ink sm:text-xl">
                {item.question}
              </span>
              <ChevronDown
                aria-hidden
                className={`mt-1 h-5 w-5 flex-none text-ink-soft transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
