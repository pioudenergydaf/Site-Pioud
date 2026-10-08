// Envoi d'e-mails via Resend avec contrôles d'adresses et repli automatique.
//
// Règles : l'expéditeur doit être sur un domaine vérifié dans Resend (jamais
// une boîte gratuite type gmail.com) ; destinataire et reply-to doivent être
// des e-mails valides ; aucun champ vide. Si Resend renvoie
// `validation_error` (domaine non vérifié, adresse refusée…), on journalise
// le message complet côté serveur et on retente une fois avec l'expéditeur
// de secours `onboarding@resend.dev` (limité par Resend aux adresses du
// compte tant que le domaine n'est pas vérifié).
import type { Resend } from "resend";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Domaines de messagerie grand public : impossibles à vérifier dans Resend.
const FREE_MAILBOX_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "outlook.fr",
  "hotmail.com",
  "hotmail.fr",
  "live.com",
  "live.fr",
  "yahoo.com",
  "yahoo.fr",
  "icloud.com",
  "me.com",
  "orange.fr",
  "wanadoo.fr",
  "free.fr",
  "sfr.fr",
  "laposte.net",
];

export const FALLBACK_FROM = "Pioud Energy <onboarding@resend.dev>";

// « Nom <adresse> » ou « adresse » → { name, address }.
export function parseAddress(value: string): { name: string; address: string } | null {
  const trimmed = value.trim();
  const match = trimmed.match(/^(?:"?([^"<]*)"?\s*)?<([^>]+)>$/);
  const address = (match ? match[2] : trimmed).trim();
  if (!EMAIL_REGEX.test(address)) return null;
  return { name: match?.[1]?.trim() ?? "", address };
}

export function domainOf(address: string): string {
  return address.split("@")[1]?.toLowerCase() ?? "";
}

// Choix de l'expéditeur : CONTACT_SENDER_EMAIL si valide et sur un domaine
// vérifiable, sinon l'expéditeur de secours (avec journalisation).
export function resolveSender(configured: string | undefined): { from: string; warning?: string } {
  const parsed = configured ? parseAddress(configured) : null;
  if (!parsed) {
    return {
      from: FALLBACK_FROM,
      warning: `CONTACT_SENDER_EMAIL absent ou invalide (${JSON.stringify(configured ?? "")}) → repli ${FALLBACK_FROM}`,
    };
  }
  if (FREE_MAILBOX_DOMAINS.includes(domainOf(parsed.address))) {
    return {
      from: FALLBACK_FROM,
      warning: `CONTACT_SENDER_EMAIL sur une boîte gratuite (${domainOf(parsed.address)}), non vérifiable dans Resend → repli ${FALLBACK_FROM}`,
    };
  }
  return { from: parsed.name ? `${parsed.name} <${parsed.address}>` : parsed.address };
}

// « a@x.fr, b@y.fr » → liste d'adresses valides, dédoublonnées.
export function parseRecipients(value: string | undefined): string[] {
  return Array.from(
    new Set(
      (value ?? "")
        .split(/[,;]/)
        .map((s) => s.trim().toLowerCase())
        .filter((s) => EMAIL_REGEX.test(s)),
    ),
  );
}

export type MailParams = {
  from: string;
  // Une adresse ou plusieurs (même e-mail envoyé à chacune).
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type MailResult =
  | { ok: true; id: string | null; usedFallback: boolean }
  | { ok: false; name: string; message: string };

function describe(error: unknown): { name: string; message: string } {
  if (error && typeof error === "object") {
    const e = error as { name?: unknown; message?: unknown };
    return {
      name: typeof e.name === "string" ? e.name : "error",
      message: typeof e.message === "string" ? e.message : JSON.stringify(error),
    };
  }
  return { name: "error", message: String(error) };
}

export async function sendMail(
  resend: Resend,
  params: MailParams,
  context: string,
): Promise<MailResult> {
  const toList = (Array.isArray(params.to) ? params.to : [params.to]).map((s) => s.trim());
  const to = toList.length === 1 ? toList[0] : toList;
  const subject = params.subject.trim();
  if (toList.length === 0 || toList.some((address) => !EMAIL_REGEX.test(address))) {
    console.error(`[mailer:${context}] destinataire invalide:`, JSON.stringify(toList));
    return { ok: false, name: "invalid_recipient", message: "Destinataire invalide." };
  }
  if (!subject || !params.html.trim() || !params.text.trim()) {
    console.error(`[mailer:${context}] objet ou corps vide`);
    return { ok: false, name: "empty_field", message: "Objet ou corps vide." };
  }
  // reply-to facultatif : omis s'il n'est pas un e-mail valide.
  const replyTo = params.replyTo && EMAIL_REGEX.test(params.replyTo.trim()) ? params.replyTo.trim() : undefined;

  const attempt = async (from: string) => {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html: params.html,
        text: params.text,
        replyTo,
      });
      if (error) return { error: describe(error), id: null };
      return { error: null, id: data?.id ?? null };
    } catch (err) {
      return { error: describe(err), id: null };
    }
  };

  let from = params.from;
  let result = await attempt(from);
  if (result.error) {
    // Message Resend complet, côté serveur uniquement (jamais renvoyé au client).
    console.error(
      `[mailer:${context}] Resend a refusé l'envoi — from=${JSON.stringify(from)} to=${JSON.stringify(to)} replyTo=${JSON.stringify(replyTo ?? "")} — ${result.error.name}: ${result.error.message}`,
    );
    if (result.error.name === "validation_error" && from !== FALLBACK_FROM) {
      console.warn(`[mailer:${context}] nouvel essai avec l'expéditeur de secours ${FALLBACK_FROM}`);
      from = FALLBACK_FROM;
      result = await attempt(from);
      if (result.error) {
        console.error(
          `[mailer:${context}] échec aussi avec ${FALLBACK_FROM} — ${result.error.name}: ${result.error.message}`,
        );
      }
    }
  }
  if (result.error) return { ok: false, ...result.error };
  return { ok: true, id: result.id, usedFallback: from === FALLBACK_FROM };
}
