import axios from "axios";

export const getJWTToken = async (email) => {
  const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/jwt`, {
    email,
  });

  const token = res.data.token;

  localStorage.setItem("access-token", token); // store it
  return token;
};
