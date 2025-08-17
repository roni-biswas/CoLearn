import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-20 px-6 md:px-16 bg-base-200 dark:bg-base-300">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            📩 Stay Updated with Colearn
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to our newsletter and never miss updates about new study
            sessions, materials, and exclusive offers.
          </p>
        </motion.div>

        {/* Subscription Form */}
        <motion.form
          className="flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full md:w-2/3 rounded-xl bg-base-200 dark:bg-base-300"
            required
          />
          <button className="btn btn-primary w-full md:w-auto">
            Subscribe
          </button>
        </motion.form>

        {/* Small Note */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
