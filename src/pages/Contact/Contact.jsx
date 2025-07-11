import { useState } from "react";
import PageHero from "../../components/PageHero";
import Container from "../../components/Container";
import { motion } from "framer-motion";
import heroImg from "../../assets/page-hero.jpg";

const contactInfo = [
  {
    id: 1,
    type: "Email",
    value: "support@colearnplatform.com",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M16 12H8m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    type: "Phone",
    value: "+1 234 567 890",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72 12.53 12.53 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.5 10.5a16 16 0 0 0 5.5 5.5l1.85-1.85a2 2 0 0 1 2.11-.45 12.53 12.53 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" />
      </svg>
    ),
  },
  {
    id: 3,
    type: "Address",
    value: "123 Education St, Learning City, EduLand",
    icon: (
      <svg
        className="w-6 h-6 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M12 21C12 21 20 14 20 8a8 8 0 1 0-16 0c0 6 8 13 8 13z" />
        <circle cx="12" cy="8" r="3" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo: simulate form submission
    if (formData.name && formData.email && formData.message) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <PageHero title="Contact Us" heroBg={heroImg} />

      <Container>
        <div className="py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto p-8 bg-white dark:bg-base-300 shadow-md rounded-3xl border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Get in Touch
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-4">
                  Contact Information
                </h3>

                <ul className="space-y-6 text-gray-700 dark:text-gray-300">
                  {contactInfo.map(({ id, type, value, icon }) => (
                    <li key={id} className="flex items-center gap-4">
                      <div>{icon}</div>
                      <div>
                        <p className="font-semibold">{type}</p>
                        <p>{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>

                {status === "success" && (
                  <p className="mt-4 text-green-600 dark:text-green-400 font-semibold">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-red-600 dark:text-red-400 font-semibold">
                    Please fill out all fields.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
