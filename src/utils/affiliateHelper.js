/**
 * Affiliate link resolution utility for Amazon & Flipkart
 */

const DEFAULT_AMAZON_TAG = 'dealfinder-21';
const DEFAULT_FLIPKART_AFFID = 'dealfinder';

export const getAffiliateLinks = (product, searchParams) => {
  if (!product) return { amazonUrl: '', flipkartUrl: '' };

  const queryAmzUrl = searchParams.get('amz');
  const queryFkUrl = searchParams.get('fk');
  const queryAmzTag = searchParams.get('tag') || searchParams.get('amzTag') || DEFAULT_AMAZON_TAG;
  const queryFkAffId = searchParams.get('affid') || searchParams.get('fkTag') || DEFAULT_FLIPKART_AFFID;

  // Resolve Amazon URL
  let amazonUrl = '';
  if (queryAmzUrl) {
    amazonUrl = queryAmzUrl;
  } else if (product.amazonUrl) {
    amazonUrl = product.amazonUrl;
    if (!amazonUrl.includes('tag=') && queryAmzTag) {
      amazonUrl += (amazonUrl.includes('?') ? '&' : '?') + `tag=${queryAmzTag}`;
    }
  } else {
    amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(product.name)}&tag=${queryAmzTag}`;
  }

  // Resolve Flipkart URL
  let flipkartUrl = '';
  if (queryFkUrl) {
    flipkartUrl = queryFkUrl;
  } else if (product.flipkartUrl) {
    flipkartUrl = product.flipkartUrl;
    if (!flipkartUrl.includes('affid=') && queryFkAffId) {
      flipkartUrl += (flipkartUrl.includes('?') ? '&' : '?') + `affid=${queryFkAffId}`;
    }
  } else {
    flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(product.name)}&affid=${queryFkAffId}`;
  }

  return {
    amazonUrl,
    flipkartUrl,
    amzTag: queryAmzTag,
    fkAffId: queryFkAffId
  };
};
