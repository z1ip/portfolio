import { NextResponse } from "next/server";
import { inboxAddress, mailerConfigured, sendMail } from "@/lib/mailer";

// SMTP needs raw TCP, which the edge runtime doesn't have. Must stay nodejs.
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

  if (!mailerConfigured()) {
    // Not configured yet — tell the client to fall back to a mailto link.
    return NextResponse.json(
      { error: "The contact form isn't live yet. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    await sendMail({
      to: inboxAddress(),
      // From must be Michael's own address (Proton won't send as the visitor),
      // so the visitor goes in replyTo — hitting Reply answers them directly.
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }
}
