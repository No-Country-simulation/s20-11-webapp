import { Button } from "@/components/ui/button";
import { Frown, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="h-[calc(100dvh-6.5rem)]  grid place-items-center">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <Frown className="mx-auto h-24 w-24 animate-bounce text-primary/60" />
          <h1 className="text-5xl font-extrabold text-foreground tracking-tight sm:text-6xl">
            404
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Página no encontrada
          </h2>
          <p className="mt-2 text-lg text-foreground">
            La página que buscas no existe o ha sido movida.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            {window.location.href}
          </p>
        </div>
        <div className="mt-8">
          <Link to="/" viewTransition>
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
