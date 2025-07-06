import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Utensils, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../lib/config';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  veg: boolean;
  rating: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { dispatch } = useCart();

  const fallbackProductImage = 'https://thumbs.dreamstime.com/b/dry-fruits-sweets-indian-traditional-dry-fruit-sweet-food-isolated-white-background-105492430.jpg';

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/featured`);
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const featured = await response.json();
      // Defensive: ensure featured is always an array
      setProducts(Array.isArray(featured) ? featured : []);
      return;
    } catch (error) {
      console.error('Error fetching products from API, using static data:', error);
      // Use static data as fallback
      setProducts([
        {
          id: 1,
          name: 'Rasgulla',
          description: 'Traditional Bengali sweet made with cottage cheese',
          image: 'https://recipes.net/wp-content/uploads/2022/07/rasgulla.jpg',
          price: 149,
          category: 'SWEETS_AND_HOTS',
          veg: true,
          rating: 4.5
        },
        {
          id: 2,
          name: 'Aloo Bhujia',
          description: 'Crispy potato snack with authentic spices',
          image: 'https://5.imimg.com/data5/UR/OO/QL/ANDROID-84823547/1555336769409-jpg-500x500.jpg',
          price: 89,
          category: 'AUTHENTIC_SNACKS',
          veg: true,
          rating: 4.0
        },
        {
          id: 3,
          name: 'Mixed Pickles',
          description: 'Assorted vegetables in traditional spices',
          image: 'https://www.yummyfoodrecipes.in/resources/picture/org/Mixed-Vegetable-Pickle.jpg',
          price: 199,
          category: 'AUTHENTIC_PICKLES',
          veg: true,
          rating: 4.2
        },
        {
          id: 4,
          name: 'Badam Milk',
          description: 'Rich almond milk with saffron',
          image: 'https://www.funfoodfrolic.com/wp-content/uploads/2021/11/Blog-Thumbnail.jpg',
          price: 79,
          category: 'SWEETS_AND_HOTS',
          veg: true,
          rating: 4.8
        },
        {
          id: 5,
          name: 'Samosa',
          description: 'Crispy pastry filled with spiced potatoes',
          image: 'https://hindi.cdn.zeenews.com/hindi/sites/default/files/2021/10/01/935611-samosa-recipe.jpg',
          price: 119,
          category: 'AUTHENTIC_SNACKS',
          veg: true,
          rating: 4.3
        },
        {
          id: 6,
          name: 'Mixed Nuts',
          description: 'Premium quality assorted nuts',
          image: 'https://img.lazcdn.com/g/ff/kf/Sc0c4556c9794435cbf328565776652164.jpg_720x720q80.jpg',
          price: 299,
          category: 'DRY_FRUITS_AND_NUTS',
          veg: true,
          rating: 4.7
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });
  };

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

  if (loading) {
    return (
      <section className="py-20 bg-primary/2">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-primary-dark mb-6 drop-shadow-xl">
              Featured Products
            </h2>
            <p className="text-xl text-primary-dark max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Handpicked bestsellers that our customers love the most
            </p>
          </motion.div>
          <div className="flex justify-center">
            <motion.div 
              className="text-xl text-primary-dark font-semibold drop-shadow-md"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading featured products...
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-primary/2">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 drop-shadow-xl">
            Featured Products
          </h2>
          <p className="text-lg text-primary-dark max-w-2xl mx-auto drop-shadow-md">
            Discover our most popular traditional Indian sweets and snacks, crafted with authentic recipes and premium ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105 bg-primary/10 border border-primary/20">
                <div className="h-48 bg-gradient-midnight-light flex items-center justify-center">
                  <div className="text-center">
                    <Utensils className="w-16 h-16 text-primary-dark mx-auto mb-2 drop-shadow-md" />
                    <p className="text-primary-dark font-semibold text-base drop-shadow-md bg-primary/10 rounded px-2 py-1 inline-block">
                      {product.name}
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-2 drop-shadow-md">
                    {product.name}
                  </h3>
                  <p className="text-primary mb-4 line-clamp-2 drop-shadow-sm">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-dark drop-shadow-md">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating ? 'text-primary-dark fill-current' : 'text-primary/30'
                          } drop-shadow-sm`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 btn-primary-midnight py-2 px-4 rounded-lg font-medium drop-shadow-md"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-outline-midnight py-2 px-4 rounded-lg font-medium drop-shadow-md"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 btn-primary-midnight px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all drop-shadow-md"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
