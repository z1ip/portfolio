import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about e-commerce manager and operations-lead roles.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 sm:pt-24">
      <Container>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          I&apos;m open to e-commerce manager and operations-lead roles — remote
          or relocating. Send a note below, or reach me directly through any of
          these.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Direct details */}
          <aside>
            <dl className="space-y-6">
              <div className="border-t border-hairline pt-4">
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg text-accent underline decoration-hairline decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-t border-hairline pt-4">
                <dt className="eyebrow">Phone</dt>
                <dd className="mt-2">
                  <a
                    href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-lg text-ink transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="border-t border-hairline pt-4">
                <dt className="eyebrow">LinkedIn</dt>
                <dd className="mt-2">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-ink transition-colors hover:text-accent"
                  >
                    Connect ↗
                  </a>
                </dd>
              </div>
              <div className="border-t border-hairline pt-4">
                <dt className="eyebrow">Location</dt>
                <dd className="mt-2 text-lg text-ink">
                  Dallas, GA · remote or relocating
                </dd>
              </div>
            </dl>
          </aside>

          {/* Form */}
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
