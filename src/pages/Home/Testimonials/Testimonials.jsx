import React from "react";
import Container from "../../../components/Container";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha R.",
    feedback:
      "Thanks to this platform, I finally passed my math exam! The group sessions made learning so much more effective.",
  },
  {
    name: "Tanvir H.",
    feedback:
      "Studying with others kept me motivated. I love the organized sessions and helpful tutors!",
  },
  {
    name: "Nadia K.",
    feedback:
      "A must-have for any student. The collaborative environment is perfect for focused learning.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-200">
      <Container>
        {/* Section Title */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-base-content mb-4"
            data-aos="fade-up"
          >
            What Learners Say
          </h2>
          <p
            className="text-gray-600 dark:text-gray-300 text-base"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Hear directly from our learners how collaborative sessions are
            changing their study experience.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-neutral p-8 rounded-2xl shadow border border-base-300 hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <FaQuoteLeft className="text-4xl text-secondary absolute top-6 right-6 opacity-20" />
              <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                “{t.feedback}”
              </p>
              <p className="font-semibold text-base-content">– {t.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
