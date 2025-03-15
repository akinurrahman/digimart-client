import apiClient from "./api-client";
import { refreshToken } from "./auth-service";
import { store } from "@/redux/store";

// Function to dynamically get Redux store state
const getToken = () => store.getState().auth.accessToken;

// Request Interceptor: Attach Token to Requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor: Refresh Token on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent multiple retries

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry with new token
      }
    }

    return Promise.reject(
      error?.response?.data?.message || "Something went wrong!"
    );
  }
);

export default apiClient;
