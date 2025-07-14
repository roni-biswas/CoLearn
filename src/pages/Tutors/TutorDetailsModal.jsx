import React from "react";

const TutorDetailsModal = ({ tutor, onClose }) => {
  const { name, averageRating } = tutor;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-base-200 max-w-lg w-full rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-primary mb-2">{tutor.title}</h2>
        <p className="mb-1">
          <strong>Tutor:</strong> {name}
        </p>
        <p className="mb-1">
          <strong>Rating:</strong> {averageRating.toFixed(1)}{" "}
          <span className="text-red-500">★</span>
        </p>
        <p className="mb-1">
          <strong>Fee:</strong>{" "}
          {tutor.registrationFee > 0 ? `$${tutor.registrationFee}` : "Free"}
        </p>
        <p className="mb-1">
          <strong>Duration:</strong> {tutor.sessionDuration} month's
        </p>
        <p className="mb-1">
          <strong>Class End:</strong>{" "}
          {new Date(tutor.classEndDate).toLocaleDateString()}
        </p>
        <p className="mt-3">{tutor.description}</p>
      </div>
    </div>
  );
};

export default TutorDetailsModal;
