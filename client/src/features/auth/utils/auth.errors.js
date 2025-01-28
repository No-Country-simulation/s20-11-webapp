// Define todos los posibles códigos de error del backend
export const BackendErrorCode = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  SERVER_ERROR: "SERVER_ERROR",
};

// Mapeo de errores del backend a mensajes amigables para el usuario
export const ERROR_MESSAGES = {
  [BackendErrorCode.INVALID_CREDENTIALS]: {
    message: "Correo o contraseña incorrectos",
    path: ["password"], // El error se mostrará en el campo de contraseña
  },
  [BackendErrorCode.INVALID_REFRESH_TOKEN]: {
    message: "Token de refresco inválido",
    path: [], // Error general del formulario
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
  // Error por defecto
  DEFAULT: {
    message: "Error al iniciar sesión",
    path: [],
  },
};
