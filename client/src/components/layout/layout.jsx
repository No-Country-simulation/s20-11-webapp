import { cn } from "@/lib/utils"
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import Header from "./Header";

export default function Layout({className}) {
  const { updateAuthState } = useAuth();

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-75px)] /* bg-gradient-to-b from-background via-secondary/30 to-secondary/10 */">
        <div className={cn("container px-4 mx-auto py-4 relative z-10", className)}>
        
          <Outlet />
        </div>
      </main>
      {/* <CurrentUserInLocalStorage/> Comentar o borrar esto, solo esta para fines de desarrollo */}
      {/* <Footer /> */}
      <ScrollRestoration />
    </>
  );
}
