import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const BookedSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);

  // Fetch all booked sessions
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booked-sessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booked-sessions?email=${user.email}`);
      return res.data;
    },
  });

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const reviewData = {
      session_id: selectedSession?._id,
      student_email: user.email,
      student_name: user.displayName || "Anonymous",
      rating: parseFloat(form.rating.value),
      comment: form.comment.value,
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Review Submitted", "Thanks for your feedback!", "success");
        form.reset();
        refetch();
        document.getElementById("detail_modal").close();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not submit review", "error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">My Booked Sessions</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tutor</th>
                <th>Duration</th>
                <th>Class End</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session, idx) => (
                  <tr key={session._id}>
                    <td>{idx + 1}</td>
                    <td>{session.title}</td>
                    <td>{session.tutorName}</td>
                    <td>{session.sessionDuration} month(s)</td>
                    <td>
                      {new Date(session.classEndDate).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => {
                          setSelectedSession(session);
                          document.getElementById("detail_modal").showModal();
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No sessions booked.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for session details and review */}
      <dialog id="detail_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-2">{selectedSession?.title}</h3>
          <p>
            <strong>Tutor:</strong> {selectedSession?.tutorName}
          </p>
          <p>
            <strong>Duration:</strong> {selectedSession?.sessionDuration}{" "}
            month(s)
          </p>
          <p>
            <strong>Class End:</strong>{" "}
            {new Date(selectedSession?.classEndDate).toLocaleDateString()}
          </p>
          <p className="mt-2">{selectedSession?.description}</p>

          <hr className="my-4" />

          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <h4 className="text-lg font-semibold">Leave a Review</h4>
            <div>
              <label className="block mb-1">Rating (1 to 5)</label>
              <input
                type="number"
                name="rating"
                min={1}
                max={5}
                step={0.1}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Comment</label>
              <textarea
                name="comment"
                className="textarea textarea-bordered w-full"
                required
                placeholder="Write your thoughts..."
              ></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("detail_modal").close()}
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

export default BookedSessions;
