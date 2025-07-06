import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { menuItems } from '../lib/navlinks';
import { API_URL } from '../lib/config';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  veg: boolean;
  slug?: string;
  _id: string;
}

// Define a type for menu items
interface MenuItem {
  path: string;
  name: string;
}

const sections = [
  { value: 'ladoo', label: 'Ladoo', image: 'https://www.joushfoods.com/images/category/ladoo.jpg' },
  { value: 'barfi', label: 'Barfi', image: 'https://www.joushfoods.com/images/category/barfi.jpg' },
  { value: 'mithai', label: 'Mithai', image: 'https://www.joushfoods.com/images/category/mithai.jpg' },
  { value: 'snacks', label: 'Snacks', image: 'https://www.joushfoods.com/images/category/snacks.jpg' },
  { value: 'pickles', label: 'Pickles', image: 'https://www.joushfoods.com/images/category/pickles.jpg' },
  { value: 'dryfruits', label: 'Dry Fruits', image: 'https://www.joushfoods.com/images/category/dryfruits.jpg' },
];

const fallbackCategoryImage = 'https://www.joushfoods.com/images/logo.png';
const fallbackProductImage = 'https://www.joushfoods.com/images/products/default-product.png';

const sampleProducts: Record<string, Product[]> = {
  ladoo: [
    {
      id: 101,
      name: 'Motichoor Ladoo',
      description: 'Soft, melt-in-mouth ladoos made with besan and pure ghee.',
      image: 'https://www.joushfoods.com/images/products/motichoor-ladoo.png',
      price: 299,
      category: 'LADOO',
      veg: true,
      slug: 'motichoor-ladoo',
      _id: '101'
    },
    {
      id: 102,
      name: 'Besan Ladoo',
      description: 'Classic besan ladoos with a rich, nutty flavor.',
      image: 'https://www.joushfoods.com/images/products/besan-ladoo.png',
      price: 249,
      category: 'LADOO',
      veg: true,
      slug: 'besan-ladoo',
      _id: '102'
    }
  ],
  barfi: [
    {
      id: 201,
      name: 'Kaju Barfi',
      description: 'Premium cashew fudge, a festive favorite.',
      image: 'https://www.joushfoods.com/images/products/kaju-barfi.png',
      price: 399,
      category: 'BARFI',
      veg: true,
      slug: 'kaju-barfi',
      _id: '201'
    },
    {
      id: 202,
      name: 'Coconut Barfi',
      description: 'Delicious coconut barfi with a hint of cardamom.',
      image: 'https://www.joushfoods.com/images/products/coconut-barfi.png',
      price: 299,
      category: 'BARFI',
      veg: true,
      slug: 'coconut-barfi',
      _id: '202'
    }
  ],
  mithai: [
    {
      id: 301,
      name: 'Rasgulla',
      description: 'Soft, spongy rasgullas soaked in sugar syrup.',
      image: 'https://www.joushfoods.com/images/products/rasgulla.png',
      price: 199,
      category: 'MITHAI',
      veg: true,
      slug: 'rasgulla',
      _id: '301'
    },
    {
      id: 302,
      name: 'Gulab Jamun',
      description: 'Golden brown gulab jamuns in rose-flavored syrup.',
      image: 'https://www.joushfoods.com/images/products/gulab-jamun.png',
      price: 199,
      category: 'MITHAI',
      veg: true,
      slug: 'gulab-jamun',
      _id: '302'
    }
  ],
  snacks: [
    {
      id: 401,
      name: 'Aloo Bhujia',
      description: 'Crispy potato snack with authentic spices.',
      image: 'https://www.joushfoods.com/images/products/aloo-bhujia.png',
      price: 89,
      category: 'SNACKS',
      veg: true,
      slug: 'aloo-bhujia',
      _id: '401'
    },
    {
      id: 402,
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes.',
      image: 'https://www.joushfoods.com/images/products/samosa.png',
      price: 119,
      category: 'SNACKS',
      veg: true,
      slug: 'samosa',
      _id: '402'
    }
  ],
  pickles: [
    {
      id: 501,
      name: 'Mixed Pickle',
      description: 'Assorted vegetables in traditional spices.',
      image: 'https://www.joushfoods.com/images/products/mixed-pickle.png',
      price: 99,
      category: 'PICKLES',
      veg: true,
      slug: 'mixed-pickle',
      _id: '501'
    },
    {
      id: 502,
      name: 'Mango Pickle',
      description: 'Tangy mango pickle with a spicy kick.',
      image: 'https://www.joushfoods.com/images/products/mango-pickle.png',
      price: 99,
      category: 'PICKLES',
      veg: true,
      slug: 'mango-pickle',
      _id: '502'
    }
  ],
  dryfruits: [
    {
      id: 601,
      name: 'Mixed Nuts',
      description: 'Premium quality assorted nuts.',
      image: 'https://www.joushfoods.com/images/products/mixed-nuts.png',
      price: 299,
      category: 'DRYFRUITS',
      veg: true,
      slug: 'mixed-nuts',
      _id: '601'
    },
    {
      id: 602,
      name: 'Almonds',
      description: 'Crunchy, handpicked almonds.',
      image: 'https://www.joushfoods.com/images/products/almonds.png',
      price: 349,
      category: 'DRYFRUITS',
      veg: true,
      slug: 'almonds',
      _id: '602'
    }
  ]
};

// Sidebar subcategories for each main section
const sidebarContent: Record<string, string[]> = {
  snacks: [
    'Andhra Special',
    'Tamil Nadu Special',
    'Karnataka Special',
    'Kerala Special',
    'Gujarati/Rajasthani',
    'Tea-time Snacks',
    'Roasted & Baked Snacks',
    'Festival Specials',
  ],
  'south-indian-snacks': [
    'Murukku Variants (Kai Murukku, Ring Murukku)',
    'Mixtures (Madras Mixture, Andhra Mixture)',
    'Banana-based Snacks (Banana Chips, Nendran Chips)',
    'Lentil-based Snacks (Masala Vada, Paruppu Vadai)',
    'Rice-based Snacks (Thattai, Chekkalu)',
    'Fryums & Appalams',
    'Millet Snacks (Ragi Chips, Thinai Sticks)',
  ],
  pickles: [
    'Andhra Pickles (Avakaya, Gongura)',
    'Tamil Nadu Pickles (Maavadu, Narthangai)',
    'Kerala Pickles (Inji Puli, Mango Pickle)',
    'North Indian Pickles (Aam ka Achar, Lemon)',
    'Dry Pickles',
    'Instant Pickles',
    'Non-Veg Pickles (Chicken, Prawn, Fish)',
  ],
  sweets: [
    'Milk-based Sweets (Palkova, Milk Cake)',
    'Jaggery-based Sweets (Bellam Sweets, Chikki)',
    'Festival Specials (Diwali, Sankranti, Ugadi)',
    'Ghee-based Sweets (Mysore Pak, Badusha)',
    'Bengali Sweets (Rasgulla, Sandesh)',
    'Halwa Varieties (Tirunelveli, Karachi, Moong Dal)',
    'Dry Fruit Sweets (Kaju Katli, Anjeer Rolls)',
    'Laddus (Boondi, Rava, Besan)',
  ],
  dryfruits: [
    'Almonds (Raw, Roasted, Salted)',
    'Cashews (Plain, Spiced, Masala)',
    'Pistachios (Salted, Roasted)',
    'Raisins (Black, Golden, Green)',
    'Dates (Medjool, Khudri, Seedless)',
    'Figs & Apricots',
    'Mixed Dry Fruit Packs',
    'Dry Fruit Gift Boxes',
  ],
  'authentic-snacks': [
    'Andhra Special (Chekkalu, Karapusa)',
    'Tamil Nadu Special (Murukku, Thenkuzhal)',
    'Karnataka Special (Nippattu, Kodubale)',
    'Kerala Special (Banana Chips, Sharkara Varatti)',
    'Gujarati/Rajasthani (Fafda, Bikaneri Bhujia)',
    'Tea-time Snacks',
    'Roasted & Baked Snacks',
    'Festival Specials',
  ],
};

export default function Products() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const { dispatch } = useCart();
  const selectedItem = searchParams.get('item') || '';
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, categoryParam, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      
      // Filter by section or category param if present
      let filtered = data;
      
      if (categoryParam) {
        filtered = data.filter((p: Product) => p.category === categoryParam);
      } else if (section) {
        filtered = data.filter((p: Product) => p.category.toLowerCase().includes(section));
      }
      
      // Filter by search query if present
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter((p: Product) => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        );
      }
      
      // If no products found from API, use sample data for development
      if (filtered.length === 0 && Object.keys(sampleProducts).length > 0) {
        let sampleFiltered: Product[] = [];
        
        // Combine all sample products into one array
        Object.values(sampleProducts).forEach(products => {
          sampleFiltered = [...sampleFiltered, ...products];
        });
        
        // Apply the same filters to sample data
        if (categoryParam) {
          sampleFiltered = sampleFiltered.filter(p => p.category === categoryParam);
        } else if (section) {
          sampleFiltered = sampleFiltered.filter(p => p.category.toLowerCase().includes(section));
        }
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          sampleFiltered = sampleFiltered.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
          );
        }
        
        filtered = sampleFiltered;
      }
      
      setProducts(filtered);
    } catch (error) {
      // Fallback to sample data if API fails
      let sampleFiltered: Product[] = [];
      
      // Combine all sample products into one array
      Object.values(sampleProducts).forEach(products => {
        sampleFiltered = [...sampleFiltered, ...products];
      });
      
      // Apply filters to sample data
      if (categoryParam) {
        sampleFiltered = sampleFiltered.filter(p => p.category === categoryParam);
      } else if (section) {
        sampleFiltered = sampleFiltered.filter(p => p.category.toLowerCase().includes(section));
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        sampleFiltered = sampleFiltered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        );
      }
      
      setProducts(sampleFiltered);
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
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
    toast.success(`${product.name} added to cart! 🛒`, {
      duration: 2000,
      position: 'top-right',
      style: { background: '#f4f6fa', color: 'rgb(25, 25, 112)', border: 'none' },
    });
  };

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Filter products by selected subcategory (product name)
  const filteredProducts = selectedItem ? products.filter(p => p.name === selectedItem) : products;

  const selectedSection = sections.find(s => s.value === section) || sections[0];

  // Dynamic subtitle for each section/category
  const sectionDescriptions: Record<string, string> = {
    ladoo: 'Discover our delicious ladoo collection, made with authentic recipes and premium ingredients.',
    barfi: 'Explore our rich and creamy barfi varieties, crafted for every celebration.',
    mithai: 'Indulge in our wide range of traditional mithai, perfect for every occasion.',
    snacks: 'Crunch into our savory snacks, a perfect companion for your tea time.',
    pickles: 'Taste our tangy and spicy pickles, made with age-old recipes.',
    dryfruits: 'Enjoy our premium dry fruits, handpicked for quality and taste.',
    SOUTH_INDIAN_SNACKS: 'Enjoy the authentic taste of South Indian snacks, crispy and flavorful.',
    AUTHENTIC_SNACKS: 'Savor our authentic snacks, made with traditional recipes.',
    AUTHENTIC_PICKLES: 'Spicy, tangy, and full of flavor—our authentic pickles are a must-try.',
    SWEETS_AND_HOTS: 'A delightful mix of sweets and spicy treats for every occasion.',
    DRY_FRUITS_AND_NUTS: 'Premium dry fruits and nuts, perfect for healthy snacking.',
  };

  // Map category param to label and description
  let heroTitle = '';
  let heroSubtitle = '';
  if (categoryParam) {
    // Try to find a matching label from menuItems or fallback
    const menuItem = menuItems.find((item: MenuItem) => item.path.includes(categoryParam));
    heroTitle = menuItem ? menuItem.name : categoryParam.replace(/_/g, ' ');
    heroSubtitle = sectionDescriptions[categoryParam] || `Discover our delicious ${heroTitle.toLowerCase()} collection, made with authentic recipes and premium ingredients.`;
  } else {
    heroTitle = selectedSection.label;
    heroSubtitle = sectionDescriptions[selectedSection.value] || `Discover our delicious ${selectedSection.label.toLowerCase()} collection, made with authentic recipes and premium ingredients.`;
  }

  // Use custom sidebar content if available, else fallback to product names
  const sidebarCategories = sidebarContent[section || ''] || Array.from(new Set(products.map(p => p.name)));

  // Update hero title and subtitle for search results
  if (searchQuery) {
    heroTitle = `Search Results: "${searchQuery}"`;
    heroSubtitle = `Showing products matching your search for "${searchQuery}"`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary/5">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-xl text-primary-medium">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary/5">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-dark py-10 sm:py-16 mb-6 sm:mb-8">
        <img src={selectedSection.image || fallbackCategoryImage} onError={e => { e.currentTarget.src = fallbackCategoryImage; }} alt={selectedSection.label} className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-dark mb-3 sm:mb-4 drop-shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {heroTitle}
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-primary-dark opacity-95 mb-6 sm:mb-8 px-2 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heroSubtitle}
            </motion.p>
            {/* Breadcrumbs */}
            <motion.nav 
              className="flex flex-wrap items-center justify-center text-xs sm:text-sm drop-shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/" className="hover:text-primary/80 transition-colors text-primary-dark">Home</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-primary-dark" />
              <Link to={`/products/${selectedSection.value}`} className="hover:text-primary/80 transition-colors text-primary-dark">Products</Link>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-primary-dark" />
              <span className="text-primary/80">{heroTitle}</span>
            </motion.nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 sm:pb-12 flex flex-col md:flex-row gap-6 sm:gap-8">
        {/* Sidebar - Mobile Dropdown / Desktop Sidebar */}
        {!(location.pathname === '/products' && location.search === '') && (
          <aside className="md:w-1/4 mb-6 sm:mb-8 md:mb-0">
            <div className="bg-primary/5 rounded-2xl shadow-lg p-4 sm:p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-primary-dark flex items-center gap-2 drop-shadow-md">
                  <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-primary-dark" />
                  {heroTitle} Categories
                </h3>
                {/* Mobile dropdown toggle - could be implemented with useState */}
                <button className="md:hidden bg-primary/10 text-primary-dark p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {sidebarCategories.map((cat, idx) => (
                  <li key={cat}>
                    <button
                      className={`flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-200 font-semibold text-left gap-2 sm:gap-3 text-sm sm:text-base ${selectedItem === cat ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-dark shadow-lg drop-shadow-md' : 'bg-primary/10 hover:bg-primary/20 text-primary-dark'}`}
                      onClick={() => {
                        setCurrentPage(1);
                        setSearchParams(selectedItem === cat ? {} : { item: cat });
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
        {/* Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-primary/5 rounded-3xl shadow-lg p-6 sm:p-8 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-primary-dark" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-dark mb-2 drop-shadow-md">No products found</h3>
              <p className="text-primary-dark mb-4 sm:mb-6 text-sm sm:text-base drop-shadow-sm">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}". Please try a different search term.` 
                  : "We couldn't find any products in this category."}
              </p>
              <button 
                onClick={() => {
                  if (searchQuery) {
                    setSearchParams({});
                  } else {
                    navigate('/products');
                  }
                }}
                className="bg-primary/10 hover:bg-primary/20 text-primary-dark px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-flex items-center gap-2 drop-shadow-md"
              >
                {searchQuery ? 'Clear Search' : 'View All Products'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProducts.slice(startIndex, endIndex).map(product => (
              product._id ? (
                <Link to={`/product/${product.slug || product._id}`} key={product._id}>
                  <motion.div
                    className="bg-primary/5 rounded-3xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 border border-primary/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <img
                        src={product.image || 'https://www.joushfoods.com/images/products/default-product.png'}
                        alt={product.name}
                        className="w-full h-44 sm:h-48 md:h-56 object-cover rounded-t-3xl"
                        onError={e => { e.currentTarget.src = 'https://www.joushfoods.com/images/products/default-product.png'; }}
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-1 sm:mb-2 drop-shadow-md">{product.name}</h3>
                        <p className="text-primary-dark mb-3 sm:mb-4 min-h-[48px] text-sm sm:text-base line-clamp-2 drop-shadow-sm">{product.description}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-2 sm:mt-4">
                        <span className="text-xl sm:text-2xl font-bold text-primary-dark drop-shadow-md">₹{product.price}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                          className="flex-1 bg-primary/10 text-primary-dark py-2 px-4 rounded-lg font-medium hover:bg-primary/20 transition-colors drop-shadow-md"
                        >
                          Add to Cart
                        </button>
                        <Link
                          to={`/product/${product.id}`}
                          className="border border-primary text-primary-dark py-2 px-4 rounded-lg font-medium hover:bg-primary/10 hover:text-primary-dark transition-colors drop-shadow-md"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ) : null
            ))}
            </div>
          )}
          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="flex justify-center mt-8 sm:mt-12 gap-1 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-bold transition-all duration-200 ${currentPage === i + 1 ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-dark shadow-lg drop-shadow-md' : 'bg-primary/10 hover:bg-primary/20 text-primary-dark'}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}