import React from "react";

const TutorCard = ({ tutor, onClick }) => {
  const {
    tutorName,
    sessionTitle,
    sessionDescription,
    fee,
    sessionDuration,
    classEndDate,
  } = tutor;

  return (
    <div className="bg-white dark:bg-base-200 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between min-h-[320px]">
      <div>
        <h3 className="text-xl font-bold text-primary mb-1">{sessionTitle}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Tutor: <span className="font-medium">{tutorName}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Fee: {fee > 0 ? `$${fee}` : "Free"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Duration: {sessionDuration} month(s)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Class End: {new Date(classEndDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">
          {sessionDescription}
        </p>
      </div>
      <div className="mt-4 text-end">
        <button
          onClick={onClick}
          className="btn btn-sm btn-outline btn-primary"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
