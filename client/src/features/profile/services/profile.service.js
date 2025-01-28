import api from "../../../api/axios";
import { API_ENDPOINTS } from "@/api/endpoints.js";

export const profileService = {
  getProfileInfo: async () => {
    const { data } = await api.get(API_ENDPOINTS.PROFILE.GET_PROFILE_INFO);
    return data;
  },
};
