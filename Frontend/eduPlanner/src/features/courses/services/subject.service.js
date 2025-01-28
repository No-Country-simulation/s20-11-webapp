import api from "../../../api/axios";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const subjectService = {
  createSubject: async (courseId, subject) => {
    console.log(`Called createSubject with courseId: ${courseId} and subject: ${subject}`);
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
};
