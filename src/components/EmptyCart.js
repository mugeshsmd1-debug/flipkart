import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const EmptyCart = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-10 text-center flex flex-col items-center">
        <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <FaShoppingCart className="text-6xl text-[#2874f0]/60" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Your Flipkart Cart is empty!</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Explore our wide selection of skincare, lifestyle products and top deals to find something you like.
        </p>

        <Link
          to="/"
          className="mt-6 bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-sm px-10 py-3 rounded-sm shadow-md transition-colors uppercase tracking-wider"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
