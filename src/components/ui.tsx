import type { ReactNode } from "react";
import { whatsappLink, type LeadSource, type Locale } from "@/lib/whatsapp";

/* ─────────────────────────────── layout ─────────────────────────────── */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

export function Section({
  id,
  children,
  tone = "surface",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "surface" | "muted" | "primary";
  className?: string;
}) {
  const tones = {
    surface: "bg-surface text-ink",
    muted: "bg-surface-muted text-ink",
    primary: "bg-primary text-on-primary",
  } as const;
  return (
    <section
      id={id}
      className={`scroll-target py-14 sm:py-20 ${tones[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-label font-medium tracking-wide text-primary uppercase">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mt-2 text-h2 font-extrabold text-balance">{children}</h2>;
}

/* ──────────────────────────── whatsapp CTA ──────────────────────────── */

export type CtaTone = "solid" | "onPrimary" | "outline";

export function WhatsAppCta({
  label,
  source,
  locale,
  tone = "solid",
  className = "",
  full = false,
}: {
  label: string;
  source: LeadSource;
  locale: Locale;
  tone?: CtaTone;
  className?: string;
  full?: boolean;
}) {
  const tones = {
    solid: "bg-primary text-on-primary hover:bg-primary-deep",
    onPrimary: "bg-on-primary text-primary hover:bg-tint",
    outline: "border-2 border-primary text-primary hover:bg-surface-sunken",
  } as const;

  return (
    <a
      href={whatsappLink(source, locale)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-body font-bold whitespace-nowrap transition-colors ${
        tones[tone]
      } ${full ? "w-full" : ""} ${className}`}
    >
      <WhatsAppGlyph />
      {label}
    </a>
  );
}

export function WhatsAppGlyph({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2.02a9.9 9.9 0 0 0-8.5 14.9L2 22.1l5.33-1.4a9.9 9.9 0 1 0 4.71-18.68Zm0 1.8a8.1 8.1 0 1 1-4.12 15.07l-.3-.18-3.16.83.84-3.08-.19-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.02c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.71 4.15 3.7 2.03.82 2.45.66 2.89.62.44-.04 1.42-.58 1.62-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.4-.54-.41h-.02Z" />
    </svg>
  );
}
