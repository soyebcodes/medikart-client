

export const getJWTToken = async (email) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/jwt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }), // match backend structure
  });

  const data = await res.json();
  if (data?.token) {
    localStorage.setItem("access-token", data.token); // ✅ used by useAxiosSecure
  } else {
    throw new Error("Failed to get token");
  }
};
