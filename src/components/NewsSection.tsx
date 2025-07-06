import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Josh Food's Expands to New Markets",
      description: "We're excited to announce our expansion into new regional markets, bringing our authentic Indian snacks to more customers.",
      date: "2024-01-15",
      category: "Company News",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "New Product Launch: Premium Namkeen Collection",
      description: "Introducing our premium namkeen collection with traditional recipes and modern packaging for the discerning customer.",
      date: "2024-01-10",
      category: "Product Launch",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Sustainability Initiatives at Haldiram's",
      description: "Learn about our commitment to sustainable practices and eco-friendly packaging solutions.",
      date: "2024-01-05",
      category: "Sustainability",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Latest News & Updates
          </motion.h2>
          <motion.p 
            className="text-lg text-primary-medium max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Stay updated with the latest news, product launches, and company updates from Haldiram's
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-500 border border-primary/20 bg-primary/5">
                <div className="aspect-video bg-primary/10 rounded-t-lg flex items-center justify-center">
                  <img
                    src={item.image || 'https://www.joushfoods.com/images/news/default-news.png'}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                    onError={e => { e.currentTarget.src = 'https://www.joushfoods.com/images/news/default-news.png'; }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-primary-medium mb-4 line-clamp-3">
                    {item.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-primary">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-primary">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-primary" />
                      {/* Optionally add author or other info here */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button 
            className="btn-primary-midnight px-8 py-3 rounded-lg transition-all duration-300 font-semibold shadow-md"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(25, 25, 112, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View All News
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;