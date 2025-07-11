import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; //
import { useAuth } from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/role/${user.email}`);
      return res.data.role;
    },
    enabled: !!user?.email,
  });

  return [role, isLoading];
};

export default useUserRole;
