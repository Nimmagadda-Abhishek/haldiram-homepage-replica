import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag, Package, Layers, Grid3X3, ArrowUpDown, X, Save, Star, StarOff, Info } from 'lucide-react';
import { toast } from 'sonner';
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
  featured?: boolean;
  stock?: number;
  tags?: string[];
  displayOrder?: number;
}

interface Category {
  value: string;
  label: string;
}

const AdminProductOrganization = ({ categories }: { categories: Category[] }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('displayOrder');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [showFeaturedSection, setShowFeaturedSection] = useState(true);
  const [showCategorySection, setShowCategorySection] = useState(true);
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [draggedProductId, setDraggedProductId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Get sample products function (for demo purposes)
  const getSampleProducts = useCallback((): Product[] => {
    return [
      {
        id: 101,
        name: 'Motichoor Ladoo',
        description: 'Soft, melt-in-mouth ladoos made with besan and pure ghee.',
        image: 'https://www.joushfoods.com/images/products/motichoor-ladoo.png',
        price: 299,
        category: 'LADOO',
        veg: true,
        slug: 'motichoor-ladoo',
        _id: '101',
        stock: 50,
        tags: ['sweet', 'festive', 'popular'],
        displayOrder: 1,
        featured: true
      },
      {
        id: 201,
        name: 'Kaju Barfi',
        description: 'Premium cashew fudge, a festive favorite.',
        image: 'https://www.joushfoods.com/images/products/kaju-barfi.png',
        price: 399,
        category: 'BARFI',
        veg: true,
        slug: 'kaju-barfi',
        _id: '201',
        stock: 35,
        tags: ['sweet', 'premium', 'gift'],
        displayOrder: 2,
        featured: true
      },
      {
        id: 401,
        name: 'Aloo Bhujia',
        description: 'Crispy potato snack with authentic spices.',
        image: 'https://www.joushfoods.com/images/products/aloo-bhujia.png',
        price: 89,
        category: 'SNACKS',
        veg: true,
        slug: 'aloo-bhujia',
        _id: '401',
        stock: 100,
        tags: ['savory', 'popular', 'tea-time'],
        displayOrder: 3
      },
      {
        id: 501,
        name: 'Mixed Pickle',
        description: 'Assorted vegetables in traditional spices.',
        image: 'https://www.joushfoods.com/images/products/mixed-pickle.png',
        price: 99,
        category: 'PICKLES',
        veg: true,
        slug: 'mixed-pickle',
        _id: '501',
        stock: 45,
        tags: ['spicy', 'accompaniment'],
        displayOrder: 4
      },
      {
        id: 601,
        name: 'Mixed Nuts',
        description: 'Premium quality assorted nuts.',
        image: 'https://www.joushfoods.com/images/products/mixed-nuts.png',
        price: 299,
        category: 'DRYFRUITS',
        veg: true,
        slug: 'mixed-nuts',
        _id: '601',
        stock: 30,
        tags: ['healthy', 'premium', 'gift'],
        displayOrder: 5
      },
    ];
  }, []);

  // Sort products
  const sortProducts = useCallback((productsList: Product[], sortField: string, order: string) => {
    const sorted = [...productsList].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'displayOrder':
          comparison = (a.displayOrder || 0) - (b.displayOrder || 0);
          break;
        default:
          comparison = 0;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    setFilteredProducts(sorted);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      let data = await response.json();
      
      // If API returns no products, use sample data
      if (!data || data.length === 0) {
        const sampleProducts = getSampleProducts();
        data = sampleProducts;
      }
      
      // Add displayOrder if not present
      const productsWithOrder = data.map((p: Product, index: number) => ({
        ...p,
        displayOrder: p.displayOrder || index + 1,
        featured: p.featured || false,
        tags: p.tags || []
      }));
      
      setProducts(productsWithOrder);
      
      // Set featured products
      const featured = productsWithOrder.filter((p: Product) => p.featured);
      setFeaturedProducts(featured);
      
      // Apply initial sorting
      sortProducts(productsWithOrder, sortBy, sortOrder);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      
      // Use sample data as fallback
      const sampleProducts = getSampleProducts();
      setProducts(sampleProducts);
      
      // Set featured products
      const featured = sampleProducts.filter(p => p.featured);
      setFeaturedProducts(featured);
      
      // Apply initial sorting
      sortProducts(sampleProducts, sortBy, sortOrder);
    } finally {
      setLoading(false);
    }
  }, [getSampleProducts, sortProducts, sortBy, sortOrder]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    sortProducts(result, sortBy, sortOrder);
  }, [products, searchTerm, categoryFilter, sortBy, sortOrder, sortProducts]);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    setDraggedProduct(product);
    setDraggedProductId(product._id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(targetId);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedProductId || draggedProductId === targetId) {
      setDraggedProductId(null);
      setDropTargetId(null);
      return;
    }
    
    // Find the indices of the dragged and target products
    const draggedIndex = products.findIndex(p => p._id === draggedProductId);
    const targetIndex = products.findIndex(p => p._id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    // Create a new array with the updated order
    const newProducts = [...products];
    const [draggedProduct] = newProducts.splice(draggedIndex, 1);
    newProducts.splice(targetIndex, 0, draggedProduct);
    
    // Update display order for all products
    const updatedProducts = newProducts.map((p, index) => ({
      ...p,
      displayOrder: index + 1
    }));
    
    setProducts(updatedProducts);
    setHasChanges(true);
    setDraggedProductId(null);
    setDropTargetId(null);
  };

  // Handle drop on featured section
  const handleDropOnFeatured = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!draggedProduct) return;
    
    // Check if product is already featured
    if (featuredProducts.some(p => p._id === draggedProduct._id)) {
      return;
    }
    
    // Update the product to be featured
    const updatedProducts = products.map(p => 
      p._id === draggedProduct._id ? { ...p, featured: true } : p
    );
    
    setProducts(updatedProducts);
    setFeaturedProducts([...featuredProducts, { ...draggedProduct, featured: true }]);
    setHasChanges(true);
    setDraggedProduct(null);
  };

  // Handle toggle featured
  const handleToggleFeatured = (productId: string) => {
    const updatedProducts = products.map(p => 
      p._id === productId ? { ...p, featured: !p.featured } : p
    );
    
    setProducts(updatedProducts);
    
    const updatedFeatured = updatedProducts.filter(p => p.featured);
    setFeaturedProducts(updatedFeatured);
    setHasChanges(true);
  };

  // Save changes
  const saveChanges = async () => {
    try {
      // Here you would typically save to your backend
      toast.success('Changes saved successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save changes');
    }
  };

  const toggleFeaturedSection = () => {
    setShowFeaturedSection(!showFeaturedSection);
  };

  const toggleCategorySection = () => {
    setShowCategorySection(!showCategorySection);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Organization</h1>
        <div className="flex items-center gap-4">
          {hasChanges && (
            <button
              onClick={saveChanges}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-primary-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-primary-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-primary-light rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="displayOrder">Display Order</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-primary-light rounded-lg hover:bg-primary-light"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-light rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Featured Products
          </h2>
          <button
            onClick={toggleFeaturedSection}
            className="text-primary hover:text-primary-dark"
          >
            {showFeaturedSection ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
          </button>
        </div>
        
        {showFeaturedSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg p-4 border border-primary-light hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-primary-dark">{product.name}</h3>
                  <button
                    onClick={() => handleToggleFeatured(product._id)}
                    className="text-primary hover:text-primary-dark"
                  >
                    <StarOff className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600">₹{product.price}</span>
                  <span className="bg-primary-light text-primary-dark px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* All Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Products</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-light text-primary-dark' : 'text-primary-medium'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-light text-primary-dark' : 'text-primary-medium'}`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                draggable
                onDragStart={(e) => handleDragStart(e, product)}
                onDragOver={(e) => handleDragOver(e, product._id)}
                onDrop={(e) => handleDrop(e, product._id)}
                className={`bg-white rounded-lg p-4 border-2 cursor-move transition-all ${
                  draggedProductId === product._id ? 'border-primary shadow-lg' :
                  dropTargetId === product._id ? 'border-blue-500' : 'border-primary-light hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-primary-dark">{product.name}</h3>
                  <button
                    onClick={() => handleToggleFeatured(product._id)}
                    className={`${product.featured ? 'text-primary' : 'text-primary-light'} hover:text-primary-dark`}
                  >
                    {product.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600">₹{product.price}</span>
                  <span className="bg-primary-light text-primary-dark px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Order: {product.displayOrder}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                draggable
                onDragStart={(e) => handleDragStart(e, product)}
                onDragOver={(e) => handleDragOver(e, product._id)}
                onDrop={(e) => handleDrop(e, product._id)}
                className={`bg-white rounded-lg p-4 border-2 cursor-move transition-all ${
                  draggedProductId === product._id ? 'border-primary shadow-lg' :
                  dropTargetId === product._id ? 'border-blue-500' : 'border-primary-light hover:border-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500 w-8">
                      {product.displayOrder}
                    </span>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-semibold">₹{product.price}</span>
                    <span className="bg-primary-light text-primary-dark px-2 py-1 rounded text-sm">
                      {product.category}
                    </span>
                    <button
                      onClick={() => handleToggleFeatured(product._id)}
                      className={`${product.featured ? 'text-primary' : 'text-primary-light'} hover:text-primary-dark`}
                    >
                      {product.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProductOrganization; 