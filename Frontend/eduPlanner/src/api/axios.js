import axios from "axios";
import { BackendErrorCode } from "../features/auth/utils/auth.errors";
import {
  clearAuthData,
  isTokenAboutToExpire,
  REFRESH_TOKEN_KEY,
  saveAuthData,
  TOKEN_KEY,
} from "./authStorage";
import { API_ENDPOINTS } from "./endpoints";

const LOGIN_URL = "/login";

// const API_BASE_URL = "https://eduplanner.fly.dev"; //TODO: move to ENV
const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Lógica para refrescar el token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new Error("No se encuentra el token de refresco");

  const response = await axios.post(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  if (response.data.success) {
    const {
      token,
      refreshToken: newRefreshToken,
      expiresAt,
    } = response.data.data;
    saveAuthData({ token, refreshToken: newRefreshToken, expiresAt });
    return token;
  }

  throw new Error("Error al refrescar el token");
};

// ==================== Interceptores de AXIOS ====================
// ================================================================

/**
 * Interceptor de requests para añadir el token JWT a los headers.
 * Renueva el token si está próximo a expirar.
 */
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (isTokenAboutToExpire()) {
        try {
          const newToken = await refreshToken();
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          clearAuthData();
          window.location.href = LOGIN_URL; // Redirect to login on failure
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar el refresco del token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica si el error es por token expirado (401) y no se ha reintentado antes
    if (error.response.status === 401 && !originalRequest._retry) {
      const isTokenExpiredError =
        error.response.data?.error?.code === BackendErrorCode.TOKEN_EXPIRED;

      if (isTokenExpiredError) {
        originalRequest._retry = true; // Marca la petición como reintentada

        try {
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest); // Reintenta la petición original
        } catch (refreshError) {
          clearAuthData(); // Borra los datos de autenticación si falla el refresh
          window.location.href = LOGIN_URL; // Redirige al login si falla
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
