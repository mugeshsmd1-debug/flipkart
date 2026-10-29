import React from 'react';
import FlipkartProductList from './FlipkartProductList';

const ForHer = () => {
  return (
    <FlipkartProductList
      pageTitle="Women's Beauty & Skincare"
      defaultFilterFn={(item) =>
        (item.type?.toLowerCase().includes('lotion') ||
         item.type?.toLowerCase().includes('bestseller') ||
         item.type === 'gift') &&
        item.type !== 'iGPosts'
      }
    />
  );
};

export default ForHer;
