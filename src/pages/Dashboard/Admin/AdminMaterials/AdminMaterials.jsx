import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AdminMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["all-materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/materials");
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/materials/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire("Deleted", "Material removed successfully", "success");
        queryClient.invalidateQueries(["all-materials"]);
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete material", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the material.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">All Study Materials</h2>

      {isLoading ? (
        <Loading />
      ) : materials.length > 0 ? (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Session ID</th>
                <th>Tutor Email</th>
                <th>Image</th>
                <th>Drive Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{item.title}</td>
                  <td>{item.session_id}</td>
                  <td>{item.tutor_email}</td>
                  <td>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>
                    <a
                      href={item.resource_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link text-blue-600"
                    >
                      View Link
                    </a>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No materials found.</p>
      )}
    </div>
  );
};

export default AdminMaterials;
