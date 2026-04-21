import { NextResponse } from "next/server";

type ContactPayload = {
  formType?: "contact";
  [key: string]: unknown;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ContactPayload;
    const formType = "contact";

    console.log(`[api/contact] ${formType} payload`, payload);

    return NextResponse.json({
      success: true,
      message: "Votre message a bien été envoyé",
    });
  } catch (error) {
    console.error("[api/contact] invalid request body", error);
    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue, merci de réessayer.",
      },
      { status: 400 },
    );
  }
}
