"use client";
import { useEffect, useState } from "react";
import DeliveryHeader from "../components/DeliveryHeader";
import { useRouter } from "next/navigation";

const DeliveryDashbored = () => {
  const router = useRouter();
  const [oderdata, setOderdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOderData = async () => {
    try {
      // Check if user exists in localStorage
      const userData = localStorage.getItem("Delivery");
      if (!userData) {
        router.push("/DeliveryPartner");
        return;
      }
      
      const user = JSON.parse(userData);
      const id = user.id;
      
      let res = await fetch(`/api/oder/${id}`);
      let data = await res.json();
      
      if (data.success && data.result) {
        setOderdata(data.result);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/oder/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Refresh orders after status update
        getOderData();
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating order status");
    }
  };

  useEffect(() => {
    getOderData();
  }, []);

  if (loading) {
    return (
      <>
        <DeliveryHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DeliveryHeader />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-center">
            <p className="text-xl font-semibold">{error}</p>
            <button 
              onClick={getOderData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DeliveryHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Delivery Dashboard</h1>
        
        {oderdata.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oderdata.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order #{index + 1}
                  </h2>
                  
                 
                  
                  {/* Restaurant Information */}
                  {item.data && (
                    <div className="mb-4 p-3 bg-blue-50 rounded">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Restaurant Details:</h3>
                      <p className="text-gray-800"><span className="font-medium">Name:</span> {item.data.restaurantName || "N/A"}</p>
                      <p className="text-gray-800"><span className="font-medium">Email:</span> {item.data.email || "N/A"}</p>
                      <p className="text-gray-800"><span className="font-medium">Address:</span> {item.data.address || "N/A"}</p>
                      <p className="text-gray-800"><span className="font-medium">City:</span> {item.data.city || "N/A"}</p>
                      <p className="text-gray-800"><span className="font-medium">Contact:</span> {item.data.contactNo || "N/A"}</p>
                    </div>
                  )}
                  
                  {/* Order Information */}
                  <div className="mb-4 p-3 bg-green-50 rounded">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Order Details:</h3>
                    <p className="text-lg font-bold text-green-600"><span className="font-medium">Amount:</span> ${item.amount || "0"}</p>
                    
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-600">Status:</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        item.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status || 'unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateOrderStatus(item._id, 'accepted')}
                    disabled={item.status !== 'pending'}
                    className={`flex-1 px-4 py-2 rounded ${
                      item.status !== 'pending' 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateOrderStatus(item._id, 'rejected')}
                    disabled={item.status !== 'pending'}
                    className={`flex-1 px-4 py-2 rounded ${
                      item.status !== 'pending' 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    Reject
                  </button>
                </div> */}
                
                {/* Complete Order Button (for accepted orders) */}
                {item.status === 'accepted' && (
                  <button
                    onClick={() => updateOrderStatus(item._id, 'completed')}
                    className="w-full mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DeliveryDashbored;