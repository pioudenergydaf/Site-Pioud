// Traitement serveur des leads de la landing /pac (appelé par /api/contact
// quand source === "pac-landing") : validation, rate-limit, e-mail interne
// avec preuve de consentement, ligne Google Sheet via webhook, e-mail de
// confirmation au visiteur. Deux parcours : maison (PAC individuelle,
// BAR-TH-171) et copro (PAC collective, BAR-TH-179).
import type { Resend } from "resend";
import { FALLBACK_FROM, sendMail } from "@/lib/mailer";
import { CONSENT_TEXT } from "@/lib/pac-constants";
import {
  ATTRIBUTION_PARAMS,
  type Attribution,
  BUILDING_HEATING_IDS,
  BUILDING_HEATING_LABEL,
  type BuildingHeating,
  buildCollectiveEstimate,
  buildEstimate,
  EMAIL_REGEX,
  type Estimate,
  type Flow,
  flowFor,
  HEATING_IDS,
  HEATING_LABEL,
  type Heating,
  HOUSING_IDS,
  HOUSING_LABEL,
  type Housing,
  normalizePhone,
  PHONE_REGEX,
  POSTAL_CODE_REGEX,
  ROLE_IDS,
  ROLE_LABEL,
  type Role,
  SURFACE_IDS,
  SURFACE_LABEL,
  type Surface,
  UNITS_IDS,
  UNITS_LABEL,
  type Units,
} from "@/lib/pac-estimate";
import { siteConfig } from "@/lib/site-data";

export type PacLead = {
  flow: Flow;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  housing: Housing;
  // Parcours maison
  surface?: Surface;
  heating?: Heating;
  // Parcours copro
  role?: Role;
  buildingHeating?: BuildingHeating;
  units?: Units;
  // Non demandé quand le chauffage de l'immeuble est individuel.
  postalCode?: string;
  attribution: Attribution;
  estimate: Estimate;
};

export type ClientMeta = { ip: string; userAgent: string; receivedAt: Date };

const MAX_FIELD_LENGTH = 500;
const INCOME_BAND_NOTE = "Non demandée (à qualifier lors du rappel)";
const NOT_PROVIDED = "—";

function str(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

// Garde origine + chemin ; pour la page d'entrée, seuls les paramètres
// d'attribution connus sont conservés (jamais d'autres query strings).
function sanitizeUrl(value: string, keepAttributionParams: boolean): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return "";
    const kept = new URLSearchParams();
    if (keepAttributionParams) {
      for (const key of ATTRIBUTION_PARAMS) {
        const param = url.searchParams.get(key);
        if (param) kept.set(key, param.slice(0, 200));
      }
    }
    const query = kept.toString();
    return `${url.origin}${url.pathname}${query ? `?${query}` : ""}`.slice(0, 500);
  } catch {
    return "";
  }
}

// Journalisation sans données personnelles : message d'erreur uniquement.
function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "erreur inconnue";
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

// ── Validation serveur ──────────────────────────────────────────────────
export function parsePacLead(
  payload: Record<string, unknown>,
): { lead: PacLead; error?: undefined } | { lead?: undefined; error: string } {
  // Compatibilité avec un bundle client plus ancien : champ `name` unique
  // (« Prénom Nom ») et type de logement déduit du type de formulaire.
  const legacyName = str(payload.name).split(/\s+/).filter(Boolean);
  const firstName = str(payload.firstName) || legacyName[0] || "";
  const lastName =
    str(payload.lastName) || legacyName.slice(1).join(" ") || (legacyName[0] ? "(non renseigné)" : "");
  const email = str(payload.email);
  const phone = normalizePhone(str(payload.phone));
  const postalCode = str(payload.postalCode);
  const housing =
    oneOf(payload.housing, HOUSING_IDS) ??
    (payload.form === "pac-copro" ? "appartement" : payload.form === "pac" ? "maison" : null);

  if (firstName.length < 2) return { error: "Merci d'indiquer votre prénom." };
  if (lastName.length < 2) return { error: "Merci d'indiquer votre nom." };
  if (!EMAIL_REGEX.test(email)) return { error: "Adresse email invalide." };
  if (!PHONE_REGEX.test(phone)) return { error: "Numéro de téléphone invalide." };
  if (!housing) return { error: "Type de logement invalide." };
  if (payload.consent !== true) {
    return { error: "Votre consentement est nécessaire pour traiter la demande." };
  }

  const rawAttribution =
    payload.attribution && typeof payload.attribution === "object"
      ? (payload.attribution as Record<string, unknown>)
      : {};
  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = str(rawAttribution[key]);
    if (value) attribution[key] = value;
  }
  // URLs réduites à l'essentiel : aucune donnée personnelle ne doit
  // transiter par un paramètre d'URL jusqu'aux e-mails ou au Sheet.
  const landingUrl = sanitizeUrl(str(rawAttribution.landingUrl), true);
  const referrer = sanitizeUrl(str(rawAttribution.referrer), false);
  if (landingUrl) attribution.landingUrl = landingUrl;
  if (referrer) attribution.referrer = referrer;

  const base = { firstName, lastName, email, phone, housing, attribution };
  const flow = flowFor(housing);

  if (flow === "maison") {
    const surface = oneOf(payload.surface, SURFACE_IDS);
    const heating = oneOf(payload.heating, HEATING_IDS);
    if (!surface) return { error: "Surface invalide." };
    if (!heating) return { error: "Chauffage actuel invalide." };
    if (!POSTAL_CODE_REGEX.test(postalCode)) return { error: "Code postal invalide." };
    return {
      lead: {
        ...base,
        flow,
        surface,
        heating,
        postalCode,
        // Recalculée côté serveur : la valeur envoyée par le client n'est pas utilisée.
        estimate: buildEstimate(heating),
      },
    };
  }

  const role = oneOf(payload.role, ROLE_IDS);
  const buildingHeating = oneOf(payload.buildingHeating, BUILDING_HEATING_IDS);
  if (!role) return { error: "Merci d'indiquer votre rôle dans la copropriété." };
  if (!buildingHeating) return { error: "Chauffage de l'immeuble invalide." };

  if (buildingHeating === "individuel") {
    return {
      lead: { ...base, flow, role, buildingHeating, estimate: buildCollectiveEstimate(buildingHeating) },
    };
  }

  const units = oneOf(payload.units, UNITS_IDS);
  if (!units) return { error: "Nombre de logements invalide." };
  if (!POSTAL_CODE_REGEX.test(postalCode)) return { error: "Code postal invalide." };
  return {
    lead: {
      ...base,
      flow,
      role,
      buildingHeating,
      units,
      postalCode,
      estimate: buildCollectiveEstimate(buildingHeating),
    },
  };
}

// ── Rate-limit basique par IP (mémoire de l'instance) ───────────────────
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

type RateStore = Map<string, number[]>;
const globalStore = globalThis as unknown as { __pacLeadRate?: RateStore };
const rateStore: RateStore = globalStore.__pacLeadRate ?? new Map();
globalStore.__pacLeadRate = rateStore;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateStore.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateStore.set(ip, recent);
  return false;
}

export function getClientMeta(request: Request): ClientMeta {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "inconnue";
  const userAgent = request.headers.get("user-agent")?.slice(0, 500) || "inconnu";
  return { ip, userAgent, receivedAt: new Date() };
}

// ── Helpers de rendu ────────────────────────────────────────────────────
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatParis(date: Date) {
  const day = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return { day, time };
}

type Row = [string, string];

function rowsHtml(rows: Row[]) {
  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:560px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:14px;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1F3A2E;font-size:14px;font-weight:600">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
}

function rowsText(rows: Row[]) {
  return rows.map(([label, value]) => `${label} : ${value}`).join("\n");
}

const estimateText = (estimate: Estimate) =>
  estimate.note ? `${estimate.value} (${estimate.note})` : estimate.value;

// Réponses du formulaire (hors résultat affiché).
function answerRows(lead: PacLead): Row[] {
  if (lead.flow === "copro") {
    return [
      ["Logement", "Appartement (copropriété)"],
      ["Vous êtes", lead.role ? ROLE_LABEL[lead.role] : NOT_PROVIDED],
      [
        "Chauffage de l'immeuble",
        lead.buildingHeating ? BUILDING_HEATING_LABEL[lead.buildingHeating] : NOT_PROVIDED,
      ],
      ["Nombre de logements", lead.units ? UNITS_LABEL[lead.units] : NOT_PROVIDED],
      ["Code postal", lead.postalCode ?? NOT_PROVIDED],
    ];
  }
  return [
    ["Logement", HOUSING_LABEL[lead.housing]],
    ["Chauffage actuel", lead.heating ? HEATING_LABEL[lead.heating] : NOT_PROVIDED],
    ["Surface", lead.surface ? SURFACE_LABEL[lead.surface] : NOT_PROVIDED],
    ["Code postal", lead.postalCode ?? NOT_PROVIDED],
    ["Tranche de revenus", INCOME_BAND_NOTE],
  ];
}

function sourceRows(attribution: Attribution): Row[] {
  const rows: Row[] = [];
  for (const key of ATTRIBUTION_PARAMS) {
    rows.push([key, attribution[key] ?? NOT_PROVIDED]);
  }
  rows.push(["Page d'entrée", attribution.landingUrl ?? NOT_PROVIDED]);
  rows.push(["Référent", attribution.referrer ?? NOT_PROVIDED]);
  return rows;
}

function internalSubject(lead: PacLead) {
  if (lead.flow === "copro") {
    const role = lead.role ? ROLE_LABEL[lead.role] : NOT_PROVIDED;
    const units = lead.units ? `${UNITS_LABEL[lead.units]} logements` : "chauffage individuel";
    return `Nouveau lead PAC COLLECTIVE — ${role} — ${units} — ${lead.postalCode ?? "CP non renseigné"}`;
  }
  const kind = lead.estimate.label === "Votre prime estimée" ? "prime estimée" : "reste à charge";
  return `Nouveau lead PAC — ${lead.firstName} — ${lead.postalCode ?? NOT_PROVIDED} — ${kind} ${lead.estimate.value}`;
}

// ── E-mail interne ──────────────────────────────────────────────────────
export function buildInternalEmail(lead: PacLead, meta: ClientMeta, antiSpamWarning?: string) {
  const { day, time } = formatParis(meta.receivedAt);
  const subject = `${antiSpamWarning ? "[À VÉRIFIER] " : ""}${internalSubject(lead)}`;
  const title =
    lead.flow === "copro"
      ? "Nouveau lead PAC COLLECTIVE (landing /pac)"
      : "Nouveau lead PAC (landing /pac)";

  const answers: Row[] = [...answerRows(lead), ["Résultat affiché", estimateText(lead.estimate)]];
  const contact: Row[] = [
    ["Prénom", lead.firstName],
    ["Nom", lead.lastName],
    ["Téléphone", lead.phone],
    ["Email", lead.email],
  ];
  const source = sourceRows(lead.attribution);
  const proof: Row[] = [
    ["Date", day],
    ["Heure (Paris)", time],
    ["Adresse IP", meta.ip],
    ["User-agent", meta.userAgent],
    ["Case cochée", CONSENT_TEXT],
    ["Anti-spam", antiSpamWarning ? `Non vérifié — ${antiSpamWarning}` : "Vérifié ou non configuré"],
  ];

  const h = (heading: string) =>
    `<h3 style="margin:24px 0 8px;font-size:15px;color:#1F3A2E">${escapeHtml(heading)}</h3>`;
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#1F3A2E">
    <h2 style="margin:0 0 4px;font-size:20px">${escapeHtml(title)}</h2>
    <p style="margin:0;color:#6b7280;font-size:13px">Reçu le ${escapeHtml(day)} à ${escapeHtml(time)}</p>
    ${h("Réponses du formulaire")}${rowsHtml(answers)}
    ${h("Contact")}${rowsHtml(contact)}
    ${h("Source")}${rowsHtml(source)}
    ${h("Preuve de consentement")}${rowsHtml(proof)}
  </div>`;

  const text = [
    title,
    `Reçu le ${day} à ${time}`,
    "",
    "RÉPONSES DU FORMULAIRE",
    rowsText(answers),
    "",
    "CONTACT",
    rowsText(contact),
    "",
    "SOURCE",
    rowsText(source),
    "",
    "PREUVE DE CONSENTEMENT",
    rowsText(proof),
  ].join("\n");

  return { subject, html, text };
}

// ── E-mail de confirmation au visiteur ──────────────────────────────────
const CONFIRMATION = {
  maison: {
    subject: "Votre estimation pompe à chaleur — Pioud Energy",
    intro:
      "Merci pour votre demande d'estimation pour une pompe à chaleur air/eau. Voici le récapitulatif de vos réponses.",
    steps: [
      "Un conseiller Pioud Energy vous appelle sous 24 h ouvrées pour confirmer votre éligibilité.",
      "Visite technique à domicile pour dimensionner la pompe à chaleur adaptée.",
      "Devis détaillé, aides CEE et MaPrimeRénov' déjà déduites.",
    ],
  },
  collective: {
    subject: "Votre étude pompe à chaleur collective — Pioud Energy",
    intro:
      "Merci pour votre demande d'étude pour une pompe à chaleur collective. Voici le récapitulatif de vos réponses.",
    steps: [
      "Un conseiller Pioud Energy vous appelle sous 48 h ouvrées pour cadrer l'étude gratuite.",
      "Visite technique de la chaufferie et de l'immeuble.",
      "Étude et chiffrage, prime CEE BAR-TH-179 (Coup de pouce chauffage collectif) déduite.",
    ],
  },
  individual: {
    subject: "Votre demande pompe à chaleur — Pioud Energy",
    intro:
      "Merci pour votre demande. Le chauffage de votre immeuble étant individuel, la pompe à chaleur collective ne s'applique pas : nous étudions une solution individuelle avec vous.",
    steps: [
      "Un conseiller Pioud Energy vous appelle sous 24 h ouvrées pour étudier votre situation.",
      "Visite technique de votre logement si une solution individuelle est envisageable.",
      "Devis détaillé, aides éventuelles déjà déduites.",
    ],
  },
} as const;

export function buildConfirmationEmail(lead: PacLead, meta: ClientMeta) {
  const { day, time } = formatParis(meta.receivedAt);
  const variant =
    lead.estimate.kind === "amount"
      ? CONFIRMATION.maison
      : lead.estimate.kind === "collective"
        ? CONFIRMATION.collective
        : CONFIRMATION.individual;
  const recap = answerRows(lead).filter(([label]) => label !== "Tranche de revenus");
  const legal = [
    "Les montants indiqués sont des estimations indicatives calculées à partir de vos déclarations. Ils ne constituent pas un engagement contractuel et seront confirmés après visite technique et vérification de votre éligibilité par les organismes compétents (Anah, obligés CEE).",
    `Pioud Energy SAS (SIREN 927 628 446, ${siteConfig.address}) intervient en qualité de mandataire CEE et d'installateur certifié RGE QualiPAC. Les aides MaPrimeRénov' et CEE sont versées par les organismes compétents, sous conditions de ressources et d'éligibilité.`,
    "Vous disposez d'un délai de rétractation de 14 jours à compter de la signature de tout devis. Aucun engagement n'est pris à ce stade.",
    `Protection de vos données : vos informations sont traitées par Pioud Energy pour répondre à votre demande, sur la base de votre consentement (art. 6.1.a RGPD). Elles sont conservées 3 ans après notre dernier contact et ne sont transmises à aucun tiers à des fins commerciales. Vous pouvez à tout moment accéder à vos données, les rectifier, les supprimer ou retirer votre consentement en écrivant à ${siteConfig.email}. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).`,
    `Vous recevez cet email car vous avez rempli le formulaire sur pioudenergy.fr le ${day} à ${time} depuis l'adresse IP ${meta.ip}. Si vous n'êtes pas à l'origine de cette demande, écrivez-nous à ${siteConfig.email} et vos données seront supprimées.`,
    "Pioud Energy ne pratique aucun démarchage téléphonique non sollicité. Nous vous contactons uniquement suite à votre demande.",
  ];

  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#1F3A2E;max-width:600px">
    <h2 style="margin:0 0 16px;font-size:20px">Bonjour ${escapeHtml(lead.firstName)},</h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.5">${escapeHtml(variant.intro)}</p>
    ${rowsHtml(recap)}
    <div style="margin:20px 0;padding:16px 20px;border-radius:12px;background:#E6F4EE">
      <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#4b5563">${escapeHtml(lead.estimate.label)}</p>
      <p style="margin:4px 0 0;font-size:${lead.estimate.kind === "amount" ? 24 : 18}px;font-weight:600;color:#1F3A2E">${escapeHtml(lead.estimate.value)}</p>
      ${lead.estimate.note ? `<p style="margin:4px 0 0;font-size:13px;color:#047857">${escapeHtml(lead.estimate.note)}</p>` : ""}
    </div>
    <h3 style="margin:24px 0 8px;font-size:15px">Les prochaines étapes</h3>
    <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.6">${variant.steps
      .map((step) => `<li>${escapeHtml(step)}</li>`)
      .join("")}</ol>
    <h3 style="margin:28px 0 8px;font-size:13px;color:#6b7280">Informations importantes</h3>
    ${legal
      .map(
        (line) =>
          `<p style="margin:0 0 10px;font-size:12px;line-height:1.5;color:#6b7280">${escapeHtml(line)}</p>`,
      )
      .join("")}
    <p style="margin:24px 0 0;font-size:13px;color:#6b7280">Pioud Energy · ${escapeHtml(siteConfig.address)} · ${escapeHtml(siteConfig.email)}</p>
  </div>`;

  const text = [
    `Bonjour ${lead.firstName},`,
    "",
    variant.intro,
    "",
    rowsText(recap),
    "",
    `${lead.estimate.label} : ${estimateText(lead.estimate)}`,
    "",
    "LES PROCHAINES ÉTAPES",
    ...variant.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "INFORMATIONS IMPORTANTES",
    ...legal.map((line) => `— ${line}`),
    "",
    `Pioud Energy · ${siteConfig.address} · ${siteConfig.email}`,
  ].join("\n");

  return { subject: variant.subject, html, text };
}

// ── Webhook Google Sheet (Make / Zapier / Apps Script) ──────────────────
const WEBHOOK_TIMEOUT_MS = 5000;

export function buildWebhookRow(lead: PacLead, meta: ClientMeta): Record<string, string> {
  const { day, time } = formatParis(meta.receivedAt);
  return {
    receivedAt: meta.receivedAt.toISOString(),
    date: day,
    heure: time,
    parcours: lead.flow === "copro" ? "PAC collective" : "PAC individuelle",
    prenom: lead.firstName,
    nom: lead.lastName,
    telephone: lead.phone,
    email: lead.email,
    logement: HOUSING_LABEL[lead.housing],
    chauffage_actuel: lead.heating ? HEATING_LABEL[lead.heating] : "",
    surface: lead.surface ? SURFACE_LABEL[lead.surface] : "",
    role: lead.role ? ROLE_LABEL[lead.role] : "",
    chauffage_immeuble: lead.buildingHeating ? BUILDING_HEATING_LABEL[lead.buildingHeating] : "",
    nb_logements: lead.units ? UNITS_LABEL[lead.units] : "",
    code_postal: lead.postalCode ?? "",
    tranche_revenus: lead.flow === "maison" ? INCOME_BAND_NOTE : "",
    estimation_libelle: lead.estimate.label,
    estimation_valeur: lead.estimate.value,
    estimation_note: lead.estimate.note ?? "",
    utm_source: lead.attribution.utm_source ?? "",
    utm_medium: lead.attribution.utm_medium ?? "",
    utm_campaign: lead.attribution.utm_campaign ?? "",
    utm_term: lead.attribution.utm_term ?? "",
    utm_content: lead.attribution.utm_content ?? "",
    gclid: lead.attribution.gclid ?? "",
    page_entree: lead.attribution.landingUrl ?? "",
    referent: lead.attribution.referrer ?? "",
    consentement: "oui",
    consentement_texte: CONSENT_TEXT,
    ip: meta.ip,
    user_agent: meta.userAgent,
    source: "pac-landing",
  };
}

// Jeton partagé (LEADS_WEBHOOK_SECRET) transmis en en-tête et dans le corps
// (Apps Script ne lit pas les en-têtes) : le scénario doit le vérifier
// avant d'écrire dans le Sheet.
export async function sendWebhook(
  url: string,
  row: Record<string, string>,
  secret?: string,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const body: Record<string, string> = { ...row };
  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
    headers["X-Webhook-Token"] = secret;
    body.token = secret;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) console.error("[pac-lead] webhook status:", response.status);
    return response.ok;
  } catch (err) {
    console.error("[pac-lead] webhook exception:", errorMessage(err));
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// ── Orchestration ───────────────────────────────────────────────────────
export async function processPacLead(options: {
  lead: PacLead;
  meta: ClientMeta;
  resend: Resend;
  sender: string;
  // Boîte de réception interne : CONTACT_RECIPIENT_EMAIL (même que le
  // formulaire générique), repli sur l'adresse publique du site.
  recipient?: string;
  antiSpamWarning?: string;
}): Promise<
  | { ok: true; confirmationSent: boolean; webhookSent: boolean | null }
  | { ok: false; message: string; code: string }
> {
  const { lead, meta, resend, sender, antiSpamWarning } = options;
  const recipient = options.recipient || siteConfig.email;

  // Seul l'e-mail interne est bloquant : c'est lui qui matérialise le lead.
  // Le message d'erreur Resend complet est journalisé par sendMail (serveur
  // uniquement) ; repli automatique sur onboarding@resend.dev si le domaine
  // de l'expéditeur n'est pas vérifié.
  const internal = buildInternalEmail(lead, meta, antiSpamWarning);
  const sent = await sendMail(
    resend,
    {
      from: sender,
      to: recipient,
      subject: internal.subject,
      html: internal.html,
      text: internal.text,
      replyTo: lead.email,
    },
    "pac-lead/interne",
  );
  if (!sent.ok) {
    return {
      ok: false,
      message: "L'envoi de votre demande a échoué. Merci de réessayer.",
      code: `resend_${sent.name}`,
    };
  }
  // Si le repli a servi, la confirmation au visiteur part avec le même expéditeur.
  const confirmationFrom = sent.usedFallback ? FALLBACK_FROM : sender;

  // Webhook et confirmation : en parallèle, non bloquants pour le lead.
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
  const [webhookSent, confirmation] = await Promise.all([
    webhookUrl
      ? sendWebhook(webhookUrl, buildWebhookRow(lead, meta), webhookSecret)
      : Promise.resolve(null),
    (async () => {
      const email = buildConfirmationEmail(lead, meta);
      const result = await sendMail(
        resend,
        {
          from: confirmationFrom,
          to: lead.email,
          subject: email.subject,
          html: email.html,
          text: email.text,
          replyTo: siteConfig.email,
        },
        "pac-lead/confirmation",
      );
      return result.ok;
    })(),
  ]);

  return { ok: true, confirmationSent: confirmation, webhookSent };
}
