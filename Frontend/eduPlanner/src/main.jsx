import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Components/theme-provider.jsx";
import "./index.css";
import { routes } from "./routes.jsx";
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="uduplanner-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
