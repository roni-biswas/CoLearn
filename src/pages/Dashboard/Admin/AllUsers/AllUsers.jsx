import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import useAuth from "../../../../hooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      return axiosSecure.patch(`/users/${userId}`, { role: newRole });
    },
    onSuccess: () => {
      Swal.fire("Success", "User role updated", "success");
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update user role", "error");
    },
  });

  const handleRoleChange = (userId, newRole) => {
    if (!userId || !newRole) return;
    updateRoleMutation.mutate({ userId, newRole });
  };

  const filteredUsers = users.filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full md:max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, idx) => (
                  <tr key={u._id}>
                    <td>{idx + 1}</td>
                    <td>{u.displayName || u.name || "N/A"}</td>
                    <td>{u.email}</td>
                    <td className="capitalize">{u.role || "student"}</td>
                    <td>
                      <select
                        className="select select-bordered select-sm"
                        value={u.role}
                        disabled={
                          updateRoleMutation.isLoading ||
                          u.email === user?.email
                        }
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                      >
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
