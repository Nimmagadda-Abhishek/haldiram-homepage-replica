import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../lib/navlinks';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <header className="bg-white shadow-primary border-b border-primary-light sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="text-primary-dark font-bold text-xl">JoushFoods</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-primary-medium hover:text-primary-dark font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Cart and Account */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-primary-medium hover:text-primary-dark hover:bg-primary-light rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {customer ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-primary-medium hover:text-primary-dark hover:bg-primary-light p-2 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block font-medium">{customer.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-primary-light rounded-lg shadow-primary-lg py-2">
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-primary-dark hover:bg-primary-light transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-primary-dark hover:bg-primary-light transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary-midnight px-4 py-2 rounded-lg font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary-medium hover:text-primary-dark hover:bg-primary-light rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-primary-light py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary-medium hover:text-primary-dark font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
