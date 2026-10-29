import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMobileAlt,
  FaTv,
  FaTshirt,
  FaCouch,
  FaTag,
  FaHeartbeat,
  FaGift,
  FaShoppingBasket,
  FaPlane
} from 'react-icons/fa';

const FlipkartCategoryNav = () => {
  const categories = [
    { name: 'Top Offers', icon: <FaTag className="text-yellow-500 text-xl" />, path: '/' },
    { name: 'Mobiles', icon: <FaMobileAlt className="text-blue-500 text-xl" />, path: '/under40' },
    { name: 'Electronics', icon: <FaTv className="text-indigo-500 text-xl" />, path: '/under40' },
    { name: 'Fashion', icon: <FaTshirt className="text-pink-500 text-xl" />, path: '/forher' },
    { name: 'Beauty & Care', icon: <FaHeartbeat className="text-rose-500 text-xl" />, path: '/' },
    { name: 'Home & Furniture', icon: <FaCouch className="text-amber-600 text-xl" />, path: '/under20' },
    { name: 'Gift Sets', icon: <FaGift className="text-purple-500 text-xl" />, path: '/forhim' },
    { name: 'Budget Store', icon: <FaShoppingBasket className="text-green-600 text-xl" />, path: '/under20' },
    { name: 'Travel Deals', icon: <FaPlane className="text-teal-500 text-xl" />, path: '/under40' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="flex flex-col items-center gap-1 group text-center cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              {cat.icon}
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#2874f0] transition-colors whitespace-nowrap">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlipkartCategoryNav;
