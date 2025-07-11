import { useEffect, useState } from "react";

const useDecodedToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const loadDecoder = async () => {
      const jwtDecode = (await import("jwt-decode")).default;
      const token = localStorage.getItem("access-token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setDecodedToken(decoded);
        } catch (err) {
          console.error("Invalid token", err);
          setDecodedToken(null);
        }
      }
    };
    loadDecoder();
  }, []);

  return decodedToken;
};

export default useDecodedToken;
