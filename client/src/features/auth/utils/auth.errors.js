// Define todos los posibles códigos de error del backend
export const BackendErrorCode = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  UNVERIFIED_ACCOUNT: "UNVERIFIED_ACCOUNT",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  USER_ACCOUNT_ALREADY_VERIFIED: "USER_ACCOUNT_ALREADY_VERIFIED",
  SERVER_ERROR: "SERVER_ERROR",
};

// Mapeo de errores del backend a mensajes amigables para el usuario
export const ERROR_MESSAGES = {
  [BackendErrorCode.INVALID_CREDENTIALS]: {
    message: "Correo o contraseña incorrectos",
    path: ["password"],
  },
  [BackendErrorCode.UNVERIFIED_ACCOUNT]: {
    message: "Correo o contraseña incorrectos",
    path: [],
  },
  [BackendErrorCode.ACCOUNT_LOCKED]: {
    message: "Cuenta bloqueada",
    path: [],
  },
  [BackendErrorCode.INVALID_REFRESH_TOKEN]: {
    message: "Token de refresco inválido",
    path: [],
  },
  [BackendErrorCode.USER_ALREADY_REGISTERED]: {
    message: "El correo ya está registrado",
    path: ["email"],
  },
  [BackendErrorCode.USER_NOT_FOUND]: {
    message: "No existe un usuario asociado a este correo",
    path: ["email"],
  },
  [BackendErrorCode.SERVER_ERROR]: {
    message: "Error del servidor. Por favor intenta más tarde",
    path: [],
  },
  [BackendErrorCode.USER_ACCOUNT_ALREADY_VERIFIED]: {
    message: "La cuenta ya se encuentra verificada",
    path: ["email"],
  },
  // Error por defecto
  DEFAULT: {
    message: "Error al iniciar sesión",
    path: [],
  },
};
