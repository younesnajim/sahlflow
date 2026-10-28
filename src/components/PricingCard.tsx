"use client";

import { Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import type { SiteCopy } from "@/content/types";

export function PricingCard({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const groups = ar ? [
    { title: "مساعد ذكاء اصطناعي يعمل مع عملائك", items: ["ردود آلية على استفسارات واتساب على مدار الساعة", "محادثات طبيعية بالعربية والإنجليزية", "إجابات مبنية على معلومات نشاطك وخدماتك", "فهم الرسائل الصوتية العربية وتحويلها إلى نص", "جمع بيانات العميل وأسئلته أثناء المحادثة"] },
    { title: "إدارة واتساب والعملاء في مكان واحد", items: ["صندوق وارد مشترك لفريق العمل", "نظام CRM لحفظ جهات الاتصال والمحادثات", "تصنيف العملاء حسب الاهتمام والاحتياج", "مراحل واضحة لفرص البيع (Sales Pipeline)", "توزيع المحادثات وتحويلها للموظف عند الحاجة"] },
    { title: "متابعة ذكية تساعدك على البيع", items: ["تأهيل العملاء قبل تحويلهم لفريق المبيعات", "إنشاء فرص بيع من المحادثات المؤهلة", "رسائل متابعة آلية وفق مسارات متفق عليها", "تنظيم خطوات المتابعة حتى لا تضيع الفرص", "إمكانية إرسال حملات واتساب وفق ضوابط المنصة"] },
    { title: "نحن نجهّز النظام ونشغّله عنك", items: ["ربط واتساب وإعداد مساحة العمل", "تجهيز قاعدة معرفة المساعد وسلوكه", "إعداد التصنيفات ومراحل البيع والمتابعة", "اختبار المحادثات والمسارات قبل الإطلاق", "تدريب فريقك على استخدام النظام", "دعم وتحسين الإعدادات الأساسية ضمن نطاق الخدمة"] },
  ] : [
    { title: "AI assistant for your customers", items: ["24/7 automated WhatsApp replies", "Natural Arabic and English conversations", "Answers grounded in your business knowledge", "Arabic voice-note transcription", "Customer detail collection during conversations"] },
    { title: "WhatsApp and CRM in one place", items: ["Shared team inbox", "CRM with contacts and conversation history", "Lead tagging and segmentation", "Visual sales pipeline", "Team routing and human handoff"] },
    { title: "Smart sales follow-up", items: ["Lead qualification before sales handoff", "Deal creation for qualified leads", "Automated follow-up sequences within agreed scope", "Organized follow-up steps", "WhatsApp broadcasts subject to platform policies"] },
    { title: "We set it up and run it for you", items: ["WhatsApp connection and workspace setup", "AI knowledge base and behavior configuration", "Tags, pipeline and follow-up setup", "Pre-launch testing", "Team onboarding", "Core support and improvements within agreed scope"] },
  ];
  return (
    <Section id="pricing" tone="muted">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>{ar ? "الأسعار" : "Pricing"}</Eyebrow>
        <SectionTitle>{ar ? "اشتراك واحد. نظام مبيعات متكامل." : "One plan. A complete sales system."}</SectionTitle>
        <p className="mt-4 text-body text-muted">{ar ? "نجهّز سهل ونشغّله لنشاطك. جميع الأدوات الأساسية في خدمة واحدة." : "We set up and run Sahl for your business. All core tools in one managed service."}</p>
      </div>
      <div className="mx-auto mt-8 max-w-4xl">
        <article className="rounded-card border-2 border-line bg-surface p-6 shadow-sm sm:p-9">
          <p className="text-center text-label font-bold text-primary">{ar ? "سهل فلو — خدمة مُدارة بالكامل" : "SahlFlow — fully managed service"}</p>
          <div className="mt-6 text-center">
            <p className="text-body text-muted">{ar ? "الاشتراك الشهري" : "Monthly subscription"}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold tracking-tight sm:text-6xl">399</span>
              <span className="text-body font-bold">{ar ? "$ / شهريًا" : "$ / month"}</span>
            </div>
          </div>
          <div className="mt-7 rounded-card bg-surface-muted px-5 py-4 text-center">
            <p className="text-label text-muted">{ar ? "التأسيس والإعداد — دفعة واحدة" : "Setup and onboarding — one-time"}</p>
            <p className="mt-1 text-h3 font-extrabold">799 $</p>
          </div>
          <div className="mt-8 space-y-7">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-h3 font-extrabold">{group.title}</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body">
                      <span aria-hidden="true" className="font-extrabold text-primary">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <WhatsAppCta label={ar ? "احجز عرضًا توضيحيًا لنشاطك" : "Book a demo for your business"} source="pricing" locale={copy.locale} className="mt-8 w-full justify-center" />
          <p className="mt-5 text-center text-label leading-relaxed text-muted">{copy.pricing.passthrough}</p>
        </article>
      </div>
    </Section>
  );
}
