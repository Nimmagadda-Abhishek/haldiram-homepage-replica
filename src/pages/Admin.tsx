import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Users, Settings, LogOut, ShoppingCart, Edit, Trash2, Plus, Layers, Tag } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';
import AdminProductOrganization from './AdminProductOrganization';
import AdminCoupons from './AdminCoupons';
import { menuItems } from '../lib/navlinks';
import { API_URL } from '../lib/config';

const defaultProduct = {
  name: '',
  description: '',
  image: '',
  price: '',
  category: 'SOUTH_INDIAN_SNACKS',
  veg: true,
};

const categories = [
  { value: 'SOUTH_INDIAN_SNACKS', label: 'South Indian Snacks' },
  { value: 'AUTHENTIC_SNACKS', label: 'Authentic Snacks' },
  { value: 'AUTHENTIC_PICKLES', label: 'Authentic Pickles' },
  { value: 'SWEETS_AND_HOTS', label: 'Sweets and Hots' },
  { value: 'DRY_FRUITS_AND_NUTS', label: 'Dry Fruits and Nuts' },
];

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(defaultProduct);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    if (token && page === 'products') fetchProducts();
  }, [token, page]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } else {
      const errorData = await res.json().catch(() => ({}));
      setError(errorData.error || 'Invalid credentials. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('Login failed. Please check your connection and try again.');
  }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_URL}/admin/products/${editingId}`
        : `${API_URL}/admin/products`;
        
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          veg: Boolean(form.veg),
        }),
      });
      
      if (res.ok) {
        setForm(defaultProduct);
        setEditingId(null);
        fetchProducts();
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || `Failed to ${editingId ? 'update' : 'create'} product. Please try again.`);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setForm({ 
      ...product, 
      price: product.price.toString(),
      // Ensure all required fields are present
      name: product.name || '',
      description: product.description || '',
      image: product.image || '',
      category: product.category || 'SOUTH_INDIAN_SNACKS',
      veg: typeof product.veg === 'boolean' ? product.veg : true
    });
    setEditingId(product.id || product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        fetchProducts();
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.error || 'Failed to delete product. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('An unexpected error occurred while deleting the product.');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-primary-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-primary-dark">Admin Panel</h2>
            <p className="text-primary-medium">Enter your credentials to access the admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-primary font-medium mb-2">Username</label>
              <input
                className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                name="username"
                placeholder="Enter your username"
                value={login.username}
                onChange={e => setLogin(l => ({ ...l, username: e.target.value }))}
                required
              />
            </div>
            
            <div>
                              <label className="block text-primary font-medium mb-2">Password</label>
              <input
                className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={login.password}
                onChange={e => setLogin(l => ({ ...l, password: e.target.value }))}
                required
              />
            </div>
            
            <motion.button 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold py-3 rounded-lg shadow-md transition-all"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
            
            {error && (
              <motion.div 
                className="text-primary text-center p-3 bg-gradient-midnight-light rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <motion.aside 
        className="w-72 bg-white shadow-xl flex flex-col p-6 border-r border-primary-light"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <h2 className="text-xl font-bold text-primary-dark">Joushfoods Admin</h2>
        </div>
        
        <nav className="flex-1">
                      <div className="text-xs font-semibold text-primary-medium mb-3 pl-3 uppercase tracking-wider">Main Menu</div>
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'dashboard' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('dashboard')}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'products' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('products')}
              >
                <Package className="w-5 h-5" />
                Products
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'organization' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('organization')}
              >
                <Layers className="w-5 h-5" />
                Product Organization
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'orders' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('orders')}
              >
                <ShoppingCart className="w-5 h-5" />
                Orders
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'coupons' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('coupons')}
              >
                <Tag className="w-5 h-5" />
                Coupons
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'users' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('users')}
              >
                <Users className="w-5 h-5" />
                Users
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg transition font-medium flex items-center gap-3 ${
                  page === 'settings' 
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-md' 
                    : 'hover:bg-primary/10 text-primary'
                }`}
                onClick={() => setPage('settings')}
              >
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        
        <motion.button
          className="mt-8 w-full bg-primary/10 text-primary py-3 rounded-lg hover:bg-primary/20 transition flex items-center justify-center gap-2 font-medium"
          onClick={() => { setToken(''); localStorage.removeItem('adminToken'); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
      </motion.aside>
      {/* Main Content */}
      <motion.main 
        className="flex-1 p-10 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {page === 'dashboard' && <AdminDashboard />}
        {page === 'organization' && <AdminProductOrganization categories={categories} />}
        {page === 'products' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Product Management</h2>
              <div className="text-sm text-primary-medium">Total Products: {products.length}</div>
            </div>
            
            <motion.div 
              className="mb-10 bg-white border border-primary-light p-8 rounded-2xl shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-primary-dark flex items-center gap-2">
                {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-primary font-medium mb-2">Product Name</label>
                    <input 
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      name="name" 
                      placeholder="Enter product name" 
                      value={form.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-primary font-medium mb-2">Image URL</label>
                    <input 
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      name="image" 
                      placeholder="Enter image URL" 
                      value={form.image} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-primary font-medium mb-2">Description</label>
                  <textarea 
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    name="description" 
                    placeholder="Enter product description" 
                    value={form.description} 
                    onChange={handleChange} 
                    rows={3}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-primary font-medium mb-2">Price (₹)</label>
                    <input 
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      name="price" 
                      type="number" 
                      placeholder="Enter price" 
                      value={form.price} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-primary font-medium mb-2">Category</label>
                    <select 
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                      name="category" 
                      value={form.category} 
                      onChange={handleChange} 
                      required
                    >
                      {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <label className="flex items-center p-3 border border-primary-light rounded-lg w-full">
                      <input 
                        type="checkbox" 
                        name="veg" 
                        checked={form.veg} 
                        onChange={handleChange}
                        className="mr-3 h-5 w-5 text-primary focus:ring-primary" 
                      />
                      <span className="font-medium">Vegetarian Product</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4">
                  <motion.button 
                    className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md flex items-center gap-2 ${
                      editingId 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                        : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
                    }`}
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingId ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingId ? 'Update Product' : 'Add Product'}
                  </motion.button>
                  
                  {editingId && (
                    <motion.button 
                      type="button" 
                      className="px-6 py-3 rounded-lg font-semibold text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                      onClick={() => { setForm(defaultProduct); setEditingId(null); }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
                
                {error && (
                  <motion.div 
                    className="text-primary p-3 bg-gradient-midnight-light rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>
            
            <motion.div
              className="bg-white border border-primary-light rounded-2xl shadow-lg overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6 border-b border-primary-light">
                <h3 className="text-xl font-semibold text-primary-dark">Product List</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary-light text-left">
                      <th className="p-4 font-semibold text-primary-dark">Product</th>
                      <th className="p-4 font-semibold text-primary-dark">Category</th>
                      <th className="p-4 font-semibold text-primary-dark">Price</th>
                      <th className="p-4 font-semibold text-primary-dark">Type</th>
                      <th className="p-4 font-semibold text-primary-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-primary-medium">No products found. Add your first product above.</td>
                      </tr>
                    ) : (
                      products.map((p, index) => (
                        <motion.tr 
                          key={p.id || p._id} 
                          className={`border-t border-primary-light ${index % 2 === 0 ? 'bg-white' : 'bg-primary-light/30'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                className="w-12 h-12 object-cover rounded-lg border border-primary-light"
                                onError={(e) => { e.currentTarget.src = "https://www.joushfoods.com/images/products/default-product.png"; }}
                              />
                              <div>
                                                      <div className="font-medium text-primary">{p.name}</div>
                      <div className="text-xs text-primary-medium truncate max-w-xs">{p.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-xs font-medium">
                              {categories.find(c => c.value === p.category)?.label || p.category}
                            </span>
                          </td>
                          <td className="p-4 font-medium">₹{p.price}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.veg ? 'bg-primary/20 text-primary' : 'bg-primary/20 text-primary'}`}>
                              {p.veg ? 'Vegetarian' : 'Non-Veg'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <motion.button 
                                className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                onClick={() => handleEdit(p)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button 
                                className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                                onClick={() => handleDelete(p.id || p._id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
        {page === 'orders' && <AdminOrders />}
        {page === 'coupons' && <AdminCoupons />}
        {page === 'users' && <AdminUsers />}
        {page === 'settings' && <AdminSettings />}
      </motion.main>
    </div>
  );
} 