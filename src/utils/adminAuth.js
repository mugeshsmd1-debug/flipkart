/**
 * Admin Authentication & Session Management
 */

const ADMIN_SESSION_KEY = 'affiliate_admin_session';
const ADMIN_PASSWORD_KEY = 'affiliate_admin_password';
const DEFAULT_PASSWORD = 'Mugesh11@';

export const getStoredPassword = () => {
  return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
};

export const setAdminPassword = (newPassword) => {
  if (newPassword && newPassword.trim().length >= 4) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
    return true;
  }
  return false;
};

export const isAdminLoggedIn = () => {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch (e) {
    return false;
  }
};

export const loginAdmin = (enteredPassword) => {
  const currentPassword = getStoredPassword();
  if (enteredPassword === currentPassword) {
    localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    window.dispatchEvent(new Event('admin_auth_changed'));
    return true;
  }
  return false;
};

export const logoutAdmin = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  window.dispatchEvent(new Event('admin_auth_changed'));
};
