"use client";

import { useState } from "react";
import { Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import type { SiteCopy } from "@/content/types";

export function PricingCard({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const [market, setMarket] = useState<"uae" | "sa">("uae");
  const currency = market === "uae" ? (ar ? "درهم" : "AED") : (ar ? "ريال" : "SAR");
  const included = ar
    ? ["مساعد ذكاء اصطناعي يفهم العربية", "صندوق محادثات واتساب مشترك وCRM", "تأهيل العملاء وإدارة فرص البيع", "المتابعة والأتمتة الأساسية", "الإعداد والتشغيل ضمن نطاق الخدمة"]
    : ["Arabic-ready AI assistant", "Shared WhatsApp inbox and CRM", "Lead qualification and sales pipeline", "Core follow-ups and automation", "Setup and operation within agreed scope"];
  return (
    <Section id="pricing" tone="muted">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{ar ? "الأسعار" : "Pricing"}</Eyebrow>
        <SectionTitle>{ar ? "اشتراك واحد. نظام مبيعات متكامل." : "One plan. A complete sales system."}</SectionTitle>
        <p className="mt-4 text-body text-muted">{ar ? "نجهّز سهل ونشغّله لنشاطك. جميع الأدوات الأساسية في خدمة واحدة." : "We set up and run Sahl for your business. All core tools in one managed service."}</p>
      </div>
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="mb-5 flex justify-center gap-2" role="group" aria-label={ar ? "اختر الدولة" : "Choose country"}>
          {(["uae", "sa"] as const).map((key) => (
            <button key={key} type="button" onClick={() => setMarket(key)} aria-pressed={market === key}
              className={`rounded-full border px-5 py-3 text-body font-bold transition-colors ${market === key ? "border-primary bg-primary text-white" : "border-line bg-surface text-ink hover:border-primary"}`}>
              {key === "uae" ? (ar ? "الإمارات" : "UAE") : (ar ? "السعودية" : "Saudi Arabia")}
            </button>
          ))}
        </div>
        <article className="rounded-card border-2 border-line bg-surface p-6 shadow-sm sm:p-9">
          <p className="text-center text-label font-bold text-primary">{ar ? "سهل فلو — خدمة مُدارة بالكامل" : "SahlFlow — fully managed service"}</p>
          <div className="mt-6 text-center">
            <p className="text-body text-muted">{ar ? "الاشتراك الشهري" : "Monthly subscription"}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">1,500</span>
              <span className="text-body font-bold">{currency}{ar ? " / شهريًا" : " / month"}</span>
            </div>
          </div>
          <div className="mt-7 rounded-card bg-surface-muted px-5 py-4 text-center">
            <p className="text-label text-muted">{ar ? "التأسيس والإعداد — دفعة واحدة" : "Setup and onboarding — one-time"}</p>
            <p className="mt-1 text-h3 font-extrabold">3,000 {currency}</p>
          </div>
          <h3 className="mt-8 text-h3 font-extrabold">{ar ? "كل ما تحتاجه للبدء" : "Everything you need to get started"}</h3>
          <ul className="mt-5 space-y-4">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <span aria-hidden="true" className="font-extrabold text-primary">✓</span><span>{item}</span>
              </li>
            ))}
          </ul>
          <WhatsAppCta label={ar ? "احجز عرضًا توضيحيًا لنشاطك" : "Book a demo for your business"} source={`pricing-${market}`} locale={copy.locale} className="mt-8 w-full justify-center" />
          <p className="mt-5 text-center text-label leading-relaxed text-muted">{copy.pricing.passthrough}</p>
        </article>
      </div>
    </Section>
  );
}
