import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Package, ShoppingCart, Users, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { API_URL } from '../lib/config';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('adminToken');
        const authHeaders = { Authorization: `Bearer ${token}` };
        
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/admin/orders`, { headers: authHeaders }),
          fetch(`${API_URL}/admin/users`, { headers: authHeaders }),
        ]);
        
        if (!productsRes.ok || !ordersRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch some data');
        }
        
        const products = await productsRes.json();
        const orders = await ordersRes.json();
        const users = await usersRes.json();
        
        setStats({ 
          products: products.length, 
          orders: orders.length, 
          users: users.length 
        });
        
        // Get the 5 most recent orders and reverse them to show newest first
        setRecentOrders(orders.slice(-5).reverse());
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load dashboard stats');
        
        // Set some fallback data for development
        setStats({ products: 12, orders: 8, users: 5 });
        setRecentOrders([
          { _id: 'ord123', user: 'John Doe', total: 499, status: 'DELIVERED', createdAt: new Date().toISOString() },
          { _id: 'ord124', user: 'Jane Smith', total: 799, status: 'SHIPPED', createdAt: new Date().toISOString() },
          { _id: 'ord125', user: 'Mike Johnson', total: 1299, status: 'PROCESSING', createdAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="flex items-center gap-2 text-sm text-primary-medium">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className="bg-white rounded-2xl shadow-lg p-6 border border-primary-light"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-primary-dark">{stats.products}</div>
              <div className="text-sm text-primary-medium">Total Products</div>
              <span className="text-primary-dark bg-primary-light px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </span>
            </div>
            <div className="text-primary hover:text-primary-dark">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className="bg-white rounded-2xl shadow-lg p-6 border border-primary-light"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-primary-dark">{stats.orders}</div>
              <div className="text-sm text-primary-medium">Total Orders</div>
              <span className="text-primary-dark bg-primary-light px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5% from last month
              </span>
            </div>
            <div className="text-primary hover:text-primary-dark">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }} 
          className="bg-white rounded-2xl shadow-lg p-6 border border-primary-light"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-primary-dark">{stats.users}</div>
              <div className="text-sm text-primary-medium">Total Users</div>
              <span className="text-primary-dark bg-primary-light px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8% from last month
              </span>
            </div>
            <div className="text-primary hover:text-primary-dark">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Orders */}
      <motion.div 
        className="bg-white rounded-2xl shadow-lg border border-primary-light overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="p-6 border-b border-primary-light flex justify-between items-center">
          <h3 className="text-xl font-semibold text-primary-dark flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Recent Orders
          </h3>
          <button className="text-sm text-primary hover:text-primary-dark font-medium hover:underline">
            View All
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-primary-medium">Loading order data...</div>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="p-8 text-center text-primary-medium">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-primary-medium max-w-md mx-auto">
              When customers place orders, they will appear here. You can manage all orders from the Orders page.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-light text-left">
                  <th className="p-4 font-semibold text-primary-dark">Order ID</th>
                  <th className="p-4 font-semibold text-primary-dark">Customer</th>
                  <th className="p-4 font-semibold text-primary-dark">Amount</th>
                  <th className="p-4 font-semibold text-primary-dark">Status</th>
                  <th className="p-4 font-semibold text-primary-dark">Date</th>
                  <th className="p-4 font-semibold text-primary-dark">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <motion.tr 
                    key={order._id} 
                    className={`border-t border-primary-light ${index % 2 === 0 ? 'bg-white' : 'bg-primary-light/30'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="p-4 font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                    <td className="p-4">{order.user}</td>
                    <td className="p-4 font-medium">₹{order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'DELIVERED' 
                          ? 'bg-green-100 text-green-700' 
                          : order.status === 'SHIPPED' 
                            ? 'bg-blue-100 text-blue-700' 
                            : order.status === 'CANCELLED' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-primary/10 text-primary'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-primary-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4">
                      <button className="text-primary hover:text-primary-dark font-medium text-sm hover:underline">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
} 