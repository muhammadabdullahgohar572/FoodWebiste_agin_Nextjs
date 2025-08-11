"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { theme } from "./theme";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      console.log("Logged in with:", { email, password });
      setIsLoading(false);
    }, 1500);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: theme.gradients.login }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.primary }}>
            Welcome Back
          </h1>
          <p className="text-gray-500">Sign in to your account</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <motion.div variants={item} className="space-y-2">
            <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="your@email.com"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={item} className="space-y-2">
            <label className="block text-sm font-medium" style={{ color: theme.colors.text }}>
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="••••••••"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={item}
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Signing In...
              </span>
            ) : (
              <span className="flex items-center">
                Login <FaArrowRight className="ml-2" />
              </span>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <motion.div variants={item} className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium hover:underline"
              style={{ color: theme.colors.primary }}
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;