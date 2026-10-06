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
      "La grande majorité des logements chauffés au fioul, au gaz ou à l'électrique sont compatibles. Une visite technique gratuite permet de confirmer la faisabilité et de dimensionner l'installation adaptée.",
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

export function PacFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="card-surface overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-ink sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 flex-none text-ink-soft transition ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen ? (
              <p className="px-5 pb-4 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
