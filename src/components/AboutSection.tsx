import React from 'react';
import { motion } from 'framer-motion';
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
    <section className="py-12 sm:py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Legacy of Taste & Tradition
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-primary-medium mb-4 sm:mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Since 1937, joushnafoods.in has been synonymous with authentic Indian taste and uncompromising quality. 
              What started as a small shop in Bikaner has grown into one of India's most trusted food brands, 
              serving millions of customers worldwide.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg text-primary-medium mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              We take pride in preserving traditional recipes while embracing modern technology to ensure 
              hygiene, freshness, and consistency in every product we make.
            </motion.p>
            <motion.button 
              className="btn-primary-midnight px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(25, 25, 112, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop"
              alt="Traditional Indian sweets"
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-primary"
              onError={e => { e.currentTarget.src = 'https://www.joushfoods.com/images/about/default-about.png'; }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="bg-primary/10 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center shadow-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-midnight mb-1 sm:mb-2">{stat.number}</h3>
              <p className="text-primary-medium font-medium text-sm sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
