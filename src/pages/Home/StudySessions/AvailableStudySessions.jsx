import { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { Link } from "react-router";

const AvailableStudySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const demoData = [
      {
        _id: "1",
        title: "Introduction to JavaScript",
        description:
          "Master the basics of JavaScript including syntax, variables, and functions with live examples and challenges.",
        status: "approved",
        registrationStartDate: "2025-07-01T00:00:00.000Z",
        registrationEndDate: "2025-07-25T23:59:59.000Z",
      },
      {
        _id: "2",
        title: "Advanced CSS Flexbox & Grid",
        description:
          "A deep dive into layout systems with real-world projects and responsive designs.",
        status: "approved",
        registrationStartDate: "2025-06-15T00:00:00.000Z",
        registrationEndDate: "2025-07-05T23:59:59.000Z",
      },
      {
        _id: "3",
        title: "React Hooks Intensive",
        description:
          "Explore useState, useEffect, useContext and custom hooks in real apps.",
        status: "approved",
        registrationStartDate: "2025-07-08T00:00:00.000Z",
        registrationEndDate: "2025-07-20T23:59:59.000Z",
      },
      {
        _id: "4",
        title: "Node.js and Express Bootcamp",
        description:
          "Build backend services with Express and learn REST API concepts with MongoDB.",
        status: "approved",
        registrationStartDate: "2025-06-10T00:00:00.000Z",
        registrationEndDate: "2025-06-25T23:59:59.000Z",
      },
      {
        _id: "5",
        title: "UI/UX Fundamentals for Developers",
        description:
          "Understand the principles of effective UI design and user experience from a dev perspective. Understand the principles of effective UI design and user experience from a dev perspective.Understand the principles of effective UI design and user experience from a dev perspective.",
        status: "approved",
        registrationStartDate: "2025-07-10T00:00:00.000Z",
        registrationEndDate: "2025-07-30T23:59:59.000Z",
      },
      {
        _id: "6",
        title: "Data Structures in JavaScript",
        description:
          "Work with arrays, stacks, queues, maps, and trees with coding practice.",
        status: "approved",
        registrationStartDate: "2025-06-20T00:00:00.000Z",
        registrationEndDate: "2025-07-09T23:59:59.000Z",
      },
    ];

    const filtered = demoData.filter((session) => {
      return session.status === "approved";
    });

    setSessions(filtered);
  }, []);

  const now = new Date();

  // Utility function to truncate text
  const truncateText = (text, maxLength = 70) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section className="py-16 bg-gray-100">
      <Container>
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Available Study Sessions
          </h2>
          <p className=" mt-2 text-gray-600">
            Join ongoing sessions and boost your learning!
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sessions.map((session, index) => {
            const start = new Date(session.registrationStartDate);
            const end = new Date(session.registrationEndDate);
            const isOngoing = now >= start && now <= end;

            return (
              <div
                key={session._id}
                className="p-6 bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition duration-300 flex flex-col justify-between h-[260px]"
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
                    <span
                      className={` px-3 py-1 text-sm rounded-full font-medium ${
                        isOngoing
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isOngoing ? "Ongoing" : "Closed"}
                    </span>
                  </div>

                  <Link
                    to={`/sessions/${session._id}`}
                    className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default AvailableStudySessions;
