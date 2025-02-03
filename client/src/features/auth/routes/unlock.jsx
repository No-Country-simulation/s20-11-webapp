import { redirect } from "react-router-dom";
import { requireAnonymous } from "../services/auth.service";

export async function unlockLoader({ request }) {
  await requireAnonymous();

  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token) {
    throw redirect("/");
  }

  console.log("Sin implementar 😱");
  throw redirect("/");
}
