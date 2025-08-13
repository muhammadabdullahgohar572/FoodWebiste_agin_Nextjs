"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddFoodItems from "@/app/components/AddFoodItems";

import { FiPlus, FiX, FiPieChart, FiList, FiSettings, FiUsers } from 'react-icons/fi';
import Navbar from '@/app/components/Navbr';
import Footer from '@/app/components/Footer';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const views = {
    dashboard: {
      title: "Dashboard Overview",
      icon: <FiPieChart className="mr-2" />,
      component: <DashboardContent />
    },
    addFood: {
      title: "Add Food Item",
      icon: <FiPlus className="mr-2" />,
      component: <AddFoodItems onClose={() => setActiveView('dashboard')} />
    },
    menuItems: {
      title: "Menu Items",
      icon: <FiList className="mr-2" />,
      component: <MenuItemsContent />
    },
    settings: {
      title: "Settings",
      icon: <FiSettings className="mr-2" />,
      component: <SettingsContent />
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={{ width: sidebarOpen ? 250 : 0 }}
          animate={{ width: sidebarOpen ? 250 : 0 }}
          className={`bg-emerald-800 text-white ${sidebarOpen ? 'block' : 'hidden'} md:block`}
        >
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 mt-4 flex items-center">
              <FiPieChart className="mr-2" /> Food Admin
            </h2>
            
            <nav className="flex-1">
              {Object.entries(views).map(([key, { title, icon }]) => (
                <motion.button
                  key={key}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView(key)}
                  className={`w-full text-left flex items-center px-4 py-3 mb-2 rounded-lg transition-all ${
                    activeView === key ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700/50'
                  }`}
                >
                  {icon}
                  {title}
                </motion.button>
              ))}
            </nav>
            
            <div className="mt-auto pt-4 border-t border-emerald-700">
              <button className="flex items-center px-4 py-3 text-emerald-100 hover:bg-emerald-700/50 w-full rounded-lg">
                <FiUsers className="mr-2" /> Account
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                {views[activeView].icon}
                {views[activeView].title}
              </h1>
              
              {activeView !== 'dashboard' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveView('dashboard')}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <FiX className="mr-1" /> Back to Dashboard
                </motion.button>
              )}
            </div>

            {views[activeView].component}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

// Dashboard Content Components
function DashboardContent() {
  const stats = [
    { title: "Total Menu Items", value: "128", change: "+12%", trend: "up" },
    { title: "Active Categories", value: "8", change: "+2", trend: "up" },
    { title: "Monthly Orders", value: "1,284", change: "-5%", trend: "down" },
    { title: "Customer Rating", value: "4.8", change: "+0.2", trend: "up" }
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <div className="flex items-end mt-2">
              <p className="text-3xl font-bold text-gray-800 mr-2">{stat.value}</p>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-lg"
          >
            <FiPlus className="text-2xl mb-2" />
            <span>Add Item</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-lg"
          >
            <FiList className="text-2xl mb-2" />
            <span>View Menu</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-lg"
          >
            <FiUsers className="text-2xl mb-2" />
            <span>Customers</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-4 bg-amber-50 text-amber-600 rounded-lg"
          >
            <FiSettings className="text-2xl mb-2" />
            <span>Settings</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              whileHover={{ x: 5 }}
              className="flex items-start p-3 hover:bg-gray-50 rounded-lg"
            >
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <FiPlus className="text-emerald-600" />
              </div>
              <div>
                <p className="font-medium">New menu item added</p>
                <p className="text-sm text-gray-500">Spicy Chicken Burger - 2 hours ago</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function MenuItemsContent() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Menu Items</h2>
      <p className="text-gray-600">Your menu items will be displayed here.</p>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
      <p className="text-gray-600">Configure your restaurant settings here.</p>
    </div>
  );
}

export default Dashboard;