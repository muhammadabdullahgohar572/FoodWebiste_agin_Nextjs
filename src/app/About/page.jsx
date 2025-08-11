"use client";
import { motion } from "framer-motion";


const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow pt-16 pb-8"
      >
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              About RestoFinder
            </h1>

            <motion.div
              className="space-y-6 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                RestoFinder is your ultimate guide to discovering the best
                dining experiences in your city. We connect food lovers with
                amazing restaurants, cafes, and eateries.
              </p>

              <p>
                Founded in 2023, our mission is to make restaurant discovery
                effortless and enjoyable. Whether you're looking for a cozy
                café, a fine dining experience, or the best local street food,
                we've got you covered.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-8">
                Our Team
              </h2>
              <p>
                We're a passionate group of food enthusiasts, developers, and
                designers who believe that great meals should be easy to find
                and memorable to experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default AboutPage;
