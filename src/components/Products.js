import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct, clearAllProducts } from '../productsStore/ProductService';
import { isAdminLoggedIn } from '../utils/adminAuth';
import OurBestSellers from './OurBestSellers';
import AddProductModal from './AddProductModal';
import AdminLoginModal from './AdminLoginModal';
import { FaPlus, FaTrash, FaBoxOpen, FaBolt, FaLock, FaUnlock, FaShieldAlt } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';

const Products = () => {
  const [products, setProducts] = useState(getProducts());
  const [isAdmin, setIsAdmin] = useState(isAdminLoggedIn());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleProductUpdate = () => {
      setProducts(getProducts());
    };
    const handleAuthUpdate = () => {
      setIsAdmin(isAdminLoggedIn());
    };

    window.addEventListener('affiliate_products_changed', handleProductUpdate);
    window.addEventListener('admin_auth_changed', handleAuthUpdate);
    return () => {
      window.removeEventListener('affiliate_products_changed', handleProductUpdate);
      window.removeEventListener('admin_auth_changed', handleAuthUpdate);
    };
  }, []);

  const handleClearAll = () => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete all products to start completely fresh?')) {
      clearAllProducts();
      setProducts([]);
      toast({
        title: 'All products removed',
        description: 'You are now starting with a completely clean slate.',
        status: 'info',
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const handleDeleteOne = (id, name) => {
    if (!isAdmin) return;
    deleteProduct(id);
    toast({
      title: 'Product Deleted',
      description: `${name} has been removed.`,
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
      {/* Top Header */}
      <div className="bg-white p-4 rounded-t-sm border border-gray-200 border-b-0 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center font-bold">
            <FaBolt />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Top Affiliate Deals
              </h2>
              {isAdmin && (
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded flex items-center gap-1 border border-green-200">
                  <FaShieldAlt className="text-green-600" /> Admin Mode
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {products.length} {products.length === 1 ? 'deal available' : 'deals available'} • Handpicked verified discounts
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Admin Lock / Unlock Toggle Button */}
          <button
            onClick={() => setIsAdminModalOpen(true)}
            className={`p-2 rounded text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isAdmin
                ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                : 'text-gray-400 hover:text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            title={isAdmin ? 'Admin settings (Logged in)' : 'Admin login to add products'}
          >
            {isAdmin ? <FaUnlock className="text-xs" /> : <FaLock className="text-xs" />}
            <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Owner Access'}</span>
          </button>

          {/* Controls ONLY visible to Authenticated Admin */}
          {isAdmin && (
            <>
              {products.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold px-3 py-2 rounded flex items-center gap-1.5 transition-colors"
                >
                  <FaTrash className="text-xs" /> Delete All
                </button>
              )}

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs md:text-sm font-bold px-4 py-2 rounded shadow-sm flex items-center gap-1.5 transition-colors uppercase tracking-wider"
              >
                <FaPlus /> Add Affiliate Product
              </button>
            </>
          )}
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-b-sm">
        {products.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-[#2874f0] text-3xl mb-4">
              <FaBoxOpen />
            </div>

            {isAdmin ? (
              <>
                <h3 className="text-xl font-bold text-gray-900">Your Store is Ready!</h3>
                <p className="text-sm text-gray-500 max-w-md mt-2 leading-relaxed">
                  You are in <strong>Admin Mode</strong>. Only you can add products to this website. Click below to add your first Amazon or Flipkart affiliate product.
                </p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-6 bg-[#fb641b] hover:bg-[#e8560f] text-white font-bold text-sm px-8 py-3 rounded shadow-md flex items-center gap-2 uppercase tracking-wider transition-transform hover:scale-105"
                >
                  <FaPlus /> Add Your First Product
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">Exciting Deals Coming Soon!</h3>
                <p className="text-sm text-gray-500 max-w-md mt-2 leading-relaxed">
                  We are curating the best discounted products from Amazon and Flipkart. Please check back shortly for lightning deals!
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((item) => (
              <div key={item.id} className="relative group">
                <OurBestSellers
                  id={item.id}
                  title={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  image={item.primaryImage}
                />
                {/* Trash icon ONLY visible to Admin */}
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteOne(item.id, item.name)}
                    className="absolute top-2 left-2 z-20 bg-red-600 text-white text-[10px] p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-opacity shadow"
                    title="Delete product"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal (Admin only) */}
      {isAdmin && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProductAdded={() => {
            setProducts(getProducts());
          }}
        />
      )}

      {/* Admin Login & Password Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default Products;
