import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

// Node runtime (default) — Resend SDK needs Node, not the edge runtime.
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  // Honeypot — real users never fill this hidden field.
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Silently accept honeypot hits so bots think they succeeded.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is a bit too long." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client to fall back to a mailto link.
    return NextResponse.json(
      { error: "The contact form isn't live yet. Please email me directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  // Defaults to Resend's shared test sender; override once the domain is
  // verified in Resend (e.g. "Michael Blakely <hello@michaeldblakely.com>").
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? site.email;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 },
    );
  }
}
