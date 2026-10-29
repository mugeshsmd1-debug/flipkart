import React, { useState } from 'react';
import { addProduct } from '../productsStore/ProductService';
import { useToast } from '@chakra-ui/react';
import { FaPlus, FaTimes, FaAmazon, FaShoppingBag } from 'react-icons/fa';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const toast = useToast();
  const [platform, setPlatform] = useState('amazon'); // 'amazon' | 'flipkart'
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    primaryImage: '',
    affiliateUrl: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleLinkChange = (url) => {
    // Auto-detect platform if user pastes Amazon or Flipkart link
    const lower = url.toLowerCase();
    if (lower.includes('flipkart')) {
      setPlatform('flipkart');
    } else if (lower.includes('amazon') || lower.includes('amzn')) {
      setPlatform('amazon');
    }
    setFormData((prev) => ({ ...prev, affiliateUrl: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: 'Product Title is required',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!formData.affiliateUrl.trim()) {
      toast({
        title: 'Affiliate Link is required',
        description: `Please provide your ${platform === 'amazon' ? 'Amazon' : 'Flipkart'} product link.`,
        status: 'warning',
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    const dealPrice = Number(formData.price) || 0;
    const mrp = formData.originalPrice ? Number(formData.originalPrice) : Math.round(dealPrice * 1.35);

    const saved = addProduct({
      ...formData,
      platform,
      price: dealPrice,
      originalPrice: mrp,
      primaryImage: formData.primaryImage.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
      hoverImg: null
    });

    toast({
      title: 'Affiliate Deal Created!',
      description: `Landing page generated at /deal/${saved.id}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top'
    });

    if (onProductAdded) onProductAdded(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <FaPlus className="text-yellow-300" />
            <h2 className="font-bold text-base md:text-lg">Add New Affiliate Product</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-lg p-1"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Deal Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 19990"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="e.g. 29990"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Product Image URL
            </label>
            <input
              type="url"
              value={formData.primaryImage}
              onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
              placeholder="https://m.media-amazon.com/images/I/..."
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Right click any image on Amazon or Flipkart and select "Copy image address".
            </p>
          </div>

          {/* Single Affiliate Store Selection */}
          <div className="pt-2">
            <label className="block font-bold text-gray-700 mb-2">
              Select Affiliate Store *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlatform('amazon')}
                className={`py-2.5 px-4 rounded border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                  platform === 'amazon'
                    ? 'border-[#FF9900] bg-amber-50 text-[#172337] shadow-sm ring-2 ring-amber-300'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <FaAmazon className={platform === 'amazon' ? 'text-[#FF9900] text-base' : 'text-gray-400'} />
                Amazon Link
              </button>

              <button
                type="button"
                onClick={() => setPlatform('flipkart')}
                className={`py-2.5 px-4 rounded border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                  platform === 'flipkart'
                    ? 'border-[#2874f0] bg-blue-50 text-[#2874f0] shadow-sm ring-2 ring-blue-300'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <FaShoppingBag className={platform === 'flipkart' ? 'text-[#2874f0] text-sm' : 'text-gray-400'} />
                Flipkart Link
              </button>
            </div>
          </div>

          {/* Single Affiliate Link Input */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              {platform === 'amazon' ? 'Amazon Affiliate Product Link *' : 'Flipkart Affiliate Product Link *'}
            </label>
            <input
              type="url"
              required
              value={formData.affiliateUrl}
              onChange={(e) => handleLinkChange(e.target.value)}
              placeholder={
                platform === 'amazon'
                  ? 'https://www.amazon.in/dp/.../?tag=yourtag-21'
                  : 'https://www.flipkart.com/.../?affid=yourid'
              }
              className={`w-full border rounded px-3 py-2 text-gray-800 outline-none transition-colors ${
                platform === 'amazon'
                  ? 'border-amber-300 bg-amber-50/20 focus:border-amber-500'
                  : 'border-blue-300 bg-blue-50/20 focus:border-blue-500'
              }`}
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Paste your {platform === 'amazon' ? 'Amazon Associate link' : 'Flipkart Affiliate link'}. Auto-detects store when you paste.
            </p>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Product Highlights / Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Top rated wireless noise cancelling headphones with 30hr battery."
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-[#fb641b] hover:bg-[#e8560f] text-white font-bold shadow-md transition-colors uppercase tracking-wider"
            >
              Publish Affiliate Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
