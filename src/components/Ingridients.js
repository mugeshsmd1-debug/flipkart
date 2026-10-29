import React from 'react';
import ing1 from "../assets/ing1.png";
import ing2 from "../assets/ing2.png";
import ing3 from "../assets/ing3.png";
import ing4 from "../assets/ing4.png";
import ing5 from "../assets/ing5.png";
import ing6 from "../assets/ing6.png";

const Ingridients = () => {
  const items = [
    { img: ing1, title: 'All Natural', tag: 'Eco Friendly' },
    { img: ing2, title: 'Vegetables', tag: 'Nutrient Rich' },
    { img: ing3, title: 'Fruits', tag: 'Vitamin C' },
    { img: ing4, title: 'Vegan', tag: 'Cruelty Free' },
    { img: ing5, title: 'Essential Oils', tag: 'Pure Extract' },
    { img: ing6, title: 'Botanicals', tag: 'Derm Tested' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-white rounded-sm p-6 border border-gray-200 shadow-sm">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-[#2874f0] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Flipkart Quality Assurance
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            Certified Pure & Natural Formulation
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-xl mx-auto mt-1">
            Every product passes through our strict 5-stage quality check for skin safety and clinical effectiveness.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 hover:bg-blue-50/50 p-4 rounded-sm border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md group"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-bold text-gray-800">{item.title}</h4>
              <span className="text-[11px] text-green-700 font-semibold">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingridients;
