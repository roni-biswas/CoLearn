import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import uploadToCloudinary from "../../../../services/uploadToCloudinary";
import Loading from "../../../../components/Loading";

const AllMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingMaterial, setEditingMaterial] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/materials/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The material has been deleted.", "success");
      queryClient.invalidateQueries(["materials", user.email]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete material", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updated) => {
      return axiosSecure.patch(`/materials/${updated._id}`, updated);
    },
    onSuccess: () => {
      Swal.fire(
        "Updated!",
        "The material was updated successfully.",
        "success"
      );
      queryClient.invalidateQueries(["materials", user.email]);
      reset();
      setEditingMaterial(null);
      document.getElementById("edit_modal").close();
    },
    onError: () => {
      Swal.fire("Error", "Update failed. Try again.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the material.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditOpen = (material) => {
    setEditingMaterial(material);
    setValue("title", material.title);
    setValue("link", material.resource_link);
    document.getElementById("edit_modal").showModal();
  };

  const onUpdateSubmit = async (data) => {
    let imageUrl = editingMaterial.image_url;

    // if new image uploaded
    if (data.image?.length) {
      const file = data.image[0];
      imageUrl = await uploadToCloudinary(file);
    }

    const updated = {
      _id: editingMaterial._id,
      title: data.title,
      resource_link: data.link,
      image_url: imageUrl,
    };

    updateMutation.mutate(updated);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">All Uploaded Materials</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Image</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, i) => (
                <tr key={mat._id}>
                  <td>{i + 1}</td>
                  <td>{mat.title}</td>
                  <td>
                    <img
                      src={mat.image_url}
                      alt={mat.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>
                    <a
                      href={mat.resource_link}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-blue-500"
                    >
                      View Link
                    </a>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleEditOpen(mat)}
                      className="btn btn-xs btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(mat._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {materials.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No materials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit Material</h3>

          <form
            onSubmit={handleSubmit(onUpdateSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Google Drive Link
              </label>
              <input
                type="text"
                {...register("link", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.link && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">
                Upload New Image (optional)
              </label>
              <input
                type="file"
                {...register("image")}
                accept="image/*"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setEditingMaterial(null);
                  document.getElementById("edit_modal").close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AllMaterials;
