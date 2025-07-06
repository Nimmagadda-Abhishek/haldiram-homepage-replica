import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Heart, ChevronRight, Truck, Shield, RefreshCw, CheckCircle, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { API_URL } from '../lib/config';

interface Product {
  id?: number;
  _id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  veg: boolean;
  slug?: string;
}

// Fallback product data for testing
const fallbackProduct: Product = {
  id: 1,
  _id: "fallback123",
  name: "Haldiram's Namkeen Mix",
  description: "A delicious blend of traditional Indian snacks including sev, peanuts, and other crispy treats. Perfect for snacking and entertaining guests.",
  image: "https://fmtmagazine.in/wp-content/uploads/2022/10/D1_Rising-Popularity-Emerging-Trends-in-Processed-Indian-Traditional-Snacks.jpg",
  price: 199,
  category: "AUTHENTIC_SNACKS",
  veg: true,
  slug: "haldirams-namkeen-mix"
};

export default function ProductDetail() {
  const { slugOrId } = useParams<{ slugOrId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { dispatch } = useCart();
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    if (slugOrId) {
      setLoading(true);
      setError(null);
      console.log(`Fetching product with slugOrId: ${slugOrId}`);
      
      // Try to fetch from API first
      fetch(`${API_URL}/products/${slugOrId}`)
        .then(res => {
          if (!res.ok) {
            console.error(`Error response: ${res.status}`);
            throw new Error('Product not found');
          }
          return res.json();
        })
        .then(data => {
          console.log('Product data received:', data);
          setProduct(data);
        })
        .catch(err => {
          console.error('Error fetching product, using fallback:', err);
          // Fallback to static data if API fails
          setProduct({
            ...fallbackProduct,
            id: parseInt(slugOrId) || 1,
            _id: slugOrId || '1'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [slugOrId]);

  useEffect(() => {
    if (product) {
      console.log('Fetching recommended products');
      
      // Try to fetch recommended products from API
      fetch(`${API_URL}/products`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`API returned status ${res.status}`);
          }
          return res.json();
        })
        .then(allProducts => {
          // First try to get products from the same category
          let recs = allProducts.filter((p: Product) => 
            p.category === product.category && 
            p.id !== product.id
          );
          
          // If we don't have enough products from the same category, add some from other categories
          if (recs.length < 4) {
            const otherProducts = allProducts.filter((p: Product) => 
              p.category !== product.category &&
              p.id !== product.id
            );
            
            // Shuffle the other products to get random ones
            const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
            
            // Add enough products to make up 4 total
            recs = [...recs, ...shuffled.slice(0, 4 - recs.length)];
          }
          
          // Limit to 4 products and set state
          setRecommended(recs.slice(0, 4));
          console.log(`Found ${recs.length} recommended products from API`);
        })
        .catch(err => {
          console.error('Error fetching recommended products, using fallback:', err);
          
          // Use static recommended products as fallback
          const staticRecommendedProducts = [
            {
              id: 101,
              _id: '101',
              name: 'Soan Papdi',
              description: 'Flaky sweet treat with cardamom flavor',
              image: 'https://i.pinimg.com/originals/b4/31/e0/b431e054a2ab4100bc04bc93f194258f.jpg',
              price: 199,
              category: product.category,
              veg: true
            },
            {
              id: 102,
              _id: '102',
              name: 'Kaju Katli',
              description: 'Premium cashew-based sweet',
              image: 'https://fmtmagazine.in/wp-content/uploads/2022/10/D1_Rising-Popularity-Emerging-Trends-in-Processed-Indian-Traditional-Snacks.jpg',
              price: 299,
              category: product.category,
              veg: true
            },
            {
              id: 103,
              _id: '103',
              name: 'Bhujia Sev',
              description: 'Crispy gram flour snack',
              image: 'https://i.pinimg.com/originals/46/d1/3e/46d13e8aebf8839faec85861bc90ca62.jpg',
              price: 89,
              category: 'AUTHENTIC_SNACKS',
              veg: true
            },
            {
              id: 104,
              _id: '104',
              name: 'Gulab Jamun',
              description: 'Soft milk-solid balls in sugar syrup',
              image: 'https://i.pinimg.com/originals/e1/26/6b/e1266b060aaa3be350478fcb360d2549.jpg',
              price: 149,
              category: 'SWEETS_AND_HOTS',
              veg: true
            }
          ];
          
          setRecommended(staticRecommendedProducts);
          console.log(`Set ${staticRecommendedProducts.length} static recommended products as fallback`);
        });
    }
  }, [product]);

  const addToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id || Number(product._id) || Date.now(), // Use a fallback ID if needed
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      }
    });

    setAddingToCart(false);
    setAddedToCart(true);
    
    // Show success toast
    toast.success(`${quantity} ${product.name} added to cart! 🛒`, {
      duration: 2000,
      position: 'top-right',
      style: {
        background: 'rgb(25, 25, 112)',
        color: 'white',
        border: 'none',
      },
    });


    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      'SOUTH_INDIAN_SNACKS': 'South Indian Snacks',
      'AUTHENTIC_SNACKS': 'Authentic Snacks',
      'AUTHENTIC_PICKLES': 'Authentic Pickles',
      'SWEETS_AND_HOTS': 'Sweets and Hots',
      'DRY_FRUITS_AND_NUTS': 'Dry Fruits and Nuts'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
          <div className="text-xl text-primary-dark">Loading product...</div>
          <div className="text-sm text-primary-dark mt-2">Slug: {slugOrId}</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary/5">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-4 text-primary-dark drop-shadow-md">Product not found</h1>
          {error && (
            <p className="text-primary-dark mb-4">Error: {error}</p>
          )}
          <Link to="/products" className="text-primary-dark hover:text-primary underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://thumbs.dreamstime.com/b/dry-fruits-sweets-indian-traditional-dry-fruit-sweet-food-isolated-white-background-105492430.jpg";
              }}
            />
          </motion.div>
          {/* Product Info Section */}
          <motion.div 
            className="flex flex-col justify-center space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-2 drop-shadow-md">{product.name}</h1>
            <p className="text-base sm:text-lg text-primary-dark mb-2 drop-shadow-sm">{product.description}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-dark drop-shadow-md">₹{product.price}</span>
              <button
                onClick={addToCart}
                className="btn-primary-midnight px-4 py-2 rounded-full text-base font-semibold shadow-md transition-all duration-300 hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Recommended Products Section */}
        {recommended.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-primary-dark mb-6 drop-shadow-md">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((rec) => (
                <motion.div
                  key={rec.id}
                  className="bg-primary/10 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Link to={`/product/${rec.id}`}>
                    <img 
                      src={rec.image} 
                      alt={rec.name} 
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://thumbs.dreamstime.com/b/dry-fruits-sweets-indian-traditional-dry-fruit-sweet-food-isolated-white-background-105492430.jpg";
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-primary-dark drop-shadow-md">{rec.name}</h3>
                      <p className="text-primary-dark text-sm mt-1 drop-shadow-sm">{rec.description.substring(0, 60)}...</p>
                      <div className="mt-2 font-bold text-primary-dark drop-shadow-md">₹{rec.price}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}