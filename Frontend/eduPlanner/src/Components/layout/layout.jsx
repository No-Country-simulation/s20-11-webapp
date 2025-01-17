import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-75px)] bg-background">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
