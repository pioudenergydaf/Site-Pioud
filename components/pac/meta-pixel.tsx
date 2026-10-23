"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_UPDATED_EVENT } from "@/lib/cookie-consent";
import {
  grantMetaPixel,
  hasMarketingConsent,
  META_PIXEL_SNIPPET,
  revokeMetaPixel,
} from "@/lib/meta-pixel";

// Pixel Meta de la landing /pac (monté uniquement par app/pac/page.tsx).
// Ne rend rien à l'écran. Le script n'est injecté qu'une fois le consentement
// « publicité » donné, au chargement si le choix est déjà enregistré, ou dès
// que le visiteur accepte dans la bannière.
export function MetaPixel() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ok = hasMarketingConsent();
      setGranted(ok);
      if (ok) grantMetaPixel();
      else revokeMetaPixel();
    };
    sync();
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, sync);
  }, []);

  if (!granted) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {META_PIXEL_SNIPPET}
    </Script>
  );
}
