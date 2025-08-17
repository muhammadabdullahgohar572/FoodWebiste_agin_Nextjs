"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaHome } from "react-icons/fa";
import CustomerHeader from "../components/CoutomerHeader";
import CustomerFooter from "../components/CoutomerFooter";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const themeColor = "#009966";
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
    contactNumber: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/Coutomer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          city: formData.city,
          address: formData.address,
          contactNumber: formData.contactNumber
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Save user data to localStorage (excluding sensitive info)
      const userData = {
        id: data.data._id,
        name: data.data.name,
        email: data.data.email,
        city: data.data.city,
        address: data.data.address,
        contactNumber: data.data.contactNumber
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to dashboard or home page
      router.push('/');
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  return (
    <>
    <CustomerHeader/>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mx-auto w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4"
            style={{ backgroundColor: themeColor }}
          >
            <FaUser className="text-white text-3xl" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium" style={{ color: themeColor }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.name ? '' : themeColor }}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </motion.div>

            {/* Email Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.email ? '' : themeColor }}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.password ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.password ? '' : themeColor }}
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.confirmPassword ? '' : themeColor }}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </motion.div>

            {/* City Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.city ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.city ? '' : themeColor }}
                />
              </div>
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </motion.div>

            {/* Address Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHome className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.address ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.address ? '' : themeColor }}
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </motion.div>

            {/* Contact Number Field */}
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`py-2 pl-10 block w-full rounded-md border ${errors.contactNumber ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500`}
                  style={{ borderColor: errors.contactNumber ? '' : themeColor }}
                />
              </div>
              {errors.contactNumber && <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>}
            </motion.div>

            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                style={{ backgroundColor: themeColor }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
    <CustomerFooter/>
    </>
  );
};

export default SignupPage;