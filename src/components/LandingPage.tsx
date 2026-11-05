import { Nav } from "./Nav";
import { CaseStudy, Faq, FinalCta, FitVsNotFit, Footer, Founder, Hero, HowItWorks, LiveDemo, Outcomes, Pricing, Problem, Setup, Trust, UseCases } from "./sections";
import type { SiteCopy } from "@/content/types";

export function LandingPage({ copy }: { copy: SiteCopy }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-body focus:text-on-primary">{copy.nav.skipToContent}</a>
      <Nav copy={copy} />
      <main id="main">
        <Hero copy={copy} />
        <LiveDemo copy={copy} />
        <Problem copy={copy} />
        <HowItWorks copy={copy} />
        <Outcomes copy={copy} />
        <Setup copy={copy} />
        <UseCases copy={copy} />
        {/* TODO(case-study): hidden until copy.caseStudy is set (Rasha, with permission). */}
        <CaseStudy copy={copy} />
        <Trust copy={copy} />
        <FitVsNotFit copy={copy} />
        {/* TODO(founder): hidden until copy.founder is set (photo + two lines). */}
        <Founder copy={copy} />
        <Pricing copy={copy} />
        <Faq copy={copy} />
        <FinalCta copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
export default LandingPage;
