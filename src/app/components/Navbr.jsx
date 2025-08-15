"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaUtensils,
  FaHome,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import { theme } from "./theme";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [details, setDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const dataCheck = localStorage.getItem("restaurantuser");
        
        if (!dataCheck) {
          if (!pathname.startsWith('/retaurants')) {
            router.push("/retaurants");
          }
        } else {
          try {
            const userData = JSON.parse(dataCheck);
            setDetails(userData);
            // If user is logged in and on the base restaurants page, redirect to dashboard
            if (pathname === '/retaurants') {
              router.push("../retaurants/Dashbored");
            }
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
            localStorage.removeItem("restaurantuser");
          }
        }
      } catch (error) {
        console.error("Authentication check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("restaurantuser");
    setDetails(null);
    router.push("/retaurants");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Restaurants", href: "", icon: <FaUtensils /> },
    { name: "About", href: "../About", icon: <FaInfoCircle /> },
    { name: "Contact", href: "../Contact", icon: <FaPhone /> },
  ];

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center">
            <FaUtensils
              className="text-2xl mr-2"
              style={{ color: theme.colors.primary }}
            />
            <span
              className="text-2xl font-bold"
              style={{ color: theme.colors.primary }}
            >
              RestoFinder
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.href}
                className={`flex items-center ${pathname === link.href ? 'text-indigo-600 font-medium' : 'text-gray-700 hover:text-indigo-600'} transition-colors`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons - Conditional */}
        <div className="hidden md:flex space-x-4">
          {details ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg border border-gray-300"
                onClick={() => router.push("/profile")}
              >
                <FaUser className="inline mr-2" /> Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: theme.colors.primary }}
                onClick={logout}
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg"
              >
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Link href="/signup">Sign Up</Link>
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-white shadow-lg absolute left-0 right-0 px-6 pt-2 pb-6"
            style={{ top: "100%" }}
          >
            <motion.ul className="space-y-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={navItemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center py-2 px-4 ${pathname === link.href ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'} rounded-lg`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={navItemVariants}
                className="pt-4 border-t border-gray-200"
              >
                <div className="flex space-x-4">
                  {details ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg flex-1 border"
                        onClick={() => {
                          router.push("/profile");
                          setIsOpen(false);
                        }}
                      >
                        Profile
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg text-white flex-1"
                        style={{ backgroundColor: theme.colors.primary }}
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        Logout
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg flex-1 border"
                      >
                        <Link
                          href="/login"
                          className="block"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg text-white flex-1"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <Link
                          href="/signup"
                          className="block"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;