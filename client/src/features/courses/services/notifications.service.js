import api from "../../../api/axios";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const notificationsService = {
  getStats: async () => {
    const data = await api.get(API_ENDPOINTS.EVENTS.GET_STATS);
    return data;
  },
  getCourseEvents: async (courseId) => {
    const data = await api.get(API_ENDPOINTS.EVENTS.GET_ALL_EVENTS(courseId));
    return data;
  },
  createEvent: async (event) => {
    const data = await api.post(API_ENDPOINTS.SUBJECTS.PUBLISH_EVENT, event);

    return data;
  },
};
