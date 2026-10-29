import React from 'react';
import { FaShieldAlt, FaTruck, FaUndo, FaLock } from 'react-icons/fa';

const HeroSection = () => {
  const assurances = [
    {
      icon: <FaShieldAlt className="text-2xl text-[#2874f0]" />,
      title: "100% Authentic",
      desc: "Direct from verified brand partners"
    },
    {
      icon: <FaTruck className="text-2xl text-[#2874f0]" />,
      title: "Fast Delivery",
      desc: "Free delivery on orders above ₹499"
    },
    {
      icon: <FaUndo className="text-2xl text-[#2874f0]" />,
      title: "Easy 7-Day Returns",
      desc: "Hassle-free replacement & refund"
    },
    {
      icon: <FaLock className="text-2xl text-[#2874f0]" />,
      title: "Secure Payments",
      desc: "SSL encrypted multi-channel checkout"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-white rounded-sm p-5 border border-gray-200 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-4">
        {assurances.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 border-r last:border-r-0 border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
