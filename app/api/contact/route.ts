import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientMeta, isRateLimited, parsePacLead, processPacLead } from "@/lib/pac-lead";

const MAX_FIELD_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (!isString(payload.name) || payload.name.trim().length < 2) {
    return "Merci d'indiquer votre nom.";
  }
  if (!isString(payload.email) || !EMAIL_REGEX.test(payload.email.trim())) {
    return "Adresse email invalide.";
  }
  if (!isString(payload.message) || payload.message.trim().length < 10) {
    return "Votre message doit contenir au moins 10 caractères.";
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
async function verifyTurnstile(payload: ContactPayload): Promise<NextResponse | null> {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) return null;

  const token = isString(payload["cf-turnstile-response"])
    ? payload["cf-turnstile-response"].trim()
    : "";
  if (!token) return fail("Vérification anti-spam manquante.", 422);

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
    if (!verifyJson.success) return fail("Vérification anti-spam échouée.", 422);
  } catch (err) {
    console.error("[api/contact] turnstile verify exception:", err);
    return fail("Vérification anti-spam indisponible.", 502);
  }
  return null;
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
    console.error("[api/contact] missing env vars:", missingEnv.join(", "));
    return fail(
      `Configuration serveur incomplète (manque: ${missingEnv.join(", ")}). Contactez l'administrateur.`,
      500,
    );
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

  const turnstileFailure = await verifyTurnstile(payload);
  if (turnstileFailure) return turnstileFailure;

  const config = getMailConfig();
  if (config instanceof NextResponse) return config;

  try {
    const result = await processPacLead({
      lead,
      meta,
      resend: config.resend,
      sender: config.sender,
    });
    if (!result.ok) return fail(result.message, 502);
    return NextResponse.json({
      success: true,
      confirmationSent: result.confirmationSent,
      message: "Votre demande a bien été enregistrée.",
    });
  } catch (err) {
    console.error("[api/contact] pac lead exception:", err);
    return fail("L'envoi de votre demande a échoué. Merci de réessayer.", 502);
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

  const validationError = validate(payload);
  if (validationError) return fail(validationError, 422);

  const turnstileFailure = await verifyTurnstile(payload);
  if (turnstileFailure) return turnstileFailure;

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
      console.error("[api/contact] resend error:", error);
      return fail(`Envoi refusé par Resend: ${error.message ?? "erreur inconnue"}`, 502);
    }
  } catch (err) {
    console.error("[api/contact] resend exception:", err);
    return fail(
      err instanceof Error
        ? `Erreur d'envoi: ${err.message}`
        : "L'envoi a échoué. Merci de réessayer ou de nous appeler.",
      502,
    );
  }

  return NextResponse.json({
    success: true,
    message: "Votre message a bien été reçu. Nous revenons vers vous rapidement.",
  });
}
