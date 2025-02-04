import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios";

export const subjectService = {
  createSubject: async (courseId, subject) => {
    try {
      const { data } = await api.post(
        API_ENDPOINTS.SUBJECTS.CREATE_SUBJECT(courseId),
        {
          name: subject,
        }
      );
      return data;
    } catch (error) {
      console.error("Error al crear la materia:", error);
      return error.response.data;
    }
  },
  getSubjects: async (courseId) => {
    const { data } = await api.get(
      API_ENDPOINTS.SUBJECTS.GET_ALL_SUBJECTS(courseId)
    );
    return data;
  },
  assignSubjectToBlock: async (courseId, blockId, subjectId) => {
    try {
      console.log(`Received blockId: ${blockId} and subjectId: ${subjectId}`);

      const { data } = await api.put(
        API_ENDPOINTS.SUBJECTS.UPDATE_SUBJECT_FOR_BLOCK(courseId),
        { blockId, subjectId }
      );
      return data;
    } catch (error) {
      console.error("Error al asignar la materia al bloque:", error);
      return SERVER_ERROR;
    }
  },
  updateSubjectData: async (subjectData) => {
    try {
      const { data } = await api.put(
        API_ENDPOINTS.SUBJECTS.UPDATE_INFO,
        subjectData
      );

      return data;
    } catch (error) {
      console.error("Error en updateSubjectData:", error.response.data);
      return error.response.data;
    }
  },
};
