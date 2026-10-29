import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const JournalSection = () => {
  const articles = [
    {
      img: 'https://cdn.shopify.com/s/files/1/0081/7374/8305/articles/400x400_blog_540x.jpg?v=1652511342',
      title: 'Protective Haircare & Summer Regimen',
      category: 'BEAUTY TIPS',
      desc: 'Expert dermatologist approved methods to nourish hair during heatwaves and humidity.',
      link: '/journal/april'
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0081/7374/8305/articles/BBQ_1200x440_7b63676b-f505-4b21-9192-e1b43a53be32_540x.jpg?v=1625596357',
      title: 'Eco-Friendly Living & Outdoor Essentials',
      category: 'LIFESTYLE',
      desc: 'Smart hacks for sustainable hosting, organic picnics and zero-waste weekends.',
      link: '/journal/april'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-white rounded-sm p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-100 mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-5 bg-[#2874f0] rounded-sm inline-block"></span>
              <h2 className="text-xl font-bold text-gray-900">
                Flipkart Stories & Buying Guides
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Curated tips, expert recommendations, and customer stories
            </p>
          </div>
          <Link
            to="/journal/april"
            className="text-xs font-bold text-[#2874f0] hover:underline flex items-center gap-1"
          >
            Explore All Guides <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="flex flex-col sm:flex-row gap-4 p-3 rounded-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="w-full sm:w-44 h-36 overflow-hidden rounded shrink-0 bg-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#2874f0] bg-blue-50 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm mt-2 group-hover:text-[#2874f0] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#2874f0] flex items-center gap-1 mt-3">
                  Read article <FaArrowRight className="text-[9px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalSection;
