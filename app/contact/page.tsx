import type { Metadata } from "next";
import { CalendarClock, Clock3, MapPin, PhoneCall } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { servicePhones, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Pioud Energy pour vos projets CEE : formulaire, coordonnées par service, horaires et demande de rappel.",
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

      <section className="section-shell py-20">
        <Reveal>
          <SectionHeading
            title="Formulaire de contact"
            description="Décrivez votre besoin et nous revenons vers vous sous 24h ouvrées."
            centered={false}
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <form className="card-surface space-y-5 p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                    Nom et prénom
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Ex. Camille Martin"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="vous@entreprise.fr"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label htmlFor="clientType" className="mb-2 block text-sm font-medium text-slate-700">
                    Type de client
                  </label>
                  <select
                    id="clientType"
                    name="clientType"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Sélectionnez votre profil
                    </option>
                    <option value="particulier">Particulier</option>
                    <option value="professionnel">Professionnel</option>
                    <option value="collectivite">Collectivité</option>
                    <option value="grand-compte">Grand compte</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Décrivez votre projet énergétique, vos délais et vos objectifs."
                />
              </div>

              <button type="submit" className="btn-primary">
                Envoyer la demande
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-6">
              <div className="card-surface p-6">
                <p className="mb-4 text-lg font-semibold text-[#0F2B46]">
                  Numéros par service
                </p>
                <ul className="space-y-3 text-sm">
                  {servicePhones.map((service) => (
                    <li key={service.service} className="flex items-start gap-3">
                      <PhoneCall className="mt-0.5 h-4 w-4 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-700">{service.service}</p>
                        <a href={`tel:${service.number}`} className="text-slate-500 hover:text-[#0F2B46]">
                          {service.number}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-surface p-6">
                <p className="mb-4 text-lg font-semibold text-[#0F2B46]">Horaires d'ouverture</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Lundi - Vendredi : 8h30 - 19h00
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 text-emerald-600" />
                    Samedi : 9h00 - 13h00
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                    {siteConfig.address}
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card-surface p-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                <CalendarClock className="h-4 w-4" />
                Formulaire de rappel
              </p>
              <h2 className="mt-4 text-2xl font-bold text-[#0F2B46]">
                Choisissez un créneau horaire
              </h2>
              <form className="mt-5 space-y-4">
                <div>
                  <label htmlFor="callback-name" className="mb-2 block text-sm font-medium text-slate-700">
                    Nom
                  </label>
                  <input
                    id="callback-name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="callback-phone" className="mb-2 block text-sm font-medium text-slate-700">
                    Téléphone
                  </label>
                  <input
                    id="callback-phone"
                    type="tel"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="06 00 00 00 00"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="callback-date" className="mb-2 block text-sm font-medium text-slate-700">
                      Date souhaitée
                    </label>
                    <input
                      id="callback-date"
                      type="date"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="callback-slot" className="mb-2 block text-sm font-medium text-slate-700">
                      Créneau
                    </label>
                    <select
                      id="callback-slot"
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      <option value="" disabled>
                        Sélectionner
                      </option>
                      <option value="matin">08h30 - 12h00</option>
                      <option value="apres-midi">12h00 - 16h00</option>
                      <option value="fin-journee">16h00 - 19h00</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-secondary">
                  Planifier mon rappel
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface overflow-hidden">
              <iframe
                title="Carte Google Maps - Pioud Energy"
                src="https://www.google.com/maps?q=75008+Paris&output=embed"
                className="h-full min-h-[430px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
