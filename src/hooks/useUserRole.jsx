import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUserRole = (email) => {
  const { data: role, isLoading } = useQuery({
    queryKey: ["role", email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/role/${email}`
      );
      return res.data.role;
    },
    enabled: !!email, // only run if email exists
  });

  return [role, isLoading];
};

export default useUserRole;
