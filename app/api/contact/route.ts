import { NextResponse } from "next/server";

const MAX_FIELD_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  consent?: unknown;
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

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Requête invalide." },
      { status: 400 },
    );
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json(
      { success: false, message: validationError },
      { status: 422 },
    );
  }

  // TODO: brancher un fournisseur d'envoi d'email (Resend, SendGrid, SMTP)
  // avant la mise en production. Aujourd'hui, la requête est acceptée mais
  // aucun email n'est réellement envoyé.

  return NextResponse.json({
    success: true,
    message: "Votre message a bien été reçu. Nous revenons vers vous rapidement.",
  });
}
