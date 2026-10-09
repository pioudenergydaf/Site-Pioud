import type { Metadata } from "next";
import { DM_Serif_Display, Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { SiteChrome } from "@/components/layout/site-chrome";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
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
    streetAddress: "32 Rue de Paris",
    postalCode: "92100",
    addressLocality: "Boulogne-Billancourt",
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
        <SiteChrome>{children}</SiteChrome>
        <CookieBanner />
        {/* Google Consent Mode v2 : état par défaut « tout refusé » posé avant
            le chargement de gtag.js (beforeInteractive est injecté dans <head>).
            Un choix déjà enregistré dans la bannière cookies est rejoué aussitôt. */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
            gtag('set', 'ads_data_redaction', true);
            try {
              var stored = window.localStorage.getItem('${COOKIE_CONSENT_STORAGE_KEY}');
              if (stored) {
                var choice = JSON.parse(stored);
                var ads = choice.marketing ? 'granted' : 'denied';
                gtag('consent', 'update', {
                  ad_storage: ads,
                  ad_user_data: ads,
                  ad_personalization: ads,
                  analytics_storage: choice.analytics ? 'granted' : 'denied'
                });
              }
            } catch (e) {}
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18497703928"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18497703928');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
