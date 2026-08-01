"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "mt-2 w-full border border-hairline bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(payload.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError(
        "Couldn't reach the server. Please email me directly instead.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-hairline bg-paper-dim p-8">
        <p className="font-serif text-2xl leading-snug text-ink">
          Thanks — your message is on its way.
        </p>
        <p className="mt-3 text-ink-soft">
          I&apos;ll get back to you shortly. In the meantime, feel free to
          connect on LinkedIn.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-accent underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      {/* Honeypot: hidden from users, catches bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldBase}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldBase}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(fieldBase, "resize-y")}
          placeholder="A little about the role or project…"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
          {status === "error" && (
            <>
              {" "}
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-hairline decoration-1 underline-offset-2"
              >
                Email me directly
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          {status !== "submitting" && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}
