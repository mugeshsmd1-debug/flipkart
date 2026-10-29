import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux-state/CartState';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';

const Cart = ({ item }) => {
  const { id, title, quantity, price, image } = item;
  const dispatch = useDispatch();

  const originalPrice = Math.round(price * 1.6);
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleIncrement = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        price,
        title,
        image,
      })
    );
  };

  const handleDecrement = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <div className="p-4 sm:p-5 border-b border-gray-200 last:border-b-0 flex flex-col sm:flex-row gap-5 items-start">
      {/* Product Image & Quantity Controls */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <Link to={`/${id}`} className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-1 border border-gray-100 rounded">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </Link>

        {/* Quantity Controller */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <FaMinus className="text-[10px]" />
          </button>
          <span className="w-8 text-center text-sm font-bold border border-gray-200 py-0.5 rounded bg-gray-50">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <FaPlus className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* Product Info & Actions */}
      <div className="flex-1 flex flex-col justify-between min-h-[7rem]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link to={`/${id}`} className="text-base font-medium text-gray-800 hover:text-[#2874f0] line-clamp-2">
              {title}
            </Link>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              Delivery by <strong className="text-gray-800">Tomorrow</strong> | <span className="text-green-700 font-bold">FREE</span>
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
            Seller: <span className="text-gray-600 font-medium">Flipkart SuperComNet</span>
            <span className="text-[9px] font-extrabold italic text-[#2874f0] bg-blue-50 border border-blue-200 px-1 rounded">
              ✦ Assured
            </span>
          </p>

          <div className="flex items-baseline gap-2.5 mt-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{(price * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-xs line-through text-gray-400">
              ₹{(originalPrice * quantity).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-green-700">
              {discountPercent}% Off • 2 offers applied
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6 mt-4 pt-2 text-xs font-bold uppercase tracking-wider text-gray-700">
          <button className="hover:text-[#2874f0] transition-colors">
            Save For Later
          </button>
          <button
            onClick={handleDecrement}
            className="hover:text-red-600 flex items-center gap-1 transition-colors"
          >
            <FaTrashAlt className="text-xs" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
