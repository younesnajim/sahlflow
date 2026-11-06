import type { LeadSource } from "@/lib/whatsapp";

/**
 * Every visible word on the landing page and the legal pages lives in
 * src/content/ar.ts and src/content/en.ts — components hold layout only.
 */

export type DemoScenarioId = "clinic" | "brokerage" | "coach";

export interface NavLink {
  href: string;
  label: string;
}

/** Real app screenshots (demo workspace, test data) under src/assets/screens. */
export type ScreenId = "chatAiPrices" | "pushAlerts";

export interface Screenshot {
  id: ScreenId;
  /** Describes what the screenshot shows, in the page's language. */
  alt: string;
}

export interface Card {
  title: string;
  body: string;
  /** Optional small muted line under the body, e.g. which plan includes it. */
  note?: string;
  /** Optional real app screenshot shown under the card text. */
  screenshot?: Screenshot;
}

/** One line of the real-results block: the figure, then the rest of the sentence. */
export interface ResultItem {
  value: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PricingPlan {
  id: "start" | "growth" | "pro";
  name: string;
  /** Monthly price in AED, as displayed (Western digits with comma separators). */
  price: string;
  /** "From" price, quoted on a call. */
  from?: boolean;
  /** One-time setup line, e.g. "+ 1,500 AED one-time setup". */
  setup?: string;
  /** Shown instead of a setup line, e.g. "Final price after a short call". */
  note?: string;
  features: string[];
  highlight?: boolean;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPageCopy {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export interface SiteCopy {
  locale: "ar" | "en";
  dir: "rtl" | "ltr";
  meta: { title: string; description: string };

  /**
   * The page has exactly two calls to action: the demo (primary, always the
   * solid button) and a WhatsApp chat (secondary, always the outline button).
   */
  ctas: { demo: string; whatsapp: string };

  /** Small caption under every real app screenshot ("From inside the app"). */
  screenshotCaption: string;

  nav: {
    links: NavLink[];
    switchTo: { href: string; label: string; hrefLang: string };
    skipToContent: string;
    menu: string;
    menuLabel: string;
  };

  hero: {
    badge: string;
    h1: string;
    sub: string;
    trust: string[];
    /** A real app screenshot (demo clinic, test data) instead of an illustration. */
    screenshot: Screenshot;
  };

  demoSection: { eyebrow: string; title: string; sub: string };

  problem: { eyebrow: string; title: string; cards: Card[]; closer: string };

  howItWorks: { eyebrow: string; title: string; steps: Card[] };

  /** What changes for the business once Sahl is live. Exactly 4 outcome cards. */
  outcomes: { eyebrow: string; title: string; cards: Card[] };

  /**
   * Real numbers from a live client's first week (data only: no client name,
   * niche or details). Exactly these figures, as approved — never invent or
   * round them up.
   */
  results: { title: string; items: ResultItem[] };

  setup: { eyebrow: string; title: string; steps: Card[]; note: string };

  useCases: { eyebrow: string; title: string; cards: Card[] };

  trust: { eyebrow: string; title: string; cards: Card[]; privacyLink: string };

  fit: {
    eyebrow: string;
    title: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
  };

  /**
   * TODO(founder): Younes sends a photo + two lines. Until `founder` is set,
   * the section renders nothing. Photo goes in /public, e.g. /founder.jpg.
   */
  founder?: { eyebrow: string; name: string; role: string; lines: string[]; photo: string; photoAlt: string };

  /**
   * TODO(case-study): Rasha's story — only with her written permission and
   * only with real numbers she approves. Until `caseStudy` is set, the section
   * renders nothing. Never invent figures.
   */
  caseStudy?: { eyebrow: string; title: string; body: string[]; attribution: string };

  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Short note that the AED prices apply as-is in SAR. */
    currencyNote: string;
    perMonth: string;
    fromLabel: string;
    popularBadge: string;
    /** One extra client a month covers the subscription. */
    roi: string;
    plans: PricingPlan[];
    includedTitle: string;
    included: string[];
    notes: string[];
    /** Teaser only — the offer's details are never on the site. */
    offerLine: string;
    passthrough: string;
  };

  faq: { eyebrow: string; title: string; items: FaqItem[] };

  finalCta: { line: string; sub: string };

  footer: {
    tagline: string;
    links: NavLink[];
    legalLinks: NavLink[];
    whatsappLabel: string;
    /**
     * TODO(email): no Sahl contact email is confirmed yet. Set it here (and in
     * the legal pages' contact paragraph) once Younes confirms the address.
     */
    email?: { label: string; address: string };
    legal: string;
    rights: string;
  };

  legal: {
    backHome: string;
    updatedLabel: string;
    privacy: LegalPageCopy;
    terms: LegalPageCopy;
  };

  demo: {
    badge: string;
    title: string;
    sub: string;
    tabs: { id: DemoScenarioId; label: string }[];
    placeholder: string;
    send: string;
    thinking: string;
    limitTitle: string;
    limitSource: LeadSource;
    error: string;
    /** Contains the token {n}, replaced with the remaining message count. */
    remaining: string;
    opener: Record<DemoScenarioId, string>;
    /** Heading on the closing lead-summary card. */
    leadCardTitle: string;
    /** Shown above the widget: the demo's names and prices are fictional. */
    languageNote?: string;
  };
}
