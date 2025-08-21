"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/components/CoutomerHeader";
import CustomerFooter from "@/app/components/CoutomerFooter";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getUserDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/Login");
      return;
    }
    setUserDetails(user);
  };

  useEffect(() => {
    getUserDetails();

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    // If there are items in cart, get restaurant name and ID from the first item
    if (savedCart.length > 0) {
      setRestaurantName(savedCart[0].restaurantName);
      setRestaurantId(savedCart[0].restaurantId);
    }
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // If cart is empty, clear restaurant name
    if (updatedCart.length === 0) {
      setRestaurantName("");
      setRestaurantId("");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.foodprice) * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantName("");
    setRestaurantId("");
    localStorage.removeItem("cart");
  };

  const placeOrder = async () => {
    if (!userDetails || cartItems.length === 0) return;

    setIsLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const city = JSON.parse(localStorage.getItem("user")).city;

      const cartData = JSON.parse(localStorage.getItem("cart"));

      const respnse = await fetch(`/api/DeliveryPartner/${city}`);
      const data = await respnse.json();
      const datamap = data.data.map((item) => item._id);
      const randomIndex = datamap[Math.floor(Math.random() * datamap.length)]
      if (!randomIndex) {
        alert("Delivery boye not avalable");
      }
      const orderData = {
        res_id: cartData[0].res_id,
        User_Id: user.id,
        FoodItems: cartData.map((item) => item._id).toString(),
        amount: (calculateTotal() + 50).toString(),
        status: "pending",
        DeliveryBoye_Id: randomIndex,
      };

      console.log("Sending order data:", orderData);

      const response = await fetch("/api/oder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (result.success) {
        clearCart();

        alert("Order placed successfully!");
        cartItems.map((item) => {
          item.quantity = 0;
        });
        setCartItems(cartItems);
        router.push("/my-profile");
      } else {
        alert("Failed to place order: " + result.message);
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

              {/* User Details */}
              {userDetails && (
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    User Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="text-gray-800 font-medium">
                        {userDetails.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="text-gray-800 font-medium">
                        {userDetails.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="text-gray-800 font-medium">
                        {userDetails.contactNumber || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Address</p>
                      <p className="text-gray-800 font-medium">
                        {userDetails.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 text-lg mb-6">
                      Your cart is empty
                    </p>
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
                            <h3 className="text-xl font-bold text-gray-800">
                              {item.foodname}
                            </h3>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>

                          <p className="text-gray-600 my-2">
                            {item.fooddescription}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity - 1)
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                -
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item._id, item.quantity + 1)
                                }
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-lg font-bold text-emerald-600">
                              Rs.{parseFloat(item.foodprice) * item.quantity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Cart Summary */}
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium">Subtotal</span>
                        <span className="text-lg font-bold">
                          Rs.{calculateTotal()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-medium">
                          Delivery Fee
                        </span>
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
                        <button
                          onClick={placeOrder}
                          disabled={isLoading || cartItems.length === 0}
                          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-center"
                        >
                          {isLoading ? "Placing Order..." : "Place Your Order"}
                        </button>
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

export default Order;
