
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      name: 'Rasgulla',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&h=250&fit=crop',
      price: '₹149',
      originalPrice: '₹179',
      rating: 4.8,
      reviews: 125
    },
    {
      name: 'Aloo Bhujia',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=250&fit=crop',
      price: '₹89',
      originalPrice: '₹99',
      rating: 4.6,
      reviews: 89
    },
    {
      name: 'Chole Bhature',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=250&fit=crop',
      price: '₹199',
      originalPrice: '₹229',
      rating: 4.7,
      reviews: 156
    },
    {
      name: 'Badam Milk',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=250&fit=crop',
      price: '₹79',
      originalPrice: '₹89',
      rating: 4.5,
      reviews: 67
    },
    {
      name: 'Samosa',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=250&fit=crop',
      price: '₹119',
      originalPrice: '₹139',
      rating: 4.9,
      reviews: 203
    },
    {
      name: 'Mixed Nuts',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=250&fit=crop',
      price: '₹299',
      originalPrice: '₹349',
      rating: 4.8,
      reviews: 142
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked bestsellers that our customers love the most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-orange-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-500">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
