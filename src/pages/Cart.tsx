import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-midnight-light">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-2 sm:mb-4">Your cart is empty</h1>
          <p className="text-sm sm:text-base text-primary-medium mb-6 sm:mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link
            to="/products"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-flex items-center gap-2"
            style={{ color: 'var(--color-primary-light)' }}
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-midnight-light">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-sm sm:text-base text-primary-medium">
            {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="card-midnight rounded-lg shadow-md overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-primary/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold text-primary">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="divide-y divide-primary/20">
                {state.items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:space-x-4">
                      {/* Product Image and Details - Mobile: stacked, Desktop: side by side */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-primary mb-1">
                            {item.name}
                          </h3>
                          <p className="text-primary-medium text-xs sm:text-sm">
                            ₹{item.price} per item
                          </p>
                        </div>
                      </div>

                      {/* Controls and Price - Mobile: row with space between */}
                      <div className="flex items-center justify-between sm:justify-end sm:flex-1 sm:space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                          </button>
                          <span className="w-8 sm:w-12 text-center text-sm sm:text-base font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 border border-primary/30 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-base sm:text-lg font-semibold text-primary">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-midnight rounded-lg shadow-md p-4 sm:p-6 sticky top-4 sm:top-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base text-primary-medium">
                  <span>Subtotal ({state.items.length} items)</span>
                  <span>₹{state.total}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-primary-medium">
                  <span>Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-primary-medium">
                  <span>Tax</span>
                  <span>₹{(state.total * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t border-primary/20 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-semibold text-primary">
                    <span>Total</span>
                    <span>₹{(state.total + state.total * 0.18).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary-midnight py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-block text-center"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/products"
                  className="w-full btn-outline-midnight py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-block text-center"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary/20">
                <div className="text-xs sm:text-sm text-primary-medium space-y-1.5 sm:space-y-2">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-1.5 sm:mr-2"></span>
                    Free shipping on orders above ₹500
                  </span>
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-1.5 sm:mr-2"></span>
                    Secure payment options
                  </span>
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mr-1.5 sm:mr-2"></span>
                    Easy returns & exchanges
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}