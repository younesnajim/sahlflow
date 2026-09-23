import { Nav } from "./Nav";
import { BusinessImpact, Capabilities, CostOfManualWork, CrmAutomation, CustomAutomation, Faq, FitVsNotFit, FinalCta, Footer, Hero, HowItWorks, LiveDemo, Pricing, Qualification, SalesJourney, TrustAndData, UseCases } from "./sections";
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
        <div className="section-rule" />
        <Capabilities copy={copy} />
        <BusinessImpact copy={copy} />
        <div className="section-rule" />
        <CrmAutomation copy={copy} />
        <UseCases copy={copy} />
        <HowItWorks copy={copy} />
        <div className="section-rule" />
        <TrustAndData copy={copy} />
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
