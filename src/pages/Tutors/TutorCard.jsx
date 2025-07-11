import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const TutorCard = ({ tutor }) => {
  const {
    id,
    tutorName,
    sessionTitle,
    averageRating,
    sessionDescription,
    registrationFee,
    sessionDuration,
    classEndDate,
    tutorImage,
  } = tutor;

  const trimmedDescription =
    sessionDescription.length > 100
      ? sessionDescription.slice(0, 100) + "..."
      : sessionDescription;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-base-300 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
    >
      {/* Header Info */}
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        {/* Tutor Info Inline */}
        <div className="flex items-center gap-4 mb-2">
          {tutorImage ? (
            <img
              src={tutorImage}
              alt={tutorName}
              className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-bold">
              {tutorName[0]}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-primary">{tutorName}</p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <FaStar />
              {averageRating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Session Title */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
          {sessionTitle}
        </h3>

        {/* Meta Info */}
        <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
          <p>
            <span className="font-medium text-secondary">Duration:</span>{" "}
            {sessionDuration}
          </p>
          <p>
            <span className="font-medium text-secondary">Ends:</span>{" "}
            {classEndDate}
          </p>
          <p>
            <span className="font-medium text-secondary">Fee:</span>{" "}
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">
          {trimmedDescription}
        </p>
      </div>

      {/* Footer Button */}
      <div className="p-4 pt-0">
        <Link to={`/tutor-details/${id}`} className="btn btn-primary w-full">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default TutorCard;
