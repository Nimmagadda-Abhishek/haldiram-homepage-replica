import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true 
}) => {
  useEffect(() => {
    // Show a subtle toast when the layout loads (only in development)
    if (process.env.NODE_ENV === 'development') {
      toast.success('Enhanced header loaded! 🎉', {
        duration: 2000,
        position: 'top-right',
      });
    }
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showHeader && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <Header />
        </motion.div>
      )}
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4 md:py-6">
        {children}
      </main>
      {showFooter && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full"
        >
          <Footer />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Layout; 