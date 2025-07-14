import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";
import Container from "../../../../components/Container";

const StudyMaterials = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedSessionId, setSelectedSessionId] = useState("");

  // Fetch booked sessions for logged in student
  const {
    data: bookedSessions = [],
    isLoading: loadingBookings,
    error: bookingError,
  } = useQuery({
    queryKey: ["bookedSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch materials for selected session
  const {
    data: materials = [],
    isLoading: loadingMaterials,
    error: materialsError,
  } = useQuery({
    queryKey: ["study-materials", selectedSessionId],
    enabled: !!selectedSessionId,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/study/materials?sessionId=${selectedSessionId}`
      );
      return res.data;
    },
  });

  if (loadingBookings || (selectedSessionId && loadingMaterials)) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (bookingError) {
    return (
      <p className="text-center text-red-500">
        Failed to load booked sessions.
      </p>
    );
  }

  if (materialsError) {
    return (
      <p className="text-center text-red-500">Failed to load materials.</p>
    );
  }

  return (
    <Container>
      <div className="py-10 space-y-6">
        <h2 className="text-3xl font-bold text-center">Study Materials</h2>

        {/* Session selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <label className="font-semibold">Select a Session:</label>
          <select
            className="select select-bordered w-72"
            value={selectedSessionId}
            onChange={(e) => setSelectedSessionId(e.target.value)}
          >
            <option value="">-- Choose --</option>
            {bookedSessions.map((item) => (
              <option key={item._id} value={item.session_id}>
                {item.sessionInfo?.title || "Untitled Session"}
              </option>
            ))}
          </select>
        </div>

        {/* Materials Table */}
        {selectedSessionId && (
          <div className="overflow-x-auto mt-6">
            {materials.length > 0 ? (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Download</th>
                    <th>Google Drive Link</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((mat, idx) => (
                    <tr key={mat._id}>
                      <td>{idx + 1}</td>
                      <td>{mat.title}</td>
                      <td>
                        <img
                          src={mat.image_url}
                          alt={mat.title}
                          className="w-24 h-20 object-cover rounded border"
                        />
                      </td>
                      <td>
                        <a
                          href={mat.image_url}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          Download
                        </a>
                      </td>
                      <td>
                        <a
                          href={mat.resource_link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 underline"
                        >
                          Open Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-lg mt-6">
                No materials found for this session.
              </p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default StudyMaterials;
