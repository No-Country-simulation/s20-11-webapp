export const BackendErrorCode = {
  COURSE_NOT_FOUND: "COURSE_NOT_FOUND",
  DUPLICATED_SUBJECT: "DUPLICATED_SUBJECT",
  DUPLICATED_COURSE: "DUPLICATED_COURSE",
  INVALID_COURSE_CONFIGURATION: "INVALID_COURSE_CONFIGURATION",
  INVALID_SUBJECT_ASSIGNMENT: "INVALID_SUBJECT_ASSIGNMENT",
  INVALID_SUBJECT_FOR_TYPE: "INVALID_SUBJECT_FOR_TYPE",
  SCHEDULE_ALREADY_INITIALIZED: "SCHEDULE_ALREADY_INITIALIZED",
  SCHEDULE_BLOCK_NOT_FOUND: "SCHEDULE_BLOCK_NOT_FOUND",
  SUBJECT_NOT_FOUND: "SUBJECT_NOT_FOUND",
  SERVER_ERROR: "SERVER_ERROR",
};

export const COURSE_ERROR_MESSAGES = {
  [BackendErrorCode.COURSE_NOT_FOUND]: {
    message: "No se encontró el curso",
    path: ["courseId"],
  },
  [BackendErrorCode.DUPLICATED_SUBJECT]: {
    message: "Ya existe una asignatura con este nombre",
    path: ["subjectName"],
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
  [BackendErrorCode.SERVER_ERROR]: {
    message: "Error del servidor. Por favor intenta más tarde",
    path: [],
  },
  // Error por defecto
  DEFAULT: {
    message: "Error al obtener los datos del curso",
    path: [],
  },
};
