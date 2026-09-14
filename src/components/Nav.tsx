import Link from "next/link";
import { Logo } from "./Logo";
import { Container, WhatsAppCta } from "./ui";
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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            href={`/${copy.locale}`}
            className="flex items-center"
            aria-label={copy.meta.title}
          >
            <Logo variant="default" width={84} title={null} />
          </Link>

          <nav className="hidden items-center gap-7 sm:flex" aria-label={nav.cta.label}>
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={nav.switchTo.href}
              hrefLang={nav.switchTo.hrefLang}
              className="rounded-full border border-line px-3 py-1.5 text-label font-medium text-muted transition-colors hover:border-primary hover:text-primary"
            >
              {nav.switchTo.label}
            </Link>
            <WhatsAppCta
              label={nav.cta.label}
              source={nav.cta.source}
              locale={copy.locale}
              className="px-4 py-2"
            />
          </div>
        </div>

        <nav
          className="-mx-1 flex items-center gap-5 overflow-x-auto pb-2.5 sm:hidden"
          aria-label={nav.cta.label}
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 px-1 text-label font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

export default Nav;
