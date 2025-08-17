"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import CustomerHeader from "./components/CoutomerHeader";
import CustomerFooter from "./components/CoutomerFooter";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [restaurant, setRestaurant] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [foodItemsList, setFoodItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Fetch all restaurants data
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/Coutomer");
      const data = await res.json();
      setRestaurantData(data.find || []);
      setFilteredData(data.find || []);

      // Extract unique values for dropdowns
      const uniqueRestaurants = [
        ...new Set(data.find.map((item) => item.restaurantName)),
      ];
      const uniqueCities = [...new Set(data.find.map((item) => item.city))];

      setRestaurantsList(uniqueRestaurants);
      setCitiesList(uniqueCities);
      
      // Sample food items (replace with your actual data)
      const sampleFoodItems = [
        "Biryani", "Burger", "Pizza", "Pasta", 
        "Salad", "Sandwich", "Soup", "Steak"
      ];
      setFoodItemsList(sampleFoodItems);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update locations based on selected city
  useEffect(() => {
    if (city) {
      const locationsInCity = [
        ...new Set(
          restaurantData
            .filter((item) => item.city === city)
            .map((item) => item.address)
        ),
      ];
      setLocationsList(locationsInCity);
    } else {
      setLocationsList([]);
    }
    setLocation("");
  }, [city, restaurantData]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = [...restaurantData];

    if (restaurant) {
      filtered = filtered.filter((item) =>
        item.restaurantName.toLowerCase().includes(restaurant.toLowerCase())
      );
    }

    if (city) {
      filtered = filtered.filter((item) =>
        item.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (location) {
      filtered = filtered.filter((item) =>
        item.address.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (foodItem) {
      filtered = filtered.filter((item) =>
        item.menu?.some((food) =>
          food.name.toLowerCase().includes(foodItem.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    setIsSearchExpanded(false);
  };

  const handleReset = () => {
    setRestaurant("");
    setCity("");
    setLocation("");
    setFoodItem("");
    setFilteredData(restaurantData);
  };

  // Sample restaurant images
  const getRestaurantImage = (id) => {
    const images = [
      "/restaurant1.jpg",
      "/restaurant2.jpg",
      "/restaurant3.jpg",
      "/restaurant4.jpg",
      "/restaurant5.jpg",
    ];
    return images[id % images.length];
  };

  return (
    <>
      <CustomerHeader />

      {/* Hero Section with Search */}
      <section
        className="relative h-[70vh] min-h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/food-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover & Order <span className="text-emerald-400">Delicious Food</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              From your favorite local restaurants delivered to your doorstep
            </p>

            {/* Search Trigger Button (Mobile) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="lg:hidden px-6 py-3 bg-emerald-500 text-white rounded-full shadow-lg mb-4 flex items-center mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {isSearchExpanded ? 'Hide Search' : 'Search Restaurants'}
            </motion.button>

            {/* Search Form */}
            <motion.div
              initial={false}
              animate={{
                height: isSearchExpanded ? "auto" : "auto",
                opacity: 1,
              }}
              className={`${isSearchExpanded ? "block" : "hidden"} lg:block`}
            >
              <form
                onSubmit={handleSearch}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
                  {/* Restaurant Dropdown */}
                  <div className="md:col-span-4 lg:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <select
                      value={restaurant}
                      onChange={(e) => setRestaurant(e.target.value)}
                      className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700 text-sm sm:text-base"
                    >
                      <option value="">All Restaurants</option>
                      {restaurantsList.map((rest, index) => (
                        <option key={index} value={rest}>
                          {rest}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Dropdown */}
                  <div className="md:col-span-4 lg:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700 text-sm sm:text-base"
                    >
                      <option value="">All Cities</option>
                      {citiesList.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Dropdown */}
                  <div className="md:col-span-4 lg:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={!city}
                      className="pl-10 pr-4 py-2 sm:py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-700 text-sm sm:text-base disabled:opacity-50"
                    >
                      <option value="">All Locations</option>
                      {locationsList.map((loc, index) => (
                        <option key={index} value={loc}>
                          {loc.substring(0, 20)}
                          {loc.length > 20 ? "..." : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className="md:col-span-12 lg:col-span-3 flex gap-2 sm:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="flex-1 px-4 py-2 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow flex items-center justify-center text-sm sm:text-base"
                    >
                      Search
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow flex items-center justify-center text-sm sm:text-base"
                    >
                      Reset
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Listing Section */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            {filteredData.length} {filteredData.length === 1 ? 'Restaurant' : 'Restaurants'} Found
          </h2>
         
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
            ></motion.div>
          </div>
        ) : filteredData.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-gray-800 mb-2">No restaurants found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              onClick={handleReset}
              className="mt-6 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg"
              >
               
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {restaurant.restaurantName}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {restaurant.city}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {restaurant.address.substring(0, 30)}{restaurant.address.length > 30 ? "..." : ""}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {restaurant.contactNo}
                    </p>
                    <Link href={`./exploer/${restaurant.restaurantName.replace(/\s+/g, '-').toLowerCase()}/${restaurant._id}`} passHref>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow flex items-center"
                      >
                        View Menu
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <CustomerFooter />
    </>
  );
}