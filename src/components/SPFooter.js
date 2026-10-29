import React, { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';
import {
  FaStore,
  FaBullhorn,
  FaGift,
  FaQuestionCircle,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLock
} from 'react-icons/fa';

const SPFooter = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <footer className="bg-[#172337] text-white text-xs pt-10 pb-6 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-10 border-b border-gray-700">
          <div>
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              ABOUT
            </h4>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:underline cursor-pointer">Contact Us</li>
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Flipkart Stories</li>
              <li className="hover:underline cursor-pointer">Press</li>
              <li className="hover:underline cursor-pointer">Corporate Information</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              HELP
            </h4>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:underline cursor-pointer">Payments</li>
              <li className="hover:underline cursor-pointer">Shipping</li>
              <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
              <li className="hover:underline cursor-pointer">FAQ</li>
              <li className="hover:underline cursor-pointer">Report Infringement</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              CONSUMER POLICY
            </h4>
            <ul className="space-y-2 text-gray-200">
              <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
              <li className="hover:underline cursor-pointer">Terms Of Use</li>
              <li className="hover:underline cursor-pointer">Security</li>
              <li className="hover:underline cursor-pointer">Privacy</li>
              <li className="hover:underline cursor-pointer">Sitemap</li>
              <li className="hover:underline cursor-pointer">Grievance Redressal</li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              SOCIAL
            </h4>
            <div className="flex items-center gap-3 text-lg text-gray-300 mt-2">
              <FaFacebook className="hover:text-blue-500 cursor-pointer transition-colors" />
              <FaTwitter className="hover:text-sky-400 cursor-pointer transition-colors" />
              <FaYoutube className="hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-gray-700 md:pl-6 col-span-2 md:col-span-1">
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              Mail Us:
            </h4>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India
            </p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-gray-400 font-bold mb-3 uppercase tracking-wider text-[11px]">
              Registered Office:
            </h4>
            <p className="text-gray-300 leading-relaxed text-[11px]">
              Flipkart Internet Private Limited,<br />
              CIN : U51109KA2012PTC066107<br />
              Telephone: 044-45614700 / 044-67415800
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-gray-300 text-[11px]">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-yellow-400 cursor-pointer">
              <FaStore className="text-yellow-400" />
              <span>Become a Seller</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-yellow-400 cursor-pointer">
              <FaBullhorn className="text-yellow-400" />
              <span>Advertise</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-yellow-400 cursor-pointer">
              <FaGift className="text-yellow-400" />
              <span>Gift Cards</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-yellow-400 cursor-pointer">
              <FaQuestionCircle className="text-yellow-400" />
              <span>Help Center</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>© 2007-2026 Flipkart.com</span>
            <span
              onClick={() => setIsAdminModalOpen(true)}
              className="text-gray-400 hover:text-yellow-400 cursor-pointer flex items-center gap-1 transition-colors"
              title="Admin Portal"
            >
              <FaLock className="text-[10px]" /> Store Owner
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-semibold text-white">Payment Methods:</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-200">VISA</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-200">MasterCard</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-200">RuPay</span>
            <span className="bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-200">UPI / COD</span>
          </div>
        </div>
      </div>

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </footer>
  );
};

export default SPFooter;
