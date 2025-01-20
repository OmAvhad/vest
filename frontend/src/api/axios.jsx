import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/users/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await axios.post("/users/refresh", {
          refresh_token: refreshToken,
        });
        Cookies.set("accessToken", response.data.access_token);
        return axios(originalRequest);
      } catch (error) {
        console.error("Refresh token failed:", error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
