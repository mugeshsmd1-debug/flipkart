import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { getProductById } from '../productsStore/ProductService';
import { getAffiliateLinks } from '../utils/affiliateHelper';
import { isAdminLoggedIn } from '../utils/adminAuth';
import {
  FaStar,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaBolt,
  FaClock,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaShareAlt,
  FaCopy,
  FaCheck
} from 'react-icons/fa';
import SPFooter from './SPFooter';

const AffiliateLandingPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  // Find product by id from dynamic store
  const product = getProductById(id);

  const [activeImage, setActiveImage] = useState(product?.primaryImage || '');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customAmzTag, setCustomAmzTag] = useState(searchParams.get('tag') || 'dealfinder-21');
  const [customFkId, setCustomFkId] = useState(searchParams.get('affid') || 'dealfinder');

  // Countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen py-16">
        <div className="max-w-xl mx-auto px-4 text-center bg-white p-10 rounded shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Affiliate Deal Not Found</h2>
          <p className="text-xs text-gray-500 mt-2">
            No product is linked to ID <strong>{id}</strong>. Add your affiliate products into <code className="text-[#2874f0]">src/productsStore/Store.js</code> to generate deal landing pages.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-[#2874f0] text-white text-xs font-bold px-6 py-2.5 rounded shadow uppercase"
          >
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const { name, price, originalPrice: customMRP, primaryImage, hoverImg } = product;

  // Use the exact price entered by user (no multiplication)
  const formattedPrice = Number(price) || 0;
  const originalPrice = Number(customMRP) || (formattedPrice > 0 ? Math.round(formattedPrice * 1.35) : 0);
  const discountPercent = originalPrice > formattedPrice
    ? Math.round(((originalPrice - formattedPrice) / originalPrice) * 100)
    : 0;

  // Affiliate URLs
  const { amazonUrl, flipkartUrl } = getAffiliateLinks(product, searchParams);

  // Shareable Landing Page URL
  const currentLandingUrl = `${window.location.origin}/deal/${product.id}?tag=${customAmzTag}&affid=${customFkId}`;

  const copyShareableLink = () => {
    navigator.clipboard.writeText(currentLandingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Only use actual product images provided, remove all dummy asset images
  const thumbnails = [primaryImage, hoverImg]
    .filter(Boolean)
    .filter((img, idx, arr) => arr.indexOf(img) === idx);

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      {/* Top Affiliate Transparency Notice */}
      <div className="bg-slate-900 text-gray-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800">
        <span className="font-semibold text-yellow-400">Affiliate Disclosure:</span> When you click our partner links to Amazon or Flipkart, we may earn an affiliate commission at no extra cost to you.
      </div>

      {/* Urgency Deal Ribbon */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white py-2.5 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs md:text-sm font-bold">
          <div className="flex items-center gap-2">
            <FaBolt className="text-yellow-300 animate-pulse text-base" />
            <span>LIGHTNING DEAL: {discountPercent}% OFF APPLIED</span>
          </div>
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded">
            <FaClock className="text-yellow-300" />
            <span>
              Deal Ends In:{' '}
              <span className="font-mono text-yellow-200">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Main Product Affiliate Card */}
        <div className="bg-white rounded-md shadow-md border border-gray-200 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full h-80 sm:h-96 border border-gray-100 rounded-md p-4 flex items-center justify-center relative bg-white">
              <span className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow">
                {discountPercent}% OFF
              </span>
              <img
                src={activeImage}
                alt={name}
                className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Thumbnail Selection - only show if multiple genuine images exist */}
            {thumbnails.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {thumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(thumb)}
                    onMouseEnter={() => setActiveImage(thumb)}
                    className={`w-16 h-16 border rounded p-1 cursor-pointer transition-all ${
                      activeImage === thumb
                        ? 'border-[#2874f0] ring-2 ring-blue-100'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Trust Badges Under Image */}
            <div className="grid grid-cols-3 gap-2 w-full mt-6 text-center text-[11px] text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-green-600 text-base mb-1" />
                <span className="font-semibold">100% Genuine</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTruck className="text-[#2874f0] text-base mb-1" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUndo className="text-orange-500 text-base mb-1" />
                <span className="font-semibold">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Price Comparison & External CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#2874f0] bg-blue-50 px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                Top Rated Choice
              </span>

              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2 leading-snug">
                {name}
              </h1>

              {/* Rating & Social Proof */}
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  4.5 <FaStar className="text-[10px]" />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  3,150+ Verified Buyer Reviews
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  ⚡ Only 4 left in stock
                </span>
              </div>

              {/* Price Display */}
              <div className="mt-5 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    ₹{formattedPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg line-through text-gray-400">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg font-bold text-green-700">
                    Save ₹{(originalPrice - formattedPrice).toLocaleString('en-IN')} ({discountPercent}% OFF)
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                  <FaCheckCircle className="text-green-600" />
                  Inclusive of all taxes • Eligible for FREE Shipping on Amazon & Flipkart
                </p>
              </div>

              {/* Platform Purchase Call-to-Action */}
              <div className="mt-5 space-y-3">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  Verified Partner Purchase
                </h3>

                {/* Show Amazon Button if product is for Amazon */}
                {(!product.platform || product.platform === 'amazon') && (
                  <div className="p-4 border-2 border-amber-300 rounded-md bg-amber-50/50 hover:bg-amber-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#232F3E] text-white font-black text-xs px-2.5 py-1 rounded tracking-wider">
                          amazon
                        </span>
                        <span className="text-xs font-semibold text-gray-700">
                          Fulfilled by Amazon • Prime Fast Delivery
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">
                        ₹{formattedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <a
                      href={product.affiliateUrl || amazonUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="w-full bg-[#FF9900] hover:bg-[#F08800] text-gray-900 font-extrabold text-sm md:text-base py-3.5 px-6 rounded-md shadow flex items-center justify-center gap-2 transition-transform transform active:scale-[0.99] uppercase tracking-wider text-center"
                    >
                      <span>BUY NOW ON AMAZON</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                )}

                {/* Show Flipkart Button if product is for Flipkart */}
                {product.platform === 'flipkart' && (
                  <div className="p-4 border-2 border-blue-200 rounded-md bg-blue-50/40 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#2874f0] text-white font-extrabold text-xs px-2.5 py-1 rounded italic tracking-wide">
                          Flipkart ✦
                        </span>
                        <span className="text-xs font-semibold text-gray-700">
                          Flipkart Assured • Express Free Delivery
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">
                        ₹{formattedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <a
                      href={product.affiliateUrl || flipkartUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="w-full bg-[#fb641b] hover:bg-[#e8560f] text-white font-extrabold text-sm md:text-base py-3.5 px-6 rounded-md shadow flex items-center justify-center gap-2 transition-transform transform active:scale-[0.99] uppercase tracking-wider text-center"
                    >
                      <span>BUY NOW ON FLIPKART</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                )}
              </div>

              {/* Highlights & Guarantees */}
              <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  <span><strong>Safe Checkout:</strong> Transactions are processed directly by Amazon or Flipkart.</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  <span><strong>Buyer Protection:</strong> Covered by standard Amazon A-to-z Guarantee and Flipkart Buyer Assurance.</span>
                </div>
              </div>
            </div>

            {/* Back to Store Link */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link to={`/product/${product.id}`} className="text-[#2874f0] font-bold hover:underline">
                &larr; View Details
              </Link>
              {isAdminLoggedIn() && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-gray-400 hover:text-gray-600 underline font-medium"
                >
                  {showSettings ? 'Hide Affiliate Settings' : 'Affiliate Link Tool (Admin)'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Affiliate Link Generator Tool for the Store Owner (Admin Only) */}
        {isAdminLoggedIn() && showSettings && (
          <div className="mt-6 bg-slate-900 text-white rounded-md p-6 shadow-lg border border-slate-700">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm flex items-center gap-2 text-yellow-400">
                <FaShareAlt /> Affiliate Link Generator & Share Tool
              </h3>
              <span className="text-xs text-gray-400">Share this page with your affiliate tracking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Your Amazon Associate Tag:
                </label>
                <input
                  type="text"
                  value={customAmzTag}
                  onChange={(e) => setCustomAmzTag(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-white outline-none focus:border-yellow-400"
                  placeholder="e.g. yourtag-21"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Your Flipkart Affiliate ID:
                </label>
                <input
                  type="text"
                  value={customFkId}
                  onChange={(e) => setCustomFkId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-400"
                  placeholder="e.g. yourflipkartid"
                />
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-gray-300 truncate w-full sm:w-auto flex-1 font-mono">
                {currentLandingUrl}
              </div>
              <button
                onClick={copyShareableLink}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs px-5 py-2.5 rounded flex items-center gap-2 shrink-0 transition-colors"
              >
                {copied ? <FaCheck className="text-green-800" /> : <FaCopy />}
                {copied ? 'Copied Link!' : 'Copy Shareable Link'}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Share this exact URL with your audience. When they open it, clicking "BUY NOW" redirects them to Amazon or Flipkart with your affiliate tag attached!
            </p>
          </div>
        )}

        {/* Product Specifications & Feature Breakdown */}
        <div className="mt-8 bg-white rounded-md shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Why Buy {name}?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="p-4 bg-gray-50 rounded border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Dermatologist Verified</h3>
              <p className="text-xs text-gray-600">
                Formulated with organic botanicals and zero parabens, clinically safe for all sensitive skin types.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Verified Authenticity</h3>
              <p className="text-xs text-gray-600">
                Directly sourced from manufacturer-approved sellers on Amazon and Flipkart Assured warehouses.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-1">Lowest Online Price</h3>
              <p className="text-xs text-gray-600">
                Real-time price monitoring ensures you always lock in maximum available discounts and cashback.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SPFooter />
    </div>
  );
};

export default AffiliateLandingPage;
