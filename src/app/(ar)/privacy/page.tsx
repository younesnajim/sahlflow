import { redirect } from "next/navigation";

/** /privacy → /ar/privacy, the same way / → /ar. */
export default function PrivacyRedirect() {
  redirect("/ar/privacy");
}
