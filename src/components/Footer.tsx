
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Building } from 'lucide-react';

const Footer = () => {
  const serviceLinks = [
    'Commercial Construction',
    'Industrial Projects',
    'Infrastructure Development',
    'Project Management',
    'Equipment & Logistics',
    'Consulting Services'
  ];

  const companyLinks = [
    'About Us',
    'Our Team',
    'Careers',
    'Projects',
    'Awards',
    'Certifications'
  ];

  const supportLinks = [
    'Contact Us',
    'Client Support',
    'Project Inquiry',
    'Get Quote',
    'Safety Guidelines',
    'Quality Standards'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Our Latest Projects
            </h3>
            <p className="text-blue-100 mb-6">
              Subscribe to our newsletter for project updates, industry insights, and company news
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
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
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold">UdayMegaStructuresLLP</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Building excellence since 2010. We are a premier construction company specializing 
                in mega structures, commercial buildings, and infrastructure development across India.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link}>
                    <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
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
                    <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
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
                    <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  +91-98765-43210
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  info@udaymegastructuresllp.com
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-blue-600 mt-1" />
                  Plot No. 123, Industrial Area, Sector 45, Gurgaon, Haryana - 122003
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
              © 2024 UdayMegaStructuresLLP. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Safety Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
