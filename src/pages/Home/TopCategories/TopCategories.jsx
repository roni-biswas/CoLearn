import React from "react";
import Container from "../../../components/Container";
import {
  FiCode,
  FiTrendingUp,
  FiGlobe,
  FiActivity,
  FiPenTool,
  FiBookOpen,
} from "react-icons/fi";

const categories = [
  {
    name: "Programming",
    description: "Explore JavaScript, Python, and full-stack development.",
    icon: <FiCode className="text-3xl text-secondary mb-4" />,
  },
  {
    name: "Mathematics",
    description: "Master algebra, calculus, and real-world problem solving.",
    icon: <FiTrendingUp className="text-3xl text-secondary mb-4" />,
  },
  {
    name: "Language Learning",
    description: "Improve fluency, pronunciation, and grammar in any language.",
    icon: <FiGlobe className="text-3xl text-secondary mb-4" />,
  },
  {
    name: "Science",
    description: "Dive into physics, biology, chemistry, and curiosity.",
    icon: <FiActivity className="text-3xl text-secondary mb-4" />,
  },
  {
    name: "Design",
    description: "Learn graphic design, UI/UX, and creative digital skills.",
    icon: <FiPenTool className="text-3xl text-secondary mb-4" />,
  },
  {
    name: "Test Prep",
    description: "Ace IELTS, GRE, SAT and other competitive exams confidently.",
    icon: <FiBookOpen className="text-3xl text-secondary mb-4" />,
  },
];

const TopCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f1f4ff] to-[#e6f9f0] dark:from-[#1f1f30] dark:to-[#1a1f1d] transition-colors duration-500">
      <Container>
        {/* Section Title & Description */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-base-content mb-4"
            data-aos="fade-up"
          >
            Popular Categories
          </h2>
          <p
            className="text-gray-600 dark:text-gray-300 text-base"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Discover focused learning tracks across top subjects to boost your
            skills and confidence.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="p-8 bg-white dark:bg-[#232336] rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition duration-300 border border-base-300 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {cat.icon}
              <h3 className="text-xl font-semibold text-primary mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopCategories;
