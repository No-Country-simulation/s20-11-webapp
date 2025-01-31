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
};
