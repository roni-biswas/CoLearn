import React from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroImg from "../../assets/page-hero.jpg";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/Loading";

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();

  // Fetch session details
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["session-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/study/sessions/${id}`);
      return res.data;
    },
  });

  // Check if already booked
  const { data: isBooked, isLoading: bookingCheckLoading } = useQuery({
    queryKey: ["is-booked", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookedSessions/check?sessionId=${id}&email=${user.email}`
      );
      return res.data?.booked;
    },
  });

  if (sessionLoading || bookingCheckLoading) {
    return (
      <div className="min-h-screen flex justify-center mt-24 bg-base-100 dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  if (!session) return <p className="text-center py-20">Session not found.</p>;

  const {
    title,
    tutorName,
    tutorEmail,
    averageRating,
    description,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    sessionDuration,
    registrationFee,
    fee,
    _id,
    reviews = [],
  } = session;

  const now = new Date();
  const regEnd = new Date(registrationEndDate);
  const registrationOpen = now <= regEnd;

  const isDisabled =
    !user ||
    role === "admin" ||
    role === "tutor" ||
    !registrationOpen ||
    isBooked;

  const filteredReviews = reviews.filter((r) => r.sessionId === _id);

  const handleBooking = async () => {
    if (!user) {
      return Swal.fire("Please login first to book a session");
    }

    if (registrationFee > 0) {
      navigate(`/payment?sessionId=${_id}`);
    } else {
      try {
        await axiosSecure.post("/bookedSessions", {
          sessionId: _id,
          studentEmail: user.email,
          tutorEmail,
        });
        Swal.fire(
          "Success!",
          "Your free session has been booked successfully.",
          "success"
        );
        navigate("/study-sessions");
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
        redirectLink="/study-sessions"
        heroBg={heroImg}
      />

      <Container>
        <div className="space-y-10 py-10 text-gray-800 dark:text-gray-100">
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

          <div className="bg-base-100 dark:bg-neutral rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-2 text-secondary">
              Description
            </h3>
            <p className="leading-relaxed">
              {description || "No description available."}
            </p>
          </div>

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
                {registrationFee
                  ? `$${registrationFee.toFixed(2)}`
                  : fee > 0
                  ? `$${fee.toFixed(2)}`
                  : "Free"}
              </p>
            </div>
            <div className="bg-base-200 dark:bg-base-300 rounded-xl p-5 shadow-sm space-y-2">
              <p>
                <strong>Class Start Time:</strong> {formatDate(classStartDate)}
              </p>
              <p>
                <strong>Class End Date:</strong> {formatDate(classEndDate)}
              </p>
              <p>
                <strong>Duration:</strong> {sessionDuration || "N/A"}
              </p>
            </div>
          </div>

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
                  ? isBooked
                    ? "Already Booked"
                    : registrationFee > 0
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
