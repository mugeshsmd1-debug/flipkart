import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
  FaHeart,
  FaBoxOpen,
  FaGift,
  FaQuestionCircle,
  FaStore
} from 'react-icons/fa';
import { getProducts } from '../productsStore/ProductService';
import '../styles/Navbar.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter products matching search query
  const searchResults = searchQuery.trim() === ''
    ? []
    : getProducts().filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductSelect = (id) => {
    setShowSearchResults(false);
    setSearchQuery('');
    navigate(`/${id}`);
  };

  return (
    <header className="fk-header w-full bg-[#2874f0] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-end select-none shrink-0">
          <div className="flex items-center">
            <span className="text-white italic font-extrabold text-2xl tracking-wide">
              Flipkart
            </span>
          </div>
          <span className="text-[11px] text-gray-200 italic -mt-1 flex items-center gap-0.5 hover:underline font-medium">
            Explore <span className="text-[#ffe500] font-bold">Plus</span>
            <span className="text-[#ffe500] text-xs">✦</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl">
          <div className="flex items-center bg-white rounded-sm shadow-sm overflow-hidden px-4 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search for products, brands and more"
              className="w-full text-sm text-gray-800 placeholder-gray-500 outline-none bg-transparent"
            />
            <FaSearch className="text-[#2874f0] text-base cursor-pointer hover:opacity-80 shrink-0" />
          </div>

          {/* Search Suggestions Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-b shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
              <div className="p-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Products in store
              </div>
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductSelect(item.id)}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="w-10 h-10 object-contain rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      ₹{Number(item.price).toLocaleString('en-IN')}{' '}
                      {item.originalPrice && (
                        <span className="line-through text-gray-400">
                          ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                    Special Offer
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Navigation Elements */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Login Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowLoginMenu(true)}
            onMouseLeave={() => setShowLoginMenu(false)}
          >
            <button className="bg-white text-[#2874f0] font-semibold text-sm px-7 py-1.5 rounded-sm shadow hover:bg-gray-50 transition-colors">
              Login
            </button>

            {showLoginMenu && (
              <div className="absolute top-full -left-10 mt-1 w-64 bg-white text-gray-800 rounded shadow-2xl border border-gray-100 z-50 py-2">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-700">New customer?</span>
                  <span className="text-xs font-bold text-[#2874f0] hover:underline cursor-pointer">
                    Sign Up
                  </span>
                </div>
                <div className="py-1">
                  <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <FaUserCircle className="text-[#2874f0]" /> My Profile
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <span className="text-[#ffe500] font-black">✦</span> Flipkart Plus Zone
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <FaBoxOpen className="text-[#2874f0]" /> Orders
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <FaHeart className="text-[#2874f0]" /> Wishlist
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                    <FaGift className="text-[#2874f0]" /> Rewards
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Become a Seller */}
          <Link
            to="/under40"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-white hover:text-yellow-200 transition-colors whitespace-nowrap"
          >
            <FaStore className="text-sm" />
            Become a Seller
          </Link>

          {/* More Menu */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setShowMoreMenu(true)}
            onMouseLeave={() => setShowMoreMenu(false)}
          >
            <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-yellow-200 transition-colors">
              More <FaChevronDown className="text-[10px] mt-0.5" />
            </button>

            {showMoreMenu && (
              <div className="absolute top-full -right-6 mt-1 w-56 bg-white text-gray-800 rounded shadow-2xl border border-gray-100 z-50 py-2">
                <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  Notification Preferences
                </div>
                <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  <FaQuestionCircle className="text-[#2874f0]" /> 24x7 Customer Care
                </div>
                <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  Advertise
                </div>
                <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                  Download App
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <Link
            to="/cart"
            className="flex items-center gap-2 text-white hover:text-yellow-200 transition-colors font-semibold text-sm"
          >
            <div className="relative">
              <FaShoppingCart className="text-lg" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#ffe500] text-[#2874f0] font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
