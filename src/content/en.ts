import type { SiteCopy } from "./types";

/**
 * The English page is its own page, not a translation layer over the Arabic
 * one. The pitch is the same; the wording is written for an English reader.
 */
export const en: SiteCopy = {
  locale: "en",
  dir: "ltr",

  meta: {
    title:
      "Sahl Flow — a WhatsApp agent that answers your customers in the UAE and the Gulf",
    description:
      "We connect your number, train the agent on your services and prices, test it on your real messages, and hand it over working. Official WhatsApp from Meta.",
  },

  nav: {
    links: [
      { href: "#how", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ],
    cta: { label: "Get started", source: "nav" },
    switchTo: { href: "/ar", label: "العربية", hrefLang: "ar" },
    skipToContent: "Skip to content",
  },

  hero: {
    h1: "A WhatsApp agent that answers your customers in the UAE and the Gulf — in their dialect, around the clock",
    sub: "Every message left unanswered for an hour is a customer who booked somewhere else. We build an agent that replies instantly, handles questions about services and prices, and books appointments — and we hand it to you already working.",
    cta: { label: "Book a short call", source: "hero" },
    trust: [
      "Official WhatsApp from Meta",
      "Understands Gulf dialect",
      "Live within a week",
    ],
  },

  video: {
    eyebrow: "Watch",
    title: "Two minutes, start to finish",
    placeholder: "Video coming soon",
  },

  problem: {
    title: "The problem is simple",
    lines: [
      "Customers message after hours — and nobody replies.",
      "The same ten questions every day, answered by hand.",
      "A reply two hours later arrives too late. They already booked elsewhere.",
    ],
  },

  whatYouGet: {
    eyebrow: "What you get",
    title: "We do the work — we don't hand you a tool",
    intro:
      "You won't be handed a dashboard and left to figure it out. We set the whole thing up:",
    items: [
      "We connect your business WhatsApp number through Meta's official API.",
      "We train the agent on your services, your prices, and how you talk to customers.",
      "We test it on your real messages — not on examples we made up.",
      "We hand it over working, and the monthly upkeep stays with us.",
    ],
    closer:
      "Your only job: give us your services and prices, and answer our questions. We handle the rest.",
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "From first call to a working agent — inside a week",
    steps: [
      {
        day: "Day 1",
        title: "A short call",
        body: "We ask about your business, your services, and the questions you get most. Twenty minutes is enough.",
      },
      {
        day: "Day 2",
        title: "A trial agent on your own data",
        body: "We build you a trial version trained on your services and your prices. Message it as much as you like.",
        badge: "100% free",
        highlight: true,
      },
      {
        day: "Days 3–7",
        title: "Connection and testing",
        body: "We connect your number through official WhatsApp, test the agent against real customer messages, and tune its replies.",
      },
      {
        day: "Ongoing",
        title: "Monthly upkeep",
        body: "We review replies every month, update prices and services, and improve whatever needs improving.",
      },
    ],
    guarantee: "If the trial agent doesn't convince you, you pay nothing.",
    cta: { label: "Start with the free trial agent", source: "how-it-works" },
  },

  costs: {
    eyebrow: "Message costs",
    title: "WhatsApp fees go to Meta — not to us",
    disclaimer:
      "These are Meta's UAE rates, billed to you by Meta. We pass them through at cost with nothing added.",
    columns: { category: "Message type", perMessage: "USD", aed: "AED" },
    rows: [
      {
        category: "marketing",
        label: "Marketing",
        note: "Offers and campaigns you send",
      },
      {
        category: "utility",
        label: "Utility",
        note: "Booking confirmations, reminders",
      },
      {
        category: "authentication",
        label: "Authentication",
        note: "One-time passcodes",
      },
      {
        category: "service",
        label: "Service",
        note: "When the customer starts the chat",
      },
    ],
    freeTier: "The first 1,000 service messages each month are free.",
    freeLabel: "Free",
    footnote:
      "AED figures are an approximate conversion from USD. Check Meta's official pricing page for current rates.",
  },

  pricing: {
    eyebrow: "Pricing",
    headline: "AED 6,500 setup + AED 2,000 per month",
    founderLabel:
      "For the first three clients — in exchange for a case study and a referral",
    standard:
      "Standard price AED 9,000 + AED 2,500 per month · Final price is set after a short call, based on the size of the business",
    includedTitle: "Included",
    included: [
      "Connecting your number",
      "Training the agent on your services and prices",
      "Testing on your real messages",
      "Handover, already working",
      "Monthly upkeep",
    ],
    passthrough:
      "Meta's WhatsApp fees are passed through at cost — with nothing added",
    lockIn:
      "Founding pricing is locked for 12 months from the start of your subscription.",
    cta: { label: "Claim one of the three places", source: "pricing" },
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions worth asking before you sign",
    items: [
      {
        q: "Is the data mine?",
        a: "Yes. The WhatsApp number is in your name, the Meta account is in your name, and the conversations are yours. We work inside your account, and if we stop working together everything stays with you.",
      },
      {
        q: "What if I cancel?",
        a: "The monthly subscription has no long lock-in — cancel whenever with a month's notice. Your number and account remain yours, and we hand over the agent's configuration on the way out.",
      },
      {
        q: "What will messages actually cost me?",
        a: "It depends on how many you send and of what kind. Service replies — the bulk of it — are free for the first 1,000 each month. The table above shows Meta's rates, and they are paid to Meta directly.",
      },
      {
        q: "Does it understand Gulf dialect?",
        a: "Yes, and we test it on that specifically. During testing we feed it your real customer messages in their own dialect and tune the replies until they read naturally rather than robotically.",
      },
      {
        q: "Why not just use an off-the-shelf tool myself?",
        a: "You could. But a tool hands you a blank page: you connect the number, write the replies, test them, and fix them every time a price changes. We hand over the result rather than the tool, and stay responsible for running it.",
      },
      {
        q: "How long does setup take?",
        a: "Usually a week: a call on day 1, a trial agent on day 2, connection and testing across days 3–7.",
      },
    ],
  },

  finalCta: {
    line: "Try the trial agent free — and if it doesn't convince you, pay nothing.",
    cta: { label: "Start on WhatsApp", source: "final-cta" },
  },

  footer: {
    tagline: "WhatsApp agents for businesses in the UAE and the Gulf.",
    links: [
      { href: "#how", label: "How it works" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: "#costs", label: "Message costs" },
    ],
    whatsappLabel: "WhatsApp",
    legal:
      "WhatsApp is a registered trademark of Meta. Sahl Flow is not affiliated with Meta.",
    rights: "All rights reserved.",
  },

  demo: {
    badge: "Illustrative demo",
    title: "Try it now",
    sub: "Write as if you were a customer. The agent replies the way it would to yours.",
    tabs: [
      { id: "clinic", label: "Clinic" },
      { id: "realestate", label: "Real estate" },
    ],
    placeholder: "Type your message…",
    send: "Send",
    thinking: "Typing…",
    limitTitle: "Like it? Let's build you one",
    limitCta: { label: "Message us on WhatsApp", source: "demo-limit" },
    error:
      "Couldn't reply just now. Try again shortly, or message us on WhatsApp directly.",
    remaining: "Messages left in this demo: {n}",
    opener: {
      clinic: "هلا والله، عيادتنا في خدمتك. كيف أقدر أساعدك اليوم؟",
      realestate: "هلا والله، تفضل — تدوّر على شقة أو فيلا؟ وفي أي منطقة؟",
    },
  },
};

export default en;
