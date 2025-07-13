import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AdminSessions = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null);
  const [actionType, setActionType] = useState(null); // "approve" or "reject"
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["admin-sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/sessions");
      return res.data;
    },
  });

  const approveSession = useMutation({
    mutationFn: async ({ sessionId, fee }) => {
      return axiosSecure.patch(`/sessions/${sessionId}/approve`, { fee });
    },
    onSuccess: () => {
      Swal.fire("Approved", "Session approved successfully", "success");
      queryClient.invalidateQueries(["admin-sessions"]);
    },
  });

  const { data: editingSession, isLoading: isEditLoading } = useQuery({
    queryKey: ["session", selectedSessionId],
    enabled: !!selectedSessionId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${selectedSessionId}`);
      return res.data;
    },
  });

  const rejectSession = useMutation({
    mutationFn: async ({ sessionId, reason, feedback }) => {
      return axiosSecure.patch(`/sessions/${sessionId}/reject`, {
        reason,
        feedback,
      });
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Session rejected", "info");
      queryClient.invalidateQueries(["admin-sessions"]);
    },
  });

  const deleteSession = useMutation({
    mutationFn: async (sessionId) => {
      return axiosSecure.delete(`/sessions/${sessionId}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted", "Session has been deleted", "success");
      queryClient.invalidateQueries(["admin-sessions"]);
    },
  });

  const handleApprove = (session) => {
    setSelectedSession(session);
    setActionType("approve");
    document.getElementById("session_modal").showModal();
  };

  const handleReject = (session) => {
    setSelectedSession(session);
    setActionType("reject");
    document.getElementById("session_modal").showModal();
  };

  const handleUpdate = (sessionId) => {
    setSelectedSessionId(sessionId);
    document.getElementById("update_modal").showModal();
  };

  const handleDelete = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This session will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSession.mutate(sessionId);
      }
    });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const sessionId = selectedSession._id;

    if (actionType === "approve") {
      const fee = parseFloat(form.fee.value);
      approveSession.mutate({ sessionId, fee });
    } else {
      const reason = form.reason.value;
      const feedback = form.feedback.value;
      rejectSession.mutate({ sessionId, reason, feedback });
    }

    document.getElementById("session_modal").close();
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedSession = {
      title: form.title.value,
      sessionDuration: parseInt(form.sessionDuration.value),
      classEndDate: form.classEndDate.value,
      // Add other fields as needed
      status: form.status.value, // <-- include this
    };

    try {
      const res = await axiosSecure.patch(
        `/sessions/${selectedSessionId}`,
        updatedSession
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated", "Session updated successfully", "success");
        queryClient.invalidateQueries(["admin-sessions"]);
        form.reset();
        setSelectedSessionId(null);
        document.getElementById("update_modal").close();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update session", "error");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Study Sessions</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, idx) => (
                <tr key={session._id}>
                  <td>{idx + 1}</td>
                  <td>{session.title}</td>
                  <td className="capitalize">{session.status}</td>
                  <td>
                    {session.registrationFee === 0 && session.fee === 0
                      ? "Free"
                      : session.fee >= 0
                      ? session.fee
                      : "Free"}
                  </td>
                  <td className="space-x-2">
                    {session.status === "pending" ? (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleApprove(session)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleReject(session)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        {session.status === "approved" ? (
                          <>
                            <button
                              className="btn btn-sm btn-primary mr-2"
                              onClick={() => handleUpdate(session._id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() => handleDelete(session._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-xs btn-success"
                              onClick={() => handleApprove(session)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() => handleReject(session)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog id="update_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Update Study Session</h3>

          {isEditLoading ? (
            <Loading />
          ) : editingSession ? (
            <form onSubmit={handleSubmitUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingSession.title}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    name="sessionDuration"
                    defaultValue={editingSession.sessionDuration}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Class End Date
                  </label>
                  <input
                    type="date"
                    name="classEndDate"
                    defaultValue={editingSession.classEndDate?.slice(0, 10)}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Add more fields as needed */}
                <div>
                  <label className="block font-medium mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={selectedSession?.status}
                    className="select select-bordered w-full"
                  >
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="modal-action mt-4">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSelectedSessionId(null);
                    document.getElementById("update_modal").close();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-red-500">Failed to load session data</p>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Modal for approve or reject */}
      <dialog id="session_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {actionType === "approve" ? "Approve Session" : "Reject Session"}
          </h3>
          <form onSubmit={handleModalSubmit} className="space-y-4">
            {actionType === "approve" ? (
              <>
                <label className="block font-medium">
                  Is the session free?
                </label>
                <select
                  name="fee"
                  className="select select-bordered w-full"
                  defaultValue={selectedSession?.registrationFee || 0}
                >
                  <option value={0}>Free</option>
                  <option value={50}>$50</option>
                  <option value={100}>$100</option>
                  <option value={200}>$200</option>
                  <option value={400}>$400</option>
                  <option value={500}>$500</option>
                  {/* Add more price options if needed */}
                </select>
              </>
            ) : (
              <>
                <label className="block font-medium">Rejection Reason</label>
                <input
                  type="text"
                  name="reason"
                  required
                  className="input input-bordered w-full"
                  placeholder="Reason for rejection"
                />
                <label className="block font-medium">Feedback</label>
                <textarea
                  name="feedback"
                  className="textarea textarea-bordered w-full"
                  placeholder="Optional feedback"
                ></textarea>
              </>
            )}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("session_modal").close()}
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

export default AdminSessions;
