import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Container from "../../../../components/Container";
import { useNavigate } from "react-router";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const noteData = {
      email: user.email,
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/notes", noteData);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Note created successfully", "success");
        reset();
        navigate("/dashboard/manage-notes");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to create note", "error");
    }
  };

  return (
    <Container>
      <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Create Note</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={user?.email || ""}
              readOnly
              disabled
              {...register("email")}
            />
          </div>
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter note title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={5}
              placeholder="Write your note here..."
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Create Note
          </button>
        </form>
      </div>
    </Container>
  );
};

export default CreateNote;
