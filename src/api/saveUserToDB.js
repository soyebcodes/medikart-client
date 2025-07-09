import axios from "axios";

export const saveUserToDB = async (user) => {
  const userData = {
    username: user.displayName || "Unnamed",
    email: user.email,
    photo: user.photoURL || "",
    role: "user", 
  };

  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/${user.email}`,
      userData
    );
    return res.data;
  } catch (err) {
    console.error("Failed to save user:", err.message);
    throw err;
  }
};
