import api from "@/api/axiosInstance";
export const getProfile = () => {
  return api.get("guide/my-profile");
};