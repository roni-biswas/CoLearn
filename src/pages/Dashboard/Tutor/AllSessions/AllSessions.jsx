import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AllSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State to handle which session's feedback modal is open
  const [selectedSession, setSelectedSession] = useState(null);

  // Query: get all sessions by tutor email
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutor-sessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor/sessions/status?email=${user.email}`
      );
      console.log("Response data:", res.data);
      return res.data;
    },
  });

  // PATCH request to resubmit rejected session
  const handleResubmit = async (id) => {
    try {
      const res = await axiosSecure.patch(`/sessions/${id}/request-approval`);

      if (res.status === 200) {
        Swal.fire({
          title: "Session Resubmitted",
          text:
            res.data.message ||
            "The session has been sent again for admin approval.",
          icon: "success",
          timer: 1600,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to resubmit session.";
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">My Study Sessions</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
            <table className="table table-zebra">
              <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
                <tr>
                  <th>#</th>
                  <th>Session Title</th>
                  <th>Registration Dates</th>
                  <th>Class Dates</th>
                  <th>Status</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length > 0 ? (
                  sessions.map((session, idx) => (
                    <tr key={session._id}>
                      <td>{idx + 1}</td>
                      <td className="font-semibold">{session.title}</td>
                      <td>
                        {new Date(
                          session.registrationStartDate
                        ).toLocaleDateString()}{" "}
                        –{" "}
                        {new Date(
                          session.registrationEndDate
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(session.classStartDate).toLocaleDateString()}{" "}
                        – {new Date(session.classEndDate).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            session.status === "approved"
                              ? "badge-success"
                              : session.status === "rejected"
                              ? "badge-error"
                              : "badge-warning"
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td>
                        {session.status === "rejected" ? (
                          <button
                            onClick={() => setSelectedSession(session)}
                            className="btn btn-xs btn-info"
                          >
                            View Feedback
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td>
                        {session.status === "rejected" ? (
                          <button
                            onClick={() => handleResubmit(session._id)}
                            className="btn btn-xs btn-primary"
                          >
                            Resubmit
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      No sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal for rejection feedback */}
          {selectedSession && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedSession(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative"
                onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
              >
                <h3 className="text-xl font-bold mb-4">Rejection Feedback</h3>

                <div className="mb-2">
                  <strong>Reason:</strong>{" "}
                  <p className="whitespace-pre-wrap">
                    {selectedSession.rejection_reason || "No reason provided."}
                  </p>
                </div>

                <div className="mb-4">
                  <strong>Admin Feedback:</strong>{" "}
                  <p className="whitespace-pre-wrap">
                    {selectedSession.admin_feedback || "No feedback provided."}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSession(null)}
                  className="btn btn-sm btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllSessions;
