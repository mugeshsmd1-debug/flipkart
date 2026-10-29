import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
  };

  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop",
      title: "BIG BILLION DEALS",
      subtitle: "Up to 70% Off on Skincare, Beauty & Essentials",
      badge: "LIMITED TIME OFFER",
      link: "/under20"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
      title: "PREMIUM CARE & GROOMING",
      subtitle: "Top Rated Brands with Flipkart Assured Quality",
      badge: "TRENDING NOW",
      link: "/forher"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
      title: "MEGA LIFESTYLE & GIFTS",
      subtitle: "Exclusive Gift Combos Under ₹999",
      badge: "BEST VALUE",
      link: "/forhim"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-3 mb-4">
      <Slider {...settings} className="rounded-sm overflow-hidden shadow-md">
        {banners.map((banner) => (
          <div key={banner.id} className="relative outline-none">
            <Link to={banner.link} className="block relative h-48 sm:h-72 md:h-80 w-full overflow-hidden bg-slate-900 group">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-6 md:px-12 text-white">
                <span className="inline-block bg-[#ffe500] text-[#172337] text-xs font-black tracking-widest px-2.5 py-1 rounded-sm w-fit mb-2">
                  {banner.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-1 text-white drop-shadow">
                  {banner.title}
                </h2>
                <p className="text-sm sm:text-lg text-gray-200 max-w-lg mb-4">
                  {banner.subtitle}
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-[#2874f0] text-white text-xs sm:text-sm font-bold px-5 py-2 rounded-sm shadow-md group-hover:bg-blue-600 transition-colors">
                    Shop Now
                  </span>
                  <span className="text-xs text-yellow-300 font-semibold flex items-center gap-1">
                    ✦ Flipkart Assured
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
