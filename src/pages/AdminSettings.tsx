import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Lock, Globe, Bell, Shield, Save, RefreshCw, CheckCircle } from 'lucide-react';
import { API_URL } from '../lib/config';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    username: 'admin',
    email: 'admin@haldiram.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Site settings
  const [siteSettings, setSettingsSite] = useState({
    siteName: 'Haldiram\'s Online Store',
    siteDescription: 'Authentic Indian sweets, snacks and more',
    currency: 'INR',
    taxRate: '18',
    enableRegistration: true,
    maintenanceMode: false
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    userRegistrations: true,
    lowStockAlerts: true,
    emailNotifications: true,
    smsNotifications: false
  });
  
  // Handle account settings change
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountSettings({
      ...accountSettings,
      [name]: value
    });
  };
  
  // Handle site settings change
  const handleSiteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsSite({
      ...siteSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle notification settings change
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, make API call to save settings
    console.log('Saving settings:', {
      account: accountSettings,
      site: siteSettings,
      notifications: notificationSettings
    });
    
    setLoading(false);
    setSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-primary-light overflow-hidden mb-8">
        <div className="flex border-b border-primary-light">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'general'
                ? 'text-primary-dark border-b-2 border-primary'
                : 'text-primary-medium hover:text-primary-dark'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'notifications'
                ? 'text-primary-dark border-b-2 border-primary'
                : 'text-primary-medium hover:text-primary-dark'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'text-primary-dark border-b-2 border-primary'
                : 'text-primary-medium hover:text-primary-dark'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'integrations'
                ? 'text-primary-dark border-b-2 border-primary'
                : 'text-primary-medium hover:text-primary-dark'
            }`}
          >
            Integrations
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    value={accountSettings.username}
                    onChange={handleAccountChange}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    value={accountSettings.email}
                    onChange={handleAccountChange}
                  />
                </div>
                
                <div className="border-t border-primary-light pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Change Password</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword"
                        className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                        value={accountSettings.currentPassword}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword"
                        className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                        value={accountSettings.newPassword}
                        onChange={handleAccountChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                        value={accountSettings.confirmPassword}
                        onChange={handleAccountChange}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Site Settings */}
            {activeTab === 'site' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Site Settings</h3>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Site Name</label>
                  <input 
                    type="text" 
                    name="siteName"
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    value={siteSettings.siteName}
                    onChange={handleSiteChange}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Site Description</label>
                  <textarea 
                    name="siteDescription"
                    className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    value={siteSettings.siteDescription}
                    onChange={handleSiteChange}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Currency</label>
                    <select 
                      name="currency"
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                      value={siteSettings.currency}
                      onChange={handleSiteChange}
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Tax Rate (%)</label>
                    <input 
                      type="number" 
                      name="taxRate"
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                      value={siteSettings.taxRate}
                      onChange={handleSiteChange}
                    />
                  </div>
                </div>
                
                <div className="border-t border-primary-light pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Site Options</h4>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="enableRegistration"
                        className="h-5 w-5 text-primary focus:ring-primary rounded" 
                        checked={siteSettings.enableRegistration}
                        onChange={handleSiteChange}
                      />
                      <span className="ml-3 text-gray-700">Enable user registration</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="maintenanceMode"
                        className="h-5 w-5 text-primary focus:ring-primary rounded" 
                        checked={siteSettings.maintenanceMode}
                        onChange={handleSiteChange}
                      />
                      <span className="ml-3 text-gray-700">Enable maintenance mode</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="orderNotifications"
                      className="h-5 w-5 text-primary focus:ring-primary rounded" 
                      checked={notificationSettings.orderNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="ml-3 text-gray-700">New order notifications</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="userRegistrations"
                      className="h-5 w-5 text-primary focus:ring-primary rounded" 
                      checked={notificationSettings.userRegistrations}
                      onChange={handleNotificationChange}
                    />
                    <span className="ml-3 text-gray-700">User registration notifications</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="lowStockAlerts"
                      className="h-5 w-5 text-primary focus:ring-primary rounded" 
                      checked={notificationSettings.lowStockAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="ml-3 text-gray-700">Low stock alerts</span>
                  </label>
                </div>
                
                <div className="border-t border-primary-light pt-6">
                  <h4 className="font-medium text-gray-800 mb-4">Notification Channels</h4>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="emailNotifications"
                        className="h-5 w-5 text-primary focus:ring-primary rounded" 
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span className="ml-3 text-gray-700">Email notifications</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="smsNotifications"
                        className="h-5 w-5 text-primary focus:ring-primary rounded" 
                        checked={notificationSettings.smsNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span className="ml-3 text-gray-700">SMS notifications</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h3>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                  <p className="text-primary">
                    Security settings are currently under development. Check back soon for updates.
                  </p>
                </div>
                
                <div className="opacity-50 pointer-events-none">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Two-Factor Authentication</label>
                    <div className="flex items-center">
                      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-4">
                        Enable 2FA
                      </button>
                      <span className="text-gray-500">Not configured</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Session Timeout (minutes)</label>
                    <input 
                      type="number" 
                      className="w-full border border-primary-light p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                      value="30"
                      disabled
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="bg-primary-light px-6 py-4 flex justify-between items-center border-t border-primary-light">
            {success && (
              <div className="text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Settings saved successfully!
              </div>
            )}
            
            <div className="ml-auto">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-md transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
} 