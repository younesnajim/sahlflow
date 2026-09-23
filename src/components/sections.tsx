import { Container, Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import { DemoWidget } from "./DemoWidget";
import { Logo } from "./Logo";
import { formatNumber } from "@/lib/format";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import type { SiteCopy } from "@/content/types";

/* ─────────────────────────────── hero ──────────────────────────────── */

export function Hero({ copy }: { copy: SiteCopy }) {
  const { hero } = copy;
  const ar = copy.locale === "ar";
  const flow = ar
    ? [["01", "رسالة جديدة"], ["02", "تم التأهيل"], ["03", "فرصة بيع"], ["04", "متابعة تلقائية"]]
    : [["01", "New message"], ["02", "Qualified"], ["03", "Sales opportunity"], ["04", "Follow-up"]];
  return (
    <section id="top" className="scroll-target overflow-hidden bg-surface py-12 sm:py-18">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-line bg-surface-muted px-4 py-2 text-label font-bold text-primary">
              {ar ? "نظام مبيعات واتساب — ننفّذه ونشغّله عنك" : "Done-for-you WhatsApp sales system"}
            </p>
            <h1 className="text-h1 font-extrabold text-balance">{hero.h1}</h1>
            <p className="mt-5 max-w-prose text-lead text-muted">{hero.sub}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#fit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-bold text-on-primary transition-colors hover:bg-primary-deep">
                {hero.cta.label}
              </a>
              <a href="#system" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-body font-bold text-primary transition-colors hover:bg-surface-sunken">
                {ar ? "شاهد كيف يعمل" : "See how it works"}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-label text-muted">
              {hero.trust.map((item, i) => <li key={item} className="flex items-center gap-3"><span>{item}</span>{i < hero.trust.length - 1 && <span aria-hidden="true">·</span>}</li>)}
            </ul>
          </div>
          <div className="relative rounded-card border border-line bg-surface-muted p-5 shadow-sm sm:p-7">
            <div className="absolute -top-3 end-5 rounded-full bg-primary px-3 py-1 text-label font-bold text-on-primary">{ar ? "يعمل مع فريقك" : "Works with your team"}</div>
            <p className="text-label font-bold text-muted">{ar ? "رحلة العميل داخل Sahl Flow" : "A lead inside Sahl Flow"}</p>
            <div className="mt-5 space-y-3">
              {flow.map(([n,label],i) => <div key={label} className="flex items-center gap-3 rounded-card border border-line bg-surface p-4">
                <span className="numeric flex size-8 shrink-0 items-center justify-center rounded-full bg-tint text-label font-extrabold text-on-tint">{n}</span>
                <span className="text-body font-bold">{label}</span>
                {i < flow.length - 1 && <span className="ms-auto text-primary" aria-hidden="true">✓</span>}
              </div>)}
            </div>
            <p className="mt-5 rounded-card bg-ink px-4 py-3 text-body font-bold text-on-ink">{ar ? "النتيجة: فريقك يرى من هو العميل، ماذا يريد، وما الخطوة التالية." : "Result: your team sees who the lead is, what they want, and what happens next."}</p>
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
      
    </Section>
  );
}

export function LiveDemo({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  return (
    <Section id="demo">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>{ar ? "جرّبه بنفسك" : "Try it yourself"}</Eyebrow>
        <SectionTitle>{ar ? "لا نريدك أن تصدقنا — اختبر المحادثة" : "Don't take our word for it — test the conversation"}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-body text-muted">{ar ? "اختر عيادة أو عقارات، واكتب كأنك عميل حقيقي. في سيناريو العقارات سترى كيف تتحول الإجابات إلى بطاقة Lead واضحة للفريق." : "Choose a clinic or real estate scenario and write like a real customer. In real estate, watch the answers become a structured lead card for the team."}</p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        {copy.demo.languageNote && <p className="mb-2.5 text-label font-medium text-muted">{copy.demo.languageNote}</p>}
        <DemoWidget copy={copy} />
      </div>
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

/* ───────────────────────── trust & data ───────────────────────── */

export function TrustAndData({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const cards = ar
    ? [
        ["بيانات عملك تبقى بياناتك", "نعزل بيانات شركتك عن بقية الحسابات، ونوضح آلية الوصول والتصدير المناسبة لبيئتك أثناء التنفيذ."],
        ["إنسان عندما تحتاجه", "الوكيل لا يجب أن يتظاهر بأنه يحل كل شيء. نبني نقاط تحويل واضحة لفريقك عندما تحتاج المحادثة تدخلاً بشرياً."],
        ["مصمم للعربية من الأساس", "واجهة عربية واتجاه RTL وفهم للمحادثات والرسائل الصوتية العربية — وليست طبقة ترجمة فوق منتج أجنبي."],
      ]
    : [
        ["Your business data stays yours", "Your company's data is isolated from other accounts, with access and export explained for your environment during implementation."],
        ["A human when it matters", "The agent should not pretend it can solve everything. We build clear handoff points for your team when a conversation needs a person."],
        ["Built for Arabic from the start", "Arabic UI, RTL and understanding of Arabic conversations and voice notes — not a translation layer added later."],
      ];
  return (
    <Section id="trust" tone="muted">
      <Eyebrow>{ar ? "ثقة وتحكم" : "Trust & control"}</Eyebrow>
      <SectionTitle>{ar ? "الذكاء الاصطناعي يعمل داخل قواعد شركتك" : "AI that works inside your business rules"}</SectionTitle>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {cards.map(([title, body]) => (
          <article key={title} className="rounded-card border border-line bg-surface p-5">
            <CheckMark />
            <h3 className="mt-3 text-h3 font-extrabold">{title}</h3>
            <p className="mt-2 text-body text-muted">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ───────────────────────── custom automation ───────────────────────── */

export function CustomAutomation({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  return (
    <Section id="automation">
      <div className="grid gap-7 rounded-card border border-line bg-surface-muted p-6 sm:p-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
        <div>
          <Eyebrow>{ar ? "Sahl Flow Custom Automation" : "Sahl Flow Custom Automation"}</Eyebrow>
          <SectionTitle>{ar ? "تحتاج أتمتة خاصة بعملك؟" : "Need automation built around your operation?"}</SectionTitle>
          <p className="mt-4 max-w-prose text-body text-muted">
            {ar
              ? "بعض العمليات لا يناسبها حل جاهز. نصمم أتمتة مخصصة تربط أنظمتك وبياناتك وواجهات API والعمليات الداخلية متعددة المراحل. يتم تحديد النطاق والسعر كمشروع مستقل."
              : "Some operations do not fit an off-the-shelf tool. We design custom automation connecting your systems, data, APIs and multi-stage internal workflows. Scope and pricing are defined as a separate project."}
          </p>
        </div>
        <div className="grid gap-2 text-body font-bold">
          {(ar
            ? ["ربط CRM والأنظمة الداخلية", "المواعيد والتذكيرات والمدفوعات", "المستندات والبيانات والتقارير", "عمليات متعددة المراحل وموافقات الفريق"]
            : ["CRM and internal system integrations", "Bookings, reminders and payments", "Documents, data and reporting", "Multi-stage workflows and team approvals"]
          ).map((item) => <div key={item} className="flex items-start gap-2"><CheckMark /><span>{item}</span></div>)}
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── qualification ───────────────────────── */

export function Qualification({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const items = ar
    ? ["لديك نشاط تجاري مرخّص", "لديك رقم مخصص للعمل", "يصل نشاطك تقريباً إلى ٥٠ محادثة واتساب أو أكثر أسبوعياً", "تريد نظاماً يدير التأهيل والمتابعة — وليس مجرد رد آلي"]
    : ["You operate a licensed business", "You have a dedicated business number", "You receive roughly 50+ WhatsApp conversations per week", "You want qualification and follow-up — not just automated replies"];
  return (
    <Section id="fit" tone="muted">
      <Eyebrow>{ar ? "هل يناسبك Sahl Flow؟" : "Is Sahl Flow a fit?"}</Eyebrow>
      <SectionTitle>{ar ? "نبدأ عندما يكون للنظام أثر حقيقي على المبيعات" : "We start where the system can have a real sales impact"}</SectionTitle>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => <div key={item} className="flex items-start gap-3 rounded-card border border-line bg-surface p-4"><CheckMark /><span className="text-body font-medium">{item}</span></div>)}
      </div>
      <p className="mt-5 text-body text-muted">{ar ? "إذا كان هذا قريباً من وضع شركتك، نراجع رحلة المبيعات معك أولاً ثم نحدد ما يجب بناؤه." : "If this sounds like your company, we first review your sales journey and then define what should be built."}</p>
    </Section>
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
