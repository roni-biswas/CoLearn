import { motion } from "framer-motion";
import Container from "../../../components/Container";

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: "Expert Tutors",
      description:
        "Learn from industry professionals and experienced educators to gain real-world skills.",
      icon: "https://img.icons8.com/color/96/teacher.png",
    },
    {
      id: 2,
      title: "Interactive Sessions",
      description:
        "Engage in live, interactive sessions with Q&A, quizzes, and practical exercises.",
      icon: "https://img.icons8.com/color/96/video-call.png",
    },
    {
      id: 3,
      title: "Flexible Learning",
      description:
        "Attend sessions anytime, anywhere, and learn at your own pace with recorded materials.",
      icon: "https://img.icons8.com/color/96/clock.png",
    },
    {
      id: 4,
      title: "Certificates & Recognition",
      description:
        "Earn certificates to showcase your achievements and enhance your professional profile.",
      icon: "https://img.icons8.com/color/96/certificate.png",
    },
  ];

  return (
    <section className="py-20 bg-base-100 dark:bg-base-200">
      <Container>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            🌟 Why Choose Colearn?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            Discover the advantages of joining Colearn and take your learning to
            the next level.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                className="bg-base-200 dark:bg-base-300 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-20 h-20 mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BenefitsSection;
