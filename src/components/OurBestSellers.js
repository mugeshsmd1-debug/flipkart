import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { FaStar, FaHeart, FaRegHeart, FaExternalLinkAlt, FaBolt, FaAmazon, FaShoppingBag } from 'react-icons/fa';
import { getProductById } from '../productsStore/ProductService';

const OurBestSellers = (props) => {
  const { title, price, originalPrice: customMRP, id, image } = props;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Retrieve product from props or service
  const productData = getProductById(id);
  const targetLink =
    props.affiliateUrl ||
    props.amazonUrl ||
    props.flipkartUrl ||
    productData?.affiliateUrl ||
    productData?.amazonUrl ||
    productData?.flipkartUrl;

  const platform =
    props.platform ||
    productData?.platform ||
    (targetLink?.toLowerCase().includes('flipkart') ? 'flipkart' : 'amazon');

  // Exact price entered by user
  const formattedPrice = Number(price) || 0;
  const originalPrice = Number(customMRP) || (formattedPrice > 0 ? Math.round(formattedPrice * 1.35) : 0);
  const discountPercent = originalPrice > formattedPrice
    ? Math.round(((originalPrice - formattedPrice) / originalPrice) * 100)
    : 0;

  // DIRECT REDIRECT to Amazon or Flipkart affiliate link
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (targetLink && targetLink.trim()) {
      window.open(targetLink, '_blank', 'noopener,noreferrer,sponsored');
    } else {
      // Fallback: navigate to the product deal landing page
      navigate(`/deal/${id}`);
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);

    toast({
      title: !isWishlisted ? 'Added to Wishlist' : 'Removed from Wishlist',
      status: !isWishlisted ? 'info' : 'warning',
      duration: 1500,
      isClosable: true,
      position: 'bottom-right'
    });
  };

  return (
    <div className="bg-white rounded-sm border border-gray-100 hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between group relative h-full">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 text-gray-300 hover:text-red-500 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
        aria-label="Wishlist"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-base" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500 text-base" />
        )}
      </button>

      {/* Product Image & Link to Landing Page */}
      <Link to={`/deal/${id}`} className="block">
        <div className="w-full h-48 flex items-center justify-center overflow-hidden p-2">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="mt-3">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
            {title}
          </h3>

          {/* Rating & Platform Badge */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
              4.5 <FaStar className="text-[9px]" />
            </span>
            <span className="text-xs text-gray-500 font-medium">(1,250)</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              platform === 'amazon'
                ? 'bg-amber-50 text-amber-900 border border-amber-200'
                : 'bg-blue-50 text-[#2874f0] border border-blue-200'
            }`}>
              {platform === 'amazon' ? 'Amazon Verified' : 'Flipkart Assured'}
            </span>
          </div>

          {/* Price Breakdown */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-bold text-gray-900">
              ₹{formattedPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs line-through text-gray-400">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-green-700">
              {discountPercent}% off
            </span>
          </div>

          <p className="text-[11px] text-gray-500 mt-1">
            Free Express Delivery on <span className="font-semibold text-gray-700">{platform === 'amazon' ? 'Amazon' : 'Flipkart'}</span>
          </p>
        </div>
      </Link>

      {/* Action Buttons: View Deal & Direct Buy Now Redirect */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
        <Link
          to={`/deal/${id}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-2.5 px-2 rounded-sm shadow-sm flex items-center justify-center gap-1 transition-colors uppercase tracking-wider text-center"
        >
          <FaBolt className="text-xs text-amber-500" />
          View Deal
        </Link>

        {targetLink ? (
          <a
            href={targetLink}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`text-white text-xs font-bold py-2.5 px-2 rounded-sm shadow-sm flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider text-center ${
              platform === 'amazon'
                ? 'bg-[#FF9900] hover:bg-[#F08800] !text-gray-900'
                : 'bg-[#fb641b] hover:bg-[#e8560f]'
            }`}
          >
            {platform === 'amazon' ? <FaAmazon className="text-xs" /> : <FaShoppingBag className="text-xs" />}
            <span>Buy Now</span>
            <FaExternalLinkAlt className="text-[9px]" />
          </a>
        ) : (
          <button
            onClick={handleBuyNow}
            className="bg-[#fb641b] hover:bg-[#e8560f] text-white text-xs font-bold py-2.5 px-2 rounded-sm shadow-sm flex items-center justify-center gap-1 transition-colors uppercase tracking-wider"
          >
            <FaBolt className="text-xs" />
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OurBestSellers;
