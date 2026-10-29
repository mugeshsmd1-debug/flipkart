import React from "react";
import Slider from "react-slick";
import { getProducts } from "../productsStore/ProductService";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const AutoPlayMethods = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const items = getProducts().filter((item) => item.type === "ourBestSellers" || item.type === "bestSeller");

  if (items.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-sm">
      <Slider {...settings}>
        {items.map((item) => {
          const priceINR = Number(item.price) || 0;
          const origINR = Number(item.originalPrice) || (priceINR > 0 ? Math.round(priceINR * 1.35) : 0);
          return (
            <div key={item.id} className="p-2 outline-none">
              <div className="border border-gray-100 rounded p-3 hover:shadow-lg transition-all group bg-white h-full">
                <Link to={`/${item.id}`} className="block">
                  <div className="w-full h-36 flex items-center justify-center p-2 mb-2">
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
                    <span className="text-[10px] font-semibold text-[#2874f0]">✦ Assured</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-sm font-bold text-gray-900">₹{priceINR}</span>
                    <span className="text-xs line-through text-gray-400">₹{origINR}</span>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default AutoPlayMethods;
