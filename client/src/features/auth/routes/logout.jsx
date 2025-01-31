import { redirect } from "react-router-dom";
import { authService, requireAuthenticated } from "../services/auth.service";

export async function logoutAction() {
  await requireAuthenticated();
  await authService.logout();
  return redirect("/");
}

// Cualquiera que visite /logout, será redirigido a al inicio
export async function logoutLoader() {
  throw redirect("/");
}
