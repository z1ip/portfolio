import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { estimatedAnnualValue, getProduct } from "@/lib/shop";
import { inboxAddress, mailerConfigured, sendMail } from "@/lib/mailer";

// SMTP needs raw TCP, which the edge runtime doesn't have. Must stay nodejs.
export const runtime = "nodejs";

type Payload = {
  email?: string;
  name?: string;
  itemIds?: string[];
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Silently accept honeypot hits.
  if (body.company) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const email = body.email?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const items = (body.itemIds ?? [])
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<ReturnType<typeof getProduct>> => Boolean(p));

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const value = estimatedAnnualValue(items.map((i) => i.id));

  // Compose the "receipt" email.
  const lines = items.map((i) => `• ${i.name} — ${i.stat}`).join("\n");
  const valueLine =
    value > 0
      ? `\nEstimated annual value: $${value.toLocaleString("en-US")}/yr\n`
      : "\n";
  const text =
    `Your case for hiring ${site.fullName}\n` +
    `${"-".repeat(40)}\n\n` +
    `${lines}\n${valueLine}\n` +
    `Reach Michael: ${site.email} · ${site.phone}\n` +
    `LinkedIn: ${site.linkedin}\n` +
    `Portfolio: ${site.url}\n`;

  // If SMTP isn't configured, the on-page receipt is still the deliverable.
  if (!mailerConfigured()) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  try {
    await sendMail({
      to: email,
      // BCC Michael so a "purchase" doubles as a warm lead.
      bcc: inboxAddress(),
      replyTo: site.email,
      subject: `Your shortlist — the case for hiring ${site.name}`,
      text,
    });

    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    // Non-fatal: the client still shows and can download the receipt.
    console.error("Shop-order route error:", err);
    return NextResponse.json({ ok: true, emailed: false });
  }
}
