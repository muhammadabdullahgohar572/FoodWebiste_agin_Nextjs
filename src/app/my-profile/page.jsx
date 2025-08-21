"use client"
import { useEffect, useState } from "react";
import CustomerFooter from "../components/CoutomerFooter";
import CustomerHeader from "../components/CoutomerHeader";

const My_Profile = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const apicall = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"));
            setUser(userId);
            
            const res = await fetch(`/api/oder?id=${userId.id}`);
            const data = await res.json();
            
            if (data.result) {
                setOrders(data.result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        apicall();
    }, []);

    return (
        <>
            <CustomerHeader />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
                    
                    {user && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Name</p>
                                    <p className="font-medium">{user.name || "Not provided"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Email</p>
                                    <p className="font-medium">{user.email || "Not provided"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">User ID</p>
                                    <p className="font-medium">{user.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Member Since</p>
                                    <p className="font-medium">
                                        {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order History</h2>
                        
                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    #{index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    ${order.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date().toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                                <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <CustomerFooter />
        </>
    )   
}

export default My_Profile;