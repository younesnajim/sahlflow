import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { en } from "@/content/en";

export const metadata = legalMetadata(en, "privacy");

export default function EnglishPrivacyPage() {
  return <LegalPage copy={en} kind="privacy" />;
}
