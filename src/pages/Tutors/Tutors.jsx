import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/PageHero";
import heroImg from "../../assets/page-hero.jpg";
import TutorDetailsModal from "./TutorDetailsModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import TutorCard from "./TutorCard";

const Tutors = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSession, setSelectedSession] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 6;

  const {
    data: tutors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutors-with-sessions");
      return res.data;
    },
  });

  // Flatten sessions from tutors and attach tutor info to each session
  const allSessions = tutors.flatMap((tutor) =>
    tutor.sessions.map((session) => ({
      ...session,
      tutorName: tutor.name,
      tutorEmail: tutor.email,
      averageRating: tutor.averageRating,
    }))
  );

  const totalPages = Math.ceil(allSessions.length / sessionsPerPage);
  const paginatedSessions = allSessions.slice(
    (currentPage - 1) * sessionsPerPage,
    currentPage * sessionsPerPage
  );

  const handleOpenModal = (session) => {
    setSelectedSession(session);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-[#f4faff] via-white to-[#e7f0ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e3a8a] min-h-screen">
      <PageHero title="Meet Our Expert Tutors" heroBg={heroImg} />
      <Container>
        <div className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              Our Tutors
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Discover the minds behind your learning journey. Each tutor brings
              real-world experience to help you succeed.
            </p>
          </div>

          {isLoading ? (
            <Loading />
          ) : error ? (
            <p className="text-center text-red-500">Failed to load tutors.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedSessions.map((session) => (
                <TutorCard
                  key={session._id}
                  tutor={{
                    tutorName: session.tutorName,
                    tutorEmail: session.tutorEmail,
                    averageRating: session.averageRating,
                    sessionTitle: session.title,
                    sessionDescription: session.description,
                    fee: session.registrationFee,
                    sessionDuration: session.sessionDuration,
                    classEndDate: session.classEndDate,
                  }}
                  onClick={() => handleOpenModal(session)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <>
              <p className="text-center mt-8 text-gray-700 dark:text-gray-300 font-medium">
                Showing {paginatedSessions.length} of {allSessions.length}{" "}
                sessions
              </p>

              <div className="flex justify-center mt-4 items-center gap-2 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
                    currentPage === 1
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-base-200 dark:bg-base-300 hover:bg-primary/20"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
                      currentPage === idx + 1
                        ? "bg-primary text-white scale-105 shadow font-bold"
                        : "bg-base-200 dark:bg-base-300 hover:bg-primary/20"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md font-medium transition duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-base-200 dark:bg-base-300 hover:bg-primary/20"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Modal */}
          {selectedSession && (
            <TutorDetailsModal
              tutor={selectedSession}
              onClose={() => setSelectedSession(null)}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Tutors;
