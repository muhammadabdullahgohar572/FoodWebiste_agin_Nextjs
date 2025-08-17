"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/components/CoutomerHeader";
import CustomerFooter from "@/app/components/CoutomerFooter";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    
    // If there are items in cart, get restaurant name from the first item
    if (savedCart.length > 0) {
      setRestaurantName(savedCart[0].restaurantName);
    }
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // If cart is empty, clear restaurant name
    if (updatedCart.length === 0) {
      setRestaurantName("");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.foodprice * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantName("");
    localStorage.removeItem("cart");
  };

  return (
    <>
      <CustomerHeader />
      
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Cart Header */}
              <div className="bg-emerald-500 px-6 py-4">
                <h1 className="text-2xl font-bold text-white">Your Cart</h1>
                {restaurantName && (
                  <p className="text-emerald-100">From: {restaurantName}</p>
                )}
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
                    <Link 
                      href="/"
                      className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Browse Restaurants
                    </Link>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <motion.div 
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 flex flex-col sm:flex-row gap-6"
                      >
                        <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden">
                          <Image
                            src={item.imagePath || "/food-placeholder.jpg"}
                            alt={item.foodname}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-gray-800">{item.foodname}</h3>
                            <button 
                              onClick={() => removeItem(item._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="text-gray-600 my-2">{item.fooddescription}</p>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            
                            <span className="text-lg font-bold text-emerald-600">
                              Rs.{item.foodprice * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Cart Summary */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Subtotal</span>
                        <span className="text-lg font-bold">Rs.{calculateTotal()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium">Delivery Fee</span>
                        <span className="text-lg font-bold">Rs.50</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-xl font-bold text-emerald-600">
                          Rs.{calculateTotal() + 50}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={clearCart}
                          className="px-6 py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Clear Cart
                        </button>
                        <Link
                          href="/checkout"
                          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-center"
                        >
                          Proceed to Checkout
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <CustomerFooter />
    </>
  );
};

export default Cart;