import line from "@/assets/line.png";
import { Button } from "@/Components/ui/button";
import { Form, Link } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  const { isAuthenticated } = useAuth();

  //TODO: Hay que aplicar los estilos correspondientes a los botones de login y logout. Solo dejo la logica para que funcione.
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
            {isAuthenticated ? (
              <Form method="post" action="/logout">
                <Button variant="outline" type="submit">
                  Cerrar sesión
                </Button>
              </Form>
            ) : (
              <Link viewTransition to="/login">
                <Button>Iniciar sesión</Button>
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
