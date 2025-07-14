import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Container";

const ManageNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes by logged-in user's email
  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-notes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/notes/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Note has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.log("Something went wrong", err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedNote = {
      title: form.title.value,
      description: form.description.value,
    };

    try {
      const res = await axiosSecure.patch(
        `/notes/${editingNote._id}`,
        updatedNote
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Note updated successfully", "success");
        setEditingNote(null);
        refetch();
      }
    } catch (err) {
      console.log("Failed to update note", err);
      Swal.fire("Error", "Failed to update note", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Manage Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-100 rounded-lg shadow">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={note._id}>
                    <td>{index + 1}</td>
                    <td>{note.title}</td>
                    <td>{note.description}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => setEditingNote(note)}
                        className="btn btn-sm btn-warning"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {editingNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Edit Note</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  defaultValue={editingNote.title}
                  name="title"
                  className="input input-bordered w-full"
                  required
                />
                <textarea
                  defaultValue={editingNote.description}
                  name="description"
                  rows={5}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="btn btn-sm"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageNotes;
