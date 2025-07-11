import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroImg from "../../assets/page-hero.jpg";
import useAuth from "../../hooks/useAuth";

// Dummy role hook (replace with your real useUserRole)
const useUserRole = () => {
  // Try "student", "admin", "tutor" for testing:
  const [role] = useState("student");
  return [role];
};

const demoSession = {
  _id: "s123",
  title: "Mastering React for Beginners",
  tutorName: "Jane Doe",
  tutorEmail: "jane.doe@example.com",
  averageRating: 4.6,
  description:
    "This session introduces the fundamentals of React, including component structure, state management, and hooks. Perfect for beginners aiming to build strong front-end skills.",
  registrationStartDate: "2025-07-01",
  registrationEndDate: "2025-07-15",
  classStartTime: "14:00:00",
  classEndDate: "2025-08-10",
  sessionDuration: "5 Weeks",
  registrationFee: 20, // set 0 for free session
  reviews: [
    {
      sessionId: "s123",
      studentName: "Alex Johnson",
      rating: 5,
      comment: "Amazing session! The tutor explained everything clearly.",
    },
    {
      sessionId: "s123",
      studentName: "Samiya Rahman",
      rating: 4.2,
      comment: "Very helpful for understanding the basics of React.",
    },
    {
      sessionId: "s999",
      studentName: "Other User",
      rating: 3,
      comment: "Review for another session (should not show here).",
    },
  ],
};

// Helpers to format date and time
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  const date = new Date(`1970-01-01T${timeStr}Z`);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SessionDetails = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [role] = useUserRole();

  // Use demoSession directly or fetch by id in real app
  const [session] = useState(demoSession);

  // Filter reviews by session id
  const filteredReviews = session.reviews.filter(
    (r) => r.sessionId === session._id
  );

  const {
    title,
    tutorName,
    tutorEmail,
    averageRating,
    description,
    registrationStartDate,
    registrationEndDate,
    classStartTime,
    classEndDate,
    sessionDuration,
    registrationFee,
  } = session;

  const now = new Date();
  const regEnd = new Date(registrationEndDate);
  const registrationOpen = now <= regEnd;

  // Disable booking button if not logged in or role admin/tutor or registration closed
  const isDisabled =
    !user || role === "admin" || role === "tutor" || !registrationOpen;

  // Booking handler
  const handleBooking = async () => {
    if (!user) {
      return Swal.fire("Please login first to book a session");
    }

    if (registrationFee > 0) {
      // Redirect to payment page with session id
      navigate(`/payment?sessionId=${session._id}`);
    } else {
      // Free booking: simulate API call to save booked session
      try {
        // Simulate API call delay
        await new Promise((r) => setTimeout(r, 1000));

        // Here you would POST to /api/bookedSession with user.email, session._id, tutorEmail etc.

        Swal.fire(
          "Success!",
          "Your free session has been booked successfully.",
          "success"
        );
      } catch (err) {
        console.error(err);
        Swal.fire("Booking failed", "Please try again later.", "error");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#e0f2ff] via-[#f4f9ff] to-[#dbeafe] dark:from-[#1e293b] dark:via-[#0f172a] dark:to-[#1e3a8a] min-h-screen">
      <PageHero
        title="Session Details"
        redirectText="Back to Sessions"
        redirectLink="/sessions"
        heroBg={heroImg}
      />

      <Container>
        <div className="space-y-10 py-10 text-gray-800 dark:text-gray-100">
          {/* Title and Summary */}
          <div className="bg-base-200 dark:bg-base-300 rounded-xl p-6 shadow-md">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="mb-1">
              <strong className="text-primary">Tutor:</strong>{" "}
              {tutorName || "N/A"}
            </p>
            <p>
              <strong className="text-primary">Rating:</strong>{" "}
              {averageRating
                ? `${averageRating.toFixed(1)} ★`
                : "No ratings yet"}
            </p>
          </div>

          {/* Description */}
          <div className="bg-base-100 dark:bg-neutral rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-2 text-secondary">
              Description
            </h3>
            <p className="leading-relaxed">
              {description || "No description available."}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-base-200 dark:bg-base-300 rounded-xl p-5 shadow-sm space-y-2">
              <p>
                <strong>Registration Start:</strong>{" "}
                {formatDate(registrationStartDate)}
              </p>
              <p>
                <strong>Registration End:</strong>{" "}
                {formatDate(registrationEndDate)}
              </p>
              <p>
                <strong>Fee:</strong>{" "}
                {registrationFee ? `$${registrationFee.toFixed(2)}` : "Free"}
              </p>
            </div>
            <div className="bg-base-200 dark:bg-base-300 rounded-xl p-5 shadow-sm space-y-2">
              <p>
                <strong>Class Start Time:</strong> {formatTime(classStartTime)}
              </p>
              <p>
                <strong>Class End Date:</strong> {formatDate(classEndDate)}
              </p>
              <p>
                <strong>Duration:</strong> {sessionDuration || "N/A"}
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-base-100 dark:bg-neutral rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              Student Reviews
            </h3>
            {filteredReviews.length > 0 ? (
              <ul className="space-y-4">
                {filteredReviews.map((review, idx) => (
                  <li
                    key={idx}
                    className="bg-base-200 dark:bg-base-300 p-4 rounded-lg border border-base-300 dark:border-base-100"
                  >
                    <p className="font-semibold">
                      {review.studentName || "Anonymous"}
                    </p>
                    <p className="text-yellow-500 text-sm mb-1">
                      {"★".repeat(Math.round(review.rating))}{" "}
                      <span className="text-gray-400 dark:text-gray-300">
                        ({review.rating.toFixed(1)})
                      </span>
                    </p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Book Now Button */}
          <div className="text-center pt-4">
            {registrationOpen ? (
              <button
                onClick={handleBooking}
                disabled={isDisabled}
                className={`btn btn-primary px-8 py-3 text-lg ${
                  isDisabled
                    ? "btn-disabled cursor-not-allowed"
                    : "hover:scale-105 transition-transform"
                }`}
              >
                {user
                  ? registrationFee > 0
                    ? "Pay & Book Now"
                    : "Book Now"
                  : "Login to Book"}
              </button>
            ) : (
              <button className="btn btn-disabled px-8 py-3 text-lg" disabled>
                Registration Closed
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SessionDetails;
