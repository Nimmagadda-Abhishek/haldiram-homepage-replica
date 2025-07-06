import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Shield, Heart, Utensils, Star, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-midnight-subtle overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gradient-midnight mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover the{' '}
              <span className="text-gradient-midnight">Authentic</span>{' '}
              Taste of India
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-primary-medium mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience the rich flavors and traditional recipes that have been passed down through generations. 
              From aromatic spices to fresh ingredients, every dish tells a story of India&apos;s culinary heritage.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/products"
                className="btn-primary-midnight px-8 py-4 rounded-lg font-semibold text-lg shadow-primary hover:shadow-primary-lg transition-all transform hover:scale-105"
              >
                Explore Products
              </Link>
              <Link
                to="/about"
                className="btn-outline-midnight px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-midnight-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gradient-midnight mb-1">Fast Delivery</h3>
                <p className="text-sm text-primary-medium">Same day delivery</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-midnight-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gradient-midnight mb-1">Quality Assured</h3>
                <p className="text-sm text-primary-medium">100% authentic</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-midnight-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gradient-midnight mb-1">Made with Love</h3>
                <p className="text-sm text-primary-medium">Traditional recipes</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://www.happywedding.app/blog/wp-content/uploads/2020/08/3-Gulab-Jamun.jpg"
                  alt="Authentic Indian Cuisine - Traditional spices and ingredients"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop&crop=center";
                  }}
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-primary/10 p-4 rounded-lg shadow-primary"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-4 bg-primary/10 p-4 rounded-lg shadow-primary"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
