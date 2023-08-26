import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.get("/auth/refresh");
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", response.data.accessToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      if (accessToken) {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common.Authorization = "Bearer " + accessToken;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
