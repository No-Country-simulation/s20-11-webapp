import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext();

//Este evento nos ayuda a mantener en sincronizados el estado de la autenticacion en el localStorage con el contexto de la app.
const AUTH_STATE_CHANGE = "auth-state-change";
export const dispatchAuthStateChange = () => {
  window.dispatchEvent(new Event(AUTH_STATE_CHANGE));
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [roles, setRoles] = useState(authService.getCurrentUserRoles());

  const updateAuthState = () => {
    setIsAuthenticated(authService.isAuthenticated());
    setRoles(authService.getCurrentUserRoles());
  };

  useEffect(() => {
    // Actualiza el estado de autenticación cuando ocurren cambios (login/logout)
    const handleAuthStateChange = () => {
      updateAuthState();
    };

    // Escucha los eventos para los cuales actualizar el estado (cambios en el localStorage y el evento custom que disparamos desde el authService)
    window.addEventListener("storage", (e) => {
      if (e.key === TOKEN_KEY) {
        updateAuthState();
      }
    });
    window.addEventListener(AUTH_STATE_CHANGE, handleAuthStateChange);

    return () => {
      window.removeEventListener(AUTH_STATE_CHANGE, handleAuthStateChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        updateAuthState,
        token: authService.getToken(),
        refreshToken: authService.getRefreshToken(),
        tokenExpiration: authService.getTokenExpiration(),
        isTokenExpired: authService.isTokenExpired(),
        isAdmin: authService.isAdmin(),
        isStudent: authService.isStudent(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
