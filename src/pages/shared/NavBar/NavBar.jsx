import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../../../components/Container";
import logoDark from "../../../assets/logo1.png";
import logoLight from "../../../assets/logo2.png";
import defaultAvatar from "../../../assets/avatar.png";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Tutors", path: "/tutors" },
  { name: "Study Sessions", path: "/sessions" },
];

const NavBar = () => {
  const { user, logOut } = useAuth();
  console.log(user?.photoURL);
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsSticky(currentScrollY > 80);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logout Successful",
          text: "You have been logged out.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Logout Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
    ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"}
    ${
      isSticky
        ? "h-16 bg-gray-950/80 backdrop-blur-3xl shadow"
        : "h-24 bg-gradient-to-b from-black/70 to-transparent"
    }
  `}
    >
      <Container>
        <div className="py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.img
              src={isSticky ? logoDark : logoLight}
              alt="Logo"
              className="h-10"
              animate={{ scale: isSticky ? 0.9 : 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-base font-bold">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-2 py-1 group transition-colors duration-200 
                  ${
                    isActive
                      ? "text-primary font-bold text-base"
                      : "text-gray-200"
                  }
                  ${isSticky ? "text-black" : "text-gray-200"} `
                }
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4 relative">
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.photoURL || defaultAvatar}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-base-100 dark:bg-gray-800 rounded-md shadow-md p-2 space-y-1"
                  >
                    {user ? (
                      <>
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              handleLogout();
                            }}
                            className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <Link to="/login">
                        <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                          Login
                        </button>
                      </Link>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-0 left-0 w-[70%] h-screen bg-gray-900 z-40 shadow-xl p-6 flex flex-col rounded-r-2xl gap-6"
          >
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src={logoDark} alt="Logo" className="h-10 mb-6" />
            </Link>

            <nav className="flex flex-col gap-4 text-gray-100 font-semibold">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-bold"
                      : "hover:text-primary transition-colors"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {/* Dashboard Link if user exists */}
              {user ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary"
                        : "hover:text-primary transition-colors"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="hover:text-primary transition-colors"
                    >
                      Logout
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  {/* Login Button if no user */}

                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary"
                        : "hover:text-primary transition-colors"
                    }
                  >
                    Login
                  </NavLink>
                </>
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <img
                src={user?.photoURL || defaultAvatar}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
