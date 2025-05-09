import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8085/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Add interceptors for auth, logging, error handling
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
