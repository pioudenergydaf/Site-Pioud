import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientMeta, isRateLimited, parsePacLead, processPacLead } from "@/lib/pac-lead";

// Limites strictes du formulaire de contact générique.
const MAX_FIELD_LENGTH = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(0|\+33)[1-9](\d{2}){4}$/;

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "erreur inconnue";
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  subject?: unknown;
  consent?: unknown;
  source?: unknown;
  [key: string]: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function validate(payload: ContactPayload): string | null {
  const name = isString(payload.name) ? payload.name.trim() : "";
  const email = isString(payload.email) ? payload.email.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";
  const phone = isString(payload.phone) ? payload.phone.replace(/\s+/g, "") : "";
  const subject = isString(payload.subject) ? payload.subject.trim() : "";

  if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
    return "Merci d'indiquer votre nom.";
  }
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return "Adresse email invalide.";
  }
  if (message.length < 10) {
    return "Votre message doit contenir au moins 10 caractères.";
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return "Votre message est trop long.";
  }
  if (phone && !PHONE_REGEX.test(phone)) {
    return "Numéro de téléphone invalide.";
  }
  if (subject.length > MAX_SUBJECT_LENGTH) {
    return "Le sujet est trop long.";
  }
  // Injection d'en-têtes : aucun retour à la ligne dans les champs courts.
  if (/[\r\n]/.test(name) || /[\r\n]/.test(email) || /[\r\n]/.test(subject)) {
    return "Caractères non autorisés.";
  }
  for (const value of Object.values(payload)) {
    if (isString(value) && value.length > MAX_FIELD_LENGTH) {
      return "Un des champs dépasse la taille autorisée.";
    }
  }
  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(payload: ContactPayload) {
  const name = isString(payload.name) ? payload.name.trim() : "";
  const email = isString(payload.email) ? payload.email.trim() : "";
  const phone = isString(payload.phone) ? payload.phone.trim() : "";
  const subject = isString(payload.subject) ? payload.subject.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";

  const lines = [
    ["Nom", name],
    ["Email", email],
    phone ? ["Téléphone", phone] : null,
    subject ? ["Sujet", subject] : null,
  ].filter(Boolean) as Array<[string, string]>;

  const html = `
    <h2>Nouveau message depuis le site Pioud Energy</h2>
    <ul>
      ${lines
        .map(
          ([label, value]) =>
            `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`,
        )
        .join("")}
    </ul>
    <h3>Message</h3>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  const text = [
    ...lines.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  return { html, text, subject: subject || `Nouveau message de ${name}` };
}

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

// Vérification Cloudflare Turnstile, uniquement si la clé secrète est configurée.
type TurnstileResult = { ok: true } | { ok: false; reason: string; status: number };

async function checkTurnstile(payload: ContactPayload): Promise<TurnstileResult> {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) return { ok: true };

  const token = isString(payload["cf-turnstile-response"])
    ? payload["cf-turnstile-response"].trim()
    : "";
  if (!token) return { ok: false, reason: "Vérification anti-spam manquante.", status: 422 };

  try {
    const verifyBody = new URLSearchParams({ secret: turnstileSecret, response: token });
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyBody.toString(),
      },
    );
    const verifyJson = (await verifyResponse.json()) as { success?: boolean };
    if (!verifyJson.success) {
      return { ok: false, reason: "Vérification anti-spam échouée.", status: 422 };
    }
  } catch (err) {
    console.error("[api/contact] turnstile verify exception:", errorMessage(err));
    return { ok: false, reason: "Vérification anti-spam indisponible.", status: 502 };
  }
  return { ok: true };
}

function getMailConfig(): { resend: Resend; sender: string; recipient: string } | NextResponse {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const sender = process.env.CONTACT_SENDER_EMAIL;

  const missingEnv: string[] = [];
  if (!apiKey) missingEnv.push("RESEND_API_KEY");
  if (!recipient) missingEnv.push("CONTACT_RECIPIENT_EMAIL");
  if (!sender) missingEnv.push("CONTACT_SENDER_EMAIL");

  if (missingEnv.length > 0) {
    // Détail dans les journaux serveur uniquement, jamais renvoyé au client.
    console.error("[api/contact] missing env vars:", missingEnv.join(", "));
    return fail("Service d'envoi indisponible. Merci de réessayer plus tard.", 500);
  }
  return { resend: new Resend(apiKey), sender: sender!, recipient: recipient! };
}

// ── Leads de la landing /pac ────────────────────────────────────────────
async function handlePacLead(request: Request, payload: ContactPayload) {
  const meta = getClientMeta(request);
  if (isRateLimited(meta.ip)) {
    return fail("Trop de demandes depuis votre connexion. Merci de réessayer dans quelques minutes.", 429);
  }

  const parsed = parsePacLead(payload);
  const lead = parsed.lead;
  if (!lead) return fail(parsed.error ?? "Données invalides.", 422);

  // Anti-spam non bloquant pour un lead : en cas d'échec ou d'indisponibilité
  // de Turnstile, le lead part quand même, signalé « à vérifier » en interne.
  const turnstile = await checkTurnstile(payload);
  const antiSpamWarning = turnstile.ok ? undefined : turnstile.reason;
  if (antiSpamWarning) console.warn("[api/contact] pac lead sans vérification anti-spam:", antiSpamWarning);

  const config = getMailConfig();
  if (config instanceof NextResponse) return config;

  try {
    const result = await processPacLead({
      lead,
      meta,
      resend: config.resend,
      sender: config.sender,
      // Même boîte que le formulaire de contact (adresse validée côté Resend).
      recipient: config.recipient,
      antiSpamWarning,
    });
    if (!result.ok) {
      return NextResponse.json(
        { success: false, message: result.message, code: result.code },
        { status: 502 },
      );
    }
    return NextResponse.json({
      success: true,
      confirmationSent: result.confirmationSent,
      webhookSent: result.webhookSent,
      message: "Votre demande a bien été enregistrée.",
    });
  } catch (err) {
    console.error("[api/contact] pac lead exception:", errorMessage(err));
    return NextResponse.json(
      {
        success: false,
        message: "L'envoi de votre demande a échoué. Merci de réessayer.",
        code: "exception",
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return fail("Requête invalide.", 400);
  }

  if (payload.source === "pac-landing") {
    return handlePacLead(request, payload);
  }

  // Formulaire générique : même rate-limit par IP que les leads /pac.
  const meta = getClientMeta(request);
  if (isRateLimited(meta.ip)) {
    return fail("Trop de demandes depuis votre connexion. Merci de réessayer dans quelques minutes.", 429);
  }

  const validationError = validate(payload);
  if (validationError) return fail(validationError, 422);

  const turnstile = await checkTurnstile(payload);
  if (!turnstile.ok) return fail(turnstile.reason, turnstile.status);

  const config = getMailConfig();
  if (config instanceof NextResponse) return config;

  try {
    const email = buildEmail(payload);
    const replyTo = isString(payload.email) ? payload.email.trim() : undefined;

    const { error } = await config.resend.emails.send({
      from: config.sender,
      to: config.recipient,
      subject: `[Site Pioud] ${email.subject}`,
      html: email.html,
      text: email.text,
      replyTo,
    });

    if (error) {
      console.error("[api/contact] resend error:", error.name, error.message);
      return fail("L'envoi a échoué. Merci de réessayer dans quelques instants.", 502);
    }
  } catch (err) {
    console.error("[api/contact] resend exception:", errorMessage(err));
    return fail("L'envoi a échoué. Merci de réessayer dans quelques instants.", 502);
  }

  return NextResponse.json({
    success: true,
    message: "Votre message a bien été reçu. Nous revenons vers vous rapidement.",
  });
}
