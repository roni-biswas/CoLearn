import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";
import uploadToCloudinary from "../../../../services/uploadToCloudinary";

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch approved sessions by this tutor
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["approved-sessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sessions?email=${user.email}&status=approved`
      );
      return res.data;
    },
  });

  // Upload image to Cloudinary and submit to DB
  const onSubmit = async (data) => {
    try {
      const image = data.image;
      const imageUrl = await uploadToCloudinary(image[0]);

      const material = {
        title: data.title,
        session_id: selectedSession._id,
        tutor_email: user.email,
        image_url: imageUrl,
        resource_link: data.link,
      };

      // Save to DB
      const dbRes = await axiosSecure.post("/materials", material);

      if (dbRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Material Uploaded",
          text: "The material has been successfully uploaded.",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        setSelectedSession(null);
        document.getElementById("upload_modal").close();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload material. Try again.",
      });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Study Materials</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Session Title</th>
                <th>Duration</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session, idx) => (
                  <tr key={session._id}>
                    <td>{idx + 1}</td>
                    <td className="font-semibold">{session.title}</td>
                    <td>
                      {session.sessionDuration} month
                      {session.sessionDuration > 1 ? "s" : ""}
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => {
                          setSelectedSession(session);
                          document.getElementById("upload_modal").showModal();
                        }}
                      >
                        Upload Material
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No approved sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="upload_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">
            Upload Material for: {selectedSession?.title}
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
                placeholder="Material Title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Google Drive Link
              </label>
              <input
                type="text"
                {...register("link", { required: true })}
                className="input input-bordered w-full"
                placeholder="https://drive.google.com/..."
              />
              {errors.link && (
                <p className="text-red-500 text-sm">Link is required</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Session ID</label>
              <input
                type="text"
                value={selectedSession?._id}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Tutor Email</label>
              <input
                type="text"
                value={user?.email}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">Image is required</p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Upload
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setSelectedSession(null);
                  document.getElementById("upload_modal").close();
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

export default UploadMaterials;
