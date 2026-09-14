import { redirect } from "next/navigation";

/** Arabic is primary: the root sends visitors straight to /ar. */
export default function RootRedirect() {
  redirect("/ar");
}
