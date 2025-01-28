import api from "../../../api/axios";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const studentsService = {
  registerStudent: async (courseId, student) => {
    console.log(`Student: ${JSON.stringify(student)}`);
    try {
      const { data } = await api.post(
        API_ENDPOINTS.STUDENTS.CREATE_STUDENT(courseId),
        {
          email: student,
        }
      );
      return data;
    } catch (error) {
      console.error("Error al registrar el estudiante:", error);
      return error.response.data;
    }
  },
  getAllStudents: async (courseId) => {
    const { data } = await api.get(
      API_ENDPOINTS.STUDENTS.GET_ALL_STUDENTS(courseId)
    );
    return data;
  },
};
