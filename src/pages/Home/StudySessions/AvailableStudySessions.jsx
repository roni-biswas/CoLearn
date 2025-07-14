import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../components/Container";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // axios hook with auth
import Loading from "../../../components/Loading";

const AvailableStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const now = new Date();
  const [selectedSession, setSelectedSession] = useState(null);

  const {
    data: sessions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/study-sessions"); // Your API endpoint here
      return res.data;
    },
  });

  const ongoingSessions = sessions
    .filter((session) => {
      const start = new Date(session.registrationStartDate);
      const end = new Date(session.registrationEndDate);
      return session.status === "approved" && now >= start && now <= end;
    })
    .sort(
      (a, b) =>
        new Date(b.registrationStartDate) - new Date(a.registrationStartDate)
    )
    .slice(0, 6);

  const truncateText = (text, maxLength = 70) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center py-20 text-red-500">Failed to load sessions.</p>
    );

  return (
    <section className="py-16 bg-gray-100">
      <Container>
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Available Study Sessions
          </h2>
          <p className="mt-2 text-gray-600">
            Join ongoing sessions and boost your learning!
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ongoingSessions.length === 0 ? (
            <p className="col-span-full text-center text-gray-600">
              No ongoing sessions available at the moment.
            </p>
          ) : (
            ongoingSessions.map((session, index) => (
              <div
                key={session._id}
                className="p-6 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition duration-300 flex flex-col justify-between h-[300px]"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {session.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {truncateText(session.description, 70)}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div>
                    <span className="px-3 py-1 text-sm rounded-full font-medium bg-green-100 text-green-600">
                      Ongoing
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedSession(session)}
                    className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {selectedSession && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedSession(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()} // Prevent close on inner click
            >
              <button
                onClick={() => setSelectedSession(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {selectedSession.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {selectedSession.description}
              </p>
              <p>
                <strong>Registration Start Date: </strong>
                {new Date(
                  selectedSession.registrationStartDate
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Registration End Date: </strong>
                {new Date(
                  selectedSession.registrationEndDate
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Status: </strong>
                {selectedSession.status}
              </p>
              {/* Add more details if you want */}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AvailableStudySessions;
