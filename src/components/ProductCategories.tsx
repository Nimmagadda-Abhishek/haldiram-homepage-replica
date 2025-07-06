import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const ProductCategories = () => {
  const fallbackCategoryImage = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop';

  const categories = [
    {
      name: 'South Indian Snacks',
      image: 'https://i.pinimg.com/originals/b4/31/e0/b431e054a2ab4100bc04bc93f194258f.jpg',
      description: 'Authentic South Indian snacks and namkeen',
      category: 'SOUTH_INDIAN_SNACKS',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    },
    {
      name: 'Authentic Snacks',
      image: 'https://fmtmagazine.in/wp-content/uploads/2022/10/D1_Rising-Popularity-Emerging-Trends-in-Processed-Indian-Traditional-Snacks.jpg',
      description: 'Traditional Indian snacks and savories',
      category: 'AUTHENTIC_SNACKS',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    },
    {
      name: 'Authentic Pickles',
      image: 'https://i.pinimg.com/originals/46/d1/3e/46d13e8aebf8839faec85861bc90ca62.jpg',
      description: 'Homemade pickles with traditional recipes',
      category: 'AUTHENTIC_PICKLES',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    },
    {
      name: 'Sweets and Hots',
      image: 'https://i.pinimg.com/originals/e1/26/6b/e1266b060aaa3be350478fcb360d2549.jpg',
      description: 'Traditional sweets and spicy treats',
      category: 'SWEETS_AND_HOTS',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    },
    {
      name: 'Dry Fruits and Nuts',
      image: 'https://healthybuddha.in/image/catalog/Recentblogs/blogs/dryfruitsandnuts.jpg',
      description: 'Premium quality nuts and dry fruits',
      category: 'DRY_FRUITS_AND_NUTS',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    },
    {
      name: 'All Products',
      image: 'https://thumbs.dreamstime.com/b/dry-fruits-sweets-indian-traditional-dry-fruit-sweet-food-isolated-white-background-105492430.jpg',
      description: 'Browse our complete collection',
      category: '',
      color: 'from-[rgb(25,25,112)] to-[rgba(25,25,112,0.8)]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-midnight-light px-4 py-2 rounded-full mb-4 shadow-md">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-gradient-midnight font-medium">Shop by Category</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 sm:mb-6">
            Explore Our Delicious Range
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-medium max-w-3xl mx-auto leading-relaxed px-2">
            Explore our diverse collection of authentic Indian delicacies, from traditional sweets to savory snacks.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(25, 25, 112, 0.15)' }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={category.category ? `/products?category=${category.category}` : '/products'}
                className="block group"
              >
                <div className="card-midnight rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={category.image || fallbackCategoryImage}
                      onError={e => { e.currentTarget.src = fallbackCategoryImage; }}
                      alt={category.name}
                      className="w-full h-44 sm:h-48 md:h-56 object-cover rounded-t-3xl"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary-dark shadow-lg drop-shadow-md`}> 
                        {category.name.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 relative">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-dark mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300 drop-shadow-md">
                      {category.name}
                    </h3>
                    <p className="text-primary mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base drop-shadow-sm">
                      {category.description}
                    </p>
                    <motion.div 
                      className="flex items-center justify-between"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-primary-dark hover:text-primary font-semibold transition-colors text-sm sm:text-base drop-shadow-md">
                        Explore Category
                      </span>
                      <motion.div
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary-dark drop-shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
