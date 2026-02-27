import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/site-data";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
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
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "18 Rue de l'Énergie",
    postalCode: "75008",
    addressLocality: "Paris",
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
      <body className={`${manrope.variable} bg-[#f8fafc] text-slate-800 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
