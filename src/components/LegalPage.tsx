import type { Metadata } from "next";
import { Nav } from "./Nav";
import { Footer } from "./sections";
import { Container, WhatsAppCta } from "./ui";
import type { SiteCopy } from "@/content/types";

export type LegalKind = "privacy" | "terms";

/** Metadata for /ar/privacy, /en/privacy, /ar/terms and /en/terms. */
export function legalMetadata(copy: SiteCopy, kind: LegalKind): Metadata {
  const page = copy.legal[kind];
  return {
    title: `${page.title} — Sahl Flow`,
    description: page.description,
    alternates: {
      canonical: `/${copy.locale}/${kind}`,
      languages: { ar: `/ar/${kind}`, en: `/en/${kind}`, "x-default": `/ar/${kind}` },
    },
    openGraph: {
      type: "website",
      siteName: "Sahl",
      locale: copy.locale === "ar" ? "ar_AE" : "en_AE",
      url: `/${copy.locale}/${kind}`,
      title: `${page.title} — Sahl Flow`,
      description: page.description,
    },
  };
}

export function LegalPage({ copy, kind }: { copy: SiteCopy; kind: LegalKind }) {
  const page = copy.legal[kind];
  const other = copy.locale === "ar" ? "en" : "ar";
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-body focus:text-on-primary">{copy.nav.skipToContent}</a>
      <Nav copy={copy} switchHref={`/${other}/${kind}`} />
      <main id="main" className="bg-surface py-12 sm:py-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            <a href={`/${copy.locale}`} className="text-label font-bold text-primary hover:text-primary-deep">
              {copy.locale === "ar" ? "→" : "←"} {copy.legal.backHome}
            </a>
            <h1 className="mt-4 text-h1 font-extrabold">{page.title}</h1>
            <p className="mt-2 text-label text-muted">
              {copy.legal.updatedLabel} <span className="numeric">{page.updated}</span>
            </p>
            <p className="mt-6 text-lead text-muted">{page.intro}</p>
            {page.sections.map((section) => (
              <section key={section.heading} className="mt-8">
                <h2 className="text-h3 font-extrabold">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-3 text-body leading-relaxed">{p}</p>
                ))}
              </section>
            ))}
            <div className="mt-10">
              <WhatsAppCta label={copy.ctas.whatsapp} source="legal" locale={copy.locale} />
            </div>
          </article>
        </Container>
      </main>
      <Footer copy={copy} />
    </>
  );
}
