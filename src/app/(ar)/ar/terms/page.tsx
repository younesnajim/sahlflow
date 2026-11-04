import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { ar } from "@/content/ar";

export const metadata = legalMetadata(ar, "terms");

export default function ArabicTermsPage() {
  return <LegalPage copy={ar} kind="terms" />;
}
