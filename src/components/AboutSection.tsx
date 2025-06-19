
import React from 'react';
import { Award, Users, Clock, Target, Shield, Zap } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    {
      icon: Clock,
      number: '15+',
      label: 'Years of Excellence'
    },
    {
      icon: Target,
      number: '500+',
      label: 'Projects Completed'
    },
    {
      icon: Users,
      number: '200+',
      label: 'Expert Team'
    },
    {
      icon: Award,
      number: '25+',
      label: 'Industry Awards'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Uncompromising commitment to quality in every project we undertake.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology and innovative construction methods.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Highly skilled professionals with decades of combined experience.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Building Excellence Since 2010
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              UdayMegaStructuresLLP has established itself as a premier construction company in India, 
              specializing in mega structures, commercial buildings, and infrastructure development. 
              Our commitment to excellence and innovation has made us a trusted partner for clients 
              across various sectors.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We combine traditional construction expertise with modern technology to deliver 
              projects that stand the test of time. Our team of experienced engineers, architects, 
              and project managers ensures every project meets the highest standards of quality and safety.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-600 p-3 rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Learn More About Us
            </button>
          </div>
          
          <div>
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop"
              alt="Construction team at work"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <stat.icon className="w-8 h-8 text-blue-600" />
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
