import React, { useState } from 'react';
import { loginAdmin, setAdminPassword, isAdminLoggedIn, logoutAdmin } from '../utils/adminAuth';
import { useToast } from '@chakra-ui/react';
import { FaLock, FaTimes, FaKey, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';

const AdminLoginModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showChangePass, setShowChangePass] = useState(false);
  const toast = useToast();
  const isLoggedIn = isAdminLoggedIn();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      toast({
        title: 'Admin Access Granted',
        description: 'You can now add and manage affiliate products.',
        status: 'success',
        duration: 2500,
        isClosable: true,
        position: 'top'
      });
      setPassword('');
      onClose();
    } else {
      toast({
        title: 'Incorrect Password',
        description: 'Please enter the correct admin password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    toast({
      title: 'Logged Out',
      description: 'Public visitor mode active.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (setAdminPassword(newPassword)) {
      toast({
        title: 'Password Updated',
        description: 'Your new admin password has been saved.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
      setNewPassword('');
      setShowChangePass(false);
    } else {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 4 characters.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
        <div className="bg-[#172337] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-yellow-400" />
            <h3 className="font-bold text-sm md:text-base">Admin Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                  AUTHORIZED
                </span>
                <p className="text-sm font-bold text-gray-800">
                  You are logged in as Store Admin
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Product creation, editing, and deletion controls are unlocked for you.
                </p>
              </div>

              {!showChangePass ? (
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => setShowChangePass(true)}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs py-2.5 rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <FaKey className="text-gray-400" /> Change Admin Password
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                  >
                    <FaSignOutAlt /> Lock Admin Access (Logout)
                  </button>
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-gray-700">
                    New Admin Password:
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 4 characters"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#2874f0]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowChangePass(false)}
                      className="w-1/2 border border-gray-300 py-2 rounded text-xs text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 bg-[#2874f0] text-white font-bold py-2 rounded text-xs hover:bg-blue-600"
                    >
                      Save Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
                  <FaLock />
                </div>
                <h4 className="text-base font-bold text-gray-900">Admin Sign In</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Only the store owner can add or modify affiliate deals.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Enter Admin Password
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#2874f0]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs py-3 rounded shadow transition-colors uppercase tracking-wider"
              >
                Unlock Admin Mode
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
