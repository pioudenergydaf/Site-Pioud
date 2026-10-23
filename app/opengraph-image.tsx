import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pioud Energy - Votre partenaire expert CEE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Logo officiel (public/logo/pioud-energy-v2.png) embarqué au rendu.
  const logo = await fetch(new URL("../public/logo/pioud-energy-v2.png", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #1F3A2D 0%, #2C5440 55%, #3F7A5A 100%)",
          color: "#F4EFE5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            maxWidth: 620,
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Mandataire CEE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>
              Votre partenaire expert CEE
            </div>
            <div style={{ fontSize: 28, opacity: 0.85 }}>
              Conseils, montage et valorisation des Certificats d&apos;Économies
              d&apos;Énergie pour particuliers, professionnels et collectivités.
            </div>
          </div>
          <div style={{ fontSize: 26, opacity: 0.7 }}>pioudenergy.fr</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 420,
            height: 220,
            borderRadius: 32,
            background: "#FFFFFF",
            boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logo as unknown as string} width={360} height={120} />
        </div>
      </div>
    ),
    { ...size },
  );
}
