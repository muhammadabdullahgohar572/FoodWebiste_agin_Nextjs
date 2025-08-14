"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddFoodItems from "@/app/components/AddFoodItems";
import { FiPlus, FiPieChart } from "react-icons/fi";
import Navbar from "@/app/components/Navbr";
import Footer from "@/app/components/Footer";
import { DashboardContent } from "@/app/components/DashboardContent";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const views = {
    dashboard: {
      title: "Dashboard Overview",
      icon: <FiPieChart />,
      component: <DashboardContent />,
    },
    addFood: {
      title: "Add Food Item",
      icon: <FiPlus />,
      component: <AddFoodItems onClose={() => setActiveView("dashboard")} />,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: sidebarOpen ? 220 : 70 }}
          transition={{ duration: 0.3 }}
          className="bg-emerald-800 text-white overflow-hidden shadow-lg"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center gap-2 text-lg font-bold border-b border-emerald-700">
              <FiPieChart className="text-xl" />
              {sidebarOpen && <span>Food Admin</span>}
            </div>

            <nav className="flex-1 p-2">
              {Object.entries(views).map(([key, { title, icon }]) => (
                <motion.button
                  key={key}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView(key)}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg mb-2 transition-all ${
                    activeView === key
                      ? "bg-emerald-700 text-white"
                      : "text-emerald-100 hover:bg-emerald-700/50"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  {sidebarOpen && <span>{title}</span>}
                </motion.button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  {views[activeView].icon}
                  {views[activeView].title}
                </h1>

                {activeView !== "dashboard" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveView("dashboard")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Back to Dashboard
                  </motion.button>
                )}
              </div>

              {views[activeView].component}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
