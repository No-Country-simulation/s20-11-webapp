import { Outlet } from "react-router-dom";

// Al colocar la validación en el loader de este layout, todas las rutas hijas quedan protegidas.
// Solo se puede acceder a esta ruta (y sus hijas) si el usuario tiene el rol ADMIN.
export async function coursesLayoutLoader() {
  return null;
}

export default function CoursesLayout() {
  return <Outlet />;
}
