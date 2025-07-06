import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { API_URL } from '../lib/config';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);
  const [couponError, setCouponError] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  
  // Sample coupon codes for demo
  const VALID_COUPONS = [
    { code: 'WELCOME10', discount: 0.1, minAmount: 500 },
    { code: 'JOUSHFOODS20', discount: 0.2, minAmount: 1000 },
    { code: 'FREESHIP', discount: 0.05, minAmount: 0 }
  ];
  
  // Calculate order summary
  const subtotal = state.total;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18;
  
  // Calculate discount if coupon is applied
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  
  // Calculate final total
  const total = subtotal + tax - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields: (keyof FormData)[] = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'pincode'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    // Card validation if payment method is card
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Please use MM/YY format';
      }
      
      if (!formData.cardCvv) {
        newErrors.cardCvv = 'CVV is required';
      } else if (!/^\d{3}$/.test(formData.cardCvv)) {
        newErrors.cardCvv = 'Please enter a valid 3-digit CVV';
      }
    }
    
    // UPI validation if payment method is UPI
    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(formData.upiId)) {
        newErrors.upiId = 'Please enter a valid UPI ID (e.g., name@upi)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle coupon application
  const handleApplyCoupon = () => {
    // Reset previous errors
    setCouponError('');
    
    // Validate coupon code is not empty
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    setApplyingCoupon(true);
    
    // Simulate API call to validate coupon
    setTimeout(() => {
      // Find matching coupon
      const coupon = VALID_COUPONS.find(c => c.code === couponCode.toUpperCase());
      
      if (!coupon) {
        setCouponError('Invalid coupon code');
        setApplyingCoupon(false);
        return;
      }
      
      // Check minimum amount requirement
      if (subtotal < coupon.minAmount) {
        setCouponError(`This coupon requires a minimum order of ₹${coupon.minAmount}`);
        setApplyingCoupon(false);
        return;
      }
      
      // Apply coupon
      setAppliedCoupon({
        code: coupon.code,
        discount: coupon.discount
      });
      
      // Show success message
      toast.success(`Coupon ${coupon.code} applied successfully!`);
      
      // Reset coupon input
      setCouponCode('');
      setApplyingCoupon(false);
    }, 1000);
  };
  
  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would send the order to your backend
      // For this demo, we'll simulate different payment processing based on method
      
      // Simulate payment processing
      let processingMessage = '';
      
      switch(formData.paymentMethod) {
        case 'card':
          processingMessage = 'Processing card payment...';
          toast.info(processingMessage);
          // In a real implementation, you would integrate with a payment gateway like Razorpay or Stripe
          // Example: await razorpay.processCardPayment(formData.cardNumber, formData.cardExpiry, formData.cardCvv, total);
          break;
          
        case 'upi':
          processingMessage = 'Initiating UPI payment...';
          toast.info(processingMessage);
          // In a real implementation, you would integrate with a UPI payment provider
          // Example: await razorpay.processUpiPayment(formData.upiId, total);
          break;
          
        case 'cod':
          processingMessage = 'Processing Cash on Delivery order...';
          toast.info(processingMessage);
          // No payment processing needed for COD
          break;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a random order ID
      const generatedOrderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedOrderId);
      
      // Clear the cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Show success message
      setOrderComplete(true);
      toast.success('Order placed successfully!');
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If order is complete, show the success page
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-2xl mx-auto bg-gradient-midnight-subtle rounded-2xl shadow-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-midnight-light rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-4">Order Confirmed!</h1>
          
          <p className="text-primary-medium mb-6">
            Thank you for your order. We've received your order and will begin processing it right away.
          </p>
          
          <div className="bg-gradient-midnight-subtle rounded-lg p-6 mb-6">
            <div className="text-left">
              <div className="mb-4">
                <span className="text-primary-medium text-sm">Order ID:</span>
                <p className="font-semibold text-primary">{orderId}</p>
              </div>
              
              <div className="mb-4">
                <span className="text-primary-medium text-sm">Order Date:</span>
                <p className="font-semibold text-primary">{new Date().toLocaleDateString()}</p>
              </div>
              
              <div>
                <span className="text-primary-medium text-sm">Total Amount:</span>
                <p className="font-semibold text-primary">₹{total.toFixed(2)}</p>
              </div>
              
              {appliedCoupon && (
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <span className="text-primary-medium text-sm">Coupon Applied:</span>
                  <p className="font-semibold text-primary">{appliedCoupon.code} ({appliedCoupon.discount * 100}% off)</p>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-primary-medium mb-8">
            You will receive an email confirmation shortly at <span className="font-semibold text-primary">{formData.email}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ color: 'var(--color-primary-light)' }}
            >
              Return to Home
            </Link>
            <button
              onClick={() => window.print()}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              Print Receipt
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/cart" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-primary">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-gradient-midnight-light rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-primary/20">
                <h2 className="text-xl font-semibold text-primary">Personal Information</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.firstName && <p className="text-primary text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                                          <label className="block text-primary font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.lastName && <p className="text-primary text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-primary font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.email && <p className="text-primary text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                                          <label className="block text-primary font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.phone && <p className="text-primary text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className="bg-gradient-midnight-light rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-primary">Shipping Information</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                                      <label className="block text-primary font-medium mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                                      {errors.address && <p className="text-primary text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-primary font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.city && <p className="text-primary text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                                          <label className="block text-primary font-medium mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.state && <p className="text-primary text-sm mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                                          <label className="block text-primary font-medium mb-2">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                                          {errors.pincode && <p className="text-primary text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-gradient-midnight-light rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-primary">Payment Method</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-primary-light rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                      className="h-5 w-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 flex items-center">
                      <CreditCard className="w-6 h-6 text-primary mr-2" />
                      <span className="font-medium">Credit / Debit Card</span>
                    </span>
                  </label>
                  
                  <label className="flex items-center p-4 border border-primary-light rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                      className="h-5 w-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 flex items-center">
                                              <svg className="w-6 h-6 text-primary mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L1.5 6V18L12 24L22.5 18V6L12 0Z" fill="#097939" />
                        <path d="M12.0002 0L1.5 6L12.0002 12L22.5 6L12.0002 0Z" fill="#ED752E" />
                        <path d="M1.5 18L12.0002 24V12L1.5 6V18Z" fill="#747474" />
                        <path d="M22.5 18L12 24V12L22.5 6V18Z" fill="#747474" />
                      </svg>
                      <span className="font-medium">UPI Payment</span>
                    </span>
                  </label>
                  
                  <label className="flex items-center p-4 border border-primary-light rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                      className="h-5 w-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 flex items-center">
                      <Truck className="w-6 h-6 text-primary mr-2" />
                      <span className="font-medium">Cash on Delivery</span>
                    </span>
                  </label>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-primary font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                                              {errors.cardNumber && <p className="text-primary text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-primary font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          className={`w-full border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                                                  {errors.cardExpiry && <p className="text-primary text-sm mt-1">{errors.cardExpiry}</p>}
                      </div>
                      
                      <div>
                                                  <label className="block text-primary font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          placeholder="123"
                          className={`w-full border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                                                    {errors.cardCvv && <p className="text-primary text-sm mt-1">{errors.cardCvv}</p>}
                      </div>
                    </div>
                    
                    <div className="text-xs text-primary-medium mt-2">
                      <p>This is a demo implementation. In a production environment, integrate with a secure payment gateway like Razorpay, Stripe, or PayU.</p>
                    </div>
                  </div>
                )}
                
                {formData.paymentMethod === 'upi' && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-primary font-medium mb-2">UPI ID</label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        placeholder="yourname@upi"
                        className={`w-full border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary`}
                      />
                      {errors.upiId && <p className="text-primary text-sm mt-1">{errors.upiId}</p>}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mt-4 justify-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-8" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Bhim_UPI_Logo.svg/1200px-Bhim_UPI_Logo.svg.png" alt="BHIM" className="h-8" />
                    </div>
                    
                    <div className="text-xs text-primary-medium mt-2">
                      <p>This is a demo implementation. In a production environment, integrate with UPI payment providers like Razorpay, PayU, or CCAvenue for secure transactions.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:hidden">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                style={{ color: 'var(--color-primary-light)' }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-midnight-light rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>
            
            {/* Coupon Code Section */}
            <div className="mb-6">
              <div className="bg-primary-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-primary mb-2">Apply Coupon</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-primary-light rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!!appliedCoupon || applyingCoupon}
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon}
                      className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {applyingCoupon ? 'Applying...' : 'Apply'}
                    </button>
                  )}
                </div>
                {couponError && <p className="text-primary text-xs mt-1">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center mt-2 text-primary text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Coupon {appliedCoupon.code} applied ({(appliedCoupon.discount * 100)}% off)
                  </div>
                )}
                <div className="mt-2 text-xs text-primary-medium">
                  <p>Try these codes: WELCOME10, JOUSHFOODS20, FREESHIP</p>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-primary-medium">
                <span>Subtotal ({state.items.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-primary-medium">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
              <div className="flex justify-between text-primary-medium">
                <span>Tax (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-primary">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold text-primary">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
                style={{ color: 'var(--color-primary-light)' }}
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
              
              <Link
                to="/cart"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 px-6 rounded-lg font-semibold transition-colors inline-block text-center"
                style={{ color: 'var(--color-primary)' }}
              >
                Back to Cart
              </Link>
            </div>
            
            {/* Order Items */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-primary mb-4">Items in Order</h3>
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-primary truncate">{item.name}</h4>
                      <p className="text-sm text-primary-medium">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Security Notice */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-2 text-sm text-primary-medium">
                <div className="flex-shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
                <p>
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
PAYMENT GATEWAY INTEGRATION GUIDE

For development purposes, here's how you can integrate popular payment gateways:

1. RAZORPAY INTEGRATION:
   
   a. Install the Razorpay SDK:
      npm install razorpay

   b. Create a Razorpay instance:
      const razorpay = new Razorpay({
        key_id: 'YOUR_KEY_ID',
        key_secret: 'YOUR_KEY_SECRET',
      });

   c. Create an order:
      const order = await razorpay.orders.create({
        amount: total * 100, // amount in paisa
        currency: 'INR',
        receipt: 'receipt_order_' + Date.now(),
        payment_capture: 1
      });

   d. Open the Razorpay payment form:
      const options = {
        key: 'YOUR_KEY_ID',
        amount: total * 100,
        currency: 'INR',
        name: 'Joushfoods',
        description: 'Food Order',
        order_id: order.id,
        handler: function(response) {
          // Handle successful payment
          // response.razorpay_payment_id
          // response.razorpay_order_id
          // response.razorpay_signature
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#f97316'
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

2. STRIPE INTEGRATION:

   a. Install the Stripe SDK:
      npm install @stripe/stripe-js

   b. Load Stripe:
      import { loadStripe } from '@stripe/stripe-js';
      const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

   c. Create a payment intent on your server:
      // Server-side code
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'inr',
      });

   d. Confirm the payment:
      // Client-side code
      const stripe = await stripePromise;
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          },
        },
      });

3. UPI INTEGRATION:

   Most payment gateways in India (Razorpay, PayU, CCAvenue) support UPI payments.
   You can use their SDKs to generate UPI payment links or QR codes.

   Example with Razorpay:
   
   a. Create a payment link:
      const paymentLink = await razorpay.paymentLink.create({
        amount: total * 100,
        currency: 'INR',
        accept_partial: false,
        description: 'Food Order',
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        notify: {
          sms: true,
          email: true
        },
        reminder_enable: true,
        notes: {
          address: formData.address
        },
        callback_url: 'https://yourwebsite.com/payment-callback',
        callback_method: 'get'
      });

   b. Redirect to the payment link:
      window.location.href = paymentLink.short_url;
*/