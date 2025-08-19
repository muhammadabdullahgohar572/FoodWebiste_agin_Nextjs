"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const CustomerHeader = () => {
  const themeColor = "#009966";
  const pathname = usePathname();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkAuth = () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        // No user data found - redirect to login if not already there
        if (!["/Login", "/signup"].includes(pathname)) {
          router.push("/Login");
        }
        return;
      }

      try {
        const parsedData = JSON.parse(userData);

        setUserDetails(parsedData);

        // Redirect away from auth pages if logged in
        if (["/Login", "/signup"].includes(pathname)) {
          router.push("/");
        }
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("user");
        if (!["/Login", "/signup"].includes(pathname)) {
          router.push("/Login");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      if (!["/Login", "/signup"].includes(pathname)) {
        router.push("/Login");
      }
    }
  };

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItems([]);
      }
    };

    checkAuth();
    loadCart();

    // Add event listener for storage changes
    const handleStorageChange = () => {
      checkAuth();
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname]); // Added pathname as dependency

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserDetails(null);
    setCartItems([]);
    router.push("/Login");
    setIsMenuOpen(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
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
            className={`font-medium hover:text-green-600 transition-colors ${
              pathname === "/" ? "text-green-700 font-semibold" : ""
            }`}
            style={{ color: pathname === "/" ? themeColor : "inherit" }}
          >
            Home
          </Link>
          <Link
            href="/restaurants"
            className={`font-medium hover:text-green-600 transition-colors ${
              pathname.startsWith("/retaurants")
                ? "text-green-700 font-semibold"
                : ""
            }`}
            style={{
              color: pathname.startsWith("/retaurants")
                ? themeColor
                : "inherit",
            }}
          >
            Restaurants
          </Link>
          <Link
            href="/Cart"
            className="flex items-center font-medium hover:text-green-600 transition-colors relative"
            style={{ color: pathname === "/Cart" ? themeColor : "inherit" }}
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
          {userDetails ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
                style={{ color: themeColor }}
                aria-expanded={isMenuOpen}
                aria-label="User menu"
              >
                <span className="hidden md:inline">
                  {userDetails.name || userDetails.email}
                </span>
                <FaUser />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-4 py-2 rounded-md font-medium hover:bg-green-50 transition-colors ${
                  pathname === "/login" ? "text-green-700 font-semibold" : ""
                }`}
                style={{
                  color: pathname === "/login" ? themeColor : "inherit",
                }}
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white py-2 px-4 flex justify-around border-t">
        <Link
          href="/"
          className={`flex flex-col items-center text-xs ${
            pathname === "/" ? "text-green-700 font-semibold" : ""
          }`}
          style={{ color: pathname === "/" ? themeColor : "inherit" }}
        >
          <FaUtensils className="text-lg" />
          <span>Home</span>
        </Link>
        <Link
          href="/restaurants"
          className={`flex flex-col items-center text-xs ${
            pathname.startsWith("/restaurants")
              ? "text-green-700 font-semibold"
              : ""
          }`}
          style={{
            color: pathname.startsWith("/restaurants") ? themeColor : "inherit",
          }}
        >
          <FaUtensils className="text-lg" />
          <span>Restaurants</span>
        </Link>
        <Link
          href="/cart"
          className={`flex flex-col items-center text-xs relative ${
            pathname === "/cart" ? "text-green-700 font-semibold" : ""
          }`}
          style={{ color: pathname === "/cart" ? themeColor : "inherit" }}
        >
          <FaShoppingCart className="text-lg" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        {userDetails ? (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center text-xs"
            style={{ color: themeColor }}
          >
            <FaUser className="text-lg" />
            <span>Account</span>
          </button>
        ) : (
          <Link
            href="/login"
            className={`flex flex-col items-center text-xs ${
              pathname === "/login" ? "text-green-700 font-semibold" : ""
            }`}
            style={{ color: pathname === "/login" ? themeColor : "inherit" }}
          >
            <FaUser className="text-lg" />
            <span>Login</span>
          </Link>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && userDetails && (
        <div className="md:hidden bg-white py-2 px-4 border-t">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CustomerHeader;
