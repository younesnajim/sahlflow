import type { LeadSource } from "@/lib/whatsapp";

export interface NavLink {
  href: string;
  label: string;
}

export interface Cta {
  label: string;
  source: LeadSource;
}

export interface Step {
  day: string;
  title: string;
  body: string;
  /** Rendered as a badge on the highlighted step. */
  badge?: string;
  highlight?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RateRow {
  category: "marketing" | "utility" | "authentication" | "service";
  label: string;
  note?: string;
}

export interface SiteCopy {
  locale: "ar" | "en";
  dir: "rtl" | "ltr";
  meta: { title: string; description: string };

  nav: {
    links: NavLink[];
    cta: Cta;
    switchTo: { href: string; label: string; hrefLang: string };
    skipToContent: string;
  };

  hero: {
    h1: string;
    sub: string;
    cta: Cta;
    trust: string[];
  };

  video: { eyebrow: string; title: string; placeholder: string };

  problem: { title: string; lines: string[] };

  whatYouGet: { eyebrow: string; title: string; intro: string; items: string[]; closer: string };

  howItWorks: {
    eyebrow: string;
    title: string;
    steps: Step[];
    guarantee: string;
    cta: Cta;
  };

  costs: {
    eyebrow: string;
    title: string;
    disclaimer: string;
    columns: { category: string; perMessage: string; aed: string };
    rows: RateRow[];
    freeTier: string;
    freeLabel: string;
    footnote: string;
  };

  pricing: {
    eyebrow: string;
    headline: string;
    founderLabel: string;
    standard: string;
    includedTitle: string;
    included: string[];
    passthrough: string;
    lockIn: string;
    cta: Cta;
  };

  faq: { eyebrow: string; title: string; items: FaqItem[] };

  finalCta: { line: string; cta: Cta };

  footer: {
    tagline: string;
    links: NavLink[];
    whatsappLabel: string;
    legal: string;
    rights: string;
  };

  demo: {
    badge: string;
    title: string;
    sub: string;
    tabs: { id: "clinic" | "brokerage"; label: string }[];
    placeholder: string;
    send: string;
    thinking: string;
    limitTitle: string;
    limitCta: Cta;
    error: string;
    /** Contains the token {n}, replaced with the remaining message count. */
    remaining: string;
    opener: Record<"clinic" | "brokerage", string>;
    /** Heading on the closing lead-summary card. */
    leadCardTitle: string;
    /**
     * Shown above the widget. Only /en sets it: an English reader needs telling
     * that the agent mirrors their language, an Arabic reader does not.
     */
    languageNote?: string;
  };
}
