import React from 'react';
import { useSelector } from 'react-redux';
import { FaShieldAlt } from 'react-icons/fa';

const CartTotal = ({ totalPr }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const rawSubtotal = totalPr;
  const originalMRP = Math.round(rawSubtotal * 1.6);
  const totalDiscount = originalMRP - rawSubtotal;

  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          PRICE DETAILS
        </h3>
      </div>

      <div className="p-4 space-y-3.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Price ({totalQuantity} items)</span>
          <span className="font-medium text-gray-900">₹{originalMRP.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Discount</span>
          <span className="font-semibold text-green-700">− ₹{totalDiscount.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Delivery Charges</span>
          <span className="font-semibold text-green-700 flex items-center gap-1.5">
            <span className="line-through text-gray-400 font-normal">₹40</span> FREE
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Secured Packaging Fee</span>
          <span className="font-semibold text-green-700">FREE</span>
        </div>

        <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-base font-bold text-gray-900">
          <span>Total Amount</span>
          <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="pt-2 text-xs font-bold text-green-700 bg-green-50 p-2.5 rounded border border-green-100">
          You will save ₹{totalDiscount.toLocaleString('en-IN')} on this order
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3 text-xs text-gray-500">
        <FaShieldAlt className="text-xl text-gray-400 shrink-0" />
        <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
      </div>
    </div>
  );
};

export default CartTotal;
