/**
 * Every CTA on the site opens WhatsApp with a pre-filled Arabic message that
 * carries a source marker, so a lead that arrived from the website can be told
 * apart from a lead that arrived from an ad.
 *
 * Marker format inside the message body:  [‏web:<locale>:<section>]
 * e.g. [‏web:ar:pricing]  — searchable in the WhatsApp inbox.
 */

export const WHATSAPP_NUMBER = "971544249757";

/** Where on the page the visitor tapped. Keep these stable — they end up in the inbox. */
export type LeadSource =
  | "nav"
  | "hero"
  | "how-it-works"
  | "pricing"
  | "pricing-offer"
  | "faq"
  | "fit"
  | "demo-limit"
  | "final-cta"
  | "footer";

export type Locale = "ar" | "en";

const OPENING: Record<Locale, string> = {
  ar: "السلام عليكم، وصلتكم من موقع سهل وأرغب بمعرفة كيف يمكن تطبيق نظام Sahl على نشاطي.",
  en: "Hi, I came from the Sahl website and I'd like to see how Sahl could work for my business.",
};

/** Opening messages for CTAs that ask for something specific. */
export const OPENINGS = {
  offerCall: {
    ar: "السلام عليكم، وصلتكم من موقع سهل وأرغب بحجز مكالمة 15 دقيقة لمعرفة العرض الخاص لأول 5 عملاء.",
    en: "Hi, I came from the Sahl website and I'd like to book a 15-minute call to hear the special offer for your first 5 clients.",
  },
} satisfies Record<string, Record<Locale, string>>;

/**
 * Build a locale-aware WhatsApp opening message with a source marker.
 * `opening` replaces the default first line when a CTA asks for something specific.
 */
export function whatsappLink(source: LeadSource, locale: Locale = "ar", opening?: string): string {
  const text = `${opening ?? OPENING[locale]}\n\n[web:${locale}:${source}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Display form of the number, e.g. for the footer. */
export const WHATSAPP_DISPLAY = "+971 54 424 9757";
