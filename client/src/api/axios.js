import axios from "axios";
import { BackendErrorCode } from "../features/auth/utils/auth.errors";
import {
  clearAuthData,
  REFRESH_TOKEN_KEY,
  saveAuthData,
  TOKEN_EXPIRATION_KEY,
  TOKEN_KEY,
} from "./authStorage";
import { API_ENDPOINTS } from "./endpoints";

const LOGIN_URL = "/";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

let isRefreshing = false;
let refreshSubscribers = [];
let refreshTimeout = null;

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

const refreshToken = async () => {
  const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!storedRefreshToken) {
    throw new Error("No refresh token found");
  }

  console.log("🔃 Attempting to refresh token...");

  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedRefreshToken}`,
        },
      }
    );

    if (response.data.success) {
      const {
        token,
        refreshToken: newRefreshToken,
        expiresAt,
      } = response.data.data;

      console.log("✅ Token refresh successful");

      // Save the new tokens and expiration time
      saveAuthData({ token, refreshToken: newRefreshToken, expiresAt });

      // (Re-)schedule the next refresh based on the new expiration time.
      scheduleTokenRefresh();

      return token;
    }

    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    throw error;
  }
};

/**
 * Schedules a background token refresh.
 * Reads the stored expiration time (expiresAt), and sets a timeout to refresh the token
 * 1 minute before it expires.
 */
export const scheduleTokenRefresh = () => {
  // Clear any previously set timeout
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  // Get the expiration time from storage. It should be in a format that the Date constructor can parse.
  const expiresAt = localStorage.getItem(TOKEN_EXPIRATION_KEY);
  if (!expiresAt) return;

  const expiresAtDate = new Date(expiresAt);
  const now = new Date();
  const msUntilExpiry = expiresAtDate.getTime() - now.getTime();

  // Set the refresh to happen 1 minute before expiration
  const refreshDelay = msUntilExpiry - 60 * 1000;

  if (refreshDelay <= 0) {
    // Token is already expired or too close to expiry; refresh immediately.
    refreshToken().catch(() => {
      clearAuthData();
      window.location.href = LOGIN_URL;
    });
  } else {
    console.log(
      `⏳ Scheduling token refresh in ${Math.floor(
        refreshDelay / 1000
      )} seconds`
    );
    refreshTimeout = setTimeout(() => {
      refreshToken().catch(() => {
        clearAuthData();
        window.location.href = LOGIN_URL;
      });
    }, refreshDelay);
  }
};

/**
 * Axios request interceptor.
 * Attaches the access token from local storage.
 * (Note: The background refresh mechanism will keep the token updated even if no requests are made.)
 */
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return config;

    // For the refresh endpoint itself, use the token directly.
    if (config.url === API_ENDPOINTS.AUTH.REFRESH) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    // Attach the current access token to every request.
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Axios response interceptor.
 * If a request fails with a 401 error due to an expired token,
 * it attempts to refresh the token and then replays the original request.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 responses due to token expiration (using your backend's error code).
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data?.error?.code === BackendErrorCode.TOKEN_EXPIRED
    ) {
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
        // If a refresh is already in progress, wait for it to complete.
        try {
          const newToken = await new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Initialize the background token refresh if a token is already stored.
if (localStorage.getItem(TOKEN_KEY)) {
  scheduleTokenRefresh();
}

export default api;
