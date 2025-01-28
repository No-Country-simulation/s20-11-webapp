import { Outlet } from "react-router-dom";
import { requireAdmin } from "../../auth/services/auth.service";

// Al colocar la validación en el loader de este layout, todas las rutas hijas quedan protegidas.
// Solo se puede acceder a esta ruta (y sus hijas) si el usuario tiene el rol ADMIN.
export async function coursesLayoutLoader() {
  await requireAdmin();
  return null;
}

export default function CoursesLayout() {
  return <Outlet />;
}
