import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../productsStore/ProductService';
import OurBestSellers from './OurBestSellers';
import SPFooter from './SPFooter';
import { FaFilter, FaStar, FaChevronRight } from 'react-icons/fa';

const FlipkartProductList = ({
  pageTitle = "Products Store",
  defaultFilterFn = (item) => item.type && item.type !== 'iGPosts'
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [assuredOnly, setAssuredOnly] = useState(false);

  // Filter base items
  const baseItems = useMemo(() => {
    return getProducts().filter(defaultFilterFn);
  }, [defaultFilterFn]);

  // Apply active filters
  const filteredItems = useMemo(() => {
    let result = baseItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (!item.type || !item.type.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      const priceINR = Number(item.price) || 0;
      if (priceINR > maxPrice) {
        return false;
      }

      return true;
    });

    // Sorting
    if (selectedSort === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'popularity') {
      result.sort((a, b) => (b.id % 5) - (a.id % 5));
    }

    return result;
  }, [baseItems, selectedCategory, maxPrice, selectedSort]);

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-3">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[#2874f0]">Home</Link>
          <FaChevronRight className="text-[9px]" />
          <span className="text-gray-800 font-medium">{pageTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          {/* Left Filters Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-sm shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <FaFilter className="text-[#2874f0] text-xs" /> Filters
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setMaxPrice(2500);
                  setMinRating(0);
                  setAssuredOnly(false);
                }}
                className="text-xs font-bold text-[#2874f0] hover:underline"
              >
                CLEAR ALL
              </button>
            </div>

            {/* Category Filter */}
            <div className="py-4 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Category</h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'bodywash', label: 'Body Wash & Cleansers' },
                  { id: 'bodylotion', label: 'Body Lotions & Creams' },
                  { id: 'bodyscrub', label: 'Body Scrubs & Exfoliators' },
                  { id: 'gift', label: 'Gift Sets & Combos' },
                ].map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer hover:text-[#2874f0]">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="text-[#2874f0] focus:ring-0"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="py-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase">Max Price</h4>
                <span className="text-xs font-bold text-gray-900">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="400"
                max="2500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#2874f0] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>₹400</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Flipkart Assured Filter */}
            <div className="py-4 border-b border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assuredOnly}
                  onChange={(e) => setAssuredOnly(e.target.checked)}
                  className="rounded text-[#2874f0] focus:ring-0"
                />
                <span className="text-xs font-bold italic text-[#2874f0] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  ✦ Flipkart Assured
                </span>
              </label>
            </div>

            {/* Customer Rating */}
            <div className="pt-4">
              <h4 className="text-xs font-bold text-gray-700 uppercase mb-2">Customer Ratings</h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[4, 3].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                    <input
                      type="checkbox"
                      checked={minRating === stars}
                      onChange={() => setMinRating(minRating === stars ? 0 : stars)}
                      className="rounded text-[#2874f0] focus:ring-0"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      {stars} <FaStar className="text-yellow-400 text-xs" /> & above
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 flex flex-col gap-3">
            {/* Sort & Header Bar */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-base font-bold text-gray-900">{pageTitle}</h1>
                <p className="text-xs text-gray-500">
                  (Showing 1 – {filteredItems.length} products of {filteredItems.length} products)
                </p>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-gray-700">Sort By:</span>
                {[
                  { id: 'relevance', label: 'Relevance' },
                  { id: 'popularity', label: 'Popularity' },
                  { id: 'lowToHigh', label: 'Price -- Low to High' },
                  { id: 'highToLow', label: 'Price -- High to Low' },
                ].map((sortOption) => (
                  <button
                    key={sortOption.id}
                    onClick={() => setSelectedSort(sortOption.id)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      selectedSort === sortOption.id
                        ? 'font-bold text-[#2874f0] border-b-2 border-[#2874f0]'
                        : 'text-gray-600 hover:text-[#2874f0]'
                    }`}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-gray-200">
                <p className="text-base font-semibold text-gray-700">No products found matching your filters</p>
                <p className="text-xs text-gray-400 mt-1">Try resetting or adjusting the price/category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredItems.map((item) => (
                  <OurBestSellers
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    image={item.primaryImage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SPFooter />
    </div>
  );
};

export default FlipkartProductList;
