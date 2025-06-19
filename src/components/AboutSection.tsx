
import React from 'react';
import { Award, Users, Clock, Globe } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    {
      icon: Clock,
      number: '85+',
      label: 'Years of Excellence'
    },
    {
      icon: Globe,
      number: '1000+',
      label: 'Stores Worldwide'
    },
    {
      icon: Users,
      number: '10M+',
      label: 'Happy Customers'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Awards Won'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Our Legacy of Taste & Tradition
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Since 1937, Haldiram's has been synonymous with authentic Indian taste and uncompromising quality. 
              What started as a small shop in Bikaner has grown into one of India's most trusted food brands, 
              serving millions of customers worldwide.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We take pride in preserving traditional recipes while embracing modern technology to ensure 
              hygiene, freshness, and consistency in every product we make.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Learn More About Us
            </button>
          </div>
          
          <div>
            <img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop"
              alt="Traditional Indian sweets"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <stat.icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
