import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/site-data";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-brand",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pioud Energy | Certificats d'Économies d'Énergie",
    template: "%s | Pioud Energy",
  },
  description:
    "Cabinet expert en Certificats d'Économies d'Énergie : conseils, montage et valorisation CEE pour particuliers, professionnels et collectivités.",
  keywords: [
    "CEE",
    "Certificats d'Économies d'Énergie",
    "prime énergie",
    "rénovation énergétique",
    "Pioud Energy",
  ],
  openGraph: {
    title: "Pioud Energy - Votre partenaire expert CEE",
    description:
      "Accélérez vos projets d'efficacité énergétique grâce à un accompagnement CEE premium et personnalisé.",
    url: siteConfig.url,
    siteName: "Pioud Energy",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pioud Energy - Votre partenaire expert CEE",
    description:
      "Accélérez vos projets d'efficacité énergétique grâce à un accompagnement CEE premium et personnalisé.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 Rue Henri Dunant",
    postalCode: "94370",
    addressLocality: "Sucy-en-Brie",
    addressCountry: "FR",
  },
  url: siteConfig.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${dmSerif.variable} ${manrope.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
