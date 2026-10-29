import React from "react";
import { getProducts } from "../productsStore/ProductService";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { FaStar } from "react-icons/fa";

const YouMayAlsoLike = () => {
  const items = getProducts().filter((item) => item.type === "ourBestSellers" || item.type === "bestSeller");

  if (items.length === 0) return null;

  return (
    <div className="py-2">
      <Marquee pauseOnHover={true} speed={50}>
        {items.map((item) => {
          const priceINR = Number(item.price) || 0;
          const origINR = Number(item.originalPrice) || (priceINR > 0 ? Math.round(priceINR * 1.35) : 0);
          return (
            <div key={item.id} className="mx-2 w-44 bg-white p-3 rounded border border-gray-100 hover:shadow-lg transition-all group">
              <Link to={`/${item.id}`} className="block">
                <div className="w-full h-32 flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-xs font-semibold text-gray-800 truncate group-hover:text-[#2874f0]">
                  {item.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="bg-[#388e3c] text-white text-[10px] font-bold px-1 rounded-sm flex items-center gap-0.5">
                    4.3 <FaStar className="text-[8px]" />
                  </span>
                  <span className="text-[10px] text-gray-400">✦ Assured</span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="text-xs font-bold text-gray-900">₹{priceINR}</span>
                  <span className="text-[10px] line-through text-gray-400">₹{origINR}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default YouMayAlsoLike;
