"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import type { SiteCopy } from "@/content/types";

/**
 * Flat navigation: four links, a language switch, one CTA. No dropdowns.
 * Below `sm` the links move to their own thin row so nothing has to collapse
 * into a menu.
 *
 * The bar sits on a light background, so it takes the green-bubble lockup —
 * the reversed (white-bubble) mark is used on the green band and the footer.
 */
export function Nav({ copy }: { copy: SiteCopy }) {
  const { nav } = copy;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-line/80 bg-surface shadow-[0_8px_30px_rgba(14,26,20,0.04)] lg:sticky lg:top-0">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-3 py-2">
          <Link
            href={`/${copy.locale}`}
            className="flex items-center"
            aria-label={copy.meta.title}
          >
            <Logo variant="default" width={84} title={null} />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label={nav.cta.label}>
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-body font-medium text-ink transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href={nav.switchTo.href}
              hrefLang={nav.switchTo.hrefLang}
              className="rounded-full border border-line px-3 py-1.5 text-label font-medium text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {nav.switchTo.label}
            </Link>
            <a href="#fit" className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-body font-bold text-on-primary shadow-sm whitespace-nowrap transition-all hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-md">
              {nav.cta.label}
            </a>
          </div>
        </div>

        <div className="pb-2 lg:hidden">
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-2 text-label font-bold text-ink">
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            {copy.locale === "ar" ? "القائمة" : "Menu"}
          </button>
          {menuOpen && (
            <nav id="mobile-navigation" className="mt-2 grid gap-1 rounded-xl border border-line bg-surface p-2" aria-label={copy.locale === "ar" ? "القائمة الرئيسية" : "Main navigation"}>
              {nav.links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-body font-medium text-ink hover:bg-surface-muted">{link.label}</a>
              ))}
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Nav;
