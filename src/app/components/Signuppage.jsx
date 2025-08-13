"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaLock, FaBuilding, FaMapMarkerAlt, FaPhone, FaArrowRight } from "react-icons/fa";
import { theme } from "./theme";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    city: "",
    address: "",
    contactNo: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!form.restaurantName) newErrors.restaurantName = "Restaurant name is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.address) newErrors.address = "Address is required";
    
    if (!form.contactNo) newErrors.contactNo = "Contact number is required";
    else if (!/^[0-9]{10,15}$/.test(form.contactNo)) {
      newErrors.contactNo = "Please enter a valid contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Creating your account...");
      
      const response = await fetch("http://localhost:3000/api/retaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantName: form.restaurantName,
          email: form.email,
          password: form.password,
          city: form.city,
          address: form.address,
          contactNo: form.contactNo
        }),
      });

      const result = await response.json();
      // Dismiss loading toast
      toast.dismiss(loadingToastId);
      
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("🎉 Registration successful! Redirecting to dashboard...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      // Store token and user data
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("restaurant", JSON.stringify(result.restaurant));
      }

      // Redirect after delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);

    } catch (error) {
      console.error("Registration error:", error);
      
      // Provide more specific error messages based on the error
      let errorMessage = "❌ Registration failed. Please try again.";
      
      if (error.message.includes("Failed to connect to database")) {
        errorMessage = "❌ Unable to connect to the database. Please check your internet connection and try again.";
      } else if (error.message.includes("already exists")) {
        errorMessage = "❌ A restaurant with this email already exists. Please use a different email.";
      } else if (error.message) {
        errorMessage = `❌ ${error.message}`;
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: theme.gradients.signup,
        backgroundSize: '200% 200%',
        animation: 'gradient 8s ease infinite'
      }}
    >
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2" 
            style={{ color: theme.colors.secondary }}
            whileHover={{ scale: 1.02 }}
          >
            Create Account
          </motion.h1>
          <p className="text-gray-500">Join our restaurant community</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Email {errors.email && <span className="text-red-500 text-xs"> - {errors.email}</span>}
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? "border-red-500" : ""}`}
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Password {errors.password && <span className="text-red-500 text-xs"> - {errors.password}</span>}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "border-red-500" : ""}`}
                placeholder="Create password"
                required
              />
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Confirm Password {errors.confirmPassword && <span className="text-red-500 text-xs"> - {errors.confirmPassword}</span>}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder="Confirm password"
                required
              />
            </div>
          </motion.div>

          {/* Restaurant Name */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Restaurant Name {errors.restaurantName && <span className="text-red-500 text-xs"> - {errors.restaurantName}</span>}
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.restaurantName ? "border-red-500" : ""}`}
                placeholder="Enter restaurant name"
                required
              />
            </div>
          </motion.div>

          {/* City */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              City {errors.city && <span className="text-red-500 text-xs"> - {errors.city}</span>}
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.city ? "border-red-500" : ""}`}
                placeholder="Enter city"
                required
              />
            </div>
          </motion.div>

          {/* Address */}
          <motion.div variants={item} className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Address {errors.address && <span className="text-red-500 text-xs"> - {errors.address}</span>}
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.address ? "border-red-500" : ""}`}
                placeholder="Enter address"
                required
              />
            </div>
          </motion.div>

          {/* Contact Number */}
          <motion.div variants={item} className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" style={{ color: theme.colors.text }}>
              Contact Number {errors.contactNo && <span className="text-red-500 text-xs"> - {errors.contactNo}</span>}
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${errors.contactNo ? "border-red-500" : ""}`}
                placeholder="Enter contact number"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={item}
            type="submit"
            className="md:col-span-2 w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center mt-4"
            style={{ backgroundColor: theme.colors.secondary }}
            whileHover={{ scale: 1.02, boxShadow: `0 4px 12px rgba(16, 185, 129, 0.3)` }}
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
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center">
                Sign Up <FaArrowRight className="ml-2" />
              </span>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <motion.div variants={item} className="mt-6 text-center" whileHover={{ scale: 1.02 }}>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: theme.colors.secondary }}>
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;