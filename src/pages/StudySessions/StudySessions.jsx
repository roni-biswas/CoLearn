import { FaClock, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroImg from "../../assets/page-hero.jpg";

const demoSessions = [
  {
    _id: "1",
    title: "JavaScript Essentials",
    description:
      "Understand the core concepts of JavaScript and how it works under the hood. You'll gain practical experience with syntax, functions, and scope.",
    registrationStart: "2025-07-01T00:00:00Z",
    registrationEnd: "2025-07-20T23:59:59Z",
    status: "approved",
  },
  {
    _id: "2",
    title: "React Fundamentals",
    description:
      "Learn the basics of React including components, props, and hooks. A perfect session for beginners looking to build dynamic UIs.",
    registrationStart: "2025-06-01T00:00:00Z",
    registrationEnd: "2025-06-15T23:59:59Z",
    status: "approved",
  },
  {
    _id: "3",
    title: "Node.js & Express API",
    description:
      "Build scalable server-side applications using Express.js and understand routing, middleware, and RESTful APIs.",
    registrationStart: "2025-07-10T00:00:00Z",
    registrationEnd: "2025-07-25T23:59:59Z",
    status: "approved",
  },
  {
    _id: "4",
    title: "UI/UX Design Basics",
    description:
      "Learn the key principles of UI and UX design to improve your front-end development skills and create user-friendly interfaces.",
    registrationStart: "2025-06-01T00:00:00Z",
    registrationEnd: "2025-06-15T23:59:59Z",
    status: "approved",
  },
  {
    _id: "5",
    title: "Database Design",
    description:
      "Master relational database design, normalization, and effective querying using SQL for scalable data storage solutions.",
    registrationStart: "2025-07-05T00:00:00Z",
    registrationEnd: "2025-07-22T23:59:59Z",
    status: "approved",
  },
  {
    _id: "6",
    title: "Version Control with Git",
    description:
      "Understand Git basics, branching, merging, resolving conflicts, and managing remote repositories with GitHub.",
    registrationStart: "2025-06-10T00:00:00Z",
    registrationEnd: "2025-06-25T23:59:59Z",
    status: "approved",
  },
];

const StudySessions = () => {
  const currentDate = new Date();

  const filteredSessions = demoSessions.filter((session) => {
    const start = new Date(session.registrationStart);
    const end = new Date(session.registrationEnd);
    return session.status === "approved" && currentDate >= start;
  });

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => {
              const isClosed = currentDate > new Date(session.registrationEnd);
              return (
                <div
                  key={session._id}
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-base-300 flex flex-col justify-between h-full"
                  data-aos="fade-up"
                >
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-5">
                      {session.description.slice(0, 170)}...
                    </p>
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
                        {new Date(session.registrationEnd).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/session-details/${session._id}`}
                    className="btn btn-outline btn-sm text-primary hover:bg-primary hover:text-white transition-colors duration-300 mt-auto"
                  >
                    Read More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StudySessions;
