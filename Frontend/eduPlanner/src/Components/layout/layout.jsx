import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-75px)] bg-gradient-to-b from-background via-secondary/30 to-secondary/10">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
