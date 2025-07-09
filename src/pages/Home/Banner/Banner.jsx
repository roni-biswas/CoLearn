import { motion } from "framer-motion";
import { Link } from "react-router";
import Container from "../../../components/Container";
import bannerImage from "../../../assets/banner/banner.jpg";

import img1 from "../../../assets/banner/stack1.jpg";
import img2 from "../../../assets/banner/stack2.jpg";
import img3 from "../../../assets/banner/stack3.jpg";
import img4 from "../../../assets/banner/stack4.jpg";

const images = [
  { src: img1, alt: "Study group" },
  { src: img2, alt: "Reading" },
  { src: img3, alt: "Writing notes" },
  { src: img4, alt: "Student with book" },
];

const Banner = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center pt-[80px] lg:pt-0 min-h-[110vh] lg:min-h-screen"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 z-0" />

      <Container>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
          {/* Left Text: vertically centered, left aligned */}
          <motion.div
            className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left text-white px-4 lg:px-0 h-full w-full mt-34 md:mt-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-full max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Empower Your Learning with{" "}
                <span className="text-secondary">Collaboration</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                Connect with students and tutors. Join live sessions. Share
                study resources — all in one platform.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Link
                  to="/sessions"
                  className="btn btn-secondary text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Image Cluster */}

          <div className=" hidden sm:flex sm:flex-1 relative max-w-md sm:max-w-lg lg:max-w-xl px-4 sm:px-0 h-full flex-wrap justify-center gap-4 lg:gap-6 items-center sm:pt-24">
            {/* Image 1 - Large, slow horizontal float */}
            <motion.img
              src={img1}
              alt="Study group"
              className="rounded-xl shadow-lg border border-gray-200/40 object-cover cursor-pointer w-1/3 sm:w-1/4 lg:w-1/4 h-40 sm:h-48 lg:h-56 "
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: [0, 10, 0], // float horizontally back and forth
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0,
              }}
            />

            {/* Image 2 - Medium, gentle rotation */}
            <motion.img
              src={img2}
              alt="Reading"
              className="rounded-xl shadow-lg border border-gray-200/40 object-cover cursor-pointer w-1/2 sm:w-1/3 lg:w-1/5 h-32 sm:h-40 lg:h-48"
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{
                opacity: 1,
                rotate: [0, 5, 0, -5, 0], // rocking rotation
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 1,
              }}
            />

            {/* Image 3 - Small, vertical float */}
            <motion.img
              src={img3}
              alt="Writing notes"
              className="rounded-xl shadow-lg border border-gray-200/40 object-cover cursor-pointer w-2/3 sm:w-1/2 lg:w-2/4 h-48 sm:h-54 lg:h-60 "
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0], // float vertically
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5,
              }}
            />

            {/* Image 4 - Medium, slow rotate and slide */}
            <motion.img
              src={img4}
              alt="Student with book"
              className="rounded-xl shadow-lg border border-gray-200/40 object-cover cursor-pointer w-1/3 sm:w-1/4 lg:w-1/4 h-40 sm:h-48 lg:h-56 "
              initial={{ opacity: 0, rotate: 15, x: 40, scale: 0.85 }}
              animate={{
                opacity: 1,
                rotate: [0, 10, 0],
                x: [0, -10, 0],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.7,
              }}
            />
          </div>
        </div>
      </Container>

      {/* Scroll Down Icon */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white dark:text-gray-300"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Banner;
