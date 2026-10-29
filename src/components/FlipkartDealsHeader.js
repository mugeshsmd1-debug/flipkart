import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaBolt } from 'react-icons/fa';

const FlipkartDealsHeader = ({ title = "Deals of the Day", viewAllLink = "/under20" }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="bg-white p-4 rounded-t-sm border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <FaBolt className="text-base" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              {title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <FaClock className="text-gray-400" />
              <span>
                {formatNum(timeLeft.hours)} : {formatNum(timeLeft.minutes)} : {formatNum(timeLeft.seconds)} Left
              </span>
            </div>
          </div>
        </div>

        <Link
          to={viewAllLink}
          className="bg-[#2874f0] text-white text-xs md:text-sm font-bold px-5 py-2 rounded-sm shadow-sm hover:bg-blue-600 transition-colors uppercase tracking-wider"
        >
          VIEW ALL
        </Link>
      </div>
    </div>
  );
};

export default FlipkartDealsHeader;
