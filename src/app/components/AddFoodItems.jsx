"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiImage, FiDollarSign, FiFileText } from "react-icons/fi";

const AddFoodItems = ({ onClose }) => {
  const [formData, setFormData] = useState({
    foodname: "",
    foodprice: "",
    imagePath: "",
    fooddescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
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
          ></textarea>
        </motion.div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            Add Food Item
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddFoodItems;
