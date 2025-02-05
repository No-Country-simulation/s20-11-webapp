const BackendErrorCode = {
  COURSE_NOT_FOUND: "COURSE_NOT_FOUND",
  DUPLICATED_SUBJECT: "DUPLICATED_SUBJECT",
  DUPLICATED_COURSE: "DUPLICATED_COURSE",
  USER_ALREADY_REGISTERED: "USER_ALREADY_REGISTERED",
  INVALID_COURSE_CONFIGURATION: "INVALID_COURSE_CONFIGURATION",
  INVALID_SUBJECT_ASSIGNMENT: "INVALID_SUBJECT_ASSIGNMENT",
  INVALID_SUBJECT_FOR_TYPE: "INVALID_SUBJECT_FOR_TYPE",
  SCHEDULE_ALREADY_INITIALIZED: "SCHEDULE_ALREADY_INITIALIZED",
  SCHEDULE_BLOCK_NOT_FOUND: "SCHEDULE_BLOCK_NOT_FOUND",
  SUBJECT_NOT_FOUND: "SUBJECT_NOT_FOUND",
  //auth
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

export const ALL_ERROR_MESSAGES = {
  [BackendErrorCode.COURSE_NOT_FOUND]: {
    message: "No se encontró el curso",
    path: ["courseId"],
  },
  [BackendErrorCode.DUPLICATED_SUBJECT]: {
    message: "Ya existe una asignatura con este nombre",
    path: ["subjectName"],
  },
  [BackendErrorCode.USER_ALREADY_REGISTERED]: {
    message: "El correo ya está registrado en sistema",
    path: ["email"],
  },
  [BackendErrorCode.DUPLICATED_COURSE]: {
    message: "Ya existe un curso con este nombre",
    path: ["courseName"],
  },
  [BackendErrorCode.INVALID_COURSE_CONFIGURATION]: {
    message: "La configuración del curso es inválida",
    path: ["courseConfiguration"],
  },
  [BackendErrorCode.INVALID_SUBJECT_ASSIGNMENT]: {
    message: "La asignatura no es válida para este tipo de curso",
    path: ["subjectId"],
  },
  [BackendErrorCode.SCHEDULE_ALREADY_INITIALIZED]: {
    message: "El horario ya está inicializado",
    path: ["scheduleId"],
  },
  [BackendErrorCode.SCHEDULE_BLOCK_NOT_FOUND]: {
    message: "No se encontró el bloque de horario",
    path: ["scheduleBlockId"],
  },
  [BackendErrorCode.SUBJECT_NOT_FOUND]: {
    message: "No se encontró la asignatura",
    path: ["subjectId"],
  },

  //auth
  [BackendErrorCode.INVALID_CREDENTIALS]: {
    message: "Correo o contraseña incorrectos",
    path: ["password"],
  },
  [BackendErrorCode.UNVERIFIED_ACCOUNT]: {
    message: "Cuenta sin verificar",
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

  [BackendErrorCode.USER_ACCOUNT_ALREADY_VERIFIED]: {
    message: "La cuenta ya se encuentra verificada",
    path: ["email"],
  },
  // Error por defecto
  [BackendErrorCode.SERVER_ERROR]: {
    message: "Error del servidor. Por favor intenta más tarde",
    path: [],
  },
  DEFAULT: {
    message: "Error desconocido",
    path: [],
  },
};
