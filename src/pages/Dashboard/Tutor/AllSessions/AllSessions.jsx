import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";

const AllSessions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Query: get all sessions by tutor email
  const {
    data: sessions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutor-sessions", user?.email],
    enabled: !!user?.email, // wait for user email
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/status?email=${user.email}`);
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
      // error.response contains message from server
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
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra">
            <thead className="bg-base-200 text-sm uppercase text-gray-600 dark:text-gray-300">
              <tr>
                <th>#</th>
                <th>Session Title</th>
                <th>Registration Dates</th>
                <th>Class Dates</th>
                <th>Status</th>
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
                      {new Date(session.classStartDate).toLocaleDateString()} –{" "}
                      {new Date(session.classEndDate).toLocaleDateString()}
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
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No sessions found.
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

export default AllSessions;
