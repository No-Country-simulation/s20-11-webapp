import line from "@/assets/line.png";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { ModeToggle } from "../mode-toggle";
import { UserPanel } from "../user-panel";

const Header = () => {
  const { isAuthenticated, email, isAdmin, isStudent } = useAuth();

  const userRole = isAdmin ? "Coordinador" : "Estudiante";

  return (
    <>
      <header className="sticky top-0 p-4 h-[60px] bg-background/80 backdrop-blur-sm shadow z-30  flex items-center">
        <nav className="container px-1 sm:px-4 mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <LogoLink />
          </div>
          <div id="fila-opciones" className="flex gap-2 sm:gap-6 items-center">
            <ModeToggle />
            {isAuthenticated ? (
              <UserPanel
                user={{
                  email,
                  role: userRole,
                }}
              />
            ) : (
              <Link viewTransition to="/register">
                <div className="bg-gradient-to-r from-primary to-tertiary rounded-[20rem] p-[2px]">
                  <div className="text-nowrap bg-transparent text-background hover:bg-background text-sm hover:text-foreground rounded-[20rem] py-1 px-6 transition-all duration-300">
                    Registrarse como administrador
                  </div>
                </div>
              </Link>
            )}
          </div>
        </nav>
      </header>
      <img className="w-full h-[5px]" src={line} alt="" />
    </>
  );
};

export default Header;

function LogoLink() {
  const { isAuthenticated, isAdmin, isStudent } = useAuth();

  const to = isAuthenticated ? (isAdmin ? "/courses" : "/student") : "/";

  return (
    <Link
      viewTransition
      to={to}
      className="hover:brightness-125 transition-all duration-300"
    >
      <img src={logo} alt="logo" className="w-full" />
    </Link>
  );
}
