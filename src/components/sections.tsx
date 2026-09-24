import { Container, Eyebrow, Section, SectionTitle, WhatsAppCta } from "./ui";
import { DemoWidget } from "./DemoWidget";
import { HeroMetrics } from "./HeroMetrics";
import { Logo } from "./Logo";
import { formatNumber } from "@/lib/format";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/whatsapp";
import type { SiteCopy } from "@/content/types";

/* ─────────────────────────────── hero ──────────────────────────────── */

export function Hero({ copy }: { copy: SiteCopy }) {
  const { hero } = copy;
  const ar = copy.locale === "ar";
  return (
    <section id="top" className="sales-section soft-grid scroll-target overflow-hidden bg-surface py-10 sm:py-16">
      <Container>
        <HeroMetrics locale={copy.locale} />
        <div className="mx-auto mt-10 max-w-4xl text-center sm:mt-14">
          <p className="mb-4 inline-flex rounded-full border border-line bg-surface-muted px-4 py-2 text-label font-bold text-primary">
            Done-for-you · WhatsApp + AI + CRM + Automation
          </p>
          <h1 className="text-h1 font-extrabold text-balance">{hero.h1}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lead text-muted">{hero.sub}</p>
          <p className="mx-auto mt-4 max-w-3xl text-body font-bold">{ar ? "سهل يفهم الاستفسار، يؤهل العميل، يسجل بياناته ويتابع معه — حتى يصل فريقك للعميل ومعه السياق والخطوة التالية." : "Sahl understands the enquiry, qualifies the lead, records the data and follows up — so your team receives the customer with context and a clear next step."}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#fit" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-bold text-on-primary transition-colors hover:bg-primary-deep">{hero.cta.label}</a>
            <a href="#system" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-body font-bold text-primary transition-colors hover:bg-surface-sunken">{ar ? "شاهد كيف يعمل" : "See how it works"}</a>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label font-bold text-muted">
            <span>✓ {ar ? "ذكاء اصطناعي يفهم العربية" : "AI that understands Arabic"}</span>
            <span>✓ CRM & Pipeline</span>
            <span>✓ {ar ? "متابعة وأتمتة" : "Follow-up & Automation"}</span>
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
    ? ["العميل يرسل", "سهل يفهم", "يسأل ويجمع التفاصيل", "يحفظ المعلومات", "يحدد المرحلة", "يتابع في الوقت المناسب", "يسلّم لفريقك عند الحاجة"]
    : ["WhatsApp message", "Understand", "Qualify", "Capture data", "Create opportunity", "Follow up", "Handoff"];

  return (
    <Section id="system" tone="muted">
      <Eyebrow>{video.eyebrow}</Eyebrow>
      <SectionTitle>{video.title}</SectionTitle>
      <p className="mt-4 max-w-prose text-body text-muted">{video.placeholder}</p>
      <div className="relative mt-9">
        <div className="absolute inset-inline-0 top-6 hidden h-px bg-line lg:block" aria-hidden="true" />
        <div className="relative flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {steps.map((step, i) => (
            <div key={step} className="min-w-44 lg:min-w-0">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border-4 border-surface bg-primary text-body font-extrabold text-on-primary shadow-sm">
                <span className="numeric">{formatNumber(i + 1, copy.locale)}</span>
              </div>
              <div className="lift-card mt-3 min-h-24 rounded-card border border-line bg-surface p-4 text-center shadow-sm">
                <p className="text-body font-bold">{step}</p>
              </div>
            </div>
          ))}
        </div>
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
        <SectionTitle>{ar ? "جرّب بنفسك — اختبر المحادثة" : "Don't take our word for it — test the conversation"}</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-body text-muted">{ar ? "اختر عيادة أو عقارات، واكتب كأنك عميل حقيقي. في سيناريو العقارات سترى كيف تتحول الإجابات إلى بطاقة Lead واضحة للفريق." : "Choose a clinic or real estate scenario and write like a real customer. In real estate, watch the answers become a structured lead card for the team."}</p>
      </div>
      <div className="mx-auto mt-8 max-w-3xl">
        {copy.demo.languageNote && <p className="mb-2.5 text-label font-medium text-muted">{copy.demo.languageNote}</p>}
        <DemoWidget copy={copy} />
      </div>
    </Section>
  );
}


export function CostOfManualWork({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const leaks = ar ? [
    ["نفس الأسئلة كل يوم","السعر؟ الموقع؟ المواعيد؟ التفاصيل؟ فريقك يعيد نفس الإجابات بينما يمكن للنظام أن يتولاها."],
    ["مين الجاد ومين فقط يسأل؟","بدل أن يقرأ الموظف عشرات المحادثات ليكتشف ذلك، سهل يجمع المعلومات التي تساعد على معرفة الأولوية."],
    ["المعلومات تبقى في الشات","اسم العميل واحتياجه وميزانيته لا يجب أن تبقى بين عشرات الرسائل. تتحول إلى سجل واضح يمكن الرجوع إليه."],
    ["لما الموظف ينسى يتابع","وهنا يضيع كثير من العملاء. المتابعة تصبح خطوة منظمة بدل أن تعتمد على ذاكرة الموظف."],
  ] : [
    ["Repeated replies","The same questions, pricing and service information consume team time every day."],
    ["Manual sorting","A teammate reads conversations to decide who is serious and what they need."],
    ["Data entry","Names, numbers and needs are copied into a CRM or sheet — or never recorded."],
    ["Memory-based follow-up","An interested lead can disappear tomorrow if nobody remembers to follow up."],
  ];
  return (
    <Section tone="muted">
      <Eyebrow>{ar ? "هل هذا يحدث عندكم؟" : "Where do time and leads leak?"}</Eyebrow>
      <SectionTitle>{ar ? "المشكلة ليست في واتساب… المشكلة في كل ما يحدث بعد وصول الرسالة" : "Not every message needs a person from start to finish"}</SectionTitle>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{leaks.map(([t,b])=><article key={t} className="lift-card rounded-card border border-line bg-surface p-5"><h3 className="text-h3 font-extrabold">{t}</h3><p className="mt-2 text-body text-muted">{b}</p></article>)}</div>
      <p className="mt-6 text-body font-bold">{ar ? "سهل يتولى الجزء المتكرر والمنظم من الرحلة. ويبقى فريقك للمواقف التي تحتاج إنساناً: تفاوض، قرار، إقناع وعلاقة مع العميل." : "Sahl moves repetitive work into the system while your team stays involved where negotiation, judgment and human relationships matter."}</p>
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
    ["01","يرد وهو فاهم شغلك","يتعامل مع الأسئلة الأولى اعتماداً على خدماتك ومعلوماتك وقواعدك، وليس بإجابات عامة."],
    ["02","يفهم النص والصوت","العميل يكتب أو يرسل Voice Note بالعربي؛ المعلومة تدخل نفس الرحلة."],
    ["03","يسأل بدل أن يخمّن","يجمع الأسئلة المهمة التي تحددها: الاحتياج، الميزانية، التوقيت أو أي معلومة يحتاجها فريقك."],
    ["04","يحفظ ما عرفه","بيانات العميل واهتمامه وإجاباته تصبح في سجل واضح بدل أن تبقى مدفونة داخل المحادثة."],
    ["05","يعرف أين وصل العميل","جديد، يحتاج متابعة، جاد أو جاهز للموظف — المرحلة والخطوة التالية واضحتان."],
    ["06","يتابع في الوقت المناسب","إذا لم يشترِ العميل من أول مرة، تعمل المتابعة وفق السيناريو الذي نبنيه معك."],
    ["07","يسلّم لفريقك بدون إعادة القصة","عندما يحتاج العميل تدخل موظف من الشركة، يصل للموظف ومعه السياق والمعلومات التي جُمعت."],
    ["08","يعطي الإدارة صورة واضحة","ترى المحادثات والعملاء والفرص والنشاط بدل أن تبقى المبيعات موزعة بين الشات والذاكرة."],
  ] : [
    ["01","Replies with business context","Handles initial questions using your services, information and rules rather than generic answers."],
    ["02","Understands text and voice","Customers can type or send Arabic voice notes and both enter the same journey."],
    ["03","Asks instead of guessing","Collects the information your team needs: need, budget, timing or your own qualification fields."],
    ["04","Keeps what it learns","Customer details, interest and answers become a clear record rather than buried chat history."],
    ["05","Shows where each lead stands","New, follow-up, serious or ready for a person — stage and next step stay clear."],
    ["06","Follows up at the right time","If a lead does not buy immediately, follow-up runs through the journey we build with you."],
    ["07","Hands off with context","When a human is needed, your teammate receives the conversation with the information already captured."],
    ["08","Gives management visibility","See conversations, customers, opportunities and activity instead of sales living in chat and memory."],
  ];
  return (
    <Section id="capabilities" tone="muted">
      <Eyebrow>{ar ? "ماذا يفعل سهل فعلياً؟" : "What does Sahl actually do?"}</Eyebrow>
      <SectionTitle>{ar ? "يأخذ الأعمال التي تتكرر مع كل عميل… ويرتبها في رحلة واحدة" : "It takes the work repeated for every lead and organizes it into one journey"}</SectionTitle>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map(([n,title,body]) => <article key={n} className="lift-card group rounded-card border border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start gap-4"><span className="numeric flex size-10 shrink-0 items-center justify-center rounded-full bg-tint font-extrabold text-primary-deep">{n}</span><div><h3 className="text-h3 font-extrabold">{title}</h3><p className="mt-2 text-body text-muted">{body}</p></div></div>
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
    "AI يتعامل مع الأسئلة الأولية وفق معرفته بشركتك",
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
      <Eyebrow>{ar ? "قبل سهل وبعده" : "Where do you save time and effort?"}</Eyebrow>
      <SectionTitle>{ar ? "فريقك لا يحتاج أن يعمل كأنه دفتر ملاحظات بشري" : "Move repetitive sales work from your team into the system"}</SectionTitle>
      <p className="mt-4 max-w-3xl text-body text-muted">{ar ? "الردود المتكررة، فرز العملاء، تسجيل المعلومات والتذكير بالمتابعة يمكن تنظيمها داخل النظام. أما البيع الحقيقي والعلاقة مع العميل فتبقى لفريقك." : "We do not invent a savings percentage before seeing your operation. We show exactly where manual work is removed and where your people stay focused on judgment, selling and customer relationships."}</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-card border border-line bg-surface-muted p-6"><p className="text-h3 font-extrabold">{ar ? "اليوم" : "Without Sahl"}</p><ul className="mt-4 space-y-3">{before.map(x=><li key={x} className="text-body text-muted">— {x}</li>)}</ul></div>
        <div className="rounded-card border-2 border-primary bg-surface p-6"><p className="text-h3 font-extrabold text-primary">{ar ? "بعد تنظيم الرحلة مع سهل" : "With Sahl"}</p><ul className="mt-4 space-y-3">{after.map(x=><li key={x} className="flex gap-2 text-body"><CheckMark/><span>{x}</span></li>)}</ul></div>
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
  const ar = copy.locale === "ar";
  const factors = ar ? [
    "حجم محادثات العملاء التي تصل إلى واتساب",
    "طريقة التأهيل والمتابعة الحالية",
    "عدد أفراد الفريق وطريقة توزيع المحادثات",
    "الأنظمة أو الحجوزات أو البيانات التي تحتاج إلى ربط",
  ] : [
    "Your WhatsApp conversation volume",
    "Your current qualification and follow-up process",
    "Team size and conversation routing",
    "Systems, booking or data integrations required",
  ];
  return (
    <Section id="pricing">
      <Eyebrow>{ar ? "قبل أن نقدم لك عرضاً" : "Before we propose a solution"}</Eyebrow>
      <SectionTitle>{ar ? "نريد أولاً أن نعرف: هل سهل مناسب لشركتك؟" : "First, we want to know whether Sahl fits your business"}</SectionTitle>
      <p className="mt-4 max-w-3xl text-lead text-muted">{ar ? "كل شركة تعمل بطريقة مختلفة. لذلك لا نضع سعراً عاماً ثم نحاول إجبار احتياجك داخل باقة جاهزة. نفهم العملية أولاً، ثم نحدد ما الذي يجب بناؤه وتشغيله." : "Every business operates differently. We understand the process first, then define what should be built and operated."}</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">{factors.map(x=><div key={x} className="flex gap-3 rounded-card border border-line bg-surface-muted p-4 text-body"><CheckMark/><span>{x}</span></div>)}</div>
      <div className="mt-7 rounded-card bg-ink p-6 text-on-ink sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div><p className="text-h3 font-extrabold">{ar ? "التقييم الأولي قصير — وليس مكالمة بيع طويلة" : "The initial fit check is short — not a long sales call"}</p><p className="mt-2 text-body opacity-80">{ar ? "نعرف حجم العمل والمشكلة والجاهزية، ثم نحدد الخطوة المناسبة." : "We learn the volume, problem and readiness, then recommend the right next step."}</p></div>
        <a href="#fit" className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-body font-bold text-on-primary sm:mt-0">{ar ? "ابدأ التقييم السريع" : "Start the fit check"}</a>
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


/* ─────────────────────────── CRM & automation ─────────────────────────── */

export function CrmAutomation({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const crm = ar ? [
    ["01","ملف العميل","الاسم والرقم ومصدر العميل واهتمامه والمعلومات المهمة في مكان واحد."],
    ["02","ما الذي عرفناه عنه؟","إجابات الأسئلة المهمة تُحفظ كمعلومات واضحة، لا تضيع داخل تاريخ المحادثة."],
    ["03","هل أصبح فرصة بيع؟","عندما يصبح العميل جاداً، يظهر كفرصة واضحة مرتبطة بملفه ومحادثته."],
    ["04","أين وصل؟","يتحرك العميل بين مراحل البيع حتى يعرف الفريق من يحتاج متابعة ومن أصبح جاهزاً للخطوة التالية."],
    ["05","ماذا بعد؟","متابعة، موعد، تحويل لموظف أو إغلاق — الخطوة التالية لا تبقى في رأس الموظف."],
  ] : [
    ["01","Contact","Name, number, source, interest, custom fields and tags in one record."],
    ["02","Qualification","Qualification answers become data instead of disappearing inside chat history."],
    ["03","Opportunity","When a lead becomes an opportunity, the system creates a deal tied to the contact."],
    ["04","Pipeline","The opportunity moves through sales stages so the team knows where every lead stands."],
    ["05","Next action","Follow-up, booking, human handoff or close — the next action stays clear."],
  ];
  const automations = ar ? [
    "رسالة جديدة → فهم المطلوب → تحديث ملف العميل",
    "عميل جاد → تسجيله كفرصة بيع في مرحلته المناسبة",
    "العميل لم يرد → متابعة في الوقت الذي اتفقنا عليه",
    "إجابة أو تصنيف معين → تشغيل الخطوة المناسبة تلقائياً",
    "المحادثة تحتاج إنساناً → تحويلها للموظف ومعها كل السياق",
    "تغيّرت مرحلة العميل → تحديث حالته وتشغيل الخطوة التالية",
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
      <Eyebrow>{ar ? "لن تسأل: وين راح هالعميل؟" : "CRM + Pipeline + Automation"}</Eyebrow>
      <SectionTitle>{ar ? "كل عميل له قصة واضحة… من أول رسالة إلى آخر متابعة" : "A conversation becomes a record, an opportunity and a next action"}</SectionTitle>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-card border border-line bg-surface-muted p-6">
          <p className="text-h3 font-extrabold">{ar ? "عندما يفتح موظفك العميل، يعرف فوراً:" : "What does your sales team see?"}</p>
          <div className="relative mt-6 space-y-4 before:absolute before:bottom-5 before:top-5 before:w-px before:bg-line before:start-4">{crm.map(([n,t,b])=><div key={n} className="relative flex gap-4"><span className="numeric z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-label font-extrabold text-on-primary">{n}</span><div className="lift-card flex-1 rounded-card border border-line bg-surface p-4"><p className="font-extrabold">{t}</p><p className="mt-1 text-body text-muted">{b}</p></div></div>)}</div>
        </div>
        <div className="rounded-card border-2 border-primary bg-surface p-6">
          <p className="text-h3 font-extrabold text-primary">{ar ? "وما الذي يمكن أن يحدث تلقائياً؟" : "Examples of what runs automatically"}</p>
          <div className="mt-5 space-y-4">{automations.map(x=><div key={x} className="flex gap-3"><CheckMark/><span className="text-body font-medium">{x}</span></div>)}</div>
          <p className="mt-6 rounded-card bg-tint/30 p-4 text-body font-bold">{ar ? "واتساب يبقى مكان المحادثة مع العميل، لكن خلفه تصبح لديك عملية مبيعات مرتبة يمكن إدارتها ومتابعتها." : "Instead of WhatsApp being separate from sales operations, it becomes an entry point into the sales system itself."}</p>
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
      <Eyebrow>{ar ? "يتشكل حسب طريقة بيعك" : "Not a generic demo"}</Eyebrow>
      <SectionTitle>{ar ? "عيادة ليست مثل شركة عقارات… لذلك لا نبني للجميع نفس الرحلة" : "One engine — a sales journey built around your business"}</SectionTitle>
      <div className="mt-8 grid gap-4 md:grid-cols-2">{cases.map(([t,b])=><article key={t} className="lift-card rounded-card border border-line bg-surface p-5"><h3 className="text-h3 font-extrabold">{t}</h3><p className="mt-3 text-body text-muted">{b}</p></article>)}</div>
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
      <Eyebrow>{ar ? "الفرق في طريقة التنفيذ" : "Why Sahl is different"}</Eyebrow>
      <SectionTitle>{ar ? "لا نعطيك أداة ونقول لك: دبّر حالك" : "We don't sell you software and leave you to build the system"}</SectionTitle>
      <div className="mt-8 overflow-x-auto rounded-card border border-line">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[.7fr_1fr_1fr] bg-ink px-5 py-4 font-bold text-on-ink"><span>{ar?"المقارنة":"Compare"}</span><span>{ar?"الطريقة التقليدية":"Typical approach"}</span><span className="text-tint">Sahl</span></div>
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
          <article key={title} className="lift-card rounded-card border border-line bg-surface p-5">
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
          <Eyebrow>{ar ? "Sahl Custom Automation" : "Sahl Custom Automation"}</Eyebrow>
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


/* ──────────────────────────── deliverables ──────────────────────────── */

export function Deliverables({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const groups = ar ? [
    ["المبيعات","Inbox مشترك","Contacts + Custom Fields + Tags","Pipeline + Opportunities","Human Handoff"],
    ["الذكاء والأتمتة","AI Agent + Knowledge Base","Arabic Voice Notes","Qualification Logic","Follow-up + Flows"],
    ["الإدارة والقياس","Dashboard","نشاط المحادثات والفرص","Broadcasts","تحديث وتحسين مستمر"],
  ] : [
    ["Sales","Shared inbox","Contacts + custom fields + tags","Pipeline + opportunities","Human handoff"],
    ["AI & automation","AI agent + knowledge base","Arabic voice notes","Qualification logic","Follow-up + flows"],
    ["Management & visibility","Dashboard","Conversation & opportunity activity","Broadcasts","Ongoing tuning"],
  ];
  return (
    <Section id="deliverables" tone="muted">
      <Eyebrow>{ar ? "ماذا تستلم فعلياً؟" : "What do you actually get?"}</Eyebrow>
      <SectionTitle>{ar ? "ليس ملف إعدادات ولا Chatbot — بيئة عمل يستخدمها فريقك" : "Not a configuration file or chatbot — a workspace your team can use"}</SectionTitle>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {groups.map(([title,...items])=><article key={title} className="lift-card rounded-card border border-line bg-surface p-6"><h3 className="text-h3 font-extrabold text-primary">{title}</h3><ul className="mt-4 space-y-3">{items.map(x=><li key={x} className="flex gap-2 text-body"><CheckMark/><span>{x}</span></li>)}</ul></article>)}
      </div>
      <p className="mt-6 text-body font-bold">{ar ? "نضبط هذه المكونات على طريقة عمل شركتك، ثم نختبر الرحلة معك قبل الإطلاق." : "We configure these components around how your company works, then test the journey with you before launch."}</p>
    </Section>
  );
}

export function FitVsNotFit({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const yes = ar ? ["تصل شركتك استفسارات عملاء بشكل مستمر على واتساب","فريقك يكرر الرد والفرز والمتابعة يومياً","تريد أن تعرف أين وصل كل عميل وما الخطوة التالية","تريد التنفيذ جاهزاً بدلاً من بناء الأدوات والأتمتة بنفسك"] : ["Your business receives a steady flow of WhatsApp enquiries","Your team repeats replies, sorting and follow-up every day","You want to know where every lead stands and what happens next","You want implementation done for you rather than building automations yourself"];
  const no = ar ? ["تريد فقط بوتاً رخيصاً يجيب عن الأسئلة المتكررة","لا يوجد لديك حتى الآن حجم محادثات أو عملية بيع واضحة","هدفك الوحيد إرسال رسائل جماعية","تريد منصة DIY وتفضّل إعداد كل شيء بنفسك"] : ["You only want a cheap FAQ bot","You do not yet have meaningful message volume or a clear sales process","Your only goal is bulk messaging","You want a DIY platform and prefer configuring everything yourself"];
  return (
    <Section id="who">
      <div className="rounded-card bg-ink p-6 text-on-ink sm:p-9">
        <Eyebrow>{ar ? "هل يستحق أن نتكلم؟" : "Is it worth a conversation?"}</Eyebrow>
        <SectionTitle>{ar ? "سهل ليس مناسباً لكل شركة — وهذا شيء جيد" : "Sahl is not for every business — and that's a good thing"}</SectionTitle>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <div><p className="text-h3 font-extrabold text-tint">{ar ? "غالباً مناسب لك إذا…" : "Likely a fit if…"}</p><ul className="mt-4 space-y-3">{yes.map(x=><li key={x} className="flex gap-3 text-body"><span className="text-tint">✓</span><span>{x}</span></li>)}</ul></div>
          <div className="border-t border-white/15 pt-6 lg:border-s lg:border-t-0 lg:pt-0 lg:ps-7"><p className="text-h3 font-extrabold">{ar ? "غالباً ليس ما تحتاجه إذا…" : "Probably not what you need if…"}</p><ul className="mt-4 space-y-3 opacity-75">{no.map(x=><li key={x} className="text-body">— {x}</li>)}</ul></div>
        </div>
      </div>
    </Section>
  );
}

export function Qualification({ copy }: { copy: SiteCopy }) {
  const ar = copy.locale === "ar";
  const questions = ar ? [
    ["1","ما نوع نشاطك؟","مدرب/دورات · عقارات · عيادة · تعليم · نشاط آخر"],
    ["2","كم محادثة عميل تصلك تقريباً على واتساب؟","أسبوعياً أو شهرياً — يكفينا رقم تقريبي"],
    ["3","ما أكبر مشكلة تريد حلها؟","الرد · التأهيل · المتابعة · تنظيم العملاء · ربط الأنظمة"],
    ["4","هل لديك ميزانية مخصصة للمشروع؟","نستخدمها فقط لمعرفة إن كان نطاق الحل مناسباً لك"],
    ["5","متى تريد أن تبدأ؟","الآن · خلال 30 يوماً · خلال 1–3 أشهر · أبحث حالياً"],
  ] : [
    ["1","What kind of business do you run?","Coaching/courses · real estate · clinic · education · other"],
    ["2","Roughly how many customer chats reach WhatsApp?","Weekly or monthly — an estimate is enough"],
    ["3","What is the main problem you want to solve?","Replies · qualification · follow-up · customer organization · integrations"],
    ["4","Do you have a budget allocated?","We use it only to understand whether the solution scope is a fit"],
    ["5","When would you like to start?","Now · within 30 days · 1–3 months · researching"],
  ];
  return (
    <Section id="fit" tone="muted">
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div>
          <Eyebrow>{ar ? "خلّينا نعرف إذا سهل مناسب لك" : "Let's see if Sahl fits"}</Eyebrow>
          <SectionTitle>{ar ? "5 أسئلة تختصر علينا وعليك مكالمة غير مناسبة" : "5 questions to avoid a call that isn't a fit"}</SectionTitle>
          <p className="mt-4 text-body text-muted">{ar ? "لسنا بحاجة إلى عرض طويل قبل أن نفهم نشاطك. نبدأ بهذه المعلومات، وإذا كان سهل مناسباً ننتقل للخطوة التالية ونبني تصوراً لحالتك." : "We start with a few facts about your operation. If there is a fit, we move to the next step and map the right journey."}</p>
          <div className="mt-6"><WhatsAppCta label={ar ? "ابدأ التقييم على واتساب" : "Start the WhatsApp fit check"} source="fit" locale={copy.locale} full /></div>
          <p className="mt-3 text-label text-muted">{ar ? "لا يوجد التزام. الهدف أولاً معرفة إن كان الحل مناسباً." : "No commitment. The first goal is simply to determine fit."}</p>
        </div>
        <div className="space-y-3">{questions.map(([n,q,h])=><div key={n} className="flex gap-4 rounded-card border border-line bg-surface p-4"><span className="numeric flex size-8 shrink-0 items-center justify-center rounded-full bg-tint font-extrabold">{n}</span><div><p className="font-extrabold">{q}</p><p className="mt-1 text-body text-muted">{h}</p></div></div>)}</div>
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
