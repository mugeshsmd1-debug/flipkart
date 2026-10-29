import React from 'react';
import { Link } from 'react-router-dom';
import hair from "../assets/hair.jpeg";
import SPFooter from './SPFooter';
import { FaChevronRight, FaClock, FaUser, FaShareAlt } from 'react-icons/fa';

const JournalPage = () => {
  return (
    <div className="bg-[#f1f3f6] min-h-screen py-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
          <Link to="/" className="hover:text-[#2874f0]">Home</Link>
          <FaChevronRight className="text-[9px]" />
          <Link to="/" className="hover:text-[#2874f0]">Flipkart Stories</Link>
          <FaChevronRight className="text-[9px]" />
          <span className="text-gray-800 font-medium truncate">Protective Haircare Styles & Tips</span>
        </div>

        {/* Article Container */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 md:p-10">
          <div className="mb-4">
            <span className="bg-blue-50 text-[#2874f0] text-xs font-bold px-2.5 py-1 rounded">
              WELLNESS & BEAUTY GUIDE
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 leading-snug">
              Protective Haircare Styles & Dermatologist-Approved Tips
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500 mt-3 pb-4 border-b border-gray-100 flex-wrap">
              <span className="flex items-center gap-1.5">
                <FaUser className="text-[#2874f0]" /> Dr. Ananya Sharma (Beauty Editorial)
              </span>
              <span className="flex items-center gap-1.5">
                <FaClock className="text-gray-400" /> 4 Min Read • Updated Recently
              </span>
              <span className="flex items-center gap-1.5 text-[#2874f0] font-semibold cursor-pointer hover:underline">
                <FaShareAlt /> Share Article
              </span>
            </div>
          </div>

          <div className="my-6 rounded overflow-hidden max-h-96">
            <img src={hair} alt="Haircare Guide" className="w-full h-full object-cover" />
          </div>

          <div className="text-gray-700 leading-relaxed space-y-5 text-sm md:text-base">
            <p>
              Cleansing your hair deeply to remove years of build up from harsh products, pollutants, dirt, and oils is the foundational step toward achieving luscious locks. Formulated with Apple Cider Vinegar, Australian River Mint, and sustainably-sourced botanicals, natural scalp therapy leaves hair rejuvenated.
            </p>

            <div className="bg-blue-50/60 p-4 rounded-sm border-l-4 border-[#2874f0]">
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                1. Avoid High-Heating Tools
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Heat exposure over 300°F converts alpha-keratin to beta-keratin, leading to weakened hair that loses elasticity. Try utilizing heatless silk rollers or protective braids to create natural waves without thermal stress.
              </p>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-sm border-l-4 border-[#2874f0]">
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                2. Scalp Health & Nourishing Massage
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Weekly scalp stimulation using antioxidant-rich hair oils boosts micro-circulation to hair follicles. Part your hair evenly, massage with circular motions for 5 minutes, and wrap with a warm micro-fiber towel.
              </p>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-sm border-l-4 border-[#2874f0]">
              <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                3. Silk Pillowcases for Zero Friction
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Switching to smooth silk or satin pillowcases prevents hair breakage, tangles, and frizz overnight while helping your skin retain hydration.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/under20"
              className="bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs px-6 py-2.5 rounded-sm transition-colors uppercase tracking-wider shadow-sm"
            >
              Shop Recommended Haircare Products
            </Link>
            <Link to="/" className="text-xs font-semibold text-gray-600 hover:text-[#2874f0]">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <SPFooter />
    </div>
  );
};

export default JournalPage;
