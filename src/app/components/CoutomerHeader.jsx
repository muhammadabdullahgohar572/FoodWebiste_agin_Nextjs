"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaUtensils, FaShoppingCart, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

const CustomerHeader = () => {
  const themeColor = "#009966";
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(savedCart);
    };

    loadCart();

    // Add event listener for storage changes to sync between tabs
    window.addEventListener('storage', loadCart);

    return () => {
      window.removeEventListener('storage', loadCart);
    };
  }, []);

  // Calculate total items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
            <span className="text-2xl font-bold" style={{ color: themeColor }}>
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
            href="/Cart"
            className="flex items-center font-medium hover:text-green-600 transition-colors relative"
            style={{ color: themeColor }}
          >
            <FaShoppingCart className="mr-1" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
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

      {/* Mobile Menu */}
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
          className="flex flex-col items-center text-xs relative"
          style={{ color: themeColor }}
        >
          <FaShoppingCart className="text-lg" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
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