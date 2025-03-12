import apiClient from "./api-client";
import { store } from "@/redux/store";
import { setAccessToken, logout } from "@/redux/features/auth/auth-slice";

export const refreshToken = async () => {
  try {
    const response = await apiClient.post(
      "/api/v1/auth/refresh",
      {},
      { withCredentials: true }
    );
    store.dispatch(setAccessToken(response.data.data));
    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);
    store.dispatch(logout());
    window.location.href = "/login";
    return null;
  }
};
