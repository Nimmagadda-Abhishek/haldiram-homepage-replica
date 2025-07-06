import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter, ChevronDown, Eye, Download, Printer, ArrowUpDown } from 'lucide-react';
import { API_URL } from '../lib/config';

// Sample order statuses
const ORDER_STATUSES = [
  { value: 'all', label: 'All Orders' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' }
];

// Sample order data for development
const SAMPLE_ORDERS = [
  { 
    _id: 'ORD12345', 
    user: 'John Doe', 
    email: 'john@example.com',
    total: 1299, 
    status: 'DELIVERED', 
    items: [
      { name: 'Motichoor Ladoo', quantity: 2, price: 499 },
      { name: 'Aloo Bhujia', quantity: 1, price: 299 }
    ],
    createdAt: '2023-07-15T10:30:00Z',
    address: '123 Main St, Mumbai, India'
  },
  { 
    _id: 'ORD12346', 
    user: 'Jane Smith', 
    email: 'jane@example.com',
    total: 899, 
    status: 'SHIPPED', 
    items: [
      { name: 'Mixed Nuts', quantity: 1, price: 899 }
    ],
    createdAt: '2023-07-16T14:20:00Z',
    address: '456 Park Ave, Delhi, India'
  },
  { 
    _id: 'ORD12347', 
    user: 'Mike Johnson', 
    email: 'mike@example.com',
    total: 1599, 
    status: 'PROCESSING', 
    items: [
      { name: 'Rasgulla', quantity: 2, price: 599 },
      { name: 'Samosa', quantity: 3, price: 399 }
    ],
    createdAt: '2023-07-17T09:15:00Z',
    address: '789 Oak St, Bangalore, India'
  },
  { 
    _id: 'ORD12348', 
    user: 'Sarah Williams', 
    email: 'sarah@example.com',
    total: 499, 
    status: 'CANCELLED', 
    items: [
      { name: 'Badam Milk', quantity: 1, price: 499 }
    ],
    createdAt: '2023-07-18T16:45:00Z',
    address: '101 Pine Rd, Chennai, India'
  },
  { 
    _id: 'ORD12349', 
    user: 'David Brown', 
    email: 'david@example.com',
    total: 1899, 
    status: 'DELIVERED', 
    items: [
      { name: 'Mixed Pickles', quantity: 1, price: 699 },
      { name: 'Aloo Bhujia', quantity: 2, price: 299 },
      { name: 'Rasgulla', quantity: 1, price: 599 }
    ],
    createdAt: '2023-07-19T11:30:00Z',
    address: '202 Maple Ave, Hyderabad, India'
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    // In a real app, fetch orders from API
    async function fetchOrders() {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For development, use sample data
        setOrders(SAMPLE_ORDERS);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
  }, []);
  
  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Handle status change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  
  // Handle order selection for details view
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };
  
  // Handle order status update
  const handleStatusUpdate = (orderId, newStatus) => {
    // In a real app, make API call to update status
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
    
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };
  
  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800">Order Management</h2>
        <div className="flex items-center gap-3">
          <button className="bg-primary-light text-primary-dark px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-medium transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="bg-primary-light text-primary-dark px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-medium transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="bg-primary-light text-primary-dark px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-medium transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-primary-light">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-primary-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Search orders by ID, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {ORDER_STATUSES.map((status) => (
              <button
                key={status.value}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  selectedStatus === status.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                } transition-colors`}
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg border border-primary-light overflow-hidden mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-primary-medium">Loading orders...</div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-primary-medium">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-primary-600 mb-2">No orders found</p>
            <p className="text-primary-medium max-w-md mx-auto">
              {searchQuery 
                ? "No orders match your search criteria. Try a different search term." 
                : selectedStatus !== 'all' 
                  ? `No orders with status "${ORDER_STATUSES.find(s => s.value === selectedStatus)?.label}" found.` 
                  : "When customers place orders, they will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-50 text-left">
                  <th className="p-4 font-semibold text-primary-800">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Order ID
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-800">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Customer
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-800">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Date
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-800">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Total
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-800">Status</th>
                  <th className="p-4 font-semibold text-primary-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr 
                    key={order._id} 
                    className={`border-t border-primary-light ${index % 2 === 0 ? 'bg-white' : 'bg-primary-light/30'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="p-4 font-medium">#{order._id}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{order.user}</div>
                        <div className="text-sm text-primary-medium">{order.email}</div>
                      </div>
                    </td>
                    <td className="p-4 text-primary-medium">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
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
                    <td className="p-4">
                      <button 
                        className="text-primary hover:text-primary-dark font-medium text-sm hover:underline flex items-center gap-1"
                        onClick={() => handleOrderSelect(order)}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-primary-light flex justify-between items-center">
              <h3 className="text-xl font-semibold text-primary-700">Order Details</h3>
              <button 
                className="text-primary-500 hover:text-primary-700"
                onClick={() => setSelectedOrder(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm text-primary-medium mb-1">Order ID</div>
                  <div className="text-lg font-semibold">#{selectedOrder._id}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-medium mb-1">Date</div>
                  <div>
                    {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-primary-medium mb-1">Customer</div>
                <div className="font-semibold">{selectedOrder.user}</div>
                <div className="text-primary-600">{selectedOrder.email}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-primary-medium mb-1">Shipping Address</div>
                <div className="text-primary-700">{selectedOrder.address}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-primary-medium mb-2">Status</div>
                <div className="flex gap-2">
                  {['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(status => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        selectedOrder.status === status
                          ? status === 'CANCELLED'
                            ? 'bg-red-500 text-white'
                            : status === 'DELIVERED'
                              ? 'bg-green-500 text-white'
                              : status === 'SHIPPED'
                                ? 'bg-blue-500 text-white'
                                : 'bg-primary text-white'
                          : 'bg-primary-light text-primary-dark hover:bg-primary-medium'
                      }`}
                      onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-primary-medium mb-2">Order Items</div>
                <div className="border border-primary-light rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-primary-50 text-left">
                        <th className="p-3 font-semibold text-primary-800">Item</th>
                        <th className="p-3 font-semibold text-primary-800">Qty</th>
                        <th className="p-3 font-semibold text-primary-800">Price</th>
                        <th className="p-3 font-semibold text-primary-800">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t border-primary-light">
                          <td className="p-3 font-medium">{item.name}</td>
                          <td className="p-3">{item.quantity}</td>
                          <td className="p-3">₹{item.price}</td>
                          <td className="p-3 font-medium">₹{item.quantity * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-primary-light bg-primary-50">
                        <td colSpan={3} className="p-3 text-right font-semibold">Total</td>
                        <td className="p-3 font-bold">₹{selectedOrder.total}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2 bg-primary-light text-primary-dark rounded-lg hover:bg-primary-medium transition-colors"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Print Invoice
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
} 