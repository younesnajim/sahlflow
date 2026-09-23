import { Nav } from "./Nav";
import { BusinessImpact, Capabilities, CostOfManualWork, CrmAutomation, CustomAutomation, Differentiation, Deliverables, Faq, FitVsNotFit, FinalCta, Footer, Hero, HowItWorks, LiveDemo, Pricing, Problem, Qualification, SalesJourney, TrustAndData, UseCases, WhatYouGet } from "./sections";
import type { SiteCopy } from "@/content/types";

export function LandingPage({ copy }: { copy: SiteCopy }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-body focus:text-on-primary">{copy.nav.skipToContent}</a>
      <Nav copy={copy} />
      <main id="main">
        <Hero copy={copy} />
        <CostOfManualWork copy={copy} />
        <SalesJourney copy={copy} />
        <LiveDemo copy={copy} />
        <Problem copy={copy} />
        <WhatYouGet copy={copy} />
        <Capabilities copy={copy} />
        <BusinessImpact copy={copy} />
        <CrmAutomation copy={copy} />
        <UseCases copy={copy} />
        <Differentiation copy={copy} />
        <HowItWorks copy={copy} />
        <TrustAndData copy={copy} />
        <Deliverables copy={copy} />
        <Pricing copy={copy} />
        <CustomAutomation copy={copy} />
        <FitVsNotFit copy={copy} />
        <Qualification copy={copy} />
        <Faq copy={copy} />
        <FinalCta copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
export default LandingPage;
