import { PricingCard } from "./PricingCard";
import { Container, DemoCta, Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import { DemoWidget } from "./DemoWidget";
import { Logo } from "./Logo";
import { formatNumber } from "@/lib/format";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import type { Card, SiteCopy } from "@/content/types";

/**
 * Landing-page sections. Layout only — every visible word comes from
 * src/content/{ar,en}.ts. The page uses exactly two calls to action:
 * DemoCta (primary) and WhatsAppCta (secondary).
 */

/* ─────────────────────────────── hero ──────────────────────────────── */

export function Hero({ copy }: { copy: SiteCopy }) {
  const { hero } = copy;
  return (
    <section id="top" className="sales-section soft-grid scroll-target overflow-hidden bg-surface py-10 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-line bg-surface-muted px-4 py-2 text-label font-bold text-primary">
            {hero.badge}
          </p>
          <h1 className="text-h1 font-extrabold text-balance">{hero.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted">{hero.sub}</p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <DemoCta label={copy.ctas.demo} locale={copy.locale} />
            <WhatsAppCta label={copy.ctas.whatsapp} source="hero" locale={copy.locale} />
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label font-bold text-muted">
            {hero.trust.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>
        <ExampleChat copy={copy} />
      </Container>
    </section>
  );
}

/** A static, labelled example of a late-night exchange. Not live data. */
function ExampleChat({ copy }: { copy: SiteCopy }) {
  const { example } = copy.hero;
  return (
    <figure className="mx-auto mt-9 max-w-md rounded-card border border-line bg-surface-muted p-4 shadow-sm" aria-label={example.label}>
      <figcaption className="mb-3 flex items-center justify-between text-label text-muted">
        <span className="font-bold">{example.label}</span>
        <span className="numeric">{example.time}</span>
      </figcaption>
      <div className="flex flex-col gap-2 text-body">
        <p className="max-w-[85%] self-start rounded-2xl rounded-ss-sm border border-line bg-surface px-4 py-2.5">{example.customer}</p>
        <p className="max-w-[85%] self-end rounded-2xl rounded-se-sm bg-tint px-4 py-2.5 text-on-tint">{example.reply}</p>
      </div>
    </figure>
  );
}

/* ─────────────────────────────── demo ──────────────────────────────── */

export function LiveDemo({ copy }: { copy: SiteCopy }) {
  const { demoSection } = copy;
  return (
    <Section id="demo" tone="muted">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{demoSection.eyebrow}</Eyebrow>
        <SectionTitle>{demoSection.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-body text-muted">{demoSection.sub}</p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        <DemoWidget copy={copy} />
      </div>
    </Section>
  );
}

/* ────────────────────────────── problem ────────────────────────────── */

export function Problem({ copy }: { copy: SiteCopy }) {
  const { problem } = copy;
  return (
    <Section id="problem">
      <Eyebrow>{problem.eyebrow}</Eyebrow>
      <SectionTitle>{problem.title}</SectionTitle>
      <CardGrid cards={problem.cards} columns="lg:grid-cols-4" />
      <p className="mt-6 text-body font-bold">{problem.closer}</p>
    </Section>
  );
}

/* ─────────────────────────── how it works ──────────────────────────── */

export function HowItWorks({ copy }: { copy: SiteCopy }) {
  const { howItWorks } = copy;
  return (
    <Section id="how" tone="muted">
      <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
      <SectionTitle>{howItWorks.title}</SectionTitle>
      <NumberedSteps steps={howItWorks.steps} locale={copy.locale} />
    </Section>
  );
}

/* ───────────────────────────── outcomes ─────────────────────────────── */

export function Outcomes({ copy }: { copy: SiteCopy }) {
  const { outcomes } = copy;
  return (
    <Section id="outcomes">
      <Eyebrow>{outcomes.eyebrow}</Eyebrow>
      <SectionTitle>{outcomes.title}</SectionTitle>
      <CardGrid cards={outcomes.cards} columns="lg:grid-cols-4" inlineCheck />
    </Section>
  );
}

/* ────────────────────────────── setup ──────────────────────────────── */

export function Setup({ copy }: { copy: SiteCopy }) {
  const { setup } = copy;
  return (
    <Section id="setup">
      <Eyebrow>{setup.eyebrow}</Eyebrow>
      <SectionTitle>{setup.title}</SectionTitle>
      <NumberedSteps steps={setup.steps} locale={copy.locale} />
      <p className="mt-6 text-body font-bold text-primary-deep">{setup.note}</p>
    </Section>
  );
}

/* ───────────────────────────── use cases ───────────────────────────── */

export function UseCases({ copy }: { copy: SiteCopy }) {
  const { useCases } = copy;
  return (
    <Section id="use-cases" tone="muted">
      <Eyebrow>{useCases.eyebrow}</Eyebrow>
      <SectionTitle>{useCases.title}</SectionTitle>
      <CardGrid cards={useCases.cards} columns="lg:grid-cols-4" />
    </Section>
  );
}

/* ─────────────────────────── trust & data ──────────────────────────── */

export function Trust({ copy }: { copy: SiteCopy }) {
  const { trust } = copy;
  return (
    <Section id="trust">
      <Eyebrow>{trust.eyebrow}</Eyebrow>
      <SectionTitle>{trust.title}</SectionTitle>
      <CardGrid cards={trust.cards} columns="md:grid-cols-3" check />
      <a href={`/${copy.locale}/privacy`} className="mt-6 inline-block text-body font-bold text-primary underline underline-offset-4 hover:text-primary-deep">
        {trust.privacyLink}
      </a>
    </Section>
  );
}

/* ──────────────────────────── fit / not fit ────────────────────────── */

export function FitVsNotFit({ copy }: { copy: SiteCopy }) {
  const { fit } = copy;
  return (
    <Section id="fit">
      <div className="rounded-card bg-ink p-6 text-on-ink sm:p-9">
        <p className="text-label font-medium tracking-wide text-tint uppercase">{fit.eyebrow}</p>
        <SectionTitle>{fit.title}</SectionTitle>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-h3 font-extrabold text-tint">{fit.yesTitle}</p>
            <ul className="mt-4 space-y-3">
              {fit.yes.map((x) => (
                <li key={x} className="flex gap-3 text-body"><span className="text-tint" aria-hidden="true">✓</span><span>{x}</span></li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/15 pt-6 lg:border-s lg:border-t-0 lg:pt-0 lg:ps-7">
            <p className="text-h3 font-extrabold">{fit.noTitle}</p>
            <ul className="mt-4 space-y-3 opacity-75">
              {fit.no.map((x) => (
                <li key={x} className="text-body">— {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────── founder (placeholder, hidden) ───────────────── */

/**
 * TODO(founder): renders nothing until `copy.founder` is filled in
 * (Younes: photo + two lines). Nothing about it is visible on the live page.
 */
export function Founder({ copy }: { copy: SiteCopy }) {
  const founder = copy.founder;
  if (!founder) return null;
  return (
    <Section id="founder" tone="muted">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:text-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={founder.photo} alt={founder.photoAlt} width={128} height={128} className="size-32 shrink-0 rounded-full object-cover" />
        <div>
          <Eyebrow>{founder.eyebrow}</Eyebrow>
          <p className="mt-2 text-h3 font-extrabold">{founder.name}</p>
          <p className="text-label text-muted">{founder.role}</p>
          {founder.lines.map((line) => (
            <p key={line} className="mt-3 text-body">{line}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────── case study (placeholder, hidden) ──────────────── */

/**
 * TODO(case-study): renders nothing until `copy.caseStudy` is filled in.
 * Rasha's story goes here only with her permission and only with numbers she
 * approves. No invented figures, logos or testimonials.
 */
export function CaseStudy({ copy }: { copy: SiteCopy }) {
  const study = copy.caseStudy;
  if (!study) return null;
  return (
    <Section id="case-study">
      <Eyebrow>{study.eyebrow}</Eyebrow>
      <SectionTitle>{study.title}</SectionTitle>
      {study.body.map((p) => (
        <p key={p} className="mt-4 max-w-prose text-body">{p}</p>
      ))}
      <p className="mt-4 text-label font-bold text-muted">{study.attribution}</p>
    </Section>
  );
}

/* ────────────────────────────── pricing ────────────────────────────── */

export function Pricing({ copy }: { copy: SiteCopy }) {
  return <PricingCard copy={copy} />;
}

/* ──────────────────────────────── faq ──────────────────────────────── */

export function Faq({ copy }: { copy: SiteCopy }) {
  const { faq } = copy;
  return (
    <Section id="faq">
      <Eyebrow>{faq.eyebrow}</Eyebrow>
      <SectionTitle>{faq.title}</SectionTitle>
      <div className="mt-7 divide-y divide-line rounded-card border border-line bg-surface">
        {faq.items.map((item) => (
          <details key={item.q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-bold">
              <span>{item.q}</span>
              <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-body text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────────── final cta ───────────────────────────── */

export function FinalCta({ copy }: { copy: SiteCopy }) {
  const { finalCta } = copy;
  return (
    <section id="contact" className="scroll-target bg-primary py-12 sm:py-16">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-start">
          <div>
            <p className="text-h2 font-extrabold text-on-primary text-balance">{finalCta.line}</p>
            <p className="mt-2 text-body text-on-primary/85">{finalCta.sub}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <DemoCta label={copy.ctas.demo} locale={copy.locale} onPrimary />
            <WhatsAppCta label={copy.ctas.whatsapp} source="final-cta" locale={copy.locale} tone="outlineOnPrimary" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────────────────── footer ────────────────────────────── */

export function Footer({ copy }: { copy: SiteCopy }) {
  const { footer } = copy;
  // A year is not a quantity: no locale grouping (it rendered as «٢٬٠٢٦»).
  const year = String(new Date().getFullYear());

  return (
    <footer className="bg-ink py-12 text-on-ink">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <Logo variant="reversed" width={96} title={null} />
            <p className="mt-4 max-w-xs text-body text-tint">{footer.tagline}</p>
          </div>

          <nav className="flex flex-col gap-2" aria-label={footer.tagline}>
            {[...footer.links, ...footer.legalLinks].map((link) => (
              <a key={link.href} href={link.href} className="text-body text-on-ink/80 transition-colors hover:text-tint">
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
              dir="ltr"
            >
              {WHATSAPP_DISPLAY}
            </a>
            {footer.email ? (
              <>
                <p className="mt-4 text-label text-on-ink/60">{footer.email.label}</p>
                <a href={`mailto:${footer.email.address}`} className="mt-1 inline-block text-body font-bold text-tint hover:text-on-ink">
                  {footer.email.address}
                </a>
              </>
            ) : null}
          </div>
        </div>

        <hr className="my-8 border-on-ink/15" />

        <div className="flex flex-col gap-2 text-label text-on-ink/60 sm:flex-row sm:justify-between">
          <p>{footer.legal}</p>
          <p>
            <span className="numeric" dir="ltr">© {year}</span> Sahl Flow · {footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* ───────────────────────────── helpers ─────────────────────────────── */

function CardGrid({ cards, columns, check = false, inlineCheck = false }: { cards: Card[]; columns: string; check?: boolean; inlineCheck?: boolean }) {
  return (
    <div className={`mt-7 grid gap-3 sm:grid-cols-2 sm:gap-4 ${columns}`}>
      {cards.map((card) => (
        <article key={card.title} className="lift-card rounded-card border border-line bg-surface p-4 sm:p-5">
          {inlineCheck ? (
            <h3 className="flex items-start gap-2 text-h3 font-extrabold"><CheckMark /><span>{card.title}</span></h3>
          ) : (
            <>
              {check ? <CheckMark /> : null}
              <h3 className={`${check ? "mt-3 " : ""}text-h3 font-extrabold`}>{card.title}</h3>
            </>
          )}
          <p className="mt-2 text-body text-muted">{card.body}</p>
          {card.note ? (
            <p className="mt-3 inline-flex rounded-full bg-surface-muted px-3 py-1 text-label font-bold text-muted">{card.note}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function NumberedSteps({ steps, locale }: { steps: Card[]; locale: SiteCopy["locale"] }) {
  return (
    <ol className={`mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 ${steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="lift-card flex gap-4 rounded-card border border-line bg-surface p-4 sm:p-5 lg:flex-col lg:gap-3">
          <span className="numeric flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-body font-extrabold text-on-primary">
            {formatNumber(i + 1, locale)}
          </span>
          <div>
            <h3 className="text-h3 font-extrabold">{step.title}</h3>
            <p className="mt-1 text-body text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}
