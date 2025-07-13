import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://medikart-server-pjna.onrender.com", // your API base URL
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function useAxiosSecure() {
  return axiosSecure;
}
