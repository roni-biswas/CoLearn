import React from "react";
import Container from "../../../components/Container";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/logo1.png"; // Replace with your actual logo path

const categories = [
  "Programming",
  "Mathematics",
  "Language Learning",
  "Science",
  "Design",
  "Test Prep",
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo & Bio */}
          <div className="flex flex-col items-start max-w-sm">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <p className="text-gray-400">
              Colearn is your collaborative study platform empowering students
              to connect, learn, and grow together. Join live sessions and boost
              your knowledge effectively.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <a
                    href={`/categories/${cat
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <FaFacebookF size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <FaLinkedinIn size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Colearn. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
