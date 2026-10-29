import { store as initialStore } from './Store';

const STORAGE_KEY = 'affiliate_products';

// Helper to get all products (from localStorage or initialStore)
export const getProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read from localStorage', e);
  }
  return initialStore;
};

// Helper to get product by id
export const getProductById = (id) => {
  const products = getProducts();
  return products.find((item) => String(item.id) === String(id)) || null;
};

// Helper to add a new affiliate product
export const addProduct = (newProduct) => {
  const products = getProducts();
  const id = newProduct.id || String(Date.now());
  const dealPrice = Number(newProduct.price) || 0;
  const originalMRP = Number(newProduct.originalPrice) || (dealPrice > 0 ? Math.round(dealPrice * 1.35) : 0);

  // Detect platform from URL or selection
  const affLink = (newProduct.affiliateUrl || newProduct.amazonUrl || newProduct.flipkartUrl || '').trim();
  let platform = newProduct.platform || 'amazon';
  if (affLink.toLowerCase().includes('flipkart')) {
    platform = 'flipkart';
  } else if (affLink.toLowerCase().includes('amazon') || affLink.toLowerCase().includes('amzn')) {
    platform = 'amazon';
  }

  const productToSave = {
    id,
    name: newProduct.name || 'Affiliate Product',
    price: dealPrice,
    originalPrice: originalMRP,
    category: newProduct.category || 'Deals',
    type: 'ourBestSellers',
    platform,
    affiliateUrl: affLink,
    primaryImage: newProduct.primaryImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    hoverImg: newProduct.hoverImg || null,
    amazonUrl: platform === 'amazon' ? affLink : (newProduct.amazonUrl || ''),
    flipkartUrl: platform === 'flipkart' ? affLink : (newProduct.flipkartUrl || ''),
    description: newProduct.description || 'Verified deal with partner warranty and customer protection.',
    rating: newProduct.rating || '4.5',
    reviewsCount: newProduct.reviewsCount || 1250,
  };

  const updated = [productToSave, ...products];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return productToSave;
};

// Helper to delete product
export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter((item) => String(item.id) !== String(id));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to delete from localStorage', e);
  }
  return updated;
};

// Clear all products completely
export const clearAllProducts = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to clear products', e);
  }
};
