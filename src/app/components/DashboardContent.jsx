"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const DashboardContent = () => {
  const [food, setFood] = useState([]);
  const route=useRouter()

  const getData = async () => {
    try {
      const getid = JSON.parse(localStorage.getItem("restaurantuser"));
      const res_id = getid.data._id;
      const getData = await fetch(`http://localhost:3000/api/Food/${res_id}`);
      const res = await getData.json();
      if (res.message === "success") {
        setFood(res.data);
      } else {
        console.error("Error fetching food:", res.error);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/Food/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message === "success") {
        alert("Food item deleted successfully");
        await getData();
      } else {
        alert("Error deleting food item");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Our Menu
      </h1>

      {food.length === 0 ? (
        <p className="text-gray-500 text-center">
          No food items available at the moment.
        </p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {food.map((item) => (
            <motion.div
              key={item._id}
              variants={item}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <motion.img
                  src={item.imagePath}
                  alt={item.foodname}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Rs {item.foodprice}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.foodname}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.fooddescription}
                </p>

                <div className="flex space-x-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Order Now
                  </motion.button>
                </div>

                <div className="flex space-x-3 mt-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>route.push(`../retaurants/Dashbored/${item._id}`)}

                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(item._id)}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
