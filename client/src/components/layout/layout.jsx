import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import Header from "./Header";

export default function Layout({ noContainer = false }) {
  const { updateAuthState } = useAuth();

  return (
    <>
      <Header />
      <main className="min-h-[calc(100dvh-75px)] /* bg-gradient-to-b from-background via-secondary/30 to-secondary/10 */">
        <div className={cn("relative z-10 py-4",
        !noContainer && "container px-4 mx-auto")}>
        
          <Outlet />
        </div>
      </main>

      <ScrollRestoration />
    </>
  );
}
