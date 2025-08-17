"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/components/CoutomerHeader";
import CustomerFooter from "@/app/components/CoutomerFooter";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const RestaurantDetails = ({ params }) => {
  const { id } = params;
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Coutomer/${id}`);
        const data = await response.json();
        
        if (data.deatils && data.deatils.length > 0) {
          setRestaurant(data.deatils[0]);
        }
        if (data.food) {
          setFoodItems(data.food);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isItemInCart = (itemId) => {
    return cart.some(item => item._id === itemId);
  };

  const addToCart = (item) => {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the item is from the same restaurant
    if (currentCart.length > 0 && currentCart[0].res_id !== restaurant._id) {
      const confirmChange = window.confirm(
        "Your cart contains items from another restaurant. Adding this item will clear your current cart. Do you want to proceed?"
      );
      
      if (!confirmChange) return;
      
      currentCart = [];
    }
    
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem._id === item._id);
    
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({
        ...item,
        quantity: 1,
        res_id: restaurant._id,
        restaurantName: restaurant.restaurantName,
        restaurantImage: restaurant.imagePath
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCart(currentCart);
    window.dispatchEvent(new Event('storage'));
    
    showToast(`${item.foodname} added to cart!`, 'green');
  };

  const removeFromCart = (itemId) => {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemToRemove = currentCart.find(item => item._id === itemId);
    
    currentCart = currentCart.filter(item => item._id !== itemId);
    
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setCart(currentCart);
    window.dispatchEvent(new Event('storage'));
    
    if (itemToRemove) {
      showToast(`${itemToRemove.foodname} removed from cart!`, 'red');
    }
  };

  const showToast = (message, color) => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 bg-${color}-500 text-white px-4 py-2 rounded-lg shadow-lg`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"
        ></motion.div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <>
        <CustomerHeader />
        <div className="flex justify-center items-center min-h-[60vh] bg-gray-50">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Restaurant not found
            </h2>
            <p className="text-gray-600 mb-6">
              The restaurant you're looking for doesn't exist or may have been removed.
            </p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
        <CustomerFooter />
      </>
    );
  }

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <CustomerHeader />
      
      <main className="bg-gray-50">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 md:h-96 bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/30"></div>
          {restaurant.imagePath && (
            <Image
              src={restaurant.imagePath}
              alt={restaurant.restaurantName}
              fill
              className="object-cover"
            />
          )}
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {restaurant.restaurantName}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              {restaurant.city} • {restaurant.address}
            </p>
          </motion.div>
        </motion.section>

        {/* Restaurant Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-16">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12"
          >
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-yellow-800 font-medium">4.5 (120 reviews)</span>
                </div>
                <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
                  {restaurant.city}
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  Open Now
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-gray-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-700">{restaurant.address}</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-gray-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-gray-700">{restaurant.contactNo}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Welcome to {restaurant.restaurantName}, a premier dining destination in {restaurant.city}. 
                We specialize in delicious cuisine made from the freshest ingredients sourced locally.
                Our chefs bring years of experience to create memorable dining experiences.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Family Friendly</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Vegetarian Options</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Outdoor Seating</span>
              </div>

              <button className="self-start px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105">
                Make a Reservation
              </button>
            </div>
          </motion.div>
          
          {/* Menu Section */}
          <section className="mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200"
            >
              Our Menu
            </motion.h2>
            
            {foodItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl shadow-lg"
              >
                <p className="text-gray-500 text-lg">No menu items available yet.</p>
              </motion.div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {foodItems.map((item) => (
                  <motion.div 
                    key={item._id} 
                    variants={item}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={item.imagePath || "/food-placeholder.jpg"}
                        alt={item.foodname}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">
                          {item.foodname}
                        </h3>
                        <span className="text-emerald-300 font-bold text-lg">
                          Rs.{item.foodprice}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-5 line-clamp-2">
                        {item.fooddescription || "Delicious food item prepared with care by our chefs."}
                      </p>
                      <div className="flex gap-3">
                        {isItemInCart(item._id) ? (
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Remove from Cart
                          </button>
                        ) : (
                          <button 
                            onClick={() => addToCart(item)}
                            className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            Add to Cart
                          </button>
                        )}
                        <button className="px-4 py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </div>
      </main>
      
      <CustomerFooter />
    </>
  );
};

export default RestaurantDetails;