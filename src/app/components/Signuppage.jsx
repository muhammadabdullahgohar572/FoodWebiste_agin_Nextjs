"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";
import { theme } from "./theme";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    city: "",
    address: "",
    contactNo: "",
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

    if (!form.restaurantName)
      newErrors.restaurantName = "Restaurant name is required";
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
      const loadingToastId = toast.loading("Creating your account...");

      const response = await fetch("/api/retaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      toast.dismiss(loadingToastId);

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      localStorage.setItem("restaurantuser", JSON.stringify(result));

      toast.success("🎉 Registration successful! Redirecting to dashboard...", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/retaurants/Dashbored");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-teal-400 bg-[length:200%_200%] animate-gradient">
      <ToastContainer position="top-center" autoClose={5000} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl"
      >
        <motion.div variants={item} className="text-center mb-8">
          <motion.h1
            className="text-3xl font-bold mb-2 text-teal-600"
            whileHover={{ scale: 1.02 }}
          >
            Create Restaurant Account
          </motion.h1>
          <p className="text-gray-500">Join our restaurant community</p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Form fields remain the same as before */}
          {/* Email */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email{" "}
              {errors.email && (
                <span className="text-red-500 text-xs"> - {errors.email}</span>
              )}
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password{" "}
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {" "}
                  - {errors.password}
                </span>
              )}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Create password"
                required
              />
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Confirm Password{" "}
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {" "}
                  - {errors.confirmPassword}
                </span>
              )}
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm password"
                required
              />
            </div>
          </motion.div>

          {/* Restaurant Name */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Restaurant Name{" "}
              {errors.restaurantName && (
                <span className="text-red-500 text-xs">
                  {" "}
                  - {errors.restaurantName}
                </span>
              )}
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.restaurantName ? "border-red-500" : ""
                }`}
                placeholder="Enter restaurant name"
                required
              />
            </div>
          </motion.div>

          {/* City */}
          <motion.div variants={item}>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              City{" "}
              {errors.city && (
                <span className="text-red-500 text-xs"> - {errors.city}</span>
              )}
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.city ? "border-red-500" : ""
                }`}
                placeholder="Enter city"
                required
              />
            </div>
          </motion.div>

          {/* Address */}
          <motion.div variants={item} className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Address{" "}
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {" "}
                  - {errors.address}
                </span>
              )}
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address ? "border-red-500" : ""
                }`}
                placeholder="Enter address"
                required
              />
            </div>
          </motion.div>

          {/* Contact Number */}
          <motion.div variants={item} className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Contact Number{" "}
              {errors.contactNo && (
                <span className="text-red-500 text-xs">
                  {" "}
                  - {errors.contactNo}
                </span>
              )}
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="contactNo"
                value={form.contactNo}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.contactNo ? "border-red-500" : ""
                }`}
                placeholder="Enter contact number"
                required
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={item}
            type="submit"
            className="md:col-span-2 w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center mt-4 bg-teal-600 hover:bg-teal-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <span className="animate-spin inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Creating Account...
              </span>
            ) : (
              <span className="flex items-center">
                Sign Up <FaArrowRight className="ml-2" />
              </span>
            )}
          </motion.button>
        </form>

        <motion.div variants={item} className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-teal-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
