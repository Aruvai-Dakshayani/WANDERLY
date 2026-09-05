import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// ============================================
// REQUEST INTERCEPTOR
// ============================================

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ============================================
// RESPONSE INTERCEPTOR
// ============================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {

    const originalRequest = error.config;

    // If the error is NOT 401, return it normally
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Prevent infinite retry loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    // No refresh token available
    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {

      // Request a new access token
      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/token/refresh/`,
  {
    refresh: refreshToken,
  }
);

      const newAccessToken = response.data.access;

      // Save new access token
      localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      // Update original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Retry original request
      return api(originalRequest);

    } catch (refreshError) {

      console.error(
        "Refresh token failed:",
        refreshError
      );

      // Refresh token is also invalid/expired
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;