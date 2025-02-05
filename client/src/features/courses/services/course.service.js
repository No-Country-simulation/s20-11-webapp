import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios.js";

export const courseService = {
  getAllCourses: async () => {
    const data = await api.get(API_ENDPOINTS.COURSES.GET_ALL_COURSES);

    if (data.success) {
      return data.data;
    }

    return data;
  },
  getStats: async () => {
    const data = await api.get(API_ENDPOINTS.COURSES.GET_STATS);
    return data;
  },
  getCourseDetails: async (courseId) => {
    const data = await api.get(
      API_ENDPOINTS.COURSES.GET_COURSE_DETAILS(courseId)
    );

    return data;
  },

  getCourseSchedule: async (courseId) => {
    const data = await api.get(
      API_ENDPOINTS.COURSES.GET_COURSE_SCHEDULE(courseId)
    );

    return data;
  },

  createCourse: async (course) => {
    const data = await api.post(API_ENDPOINTS.COURSES.CREATE_COURSE, course);

    return data;
  },

  getCurrentStudentCourse: async () => {
    const data = await api.get(
      API_ENDPOINTS.COURSES.GET_CURRENT_STUDENT_COURSE
    );

    return data;
  },
};
//Endpoints con GET no necesitan saber el estado del response, enviar data.data
//Endpoints con POST necesitan saber el estado del response, enviar data
//Se puede ser consistente enviando solo data, pero loaders deberian aplicar desestructuracion :
// const {data} = await courseService.createCourse();
