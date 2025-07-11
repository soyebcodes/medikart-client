import axios from "axios";

const useAxiosSecure = () => {
  const token = localStorage.getItem("access-token");
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
};

export default useAxiosSecure;
