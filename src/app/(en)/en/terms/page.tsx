import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { en } from "@/content/en";

export const metadata = legalMetadata(en, "terms");

export default function EnglishTermsPage() {
  return <LegalPage copy={en} kind="terms" />;
}
