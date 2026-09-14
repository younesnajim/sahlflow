import type { Metadata, Viewport } from "next";
import { BRAND_PRIMARY_HEX, SITE_NAME, SITE_URL } from "@/lib/site";
import { en } from "@/content/en";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: "/en",
    languages: {
      ar: "/ar",
      en: "/en",
      "x-default": "/ar",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
    url: "/en",
    title: en.meta.title,
    description: en.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: BRAND_PRIMARY_HEX,
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
