"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginPage from "../components/Loginpage";
import SignupPage from "../components/Signuppage";
import Navbar from "../components/Navbr";
import Footer from "../components/Footer";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = (isLogin) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setLogin(isLogin);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow w-full py-12">
        <div className="w-full px-4 mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Header Section with Proper Spacing */}
            <motion.div
              className="bg-[#10B981] p-8 text-center rounded-t-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-white mb-2">
                {login ? "Welcome Back!" : "Join Our Community"}
              </h1>
              <p className="text-emerald-100 text-lg">
                {login
                  ? "Sign in to continue your culinary journey"
                  : "Create your account to get started"}
              </p>
            </motion.div>

            {/* Content Area with Consistent Padding */}
            <div className="bg-white p-8 w-full space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={login ? "login" : "signup"}
                  initial={{ opacity: 0, x: login ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: login ? -30 : 30 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="w-full"
                >
                  {login ? <LoginPage /> : <SignupPage />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Toggle Buttons with Proper Spacing */}
            <div className="flex border-t border-gray-200 w-full bg-gray-50">
              <motion.button
                onClick={() => handleToggle(true)}
                className={`flex-1 py-5 font-medium text-center transition-colors relative ${
                  login
                    ? "text-[#10B981]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                whileTap={{ scale: 0.96 }}
                disabled={isTransitioning}
              >
                Login
                {login && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#10B981]"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>

              <motion.button
                onClick={() => handleToggle(false)}
                className={`flex-1 py-5 font-medium text-center transition-colors relative ${
                  !login
                    ? "text-[#10B981]"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                whileTap={{ scale: 0.96 }}
                disabled={isTransitioning}
              >
                Sign Up
                {!login && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#10B981]"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom Link with Proper Margin */}
          <motion.div
            className="mt-8 text-center text-gray-600 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg">
              {login ? "New to RestoFinder?" : "Already have an account?"}{" "}
              <button
                onClick={() => handleToggle(!login)}
                className="font-semibold text-[#10B981] hover:underline hover:text-emerald-700 transition-colors"
              >
                {login ? "Create account" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Restaurant;
