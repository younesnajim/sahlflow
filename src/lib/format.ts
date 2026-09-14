import type { Locale } from "./whatsapp";

/**
 * The Arabic copy is written with Arabic-Indic digits (٦٬٥٠٠، ١٠٠٪), so every
 * number the site generates has to match — otherwise the page mixes ٦٬٥٠٠ with
 * 0.0340. Switch `ar` to plain "ar-AE" here to move the whole page to Western
 * digits instead; nothing else needs to change.
 */
export const NUMBER_LOCALE: Record<Locale, string> = {
  ar: "ar-AE-u-nu-arab",
  en: "en-AE",
};

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], options).format(value);
}
