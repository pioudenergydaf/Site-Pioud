import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pioud Energy - Votre partenaire expert CEE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1F3A2D 0%, #2C5440 55%, #3F7A5A 100%)",
          color: "#F4EFE5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 36,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Pioud Energy
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05 }}>
            Votre partenaire expert CEE
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, maxWidth: 900 }}>
            Conseils, montage et valorisation des Certificats d&apos;Économies
            d&apos;Énergie pour particuliers, professionnels et collectivités.
          </div>
        </div>
        <div style={{ fontSize: 28, opacity: 0.7 }}>pioudenergy.fr</div>
      </div>
    ),
    { ...size },
  );
}
