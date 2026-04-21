import { ExternalLink } from "lucide-react";

type OfficialSheetLinksProps = {
  sheetUrl?: string;
};

export function OfficialSheetLinks({ sheetUrl }: OfficialSheetLinksProps) {
  if (!sheetUrl) return null;

  return (
    <div className="mt-4 space-y-1.5">
      <a
        href={sheetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-forest underline underline-offset-2"
      >
        📄 Voir la fiche officielle CEE
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <p className="text-xs text-ink-muted">Source : Ministère de la Transition écologique</p>
    </div>
  );
}
