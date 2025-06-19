
import React, { useState } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    'Indian Pickles',
    'Indian Snacks',
    'Sweets'
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b">
          <div className="text-sm text-gray-600">
            Call us: +91-11-4715-4715 | Email: info@joushnafoods.in
          </div>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-orange-600">joushnafoods.in</h1>
          </div>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
