
import React from 'react';

const ProductCategories = () => {
  const categories = [
    {
      name: 'Traditional Sweets',
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&h=200&fit=crop',
      description: 'Authentic Indian mithai made with pure ingredients'
    },
    {
      name: 'Namkeen & Snacks',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop',
      description: 'Crispy and delicious traditional snacks'
    },
    {
      name: 'Ready to Eat',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop',
      description: 'Convenient meals without compromising taste'
    },
    {
      name: 'Beverages',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop',
      description: 'Refreshing drinks and traditional beverages'
    },
    {
      name: 'Frozen Foods',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      description: 'Frozen delicacies for instant preparation'
    },
    {
      name: 'Dry Fruits',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      description: 'Premium quality nuts and dry fruits'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Product Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of authentic Indian foods, from traditional sweets to modern ready-to-eat meals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                  Explore Category →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
