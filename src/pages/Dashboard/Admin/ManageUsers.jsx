import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const fetchUsers = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/users`,
    {
      headers: {
        "x-admin": "true", // simulate admin access
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  return res.data;
};

const updateUserRole = async ({ email, role }) => {
  const res = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/api/users/role/${email}`,
    { role },
    {
      headers: {
        "x-admin": "true",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  return res.data;
};

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to update role: " + error.message);
    },
  });

  const handleRoleChange = (email, newRole) => {
    mutation.mutate({ email, role: newRole });
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users.</div>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.email, e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                  disabled={mutation.isLoading}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
