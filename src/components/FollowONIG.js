import React from 'react';
import Marquee from "react-fast-marquee";
import i1 from "../assets/i1.jpg";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.jpg";
import i4 from "../assets/i4.jpg";
import i5 from "../assets/i5.jpg";
import i6 from "../assets/i6.jpg";
import { FaInstagram, FaStar } from 'react-icons/fa';

const FollowONIG = () => {
  const images = [i1, i2, i3, i4, i5, i6];

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-white rounded-sm p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaInstagram className="text-xl text-[#e1306c]" />
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Flipkart Trendsetters • #FlipkartFinds
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Tagged by 250,000+ Happy Customers
          </span>
        </div>

        <div className="rounded overflow-hidden">
          <Marquee pauseOnHover={true} speed={40}>
            {images.map((img, idx) => (
              <div key={idx} className="mx-3 my-2 w-48 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={img}
                  alt={`Trend ${idx + 1}`}
                  className="w-full h-44 object-cover"
                />
                <div className="p-2.5 bg-white">
                  <div className="flex items-center gap-1 text-[#388e3c] text-xs font-bold">
                    <FaStar className="text-[10px]" /> 5.0 • Verified Buyer
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 truncate">
                    "Absolute game changer! Fast delivery"
                  </p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default FollowONIG;
