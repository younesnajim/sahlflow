import { Nav } from "./Nav";
import {
  Faq,
  FinalCta,
  Footer,
  Hero,
  HowItWorks,
  MessageCosts,
  Pricing,
  Problem,
  VideoBlock,
  WhatYouGet,
} from "./sections";
import type { SiteCopy } from "@/content/types";

/**
 * Section order is fixed for both locales; the copy is what differs.
 * /ar and /en each render this with their own content module.
 */
export function LandingPage({ copy }: { copy: SiteCopy }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-body focus:text-on-primary"
      >
        {copy.nav.skipToContent}
      </a>
      <Nav copy={copy} />
      <main id="main">
        <Hero copy={copy} />
        <VideoBlock copy={copy} />
        <Problem copy={copy} />
        <WhatYouGet copy={copy} />
        <HowItWorks copy={copy} />
        <MessageCosts copy={copy} />
        <Pricing copy={copy} />
        <Faq copy={copy} />
        <FinalCta copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}

export default LandingPage;
