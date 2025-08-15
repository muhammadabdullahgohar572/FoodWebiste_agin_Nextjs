"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUtensils, FaShoppingCart, FaUser } from "react-icons/fa";

const CustomerHeader = () => {
  const themeColor = "#009966";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center">
            <FaUtensils
              className="text-2xl mr-2"
              style={{ color: themeColor }}
            />
            <span
              className="text-2xl font-bold"
              style={{ color: themeColor }}
            >
              RestoFinder
            </span>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="font-medium hover:text-green-600 transition-colors"
            style={{ color: themeColor }}
          >
            Home
          </Link>
          <Link
            href="/restaurants"
            className="font-medium hover:text-green-600 transition-colors"
            style={{ color: themeColor }}
          >
            Restaurants
          </Link>
          <Link
            href="/cart"
            className="flex items-center font-medium hover:text-green-600 transition-colors"
            style={{ color: themeColor }}
          >
            <FaShoppingCart className="mr-1" />
            Cart
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md font-medium hover:bg-green-50 transition-colors"
            style={{ color: themeColor }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md font-medium text-white hover:bg-green-700 transition-colors"
            style={{ backgroundColor: themeColor }}
          >
            Sign Up
          </Link>
          <Link
            href="/profile"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 transition-colors"
            style={{ color: themeColor }}
          >
            <FaUser />
          </Link>
        </div>
      </div>

      {/* Mobile Menu (simplified version) */}
      <div className="md:hidden bg-white py-2 px-4 flex justify-around border-t">
        <Link
          href="/"
          className="flex flex-col items-center text-xs"
          style={{ color: themeColor }}
        >
          <FaUtensils className="text-lg" />
          <span>Home</span>
        </Link>
        <Link
          href="/restaurants"
          className="flex flex-col items-center text-xs"
          style={{ color: themeColor }}
        >
          <FaUtensils className="text-lg" />
          <span>Restaurants</span>
        </Link>
        <Link
          href="/cart"
          className="flex flex-col items-center text-xs"
          style={{ color: themeColor }}
        >
          <FaShoppingCart className="text-lg" />
          <span>Cart</span>
        </Link>
        <Link
          href="/profile"
          className="flex flex-col items-center text-xs"
          style={{ color: themeColor }}
        >
          <FaUser className="text-lg" />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default CustomerHeader;
