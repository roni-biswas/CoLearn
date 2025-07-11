import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import { motion } from "framer-motion";
import heroBg from "../../assets/page-hero.jpg";
const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Lead Tutor",
    photo: "https://i.pravatar.cc/150?u=jane",
    bio: "Expert in React and front-end development with 8+ years of teaching experience.",
  },
  {
    id: 2,
    name: "Ahmed Karim",
    role: "Backend Specialist",
    photo: "https://i.pravatar.cc/150?u=ahmed",
    bio: "Passionate about scalable server-side solutions and database management.",
  },
  {
    id: 3,
    name: "Nazia Sultana",
    role: "UI/UX Designer",
    photo: "https://i.pravatar.cc/150?u=nazia",
    bio: "Creates intuitive and beautiful user interfaces that users love.",
  },
  {
    id: 4,
    name: "Farzana Yeasmin",
    role: "Project Manager",
    photo: "https://i.pravatar.cc/150?u=farzana",
    bio: "Ensures timely delivery and smooth collaboration across teams.",
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      {/* Page Hero */}
      <PageHero title="About Us" heroBg={heroBg} />

      {/* Content */}
      <Container>
        <div className="py-6 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto p-8 bg-white dark:bg-base-300 shadow-md rounded-3xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Empowering Collaborative Learning
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This assessment focuses on creating a{" "}
              <span className="font-semibold text-secondary">
                Collaborative Study Platform
              </span>{" "}
              that connects students, tutors, and administrators to streamline
              study session scheduling, resource sharing, and user management.
              <br />
              <br />
              By integrating these functionalities into a single platform, we
              aim to enhance collaboration, improve access to study materials,
              and ensure effective management of educational activities.
              <br />
              <br />
              This project will outline the key features, design principles, and
              implementation strategies necessary to develop a{" "}
              <span className="font-medium text-primary">
                user-friendly
              </span>{" "}
              and{" "}
              <span className="font-medium text-primary">robust platform</span>{" "}
              that supports the dynamic needs of modern education.
            </p>

            {/* Decorative Line */}
            <div className="mt-10 border-t border-dashed border-primary w-24 mx-auto" />
          </motion.div>

          {/* Team Members */}
          <section className="max-w-6xl mx-auto mt-16">
            <h3 className="text-3xl font-semibold text-center mb-10 text-primary">
              Meet Our Team
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: member.id * 0.15 }}
                  className="bg-white dark:bg-base-300 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center text-center"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4"
                  />
                  <h4 className="text-xl font-semibold text-secondary mb-1">
                    {member.name}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default About;
