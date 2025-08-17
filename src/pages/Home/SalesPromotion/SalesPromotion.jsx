import { motion } from "framer-motion";
import { Link } from "react-router";
import Container from "../../../components/Container";

const SalesPromotion = () => {
  return (
    <section className="py-20 bg-base-200 dark:bg-base-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-primary">
              🎉 Boost Your Learning with <br /> Exclusive Study Sessions!
            </h2>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              Limited-time offer! Join our premium study sessions with expert
              tutors and get{" "}
              <span className="font-semibold text-secondary">20% OFF</span> on
              your first paid booking. Don’t miss out on leveling up your skills
              with peers and professionals.
            </p>
            <Link
              to="/study-sessions"
              className="btn btn-primary text-white font-semibold shadow-lg"
            >
              Explore Sessions
            </Link>
          </motion.div>

          {/* Image / Illustration */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img
              src="https://img.freepik.com/free-vector/online-learning-platform-illustration_335657-4412.jpg"
              alt="Sales Promotion"
              className="rounded-2xl shadow-xl w-full md:w-4/5"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default SalesPromotion;
