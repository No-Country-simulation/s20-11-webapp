export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  PROFILE: {
    GET_PROFILE_INFO: "/auth/current-user",
  },
  COURSES: {
    CREATE_COURSE: "/courses",
    GET_ALL_COURSES: "/courses",
    GET_COURSE_DETAILS: (courseId) => `/courses/${courseId}`,
    GET_COURSE_SCHEDULE: (courseId) => `/courses/${courseId}/schedule`,
  },
  STUDENTS: {
    CREATE_STUDENT: (courseId) => `/courses/${courseId}/students`,
    GET_ALL_STUDENTS: (courseId) => `/courses/${courseId}/students`,
  },
  SUBJECTS: {
    CREATE_SUBJECT: (courseId) => `/courses/${courseId}/subjects`,
    GET_ALL_SUBJECTS: (courseId) => `/courses/${courseId}/subjects`,
    UPDATE_SUBJECT_FOR_BLOCK: (courseId) =>
      `/courses/${courseId}/subjects/add-to-block`,
    REMOVE_SUBJECT_FROM_BLOCK: (courseId) =>
      `/courses/${courseId}/subjects/remove-from-block`,
    SEND_NOTIFICATION: "/subjects/send-notification",
    PUBLISH_EVENT: (courseId) => `/courses/${courseId}/send-notification`,
  },
  EVENTS: {
    GET_ALL_EVENTS: (courseId) => `/notifications/${courseId}`,
    GET_EVENT_DETAILS: (eventId) => `/notifications/details/${eventId}`,
  },
};
