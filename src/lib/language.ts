/**
 * Which language a demo conversation is being held in, and the per-request
 * directive that keeps the agent there.
 *
 * A general rule in the system prompt was not enough: gpt-4o-mini held English
 * for its own sentences but switched to Arabic the moment it recited the
 * project specs or wrote the summary card, because that data only exists in
 * Arabic in the prompt. A short, explicit, per-request instruction placed last
 * carries far more weight than a general rule buried in the prompt.
 */

/** Arabic block, Supplement, Extended-A, and the presentation forms. */
const ARABIC_RANGES: readonly (readonly [number, number])[] = [
  [0x0600, 0x06ff],
  [0x0750, 0x077f],
  [0x08a0, 0x08ff],
  [0xfb50, 0xfdff],
  [0xfe70, 0xfeff],
];

export type ConversationLanguage = "ar" | "en";

/**
 * Numeric ranges rather than a class of literal glyphs: a glyph range is easy
 * to corrupt silently, and a broken one fails in the worst direction here —
 * answering every Arabic speaker in English.
 */
export function detectLanguage(message: string): ConversationLanguage {
  for (const char of message) {
    const code = char.codePointAt(0)!;
    for (const [lo, hi] of ARABIC_RANGES) {
      if (code >= lo && code <= hi) return "ar";
    }
  }
  return "en";
}

const DIRECTIVES: Record<ConversationLanguage, string> = {
  ar: "العميل يكتب بالعربية. اكتب ردك كله بالعربية.",
  en:
    "The customer is writing in English. Write your entire reply in English — " +
    "including project and service names, specifications, prices, area names, " +
    "and every label and value inside the <lead> summary card. The reference " +
    "data above is written in Arabic only because the instructions are; " +
    "translate it. Keep codes and identifiers as they are (JVC, Q4 2028, AED) " +
    "and write figures in Latin digits. Do not mix the two languages.",
};

/** Sent as the final system message, after the prompt and the transcript. */
export function languageDirective(language: ConversationLanguage): string {
  return DIRECTIVES[language];
}
