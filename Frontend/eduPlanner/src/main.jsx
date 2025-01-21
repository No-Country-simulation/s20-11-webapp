import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/theme-provider.jsx";
import { EventsProvider } from "./Components/event-provider.jsx";  // Importa el proveedor
import "./index.css";
import { routes } from "./routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="uduplanner-ui-theme">
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </ThemeProvider>
  </StrictMode>
);
