import type { Metadata, Viewport } from "next";
import { BRAND_PRIMARY_HEX, SITE_NAME, SITE_URL } from "@/lib/site";
import { ar } from "@/content/ar";
import "../globals.css";

/**
 * Arabic root layout. /ar and /en are separate root layouts (route groups)
 * because each owns its own <html lang> and dir — they are two pages, not one
 * page with a toggle.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ar.meta.title,
  description: ar.meta.description,
  alternates: {
    canonical: "/ar",
    languages: {
      ar: "/ar",
      en: "/en",
      "x-default": "/ar",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ar_AE",
    alternateLocale: ["en_AE"],
    url: "/ar",
    title: ar.meta.title,
    description: ar.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_PRIMARY_HEX,
};

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
