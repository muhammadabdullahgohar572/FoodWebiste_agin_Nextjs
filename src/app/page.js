"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CustomerHeader from "./components/CoutomerHeader";
import CustomerFooter from "./components/CoutomerFooter";

export default function Home() {
  const [restaurant, setRestaurant] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // API se restaurants fetch karna
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/Coutomer/Location", { cache: "no-store" });
        const data = await res.json();
        setRestaurantsList(data.result || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { restaurant, foodItem });
    // Yahan API call ya filter logic aayega
  };

  return (
    <>
      <CustomerHeader />
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center text-white max-w-2xl px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Favorite Food
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Search delicious dishes from your favorite restaurants.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center p-4 gap-4 md:gap-2"
          >
            {/* Restaurant Dropdown */}
            <select
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-48 focus:ring-2 focus:ring-emerald-500 text-gray-700"
            >
              <option value="" disabled>
                {loading ? "Loading restaurants..." : "Select Restaurant"}
              </option>
              {!loading &&
                restaurantsList.map((rest, index) => (
                  <option key={index} value={rest}>
                    {rest}
                  </option>
                ))}
            </select>

            {/* Food Item Input */}
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Enter Food Item"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 text-gray-700"
            />

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Search
            </motion.button>
          </form>
        </motion.div>
      </section>
      <CustomerFooter />
    </>
  );
}
