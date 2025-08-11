"use client"

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaUtensils } from "react-icons/fa";
import { theme } from "./theme";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faq" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "For Restaurants",
      links: [
        { name: "Add Your Restaurant", href: "/restaurants/add" },
        { name: "Business App", href: "/business" },
        { name: "Resources", href: "/resources" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaLinkedin />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white pt-12 pb-6"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="col-span-1"
          >
            <Link href="/" className="flex items-center mb-4">
              <FaUtensils className="text-2xl mr-2" style={{ color: theme.colors.secondary }} />
              <span className="text-2xl font-bold">RestoFinder</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Discover the best dining experiences in your city.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: theme.colors.secondary }}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="col-span-1"
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.secondary }}>
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1"
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.secondary }}>
              Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new restaurants and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-900 w-full"
                required
              />
              <motion.button
                type="submit"
                className="px-4 py-2 rounded-r-lg text-white"
                style={{ backgroundColor: theme.colors.secondary }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500"
        >
          <p>© {currentYear} RestoFinder. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;