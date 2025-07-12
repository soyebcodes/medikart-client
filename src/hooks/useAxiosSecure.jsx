import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxiosSecure;
