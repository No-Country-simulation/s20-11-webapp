import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios";

export const subjectService = {
  createSubject: async (courseId, subject) => {
    const data = await api.post(
      API_ENDPOINTS.SUBJECTS.CREATE_SUBJECT(courseId),
      {
        name: subject,
      }
    );
    return data;
  },
  getSubjects: async (courseId) => {
    const data = await api.get(
      API_ENDPOINTS.SUBJECTS.GET_ALL_SUBJECTS(courseId)
    );
    return data;
  },
  assignSubjectToBlock: async (courseId, blockId, subjectId) => {
    const data = await api.put(
      API_ENDPOINTS.SUBJECTS.UPDATE_SUBJECT_FOR_BLOCK(courseId),
      { blockId, subjectId }
    );
    return data;
  },
  updateSubjectData: async (subjectData) => {
    const data = await api.put(API_ENDPOINTS.SUBJECTS.UPDATE_INFO, subjectData);

    return data;
  },
};
