import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import CartTotal from './CartTotal';
import EmptyCart from './EmptyCart';
import SPFooter from './SPFooter';
import YouMayAlsoLike from './YouMayAlsoLike';
import { FaMapMarkerAlt, FaBolt, FaCheckCircle } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';

const CartHold = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartLen = cartItems.length;
  const [pincode, setPincode] = useState('110001');
  const [isOrdering, setIsOrdering] = useState(false);
  const toast = useToast();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handlePlaceOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      toast({
        title: 'Order Placed Successfully!',
        description: `Order of ₹${totalPrice.toLocaleString('en-IN')} confirmed. Tracking link sent to your registered mobile number.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }, 1000);
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen pt-4">
      {cartLen === 0 ? (
        <EmptyCart />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Delivery address strip & Cart items */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              {/* Deliver To Strip */}
              <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-[#2874f0] text-lg" />
                  <div className="text-xs">
                    <p className="text-gray-500">Deliver to:</p>
                    <p className="font-bold text-gray-800 text-sm">
                      Govind, New Delhi - {pincode}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newPin = prompt('Enter delivery pincode:', pincode);
                    if (newPin) setPincode(newPin);
                  }}
                  className="border border-gray-300 text-[#2874f0] font-bold text-xs px-4 py-2 rounded-sm hover:bg-blue-50 transition-colors uppercase tracking-wider"
                >
                  Change
                </button>
              </div>

              {/* Cart Items List */}
              <div className="bg-white rounded-sm shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-800">
                    Flipkart Cart ({cartLen} {cartLen === 1 ? 'item' : 'items'})
                  </h2>
                  <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                    <FaCheckCircle /> 100% Verified Sellers
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <Cart
                      key={item.id}
                      item={{
                        id: item.id,
                        title: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        image: item.picture,
                      }}
                    />
                  ))}
                </div>

                {/* Place Order Bar */}
                <div className="p-4 bg-white border-t border-gray-200 flex justify-end shadow-inner sticky bottom-0 z-20">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isOrdering}
                    className="bg-[#fb641b] hover:bg-[#e8560f] text-white font-bold text-sm px-10 py-3.5 rounded-sm shadow-md flex items-center gap-2 uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    <FaBolt />
                    {isOrdering ? 'Processing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Price Details */}
            <div className="lg:col-span-4">
              <div className="sticky top-20">
                <CartTotal totalPr={totalPrice} />
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <div className="my-10">
            <div className="bg-white p-4 rounded-t-sm border border-gray-200 border-b-0">
              <h3 className="text-base font-bold text-gray-800">
                Recommended For You
              </h3>
              <p className="text-xs text-gray-500">Based on items in your cart</p>
            </div>
            <div className="bg-white p-4 rounded-b-sm border border-gray-200 shadow-sm">
              <YouMayAlsoLike />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <SPFooter />
    </div>
  );
};

export default CartHold;
