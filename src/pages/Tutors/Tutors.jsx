import React from "react";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import heroImg from "../../assets/page-hero.jpg";
import TutorCard from "./TutorCard";

// Demo data
const demoTutors = [
  {
    id: 4,
    tutorName: "Ahmed Karim",
    tutorEmail: "ahmed.karim@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=ahmed",
    averageRating: 4.8,
    sessionTitle: "Data Structures & Algorithms Bootcamp",
    sessionDescription:
      "Master essential algorithms, time complexities, and problem-solving techniques using JavaScript.",
    registrationFee: 45,
    sessionDuration: "8 Weeks",
    classEndDate: "2025-09-01",
  },
  {
    id: 5,
    tutorName: "Nazia Sultana",
    tutorEmail: "nazia.dev@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=nazia",
    averageRating: 4.6,
    sessionTitle: "UI/UX Design with Figma",
    sessionDescription:
      "Learn modern UI/UX design with hands-on projects using Figma, design systems, and prototyping.",
    registrationFee: 0,
    sessionDuration: "6 Weeks",
    classEndDate: "2025-08-28",
  },
  {
    id: 6,
    tutorName: "Rezaul Haque",
    tutorEmail: "rezaul.haque@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=rezaul",
    averageRating: 4.9,
    sessionTitle: "Full Stack Web Development (MERN)",
    sessionDescription:
      "Build scalable web applications using MongoDB, Express, React, and Node.js.",
    registrationFee: 60,
    sessionDuration: "10 Weeks",
    classEndDate: "2025-09-30",
  },
  {
    id: 7,
    tutorName: "Farzana Yeasmin",
    tutorEmail: "farzana.yeasmin@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=farzana",
    averageRating: 4.5,
    sessionTitle: "Python for Data Science",
    sessionDescription:
      "Explore data manipulation, visualization, and machine learning using Python libraries like Pandas & scikit-learn.",
    registrationFee: 0,
    sessionDuration: "7 Weeks",
    classEndDate: "2025-09-15",
  },
  {
    id: 8,
    tutorName: "Shamim Hossain",
    tutorEmail: "shamim.hossain@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=shamim",
    averageRating: 4.3,
    sessionTitle: "Intro to Cloud Computing",
    sessionDescription:
      "Understand cloud fundamentals, deployment models, and hands-on with AWS basics.",
    registrationFee: 25,
    sessionDuration: "5 Weeks",
    classEndDate: "2025-08-22",
  },
  {
    id: 9,
    tutorName: "Tasnim Jahan",
    tutorEmail: "tasnim.jahan@example.com",
    tutorImage: "https://i.pravatar.cc/100?u=tasnim",
    averageRating: 4.7,
    sessionTitle: "Mobile App Development with Flutter",
    sessionDescription:
      "Create cross-platform mobile apps with Flutter and Dart — from basics to deployment.",
    registrationFee: 35,
    sessionDuration: "6 Weeks",
    classEndDate: "2025-09-10",
  },
];

const Tutors = () => {
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
              a unique skill set and real-world experience to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tutors;
