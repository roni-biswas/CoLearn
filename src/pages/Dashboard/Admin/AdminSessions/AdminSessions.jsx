import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState, useRef } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AdminSessions = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const sessionModalRef = useRef(null);
  const updateModalRef = useRef(null);
  const viewModalRef = useRef(null); // <-- new ref for view modal

  const [selectedSession, setSelectedSession] = useState(null);
  const [actionType, setActionType] = useState(null); // "approve" or "reject"
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [viewSession, setViewSession] = useState(null); // <-- session to view

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["admin-sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/sessions");
      return res.data;
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

  const approveSession = useMutation({
    mutationFn: async ({ sessionId, fee }) => {
      return axiosSecure.patch(`/sessions/${sessionId}/approve`, { fee });
    },
    onSuccess: () => {
      Swal.fire("Approved", "Session approved successfully", "success");
      queryClient.invalidateQueries(["admin-sessions"]);
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
    sessionModalRef.current?.showModal();
  };

  const handleReject = (session) => {
    setSelectedSession(session);
    setActionType("reject");
    sessionModalRef.current?.showModal();
  };

  const handleUpdate = (sessionId) => {
    setSelectedSessionId(sessionId);
    updateModalRef.current?.showModal();
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

  // NEW: open view details modal
  const handleViewDetails = (session) => {
    setViewSession(session);
    viewModalRef.current?.showModal();
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

    closeSessionModal();
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedSession = {
      title: form.title.value,
      sessionDuration: parseInt(form.sessionDuration.value),
      classEndDate: form.classEndDate.value,
      fee: parseFloat(form.fee.value),
      status: form.status.value,
      // Add other fields here as needed
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
        closeUpdateModal();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update session", "error");
    }
  };

  const closeSessionModal = () => {
    setSelectedSession(null);
    setActionType(null);
    sessionModalRef.current?.close();
  };

  const closeUpdateModal = () => {
    setSelectedSessionId(null);
    updateModalRef.current?.close();
  };

  // NEW: close view modal
  const closeViewModal = () => {
    setViewSession(null);
    viewModalRef.current?.close();
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
                    {(session.fee ?? session.registrationFee) > 0
                      ? `$${session.fee ?? session.registrationFee}`
                      : "Free"}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleViewDetails(session)}
                    >
                      View Details
                    </button>

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
                    ) : session.status === "approved" ? (
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      <dialog id="update_modal" className="modal" ref={updateModalRef}>
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

                <div>
                  <label className="block font-medium mb-1">
                    Registration Fee
                  </label>
                  <select
                    name="fee"
                    className="select select-bordered w-full"
                    defaultValue={editingSession?.fee || 0}
                  >
                    <option value={0}>Free</option>
                    <option value={50}>$50</option>
                    <option value={100}>$100</option>
                    <option value={200}>$200</option>
                    <option value={400}>$400</option>
                    <option value={500}>$500</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingSession?.status || "approved"}
                    className="select select-bordered w-full"
                  >
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="modal-action mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={approveSession.isLoading}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-red-500">Failed to load session data</p>
          )}
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={closeUpdateModal}
        >
          <button>close</button>
        </form>
      </dialog>

      {/* Approve/Reject Modal */}
      <dialog id="session_modal" className="modal" ref={sessionModalRef}>
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={approveSession.isLoading || rejectSession.isLoading}
              >
                Submit
              </button>
              <button type="button" className="btn" onClick={closeSessionModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={closeSessionModal}
        >
          <button>close</button>
        </form>
      </dialog>

      {/* View Details Modal */}
      <dialog id="view_modal" className="modal" ref={viewModalRef}>
        <div className="modal-box max-w-3xl max-h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-lg mb-4">Session Details</h3>

          {viewSession ? (
            <div className="space-y-3 text-sm">
              {Object.entries(viewSession)
                .filter(([key]) => key !== "_id")
                .map(([key, value]) => {
                  // Check if value is date string or Date object
                  let displayValue = value;
                  if (typeof value === "string" || value instanceof Date) {
                    const date = new Date(value);
                    if (!isNaN(date.getTime())) {
                      displayValue = date.toLocaleString();
                    }
                  } else if (typeof value === "object") {
                    // For objects, stringify prettily
                    displayValue = JSON.stringify(value, null, 2);
                  }

                  return (
                    <div key={key} className="flex">
                      <strong className="w-48 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}:
                      </strong>
                      <span className="break-words whitespace-pre-wrap">
                        {displayValue}
                      </span>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p>No session data available</p>
          )}

          <div className="modal-action mt-6">
            <button className="btn" onClick={closeViewModal}>
              Close
            </button>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={closeViewModal}
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AdminSessions;
