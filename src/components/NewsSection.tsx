
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=250&fit=crop',
      title: 'Haldiram\'s Launches New Premium Sweet Collection',
      excerpt: 'Introducing our latest range of premium sweets made with finest ingredients...',
      date: 'June 15, 2025',
      category: 'Product Launch'
    },
    {
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=250&fit=crop',
      title: 'Expansion to International Markets',
      excerpt: 'We are excited to announce our expansion to new international markets...',
      date: 'June 10, 2025',
      category: 'Business'
    },
    {
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      title: 'Sustainability Initiative Launch',
      excerpt: 'Our commitment to environmental responsibility with new eco-friendly packaging...',
      date: 'June 5, 2025',
      category: 'Sustainability'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest News & Updates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest announcements, product launches, and company news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {article.date}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center text-orange-500 font-medium group-hover:text-orange-600 transition-colors">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
