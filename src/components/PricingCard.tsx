import { Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import type { SiteCopy } from "@/content/types";
import { OPENINGS } from "@/lib/whatsapp";

export function PricingCard({ copy }: { copy: SiteCopy }) {
  const p = copy.pricing;
  return (
    <Section id="pricing" tone="muted">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <SectionTitle>{p.title}</SectionTitle>
        <p className="mt-4 text-body text-muted">{p.intro}</p>
        <p className="mt-3 inline-flex rounded-full bg-surface px-4 py-1.5 text-label font-bold text-primary-deep">{p.currencyNote}</p>
        <p className="mt-5 text-h3 font-extrabold text-primary-deep text-balance">{p.roi}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3 lg:items-stretch">
        {p.plans.map((plan) => (
          <article
            key={plan.id}
            className={`relative flex flex-col rounded-card bg-surface p-6 shadow-sm sm:p-8 ${
              plan.highlight ? "border-2 border-primary shadow-md" : "border-2 border-line"
            }`}
          >
            {plan.highlight ? (
              <span className="absolute inset-x-0 -top-3.5 mx-auto w-fit rounded-full bg-primary px-4 py-1 text-label font-bold whitespace-nowrap text-on-primary">
                {p.popularBadge}
              </span>
            ) : null}
            <h3 className="text-h3 font-extrabold">{plan.name}</h3>
            <div className="mt-4">
              {plan.from ? <p className="text-label font-bold text-muted">{p.fromLabel}</p> : null}
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight" dir="ltr">{plan.price}</span>
                <span className="text-body font-bold">{p.perMonth}</span>
              </div>
              <p className="mt-2 text-label text-muted">{plan.setup ?? plan.note}</p>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body">
                  <span aria-hidden="true" className="font-extrabold text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <WhatsAppCta
              label={copy.ctas.whatsapp}
              source="pricing"
              locale={copy.locale}
              className="mt-8 w-full justify-center"
            />
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-card bg-surface px-6 py-5 sm:px-8">
        <p className="text-label font-bold">{p.includedTitle}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {p.included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-label">
              <span aria-hidden="true" className="font-extrabold text-primary">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 space-y-1 border-t border-line pt-4 text-label text-muted">
          {p.notes.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-center">
        {/* Teaser only. The offer's details are never on the site. */}
        <p className="text-h3 font-extrabold text-balance">{p.offerLine}</p>
        <WhatsAppCta
          label={copy.ctas.whatsapp}
          source="pricing-offer"
          locale={copy.locale}
          opening={OPENINGS.offerCall[copy.locale]}
          className="mt-5 w-full justify-center sm:w-auto"
        />
        <p className="mt-6 text-label leading-relaxed text-muted">{p.passthrough}</p>
      </div>
    </Section>
  );
}
