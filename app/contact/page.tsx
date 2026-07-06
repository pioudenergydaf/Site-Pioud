import type { Metadata } from "next";
import { ContactFormsSection } from "@/components/contact/contact-forms-section";
import { SITE_IMAGES } from "@/lib/site-images";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Pioud Energy pour vos projets CEE : formulaire, coordonnées par service et horaires.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet CEE"
        description="Nos experts vous répondent rapidement pour cadrer votre besoin, estimer votre potentiel de prime et lancer votre accompagnement."
        imageUrl={SITE_IMAGES.contact.hero.src}
        primaryCta={{ href: `tel:${siteConfig.phoneE164}`, label: "Appeler le standard" }}
        secondaryCta={{ href: "/simulateur", label: "Accéder au simulateur" }}
      />
      <ContactFormsSection />
    </div>
  );
}
