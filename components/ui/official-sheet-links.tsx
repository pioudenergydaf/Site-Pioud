import { ExternalLink } from "lucide-react";

const CATALOG_URL =
  "https://www.ecologie.gouv.fr/politiques-publiques/operations-standardisees-deconomies-denergie";

type OfficialSheetLinksProps = {
  pdfUrl?: string;
};

export function OfficialSheetLinks({ pdfUrl }: OfficialSheetLinksProps) {
  return (
    <div className="mt-4 space-y-1.5">
      {pdfUrl ? (
        <>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1d4ed8] underline underline-offset-2"
          >
            📄 Voir la fiche officielle (PDF)
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <p className="text-xs text-slate-500">Source : Ministère de la Transition écologique</p>
        </>
      ) : null}

      <a
        href={CATALOG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1d4ed8] underline underline-offset-2"
      >
        Consulter le catalogue officiel des fiches CEE
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
