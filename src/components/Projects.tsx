
import React from 'react';
import { MapPin, Calendar, Award } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Metro City Commercial Complex',
      location: 'Mumbai, Maharashtra',
      year: '2023',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      description: 'A 50-story commercial complex with modern amenities and sustainable design.'
    },
    {
      title: 'Industrial Manufacturing Hub',
      location: 'Pune, Maharashtra',
      year: '2023',
      category: 'Industrial',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'State-of-the-art manufacturing facility with advanced automation systems.'
    },
    {
      title: 'Highway Bridge Project',
      location: 'Delhi-NCR',
      year: '2022',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      description: 'Modern cable-stayed bridge connecting major highway networks.'
    },
    {
      title: 'Corporate Headquarters',
      location: 'Bangalore, Karnataka',
      year: '2022',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      description: 'LEED-certified corporate campus with innovative green building features.'
    },
    {
      title: 'Power Plant Infrastructure',
      location: 'Hyderabad, Telangana',
      year: '2021',
      category: 'Industrial',
      image: 'https://images.unsplash.com/photo-1581093458791-9d42e72b2085?w=400&h=300&fit=crop',
      description: 'Clean energy power generation facility with cutting-edge technology.'
    },
    {
      title: 'Airport Terminal Expansion',
      location: 'Chennai, Tamil Nadu',
      year: '2021',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop',
      description: 'Modern airport terminal with enhanced passenger capacity and facilities.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing our expertise in delivering world-class construction projects across various sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  Completed in {project.year}
                </div>
                
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
