import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, UserPlus, Mail, Phone, Edit, Trash2, ArrowUpDown, Eye } from 'lucide-react';
import { API_URL } from '../lib/config';

// Sample user data for development
const SAMPLE_USERS = [
  {
    _id: 'USR12345',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: '123 Main St, Mumbai, India',
    createdAt: '2023-06-10T10:30:00Z',
    orders: 5,
    totalSpent: 4999
  },
  {
    _id: 'USR12346',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 9876543211',
    address: '456 Park Ave, Delhi, India',
    createdAt: '2023-06-15T14:20:00Z',
    orders: 3,
    totalSpent: 2899
  },
  {
    _id: 'USR12347',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+91 9876543212',
    address: '789 Oak St, Bangalore, India',
    createdAt: '2023-06-20T09:15:00Z',
    orders: 2,
    totalSpent: 1599
  },
  {
    _id: 'USR12348',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+91 9876543213',
    address: '101 Pine Rd, Chennai, India',
    createdAt: '2023-06-25T16:45:00Z',
    orders: 1,
    totalSpent: 499
  },
  {
    _id: 'USR12349',
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+91 9876543214',
    address: '202 Maple Ave, Hyderabad, India',
    createdAt: '2023-06-30T11:30:00Z',
    orders: 4,
    totalSpent: 3899
  }
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  useEffect(() => {
    // In a real app, fetch users from API
    async function fetchUsers() {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For development, use sample data
        setUsers(SAMPLE_USERS);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUsers();
  }, []);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    return searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
  });
  
  // Handle user selection for details view
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };
  
  // Handle adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // In a real app, make API call to add user
    const newUserWithId = {
      ...newUser,
      _id: `USR${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
      orders: 0,
      totalSpent: 0
    };
    
    setUsers([...users, newUserWithId]);
    setNewUser({ name: '', email: '', phone: '', address: '' });
    setShowAddUserModal(false);
  };
  
  // Handle deleting a user
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, make API call to delete user
      setUsers(users.filter(user => user._id !== userId));
      
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser(null);
      }
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
        <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
        <button 
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-md transition-colors"
          onClick={() => setShowAddUserModal(true)}
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>
      
      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-primary-light">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-primary-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Users Table */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg border border-primary-light overflow-hidden mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {loading ? (
          <div className="p-8 text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-primary-medium">Loading users...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-primary-medium">
                          <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
            <h3 className="text-lg font-medium text-primary-dark mb-2">No users found</h3>
            <p className="text-primary-medium max-w-md mx-auto">
              There are no users registered yet. Users will appear here once they create accounts.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary-light text-left">
                  <th className="p-4 font-semibold text-primary-dark">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Name
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-dark">Contact</th>
                  <th className="p-4 font-semibold text-primary-dark">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Joined
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-dark">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Orders
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-dark">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Total Spent
                      <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="p-4 font-semibold text-primary-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr 
                    key={user._id} 
                    className={`border-t border-primary-light ${index % 2 === 0 ? 'bg-white' : 'bg-primary-light/30'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="p-4">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-primary-medium">{user._id}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gray-600 mb-1">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="p-4 text-primary-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 font-medium">{user.orders}</td>
                    <td className="p-4 font-medium">₹{user.totalSpent.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <motion.button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          onClick={() => handleUserSelect(user)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button 
                          className="p-2 text-primary hover:bg-primary-light rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          onClick={() => handleDeleteUser(user._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* User Details Modal */}
      {selectedUser && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedUser(null)}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-primary-light flex justify-between items-center">
              <h3 className="text-xl font-semibold text-primary-dark">User Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedUser(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6 text-center">
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary-dark">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="text-xl font-semibold">{selectedUser.name}</div>
                <div className="text-primary-medium">Customer since {new Date(selectedUser.createdAt).toLocaleDateString()}</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-medium mt-0.5" />
                  <div>
                    <div className="text-sm text-primary-medium">Email</div>
                    <div>{selectedUser.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-medium mt-0.5" />
                  <div>
                    <div className="text-sm text-primary-medium">Phone</div>
                    <div>{selectedUser.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-primary-medium mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-primary-medium">Address</div>
                    <div>{selectedUser.address}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-light rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-dark">{selectedUser.orders}</div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                
                <div className="bg-primary-light rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-dark">₹{selectedUser.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Edit User
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAddUserModal(false)}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-primary-light flex justify-between items-center">
              <h3 className="text-xl font-semibold text-primary-dark">Add New User</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddUserModal(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Name"
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Enter phone number"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <textarea 
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    placeholder="Enter full address"
                    value={newUser.address}
                    onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-lg transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
} 