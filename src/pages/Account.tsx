import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Account() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('customer');
    if (!stored) {
      navigate('/login');
      return;
    }
    setCustomer(JSON.parse(stored));
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('customer');
    navigate('/login');
  };
  if (!customer) return null;

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-primary">My Account</h2>
            <button
              onClick={handleLogout}
              className="bg-gradient-midnight text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold text-primary mb-1">Name</div>
              <div className="mb-3 text-primary-medium">{customer.name}</div>
              <div className="font-semibold text-primary mb-1">Email</div>
              <div className="mb-3 text-primary-medium">{customer.email}</div>
              <div className="font-semibold text-primary mb-1">Phone</div>
              <div className="mb-3 text-primary-medium">{customer.phone}</div>
            </div>
            <div>
              <div className="font-semibold text-primary mb-1">Delivery Address</div>
              <div className="mb-3 text-primary-medium">{customer.address}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Past Orders section removed until real data is implemented */}
        </motion.div>
      </div>
    </div>
  );
} 