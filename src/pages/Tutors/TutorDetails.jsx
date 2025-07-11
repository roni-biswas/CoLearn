import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroBg from "../../assets/page-hero.jpg";

// 🧪 Demo tutor session data
const demoTutor = {
  id: 1,
  tutorName: "Jane Doe",
  tutorEmail: "jane.doe@example.com",
  tutorImage: "https://i.pravatar.cc/150?u=jane",
  averageRating: 4.7,
  sessionTitle: "Mastering React for Beginners",
  sessionDescription:
    "This course introduces React fundamentals, including components, hooks, state management, and routing. Build 3 real-world projects during the course.",
  registrationFee: 0,
  registrationStartDate: "2025-07-01",
  registrationEndDate: "2025-07-15",
  classStartTime: "14:00",
  classEndDate: "2025-08-10",
  sessionDuration: "5 Weeks",
  reviews: [
    {
      studentName: "Alex Johnson",
      rating: 5,
      comment: "Amazing content and great explanations.",
    },
    {
      studentName: "Sara Khan",
      rating: 4.5,
      comment: "Perfect for beginners and very interactive.",
    },
  ],
};

const TutorDetails = () => {
  const {
    tutorName,
    tutorEmail,
    tutorImage,
    averageRating,
    sessionTitle,
    sessionDescription,
    registrationFee,
    registrationStartDate,
    registrationEndDate,
    classStartTime,
    classEndDate,
    sessionDuration,
    reviews,
  } = demoTutor;

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <PageHero
        title="Tutor Details"
        redirectText="Back to Tutors"
        redirectLink="/tutors"
        heroBg={heroBg}
      />

      <Container>
        <div className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-base-300 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
          >
            {/* Tutor Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <img
                src={tutorImage}
                alt={tutorName}
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
              />
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-2xl font-bold text-primary">{tutorName}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {tutorEmail}
                </p>
                <div className="flex items-center justify-center sm:justify-start text-yellow-500 gap-1">
                  <FaStar />
                  <span className="font-medium">
                    {averageRating.toFixed(1)} / 5
                  </span>
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="mt-8 space-y-3 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-secondary">
                {sessionTitle}
              </h3>
              <p>{sessionDescription}</p>

              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
                <p>
                  <strong className="text-primary">Registration Start:</strong>{" "}
                  {registrationStartDate}
                </p>
                <p>
                  <strong className="text-primary">Registration End:</strong>{" "}
                  {registrationEndDate}
                </p>
                <p>
                  <strong className="text-primary">Class Time:</strong>{" "}
                  {classStartTime}
                </p>
                <p>
                  <strong className="text-primary">Class End Date:</strong>{" "}
                  {classEndDate}
                </p>
                <p>
                  <strong className="text-primary">Duration:</strong>{" "}
                  {sessionDuration}
                </p>
                <p>
                  <strong className="text-primary">Fee:</strong>{" "}
                  {registrationFee === 0 ? "Free" : `$${registrationFee}`}
                </p>
              </div>
            </div>

            {/* Student Reviews */}
            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-3">Student Reviews</h4>
              {reviews.length > 0 ? (
                <ul className="space-y-4">
                  {reviews.map((review, idx) => (
                    <li
                      key={idx}
                      className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
                    >
                      <p className="font-semibold text-primary">
                        {review.studentName}
                      </p>
                      <p className="text-yellow-500 text-sm flex items-center gap-1">
                        {"★".repeat(Math.round(review.rating))}{" "}
                        <span className="text-gray-400">
                          ({review.rating.toFixed(1)})
                        </span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default TutorDetails;
