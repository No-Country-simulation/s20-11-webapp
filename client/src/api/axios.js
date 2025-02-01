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

const LOGIN_URL = "/";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

let isRefreshing = false;
let refreshSubscribers = [];

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const processQueue = (error, token = null) => {
  refreshSubscribers.forEach((callback) => {
    if (error) {
      callback.reject(error);
    } else {
      callback.resolve(token);
    }
  });
  refreshSubscribers = [];
};

// Lógica para refrescar el token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  console.log("🔃 Attempting to refresh token...");

  try {
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

      console.log("Token refresh successful");
      saveAuthData({ token, refreshToken: newRefreshToken, expiresAt });
      return token;
    }
    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return config;

    // Don't check expiration for refresh token requests
    if (config.url === API_ENDPOINTS.AUTH.REFRESH) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    if (isTokenAboutToExpire()) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          config.headers.Authorization = `Bearer ${newToken}`;
          isRefreshing = false;
          processQueue(null, newToken);

          console.log("🟢 Token was refreshed before it expired.");
        } catch (error) {
          console.log(
            `🔴 Could not refresh token. Going to back to login: ${error}`
          );

          processQueue(error, null);
          clearAuthData();
          window.location.href = LOGIN_URL;
          return Promise.reject(error);
        }
      } else {
        // Wait for the ongoing refresh to complete
        try {
          const newToken = await new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
          });
          config.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.error?.code === BackendErrorCode.TOKEN_EXPIRED
    ) {
      console.log(`Retrying original request after auth error: ${JSON.stringify(error.response,null,2 )}`)
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          isRefreshing = false;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          clearAuthData();
          window.location.href = LOGIN_URL;
          return Promise.reject(refreshError);
        }
      } else {
        // Wait for the ongoing refresh to complete
        try {
          const newToken = await new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
