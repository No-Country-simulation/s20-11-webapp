import { API_ENDPOINTS } from "@/api/endpoints.js";
import api from "../../../api/axios";

export const profileService = {
  getProfileInfo: async () => {
    const { data } = await api.get(API_ENDPOINTS.PROFILE.GET_PROFILE_INFO);
    return data;
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
