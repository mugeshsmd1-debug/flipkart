import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaTag,
  FaBoxOpen,
  FaHeart,
  FaQuestionCircle
} from 'react-icons/fa';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="md:hidden bg-[#2874f0] text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-xl p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          <Link to="/" className="flex flex-col select-none">
            <span className="text-white italic font-extrabold text-xl tracking-wide">
              Flipkart
            </span>
            <span className="text-[10px] text-gray-200 italic -mt-1 flex items-center gap-0.5">
              Explore <span className="text-[#ffe500] font-bold">Plus</span>
              <span className="text-[#ffe500]">✦</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-1">
            <FaShoppingCart className="text-xl" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffe500] text-[#2874f0] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Slide-out Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[52px] bg-black bg-opacity-50 z-50 flex">
          <div className="w-72 bg-white text-gray-800 h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="bg-[#2874f0] p-4 text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                  <FaUser />
                </div>
                <div>
                  <p className="font-bold text-sm">Welcome Guest</p>
                  <p className="text-xs text-blue-100">Login & Shop</p>
                </div>
              </div>

              <div className="py-2 border-b border-gray-100">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaTag className="text-[#2874f0]" /> Top Offers & Deals
                </Link>
                <Link
                  to="/forher"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaBoxOpen className="text-[#2874f0]" /> Women's & Beauty
                </Link>
                <Link
                  to="/forhim"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaBoxOpen className="text-[#2874f0]" /> Men's Grooming & Lifestyle
                </Link>
                <Link
                  to="/under20"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaTag className="text-green-600" /> Under ₹499 Budget Store
                </Link>
                <Link
                  to="/under40"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaTag className="text-green-600" /> Under ₹999 Super Store
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-50"
                >
                  <FaShoppingCart className="text-[#2874f0]" /> My Cart ({totalCartCount})
                </Link>
              </div>

              <div className="py-2">
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                  <FaHeart className="text-red-500" /> My Wishlist
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                  <FaQuestionCircle className="text-[#2874f0]" /> Help Centre
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 text-center">
              Flipkart Clone • 100% Authentic Products
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
