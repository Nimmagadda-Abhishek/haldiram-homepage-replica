
import React from 'react';
import { Building, Wrench, Zap, Shield, Truck, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Commercial Construction',
      description: 'Modern office buildings, shopping complexes, and commercial spaces designed for efficiency and aesthetics.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
    },
    {
      icon: Wrench,
      title: 'Industrial Projects',
      description: 'Heavy-duty industrial facilities, warehouses, and manufacturing plants built to last.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop'
    },
    {
      icon: Zap,
      title: 'Infrastructure Development',
      description: 'Roads, bridges, and public infrastructure projects that connect communities.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop'
    },
    {
      icon: Shield,
      title: 'Project Management',
      description: 'End-to-end project management ensuring timely delivery and quality assurance.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop'
    },
    {
      icon: Truck,
      title: 'Equipment & Logistics',
      description: 'State-of-the-art construction equipment and efficient logistics management.',
      image: 'https://images.unsplash.com/photo-1581093458791-9d42e72b2085?w=400&h=250&fit=crop'
    },
    {
      icon: Users,
      title: 'Consulting Services',
      description: 'Expert consulting for design, engineering, and construction optimization.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction and engineering solutions for all your mega structure needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-blue-600 p-3 rounded-full">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
