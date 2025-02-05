import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import {
  TooltipProvider
} from "./components/ui/tooltip";
import { AuthProvider } from "./features/auth/context/AuthContext.jsx";
import { ERROR_MESSAGES } from "./features/auth/utils/auth.errors.js";
import "./index.css";
import { routes } from "./routes.jsx";

const router = createBrowserRouter(routes);

console.log("ERROR_MESSAGES: ", ERROR_MESSAGES)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="uduplanner-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
