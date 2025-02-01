import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios";

export const profileService = {
  getProfileInfo: async () => {
    const { data } = await api.get(API_ENDPOINTS.PROFILE.GET_PROFILE_INFO);
    return data;
  },
  updateProfileInfo: async (profileData) => {
    try {
      const { data } = await api.put(
        API_ENDPOINTS.PROFILE.UPDATE_PROFILE_INFO,
        profileData
      );
      return data;
    } catch (error) {
      console.error("Error en updateProfileInfo:", error.response.data);
      return error.response.data;
    }
  },
  uploadProfilePhoto: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    await api.put(API_ENDPOINTS.PROFILE.UPLOAD_PROFILE_PHOTO, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
