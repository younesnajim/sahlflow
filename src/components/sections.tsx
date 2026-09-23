import { Container, Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import { DemoWidget } from "./DemoWidget";
import { Logo } from "./Logo";
import { formatNumber } from "@/lib/format";
import {
  FREE_SERVICE_MESSAGES_PER_MONTH,
  META_UAE_RATES,
  formatAed,
  formatUsd,
} from "@/lib/meta-rates";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import type { SiteCopy } from "@/content/types";

/* ─────────────────────────────── hero ──────────────────────────────── */

export function Hero({ copy }: { copy: SiteCopy }) {
  const { hero } = copy;
  return (
    <section id="top" className="scroll-target bg-surface py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <h1 className="text-h1 font-extrabold text-balance">{hero.h1}</h1>
            <p className="mt-5 max-w-prose text-lead text-muted">{hero.sub}</p>

            <div className="mt-7">
              <WhatsAppCta
                label={hero.cta.label}
                source={hero.cta.source}
                locale={copy.locale}
              />
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-label text-muted">
              {/* Separator trails its item so a wrapped line never starts
                  with a stray dot. */}
              {hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span>{item}</span>
                  {i < hero.trust.length - 1 && <span aria-hidden="true">·</span>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {copy.demo.languageNote && (
              <p className="mb-2.5 text-label font-medium text-muted">
                {copy.demo.languageNote}
              </p>
            )}
            <DemoWidget copy={copy} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────── video ─────────────────────────────── */

export function SalesJourney({ copy }: { copy: SiteCopy }) {
  const { video } = copy;
  const steps = copy.locale === "ar"
    ? ["رسالة واتساب", "فهم العميل", "تأهيل", "تسجيل البيانات", "إنشاء فرصة", "متابعة", "تحويل للفريق"]
    : ["WhatsApp message", "Understand", "Qualify", "Capture data", "Create opportunity", "Follow up", "Handoff"];

  return (
    <Section id="system" tone="muted">
      <Eyebrow>{video.eyebrow}</Eyebrow>
      <SectionTitle>{video.title}</SectionTitle>
      <p className="mt-4 max-w-prose text-body text-muted">{video.placeholder}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {steps.map((step, i) => (
          <div key={step} className="rounded-card border border-line bg-surface p-4">
            <span className="numeric text-label font-extrabold text-primary">{formatNumber(i + 1, copy.locale)}</span>
            <p className="mt-2 text-body font-bold">{step}</p>
          </div>
        ))}
      </div>
      <div className="mt-8"><DemoWidget copy={copy} /></div>
    </Section>
  );
}

/* ────────────────────────────── problem ────────────────────────────── */

export function Problem({ copy }: { copy: SiteCopy }) {
  const { problem } = copy;
  return (
    <Section>
      <SectionTitle>{problem.title}</SectionTitle>
      <ul className="mt-6 space-y-4">
        {problem.lines.map((line) => (
          <li
            key={line}
            className="border-s-4 border-amber ps-4 text-h3 font-medium text-balance"
          >
            {line}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ──────────────────────────── what you get ─────────────────────────── */

export function WhatYouGet({ copy }: { copy: SiteCopy }) {
  const { whatYouGet } = copy;
  return (
    <Section id="done-for-you">
      <Eyebrow>{whatYouGet.eyebrow}</Eyebrow>
      <SectionTitle>{whatYouGet.title}</SectionTitle>
      <p className="mt-4 max-w-prose text-body text-muted">{whatYouGet.intro}</p>

      <ol className="mt-7 grid gap-4 sm:grid-cols-2">
        {whatYouGet.items.map((item, i) => (
          <li
            key={item}
            className="flex gap-3 rounded-card border border-line bg-surface p-5"
          >
            <span
              className="numeric flex size-7 shrink-0 items-center justify-center rounded-full bg-tint text-label font-extrabold text-on-tint"
              aria-hidden="true"
            >
              {formatNumber(i + 1, copy.locale)}
            </span>
            <span className="text-body">{item}</span>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-body font-bold">{whatYouGet.closer}</p>
    </Section>
  );
}

/* ─────────────────────────── how it works ──────────────────────────── */

export function HowItWorks({ copy }: { copy: SiteCopy }) {
  const { howItWorks } = copy;
  return (
    <Section id="how">
      <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
      <SectionTitle>{howItWorks.title}</SectionTitle>

      <ol className="mt-8 grid gap-4 sm:grid-cols-2">
        {howItWorks.steps.map((step) => (
          <li
            key={step.day}
            className={`rounded-card border p-5 ${
              step.highlight
                ? "border-primary bg-tint/30"
                : "border-line bg-surface-muted"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-surface px-3 py-1 text-label font-bold text-primary">
                {step.day}
              </span>
              {step.badge && (
                <span className="rounded-full bg-primary px-3 py-1 text-label font-bold text-on-primary">
                  {step.badge}
                </span>
              )}
            </div>
            <p className="mt-3 text-h3 font-extrabold">{step.title}</p>
            <p className="mt-2 text-body text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col items-start gap-4 rounded-card border-2 border-primary bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-h3 font-extrabold text-balance">{howItWorks.guarantee}</p>
        <WhatsAppCta
          label={howItWorks.cta.label}
          source={howItWorks.cta.source}
          locale={copy.locale}
          className="shrink-0"
        />
      </div>
    </Section>
  );
}

/* ───────────────────────────── message costs ───────────────────────── */

/* ────────────────────────────── pricing ────────────────────────────── */

export function Pricing({ copy }: { copy: SiteCopy }) {
  const { pricing } = copy;
  return (
    <Section id="pricing">
      <Eyebrow>{pricing.eyebrow}</Eyebrow>

      <div className="mt-4 rounded-card border-2 border-primary bg-surface p-6 sm:p-8">
        <p className="text-price font-extrabold text-balance">{pricing.headline}</p>

        <p className="mt-4 text-body font-bold text-primary">{pricing.founderLabel}</p>
        <p className="mt-2 text-body text-muted">{pricing.standard}</p>

        <hr className="my-6 border-line" />

        <p className="text-label font-bold text-muted uppercase">
          {pricing.includedTitle}
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {pricing.included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-body">
              <CheckMark />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-card bg-surface-muted px-4 py-3 text-body font-medium">
          {pricing.passthrough}
        </p>

        <p className="mt-4 text-label text-muted">{pricing.lockIn}</p>

        <div className="mt-6">
          <WhatsAppCta
            label={pricing.cta.label}
            source={pricing.cta.source}
            locale={copy.locale}
            full
          />
        </div>
      </div>
    </Section>
  );
}

function CheckMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-1 size-4 shrink-0 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

/* ──────────────────────────────── faq ──────────────────────────────── */

export function Faq({ copy }: { copy: SiteCopy }) {
  const { faq } = copy;
  return (
    <Section id="faq" tone="muted">
      <Eyebrow>{faq.eyebrow}</Eyebrow>
      <SectionTitle>{faq.title}</SectionTitle>

      <div className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
        {faq.items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-h3 font-bold marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span
                className="shrink-0 text-primary transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-5 text-body text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────────── final CTA ───────────────────────────── */

export function FinalCta({ copy }: { copy: SiteCopy }) {
  const { finalCta } = copy;
  return (
    <section id="contact" className="scroll-target bg-primary py-12 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-start">
          <p className="text-h2 font-extrabold text-on-primary text-balance">
            {finalCta.line}
          </p>
          <WhatsAppCta
            label={finalCta.cta.label}
            source={finalCta.cta.source}
            locale={copy.locale}
            tone="onPrimary"
            className="shrink-0"
          />
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────── footer ────────────────────────────── */

export function Footer({ copy }: { copy: SiteCopy }) {
  const { footer } = copy;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink py-12 text-on-ink">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Logo variant="reversed" width={96} title={null} />
            <p className="mt-4 max-w-xs text-body text-tint">{footer.tagline}</p>
          </div>

          <nav className="flex flex-col gap-2" aria-label={footer.tagline}>
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body text-on-ink/80 transition-colors hover:text-tint"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="text-label text-on-ink/60">{footer.whatsappLabel}</p>
            <a
              href={whatsappLink("footer", copy.locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="numeric mt-1 inline-block text-h3 font-bold text-tint transition-colors hover:text-on-ink"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>

        <hr className="my-8 border-on-ink/15" />

        <div className="flex flex-col gap-2 text-label text-on-ink/60 sm:flex-row sm:justify-between">
          <p>{footer.legal}</p>
          <p>
            <span className="numeric">© {formatNumber(year, copy.locale)}</span> Sahl
          Flow · {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
