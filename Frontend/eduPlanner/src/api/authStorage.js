export const TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const TOKEN_EXPIRATION_KEY = "tokenExpiresAt";

// Helper para guardar los datos de autenticación en el localStorage
export const saveAuthData = ({ token, refreshToken, expiresAt }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(TOKEN_EXPIRATION_KEY, expiresAt);
};

// Helper para limpiar los datos de autenticación del localStorage
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRATION_KEY);
};

// Función para verificar si el token está a punto de expirar
export const isTokenAboutToExpire = () => {
  const expiresAt = localStorage.getItem(TOKEN_EXPIRATION_KEY);
  if (!expiresAt) return true;

  const expirationTime = new Date(expiresAt).getTime();
  const currentTime = Date.now();
  const bufferTime = 5 * 60 * 1000; // 5 minutos de margen

  //Consideramos el token a punto de expirar si el tiempo restante es menor al margen definido
  return expirationTime - currentTime < bufferTime;
};