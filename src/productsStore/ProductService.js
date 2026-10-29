import { store as initialStore } from './Store';

const STORAGE_KEY = 'affiliate_products';
const SUPABASE_URL = 'https://thjfjhekmqwgtypbhlar.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoamZqaGVrbXF3Z3R5cGJobGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3Njg5OTEsImV4cCI6MjEwNjM0NDk5MX0.pPUJAzMJyPOpVcliiadgCeFWaS-vZOGJWlN0YjUCEa0';

const supabaseHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// Helper: Convert Database Row (snake_case) to JS Product Object (camelCase)
export const dbToJs = (row) => ({
  id: String(row.id),
  name: row.name || 'Affiliate Product',
  price: Number(row.price) || 0,
  originalPrice: Number(row.original_price) || 0,
  category: row.category || 'Deals',
  type: row.type || 'ourBestSellers',
  platform: row.platform || 'amazon',
  affiliateUrl: row.affiliate_url || '',
  primaryImage: row.primary_image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
  hoverImg: row.hover_img || null,
  amazonUrl: row.amazon_url || '',
  flipkartUrl: row.flipkart_url || '',
  description: row.description || 'Verified deal with partner warranty and customer protection.',
  rating: row.rating || '4.5',
  reviewsCount: Number(row.reviews_count) || 1250,
});

// Helper: Convert JS Product Object (camelCase) to Database Row (snake_case)
export const jsToDb = (item) => ({
  id: String(item.id),
  name: item.name || 'Affiliate Product',
  price: Number(item.price) || 0,
  original_price: Number(item.originalPrice) || 0,
  category: item.category || 'Deals',
  type: item.type || 'ourBestSellers',
  platform: item.platform || 'amazon',
  affiliate_url: item.affiliateUrl || item.amazonUrl || item.flipkartUrl || '',
  primary_image: item.primaryImage || '',
  hover_img: item.hoverImg || null,
  amazon_url: item.amazonUrl || '',
  flipkart_url: item.flipkartUrl || '',
  description: item.description || '',
  rating: item.rating || '4.5',
  reviews_count: Number(item.reviewsCount) || 1250,
});

// Synchronous getter for instant UI render (from memory / localStorage)
export const getProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to read from localStorage', e);
  }
  return initialStore || [];
};

// Helper to get product by id
export const getProductById = (id) => {
  const products = getProducts();
  return products.find((item) => String(item.id) === String(id)) || null;
};

// Fetch latest products from Supabase cloud database
export const fetchProductsFromCloud = async () => {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/affiliate_products?select=*&order=created_at.desc`,
      { headers: supabaseHeaders }
    );

    if (response.ok) {
      const rows = await response.json();
      if (Array.isArray(rows)) {
        const cloudProducts = rows.map(dbToJs);

        // If cloud has products, sync to local cache
        if (cloudProducts.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProducts));
          window.dispatchEvent(new Event('affiliate_products_changed'));
          return cloudProducts;
        }

        // If cloud is empty, check if admin has any local items to migrate up
        const local = getProducts();
        if (local && local.length > 0) {
          for (const item of local) {
            await fetch(`${SUPABASE_URL}/rest/v1/affiliate_products`, {
              method: 'POST',
              headers: supabaseHeaders,
              body: JSON.stringify(jsToDb(item)),
            }).catch(() => {});
          }
          return local;
        }

        // Both are empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        window.dispatchEvent(new Event('affiliate_products_changed'));
        return [];
      }
    }
  } catch (err) {
    console.error('Failed to fetch products from Supabase cloud database:', err);
  }
  return getProducts();
};

// Add product (saves locally + pushes to Supabase Cloud)
export const addProduct = (newProduct) => {
  const products = getProducts();
  const id = newProduct.id || String(Date.now());
  const dealPrice = Number(newProduct.price) || 0;
  const originalMRP = Number(newProduct.originalPrice) || (dealPrice > 0 ? Math.round(dealPrice * 1.35) : 0);

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
    reviewsCount: Number(newProduct.reviewsCount) || 1250,
  };

  // Immediate local update
  const updated = [productToSave, ...products.filter((p) => String(p.id) !== String(id))];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  // Push to Supabase Cloud asynchronously
  fetch(`${SUPABASE_URL}/rest/v1/affiliate_products`, {
    method: 'POST',
    headers: supabaseHeaders,
    body: JSON.stringify(jsToDb(productToSave)),
  })
    .then((res) => {
      if (!res.ok) {
        console.warn('Supabase insert status:', res.status);
      }
    })
    .catch((err) => console.error('Cloud save failed:', err));

  return productToSave;
};

// Update an existing product (saves locally + patches Supabase Cloud)
export const updateProduct = (id, updatedFields) => {
  const products = getProducts();
  const index = products.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  const existing = products[index];
  const dealPrice = updatedFields.price !== undefined ? Number(updatedFields.price) : existing.price;
  const originalMRP = updatedFields.originalPrice !== undefined ? Number(updatedFields.originalPrice) : existing.originalPrice;

  const affLink = (updatedFields.affiliateUrl || updatedFields.amazonUrl || updatedFields.flipkartUrl || existing.affiliateUrl || '').trim();
  let platform = updatedFields.platform || existing.platform || 'amazon';
  if (affLink.toLowerCase().includes('flipkart')) {
    platform = 'flipkart';
  } else if (affLink.toLowerCase().includes('amazon') || affLink.toLowerCase().includes('amzn')) {
    platform = 'amazon';
  }

  const updatedProduct = {
    ...existing,
    ...updatedFields,
    id: String(id),
    price: dealPrice,
    originalPrice: originalMRP,
    platform,
    affiliateUrl: affLink,
    amazonUrl: platform === 'amazon' ? affLink : (updatedFields.amazonUrl || existing.amazonUrl || ''),
    flipkartUrl: platform === 'flipkart' ? affLink : (updatedFields.flipkartUrl || existing.flipkartUrl || ''),
    primaryImage: updatedFields.primaryImage || existing.primaryImage,
  };

  products[index] = updatedProduct;

  // Immediate local update
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to update localStorage', e);
  }

  // Patch in Supabase Cloud
  fetch(`${SUPABASE_URL}/rest/v1/affiliate_products?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: supabaseHeaders,
    body: JSON.stringify(jsToDb(updatedProduct)),
  })
    .then((res) => {
      if (!res.ok) console.warn('Supabase patch status:', res.status);
    })
    .catch((err) => console.error('Cloud update failed:', err));

  return updatedProduct;
};

// Delete product (removes locally + deletes from Supabase Cloud)
export const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter((item) => String(item.id) !== String(id));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('affiliate_products_changed'));
  } catch (e) {
    console.error('Failed to delete from localStorage', e);
  }

  // Delete from Supabase Cloud
  fetch(`${SUPABASE_URL}/rest/v1/affiliate_products?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: supabaseHeaders,
  })
    .then((res) => {
      if (!res.ok) console.warn('Supabase delete status:', res.status);
    })
    .catch((err) => console.error('Cloud delete failed:', err));

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

  // Delete all from Supabase Cloud
  fetch(`${SUPABASE_URL}/rest/v1/affiliate_products?id=neq.placeholder_none`, {
    method: 'DELETE',
    headers: supabaseHeaders,
  }).catch((err) => console.error('Cloud clear failed:', err));
};

// Automatically initiate cloud fetch when this module loads
if (typeof window !== 'undefined') {
  fetchProductsFromCloud();
}
