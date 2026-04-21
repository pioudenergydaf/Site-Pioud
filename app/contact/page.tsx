import type { Metadata } from "next";
import { ContactFormsSection } from "@/components/contact/contact-forms-section";
import { PageHero } from "@/components/ui/page-hero";

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
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
        primaryCta={{ href: "tel:0189704520", label: "Appeler le standard" }}
        secondaryCta={{ href: "/simulateur", label: "Accéder au simulateur" }}
      />
      <ContactFormsSection />
    </div>
  );
}
