import api from "../../../api/axios";
import { API_ENDPOINTS } from "../../../api/endpoints";

export const notificationsService = {
  getStats: async () => {
    try {
      const { data } = await api.get(API_ENDPOINTS.EVENTS.GET_STATS);
      return data;
    } catch (error) {
      console.error(
        "Error en getStats for notifications:",
        error.response.data
      );
      return error.response.data;
    }
  },
  getCourseEvents: async (courseId) => {
    try {
      const { data } = await api.get(
        API_ENDPOINTS.EVENTS.GET_ALL_EVENTS(courseId)
      );
      return data;
    } catch (error) {
      console.error("Error en getCourseEvents:", error.response.data);
      return error.response.data;
    }
  },
  createEvent: async (event) => {
    console.log(`Received in service: ${JSON.stringify(event, null, 2)}`);
    try {
      const { data } = await api.post(
        API_ENDPOINTS.SUBJECTS.PUBLISH_EVENT,
        event
      );

      return data;
    } catch (error) {
      console.error("Error en createEvent:", error.response.data);
      return error.response.data;
    }
  },
};
