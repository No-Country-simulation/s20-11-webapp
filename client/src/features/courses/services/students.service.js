import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios";

export const studentsService = {
  registerStudent: async (courseId, student) => {
    const data = await api.post(
      API_ENDPOINTS.STUDENTS.CREATE_STUDENT(courseId),
      {
        email: student,
      }
    );
    return data;
  },
  getAllStudents: async (courseId) => {
    const data = await api.get(
      API_ENDPOINTS.STUDENTS.GET_ALL_STUDENTS(courseId)
    );
    return data;
  },
};
