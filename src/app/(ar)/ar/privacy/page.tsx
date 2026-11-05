import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { ar } from "@/content/ar";

export const metadata = legalMetadata(ar, "privacy");

export default function ArabicPrivacyPage() {
  return <LegalPage copy={ar} kind="privacy" />;
}
