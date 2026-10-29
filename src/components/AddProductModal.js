import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct } from '../productsStore/ProductService';
import { useToast } from '@chakra-ui/react';
import { FaPlus, FaTimes, FaAmazon, FaShoppingBag, FaEdit } from 'react-icons/fa';

const AddProductModal = ({ isOpen, onClose, onProductAdded, productToEdit = null }) => {
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

  useEffect(() => {
    if (productToEdit) {
      setPlatform(productToEdit.platform || 'amazon');
      setFormData({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        originalPrice: productToEdit.originalPrice || '',
        category: productToEdit.category || 'Electronics',
        primaryImage: productToEdit.primaryImage || '',
        affiliateUrl: productToEdit.affiliateUrl || productToEdit.amazonUrl || productToEdit.flipkartUrl || '',
        description: productToEdit.description || ''
      });
    } else {
      setPlatform('amazon');
      setFormData({
        name: '',
        price: '',
        originalPrice: '',
        category: 'Electronics',
        primaryImage: '',
        affiliateUrl: '',
        description: ''
      });
    }
  }, [productToEdit, isOpen]);

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

    let saved;
    if (productToEdit) {
      saved = updateProduct(productToEdit.id, {
        ...formData,
        platform,
        price: dealPrice,
        originalPrice: mrp,
        primaryImage: formData.primaryImage.trim() || productToEdit.primaryImage,
      });

      toast({
        title: 'Product Updated!',
        description: 'Changes are now live for all users worldwide.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    } else {
      saved = addProduct({
        ...formData,
        platform,
        price: dealPrice,
        originalPrice: mrp,
        primaryImage: formData.primaryImage.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
        hoverImg: null
      });

      toast({
        title: 'Affiliate Deal Created!',
        description: `Live for all users at /deal/${saved.id}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }

    if (onProductAdded) onProductAdded(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {productToEdit ? <FaEdit className="text-yellow-300" /> : <FaPlus className="text-yellow-300" />}
            <h2 className="font-bold text-base md:text-lg">
              {productToEdit ? 'Edit Affiliate Product' : 'Add New Affiliate Product'}
            </h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Deal Price (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 24990"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Original MRP (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="Optional (defaults to +35%)"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0] bg-white"
              >
                <option value="Electronics">Electronics & Gadgets</option>
                <option value="Mobiles">Mobiles & Tablets</option>
                <option value="Fashion">Fashion & Apparel</option>
                <option value="Home">Home & Kitchen</option>
                <option value="Appliances">Appliances</option>
                <option value="Beauty">Beauty & Personal Care</option>
                <option value="Deals">Lightning Deals</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Product Image URL
              </label>
              <input
                type="url"
                value={formData.primaryImage}
                onChange={(e) => setFormData({ ...formData, primaryImage: e.target.value })}
                placeholder="https://..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 outline-none focus:border-[#2874f0]"
              />
            </div>
          </div>

          {/* Affiliate Store Selector & Link */}
          <div className="p-3 bg-gray-50 border border-gray-200 rounded">
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-gray-800 flex items-center gap-1.5">
                <span>Affiliate Product Link *</span>
              </label>
              {/* Store Pill */}
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setPlatform('amazon')}
                  className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors ${
                    platform === 'amazon'
                      ? 'bg-amber-400 text-black shadow-xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <FaAmazon /> Amazon
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('flipkart')}
                  className={`px-2 py-0.5 rounded font-bold flex items-center gap-1 transition-colors ${
                    platform === 'flipkart'
                      ? 'bg-[#2874f0] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <FaShoppingBag /> Flipkart
                </button>
              </div>
            </div>

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
              {productToEdit ? 'Update Product' : 'Publish Affiliate Deal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
