
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductCategories from '../components/ProductCategories';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSection from '../components/AboutSection';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <AboutSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
