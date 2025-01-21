import line from "@/assets/line.png";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

const loggedInUserNavigationLinks = [
  {
    name: "Administrar cursos",
    path: "/courses",
  },

  // Se pueden agregar mas links para el usuario loggeado, de ser necesario
];

const Header = () => {
  const navigate = useNavigate();

  /* Buscar en el localstorage si hay usuario loggeado */
  // const isLoggedIn = Boolean(localStorage.getItem("token"));
  /* console.log('isLoggedIn', isLoggedIn) */

  const isLoggedIn = true;

  const cerrarSesion = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      console.log("Token eliminado con éxito.");
    }
    if (localStorage.getItem("username")) {
      localStorage.removeItem("username");
      console.log("Username eliminado con éxito.");
    }
    if (localStorage.getItem("email")) {
      localStorage.removeItem("email");
      console.log("email eliminado con éxito.");
    }
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 p-4 bg-background/80 backdrop-blur-sm shadow z-30">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div id="logo-y-libro" className="flex gap-2 items-center">
              <h1 className="text-2xl font-semibold text-foreground">
                Edu Planner
              </h1>
            </div>
            <ModeToggle />
          </div>
          <div id="fila-opciones" className="flex gap-6">
            {/* si el usuario está loggeado */}
            {!isLoggedIn && (
              <button
                className="text-sm text-foreground"
                onClick={() => navigate("/login")}
              >
                Inicia Sesión
              </button>
            )}

            {/* si el usuario está loggeado */}
            {/* {isLoggedIn && (     
                <button className='text-sm text-white' onClick={() => navigate('/profile')}>
                    Mi perfil
                </button>
                )} */}

            {/* si el usuario está desloggeado onClick={handleCerrarSesion}  */}
            {isLoggedIn &&
              loggedInUserNavigationLinks.map((link) => (
                <nav key={link.path}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        "text-sm text-foreground p-1 transition-colors hover:text-foreground/80",
                        isActive &&
                          "font-medium text-primary border-b-2 border-primary/30 rounded border-spacing-y-7"
                      )
                    }
                    to={link.path}
                    viewTransition
                    prefetch="intent"
                  >
                    {link.name}
                  </NavLink>
                </nav>
              ))}
          </div>
        </nav>
      </header>
      <img className="w-full" src={line} alt="" />
    </>
  );
};

export default Header;
