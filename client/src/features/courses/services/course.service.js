import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios.js";

export const courseService = {
  getAllCourses: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COURSES.GET_ALL_COURSES);

      if (data.success) {
        return data.data;
      }

      return data;
    } catch (error) {
      console.error("Error en getAllCourses:", error.response.data);
      return error.response.data;
    }
  },
  getStats: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.COURSES.GET_STATS);
      return data;
    } catch (error) {
      console.error("Error en getStats for courses:", error.response.data);
      return error.response.data;
    }
  },
  getCourseDetails: async (courseId) => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.COURSES.GET_COURSE_DETAILS(courseId)
      );
      if (data.success) {
        return data.data;
      }

      return data;
    } catch (error) {
      console.error("Error en getCourseDetails:", error.response.data);
      return error.response.data;
    }
  },

  getCourseSchedule: async (courseId) => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.COURSES.GET_COURSE_SCHEDULE(courseId)
      );
      if (data.success) {
        return data.data;
      }

      return data;
    } catch (error) {
      console.error("Error en getCourseSchedule:", error.response.data);
      return error.response.data;
    }
  },

  createCourse: async (course) => {
    try {
      const { data } = await api.post(
        API_ENDPOINTS.COURSES.CREATE_COURSE,
        course
      );

      return data;
    } catch (error) {
      console.error("Error en createCourse:", error.response.data);
      return error.response.data;
    }
  },
};
//Endpoints con GET no necesitan saber el estado del response, enviar data.data
//Endpoints con POST necesitan saber el estado del response, enviar data
//Se puede ser consistente enviando solo data, pero loaders deberian aplicar desestructuracion :
// const {data} = await courseService.createCourse();
