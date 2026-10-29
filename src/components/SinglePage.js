import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getProductById } from '../productsStore/ProductService';
import { useToast } from '@chakra-ui/react';
import { getAffiliateLinks } from '../utils/affiliateHelper';
import {
  FaStar,
  FaBolt,
  FaTag,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCheckCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';
import AutoPlayMethods from './SingleAlsoLike';
import SinglePageFAQ from './SinglePageFAQ';
import SPFooter from './SPFooter';

const SinglePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [prodClicked, setProdClicked] = useState(() => getProductById(id));
  const [loading, setLoading] = useState(!prodClicked);
  const [activeImg, setActiveImg] = useState(prodClicked?.primaryImage || '');
  const [pincode, setPincode] = useState('110001');

  useEffect(() => {
    const checkProduct = () => {
      const p = getProductById(id);
      if (p) {
        setProdClicked(p);
        setActiveImg((prev) => prev || p.primaryImage);
        setLoading(false);
      }
    };

    checkProduct();
    window.addEventListener('affiliate_products_changed', checkProduct);
    const timeout = setTimeout(() => setLoading(false), 2000);

    return () => {
      window.removeEventListener('affiliate_products_changed', checkProduct);
      clearTimeout(timeout);
    };
  }, [id]);

  const { amazonUrl, flipkartUrl } = getAffiliateLinks(prodClicked, searchParams);

  if (loading && !prodClicked) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen py-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2874f0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!prodClicked) {
    return (
      <div className="bg-[#f1f3f6] min-h-screen py-16">
        <div className="max-w-xl mx-auto px-4 text-center bg-white p-10 rounded shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
          <p className="text-xs text-gray-500 mt-2">
            No products match this ID. Add your products in <code className="text-[#2874f0]">src/productsStore/Store.js</code> to preview them.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-[#2874f0] text-white text-xs font-bold px-6 py-2.5 rounded shadow uppercase"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { name, price, originalPrice: customMRP, primaryImage, hoverImg } = prodClicked;

  // Use the exact price entered by user (no multiplication)
  const formattedPrice = Number(price) || 0;
  const originalPrice = Number(customMRP) || (formattedPrice > 0 ? Math.round(formattedPrice * 1.35) : 0);
  const discountPercent = originalPrice > formattedPrice
    ? Math.round(((originalPrice - formattedPrice) / originalPrice) * 100)
    : 0;

  // Only use actual product images provided, remove all dummy asset images
  const thumbnails = [primaryImage, hoverImg]
    .filter(Boolean)
    .filter((img, idx, arr) => arr.indexOf(img) === idx);

  const targetAffiliateLink =
    prodClicked.affiliateUrl ||
    prodClicked.amazonUrl ||
    prodClicked.flipkartUrl ||
    (prodClicked.platform === 'flipkart' ? flipkartUrl : amazonUrl);

  const handleBuyNow = (e) => {
    if (e) e.preventDefault();
    if (targetAffiliateLink) {
      window.open(targetAffiliateLink, '_blank', 'noopener,noreferrer,sponsored');
    } else {
      navigate(`/deal/${id}`);
    }
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-[#2874f0]">Home</Link>
          <span>&gt;</span>
          <Link to="/under20" className="hover:text-[#2874f0]">Personal Care</Link>
          <span>&gt;</span>
          <Link to="/under40" className="hover:text-[#2874f0]">Skincare Essentials</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{name}</span>
        </div>

        {/* Product Details Main Card */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Images & Action Buttons */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex flex-col-reverse sm:flex-row gap-4 items-center">
              {/* Thumbnail Strip - only show if multiple genuine images exist */}
              {thumbnails.length > 1 && (
                <div className="flex sm:flex-col gap-2 overflow-x-auto">
                  {thumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveImg(thumb)}
                      onClick={() => setActiveImg(thumb)}
                      className={`w-16 h-16 border rounded cursor-pointer overflow-hidden p-1 transition-all ${
                        activeImg === thumb ? 'border-[#2874f0] ring-1 ring-[#2874f0]' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Main Product Image */}
              <div className="flex-1 w-full h-80 sm:h-96 border border-gray-100 rounded flex items-center justify-center p-4 relative group">
                <img
                  src={activeImg}
                  alt={name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  Hover to zoom
                </span>
              </div>
            </div>

            {/* Action Buttons: View Deal & Direct Buy Now Redirect */}
            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <Link
                to={`/deal/${id}`}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-sm shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors text-center"
              >
                <FaBolt className="text-base text-amber-500" />
                View Deal
              </Link>

              <button
                onClick={handleBuyNow}
                className={`font-bold py-3 px-4 rounded-sm shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors text-white ${
                  prodClicked.platform === 'flipkart' ? 'bg-[#fb641b] hover:bg-[#e8560f]' : 'bg-[#FF9900] hover:bg-[#F08800] !text-gray-900'
                }`}
              >
                <FaExternalLinkAlt className="text-xs" />
                {prodClicked.platform === 'flipkart' ? 'Buy on Flipkart' : 'Buy on Amazon'}
              </button>
            </div>

            {/* External Affiliate Purchase Options */}
            <div className="w-full flex flex-col gap-2.5 mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Buy directly with partner discount:</span>
                <Link to={`/deal/${id}`} className="text-[#2874f0] hover:underline font-bold">
                  ⚡ Deal Landing Page
                </Link>
              </div>

              <a
                href={amazonUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full bg-[#FF9900] hover:bg-[#F08800] text-gray-900 font-bold py-2.5 px-3 rounded-sm shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors text-center"
              >
                <span>Buy on Amazon</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>

              <a
                href={flipkartUrl}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-bold py-2.5 px-3 rounded-sm shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-colors text-center"
              >
                <span>Buy on Flipkart</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>

          {/* Right Column: Title, Price, Offers, Specifications */}
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
              {name}
            </h1>

            {/* Ratings & Flipkart Assured */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                4.4 <FaStar className="text-[10px]" />
              </span>
              <span className="text-sm font-semibold text-gray-500">
                18,490 Ratings & 2,120 Reviews
              </span>
              <span className="text-xs font-extrabold italic text-[#2874f0] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                ✦ Assured
              </span>
            </div>

            {/* Pricing Section */}
            <div className="mt-4 p-3 bg-gray-50 rounded-sm border border-gray-100">
              <span className="text-xs font-bold text-green-700 uppercase">Special Price</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-extrabold text-gray-900">
                  ₹{formattedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-base line-through text-gray-400">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-base font-bold text-green-700">
                  {discountPercent}% off
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Inclusive of all taxes • Free delivery on orders above ₹499
              </p>
            </div>

            {/* Available Offers */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Available Offers</h3>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-start gap-2">
                  <FaTag className="text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-gray-900">Bank Offer:</strong> 10% instant discount on ICICI & HDFC Bank Cards up to ₹1,500. <span className="text-[#2874f0] font-semibold cursor-pointer">T&C</span>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <FaTag className="text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-gray-900">Special Price:</strong> Get extra 15% off (discount inclusive of coupons). <span className="text-[#2874f0] font-semibold cursor-pointer">T&C</span>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <FaTag className="text-green-600 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-gray-900">Partner Offer:</strong> Sign up for Flipkart Pay Later and receive ₹250 welcome cashback. <span className="text-[#2874f0] font-semibold cursor-pointer">View Details</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-400" /> Deliver to
                </span>
                <div className="flex items-center border-b-2 border-[#2874f0] pb-1">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-24 text-sm font-bold text-gray-800 outline-none bg-transparent"
                    placeholder="Enter pincode"
                  />
                  <button
                    onClick={() => {
                      if (pincode) {
                        toast({
                          title: 'Pincode Serviceable',
                          description: `Delivery available at ${pincode} by tomorrow.`,
                          status: 'success',
                          duration: 2000,
                          isClosable: true,
                          position: 'bottom-right'
                        });
                      }
                    }}
                    className="text-xs font-bold text-[#2874f0] hover:text-blue-700 uppercase"
                  >
                    Check
                  </button>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-700 flex items-center gap-2">
                <FaTruck className="text-green-600" />
                <span>
                  Delivery by <strong className="text-gray-900">Tomorrow, 11 PM</strong> | <span className="text-green-700 font-bold">FREE</span> <span className="line-through text-gray-400">₹40</span>
                </span>
              </div>
            </div>

            {/* Product Highlights */}
            <div className="mt-6 pt-5 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Highlights</h4>
                <ul className="space-y-1.5 text-gray-600 list-disc list-inside">
                  <li>Organic & Dermatologically Tested</li>
                  <li>Suitable for Sensitive & Combination Skin</li>
                  <li>Natural Essential Oils & Botanicals</li>
                  <li>Paraben & Sulphate Free</li>
                  <li>100% Vegan & Cruelty Free</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Services</h4>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaUndo className="text-[#2874f0]" /> 7 Days Replacement Policy
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-[#2874f0]" /> 100% Authentic Products
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" /> Cash on Delivery Available
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Specifications</h3>
              <div className="border border-gray-200 rounded text-xs divide-y divide-gray-100">
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-gray-500 font-medium">In The Box</span>
                  <span className="col-span-2 text-gray-800 font-semibold">1 Unit of {name}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-gray-500 font-medium">Brand</span>
                  <span className="col-span-2 text-gray-800 font-semibold">Natural Essentials</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-gray-500 font-medium">Quantity</span>
                  <span className="col-span-2 text-gray-800 font-semibold">125 ml / 4.23 fl oz</span>
                </div>
                <div className="grid grid-cols-3 p-2.5">
                  <span className="text-gray-500 font-medium">Country of Origin</span>
                  <span className="col-span-2 text-gray-800 font-semibold">India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like / Similar Products Section */}
        <div className="my-8">
          <div className="bg-white rounded-sm p-4 border border-gray-200 shadow-sm mb-4">
            <h2 className="text-lg font-bold text-gray-900">Similar Products You May Like</h2>
            <p className="text-xs text-gray-500">Based on your browsing preference</p>
          </div>
          <AutoPlayMethods />
        </div>

        {/* FAQ Section */}
        <div className="my-8">
          <SinglePageFAQ />
        </div>
      </div>

      {/* Footer */}
      <SPFooter />
    </div>
  );
};

export default SinglePage;
