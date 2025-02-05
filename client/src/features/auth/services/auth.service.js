import {
  clearAuthData,
  REFRESH_TOKEN_KEY,
  saveAuthData,
  TOKEN_EXPIRATION_KEY,
  TOKEN_KEY,
} from "@/api/authStorage.js";
import { API_ENDPOINTS } from "@/api/endpoints.js";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
import api, { scheduleTokenRefresh } from "../../../api/axios";
import { dispatchAuthStateChange } from "../context/AuthContext";

const SERVER_ERROR = {
  success: false,
  error: {
    code: "SERVER_ERROR",
    message: "Error de conexión con el servidor",
  },
};

// Constantes para los roles de usuario
const ROLES = {
  ADMIN: "ROLE_ADMIN",
  STUDENT: "ROLE_STUDENT",
};

export const authService = {
  register: async (credentials) => {
    const data = await api.post(API_ENDPOINTS.AUTH.REGISTER, credentials);
    return data;
  },
  verify: async (token) => {
    const data = await api.post(API_ENDPOINTS.AUTH.VERIFY, {
      token,
    });

    if (data.success) {
      const { tokens, ...userData } = data.data;

      saveAuthData(tokens);
      dispatchAuthStateChange();
      scheduleTokenRefresh();
    }
    return data;
  },
  resendVerification: async (email) => {
    const data = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, {
      email,
    });

    return data;
  },
  login: async (credentials) => {
    const data = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

    if (data.success) {
      const { tokens, ...userData } = data.data;

      saveAuthData(tokens);
      dispatchAuthStateChange();
      scheduleTokenRefresh();
    }
    return data;
  },

  logout: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // Notificar al backend antes de limpiar el localStorage
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    }
    // Siempre limpiamos el localStorage
    clearAuthData();
    dispatchAuthStateChange();
  },
  getToken: () => localStorage.getItem(TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  getTokenExpiration: () => localStorage.getItem(TOKEN_EXPIRATION_KEY),

  getTokenRemainingTime: () => {
    const expiresAt = localStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (!expiresAt) return 0;

    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();
    const remainingMs = expirationTime - currentTime;

    return Math.max(0, Math.floor(remainingMs / 60000));
  },

  // Helper para verificar si el token esta expirado
  isTokenExpired: () => {
    const expiresAt = authService.getTokenExpiration();
    if (!expiresAt) return true;

    const expirationTime = new Date(expiresAt).getTime();
    const currentTime = Date.now();

    return expirationTime < currentTime;
  },

  // Helper para verificar si hay un usuario autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token && !authService.isTokenExpired(); // Checkear si el token existe y no esta expirado
  },

  // Helper para obtener los roles del usuario autenticado directamente desde el token almacenado
  getCurrentUserRoles: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return [];

    try {
      const decoded = jwtDecode(token);
      return decoded.roles || [];
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return [];
    }
  },

  getCurrentUserEmail: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return "";

    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return "";
    }
  },

  // Helper para verificar si el usuario autenticado tiene un rol específico
  hasRole: (requiredRole) => {
    const roles = authService.getCurrentUserRoles();
    return roles.includes(requiredRole);
  },

  isAdmin: () => authService.hasRole(ROLES.ADMIN),
  isStudent: () => authService.hasRole(ROLES.STUDENT),
};

// Estas funciones 👇 las puedes usar en los loaders de las rutas para validar que el usuario tenga los permisos necesarios para acceder.

//Permite solo usuarios no autenticados
export async function requireAnonymous() {
  const to = authService.isAuthenticated()
    ? authService.isAdmin()
      ? "/courses"
      : "/student"
    : "/";

  if (authService.isAuthenticated()) {
    throw redirect(to);
  }
}

//Permite solo usuarios autenticados
export async function requireAuthenticated() {
  if (!authService.isAuthenticated()) {
    throw redirect("/");
  }
}

//Permite solo usuarios con rol ADMIN
export async function requireAdmin() {
  await requireAuthenticated();
  if (!authService.isAdmin()) {
    throw redirect("/");
  }
}

//Permite solo usuarios con rol STUDENT
export async function requireStudent() {
  await requireAuthenticated();
  if (!authService.isStudent()) {
    throw redirect("/");
  }
}
