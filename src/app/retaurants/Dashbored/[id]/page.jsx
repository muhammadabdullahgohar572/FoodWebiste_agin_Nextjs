"use client";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbr";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiImage, FiDollarSign, FiFileText } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFoodItems = ({ params }) => {
  const router = useRouter();
  const id = params.id; // Now properly accessing the id from params
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    foodname: "",
    foodprice: "",
    imagePath: "",
    fooddescription: "",
  });

  const fetchFoodData = async () => {
    try {
      const res = await fetch(`/api/Food/edit/${id}`);
      if (!res.ok) throw new Error("Failed to fetch food item");
      
      const data = await res.json();
      // Handle the API response structure you showed in the logs
      if (data.message === "success" && data.FindData) {
        setFormData(data.FindData);
      } else {
        setFormData(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load food item data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchFoodData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/Food/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update food item");

      const result = await response.json();
      toast.success(result.message || "Food item updated successfully!");
      router.push("/retaurants/Dashbored");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update food item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar/>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Food Item</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Edit Food Item
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Food Name */}
              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Food Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="foodname"
                    value={formData.foodname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                  <FiFileText className="absolute left-3 top-3 text-gray-400" />
                </div>
              </motion.div>

              {/* Food Price */}
              <motion.div whileHover={{ y: -2 }} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="foodprice"
                    value={formData.foodprice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                  <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                </div>
              </motion.div>
            </div>

            {/* Image URL */}
            <motion.div whileHover={{ y: -2 }} className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imagePath"
                  value={formData.imagePath}
                  onChange={handleChange}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <FiImage className="absolute left-3 top-3 text-gray-400" />
              </div>
              {formData.imagePath && (
                <div className="mt-4">
                  <img 
                    src={formData.imagePath} 
                    alt="Food preview" 
                    className="h-40 w-full object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                    }}
                  />
                </div>
              )}
            </motion.div>

            {/* Description */}
            <motion.div whileHover={{ y: -2 }} className="space-y-2 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="fooddescription"
                value={formData.fooddescription}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </motion.div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => router.push("/restaurants/Dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                disabled={isSubmitting}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:bg-emerald-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </motion.button>
            </div>
          </form>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default EditFoodItems;