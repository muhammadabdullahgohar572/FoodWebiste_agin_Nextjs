"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MdRestaurant, MdOutlineSupportAgent } from "react-icons/md";
import { useState } from "react";
import Navbar from "../components/Navbr";
import Footer from "../components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen flex items-center justify-center bg-gray-900"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Restaurant interior"
          fill
          className="object-cover opacity-50"
          priority
        />
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for reservations, questions, or feedback.
          </p>
        </motion.div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#10B981] mb-4">Contact Information</h2>
          <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Whether you have a question about our menu, want to make a reservation, or just want to say hello, we're here to help.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <FaPhone className="text-4xl mb-4 text-[#10B981]" />,
              title: "Phone",
              content: "+1 (555) 123-4567",
              description: "Call us for reservations or inquiries",
              animation: { whileHover: { y: -10 } }
            },
            {
              icon: <FaEnvelope className="text-4xl mb-4 text-[#10B981]" />,
              title: "Email",
              content: "info@culinaryexperience.com",
              description: "Send us an email anytime",
              animation: { whileHover: { scale: 1.05 } }
            },
            {
              icon: <FaMapMarkerAlt className="text-4xl mb-4 text-[#10B981]" />,
              title: "Location",
              content: "123 Culinary Street, Food City",
              description: "Visit us at our restaurant",
              animation: { whileHover: { rotate: 2 } }
            },
          ].map((info, index) => (
            <motion.div
              key={index}
              variants={item}
              {...info.animation}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              {info.icon}
              <h3 className="text-2xl font-semibold mb-2">{info.title}</h3>
              <p className="text-lg font-medium text-gray-800 mb-2">{info.content}</p>
              <p className="text-gray-600">{info.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 bg-[#10B981]/10"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#10B981] mb-4">Send Us a Message</h2>
            <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#0ea47a] transition-colors"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </motion.div>

                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </form>
              </div>

              <div className="bg-[#10B981] p-8 text-white">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full flex flex-col justify-center"
                >
                  <h3 className="text-2xl font-bold mb-6">Visit Us</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MdRestaurant className="text-2xl mt-1" />
                      <div>
                        <h4 className="font-semibold">Restaurant Hours</h4>
                        <p className="text-sm">Monday - Friday: 11am - 10pm</p>
                        <p className="text-sm">Saturday - Sunday: 10am - 11pm</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MdOutlineSupportAgent className="text-2xl mt-1" />
                      <div>
                        <h4 className="font-semibold">Customer Support</h4>
                        <p className="text-sm">Available 24/7 for online inquiries</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <FaClock className="text-2xl mt-1" />
                      <div>
                        <h4 className="font-semibold">Reservation Hours</h4>
                        <p className="text-sm">Daily: 9am - 9pm</p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-8"
                  >
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-4">
                      {['Facebook', 'Instagram', 'Twitter'].map((social, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className="bg-white/20 p-2 rounded-full cursor-pointer"
                        >
                          <span className="text-sm">{social}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 bg-gray-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#10B981] mb-4">Find Us</h2>
            <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-xl overflow-hidden shadow-2xl h-96 relative"
          >
            {/* Replace with your actual map embed code */}
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-[#10B981] mx-auto mb-4" />
                <p className="text-xl">123 Culinary Street, Food City</p>
                <p className="text-gray-400 mt-2">(Map would be displayed here)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#10B981] mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
        </motion.div>

        <motion.div variants={container} className="space-y-4">
          {[
            {
              question: "How do I make a reservation?",
              answer: "You can make a reservation by calling us, using our online booking system, or filling out the contact form on this page."
            },
            {
              question: "Do you accommodate dietary restrictions?",
              answer: "Yes, we accommodate various dietary needs. Please inform us when making your reservation."
            },
            {
              question: "What is your cancellation policy?",
              answer: "We require 24 hours notice for cancellations to avoid a cancellation fee."
            },
            {
              question: "Do you offer private dining options?",
              answer: "Yes, we have private dining rooms available for special events. Contact us for more information."
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ x: 5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-[#10B981] mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;