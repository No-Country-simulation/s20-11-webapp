export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  COURSES: {
    CREATE_COURSE: "/courses",
    GET_ALL_COURSES: "/courses",
    GET_COURSE_DETAILS: (courseId) => `/courses/${courseId}`,
    GET_COURSE_SCHEDULE: (courseId) => `/courses/${courseId}/schedule`,
  },
  SUBJECTS: {
    CREATE_SUBJECT: (courseId) => `/courses/${courseId}/subjects`,
    GET_ALL_SUBJECTS: (courseId) => `/courses/${courseId}/subjects`,
    UPDATE_SUBJECT_FOR_BLOCK: (courseId) =>
      `/courses/${courseId}/subjects/add-to-block`,
    REMOVE_SUBJECT_FROM_BLOCK: (courseId) =>
      `/courses/${courseId}/subjects/remove-from-block`,
    SEND_NOTIFICATION: "/subjects/send-notification",
  },
};
