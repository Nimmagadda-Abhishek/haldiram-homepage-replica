import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Send, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const productLinks = [
    'Traditional Sweets',
    'Namkeen & Snacks',
    'Ready to Eat',
    'Beverages',
    'Frozen Foods',
    'Dry Fruits'
  ];

  const companyLinks = [
    'About Us',
    'Our Story',
    'Careers',
    'Press Release',
    'Awards',
    'Certifications'
  ];

  const supportLinks = [
    'Contact Us',
    'Customer Support',
    'Store Locator',
    'Franchise',
    'Bulk Orders',
    'Return Policy'
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-primary-dark font-bold text-lg">J</span>
              </div>
              <span className="text-white font-bold text-xl">JoushFoods</span>
            </div>
            <p className="text-white/80 mb-4 leading-relaxed">
              Bringing authentic Indian flavors to your doorstep. Traditional recipes, modern convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-white/80 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-white/80 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white/80 hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-white/80 hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <span className="text-white/80">+91-11-4715-4715</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80" />
                <span className="text-white/80">info@joushnafoods.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" />
                <span className="text-white/80">Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © 2024 JoushFoods. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/80 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/80 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
