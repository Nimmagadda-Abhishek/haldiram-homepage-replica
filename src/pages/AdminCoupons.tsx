import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Tag, Calendar, Percent, DollarSign, Check, X } from 'lucide-react';
import { API_URL } from '../lib/config';

interface Coupon {
  _id?: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

const defaultCoupon: Coupon = {
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: 10,
  minOrderValue: 0,
  maxDiscount: 0,
  validFrom: new Date().toISOString().split('T')[0],
  validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
  isActive: true
};

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState<Coupon>(defaultCoupon);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken') || '';

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    
    // Use mock data for demonstration since the API is not working
    console.log('Using mock data for coupon management demonstration');
    
    const mockCoupons = [
      {
        _id: '1',
        code: 'WELCOME20',
        description: '20% off your first order',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 500,
        maxDiscount: 200,
        validFrom: new Date('2023-01-01'),
        validUntil: new Date('2024-12-31'),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        code: 'SUMMER100',
        description: '₹100 off on summer products',
        discountType: 'fixed',
        discountValue: 100,
        minOrderValue: 1000,
        maxDiscount: 0,
        validFrom: new Date('2023-05-01'),
        validUntil: new Date('2023-08-31'),
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        code: 'FREESHIP',
        description: 'Free shipping on all orders',
        discountType: 'fixed',
        discountValue: 50,
        minOrderValue: 1500,
        maxDiscount: 0,
        validFrom: new Date('2023-06-01'),
        validUntil: new Date('2023-12-31'),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    setCoupons(mockCoupons);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setForm(prev => ({ ...prev, [name]: target.checked }));
    } else if (name === 'discountValue' || name === 'minOrderValue' || name === 'maxDiscount') {
      setForm(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Mock implementation for demonstration
      console.log('Using mock implementation for coupon management demonstration');
      
      if (editingId) {
        // Update existing coupon in the mock data
        setCoupons(prevCoupons => 
          prevCoupons.map(c => 
            c._id === editingId 
              ? { ...form, _id: editingId, updatedAt: new Date() } 
              : c
          )
        );
      } else {
        // Add new coupon to the mock data
        const newCoupon = {
          ...form,
          _id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
      }
      
      setSuccess(`Coupon ${editingId ? 'updated' : 'created'} successfully! (Demo Mode)`);
      setForm(defaultCoupon);
      setEditingId(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving coupon:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleEdit = (coupon: Coupon) => {
    // Format dates for the date input
    const formattedCoupon = {
      ...coupon,
      validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
      validUntil: new Date(coupon.validUntil).toISOString().split('T')[0]
    };
    
    setForm(formattedCoupon);
    setEditingId(coupon._id || null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    
    try {
      // Mock implementation for demonstration
      console.log('Using mock implementation for coupon management demonstration');
      
      // Simulate successful deletion
      setCoupons(prevCoupons => prevCoupons.filter(c => c._id !== id));
      setSuccess('Coupon deleted successfully! (Demo Mode)');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting coupon:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const toggleCouponStatus = async (id: string, currentStatus: boolean) => {
    try {
      // Mock implementation for demonstration
      console.log('Using mock implementation for coupon management demonstration');
      
      // Simulate successful status toggle
      setCoupons(prevCoupons => 
        prevCoupons.map(c => 
          c._id === id 
            ? { ...c, isActive: !currentStatus, updatedAt: new Date() } 
            : c
        )
      );
      setSuccess(`Coupon ${currentStatus ? 'deactivated' : 'activated'} successfully! (Demo Mode)`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating coupon status:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Coupon Management</h2>
        <div className="text-sm text-gray-500">Total Coupons: {coupons.length}</div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-700">Demo Mode</h3>
            <div className="text-sm text-blue-600">
              This coupon management system is running in demo mode. All changes are stored in memory and will be reset when you refresh the page.
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="mb-10 bg-white border border-primary-light p-8 rounded-2xl shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-primary-dark flex items-center gap-2">
          {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {editingId ? 'Edit Coupon' : 'Add New Coupon'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Coupon Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  className="w-full border border-primary-light pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all uppercase" 
                  name="code" 
                  placeholder="e.g. SUMMER20" 
                  value={form.code} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Discount Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {form.discountType === 'percentage' ? (
                    <Percent className="h-5 w-5 text-gray-400" />
                  ) : (
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <select 
                  className="w-full border border-primary-light pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  name="discountType" 
                  value={form.discountType} 
                  onChange={handleChange} 
                  required
                >
                  <option value="percentage">Percentage Discount</option>
                  <option value="fixed">Fixed Amount Discount</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea 
              className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              name="description" 
              placeholder="Enter coupon description" 
              value={form.description} 
              onChange={handleChange} 
              rows={2}
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {form.discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount (₹)'}
              </label>
              <input 
                className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                name="discountValue" 
                type="number" 
                min={0}
                max={form.discountType === 'percentage' ? 100 : undefined}
                placeholder={form.discountType === 'percentage' ? 'e.g. 20' : 'e.g. 100'} 
                value={form.discountValue} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Minimum Order Value (₹)</label>
              <input 
                className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                name="minOrderValue" 
                type="number" 
                min={0}
                placeholder="e.g. 500" 
                value={form.minOrderValue} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            {form.discountType === 'percentage' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Maximum Discount (₹)</label>
                <input 
                  className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  name="maxDiscount" 
                  type="number" 
                  min={0}
                  placeholder="e.g. 200" 
                  value={form.maxDiscount} 
                  onChange={handleChange} 
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Valid From</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  className="w-full border border-primary-light pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  name="validFrom" 
                  type="date" 
                  value={form.validFrom} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Valid Until</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  className="w-full border border-primary-light pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  name="validUntil" 
                  type="date" 
                  value={form.validUntil} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <label className="flex items-center p-3 border border-primary-light rounded-lg w-full">
                <input 
                  type="checkbox" 
                  name="isActive" 
                  checked={form.isActive} 
                  onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="mr-3 h-5 w-5 text-primary focus:ring-primary" 
                />
                <span className="font-medium">Active Coupon</span>
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
              {editingId ? 'Update Coupon' : 'Add Coupon'}
            </motion.button>
            
            {editingId && (
              <motion.button 
                type="button" 
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => { setForm(defaultCoupon); setEditingId(null); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            )}
          </div>
          
          {error && (
            <motion.div 
              className="text-red-600 p-3 bg-red-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              className="text-green-600 p-3 bg-green-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
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
          <h3 className="text-xl font-semibold text-primary-dark">Coupon List</h3>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading coupons...</p>
            </div>
          ) : coupons.length === 0 ? (
            <div className="p-8 text-center text-primary-medium">
              No coupons found. Add your first coupon above.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-primary-50 text-left">
                  <th className="p-4 font-semibold text-primary-800">Code</th>
                  <th className="p-4 font-semibold text-primary-800">Discount</th>
                  <th className="p-4 font-semibold text-primary-800">Min. Order</th>
                  <th className="p-4 font-semibold text-primary-800">Validity</th>
                  <th className="p-4 font-semibold text-primary-800">Status</th>
                  <th className="p-4 font-semibold text-primary-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => (
                  <motion.tr 
                    key={coupon._id} 
                    className={`border-t border-primary-100 ${index % 2 === 0 ? 'bg-white' : 'bg-primary-50/30'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{coupon.code}</span>
                        <span className="text-xs text-primary-medium">{coupon.description}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {coupon.discountType === 'percentage' ? (
                        <div>
                          <span className="font-medium text-gray-800">{coupon.discountValue}%</span>
                          {coupon.maxDiscount > 0 && (
                            <span className="text-xs text-primary-medium block">Max: ₹{coupon.maxDiscount}</span>
                          )}
                        </div>
                      ) : (
                        <span className="font-medium text-gray-800">₹{coupon.discountValue}</span>
                      )}
                    </td>
                    <td className="p-4 font-medium">
                      {coupon.minOrderValue > 0 ? `₹${coupon.minOrderValue}` : 'None'}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{formatDate(coupon.validFrom)}</div>
                        <div className="text-gray-500">to</div>
                        <div>{formatDate(coupon.validUntil)}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          coupon.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <motion.button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          onClick={() => handleEdit(coupon)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button 
                          className={`p-2 ${coupon.isActive ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'} rounded-full transition-colors`}
                          onClick={() => toggleCouponStatus(coupon._id || '', coupon.isActive)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title={coupon.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {coupon.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </motion.button>
                        <motion.button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          onClick={() => handleDelete(coupon._id || '')}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}