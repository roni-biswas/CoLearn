import { useQuery } from "@tanstack/react-query";
import { FaClock, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroImg from "../../assets/page-hero.jpg";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

const StudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 8;

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["study-sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/study/sessions");
      return res.data;
    },
  });

  // Filter sessions by date
  const filteredSessions = sessions.filter((session) => {
    const start = new Date(session.registrationStartDate);
    const end = new Date(session.registrationEndDate);
    if (currentDate < start) return "Upcoming";
    if (currentDate >= start && currentDate <= end) return "Ongoing";
    return "Closed";
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * sessionsPerPage,
    currentPage * sessionsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <PageHero title="Study Sessions" heroBg={heroImg} />
      <Container>
        <div className="pt-20 pb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
              Explore and Join Live Study Sessions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover curated sessions led by experienced tutors. Stay up to
              date, participate live, and grow collaboratively.
            </p>
          </div>

          {isLoading ? (
            <Loading />
          ) : paginatedSessions.length === 0 ? (
            <p className="text-center text-gray-500">No active sessions</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {paginatedSessions.map((session) => {
                  const isClosed =
                    currentDate > new Date(session.registrationEndDate);
                  return (
                    <div
                      key={session._id}
                      className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-base-300 flex flex-col justify-between h-full"
                      data-aos="fade-up"
                    >
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-primary mb-2">
                          {session.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-5">
                          {session.description.slice(0, 170)}...
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium text-xs ${
                              isClosed
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            <FaClock />
                            {isClosed ? "Closed" : "Ongoing"}
                          </span>
                          <span className="text-gray-400 text-xs">
                            <FaBookOpen className="inline-block mr-1" />
                            {new Date(
                              session.registrationEndDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <Link
                          to={`/session-details/${session._id}`}
                          className="btn btn-outline btn-sm w-full text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-10 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-sm"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`btn btn-sm ${
                      currentPage === i + 1 ? "btn-primary" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="btn btn-sm"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default StudySessions;
