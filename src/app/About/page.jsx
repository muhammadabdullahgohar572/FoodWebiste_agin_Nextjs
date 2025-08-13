"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaUtensils,
  FaAward,
  FaUsers,
  FaLeaf,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiMeal, GiChefToque } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import Footer from "../components/Footer";
import Navbar from "../components/Navbr";

const AboutPage = () => {
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
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
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
            Our Culinary Journey
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the passion, tradition, and innovation behind our
            restaurant
          </p>
        </motion.div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#10B981] mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Founded in 2010, we began as a small family-owned eatery with a
            simple mission: to serve authentic, delicious food made with love.
            Today, we've grown into a beloved culinary destination, but we've
            never lost sight of our roots.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={item}>
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
              alt="Restaurant interior"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl w-full h-auto"
              priority
            />
          </motion.div>
          <motion.div variants={item} className="space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800">
              From Humble Beginnings
            </h3>
            <p className="text-gray-600">
              Our founder, Chef Maria, started with just four tables and a
              dream. What began as a neighborhood secret soon became a city-wide
              sensation thanks to our commitment to quality and authentic
              flavors.
            </p>
            <p className="text-gray-600">
              In 2015, we expanded to our current location, allowing us to serve
              more guests while maintaining the intimate dining experience we're
              known for.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <FaMapMarkerAlt className="text-2xl text-[#10B981]" />
              <span className="text-gray-700">
                123 Culinary Street, Food City
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#10B981] mb-4">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-[#10B981] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our talented team of culinary professionals brings diverse
            experiences and shared passion to your dining experience.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              name: "Chef Maria Gonzalez",
              role: "Executive Chef & Founder",
              bio: "With 25 years of experience, Chef Maria brings traditional family recipes to life with modern flair.",
              img: "https://images.unsplash.com/photo-1601315488950-3b5047998b38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "David Chen",
              role: "Head Pastry Chef",
              bio: "David's innovative desserts have earned him recognition in Food & Wine magazine.",
              img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Sophie Williams",
              role: "Sommelier",
              bio: "Sophie curates our award-winning wine pairings from boutique vineyards worldwide.",
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src={member.img}
                alt={member.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                <p className="text-[#10B981] mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <Footer/>
    </div>
    </>
  );
};

export default AboutPage;