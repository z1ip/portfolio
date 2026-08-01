import "server-only";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/**
 * Outbound mail over Proton Mail's SMTP submission.
 *
 * Proton already authenticates michaeldblakely.com (MX + SPF + DKIM), so
 * sending through it needs no extra DNS and no third-party service. The token
 * is generated in Proton under Settings → IMAP/SMTP.
 *
 * Two constraints worth knowing before changing anything here:
 *  - Proton requires the From address to match the address the token was
 *    issued for. You cannot spoof a visitor's address in From; that's why
 *    every send below puts the visitor in replyTo instead.
 *  - This must run on the Node runtime. The edge runtime has no raw TCP, so
 *    SMTP is impossible there — hence `export const runtime = "nodejs"` in
 *    each route that calls this.
 */

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.protonmail.ch";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);

/** True when the SMTP credentials are present, so callers can degrade. */
export function mailerConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/** The address mail is sent *from* — must match the SMTP token's address. */
export function fromAddress(): string {
  const user = process.env.SMTP_USER ?? site.email;
  return process.env.CONTACT_FROM ?? `${site.name} <${user}>`;
}

/** Where site mail is delivered. */
export function inboxAddress(): string {
  return process.env.CONTACT_TO ?? site.email;
}

function transport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    // 587 uses STARTTLS (secure:false + upgrade); 465 is implicit TLS.
    secure: SMTP_PORT === 465,
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  });
}

export type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  bcc?: string;
};

/**
 * Sends a message. Throws on failure — callers decide whether that's fatal
 * (contact form: yes) or cosmetic (shop receipt: no, the on-page receipt
 * is still the deliverable).
 */
export async function sendMail(mail: Mail): Promise<void> {
  await transport().sendMail({
    from: fromAddress(),
    to: mail.to,
    replyTo: mail.replyTo,
    bcc: mail.bcc,
    subject: mail.subject,
    text: mail.text,
  });
}
