"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarClock, Clock3, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useConsent } from "@/components/cookies/use-consent";
import { Reveal } from "@/components/ui/reveal";
import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent";
import { servicePhones, siteConfig } from "@/lib/site-data";

type SubmissionState = {
  status: "idle" | "sending" | "success" | "error";
  message: string;
};

const idleSubmissionState: SubmissionState = {
  status: "idle",
  message: "",
};

async function postFormData(formData: FormData, formType: "contact" | "callback") {
  const payload = Object.fromEntries(formData.entries());
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, formType }),
  });

  const data = (await response.json()) as { message?: string };
  if (!response.ok) {
    throw new Error(data.message ?? "Erreur d'envoi");
  }

  return data.message ?? "Votre message a bien été envoyé";
}

export function ContactFormsSection() {
  const consent = useConsent();
  const [contactSubmission, setContactSubmission] =
    useState<SubmissionState>(idleSubmissionState);
  const [callbackSubmission, setCallbackSubmission] =
    useState<SubmissionState>(idleSubmissionState);

  const canLoadMap = useMemo(() => consent.marketing === true, [consent.marketing]);

  const handleSubmit =
    (formType: "contact" | "callback") =>
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);

      const setSubmissionState =
        formType === "contact" ? setContactSubmission : setCallbackSubmission;

      setSubmissionState({
        status: "sending",
        message: "Envoi en cours...",
      });

      try {
        const message = await postFormData(formData, formType);
        setSubmissionState({
          status: "success",
          message,
        });
        form.reset();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Une erreur est survenue, merci de réessayer.";
        setSubmissionState({
          status: "error",
          message,
        });
      }
    };

  const openCookieSettings = () => {
    window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
  };

  return (
    <>
      <section className="section-shell py-20">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-ink">Formulaire de contact</h2>
            <p className="mt-3 text-lg text-ink-muted">
              Décrivez votre besoin et nous revenons vers vous sous 24h ouvrées.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <form className="card-surface space-y-5 p-7" method="post" onSubmit={handleSubmit("contact")}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-muted">
                    Nom et prénom
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Ex. Camille Martin"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-muted">
                    Email professionnel
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="vous@entreprise.fr"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink-muted">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label htmlFor="clientType" className="mb-2 block text-sm font-medium text-ink-muted">
                    Type de client
                  </label>
                  <select
                    id="clientType"
                    name="clientType"
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    defaultValue=""
                    required
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
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-muted">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  placeholder="Décrivez votre projet énergétique, vos délais et vos objectifs."
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-soft px-4 py-3">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  value="accepted"
                  required
                  className="mt-1 h-4 w-4 accent-emerald-500"
                />
                <span className="text-sm text-ink-muted">
                  J&apos;accepte que mes données soient traitées conformément à la{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-semibold text-ink underline underline-offset-2"
                  >
                    politique de confidentialité
                  </Link>{" "}
                  de PIOUD ENERGY.
                </span>
              </label>

              <button
                type="submit"
                disabled={contactSubmission.status === "sending"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {contactSubmission.status === "sending" ? "Envoi..." : "Envoyer la demande"}
              </button>

              {contactSubmission.status !== "idle" ? (
                <p
                  role="status"
                  className={`text-sm ${
                    contactSubmission.status === "error"
                      ? "text-red-600"
                      : "text-forest"
                  }`}
                >
                  {contactSubmission.message}
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-6">
              <div className="card-surface p-6">
                <p className="mb-4 text-lg font-semibold text-ink">
                  Numéros par service
                </p>
                <ul className="space-y-3 text-sm">
                  {servicePhones.map((service) => (
                    <li key={service.service} className="flex items-start gap-3">
                      <PhoneCall className="mt-0.5 h-4 w-4 text-forest-soft" />
                      <div>
                        <p className="font-medium text-ink-muted">{service.service}</p>
                        <a href={`tel:${service.number}`} className="text-ink-soft hover:text-ink">
                          {service.number}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-surface p-6">
                <p className="mb-4 text-lg font-semibold text-ink">
                  Horaires d&apos;ouverture
                </p>
                <ul className="space-y-2 text-sm text-ink-muted">
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 text-forest-soft" />
                    Lundi - Vendredi : 8h30 - 19h00
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 text-forest-soft" />
                    Samedi : 9h00 - 13h00
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-forest-soft" />
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
              <p className="inline-flex items-center gap-2 rounded-pill bg-sage px-3 py-1 text-sm font-semibold text-forest">
                <CalendarClock className="h-4 w-4" />
                Formulaire de rappel
              </p>
              <h2 className="mt-4 text-2xl font-bold text-ink">
                Choisissez un créneau horaire
              </h2>
              <form className="mt-5 space-y-4" method="post" onSubmit={handleSubmit("callback")}>
                <div>
                  <label htmlFor="callback-name" className="mb-2 block text-sm font-medium text-ink-muted">
                    Nom
                  </label>
                  <input
                    id="callback-name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="callback-email" className="mb-2 block text-sm font-medium text-ink-muted">
                    Email
                  </label>
                  <input
                    id="callback-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="vous@exemple.fr"
                  />
                </div>
                <div>
                  <label htmlFor="callback-phone" className="mb-2 block text-sm font-medium text-ink-muted">
                    Téléphone
                  </label>
                  <input
                    id="callback-phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="06 00 00 00 00"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="callback-date" className="mb-2 block text-sm font-medium text-ink-muted">
                      Date souhaitée
                    </label>
                    <input
                      id="callback-date"
                      name="date"
                      type="date"
                      required
                      className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="callback-slot" className="mb-2 block text-sm font-medium text-ink-muted">
                      Créneau
                    </label>
                    <select
                      id="callback-slot"
                      name="slot"
                      defaultValue=""
                      required
                      className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
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
                <label className="flex items-start gap-3 rounded-xl border border-ink/10 bg-cream-soft px-4 py-3">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    value="accepted"
                    required
                    className="mt-1 h-4 w-4 accent-emerald-500"
                  />
                  <span className="text-sm text-ink-muted">
                    J&apos;accepte que mes données soient traitées conformément à la{" "}
                    <Link
                      href="/politique-confidentialite"
                      className="font-semibold text-ink underline underline-offset-2"
                    >
                      politique de confidentialité
                    </Link>{" "}
                    de PIOUD ENERGY.
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={callbackSubmission.status === "sending"}
                  className="btn-secondary disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {callbackSubmission.status === "sending"
                    ? "Envoi..."
                    : "Planifier mon rappel"}
                </button>

                {callbackSubmission.status !== "idle" ? (
                  <p
                    role="status"
                    className={`text-sm ${
                      callbackSubmission.status === "error"
                        ? "text-red-600"
                        : "text-forest"
                    }`}
                  >
                    {callbackSubmission.message}
                  </p>
                ) : null}
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-surface overflow-hidden">
              {canLoadMap ? (
                <iframe
                  title="Carte Google Maps - Pioud Energy"
                  src="https://www.google.com/maps?q=8+Rue+Henri+Dunant,+94370+Sucy-en-Brie&output=embed"
                  className="h-full min-h-[430px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex min-h-[430px] flex-col items-center justify-center gap-4 px-8 text-center">
                  <p className="text-lg font-semibold text-ink">Carte Google Maps</p>
                  <p className="max-w-sm text-sm text-ink-muted">
                    Pour afficher la carte, veuillez accepter les cookies tiers.
                  </p>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="btn-primary"
                  >
                    Activer la carte
                  </button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
