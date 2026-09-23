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
    ? [["01", "يفهم الرسالة"], ["02", "يؤهل العميل"], ["03", "يسجل في CRM"], ["04", "ينشئ فرصة"], ["05", "يتابع أو يحوّل للفريق"]]
    : [["01", "Understand"], ["02", "Qualify"], ["03", "Update CRM"], ["04", "Create opportunity"], ["05", "Follow up / handoff"]];
  const outcomes = ar
    ? [["12", "قدرة مترابطة"], ["7", "مراحل من الرسالة للفرصة"], ["1", "نظام للمحادثة والـCRM والمتابعة"]]
    : [["12", "connected capabilities"], ["7", "stages from message to opportunity"], ["1", "system for chat, CRM & follow-up"]];
  return (
    <section id="top" className="scroll-target overflow-hidden bg-surface py-12 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-line bg-surface-muted px-4 py-2 text-label font-bold text-primary">
              {ar ? "Done-for-you · WhatsApp + AI + CRM + Automation" : "Done-for-you · WhatsApp + AI + CRM + Automation"}
            </p>
            <h1 className="text-h1 font-extrabold text-balance">{hero.h1}</h1>
            <p className="mt-5 max-w-2xl text-lead text-muted">{hero.sub}</p>
            <p className="mt-4 max-w-2xl text-body font-bold">{ar ? "بدل أن يضيع وقت فريقك في الرد والفرز والتسجيل والتذكّر، يصل إليه العميل ومعه البيانات والسياق والخطوة التالية." : "Instead of spending team time answering, sorting, recording and remembering, the lead reaches your team with data, context and a clear next action."}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#fit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-bold text-on-primary transition-colors hover:bg-primary-deep">{hero.cta.label}</a>
              <a href="#demo" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-body font-bold text-primary transition-colors hover:bg-surface-sunken">{ar ? "جرّب المحادثة مباشرة" : "Try the live conversation"}</a>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
              {outcomes.map(([n,l])=><div key={l} className="rounded-card border border-line bg-surface-muted p-3"><p className="numeric text-h3 font-extrabold text-primary">{n}</p><p className="mt-1 text-label font-medium text-muted">{l}</p></div>)}
            </div>
          </div>
          <div className="relative rounded-card border border-line bg-surface-muted p-5 shadow-sm sm:p-7">
            <div className="absolute -top-3 end-5 rounded-full bg-primary px-3 py-1 text-label font-bold text-on-primary">{ar ? "من رسالة إلى عملية مبيعات" : "From message to sales process"}</div>
            <p className="text-label font-bold text-muted">{ar ? "ما يحدث خلف محادثة واحدة" : "What happens behind one conversation"}</p>
            <div className="mt-5 space-y-3">
              {flow.map(([n,label]) => <div key={label} className="flex items-center gap-3 rounded-card border border-line bg-surface p-4"><span className="numeric flex size-8 shrink-0 items-center justify-center rounded-full bg-tint text-label font-extrabold text-on-tint">{n}</span><span className="text-body font-bold">{label}</span><span className="ms-auto text-primary" aria-hidden="true">✓</span></div>)}
            </div>
            <p className="mt-5 rounded-card bg-ink px-4 py-3 text-body font-bold text-on-ink">{ar ? "فريقك لا يبدأ من الصفر: يرى من هو العميل، ماذا يريد، أين وصل، وما المطلوب الآن." : "Your team doesn't start from zero: they see who the lead is, what they want, where they stand and what happens next."}</p>
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
      <div className="mt-7 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
        {steps.map((step, i) => (
          <div key={step} className="min-w-44 rounded-card border border-line bg-surface p-4 lg:min-w-0">
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


/* ───────────────────── capabilities & business impact ───────────────────── */

export function Capabilities({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const items = ar ? [
    ["01", "صندوق وارد مشترك", "كل محادثات العملاء في مكان واحد مع تعيين المحادثة للموظف وإغلاقها وتحويلها عند الحاجة."],
    ["02", "AI يفهم نشاطك", "وكيل مضبوط على خدماتك وأسعارك وقواعدك وقاعدة معرفتك، وليس بوتاً عاماً يجيب من تلقاء نفسه."],
    ["03", "فهم الرسائل الصوتية العربية", "يحوّل الـVoice Notes العربية إلى نص ويدخلها في نفس مسار الفهم والتأهيل والمتابعة."],
    ["04", "تأهيل العملاء تلقائياً", "يسأل الأسئلة الصحيحة ويجمع الاحتياج والميزانية والتوقيت والبيانات التي تحددها لنشاطك."],
    ["05", "CRM وجهات اتصال", "كل عميل يصبح سجلاً منظماً مع بياناته ومحادثاته وحقوله وتصنيفاته بدلاً من بقائه رقماً داخل واتساب."],
    ["06", "Pipeline وفرص بيع", "إنشاء وتحديث الفرص ومراحل البيع حتى يرى الفريق من هو جديد، مؤهل، قيد المتابعة أو جاهز للخطوة التالية."],
    ["07", "متابعة تلقائية", "يبني متابعات للعملاء الذين لم يشتروا من أول محادثة وفق السيناريو والقواعد التي نعتمدها معك."],
    ["08", "تحويل ذكي للإنسان", "عندما تحتاج المحادثة موظفاً، ينتقل العميل للفريق مع السياق والبيانات بدلاً من بدء الحديث من الصفر."],
    ["09", "Dashboard وقياس النشاط", "رؤية المحادثات وجهات الاتصال والفرص وقيمة الصفقات والنشاط حتى لا تبقى المبيعات مخفية داخل الشات."],
    ["10", "Broadcasts وحملات إعادة التواصل", "إرسال رسائل معتمدة لشرائح العملاء وإعادة تنشيط قاعدة العملاء ضمن قواعد واتساب المعمول بها."],
    ["11", "Automations وFlows", "تشغيل إجراءات بناءً على رسالة أو كلمة أو Tag أو حقل: تحديث بيانات، إنشاء Deal، تعيين موظف، انتظار، شرط أو Webhook."],
    ["12", "Custom Automation", "عند الحاجة نربط CRM أو API أو حجوزات أو مدفوعات أو تقارير أو عمليات داخلية كمشروع مخصص منفصل."],
  ] : [
    ["01","Shared team inbox","Keep customer conversations in one place, assign them to teammates, close them and hand them off when needed."],
    ["02","AI trained on your business","An agent configured around your services, pricing, rules and knowledge base — not a generic chatbot."],
    ["03","Arabic voice-note understanding","Turn Arabic voice notes into text and route them through the same qualification and follow-up flow."],
    ["04","Automatic lead qualification","Ask the right questions and capture needs, budget, timing and the fields that matter to your business."],
    ["05","CRM & contacts","Turn each lead into a structured record with conversation context, custom fields and tags."],
    ["06","Pipeline & opportunities","Create and update deals and sales stages so the team sees what is new, qualified, in follow-up or ready to act."],
    ["07","Automated follow-up","Run agreed follow-up journeys for leads who do not buy in the first conversation."],
    ["08","Smart human handoff","Move a lead to your team with context and captured data instead of making the customer start again."],
    ["09","Dashboard & activity visibility","See conversations, contacts, opportunities, deal value and activity instead of leaving sales buried in chat."],
    ["10","Broadcasts & re-engagement","Send approved messages to customer segments and reactivate your database within WhatsApp rules."],
    ["11","Automations & flows","Trigger actions from messages, keywords, tags or fields: update data, create deals, assign, wait, branch or call webhooks."],
    ["12","Custom automation","When needed, connect CRM, APIs, bookings, payments, reporting or internal processes as a separately scoped project."],
  ];
  return (
    <Section id="capabilities" tone="muted">
      <Eyebrow>{ar ? "ماذا يوجد داخل النظام؟" : "What's inside the system?"}</Eyebrow>
      <SectionTitle>{ar ? "12 قدرة تعمل كمنظومة واحدة — من أول رسالة حتى فرصة البيع" : "12 capabilities working as one system — from first message to sales opportunity"}</SectionTitle>
      <p className="mt-4 max-w-3xl text-body text-muted">{ar ? "الفرق ليس ميزة AI واحدة. الفرق أن المحادثة، التأهيل، الـCRM، الـPipeline، المتابعة والأتمتة تعمل معاً وتترك لفريقك صورة واضحة عن كل عميل." : "The difference is not one AI feature. Conversation, qualification, CRM, pipeline, follow-up and automation work together so your team has a clear picture of every lead."}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([n,title,body]) => <article key={n} className="rounded-card border border-line bg-surface p-5">
          <span className="numeric text-label font-extrabold text-primary">{n}</span>
          <h3 className="mt-2 text-h3 font-extrabold">{title}</h3>
          <p className="mt-2 text-body text-muted">{body}</p>
        </article>)}
      </div>
    </Section>
  );
}

export function BusinessImpact({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const before = ar ? [
    "موظف يقرأ كل رسالة ويعيد نفس الإجابات يومياً",
    "Voice Notes تحتاج استماعاً يدوياً قبل معرفة المطلوب",
    "بيانات العميل تبقى موزعة داخل المحادثات",
    "الفريق يقرر يدوياً من الجاد ومن يحتاج متابعة",
    "Leads قد تختفي لأن لا أحد تذكّر المتابعة",
    "الإدارة تسأل الفريق لتعرف ماذا يحدث في المبيعات",
  ] : [
    "A teammate reads every message and repeats the same answers",
    "Voice notes require manual listening before the need is understood",
    "Customer data stays scattered across conversations",
    "The team manually decides who is serious and who needs follow-up",
    "Leads can disappear because nobody remembered to follow up",
    "Management asks the team to understand what is happening in sales",
  ];
  const after = ar ? [
    "AI يتعامل مع الأسئلة الأولية وفق معرفة شركتك",
    "الصوت يتحول إلى بيانات قابلة للفهم والمعالجة",
    "كل Lead يُنظم داخل Contacts وحقول وTags",
    "التأهيل يُنفذ بنفس القواعد على كل المحادثات",
    "المتابعات تعمل وفق السيناريو بدل الاعتماد على الذاكرة",
    "الفرص والـPipeline والنشاط مرئية في النظام",
  ] : [
    "AI handles initial questions using your business knowledge",
    "Voice becomes structured information the system can process",
    "Each lead is organized into contacts, fields and tags",
    "Qualification follows the same rules across conversations",
    "Follow-up runs by workflow instead of human memory",
    "Opportunities, pipeline and activity are visible in the system",
  ];
  return (
    <Section id="impact">
      <Eyebrow>{ar ? "أين توفر الوقت والجهد؟" : "Where do you save time and effort?"}</Eyebrow>
      <SectionTitle>{ar ? "نقل العمل المتكرر من فريقك إلى النظام" : "Move repetitive sales work from your team into the system"}</SectionTitle>
      <p className="mt-4 max-w-3xl text-body text-muted">{ar ? "لا نضع نسبة توفير وهمية قبل أن نرى أرقام نشاطك. ما نستطيع أن نوضحه هو أين يختفي العمل اليدوي، وأين يبقى الإنسان للقرار والبيع والعلاقة مع العميل." : "We do not invent a savings percentage before seeing your operation. We show exactly where manual work is removed and where your people stay focused on judgment, selling and customer relationships."}</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-surface-muted p-6"><p className="text-h3 font-extrabold">{ar ? "بدون Sahl Flow" : "Without Sahl Flow"}</p><ul className="mt-4 space-y-3">{before.map(x=><li key={x} className="text-body text-muted">— {x}</li>)}</ul></div>
        <div className="rounded-card border-2 border-primary bg-surface p-6"><p className="text-h3 font-extrabold text-primary">{ar ? "مع Sahl Flow" : "With Sahl Flow"}</p><ul className="mt-4 space-y-3">{after.map(x=><li key={x} className="flex gap-2 text-body"><CheckMark/><span>{x}</span></li>)}</ul></div>
      </div>
      <p className="mt-6 rounded-card bg-ink px-5 py-4 text-h3 font-bold text-on-ink">{ar ? "الهدف ليس استبدال فريق المبيعات. الهدف أن يصل الموظف إلى العميل ومعه السياق والبيانات والخطوة التالية — بدل أن يضيع وقته في الفرز والتسجيل والتذكّر." : "The goal is not to replace your sales team. It is to give them the context, data and next step — instead of spending their time sorting, recording and remembering."}</p>
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
  const ar = copy.locale === "ar";
  const setup = ar ? [
    "جلسة فهم رحلة البيع وتحديد نقاط التأهيل والتحويل",
    "ربط واتساب وتجهيز بيئة العمل الخاصة بشركتك",
    "إعداد الوكيل: السلوك، التعليمات، الخدمات والأسعار وقاعدة المعرفة",
    "بناء أسئلة التأهيل والحقول المخصصة والـTags",
    "إعداد Contacts والـPipeline ومراحل الفرص",
    "بناء المتابعات الأساسية والتحويل للموظف",
    "اختبار سيناريوهات حقيقية وضبط الردود قبل الإطلاق",
    "تدريب الفريق وإطلاق النظام",
  ] : [
    "Sales-journey discovery and qualification/handoff mapping",
    "WhatsApp connection and company workspace setup",
    "Agent behavior, instructions, services, pricing and knowledge base",
    "Qualification questions, custom fields and tags",
    "Contacts, pipeline and opportunity stages",
    "Core follow-up journeys and human handoff",
    "Real-scenario testing and response tuning before launch",
    "Team training and launch",
  ];
  const monthly = ar ? [
    "تشغيل واستضافة النظام الحالي ومتابعة حالته",
    "Inbox وContacts وPipelines وDashboard وBroadcasts والـAI",
    "تحديث قاعدة المعرفة عند تغير خدماتك أو معلوماتك",
    "تحسين الردود والتأهيل والمتابعات الموجودة",
    "دعم ومراقبة المشاكل التشغيلية ضمن النطاق",
    "تحسين مستمر على الرحلة الحالية بناءً على الاستخدام",
  ] : [
    "Operation, hosting and monitoring of the existing system",
    "Inbox, contacts, pipelines, dashboard, broadcasts and AI",
    "Knowledge-base updates when your services or information change",
    "Tuning of existing replies, qualification and follow-up",
    "Operational support and monitoring within scope",
    "Ongoing improvement of the existing journey based on usage",
  ];
  return (
    <Section id="pricing">
      <Eyebrow>{pricing.eyebrow}</Eyebrow>
      <SectionTitle>{ar ? "أنت لا تدفع مقابل Login — أنت تدفع مقابل نظام يتم بناؤه وتشغيله لك" : "You're not paying for a login — you're paying for a system built and operated for you"}</SectionTitle>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <article className="rounded-card border-2 border-primary bg-surface p-6 sm:p-7">
          <p className="text-label font-bold text-primary">{ar ? "مرة واحدة — التنفيذ والإطلاق" : "One time — implementation & launch"}</p>
          <p className="numeric mt-2 text-price font-extrabold">{ar ? "٦٬٥٠٠ درهم" : "AED 6,500"}</p>
          <p className="mt-3 text-body text-muted">{ar ? "نحوّل طريقة البيع لديك إلى نظام جاهز للعمل مع فريقك." : "We turn your sales process into a working system for your team."}</p>
          <ul className="mt-5 space-y-3">{setup.map(x=><li key={x} className="flex gap-2 text-body"><CheckMark/><span>{x}</span></li>)}</ul>
        </article>
        <article className="rounded-card border border-line bg-surface-muted p-6 sm:p-7">
          <p className="text-label font-bold text-primary">{ar ? "شهرياً — التشغيل والإدارة والتحسين" : "Monthly — operation, management & improvement"}</p>
          <p className="numeric mt-2 text-price font-extrabold">{ar ? "٢٬٠٠٠ درهم / شهر" : "AED 2,000 / month"}</p>
          <p className="mt-3 text-body text-muted">{ar ? "بعد الإطلاق لا نتركك وحدك مع الأداة؛ نستمر في تشغيل وتحسين النظام الموجود." : "After launch, we do not leave you alone with the tool; we keep the existing system running and improving."}</p>
          <ul className="mt-5 space-y-3">{monthly.map(x=><li key={x} className="flex gap-2 text-body"><CheckMark/><span>{x}</span></li>)}</ul>
        </article>
      </div>
      <div className="mt-5 rounded-card border border-line bg-surface p-5">
        <p className="font-extrabold">{ar ? "حدود واضحة حتى تعرف ماذا تدفع مقابله" : "Clear boundaries so you know what you're paying for"}</p>
        <p className="mt-2 text-body text-muted">{pricing.passthrough}</p>
        <p className="mt-2 text-body font-bold">{pricing.lockIn}</p>
      </div>
      <div className="mt-6"><a href="#fit" className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-bold text-on-primary transition-colors hover:bg-primary-deep">{pricing.cta.label}</a></div>
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


/* ─────────────────────────── CRM & automation ─────────────────────────── */

export function CrmAutomation({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const crm = ar ? [
    ["01","Contact","الاسم، الرقم، المصدر، الاهتمام، الحقول المخصصة والـTags في سجل واحد."],
    ["02","Qualification","إجابات التأهيل تُحفظ كبيانات، لا تضيع داخل تاريخ المحادثة."],
    ["03","Opportunity","عندما يصبح العميل فرصة، ينشئ النظام Deal ويربطها بالعميل."],
    ["04","Pipeline","تتحرك الفرصة بين مراحل البيع حتى يعرف الفريق أين يقف كل Lead."],
    ["05","Next action","متابعة أو حجز أو تحويل لموظف أو إغلاق — الخطوة التالية واضحة."],
  ] : [
    ["01","Contact","Name, number, source, interest, custom fields and tags in one record."],
    ["02","Qualification","Qualification answers become data instead of disappearing inside chat history."],
    ["03","Opportunity","When a lead becomes an opportunity, the system creates a deal tied to the contact."],
    ["04","Pipeline","The opportunity moves through sales stages so the team knows where every lead stands."],
    ["05","Next action","Follow-up, booking, human handoff or close — the next action stays clear."],
  ];
  const automations = ar ? [
    "رسالة جديدة → فهم المحتوى → تحديث Contact",
    "Lead مؤهل → إنشاء Opportunity في الـPipeline",
    "لا يوجد رد → Follow-up حسب السيناريو المعتمد",
    "كلمة أو Tag أو Field → تشغيل إجراء أو Flow",
    "حالة تحتاج إنساناً → Assign للموظف مع كامل السياق",
    "تغيير مرحلة البيع → تحديث البيانات وتشغيل الخطوة التالية",
  ] : [
    "New message → understand intent → update contact",
    "Qualified lead → create pipeline opportunity",
    "No response → run the agreed follow-up journey",
    "Keyword, tag or field → trigger an action or flow",
    "Human-needed case → assign with full context",
    "Sales-stage change → update data and trigger the next step",
  ];
  return (
    <Section id="crm">
      <Eyebrow>{ar ? "CRM + Pipeline + Automation" : "CRM + Pipeline + Automation"}</Eyebrow>
      <SectionTitle>{ar ? "المحادثة لا تبقى محادثة — تتحول إلى سجل وفرصة وخطوة تالية" : "A conversation becomes a record, an opportunity and a next action"}</SectionTitle>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-card border border-line bg-surface-muted p-6">
          <p className="text-h3 font-extrabold">{ar ? "ماذا يرى فريق المبيعات؟" : "What does your sales team see?"}</p>
          <div className="mt-5 space-y-3">{crm.map(([n,t,b])=><div key={n} className="rounded-card border border-line bg-surface p-4"><div className="flex gap-3"><span className="numeric font-extrabold text-primary">{n}</span><div><p className="font-extrabold">{t}</p><p className="mt-1 text-body text-muted">{b}</p></div></div></div>)}</div>
        </div>
        <div className="rounded-card border-2 border-primary bg-surface p-6">
          <p className="text-h3 font-extrabold text-primary">{ar ? "أمثلة على ما يعمل تلقائياً" : "Examples of what runs automatically"}</p>
          <div className="mt-5 space-y-4">{automations.map(x=><div key={x} className="flex gap-3"><CheckMark/><span className="text-body font-medium">{x}</span></div>)}</div>
          <p className="mt-6 rounded-card bg-tint/30 p-4 text-body font-bold">{ar ? "بدل أن يكون واتساب صندوق رسائل منفصلاً عن المبيعات، يصبح مدخلاً لنظام المبيعات نفسه." : "Instead of WhatsApp being separate from sales operations, it becomes an entry point into the sales system itself."}</p>
        </div>
      </div>
    </Section>
  );
}

export function UseCases({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const cases = ar ? [
    ["مدربون وبائعو الدورات","يسأل العميل عن البرنامج → النظام يجيب من المعرفة → يجمع الهدف والاهتمام → يؤهل → يتابع → يحوّل الجاهز للفريق."],
    ["العقارات","استثمار أم سكن → المنطقة → الميزانية → نوع العقار → التوقيت → Lead منظم + Opportunity + تحويل للوسيط المناسب."],
    ["العيادات","الخدمة المطلوبة → أسئلة أولية → بيانات العميل → متابعة أو تحويل للموظف → ويمكن ربط الحجوزات حسب النظام المستخدم."],
    ["مراكز التعليم","البرنامج → العمر/المستوى → الموعد → بيانات ولي الأمر أو الطالب → متابعة → فرصة تسجيل واضحة للفريق."],
  ] : [
    ["Coaches & course sellers","Program question → knowledge-based answer → capture goal and interest → qualify → follow up → hand ready leads to the team."],
    ["Real estate","Investment or home → area → budget → property type → timeline → structured lead + opportunity + broker handoff."],
    ["Clinics","Requested service → initial questions → contact data → follow-up or staff handoff → booking can be integrated where supported."],
    ["Education centres","Program → age/level → timing → parent or student details → follow-up → clear enrollment opportunity."],
  ];
  return (
    <Section id="use-cases" tone="muted">
      <Eyebrow>{ar ? "ليس Demo عاماً" : "Not a generic demo"}</Eyebrow>
      <SectionTitle>{ar ? "نفس المحرك — لكن رحلة البيع تُبنى حسب نشاطك" : "One engine — a sales journey built around your business"}</SectionTitle>
      <div className="mt-8 grid gap-4 md:grid-cols-2">{cases.map(([t,b])=><article key={t} className="rounded-card border border-line bg-surface p-5"><h3 className="text-h3 font-extrabold">{t}</h3><p className="mt-3 text-body text-muted">{b}</p></article>)}</div>
    </Section>
  );
}

export function Differentiation({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const rows = ar ? [
    ["أداة جاهزة","تفتح حساباً وتبدأ أنت بالإعداد","نبدأ بفهم رحلة مبيعاتك ثم ننفذها"],
    ["AI Chatbot","التركيز على الرد","الرد + التأهيل + البيانات + الفرصة + المتابعة"],
    ["CRM منفصل","الفريق ينقل البيانات أو يربط عدة أدوات","المحادثة تدخل مباشرة إلى Contacts والـPipeline"],
    ["Automation DIY","أنت تبني وتختبر وتحل المشاكل","نحن نبني ونربط ونختبر ونحسّن معك"],
    ["لغة عربية مضافة","تعريب واجهة أو ترجمة","Arabic-first + RTL + فهم Voice Notes العربية"],
  ] : [
    ["Off-the-shelf tool","You open an account and configure it yourself","We start with your sales journey and implement it"],
    ["AI chatbot","Focuses on answering","Answering + qualification + data + opportunity + follow-up"],
    ["Separate CRM","Team moves data or connects several tools","Conversation feeds contacts and pipeline directly"],
    ["DIY automation","You build, test and troubleshoot","We build, connect, test and improve it with you"],
    ["Arabic added later","Translated UI or messages","Arabic-first + RTL + Arabic voice-note understanding"],
  ];
  return (
    <Section id="difference">
      <Eyebrow>{ar ? "لماذا Sahl Flow مختلف؟" : "Why Sahl Flow is different"}</Eyebrow>
      <SectionTitle>{ar ? "لا نبيعك برنامجاً ثم نترك لك مهمة بناء النظام" : "We don't sell you software and leave you to build the system"}</SectionTitle>
      <div className="mt-8 overflow-x-auto rounded-card border border-line">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[.7fr_1fr_1fr] bg-ink px-5 py-4 font-bold text-on-ink"><span>{ar?"المقارنة":"Compare"}</span><span>{ar?"الطريقة التقليدية":"Typical approach"}</span><span className="text-tint">Sahl Flow</span></div>
          {rows.map(([a,b,c])=><div key={a} className="grid grid-cols-[.7fr_1fr_1fr] border-t border-line px-5 py-4 text-body"><strong>{a}</strong><span className="text-muted">{b}</span><span className="font-bold">{c}</span></div>)}
        </div>
      </div>
    </Section>
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
    ? ["نشاط تجاري مرخّص", "رقم مخصص للعمل", "حوالي ٥٠ محادثة واتساب أو أكثر أسبوعياً", "حاجة فعلية للتأهيل والمتابعة"]
    : ["Licensed business", "Dedicated business number", "Roughly 50+ WhatsApp conversations per week", "A real need for qualification and follow-up"];
  return (
    <Section id="fit" tone="muted">
      <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-start">
        <div>
          <Eyebrow>{ar ? "هل يناسبك Sahl Flow؟" : "Is Sahl Flow a fit?"}</Eyebrow>
          <SectionTitle>{ar ? "قبل المكالمة، نتأكد أن النظام مناسب لنشاطك" : "Before a call, we make sure the system fits your business"}</SectionTitle>
          <p className="mt-4 max-w-prose text-body text-muted">{ar ? "Sahl Flow ليس مناسباً لكل نشاط. نفضّل العمل مع الشركات التي لديها حجم محادثات واضح وتريد تحويل واتساب إلى عملية مبيعات منظمة." : "Sahl Flow is not for every business. We focus on companies with meaningful conversation volume that want to turn WhatsApp into a structured sales process."}</p>
          <div className="mt-6 grid gap-3">
            {items.map((item) => <div key={item} className="flex items-start gap-3"><CheckMark /><span className="text-body font-medium">{item}</span></div>)}
          </div>
        </div>
        <div className="rounded-card border-2 border-primary bg-surface p-6">
          <p className="text-h3 font-extrabold">{ar ? "الخطوة الأولى: مراجعة سريعة لنشاطك" : "First step: a quick business fit check"}</p>
          <p className="mt-3 text-body text-muted">{ar ? "أرسل لنا نوع النشاط، حجم رسائل واتساب التقريبي، وهل لديك رقم عمل مخصص. إذا كان هناك توافق، ننتقل لمكالمة تعريفية ونرسم رحلة المبيعات المطلوبة." : "Send us your business type, approximate WhatsApp volume and whether you have a dedicated business number. If there is a fit, we move to a discovery call and map the sales journey."}</p>
          <div className="mt-6">
            <WhatsAppCta label={ar ? "ابدأ التقييم السريع" : "Start the fit check"} source="faq" locale={copy.locale} full />
          </div>
          <p className="mt-3 text-center text-label text-muted">{ar ? "لديك سؤال فقط؟ يمكنك استخدام نفس المحادثة." : "Just have a question? You can use the same chat."}</p>
        </div>
      </div>
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
          <a href="#fit" className="inline-flex shrink-0 items-center justify-center rounded-full bg-on-primary px-6 py-3 text-body font-bold text-primary transition-colors hover:bg-tint">
            {finalCta.cta.label}
          </a>
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
