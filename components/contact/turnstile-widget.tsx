"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          "response-field-name"?: string;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  siteKey: string;
  fieldName?: string;
};

export function TurnstileWidget({
  siteKey,
  fieldName = "cf-turnstile-response",
}: TurnstileWidgetProps) {
  const containerId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryRender = () => {
      if (cancelled) return;
      const turnstile = window.turnstile;
      const container = document.getElementById(containerId);
      if (!turnstile || !container) {
        if (attempts < 50) {
          attempts += 1;
          setTimeout(tryRender, 100);
        }
        return;
      }
      if (widgetIdRef.current) return;
      widgetIdRef.current = turnstile.render(container, {
        sitekey: siteKey,
        theme: "light",
        "response-field-name": fieldName,
      });
    };

    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [containerId, siteKey, fieldName]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div id={containerId} />
    </>
  );
}
