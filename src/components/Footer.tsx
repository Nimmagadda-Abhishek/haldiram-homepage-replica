import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
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

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-orange-500 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Our Latest Offers
            </h3>
            <p className="text-orange-100 mb-6">
              Subscribe to our newsletter and be the first to know about new products and exclusive deals
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button className="bg-white text-orange-500 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-6">joushnafoods.in</h3>
              <p className="text-gray-300 mb-6">
                Since 1937, we have been serving authentic Indian taste with uncompromising quality. 
                From traditional sweets to modern snacks, we bring you the best of Indian cuisine.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
                <Youtube className="w-6 h-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Products</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support & Contact</h4>
              <ul className="space-y-3 mb-6">
                {supportLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-orange-500" />
                  +91-11-4715-4715
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-orange-500" />
                  info@joushnafoods.in
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-orange-500 mt-1" />
                  joushnafoods.in Limited, Bikaner, Rajasthan, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 joushnafoods.in. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
