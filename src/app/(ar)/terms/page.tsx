import { redirect } from "next/navigation";

/** /terms → /ar/terms, the same way / → /ar. */
export default function TermsRedirect() {
  redirect("/ar/terms");
}
